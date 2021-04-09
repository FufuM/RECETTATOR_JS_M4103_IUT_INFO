(function() {
    "use strict";

    const DARK_PRIMARY_COLOR = "#00796B";
    const DEFAULT_PRIMARY_COLOR = "#009688";
    const LIGHT_PRIMARY_COLOR = "#B2DFDB";
    const TEXT_PRIMARY_COLOR = "#FFFFFF";
    const ACCENT_COLOR = "#FF5722";
    const PRIMARY_TEXT_COLOR = "#212121";
    const SECONDARY_TEXT_COLOR = "#757575";
    const DIVIDER_COLOR = "#BDBDBD";

    const body = $("body");


    const CSS_BODY = {
        "background-color": TEXT_PRIMARY_COLOR,
        "margin": "0px",
        "padding": "0px",




    }

    const CSS_TOGGLE_BTN_DIV = {
        "height": "60px",
        "width": "60px",

        "position": "relative",
        "float": "right",

        "text-align": "center",

        "border": "solid",

        "margin-right": "10px",
        "margin-top": "5px",
        "cursor": "pointer",
    }

    const CSS_TOGGLE_BTN_DIV_SPAN = {
        "font-size": "60px",
    }

    const CSS_MENU_NAV_DIV = {
        "height": "100vh",
        "background-color": DEFAULT_PRIMARY_COLOR,
        "width": "300px",

        "display": "none",
        "flex-direction": "column",
        "justify-content": "flex-start",
        "align-items": "center",
        //"border" : "solid",
    }
    const CSS_MENU_NAV_DIV_A = {
        "font-color": TEXT_PRIMARY_COLOR,
        "height": "50px",
        "width": "100%",
        //"border" : "solid red",
        "display": "flex",
        "flex-direction": "column",
        "justify-content": "center",
        "align-items": "center",


    }

    const CSS_MENU_NAV_DIV_A_DARK =
        {
            "background-color": DARK_PRIMARY_COLOR,
        }


    const CSS_FORMULAIRE_DIV_FORM =
        {
            "display": "flex",
            "flex-direction": "column",
            "justify-content": "flex-start",
            "align-items": "flex-start",
        }
    const CSS_FORMULAIRE_DIV =
        {
            "border" : "solid"
        }


    function displayBody() {
        body.css(CSS_BODY);
    }

    function displayToggleButton() {
        body.append(
            "<div class='toggle_btn'>" +
            "<span class='material-icons'>menu</span>" +
            "</div>");

        $(".toggle_btn").css(CSS_TOGGLE_BTN_DIV);
        $(".toggle_btn span").css(CSS_TOGGLE_BTN_DIV_SPAN);
    }

    function displayMenu() {
        body.append(
            "<div class='menu_nav'>" +
            "<a class='dark'><span class='material-icons'>restaurant_menu\</span></a>" +
            "<a>1</a>" +
            "<a class='dark'>2</a>" +
            "<a>3</a>" +
            "<a class='dark' >4</a>" +
            "</div>");

        $(".menu_nav").css(CSS_MENU_NAV_DIV);
        $(".menu_nav a").css(CSS_MENU_NAV_DIV_A);
        $(".dark").css(CSS_MENU_NAV_DIV_A_DARK);
    }

    function animateButton(){
        $(".toggle_btn").css({
            "transition": "transform 500ms ease-in-out",
            "transform": "rotate(0deg)",
            "user-select": "none"
        }).click(function () {
            if ($(this).hasClass("shown")) {
                $(this).css("transform", "rotate(0deg)");
                $(this).toggleClass('shown');
                $(".menu_nav").slideToggle();
            } else {
                $(this).css("transform", "rotate(180deg)");
                $(this).toggleClass('shown');
                $(".menu_nav").fadeToggle();



            }
        });
    }


    function displayForm(){
    body.append(
        "<div id='formulaire_div'>" +
            "<form id='formulaire_div_form'>" +
                "<label>Pseudonyme</label> <input type='text' id='pseudo' class='champ'/>" +
                "<label>Mot de Passe</label> <input type='password' id='mdp' class='champ'/>" +
                "<label>Confirmation du Mot de Passe</label> <input type='password' id='confirmation' class='champ'/>" +
                "<input type='submit' id='envoi' value='Envoyer'/>" +
            "</form>" +
        "</div>")

        $("#formulaire_div").css(CSS_FORMULAIRE_DIV);
        $("#formulaire_div_form").css(CSS_FORMULAIRE_DIV_FORM);

    }
    function initialization() {

        //Affichage du cours
        displayBody();
        //Creation du bouton pour le menu
        displayToggleButton();
        //Creation du menu
        displayMenu();
        //Animate the button
        animateButton();
        //Creation du form d'acceuil
        displayForm();

}  $(() => {
        initialization();
    })
}) ();