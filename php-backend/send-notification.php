<?php
/**
 * POST /api/send-notification
 * 
 * Replaces: app.post('/api/send-notification', ...) from server.js
 * 
 * Broadcasts a push notification to ALL registered Expo push tokens.
 * Accepts JSON body with: title, body, data (optional)
 * 
 * Uses the Expo Push API: https://exp.host/--/api/v2/push/send
 */

require_once __DIR__ . '/config.php';

setCorsHeaders();
requirePost();

// ─── Read & Validate Input ──────────────────────────────────────────────────
$data = getJsonInput();
requireFields($data, ['title', 'body']);

$title    = trim($data['title']);
$body     = trim($data['body']);
$extraData = $data['data'] ?? new stdClass();  // Optional payload data

// ─── Retrieve All Push Tokens ───────────────────────────────────────────────
try {
    $db = getDB();
    $stmt = $db->query('SELECT token FROM push_tokens');
    $tokens = $stmt->fetchAll(PDO::FETCH_COLUMN, 0);

    if (empty($tokens)) {
        http_response_code(200);
        echo json_encode(['success' => true, 'message' => 'No registered push tokens found']);
        exit();
    }

    error_log("Sending notification to " . count($tokens) . " devices...");

    // ─── Chunk tokens into batches of 100 (Expo API limit) ──────────────────
    $EXPO_PUSH_URL = 'https://exp.host/--/api/v2/push/send';
    $tokenChunks = array_chunk($tokens, 100);
    $results = [];

    foreach ($tokenChunks as $chunk) {
        // Build message array for this chunk
        $messages = [];
        foreach ($chunk as $token) {
            $messages[] = [
                'to'    => $token,
                'sound' => 'default',
                'title' => $title,
                'body'  => $body,
                'data'  => $extraData,
            ];
        }

        // Send batch via cURL
        $ch = curl_init($EXPO_PUSH_URL);
        curl_setopt_array($ch, [
            CURLOPT_POST           => true,
            CURLOPT_POSTFIELDS     => json_encode($messages),
            CURLOPT_HTTPHEADER     => [
                'Accept: application/json',
                'Accept-Encoding: gzip, deflate',
                'Content-Type: application/json',
            ],
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT        => 30,
            CURLOPT_SSL_VERIFYPEER => true,
        ]);

        $response = curl_exec($ch);
        $curlError = curl_error($ch);
        curl_close($ch);

        if ($curlError) {
            error_log("Error sending batch of notifications: {$curlError}");
            continue;
        }

        $resultData = json_decode($response, true);
        if ($resultData) {
            $results[] = $resultData;
        }
    }

    http_response_code(200);
    echo json_encode(['success' => true, 'results' => $results]);
    exit();

} catch (PDOException $e) {
    error_log('Error in send-notification: ' . $e->getMessage());
    jsonError($e->getMessage(), 500);
}
