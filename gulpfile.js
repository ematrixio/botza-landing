const gulp         = require('gulp');
const sass         = require('gulp-sass')(require('sass'));
const postcss      = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano      = require('cssnano');
const sourcemaps   = require('gulp-sourcemaps');
const log          = require('fancy-log');
const plumber      = require('gulp-plumber'); // bug tracking module
const rigger       = require('gulp-rigger'); // a module to import the contents of one file into another
const uglify       = require('gulp-uglify'); // JavaScript minification module
const browserSync  = require('browser-sync').create();


//compile scss into css
function style() {
    return gulp.src('scss/starter.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
        includePaths: ['node_modules']
    }))
    .pipe(sass().on('error', function(err){
        log.error(err.message);
    }))
    .pipe(postcss([autoprefixer, cssnano]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('assets/css'))
    .pipe(browserSync.stream());
}

//compile js
function javascript() {
    return gulp.src('assets/js/starter.js')
    .pipe(plumber()) // for bug tracking
    .pipe(rigger()) // import all files to main.js
    .pipe(gulp.dest('assets/js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.init()) //initialize sourcemap
    .pipe(uglify()) // minimize js
    .pipe(sourcemaps.write('./')) //  write sourcemap
    .pipe(gulp.dest('assets/js')) // put ready file
    .pipe(browserSync.reload({ stream: true })); // server restart
}

function watch() {
    browserSync.init({
        server: {
           baseDir: "./",
           index: "/index.html"
        }
    });
    gulp.watch('scss/**/*.scss', style)
    // gulp.watch('assets/js/starter.js', javascript)
    gulp.watch('./*.html').on('change',browserSync.reload);
    gulp.watch('assets/js/**/*.js').on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;
