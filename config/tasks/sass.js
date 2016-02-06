var gulp = require('gulp');

var autoprefixer = require('gulp-autoprefixer');
var cssGlobbing = require('gulp-css-globbing');
// var globby = require('globby');
var notify = require("gulp-notify");
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');

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
    .pipe(gulp.dest('./public/css'));
});
