(function () {
    "use strict";

    //DECLARATION DES COULEURS
    const DARK_PRIMARY_COLOR = "#00796B";
    const DEFAULT_PRIMARY_COLOR = "#009688";
    const LIGHT_PRIMARY_COLOR = "#B2DFDB";
    const TEXT_PRIMARY_COLOR = "#FFFFFF";
    const ACCENT_COLOR = "#FF5722";
    const PRIMARY_TEXT_COLOR = "#212121";
    const SECONDARY_TEXT_COLOR = "#757575";
    const DIVIDER_COLOR = "#BDBDBD";

    //DECLARATION DES SELECTEURS
    const $toggle_btn = $("#toggle_btn");

    const $menu_nav = $("#menu_nav");
    const $menu_nav_a = $("#menu_nav a");

    const $formulaire_div_register = $("#formulaire_div_register");
    const $formulaire_div_login = $("#formulaire_div_login");

    const $register_username = $("#register_username");
    const $register_password = $("#register_password");
    const $register_password_confirm = $("#register_password_confirm");
    const $send_register = $("#send_register");

    const $login_username = $("#login_username");
    const $login_password = $("#login_password");

    const $send_login = $("#send_login");

    const $menu_recipes_list = $("#menu_recipes_list");
    const $menu_add_a_recipie = $("#menu_add_a_recipe");
    const $menu_my_account = $("#menu_my_account");
    const $menu_disconnect = $("#menu_disconnect");

    const $recipes_list_div = $("#recipes_list_div");
    const $recipes_list_div_ul = $("#recipes_list_div_ul");

    const $add_a_recipe_div = $("#add_a_recipe_div");
    const $send_add_a_recipe = $("#send_add_a_recipe");
    const $add_a_recipe_name = $("#add_a_recipe_name");
    const $add_a_recipe_difficulty = $("#add_a_recipe_difficulty");
    const $add_a_recipe_time = $("#add_a_recipe_time");

    //DECLARATION DES CLASSES
    class User {

        constructor() {
            this.id = -1;
            this.username = "";
        }

        setUsername(user_username) {
            this.username = user_username;
        }

        setId(user_id) {
            this.id = user_id;
        }



    }

    //INIT L'OBJ USER
    let current_user = new User();



    //AJAX DE LA LISTE DES RECETTES
    function listRecipies() {
        $.ajax({
            url: "http://fufum.alwaysdata.net/php/recipes_list.php",
            method: "POST",
            dataType: "json",
        })
            .done(function (data) {
                $recipes_list_div_ul.empty();
                for (let i in data) {
                    if (data.hasOwnProperty(i)) {
                        $recipes_list_div_ul.append(
                            '<li class="recipes_list_div_ul_li" id="' + data[i]["recipe_id"] + '">'
                            + data[i]["recipe_name"]
                            + '</li>');
                    }
                }
                console.log(data);
                animateList(data);
            })
            .fail(function (error) {
                alert("La requête s'est terminée en échec. Infos : " + JSON.stringify(error));
            });

    }

    //AJAX DE L'AJOUT D'UNE RECETTE
    function addARecipe(add_a_recipe_name, add_a_recipe_difficulty, add_a_recipe_time) {
        $.ajax({
            url: "http://fufum.alwaysdata.net/php/add_recipe.php",
            type: "POST",
            data: {
                'add_a_recipe_name': add_a_recipe_name,
                'add_a_recipe_difficulty': add_a_recipe_difficulty,
                'add_a_recipe_time': add_a_recipe_time
            },
            dataType: "json",
        })
            .done(function () {
                console.log("done");
                alert("La recette a été enregistrée.");
            })
            .fail(function (error) {
                console.log(error);
            });
    }

    //AJAX DU LOGIN
    function login(login_username, login_password) {
        $.ajax({
            url: "http://fufum.alwaysdata.net/php/login.php",
            type: "POST",
            data: {'login_username': login_username, 'login_password': login_password},
            dataType: "json",
        })
            .done(function (data) {
                if(data.hasOwnProperty("id")) {
                    alert("Vous êtes bien connecté.");
                }
                $login_username.val("");
                $login_password.val("");
            })
            .fail(function (error) {
                console.log(error);
            });
    }

    //AJAX DU REGISTER
    function register(register_username, register_password) {
        $.ajax({
            url: "http://fufum.alwaysdata.net/php/register.php",
            type: "POST",
            data: {'register_username': register_username, 'register_password': register_password},
            dataType: "json",
        })
            .done(function () {

                $register_username.val("");
                $register_password.val("");
                $register_password_confirm.val("");

                alert("Compte crée.");
            })
            .fail(function (error) {
                console.log(error);
            });
    }

    //AJAX DU TEST SESSION
    function testSession() {
        $.ajax({
            url: "http://fufum.alwaysdata.net/php/login.php",
            type: "POST",
            dataType: "json",
        })
            .done(function(data) {
                if(data.hasOwnProperty("id")) {
                    current_user.setUsername(data["username"]);
                    current_user.setId(data["id"]);



                }
            });
    }

    //AJAX DE LA DECONNEXION
    function disconnect() {
        $.ajax({
            url: "http://fufum.alwaysdata.net/php/disconnect.php",
            type: "POST",
            dataType: "json",
        })
            .done(function (data) {
            });
    }



    //DYNAMISER LE BOUTON 'HAMBURGER'
    function animateButton() {
        $toggle_btn.click(function () {
            if ($(this).hasClass("shown")) {
                $(this).css("transform", "rotate(0deg)");
                $(this).toggleClass('shown');
                $menu_nav.slideToggle();
            } else {
                $(this).css("transform", "rotate(180deg)");
                $(this).toggleClass('shown');
                $menu_nav.slideToggle();
            }
        });
    }

    //DYNAMISER LE MENU DEROULANT
    function animateMenu() {

        $menu_nav_a.mouseover(function () {
                $(this).css("background-color", DARK_PRIMARY_COLOR);
            }
        );
        $menu_nav_a.mouseout(function () {
                $(this).css("background-color", DEFAULT_PRIMARY_COLOR);
            }
        );
        $menu_recipes_list.click(function () {
                listRecipies();
                $(".center_objct:visible").fadeOut().queue(function () {
                    $recipes_list_div.fadeIn();
                    $(this).dequeue();
                });
            }
        );
        $menu_add_a_recipie.click(function () {
                $(".center_objct:visible").fadeOut().queue(function () {
                    $add_a_recipe_div.fadeIn();
                    $(this).dequeue();
                });
            }
        );
        $menu_my_account.click(function () {
                $(".center_objct:visible").fadeOut().queue(function () {
                    $formulaire_div_login.fadeIn();
                    $formulaire_div_register.fadeIn();
                    $(this).dequeue();
                });
            }
        );
        $menu_disconnect.click(function () {
                disconnect();
                alert("Vous êtes déconnecté.");
            }
        );
    }

    //DYNAMISER LE FORM D'AJOUT DE RECETTE
    function animateAddForm() {
        $send_add_a_recipe.click(function () {
            if ($add_a_recipe_name.val() == "" || $add_a_recipe_difficulty.val() == "" || $add_a_recipe_time.val() == "") {
                alert("Champ(s) Vide(s)");
            } else {

                let name = $add_a_recipe_name.val();
                let difficulty = $add_a_recipe_difficulty.val();
                let time = $add_a_recipe_time.val();

                addARecipe(name, difficulty, time);

                $add_a_recipe_name.val("");
                $add_a_recipe_difficulty.val("");
                $add_a_recipe_time.val("");
            }
        });
    }

    //DYNAMISER LA LISTE DES RECETTES
    function animateList(data) {
        const $recipes_list_div_ul_li = $(".recipes_list_div_ul_li");
        $recipes_list_div_ul_li.mouseover(function () {
            $(this).css("background-color", DARK_PRIMARY_COLOR);
        });
        $recipes_list_div_ul_li.mouseout(function () {
            $(this).css("background-color", DEFAULT_PRIMARY_COLOR);
        });

        $recipes_list_div_ul_li.click(function () {
            let id = $(this).attr("id");
            id -= 1;
            alert(data[id]["recipe_difficulty"] + '   '+ data[id]["recipe_time"] + 'mn');
        });
    }

    //DYNAMISER LE FORM DU LOGIN
    function animateLoginForm() {
        $send_login.click(function () {
            if ($login_password.val() == "" || $login_username.val() == "") {
                alert("Champ(s) Vide(s)");
            } else {
                login($login_username.val(), $login_password.val());
            }
        });
    }

    //DYNAMISER LE FORM DU REGISTER
    function animateRegisterForm() {
        $send_register.click(function () {
            if ($register_username.val() == "" || $register_password.val() == "" || $register_password_confirm.val() == "") {
                alert("Champ(s) Vide(s)");
            } else if ($register_password.val() != $register_password_confirm.val()) {
                alert("Les mots de passes doivent correspondre");
            } else {
                register($register_username.val(), $register_password.val());
            }
        });
    }

    function initialization() {

        animateButton();
        animateMenu();
        animateAddForm();
        animateLoginForm();
        animateRegisterForm();
        testSession();

    }

    $(() => {
        initialization();
    })
})
();