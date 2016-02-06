var gulp = require('gulp');

var yuidoc = require("gulp-yuidoc");

gulp.task('documentation', function() {

  gulp.src(["./public/javascripts/app/blocks/*.js",
    "./public/javascripts/app/components/*.js",
    "./public/javascripts/views/*.js",
    ])
  .pipe(yuidoc())
  .pipe(gulp.dest("./doc"));
});
