<?php
    //use mysqli
    include 'User.php';


    class DatabaseAccess {
        /**
         * @var mysqli $mysqli A mysqli connection to the database.
         */
        private $mysqli;

        /**
         * AuthDB constructor. Connects AuthDB to the database
         */
        public function __construct() {
            //Connection to the database
            $this->mysqli = new mysqli('mysql-fufum.alwaysdata.net', 'fufum', 'mdp_admin', 'fufum_recettator');

            if ($this->mysqli->connect_errno) {
                error_log('Connection error with mysqli (file: DatabaseAccess.php)', 3, 'logs');
            }
        }

        /**
         * Create a new user in the database.
         * @param string $username Username of the new user
         * @param string $password Hashed password of the new user
         */
        public function registerUser(string $username, string $password) {
            $prepared_query = $this->mysqli->prepare('INSERT INTO USERS (username, password) VALUES (?, ?)');
            $prepared_query->bind_param('ss', $username, $password);

            if(!$prepared_query->execute()) {
                error_log("Error adding a new user (file: DatabaseAccess.php)", 3, "logs");
            }

        }

        public function getUserById(int $id): User {
            $prepared_query = $this->mysqli->prepare('SELECT * FROM USERS WHERE user_Id = ?');
            $prepared_query->bind_param('i', $id);
            if(!$prepared_query->execute()) {
                error_log("Error requesting a user from id (file: DatabaseAccess.php)", 3, "logs");
            }
            $result = $prepared_query->get_result();
            $user_data = $result->fetch_array(MYSQLI_ASSOC);
            return new User($user_data['user_Id'], $user_data['username'], $user_data['password']);
        }

        public function getUsersByUsername(string $username): ?array {
            $prepared_query = $this->mysqli->prepare('SELECT * FROM USERS WHERE username = ?');
            $prepared_query->bind_param('s', $username);
            if(!$prepared_query->execute()) {
                error_log("Error requesting users from username (file: DatabaseAccess.php)", 3, "logs");
            }
            $result = $prepared_query->get_result();
            while ($user_data = $result->fetch_array(MYSQLI_ASSOC)) {
                $users_array[] = new User($user_data['user_Id'], $user_data['username'], $user_data['password']);
            }
            if (isset($users_array)) {
                return $users_array;
            }
            return null;
        }
        public function getRecipesList(){
            $testarray = array();
            $prepared_query = $this->mysqli->prepare('SELECT * FROM RECIPES');
            $prepared_query->execute(); // exécute la requête
            $result = $prepared_query->get_result(); // stocke le résultat de la requête
            if (!$result) {
                //todo : gérer erreur
            } else {
                while($row = $result->fetch_array(MYSQLI_ASSOC)){
                    $testarray[] = $row;
                }
                return $testarray; //envoie un objet json représentant la liste
            }
            return null; //retournera null en cas de problème
        }

        public function getLoggedInUser(): ?User {
            if(!is_int($_SESSION['current_user'])) {
                //no one is logged in
                return null;
            }

            try {
                return $this->getUserById($_SESSION['current_user']);
            } catch(Exception $e) {
                // Stored logged in user is invalid, fix this
                unset($_SESSION['current_user']);
                return null;
            }
        }

        public function addRecipe($name, $difficulty, $time){
            $prepared_query = $this->mysqli->prepare('INSERT INTO RECIPES (recipe_name, recipe_difficulty, recipe_time) VALUES (?, ?, ?)');
            $prepared_query->bind_param('sss', $name, $difficulty, $time);
            $prepared_query->execute();
            return true;
        }
        /**
         * AuthDB destructor. Closes the mysqli connection to the database.
         */
        public function __destruct(){
            $this->mysqli->close();
        }
    }
?>