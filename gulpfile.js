const { src, dest, parallel, series, watch } = require('gulp');
const del = require('del');
const browsersync = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');

function browserSync() {
    browsersync.init({
        server: { baseDir: 'app/' },
        notify: false,
        online: true,
    })
}

function scripts() {
    return src([
        'app/js/script.js',
    ])
    .pipe(concat('script.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js/'))
    .pipe(browsersync.stream())
} 

function styles() {
    return src('app/scss/main.scss')
    .pipe(sass())
    .pipe(concat('style.min.css'))
    .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'] }))
    .pipe(cleancss(( { level: { 1: { specialComments : 0 } } })))
    .pipe(dest('app/css/'))
}

function images() {
    return src('app/img/source/**/*')
    .pipe(newer('app/img/finished/'))
    .pipe(imagemin())
    .pipe(dest('app/img/finished/'))
}

function cleanImg() {
    return del('app/img/finished/*')
}

function cleanDist() {
    return del('dist/**/*')
}

function moveImg() {
    return src('dist/img/finished/**/*')
    .pipe(dest('dist/img/'))
}

function delImg() {
    return del('dist/img/finished/')
}

function fileWatch() {
    watch('app/scss/**/*.scss', styles);
    watch(['js/**/*.js', '!js/**/*.min.js'], scripts);
    watch('app/**/*.html').on('change', browsersync.reload)
}

function buildDist() {
    return src([
        'app/css/**/*min.css',
        'app/js/**/*min.js',
        'app/img/finished/**/*',
        'app/**/*.html',
    ], { base: 'app' })
    .pipe(dest('dist'))
}

exports.browsersync = browserSync;
exports.scripts = scripts;
exports.styles = styles;
exports.images = images;
exports.cleanimg = cleanImg;
exports.moveimg = moveImg;
exports.delimg = delImg;

exports.build = series(cleanDist, styles, scripts, images, buildDist, moveImg, delImg);
exports.default = parallel (styles, scripts, browserSync, fileWatch);