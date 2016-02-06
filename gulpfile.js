'use strict';

var gulp = require('gulp');
var gutil = require("gulp-util");

var requireDir = require('require-dir');
var tasks = requireDir('./config/tasks');
// var through = require('through2');

var browserSync = require('browser-sync').create();

gulp.task('reload', function(){
  return browserSync.reload();
});

gulp.task('stream', ['sass'], function() {
  return browserSync.reload('*.css');
});

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
