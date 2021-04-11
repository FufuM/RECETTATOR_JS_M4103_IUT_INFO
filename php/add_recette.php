<?php

require 'DatabaseAccess.php';

$database = new DatabaseAccess();
if (isset($_POST['nom']) && isset($_POST['difficulte']) && isset($_POST['ingredients'])) {
    $nom = $_POST['nom'];
    $difficulte = $_POST['difficulte'];
    $ingredients = $_POST['ingredients'];
    json_encode($ingredients);
    error_log($ingredients, 3, "logs");
    $database->addCocktail($nom, $difficulte, $ingredients);
}