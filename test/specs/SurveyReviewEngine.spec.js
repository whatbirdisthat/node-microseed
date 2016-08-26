let assert = require('assert');
let chai = require('chai');
chai.should();

import {SurveyReviewEngine} from '../../dist/app/lib/SurveyReviewEngine';

function getTestRequest() {
    "use strict";
    return {
        body: {
            email: 'test@foxley-staging.com.au',
            questions: '10011001001001001001100010',
            answers: '0110011001'
        }
    };
}

describe('The Survey Review Engine:', function () {

    before(function (done) {
        done();
    });

    it('sets its title according to route name', function (done) {

        let testRequest = getTestRequest();
        let r = new SurveyReviewEngine(testRequest, 'review');
        r.routeName.should.equal('review');

        r.data.questions.should.equal(testRequest.body.questions);
        r.data.answers.should.equal(testRequest.body.answers);
        r.data.email.should.equal(testRequest.body.email);

        r.data.heading.should.equal('CUSTOMISE THIS PICKUP KIT???');
        r.data.destination.should.equal('review');

        done();
    });

    it('sets its title to "REVIEW THE GOOD" when "customise" present', function (done) {

        let testRequest = getTestRequest();
        testRequest.body['customise'] = 1;

        let r = new SurveyReviewEngine(testRequest, 'review');
        r.routeName.should.equal('review');

        r.data.questions.should.equal(testRequest.body.questions);
        r.data.answers.should.equal(testRequest.body.answers);
        r.data.email.should.equal(testRequest.body.email);

        r.data.heading.should.equal('REVIEW THE GOOD BITS');
        r.data.destination.should.equal('review');

        done();
    });

    it('sets its title to "REVIEW THE BAD" when "positive" present', function (done) {

        let testRequest = getTestRequest();
        testRequest.body['customise'] = '1';
        testRequest.body['positive'] = '1';

        let r = new SurveyReviewEngine(testRequest, 'review');
        r.routeName.should.equal('review');

        r.data.questions.should.equal(testRequest.body.questions);
        r.data.answers.should.equal(testRequest.body.answers);
        r.data.email.should.equal(testRequest.body.email);

        r.data.heading.should.equal('REVIEW THE WEAK BITS');
        r.data.destination.should.equal('review');

        done();
    });

    it('sets its title to "BAM! YOUR KIT IS READY." when "positive" and "negative" present', function (done) {

        let testRequest = getTestRequest();
        testRequest.body['customise'] = '1';
        testRequest.body['positive'] = '1';
        testRequest.body['negative'] = '1';

        let r = new SurveyReviewEngine(testRequest, 'review');
        r.routeName.should.equal('review');

        r.data.questions.should.equal(testRequest.body.questions);
        r.data.answers.should.equal(testRequest.body.answers);
        r.data.email.should.equal(testRequest.body.email);

        r.data.heading.should.equal('BAM! YOUR KIT IS READY.');
        r.data.destination.should.equal('generate');

        done();
    });

    it('builds a survey result based on selected questions and their answers', () => {

        let expectedResu = '-  ++  -  -  +  +  --   + ';
        let theQuestions = '10011001001001001001100010';
        let theAnswers = '0110011001';

        let r = new SurveyReviewEngine();
        let surveyResult = r.buildSurveyResult(theQuestions, theAnswers);

        surveyResult.should.equal(expectedResu);

    });

    it('builds a survey result based on selected questions and their answers', () => {

        let expectedResu = '+  +   +- -  +  +  --   + ';
        let theQuestions = '10010001101001001001100010';
        let theAnswers = '1110011001';

        let r = new SurveyReviewEngine();
        let surveyResult = r.buildSurveyResult(theQuestions, theAnswers);

        surveyResult.should.equal(expectedResu);

    });

    it('presents a list of strengths identified from the survey', () => {

        let testRequest = getTestRequest();
        testRequest.body['customise'] = '1';

        let r = new SurveyReviewEngine(testRequest, 'review');

        r.routeName.should.equal('review');

        r.data.questions.should.equal(testRequest.body.questions);
        r.data.answers.should.equal(testRequest.body.answers);
        r.data.email.should.equal(testRequest.body.email);

        r.data.heading.should.equal('REVIEW THE GOOD BITS');
        r.data.destination.should.equal('review');

        r.data.strengths.length.should.equal(5);

        r.data.strengths[0].shortpositive.should.equal("Contact number on top of website.");
        r.data.strengths[1].shortpositive.should.equal("It's clear what the business is about.");
        r.data.strengths[2].shortpositive.should.equal("Responsive design.");
        r.data.strengths[3].shortpositive.should.equal("Unique meta descriptions for each page.");
        r.data.strengths[4].shortpositive.should.equal("Q25 YES");

    });

    it('presents a list of weaknesses identified from the survey', () => {

        let testRequest = getTestRequest();
        testRequest.body['customise'] = '1';
        testRequest.body['positive'] = '1';
        testRequest.body['strengths'] = 'bd'

        let r = new SurveyReviewEngine(testRequest, 'review');

        r.routeName.should.equal('review');

        r.data.questions.should.equal(testRequest.body.questions);
        r.data.answers.should.equal(testRequest.body.answers);
        r.data.email.should.equal(testRequest.body.email);

        r.data.heading.should.equal('REVIEW THE WEAK BITS');
        r.data.destination.should.equal('review');

        r.data.strengths.length.should.equal(5);

        r.data.weaknesses[0].shortnegative.should.equal("Overall design could be better.");
        r.data.weaknesses[1].shortnegative.should.equal("Menu navigation isn't easy.");
        r.data.weaknesses[2].shortnegative.should.equal("No customer testimonials or reviews.");
        r.data.weaknesses[3].shortnegative.should.equal("Copy is hard to read and digest.");
        r.data.weaknesses[4].shortnegative.should.equal("No keyword-rich content above the fold.");

    });

    it('gathers a list of strengths for the generator', () => {
        let testRequest = getTestRequest();
        testRequest.body['customise'] = '1';
        testRequest.body['positive'] = '1';
        testRequest.body['negative'] = '1';
        testRequest.body['confirmed'] = '1';

        testRequest.body['a'] = 'on';
        testRequest.body['c'] = 'on';
        testRequest.body['e'] = 'on';

        let r = new SurveyReviewEngine(testRequest, 'review');
        let gatheredStrengths = r.gatherStrengths(testRequest);

        gatheredStrengths.should.equal('ace');

    });

    it('does not alter the list of strengths if there is one', () => {
        let testRequest = getTestRequest();
        testRequest.body['customise'] = '1';
        testRequest.body['positive'] = '1';
        testRequest.body['negative'] = '1';
        testRequest.body['confirmed'] = '1';

        testRequest.body['strengths'] = 'ace';

        let r = new SurveyReviewEngine(testRequest, 'review');
        r.data.gatheredStrengths.should.equal('ace');
        r.data.gatheredWeaknesses.should.equal('');

    });

    it('gathers a list of weaknesses for the generator', () => {
        let testRequest = getTestRequest();
        testRequest.body['customise'] = '1';
        testRequest.body['positive'] = '1';
        testRequest.body['negative'] = '1';
        testRequest.body['confirmed'] = '1';

        testRequest.body['strengths'] = 'ace';

        testRequest.body['b'] = 'on';
        testRequest.body['d'] = 'on';
        testRequest.body['f'] = 'on';

        let r = new SurveyReviewEngine(testRequest, 'review');
        let gatheredWeaknesses = r.gatherWeaknesses(testRequest);

        gatheredWeaknesses.should.equal('bdf');

    });

    it('does not alter the list of weaknesses if there is one', () => {
        let testRequest = getTestRequest();
        testRequest.body['customise'] = '1';
        testRequest.body['positive'] = '1';
        testRequest.body['negative'] = '1';
        testRequest.body['confirmed'] = '1';

        testRequest.body['strengths'] = 'ace';
        testRequest.body['weaknesses'] = 'bdf';

        let r = new SurveyReviewEngine(testRequest, 'review');
        r.data.gatheredStrengths.should.equal('ace');
        r.data.gatheredWeaknesses.should.equal('bdf');

    });


    after(function (done) {
        done();
    });
});
