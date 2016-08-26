let AllQuestions = require('../data/questions.json').questions;

export class SurveyReviewEngine {

    phaseTitle(phase) {
        let phaseTitles = [
            "CUSTOMISE THIS PICKUP KIT???",
            "REVIEW THE GOOD BITS",
            "REVIEW THE WEAK BITS",
            "BAM! YOUR KIT IS READY."
        ];
        return phaseTitles[phase];
    }

    checkPhase(req) {
        let phase = 0;
        if (req && req.body && req.body.customise) {
            if (req.body.positive) {
                if (req.body.negative) {
                    phase = 3;
                } else {
                    phase = 2;
                }
            } else {
                phase = 1;
            }
        }
        return phase;
    }

    checkQuestions(req) {
        if (req && req.body && req.body.questions) {
            return req.body.questions;
        }
        return null;
    }

    checkAnswers(req) {
        if (req && req.body && req.body.answers) {
            return req.body.answers;
        }
        return null;
    }

    checkEmail(req) {
        if (req && req.body && req.body.email) {
            return req.body.email;
        }
        return "NO EMAIL!";
    }

    buildSurveyResult(questions, answers) {
        let qmap = [];
        let resStr = [];
        for (let i = 0; i < questions.length; i++) {
            resStr.push(' ');
            if (questions[i] == '1') {
                qmap.push(i);
            }
        }
        let j = 0;
        for (let eachQ of qmap) {
            resStr[eachQ] = answers[j] == 1 ? '+' : '-';
            j++;
        }
        return resStr.join('');
    }

    checkDestination(req) {
        if (
            req
            && req.body
            && req.body.positive
            && req.body.negative
        ) {
            return 'generate';
        }
        return 'review';
    }

    checkStrengths(req) {

        if (!req) {
            return null;
        }
        if (!req.body) {
            return null;
        }
        if (!req.body.questions) {
            return null;
        }
        if (!req.body.answers) {
            return null;
        }

        let questions = req.body.questions;
        let answers = req.body.answers;
        let surveyResult = this.buildSurveyResult(questions, answers);
        let strengths = [];

        for (let i = 0; i < surveyResult.length; i++) {
            let res = surveyResult[i];
            if (res == '+') {
                strengths.push(AllQuestions[i]);
            }
        }

        return strengths;
    }

    checkWeaknesses(req) {

        if (!req) {
            return null;
        }
        if (!req.body) {
            return null;
        }
        if (!req.body.questions) {
            return null;
        }
        if (!req.body.answers) {
            return null;
        }

        let questions = req.body.questions;
        let answers = req.body.answers;
        let surveyResult = this.buildSurveyResult(questions, answers);
        let weaknesses = [];

        for (let i = 0; i < surveyResult.length; i++) {
            let res = surveyResult[i];
            if (res == '-') {
                weaknesses.push(AllQuestions[i]);
            }
        }

        return weaknesses;
    }

    gatherStrengths(req) {
        let strengths = '';
        if (req && req.body) {
            if (req.body.strengths) {
                return req.body.strengths;
            }
            for (let bodyItem in req.body) {
                let itemVal = req.body[bodyItem];
                if (itemVal == 'on') {
                    strengths += bodyItem;
                }
            }
        }
        return strengths;
    }

    gatherWeaknesses(req) {
        let weaknesses = '';
        if (req && req.body) {
            if (req.body.weaknesses) {
                return req.body.weaknesses;
            }
            for (let bodyItem in req.body) {
                let itemVal = req.body[bodyItem];
                if (itemVal == 'on') {
                    weaknesses += bodyItem;
                }
            }
        }
        return weaknesses;
    }

    constructor(req, routeName) {
        this.routeName = routeName;

        // if (req) {
        //     console.log(req.body || 'NO REQUEST BODY');
        // }

        let questions = this.checkQuestions(req);
        let answers = this.checkAnswers(req);

        let phase = this.checkPhase(req);
        let email = this.checkEmail(req);
        let heading = this.phaseTitle(phase);
        let destination = this.checkDestination(req);

        let strengths = this.checkStrengths(req);
        let weaknesses = this.checkWeaknesses(req);

        let gatheredStrengths = this.gatherStrengths(req);
        let gatheredWeaknesses = this.gatherWeaknesses(req);

        this.data = {
            email: email,
            questions: questions,
            answers: answers,
            heading: heading,
            destination: destination,
            strengths: strengths,
            weaknesses: weaknesses,
            gatheredStrengths: gatheredStrengths,
            gatheredWeaknesses: gatheredWeaknesses,
            phase: phase
        };
    }
}
