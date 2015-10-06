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
                    data.forEach(function(item) {
                        item.formattedFilename = item.filename.split('__')[0];
                        item.formattedDate = item.uploadDate.split('T')[0];
                    });
                    vm.files = data;
                });
        }

        populate();

    }

})();
