/*============================================
=            HOME CONTROLLER SPEC            =
============================================*/

'use strict';

describe('Controller: homeController', function() {

    beforeEach(module('home.module'));

    var homeController;

    beforeEach(inject(function($controller) {
        homeController = $controller('homeController', {});
    }));

    it('Should define foo', function() {
        expect(homeController.foo).to.exist;
    });

});

