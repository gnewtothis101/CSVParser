/*================================================
=              UPLOADS CONTROLLER SPEC           =
================================================*/

'use strict';

describe('Controller: filesController', function() {

    beforeEach(module('home.module'));

    var filesController;

    beforeEach(inject(function($controller) {
        filesController = $controller('filesController', {});
    }));

    it('Should define foo', function() {
        expect(filesController.foo).to.exist;
    });

});

