// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2015-07-16 using
// generator-karma 1.0.0

module.exports = function(config) {
    'use strict';

    config.set({
        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // base path, that will be used to resolve files and exclude
        basePath: '../',

        // testing framework to use (jasmine/mocha/qunit/...)
        // as well as any additional frameworks (requirejs/chai/sinon/...)
        frameworks: [
            'mocha',
            'chai',
            'sinon',
            'sinon-chai'
        ],

        // list of files / patterns to load in the browser
        files: [

            // Dependencies
            'client/bower_components/angular/angular.js',
            'client/bower_components/angular-mocks/angular-mocks.js',
            'client/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
            'client/bower_components/angular-resource/angular-resource.js',
            'client/bower_components/angular-ui-router/release/angular-ui-router.js',
            'client/bower_components/angular-md5/angular-md5.min.js',
            'client/bower_components/ngstorage/ngStorage.min.js',
            'node_modules/sinon-chai/lib/sinon-chai.js',
            'client/bower_components/bardjs/dist/bard.js',

            // App module
            'client/app.module.js',
            'client/app.routes.js',

            // Core module
            'client/core/core.module.js',
            'client/core/dataService.js',
            'client/core/dataService.spec.js',

            // Home module
            'client/features/home/home.module.js',
            'client/features/home/home.routes.js',
            'client/features/home/homeController.js',
            'client/features/home/homeController.spec.js',

            // Datatable module
            'client/features/datatable/datatable.module.js',
            'client/features/datatable/datatable.routes.js',
            'client/features/datatable/datatableController.js',
            'client/features/datatable/datatableController.spec.js'

        ],

        // list of files / patterns to exclude
        exclude: [],

        // web server port
        port: 8080,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: [
            'PhantomJS'
        ],

        // Which plugins to enable
        plugins: [
            'karma-phantomjs-launcher',
            'karma-chrome-launcher',
            'karma-mocha',
            'karma-chai',
            'karma-sinon',
            'karma-sinon-chai'
        ],

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false,

        colors: true,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,

        // Uncomment the following lines if you are using grunt's server to run the tests
        // proxies: {
        //     '/': 'http://localhost:9000/'
        // },

        // URL root prevent conflicts with the site root
        // urlRoot: '_karma_'
    });
};
