/*============================================
=            HOME CONTROLLER SPEC            =
============================================*/

'use strict';

describe('Controller: uploadController', function() {

    beforeEach(module('home.module'));

    var uploadController;

    beforeEach(inject(function($controller) {
        uploadController = $controller('uploadController', {});
    }));

    it('Should define foo', function() {
        expect(uploadController.foo).to.exist;
    });

});

