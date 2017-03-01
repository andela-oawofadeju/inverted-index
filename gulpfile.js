const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const rename = require('gulp-rename');
const browserify = require('browserify');
const source = require('vinyl-source-stream');

gulp.task('browser-sync', () => {
  browserSync.init({
    server: {
      baseDir: './src/',
      index: 'index.html'
    },
    port: process.env.PORT || 8000
  });
});


gulp.task('scripts', () => {
  gulp.src('jasmine/spec/inverted-index-test.js')
    .pipe(browserify())
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('jasmine/build'));
});

gulp.task('browserify', () => {
  return browserify('jasmine/spec/inverted-index-test.js')
    .bundle()
    .pipe(source('browser-test.spec.js'))
    .pipe(gulp.dest('jasmine/build'));
});



gulp.task('browserTest', ['scripts'], () => {
  testBrowserSync.init({
    server: {
      baseDir: ['./src/js/', './jasmine'],
      index: 'SpecRunner.html'
    },
    port: 8080,
    ui: false,
    ghostMode: false
  });
});

gulp.task('watch', () => {
  gulp.watch(['./**/*.html', 'src/css/*.css', 'src/js/*.js', './jasmine/spec/*.js'])
    .on('change', browserSync.reload);
});

gulp.task('default', ['browserTest', 'browser-sync', 'watch']);
