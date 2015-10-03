/*===========================================
=             DATATABLE CONTROLLER          =
===========================================*/

(function() {

    'use strict';

    angular.module('datatable.module')
        .controller('datatableController', datatableController);

    datatableController.$inject = ['$log', '$state', '$stateParams'];

    function datatableController($log, $state, $stateParams) {
        var vm = this;

        vm.foo = 'something';

        vm.filename = $stateParams.filename;

    }

})();
