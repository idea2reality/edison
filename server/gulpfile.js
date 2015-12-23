'use strict';

var gulp = require('gulp'),
  ts = require('gulp-typescript'),
  del = require('del'),
  nodemon = require('gulp-nodemon'),
  tsconfig = require('./tsconfig');


/**
 * Compile TypeScript and include references to library and app .d.ts files.
 */
gulp.task('compile-ts', function() {
  var tsProject = ts.createProject('tsconfig.json', {
    typescript: require('typescript')
  });

  var tsResult = tsProject.src()
    .pipe(ts(tsProject));

  return tsResult.js.pipe(gulp.dest(tsconfig.compilerOptions.outDir));
});

gulp.task('clean', function(cb) {
  del(['src/**/*.js'], cb);
});

gulp.task('watch', ['build'], function() {
  gulp.watch(tsconfig.files, ['compile-ts']);
});

gulp.task('build', ['compile-ts'])

gulp.task('default', ['build']);

gulp.task('dev', function() {
  nodemon({
      script: './src/app.js',
      ext: 'ts',
      env: {
        'NODE_ENV': 'development'
      },
      tasks: ['build']
    })
    //have nodemon run watch on start
    .on('restart', function() {
      console.log('restarted!')
    });
});
