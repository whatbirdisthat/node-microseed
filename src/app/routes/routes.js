var express = require('express');
var router = express.Router();
var path = require('path');

import {RandomElements} from '../lib/randomelements';

function render_aspect_a(res, view, data) {
    var runtime_constants = {
        toolname: "Client Connector",
        version: "1.0"
    };
    var renderdata = Object.assign(data, {runtime: runtime_constants});
    console.log(renderdata);
    return res.render(
        view,
        renderdata
    );
}

router.get('/', function (req, res, next) {
    return render_aspect_a(res, 'index', {
        title: 'Foxley - Live Website Audit Tool'
    });

});

router.post('/userdetails', function (req, res, next) {
    let randomElements = new RandomElements();
    req.body['questions'] = randomElements.select();

    return render_aspect_a(res, 'userdetails', {
        title: "USER DETAILS",
        body: req.body
    });
});

router.post('/questions', function (req, res, next) {
    return render_aspect_a(res, 'questions', {
        title: "QUESTIONS",
        body: req.body
    });
});

router.post('/generate', function (req, res, next) {
    return render_aspect_a(res, 'generate', {
        title: "GENERATOR",
        body: req.body,
    });
});


module.exports = router;
