<?php
    require 'DatabaseAccess.php';

    session_start();
    //unset($_SESSION['current_user']);
    $database = new DatabaseAccess();

    $connected_user = $database->getLoggedInUser();
    if (isset($connected_user)) {
        //User already logged in
        $user_data = array("id" => $connected_user->getId(), "username" => $connected_user->getUsername());
        echo json_encode($user_data);
    } else {
        if(isset($_POST['username']) && isset($_POST['password'])){
            $username = filter_var($_POST['username'], FILTER_SANITIZE_STRING);
            $password = filter_var($_POST['password'], FILTER_SANITIZE_STRING);

            $users_list = $database->getUsersByUsername($username);
            foreach ($users_list as $user) {
                if (password_verify($password, $user->getPassword())) {
                    $user_data = array("id" => $user->getId(), "username" => $user->getUsername());
                    $_SESSION['current_user'] = $user->getId();
                    echo json_encode($user_data);
                }
            }
        } else {
            echo '{}';
        }
    }
?>
