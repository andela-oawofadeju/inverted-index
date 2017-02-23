const gulp = require('gulp');
const browserSync = require('browser-sync').create();


// Static server
gulp.task('browser-sync', () => {
  browserSync.init({
    server: {
      baseDir: './src'
    },
    port: process.env.PORT || 8000
  });
});

gulp.task('watch', () => {
  gulp.watch(['./**/*.html', 'src/css/*.css', 'src/js/*.js'])
    .on('change', browserSync.reload);
});



gulp.task('default', ['browser-sync', 'watch']);
