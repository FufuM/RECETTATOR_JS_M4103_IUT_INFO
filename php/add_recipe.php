<?php

require 'DatabaseAccess.php';
$database = new DatabaseAccess();

if (isset($_POST['add_a_recipe_name']) && isset($_POST['add_a_recipe_difficulty']) && isset($_POST['add_a_recipe_time'])) {
    $name = $_POST['add_a_recipe_name'];
    $difficulty = $_POST['add_a_recipe_difficulty'];
    $time = $_POST['add_a_recipe_time'];

    /*$name = filter_var($_POST['add_a_recipe_name'], FILTER_SANITIZE_STRING);
    $difficulty = filter_var($_POST['add_a_recipe_difficulty'], FILTER_SANITIZE_STRING);
    $time = filter_var($_POST['add_a_recipe_time'], FILTER_SANITIZE_STRING);*/
    $database->addRecipe($name, $difficulty, $time);


}
echo json_encode($name);
?>