import {Tasks, Paths} from './pipeline';
import gulp from 'gulp';
import del from 'del';

gulp.task(Tasks.clean, function (call_back) {
    return del(Paths.distRoot, call_back);
});
