<?php
/**
 * POST /api/feedback
 * 
 * Replaces: app.post('/api/feedback', ...) from server.js
 * 
 * Accepts JSON body with: name, phone, email, rating, ratingLabel, message, platform
 * Inserts into feedbacks table, syncs to Google Sheet.
 */

require_once __DIR__ . '/config.php';

setCorsHeaders();
requirePost();

// ─── Read & Validate Input ──────────────────────────────────────────────────
$data = getJsonInput();
requireFields($data, ['name', 'rating', 'ratingLabel', 'message']);

$name        = trim($data['name']);
$phone       = trim($data['phone'] ?? '');
$email       = strtolower(trim($data['email'] ?? ''));
$rating      = intval($data['rating']);
$ratingLabel = trim($data['ratingLabel']);
$message     = trim($data['message']);
$platform    = trim($data['platform'] ?? 'mobile');

// Validate rating range
if ($rating < 1 || $rating > 5) {
    jsonError('Rating must be between 1 and 5', 400);
}

// ─── Insert into Database ───────────────────────────────────────────────────
try {
    $db = getDB();
    $stmt = $db->prepare(
        'INSERT INTO feedbacks 
         (name, phone, email, rating, rating_label, message, platform) 
         VALUES (:name, :phone, :email, :rating, :rating_label, :message, :platform)'
    );
    $stmt->execute([
        ':name'         => $name,
        ':phone'        => $phone,
        ':email'        => $email,
        ':rating'       => $rating,
        ':rating_label' => $ratingLabel,
        ':message'      => $message,
        ':platform'     => $platform,
    ]);

    $insertId = $db->lastInsertId();

    // ─── Google Sheet Sync ──────────────────────────────────────────────────
    sendToGoogleSheet('feedback', [
        'name'        => $name,
        'phone'       => $phone,
        'email'       => $email,
        'rating'      => $rating,
        'ratingLabel' => $ratingLabel,
        'message'     => $message,
        'platform'    => $platform,
    ]);

    http_response_code(201);
    jsonSuccess($insertId);

} catch (PDOException $e) {
    error_log('Error in feedback: ' . $e->getMessage());
    jsonError($e->getMessage(), 400);
}
