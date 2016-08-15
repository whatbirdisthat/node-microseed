import {Paths, Tasks} from './pipeline';

import gulp from 'gulp';
import htmlmin from 'gulp-htmlmin';

gulp.task(Tasks.html, function () {
    return gulp.src(Paths.htmlSources)
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(Paths.distRoot));
});
