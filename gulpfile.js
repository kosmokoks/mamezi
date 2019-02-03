//
// Gulpfile
//
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    changed = require('gulp-changed'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    cssnano = require('gulp-cssnano'),
    uglify = require('gulp-uglifyjs'),
    browserSync = require('browser-sync').create();

//
// Gulp plumber error handler - displays if any error occurs during the process on your command
//
function errorLog(error) {
    console.error.bind(error);
    this.emit('end');
}


//
// SASS - Compile SASS files into CSS
//
gulp.task('sass', function () {
    // Theme
    gulp.src('./assets/include/scss/**/*.scss')
        .pipe(changed('./assets/css/'))
        .pipe(sass({outputStyle: 'expanded'}))
        .on('error', sass.logError)
        .pipe(autoprefixer([
            "last 1 major version",
            ">= 1%",
            "Chrome >= 45",
            "Firefox >= 38",
            "Edge >= 12",
            "Explorer >= 10",
            "iOS >= 9",
            "Safari >= 9",
            "Android >= 4.4",
            "Opera >= 30"], {cascade: true}))
        .pipe(gulp.dest('./assets/css/'))
        .pipe(browserSync.stream());
});


//
// BrowserSync (live reload) - keeps multiple browsers & devices in sync when building websites
//
//
gulp.task('serve', function () {
    browserSync.init({
        files: "./*.html",
        startPath: "./",
        server: {
            baseDir: "./",
        },
    })
});


//
// Gulp Watch and Tasks
//
//
gulp.task('watch', function () {
    gulp.watch('./assets/include/scss/**/*.scss', ['sass']);
    gulp.watch('./*.html').on('change', browserSync.reload);
});

// Gulp Tasks
gulp.task('default', ['watch', 'sass', 'serve']);


//
// CSS minifier - merges and minifies the below given list of Front libraries into one theme.min.css
//
gulp.task('minCSS', function () {
    return gulp.src([
        './assets/css/theme.css',
    ])
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist/css/'));
});


//
// JavaSript minifier - merges and minifies the below given list of Front libraries into one theme.min.js
//
gulp.task('minJS', function () {
    return gulp.src([
        './assets/js/*.js',
    ])
        .pipe(concat('theme.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js/'));
});

gulp.task('dist', ['minCSS', 'minJS']);