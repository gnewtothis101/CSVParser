/*======================================
=            CLIENT ROUTING            =
======================================*/

(function() {

    'use strict';

    angular
        .module('CSVParser')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/home');

    }

})();
