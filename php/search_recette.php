<?php

require 'DatabaseAccess.php';

$database = new DatabaseAccess();
$obj = new stdClass();
$obj->msg = "On est arrivé!";
//var_dump($_GET);
if (!empty($_GET)) {
    $obj->msg .= "$_GET n'est pas vide";
    error_log("search_cocktail ok", 3, "logs");
    $liste_cocktails = array();

    foreach ($_GET['ingredient'] as $ingredient) {
        //var_dump($ingredient);
        //$obj->$ingredient = $database->getCocktailsFromIngredient($ingredient['name']); //fonctionne si la requête attend un "text"
        $cocktail = $database->getCocktailsFromIngredient($ingredient['name']);
        //array_push($liste_cocktails, $cocktail[0]);//ne renverra que les cocktails correspondant à la requête
        array_push($liste_cocktails, $ingredient);
        array_push($liste_cocktails, $cocktail);
    }

} else {
    $obj->msg .= "$_GET est vide";
    error_log("search_cocktail : $_GET est vide", 3, "logs");
}
$obj->msg .= "fin du fichier";
error_log("search_cocktail : $_GET est pas vide mais y'a un bug", 3, "logs");
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');
//echo json_encode($obj);
echo json_encode($liste_cocktails);
?>
