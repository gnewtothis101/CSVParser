/*=========================================
=            AUTH SERVICE SPEC            =
=========================================*/
/* jshint -W117, expr: true */

describe('authService: ', function() {
    'use strict';

    /* Mock a single user */
    /**
     *
     * MOCK USER = {
     *    username: 'mockUser1',
     *    password: '91af89a5be8d184e107302a0f10818c8,' // mockUser1
     *    email: 'mockEmail1@mock.com'
     * }
     *
     **/
    var mockUsers = mockData.getMockUsers();
    var user = mockUsers[0];

    var $session;

    /* Mock out user input */
    var userInput;
    var originalUser;
    var updatedUser;
    var invalidUser;

    beforeEach(function() {
        module('core.module', bard.fakeStateProvider);
        bard.inject('$httpBackend', '$state', '$q', 'authService', '$rootScope', '$sessionStorage', 'dataService', 'md5');
        $rootScope.$apply();
        $state.go = sinon.spy();
        $session = $sessionStorage;

        userInput = {
            username: 'mockUser1',
            password: 'mockUser1',
            email: 'mockEmail1@mock.com'
        };

        originalUser = {
            username: 'mockUser1',
            password: 'mockUser1',
            inputPassword: 'mockUser1',
            email: 'mockEmail1@mock.com'
        };

        updatedUser = {
            username: 'mockUser1',
            password: 'updatedMockUser1',
            email: 'mockEmail1@mock.com'
        };

        invalidUser = {
            username: 'mockUser1',
            password: 'invalidPassword',
            email: 'mockEmail1@mock.com'
        };
    });

    it('Should exist', function() {
        expect(authService).to.exist;
    });

    describe('login', function() {
        it('Should exist', function() {
            expect(authService.login).to.exist;
        });

        it('Should set $session variable to user and redirect', function() {
            $httpBackend
                .when('GET', '/api/user/' + user.username)
                .respond(200, user);

            expect($session.user).to.be.undefined;

            authService.login(userInput);

            $httpBackend.flush();

            expect($state.go).to.be.called;

            expect($session.user.username).to.equal('mockUser1');
        });

        it('Should set $rootScope message on invalid password', function() {
            $httpBackend
                .when('GET', '/api/user/' + user.username)
                .respond(200, user);

            expect($rootScope.message).to.be.undefined;

            authService.login(invalidUser);

            $httpBackend.flush();

            expect($rootScope.message).to.match(/Invalid username or password/);
        });
    });

    describe('logout', function() {
        it('Should exist', function() {
            expect(authService.logout).to.exist;
        });
        it('Should clear out $session.user and redirect', function() {
            $httpBackend
                .when('GET', '/api/user/' + user.username)
                .respond(200, user);

            authService.login(userInput);

            $httpBackend.flush();

            expect($session.user.username).to.equal('mockUser1');

            authService.logout();

            expect($session.user).to.equal(null);
            expect($state.go).to.be.called;
        });
    });

    describe('register', function() {
        it('Should exist', function() {
            expect(authService.register).to.exist;
        });
        it('Should hash the user password', function() {
            var createHash = sinon.spy(md5, 'createHash');
            var postOneUser = sinon.spy(dataService, 'postOneUser');
            authService.register(userInput);

            /* Compare the return of md5.createHash with the already-hashed
            password from the mock user */
            expect(createHash.returnValues[0]).to.equal(user.password);
            expect(createHash.called).to.equal(true);
        });

        it('Should save the user to the database', function() {
            var postOneUser = sinon.spy(dataService, 'postOneUser');
            authService.register(userInput);
            expect(postOneUser.called).to.equal(true);
        });

        it('Should redirect', function() {
            authService.register(userInput);
            expect($state.go).to.be.called;
        });
    });

    describe('updatePassword', function() {
        it('Should exist', function() {
            expect(authService.updatePassword).to.exist;
        });
        it('Should call the getOneUser method', function() {
            var getOneUser = sinon.spy(dataService, 'getOneUser');

            authService.updatePassword(originalUser, updatedUser);

            expect(getOneUser.called).to.equal(true);
        });

        it('Should call dataService.updateOneUser if passwords match', function() {
            var updateOneUser = sinon.spy(dataService, 'updateOneUser');

            authService.updatePasswordHelper(originalUser, updatedUser, user);

            expect(updateOneUser.called).to.equal(true);
        });

        it('Should set $session.user to null', function() {
            $session.user = user;

            authService.updatePasswordHelper(originalUser, updatedUser, user);

            expect($session.user).to.equal(null);
        });

        it('Should set $rootScope.message to null', function() {
            $rootScope.message = 'Something!';

            authService.updatePasswordHelper(originalUser, updatedUser, user);

            expect($rootScope.message).to.equal(null);
        });

        it('Should set $rootScope.message with approprate message', function() {
            $rootScope.message = null;

            authService.updatePasswordHelper(originalUser, updatedUser, invalidUser);

            expect($rootScope.message).to.match(/Invalid username or password/);
        });

        it('Should redirect to login page', function() {
            authService.updatePasswordHelper(originalUser, updatedUser, user);

            expect($state.go).to.be.called;
        });
    });
});
