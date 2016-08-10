import gulp from 'gulp'

export var Paths = {
    distRoot: 'dist',

    cssSources: [
        'node_modules/tether/src/css/tether.sass',
        'node_modules/bootstrap/scss/bootstrap.scss',
        'src/styles/styles.scss'
    ],
    cssOutFolder: 'dist/css',
    cssOutFile: 'styles.css',

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
        './node_modules/bootstrap/dist/js/bootstrap.js',
        './node_modules/three/build/three.js'
    ],
    jsLibFile: 'lib.js',
    jsLibDest: 'dist/js/lib',
    jsLibOut: 'dist/js/lib/lib.js',

    tsLibs: [
        'reflect-metadata/Reflect.js',
        'zone.js/dist/**/*.js'
    ],

    svgSources: 'src/svg/**/*.svg',
    svgOut: 'dist/svg'
};

export var Tasks = {
    build: 'build',
    clean: 'clean',
    css: 'css',
    html: 'html',
    js: 'js',
    json: 'json',
    svg: 'svg',
    ts: 'ts',
    watch: 'watch'
};

var TaskDescriptions = [
    {name: Tasks.build, text: "The BUILD task. This builds everything."},
    {name: Tasks.clean, text: "Removes the `dist` folder entirely."},
    {name: Tasks.css, text: "Builds the CSS from sass sources."},
    {name: Tasks.html, text: "Builds the HTML from sources."},
    {name: Tasks.js, text: "Builds the JS from sources."},
    {name: Tasks.json, text: "Deploys static reference data JSON from sources."},
    {name: Tasks.svg, text: "Builds the SVG from sources."},
    {name: Tasks.ts, text: "Builds the TS from sources."},
    {name: Tasks.watch, text: "Watches js/css/html files and rebuilds on change."}
];

export var WatchMap = [
    {path: 'src/svg/**/*.svg', tasks: [Tasks.svg]},
    {path: 'src/**/*.js', tasks: [Tasks.js]},
    {path: 'test/**/*.json', tasks: [Tasks.json]},
    {path: 'src/app/**/*.ts', tasks: [Tasks.ts]},
    {path: 'src/styles/**/*.scss', tasks: [Tasks.css]},
    {path: 'src/**/*.html', tasks: [Tasks.html]}
];


export var BuildChain = [Tasks.ts, Tasks.js, Tasks.svg, Tasks.css, Tasks.html, Tasks.json];

gulp.task('show-help', function () {

    console.log(
        '\n',
        String.fromCharCode(0x1B) + "[4mPipeline tasks for the *tiny* project.",
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
    // gutil.log(theError);
    console.log(theError.message);
    this.emit('end');
}

