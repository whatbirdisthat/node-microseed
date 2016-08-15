import {Tasks, handleError, Paths} from './pipeline';
import gulp from 'gulp';
import imagemin from 'gulp-imagemin';

gulp.task(Tasks.svg, function () {
    return gulp.src([
        Paths.svgSources
    ])
        .pipe(imagemin())
        .on('error', handleError)
        .pipe(gulp.dest(Paths.svgOut));
});
