var gulp = require('gulp');

gulp.task('watch', function() {
  gulp.watch([
      'source/jade/*',
      'source/jade/**/*.jade'
  ], ['jade']);
  gulp.watch([
      'source/stylus/*',
      'source/stylus/**/*',
      '!source/stylus/inc/sprite.styl'
  ], ['stylus']);
  gulp.watch([
      'source/images/*.png',
      'source/images/**/*.png',
      'source/images/*.jpg',
      'source/images/**/*.jpg',
      'source/fonts/*.woff',
      '!source/images/sprite/',
      '!source/images/sprite/*'
  ], ['copy']);
  gulp.watch(['source/images/sprite/*.png'], ['sprite']);
});
