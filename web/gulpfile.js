'use strict';

var gulp = require('gulp'),
    inject = require('gulp-inject'),
    tsc = require('gulp-typescript'),
    del = require('del'),
    concat = require('gulp-concat'),
    plumber = require('gulp-plumber'),
    flatten = require('gulp-flatten'),
    config = require('./gulpfile.config');


/**
 * Compile TypeScript and include references to library and app .d.ts files.
 */
gulp.task('compile-ts', function () {
    var tsResult = gulp.src([config.src.ts, config.src.tsd])
        .pipe(plumber())
        .pipe(tsc(config.tsconfig));

    return tsResult.js
        .pipe(gulp.dest(config.tsOutputPath));
});

gulp.task('concat-css', function () {
    return gulp.src(config.src.css)
        .pipe(concat('index.css'))
        .pipe(gulp.dest('public/'));
});

gulp.task('copy-index', function () {
    return gulp.src(config.src.index)
        .pipe(flatten())
        .pipe(gulp.dest('public/'));
})

gulp.task('copy-tpls', function () {
    return gulp.src(config.src.tpl)
        .pipe(flatten())
        .pipe(gulp.dest('public/templates'));
})

gulp.task('copy-views', function () {
    return gulp.src(config.src.view)
        .pipe(flatten())
        .pipe(gulp.dest('public/views'));
})

gulp.task('copy-assets', function () {
    return gulp.src(config.src.assets)
        .pipe(gulp.dest('public/assets'));
})

gulp.task('copy', ['copy-index', 'copy-tpls', 'copy-views', 'copy-assets']);

/**
 * Remove all generated JavaScript files from TypeScript compilation.
 */
gulp.task('clean-ts', function (cb) {
    // delete the files
    del(config.tsOutputPath + "**/*.js", cb);
});

gulp.task('watch', function () {
    gulp.watch(config.src.ts, ['compile-ts']);
    gulp.watch(config.src.css, ['concat-css']);
    gulp.watch(config.src.tpl, ['copy-tpls']);
    gulp.watch(config.src.view, ['copy-views']);
    gulp.watch(config.src.index, ['copy-index']);
});

gulp.task('clean', function (cb) {
    // delete the files
    del(config.tsOutputPath + "**/*", cb);
});

gulp.task('build', ['compile-ts', 'copy', 'concat-css'])

gulp.task('default', ['build']);
