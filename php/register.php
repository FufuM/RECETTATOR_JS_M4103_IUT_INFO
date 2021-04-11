<?php
    require 'DatabaseAccess.php';
    $database = new DatabaseAccess();
    if(isset($_POST['register_username']) && isset($_POST['register_password'])){
        $username = filter_var($_POST['register_username'], FILTER_SANITIZE_STRING);
        $password = filter_var($_POST['register_password'], FILTER_SANITIZE_STRING);
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        $database->registerUser($username, $hashed_password);
        echo json_encode(true);
    }
    else
    {
        echo json_encode(false);
    }

?>