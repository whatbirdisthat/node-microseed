exports.config = {

    specs: [
        './test/specs/*.js'
    ],
    exclude: [],
    capabilities: [{
        browserName: 'firefox'
    }],
    logLevel: 'error',
    coloredLogs: true,
    screenshotPath: './errorShots/',
    baseUrl: 'http://localhost',
    waitforTimeout: 10000,
    framework: 'mocha',
    reporter: 'dot',
    mochaOpts: {
        ui: 'bdd',
        compilers: ['js:babel-core/register']
    },
    onPrepare: function () {
        // do something
    },
    before: function () {
        // var chai = require('chai');
        // global.expect = chai.expect;
        // chai.Should();
    },
    after: function (failures, pid) {
        // do something
    },
    onComplete: function () {
        // do something
    }
};
