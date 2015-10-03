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
            getData: getData
        };

        return service;

        function getData(filename) {
            return $http.get('/api/' + filename)
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
