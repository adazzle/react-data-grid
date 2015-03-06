var gulp        = require('gulp');
var concat			= require('gulp-concat');
var webpack   = require("webpack");
var bundle		= require('./bundle');
var gutil     = require("gulp-util");
var path = require("path");

webpackConfig = {
	entry: {
		'index' : './examples/index.js',
		'shared' : './examples/shared.js',
		'examples' : './examples/examples.js'
	},
	output: {
		path: path.join(__dirname, "../../examples/build"),
		filename: "[name].js",
		libraryTarget: "umd"
	},
	externals: {
		"react/addons": {
			root : 'React',
			commonjs : 'react/addons',
			commonjs2 : 'react/addons',
			amd : 'react/addons'
		},
		"moment" : "moment"
	},
	module: {
		loaders: [
		{ test: /\.js$/, loader: 'jsx-loader?stripTypes&harmony' } // loaders can take parameters as a querystring
		]
	},
	plugins: [
	new webpack.optimize.DedupePlugin(),

	new webpack.optimize.OccurenceOrderPlugin(),
	new webpack.optimize.AggressiveMergingPlugin()
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

// task
gulp.task('styles', function () {
	return gulp.src('./themes/reactGrid.css')
	.pipe(gulp.dest('./examples/build'));
});


gulp.task("examples", ['script-deps', 'copy-dist', 'styles'],  function(callback) {

		// run webpack
		bundle(Object.create(webpackConfig), callback);
});
