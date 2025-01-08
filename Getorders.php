<?php
$user = "root";
$dbname = "medicines";
$pas = "";
$host = "localhost";
$db = mysqli_connect($host, $user, $pas, $dbname);

if (!$db) {
    die("error" . mysqli_connect_error());
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $sql = "select * from orders";
    $result = mysqli_query($db, $sql);

    if ($result) {
        $orders = array();

        while ($row = mysqli_fetch_assoc($result)) {
            $orders[] = $row;
        }

        echo json_encode(["status" => "success", "message" => "Orders fetched successfully", "orders" => $orders]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error fetching orders: " . mysqli_error($db)]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
}

mysqli_close($db);
?>
