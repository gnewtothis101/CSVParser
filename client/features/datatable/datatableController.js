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

        function populate() {
            dataService.getData(vm.filename)
                .then(function(data) {
                    vm.header = data.shift().header;
                    vm.data = data;
                    $log.info(vm.data);
                });
        }

        populate();

    }

})();
