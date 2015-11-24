var gulp = require('gulp');
var tsb = require('gulp-tsb');
var sourcemaps = require('gulp-sourcemaps');

// Transpile Script TS files.
gulp.task('build', function () {
    var tsConfigTests = tsb.create('tsconfig.json');
    return gulp.src(['typings/**/*.ts', 'scripts/**/*.ts', 'scripts/tsd.d.ts'])
        .pipe(tsConfigTests()) 
        .pipe(gulp.dest('scripts'));
});

// Transpile Test TS files.
gulp.task('buildTests', function () {
    var tsConfigTests = tsb.create('tsconfig.json');
    return gulp.src(['typings/**/*.ts', 'tests/**/*.ts', 'src/tsd.d.ts'])
        .pipe(tsConfigTests()) 
        .pipe(gulp.dest('tests'));
});

// Watch task for changes to TS files.
gulp.task('watch', ['buildAll'], function() {
   gulp.watch('scripts/**/*.ts', ['build']);
   gulp.watch('tests/**/*.ts', ['buildTests']); 
});

gulp.task('buildAll', ['build', 'buildTests']);
gulp.task('default', ['build', 'buildTests']);

