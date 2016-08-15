import {Tasks, Paths} from './pipeline';
import gulp from 'gulp';
import del from 'del';

gulp.task('clean:coverage', function(call_back) {
    return del(Paths.coverageRoot, call_back);
});

gulp.task('clean:lib', function(call_back) {
    return del(Paths.libRoot, call_back);
});

gulp.task(Tasks.clean, ['clean:coverage', 'clean:lib'], function (call_back) {
    return del(Paths.distRoot, call_back);
});
