var gulp = require('gulp');
var tsc = require('gulp-typescript');
var gulpNSP = require('gulp-nsp');
var shell = require('gulp-shell');
var tslint = require('gulp-tslint');
var flatten = require('gulp-flatten');
var webpack = require('webpack');
var webpackconfig = require('./webpack.config.dev.js');

var paths = {
  tscripts: {
    src: [
      'app/src/**/*.ts',
      'app/build/**/*.ts'
    ], dest: 'app/lib'
  }
};

//gulp.task('default', gulp.series('lint', 'buildrun'));

// ** Linting ** //
gulp.task('lint', function doWork() {
  return gulp.src(paths.tscripts.src)
    .pipe(tslint({ formatter: "verbose" }))
    .pipe(tslint.report());
});

// ** Compilation ** //
gulp.task('nsp:check', function doWork(done) {
  gulpNSP({package: __dirname + '/package.json'}, done);
});
gulp.task('compile:typescript', function doWork() {
  var project = tsc.createProject("tsconfig.json", { declaration: true });
  var built = gulp.src(paths.tscripts.src).pipe(project());
  return built.js
    .pipe(flatten())
    .pipe(gulp.dest(paths.tscripts.dest));
});
gulp.task('build', gulp.series('nsp:check', 'compile:typescript'));

// ** Running ** //
gulp.task('buildrun', function doWork() {
  return gulp.series('build', 'run');
});
gulp.task('run', shell.task([
  'node app/lib/serve.js'
]));

/*
// ** Watching ** //
gulp.task('watchrun', gulp.series('compile:typescript', 'run'));
gulp.task('watch', function () {
  gulp.watch(paths.tscripts.src, ['compile:typescript']);
});

// ** Packaging ** //
gulp.task('package', gulp.series('lint', 'package:code'));
gulp.task('package:code', ['build'], function (done) {
  webpack(webpackconfig, function (err, stats) {
    if (err) {
      console.error("package:code", err);
    }
    console.log(stats.toString({
      colors: true
    }));
    done();
  });
});
*/
