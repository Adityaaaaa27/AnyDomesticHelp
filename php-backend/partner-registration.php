<?php
/**
 * POST /api/partner-registration
 * 
 * Replaces: app.post('/api/partner-registration', ...) from server.js
 * 
 * Accepts JSON body with: fullName, contactPerson, phone, email, city, message, platform
 * Inserts into partner_registrations table, syncs to Google Sheet.
 */

require_once __DIR__ . '/config.php';

setCorsHeaders();
requirePost();

// ─── Read & Validate Input ──────────────────────────────────────────────────
$data = getJsonInput();
requireFields($data, ['fullName', 'contactPerson', 'phone', 'email', 'city']);

$fullName      = trim($data['fullName']);
$contactPerson = trim($data['contactPerson']);
$phone         = trim($data['phone']);
$email         = strtolower(trim($data['email']));
$city          = trim($data['city']);
$message       = trim($data['message'] ?? '');
$platform      = trim($data['platform'] ?? 'mobile');

// ─── Insert into Database ───────────────────────────────────────────────────
try {
    $db = getDB();
    $stmt = $db->prepare(
        'INSERT INTO partner_registrations 
         (full_name, contact_person, phone, email, city, message, platform) 
         VALUES (:full_name, :contact_person, :phone, :email, :city, :message, :platform)'
    );
    $stmt->execute([
        ':full_name'       => $fullName,
        ':contact_person'  => $contactPerson,
        ':phone'           => $phone,
        ':email'           => $email,
        ':city'            => $city,
        ':message'         => $message,
        ':platform'        => $platform,
    ]);

    $insertId = $db->lastInsertId();

    // ─── Google Sheet Sync ──────────────────────────────────────────────────
    sendToGoogleSheet('partner', [
        'fullName'      => $fullName,
        'contactPerson' => $contactPerson,
        'phone'         => $phone,
        'email'         => $email,
        'city'          => $city,
        'message'       => $message,
        'platform'      => $platform,
    ]);

    http_response_code(201);
    jsonSuccess($insertId);

} catch (PDOException $e) {
    error_log('Error in partner-registration: ' . $e->getMessage());
    jsonError($e->getMessage(), 400);
}
