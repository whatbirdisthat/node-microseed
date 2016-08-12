var express = require('express');
var router = express.Router();

var runtime_constants = {
    tool_name: "Client Connector",
    version: "1.0"
};

function render_aspect_a(res, view, data) {
    "use strict";
    var renderdata = Object.assign(data, {runtime: runtime_constants});
    res.render(
        view,
        renderdata
    );
}

router.get('/', function (req, res, next) {
    "use strict";

    render_aspect_a(res, 'index',
        {title: 'Foxley - Live Website Audit Tool'}
    );

});

router.post('/user-details', function (req, res, next) {
    "use strict";
    console.log(req.body);
    render_aspect_a(res, 'userdetails', {
        title: "USER DETAILS", body: req.body
    });
});

router.post('/questions', function (req, res, next) {
    "use strict";
    console.log(req.body);

    // choose questions here

    render_aspect_a(res, 'questions', {
        title: "QUESTIONS",
        body: req.body
    });
});

router.post('/generate', function (req, res, next) {
    "use strict";
    console.log(req.body);

    // choose questions here

    render_aspect_a(res, 'generate', {
        runtime: runtime_constants,
        title: "GENERATOR",
        body: req.body,
    });
});


module.exports = router;

