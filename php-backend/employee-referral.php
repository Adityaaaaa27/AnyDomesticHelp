<?php
/**
 * POST /api/employee-referral
 * 
 * Replaces: app.post('/api/employee-referral', ...) from server.js
 * 
 * Accepts JSON body with: jobCategory, employeeName, referrerPhone, location, experience, gender, platform
 * Inserts into employee_referrals table, syncs to Google Sheet.
 */

require_once __DIR__ . '/config.php';

setCorsHeaders();
requirePost();

// ─── Read & Validate Input ──────────────────────────────────────────────────
$data = getJsonInput();
requireFields($data, ['jobCategory', 'employeeName', 'referrerPhone']);

$jobCategory   = trim($data['jobCategory']);
$employeeName  = trim($data['employeeName']);
$referrerPhone = trim($data['referrerPhone']);
$location      = trim($data['location'] ?? '');
$experience    = trim($data['experience'] ?? '');
$gender        = trim($data['gender'] ?? '');
$platform      = trim($data['platform'] ?? 'mobile');

// ─── Insert into Database ───────────────────────────────────────────────────
try {
    $db = getDB();
    $stmt = $db->prepare(
        'INSERT INTO employee_referrals 
         (job_category, employee_name, referrer_phone, location, experience, gender, platform) 
         VALUES (:job_category, :employee_name, :referrer_phone, :location, :experience, :gender, :platform)'
    );
    $stmt->execute([
        ':job_category'   => $jobCategory,
        ':employee_name'  => $employeeName,
        ':referrer_phone' => $referrerPhone,
        ':location'       => $location,
        ':experience'     => $experience,
        ':gender'         => $gender,
        ':platform'       => $platform,
    ]);

    $insertId = $db->lastInsertId();

    // ─── Google Sheet Sync ──────────────────────────────────────────────────
    sendToGoogleSheet('referral', [
        'jobCategory'   => $jobCategory,
        'employeeName'  => $employeeName,
        'referrerPhone' => $referrerPhone,
        'location'      => $location,
        'experience'    => $experience,
        'gender'        => $gender,
        'platform'      => $platform,
    ]);

    http_response_code(201);
    jsonSuccess($insertId);

} catch (PDOException $e) {
    error_log('Error in employee-referral: ' . $e->getMessage());
    jsonError($e->getMessage(), 400);
}
