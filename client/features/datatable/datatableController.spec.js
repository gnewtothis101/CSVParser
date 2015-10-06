/*=================================================
=              DATATABLE CONTROLLER SPEC          =
=================================================*/
/* jshint -W117, expr: true */

describe('Controller: datatableController', function() {
    'use strict';

    var controller;
    var ds;
    var sp;
    var mockfile = [{
            header: 'mock1'
        },
        'mock2'
    ];

    beforeEach(function() {
        bard.appModule('datatable.module');
        bard.inject('$controller', '$q', '$rootScope');

        ds = {
            getCSV: function() {
                return $q.when(mockfile);
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
        describe('vm.sort', function() {
            it('Should exist', function() {
                expect(controller.sort).to.exist;
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
