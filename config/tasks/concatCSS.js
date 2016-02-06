var gulp = require('gulp');

var concat = require('gulp-concat');

gulp.task('concat-css', function() {

  return gulp.src('./public/css/vendor/*.css')
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('./public/css/'));
});
