<?php
/**
 * POST /api/employer-registration
 * 
 * Replaces: app.post('/api/employer-registration', ...) from server.js
 * 
 * Accepts JSON body with: name, phone, email, city, workingHours, serviceType, serviceLabel, platform
 * Inserts into employer_registrations table, syncs to Google Sheet.
 */

require_once __DIR__ . '/config.php';

setCorsHeaders();
requirePost();

// ─── Read & Validate Input ──────────────────────────────────────────────────
$data = getJsonInput();
requireFields($data, ['name', 'phone', 'email', 'city', 'workingHours', 'serviceType', 'serviceLabel']);

$name         = trim($data['name']);
$phone        = trim($data['phone']);
$email        = strtolower(trim($data['email']));
$city         = trim($data['city']);
$workingHours = trim($data['workingHours']);
$serviceType  = trim($data['serviceType']);
$serviceLabel = trim($data['serviceLabel']);
$platform     = trim($data['platform'] ?? 'mobile');

// ─── Insert into Database ───────────────────────────────────────────────────
try {
    $db = getDB();
    $stmt = $db->prepare(
        'INSERT INTO employer_registrations 
         (name, phone, email, city, working_hours, service_type, service_label, platform) 
         VALUES (:name, :phone, :email, :city, :working_hours, :service_type, :service_label, :platform)'
    );
    $stmt->execute([
        ':name'          => $name,
        ':phone'         => $phone,
        ':email'         => $email,
        ':city'          => $city,
        ':working_hours' => $workingHours,
        ':service_type'  => $serviceType,
        ':service_label' => $serviceLabel,
        ':platform'      => $platform,
    ]);

    $insertId = $db->lastInsertId();

    // ─── Google Sheet Sync (fire-and-forget) ────────────────────────────────
    sendToGoogleSheet('employer', [
        'name'         => $name,
        'phone'        => $phone,
        'email'        => $email,
        'city'         => $city,
        'workingHours' => $workingHours,
        'serviceType'  => $serviceType,
        'serviceLabel' => $serviceLabel,
        'platform'     => $platform,
    ]);

    // ─── Success Response ───────────────────────────────────────────────────
    http_response_code(201);
    jsonSuccess($insertId);

} catch (PDOException $e) {
    error_log('Error in employer-registration: ' . $e->getMessage());
    jsonError($e->getMessage(), 400);
}
