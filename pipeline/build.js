import {Tasks, BuildChain, WatchMap} from './pipeline';
import gulp from 'gulp';
import gutil from 'gulp-util';

gulp.task(Tasks.build, BuildChain, function () {
    gutil.log(
        'Build complete.'
    );
});

gulp.task(Tasks.watch, BuildChain, function () {
    WatchMap.forEach(
        w =>
            gulp.watch(w.path, w.tasks)
    );
});
