var gulp        = require('gulp');
var concat			= require('gulp-concat');
var webpack   = require("webpack");
var bundle		= require('./bundle');
var gutil     = require("gulp-util");
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var path = require("path");

webpackConfig = {
	entry: {
		'index' : './examples/index.js',
		'shared' : './examples/shared.js',
		'examples' : './examples/examples.js',
		'documentation' : './examples/documentation.js'
	},
	output: {
		path: path.join(__dirname, "../../examples/build"),
		filename: "[name].js",
		libraryTarget: "umd"
	},
	externals: {
		"react": {
			root : 'React',
			commonjs : 'react',
			commonjs2 : 'react',
			amd : 'react'
		},
		"react/addons": {
			root : 'React',
			commonjs : 'react',
			commonjs2 : 'react',
			amd : 'react'
		},
		'faker':'faker',
		"moment" : "moment"
	},
	module: {
		loaders: [
		{ test: /\.js$/, loader: 'babel-loader?optional[]=runtime' } // loaders can take parameters as a querystring
		]
	},
	plugins: [

	]
}


gulp.task('script-deps',  function() {

	return gulp.src([
		'node_modules/es5-shim/es5-shim.js'
	])
	.pipe(concat('libs.js'))
	.pipe(gulp.dest('./examples/build'))
});


gulp.task("copy-dist", ['dist'], function(){
	//copy dist folder to examples
	return gulp.src([
		'dist/**',
		])
		.pipe(gulp.dest('./examples/build'))
});

gulp.task('minify-examples', ['copy-dist'], function(){
	  gulp.src('./examples/build/react-data-grid-with-addons.js')
    .pipe(uglify())
    .pipe(rename('react-data-grid-with-addons.min.js'))
    .pipe(gulp.dest('./examples/build'))
    .on('error', gutil.log);

    gulp.src('./examples/build/react-data-grid.js')
    .pipe(uglify())
    .pipe(rename('react-data-grid.min.js'))
    .pipe(gulp.dest('./examples/build'))
    .on('error', gutil.log);
});

// task
gulp.task('styles', function () {
	return gulp.src('./themes/react-data-grid.css')
	.pipe(gulp.dest('./examples/build'));
});


gulp.task("examples", ['script-deps', 'minify-examples', 'styles'],  function(callback) {

		// run webpack
		bundle(Object.create(webpackConfig), callback);
});
