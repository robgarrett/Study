import gulp from "gulp";
import rename from "gulp-rename";
import newer from "gulp-newer";
import { spawn } from "child_process";
import path from 'path';

let { clean, build, restore, publish } = require("gulp-dotnet-cli");

// ** Clean ** /
gulp.task("clean", () => {
    return gulp.src("**/*.csproj", { read: false }).pipe(clean());
});

// ** Build ** /
gulp.task("prebuild", () => {
    return gulp.src("./appsettings-sample.json")
        .pipe(newer("appsettings.json"))
        .pipe(rename("appsettings.json"))
        .pipe(gulp.dest("."));
});

gulp.task("postbuild", (done) => {
    return done();
});

gulp.task("restore", () => {
    return gulp.src("**/*.csproj", { read: false }).pipe(restore());
});

gulp.task("compile", () => {
    return gulp.src("**/*.csproj", { read: false }).pipe(build());
});

gulp.task("build", gulp.series("prebuild", "restore", "compile", "postbuild"));

// ** Publish ** /
gulp.task("publish:build", () => {
    return gulp.src("**/*.csproj", { read: false }).pipe(publish({ configuration: "Release" }));
});
gulp.task("postpublish", () => {
    return gulp.src(["./appSettings.json"])
        .pipe(gulp.dest("./bin/Release/netcoreapp2.1/publish/"));
});
gulp.task("publish", gulp.series("publish:build", "postpublish"));

// ** Run ** /
gulp.task("run", gulp.series("build", (done) => {
    var where = path.join(__dirname, "TalkToAlexaClient.csproj");
    var cmd = spawn("dotnet", ["run", "watch", where], {stdio: 'inherit'});
    cmd.on("close", (code) => {
        done(code);
    });
}));

// ** Default ** /
gulp.task("default", gulp.series("run"));