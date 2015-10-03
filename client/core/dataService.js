/*====================================
=            DATA SERVICE            =
====================================*/

(function() {

    'use strict';

    angular
        .module('core.module')
        .service('dataService', dataService);

    dataService.$inject = ['$log', '$http', '$q'];

    function dataService($log, $http, $q) {

        var service = {
            getOneUser: getOneUser,
            updateOneUser: updateOneUser,
            postOneUser: postOneUser,
            deleteOneUser: deleteOneUser,
            getManyUsers: getManyUsers
        };

        return service;

        function getOneUser(userInput) {
            return $http.get('/api/user/' + userInput)
                .then(success)
                .catch(fail);
        }

        function postOneUser(userInput) {
            return $http.post('/api/user', userInput)
                .then(success)
                .catch(fail);
        }

        function updateOneUser(username, updatedUser) {
            return $http.put('/api/user/' + username, updatedUser)
                .then(success)
                .catch(fail);
        }

        function deleteOneUser(userInput) {
            return $http.delete('/api/user/' + userInput.username, userInput)
                .then(success)
                .catch(fail);
        }

        function getManyUsers() {
            return $http.get('/api/user')
                .then(success)
                .catch(fail);
        }

        /* General purpose pass/fail functions for api calls */
        function success(response) {
            return response.data;
        }

        function fail(error) {
            var msg = 'Query for user(s) failed. ' + error.data.description;
            $log.error(msg);
            return $q.reject(msg);
        }

    }

})();
