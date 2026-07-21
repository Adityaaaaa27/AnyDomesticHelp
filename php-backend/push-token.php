<?php
/**
 * POST /api/push-token
 * 
 * Replaces: app.post('/api/push-token', ...) from server.js
 * 
 * Accepts JSON body with: token, platform
 * Upserts into push_tokens table (INSERT ... ON DUPLICATE KEY UPDATE).
 */

require_once __DIR__ . '/config.php';

setCorsHeaders();
requirePost();

// ─── Read & Validate Input ──────────────────────────────────────────────────
$data = getJsonInput();

if (!isset($data['token']) || trim($data['token']) === '') {
    jsonError('Token is required', 400);
}

$token    = trim($data['token']);
$platform = trim($data['platform'] ?? 'unknown');

// ─── Upsert Token (avoid duplicates) ────────────────────────────────────────
try {
    $db = getDB();
    
    // INSERT new token, or UPDATE existing one with fresh timestamp/platform
    $stmt = $db->prepare(
        'INSERT INTO push_tokens (token, platform, created_at) 
         VALUES (:token, :platform, NOW())
         ON DUPLICATE KEY UPDATE 
            platform = VALUES(platform), 
            created_at = NOW()'
    );
    $stmt->execute([
        ':token'    => $token,
        ':platform' => $platform,
    ]);

    http_response_code(200);
    echo json_encode(['success' => true]);
    exit();

} catch (PDOException $e) {
    error_log('Error registering push token: ' . $e->getMessage());
    jsonError($e->getMessage(), 500);
}
