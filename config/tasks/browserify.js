var gulp = require('gulp');

var babel = require('babelify');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var transform = require('vinyl-transform');

// This task is ready made to start using Browserify,
// but not enabled by default. Create a folder named
// app inside /public/javascripts and create a file
// named app.js inside that folder. Uncomment the watch
// line above to start compiling. Even better,
// add <% @app = true %> inside a view, and the compiled
// file will immediately be load¡ed into the view.

gulp.task('browserify', function() {
  var browserifyConfig = {
    entries: './public/javascripts/app/app.js',
    debug: true,
    xip: true
  };
  var bundler = browserify(browserifyConfig).transform(babel);

    bundler.bundle()
    .on('error', function(error){
      console.log('browserify error', error.message);
      this.emit('end');
    })
    .pipe(source('app-compiled.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./public/javascripts/compiled/'))
  }
);
