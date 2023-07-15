<?php
$hostname=""; 
$username=""; 
$password=""; 
$dbname=""; 
$tablename="";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    echo json_encode(array("error" => "Failed to connect to the database. Please contact the system administrator: " . $conn->connect_error));
} else {
    $userEmail = $_POST['email'];
    $userPassword = $_POST['password'];
    $userEmail = urldecode($userEmail);

    // Escape special characters in the user inputs to prevent SQL injection
    $userEmail = mysqli_real_escape_string($conn, $userEmail);

    $query = "SELECT * FROM `$tablename` WHERE email = '$userEmail'";
    $result = mysqli_query($conn, $query);

    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_assoc($result)) {
            $hashedPassword = $row['password'];
            $timestamp = $row['timestamp'];

            // Verify the user-provided password against the hashed password
            if (password_verify($userPassword, $hashedPassword)) {
                //SUCCESS
                // Calculate the number of days difference
                $currentTimestamp = time();
                $timestampDiff = $currentTimestamp - strtotime($timestamp);
                $daysDiff = floor($timestampDiff / (60 * 60 * 24));
                $daysLeft = 7 - $daysDiff;
                
                if ($daysDiff > 7) {
                    echo json_encode(array("error" => "Wellness Trial Membership has Expired."));
                } else {
                    // Password is still valid
                    echo json_encode(array("success" => true, "daysLeft" => $daysLeft));
                }

            } else {
                // Password does not match
                echo json_encode(array("error" => "Invalid email or password. If you are having struggles, please email Paul at WellspringLight@gmail.com to reset your password."));
            }
        }
    } else {
        // No rows found
        echo json_encode(array("error" => "No rows found with the provided email."));
    }
}


mysqli_close($conn);

