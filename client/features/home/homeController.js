/*=========================================
=            HOME CONTROLLER            =
=========================================*/

(function() {

    'use strict';

    angular.module('home.module')
        .controller('homeController', homeController);

    homeController.$inject = ['$log', '$state'];

    function homeController($log, $state) {
        var vm = this;

        vm.foo = 'something';

    }

})();
