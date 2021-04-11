(function () {
    "use strict";

    const DARK_PRIMARY_COLOR = "#00796B";
    const DEFAULT_PRIMARY_COLOR = "#009688";
    const LIGHT_PRIMARY_COLOR = "#B2DFDB";
    const TEXT_PRIMARY_COLOR = "#FFFFFF";
    const ACCENT_COLOR = "#FF5722";
    const PRIMARY_TEXT_COLOR = "#212121";
    const SECONDARY_TEXT_COLOR = "#757575";
    const DIVIDER_COLOR = "#BDBDBD";

    const $body = $("body");

    const $toggle_btn = $("#toggle_btn");
    const $toggle_btn_span = $("#toggle_btn_span");

    const $menu_nav = $("#menu_nav");
    const $menu_nav_a = $("#menu_nav a");


    const $formulaire_div_register = $("#formulaire_div_register");
    const $formulaire_div_connexion = $("#formulaire_div_connexion");
    const $formulaire_div_form = $(".formulaire_div_form");

    const $pseudo_register = $("#pseudo_register");
    const $password_register = $("#password_register");
    const $confirm_password = $("#password_confirmation_register");

    const $menu_fork = $("#menu_fork");
    const $menu_recipes_list = $("#menu_recipes_list");
    const $menu_add_a_recipie = $("#menu_add_a_recipie");
    const $menu_my_account = $("#menu_my_account");
    const $menu_disconnect = $("#menu_disconnect");

    const $center_objct = $(".center_objct");
    const $center_objct_hidden = $(".center_objct:hidden");
    const $center_objct_visible = $(".center_objct:visible");

    const $recipes_list_div = $("#recipes_list_div");
    const $recipes_list_div_ul = $("#recipes_list_div_ul");
    const $recipes_list_div_ul_li = $(".recipes_list_div_ul_li");


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

    function animateMenu() {
        $menu_nav_a.mouseover(function () {
                $(this).css("background-color", DARK_PRIMARY_COLOR);
            }
        );
        $menu_nav_a.mouseout(function () {
                $(this).css("background-color", DEFAULT_PRIMARY_COLOR)
            }
        );
        $menu_recipes_list.click(function () {
                listRecipies();
                $center_objct_visible.fadeOut().queue(function () {
                    $recipes_list_div.fadeIn();
                    $(this).dequeue();
                });
            }
        );

        function listRecipies() {


            $.ajax({
                url: "http://fufum.alwaysdata.net/php/recipes_list.php",
                method: "POST",
                dataType: "json",
            })
                .done(function (data) {

                    for (let i in data) {

                        if (data.hasOwnProperty(i)) {

                            $recipes_list_div_ul.append(
                                '<li class="recipes_list_div_ul_li" id="' + data[i]["recipe_name"] + '">'
                                + data[i]["recipe_name"]
                                + '</li>');
                            console.log('<li class="recipes_list_div_ul_li" id="' + data[i]["recipe_name"] + '">'
                            + data[i]["recipe_name"]
                            + '</li>');

                            animateList()
                        }
                    }

                })


                .fail(function (error) {
                    alert("La requête s'est terminée en échec. Infos : " + JSON.stringify(error));
                });

        }

        function animateList()
        {
            $recipes_list_div_ul_li.click(function(){
                let id = $(this).attr("id");
                alert(id);
            });
        }


        /*$menu_my_account.click(function () {
                $center_objct_visible.fadeOut().queue(function() {
                    $formulaire_div_connexion.fadeIn();
                    $formulaire_div_register.fadeIn();
                    $(this).dequeue();
                });
            }
        );

         */

    }


    /* function createAccount() {
         $("#send_register").click(function () {
                 if ($pseudo_register.val() == "" || $password_register.val() == "" || $confirm_password.val() == "") {
                     alert("Champ(s) vide(s).");
                 } else if ($password_register.val() != $confirm_password.val()) {
                     alert("Les deux mot de passe doivent être similaire");
                 } else {
                     $.ajax({
                         url: "http://fufum.alwaysdata.net/php/register.php",
                         type: "POST",
                         data: JSON.stringify({username: $pseudo_register.val(), password: $password_register.val}),
                         dataType: "json",
                         contentType: "application/json; charset=utf-8",
                     })
                         .done(function () {
                             alert("Compte crée.")
                         })
                         .fail(function (error) {
                             alert("La requête s'est terminée en échec. Infos : " + JSON.stringify(error));
                         })


                 }
             }
         );
     }
     */


    function initialization() {
        animateButton();
        animateMenu();
        //createAccount();
    }

    $(() => {
        initialization();
    })
})
();