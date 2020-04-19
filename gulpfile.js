const gulp = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync").create();
const cleancss = require("gulp-clean-css");
const rename = require("gulp-rename");

//Compile SCSS into CSS
function style() {
  return gulp
    .src("./assets/scss/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./assets/css/"))
    .pipe(browserSync.stream());
}

//Optimize JS
// function useRef(){
//   return gurlp.src("./*.html")
//   .pipe(useRef())
//   .pipe(gulp.dest('./assets/js/'))
// }

function minifyCss() {
  return gulp
    .src("./assets/css/main.css")
    .pipe(cleancss())
    .pipe(rename("main.min.css"))
    .pipe(gulp.dest("./assets/css"));
}

//Auto Update Browser
function watch() {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });

  gulp.watch("./assets/scss/**/*.scss", style);
  gulp.watch("./*.html").on("change", browserSync.reload);
  gulp.watch("./assets/js/**/*.js").on("change", browserSync.reload);
}

exports.style = style;
exports.watch = watch;
exports.minifyCss = minifyCss;
exports.build = gulp.series(style, minifyCss, watch);
