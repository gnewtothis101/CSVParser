/*================================================
=              UPLOADS CONTROLLER SPEC           =
================================================*/
/* jshint -W117, expr: true */

'use strict';

describe('Controller: filesController', function() {

    var controller;
    var ds;
    var sp;
    var mockfile = {
        filename: 'abc123'
    };

    beforeEach(function() {
        bard.appModule('files.module');
        bard.inject('$controller', '$q', '$rootScope');

        ds = {
            getAllFiles: function() {
                return $q.when(mockFile.filename);
            }
        };

        sp = {
            filename: 'abc123'
        };

        controller = $controller('filesController', {
            dataService: ds,
            $stateParams: sp
        });
    });

    describe('Before activation', function() {
        describe('vm.files', function() {
            expect(controller.files).to.exist;
            expect(controller.files).to.be.empty;
        });
    });

    describe('After activation', function() {
        beforeEach(function() {
            $rootScope.$apply();
        });

        describe('vm.files', function() {
            expect(controller.files).to.exist;
            expect(controller.files).to.eql(mockfile.filename);
        });
    });
});
