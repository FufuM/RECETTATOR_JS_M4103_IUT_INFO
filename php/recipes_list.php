<?php
require 'DatabaseAccess.php';

$database = new DatabaseAccess();
$recipies_list = $database->getRecipesList();
echo json_encode($recipies_list);
?>