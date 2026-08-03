<?php
/**
 * AnyDomesticHelp – Backend API Verification Test
 * 
 * Verifies that the database connects and all endpoints are functioning.
 * Run in browser: https://anydomestichelp.com/api/test-api.php
 * Run in terminal: php test-api.php
 * 
 * IMPORTANT: DELETE this file from your server after successful verification.
 */

// Set headers for browser output
if (php_sapi_name() !== 'cli') {
    header('Content-Type: text/plain; charset=utf-8');
}

require_once __DIR__ . '/config.php';

echo "==================================================\n";
echo "    AnyDomesticHelp API Self-Test Suite\n";
echo "==================================================\n\n";

// 1. Test Database Connectivity
echo "Step 1: Testing Database Connection...\n";
try {
    $db = getDB();
    echo "✅ PASS | Database connected successfully.\n\n";
} catch (Exception $e) {
    echo "❌ FAIL | Database connection failed: " . $e->getMessage() . "\n";
    echo "Please check your credentials in config.php\n";
    exit(1);
}

// Determine base URL for HTTP tests
if (php_sapi_name() === 'cli') {
    // If running via CLI, default to localhost or prompt
    $baseUrl = 'http://localhost:8000';
    echo "Running in CLI mode. Using default base URL: $baseUrl\n";
    echo "To test a different server, run: php test-api.php [baseUrl]\n";
    if (isset($argv[1])) {
        $baseUrl = rtrim($argv[1], '/');
    }
} else {
    $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
    $host = $_SERVER['HTTP_HOST'];
    $scriptDir = dirname($_SERVER['SCRIPT_NAME']);
    $scriptDir = rtrim(str_replace('\\', '/', $scriptDir), '/');
    $baseUrl = $protocol . '://' . $host . $scriptDir;
}

echo "Base API URL for testing: $baseUrl\n\n";
echo "Step 2: Testing API Endpoints (POST requests)...\n";

$tests = [
    [
        'name' => 'Employer Registration',
        'endpoint' => '/employer-registration',
        'payload' => [
            'name' => 'Test Employer',
            'phone' => '9876543210',
            'email' => 'test.employer@example.com',
            'city' => 'Mumbai',
            'workingHours' => 'Full Time 8 Hrs',
            'serviceType' => 'BabySitter',
            'serviceLabel' => 'Baby Sitter',
            'platform' => 'api-test'
        ]
    ],
    [
        'name' => 'Partner Registration',
        'endpoint' => '/partner-registration',
        'payload' => [
            'fullName' => 'Test Partner Corp',
            'contactPerson' => 'Test Contact Person',
            'phone' => '9876543211',
            'email' => 'test.partner@example.com',
            'city' => 'Delhi',
            'message' => 'Interested in partnership test',
            'platform' => 'api-test'
        ]
    ],
    [
        'name' => 'Employee Referral',
        'endpoint' => '/employee-referral',
        'payload' => [
            'jobCategory' => 'Cook',
            'employeeName' => 'Test Employee Name',
            'referrerPhone' => '9876543212',
            'location' => 'Pune',
            'experience' => '5 years',
            'gender' => 'Female',
            'platform' => 'api-test'
        ]
    ],
    [
        'name' => 'Feedback',
        'endpoint' => '/feedback',
        'payload' => [
            'name' => 'Test User',
            'phone' => '9876543213',
            'email' => 'test.user@example.com',
            'rating' => 5,
            'ratingLabel' => 'Excellent',
            'message' => 'Great service test!',
            'platform' => 'api-test'
        ]
    ],
    [
        'name' => 'Push Token Registration',
        'endpoint' => '/push-token',
        'payload' => [
            'token' => 'ExponentPushToken[api-test-token-12345]',
            'platform' => 'api-test'
        ]
    ]
];

$allPassed = true;

foreach ($tests as $test) {
    $url = $baseUrl . $test['endpoint'];
    
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => json_encode($test['payload']),
        CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 15,
        CURLOPT_SSL_VERIFYPEER => false, // Bypass SSL for testing loopback
        CURLOPT_FOLLOWLOCATION => true,
    ]);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlError = curl_error($ch);
    curl_close($ch);
    
    if ($curlError) {
        echo "❌ FAIL | POST {$test['endpoint']} | Connection Error: {$curlError}\n";
        echo "   👉 Tip: Some hosting providers block loopback/self HTTP requests. If this is a shared host, the API might still be working even if this test fails. Try submitting from the mobile app or Postman.\n\n";
        $allPassed = false;
        continue;
    }
    
    $data = json_decode($response, true);
    if ($httpCode >= 200 && $httpCode < 300 && isset($data['success']) && $data['success']) {
        echo "✅ PASS | POST {$test['endpoint']} | Response: " . trim($response) . "\n";
    } else {
        echo "❌ FAIL | POST {$test['endpoint']} | HTTP {$httpCode} | Response: " . trim($response) . "\n";
        $allPassed = false;
    }
}

echo "\n--------------------------------------------------\n";
if ($allPassed) {
    echo "🎉 ALL TESTS PASSED!\n";
    echo "Your PHP backend is fully configured and ready for the mobile app.\n";
    echo "⚠️ REMINDER: Delete this file (test-api.php) from your server now.\n";
} else {
    echo "⚠️ SOME TESTS FAILED.\n";
    echo "Please check the errors above. Make sure your database table schemas are imported correctly.\n";
}
echo "--------------------------------------------------\n";
