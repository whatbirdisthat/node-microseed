import gulp from 'gulp';
import http from 'http';
import connect from 'connect';
import serveStatic from 'serve-static';
import selenium from 'selenium-standalone';
import webdriver from 'gulp-webdriver';
// var gls = require('gulp-live-server');

let httpServer, seleniumServer;

gulp.task('http', (done) => {
    // var server = gls.new('lib/index.js', 9000);
    // server.start();
    let app = connect().use(serveStatic('./test/fixtures'));
    httpServer = http.createServer(app).listen(9000, done);
});

gulp.task('selenium', (done) => {
    selenium.install({logger: console.log}, () => {
        selenium.start((err, child) => {
            if (err) {
                return done(err);
            }
            seleniumServer = child;
            done();
        });
    });
});

gulp.task('e2e', ['http', 'selenium'], () => {
    return gulp.src('wdio.conf.js')
        .pipe(webdriver()).on('error', () => {
            seleniumServer.kill();
            process.exit(1);
        });
});

gulp.task('test:e2e', ['e2e'], () => {
    httpServer.close();
    seleniumServer.kill();
});
