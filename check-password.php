<?php
$hostname = "74.124.198.128";
$username = "asoulh5";
$password = "\$Mi11ion\$123";
$dbname = "asoulh5_zoom";

$conn = new mysqli($servername, $username, $password, $dbname);

if (!$conn) {
    echo "Failed to connect to the database. Please contact the system administrator: " . $conn->connect_error;
} else {
    $userpassword = $_POST['password'];
    $useremail = $_POST['email'];
    $useremail = urldecode($useremail);

    $query = "SELECT `password`, `timestamp`, `email` FROM `zoom` WHERE password = '$userpassword' AND email = '$useremail'";
    $result = mysqli_query($conn,$query);
    $check = mysqli_fetch_array($result);

    if(isset($check)){
        $row = $result->fetch_assoc();
        $timestamp = strtotime($row['timestamp']);

        // Compare the timestamp with the current date
        $currentDate = strtotime(date('Y-m-d'));
        $expirationDate = strtotime('-7 days', $currentDate);

        if ($timestamp > $expirationDate) {
            echo "Password is still valid and will redirect them to the zoom page";
        } else {
            // Password has expired
            echo "Password has expired";
        }

    }else{
    echo 'Incorrect Email or Password';
    }
}

mysqli_close($conn);
?>
