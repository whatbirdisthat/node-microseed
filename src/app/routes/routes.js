var express = require('express');
var router = express.Router();
var path = require('path');

import {Site} from './site';
import {SurveyEngine} from '../lib/SurveyEngine';
import {SurveyReviewEngine} from '../lib/SurveyReviewEngine';
import {EmailGenerator} from '../lib/EmailGenerator';
import {RandomElements} from '../lib/randomelements';

router.get('/', (req, res, next) => {
    return Site.render(res, 'index', {
        title: 'Foxley - Live Website Audit Tool'
    });
});

router.post('/userdetails', (req, res, next) => {
    let survey = new SurveyEngine(req, 'userdetails', new RandomElements());
    return Site.renderSurvey(res, survey);
});

router.post('/survey', (req, res, next) => {
    let survey = new SurveyEngine(req, 'survey');
    return Site.renderSurvey(res, survey);
});

router.post('/review', (req, res, next) => {
    let survey = new SurveyReviewEngine(req, 'review');
    return Site.renderReview(res, survey);
});

router.post('/generate', (req, res, next) => {
    let survey = new EmailGenerator(req, 'generate');
    return Site.renderGenerator(res, survey);
});

module.exports = router;
