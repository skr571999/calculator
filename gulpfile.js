const { src, dest, watch } = require('gulp');
const scss = require('gulp-sass');
const browserSync = require('browser-sync');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');

const s = 'src/';
const d = 'public/';

function htmlTask() {
    return src(s + 'html/*.html').pipe(dest(d));
}

function scssTask() {
    return src(s + 'styles/scss/*.scss')
        .pipe(
            scss({
                outputStyle: 'compressed',
            }).on('error', scss.logError)
        )
        .pipe(dest(d + 'styles/'))
        .pipe(browserSync.stream());
}

function scriptTask() {
    return src(s + 'scripts/*.js').pipe(dest(d + 'scripts/'));
}

function manifest() {
    return src(s + 'others/manifest.json').pipe(dest(d));
}

function serviceWorker() {
    return src(s + 'others/sw.js').pipe(dest(d));
}

function imageminTask() {
    return src(s + 'images/**/*')
        .pipe(newer(d + 'images/**/*'))
        .pipe(imagemin({ optimizationLevel: 5 }))
        .pipe(dest(d + 'images/'))
        .pipe(browserSync.stream());
}

function serverTask() {
    browserSync.init({
        server: d,
    });

    watch(s + 'html/*.html', { ignoreInitial: false }, htmlTask);
    watch(s + 'styles/scss/**/*.scss', { ignoreInitial: false }, scssTask);
    watch(s + 'scripts/**/*.js', { ignoreInitial: false }, scriptTask);
    watch(s + 'images/**/*', { ignoreInitial: false }, imageminTask);
    watch(s + 'others/manifest.json', { ignoreInitial: false }, manifest);
    watch(s + 'others/sw.js', { ignoreInitial: false }, serviceWorker);
    watch(d + '**/*').on('change', browserSync.reload);
}

exports.default = serverTask;
