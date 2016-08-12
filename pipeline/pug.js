import {Paths, Tasks, handleError} from './pipeline';
import gulp from 'gulp';
import htmlmin from 'gulp-htmlmin';
import pug from 'gulp-pug';

gulp.task(Tasks.pug, function () {
    return gulp.src(Paths.views)
        .pipe(pug({
            data: {
                runtime: {
                  toolname: 'Client Connector'
                },
                title: "Client Connector",
                message: "GULP_MESSAGE",
                error: {
                    status: 0,
                    stack: "THIS IS A TEST"
                },
                body: {
                    email: "NOT AN EMAIL"
                }
            }
        })).on('error', handleError)
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(Paths.distRoot));
});
