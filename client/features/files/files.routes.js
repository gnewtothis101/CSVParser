/*======================================
=              FILES ROUTES            =
======================================*/

(function() {

    'use strict';

    angular
        .module('files.module')
        .config(config);

    config.$inject = ['$stateProvider'];

    function config($stateProvider) {

        $stateProvider

        .state('files', {
            url: '/files',
            templateUrl: '/templates/filesView.html',
            controller: 'filesController',
            controllerAs: 'vm'
        });

    }

})();

