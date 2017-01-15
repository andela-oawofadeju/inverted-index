var gulp = require('gulp');
var browserSync = require('browser-sync').create();

//Static server
gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./src"
    }
  });
});

gulp.task('watch', function() {
  gulp.watch(['./**/*.html', './**/*.css', './**/*.js'])
    .on('change', browserSync.reload);
});
gulp.task('default', ['watch', 'browser-sync'], function() {});
