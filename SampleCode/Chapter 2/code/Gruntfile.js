'use strict';

// Wrapper function.
module.exports = function(grunt) {

  // Project and task configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Configuring the `connect` task from `grunt-contrib-connect`
    connect: {
      // Task options, overrides built-in defaults
      options: {
        port: 9000,
        open: true,
        livereload: 35729,
        hostname: 'localhost'
      },
      // Arbitrarily named target
      development: {
        // Target options, overrides task options
        options: {
          middleware: function(connect) {
            return [
              connect.static('app')
            ];
          }
        }
      }
    },

    // Configuring the `less` task from `grunt-contrib-less`
    less: {
      development: {
        files: {
          'app/main.css': 'app/main.less'
        }
      }
    },

    // Configuring the `jshint` task from `grunt-contrib-jshint`
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'app/*.js'
      ]
    },

    // Configuring the `watch` task from `grunt-contrib-watch`
    watch: {
      options: {
        livereload: '<%= connect.options.livereload %>',
      },
      js: {
        files: ['app/*.js'],
        tasks: ['jshint']
      },
      styles: {
        files: ['app/*.less'],
        tasks: ['less']
      },
      html: {
        files: ['app/*.html']
      }
    }
  });

  // Load the our desired plugins which provide specific tasks.
  require('load-grunt-tasks')(grunt);

  // Default task.
  grunt.registerTask('default', ['connect:development', 'watch']);

  // Custom task.
  grunt.registerTask('myTask', 'My custom task', function(one, two) {
    // Force task to run in async mode and save handle for completion callback
    var done = this.async();

    setTimeout(function() {
      // Access task name and arguments
      grunt.log.writeln(this.name, one, two);

      // Fail if properties don't exist
      grunt.config.requires('connect.options.livereload');

      // Access configuration properties
      grunt.log.writeln('The livereload port is ' + grunt.config('connect.options.livereload'));

      // Succeed asynchronously
      done();

      // Run other tasks
      grunt.task.run('default');
    }.bind(this), 1000);
  });

};
