/*====================================
=            AUTH SERVICE            =
====================================*/

(function() {

    'use strict';

    angular
        .module('core.module')
        .service('authService', authService);

    authService.$inject = ['$log', '$sessionStorage', '$state', '$rootScope', 'md5', 'dataService'];

    function authService($log, $sessionStorage, $state, $rootScope, md5, dataService) {

        var $session = $sessionStorage;

        var service = {
            login: login,
            logout: logout,
            register: register,
            updatePassword: updatePassword,
            updatePasswordHelper: updatePasswordHelper
        };

        return service;

        function login(inputFromUser) {

            dataService.getOneUser(inputFromUser.username)
                .then(function(user) {
                    if (user) {
                        /* Create a hash from user's plaintext password */
                        var hashedPass = md5.createHash(inputFromUser.password);
                        /* Check hashed password against db password */
                        if (hashedPass === user.password) {
                            /* Store user info in $sessionStorage variable
                            and clear $rootScope message, then send the
                            user to their profile page */
                            $session.user = user;
                            $rootScope.message = null;
                            $state.go('userProfile', { 'username': user.username});
                        } else {
                            $rootScope.message = 'Invalid username or password';
                            window.scrollTo(0, 0);
                        }
                    } else {
                        $rootScope.message = 'Invalid username or password';
                        window.scrollTo(0, 0);
                    }
                });

        }

        function logout() {
            /* On logout unset $sessionStorage variable
            and send user to homepage */
            $session.user = null;
            $state.go('home');
        }

        function register(inputFromUser) {
            /* Create a hashed password from user's plaintext pass
            store user input into an object to send to dataService
            then send user to login page to log in */
            var hashedPass = md5.createHash(inputFromUser.password);

            var newUser = {
                username: inputFromUser.username,
                password: hashedPass,
                email: inputFromUser.email
            };

            dataService.postOneUser(newUser);

            $state.go('login');

        }

        function updatePassword(originalUser, updatedUser) {
            /* Get user from db */

            dataService.getOneUser(originalUser.username)
                .then(function(user) {
                    updatePasswordHelper(originalUser, updatedUser, user);
                });
        }

        function updatePasswordHelper(originalUser, updatedUser, returnedUser) {
            /* Check the input password against password in db*/
            if (md5.createHash(originalUser.inputPassword) === returnedUser.password) {
                /* Create hashed password from input */
                var hashedPass = md5.createHash(updatedUser.password);
                updatedUser.password = hashedPass;
                /* Update database with new password and reset $sessionStorage
                then send the user to log in with their new password */
                dataService.updateOneUser(originalUser.username, updatedUser);
                $session.user = null;
                $rootScope.message = null;
                $state.go('login');
                return true;
            } else {
                $rootScope.message = 'Invalid username or password.';
                window.scrollTo(0, 0);
                return false;
            }
        }
    }

})();
