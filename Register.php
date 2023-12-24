<?php
$user = 'root';
$pas = '';
$dbname = 'medicines';
$host = 'localhost';

$db = mysqli_connect($host, $user, $pas, $dbname);

if (!$db) {
    die("Connection failed: " . mysqli_connect_error());
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $age = $_POST['age'];
    $Role = $_POST['selectedOption'];

    $name = mysqli_real_escape_string($db, $name);
    $age = mysqli_real_escape_string($db, $age);
    $email = mysqli_real_escape_string($db, $email);
    $password = mysqli_real_escape_string($db, $password);
    $Role = mysqli_real_escape_string($db, $Role);

    $sql = "INSERT INTO users (name, age, email, password, Role) VALUES ('$name', '$age', '$email', '$password', '$Role')";

    if (mysqli_query($db, $sql)) {
        echo json_encode(["status" => "success", "message" => "Data inserted successfully"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error inserting data: " . mysqli_error($db)]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
}

mysqli_close($db);
?>
