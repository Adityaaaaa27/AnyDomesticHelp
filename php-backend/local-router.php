<?php
/**
 * Local Router for PHP Built-in Web Server
 * 
 * Maps `/api/some-endpoint` to `some-endpoint.php`
 * and handles preflight OPTIONS requests.
 */

// Handle CORS for local development
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Rewrite /api/endpoint to endpoint.php
if (preg_match('#^/api/([^/]+)$#', $uri, $matches)) {
    $file = __DIR__ . '/' . $matches[1] . '.php';
    if (file_exists($file)) {
        require $file;
        exit;
    }
}

// Return false to let the built-in server serve static assets (if any)
return false;
