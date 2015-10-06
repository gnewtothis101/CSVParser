/*===========================================
=             DATATABLE CONTROLLER          =
===========================================*/

(function() {

    'use strict';

    angular.module('datatable.module')
        .controller('datatableController', datatableController);

    datatableController.$inject = ['$log', '$state', '$stateParams', 'dataService'];

    function datatableController($log, $state, $stateParams, dataService) {
        var vm = this;

        vm.filename = $stateParams.filename;

        // Sorts based on the key passed in as an argument.
        // The '\u0022' bit is to allow whitespace in the name of an argument.
        vm.sort = function(keyname) {
            vm.sortKey = '\u0022' + keyname + '\u0022';
            vm.reverse = !vm.reverse;
        };


        // Retrieves data, the first item in the data array is always the header.
        // Header item is removed from data object and put into vm.header leaving
        // just data rows in vm.data.
        function populate() {
            dataService.getCSV(vm.filename)
                .then(function(data) {
                    vm.header = data.shift().header;
                    vm.data = data;
                });
        }

        populate();

    }

})();
