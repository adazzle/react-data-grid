var gulp = require('gulp');
var concat = require('gulp-concat');
var webpack = require("webpack");
var bundle = require('./bundle');
var gutil = require("gulp-util");
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var path = require("path");

console.log(path.resolve(__dirname, '../../src'))
webpackConfig = {
	entry: {
		'index': './examples/index.js',
		'shared': './examples/shared.js',
		'examples': './examples/examples.js',
		'documentation': './examples/documentation.js'
	},
	output: {
		path: path.join(__dirname, "../../examples/build"),
		filename: "[name].js",
		libraryTarget: "umd"
	},
	resolve: {
		alias: {
			react: path.resolve('./node_modules/react'),
			'react-dom': path.resolve('./node_modules/react-dom'),
			'react-data-grid': path.join(__dirname, "/../../dist/react-data-grid")
		}
	},
	externals: {
		"react": 'React',
    "react/addons": 'React',
    "react-dom": 'ReactDOM',
		'faker': 'faker',
		"moment": "moment"
	},
	module: {
		loaders: [
		    { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
		  ]
	},
	plugins: []
}


gulp.task('script-deps', function () {

	return gulp.src([
		'node_modules/es5-shim/es5-shim.js'
	])
		.pipe(concat('libs.js'))
		.pipe(gulp.dest('./examples/build'))
});


gulp.task("copy-dist", ['dist'], function () {
	//copy dist folder to examples
	return gulp.src([
		'dist/**',
		])
		.pipe(gulp.dest('./examples/build'))
});

gulp.task('minify-examples', ['copy-dist']);

// task
gulp.task('styles', function () {
	return gulp.src('./themes/react-data-grid.css')
		.pipe(gulp.dest('./examples/build'));
});


gulp.task("examples", ['script-deps', 'minify-examples', 'styles'], function (callback) {

		// run webpack
		bundle(Object.create(webpackConfig), callback);
});
