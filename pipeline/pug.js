import {Paths, Tasks, handleError} from './pipeline';
import gulp from 'gulp';
import htmlmin from 'gulp-htmlmin';
import pug from 'gulp-pug';

gulp.task(Tasks.pug, ['copy:views'], function () {

    // return gulp.src(Paths.views)
    //     .pipe(pug({
    //         data: {
    //             runtime: {
    //               toolname: 'Client Connector X'
    //             },
    //             title: "Client Connector XX",
    //             message: "GULP_MESSAGE",
    //             error: {
    //                 status: 0,
    //                 stack: "GULP: THIS IS A TEST"
    //             },
    //             body: {
    //                 email: "GULP: NOT AN EMAIL"
    //             }
    //         }
    //     })).on('error', handleError)
    //     .pipe(htmlmin({collapseWhitespace: true}))
    //     .pipe(gulp.dest(Paths.distRoot));

});
