var gulp = require('gulp');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

gulp.task('test', function() {
    var error = false;
    gulp.src('./tests/**/*.*')
        .pipe(mocha())
        .on('error', function() {
            console.log('Tests failed!');
            error = true;
        })
        .on('end', function() {
            if (!error) {
                console.log('Tests succeeded!');
                process.exit(0);
            }
        });
});

gulp.task('jshint', function() {
    return gulp.src(['./*.js', 'models/*.js', './tests/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(jshint.reporter('fail'));
});

gulp.task('watch', function() {
    gulp.watch(['./*.js', 'models/*.js', './tests/*.js'], ['jshint']);
    gulp.watch(['./tests/*.js'], ['test']);
});
