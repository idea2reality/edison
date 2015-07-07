'use strict';

var del = require('del'),
  gulp = require('gulp'),
  tsc = require('gulp-typescript'),
  plumber = require('gulp-plumber'),
  config = require('./gulpfile.config'),
  spawn = require('child_process').spawn,
  node;

gulp.task('app', function() {
  if (node) node.kill()
  node = spawn('node', ['./src/app.js'], {
    stdio: 'inherit'
  })
  node.on('close', function(code) {
      process.stdout.write('=== App terminated, waiting for changes...\n');
  });
});

gulp.task('dev', function() {
  gulp.run('app');

  gulp.watch(['./src/**/*.js'], function() {
    gulp.run('app')
  });
});

// clean up if an error goes unhandled.
process.on('exit', function() {
  if (node) node.kill()
});

/**
 * Compile TypeScript and include references to library and app .d.ts files.
 */
gulp.task('compile-ts', function() {
  var tsResult = gulp.src(config.tssrc)
    .pipe(plumber())
    .pipe(tsc({
      target: 'es5',
      module: 'commonjs',
      typescript: require('typescript')
    }));

  return tsResult.js
    .pipe(gulp.dest('./src'));
});

gulp.task('clean', function(cb) {
  del(['src/**/*.js'], cb);
});

gulp.task('watch', ['build'], function() {
  gulp.watch(config.src.ts, ['compile-ts']);
});

gulp.task('build', ['compile-ts'])

gulp.task('default', ['build']);
