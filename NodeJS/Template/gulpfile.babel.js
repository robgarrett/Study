'use strict';

import path from "path";
import gulp from "gulp";
import tsc from "gulp-typescript";
import gulpNSP from "gulp-nsp";
import debug from "gulp-debug";
import tslint from "gulp-tslint";
import flatten from "gulp-flatten";
import clean from "gulp-clean";
import sourcemaps from "gulp-sourcemaps";
import { spawn } from "child_process";

// Running node instance.
var node;

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
    paths.tscripts.dest, '/*.js.map'
  ], { read: false, allowEmpty: true }).pipe(clean());
});

// ** Linting ** //
gulp.task('lint', function doWork() {
  return gulp.src(paths.tscripts.src)
    .pipe(tslint({ formatter: "verbose" }))
    .pipe(tslint.report());
});

// ** Compilation ** //
gulp.task('nsp:check', function doWork(done) {
  gulpNSP({ package: __dirname + '/package.json' }, done);
});
gulp.task('compile:typescript', function doWork() {
  var project = tsc.createProject("tsconfig.json", { declaration: true });
  var built = gulp.src(paths.tscripts.src)
    .pipe(sourcemaps.init())
    .pipe(project());
  return built.js
    // Write inline source maps.
    .pipe(sourcemaps.write())
    .pipe(flatten())
    .pipe(gulp.dest(paths.tscripts.dest));
});
gulp.task('build', gulp.series('clean', 'nsp:check', 'compile:typescript'));

// ** Running ** //
gulp.task('run', function doWork(done) {
  if (node) node.kill();
  node = spawn('node', ['app/lib/serve.js'], { stdio: 'inherit' });
  node.on('close', function (code) {
    if (code === 8) gulp.log('Error detected, waiting on changes...');
  });
  return done();
});
gulp.task('buildrun', gulp.series('build', 'run'));

// ** Watching ** //
gulp.task('watch:code', function doWork() {
  return gulp.watch(paths.tscripts.src, gulp.series('compile:typescript'));
});
gulp.task('watch:coderun', function doWork() {
  return gulp.watch(paths.tscripts.src, gulp.series('compile:typescript', 'run'));
});
gulp.task('watch', gulp.series('watch:code'));
gulp.task('runwatch', gulp.series('run', 'watch:coderun'));

// ** Default ** //
gulp.task('default', gulp.series('lint', 'buildrun'));

// Kill node process on unhandled error.
process.on('exit', function () {
  if (node) node.kill();
});
