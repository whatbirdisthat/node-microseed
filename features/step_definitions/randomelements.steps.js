import {RandomElements} from "../../src/app/lib/randomelements";

var myStepDefinitionsWrapper = function () {

    this.thing = '';

    this.Given(/^I request a random sequence of non-repeating numbers$/, function (callback) {
        let testRandomElements = new RandomElements();
        this.thing = testRandomElements.select();
        callback();
    });

    this.When(/^The sequence is generated$/, function (callback) {
        callback();
    });

    this.Then(/^The sequence has no repeated numbers and is 10 digits long$/, function (callback) {

        var pageTitle = this.thing;

        if ("1001101101" === pageTitle) {
            callback();
        } else {
            callback(new Error("Expected to be on page with title "
                + "'1001101101'" + " - but was '" + pageTitle + "' instead"));
        }


    });
};

module.exports = myStepDefinitionsWrapper;


