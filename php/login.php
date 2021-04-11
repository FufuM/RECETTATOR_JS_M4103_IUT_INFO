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

        if(isset($_POST['login_username']) && isset($_POST['login_password'])){
            $username = filter_var($_POST['login_username'], FILTER_SANITIZE_STRING);
            $password = filter_var($_POST['login_password'], FILTER_SANITIZE_STRING);

            $users_list = $database->getUsersByUsername($username);
            foreach ($users_list as $user) {
                if (password_verify($password, $user->getPassword())) {
                    $user_data = array("id" => $user->getId(), "username" => $user->getUsername());
                    $_SESSION['current_user'] = $user->getId();
                    echo json_encode($user_data);
                }
            }
        } else {
            echo json_encode(false);
        }
    }
?>
