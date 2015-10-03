/*=========================================
=            DATA SERVICE SPEC            =
=========================================*/
/* jshint -W117, expr: true */

describe('dataService: ', function() {
    'use strict';

    /* Mock a single user */
    /**
     *
     * MOCK USER = {
     *    username: 'mockUser1',
     *    password: 'mockUser1,'
     *    email: 'mockEmail1@mock.com'
     * }
     *
     **/

    var mockUsers = mockData.getMockUsers();
    var user = mockUsers[0];

    beforeEach(function() {
        bard.appModule('core.module');
        bard.inject('$httpBackend', '$q', 'dataService', '$rootScope');
    });

    it('Should exist', function() {
        expect(dataService).to.exist;
    });

    describe('getOneUser: ', function() {

        it('Should hit /api/user/' + user.username, function() {

            $httpBackend
                .when('GET', '/api/user/' + user.username)
                .respond(200, user);

            dataService.getOneUser(user.username)
                .then(function(data) {
                    expect(data).to.exist;
                });

            $httpBackend.flush();

        });

        it('Should report an error if server fails', function() {

            $httpBackend
                .when('GET', '/api/user/' + user.username)
                .respond(500, {
                    description: 'You fail.'
                });

            dataService.getOneUser(user.username)
                .catch(function(error) {
                    expect(error).to.match(/You fail./);
                });

            $httpBackend.flush();

        });

        it('Should return the appropriate user', function() {

            $httpBackend
                .when('GET', '/api/user/' + user.username)
                .respond(200, user);

            dataService.getOneUser(user.username)
                .then(function(data) {
                    expect(data.username).to.equal(user.username);
                });

            $httpBackend.flush();

        });

    });

    describe('postOneUser: ', function() {

        it('Should hit /api/user', function() {

            $httpBackend
                .when('POST', '/api/user')
                .respond(200, user);

            dataService.postOneUser(user)
                .then(function(data) {
                    expect(data).to.exist;
                });

            $httpBackend.flush();

        });

        it('Should report an error if server fails', function() {

            $httpBackend
                .when('POST', '/api/user')
                .respond(500, {
                    description: 'You fail.'
                });

            dataService.postOneUser(user)
                .catch(function(error) {
                    expect(error).to.match(/You fail./);
                });

            $httpBackend.flush();

        });

        it('Should post, then return the new user', function() {

            $httpBackend
                .when('POST', '/api/user')
                .respond(200, user);

            dataService.postOneUser(user)
                .then(function(data) {
                    expect(data.username).to.equal(user.username);
                });

            $httpBackend.flush();

        });

    });

    describe('updateOneUser', function() {

        var updatedUser = {
            username: 'updatedMockUser1',
            password: 'updatedMockUser1',
            email: 'updatedMockEmail1@mock.com'
        };

        it('Should hit /api/user/' + user.username, function() {

            $httpBackend
                .when('PUT', '/api/user/' + user.username)
                .respond(200, updatedUser);

            dataService.updateOneUser(user.username, updatedUser)
                .then(function(data) {
                    expect(data).to.exist;
                });

            $httpBackend.flush();

        });

        it('Should report an error if server fails', function() {

            $httpBackend
                .when('PUT', '/api/user/' + user.username)
                .respond(500, {
                    description: 'You fail.'
                });

            dataService.updateOneUser(user.username, updatedUser)
                .catch(function(error) {
                    expect(error).to.match(/You fail./);
                });

            $httpBackend.flush();

        });

        it('Should update the appropriate user', function() {

            $httpBackend
                .when('PUT', '/api/user/' + user.username)
                .respond(200, updatedUser);

            dataService.updateOneUser(user.username, updatedUser)
                .then(function(data) {
                    expect(data.username).to.equal(updatedUser.username);
                    expect(data.password).to.equal(updatedUser.password);
                    expect(data.email).to.equal(updatedUser.email);
                });
        });
    });

    describe('deleteOneUser', function() {

        it('Should hit /api/user/' + user.username, function() {

            $httpBackend
                .when('DELETE', '/api/user/' + user.username)
                .respond(200, {
                    description: 'Deleted user'
                });

            dataService.deleteOneUser(user)
                .then(function(data) {
                    expect(data).to.exist;
                });

            $httpBackend.flush();

        });

        it('Should report an error if server fails', function() {

            $httpBackend
                .when('DELETE', '/api/user/' + user.username)
                .respond(500, {
                    description: 'You fail.'
                });

            dataService.deleteOneUser(user)
                .catch(function(error) {
                    expect(error).to.match(/You fail./);
                });

            $httpBackend.flush();

        });

    });

    describe('getManyUsers', function() {

        it('Should hit /api/user', function() {

            $httpBackend
                .when('GET', '/api/user')
                .respond(200, mockUsers);

            dataService.getManyUsers()
                .then(function(data) {
                    expect(data).to.exist;
                });

            $httpBackend.flush();

        });

        it('Should report an error if server fails', function() {

            $httpBackend
                .when('GET', '/api/user')
                .respond(500, {
                    description: 'You fail.'
                });

            dataService.getManyUsers()
                .catch(function(error) {
                    expect(error).to.match(/You fail./);
                });

            $httpBackend.flush();

        });

        it('Should return an array of users in the appropriate format', function() {

            $httpBackend
                .when('GET', '/api/user')
                .respond(200, mockUsers);

            dataService.getManyUsers()
                .then(function(data) {
                    expect(data).to.be.array;
                    expect(data[0]).to.be.object;
                    expect(data[0].username).to.equal('mockUser1');
                });

            $httpBackend.flush();

        });

    });

});
