'use strict';

import path from "path";
import gulp from "gulp";
import tsc from "gulp-typescript";
import gulpNSP from "gulp-nsp";
import debug from "gulp-debug";
import exec from "gulp-exec";
import tslint from "gulp-tslint";
import flatten from "gulp-flatten";
import clean from "gulp-clean";

var paths = {
  tscripts: {
    src: [
      'app/src/**/*.ts',
      'app/serve/**/*.ts'
    ],
    dest: 'app/lib'
  }
};

// ** Clean ** /
gulp.task('clean', function doWork() {
  return gulp.src([
    paths.tscripts.dest, '/*.js',
  ], {read:false, allowEmpty: true}).pipe(clean());
});

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
gulp.task('build', gulp.series('clean', 'nsp:check', 'compile:typescript'));

// ** Running ** //
gulp.task('run', function doWork() {
  return gulp.src('./**/**').pipe(exec('node app/lib/serve.js'));
});
gulp.task('buildrun', gulp.series('build', 'run'));

// ** Watching ** //
gulp.task('watch:code', function doWork() {
  return watcher = gulp.watch(paths.tscripts.src, gulp.series('compile:typescript'));
});
gulp.task('watch', gulp.parallel('watch:code'));

// ** Default ** //
gulp.task('default', gulp.series('lint', 'buildrun'));
