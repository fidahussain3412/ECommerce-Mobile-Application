<?php
$user = "root";
$dbname = "medicines";
$pas = "";
$host = "localhost";
$db = mysqli_connect($host, $user, $pas, $dbname);

if (!$db) {
    die("error" . mysqli_connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    $sql = "SELECT * FROM products";
    $result = mysqli_query($db, $sql);

    if ($result) {
        $userDetailsArray = array();

        while ($row = mysqli_fetch_assoc($result)) {
            $userDetailsArray[] = $row;
        }

        if (!empty($userDetailsArray)) {
            echo json_encode($userDetailsArray);
        } else {
            echo json_encode(["status" => "error", "message" => "No products to show"]);
        }
    } else {
        // Handle query error
        echo json_encode(["status" => "error", "message" => "Query error: " . mysqli_error($db)]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
}

mysqli_close($db);
?>
