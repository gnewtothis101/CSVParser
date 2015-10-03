/*=================================================
=              DATATABLE CONTROLLER SPEC          =
=================================================*/

'use strict';

describe('Controller: datatableController', function() {

    beforeEach(module('datatable.module'));

    var datatableController;

    beforeEach(inject(function($controller) {
        datatableController = $controller('datatableController', {});
    }));

    it('Should define foo', function() {
        expect(datatableController.foo).to.exist;
    });

});

