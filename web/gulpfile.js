'use strict';

var gulp = require('gulp'),
  ts = require('gulp-typescript'),
  del = require('del'),
  concat = require('gulp-concat'),
  flatten = require('gulp-flatten'),
  livereload = require('gulp-livereload'),
  config = require('./gulpfile.config'),
  tsconfig = require('./tsconfig');

gulp.task('compile-ts', function() {
  var tsProject = ts.createProject('tsconfig.json', {
    typescript: require('typescript')
  });

  var tsResult = tsProject.src()
    .pipe(ts(tsProject));

  return tsResult.js.pipe(gulp.dest('.'));
});

gulp.task('concat-css', function() {
  return gulp.src(config.src.css)
    .pipe(concat('index.css'))
    .pipe(gulp.dest('public/'));
});

gulp.task('copy-index', function() {
  return gulp.src(config.src.index)
    .pipe(flatten())
    .pipe(gulp.dest('public/'));
})

gulp.task('copy-tpls', function() {
  return gulp.src(config.src.tpl)
    .pipe(flatten())
    .pipe(gulp.dest('public/templates'));
})

gulp.task('copy-views', function() {
  return gulp.src(config.src.view)
    .pipe(flatten())
    .pipe(gulp.dest('public/views'));
})

gulp.task('copy-assets', function() {
  return gulp.src(config.src.assets)
    .pipe(gulp.dest('public/assets'));
})

gulp.task('copy', ['copy-index', 'copy-tpls', 'copy-views', 'copy-assets']);

/**
 * Remove all generated JavaScript files from TypeScript compilation.
 */
gulp.task('clean-ts', function(cb) {
  del(tsconfig.compilerOptions.out, cb);
});

gulp.task('clean', function(cb) {
  del(config.dist, cb);
});

gulp.task('watch', ['build'], function() {
  livereload.listen();

  gulp.watch(tsconfig.files, ['compile-ts']);
  gulp.watch(config.src.css, ['concat-css']);
  gulp.watch(config.src.tpl, ['copy-tpls']);
  gulp.watch(config.src.view, ['copy-views']);
  gulp.watch(config.src.index, ['copy-index']);
  gulp.watch(config.src.assets, ['copy-assets']);

  gulp.watch('public/**/*', function(event) {
    livereload.reload();
  });
});

gulp.task('build', ['compile-ts', 'copy', 'concat-css'])

gulp.task('default', ['build']);
