let AllQuestions = require('../data/questions.json').questions;

export class SurveyEngine {

    get defaultQuestionSelector() {
        return {
            select() {
                return '10011001001001001001100010';
            }
        };
    }

    get routeTitles() {
        return {
            'index': "Foxley - Live Website Audit Tool",
            'userdetails': 'USER DETAILS',
            'questions': 'QUESTIONS',
            'survey': 'THE SURVEY',
            'generate': "GENERATOR"
        };
    }

    checkRouteTitle(routeName = null) {
        this.routeName = routeName || 'index';
        return this.routeTitles[this.routeName];
    }

    checkRandomiser(randomiser) {
        if (!randomiser) {
            return this.defaultQuestionSelector;
        } else {
            return randomiser;
        }
    }

    checkQuestions(req) {
        if (!req) {
            return this.randomiser.select();
        }
        if (!req.questions) {
            return this.randomiser.select();
        }
        return req.questions;

    }

    checkAnswers(req) {
        if (!req) {
            return '';
        }
        if (!req.answers) {
            return '';
        }
        return req.answers;
    }

    findQuestion(questions, answers) {
        let qmap = [];
        if (answers == null) {
            answers = [];
        }
        for (let i = 0; i < questions.length; i++) {
            if (questions[i] == '1') {
                qmap.push(i);
            }
        }
        return qmap[answers.length];
    }

    nextQuestion(questions, answers) {
        let nextQuestionIndex = this.findQuestion(questions, answers);
        return AllQuestions[nextQuestionIndex];
    }

    constructor(req, routename, randomiser = null) {
        this.routeName = routename;
        this.randomiser = this.checkRandomiser(randomiser);

        let title = this.checkRouteTitle(routename);
        let questions = this.checkQuestions(req);
        let answers = this.checkAnswers(req);
        let nextQuestion = this.nextQuestion(questions, answers);

        this.data = {
            title: title,
            questions: questions,
            answers: answers,
            question_data: nextQuestion
        }
    }
}

