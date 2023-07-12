<?php   
 
//Setup connection variables, such as database username 
//and password 

$hostname="74.124.198.128"; 
$username="asoulh5"; 
$password="\$Mi11ion\$123"; 
$dbname="asoulh5_zoom"; 
$tablename="zoom";

// Create a new connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Prepare the SQL statement
$name = $_POST['name'];
$email = $_POST['email'];
$password = $_POST['password'];
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);
$timestamp = date("Y-m-d");

// Check if the email already exists
$checkEmailSql = "SELECT * FROM $tablename WHERE email = '$email'";
$result = $conn->query($checkEmailSql);

if ($result->num_rows > 0) {
    echo "User Exists";
    
} else {
    $sql = "INSERT INTO $tablename (name, password, timestamp, email) VALUES ('$name', '$hashedPassword', '$timestamp', '$email')";
    if ($conn->query($sql) === TRUE) {
        echo "Record saved successfully.";
    } else {
        echo "Error saving record: " . $conn->error;
    }
}

// Close the connection
$conn->close();
?>
