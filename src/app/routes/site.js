let runtimeConstants = {
    toolname: "Client Connector",
    version: "1.0",
    base_href: "http://localhost:3000"
};

export class Site {
    static render(res, view, data) {
        var renderdata = Object.assign(data, {runtime: runtimeConstants});
        console.log(renderdata);
        return res.render(
            view,
            renderdata
        );
    }
    static renderSurvey(survey) {
        var renderdata = Object.assign(data, {runtime: runtimeConstants});
        renderdata = Object.assign(renderdata, survey)
        console.log(renderdata);
        return res.render(
            view,
            renderdata
        );
    }
}