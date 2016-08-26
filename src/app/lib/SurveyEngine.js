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
        if (routeName == 'question') {
            return 'Question X';
        }
        return this.routeTitles[this.routeName];
    }

    checkEmail(req) {
        if (!req) {
            return 'EMAIL';
        }
        if (!req.body) {
            return "NO REQ BODY!";
        }
        if (!req.body.email) {
            return "NO EMAIL!";
        }
        return req.body.email;
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
        if (!req || !req.body) {
            return '';
        }
        let theAnswers = req.body.answers || '';
        theAnswers += this.checkThisQuestion(req);
        return theAnswers;
    }

    checkThisQuestion(req) {
        if (req && req.body && req.body.this_question) {
            return req.body.this_question;
        }
        return '';
    }

    findQuestionMap(questions) {
        let qmap = [];
        for (let i = 0; i < questions.length; i++) {
            if (questions[i] == '1') {
                qmap.push(i);
            }
        }
        return qmap;
    }

    findQuestion(questions, answers) {
        if (answers == null) {
            answers = [];
        }
        let qmap = this.findQuestionMap(questions);
        return qmap[answers.length];
    }

    nextQuestion(questions, answers) {
        let nextQuestionIndex = this.findQuestion(questions, answers);

        if (nextQuestionIndex == null) {
            return null; /*{
              text: 'ALL DONE!', negative: 'NEGATIVE', affirmative: 'AFFIRMATIVE'
            };*/
        }

        let theQuestion = AllQuestions[nextQuestionIndex];

        if (theQuestion.negative == '') {
            theQuestion.negative = 'No.';
        }
        if (theQuestion.affirmative == '') {
            theQuestion.affirmative = 'Yes.';
        }

        return theQuestion;
    }

    checkDestination(questions, answers) {
        if (answers == null) {
            return 'survey';
        }
        let answersLength = answers.length;
        let qmap = this.findQuestionMap(questions);
        if (answersLength == qmap.length) {
            return 'review';
        }
        return 'survey';
    }

    constructor(req, routename, randomiser = null) {

        this.routeName = routename;
        this.randomiser = this.checkRandomiser(randomiser);

        let title = this.checkRouteTitle(routename);
        let email = this.checkEmail(req);
        let questions = this.checkQuestions(req);
        let answers = this.checkAnswers(req);
        let nextQuestion = this.nextQuestion(questions, answers);

        let destination = this.checkDestination(questions, answers);

        this.data = {
            email: email,
            title: title,
            questions: questions,
            answers: answers,
            question_data: nextQuestion,
            destination: destination
        }
    }
}

