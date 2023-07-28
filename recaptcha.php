<?php   
 
//Setup connection variables, such as database username 
//and password 

$hostname=""; 
$username=""; 
$password=""; 
$dbname=""; 
$tablename="";

// Create a new connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$name = 'wellspringoflight';
$checkSql = "SELECT `recaptcha-site-key` FROM $tablename WHERE name = '$name'";
$result = $conn->query($checkSql);

if ($result) {
    // Fetch the data from the first row (assuming there is only one row for the given name)
    $row = mysqli_fetch_assoc($result);

    if ($row) {
        // Echo the value of the "recaptcha-site-key" column
        $recaptchaSiteKey = $row['recaptcha-site-key'];
        echo $recaptchaSiteKey;
    } else {
        // Handle the case when no rows are found for the given name
        echo "No record found for the name: $name";
    }
}


// Close the connection
$conn->close();
?>
