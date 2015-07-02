'use strict';

var gulp = require('gulp'),
    tsc = require('gulp-typescript'),
    del = require('del'),
    plumber = require('gulp-plumber'),
    config = require('./gulpfile.config');

/**
 * Compile TypeScript and include references to library and app .d.ts files.
 */
gulp.task('compile-ts', function () {
    var tsResult = gulp.src([config.src.ts, config.src.tsd])
        .pipe(plumber())
        .pipe(tsc(config.tsconfig));

    return tsResult.js
        .pipe(gulp.dest('.'));
});

gulp.task('clean', function(cb){
  del(['src/**/*.js'], cb);
});

gulp.task('watch', ['build'], function () {
    gulp.watch(config.src.ts, ['compile-ts']);
});

gulp.task('build', ['compile-ts'])

gulp.task('default', ['build']);
