/*=========================================
=            DATA SERVICE SPEC            =
=========================================*/
/* jshint -W117, expr: true */

describe('dataService: ', function() {
    'use strict';

    var mockFile = {
        filename: 'abc123'
    };

    beforeEach(function() {
        bard.appModule('core.module');
        bard.inject('$httpBackend', '$q', 'dataService', '$rootScope');
    });

    it('Should exist', function() {
        expect(dataService).to.exist;
    });

    describe('getOneUser: ', function() {

        it('Should hit /api/' + mockFile.filename, function() {

            $httpBackend
                .when('GET', '/api/' + mockFile.filename)
                .respond(200, mockFile);

            dataService.getData(mockFile.filename)
                .then(function(data) {
                    expect(data).to.exist;
                    expect(data).to.eql(mockFile);
                });

            $httpBackend.flush();

        });

    });

});
