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
import browserSync from "browser-sync";
import nodemon from "nodemon";

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
gulp.task('build', gulp.series('clean', /*'nsp:check',*/ 'compile:typescript'));

// ** Serve **
gulp.task('serve', function doWork(done) {
  // Launch express (using nodemon to monitor app/lib/*.js).
  var called = false;
  // Use nodemon to run express app.
  // Restart our server whenever code changes.
  return nodemon({
    script: "app/lib/serve.js",
    ignore: ["node_modules/"]
  }).on("start", function () {
    if (!called) {
      called = true;
      done();
    }
  }).on("restart", function () {
    // When nodemon restarts the server, instruct browsersync to reload.
    debug.log("nodemon detected change, calling browsersync to reload");
    setTimeout(function () {
      browserSync.reload({ stream: false})
    }, 1000);
  });
});

// ** Watching **
gulp.task('watch', function doWork(){
  // If src files change, recompile them.
  // This will cause new app/lib/*.js files, and nodemon will pick these up and
  // restart express.
  return gulp.watch(paths.tscripts.src, gulp.series('compile:typescript'));
});

// ** Browser Sync **
gulp.task('browser-sync', gulp.series("serve", function doWork() {
  // Initialize browser sync.
  browserSync({
    proxy: "localhost:3000",  // local node app address
    port: 5000,  // use *different* port than above
    notify: true
  });
}));

// ** Default ** //
gulp.task('default', gulp.series('lint', 'build', 'browser-sync', 'watch'));
