const { src, dest, watch } = require('gulp')
const scss = require('gulp-sass');
const browserSync = require('browser-sync');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const htmlmin = require('gulp-htmlmin');
const pug = require('gulp-pug');

const s = 'src/';
const d = 'public/';

function htmlTask() {
    return src(s + 'html/*.html')
        // .pipe(htmlmin({
        //     collapseWhitespace: true,
        //     removeComments: true
        // }))
        .pipe(dest(d))
    // .pipe(browserSync.stream());
}

function pugTask() {
    return src(s + 'pug/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(dest(d))
        .pipe(browserSync.stream());
}

function scssTask() {
    return src(s + 'styles/scss/*.scss')
        .pipe(scss({
            outputStyle: 'compressed'
        }).on('error', scss.logError))
        .pipe(dest(d + 'styles/'))
        .pipe(browserSync.stream());
}

function scriptTask() {
    return src(s + 'scripts/*.js')
        .pipe(dest(d + 'scripts/'))
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
        server: d
    })

    watch(s + 'html/*.html', { ignoreInitial: false }, htmlTask)
    // watch(s + 'pug/*.pug', { ignoreInitial: false }, pugTask)
    watch(s + 'styles/scss/**/*.scss', { ignoreInitial: false }, scssTask)
    watch(s + 'scripts/**/*.js', { ignoreInitial: false }, scriptTask)
    watch(s + 'images/**/*', { ignoreInitial: false }, imageminTask)
    watch(d + '**/*').on('change', browserSync.reload);
}

exports.default = serverTask