import gulp from 'gulp'

export var PROJECT_NAME = 'Audit Tool';

export var Paths = {
    distRoot: 'dist',
    libRoot: 'dist/app',
    coverageRoot: 'coverage',

    cssSources: [
        // 'node_modules/tether/src/css/tether.sass',
        // 'node_modules/bootstrap/scss/bootstrap.scss',
        'src/scss/audit-generator.scss'
    ],
    cssOutFolder: 'dist/css',
    cssOutFile: 'styles.css',

    views: [
        'src/views/*.pug'
    ],
    htmlSrc: 'src/html',
    htmlSources: [
        'src/**/*.html'
    ],

    json: [
        'src/**/*.json',
        // 'src/test/**/*.json'
    ],
    systemjs: [
        'src/systemjs.config.js'
    ],
    jsOutFile: 'scripts.js',
    jsDest: 'dist/js',
    jsLibs: [
        './node_modules/tether/dist/js/tether.js',
        './node_modules/bootstrap/dist/js/bootstrap.js'
    ],
    jsLibFile: 'lib.js',
    jsLibDest: 'dist/js/lib',
    jsLibOut: 'dist/js/lib/lib.js',

    svgSources: 'src/svg/**/*.svg',
    svgOut: 'dist/svg'
};

export var Tasks = {
    build: 'build',
    compile: 'compile',
    integration: 'integration',
    clean: 'clean',
    css: 'css',
    html: 'html',
    pug: 'pug',
    js: 'js',
    json: 'json',
    svg: 'svg',
    watch: 'watch'
};

var TaskDescriptions = [
    {name: Tasks.build, text: "The BUILD task. This builds everything."},
    {name: Tasks.compile, text: "Compiles all ES6 javascript back to ES5"},
    {name: Tasks.integration, text: "Runs a set of integration tests - Mocha and Cucumber"},
    {name: Tasks.clean, text: "Removes the `dist` folder entirely."},
    {name: Tasks.css, text: "Builds the CSS from sass sources."},
    {name: Tasks.html, text: "Builds the HTML from sources."},
    {name: Tasks.pug, text: "Builds the HTML from pug template sources."},
    {name: Tasks.js, text: "Builds the JS from sources."},
    {
        name: Tasks.json,
        text: "Deploys static reference data JSON from sources."
    },
    {name: Tasks.svg, text: "Builds the SVG from sources."},
    {
        name: Tasks.watch,
        text: "Watches js/css/html files and rebuilds on change."
    }
];

export var WatchMap = [
    {path: 'src/svg/**/*.svg', tasks: [Tasks.svg]},
    {path: 'src/lib/**/*.js', tasks: [Tasks.integration]},
    {path: 'src/app/**/*.js', tasks: [Tasks.compile]},
    {path: 'src/app/**/*.json', tasks: [Tasks.compile]},
    {path: 'src/js/**/*.js', tasks: [Tasks.js]},
    {path: 'test/**/*.json', tasks: [Tasks.json]},
    {path: 'src/scss/**/*.scss', tasks: [Tasks.css]},
    {path: 'src/**/*.html', tasks: [Tasks.html]},
    {path: 'src/app/views/**/*.pug', tasks: [Tasks.pug]}
];


export var BuildChain = [Tasks.compile, Tasks.js, Tasks.svg, Tasks.css, Tasks.pug, Tasks.html, Tasks.json];

gulp.task('show-help', function () {

    console.log(
        '\n',
        String.fromCharCode(0x1B) + "[4mPipeline tasks for the *" + PROJECT_NAME + "* project.",
        String.fromCharCode(0x1B) + "[0m",
        '\n'
    );

    for (var eachTask in Tasks) {
        var description = TaskDescriptions.find(function (it) {
            return it.name == eachTask
        });
        console.log(
            String.fromCharCode(0x1B) + "[33m  "
            + eachTask
            + String.fromCharCode(0x1B) + "[0m\n"
            + ' '
            + String.fromCharCode(0x1B) + "[34m    "
            + description.text
            + String.fromCharCode(0x1B) + "[0m"
        );
    }
    console.log('\n');

});

export function handleError(theError) {
    console.log(theError.message);
    this.emit('end');
}

