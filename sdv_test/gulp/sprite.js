var gulp = require('gulp');
var spritesmith = require('gulp.spritesmith');

gulp.task('sprite', function() {
    var spriteData;
    spriteData = gulp.src('source/images/sprite/*.png').pipe(spritesmith({
		algorithm: 'binary-tree',
		cssName: 'sprite.styl',
		cssFormat: 'stylus',
		cssTemplate: 'source/stylus/sprite/stylus.template.mustache',
		imgName: 'sprite.png',
		padding: 3,
        cssVarMap: function(sprite) {
            sprite.name = "s-" + sprite.name;
        }
    }));
    spriteData.img.pipe(gulp.dest('build/img'));
    return spriteData.css.pipe(gulp.dest('source/stylus/sprite'));
});
