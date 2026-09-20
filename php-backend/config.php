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

// ─── Owner Email for Direct Notifications ─────────────────────────────────────
define('OWNER_EMAIL', 'technominds11@gmail.com, anydomestichelp10@gmail.com');

// ─── Google Sheets Apps Script URL ───────────────────────────────────────────
define('GOOGLE_SCRIPT_URL', 'https://script.google.com/macros/s/AKfycbzRjPy5-M7O7Y92Qq2CcgYhP7ZdTnxrlUCd2wucahe1e3k6rd6QviCp87d89ovtuJq67w/exec');

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

    // ─── Direct Email Notification via GoDaddy Mail ─────────────────────────
    sendEmailNotification("New " . ucfirst($formType) . " Submission - AnyDomesticHelp", $data);

    $resData = json_decode($response, true);
    if ($httpCode >= 200 && $httpCode < 300 && isset($resData['success']) && $resData['success']) {
        error_log("Successfully synced {$formType} submission to Google Sheet.");
    } else {
        $errorMsg = $resData['error'] ?? "HTTP {$httpCode}";
        error_log("Failed to sync {$formType} to Google Sheet: {$errorMsg}");
    }
}

// ─── Direct Email Notification ───────────────────────────────────────────────
function sendEmailNotification(string $subject, array $fields): void {
    $to = OWNER_EMAIL;
    if (empty($to)) return;

    $headers = [
        'MIME-Version: 1.0',
        'Content-type: text/html; charset=utf-8',
        'From: AnyDomesticHelp <noreply@anydomestichelp.com>',
        'Reply-To: noreply@anydomestichelp.com',
        'X-Mailer: PHP/' . phpversion()
    ];

    $rows = '';
    foreach ($fields as $key => $value) {
        $label = ucwords(str_replace(['_', '-'], ' ', $key));
        $val = htmlspecialchars((string)$value);
        $rows .= "<tr><td style='padding:8px 12px;font-weight:bold;color:#333;border-bottom:1px solid #eee;width:35%;'>{$label}</td><td style='padding:8px 12px;color:#555;border-bottom:1px solid #eee;'>{$val}</td></tr>";
    }

    $html = "
    <div style='font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e0e0e0;border-radius:8px;overflow:hidden;'>
      <div style='background:#0E6F5C;color:#ffffff;padding:16px 20px;'>
        <h2 style='margin:0;font-size:18px;'>AnyDomesticHelp — New Notification</h2>
      </div>
      <div style='padding:20px;'>
        <h3 style='margin-top:0;color:#0E6F5C;'>{$subject}</h3>
        <table style='width:100%;border-collapse:collapse;margin-top:10px;'>
          {$rows}
        </table>
        <p style='margin-top:20px;font-size:12px;color:#888;'>Sent automatically from the AnyDomesticHelp app on " . date('Y-m-d H:i:s') . "</p>
      </div>
    </div>
    ";

    @mail($to, $subject, $html, implode("\r\n", $headers));
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
