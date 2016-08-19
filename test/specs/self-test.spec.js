let assert = require('assert');
let chai = require('chai');
chai.should();

describe('Test framework is ok', function () {
    before(function (done) {
        assert(1===1);
        done();
    });

    it('can test that one equals one', function (done) {
        let one = 1;
        one.should.equal(1);
        done();
    });

    it('can use "should" for testing', function (done) {
        let one = 1;
        one.should.equal(1);
        done();
    });

    after(function (done) {
        done();
    });
});