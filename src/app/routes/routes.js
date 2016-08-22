var express = require('express');
var router = express.Router();
var path = require('path');

import {Site} from './site';
import {SurveyEngine} from '../lib/SurveyEngine';
import {RandomElements} from '../lib/randomelements';

router.get('/', (req, res, next) => {
    return Site.render(res, 'index', {
        title: 'Foxley - Live Website Audit Tool'
    });

});

router.post('/userdetails', (req, res, next) => {

    let survey = new SurveyEngine(req, 'userdetails', new RandomElements());
    return Site.renderSurvey(survey);

});

router.post('/questions', (req, res, next) => {
    return Site.render(res, 'questions', {
        title: "QUESTIONS",
        body: req.body
    });
});

router.post('/survey', (req, res, next) => {
    let survey = new SurveyEngine(req, 'survey');
    return Site.renderSurvey(survey);
    // return Site.render(res, 'survey', {
    //     title: "SURVEY",
    //     body: req.body
    // });
});

router.post('/generate', (req, res, next) => {
    return Site.render(res, 'generate', {
        title: "GENERATOR",
        body: req.body,
    });
});

module.exports = router;
