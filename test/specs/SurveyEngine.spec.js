let assert = require('assert');
let chai = require('chai');
chai.should();

import {SurveyEngine} from '../../dist/app/lib/SurveyEngine';
class FakeRandomElements {
    select() {
        return '10011001001001001001100010';
    }
}

let testRequest = {
    email: 'test@foxley-staging.com.au'
};

let testQuestionSelection = '10011001001001001001100010';

describe('The Survey Engine:', function () {

    before(function (done) {
        done();
    });

    it('sets its title according to route name', function (done) {

        let fakeRandom = new FakeRandomElements();

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
        let s = new SurveyEngine(testRequest, null, new FakeRandomElements());
        s.data.title.should.equal('Foxley - Live Website Audit Tool');
        s.routeName.should.equal('index');
    });

    it('generates a set of 10 questions when there are none', function (done) {
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
        let thisRequest = Object.assign({}, testRequest);
        thisRequest['questions'] = testQuestionSelection;
        let s = new SurveyEngine(thisRequest, 'index');
        s.data.questions.should.equal(testQuestionSelection);
        done();
    });

    it('generates an empty answer list when there is none', () => {
        let s = new SurveyEngine(testRequest, 'index', new FakeRandomElements());
        s.data.answers.should.equal('');
    });

    it('does not alter the answers list when there is an incomplete one', () => {
        let thisRequest = Object.assign({}, testRequest);
        thisRequest['answers'] = '110000100';
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
        let thisRequest = Object.assign({}, testRequest);
        thisRequest['answers'] = '1100001000';
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
        testRequest['questions'] = testQuestionSelection;
        let s = new SurveyEngine(testRequest, 'survey');
        let actualQuestion = s.findQuestion(testQuestionSelection, null);
        actualQuestion.should.equal(0);
    });

    it('finds question 3 when there is one answer', () => {
        let s = new SurveyEngine(testRequest, 'survey');
        let actualQuestion = s.findQuestion(testQuestionSelection, '0');
        actualQuestion.should.equal(3);
    });

    it('finds question 4 when there are two answers', () => {
        let s = new SurveyEngine(testRequest, 'survey');
        let actualQuestion = s.findQuestion(testQuestionSelection, '01');
        actualQuestion.should.equal(4);
    });


    it('retrieves the first question from the data file when there are no answers', () => {
        let thisRequest = Object.assign({questions: testQuestionSelection}, testRequest);
        let s = new SurveyEngine(thisRequest, 'survey');
        s.data.question_data.text.should.equal('Does the website look professional and is it aesthetically pleasing?')
    });

    it('retrieves the fourth question from the data file when there is one answer', () => {
        let thisRequest = Object.assign({
            questions: testQuestionSelection,
            answers: '0'
        }, testRequest);
        let s = new SurveyEngine(thisRequest, 'survey');
        s.data.question_data.text.should.equal("Is there a contact number on the top of the website?")
    });

    it('retrieves the fifth question from the data file when there are two answers', () => {
        let thisRequest = Object.assign({
            questions: testQuestionSelection,
            answers: '01'
        }, testRequest);
        let s = new SurveyEngine(thisRequest, 'survey');
        s.data.question_data.text.should.equal("Is it immediately clear what the business does?")
    });

    it('retrieves the eighth question from the data file when there are three answers', () => {
        let thisRequest = Object.assign({
            questions: testQuestionSelection,
            answers: '010'
        }, testRequest);
        let s = new SurveyEngine(thisRequest, 'survey');
        s.data.question_data.text.should.equal("Is the menu navigation logical and easy to move around the website?")
    });



    it('handles construction with no questions, no answers and no randomiser', (done) => {
        let s = new SurveyEngine({}, 'survey');

        s.data.questions.should.equal('10011001001001001001100010');
        done();
    });

    it('handles construction with no answers and no randomiser', (done) => {
        let thisRequest = Object.assign({questions: testQuestionSelection}, testRequest);
        let s = new SurveyEngine(thisRequest, 'survey');
        s.data.questions.should.equal(testQuestionSelection);
        done();
    });

    it('handles construction with questions and answers but no randomiser', (done) => {
        let thisRequest = Object.assign({questions: testQuestionSelection, answers: '101'}, testRequest);
        let s = new SurveyEngine(thisRequest, 'survey');
        s.data.questions.should.equal(testQuestionSelection);
        done();
    });

    after(function (done) {
        done();
    });
});