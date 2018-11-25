const gulp = require('gulp');
const zip = require('gulp-zip');

gulp.task('package', function() {
  const manifest = require('./build/manifest.json');
  return gulp
    .src('build/**')
    .pipe(zip('cibus-' + manifest.version + '.zip'))
    .pipe(gulp.dest('package'));
});
