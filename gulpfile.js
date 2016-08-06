var gulp = require('gulp');
var styleguide = require('sc5-styleguide');
var sass = require('gulp-sass');
var outputPath = 'output';

gulp.task('styleguide:generate', function() {
  return gulp.src('styleguide/**/*.scss')
    .pipe(styleguide.generate({
        title: 'My Styleguide',
        server: true,
        port: 4000,
        rootPath: outputPath,
        styleVariables: "styleguide/styleguide_variables.scss",
        overviewPath: 'styleguide/overview.md'
      }))
    .pipe(gulp.dest(outputPath));
});

gulp.task('styleguide:applystyles', function() {
  return gulp.src('styleguide/style.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(styleguide.applyStyles())
    .pipe(gulp.dest(outputPath));
});

gulp.task('watch', ['styleguide'], function() {
  // Start watching changes and update styleguide whenever changes are detected
  // Styleguide automatically detects existing server instance
  gulp.watch(['styleguide/**/*.scss'], ['styleguide']);
});

gulp.task('styleguide', ['styleguide:generate', 'styleguide:applystyles']);
