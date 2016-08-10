import {Paths, Tasks} from './pipeline';

import gulp from 'gulp';
import jsonminify from 'gulp-jsonminify';

gulp.task(Tasks.json, function () {
    return gulp.src(Paths.json)
        .pipe(jsonminify())
        .pipe(gulp.dest(Paths.distRoot));
});
