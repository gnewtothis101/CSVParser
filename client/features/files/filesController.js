/*===========================================
=               FILES CONTROLLER            =
===========================================*/

(function() {

    'use strict';

    angular.module('files.module')
        .controller('filesController', filesController);

    filesController.$inject = ['$log', '$state', 'dataService'];

    function filesController($log, $state, dataService) {
        var vm = this;

        vm.foo = 'something';
        vm.files;

        function populate() {
            dataService.getAllFiles()
                .then(function(data) {
                    vm.files = data;
                });
        }

        populate();

    }

})();
