<?php
/**
 * AnyDomesticHelp – PHP Backend Configuration
 * 
 * MySQL connection, CORS, helpers, and Google Sheets sync.
 * Upload this file to: public_html/api/config.php
 * 
 * ⚠️  UPDATE the DB_* and GOOGLE_SCRIPT_URL constants below
 *     with your actual cPanel MySQL credentials.
 */

// ─── Database Credentials ────────────────────────────────────────────────────
// Create these via cPanel → MySQL Databases
define('DB_HOST',     'localhost');                  // Usually 'localhost'
define('DB_NAME',     'anydomestichelp');            // Local database name
define('DB_USER',     'root');                       // XAMPP default username
define('DB_PASSWORD', '');                           // XAMPP default password is blank

// ─── Google Sheets Apps Script URL ───────────────────────────────────────────
define('GOOGLE_SCRIPT_URL', 'https://script.google.com/macros/s/AKfycbzkbUhfkdpT8q_Vwm5IbsVanX9dZ_mqlpYLnEosYoGJ-1MxhQ66yxI680kbxPVqW3UNCg/exec');

// ─── CORS Headers ────────────────────────────────────────────────────────────
// Allow the mobile app (and any origin) to call these API endpoints.
function setCorsHeaders() {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Content-Type: application/json; charset=utf-8');

    // Handle preflight OPTIONS request immediately
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit();
    }
}

// ─── Database Connection (PDO) ───────────────────────────────────────────────
function getDB(): PDO {
    static $pdo = null;
    if ($pdo === null) {
        $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4';
        try {
            $pdo = new PDO($dsn, DB_USER, DB_PASSWORD, [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
            ]);
        } catch (PDOException $e) {
            error_log('DB Connection Error: ' . $e->getMessage());
            jsonError('Database connection failed', 500);
        }
    }
    return $pdo;
}

// ─── JSON Response Helpers ───────────────────────────────────────────────────
function jsonSuccess($id, $extra = []) {
    $response = array_merge(['success' => true, 'id' => $id], $extra);
    echo json_encode($response);
    exit();
}

function jsonError($message, $httpCode = 400) {
    http_response_code($httpCode);
    echo json_encode(['success' => false, 'error' => $message]);
    exit();
}

// ─── Input Helpers ───────────────────────────────────────────────────────────
/**
 * Read and decode JSON request body.
 * Returns associative array.
 */
function getJsonInput(): array {
    $raw = file_get_contents('php://input');
    $data = json_decode($raw, true);
    if (!is_array($data)) {
        jsonError('Invalid JSON body', 400);
    }
    return $data;
}

/**
 * Validate that all required keys exist and are non-empty in $data.
 */
function requireFields(array $data, array $fields): void {
    foreach ($fields as $field) {
        if (!isset($data[$field]) || (is_string($data[$field]) && trim($data[$field]) === '')) {
            jsonError("Field '{$field}' is required", 400);
        }
    }
}

// ─── Google Sheets Sync ──────────────────────────────────────────────────────
/**
 * Send form data to Google Apps Script Web App (non-blocking fire-and-forget).
 * Mirrors the sendToGoogleSheet() function from the Node.js server.
 */
function sendToGoogleSheet(string $formType, array $data): void {
    $scriptUrl = GOOGLE_SCRIPT_URL;
    if (empty($scriptUrl)) {
        error_log('WARNING: GOOGLE_SCRIPT_URL is not configured. Skipping Google Sheet sync.');
        return;
    }

    $payload = array_merge(['formType' => $formType], $data);

    // Use cURL to POST JSON to the Apps Script endpoint
    $ch = curl_init($scriptUrl);
    curl_setopt_array($ch, [
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => json_encode($payload),
        CURLOPT_HTTPHEADER     => ['Content-Type: application/json'],
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 10,        // 10 second timeout
        CURLOPT_FOLLOWLOCATION => true,       // Follow redirects (Apps Script redirects)
        CURLOPT_SSL_VERIFYPEER => false,
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlError = curl_error($ch);
    curl_close($ch);

    if ($curlError) {
        error_log("Google Sheet sync error ({$formType}): cURL error - {$curlError}");
        return;
    }

    $resData = json_decode($response, true);
    if ($httpCode >= 200 && $httpCode < 300 && isset($resData['success']) && $resData['success']) {
        error_log("Successfully synced {$formType} submission to Google Sheet.");
    } else {
        $errorMsg = $resData['error'] ?? "HTTP {$httpCode}";
        error_log("Failed to sync {$formType} to Google Sheet: {$errorMsg}");
    }
}

// ─── Method Check ────────────────────────────────────────────────────────────
/**
 * Ensure the request is a POST. Returns 405 otherwise.
 */
function requirePost(): void {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        echo json_encode(['success' => false, 'error' => 'Method Not Allowed. Use POST.']);
        exit();
    }
}
