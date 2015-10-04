/*===========================================
=               FILES CONTROLLER            =
===========================================*/

(function() {

    'use strict';

    angular.module('files.module')
        .controller('filesController', filesController);

    filesController.$inject = ['$log', '$state'];

    function filesController($log, $state) {
        var vm = this;

        vm.foo = 'something';

    }

})();
