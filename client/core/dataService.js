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
            getCSV: getCSV,
            getAllFiles: getAllFiles
        };

        return service;

        // Get request for single CSV file
        function getCSV(filename) {
            return $http.get('/api/' + filename)
                .then(success)
                .catch(fail);
        }

        // Get request for all files
        function getAllFiles() {
            return $http.get('/api/upload')
                .then(success)
                .catch(fail);
        }

        // General purpose pass/fail responses
        function success(response) {
            return response.data;
        }

        function fail(error) {
            var msg = 'Query failed. ' + error.data.description;
            $log.error(msg);
            return $q.reject(msg);
        }

    }

})();
