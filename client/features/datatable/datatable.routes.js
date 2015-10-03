/*========================================
=              DATATABLE ROUTES          =
========================================*/

(function() {

    'use strict';

    angular
        .module('datatable.module')
        .config(config);

    config.$inject = ['$stateProvider'];

    function config($stateProvider) {

        $stateProvider

        .state('datatable', {
            url: '/datatable/:filename',
            templateUrl: '/templates/datatableView.html',
            controller: 'datatableController',
            controllerAs: 'vm'
        });

    }

})();

