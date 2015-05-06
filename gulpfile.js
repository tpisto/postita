var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var concat = require("gulp-concat");
var yuidoc = require('gulp-yuidoc');
var runSequence = require('run-sequence');

gulp.task("default", function(callback) {
  return runSequence(
    ["babel", "doc"],
    callback
  );
});

gulp.task("babel", function () {
  return gulp.src("src/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(concat("postita.js"))
    .pipe(babel())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("lib"));
});

gulp.task("doc", function () {
  return gulp.src("src/**/*.js")
    .pipe(yuidoc({options: { "sellec": true }, themedir: __dirname + "/yuidoc-theme" } ))
    .pipe(gulp.dest("./doc"));
});