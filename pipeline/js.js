"use strict";

import {Tasks, Paths, handleError} from './pipeline';

import gulp from 'gulp';
import fs from 'fs';
import source from 'vinyl-source-stream';
import browserify from 'browserify';
import babelify from 'babelify';
import del from 'del';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';
import buffer from 'gulp-buffer';
import gutil from 'gulp-util';
import insert from 'gulp-insert';
import concat from 'gulp-concat';

gulp.task('jslibs', function () {

    try {
        if (fs.statSync(Paths.jsLibOut).isFile()) {
            gutil.log('to reinstall ts libs, run `gulp clean && gulp build`');
            return;
        }
    } catch (e) {
        if (e.message != "ENOENT: no such file or directory, stat '" + Paths.jsLibOut + "'") {
            gutil.log(e);
        }
    }

    return gulp.src('./node_modules/jquery/dist/jquery.js')
        .pipe(insert.transform(function(contents, file) {
            var outputJs = contents;
            Paths.jsLibs.forEach(eachFile => outputJs += fs.readFileSync(eachFile));
            return outputJs;
        }))
        .pipe(uglify())
        .pipe(concat(Paths.jsLibFile))
        .pipe(gulp.dest(Paths.jsLibDest));

});

gulp.task('app', ['jslibs'], function () {
    var b = browserify({
        entries: [
            './src/js/main.js'
        ],
        debug: true,
        cache: {},
        packageCache: {}
    });
    
    return b.transform(babelify, {presets: ["es2015"]})
        .on('error', handleError)
        .bundle()
        .on('error', handleError)
        .pipe(source(Paths.jsOutFile))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(Paths.jsDest));

});

gulp.task(Tasks.js, ['app'], function () {
    //gutil.log('Javascripts complete.')
});

gulp.task('jsclean', function (call_back) {
    return del(Paths.jsLibDest, call_back);
});
