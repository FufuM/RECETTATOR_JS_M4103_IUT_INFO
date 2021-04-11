<?php
    class User
    {
        /**
         * @var int $id User's ID
         */
        private $id;

        /**
         * @var string $username User's name
         */
        private $username;

        /**
         * @var string $password User's password
         */
        private $password;

        /**
         * Constructs a new user
         * @param int $id
         * @param string $username
         * @param string $password
         */
        public function __construct(int $id, string $username, string $password) {
            $this->id = $id;
            $this->username = $username;
            $this->password = $password;
        }

        /**
         * @return int
         */
        public function getId(): int
        {
            return $this->id;
        }

        /**
         * @return string
         */
        public function getUsername(): string
        {
            return $this->username;
        }

        /**
         * @return string
         */
        public function getPassword(): string
        {
            return $this->password;
        }
    }
?>
