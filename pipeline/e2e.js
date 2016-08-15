import {Tasks, Paths, handleError} from './pipeline';

var gulp = require('gulp');
// var browserSync = require('browser-sync');
// var selenium = require('selenium-standalone');
var istanbul = require('gulp-istanbul');

var mocha = require('gulp-mocha');
var cucumber = require("gulp-cucumber");
var babel = require('gulp-babel');

gulp.task('serve:test', function (done) {
    // browserSync({
    //     logLevel: 'verbose',
    //     notify: false,
    //     open: false,
    //     port: 9000,
    //     server: {
    //         baseDir: ['test/fixtures']
    //     },
    //     ui: false
    // }, done);
});

gulp.task('atat'/*, ['serve:test', 'selenium']*/, function () {
    return gulp.src('test/**/*.feature', {read: false})
        .pipe(
            cucumber({
                'steps': 'features/step_definitions/*steps.js',
                'support': '*features/support/*.js',
                'format': 'summary',
                compiler: 'js:babel-core/register'
            })
        );
});

gulp.task('copy:views', function() {
    return gulp.src('src/app/views/**/*.pug')
        .pipe(gulp.dest(Paths.libRoot + '/views'));
});

gulp.task('compile', ['copy:views'], function() {
        return gulp.src('src/app/**/*.js')
            .pipe(babel())
            .pipe(gulp.dest(Paths.libRoot));
    }
);


gulp.task('pre-test', ['compile'], function () {
    return gulp.src(['lib/**/*.js'])
    // Covering files
        .pipe(istanbul({
            compiler: 'js:babel-core/register'
        }))
        // Force `require` to return covered files
        .pipe(istanbul.hookRequire());
});
gulp.task('integration', ['pre-test' /*, 'serve:test', 'selenium'*/], function () {

    console.log('Coverage data will be available at file://' + __dirname + 'coverage/lcov-report/index.html');

    return gulp.src('test/**/*.spec.js', {read: false})
        .pipe(
            mocha({
                compiler: 'js:babel-core/register'
            }))
        .pipe(istanbul.writeReports())
        // Enforce a coverage of at least 90%
        .pipe(istanbul.enforceThresholds({thresholds: {global: 50}}));
});

gulp.task('test', ['integration', 'atat'], function () {
    // browserSync.exit();
});
