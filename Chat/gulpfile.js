var gulp = require('gulp');
var tsb = require('gulp-tsb');
var sourcemaps = require('gulp-sourcemaps');

// Transpile Script TS files.
gulp.task('build', function () {
    var tsConfigTests = tsb.create('tsconfig.json');
    return gulp.src(['typings/**/*.ts', 'src/**/*.ts'])
        .pipe(tsConfigTests())
        .pipe(gulp.dest('build'));
});

// Watch task for changes to TS files.
gulp.task('watch', ['buildAll'], function() {
   gulp.watch('src/**/*.ts', ['build']);
});

gulp.task('buildAll', ['build']);
gulp.task('default', ['build']);

