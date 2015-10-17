(function() {
    'use strict';
}());

var request = require('request');

module.exports = function(grunt) {

    /* Displays time elapsed */
    require('time-grunt')(grunt);

    /* Load all grunt tasks */
    require('load-grunt-tasks')(grunt);

    var reloadPort = 35729,
        files;

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        develop: {
            server: {
                file: 'app.js'
            }
        },

        sass: {
            dist: {
                files: {
                    'client/css/style.css': 'client/css/main.scss'
                }
            }
        },

        watch: {
            options: {
                nospawn: true,
                livereload: reloadPort
            },
            js: {
                files: [
                    'app.js',
                    'server/**/*.js',
                    'client/**/*.js',
                ],
                tasks: ['develop', 'delayed-livereload']
            },
            css: {
                files: [
                    'client/css/*.scss'
                ],
                tasks: ['sass'],
                options: {
                    livereload: reloadPort
                }
            },
            views: {
                files: [
                    'server/views/*.handlebars',
                    'server/views/**/*.handlebars'
                ],
                options: {
                    livereload: reloadPort
                }
            }
        },

        // babel: {
        //     options: {
        //         sourceMap: true
        //     },
        //     dist: {
        //         files: {
        //             /* destination */ : /* source */
        //         }
        //     }
        // },

        karma: {
            server: {
                configFile: 'test/karma.conf.js',
                singleRun: false,
                autoWatch: true
            }
        },

        clean: {
            dist: {
                src: ['dist']
            },
            tmp: {
                src: ['.tmp']
            }
        },

        copy: {
            index: {
                src: 'client/index.html',
                dest: 'dist/client/index.html'
            },
            img: {
                src: '/client/img/*',
                dest: 'dist/client/img/'
            },
            templates: {
                expand: true,
                src: 'client/templates/**',
                dest: 'dist/'
            },
            upload: {
                src: 'upload/',
                dest: 'dist/'
            },
            server: {
                expand: true,
                src: 'server/**',
                dest: 'dist/'
            },
            env: {
                src: 'env.js',
                dest:'dist/'
            },
            procfile: {
                src: 'Procfile',
                dest: 'dist/'
            },
            app: {
                src: 'app.js',
                dest: 'dist/app.js'
            },
            pkg: {
                src: 'package.json',
                dest: 'dist/package.json'
            },
            bower: {
                src: 'bower.json',
                dest: 'dist/bower.json'
            },
            favicon: {
                src: 'client/favicon.ico',
                dest: 'dist/client/favicon.ico'
            }
        },

        useminPrepare: {
            html: 'client/index.html',
            options: {
                dest: 'dist/client'
            }
        },

        usemin: {
            html: ['dist/client/index.html']
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true
                },
                files: {
                    'dist/client/index.html': 'dist/client/index.html',
                    'dist/client/templates/homeView.html': 'dist/client/templates/homeView.html',
                    'dist/client/templates/datatableView.html': 'dist/client/templates/datatableView.html',
                    'dist/client/templates/filesView.html': 'dist/client/templates/filesView.html'
                }
            }
        },

        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'client/img',
                    src: '{,*/}*.{gif,jpeg,jpg,png}',
                    dest: 'dist/client/img'
                }]
            }
        },

    });

    grunt.config.requires('watch.js.files');
    files = grunt.config('watch.js.files');
    files = grunt.file.expand(files);

    grunt.registerTask('delayed-livereload', 'Live reload after the node server has restarted.', function() {
        var done = this.async();
        setTimeout(function() {
            request.get('http://localhost:' + reloadPort + '/changed?files=' + files.join(','), function(err, res) {
                var reloaded = !err && res.statusCode === 200;
                if (reloaded)
                    grunt.log.ok('Delayed live reload successful.');
                else
                    grunt.log.error('Unable to make a delayed live reload.');
                done(reloaded);
            });
        }, 500);
    });

    grunt.registerTask('build', [

        // CLEAN:DIST NOT WORKING FOR SOME CRAZY REASON.
        // 'clean:dist',
        'copy:index',
        'copy:templates',
        'copy:server',
        'copy:favicon',
        'copy:pkg',
        'copy:bower',
        'copy:env',
        'copy:upload',
        'copy:procfile',
        'copy:app',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'usemin',
        'htmlmin',
        'imagemin:dist',
        'clean:tmp'
    ]);

    grunt.registerTask('test', [
        'karma'
    ]);

    grunt.registerTask('default', [
        'sass',
        'develop',
        'watch'
    ]);
};
