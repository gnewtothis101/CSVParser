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

        // Where the files will go!
        vm.files;

        function populate() {
            dataService.getAllFiles()
                .then(function(data) {
                    data.forEach(function(item) {

                        // Attaches filename and date for display in the header
                        item.formattedFilename = item.filename.split('__')[0];
                        item.formattedDate = item.uploadDate.split('T')[0];
                    });
                    vm.files = data;
                });
        }

        populate();

    }

})();
