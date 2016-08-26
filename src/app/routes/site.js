let runtimeConstants = {
    toolname: "Client Connector",
    version: "1.0",
    base_href: "http://localhost:3000"
};

export class Site {
    static render(res, view, data) {
        var renderdata = Object.assign(data, {runtime: runtimeConstants});
        return res.render(
            view,
            renderdata
        );
    }
    static renderSurvey(res, survey) {
        var renderdata = Object.assign(survey.data, {runtime: runtimeConstants});
        return res.render(
            survey.routeName,
            {data: renderdata}
        );
    }
    static renderReview(res, review) {
        var renderdata = Object.assign(review.data, {runtime: runtimeConstants});
        return res.render(
            review.routeName,
            {data: renderdata}
        );
    }
    static renderGenerator(res, review) {
        var renderdata = Object.assign(review.data, {runtime: runtimeConstants});
        return res.render(
            review.routeName,
            {data: renderdata}
        );
    }
}
