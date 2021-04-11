<?php
    require 'DatabaseAccess.php';
    $database = new DatabaseAccess();
    if(isset($_POST['username']) && isset($_POST['password'])){
        var_dump("bite");
        $username = filter_var($_POST['username'], FILTER_SANITIZE_STRING);
        $password = filter_var($_POST['password'], FILTER_SANITIZE_STRING);
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        $database->registerUser($username, $hashed_password);
    }
?>