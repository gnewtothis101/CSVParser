/*=================================================
=              DATATABLE CONTROLLER SPEC          =
=================================================*/
/* jshint -W117, expr: true */

describe('Controller: datatableController', function() {
    'use strict';

    var controller;
    var ds;
    var sp;
    var mockFile = [
        {},
        {},
        {}
    ];

    beforeEach(function() {
        bard.appModule('datatable.module');
        bard.inject('$controller', '$q', '$rootScope');

        ds = {
            getData: function() {
                return $q.when(mockFile.filename);
            }
        };

        sp = {
            filename: 'abc123'
        };

        controller = $controller('datatableController', {
            dataService: ds,
            $stateParams: sp
        });
    });

    describe('before activation', function() {
        describe('vm.filename: ', function() {
            it('Should have a value', function() {
                expect(controller.filename).to.exist;
            });
            it('Should equal $stateParams.filename', function() {
                expect(controller.filename).to.eql(sp.filename);
            });
        });
    });

    describe('after activation', function() {
        beforeEach(function() {
            $rootScope.$apply();
        });

        describe('vm.header', function() {
            it('should exist', function() {
                expect(controller.header).to.exist;
            });
        });

        describe('vm.data', function() {
            it('should exist', function() {
                expect(controller.data).to.exist;
            });
        });
    });
});
