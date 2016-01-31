var gulp   = require('gulp'),
    gutil  = require('gulp-util'),
    uglify = require('gulp-uglify'),
    sass   = require('gulp-sass'),
    coffee = require('gulp-coffee'),
    concat = require('gulp-concat'),
    livereload = require('gulp-livereload'),
    http   = require('http'),
    st     = require('st');

var jsSources = [
    'node_modules/jquery/dist/jquery.js',
    'components/scripts/*.js',
    'coffee-compiled/*.js'
];

var sassSources = [
    'components/sass/*.scss'
];

var coffeeSources = [
    'components/coffee/*.coffee'
];

gulp.task('js', function () {
    gulp.src(jsSources)
        .pipe(uglify())
        .pipe(concat('script.js'))
        .pipe(gulp.dest('js'))
        .pipe(livereload());
});

gulp.task('sass', function () {
    gulp.src(sassSources)
        .pipe(sass({
            outputStyle: 'expanded',
            lineNumbers: true
        }).on('error', sass.logError))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('css'))
        .pipe(livereload());
});

gulp.task('coffee', function() {
    gulp.src(coffeeSources)
        .pipe(coffee().on('error', gutil.log))
        .pipe(gulp.dest('coffee-compiled'))
});

gulp.task('watch', ['watch:coffee'], function () {
    livereload.listen();

    gulp.watch(jsSources,     ['js']);
    gulp.watch(sassSources,   ['sass']);
    gulp.watch(['*.html'], function (e) {
        livereload.changed(e.path);
    });
});

gulp.task('watch:coffee', function () {
    gulp.watch(coffeeSources, ['coffee']);
});

gulp.task('server', function(done) {
    http.createServer(
        st({ path: __dirname, index: 'index.html', cache: false })
    ).listen(9090, done);
});

gulp.task('default', ['sass', 'js', 'watch', 'server']);
