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
    $email = $_POST['email'];
    $productName = $_POST['productName'];
    $amount = $_POST['amount'];

    $email = mysqli_real_escape_string($db, $email);
    $productName = mysqli_real_escape_string($db, $productName);
    $amount = mysqli_real_escape_string($db, $amount);

    $sql = "INSERT INTO orders (email, product_title, amount) VALUES ('$email', '$productName', '$amount')";

    if (mysqli_query($db, $sql)) {
        echo json_encode(["status" => "success", "message" => "Order confirmed successfully"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error confirming order: " . mysqli_error($db)]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
}

mysqli_close($db);
?>
