'use strict';

let gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    babel = require('gulp-babel'),
    eslint = require('gulp-eslint'),
    mocha = require('gulp-mocha');

gulp.task('lint', function () {
    return gulp
        .src(['./src/**/*.js', './src/tests/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

gulp.task('bundle', gulp.series('lint', function () {
    return gulp
        .src('src/main.js')
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/'));
}));

gulp.task('test', gulp.series('bundle', function () {
    return gulp
        .src('./tests/*.js', {
            read: false
        })
        .pipe(mocha());
}));

gulp.task('default', gulp.series('test'));

gulp.task('watch', function () {
    gulp.watch(['src/**/*', 'tests/**/*'], ['default']);
});
