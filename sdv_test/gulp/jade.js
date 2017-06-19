var gulp = require('gulp');
var jade = require('gulp-jade');
var connect = require('gulp-connect');
var changed = require('gulp-changed');

gulp.task('jade', function() {
  return gulp.src(['source/jade/*.jade'])
    .pipe(changed('build', {extension: '.html'}))
    .pipe(
      jade({
        pretty: true
      })
    )
    .pipe(gulp.dest('build'))
    .pipe(connect.reload());
});
