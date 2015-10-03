/*=================================================
=              DATATABLE CONTROLLER SPEC          =
=================================================*/
/* jshint -W117, expr: true */

'use strict';

var controller;
var mockFile = {
    filename: 'abc123'
};

describe('Controller: datatableController', function() {

    beforeEach(function() {
        bard.appModule('datatable.module');
        bard.inject('$controller', '$q', '$rootScope');

        var datatableController;
        var ds = {
            getData: function() {
                $q.when(mockFile.filename);
            }
        };
        var sp = {
            filename: 'abc123'
        };

        controller = $controller('datatableController', {
            dataService: ds,
            $stateParams: sp
        });
    });

    describe('vm.filename: ', function() {
        it('Should have a value', function() {
            expect(controller.filename).to.exist;
        });
    });


});
