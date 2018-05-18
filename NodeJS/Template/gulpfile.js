var gulp   = require('gulp');
var tsc    = require('gulp-tsc');
var shell  = require('gulp-shell');
var runseq = require('run-sequence');
var tslint = require('gulp-tslint');

var paths = {
  tscripts : { src : ['src/**/*.ts'], dest : 'lib' }
};

gulp.task('default', ['lint', 'buildrun']);

// ** Running ** //
gulp.task('run', shell.task([
  'node lib/app.js'
]));

gulp.task('buildrun', function (cb) {
  runseq('build', 'run', cb);
});

// ** Watching ** //
gulp.task('watch', function () {
  gulp.watch(paths.tscripts.src, ['compile:typescript']);
});

gulp.task('watchrun', function () {
  gulp.watch(paths.tscripts.src, runseq('compile:typescript', 'run'));
});

// ** Compilation ** //
gulp.task('build', ['nsp:check', 'compile:typescript']);
gulp.task('nsp:check', function(){
  'nsp check';
});
gulp.task('compile:typescript', function () {
  return gulp
  .src(paths.tscripts.src)
  .pipe(tsc({
    emitError: false
  }))
  .pipe(gulp.dest(paths.tscripts.dest));
});

// ** Linting ** //
gulp.task('lint', ['lint:default']);
gulp.task('lint:default', function(){
      return gulp.src(paths.tscripts.src)
        .pipe(tslint({ formatter: "verbose"}))
        .pipe(tslint.report());
});
