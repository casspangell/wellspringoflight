<?php   
 
$hostname="74.124.198.128"; 
$username="asoulh5"; 
$password="\$Mi11ion\$123"; 
$dbname="asoulh5_zoom"; 
$tablename="zoomcreds";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$name = 'wellspringoflight';
$checkSql = "SELECT `recaptcha-site-key` FROM $tablename WHERE name = '$name'";
$result = $conn->query($checkSql);

if ($result) {
    $row = mysqli_fetch_assoc($result);

    if ($row) {
        $recaptchaSiteKey = $row['recaptcha-site-key'];
        echo $recaptchaSiteKey;
    } else {
        echo "No record found for the name: $name";
    }
}

$conn->close();
?>