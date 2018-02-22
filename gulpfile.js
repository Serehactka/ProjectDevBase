let gp = require("gulp");
let gpl = require('gulp-load-plugins')();
let gutil = require("gulp-util");
let bs = require("browser-sync").create();

gp.task("stylus", () => {
    return gp.src("assets/common/stylus/common.styl")
        .pipe(gpl.plumber())
        .pipe(gpl.stylus())
        .pipe(gp.dest("public/css"))
        .on('error', gutil.log);
});

gp.task("pug", () => {
    return gp.src("assets/views/*.pug")
        .pipe(gpl.plumber())
        .pipe(gpl.pug())
        .pipe(gp.dest("public"))
        .on("error", gutil.log);
});

gp.task("js", () => {
    return gp.src("assets/js/**/*.js")
        .pipe(gpl.plumber())
        .pipe(gpl.imports())
        .pipe(gp.dest("public/js"))
        .on("error", gutil.log);
});

gp.task("images", () => {
    return gp.src("assets/img/*.+(png|jpg|bmp|svg)")
        .pipe(gpl.plumber())
        .pipe(gpl.newer("public/img"))
        .pipe(gpl.imagemin())
        .pipe(gpl.filesize())
        .pipe(gp.dest("public/img"))
        .on("error", gutil.log);
});

gp.task("bs", () => {
    bs.init({
        server: {
            baseDir: `public/`,
            directory: true,
            notify: false
        },
        open: false
    });
});

gp.task("watch", () => {
    gp.watch(["assets/common/stylus/**/*.styl", "assets/components/**/*.styl"], ["stylus"]);
    gp.watch(["assets/common/pug/**/*.pug", "assets/components/**/*.pug", "assets/views/*.pug"], ["pug"]);
    gp.watch(["assets/js/**/*.js"], ["js"]);
    gp.watch(["assets/img/*.+(png|jpg|bmp|svg)"], ["images"]);
});

gp.task("build", ["stylus", "pug", "js", "images"]);

gp.task("default", ["build", "watch", "bs"], () => {});

