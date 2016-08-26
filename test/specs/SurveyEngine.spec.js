let assert = require('assert');
let chai = require('chai');
chai.should();

import {SurveyEngine} from '../../dist/app/lib/SurveyEngine';

let testQuestionSelection = '10011001001001001001100010';

class FakeRandomElements {
    select() {
        return '10011001001001001001100010';
    }
}

function getTestRequest() {
    "use strict";
    let testRequest = {
        body: {email: 'test@foxley-staging.com.au'}
    };
    return testRequest;
}

describe('The Survey Engine:', function () {

    before(function (done) {
        done();
    });

    it('sets its title according to route name', function (done) {

        let fakeRandom = new FakeRandomElements();
        let testRequest = getTestRequest();

        let s1 = new SurveyEngine(testRequest, 'index', fakeRandom);
        s1.routeName.should.equal('index');
        s1.data.title.should.equal('Foxley - Live Website Audit Tool');

        let s2 = new SurveyEngine(testRequest, 'userdetails', fakeRandom);
        s2.routeName.should.equal('userdetails');
        s2.data.title.should.equal('USER DETAILS');


        let s3 = new SurveyEngine(testRequest, 'questions', fakeRandom);
        s3.routeName.should.equal('questions');
        s3.data.title.should.equal('QUESTIONS');

        let s4 = new SurveyEngine(testRequest, 'generate', fakeRandom);
        s4.routeName.should.equal('generate');
        s4.data.title.should.equal('GENERATOR');

        done();
    });

    it('sets its title to "index" when constructed without a route name', ()=> {
        let testRequest = getTestRequest();
        let s = new SurveyEngine(testRequest, null, new FakeRandomElements());
        s.data.title.should.equal('Foxley - Live Website Audit Tool');
        s.routeName.should.equal('index');
    });


    it('checks for an email when none is provided', () => {
        let s = new SurveyEngine();
        s.data.email.should.equal('EMAIL');
    });

    it('checks for an email when no req body is provided', () => {
        let s = new SurveyEngine({});
        s.data.email.should.equal('NO REQ BODY!');
    });

    it('checks for an email when a req body is provided', () => {
        let s = new SurveyEngine({body:{}});
        s.data.email.should.equal('NO EMAIL!');
    });

    it('gets email when a req body and email is provided', () => {
        let s = new SurveyEngine({body:{ email: 'test@foxley-staging.com'}});
        s.data.email.should.equal('test@foxley-staging.com');
    });


    it('generates a set of 10 questions when there are none', function (done) {
        let testRequest = getTestRequest();
        let s = new SurveyEngine(testRequest, 'index', new FakeRandomElements());

        let zerocount = 0, onecount = 0;
        for (let eachItem in s.data.questions) {
            if (s.data.questions[eachItem] == '0') {
                zerocount++;
            } else {
                onecount++;
            }
        }

        onecount.should.equal(10);
        zerocount.should.equal(16);

        done();
    });

    it('does not generate a list of questions when there is one', function (done) {
        let testRequest = getTestRequest();

        let thisRequest = Object.assign({
            body: { questions: testQuestionSelection}
        }, testRequest);

        let s = new SurveyEngine(thisRequest, 'index');
        s.data.questions.should.equal(testQuestionSelection);
        done();
    });

    it('generates an empty answer list when there is none', () => {
        let testRequest = getTestRequest();
        let s = new SurveyEngine(testRequest, 'index', new FakeRandomElements());
        s.data.answers.should.equal('');
    });

    it('does not alter the answers list when there is an incomplete one', () => {
        let testRequest = getTestRequest();
        let thisRequest = Object.assign({}, testRequest);
        thisRequest.body['answers'] = '110000100';
        thisRequest.body['questions'] = testQuestionSelection;
        let s = new SurveyEngine(thisRequest, 'survey', new FakeRandomElements());
        s.data.answers[0].should.equal('1');
        s.data.answers[1].should.equal('1');
        s.data.answers[2].should.equal('0');
        s.data.answers[3].should.equal('0');
        s.data.answers[4].should.equal('0');
        s.data.answers[5].should.equal('0');
        s.data.answers[6].should.equal('1');
        s.data.answers[7].should.equal('0');
        s.data.answers[8].should.equal('0');
        assert(s.data.question_data != null,
            'there should be one last question');
    });

    it('does not alter the answers list when there is a complete one', () => {
        let testRequest = getTestRequest();
        let thisRequest = Object.assign({}, testRequest);
        thisRequest.body['answers'] = '1100001000';
        thisRequest.body['questions'] = testQuestionSelection;

        let s = new SurveyEngine(thisRequest, 'survey', new FakeRandomElements());
        s.data.answers[0].should.equal('1');
        s.data.answers[1].should.equal('1');
        s.data.answers[2].should.equal('0');
        s.data.answers[3].should.equal('0');
        s.data.answers[4].should.equal('0');
        s.data.answers[5].should.equal('0');
        s.data.answers[6].should.equal('1');
        s.data.answers[7].should.equal('0');
        s.data.answers[8].should.equal('0');
        s.data.answers[9].should.equal('0');

        assert(s.data.question_data == null);
    });

    it('finds question 0 when there are no answers', () => {
        let testRequest = getTestRequest();
        testRequest['questions'] = testQuestionSelection;
        let s = new SurveyEngine(testRequest, 'survey');
        let actualQuestion = s.findQuestion(testQuestionSelection, null);
        actualQuestion.should.equal(0);
    });

    it('finds question 3 when there is one answer', () => {
        let testRequest = getTestRequest();
        let s = new SurveyEngine(testRequest, 'survey');
        let actualQuestion = s.findQuestion(testQuestionSelection, '0');
        actualQuestion.should.equal(3);
    });

    it('finds question 4 when there are two answers', () => {
        let testRequest = getTestRequest();
        let s = new SurveyEngine(testRequest, 'survey');
        let actualQuestion = s.findQuestion(testQuestionSelection, '01');
        actualQuestion.should.equal(4);
    });


    it('retrieves the first question from the data file when there are no answers', () => {
        let testRequest = getTestRequest();
        let thisRequest = Object.assign({}, testRequest);
        thisRequest.body['questions'] = testQuestionSelection;
        let s = new SurveyEngine(thisRequest, 'survey');
        s.data.question_data.text.should.equal('Does the website look professional and is it aesthetically pleasing?')
    });

    it('retrieves the fourth question from the data file when there is one answer', () => {
        let testRequest = getTestRequest();
        let thisRequest = Object.assign({}, testRequest);
        thisRequest.body['questions'] = testQuestionSelection;
        thisRequest.body['answers'] = '0';
        let s = new SurveyEngine(thisRequest, 'survey');
        s.data.question_data.text.should.equal("Is there a contact number on the top of the website?")
    });

    it('retrieves the fifth question from the data file when there are two answers', () => {
        let testRequest = getTestRequest();
        let thisRequest = Object.assign({}, testRequest);
        thisRequest.body['questions'] = testQuestionSelection;
        thisRequest.body['answers'] = '01';
        let s = new SurveyEngine(thisRequest, 'survey');
        s.data.question_data.text.should.equal("Is it immediately clear what the business does?")
    });

    it('retrieves the eighth question from the data file when there are three answers', () => {
        let testRequest = getTestRequest();
        let thisRequest = Object.assign({}, testRequest);
        thisRequest.body['questions'] = testQuestionSelection;
        thisRequest.body['answers'] = '010';
        let s = new SurveyEngine(thisRequest, 'survey');
        s.data.question_data.text.should.equal("Is the menu navigation logical and easy to move around the website?")
    });



    it('handles construction with no questions, no answers and no randomiser', (done) => {
        let s = new SurveyEngine({}, 'survey');

        s.data.questions.should.equal('10011001001001001001100010');
        done();
    });

    it('handles construction with no answers and no randomiser', (done) => {
        let testRequest = getTestRequest();
        let thisRequest = Object.assign({questions: testQuestionSelection}, testRequest);
        let s = new SurveyEngine(thisRequest, 'survey');
        s.data.questions.should.equal(testQuestionSelection);
        done();
    });

    it('handles construction with questions and answers but no randomiser', (done) => {
        let testRequest = getTestRequest();
        let thisRequest = Object.assign({questions: testQuestionSelection, answers: '101'}, testRequest);
        let s = new SurveyEngine(thisRequest, 'survey');
        s.data.questions.should.equal(testQuestionSelection);
        done();
    });


    // let testQuestionSelection = '10011001001001001001100010';
    it('adds the answer to "this question" (the first question) to the answers list and readies the fourth question', () => {
        let testRequest = getTestRequest();
        let thisRequest = Object.assign({}, testRequest);
        thisRequest.body['questions'] = testQuestionSelection;
        thisRequest.body['answers'] = '';
        thisRequest.body['this_question'] = '0';
        let s = new SurveyEngine(thisRequest, 'question');
        s.data.answers.should.equal('0');
        s.data.question_data.text.should.equal('Is there a contact number on the top of the website?');
    });

    it('adds the answer to "this question" (the second question) to the answers list and readies the fifth question', () => {
        let testRequest = getTestRequest();
        let thisRequest = Object.assign({}, testRequest);
        thisRequest.body['questions'] = testQuestionSelection;
        thisRequest.body['answers'] = '0';
        thisRequest.body['this_question'] = '1';
        let s = new SurveyEngine(thisRequest, 'question');
        s.data.answers.should.equal('01');
        s.data.question_data.text.should.equal('Is it immediately clear what the business does?');
    });

    it('sets the destination path to "review" when the last question is answered', () => {
        let testRequest = getTestRequest();
        let thisRequest = Object.assign({}, testRequest);
        thisRequest.body['questions'] = testQuestionSelection;
        thisRequest.body['answers'] = '001100101';
        thisRequest.body['this_question'] = '1';
        let s = new SurveyEngine(thisRequest, 'review');
        s.data.destination.should.equal('review');
    });

    it('sets the destination path to "survey" when there are questions yet to be answered', () => {
        let testRequest = getTestRequest();
        let thisRequest = Object.assign({}, testRequest);
        thisRequest.body['questions'] = testQuestionSelection;
        thisRequest.body['answers'] = '00110010';
        thisRequest.body['this_question'] = '1';
        let s = new SurveyEngine(thisRequest, 'survey');
        s.data.destination.should.equal('survey');
    });

    it('sets the destination path to "generate" when all questions are answered', () => {
        let testRequest = getTestRequest();
        let thisRequest = Object.assign({}, testRequest);
        thisRequest.body['questions'] = testQuestionSelection;
        thisRequest.body['answers'] = '0011001010';
        thisRequest.body['this_question'] = '';
        let s = new SurveyEngine(thisRequest, 'survey');
        s.data.destination.should.equal('review');
    });


    after(function (done) {
        done();
    });
});