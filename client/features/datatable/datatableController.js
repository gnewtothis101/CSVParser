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

        vm.sort = function(keyname) {
            vm.sortKey = keyname;
            vm.reverse = !vm.reverse;
        };

        vm.sortNumber = function(keyname) {
            vm.sortKey = '\u0022' + keyname + '\u0022';
            vm.reverse = !vm.reverse;
        };

        function populate() {
            dataService.getCSV(vm.filename)
                .then(function(data) {
                    vm.header = data.shift().header;
                    vm.data = data;
                    $log.info(vm.data);
                });
        }

        populate();

    }

})();
