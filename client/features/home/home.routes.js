/*===================================
=            HOME ROUTES            =
===================================*/

(function() {

    'use strict';

    angular
        .module('home.module')
        .config(config);

    config.$inject = ['$stateProvider'];

    function config($stateProvider) {

        $stateProvider

        .state('home', {
            url: '/home',
            templateUrl: '/templates/homeView.html',
            controller: 'homeController',
            controllerAs: 'vm'
        });

    }

})();

