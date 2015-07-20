'use strict';

var gulp = require('gulp');

var autoprefixer = require('gulp-autoprefixer');
var babel = require('babelify');
var browserify = require('browserify');
var browserSync = require('browser-sync').create();
var buffer = require('vinyl-buffer');
var concat = require('gulp-concat');
var cssGlobbing = require('gulp-css-globbing');
var fs = require('fs');
var globby = require('globby');
var gutil = require("gulp-util");
var notify = require("gulp-notify");
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var through = require('through2');
var transform = require('vinyl-transform');
var argv = require('yargs').argv;

var setupWatchers = function() {
  gulp.watch('./public/sass/**/*.scss', ['sass']);
  gulp.watch('./public/css/vendor/*.css', ['concat-css', 'reload']);
  gulp.watch('./public/javascripts/vendor/*.js', ['concat-js', 'reload']);
//  gulp.watch('./public/javascripts/app/**/*.js', ['browserify', 'reload']);
  gulp.watch(['./public/javascripts/compiled/*.js',
              './public/javascripts/views/*.js',
              "./views/**/*.erb",
              './playground.rb'], ['reload']);
}

// This task is ready made to start using Browserify,
// but not enabled by default. Create a folder named
// app inside /public/javascripts and create a file
// named app.js inside that folder. Uncomment the watch
// line above to start compiling. Even better,
// add <% @app = true %> inside a view, and the compiled
// file will immediately be load¡ed into the view.

//gulp.task('browserify', function() {
//  var browserifyConfig = {
//    entries: './public/javascripts/app/app.js',
//    debug: true
//  };
//  var bundler = browserify(browserifyConfig).transform(babel);
//
//    bundler.bundle()
//    .on('error', function(error){
//      console.log('browserify error', error.message);
//      this.emit('end');
//    })
//    .pipe(source('app-compiled.js'))
//    .pipe(buffer())
//    .pipe(sourcemaps.init({loadMaps: true}))
//    .pipe(sourcemaps.write('./'))
//    .pipe(gulp.dest('./public/javascripts/compiled/'))
//  }
//);

gulp.task('concat-js', function() {

  return gulp.src('./public/javascripts/vendor/*.js')
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./public/javascripts/compiled/'));
});

gulp.task('concat-css', function() {

  return gulp.src('./public/css/vendor/*.css')
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('./public/css/'));
});

gulp.task('create', function() {
  if (!argv.name) {
    throw new gutil.PluginError('create', {
      message: "Name is required to create a new file",
    });
  }

  var locations = [
    {path:'./views/', ext:'.erb', text: "<% @app = false %>"},
    {path:'./public/sass/custom/_', ext:'.scss', text: "#" + argv.name + " { }"},
    {path:'./public/javascripts/views/', ext:'.js', text: "(function(){ // write some JS \n })()" } ];

  locations.forEach(function(loc) {
    var fileName = loc.path + argv.name + loc.ext;

    fs.writeFile(fileName, loc.text, function (err) {
      if (err) {
        console.log(err);
      }
      console.log('successfully created', fileName);
    });
  });
});

gulp.task('reload', function(){
  return browserSync.reload();
});

gulp.task('sass', function(){
  var cgConfig = {
    extensions: ['.css', '.scss'],
    ignoreFolders: ['lib', 'vendor']
  };
  var plumbConfig = {
    errorHandler: notify.onError(function(error) {
      console.log(error.messageFormatted);
      return error.message;
    })
  };
  var apConfig = {
    browsers: ['last 2 versions'],
    cascade: false
  };

  return gulp.src('./public/sass/application.scss')
    .pipe(cssGlobbing(cgConfig))
    .pipe(plumber(plumbConfig))
    .pipe(sass())
    .pipe(autoprefixer(apConfig))
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.stream());
});

gulp.task('init', function() {
  browserSync.init({
      proxy: 'localhost:3999',
      port: 4000,
      open: false,
      ui: {
        port: 4001
      }
  });

  setupWatchers();
});

gulp.task('default', ['concat-js', 'concat-css','init']);
