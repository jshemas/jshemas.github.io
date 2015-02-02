'use strict';

module.exports = function (grunt) {
	// Project configuration.
	grunt.initConfig({
		// backend linter
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			gruntfile: {
				src: 'Gruntfile.js'
			},
			appfile: {
				src: 'app.js'
			},
			server: {
				src: ['server/*.js']
			}
		},
		// mocha tests (server)
		mochaTest: {
			testIndex: {
				options: {
					reporter: 'progress',
					bail: true
				},
				src: ['server/tests/index.spec.js']
			}
		},
		// protractor e2e tests (client)
		protractor: {
			options: {
				configFile: "node_modules/protractor/referenceConf.js",
				keepAlive: true,
				noColor: false,
				args: {}
			},
			e2e: {
				options: {
					configFile: "client/conf/e2e.conf.js",
					args: {}
				}
			}
		},
		// move files from client and into dist
		copy: {
			dist: {
				cwd: 'client/app',
				src: [ '**' ],
				dest: 'dist/app',
				expand: true
			},
		},
		// clean(deletes) the dist folder
		clean: {
			dist: {
				src: [ 'dist/app' ]
			},
			styles: {
				src: [ 'dist/app/styles/*.css', '!dist/app/styles/app.css' ]
			},
			scripts: {
				src: [ 'dist/app/scripts/*.js', '!dist/app/scripts/app.js' ]
			}
		},
		// minifies CSS
		cssmin: {
			dist: {
				files: {
					'dist/app/styles/app.css': [ 'client/app/styles/*.css' ]
				}
			}
		},
		// minifies JS
		uglify: {
			dist: {
				options: {
					mangle: false
				},
				files: {
					'dist/app/scripts/app.js': [ 'client/app/scripts/*.js' ]
				}
			}
		},
		// express deploy
		express: {
			options: {
				port: process.env.PORT || 5000
			},
			dev: {
				options: {
					script: './app.js',
					node_env: 'dev',
					nospawn: true,
					port: 5000,
					delay: 5
				}
			},
			e2eprod: {
				options: {
					script: './app.js',
					node_env: 'prod',
					nospawn: true,
					port: 8081,
					delay: 5
				}
			},
			prod: {
				options: {
					script: './app.js',
					node_env: 'prod',
					background: false,
					delay: 5
				}
			}
		},
		// build control for updating gh-pages with dist
		buildcontrol: {
			options: {
				dir: 'dist',
				commit: true,
				push: true,
				message: 'Syncing gh-pages with master.'
			},
			pages: {
				options: {
					remote: 'git@github.com:jshemas/joshshemas.com.github.io.git',
					branch: 'gh-pages'
				}
			},
		},
		// live watcher for file changes
		watch: {
			gruntfile: {
				files: 'Gruntfile.js',
				tasks: ['jshint:gruntfile']
			},
			server: {
				files: 'server/*.js',
				tasks: ['jshint:server', 'mochaTest:testIndex']
			},
			express: {
				files:  [ 'server/*.js' ],
				tasks:  [ 'express:dev' ],
				options: {
					nospawn: true
				}
			}
		}
	});
	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-protractor-runner');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-express-server');
	grunt.loadNpmTasks('grunt-build-control');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	// Tasks.
	grunt.registerTask('default', ['jshint', 'mochaTest:testIndex', 'build', 'express:e2eprod', 'protractor:e2e', 'express:e2eprod:stop', 'dev']);
	grunt.registerTask('dev', ['express:dev', 'watch']);
	grunt.registerTask('prod', ['build', 'express:prod']);
	grunt.registerTask('build', ['clean:dist', 'copy', 'cssmin', 'uglify', 'clean:styles', 'clean:scripts']);
	grunt.registerTask('push', ['build', 'buildcontrol:pages']);
	grunt.registerTask('testserver', 'run backend tests', function () {
		var tasks = ['jshint', 'mochaTest:testGen', 'watch'];
		// always use force when watching, this will rerun tests if they fail
		grunt.option('force', true);
		grunt.task.run(tasks);
	});
};