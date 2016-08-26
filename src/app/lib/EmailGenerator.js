let AllQuestions = require('../data/questions.json').questions;

export class EmailGenerator {

    questionMap() {
        let qmap = {};
        for (let eachQuestion of AllQuestions) {
            qmap[eachQuestion.id] = eachQuestion;
        }
        return qmap;
    }


    gatherStrengths(req) {
        let questionMap = this.questionMap();
        let strengths = [];
        if (req && req.body) {
            let theStrengths = req.body.strengths;
            for (let s = 0; s < theStrengths.length; s++) {
                let strengthIndex = theStrengths[s];
                strengths.push(questionMap[strengthIndex]);
            }
        }
        return strengths;
    }

    gatherWeaknesses(req) {
        let questionMap = this.questionMap();
        let weaknesses = [];
        if (req && req.body) {
            let theWeaknesses = req.body.weaknesses;
            for (let w = 0; w < theWeaknesses.length; w++) {
                let thisWeakness = theWeaknesses[w];
                weaknesses.push(questionMap[thisWeakness]);
            }
        }
        return weaknesses;
    }


    constructor(req, routeName) {
        this.routeName = routeName;

        // if (req) {
        //     console.log(req.body || 'NO REQUEST BODY');
        // }

        // let questions = this.checkQuestions(req);
        // let answers = this.checkAnswers(req);
        //
        // let phase = this.checkPhase(req);
        // let email = this.checkEmail(req);
        // let heading = this.phaseTitle(phase);
        // let destination = this.checkDestination(req);
        //
        // let strengths = this.checkStrengths(req);
        // let weaknesses = this.checkWeaknesses(req);

        let gatheredStrengths = this.gatherStrengths(req);
        let gatheredWeaknesses = this.gatherWeaknesses(req);

        this.data = {
            // email: email,
            // questions: questions,
            // answers: answers,
            // heading: heading,
            // destination: destination,
            // strengths: strengths,
            // weaknesses: weaknesses,
            gatheredStrengths: gatheredStrengths,
            gatheredWeaknesses: gatheredWeaknesses,
            // phase: phase
        };
    }

}