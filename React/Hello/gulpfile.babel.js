import path from "path";
import gulp from "gulp";
import babel from "gulp-babel";
import eslint from "gulp-eslint";
import clean from "gulp-clean";
import nodemon from "gulp-nodemon";

// Global browser sync instance.
const browserSync = require("browser-sync").create();

// Development unless told otherwise.
// eslint-disable-next-line no-process-env
process.env.NODE_ENV = "development";

const paths = {
    destDir: "dist",
    srcFiles: "src/**/*.js",
    wwwFiles: "public/**/*"
};

// ** Clean ** /
gulp.task("clean", () => gulp.src(paths.destDir, {
    read: false,
    allowEmpty: true
}).pipe(clean()));

// ** Linting ** //
gulp.task("lint", () => gulp.src(paths.srcFiles).
    pipe(eslint({ formatter: "verbose" })).
    pipe(eslint.format()).
    pipe(eslint.failAfterError()));

// ** Compilation ** //
gulp.task("compile", () => gulp.src(paths.srcFiles).
    pipe(babel()).
    pipe(gulp.dest(paths.destDir)));

// ** Copy files ** //
gulp.task("copyFiles", () => gulp.src(paths.wwwFiles).pipe(gulp.dest(paths.destDir)));

// ** Serve **
gulp.task("startServer", done => {
    // Launch express (using nodemon to monitor).
    let called = false;

    /*
     * Use nodemon to run express app.
     * Restart our server whenever code changes.
     */
    return nodemon({
        script: path.resolve(paths.destDir, "server.js"),
        ignore: [
            "node_modules/",
            "build/"
        ],
        // Source files to watch that'll cause reload.
        watch: [
            "www",
            "./server.js"
        ],
        // Environment variables.
        env: { "DEBUG": "express:router" },
        // Extensions to watch.
        ext: "js html css",
        // Tasks to run on file changes.
        tasks(changedFiles) {
            let needsRecompile = false;
            // Recompile if a JS file changed.
            changedFiles.forEach(element => {
                console.log(`File ${element} changed`);
                if (element.endsWith(".js")) {
                    needsRecompile = true;
                }
            });
            if (needsRecompile) {
                return ["compile"];
            }
            return [];
        }
    }).on("start", () => {
        // Avoid nodemon being started multiple times.
        if (!called) {
            called = true;
            // Wait for the main load to complete.
            setTimeout(() => {
                done();
            }, 2000);
        }
    }).
        on("restart", () => {
            setTimeout(() => {
                // When nodemon restarts the server, instruct browsersync to reload.
                browserSync.notify("Reloading");
                browserSync.reload({ stream: false });
                done();
            }, 2000);
        });
});

// ** Browser Sync ** //
gulp.task("browser-sync", gulp.series("startServer", done => {
    // Initialize browser sync.
    browserSync.init({
        proxy: "localhost:8080",
        port: 5000,
        notify: true
    });
    done();
}));

// ** Common tasks ** //
gulp.task("build", gulp.series("clean", "lint", "compile", "copyFiles"));
gulp.task("serve", gulp.series("build", "browser-sync"));
gulp.task("default", gulp.series("serve"));
