<?php

// function getRecaptchaSiteKey() {
//     $servername = "74.124.198.128";
//     $username = "asoulh5";
//     $password = "\$Mi11ion\$123";
//     $dbname = "asoulh5_zoom";
//     $tablename = "zoomcreds";

//     $conn = new mysqli($servername, $username, $password, $dbname);

//     if ($conn->connect_error) {
//         die("Connection failed: " . $conn->connect_error);
//     }

//     $name = 'wellspringoflight';
//     $checkSql = "SELECT `recaptcha-site-key` FROM $tablename WHERE name = '$name'";
//     $result = $conn->query($checkSql);

//     if ($result) {
//         $row = mysqli_fetch_assoc($result);

//         if ($row) {
//             $recaptchaSiteKey = $row['recaptcha-site-key'];
//             echo $recaptchaSiteKey;
//         } else {
//             echo "No record found for the name: $name";
//         }
//     }

//     $conn->close();
// }

// function addUser() {
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
// }

// Call the appropriate function based on the action requested from HTML code
// if (isset($_POST['action'])) {
//     if ($_POST['action'] === 'getRecaptchaSiteKey') {
//         getRecaptchaSiteKey();
//     } elseif ($_POST['action'] === 'addUser') {
//         addUser();
//     } else {
//         echo "Invalid action!";
//     }
// }
?>
