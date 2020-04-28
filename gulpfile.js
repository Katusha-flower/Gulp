const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const del = require('del');
const browserSync = require('browser-sync').create();


const cssfiles = [
    './src/css/main.css',
    './src/css/media.css'
]

const jsfiles = [
    './src/js/lib.js',
    './src/js/main.js'
]

function styles() {
    return gulp.src(cssfiles)
        .pipe(concat('style.css'))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('./build/css'))
        .pipe(browserSync.stream());

}

function scripts() {
    return gulp.src(jsfiles)
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./build/js'))
}
function clean() {
    return del(['build/*'])

}

function watch() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('./src/css/**/*.css', styles)
    gulp.watch('./src/css/**/*.js', scripts)
    gulp.watch("./*.html").on('change', browserSync.reload);
}

gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('del', clean);
gulp.task('watch', watch);
gulp.task('build', gulp.series(clean, gulp.parallel(styles, scripts)));
gulp.task('dev', gulp.series('build', 'watch'));