const gulp = require("gulp");
const convertEncoding = require("gulp-convert-encoding");
const copy = require("gulp-copy");
const zip = require("gulp-zip");
const rename = require("gulp-rename");

gulp.task("copy_mod_folder", () => {
  return gulp
    .src("br/**")
    .pipe(
      convertEncoding({
        from: "utf8",
        to: "utf16"
      })
    )
    .pipe(gulp.dest("build/br/"));
});

gulp.task("convert_encoding", () => {
  return gulp
    .src("build/br/Localization/INT/**")
    .pipe(
      convertEncoding({
        from: "utf8",
        to: "utf16"
      })
    )
    .pipe(gulp.dest("build/br/Localization/INT/"));
});

gulp.task("make_mod_zip", () => {
  return gulp
    .src("**/build/br/**")
    .pipe(zip("MOD.zip"))
    .pipe(gulp.dest("dist"));
});

gulp.task("create_br_files", () => {
  return gulp
    .src("build/br/Localization/INT/**/*.int")
    .pipe(
      rename(path => {
        path.extname = ".ptb";
      })
    )
    .pipe(gulp.dest("build/gfb/PTB"));
});

gulp.task("make_gfb_zip", () => {
  return gulp
    .src("build/gfb/**")
    .pipe(zip("GfB.zip"))
    .pipe(gulp.dest("dist"));
});

gulp.task(
  "build",
  gulp.series(
    "copy_mod_folder",
    //"convert_encoding",
    "make_mod_zip",
    "create_br_files",
    "make_gfb_zip"
  )
);