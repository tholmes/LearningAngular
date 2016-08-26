'use strict';

var gulp = require('gulp');
var nopt = require('nopt');
var Q = require('q');

// Load plugins
var $ = require('gulp-load-plugins')();

// Set up parsing of CLI arguments
var knownOpts = {
  'one': String,
  'two': String
};
var shorthands = {
  'o': ['--one', 'Hello'],
  't': ['--two', 'World']
};
var options = nopt(knownOpts, shorthands);

// `connect` task for starting web server
gulp.task('connect', function () {
  var connect = require('connect');
  var app = connect()
    .use(require('connect-livereload')({ port: 35729 }))
    .use(connect.static('app'))
    .use(connect.directory('app'));

  require('http').createServer(app)
    .listen(9000)
    .on('listening', function () {
      console.log('Started connect web server on http://localhost:9000');
    });
});

// `less` task for compiling styles
gulp.task('less', function () {
  return gulp.src('app/*.less')
    .pipe($.less({ paths: 'app' }))
    .pipe(gulp.dest('app'));
});

// `jshint` task for linting JS files
gulp.task('jshint', function () {
  return gulp.src('app/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter(require('jshint-stylish')));
});

// `watch` task for responding to file modifications
gulp.task('watch', function () {
  // Start a livereload server on default port 35729
  $.livereload.listen();

  // Watch for changes and notify LR server
  gulp.watch([
    'app/*.html',
    'app/*.css',
    'app/*.js'
  ]).on('change', function (file) {
    $.livereload.changed(file.path);
  });

  // Run gulp tasks on specified file changes
  gulp.watch('app/*.js', ['jshint']);
  gulp.watch('app/*.less', ['less']);
});

// Default task - run with `gulp`
gulp.task('default', ['connect', 'watch'], function () {
  require('opn')('http://localhost:9000');
});

// Custom task
gulp.task('myTask', function () {
  var deferred = Q.defer();

  setTimeout(function() {
    // Fail if CLI arguments don't exist
    if (!options.one || !options.two) {
      deferred.reject('Error: Please specify the --one and --two flags.');
    } else {
      // Access CLI arguments
      console.log(options.one + ' ' + options.two);

      // Succeed asynchronously
      deferred.resolve();
    }
  }, 1000);

  return deferred.promise;
});
