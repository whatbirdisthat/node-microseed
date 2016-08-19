import {Tasks, Paths, handleError} from './pipeline';
var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('copy:views', function() {
    return gulp.src('src/app/views/**/*.pug')
        .pipe(gulp.dest(Paths.libRoot + '/views'));
});

gulp.task('compile', ['copy:views'], function() {
        return gulp.src('src/app/**/*.js')
            .pipe(babel())
            .pipe(gulp.dest(Paths.libRoot));
    }
);

