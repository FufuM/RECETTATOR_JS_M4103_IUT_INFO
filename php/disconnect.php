<?php
    session_start();
    unset($_SESSION['current_user']);
    echo '{}';
?>