let assert = require('assert');
let chai = require('chai');
chai.should();

let RandomElements = require('./../../lib/lib/randomelements');

describe('Random ID Sequence:', function () {

    before(function (done) {
        this.testRandomElements = new RandomElements.RandomElements();
        done();
    });

    it('is 26 digits long by default', function (done) {
        let seq = this.testRandomElements.select();
        seq.length.should.equal(26);
        done();
    });

    // it('has no repeated digits', function (done) {
    //     let one = 1;
    //     one.should.equal(1);
    //
    //     let seq = this.testRandomElements.select();
    //     let testArr = [];
    //     for (var i = 0; i < 10; i++) {
    //         testArr[i] = 0;
    //     }
    //     // console.log(testArr);
    //     for (var str in seq) {
    //         testArr[seq[str]] ++;
    //     }
    //     // console.log(testArr);
    //     for (let i = 0; i < testArr.length; i++) {
    //         assert(testArr[i] < 2);
    //     }
    //
    //     done();
    // });

    after(function (done) {
        done();
    });
});