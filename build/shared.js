(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	var Navbar = __webpack_require__(152);
	React.render(React.createElement(Navbar, null), document.getElementById('navbarContainer'));


/***/ },

/***/ 152:
/***/ function(module, exports, __webpack_require__) {

	/**
	* @jsx React.DOM
	*/
	module.exports = React.createClass({displayName: "exports",
	  render : function(){
	    return(
	      React.createElement("div", {className: "navbar navbar-fixed-top headroom"}, 
	        React.createElement("div", {className: "container"}, 
	          React.createElement("div", {className: "navbar-header"}, 
	          React.createElement("a", {href: "https://github.com/adazzle/react-grid/fork"}, React.createElement("img", {className: "github-ribbon", src: "http://aral.github.com/fork-me-on-github-retina-ribbons/right-green@2x.png", alt: "Fork me on GitHub"})), 

	            React.createElement("button", {type: "button", className: "navbar-toggle", "data-toggle": "collapse", "data-target": ".navbar-collapse"}, React.createElement("span", {className: "icon-bar"}), " ", React.createElement("span", {className: "icon-bar"}), " ", React.createElement("span", {className: "icon-bar"}), " "), 
	            React.createElement("a", {className: "navbar-brand", href: "index.html#"}, React.createElement("i", {className: "fa fa-table fa-2"}), " React Grid")
	          ), 
	          React.createElement("div", {className: "navbar-collapse collapse"}, 
	            React.createElement("ul", {className: "nav navbar-nav pull-right"}, 
	              React.createElement("li", {className: "active"}, React.createElement("a", {href: "index.html#"}, "Home")), 
	              React.createElement("li", null, React.createElement("a", {href: "documentation.html"}, "Documentation")), 
	              React.createElement("li", {className: "dropdown"}, 
	                React.createElement("a", {href: "#", className: "dropdown-toggle", "data-toggle": "dropdown"}, "Examples ", React.createElement("b", {className: "caret"})), 
	                  React.createElement("ul", {className: "dropdown-menu"}, 
	                    React.createElement("li", null, React.createElement("a", {href: "examples.html#/basic"}, "Basic Use")), 
	                    React.createElement("li", null, React.createElement("a", {href: "examples.html#/editable"}, "Editable Grid"))
	                    )
	                )
	            )
	          )
	        )
	    ))
	  }
	})


/***/ }

/******/ })
});
;