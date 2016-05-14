module.exports = function(grunt) {

	var globalConfig = {
		src: 'app/web',
		dist: 'c3web-server/src/main/resources/dist',
		scalaResources: 'c3web-server/target/scala-2.10/classes/dist'
	};

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		globalConfig: globalConfig,

		jshint: {
			dev: {        
				src: [
					'<%= globalConfig.src %>/scripts/**/*.js',
					// '<%= globalConfig.src %>/styles/**/*.css'
				]
			}
		},

		jsbeautifier: {
			dev: {
				src: [
					'<%= globalConfig.src %>/scripts/**/*.js',
					'<%= globalConfig.src %>/styles/**/*.css',
					'<%= globalConfig.src %>/scripts/**/*.html'
				]
			},
			prod: {
				src: [
					'<%= globalConfig.src %>/scripts/**/*.js',
					'<%= globalConfig.src %>/styles/**/*.css',
					'<%= globalConfig.src %>/scripts/**/*.html'
				],
				options: {
					mode:"VERIFY_ONLY"
				}
			}
		},

		wiredep: {
			dev: {
			    src: [
			      '<%= globalConfig.dist %>/index.html'
			    ],
			    directory: '<%= globalConfig.dist %>/bower_components'
		  	}
		},

		htmlbuild: {
			dev: {
				src: '<%= globalConfig.dist %>/index.html',
		        dest: '<%= globalConfig.dist %>',
		        options: {
		        	logOptionals: true,
		        	beautify: true,
		        	scripts: {
		        		app: {
		        			cwd: '<%= globalConfig.dist %>',
		        			files: [
                                'scripts/annotation/stemmers.js',
                                'scripts/annotation/annotation-functions.js',
		        				'scripts/services/**/*.js',
                                'scripts/filters/**/*.js',
                                'scripts/directives/**/*.js',
		        				'scripts/controllers/**/*.js'
		        			]
		        		},
		        		setup: {
							cwd: '<%= globalConfig.dist %>',
		        			files: ['scripts/setup.js', 'scripts/app.js']
		        		},
		        		vendor: {
		        			files: '!*'
		        		}
		        	},
		        	styles: {
		        		app: {
		        			cwd: '<%= globalConfig.dist %>',
		        			files: 'styles/**/*.css'
		        		}
		        	}
		        }	
			},
	        prod: {
	        	src: '<%= globalConfig.dist %>/index.html',
		        dest: '<%= globalConfig.dist %>',
		        options: {
		        	beautify: true,
		        	scripts: {
		        		app: {
		        			cwd: '<%= globalConfig.dist %>',
		        			files: [
                                'scripts/annotation.min.js',
		        				'scripts/services.min.js',
                                'scripts/filters.min.js',
		        				'scripts/controllers.min.js',
		        				'scripts/directives.min.js'
		        			]
		        		},
		        		setup: {
		        			cwd: '<%= globalConfig.dist %>',
		        			files: 'scripts/config.min.js'	
		        		}
		        	},
		        	styles: {
		        		app: {
		        			cwd: '<%= globalConfig.dist %>',
		        			files: 'styles/**/*.css'
		        		}
		        	}
		        }
	        }
    	},

        karma: {
            unit: {
                configFile: 'app/test/karma.conf.js'
            }
        },

		copy: {
		  	dev: {
		    	files: [
		    		{ 
		    			expand: true, 
		    			src: [
		    				'**'
		    			], 
		    			cwd: '<%= globalConfig.src %>',
		    			dest: '<%= globalConfig.dist %>'
		    		}, { 
		    			expand: true, 
		    			src: [
		    				'**'
		    			], 
		    			cwd: '<%= globalConfig.src %>',
		    			dest: '<%= globalConfig.scalaResources %>'
		    		}
		    	]
		  	},
            scalaRes: {
                files: [
                    {
                        expand: true,
                        src: [
                            '**'
                        ],
                        cwd: '<%= globalConfig.dist %>',
                        dest: '<%= globalConfig.scalaResources %>'
                    }
                ]   
            },
		  	prod: {
		  		files: [{ 
		    			expand: true, 
		    			src: [
		    				'bower_components/**/*',
		    				'index.html',
		    				'views/**/*'
		    			], 
		    			cwd: '<%= globalConfig.src %>',
		    			dest: '<%= globalConfig.dist %>'
		    		}, { 
		    			expand: true, 
		    			src: [
		    				'bower_components/**/*',
		    				'index.html',
		    				'views/**/*'
		    			], 
		    			cwd: '<%= globalConfig.src %>',
		    			dest: '<%= globalConfig.scalaResources %>'
		    		}
		    	]	
		  	}
		},

		concat: {
			prod: {
				files : {
					'<%= globalConfig.dist %>/scripts/config.min.js': [
							'<%= globalConfig.dist %>/temp/scripts/setup.js',
							'<%= globalConfig.dist %>/temp/scripts/app.js'
						],
                    '<%= globalConfig.dist %>/scripts/annotation.min.js':
                        ['<%= globalConfig.dist %>/temp/scripts/annotation/**/*.js'],
					'<%= globalConfig.dist %>/scripts/services.min.js': 
						['<%= globalConfig.dist %>/temp/scripts/services/**/*.js'],
                    '<%= globalConfig.dist %>/scripts/filters.min.js':
                        ['<%= globalConfig.dist %>/temp/scripts/filters/**/*.js'],
					'<%= globalConfig.dist %>/scripts/controllers.min.js': 
						['<%= globalConfig.dist %>/temp/scripts/controllers/**/*.js'],
					'<%= globalConfig.dist %>/scripts/directives.min.js': 
						['<%= globalConfig.dist %>/temp/scripts/directives/**/*.js']
				}
			}
		},

		cssmin: {
			prod: {
				files: [{
					expand: true,
					cwd: '<%= globalConfig.src %>',
					src: 'styles/**/*.css',
					dest: '<%= globalConfig.dist %>'
				}]
			}
		},

		clean: {
			prod: ['<%= globalConfig.dist %>/temp'],
			all: ['<%= globalConfig.dist %>']
		},

		uglify: {
			prod: {
				files: [{
					expand: true,
			        cwd: '<%= globalConfig.src %>',
			        src: 'scripts/*.js',
			        dest: '<%= globalConfig.dist%>/temp'
				}, {
					expand: true,
			        cwd: '<%= globalConfig.src %>',
			        src: 'scripts/controllers/**/*.js',
			        dest: '<%= globalConfig.dist%>/temp'
				}, {
                    expand: true,
                    cwd: '<%= globalConfig.src %>',
                    src: 'scripts/filters/**/*.js',
                    dest: '<%= globalConfig.dist%>/temp'
                }, {
					expand: true,
			        cwd: '<%= globalConfig.src %>',
			        src: 'scripts/services/**/*.js',
			        dest: '<%= globalConfig.dist%>/temp'
				}, {
					expand: true,
			        cwd: '<%= globalConfig.src %>',
			        src: 'scripts/directives/**/*.js',
			        dest: '<%= globalConfig.dist%>/temp'
				}, {
                    expand: true,
                    cwd: '<%= globalConfig.src %>',
                    src: 'scripts/annotation/**/*.js',
                    dest: '<%= globalConfig.dist%>/temp'
                }]
			}
		},

        watch: {
            all: {
                tasks: ['build:dev'],
                //autoreload all html files
                files: '<%= globalConfig.src %>/**/*.html',
                options: {
                    livereload: true
                }
            }
        },

        connect: {
            server: {
                options: {
                    port: 3000,
                    hostname: 'localhost',
                    middleware: function (connect, options) {
                        var middlewares = [];

                        if (!Array.isArray(options.base)) {
                            options.base = [options.base];
                        }

                        // Setup the proxy
                        middlewares.push(require('grunt-connect-proxy/lib/utils').proxyRequest);

                        // Serve static files
                        options.base.forEach(function (base) {
                            middlewares.push(connect.static(base));
                        });

                        return middlewares;
                    }
                },
                proxies: [
                    {
                        context: '/api',
                        host: 'localhost',
                        port: 9000,
                        https: false,
                        xforward: false,
                        hideHeaders: ['x-removed-header']
                    }
                ]
            }
        }
	});

    // task setup 
    grunt.registerTask('default', []);

    grunt.registerTask('build', 'Build project', function (arg){
    	if(arg === 'dev'){
    		grunt.task.run([
    			'jshint:dev',
    			'jsbeautifier:dev',
    			'clean:all',
    			'copy:dev',
    			'wiredep:dev',
    			'htmlbuild:dev',
                'copy:scalaRes'
    		]);
    	} else if (arg === 'prod') {
    		grunt.task.run([
    			'clean:all',
    			'copy:prod',
    			'cssmin:prod',
    			'uglify:prod',
    			'concat:prod',
    			'clean:prod',
    			'wiredep:dev', // use usemin instead
    			'htmlbuild:prod'
    		]);
    	} else {
    		grunt.log.error('Argument ' + arg + ' is not defined');
    	}
    });

    grunt.registerTask('serve', 'Run dev proxy server', function () {
        //grunt.log.info('Serve is starting');
        grunt.task.run([
            'build:dev',
            'configureProxies:server',
            'watch'
        ]);
    })
};
