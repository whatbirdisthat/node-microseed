import {Tasks, Paths} from './pipeline';

import gulp from 'gulp';
import sass from 'gulp-sass';
import concat from 'gulp-concat';
import sourcemaps from 'gulp-sourcemaps';
import cleanCSS from 'gulp-clean-css';

gulp.task(Tasks.css, function () {
    return gulp.src(Paths.cssSources)
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed', sourceComments: 'map'})
            .on('error', sass.logError))
        .pipe(concat(Paths.cssOutFile))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(Paths.cssOutFolder));
});
