var gulp = require('gulp');
var jade = require('gulp-jade');
var stylus = require('gulp-stylus');
var nib = require('nib');
var rupture = require('rupture');
var jeet = require('jeet');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var es = require('event-stream');
var clean = require('gulp-clean');

gulp.task('clean', function() {
    return gulp.src(['../public/index.html',
                     '../public/static/css/main.css',
                     '../public/static/js/',
                     '../public/static/partials/'],
                     {base: '../public/'})
               .pipe(clean({force: true}));
});

gulp.task('stylus', ['clean'], function() {
    return gulp.src('./stylus/**/*.styl')
               .pipe(stylus({use: [nib(), rupture(), jeet()]}))
               .pipe(gulp.dest('../public/static/css/'));
});

gulp.task('jade', ['clean'], function() {
    return es.concat(
        gulp.src('./jade/partials/*.jade')
            .pipe(jade())
            .pipe(gulp.dest('../public/static/partials/')),

        gulp.src('./jade/*.jade')
            .pipe(jade())
            .pipe(gulp.dest('../public/'))
    );
});

gulp.task('copy-js', ['clean'], function() {
    return gulp.src('./js/**/*.js')
               .pipe(gulp.dest('../public/static/js/'));
});

gulp.task('watch', function() {
    gulp.watch('./stylus/**/*.styl', ['stylus']);
    gulp.watch('./jade/**/*.jade', ['jade']);
});

gulp.task('test', ['stylus', 'jade', 'watch']);
gulp.task('build', ['stylus', 'jade', 'copy-js']);
gulp.task('dev', ['build', 'watch']);
gulp.task('default', ['clean', 'build']);
