'use strict';

const gulp = require('gulp');
const webpack = require('gulp-webpack');
const gulpHandlebarsFileInclude = require('gulp-handlebars-file-include');
const browserSync = require('browser-sync').create();
const install = require("gulp-install");


gulp.task('js-deps', function() {
    return gulp.src(['./package.json'])
    .pipe(install());
});

// Compile offline templates
gulp.task('html', function () {
    return gulp.src('templates/task.html')
        .pipe(gulpHandlebarsFileInclude({}, {
                'handlebarsHelpers': [{
                    'name': 'raw',
                    'fn': function(options) {
                        return options.fn(this);
                    }
                }]
            }
        ))
        .pipe(gulp.dest("./dist"));
});

// process JS files and return the stream.
gulp.task('js', function () {
    return gulp.src('static/task.js')
        .pipe(webpack({
            output: {
                filename: "task.js"
            },
            module: {
                loaders: [{
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: 'babel-loader'
                }]  
            }
        }))
        .pipe(gulp.dest('./dist'));
});

// create a task that ensures the `js` task is complete before
// reloading browsers
gulp.task('js-watch', ['js'], function (done) {
    browserSync.reload();
    done();
});

// create a task that ensures the `js` task is complete before
// reloading browsers
gulp.task('html-watch', ['html'], function (done) {
    browserSync.reload();
    done();
});

// use default task to launch Browsersync and watch JS files
gulp.task('default', ['js', 'html'], function () {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });

    // add browserSync.reload to the tasks array to make
    // all browsers reload after tasks are complete.
    gulp.watch("static/*.js", ['js-watch']);
    gulp.watch("templates/*.html", ['html-watch']);
});