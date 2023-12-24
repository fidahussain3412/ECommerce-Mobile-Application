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
    $email1 = $_POST['email'];
    $password1 = $_POST['password'];

    $email1 = mysqli_real_escape_string($db, $email1);
    $password1 = mysqli_real_escape_string($db, $password1);

    $sql = "select * from users where email='$email1' AND password='$password1'";
    $result = mysqli_query($db, $sql);

    if (mysqli_num_rows($result) > 0) {
        $userDetails = mysqli_fetch_assoc($result);

        // Check the user's role
        $role = $userDetails['Role'];
        if($role==='store'|| $role=='company')
        {

            echo json_encode(["status" => "success", "message" => "Login successful","role"=>"$role"]);
        }
        // User exists, you might want to fetch user details and send them back
        
    } elseif (mysqli_num_rows($result) === 0) {
        // No user found
        echo json_encode(["status" => "error", "message" => "Invalid email or password"]);
    } else {
        // Some other case, handle it accordingly
        echo json_encode(["status" => "error", "message" => "Unexpected error"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
}

mysqli_close($db);
?>
