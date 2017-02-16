const gulp = require('gulp');
const browserSync = require('browser-sync').create();
//const jasmine = require('gulp-jasmine');
//const browserify = require('gulp-browserify');

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


// gulp.task('build:scripts', () => {
//   return gulp.src(['src/js/inverted-index.js', 'jasmine/spec/inverted-index-test.js'])
//     .pipe(browserify())
//     .pipe(gulp.dest('build'));
// });
gulp.task('default', ['browser-sync', 'watch']);
