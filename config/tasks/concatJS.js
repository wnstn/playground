var gulp = require('gulp');

var concat = require('gulp-concat');

gulp.task('concat-js', function() {

  return gulp.src('./public/javascripts/vendor/*.js')
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./public/javascripts/compiled/'));
});
