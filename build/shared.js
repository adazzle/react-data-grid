(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"), require("ReactDOM"), require("faker"));
	else if(typeof define === 'function' && define.amd)
		define(["React", "ReactDOM", "faker"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("React"), require("ReactDOM"), require("faker")) : factory(root["React"], root["ReactDOM"], root["faker"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_72__) {
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
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(2);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _Navbar = __webpack_require__(86);

	var _Navbar2 = _interopRequireDefault(_Navbar);

	var _scripts = __webpack_require__(50);

	var _scripts2 = _interopRequireDefault(_scripts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	_reactDom2['default'].render(_react2['default'].createElement(_Navbar2['default'], { exampleLinks: _scripts2['default'] }), document.getElementById('navbarContainer'));

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ExampleList = function (_React$Component) {
	  _inherits(ExampleList, _React$Component);

	  function ExampleList() {
	    _classCallCheck(this, ExampleList);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(ExampleList).apply(this, arguments));
	  }

	  _createClass(ExampleList, [{
	    key: 'render',
	    value: function render() {
	      var links = this.props.links.map(function (l) {
	        return _react2['default'].createElement(
	          'li',
	          { key: l.hashLocation },
	          _react2['default'].createElement(
	            'a',
	            { href: 'examples.html#/' + l.hashLocation },
	            l.name
	          )
	        );
	      });
	      return _react2['default'].createElement(
	        'ul',
	        this.props,
	        links
	      );
	    }
	  }]);

	  return ExampleList;
	}(_react2['default'].Component);

	ExampleList.propTypes = {
	  links: _react.PropTypes.array.isRequired
	};

	exports['default'] = ExampleList;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// Import all example JS scripts.
	var req = __webpack_require__(51);

	function getFriendlyName(input) {
	  var words = input.split('-').map(function (w) {
	    return w[0].toUpperCase() + w.substring(1);
	  });
	  return words.join(' ') + ' Example';
	}

	var exampleScripts = req.keys().map(function (key) {
	  var module = req(key);

	  // Use the file name to generate hash location and name.
	  var firstDashIndex = key.indexOf('-');
	  var hashLocation = key.substring(firstDashIndex + 1, key.length - 3);
	  var name = getFriendlyName(hashLocation);

	  return {
	    module: module,
	    name: name,
	    hashLocation: hashLocation
	  };
	});

	exports['default'] = exampleScripts;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./example01-basic.js": 52,
		"./example02-resizable-cols.js": 57,
		"./example03-fixed-cols.js": 60,
		"./example04-editable.js": 61,
		"./example05-custom-formatters.js": 62,
		"./example06-built-in-editors.js": 63,
		"./example08-sortable-cols.js": 64,
		"./example09-filterable-grid.js": 65,
		"./example10-one-million-rows.js": 66,
		"./example11-immutable-data.js": 67,
		"./example12-customRowRenderer.js": 69,
		"./example13-all-features.js": 71,
		"./example14-all-features-immutable.js": 73,
		"./example15-empty-rows.js": 77,
		"./example16-cell-drag-down.js": 78,
		"./example16-filterable-sortable-grid.js": 79,
		"./example16-row-select.js": 80,
		"./example17-single-row-select.js": 81,
		"./example18-context-menu.js": 82,
		"./example19-column-events.js": 83,
		"./example20-cell-navigation.js": 84,
		"./example21-cell-selection-events.js": 85
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 51;


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var QuickStartDescription = __webpack_require__(53);
	var ReactPlayground = __webpack_require__(56);

	var SimpleExample = '\n\nvar _rows = [];\nfor (var i = 1; i < 1000; i++) {\n  _rows.push({\n    id: i,\n    title: \'Title \' + i,\n    count: i * 1000\n  });\n}\n\n//A rowGetter function is required by the grid to retrieve a row for a given index\nvar rowGetter = function(i){\n  return _rows[i];\n};\n\n\nvar columns = [\n{\n  key: \'id\',\n  name: \'ID\'\n},\n{\n  key: \'title\',\n  name: \'Title\'\n},\n{\n  key: \'count\',\n  name: \'Count\'\n}\n]\n\nvar Example = React.createClass({\n  render: function() {\n    return  (<ReactDataGrid\n    columns={columns}\n    rowGetter={rowGetter}\n    rowsCount={_rows.length}\n    minHeight={500} />);\n  }\n});\nReactDOM.render(<Example />, mountNode);\n';

	module.exports = React.createClass({
	  displayName: 'exports',


	  render: function render() {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'h3',
	        null,
	        'A Simple Example'
	      ),
	      React.createElement(ReactPlayground, { codeText: SimpleExample })
	    );
	  }

	});

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var RowsDescription = __webpack_require__(54);
	var ColsDescription = __webpack_require__(55);

	module.exports = React.createClass({
	  displayName: 'exports',


	  render: function render() {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'h3',
	        { id: 'js-basic-example' },
	        this.props.title
	      ),
	      React.createElement(
	        'p',
	        null,
	        'The most basic implementation of ReactDataGrid requires 4 properties; an array of columns, a rowGetter function to retrive a row for a given index, the number of rows the grid expects and the minimum height of the grid.'
	      ),
	      React.createElement(ColsDescription, null),
	      React.createElement(RowsDescription, null),
	      React.createElement(
	        'p',
	        null,
	        'Now simply invoke ReactDOM.render(..) passing the array of rows and columns as props'
	      ),
	      React.createElement(
	        'div',
	        { className: 'code-block js' },
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'javascript' },
	            "ReactDOM.render(<ReactDataGrid columns={columns} rowGetter={rowGetter} rowsCount={rowsCount()} minHeight={500} />, document.getElementById('example'))"
	          )
	        )
	      )
	    );
	  }
	});

/***/ },
/* 54 */
/***/ function(module, exports) {

	"use strict";

	module.exports = React.createClass({
	  displayName: "exports",

	  render: function render() {
	    return React.createElement(
	      "div",
	      null,
	      React.createElement(
	        "p",
	        null,
	        "The rows property should be an array of objects whose property names match the key property of each column"
	      ),
	      React.createElement(
	        "div",
	        { className: "code-block js" },
	        React.createElement(
	          "pre",
	          null,
	          React.createElement(
	            "code",
	            { className: "javascript" },
	            "var _rows = [];\nfor (var i = 0; i < 1000; i++) {\n  _rows.push({\n    id: i,\n    title: \'Title \' + i,\n    count: i * 1000\n  });\n}\n\nvar rowGetter = function(i){\n  return _rows[i];\n};\n\nvar rowsCount = function(){\n  return _rows.length;\n}\n"
	          )
	        )
	      )
	    );
	  }
	});

/***/ },
/* 55 */
/***/ function(module, exports) {

	"use strict";

	module.exports = React.createClass({
	  displayName: "exports",

	  render: function render() {
	    return React.createElement(
	      "div",
	      null,
	      React.createElement(
	        "p",
	        null,
	        "The columns property is an array of objects that has at a minimum key and name properties"
	      ),
	      React.createElement(
	        "div",
	        { className: "code-block js" },
	        React.createElement(
	          "pre",
	          null,
	          "var columns = [\n{\n  key: \'id\',\n  name: \'ID\'\n},\n{\n  key: \'title\',\n  name: \'Title\'\n},\n{\n  key: \'count\',\n  name: \'Count\'\n}]\n\}"
	        )
	      )
	    );
	  }
	});

/***/ },
/* 56 */
/***/ function(module, exports) {

	'use strict';

	var IS_MOBILE = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i);
	var IS_MOBILE = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i);

	var CodeMirrorEditor = React.createClass({
	  displayName: 'CodeMirrorEditor',

	  propTypes: {
	    lineNumbers: React.PropTypes.bool,
	    onChange: React.PropTypes.func
	  },
	  getDefaultProps: function getDefaultProps() {
	    return {
	      lineNumbers: false
	    };
	  },
	  componentDidMount: function componentDidMount() {
	    if (IS_MOBILE) return;

	    this.editor = CodeMirror.fromTextArea(this.refs.editor, {
	      mode: 'javascript',
	      lineNumbers: this.props.lineNumbers,
	      lineWrapping: true,
	      smartIndent: false, // javascript mode does bad things with jsx indents
	      matchBrackets: true,
	      theme: 'solarized-light',
	      readOnly: this.props.readOnly
	    });
	    this.editor.on('change', this.handleChange);
	  },

	  componentDidUpdate: function componentDidUpdate() {
	    if (this.props.readOnly) {
	      this.editor.setValue(this.props.codeText);
	    }
	  },

	  handleChange: function handleChange() {
	    if (!this.props.readOnly) {
	      this.props.onChange && this.props.onChange(this.editor.getValue());
	    }
	  },

	  render: function render() {
	    // wrap in a div to fully contain CodeMirror
	    var editor;

	    if (IS_MOBILE) {
	      editor = React.createElement(
	        'pre',
	        { style: { overflow: 'scroll' } },
	        this.props.codeText
	      );
	    } else {
	      editor = React.createElement('textarea', { ref: 'editor', defaultValue: this.props.codeText });
	    }

	    return React.createElement(
	      'div',
	      { style: this.props.style, className: this.props.className },
	      editor
	    );
	  }
	});

	var selfCleaningTimeout = {
	  componentDidUpdate: function componentDidUpdate() {
	    clearTimeout(this.timeoutID);
	  },

	  setTimeout: function (_setTimeout) {
	    function setTimeout() {
	      return _setTimeout.apply(this, arguments);
	    }

	    setTimeout.toString = function () {
	      return _setTimeout.toString();
	    };

	    return setTimeout;
	  }(function () {
	    clearTimeout(this.timeoutID);
	    this.timeoutID = setTimeout.apply(null, arguments);
	  })
	};

	module.exports = React.createClass({
	  displayName: 'exports',

	  mixins: [selfCleaningTimeout],

	  MODES: { JSX: 'JSX', JS: 'JS' }, //keyMirror({JSX: true, JS: true}),

	  propTypes: {
	    codeText: React.PropTypes.string.isRequired,
	    transformer: React.PropTypes.func,
	    renderCode: React.PropTypes.bool,
	    showCompiledJSTab: React.PropTypes.bool,
	    showLineNumbers: React.PropTypes.bool,
	    editorTabTitle: React.PropTypes.string
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      transformer: function transformer(code) {
	        return JSXTransformer.transform(code).code;
	      },
	      editorTabTitle: 'Live JSX Editor',
	      showCompiledJSTab: true,
	      showLineNumbers: false
	    };
	  },

	  getInitialState: function getInitialState() {
	    return {
	      mode: this.MODES.JSX,
	      code: this.props.codeText
	    };
	  },

	  handleCodeChange: function handleCodeChange(value) {
	    this.setState({ code: value });
	    this.executeCode();
	  },

	  handleCodeModeSwitch: function handleCodeModeSwitch(mode) {
	    this.setState({ mode: mode });
	  },

	  compileCode: function compileCode() {
	    return this.props.transformer(this.state.code);
	  },

	  render: function render() {
	    var isJS = this.state.mode === this.MODES.JS;
	    var compiledCode = '';
	    try {
	      compiledCode = this.compileCode();
	    } catch (err) {}

	    var JSContent = React.createElement(CodeMirrorEditor, {
	      key: 'js',
	      className: 'playgroundStage CodeMirror-readonly',
	      onChange: this.handleCodeChange,
	      codeText: compiledCode,
	      readOnly: true,
	      lineNumbers: this.props.showLineNumbers
	    });

	    var JSXContent = React.createElement(CodeMirrorEditor, {
	      key: 'jsx',
	      onChange: this.handleCodeChange,
	      className: 'playgroundStage',
	      codeText: this.state.code,
	      lineNumbers: this.props.showLineNumbers
	    });

	    var JSXTabClassName = 'playground-tab' + (isJS ? '' : ' playground-tab-active');
	    var JSTabClassName = 'playground-tab' + (isJS ? ' playground-tab-active' : '');

	    var JSTab = React.createElement(
	      'div',
	      {
	        className: JSTabClassName,
	        onClick: this.handleCodeModeSwitch.bind(this, this.MODES.JS) },
	      'Compiled JS'
	    );

	    var JSXTab = React.createElement(
	      'div',
	      {
	        className: JSXTabClassName,
	        onClick: this.handleCodeModeSwitch.bind(this, this.MODES.JSX) },
	      this.props.editorTabTitle
	    );

	    return React.createElement(
	      'div',
	      { className: 'playground' },
	      React.createElement(
	        'div',
	        { className: 'playgroundPreview' },
	        React.createElement('div', { ref: 'mount' })
	      ),
	      React.createElement(
	        'div',
	        null,
	        JSXTab,
	        this.props.showCompiledJSTab && JSTab
	      ),
	      React.createElement(
	        'div',
	        { className: 'playgroundCode' },
	        isJS ? JSContent : JSXContent
	      )
	    );
	  },

	  componentDidMount: function componentDidMount() {
	    this.executeCode();
	  },

	  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
	    // execute code only when the state's not being updated by switching tab
	    // this avoids re-displaying the error, which comes after a certain delay
	    if (this.props.transformer !== prevProps.transformer || this.state.code !== prevState.code) {
	      this.executeCode();
	    }
	  },

	  executeCode: function executeCode() {
	    var mountNode = this.refs.mount;

	    try {
	      ReactDOM.unmountComponentAtNode(mountNode);
	    } catch (e) {}

	    try {
	      var compiledCode = this.compileCode();
	      if (this.props.renderCode) {
	        ReactDOM.render(React.createElement(CodeMirrorEditor, { codeText: compiledCode, readOnly: true }), mountNode);
	      } else {
	        eval(compiledCode);
	      }
	    } catch (err) {
	      this.setTimeout(function () {
	        ReactDOM.render(React.createElement(
	          'div',
	          { className: 'playgroundError' },
	          err.toString()
	        ), mountNode);
	      }, 500);
	    }
	  }
	});

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ReactGrid = __webpack_require__(58);
	var QuickStartDescription = __webpack_require__(53);
	var ReactPlayground = __webpack_require__(56);

	var ResizableExample = '\n//helper to generate a random date\nfunction randomDate(start, end) {\n  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();\n};\n\nvar _rows = [];\nfor (var i = 1; i < 1000; i++) {\n  _rows.push({\n    id: i,\n    task: \'Task \' + i,\n    complete: Math.min(100, Math.round(Math.random() * 110)),\n    priority : [\'Critical\', \'High\', \'Medium\', \'Low\'][Math.floor((Math.random() * 3) + 1)],\n    issueType : [\'Bug\', \'Improvement\', \'Epic\', \'Story\'][Math.floor((Math.random() * 3) + 1)],\n    startDate: randomDate(new Date(2015, 3, 1), new Date()),\n    completeDate: randomDate(new Date(), new Date(2016, 0, 1))\n  });\n}\n\n//function to retrieve a row for a given index\nvar rowGetter = function(i){\n  return _rows[i];\n};\n\n\n//Columns definition\nvar columns = [\n{\n  key: \'id\',\n  name: \'ID\',\n  resizable : true,\n  width : 40\n},\n{\n  key: \'task\',\n  name: \'Title\',\n  resizable : true\n},\n{\n  key: \'priority\',\n  name: \'Priority\',\n  resizable : true\n},\n{\n  key: \'issueType\',\n  name: \'Issue Type\',\n  resizable : true\n},\n{\n  key: \'complete\',\n  name: \'% Complete\',\n  resizable : true\n},\n{\n  key: \'startDate\',\n  name: \'Start Date\',\n  resizable : true\n},\n{\n  key: \'completeDate\',\n  name: \'Expected Complete\',\n  resizable : true\n}\n]\n\nReactDOM.render(<ReactDataGrid\n  columns={columns}\n  rowGetter={rowGetter}\n  rowsCount={_rows.length}\n  minHeight={500} />, mountNode);\n';

	module.exports = React.createClass({
	  displayName: 'exports',


	  render: function render() {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'h3',
	        null,
	        'Resizable Columns Example'
	      ),
	      React.createElement(
	        'p',
	        null,
	        'To make a given column resizable, set ',
	        React.createElement(
	          'code',
	          null,
	          'column.resizable = true'
	        )
	      ),
	      React.createElement(
	        'p',
	        null,
	        'If you need to know when a column has been resized, use the ',
	        React.createElement(
	          'code',
	          null,
	          'onColumnResize'
	        ),
	        ' prop. This will be triggered when a column is resized and will report the column index and its new width. These can be saved on the back-end and used to restore column widths when the component is initialized, by setting ',
	        React.createElement(
	          'code',
	          null,
	          'width'
	        ),
	        ' key in each column.'
	      ),
	      React.createElement(ReactPlayground, { codeText: ResizableExample })
	    );
	  }

	});

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {'use strict';var _typeof2=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol?"symbol":typeof obj;};(function webpackUniversalModuleDefinition(root,factory){if(( false?'undefined':_typeof2(exports))==='object'&&( false?'undefined':_typeof2(module))==='object')module.exports=factory(__webpack_require__(1),__webpack_require__(2));else if(true)!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1),__webpack_require__(2)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else if((typeof exports==='undefined'?'undefined':_typeof2(exports))==='object')exports["ReactDataGrid"]=factory(require("react"),require("react-dom"));else root["ReactDataGrid"]=factory(root["React"],root["ReactDOM"]);})(undefined,function(__WEBPACK_EXTERNAL_MODULE_2__,__WEBPACK_EXTERNAL_MODULE_3__){return  (/******/function(modules){ // webpackBootstrap
	/******/ // The module cache
	/******/var installedModules={}; /******/ // The require function
	/******/function __webpack_require__(moduleId){ /******/ // Check if module is in cache
	/******/if(installedModules[moduleId]) /******/return installedModules[moduleId].exports; /******/ // Create a new module (and put it into the cache)
	/******/var module=installedModules[moduleId]={ /******/exports:{}, /******/id:moduleId, /******/loaded:false /******/}; /******/ // Execute the module function
	/******/modules[moduleId].call(module.exports,module,module.exports,__webpack_require__); /******/ // Flag the module as loaded
	/******/module.loaded=true; /******/ // Return the exports of the module
	/******/return module.exports; /******/} /******/ // expose the modules object (__webpack_modules__)
	/******/__webpack_require__.m=modules; /******/ // expose the module cache
	/******/__webpack_require__.c=installedModules; /******/ // __webpack_public_path__
	/******/__webpack_require__.p=""; /******/ // Load entry module and return exports
	/******/return __webpack_require__(0); /******/}( /************************************************************************/ /******/[ /* 0 */ /***/function(module,exports,__webpack_require__){'use strict';var Grid=__webpack_require__(1);var Row=__webpack_require__(87);var Cell=__webpack_require__(88);module.exports=Grid;module.exports.Row=Row;module.exports.Cell=Cell; /***/}, /* 1 */ /***/function(module,exports,__webpack_require__){'use strict';var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else {obj[key]=value;}return obj;}var React=__webpack_require__(2);var ReactDOM=__webpack_require__(3);var BaseGrid=__webpack_require__(4);var Row=__webpack_require__(87);var ExcelColumn=__webpack_require__(15);var KeyboardHandlerMixin=__webpack_require__(90);var CheckboxEditor=__webpack_require__(99);var DOMMetrics=__webpack_require__(97);var ColumnMetricsMixin=__webpack_require__(100);var RowUtils=__webpack_require__(102);var ColumnUtils=__webpack_require__(10);if(!Object.assign){Object.assign=__webpack_require__(101);}var ReactDataGrid=React.createClass({displayName:'ReactDataGrid',mixins:[ColumnMetricsMixin,DOMMetrics.MetricsComputatorMixin,KeyboardHandlerMixin],propTypes:{rowHeight:React.PropTypes.number.isRequired,headerRowHeight:React.PropTypes.number,minHeight:React.PropTypes.number.isRequired,minWidth:React.PropTypes.number,enableRowSelect:React.PropTypes.oneOfType([React.PropTypes.bool,React.PropTypes.string]),onRowUpdated:React.PropTypes.func,rowGetter:React.PropTypes.func.isRequired,rowsCount:React.PropTypes.number.isRequired,toolbar:React.PropTypes.element,enableCellSelect:React.PropTypes.bool,columns:React.PropTypes.oneOfType([React.PropTypes.object,React.PropTypes.array]).isRequired,onFilter:React.PropTypes.func,onCellCopyPaste:React.PropTypes.func,onCellsDragged:React.PropTypes.func,onAddFilter:React.PropTypes.func,onGridSort:React.PropTypes.func,onDragHandleDoubleClick:React.PropTypes.func,onGridRowsUpdated:React.PropTypes.func,onRowSelect:React.PropTypes.func,rowKey:React.PropTypes.string,rowScrollTimeout:React.PropTypes.number,onClearFilters:React.PropTypes.func,contextMenu:React.PropTypes.element,cellNavigationMode:React.PropTypes.oneOf(['none','loopOverRow','changeRow']),onCellSelected:React.PropTypes.func,onCellDeSelected:React.PropTypes.func},getDefaultProps:function getDefaultProps(){return {enableCellSelect:false,tabIndex:-1,rowHeight:35,enableRowSelect:false,minHeight:350,rowKey:'id',rowScrollTimeout:0,cellNavigationMode:'none'};},getInitialState:function getInitialState(){var columnMetrics=this.createColumnMetrics();var initialState={columnMetrics:columnMetrics,selectedRows:[],copied:null,expandedRows:[],canFilter:false,columnFilters:{},sortDirection:null,sortColumn:null,dragged:null,scrollOffset:0};if(this.props.enableCellSelect){initialState.selected={rowIdx:0,idx:0};}else {initialState.selected={rowIdx:-1,idx:-1};}return initialState;},hasSelectedCellChanged:function hasSelectedCellChanged(selected){var previouslySelected=Object.assign({},this.state.selected);return previouslySelected.rowIdx!==selected.rowIdx||previouslySelected.idx!==selected.idx||previouslySelected.active===false;},onContextMenuHide:function onContextMenuHide(){document.removeEventListener('click',this.onContextMenuHide);var newSelected=Object.assign({},this.state.selected,{contextMenuDisplayed:false});this.setState({selected:newSelected});},onColumnEvent:function onColumnEvent(ev,columnEvent){var idx=columnEvent.idx;var name=columnEvent.name;if(name&&typeof idx!=='undefined'){var column=this.getColumn(idx);if(column&&column.events&&column.events[name]&&typeof column.events[name]==='function'){var eventArgs={rowIdx:columnEvent.rowIdx,idx:idx,column:column};column.events[name](ev,eventArgs);}}},onSelect:function onSelect(selected){var _this=this;if(this.state.selected.rowIdx!==selected.rowIdx||this.state.selected.idx!==selected.idx||this.state.selected.active===false){var _idx=selected.idx;var _rowIdx=selected.rowIdx;if(_idx>=0&&_rowIdx>=0&&_idx<ColumnUtils.getSize(this.state.columnMetrics.columns)&&_rowIdx<this.props.rowsCount){(function(){var oldSelection=_this.state.selected;_this.setState({selected:selected},function(){if(typeof _this.props.onCellDeSelected==='function'){_this.props.onCellDeSelected(oldSelection);}if(typeof _this.props.onCellSelected==='function'){_this.props.onCellSelected(selected);}});})();}}},onCellClick:function onCellClick(cell){this.onSelect({rowIdx:cell.rowIdx,idx:cell.idx});},onCellContextMenu:function onCellContextMenu(cell){this.onSelect({rowIdx:cell.rowIdx,idx:cell.idx,contextMenuDisplayed:this.props.contextMenu});if(this.props.contextMenu){document.addEventListener('click',this.onContextMenuHide);}},onCellDoubleClick:function onCellDoubleClick(cell){this.onSelect({rowIdx:cell.rowIdx,idx:cell.idx});this.setActive('Enter');},onViewportDoubleClick:function onViewportDoubleClick(){this.setActive();},onPressArrowUp:function onPressArrowUp(e){this.moveSelectedCell(e,-1,0);},onPressArrowDown:function onPressArrowDown(e){this.moveSelectedCell(e,1,0);},onPressArrowLeft:function onPressArrowLeft(e){this.moveSelectedCell(e,0,-1);},onPressArrowRight:function onPressArrowRight(e){this.moveSelectedCell(e,0,1);},onPressTab:function onPressTab(e){this.moveSelectedCell(e,0,e.shiftKey?-1:1);},onPressEnter:function onPressEnter(e){this.setActive(e.key);},onPressDelete:function onPressDelete(e){this.setActive(e.key);},onPressEscape:function onPressEscape(e){this.setInactive(e.key);},onPressBackspace:function onPressBackspace(e){this.setActive(e.key);},onPressChar:function onPressChar(e){if(this.isKeyPrintable(e.keyCode)){this.setActive(e.keyCode);}},onPressKeyWithCtrl:function onPressKeyWithCtrl(e){var keys={KeyCode_c:99,KeyCode_C:67,KeyCode_V:86,KeyCode_v:118};var rowIdx=this.state.selected.rowIdx;var row=this.props.rowGetter(rowIdx);var idx=this.state.selected.idx;var col=this.getColumn(idx);if(ColumnUtils.canEdit(col,row,this.props.enableCellSelect)){if(e.keyCode===keys.KeyCode_c||e.keyCode===keys.KeyCode_C){var _value=this.getSelectedValue();this.handleCopy({value:_value});}else if(e.keyCode===keys.KeyCode_v||e.keyCode===keys.KeyCode_V){this.handlePaste();}}},onCellCommit:function onCellCommit(commit){var selected=Object.assign({},this.state.selected);selected.active=false;if(commit.key==='Tab'){selected.idx+=1;}var expandedRows=this.state.expandedRows; // if(commit.changed && commit.changed.expandedHeight){
	//   expandedRows = this.expandRow(commit.rowIdx, commit.changed.expandedHeight);
	// }
	this.setState({selected:selected,expandedRows:expandedRows});if(this.props.onRowUpdated){this.props.onRowUpdated(commit);}var targetRow=commit.rowIdx;if(this.props.onGridRowsUpdated){this.props.onGridRowsUpdated({cellKey:commit.cellKey,fromRow:targetRow,toRow:targetRow,updated:commit.updated,action:'cellUpdate'});}},onDragStart:function onDragStart(e){var value=this.getSelectedValue();this.handleDragStart({idx:this.state.selected.idx,rowIdx:this.state.selected.rowIdx,value:value}); // need to set dummy data for FF
	if(e&&e.dataTransfer){if(e.dataTransfer.setData){e.dataTransfer.dropEffect='move';e.dataTransfer.effectAllowed='move';e.dataTransfer.setData('text/plain','dummy');}}},onToggleFilter:function onToggleFilter(){var _this2=this; // setState() does not immediately mutate this.state but creates a pending state transition.
	// Therefore if you want to do something after the state change occurs, pass it in as a callback function.
	this.setState({canFilter:!this.state.canFilter},function(){if(_this2.state.canFilter===false&&_this2.props.onClearFilters){_this2.props.onClearFilters();}});},onDragHandleDoubleClick:function onDragHandleDoubleClick(e){if(this.props.onDragHandleDoubleClick){this.props.onDragHandleDoubleClick(e);}if(this.props.onGridRowsUpdated){var cellKey=this.getColumn(e.idx).key;var updated=_defineProperty({},cellKey,e.rowData[cellKey]);this.props.onGridRowsUpdated({cellKey:cellKey,fromRow:e.rowIdx,toRow:this.props.rowsCount-1,updated:updated,action:'columnFill'});}},handleDragStart:function handleDragStart(dragged){if(!this.dragEnabled()){return;}var idx=dragged.idx;var rowIdx=dragged.rowIdx;if(idx>=0&&rowIdx>=0&&idx<this.getSize()&&rowIdx<this.props.rowsCount){this.setState({dragged:dragged});}},handleDragEnd:function handleDragEnd(){if(!this.dragEnabled()){return;}var fromRow=void 0;var toRow=void 0;var selected=this.state.selected;var dragged=this.state.dragged;var cellKey=this.getColumn(this.state.selected.idx).key;fromRow=selected.rowIdx<dragged.overRowIdx?selected.rowIdx:dragged.overRowIdx;toRow=selected.rowIdx>dragged.overRowIdx?selected.rowIdx:dragged.overRowIdx;if(this.props.onCellsDragged){this.props.onCellsDragged({cellKey:cellKey,fromRow:fromRow,toRow:toRow,value:dragged.value});}if(this.props.onGridRowsUpdated){var updated=_defineProperty({},cellKey,dragged.value);this.props.onGridRowsUpdated({cellKey:cellKey,fromRow:fromRow,toRow:toRow,updated:updated,action:'cellDrag'});}this.setState({dragged:{complete:true}});},handleDragEnter:function handleDragEnter(row){if(!this.dragEnabled()){return;}var dragged=this.state.dragged;dragged.overRowIdx=row;this.setState({dragged:dragged});},handleTerminateDrag:function handleTerminateDrag(){if(!this.dragEnabled()){return;}this.setState({dragged:null});},handlePaste:function handlePaste(){if(!this.copyPasteEnabled()){return;}var selected=this.state.selected;var cellKey=this.getColumn(this.state.selected.idx).key;var textToCopy=this.state.textToCopy;var toRow=selected.rowIdx;if(this.props.onCellCopyPaste){this.props.onCellCopyPaste({cellKey:cellKey,rowIdx:toRow,value:textToCopy,fromRow:this.state.copied.rowIdx,toRow:toRow});}if(this.props.onGridRowsUpdated){var updated=_defineProperty({},cellKey,textToCopy);this.props.onGridRowsUpdated({cellKey:cellKey,fromRow:toRow,toRow:toRow,updated:updated,action:'copyPaste'});}this.setState({copied:null});},handleCopy:function handleCopy(args){if(!this.copyPasteEnabled()){return;}var textToCopy=args.value;var selected=this.state.selected;var copied={idx:selected.idx,rowIdx:selected.rowIdx};this.setState({textToCopy:textToCopy,copied:copied});},handleSort:function handleSort(columnKey,direction){this.setState({sortDirection:direction,sortColumn:columnKey},function(){this.props.onGridSort(columnKey,direction);});},getSelectedRow:function getSelectedRow(rows,key){var _this3=this;var selectedRow=rows.filter(function(r){if(r[_this3.props.rowKey]===key){return true;}return false;});if(selectedRow.length>0){return selectedRow[0];}}, // columnKey not used here as this function will select the whole row,
	// but needed to match the function signature in the CheckboxEditor
	handleRowSelect:function handleRowSelect(rowIdx,columnKey,rowData,e){e.stopPropagation();var selectedRows=this.props.enableRowSelect==='single'?[]:this.state.selectedRows.slice(0);var selectedRow=this.getSelectedRow(selectedRows,rowData[this.props.rowKey]);if(selectedRow){selectedRow.isSelected=!selectedRow.isSelected;}else {rowData.isSelected=true;selectedRows.push(rowData);}this.setState({selectedRows:selectedRows,selected:{rowIdx:rowIdx,idx:0}});if(this.props.onRowSelect){this.props.onRowSelect(selectedRows.filter(function(r){return r.isSelected===true;}));}},handleCheckboxChange:function handleCheckboxChange(e){var allRowsSelected=void 0;if(e.currentTarget instanceof HTMLInputElement&&e.currentTarget.checked===true){allRowsSelected=true;}else {allRowsSelected=false;}var selectedRows=[];for(var i=0;i<this.props.rowsCount;i++){var row=Object.assign({},this.props.rowGetter(i),{isSelected:allRowsSelected});selectedRows.push(row);}this.setState({selectedRows:selectedRows});if(typeof this.props.onRowSelect==='function'){this.props.onRowSelect(selectedRows.filter(function(r){return r.isSelected===true;}));}},getScrollOffSet:function getScrollOffSet(){var scrollOffset=0;var canvas=ReactDOM.findDOMNode(this).querySelector('.react-grid-Canvas');if(canvas){scrollOffset=canvas.offsetWidth-canvas.clientWidth;}this.setState({scrollOffset:scrollOffset});},getRowOffsetHeight:function getRowOffsetHeight(){var offsetHeight=0;this.getHeaderRows().forEach(function(row){return offsetHeight+=parseFloat(row.height,10);});return offsetHeight;},getHeaderRows:function getHeaderRows(){var rows=[{ref:'row',height:this.props.headerRowHeight||this.props.rowHeight,rowType:'header'}];if(this.state.canFilter===true){rows.push({ref:'filterRow',filterable:true,onFilterChange:this.props.onAddFilter,height:45,rowType:'filter'});}return rows;},getInitialSelectedRows:function getInitialSelectedRows(){var selectedRows=[];for(var i=0;i<this.props.rowsCount;i++){selectedRows.push(false);}return selectedRows;},getSelectedValue:function getSelectedValue(){var rowIdx=this.state.selected.rowIdx;var idx=this.state.selected.idx;var cellKey=this.getColumn(idx).key;var row=this.props.rowGetter(rowIdx);return RowUtils.get(row,cellKey);},moveSelectedCell:function moveSelectedCell(e,rowDelta,cellDelta){ // we need to prevent default as we control grid scroll
	// otherwise it moves every time you left/right which is janky
	e.preventDefault();var rowIdx=void 0;var idx=void 0;var cellNavigationMode=this.props.cellNavigationMode;if(cellNavigationMode!=='none'){var _calculateNextSelecti=this.calculateNextSelectionPosition(cellNavigationMode,cellDelta,rowDelta);idx=_calculateNextSelecti.idx;rowIdx=_calculateNextSelecti.rowIdx;}else {rowIdx=this.state.selected.rowIdx+rowDelta;idx=this.state.selected.idx+cellDelta;}this.onSelect({idx:idx,rowIdx:rowIdx});},getNbrColumns:function getNbrColumns(){var _props=this.props;var columns=_props.columns;var enableRowSelect=_props.enableRowSelect;return enableRowSelect?columns.length+1:columns.length;},calculateNextSelectionPosition:function calculateNextSelectionPosition(cellNavigationMode,cellDelta,rowDelta){var _rowDelta=rowDelta;var idx=this.state.selected.idx+cellDelta;var nbrColumns=this.getNbrColumns();if(cellDelta>0){if(this.isAtLastCellInRow(nbrColumns)){if(cellNavigationMode==='changeRow'){_rowDelta=this.isAtLastRow()?rowDelta:rowDelta+1;idx=this.isAtLastRow()?idx:0;}else {idx=0;}}}else if(cellDelta<0){if(this.isAtFirstCellInRow()){if(cellNavigationMode==='changeRow'){_rowDelta=this.isAtFirstRow()?rowDelta:rowDelta-1;idx=this.isAtFirstRow()?0:nbrColumns-1;}else {idx=nbrColumns-1;}}}var rowIdx=this.state.selected.rowIdx+_rowDelta;return {idx:idx,rowIdx:rowIdx};},isAtLastCellInRow:function isAtLastCellInRow(nbrColumns){return this.state.selected.idx===nbrColumns-1;},isAtLastRow:function isAtLastRow(){return this.state.selected.rowIdx===this.props.rowsCount-1;},isAtFirstCellInRow:function isAtFirstCellInRow(){return this.state.selected.idx===0;},isAtFirstRow:function isAtFirstRow(){return this.state.selected.rowIdx===0;},openCellEditor:function openCellEditor(rowIdx,idx){var _this4=this;var row=this.props.rowGetter(rowIdx);var col=this.getColumn(idx);if(!ColumnUtils.canEdit(col,row,this.props.enableCellSelect)){return;}var selected={rowIdx:rowIdx,idx:idx};if(this.hasSelectedCellChanged(selected)){this.setState({selected:selected},function(){_this4.setActive('Enter');});}else {this.setActive('Enter');}},setActive:function setActive(keyPressed){var rowIdx=this.state.selected.rowIdx;var row=this.props.rowGetter(rowIdx);var idx=this.state.selected.idx;var col=this.getColumn(idx);if(ColumnUtils.canEdit(col,row,this.props.enableCellSelect)&&!this.isActive()){var _selected=Object.assign(this.state.selected,{idx:idx,rowIdx:rowIdx,active:true,initialKeyCode:keyPressed});this.setState({selected:_selected});}},setInactive:function setInactive(){var rowIdx=this.state.selected.rowIdx;var row=this.props.rowGetter(rowIdx);var idx=this.state.selected.idx;var col=this.getColumn(idx);if(ColumnUtils.canEdit(col,row,this.props.enableCellSelect)&&this.isActive()){var _selected2=Object.assign(this.state.selected,{idx:idx,rowIdx:rowIdx,active:false});this.setState({selected:_selected2});}},isActive:function isActive(){return this.state.selected.active===true;},setupGridColumns:function setupGridColumns(){var props=arguments.length<=0||arguments[0]===undefined?this.props:arguments[0];var cols=props.columns.slice(0);var unshiftedCols={};if(props.enableRowSelect){var headerRenderer=props.enableRowSelect==='single'?null:React.createElement('div',{className:'react-grid-checkbox-container'},React.createElement('input',{className:'react-grid-checkbox',type:'checkbox',name:'select-all-checkbox',onChange:this.handleCheckboxChange}),React.createElement('label',{htmlFor:'select-all-checkbox',className:'react-grid-checkbox-label'}));var selectColumn={key:'select-row',name:'',formatter:React.createElement(CheckboxEditor,null),onCellChange:this.handleRowSelect,filterable:false,headerRenderer:headerRenderer,width:60,locked:true,getRowMetaData:function getRowMetaData(rowData){return rowData;}};unshiftedCols=cols.unshift(selectColumn);cols=unshiftedCols>0?cols:unshiftedCols;}return cols;},copyPasteEnabled:function copyPasteEnabled(){return this.props.onCellCopyPaste!==null;},dragEnabled:function dragEnabled(){return this.props.onCellsDragged!==null;},renderToolbar:function renderToolbar(){var Toolbar=this.props.toolbar;if(React.isValidElement(Toolbar)){return React.cloneElement(Toolbar,{onToggleFilter:this.onToggleFilter,numberOfRows:this.props.rowsCount});}},render:function render(){var cellMetaData={selected:this.state.selected,dragged:this.state.dragged,onCellClick:this.onCellClick,onCellContextMenu:this.onCellContextMenu,onCellDoubleClick:this.onCellDoubleClick,onCommit:this.onCellCommit,onCommitCancel:this.setInactive,copied:this.state.copied,handleDragEnterRow:this.handleDragEnter,handleTerminateDrag:this.handleTerminateDrag,onDragHandleDoubleClick:this.onDragHandleDoubleClick,enableCellSelect:this.props.enableCellSelect,onColumnEvent:this.onColumnEvent,openCellEditor:this.openCellEditor};var toolbar=this.renderToolbar();var containerWidth=this.props.minWidth||this.DOMMetrics.gridWidth();var gridWidth=containerWidth-this.state.scrollOffset; // depending on the current lifecycle stage, gridWidth() may not initialize correctly
	// this also handles cases where it always returns undefined -- such as when inside a div with display:none
	// eg Bootstrap tabs and collapses
	if(typeof containerWidth==='undefined'||isNaN(containerWidth)||containerWidth===0){containerWidth='100%';}if(typeof gridWidth==='undefined'||isNaN(gridWidth)||gridWidth===0){gridWidth='100%';}return React.createElement('div',{className:'react-grid-Container',style:{width:containerWidth}},toolbar,React.createElement('div',{className:'react-grid-Main'},React.createElement(BaseGrid,_extends({ref:'base'},this.props,{rowKey:this.props.rowKey,headerRows:this.getHeaderRows(),columnMetrics:this.state.columnMetrics,rowGetter:this.props.rowGetter,rowsCount:this.props.rowsCount,rowHeight:this.props.rowHeight,cellMetaData:cellMetaData,selectedRows:this.state.selectedRows.filter(function(r){return r.isSelected===true;}),expandedRows:this.state.expandedRows,rowOffsetHeight:this.getRowOffsetHeight(),sortColumn:this.state.sortColumn,sortDirection:this.state.sortDirection,onSort:this.handleSort,minHeight:this.props.minHeight,totalWidth:gridWidth,onViewportKeydown:this.onKeyDown,onViewportDragStart:this.onDragStart,onViewportDragEnd:this.handleDragEnd,onViewportDoubleClick:this.onViewportDoubleClick,onColumnResize:this.onColumnResize,rowScrollTimeout:this.props.rowScrollTimeout,contextMenu:this.props.contextMenu}))));}});module.exports=ReactDataGrid; /***/}, /* 2 */ /***/function(module,exports){module.exports=__WEBPACK_EXTERNAL_MODULE_2__; /***/}, /* 3 */ /***/function(module,exports){module.exports=__WEBPACK_EXTERNAL_MODULE_3__; /***/}, /* 4 */ /***/function(module,exports,__webpack_require__){'use strict';var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var React=__webpack_require__(2);var PropTypes=React.PropTypes;var Header=__webpack_require__(5);var Viewport=__webpack_require__(21);var GridScrollMixin=__webpack_require__(98);var DOMMetrics=__webpack_require__(97);var cellMetaDataShape=__webpack_require__(94);var Grid=React.createClass({displayName:'Grid',propTypes:{rowGetter:PropTypes.oneOfType([PropTypes.array,PropTypes.func]).isRequired,columns:PropTypes.oneOfType([PropTypes.array,PropTypes.object]),columnMetrics:PropTypes.object,minHeight:PropTypes.number,totalWidth:PropTypes.oneOfType([PropTypes.number,PropTypes.string]),headerRows:PropTypes.oneOfType([PropTypes.array,PropTypes.func]),rowHeight:PropTypes.number,rowRenderer:PropTypes.func,emptyRowsView:PropTypes.func,expandedRows:PropTypes.oneOfType([PropTypes.array,PropTypes.func]),selectedRows:PropTypes.oneOfType([PropTypes.array,PropTypes.func]),rowsCount:PropTypes.number,onRows:PropTypes.func,sortColumn:React.PropTypes.string,sortDirection:React.PropTypes.oneOf(['ASC','DESC','NONE']),rowOffsetHeight:PropTypes.number.isRequired,onViewportKeydown:PropTypes.func.isRequired,onViewportDragStart:PropTypes.func.isRequired,onViewportDragEnd:PropTypes.func.isRequired,onViewportDoubleClick:PropTypes.func.isRequired,onColumnResize:PropTypes.func,onSort:PropTypes.func,cellMetaData:PropTypes.shape(cellMetaDataShape),rowKey:PropTypes.string.isRequired,rowScrollTimeout:PropTypes.number,contextMenu:PropTypes.element},mixins:[GridScrollMixin,DOMMetrics.MetricsComputatorMixin],getDefaultProps:function getDefaultProps(){return {rowHeight:35,minHeight:350};},getStyle:function getStyle(){return {overflow:'hidden',outline:0,position:'relative',minHeight:this.props.minHeight};},render:function render(){var headerRows=this.props.headerRows||[{ref:'row'}];var EmptyRowsView=this.props.emptyRowsView;return React.createElement('div',_extends({},this.props,{style:this.getStyle(),className:'react-grid-Grid'}),React.createElement(Header,{ref:'header',columnMetrics:this.props.columnMetrics,onColumnResize:this.props.onColumnResize,height:this.props.rowHeight,totalWidth:this.props.totalWidth,headerRows:headerRows,sortColumn:this.props.sortColumn,sortDirection:this.props.sortDirection,onSort:this.props.onSort,onScroll:this.onHeaderScroll}),this.props.rowsCount>=1||this.props.rowsCount===0&&!this.props.emptyRowsView?React.createElement('div',{ref:'viewPortContainer',onKeyDown:this.props.onViewportKeydown,onDoubleClick:this.props.onViewportDoubleClick,onDragStart:this.props.onViewportDragStart,onDragEnd:this.props.onViewportDragEnd},React.createElement(Viewport,{ref:'viewport',rowKey:this.props.rowKey,width:this.props.columnMetrics.width,rowHeight:this.props.rowHeight,rowRenderer:this.props.rowRenderer,rowGetter:this.props.rowGetter,rowsCount:this.props.rowsCount,selectedRows:this.props.selectedRows,expandedRows:this.props.expandedRows,columnMetrics:this.props.columnMetrics,totalWidth:this.props.totalWidth,onScroll:this.onScroll,onRows:this.props.onRows,cellMetaData:this.props.cellMetaData,rowOffsetHeight:this.props.rowOffsetHeight||this.props.rowHeight*headerRows.length,minHeight:this.props.minHeight,rowScrollTimeout:this.props.rowScrollTimeout,contextMenu:this.props.contextMenu})):React.createElement('div',{ref:'emptyView',className:'react-grid-Empty'},React.createElement(EmptyRowsView,null)));}});module.exports=Grid; /***/}, /* 5 */ /***/function(module,exports,__webpack_require__){'use strict';var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var React=__webpack_require__(2);var ReactDOM=__webpack_require__(3);var joinClasses=__webpack_require__(6);var shallowCloneObject=__webpack_require__(7);var ColumnMetrics=__webpack_require__(8);var ColumnUtils=__webpack_require__(10);var HeaderRow=__webpack_require__(12);var PropTypes=React.PropTypes;var Header=React.createClass({displayName:'Header',propTypes:{columnMetrics:PropTypes.shape({width:PropTypes.number.isRequired,columns:PropTypes.any}).isRequired,totalWidth:PropTypes.oneOfType([PropTypes.number,PropTypes.string]),height:PropTypes.number.isRequired,headerRows:PropTypes.array.isRequired,sortColumn:PropTypes.string,sortDirection:PropTypes.oneOf(['ASC','DESC','NONE']),onSort:PropTypes.func,onColumnResize:PropTypes.func,onScroll:PropTypes.func},getInitialState:function getInitialState(){return {resizing:null};},componentWillReceiveProps:function componentWillReceiveProps(){this.setState({resizing:null});},shouldComponentUpdate:function shouldComponentUpdate(nextProps,nextState){var update=!ColumnMetrics.sameColumns(this.props.columnMetrics.columns,nextProps.columnMetrics.columns,ColumnMetrics.sameColumn)||this.props.totalWidth!==nextProps.totalWidth||this.props.headerRows.length!==nextProps.headerRows.length||this.state.resizing!==nextState.resizing||this.props.sortColumn!==nextProps.sortColumn||this.props.sortDirection!==nextProps.sortDirection;return update;},onColumnResize:function onColumnResize(column,width){var state=this.state.resizing||this.props;var pos=this.getColumnPosition(column);if(pos!=null){var _resizing={columnMetrics:shallowCloneObject(state.columnMetrics)};_resizing.columnMetrics=ColumnMetrics.resizeColumn(_resizing.columnMetrics,pos,width); // we don't want to influence scrollLeft while resizing
	if(_resizing.columnMetrics.totalWidth<state.columnMetrics.totalWidth){_resizing.columnMetrics.totalWidth=state.columnMetrics.totalWidth;}_resizing.column=ColumnUtils.getColumn(_resizing.columnMetrics.columns,pos);this.setState({resizing:_resizing});}},onColumnResizeEnd:function onColumnResizeEnd(column,width){var pos=this.getColumnPosition(column);if(pos!==null&&this.props.onColumnResize){this.props.onColumnResize(pos,width||column.width);}},getHeaderRows:function getHeaderRows(){var _this=this;var columnMetrics=this.getColumnMetrics();var resizeColumn=void 0;if(this.state.resizing){resizeColumn=this.state.resizing.column;}var headerRows=[];this.props.headerRows.forEach(function(row,index){var headerRowStyle={position:'absolute',top:_this.getCombinedHeaderHeights(index),left:0,width:_this.props.totalWidth,overflow:'hidden'};headerRows.push(React.createElement(HeaderRow,{key:row.ref,ref:row.ref,rowType:row.rowType,style:headerRowStyle,onColumnResize:_this.onColumnResize,onColumnResizeEnd:_this.onColumnResizeEnd,width:columnMetrics.width,height:row.height||_this.props.height,columns:columnMetrics.columns,resizing:resizeColumn,filterable:row.filterable,onFilterChange:row.onFilterChange,sortColumn:_this.props.sortColumn,sortDirection:_this.props.sortDirection,onSort:_this.props.onSort,onScroll:_this.props.onScroll}));});return headerRows;},getColumnMetrics:function getColumnMetrics(){var columnMetrics=void 0;if(this.state.resizing){columnMetrics=this.state.resizing.columnMetrics;}else {columnMetrics=this.props.columnMetrics;}return columnMetrics;},getColumnPosition:function getColumnPosition(column){var columnMetrics=this.getColumnMetrics();var pos=-1;columnMetrics.columns.forEach(function(c,idx){if(c.key===column.key){pos=idx;}});return pos===-1?null:pos;},getCombinedHeaderHeights:function getCombinedHeaderHeights(until){var stopAt=this.props.headerRows.length;if(typeof until!=='undefined'){stopAt=until;}var height=0;for(var index=0;index<stopAt;index++){height+=this.props.headerRows[index].height||this.props.height;}return height;},getStyle:function getStyle(){return {position:'relative',height:this.getCombinedHeaderHeights(),overflow:'hidden'};},setScrollLeft:function setScrollLeft(scrollLeft){var node=ReactDOM.findDOMNode(this.refs.row);node.scrollLeft=scrollLeft;this.refs.row.setScrollLeft(scrollLeft);if(this.refs.filterRow){var nodeFilters=ReactDOM.findDOMNode(this.refs.filterRow);nodeFilters.scrollLeft=scrollLeft;this.refs.filterRow.setScrollLeft(scrollLeft);}},render:function render(){var className=joinClasses({'react-grid-Header':true,'react-grid-Header--resizing':!!this.state.resizing});var headerRows=this.getHeaderRows();return React.createElement('div',_extends({},this.props,{style:this.getStyle(),className:className}),headerRows);}});module.exports=Header; /***/}, /* 6 */ /***/function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__; /*!
		  Copyright (c) 2015 Jed Watson.
		  Licensed under the MIT License (MIT), see
		  http://jedwatson.github.io/classnames
		*/function classNames(){var classes='';var arg;for(var i=0;i<arguments.length;i++){arg=arguments[i];if(!arg){continue;}if('string'===typeof arg||'number'===typeof arg){classes+=' '+arg;}else if(Object.prototype.toString.call(arg)==='[object Array]'){classes+=' '+classNames.apply(null,arg);}else if('object'===(typeof arg==='undefined'?'undefined':_typeof2(arg))){for(var key in arg){if(!arg.hasOwnProperty(key)||!arg[key]){continue;}classes+=' '+key;}}}return classes.substr(1);} // safely export classNames for node / browserify
	if(typeof module!=='undefined'&&module.exports){module.exports=classNames;} // safely export classNames for RequireJS
	if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__=[],__WEBPACK_AMD_DEFINE_RESULT__=function(){return classNames;}.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__),__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));} /***/}, /* 7 */ /***/function(module,exports){"use strict";function shallowCloneObject(obj){var result={};for(var k in obj){if(obj.hasOwnProperty(k)){result[k]=obj[k];}}return result;}module.exports=shallowCloneObject; /***/}, /* 8 */ /***/function(module,exports,__webpack_require__){'use strict';var shallowCloneObject=__webpack_require__(7);var sameColumn=__webpack_require__(9);var ColumnUtils=__webpack_require__(10);var getScrollbarSize=__webpack_require__(11);function setColumnWidths(columns,totalWidth){return columns.map(function(column){var colInfo=Object.assign({},column);if(column.width){if(/^([0-9]+)%$/.exec(column.width.toString())){colInfo.width=Math.floor(column.width/100*totalWidth);}}return colInfo;});}function setDefferedColumnWidths(columns,unallocatedWidth,minColumnWidth){var defferedColumns=columns.filter(function(c){return !c.width;});return columns.map(function(column){if(!column.width){if(unallocatedWidth<=0){column.width=minColumnWidth;}else {column.width=Math.floor(unallocatedWidth/ColumnUtils.getSize(defferedColumns));}}return column;});}function setColumnOffsets(columns){var left=0;return columns.map(function(column){column.left=left;left+=column.width;return column;});} /**
		 * Update column metrics calculation.
		 *
		 * @param {ColumnMetricsType} metrics
		 */function recalculate(metrics){ // compute width for columns which specify width
	var columns=setColumnWidths(metrics.columns,metrics.totalWidth);var unallocatedWidth=columns.filter(function(c){return c.width;}).reduce(function(w,column){return w-column.width;},metrics.totalWidth);unallocatedWidth-=getScrollbarSize();var width=columns.filter(function(c){return c.width;}).reduce(function(w,column){return w+column.width;},0); // compute width for columns which doesn't specify width
	columns=setDefferedColumnWidths(columns,unallocatedWidth,metrics.minColumnWidth); // compute left offset
	columns=setColumnOffsets(columns);return {columns:columns,width:width,totalWidth:metrics.totalWidth,minColumnWidth:metrics.minColumnWidth};} /**
		 * Update column metrics calculation by resizing a column.
		 *
		 * @param {ColumnMetricsType} metrics
		 * @param {Column} column
		 * @param {number} width
		 */function resizeColumn(metrics,index,width){var column=ColumnUtils.getColumn(metrics.columns,index);var metricsClone=shallowCloneObject(metrics);metricsClone.columns=metrics.columns.slice(0);var updatedColumn=shallowCloneObject(column);updatedColumn.width=Math.max(width,metricsClone.minColumnWidth);metricsClone=ColumnUtils.spliceColumn(metricsClone,index,updatedColumn);return recalculate(metricsClone);}function areColumnsImmutable(prevColumns,nextColumns){return typeof Immutable!=='undefined'&&prevColumns instanceof Immutable.List&&nextColumns instanceof Immutable.List;}function compareEachColumn(prevColumns,nextColumns,isSameColumn){var i=void 0;var len=void 0;var column=void 0;var prevColumnsByKey={};var nextColumnsByKey={};if(ColumnUtils.getSize(prevColumns)!==ColumnUtils.getSize(nextColumns)){return false;}for(i=0,len=ColumnUtils.getSize(prevColumns);i<len;i++){column=prevColumns[i];prevColumnsByKey[column.key]=column;}for(i=0,len=ColumnUtils.getSize(nextColumns);i<len;i++){column=nextColumns[i];nextColumnsByKey[column.key]=column;var prevColumn=prevColumnsByKey[column.key];if(prevColumn===undefined||!isSameColumn(prevColumn,column)){return false;}}for(i=0,len=ColumnUtils.getSize(prevColumns);i<len;i++){column=prevColumns[i];var nextColumn=nextColumnsByKey[column.key];if(nextColumn===undefined){return false;}}return true;}function sameColumns(prevColumns,nextColumns,isSameColumn){if(areColumnsImmutable(prevColumns,nextColumns)){return prevColumns===nextColumns;}return compareEachColumn(prevColumns,nextColumns,isSameColumn);}module.exports={recalculate:recalculate,resizeColumn:resizeColumn,sameColumn:sameColumn,sameColumns:sameColumns}; /***/}, /* 9 */ /***/function(module,exports,__webpack_require__){'use strict';var isValidElement=__webpack_require__(2).isValidElement;module.exports=function sameColumn(a,b){var k=void 0;for(k in a){if(a.hasOwnProperty(k)){if(typeof a[k]==='function'&&typeof b[k]==='function'||isValidElement(a[k])&&isValidElement(b[k])){continue;}if(!b.hasOwnProperty(k)||a[k]!==b[k]){return false;}}}for(k in b){if(b.hasOwnProperty(k)&&!a.hasOwnProperty(k)){return false;}}return true;}; /***/}, /* 10 */ /***/function(module,exports){'use strict';module.exports={getColumn:function getColumn(columns,idx){if(Array.isArray(columns)){return columns[idx];}else if(typeof Immutable!=='undefined'){return columns.get(idx);}},spliceColumn:function spliceColumn(metrics,idx,column){if(Array.isArray(metrics.columns)){metrics.columns.splice(idx,1,column);}else if(typeof Immutable!=='undefined'){metrics.columns=metrics.columns.splice(idx,1,column);}return metrics;},getSize:function getSize(columns){if(Array.isArray(columns)){return columns.length;}else if(typeof Immutable!=='undefined'){return columns.size;}}, // Logic extented to allow for functions to be passed down in column.editable
	// this allows us to deicde whether we can be edting from a cell level
	canEdit:function canEdit(col,rowData,enableCellSelect){if(col.editable!=null&&typeof col.editable==='function'){return enableCellSelect===true&&col.editable(rowData);}return enableCellSelect===true&&(!!col.editor||!!col.editable);}}; /***/}, /* 11 */ /***/function(module,exports){'use strict';var size=void 0;function getScrollbarSize(){if(size===undefined){var outer=document.createElement('div');outer.style.width='50px';outer.style.height='50px';outer.style.position='absolute';outer.style.top='-200px';outer.style.left='-200px';var inner=document.createElement('div');inner.style.height='100px';inner.style.width='100%';outer.appendChild(inner);document.body.appendChild(outer);var outerWidth=outer.clientWidth;outer.style.overflowY='scroll';var innerWidth=inner.clientWidth;document.body.removeChild(outer);size=outerWidth-innerWidth;}return size;}module.exports=getScrollbarSize; /***/}, /* 12 */ /***/function(module,exports,__webpack_require__){'use strict';var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var React=__webpack_require__(2);var shallowEqual=__webpack_require__(13);var HeaderCell=__webpack_require__(14);var getScrollbarSize=__webpack_require__(11);var ExcelColumn=__webpack_require__(15);var ColumnUtilsMixin=__webpack_require__(10);var SortableHeaderCell=__webpack_require__(18);var FilterableHeaderCell=__webpack_require__(19);var HeaderCellType=__webpack_require__(20);var PropTypes=React.PropTypes;var HeaderRowStyle={overflow:React.PropTypes.string,width:PropTypes.oneOfType([PropTypes.number,PropTypes.string]),height:React.PropTypes.number,position:React.PropTypes.string};var DEFINE_SORT=['ASC','DESC','NONE'];var HeaderRow=React.createClass({displayName:'HeaderRow',propTypes:{width:PropTypes.oneOfType([PropTypes.number,PropTypes.string]),height:PropTypes.number.isRequired,columns:PropTypes.oneOfType([PropTypes.array,PropTypes.object]),onColumnResize:PropTypes.func,onSort:PropTypes.func.isRequired,onColumnResizeEnd:PropTypes.func,style:PropTypes.shape(HeaderRowStyle),sortColumn:PropTypes.string,sortDirection:React.PropTypes.oneOf(DEFINE_SORT),cellRenderer:PropTypes.func,headerCellRenderer:PropTypes.func,filterable:PropTypes.bool,onFilterChange:PropTypes.func,resizing:PropTypes.object,onScroll:PropTypes.func,rowType:PropTypes.string},mixins:[ColumnUtilsMixin],shouldComponentUpdate:function shouldComponentUpdate(nextProps){return nextProps.width!==this.props.width||nextProps.height!==this.props.height||nextProps.columns!==this.props.columns||!shallowEqual(nextProps.style,this.props.style)||this.props.sortColumn!==nextProps.sortColumn||this.props.sortDirection!==nextProps.sortDirection;},getHeaderCellType:function getHeaderCellType(column){if(column.filterable){if(this.props.filterable)return HeaderCellType.FILTERABLE;}if(column.sortable)return HeaderCellType.SORTABLE;return HeaderCellType.NONE;},getFilterableHeaderCell:function getFilterableHeaderCell(){return React.createElement(FilterableHeaderCell,{onChange:this.props.onFilterChange});},getSortableHeaderCell:function getSortableHeaderCell(column){var sortDirection=this.props.sortColumn===column.key?this.props.sortDirection:DEFINE_SORT.NONE;return React.createElement(SortableHeaderCell,{columnKey:column.key,onSort:this.props.onSort,sortDirection:sortDirection});},getHeaderRenderer:function getHeaderRenderer(column){var renderer=void 0;if(column.headerRenderer){renderer=column.headerRenderer;}else {var headerCellType=this.getHeaderCellType(column);switch(headerCellType){case HeaderCellType.SORTABLE:renderer=this.getSortableHeaderCell(column);break;case HeaderCellType.FILTERABLE:renderer=this.getFilterableHeaderCell();break;default:break;}}return renderer;},getStyle:function getStyle(){return {overflow:'hidden',width:'100%',height:this.props.height,position:'absolute'};},getCells:function getCells(){var cells=[];var lockedCells=[];for(var i=0,len=this.getSize(this.props.columns);i<len;i++){var column=this.getColumn(this.props.columns,i);var _renderer=this.getHeaderRenderer(column);if(column.key==='select-row'&&this.props.rowType==='filter'){_renderer=React.createElement('div',null);}var cell=React.createElement(HeaderCell,{ref:i,key:i,height:this.props.height,column:column,renderer:_renderer,resizing:this.props.resizing===column,onResize:this.props.onColumnResize,onResizeEnd:this.props.onColumnResizeEnd});if(column.locked){lockedCells.push(cell);}else {cells.push(cell);}}return cells.concat(lockedCells);},setScrollLeft:function setScrollLeft(scrollLeft){var _this=this;this.props.columns.forEach(function(column,i){if(column.locked){_this.refs[i].setScrollLeft(scrollLeft);}});},render:function render(){var cellsStyle={width:this.props.width?this.props.width+getScrollbarSize():'100%',height:this.props.height,whiteSpace:'nowrap',overflowX:'hidden',overflowY:'hidden'};var cells=this.getCells();return React.createElement('div',_extends({},this.props,{className:'react-grid-HeaderRow',onScroll:this.props.onScroll}),React.createElement('div',{style:cellsStyle},cells));}});module.exports=HeaderRow; /***/}, /* 13 */ /***/function(module,exports){ /**
		 * Copyright 2013-2015, Facebook, Inc.
		 * All rights reserved.
		 *
		 * This source code is licensed under the BSD-style license found in the
		 * LICENSE file in the root directory of this source tree. An additional grant
		 * of patent rights can be found in the PATENTS file in the same directory.
		 *
		 * @providesModule shallowEqual
		 * @typechecks
		 * 
		 */'use strict';var hasOwnProperty=Object.prototype.hasOwnProperty; /**
		 * Performs equality by iterating through keys on an object and returning false
		 * when any key has values which are not strictly equal between the arguments.
		 * Returns true when the values of all keys are strictly equal.
		 */function shallowEqual(objA,objB){if(objA===objB){return true;}if((typeof objA==='undefined'?'undefined':_typeof2(objA))!=='object'||objA===null||(typeof objB==='undefined'?'undefined':_typeof2(objB))!=='object'||objB===null){return false;}var keysA=Object.keys(objA);var keysB=Object.keys(objB);if(keysA.length!==keysB.length){return false;} // Test for A's keys different from B.
	var bHasOwnProperty=hasOwnProperty.bind(objB);for(var i=0;i<keysA.length;i++){if(!bHasOwnProperty(keysA[i])||objA[keysA[i]]!==objB[keysA[i]]){return false;}}return true;}module.exports=shallowEqual; /***/}, /* 14 */ /***/function(module,exports,__webpack_require__){'use strict';var React=__webpack_require__(2);var ReactDOM=__webpack_require__(3);var joinClasses=__webpack_require__(6);var ExcelColumn=__webpack_require__(15);var ResizeHandle=__webpack_require__(16);var PropTypes=React.PropTypes;function simpleCellRenderer(objArgs){return React.createElement('div',{className:'widget-HeaderCell__value'},objArgs.column.name);}var HeaderCell=React.createClass({displayName:'HeaderCell',propTypes:{renderer:PropTypes.oneOfType([PropTypes.func,PropTypes.element]).isRequired,column:PropTypes.shape(ExcelColumn).isRequired,onResize:PropTypes.func.isRequired,height:PropTypes.number.isRequired,onResizeEnd:PropTypes.func.isRequired,className:PropTypes.string},getDefaultProps:function getDefaultProps(){return {renderer:simpleCellRenderer};},getInitialState:function getInitialState(){return {resizing:false};},onDragStart:function onDragStart(e){this.setState({resizing:true}); // need to set dummy data for FF
	if(e&&e.dataTransfer&&e.dataTransfer.setData)e.dataTransfer.setData('text/plain','dummy');},onDrag:function onDrag(e){var resize=this.props.onResize||null; // for flows sake, doesnt recognise a null check direct
	if(resize){var _width=this.getWidthFromMouseEvent(e);if(_width>0){resize(this.props.column,_width);}}},onDragEnd:function onDragEnd(e){var width=this.getWidthFromMouseEvent(e);this.props.onResizeEnd(this.props.column,width);this.setState({resizing:false});},getWidthFromMouseEvent:function getWidthFromMouseEvent(e){var right=e.pageX||e.touches&&e.touches[0]&&e.touches[0].pageX||e.changedTouches&&e.changedTouches[e.changedTouches.length-1].pageX;var left=ReactDOM.findDOMNode(this).getBoundingClientRect().left;return right-left;},getCell:function getCell(){if(React.isValidElement(this.props.renderer)){return React.cloneElement(this.props.renderer,{column:this.props.column,height:this.props.height});}return this.props.renderer({column:this.props.column});},getStyle:function getStyle(){return {width:this.props.column.width,left:this.props.column.left,display:'inline-block',position:'absolute',overflow:'hidden',height:this.props.height,margin:0,textOverflow:'ellipsis',whiteSpace:'nowrap'};},setScrollLeft:function setScrollLeft(scrollLeft){var node=ReactDOM.findDOMNode(this);node.style.webkitTransform='translate3d('+scrollLeft+'px, 0px, 0px)';node.style.transform='translate3d('+scrollLeft+'px, 0px, 0px)';},render:function render(){var resizeHandle=void 0;if(this.props.column.resizable){resizeHandle=React.createElement(ResizeHandle,{onDrag:this.onDrag,onDragStart:this.onDragStart,onDragEnd:this.onDragEnd});}var className=joinClasses({'react-grid-HeaderCell':true,'react-grid-HeaderCell--resizing':this.state.resizing,'react-grid-HeaderCell--locked':this.props.column.locked});className=joinClasses(className,this.props.className,this.props.column.cellClass);var cell=this.getCell();return React.createElement('div',{className:className,style:this.getStyle()},cell,resizeHandle);}});module.exports=HeaderCell; /***/}, /* 15 */ /***/function(module,exports,__webpack_require__){'use strict';var React=__webpack_require__(2);var ExcelColumnShape={name:React.PropTypes.node.isRequired,key:React.PropTypes.string.isRequired,width:React.PropTypes.number.isRequired,filterable:React.PropTypes.bool};module.exports=ExcelColumnShape; /***/}, /* 16 */ /***/function(module,exports,__webpack_require__){'use strict';var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var React=__webpack_require__(2);var Draggable=__webpack_require__(17);var ResizeHandle=React.createClass({displayName:'ResizeHandle',style:{position:'absolute',top:0,right:0,width:6,height:'100%'},render:function render(){return React.createElement(Draggable,_extends({},this.props,{className:'react-grid-HeaderCell__resizeHandle',style:this.style}));}});module.exports=ResizeHandle; /***/}, /* 17 */ /***/function(module,exports,__webpack_require__){'use strict';var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var React=__webpack_require__(2);var PropTypes=React.PropTypes;var Draggable=React.createClass({displayName:'Draggable',propTypes:{onDragStart:PropTypes.func,onDragEnd:PropTypes.func,onDrag:PropTypes.func,component:PropTypes.oneOfType([PropTypes.func,PropTypes.constructor])},getDefaultProps:function getDefaultProps(){return {onDragStart:function onDragStart(){return true;},onDragEnd:function onDragEnd(){},onDrag:function onDrag(){}};},getInitialState:function getInitialState(){return {drag:null};},componentWillUnmount:function componentWillUnmount(){this.cleanUp();},onMouseDown:function onMouseDown(e){var drag=this.props.onDragStart(e);if(drag===null&&e.button!==0){return;}window.addEventListener('mouseup',this.onMouseUp);window.addEventListener('mousemove',this.onMouseMove);window.addEventListener('touchend',this.onMouseUp);window.addEventListener('touchmove',this.onMouseMove);this.setState({drag:drag});},onMouseMove:function onMouseMove(e){if(this.state.drag===null){return;}if(e.preventDefault){e.preventDefault();}this.props.onDrag(e);},onMouseUp:function onMouseUp(e){this.cleanUp();this.props.onDragEnd(e,this.state.drag);this.setState({drag:null});},cleanUp:function cleanUp(){window.removeEventListener('mouseup',this.onMouseUp);window.removeEventListener('mousemove',this.onMouseMove);window.removeEventListener('touchend',this.onMouseUp);window.removeEventListener('touchmove',this.onMouseMove);},render:function render(){return React.createElement('div',_extends({},this.props,{onMouseDown:this.onMouseDown,onTouchStart:this.onMouseDown,className:'react-grid-HeaderCell__draggable'}));}});module.exports=Draggable; /***/}, /* 18 */ /***/function(module,exports,__webpack_require__){'use strict';var React=__webpack_require__(2);var joinClasses=__webpack_require__(6);var DEFINE_SORT={ASC:'ASC',DESC:'DESC',NONE:'NONE'};var SortableHeaderCell=React.createClass({displayName:'SortableHeaderCell',propTypes:{columnKey:React.PropTypes.string.isRequired,column:React.PropTypes.shape({name:React.PropTypes.node}),onSort:React.PropTypes.func.isRequired,sortDirection:React.PropTypes.oneOf(['ASC','DESC','NONE'])},onClick:function onClick(){var direction=void 0;switch(this.props.sortDirection){default:case null:case undefined:case DEFINE_SORT.NONE:direction=DEFINE_SORT.ASC;break;case DEFINE_SORT.ASC:direction=DEFINE_SORT.DESC;break;case DEFINE_SORT.DESC:direction=DEFINE_SORT.NONE;break;}this.props.onSort(this.props.columnKey,direction);},getSortByText:function getSortByText(){var unicodeKeys={ASC:'9650',DESC:'9660',NONE:''};return String.fromCharCode(unicodeKeys[this.props.sortDirection]);},render:function render(){var className=joinClasses({'react-grid-HeaderCell-sortable':true,'react-grid-HeaderCell-sortable--ascending':this.props.sortDirection==='ASC','react-grid-HeaderCell-sortable--descending':this.props.sortDirection==='DESC'});return React.createElement('div',{className:className,onClick:this.onClick,style:{cursor:'pointer'}},this.props.column.name,React.createElement('span',{className:'pull-right'},this.getSortByText()));}});module.exports=SortableHeaderCell; /***/}, /* 19 */ /***/function(module,exports,__webpack_require__){'use strict';var React=__webpack_require__(2);var ExcelColumn=__webpack_require__(15);var FilterableHeaderCell=React.createClass({displayName:'FilterableHeaderCell',propTypes:{onChange:React.PropTypes.func.isRequired,column:React.PropTypes.shape(ExcelColumn)},getInitialState:function getInitialState(){return {filterTerm:''};},handleChange:function handleChange(e){var val=e.target.value;this.setState({filterTerm:val});this.props.onChange({filterTerm:val,columnKey:this.props.column.key});},renderInput:function renderInput(){if(this.props.column.filterable===false){return React.createElement('span',null);}var inputKey='header-filter-'+this.props.column.key;return React.createElement('input',{key:inputKey,type:'text',className:'form-control input-sm',placeholder:'Search',value:this.state.filterTerm,onChange:this.handleChange});},render:function render(){return React.createElement('div',null,React.createElement('div',{className:'form-group'},this.renderInput()));}});module.exports=FilterableHeaderCell; /***/}, /* 20 */ /***/function(module,exports){"use strict";var HeaderCellType={SORTABLE:0,FILTERABLE:1,NONE:2,CHECKBOX:3};module.exports=HeaderCellType; /***/}, /* 21 */ /***/function(module,exports,__webpack_require__){'use strict';var React=__webpack_require__(2);var Canvas=__webpack_require__(22);var ViewportScroll=__webpack_require__(96);var cellMetaDataShape=__webpack_require__(94);var PropTypes=React.PropTypes;var Viewport=React.createClass({displayName:'Viewport',mixins:[ViewportScroll],propTypes:{rowOffsetHeight:PropTypes.number.isRequired,totalWidth:PropTypes.oneOfType([PropTypes.number,PropTypes.string]).isRequired,columnMetrics:PropTypes.object.isRequired,rowGetter:PropTypes.oneOfType([PropTypes.array,PropTypes.func]).isRequired,selectedRows:PropTypes.array,expandedRows:PropTypes.array,rowRenderer:PropTypes.func,rowsCount:PropTypes.number.isRequired,rowHeight:PropTypes.number.isRequired,onRows:PropTypes.func,onScroll:PropTypes.func,minHeight:PropTypes.number,cellMetaData:PropTypes.shape(cellMetaDataShape),rowKey:PropTypes.string.isRequired,rowScrollTimeout:PropTypes.number,contextMenu:PropTypes.element},onScroll:function onScroll(scroll){this.updateScroll(scroll.scrollTop,scroll.scrollLeft,this.state.height,this.props.rowHeight,this.props.rowsCount);if(this.props.onScroll){this.props.onScroll({scrollTop:scroll.scrollTop,scrollLeft:scroll.scrollLeft});}},getScroll:function getScroll(){return this.refs.canvas.getScroll();},setScrollLeft:function setScrollLeft(scrollLeft){this.refs.canvas.setScrollLeft(scrollLeft);},render:function render(){var style={padding:0,bottom:0,left:0,right:0,overflow:'hidden',position:'absolute',top:this.props.rowOffsetHeight};return React.createElement('div',{className:'react-grid-Viewport',style:style},React.createElement(Canvas,{ref:'canvas',rowKey:this.props.rowKey,totalWidth:this.props.totalWidth,width:this.props.columnMetrics.width,rowGetter:this.props.rowGetter,rowsCount:this.props.rowsCount,selectedRows:this.props.selectedRows,expandedRows:this.props.expandedRows,columns:this.props.columnMetrics.columns,rowRenderer:this.props.rowRenderer,displayStart:this.state.displayStart,displayEnd:this.state.displayEnd,cellMetaData:this.props.cellMetaData,height:this.state.height,rowHeight:this.props.rowHeight,onScroll:this.onScroll,onRows:this.props.onRows,rowScrollTimeout:this.props.rowScrollTimeout,contextMenu:this.props.contextMenu}));}});module.exports=Viewport; /***/}, /* 22 */ /***/function(module,exports,__webpack_require__){'use strict';var _shallowEqual=__webpack_require__(13);var _shallowEqual2=_interopRequireDefault(_shallowEqual);var _RowsContainer=__webpack_require__(23);var _RowsContainer2=_interopRequireDefault(_RowsContainer);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var React=__webpack_require__(2);var ReactDOM=__webpack_require__(3);var joinClasses=__webpack_require__(6);var PropTypes=React.PropTypes;var ScrollShim=__webpack_require__(86);var Row=__webpack_require__(87);var cellMetaDataShape=__webpack_require__(94);var Canvas=React.createClass({displayName:'Canvas',mixins:[ScrollShim],propTypes:{rowRenderer:PropTypes.oneOfType([PropTypes.func,PropTypes.element]),rowHeight:PropTypes.number.isRequired,height:PropTypes.number.isRequired,width:PropTypes.number,totalWidth:PropTypes.oneOfType([PropTypes.number,PropTypes.string]),style:PropTypes.string,className:PropTypes.string,displayStart:PropTypes.number.isRequired,displayEnd:PropTypes.number.isRequired,rowsCount:PropTypes.number.isRequired,rowGetter:PropTypes.oneOfType([PropTypes.func.isRequired,PropTypes.array.isRequired]),expandedRows:PropTypes.array,onRows:PropTypes.func,onScroll:PropTypes.func,columns:PropTypes.oneOfType([PropTypes.object,PropTypes.array]).isRequired,cellMetaData:PropTypes.shape(cellMetaDataShape).isRequired,selectedRows:PropTypes.array,rowKey:React.PropTypes.string,rowScrollTimeout:React.PropTypes.number,contextMenu:PropTypes.element},getDefaultProps:function getDefaultProps(){return {rowRenderer:Row,onRows:function onRows(){},selectedRows:[],rowScrollTimeout:0};},getInitialState:function getInitialState(){return {displayStart:this.props.displayStart,displayEnd:this.props.displayEnd,scrollingTimeout:null};},componentWillMount:function componentWillMount(){this._currentRowsLength=0;this._currentRowsRange={start:0,end:0};this._scroll={scrollTop:0,scrollLeft:0};},componentDidMount:function componentDidMount(){this.onRows();},componentWillReceiveProps:function componentWillReceiveProps(nextProps){if(nextProps.displayStart!==this.state.displayStart||nextProps.displayEnd!==this.state.displayEnd){this.setState({displayStart:nextProps.displayStart,displayEnd:nextProps.displayEnd});}},shouldComponentUpdate:function shouldComponentUpdate(nextProps,nextState){var shouldUpdate=nextState.displayStart!==this.state.displayStart||nextState.displayEnd!==this.state.displayEnd||nextState.scrollingTimeout!==this.state.scrollingTimeout||nextProps.rowsCount!==this.props.rowsCount||nextProps.rowHeight!==this.props.rowHeight||nextProps.columns!==this.props.columns||nextProps.width!==this.props.width||nextProps.cellMetaData!==this.props.cellMetaData||!(0,_shallowEqual2['default'])(nextProps.style,this.props.style);return shouldUpdate;},componentWillUnmount:function componentWillUnmount(){this._currentRowsLength=0;this._currentRowsRange={start:0,end:0};this._scroll={scrollTop:0,scrollLeft:0};},componentDidUpdate:function componentDidUpdate(){if(this._scroll.scrollTop!==0&&this._scroll.scrollLeft!==0){this.setScrollLeft(this._scroll.scrollLeft);}this.onRows();},onRows:function onRows(){if(this._currentRowsRange!=={start:0,end:0}){this.props.onRows(this._currentRowsRange);this._currentRowsRange={start:0,end:0};}},onScroll:function onScroll(e){var _this=this;if(ReactDOM.findDOMNode(this)!==e.target){return;}this.appendScrollShim();var scrollLeft=e.target.scrollLeft;var scrollTop=e.target.scrollTop;var scroll={scrollTop:scrollTop,scrollLeft:scrollLeft}; // check how far we have scrolled, and if this means we are being taken out of range
	var scrollYRange=Math.abs(this._scroll.scrollTop-scroll.scrollTop)/this.props.rowHeight;var scrolledOutOfRange=scrollYRange>this.props.displayEnd-this.props.displayStart;this._scroll=scroll;this.props.onScroll(scroll); // if we go out of range, we queue the actual render, just rendering cheap placeholders
	// avoiding rendering anything expensive while a user scrolls down
	if(scrolledOutOfRange&&this.props.rowScrollTimeout>0){var scrollTO=this.state.scrollingTimeout;if(scrollTO){clearTimeout(scrollTO);} // queue up, and set state to clear the TO so we render the rows (not placeholders)
	scrollTO=setTimeout(function(){if(_this.state.scrollingTimeout!==null){_this.setState({scrollingTimeout:null});}},this.props.rowScrollTimeout);this.setState({scrollingTimeout:scrollTO});}},getRows:function getRows(displayStart,displayEnd){this._currentRowsRange={start:displayStart,end:displayEnd};if(Array.isArray(this.props.rowGetter)){return this.props.rowGetter.slice(displayStart,displayEnd);}var rows=[];for(var i=displayStart;i<displayEnd;i++){rows.push(this.props.rowGetter(i));}return rows;},getScrollbarWidth:function getScrollbarWidth(){var scrollbarWidth=0; // Get the scrollbar width
	var canvas=ReactDOM.findDOMNode(this);scrollbarWidth=canvas.offsetWidth-canvas.clientWidth;return scrollbarWidth;},getScroll:function getScroll(){var _ReactDOM$findDOMNode=ReactDOM.findDOMNode(this);var scrollTop=_ReactDOM$findDOMNode.scrollTop;var scrollLeft=_ReactDOM$findDOMNode.scrollLeft;return {scrollTop:scrollTop,scrollLeft:scrollLeft};},isRowSelected:function isRowSelected(row){var _this2=this;var selectedRows=this.props.selectedRows.filter(function(r){var rowKeyValue=row.get?row.get(_this2.props.rowKey):row[_this2.props.rowKey];return r[_this2.props.rowKey]===rowKeyValue;});return selectedRows.length>0&&selectedRows[0].isSelected;},_currentRowsLength:0,_currentRowsRange:{start:0,end:0},_scroll:{scrollTop:0,scrollLeft:0},setScrollLeft:function setScrollLeft(scrollLeft){if(this._currentRowsLength!==0){if(!this.refs)return;for(var i=0,len=this._currentRowsLength;i<len;i++){if(this.refs[i]&&this.refs[i].setScrollLeft){this.refs[i].setScrollLeft(scrollLeft);}}}},renderRow:function renderRow(props){if(this.state.scrollingTimeout!==null){ // in the midst of a rapid scroll, so we render placeholders
	// the actual render is then queued (through a timeout)
	// this avoids us redering a bunch of rows that a user is trying to scroll past
	return this.renderScrollingPlaceholder(props);}var RowsRenderer=this.props.rowRenderer;if(typeof RowsRenderer==='function'){return React.createElement(RowsRenderer,props);}if(React.isValidElement(this.props.rowRenderer)){return React.cloneElement(this.props.rowRenderer,props);}},renderScrollingPlaceholder:function renderScrollingPlaceholder(props){ // here we are just rendering empty cells
	// we may want to allow a user to inject this, and/or just render the cells that are in view
	// for now though we essentially are doing a (very lightweight) row + cell with empty content
	var styles={row:{height:props.height,overflow:'hidden'},cell:{height:props.height,position:'absolute'},placeholder:{backgroundColor:'rgba(211, 211, 211, 0.45)',width:'60%',height:Math.floor(props.height*0.3)}};return React.createElement('div',{key:props.key,style:styles.row,className:'react-grid-Row'},this.props.columns.map(function(col,idx){return React.createElement('div',{style:Object.assign(styles.cell,{width:col.width,left:col.left}),key:idx,className:'react-grid-Cell'},React.createElement('div',{style:Object.assign(styles.placeholder,{width:Math.floor(col.width*0.6)})}));}));},renderPlaceholder:function renderPlaceholder(key,height){ // just renders empty cells
	// if we wanted to show gridlines, we'd need classes and position as with renderScrollingPlaceholder
	return React.createElement('div',{key:key,style:{height:height}},this.props.columns.map(function(column,idx){return React.createElement('div',{style:{width:column.width},key:idx});}));},render:function render(){var _this3=this;var displayStart=this.state.displayStart;var displayEnd=this.state.displayEnd;var rowHeight=this.props.rowHeight;var length=this.props.rowsCount;var rows=this.getRows(displayStart,displayEnd).map(function(row,idx){return _this3.renderRow({key:displayStart+idx,ref:idx,idx:displayStart+idx,row:row,height:rowHeight,columns:_this3.props.columns,isSelected:_this3.isRowSelected(row),expandedRows:_this3.props.expandedRows,cellMetaData:_this3.props.cellMetaData});});this._currentRowsLength=rows.length;if(displayStart>0){rows.unshift(this.renderPlaceholder('top',displayStart*rowHeight));}if(length-displayEnd>0){rows.push(this.renderPlaceholder('bottom',(length-displayEnd)*rowHeight));}var style={position:'absolute',top:0,left:0,overflowX:'auto',overflowY:'scroll',width:this.props.totalWidth,height:this.props.height,transform:'translate3d(0, 0, 0)'};return React.createElement('div',{style:style,onScroll:this.onScroll,className:joinClasses('react-grid-Canvas',this.props.className,{opaque:this.props.cellMetaData.selected&&this.props.cellMetaData.selected.active})},React.createElement(_RowsContainer2['default'],{width:this.props.width,rows:rows,contextMenu:this.props.contextMenu,rowIdx:this.props.cellMetaData.selected.rowIdx,idx:this.props.cellMetaData.selected.idx}));}});module.exports=Canvas; /***/}, /* 23 */ /***/function(module,exports,__webpack_require__){'use strict';Object.defineProperty(exports,"__esModule",{value:true});exports.ContextMenuRowsContainer=exports.SimpleRowsContainer=undefined;var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=__webpack_require__(2);var _react2=_interopRequireDefault(_react);var _reactContextmenu=__webpack_require__(24);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==='undefined'?'undefined':_typeof2(call))==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+(typeof superClass==='undefined'?'undefined':_typeof2(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var RowsContainer=function(_React$Component){_inherits(RowsContainer,_React$Component);function RowsContainer(){_classCallCheck(this,RowsContainer);return _possibleConstructorReturn(this,Object.getPrototypeOf(RowsContainer).apply(this,arguments));}_createClass(RowsContainer,[{key:'hasContextMenu',value:function hasContextMenu(){return this.props.contextMenu&&_react2['default'].isValidElement(this.props.contextMenu);}},{key:'renderRowsWithContextMenu',value:function renderRowsWithContextMenu(){var newProps={rowIdx:this.props.rowIdx,idx:this.props.idx};var contextMenu=_react2['default'].cloneElement(this.props.contextMenu,newProps);return _react2['default'].createElement('div',null,_react2['default'].createElement(ContextMenuRowsContainer,this.props),contextMenu);}},{key:'render',value:function render(){return this.hasContextMenu()?this.renderRowsWithContextMenu():_react2['default'].createElement(SimpleRowsContainer,this.props);}}]);return RowsContainer;}(_react2['default'].Component);RowsContainer.propTypes={contextMenu:_react.PropTypes.element,rowIdx:_react.PropTypes.number,idx:_react.PropTypes.number};var SimpleRowsContainer=function(_React$Component2){_inherits(SimpleRowsContainer,_React$Component2);function SimpleRowsContainer(){_classCallCheck(this,SimpleRowsContainer);return _possibleConstructorReturn(this,Object.getPrototypeOf(SimpleRowsContainer).apply(this,arguments));}_createClass(SimpleRowsContainer,[{key:'render',value:function render(){return _react2['default'].createElement('div',{style:{width:this.props.width,overflow:'hidden'}},this.props.rows);}}]);return SimpleRowsContainer;}(_react2['default'].Component);SimpleRowsContainer.propTypes={width:_react.PropTypes.number,rows:_react.PropTypes.array};var ContextMenuRowsContainer=(0,_reactContextmenu.ContextMenuLayer)('reactDataGridContextMenu')(SimpleRowsContainer);exports['default']=RowsContainer;exports.SimpleRowsContainer=SimpleRowsContainer;exports.ContextMenuRowsContainer=ContextMenuRowsContainer; /***/}, /* 24 */ /***/function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _contextMenu=__webpack_require__(25);Object.defineProperty(exports,"ContextMenu",{enumerable:true,get:function get(){return _interopRequireDefault(_contextMenu)['default'];}});var _contextmenuLayer=__webpack_require__(78);Object.defineProperty(exports,"ContextMenuLayer",{enumerable:true,get:function get(){return _interopRequireDefault(_contextmenuLayer)['default'];}});var _menuItem=__webpack_require__(81);Object.defineProperty(exports,"MenuItem",{enumerable:true,get:function get(){return _interopRequireDefault(_menuItem)['default'];}});var _monitor=__webpack_require__(44);Object.defineProperty(exports,"monitor",{enumerable:true,get:function get(){return _interopRequireDefault(_monitor)['default'];}});var _submenu=__webpack_require__(83);Object.defineProperty(exports,"SubMenu",{enumerable:true,get:function get(){return _interopRequireDefault(_submenu)['default'];}});var _connect=__webpack_require__(85);Object.defineProperty(exports,"connect",{enumerable:true,get:function get(){return _interopRequireDefault(_connect)['default'];}});function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};} /***/}, /* 25 */ /***/function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _react=__webpack_require__(2);var _react2=_interopRequireDefault(_react);var _store=__webpack_require__(26);var _store2=_interopRequireDefault(_store);var _wrapper=__webpack_require__(43);var _wrapper2=_interopRequireDefault(_wrapper);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var PropTypes=_react2['default'].PropTypes;var ContextMenu=_react2['default'].createClass({displayName:"ContextMenu",propTypes:{identifier:PropTypes.string.isRequired},getInitialState:function getInitialState(){return _store2['default'].getState();},componentDidMount:function componentDidMount(){this.unsubscribe=_store2['default'].subscribe(this.handleUpdate);},componentWillUnmount:function componentWillUnmount(){if(this.unsubscribe)this.unsubscribe();},handleUpdate:function handleUpdate(){this.setState(this.getInitialState());},render:function render(){return _react2['default'].createElement(_wrapper2['default'],_extends({},this.props,this.state));}});exports['default']=ContextMenu; /***/}, /* 26 */ /***/function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _redux=__webpack_require__(27);var _reducers=__webpack_require__(41);var _reducers2=_interopRequireDefault(_reducers);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}exports['default']=(0,_redux.createStore)(_reducers2['default']); /***/}, /* 27 */ /***/function(module,exports,__webpack_require__){ /* WEBPACK VAR INJECTION */(function(process){'use strict';exports.__esModule=true;exports.compose=exports.applyMiddleware=exports.bindActionCreators=exports.combineReducers=exports.createStore=undefined;var _createStore=__webpack_require__(29);var _createStore2=_interopRequireDefault(_createStore);var _combineReducers=__webpack_require__(36);var _combineReducers2=_interopRequireDefault(_combineReducers);var _bindActionCreators=__webpack_require__(38);var _bindActionCreators2=_interopRequireDefault(_bindActionCreators);var _applyMiddleware=__webpack_require__(39);var _applyMiddleware2=_interopRequireDefault(_applyMiddleware);var _compose=__webpack_require__(40);var _compose2=_interopRequireDefault(_compose);var _warning=__webpack_require__(37);var _warning2=_interopRequireDefault(_warning);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj};} /*
		* This is a dummy function to check if the function name has been altered by minification.
		* If the function has been minified and NODE_ENV !== 'production', warn the user.
		*/function isCrushed(){}if(process.env.NODE_ENV!=='production'&&typeof isCrushed.name==='string'&&isCrushed.name!=='isCrushed'){(0,_warning2["default"])('You are currently using minified code outside of NODE_ENV === \'production\'. '+'This means that you are running a slower development build of Redux. '+'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify '+'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) '+'to ensure you have the correct code for your production build.');}exports.createStore=_createStore2["default"];exports.combineReducers=_combineReducers2["default"];exports.bindActionCreators=_bindActionCreators2["default"];exports.applyMiddleware=_applyMiddleware2["default"];exports.compose=_compose2["default"]; /* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(28)); /***/}, /* 28 */ /***/function(module,exports){ // shim for using process in browser
	var process=module.exports={};var queue=[];var draining=false;var currentQueue;var queueIndex=-1;function cleanUpNextTick(){if(!draining||!currentQueue){return;}draining=false;if(currentQueue.length){queue=currentQueue.concat(queue);}else {queueIndex=-1;}if(queue.length){drainQueue();}}function drainQueue(){if(draining){return;}var timeout=setTimeout(cleanUpNextTick);draining=true;var len=queue.length;while(len){currentQueue=queue;queue=[];while(++queueIndex<len){if(currentQueue){currentQueue[queueIndex].run();}}queueIndex=-1;len=queue.length;}currentQueue=null;draining=false;clearTimeout(timeout);}process.nextTick=function(fun){var args=new Array(arguments.length-1);if(arguments.length>1){for(var i=1;i<arguments.length;i++){args[i-1]=arguments[i];}}queue.push(new Item(fun,args));if(queue.length===1&&!draining){setTimeout(drainQueue,0);}}; // v8 likes predictible objects
	function Item(fun,array){this.fun=fun;this.array=array;}Item.prototype.run=function(){this.fun.apply(null,this.array);};process.title='browser';process.browser=true;process.env={};process.argv=[];process.version=''; // empty string to avoid regexp issues
	process.versions={};function noop(){}process.on=noop;process.addListener=noop;process.once=noop;process.off=noop;process.removeListener=noop;process.removeAllListeners=noop;process.emit=noop;process.binding=function(name){throw new Error('process.binding is not supported');};process.cwd=function(){return '/';};process.chdir=function(dir){throw new Error('process.chdir is not supported');};process.umask=function(){return 0;}; /***/}, /* 29 */ /***/function(module,exports,__webpack_require__){'use strict';exports.__esModule=true;exports.ActionTypes=undefined;exports["default"]=createStore;var _isPlainObject=__webpack_require__(30);var _isPlainObject2=_interopRequireDefault(_isPlainObject);var _symbolObservable=__webpack_require__(34);var _symbolObservable2=_interopRequireDefault(_symbolObservable);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj};} /**
		 * These are private action types reserved by Redux.
		 * For any unknown actions, you must return the current state.
		 * If the current state is undefined, you must return the initial state.
		 * Do not reference these action types directly in your code.
		 */var ActionTypes=exports.ActionTypes={INIT:'@@redux/INIT'}; /**
		 * Creates a Redux store that holds the state tree.
		 * The only way to change the data in the store is to call `dispatch()` on it.
		 *
		 * There should only be a single store in your app. To specify how different
		 * parts of the state tree respond to actions, you may combine several reducers
		 * into a single reducer function by using `combineReducers`.
		 *
		 * @param {Function} reducer A function that returns the next state tree, given
		 * the current state tree and the action to handle.
		 *
		 * @param {any} [initialState] The initial state. You may optionally specify it
		 * to hydrate the state from the server in universal apps, or to restore a
		 * previously serialized user session.
		 * If you use `combineReducers` to produce the root reducer function, this must be
		 * an object with the same shape as `combineReducers` keys.
		 *
		 * @param {Function} enhancer The store enhancer. You may optionally specify it
		 * to enhance the store with third-party capabilities such as middleware,
		 * time travel, persistence, etc. The only store enhancer that ships with Redux
		 * is `applyMiddleware()`.
		 *
		 * @returns {Store} A Redux store that lets you read the state, dispatch actions
		 * and subscribe to changes.
		 */function createStore(reducer,initialState,enhancer){var _ref2;if(typeof initialState==='function'&&typeof enhancer==='undefined'){enhancer=initialState;initialState=undefined;}if(typeof enhancer!=='undefined'){if(typeof enhancer!=='function'){throw new Error('Expected the enhancer to be a function.');}return enhancer(createStore)(reducer,initialState);}if(typeof reducer!=='function'){throw new Error('Expected the reducer to be a function.');}var currentReducer=reducer;var currentState=initialState;var currentListeners=[];var nextListeners=currentListeners;var isDispatching=false;function ensureCanMutateNextListeners(){if(nextListeners===currentListeners){nextListeners=currentListeners.slice();}} /**
		   * Reads the state tree managed by the store.
		   *
		   * @returns {any} The current state tree of your application.
		   */function getState(){return currentState;} /**
		   * Adds a change listener. It will be called any time an action is dispatched,
		   * and some part of the state tree may potentially have changed. You may then
		   * call `getState()` to read the current state tree inside the callback.
		   *
		   * You may call `dispatch()` from a change listener, with the following
		   * caveats:
		   *
		   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
		   * If you subscribe or unsubscribe while the listeners are being invoked, this
		   * will not have any effect on the `dispatch()` that is currently in progress.
		   * However, the next `dispatch()` call, whether nested or not, will use a more
		   * recent snapshot of the subscription list.
		   *
		   * 2. The listener should not expect to see all state changes, as the state
		   * might have been updated multiple times during a nested `dispatch()` before
		   * the listener is called. It is, however, guaranteed that all subscribers
		   * registered before the `dispatch()` started will be called with the latest
		   * state by the time it exits.
		   *
		   * @param {Function} listener A callback to be invoked on every dispatch.
		   * @returns {Function} A function to remove this change listener.
		   */function subscribe(listener){if(typeof listener!=='function'){throw new Error('Expected listener to be a function.');}var isSubscribed=true;ensureCanMutateNextListeners();nextListeners.push(listener);return function unsubscribe(){if(!isSubscribed){return;}isSubscribed=false;ensureCanMutateNextListeners();var index=nextListeners.indexOf(listener);nextListeners.splice(index,1);};} /**
		   * Dispatches an action. It is the only way to trigger a state change.
		   *
		   * The `reducer` function, used to create the store, will be called with the
		   * current state tree and the given `action`. Its return value will
		   * be considered the **next** state of the tree, and the change listeners
		   * will be notified.
		   *
		   * The base implementation only supports plain object actions. If you want to
		   * dispatch a Promise, an Observable, a thunk, or something else, you need to
		   * wrap your store creating function into the corresponding middleware. For
		   * example, see the documentation for the `redux-thunk` package. Even the
		   * middleware will eventually dispatch plain object actions using this method.
		   *
		   * @param {Object} action A plain object representing “what changed”. It is
		   * a good idea to keep actions serializable so you can record and replay user
		   * sessions, or use the time travelling `redux-devtools`. An action must have
		   * a `type` property which may not be `undefined`. It is a good idea to use
		   * string constants for action types.
		   *
		   * @returns {Object} For convenience, the same action object you dispatched.
		   *
		   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
		   * return something else (for example, a Promise you can await).
		   */function dispatch(action){if(!(0,_isPlainObject2["default"])(action)){throw new Error('Actions must be plain objects. '+'Use custom middleware for async actions.');}if(typeof action.type==='undefined'){throw new Error('Actions may not have an undefined "type" property. '+'Have you misspelled a constant?');}if(isDispatching){throw new Error('Reducers may not dispatch actions.');}try{isDispatching=true;currentState=currentReducer(currentState,action);}finally {isDispatching=false;}var listeners=currentListeners=nextListeners;for(var i=0;i<listeners.length;i++){listeners[i]();}return action;} /**
		   * Replaces the reducer currently used by the store to calculate the state.
		   *
		   * You might need this if your app implements code splitting and you want to
		   * load some of the reducers dynamically. You might also need this if you
		   * implement a hot reloading mechanism for Redux.
		   *
		   * @param {Function} nextReducer The reducer for the store to use instead.
		   * @returns {void}
		   */function replaceReducer(nextReducer){if(typeof nextReducer!=='function'){throw new Error('Expected the nextReducer to be a function.');}currentReducer=nextReducer;dispatch({type:ActionTypes.INIT});} /**
		   * Interoperability point for observable/reactive libraries.
		   * @returns {observable} A minimal observable of state changes.
		   * For more information, see the observable proposal:
		   * https://github.com/zenparsing/es-observable
		   */function observable(){var _ref;var outerSubscribe=subscribe;return _ref={ /**
		       * The minimal observable subscription method.
		       * @param {Object} observer Any object that can be used as an observer.
		       * The observer object should have a `next` method.
		       * @returns {subscription} An object with an `unsubscribe` method that can
		       * be used to unsubscribe the observable from the store, and prevent further
		       * emission of values from the observable.
		       */subscribe:function subscribe(observer){if((typeof observer==='undefined'?'undefined':_typeof2(observer))!=='object'){throw new TypeError('Expected the observer to be an object.');}function observeState(){if(observer.next){observer.next(getState());}}observeState();var unsubscribe=outerSubscribe(observeState);return {unsubscribe:unsubscribe};}},_ref[_symbolObservable2["default"]]=function(){return this;},_ref;} // When a store is created, an "INIT" action is dispatched so that every
	// reducer returns their initial state. This effectively populates
	// the initial state tree.
	dispatch({type:ActionTypes.INIT});return _ref2={dispatch:dispatch,subscribe:subscribe,getState:getState,replaceReducer:replaceReducer},_ref2[_symbolObservable2["default"]]=observable,_ref2;} /***/}, /* 30 */ /***/function(module,exports,__webpack_require__){var getPrototype=__webpack_require__(31),isHostObject=__webpack_require__(32),isObjectLike=__webpack_require__(33); /** `Object#toString` result references. */var objectTag='[object Object]'; /** Used for built-in method references. */var objectProto=Object.prototype; /** Used to resolve the decompiled source of functions. */var funcToString=Function.prototype.toString; /** Used to check objects for own properties. */var hasOwnProperty=objectProto.hasOwnProperty; /** Used to infer the `Object` constructor. */var objectCtorString=funcToString.call(Object); /**
		 * Used to resolve the
		 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
		 * of values.
		 */var objectToString=objectProto.toString; /**
		 * Checks if `value` is a plain object, that is, an object created by the
		 * `Object` constructor or one with a `[[Prototype]]` of `null`.
		 *
		 * @static
		 * @memberOf _
		 * @since 0.8.0
		 * @category Lang
		 * @param {*} value The value to check.
		 * @returns {boolean} Returns `true` if `value` is a plain object,
		 *  else `false`.
		 * @example
		 *
		 * function Foo() {
		 *   this.a = 1;
		 * }
		 *
		 * _.isPlainObject(new Foo);
		 * // => false
		 *
		 * _.isPlainObject([1, 2, 3]);
		 * // => false
		 *
		 * _.isPlainObject({ 'x': 0, 'y': 0 });
		 * // => true
		 *
		 * _.isPlainObject(Object.create(null));
		 * // => true
		 */function isPlainObject(value){if(!isObjectLike(value)||objectToString.call(value)!=objectTag||isHostObject(value)){return false;}var proto=getPrototype(value);if(proto===null){return true;}var Ctor=hasOwnProperty.call(proto,'constructor')&&proto.constructor;return typeof Ctor=='function'&&Ctor instanceof Ctor&&funcToString.call(Ctor)==objectCtorString;}module.exports=isPlainObject; /***/}, /* 31 */ /***/function(module,exports){ /* Built-in method references for those with the same name as other `lodash` methods. */var nativeGetPrototype=Object.getPrototypeOf; /**
		 * Gets the `[[Prototype]]` of `value`.
		 *
		 * @private
		 * @param {*} value The value to query.
		 * @returns {null|Object} Returns the `[[Prototype]]`.
		 */function getPrototype(value){return nativeGetPrototype(Object(value));}module.exports=getPrototype; /***/}, /* 32 */ /***/function(module,exports){ /**
		 * Checks if `value` is a host object in IE < 9.
		 *
		 * @private
		 * @param {*} value The value to check.
		 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
		 */function isHostObject(value){ // Many host objects are `Object` objects that can coerce to strings
	// despite having improperly defined `toString` methods.
	var result=false;if(value!=null&&typeof value.toString!='function'){try{result=!!(value+'');}catch(e){}}return result;}module.exports=isHostObject; /***/}, /* 33 */ /***/function(module,exports){ /**
		 * Checks if `value` is object-like. A value is object-like if it's not `null`
		 * and has a `typeof` result of "object".
		 *
		 * @static
		 * @memberOf _
		 * @since 4.0.0
		 * @category Lang
		 * @param {*} value The value to check.
		 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
		 * @example
		 *
		 * _.isObjectLike({});
		 * // => true
		 *
		 * _.isObjectLike([1, 2, 3]);
		 * // => true
		 *
		 * _.isObjectLike(_.noop);
		 * // => false
		 *
		 * _.isObjectLike(null);
		 * // => false
		 */function isObjectLike(value){return !!value&&(typeof value==='undefined'?'undefined':_typeof2(value))=='object';}module.exports=isObjectLike; /***/}, /* 34 */ /***/function(module,exports,__webpack_require__){ /* WEBPACK VAR INJECTION */(function(global){ /* global window */'use strict';module.exports=__webpack_require__(35)(global||window||this); /* WEBPACK VAR INJECTION */}).call(exports,function(){return this;}()); /***/}, /* 35 */ /***/function(module,exports){'use strict';module.exports=function symbolObservablePonyfill(root){var result;var _Symbol=root.Symbol;if(typeof _Symbol==='function'){if(_Symbol.observable){result=_Symbol.observable;}else {result=_Symbol('observable');_Symbol.observable=result;}}else {result='@@observable';}return result;}; /***/}, /* 36 */ /***/function(module,exports,__webpack_require__){ /* WEBPACK VAR INJECTION */(function(process){'use strict';exports.__esModule=true;exports["default"]=combineReducers;var _createStore=__webpack_require__(29);var _isPlainObject=__webpack_require__(30);var _isPlainObject2=_interopRequireDefault(_isPlainObject);var _warning=__webpack_require__(37);var _warning2=_interopRequireDefault(_warning);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj};}function getUndefinedStateErrorMessage(key,action){var actionType=action&&action.type;var actionName=actionType&&'"'+actionType.toString()+'"'||'an action';return 'Given action '+actionName+', reducer "'+key+'" returned undefined. '+'To ignore an action, you must explicitly return the previous state.';}function getUnexpectedStateShapeWarningMessage(inputState,reducers,action){var reducerKeys=Object.keys(reducers);var argumentName=action&&action.type===_createStore.ActionTypes.INIT?'initialState argument passed to createStore':'previous state received by the reducer';if(reducerKeys.length===0){return 'Store does not have a valid reducer. Make sure the argument passed '+'to combineReducers is an object whose values are reducers.';}if(!(0,_isPlainObject2["default"])(inputState)){return 'The '+argumentName+' has unexpected type of "'+{}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1]+'". Expected argument to be an object with the following '+('keys: "'+reducerKeys.join('", "')+'"');}var unexpectedKeys=Object.keys(inputState).filter(function(key){return !reducers.hasOwnProperty(key);});if(unexpectedKeys.length>0){return 'Unexpected '+(unexpectedKeys.length>1?'keys':'key')+' '+('"'+unexpectedKeys.join('", "')+'" found in '+argumentName+'. ')+'Expected to find one of the known reducer keys instead: '+('"'+reducerKeys.join('", "')+'". Unexpected keys will be ignored.');}}function assertReducerSanity(reducers){Object.keys(reducers).forEach(function(key){var reducer=reducers[key];var initialState=reducer(undefined,{type:_createStore.ActionTypes.INIT});if(typeof initialState==='undefined'){throw new Error('Reducer "'+key+'" returned undefined during initialization. '+'If the state passed to the reducer is undefined, you must '+'explicitly return the initial state. The initial state may '+'not be undefined.');}var type='@@redux/PROBE_UNKNOWN_ACTION_'+Math.random().toString(36).substring(7).split('').join('.');if(typeof reducer(undefined,{type:type})==='undefined'){throw new Error('Reducer "'+key+'" returned undefined when probed with a random type. '+('Don\'t try to handle '+_createStore.ActionTypes.INIT+' or other actions in "redux/*" ')+'namespace. They are considered private. Instead, you must return the '+'current state for any unknown actions, unless it is undefined, '+'in which case you must return the initial state, regardless of the '+'action type. The initial state may not be undefined.');}});} /**
		 * Turns an object whose values are different reducer functions, into a single
		 * reducer function. It will call every child reducer, and gather their results
		 * into a single state object, whose keys correspond to the keys of the passed
		 * reducer functions.
		 *
		 * @param {Object} reducers An object whose values correspond to different
		 * reducer functions that need to be combined into one. One handy way to obtain
		 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
		 * undefined for any action. Instead, they should return their initial state
		 * if the state passed to them was undefined, and the current state for any
		 * unrecognized action.
		 *
		 * @returns {Function} A reducer function that invokes every reducer inside the
		 * passed object, and builds a state object with the same shape.
		 */function combineReducers(reducers){var reducerKeys=Object.keys(reducers);var finalReducers={};for(var i=0;i<reducerKeys.length;i++){var key=reducerKeys[i];if(typeof reducers[key]==='function'){finalReducers[key]=reducers[key];}}var finalReducerKeys=Object.keys(finalReducers);var sanityError;try{assertReducerSanity(finalReducers);}catch(e){sanityError=e;}return function combination(){var state=arguments.length<=0||arguments[0]===undefined?{}:arguments[0];var action=arguments[1];if(sanityError){throw sanityError;}if(process.env.NODE_ENV!=='production'){var warningMessage=getUnexpectedStateShapeWarningMessage(state,finalReducers,action);if(warningMessage){(0,_warning2["default"])(warningMessage);}}var hasChanged=false;var nextState={};for(var i=0;i<finalReducerKeys.length;i++){var key=finalReducerKeys[i];var reducer=finalReducers[key];var previousStateForKey=state[key];var nextStateForKey=reducer(previousStateForKey,action);if(typeof nextStateForKey==='undefined'){var errorMessage=getUndefinedStateErrorMessage(key,action);throw new Error(errorMessage);}nextState[key]=nextStateForKey;hasChanged=hasChanged||nextStateForKey!==previousStateForKey;}return hasChanged?nextState:state;};} /* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(28)); /***/}, /* 37 */ /***/function(module,exports){'use strict';exports.__esModule=true;exports["default"]=warning; /**
		 * Prints a warning in the console if it exists.
		 *
		 * @param {String} message The warning message.
		 * @returns {void}
		 */function warning(message){ /* eslint-disable no-console */if(typeof console!=='undefined'&&typeof console.error==='function'){console.error(message);} /* eslint-enable no-console */try{ // This error was thrown as a convenience so that if you enable
	// "break on all exceptions" in your console,
	// it would pause the execution at this line.
	throw new Error(message); /* eslint-disable no-empty */}catch(e){} /* eslint-enable no-empty */} /***/}, /* 38 */ /***/function(module,exports){'use strict';exports.__esModule=true;exports["default"]=bindActionCreators;function bindActionCreator(actionCreator,dispatch){return function(){return dispatch(actionCreator.apply(undefined,arguments));};} /**
		 * Turns an object whose values are action creators, into an object with the
		 * same keys, but with every function wrapped into a `dispatch` call so they
		 * may be invoked directly. This is just a convenience method, as you can call
		 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
		 *
		 * For convenience, you can also pass a single function as the first argument,
		 * and get a function in return.
		 *
		 * @param {Function|Object} actionCreators An object whose values are action
		 * creator functions. One handy way to obtain it is to use ES6 `import * as`
		 * syntax. You may also pass a single function.
		 *
		 * @param {Function} dispatch The `dispatch` function available on your Redux
		 * store.
		 *
		 * @returns {Function|Object} The object mimicking the original object, but with
		 * every action creator wrapped into the `dispatch` call. If you passed a
		 * function as `actionCreators`, the return value will also be a single
		 * function.
		 */function bindActionCreators(actionCreators,dispatch){if(typeof actionCreators==='function'){return bindActionCreator(actionCreators,dispatch);}if((typeof actionCreators==='undefined'?'undefined':_typeof2(actionCreators))!=='object'||actionCreators===null){throw new Error('bindActionCreators expected an object or a function, instead received '+(actionCreators===null?'null':typeof actionCreators==='undefined'?'undefined':_typeof2(actionCreators))+'. '+'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');}var keys=Object.keys(actionCreators);var boundActionCreators={};for(var i=0;i<keys.length;i++){var key=keys[i];var actionCreator=actionCreators[key];if(typeof actionCreator==='function'){boundActionCreators[key]=bindActionCreator(actionCreator,dispatch);}}return boundActionCreators;} /***/}, /* 39 */ /***/function(module,exports,__webpack_require__){'use strict';exports.__esModule=true;var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};exports["default"]=applyMiddleware;var _compose=__webpack_require__(40);var _compose2=_interopRequireDefault(_compose);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj};} /**
		 * Creates a store enhancer that applies middleware to the dispatch method
		 * of the Redux store. This is handy for a variety of tasks, such as expressing
		 * asynchronous actions in a concise manner, or logging every action payload.
		 *
		 * See `redux-thunk` package as an example of the Redux middleware.
		 *
		 * Because middleware is potentially asynchronous, this should be the first
		 * store enhancer in the composition chain.
		 *
		 * Note that each middleware will be given the `dispatch` and `getState` functions
		 * as named arguments.
		 *
		 * @param {...Function} middlewares The middleware chain to be applied.
		 * @returns {Function} A store enhancer applying the middleware.
		 */function applyMiddleware(){for(var _len=arguments.length,middlewares=Array(_len),_key=0;_key<_len;_key++){middlewares[_key]=arguments[_key];}return function(createStore){return function(reducer,initialState,enhancer){var store=createStore(reducer,initialState,enhancer);var _dispatch=store.dispatch;var chain=[];var middlewareAPI={getState:store.getState,dispatch:function dispatch(action){return _dispatch(action);}};chain=middlewares.map(function(middleware){return middleware(middlewareAPI);});_dispatch=_compose2["default"].apply(undefined,chain)(store.dispatch);return _extends({},store,{dispatch:_dispatch});};};} /***/}, /* 40 */ /***/function(module,exports){"use strict";exports.__esModule=true;exports["default"]=compose; /**
		 * Composes single-argument functions from right to left. The rightmost
		 * function can take multiple arguments as it provides the signature for
		 * the resulting composite function.
		 *
		 * @param {...Function} funcs The functions to compose.
		 * @returns {Function} A function obtained by composing the argument functions
		 * from right to left. For example, compose(f, g, h) is identical to doing
		 * (...args) => f(g(h(...args))).
		 */function compose(){for(var _len=arguments.length,funcs=Array(_len),_key=0;_key<_len;_key++){funcs[_key]=arguments[_key];}if(funcs.length===0){return function(arg){return arg;};}else {var _ret=function(){var last=funcs[funcs.length-1];var rest=funcs.slice(0,-1);return {v:function v(){return rest.reduceRight(function(composed,f){return f(composed);},last.apply(undefined,arguments));}};}();if((typeof _ret==='undefined'?'undefined':_typeof2(_ret))==="object")return _ret.v;}} /***/}, /* 41 */ /***/function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports['default']=function(){var state=arguments.length<=0||arguments[0]===undefined?defaultState:arguments[0];var action=arguments[1];return action.type==="SET_PARAMS"?(0,_objectAssign2['default'])({},state,action.data):state;};var _objectAssign=__webpack_require__(42);var _objectAssign2=_interopRequireDefault(_objectAssign);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var defaultState={x:0,y:0,isVisible:false,currentItem:{}}; /***/}, /* 42 */ /***/function(module,exports){'use strict'; /* eslint-disable no-unused-vars */var hasOwnProperty=Object.prototype.hasOwnProperty;var propIsEnumerable=Object.prototype.propertyIsEnumerable;function toObject(val){if(val===null||val===undefined){throw new TypeError('Object.assign cannot be called with null or undefined');}return Object(val);}function shouldUseNative(){try{if(!Object.assign){return false;} // Detect buggy property enumeration order in older V8 versions.
	// https://bugs.chromium.org/p/v8/issues/detail?id=4118
	var test1=new String('abc'); // eslint-disable-line
	test1[5]='de';if(Object.getOwnPropertyNames(test1)[0]==='5'){return false;} // https://bugs.chromium.org/p/v8/issues/detail?id=3056
	var test2={};for(var i=0;i<10;i++){test2['_'+String.fromCharCode(i)]=i;}var order2=Object.getOwnPropertyNames(test2).map(function(n){return test2[n];});if(order2.join('')!=='0123456789'){return false;} // https://bugs.chromium.org/p/v8/issues/detail?id=3056
	var test3={};'abcdefghijklmnopqrst'.split('').forEach(function(letter){test3[letter]=letter;});if(Object.keys(Object.assign({},test3)).join('')!=='abcdefghijklmnopqrst'){return false;}return true;}catch(e){ // We don't expect any of the above to throw, but better to be safe.
	return false;}}module.exports=shouldUseNative()?Object.assign:function(target,source){var from;var to=toObject(target);var symbols;for(var s=1;s<arguments.length;s++){from=Object(arguments[s]);for(var key in from){if(hasOwnProperty.call(from,key)){to[key]=from[key];}}if(Object.getOwnPropertySymbols){symbols=Object.getOwnPropertySymbols(from);for(var i=0;i<symbols.length;i++){if(propIsEnumerable.call(from,symbols[i])){to[symbols[i]]=from[symbols[i]];}}}}return to;}; /***/}, /* 43 */ /***/function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _react=__webpack_require__(2);var _react2=_interopRequireDefault(_react);var _monitor=__webpack_require__(44);var _monitor2=_interopRequireDefault(_monitor);var _Modal=__webpack_require__(45);var _Modal2=_interopRequireDefault(_Modal);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var modalStyle={position:"fixed",zIndex:1040,top:0,bottom:0,left:0,right:0},backdropStyle=_extends({},modalStyle,{zIndex:"auto",backgroundColor:"transparent"}),menuStyles={position:"fixed",zIndex:"auto"};var ContextMenuWrapper=_react2['default'].createClass({displayName:"ContextMenuWrapper",getInitialState:function getInitialState(){return {left:0,top:0};},componentWillReceiveProps:function componentWillReceiveProps(nextProps){var _this=this;if(nextProps.isVisible===nextProps.identifier){var wrapper=window.requestAnimationFrame||setTimeout;wrapper(function(){return _this.setState(_this.getMenuPosition(nextProps.x,nextProps.y));});}},shouldComponentUpdate:function shouldComponentUpdate(nextProps){return this.props.isVisible!==nextProps.visible;},getMenuPosition:function getMenuPosition(x,y){var scrollX=document.documentElement.scrollTop;var scrollY=document.documentElement.scrollLeft;var _window=window;var innerWidth=_window.innerWidth;var innerHeight=_window.innerHeight;var rect=this.menu.getBoundingClientRect();var menuStyles={top:y+scrollY,left:x+scrollX};if(y+rect.height>innerHeight){menuStyles.top-=rect.height;}if(x+rect.width>innerWidth){menuStyles.left-=rect.width;}return menuStyles;},render:function render(){var _this2=this;var _props=this.props;var isVisible=_props.isVisible;var identifier=_props.identifier;var children=_props.children;var style=_extends({},menuStyles,this.state);return _react2['default'].createElement(_Modal2['default'],{style:modalStyle,backdropStyle:backdropStyle,show:isVisible===identifier,onHide:function onHide(){return _monitor2['default'].hideMenu();}},_react2['default'].createElement("nav",{ref:function ref(c){return _this2.menu=c;},style:style,className:"react-context-menu"},children));}});exports['default']=ContextMenuWrapper; /***/}, /* 44 */ /***/function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _store=__webpack_require__(26);var _store2=_interopRequireDefault(_store);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}exports['default']={getItem:function getItem(){return _store2['default'].getState().currentItem;},getPosition:function getPosition(){var _store$getState=_store2['default'].getState();var x=_store$getState.x;var y=_store$getState.y;return {x:x,y:y};},hideMenu:function hideMenu(){_store2['default'].dispatch({type:"SET_PARAMS",data:{isVisible:false,currentItem:{}}});}}; /***/}, /* 45 */ /***/function(module,exports,__webpack_require__){ /*eslint-disable react/prop-types */'use strict';exports.__esModule=true;var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}function _objectWithoutProperties(obj,keys){var target={};for(var i in obj){if(keys.indexOf(i)>=0)continue;if(!Object.prototype.hasOwnProperty.call(obj,i))continue;target[i]=obj[i];}return target;}var _react=__webpack_require__(2);var _react2=_interopRequireDefault(_react);var _warning=__webpack_require__(46);var _warning2=_interopRequireDefault(_warning);var _reactPropTypesLibMountable=__webpack_require__(47);var _reactPropTypesLibMountable2=_interopRequireDefault(_reactPropTypesLibMountable);var _reactPropTypesLibElementType=__webpack_require__(49);var _reactPropTypesLibElementType2=_interopRequireDefault(_reactPropTypesLibElementType);var _Portal=__webpack_require__(50);var _Portal2=_interopRequireDefault(_Portal);var _ModalManager=__webpack_require__(54);var _ModalManager2=_interopRequireDefault(_ModalManager);var _utilsOwnerDocument=__webpack_require__(51);var _utilsOwnerDocument2=_interopRequireDefault(_utilsOwnerDocument);var _utilsAddEventListener=__webpack_require__(72);var _utilsAddEventListener2=_interopRequireDefault(_utilsAddEventListener);var _utilsAddFocusListener=__webpack_require__(75);var _utilsAddFocusListener2=_interopRequireDefault(_utilsAddFocusListener);var _domHelpersUtilInDOM=__webpack_require__(68);var _domHelpersUtilInDOM2=_interopRequireDefault(_domHelpersUtilInDOM);var _domHelpersActiveElement=__webpack_require__(76);var _domHelpersActiveElement2=_interopRequireDefault(_domHelpersActiveElement);var _domHelpersQueryContains=__webpack_require__(77);var _domHelpersQueryContains2=_interopRequireDefault(_domHelpersQueryContains);var _utilsGetContainer=__webpack_require__(53);var _utilsGetContainer2=_interopRequireDefault(_utilsGetContainer);var modalManager=new _ModalManager2['default'](); /**
		 * Love them or hate them, `<Modal/>` provides a solid foundation for creating dialogs, lightboxes, or whatever else.
		 * The Modal component renders its `children` node in front of a backdrop component.
		 *
		 * The Modal offers a few helpful features over using just a `<Portal/>` component and some styles:
		 *
		 * - Manages dialog stacking when one-at-a-time just isn't enough.
		 * - Creates a backdrop, for disabling interaction below the modal.
		 * - It properly manages focus; moving to the modal content, and keeping it there until the modal is closed.
		 * - It disables scrolling of the page content while open.
		 * - Adds the appropriate ARIA roles are automatically.
		 * - Easily pluggable animations via a `<Transition/>` component.
		 *
		 * Note that, in the same way the backdrop element prevents users from clicking or interacting
		 * with the page content underneath the Modal, Screen readers also need to be signaled to not to
		 * interact with page content while the Modal is open. To do this, we use a common technique of applying
		 * the `aria-hidden='true'` attribute to the non-Modal elements in the Modal `container`. This means that for
		 * a Modal to be truly modal, it should have a `container` that is _outside_ your app's
		 * React hierarchy (such as the default: document.body).
		 */var Modal=_react2['default'].createClass({displayName:'Modal',propTypes:_extends({},_Portal2['default'].propTypes,{ /**
		     * Set the visibility of the Modal
		     */show:_react2['default'].PropTypes.bool, /**
		     * A Node, Component instance, or function that returns either. The Modal is appended to it's container element.
		     *
		     * For the sake of assistive technologies, the container should usually be the document body, so that the rest of the
		     * page content can be placed behind a virtual backdrop as well as a visual one.
		     */container:_react2['default'].PropTypes.oneOfType([_reactPropTypesLibMountable2['default'],_react2['default'].PropTypes.func]), /**
		     * A callback fired when the Modal is opening.
		     */onShow:_react2['default'].PropTypes.func, /**
		     * A callback fired when either the backdrop is clicked, or the escape key is pressed.
		     *
		     * The `onHide` callback only signals intent from the Modal,
		     * you must actually set the `show` prop to `false` for the Modal to close.
		     */onHide:_react2['default'].PropTypes.func, /**
		     * Include a backdrop component.
		     */backdrop:_react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.bool,_react2['default'].PropTypes.oneOf(['static'])]), /**
		     * A callback fired when the escape key, if specified in `keyboard`, is pressed.
		     */onEscapeKeyUp:_react2['default'].PropTypes.func, /**
		     * A callback fired when the backdrop, if specified, is clicked.
		     */onBackdropClick:_react2['default'].PropTypes.func, /**
		     * A style object for the backdrop component.
		     */backdropStyle:_react2['default'].PropTypes.object, /**
		     * A css class or classes for the backdrop component.
		     */backdropClassName:_react2['default'].PropTypes.string, /**
		     * A css class or set of classes applied to the modal container when the modal is open,
		     * and removed when it is closed.
		     */containerClassName:_react2['default'].PropTypes.string, /**
		     * Close the modal when escape key is pressed
		     */keyboard:_react2['default'].PropTypes.bool, /**
		     * A `<Transition/>` component to use for the dialog and backdrop components.
		     */transition:_reactPropTypesLibElementType2['default'], /**
		     * The `timeout` of the dialog transition if specified. This number is used to ensure that
		     * transition callbacks are always fired, even if browser transition events are canceled.
		     *
		     * See the Transition `timeout` prop for more infomation.
		     */dialogTransitionTimeout:_react2['default'].PropTypes.number, /**
		     * The `timeout` of the backdrop transition if specified. This number is used to
		     * ensure that transition callbacks are always fired, even if browser transition events are canceled.
		     *
		     * See the Transition `timeout` prop for more infomation.
		     */backdropTransitionTimeout:_react2['default'].PropTypes.number, /**
		     * When `true` The modal will automatically shift focus to itself when it opens, and
		     * replace it to the last focused element when it closes. This also
		     * works correctly with any Modal children that have the `autoFocus` prop.
		     *
		     * Generally this should never be set to `false` as it makes the Modal less
		     * accessible to assistive technologies, like screen readers.
		     */autoFocus:_react2['default'].PropTypes.bool, /**
		     * When `true` The modal will prevent focus from leaving the Modal while open.
		     *
		     * Generally this should never be set to `false` as it makes the Modal less
		     * accessible to assistive technologies, like screen readers.
		     */enforceFocus:_react2['default'].PropTypes.bool, /**
		     * Callback fired before the Modal transitions in
		     */onEnter:_react2['default'].PropTypes.func, /**
		     * Callback fired as the Modal begins to transition in
		     */onEntering:_react2['default'].PropTypes.func, /**
		     * Callback fired after the Modal finishes transitioning in
		     */onEntered:_react2['default'].PropTypes.func, /**
		     * Callback fired right before the Modal transitions out
		     */onExit:_react2['default'].PropTypes.func, /**
		     * Callback fired as the Modal begins to transition out
		     */onExiting:_react2['default'].PropTypes.func, /**
		     * Callback fired after the Modal finishes transitioning out
		     */onExited:_react2['default'].PropTypes.func}),getDefaultProps:function getDefaultProps(){var noop=function noop(){};return {show:false,backdrop:true,keyboard:true,autoFocus:true,enforceFocus:true,onHide:noop};},getInitialState:function getInitialState(){return {exited:!this.props.show};},render:function render(){var _props=this.props;var children=_props.children;var Transition=_props.transition;var backdrop=_props.backdrop;var dialogTransitionTimeout=_props.dialogTransitionTimeout;var props=_objectWithoutProperties(_props,['children','transition','backdrop','dialogTransitionTimeout']);var onExit=props.onExit;var onExiting=props.onExiting;var onEnter=props.onEnter;var onEntering=props.onEntering;var onEntered=props.onEntered;var show=!!props.show;var dialog=_react2['default'].Children.only(this.props.children);var mountModal=show||Transition&&!this.state.exited;if(!mountModal){return null;}var _dialog$props=dialog.props;var role=_dialog$props.role;var tabIndex=_dialog$props.tabIndex;if(role===undefined||tabIndex===undefined){dialog=_react.cloneElement(dialog,{role:role===undefined?'document':role,tabIndex:tabIndex==null?'-1':tabIndex});}if(Transition){dialog=_react2['default'].createElement(Transition,{transitionAppear:true,unmountOnExit:true,'in':show,timeout:dialogTransitionTimeout,onExit:onExit,onExiting:onExiting,onExited:this.handleHidden,onEnter:onEnter,onEntering:onEntering,onEntered:onEntered},dialog);}return _react2['default'].createElement(_Portal2['default'],{ref:this.setMountNode,container:props.container},_react2['default'].createElement('div',{ref:'modal',role:props.role||'dialog',style:props.style,className:props.className},backdrop&&this.renderBackdrop(),dialog));},renderBackdrop:function renderBackdrop(){var _props2=this.props;var Transition=_props2.transition;var backdropTransitionTimeout=_props2.backdropTransitionTimeout;var backdrop=_react2['default'].createElement('div',{ref:'backdrop',style:this.props.backdropStyle,className:this.props.backdropClassName,onClick:this.handleBackdropClick});if(Transition){backdrop=_react2['default'].createElement(Transition,{transitionAppear:true,'in':this.props.show,timeout:backdropTransitionTimeout},backdrop);}return backdrop;},componentWillReceiveProps:function componentWillReceiveProps(nextProps){if(nextProps.show){this.setState({exited:false});}else if(!nextProps.transition){ // Otherwise let handleHidden take care of marking exited.
	this.setState({exited:true});}},componentWillUpdate:function componentWillUpdate(nextProps){if(nextProps.show){this.checkForFocus();}},componentDidMount:function componentDidMount(){if(this.props.show){this.onShow();}},componentDidUpdate:function componentDidUpdate(prevProps){var transition=this.props.transition;if(prevProps.show&&!this.props.show&&!transition){ // Otherwise handleHidden will call this.
	this.onHide();}else if(!prevProps.show&&this.props.show){this.onShow();}},componentWillUnmount:function componentWillUnmount(){var _props3=this.props;var show=_props3.show;var transition=_props3.transition;if(show||transition&&!this.state.exited){this.onHide();}},onShow:function onShow(){var doc=_utilsOwnerDocument2['default'](this);var container=_utilsGetContainer2['default'](this.props.container,doc.body);modalManager.add(this,container,this.props.containerClassName);this._onDocumentKeyupListener=_utilsAddEventListener2['default'](doc,'keyup',this.handleDocumentKeyUp);this._onFocusinListener=_utilsAddFocusListener2['default'](this.enforceFocus);this.focus();if(this.props.onShow){this.props.onShow();}},onHide:function onHide(){modalManager.remove(this);this._onDocumentKeyupListener.remove();this._onFocusinListener.remove();this.restoreLastFocus();},setMountNode:function setMountNode(ref){this.mountNode=ref?ref.getMountNode():ref;},handleHidden:function handleHidden(){this.setState({exited:true});this.onHide();if(this.props.onExited){var _props4;(_props4=this.props).onExited.apply(_props4,arguments);}},handleBackdropClick:function handleBackdropClick(e){if(e.target!==e.currentTarget){return;}if(this.props.onBackdropClick){this.props.onBackdropClick(e);}if(this.props.backdrop===true){this.props.onHide();}},handleDocumentKeyUp:function handleDocumentKeyUp(e){if(this.props.keyboard&&e.keyCode===27&&this.isTopModal()){if(this.props.onEscapeKeyUp){this.props.onEscapeKeyUp(e);}this.props.onHide();}},checkForFocus:function checkForFocus(){if(_domHelpersUtilInDOM2['default']){this.lastFocus=_domHelpersActiveElement2['default']();}},focus:function focus(){var autoFocus=this.props.autoFocus;var modalContent=this.getDialogElement();var current=_domHelpersActiveElement2['default'](_utilsOwnerDocument2['default'](this));var focusInModal=current&&_domHelpersQueryContains2['default'](modalContent,current);if(modalContent&&autoFocus&&!focusInModal){this.lastFocus=current;if(!modalContent.hasAttribute('tabIndex')){modalContent.setAttribute('tabIndex',-1);_warning2['default'](false,'The modal content node does not accept focus. '+'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".');}modalContent.focus();}},restoreLastFocus:function restoreLastFocus(){ // Support: <=IE11 doesn't support `focus()` on svg elements (RB: #917)
	if(this.lastFocus&&this.lastFocus.focus){this.lastFocus.focus();this.lastFocus=null;}},enforceFocus:function enforceFocus(){var enforceFocus=this.props.enforceFocus;if(!enforceFocus||!this.isMounted()||!this.isTopModal()){return;}var active=_domHelpersActiveElement2['default'](_utilsOwnerDocument2['default'](this));var modal=this.getDialogElement();if(modal&&modal!==active&&!_domHelpersQueryContains2['default'](modal,active)){modal.focus();}}, //instead of a ref, which might conflict with one the parent applied.
	getDialogElement:function getDialogElement(){var node=this.refs.modal;return node&&node.lastChild;},isTopModal:function isTopModal(){return modalManager.isTopModal(this);}});Modal.manager=modalManager;exports['default']=Modal;module.exports=exports['default']; /***/}, /* 46 */ /***/function(module,exports,__webpack_require__){ /* WEBPACK VAR INJECTION */(function(process){ /**
		 * Copyright 2014-2015, Facebook, Inc.
		 * All rights reserved.
		 *
		 * This source code is licensed under the BSD-style license found in the
		 * LICENSE file in the root directory of this source tree. An additional grant
		 * of patent rights can be found in the PATENTS file in the same directory.
		 */'use strict'; /**
		 * Similar to invariant but only logs a warning if the condition is not met.
		 * This can be used to log issues in development environments in critical
		 * paths. Removing the logging code for production environments will keep the
		 * same logic and follow the same code paths.
		 */var warning=function warning(){};if(process.env.NODE_ENV!=='production'){warning=function warning(condition,format,args){var len=arguments.length;args=new Array(len>2?len-2:0);for(var key=2;key<len;key++){args[key-2]=arguments[key];}if(format===undefined){throw new Error('`warning(condition, format, ...args)` requires a warning '+'message argument');}if(format.length<10||/^[s\W]*$/.test(format)){throw new Error('The warning format should be able to uniquely identify this '+'warning. Please, use a more descriptive format than: '+format);}if(!condition){var argIndex=0;var message='Warning: '+format.replace(/%s/g,function(){return args[argIndex++];});if(typeof console!=='undefined'){console.error(message);}try{ // This error was thrown as a convenience so that you can use this stack
	// to find the callsite that caused this warning to fire.
	throw new Error(message);}catch(x){}}};}module.exports=warning; /* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(28)); /***/}, /* 47 */ /***/function(module,exports,__webpack_require__){'use strict';exports.__esModule=true;var _common=__webpack_require__(48); /**
		 * Checks whether a prop provides a DOM element
		 *
		 * The element can be provided in two forms:
		 * - Directly passed
		 * - Or passed an object that has a `render` method
		 *
		 * @param props
		 * @param propName
		 * @param componentName
		 * @returns {Error|undefined}
		 */function validate(props,propName,componentName){if(_typeof2(props[propName])!=='object'||typeof props[propName].render!=='function'&&props[propName].nodeType!==1){return new Error(_common.errMsg(props,propName,componentName,', expected a DOM element or an object that has a `render` method'));}}exports['default']=_common.createChainableTypeChecker(validate);module.exports=exports['default']; /***/}, /* 48 */ /***/function(module,exports){'use strict';exports.__esModule=true;exports.errMsg=errMsg;exports.createChainableTypeChecker=createChainableTypeChecker;function errMsg(props,propName,componentName,msgContinuation){return 'Invalid prop \''+propName+'\' of value \''+props[propName]+'\''+(' supplied to \''+componentName+'\''+msgContinuation);} /**
		 * Create chain-able isRequired validator
		 *
		 * Largely copied directly from:
		 *  https://github.com/facebook/react/blob/0.11-stable/src/core/ReactPropTypes.js#L94
		 */function createChainableTypeChecker(validate){function checkType(isRequired,props,propName,componentName){componentName=componentName||'<<anonymous>>';if(props[propName]==null){if(isRequired){return new Error('Required prop \''+propName+'\' was not specified in \''+componentName+'\'.');}}else {return validate(props,propName,componentName);}}var chainedCheckType=checkType.bind(null,false);chainedCheckType.isRequired=checkType.bind(null,true);return chainedCheckType;} /***/}, /* 49 */ /***/function(module,exports,__webpack_require__){'use strict';exports.__esModule=true;function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var _react=__webpack_require__(2);var _react2=_interopRequireDefault(_react);var _common=__webpack_require__(48); /**
		 * Checks whether a prop provides a type of element.
		 *
		 * The type of element can be provided in two forms:
		 * - tag name (string)
		 * - a return value of React.createClass(...)
		 *
		 * @param props
		 * @param propName
		 * @param componentName
		 * @returns {Error|undefined}
		 */function validate(props,propName,componentName){var errBeginning=_common.errMsg(props,propName,componentName,'. Expected an Element `type`');if(typeof props[propName]!=='function'){if(_react2['default'].isValidElement(props[propName])){return new Error(errBeginning+', not an actual Element');}if(typeof props[propName]!=='string'){return new Error(errBeginning+' such as a tag name or return value of React.createClass(...)');}}}exports['default']=_common.createChainableTypeChecker(validate);module.exports=exports['default']; /***/}, /* 50 */ /***/function(module,exports,__webpack_require__){'use strict';exports.__esModule=true;function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var _react=__webpack_require__(2);var _react2=_interopRequireDefault(_react);var _reactDom=__webpack_require__(3);var _reactDom2=_interopRequireDefault(_reactDom);var _reactPropTypesLibMountable=__webpack_require__(47);var _reactPropTypesLibMountable2=_interopRequireDefault(_reactPropTypesLibMountable);var _utilsOwnerDocument=__webpack_require__(51);var _utilsOwnerDocument2=_interopRequireDefault(_utilsOwnerDocument);var _utilsGetContainer=__webpack_require__(53);var _utilsGetContainer2=_interopRequireDefault(_utilsGetContainer); /**
		 * The `<Portal/>` component renders its children into a new "subtree" outside of current component hierarchy.
		 * You can think of it as a declarative `appendChild()`, or jQuery's `$.fn.appendTo()`.
		 * The children of `<Portal/>` component will be appended to the `container` specified.
		 */var Portal=_react2['default'].createClass({displayName:'Portal',propTypes:{ /**
		     * A Node, Component instance, or function that returns either. The `container` will have the Portal children
		     * appended to it.
		     */container:_react2['default'].PropTypes.oneOfType([_reactPropTypesLibMountable2['default'],_react2['default'].PropTypes.func])},componentDidMount:function componentDidMount(){this._renderOverlay();},componentDidUpdate:function componentDidUpdate(){this._renderOverlay();},componentWillReceiveProps:function componentWillReceiveProps(nextProps){if(this._overlayTarget&&nextProps.container!==this.props.container){this._portalContainerNode.removeChild(this._overlayTarget);this._portalContainerNode=_utilsGetContainer2['default'](nextProps.container,_utilsOwnerDocument2['default'](this).body);this._portalContainerNode.appendChild(this._overlayTarget);}},componentWillUnmount:function componentWillUnmount(){this._unrenderOverlay();this._unmountOverlayTarget();},_mountOverlayTarget:function _mountOverlayTarget(){if(!this._overlayTarget){this._overlayTarget=document.createElement('div');this._portalContainerNode=_utilsGetContainer2['default'](this.props.container,_utilsOwnerDocument2['default'](this).body);this._portalContainerNode.appendChild(this._overlayTarget);}},_unmountOverlayTarget:function _unmountOverlayTarget(){if(this._overlayTarget){this._portalContainerNode.removeChild(this._overlayTarget);this._overlayTarget=null;}this._portalContainerNode=null;},_renderOverlay:function _renderOverlay(){var overlay=!this.props.children?null:_react2['default'].Children.only(this.props.children); // Save reference for future access.
	if(overlay!==null){this._mountOverlayTarget();this._overlayInstance=_reactDom2['default'].unstable_renderSubtreeIntoContainer(this,overlay,this._overlayTarget);}else { // Unrender if the component is null for transitions to null
	this._unrenderOverlay();this._unmountOverlayTarget();}},_unrenderOverlay:function _unrenderOverlay(){if(this._overlayTarget){_reactDom2['default'].unmountComponentAtNode(this._overlayTarget);this._overlayInstance=null;}},render:function render(){return null;},getMountNode:function getMountNode(){return this._overlayTarget;},getOverlayDOMNode:function getOverlayDOMNode(){if(!this.isMounted()){throw new Error('getOverlayDOMNode(): A component must be mounted to have a DOM node.');}if(this._overlayInstance){if(this._overlayInstance.getWrappedDOMNode){return this._overlayInstance.getWrappedDOMNode();}else {return _reactDom2['default'].findDOMNode(this._overlayInstance);}}return null;}});exports['default']=Portal;module.exports=exports['default']; /***/}, /* 51 */ /***/function(module,exports,__webpack_require__){'use strict';exports.__esModule=true;function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var _reactDom=__webpack_require__(3);var _reactDom2=_interopRequireDefault(_reactDom);var _domHelpersOwnerDocument=__webpack_require__(52);var _domHelpersOwnerDocument2=_interopRequireDefault(_domHelpersOwnerDocument);exports['default']=function(componentOrElement){return _domHelpersOwnerDocument2['default'](_reactDom2['default'].findDOMNode(componentOrElement));};module.exports=exports['default']; /***/}, /* 52 */ /***/function(module,exports){"use strict";exports.__esModule=true;exports["default"]=ownerDocument;function ownerDocument(node){return node&&node.ownerDocument||document;}module.exports=exports["default"]; /***/}, /* 53 */ /***/function(module,exports,__webpack_require__){'use strict';exports.__esModule=true;exports['default']=getContainer;function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var _reactDom=__webpack_require__(3);var _reactDom2=_interopRequireDefault(_reactDom);function getContainer(container,defaultContainer){container=typeof container==='function'?container():container;return _reactDom2['default'].findDOMNode(container)||defaultContainer;}module.exports=exports['default']; /***/}, /* 54 */ /***/function(module,exports,__webpack_require__){'use strict';exports.__esModule=true;function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}var _domHelpersStyle=__webpack_require__(55);var _domHelpersStyle2=_interopRequireDefault(_domHelpersStyle);var _domHelpersClass=__webpack_require__(63);var _domHelpersClass2=_interopRequireDefault(_domHelpersClass);var _domHelpersUtilScrollbarSize=__webpack_require__(67);var _domHelpersUtilScrollbarSize2=_interopRequireDefault(_domHelpersUtilScrollbarSize);var _utilsIsOverflowing=__webpack_require__(69);var _utilsIsOverflowing2=_interopRequireDefault(_utilsIsOverflowing);var _utilsManageAriaHidden=__webpack_require__(71);function findIndexOf(arr,cb){var idx=-1;arr.some(function(d,i){if(cb(d,i)){idx=i;return true;}});return idx;}function findContainer(data,modal){return findIndexOf(data,function(d){return d.modals.indexOf(modal)!==-1;});} /**
		 * Proper state managment for containers and the modals in those containers.
		 *
		 * @internal Used by the Modal to ensure proper styling of containers.
		 */var ModalManager=function(){function ModalManager(){var hideSiblingNodes=arguments.length<=0||arguments[0]===undefined?true:arguments[0];_classCallCheck(this,ModalManager);this.hideSiblingNodes=hideSiblingNodes;this.modals=[];this.containers=[];this.data=[];}ModalManager.prototype.add=function add(modal,container,className){var modalIdx=this.modals.indexOf(modal);var containerIdx=this.containers.indexOf(container);if(modalIdx!==-1){return modalIdx;}modalIdx=this.modals.length;this.modals.push(modal);if(this.hideSiblingNodes){_utilsManageAriaHidden.hideSiblings(container,modal.mountNode);}if(containerIdx!==-1){this.data[containerIdx].modals.push(modal);return modalIdx;}var data={modals:[modal], //right now only the first modal of a container will have its classes applied
	classes:className?className.split(/\s+/):[], //we are only interested in the actual `style` here becasue we will override it
	style:{overflow:container.style.overflow,paddingRight:container.style.paddingRight}};var style={overflow:'hidden'};data.overflowing=_utilsIsOverflowing2['default'](container);if(data.overflowing){ // use computed style, here to get the real padding
	// to add our scrollbar width
	style.paddingRight=parseInt(_domHelpersStyle2['default'](container,'paddingRight')||0,10)+_domHelpersUtilScrollbarSize2['default']()+'px';}_domHelpersStyle2['default'](container,style);data.classes.forEach(_domHelpersClass2['default'].addClass.bind(null,container));this.containers.push(container);this.data.push(data);return modalIdx;};ModalManager.prototype.remove=function remove(modal){var modalIdx=this.modals.indexOf(modal);if(modalIdx===-1){return;}var containerIdx=findContainer(this.data,modal);var data=this.data[containerIdx];var container=this.containers[containerIdx];data.modals.splice(data.modals.indexOf(modal),1);this.modals.splice(modalIdx,1); // if that was the last modal in a container,
	// clean up the container stylinhg.
	if(data.modals.length===0){Object.keys(data.style).forEach(function(key){return container.style[key]=data.style[key];});data.classes.forEach(_domHelpersClass2['default'].removeClass.bind(null,container));if(this.hideSiblingNodes){_utilsManageAriaHidden.showSiblings(container,modal.mountNode);}this.containers.splice(containerIdx,1);this.data.splice(containerIdx,1);}else if(this.hideSiblingNodes){ //otherwise make sure the next top modal is visible to a SR
	_utilsManageAriaHidden.ariaHidden(false,data.modals[data.modals.length-1].mountNode);}};ModalManager.prototype.isTopModal=function isTopModal(modal){return !!this.modals.length&&this.modals[this.modals.length-1]===modal;};return ModalManager;}();exports['default']=ModalManager;module.exports=exports['default']; /***/}, /* 55 */ /***/function(module,exports,__webpack_require__){'use strict';var camelize=__webpack_require__(56),hyphenate=__webpack_require__(58),_getComputedStyle=__webpack_require__(60),removeStyle=__webpack_require__(62);var has=Object.prototype.hasOwnProperty;module.exports=function style(node,property,value){var css='',props=property;if(typeof property==='string'){if(value===undefined)return node.style[camelize(property)]||_getComputedStyle(node).getPropertyValue(hyphenate(property));else (props={})[property]=value;}for(var key in props){if(has.call(props,key)){!props[key]&&props[key]!==0?removeStyle(node,hyphenate(key)):css+=hyphenate(key)+':'+props[key]+';';}}node.style.cssText+=';'+css;}; /***/}, /* 56 */ /***/function(module,exports,__webpack_require__){ /**
		 * Copyright 2014-2015, Facebook, Inc.
		 * All rights reserved.
		 * https://github.com/facebook/react/blob/2aeb8a2a6beb00617a4217f7f8284924fa2ad819/src/vendor/core/camelizeStyleName.js
		 */'use strict';var camelize=__webpack_require__(57);var msPattern=/^-ms-/;module.exports=function camelizeStyleName(string){return camelize(string.replace(msPattern,'ms-'));}; /***/}, /* 57 */ /***/function(module,exports){"use strict";var rHyphen=/-(.)/g;module.exports=function camelize(string){return string.replace(rHyphen,function(_,chr){return chr.toUpperCase();});}; /***/}, /* 58 */ /***/function(module,exports,__webpack_require__){ /**
		 * Copyright 2013-2014, Facebook, Inc.
		 * All rights reserved.
		 * https://github.com/facebook/react/blob/2aeb8a2a6beb00617a4217f7f8284924fa2ad819/src/vendor/core/hyphenateStyleName.js
		 */"use strict";var hyphenate=__webpack_require__(59);var msPattern=/^ms-/;module.exports=function hyphenateStyleName(string){return hyphenate(string).replace(msPattern,"-ms-");}; /***/}, /* 59 */ /***/function(module,exports){'use strict';var rUpper=/([A-Z])/g;module.exports=function hyphenate(string){return string.replace(rUpper,'-$1').toLowerCase();}; /***/}, /* 60 */ /***/function(module,exports,__webpack_require__){'use strict';var babelHelpers=__webpack_require__(61);var _utilCamelizeStyle=__webpack_require__(56);var _utilCamelizeStyle2=babelHelpers.interopRequireDefault(_utilCamelizeStyle);var rposition=/^(top|right|bottom|left)$/;var rnumnonpx=/^([+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|))(?!px)[a-z%]+$/i;module.exports=function _getComputedStyle(node){if(!node)throw new TypeError('No Element passed to `getComputedStyle()`');var doc=node.ownerDocument;return 'defaultView' in doc?doc.defaultView.opener?node.ownerDocument.defaultView.getComputedStyle(node,null):window.getComputedStyle(node,null):{ //ie 8 "magic" from: https://github.com/jquery/jquery/blob/1.11-stable/src/css/curCSS.js#L72
	getPropertyValue:function getPropertyValue(prop){var style=node.style;prop=(0,_utilCamelizeStyle2['default'])(prop);if(prop=='float')prop='styleFloat';var current=node.currentStyle[prop]||null;if(current==null&&style&&style[prop])current=style[prop];if(rnumnonpx.test(current)&&!rposition.test(prop)){ // Remember the original values
	var left=style.left;var runStyle=node.runtimeStyle;var rsLeft=runStyle&&runStyle.left; // Put in the new values to get a computed value out
	if(rsLeft)runStyle.left=node.currentStyle.left;style.left=prop==='fontSize'?'1em':current;current=style.pixelLeft+'px'; // Revert the changed values
	style.left=left;if(rsLeft)runStyle.left=rsLeft;}return current;}};}; /***/}, /* 61 */ /***/function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;(function(root,factory){if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__=[exports],__WEBPACK_AMD_DEFINE_FACTORY__=factory,__WEBPACK_AMD_DEFINE_RESULT__=typeof __WEBPACK_AMD_DEFINE_FACTORY__==='function'?__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__):__WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else if((typeof exports==='undefined'?'undefined':_typeof2(exports))==="object"){factory(exports);}else {factory(root.babelHelpers={});}})(this,function(global){var babelHelpers=global;babelHelpers.interopRequireDefault=function(obj){return obj&&obj.__esModule?obj:{"default":obj};};babelHelpers._extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};}); /***/}, /* 62 */ /***/function(module,exports){'use strict';module.exports=function removeStyle(node,key){return 'removeProperty' in node.style?node.style.removeProperty(key):node.style.removeAttribute(key);}; /***/}, /* 63 */ /***/function(module,exports,__webpack_require__){'use strict';module.exports={addClass:__webpack_require__(64),removeClass:__webpack_require__(66),hasClass:__webpack_require__(65)}; /***/}, /* 64 */ /***/function(module,exports,__webpack_require__){'use strict';var hasClass=__webpack_require__(65);module.exports=function addClass(element,className){if(element.classList)element.classList.add(className);else if(!hasClass(element))element.className=element.className+' '+className;}; /***/}, /* 65 */ /***/function(module,exports){'use strict';module.exports=function hasClass(element,className){if(element.classList)return !!className&&element.classList.contains(className);else return (' '+element.className+' ').indexOf(' '+className+' ')!==-1;}; /***/}, /* 66 */ /***/function(module,exports){'use strict';module.exports=function removeClass(element,className){if(element.classList)element.classList.remove(className);else element.className=element.className.replace(new RegExp('(^|\\s)'+className+'(?:\\s|$)','g'),'$1').replace(/\s+/g,' ').replace(/^\s*|\s*$/g,'');}; /***/}, /* 67 */ /***/function(module,exports,__webpack_require__){'use strict';var canUseDOM=__webpack_require__(68);var size;module.exports=function(recalc){if(!size||recalc){if(canUseDOM){var scrollDiv=document.createElement('div');scrollDiv.style.position='absolute';scrollDiv.style.top='-9999px';scrollDiv.style.width='50px';scrollDiv.style.height='50px';scrollDiv.style.overflow='scroll';document.body.appendChild(scrollDiv);size=scrollDiv.offsetWidth-scrollDiv.clientWidth;document.body.removeChild(scrollDiv);}}return size;}; /***/}, /* 68 */ /***/function(module,exports){'use strict';module.exports=!!(typeof window!=='undefined'&&window.document&&window.document.createElement); /***/}, /* 69 */ /***/function(module,exports,__webpack_require__){'use strict';exports.__esModule=true;exports['default']=isOverflowing;function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var _domHelpersQueryIsWindow=__webpack_require__(70);var _domHelpersQueryIsWindow2=_interopRequireDefault(_domHelpersQueryIsWindow);var _domHelpersOwnerDocument=__webpack_require__(52);var _domHelpersOwnerDocument2=_interopRequireDefault(_domHelpersOwnerDocument);function isBody(node){return node&&node.tagName.toLowerCase()==='body';}function bodyIsOverflowing(node){var doc=_domHelpersOwnerDocument2['default'](node);var win=_domHelpersQueryIsWindow2['default'](doc);var fullWidth=win.innerWidth; // Support: ie8, no innerWidth
	if(!fullWidth){var documentElementRect=doc.documentElement.getBoundingClientRect();fullWidth=documentElementRect.right-Math.abs(documentElementRect.left);}return doc.body.clientWidth<fullWidth;}function isOverflowing(container){var win=_domHelpersQueryIsWindow2['default'](container);return win||isBody(container)?bodyIsOverflowing(container):container.scrollHeight>container.clientHeight;}module.exports=exports['default']; /***/}, /* 70 */ /***/function(module,exports){'use strict';module.exports=function getWindow(node){return node===node.window?node:node.nodeType===9?node.defaultView||node.parentWindow:false;}; /***/}, /* 71 */ /***/function(module,exports){'use strict';exports.__esModule=true;exports.ariaHidden=ariaHidden;exports.hideSiblings=hideSiblings;exports.showSiblings=showSiblings;var BLACKLIST=['template','script','style'];var isHidable=function isHidable(_ref){var nodeType=_ref.nodeType;var tagName=_ref.tagName;return nodeType===1&&BLACKLIST.indexOf(tagName.toLowerCase())===-1;};var siblings=function siblings(container,mount,cb){mount=[].concat(mount);[].forEach.call(container.children,function(node){if(mount.indexOf(node)===-1&&isHidable(node)){cb(node);}});};function ariaHidden(show,node){if(!node){return;}if(show){node.setAttribute('aria-hidden','true');}else {node.removeAttribute('aria-hidden');}}function hideSiblings(container,mountNode){siblings(container,mountNode,function(node){return ariaHidden(true,node);});}function showSiblings(container,mountNode){siblings(container,mountNode,function(node){return ariaHidden(false,node);});} /***/}, /* 72 */ /***/function(module,exports,__webpack_require__){'use strict';exports.__esModule=true;function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var _domHelpersEventsOn=__webpack_require__(73);var _domHelpersEventsOn2=_interopRequireDefault(_domHelpersEventsOn);var _domHelpersEventsOff=__webpack_require__(74);var _domHelpersEventsOff2=_interopRequireDefault(_domHelpersEventsOff);exports['default']=function(node,event,handler){_domHelpersEventsOn2['default'](node,event,handler);return {remove:function remove(){_domHelpersEventsOff2['default'](node,event,handler);}};};module.exports=exports['default']; /***/}, /* 73 */ /***/function(module,exports,__webpack_require__){'use strict';var canUseDOM=__webpack_require__(68);var on=function on(){};if(canUseDOM){on=function(){if(document.addEventListener)return function(node,eventName,handler,capture){return node.addEventListener(eventName,handler,capture||false);};else if(document.attachEvent)return function(node,eventName,handler){return node.attachEvent('on'+eventName,handler);};}();}module.exports=on; /***/}, /* 74 */ /***/function(module,exports,__webpack_require__){'use strict';var canUseDOM=__webpack_require__(68);var off=function off(){};if(canUseDOM){off=function(){if(document.addEventListener)return function(node,eventName,handler,capture){return node.removeEventListener(eventName,handler,capture||false);};else if(document.attachEvent)return function(node,eventName,handler){return node.detachEvent('on'+eventName,handler);};}();}module.exports=off; /***/}, /* 75 */ /***/function(module,exports){ /**
		 * Firefox doesn't have a focusin event so using capture is easiest way to get bubbling
		 * IE8 can't do addEventListener, but does have onfocusin, so we use that in ie8
		 *
		 * We only allow one Listener at a time to avoid stack overflows
		 */'use strict';exports.__esModule=true;exports['default']=addFocusListener;function addFocusListener(handler){var useFocusin=!document.addEventListener;var remove=undefined;if(useFocusin){document.attachEvent('onfocusin',handler);remove=function remove(){return document.detachEvent('onfocusin',handler);};}else {document.addEventListener('focus',handler,true);remove=function remove(){return document.removeEventListener('focus',handler,true);};}return {remove:remove};}module.exports=exports['default']; /***/}, /* 76 */ /***/function(module,exports,__webpack_require__){'use strict';var babelHelpers=__webpack_require__(61);exports.__esModule=true; /**
		 * document.activeElement
		 */exports['default']=activeElement;var _ownerDocument=__webpack_require__(52);var _ownerDocument2=babelHelpers.interopRequireDefault(_ownerDocument);function activeElement(){var doc=arguments[0]===undefined?document:arguments[0];try{return doc.activeElement;}catch(e){}}module.exports=exports['default']; /***/}, /* 77 */ /***/function(module,exports,__webpack_require__){'use strict';var canUseDOM=__webpack_require__(68);var contains=function(){var root=canUseDOM&&document.documentElement;return root&&root.contains?function(context,node){return context.contains(node);}:root&&root.compareDocumentPosition?function(context,node){return context===node||!!(context.compareDocumentPosition(node)&16);}:function(context,node){if(node)do {if(node===context)return true;}while(node=node.parentNode);return false;};}();module.exports=contains; /***/}, /* 78 */ /***/function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _typeof=typeof Symbol==="function"&&_typeof2(Symbol.iterator)==="symbol"?function(obj){return typeof obj==='undefined'?'undefined':_typeof2(obj);}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol?"symbol":typeof obj==='undefined'?'undefined':_typeof2(obj);};exports['default']=function(identifier,configure){return function(Component){var displayName=Component.displayName||Component.name||"Component";(0,_invariant2['default'])(identifier&&(typeof identifier==="string"||(typeof identifier==="undefined"?"undefined":_typeof(identifier))==="symbol"||typeof identifier==="function"),"Expected identifier to be string, symbol or function. See %s",displayName);if(configure){(0,_invariant2['default'])(typeof configure==="function","Expected configure to be a function. See %s",displayName);}return _react2['default'].createClass({displayName:displayName+"ContextMenuLayer",getDefaultProps:function getDefaultProps(){return {renderTag:"div",attributes:{}};},handleContextClick:function handleContextClick(event){var currentItem=typeof configure==="function"?configure(this.props):{};(0,_invariant2['default'])((0,_lodash2['default'])(currentItem),"Expected configure to return an object. See %s",displayName);event.preventDefault();_store2['default'].dispatch({type:"SET_PARAMS",data:{x:event.clientX,y:event.clientY,currentItem:currentItem,isVisible:typeof identifier==="function"?identifier(this.props):identifier}});},render:function render(){var _props=this.props;var _props$attributes=_props.attributes;var _props$attributes$cla=_props$attributes.className;var className=_props$attributes$cla===undefined?"":_props$attributes$cla;var attributes=_objectWithoutProperties(_props$attributes,["className"]);var renderTag=_props.renderTag;var props=_objectWithoutProperties(_props,["attributes","renderTag"]);attributes.className="react-context-menu-wrapper "+className;attributes.onContextMenu=this.handleContextClick;return _react2['default'].createElement(renderTag,attributes,_react2['default'].createElement(Component,props));}});};};var _react=__webpack_require__(2);var _react2=_interopRequireDefault(_react);var _invariant=__webpack_require__(79);var _invariant2=_interopRequireDefault(_invariant);var _lodash=__webpack_require__(80);var _lodash2=_interopRequireDefault(_lodash);var _store=__webpack_require__(26);var _store2=_interopRequireDefault(_store);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}function _objectWithoutProperties(obj,keys){var target={};for(var i in obj){if(keys.indexOf(i)>=0)continue;if(!Object.prototype.hasOwnProperty.call(obj,i))continue;target[i]=obj[i];}return target;} /***/}, /* 79 */ /***/function(module,exports,__webpack_require__){ /* WEBPACK VAR INJECTION */(function(process){ /**
		 * Copyright 2013-2015, Facebook, Inc.
		 * All rights reserved.
		 *
		 * This source code is licensed under the BSD-style license found in the
		 * LICENSE file in the root directory of this source tree. An additional grant
		 * of patent rights can be found in the PATENTS file in the same directory.
		 */'use strict'; /**
		 * Use invariant() to assert state which your program assumes to be true.
		 *
		 * Provide sprintf-style format (only %s is supported) and arguments
		 * to provide information about what broke and what you were
		 * expecting.
		 *
		 * The invariant message will be stripped in production, but the invariant
		 * will remain to ensure logic does not differ in production.
		 */var invariant=function invariant(condition,format,a,b,c,d,e,f){if(process.env.NODE_ENV!=='production'){if(format===undefined){throw new Error('invariant requires an error message argument');}}if(!condition){var error;if(format===undefined){error=new Error('Minified exception occurred; use the non-minified dev environment '+'for the full error message and additional helpful warnings.');}else {var args=[a,b,c,d,e,f];var argIndex=0;error=new Error(format.replace(/%s/g,function(){return args[argIndex++];}));error.name='Invariant Violation';}error.framesToPop=1; // we don't care about invariant's own frame
	throw error;}};module.exports=invariant; /* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(28)); /***/}, /* 80 */ /***/function(module,exports){ /**
		 * lodash 3.0.2 (Custom Build) <https://lodash.com/>
		 * Build: `lodash modern modularize exports="npm" -o ./`
		 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
		 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
		 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
		 * Available under MIT license <https://lodash.com/license>
		 */ /**
		 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
		 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
		 *
		 * @static
		 * @memberOf _
		 * @category Lang
		 * @param {*} value The value to check.
		 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
		 * @example
		 *
		 * _.isObject({});
		 * // => true
		 *
		 * _.isObject([1, 2, 3]);
		 * // => true
		 *
		 * _.isObject(1);
		 * // => false
		 */function isObject(value){ // Avoid a V8 JIT bug in Chrome 19-20.
	// See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	var type=typeof value==='undefined'?'undefined':_typeof2(value);return !!value&&(type=='object'||type=='function');}module.exports=isObject; /***/}, /* 81 */ /***/function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _react=__webpack_require__(2);var _react2=_interopRequireDefault(_react);var _classnames=__webpack_require__(82);var _classnames2=_interopRequireDefault(_classnames);var _objectAssign=__webpack_require__(42);var _objectAssign2=_interopRequireDefault(_objectAssign);var _monitor=__webpack_require__(44);var _monitor2=_interopRequireDefault(_monitor);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}function _objectWithoutProperties(obj,keys){var target={};for(var i in obj){if(keys.indexOf(i)>=0)continue;if(!Object.prototype.hasOwnProperty.call(obj,i))continue;target[i]=obj[i];}return target;}var PropTypes=_react2['default'].PropTypes;var MenuItem=_react2['default'].createClass({displayName:"MenuItem",propTypes:{onClick:PropTypes.func.isRequired,data:PropTypes.object,disabled:PropTypes.bool,preventClose:PropTypes.bool},getDefaultProps:function getDefaultProps(){return {disabled:false,data:{},attributes:{}};},handleClick:function handleClick(event){var _props=this.props;var disabled=_props.disabled;var onClick=_props.onClick;var data=_props.data;var preventClose=_props.preventClose;event.preventDefault();if(disabled)return;(0,_objectAssign2['default'])(data,_monitor2['default'].getItem());if(typeof onClick==="function"){onClick(event,data);}if(preventClose)return;_monitor2['default'].hideMenu();},render:function render(){var _props2=this.props;var disabled=_props2.disabled;var children=_props2.children;var _props2$attributes=_props2.attributes;var _props2$attributes$cl=_props2$attributes.className;var className=_props2$attributes$cl===undefined?"":_props2$attributes$cl;var props=_objectWithoutProperties(_props2$attributes,["className"]);var menuItemClassNames="react-context-menu-item "+className;var classes=(0,_classnames2['default'])({"react-context-menu-link":true,disabled:disabled});return _react2['default'].createElement("div",_extends({className:menuItemClassNames},props),_react2['default'].createElement("a",{href:"#",className:classes,onClick:this.handleClick},children));}});exports['default']=MenuItem; /***/}, /* 82 */ /***/function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__; /*!
		  Copyright (c) 2016 Jed Watson.
		  Licensed under the MIT License (MIT), see
		  http://jedwatson.github.io/classnames
		*/ /* global define */(function(){'use strict';var hasOwn={}.hasOwnProperty;function classNames(){var classes=[];for(var i=0;i<arguments.length;i++){var arg=arguments[i];if(!arg)continue;var argType=typeof arg==='undefined'?'undefined':_typeof2(arg);if(argType==='string'||argType==='number'){classes.push(arg);}else if(Array.isArray(arg)){classes.push(classNames.apply(null,arg));}else if(argType==='object'){for(var key in arg){if(hasOwn.call(arg,key)&&arg[key]){classes.push(key);}}}}return classes.join(' ');}if(typeof module!=='undefined'&&module.exports){module.exports=classNames;}else if(true){ // register as 'classnames', consistent with npm package name
	!(__WEBPACK_AMD_DEFINE_ARRAY__=[],__WEBPACK_AMD_DEFINE_RESULT__=function(){return classNames;}.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__),__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else {window.classNames=classNames;}})(); /***/}, /* 83 */ /***/function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _react=__webpack_require__(2);var _react2=_interopRequireDefault(_react);var _classnames=__webpack_require__(82);var _classnames2=_interopRequireDefault(_classnames);var _wrapper=__webpack_require__(84);var _wrapper2=_interopRequireDefault(_wrapper);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var menuStyles={position:"relative",zIndex:"auto"};var SubMenu=_react2['default'].createClass({displayName:"SubMenu",propTypes:{title:_react2['default'].PropTypes.string.isRequired,disabled:_react2['default'].PropTypes.bool,hoverDelay:_react2['default'].PropTypes.number},getDefaultProps:function getDefaultProps(){return {hoverDelay:500};},getInitialState:function getInitialState(){return {visible:false};},shouldComponentUpdate:function shouldComponentUpdate(nextProps,nextState){return this.state.isVisible!==nextState.visible;},handleClick:function handleClick(e){e.preventDefault();},handleMouseEnter:function handleMouseEnter(){var _this=this;if(this.closetimer)clearTimeout(this.closetimer);if(this.props.disabled||this.state.visible)return;this.opentimer=setTimeout(function(){return _this.setState({visible:true});},this.props.hoverDelay);},handleMouseLeave:function handleMouseLeave(){var _this2=this;if(this.opentimer)clearTimeout(this.opentimer);if(!this.state.visible)return;this.closetimer=setTimeout(function(){return _this2.setState({visible:false});},this.props.hoverDelay);},render:function render(){var _this3=this;var _props=this.props;var disabled=_props.disabled;var children=_props.children;var title=_props.title;var visible=this.state.visible;var classes=(0,_classnames2['default'])({"react-context-menu-link":true,disabled:disabled,active:visible}),menuClasses="react-context-menu-item submenu";return _react2['default'].createElement("div",{ref:function ref(c){return _this3.item=c;},className:menuClasses,style:menuStyles,onMouseEnter:this.handleMouseEnter,onMouseLeave:this.handleMouseLeave},_react2['default'].createElement("a",{href:"#",className:classes,onClick:this.handleClick},title),_react2['default'].createElement(_wrapper2['default'],{visible:visible},children));}});exports['default']=SubMenu; /***/}, /* 84 */ /***/function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _react=__webpack_require__(2);var _react2=_interopRequireDefault(_react);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var SubMenuWrapper=_react2['default'].createClass({displayName:"SubMenuWrapper",propTypes:{visible:_react2['default'].PropTypes.bool},getInitialState:function getInitialState(){return {position:{top:true,right:true}};},componentWillReceiveProps:function componentWillReceiveProps(nextProps){var _this=this;if(nextProps.visible){var wrapper=window.requestAnimationFrame||setTimeout;wrapper(function(){_this.setState(_this.getMenuPosition());_this.forceUpdate();});}else {this.setState(this.getInitialState());}},shouldComponentUpdate:function shouldComponentUpdate(nextProps){return this.props.visible!==nextProps.visible;},getMenuPosition:function getMenuPosition(){var _window=window;var innerWidth=_window.innerWidth;var innerHeight=_window.innerHeight;var rect=this.menu.getBoundingClientRect();var position={};if(rect.bottom>innerHeight){position.bottom=true;}else {position.top=true;}if(rect.right>innerWidth){position.left=true;}else {position.right=true;}return {position:position};},getPositionStyles:function getPositionStyles(){var style={};var position=this.state.position;if(position.top)style.top=0;if(position.bottom)style.bottom=0;if(position.right)style.left="100%";if(position.left)style.right="100%";return style;},render:function render(){var _this2=this;var _props=this.props;var children=_props.children;var visible=_props.visible;var style=_extends({display:visible?"block":"none",position:"absolute"},this.getPositionStyles());return _react2['default'].createElement("nav",{ref:function ref(c){return _this2.menu=c;},style:style,className:"react-context-menu"},children);}});exports['default']=SubMenuWrapper; /***/}, /* 85 */ /***/function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};exports['default']=function(Component){var displayName=Component.displayName||Component.name||"Component";return _react2['default'].createClass({displayName:"ContextMenuConnector("+displayName+")",getInitialState:function getInitialState(){return {item:_store2['default'].getState().currentItem};},componentDidMount:function componentDidMount(){this.unsubscribe=_store2['default'].subscribe(this.handleUpdate);},componentWillUnmount:function componentWillUnmount(){this.unsubscribe();},handleUpdate:function handleUpdate(){this.setState(this.getInitialState());},render:function render(){return _react2['default'].createElement(Component,_extends({},this.props,{item:this.state.item}));}});};var _react=__webpack_require__(2);var _react2=_interopRequireDefault(_react);var _store=__webpack_require__(26);var _store2=_interopRequireDefault(_store);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};} /***/}, /* 86 */ /***/function(module,exports,__webpack_require__){'use strict';var _reactDom=__webpack_require__(3);var _reactDom2=_interopRequireDefault(_reactDom);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var ScrollShim={appendScrollShim:function appendScrollShim(){if(!this._scrollShim){var size=this._scrollShimSize();var shim=document.createElement('div');if(shim.classList){shim.classList.add('react-grid-ScrollShim'); // flow - not compatible with HTMLElement
	}else {shim.className+=' react-grid-ScrollShim';}shim.style.position='absolute';shim.style.top=0;shim.style.left=0;shim.style.width=size.width+'px';shim.style.height=size.height+'px';_reactDom2['default'].findDOMNode(this).appendChild(shim);this._scrollShim=shim;}this._scheduleRemoveScrollShim();},_scrollShimSize:function _scrollShimSize(){return {width:this.props.width,height:this.props.length*this.props.rowHeight};},_scheduleRemoveScrollShim:function _scheduleRemoveScrollShim(){if(this._scheduleRemoveScrollShimTimer){clearTimeout(this._scheduleRemoveScrollShimTimer);}this._scheduleRemoveScrollShimTimer=setTimeout(this._removeScrollShim,200);},_removeScrollShim:function _removeScrollShim(){if(this._scrollShim){this._scrollShim.parentNode.removeChild(this._scrollShim);this._scrollShim=undefined;}}};module.exports=ScrollShim; /***/}, /* 87 */ /***/function(module,exports,__webpack_require__){'use strict';var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var React=__webpack_require__(2);var joinClasses=__webpack_require__(6);var Cell=__webpack_require__(88);var ColumnMetrics=__webpack_require__(8);var ColumnUtilsMixin=__webpack_require__(10);var cellMetaDataShape=__webpack_require__(94);var PropTypes=React.PropTypes;var Row=React.createClass({displayName:'Row',propTypes:{height:PropTypes.number.isRequired,columns:PropTypes.oneOfType([PropTypes.object,PropTypes.array]).isRequired,row:PropTypes.any.isRequired,cellRenderer:PropTypes.func,cellMetaData:PropTypes.shape(cellMetaDataShape),isSelected:PropTypes.bool,idx:PropTypes.number.isRequired,key:PropTypes.string,expandedRows:PropTypes.arrayOf(PropTypes.object),extraClasses:PropTypes.string,forceUpdate:PropTypes.bool},mixins:[ColumnUtilsMixin],getDefaultProps:function getDefaultProps(){return {cellRenderer:Cell,isSelected:false,height:35};},shouldComponentUpdate:function shouldComponentUpdate(nextProps){return !ColumnMetrics.sameColumns(this.props.columns,nextProps.columns,ColumnMetrics.sameColumn)||this.doesRowContainSelectedCell(this.props)||this.doesRowContainSelectedCell(nextProps)||this.willRowBeDraggedOver(nextProps)||nextProps.row!==this.props.row||this.hasRowBeenCopied()||this.props.isSelected!==nextProps.isSelected||nextProps.height!==this.props.height||this.props.forceUpdate===true;},handleDragEnter:function handleDragEnter(){var handleDragEnterRow=this.props.cellMetaData.handleDragEnterRow;if(handleDragEnterRow){handleDragEnterRow(this.props.idx);}},getSelectedColumn:function getSelectedColumn(){if(this.props.cellMetaData){var selected=this.props.cellMetaData.selected;if(selected&&selected.idx){return this.getColumn(this.props.columns,selected.idx);}}},getCells:function getCells(){var _this=this;var cells=[];var lockedCells=[];var selectedColumn=this.getSelectedColumn();if(this.props.columns){this.props.columns.forEach(function(column,i){var CellRenderer=_this.props.cellRenderer;var cell=React.createElement(CellRenderer,{ref:i,key:column.key+'-'+i,idx:i,rowIdx:_this.props.idx,value:_this.getCellValue(column.key||i),column:column,height:_this.getRowHeight(),formatter:column.formatter,cellMetaData:_this.props.cellMetaData,rowData:_this.props.row,selectedColumn:selectedColumn,isRowSelected:_this.props.isSelected});if(column.locked){lockedCells.push(cell);}else {cells.push(cell);}});}return cells.concat(lockedCells);},getRowHeight:function getRowHeight(){var rows=this.props.expandedRows||null;if(rows&&this.props.key){var row=rows[this.props.key]||null;if(row){return row.height;}}return this.props.height;},getCellValue:function getCellValue(key){var val=void 0;if(key==='select-row'){return this.props.isSelected;}else if(typeof this.props.row.get==='function'){val=this.props.row.get(key);}else {val=this.props.row[key];}return val;},setScrollLeft:function setScrollLeft(scrollLeft){var _this2=this;this.props.columns.forEach(function(column,i){if(column.locked){if(!_this2.refs[i])return;_this2.refs[i].setScrollLeft(scrollLeft);}});},doesRowContainSelectedCell:function doesRowContainSelectedCell(props){var selected=props.cellMetaData.selected;if(selected&&selected.rowIdx===props.idx){return true;}return false;},isContextMenuDisplayed:function isContextMenuDisplayed(){if(this.props.cellMetaData){var selected=this.props.cellMetaData.selected;if(selected&&selected.contextMenuDisplayed&&selected.rowIdx===this.props.idx){return true;}}return false;},willRowBeDraggedOver:function willRowBeDraggedOver(props){var dragged=props.cellMetaData.dragged;return dragged!=null&&(dragged.rowIdx>=0||dragged.complete===true);},hasRowBeenCopied:function hasRowBeenCopied(){var copied=this.props.cellMetaData.copied;return copied!=null&&copied.rowIdx===this.props.idx;},renderCell:function renderCell(props){if(typeof this.props.cellRenderer==='function'){this.props.cellRenderer.call(this,props);}if(React.isValidElement(this.props.cellRenderer)){return React.cloneElement(this.props.cellRenderer,props);}return this.props.cellRenderer(props);},render:function render(){var className=joinClasses('react-grid-Row','react-grid-Row--'+(this.props.idx%2===0?'even':'odd'),{'row-selected':this.props.isSelected,'row-context-menu':this.isContextMenuDisplayed()},this.props.extraClasses);var style={height:this.getRowHeight(this.props),overflow:'hidden'};var cells=this.getCells();return React.createElement('div',_extends({},this.props,{className:className,style:style,onDragEnter:this.handleDragEnter}),React.isValidElement(this.props.row)?this.props.row:cells);}});module.exports=Row; /***/}, /* 88 */ /***/function(module,exports,__webpack_require__){'use strict';var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var React=__webpack_require__(2);var ReactDOM=__webpack_require__(3);var joinClasses=__webpack_require__(6);var EditorContainer=__webpack_require__(89);var ExcelColumn=__webpack_require__(15);var isFunction=__webpack_require__(93);var CellMetaDataShape=__webpack_require__(94);var SimpleCellFormatter=__webpack_require__(95);var ColumnUtils=__webpack_require__(10);var Cell=React.createClass({displayName:'Cell',propTypes:{rowIdx:React.PropTypes.number.isRequired,idx:React.PropTypes.number.isRequired,selected:React.PropTypes.shape({idx:React.PropTypes.number.isRequired}),selectedColumn:React.PropTypes.object,height:React.PropTypes.number,tabIndex:React.PropTypes.number,ref:React.PropTypes.string,column:React.PropTypes.shape(ExcelColumn).isRequired,value:React.PropTypes.oneOfType([React.PropTypes.string,React.PropTypes.number,React.PropTypes.object,React.PropTypes.bool]).isRequired,isExpanded:React.PropTypes.bool,isRowSelected:React.PropTypes.bool,cellMetaData:React.PropTypes.shape(CellMetaDataShape).isRequired,handleDragStart:React.PropTypes.func,className:React.PropTypes.string,cellControls:React.PropTypes.any,rowData:React.PropTypes.object.isRequired,forceUpdate:React.PropTypes.bool},getDefaultProps:function getDefaultProps(){return {tabIndex:-1,ref:'cell',isExpanded:false};},getInitialState:function getInitialState(){return {isCellValueChanging:false,oldRowData:{},newRowData:{}};},componentDidMount:function componentDidMount(){this.checkFocus();},componentWillReceiveProps:function componentWillReceiveProps(nextProps){this.setState({isCellValueChanging:this.props.value!==nextProps.value,oldRowData:this.props.rowData,newRowData:nextProps.rowData});},componentDidUpdate:function componentDidUpdate(){this.checkFocus();var dragged=this.props.cellMetaData.dragged;if(dragged&&dragged.complete===true){this.props.cellMetaData.handleTerminateDrag();}if(this.state.isCellValueChanging&&this.props.selectedColumn!=null){this.applyUpdateClass();}},shouldComponentUpdate:function shouldComponentUpdate(nextProps){return this.props.column.width!==nextProps.column.width||this.props.column.left!==nextProps.column.left||this.props.height!==nextProps.height||this.props.rowIdx!==nextProps.rowIdx||this.isCellSelectionChanging(nextProps)||this.isDraggedCellChanging(nextProps)||this.isCopyCellChanging(nextProps)||this.props.isRowSelected!==nextProps.isRowSelected||this.isSelected()||this.props.value!==nextProps.value||this.props.forceUpdate===true;},onCellClick:function onCellClick(e){var meta=this.props.cellMetaData;if(meta!=null&&meta.onCellClick&&typeof meta.onCellClick==='function'){meta.onCellClick({rowIdx:this.props.rowIdx,idx:this.props.idx},e);}},onCellContextMenu:function onCellContextMenu(){var meta=this.props.cellMetaData;if(meta!=null&&meta.onCellContextMenu&&typeof meta.onCellContextMenu==='function'){meta.onCellContextMenu({rowIdx:this.props.rowIdx,idx:this.props.idx});}},onCellDoubleClick:function onCellDoubleClick(e){var meta=this.props.cellMetaData;if(meta!=null&&meta.onCellDoubleClick&&typeof meta.onCellDoubleClick==='function'){meta.onCellDoubleClick({rowIdx:this.props.rowIdx,idx:this.props.idx},e);}},onDragHandleDoubleClick:function onDragHandleDoubleClick(e){e.stopPropagation();var meta=this.props.cellMetaData;if(meta!=null&&meta.onDragHandleDoubleClick&&typeof meta.onDragHandleDoubleClick==='function'){meta.onDragHandleDoubleClick({rowIdx:this.props.rowIdx,idx:this.props.idx,rowData:this.getRowData(),e:e});}},onDragOver:function onDragOver(e){e.preventDefault();},getStyle:function getStyle(){var style={position:'absolute',width:this.props.column.width,height:this.props.height,left:this.props.column.left};return style;},getFormatter:function getFormatter(){var col=this.props.column;if(this.isActive()){return React.createElement(EditorContainer,{rowData:this.getRowData(),rowIdx:this.props.rowIdx,idx:this.props.idx,cellMetaData:this.props.cellMetaData,column:col,height:this.props.height});}return this.props.column.formatter;},getRowData:function getRowData(){return this.props.rowData.toJSON?this.props.rowData.toJSON():this.props.rowData;},getFormatterDependencies:function getFormatterDependencies(){ // convention based method to get corresponding Id or Name of any Name or Id property
	if(typeof this.props.column.getRowMetaData==='function'){return this.props.column.getRowMetaData(this.getRowData(),this.props.column);}},getCellClass:function getCellClass(){var className=joinClasses(this.props.column.cellClass,'react-grid-Cell',this.props.className,this.props.column.locked?'react-grid-Cell--locked':null);var extraClasses=joinClasses({'row-selected':this.props.isRowSelected,selected:this.isSelected()&&!this.isActive()&&this.isCellSelectEnabled(),editing:this.isActive(),copied:this.isCopied()||this.wasDraggedOver()||this.isDraggedOverUpwards()||this.isDraggedOverDownwards(),'active-drag-cell':this.isSelected()||this.isDraggedOver(),'is-dragged-over-up':this.isDraggedOverUpwards(),'is-dragged-over-down':this.isDraggedOverDownwards(),'was-dragged-over':this.wasDraggedOver()});return joinClasses(className,extraClasses);},getUpdateCellClass:function getUpdateCellClass(){return this.props.column.getUpdateCellClass?this.props.column.getUpdateCellClass(this.props.selectedColumn,this.props.column,this.state.isCellValueChanging,this.state.oldRowData,this.state.newRowData):'';},isColumnSelected:function isColumnSelected(){var meta=this.props.cellMetaData;if(meta==null){return false;}return meta.selected&&meta.selected.idx===this.props.idx;},isSelected:function isSelected(){var meta=this.props.cellMetaData;if(meta==null){return false;}return meta.selected&&meta.selected.rowIdx===this.props.rowIdx&&meta.selected.idx===this.props.idx;},isActive:function isActive(){var meta=this.props.cellMetaData;if(meta==null){return false;}return this.isSelected()&&meta.selected.active===true;},isCellSelectionChanging:function isCellSelectionChanging(nextProps){var meta=this.props.cellMetaData;if(meta==null){return false;}var nextSelected=nextProps.cellMetaData.selected;if(meta.selected&&nextSelected){return this.props.idx===nextSelected.idx||this.props.idx===meta.selected.idx;}return true;},isCellSelectEnabled:function isCellSelectEnabled(){var meta=this.props.cellMetaData;if(meta==null){return false;}return meta.enableCellSelect;},applyUpdateClass:function applyUpdateClass(){var updateCellClass=this.getUpdateCellClass(); // -> removing the class
	if(updateCellClass!=null&&updateCellClass!==''){var cellDOMNode=ReactDOM.findDOMNode(this);if(cellDOMNode.classList){cellDOMNode.classList.remove(updateCellClass); // -> and re-adding the class
	cellDOMNode.classList.add(updateCellClass);}else if(cellDOMNode.className.indexOf(updateCellClass)===-1){ // IE9 doesn't support classList, nor (I think) altering element.className
	// without replacing it wholesale.
	cellDOMNode.className=cellDOMNode.className+' '+updateCellClass;}}},setScrollLeft:function setScrollLeft(scrollLeft){var ctrl=this; // flow on windows has an outdated react declaration, once that gets updated, we can remove this
	if(ctrl.isMounted()){var node=ReactDOM.findDOMNode(this);var transform='translate3d('+scrollLeft+'px, 0px, 0px)';node.style.webkitTransform=transform;node.style.transform=transform;}},isCopied:function isCopied(){var copied=this.props.cellMetaData.copied;return copied&&copied.rowIdx===this.props.rowIdx&&copied.idx===this.props.idx;},isDraggedOver:function isDraggedOver(){var dragged=this.props.cellMetaData.dragged;return dragged&&dragged.overRowIdx===this.props.rowIdx&&dragged.idx===this.props.idx;},wasDraggedOver:function wasDraggedOver(){var dragged=this.props.cellMetaData.dragged;return dragged&&(dragged.overRowIdx<this.props.rowIdx&&this.props.rowIdx<dragged.rowIdx||dragged.overRowIdx>this.props.rowIdx&&this.props.rowIdx>dragged.rowIdx)&&dragged.idx===this.props.idx;},isDraggedCellChanging:function isDraggedCellChanging(nextProps){var isChanging=void 0;var dragged=this.props.cellMetaData.dragged;var nextDragged=nextProps.cellMetaData.dragged;if(dragged){isChanging=nextDragged&&this.props.idx===nextDragged.idx||dragged&&this.props.idx===dragged.idx;return isChanging;}return false;},isCopyCellChanging:function isCopyCellChanging(nextProps){var isChanging=void 0;var copied=this.props.cellMetaData.copied;var nextCopied=nextProps.cellMetaData.copied;if(copied){isChanging=nextCopied&&this.props.idx===nextCopied.idx||copied&&this.props.idx===copied.idx;return isChanging;}return false;},isDraggedOverUpwards:function isDraggedOverUpwards(){var dragged=this.props.cellMetaData.dragged;return !this.isSelected()&&this.isDraggedOver()&&this.props.rowIdx<dragged.rowIdx;},isDraggedOverDownwards:function isDraggedOverDownwards(){var dragged=this.props.cellMetaData.dragged;return !this.isSelected()&&this.isDraggedOver()&&this.props.rowIdx>dragged.rowIdx;},checkFocus:function checkFocus(){if(this.isSelected()&&!this.isActive()){ // determine the parent viewport element of this cell
	var parentViewport=ReactDOM.findDOMNode(this);while(parentViewport!=null&&parentViewport.className.indexOf('react-grid-Viewport')===-1){parentViewport=parentViewport.parentElement;}var focusInGrid=false; // if the focus is on the body of the document, the user won't mind if we focus them on a cell
	if(document.activeElement==null||document.activeElement.nodeName&&typeof document.activeElement.nodeName==='string'&&document.activeElement.nodeName.toLowerCase()==='body'){focusInGrid=true; // otherwise
	}else { // only pull focus if the currently focused element is contained within the viewport
	if(parentViewport){var focusedParent=document.activeElement;while(focusedParent!=null){if(focusedParent===parentViewport){focusInGrid=true;break;}focusedParent=focusedParent.parentElement;}}}if(focusInGrid){ReactDOM.findDOMNode(this).focus();}}},createColumEventCallBack:function createColumEventCallBack(onColumnEvent,info){return function(e){onColumnEvent(e,info);};},createCellEventCallBack:function createCellEventCallBack(gridEvent,columnEvent){return function(e){gridEvent(e);columnEvent(e);};},createEventDTO:function createEventDTO(gridEvents,columnEvents,onColumnEvent){var allEvents=Object.assign({},gridEvents);for(var eventKey in columnEvents){if(columnEvents.hasOwnProperty(eventKey)){var event=columnEvents[event];var eventInfo={rowIdx:this.props.rowIdx,idx:this.props.idx,name:eventKey};var eventCallback=this.createColumEventCallBack(onColumnEvent,eventInfo);if(allEvents.hasOwnProperty(eventKey)){var currentEvent=allEvents[eventKey];allEvents[eventKey]=this.createCellEventCallBack(currentEvent,eventCallback);}else {allEvents[eventKey]=eventCallback;}}}return allEvents;},getEvents:function getEvents(){var columnEvents=this.props.column?Object.assign({},this.props.column.events):undefined;var onColumnEvent=this.props.cellMetaData?this.props.cellMetaData.onColumnEvent:undefined;var gridEvents={onClick:this.onCellClick,onDoubleClick:this.onCellDoubleClick,onDragOver:this.onDragOver};if(!columnEvents||!onColumnEvent){return gridEvents;}return this.createEventDTO(gridEvents,columnEvents,onColumnEvent);},renderCellContent:function renderCellContent(props){var CellContent=void 0;var Formatter=this.getFormatter();if(React.isValidElement(Formatter)){props.dependentValues=this.getFormatterDependencies();CellContent=React.cloneElement(Formatter,props);}else if(isFunction(Formatter)){CellContent=React.createElement(Formatter,{value:this.props.value,dependentValues:this.getFormatterDependencies()});}else {CellContent=React.createElement(SimpleCellFormatter,{value:this.props.value});}return React.createElement('div',{ref:'cell',className:'react-grid-Cell__value'},CellContent,' ',this.props.cellControls);},render:function render(){var style=this.getStyle();var className=this.getCellClass();var cellContent=this.renderCellContent({value:this.props.value,column:this.props.column,rowIdx:this.props.rowIdx,isExpanded:this.props.isExpanded});var dragHandle=!this.isActive()&&ColumnUtils.canEdit(this.props.column,this.props.rowData,this.props.cellMetaData.enableCellSelect)?React.createElement('div',{className:'drag-handle',draggable:'true',onDoubleClick:this.onDragHandleDoubleClick},React.createElement('span',{style:{display:'none'}})):null;var events=this.getEvents();return React.createElement('div',_extends({},this.props,{className:className,style:style,onContextMenu:this.onCellContextMenu},events),cellContent,dragHandle);}});module.exports=Cell; /***/}, /* 89 */ /***/function(module,exports,__webpack_require__){'use strict';var React=__webpack_require__(2);var joinClasses=__webpack_require__(6);var keyboardHandlerMixin=__webpack_require__(90);var SimpleTextEditor=__webpack_require__(91);var isFunction=__webpack_require__(93);var EditorContainer=React.createClass({displayName:'EditorContainer',mixins:[keyboardHandlerMixin],propTypes:{rowIdx:React.PropTypes.number,rowData:React.PropTypes.object.isRequired,value:React.PropTypes.oneOfType([React.PropTypes.string,React.PropTypes.number,React.PropTypes.object,React.PropTypes.bool]).isRequired,cellMetaData:React.PropTypes.shape({selected:React.PropTypes.object.isRequired,copied:React.PropTypes.object,dragged:React.PropTypes.object,onCellClick:React.PropTypes.func,onCellDoubleClick:React.PropTypes.func,onCommitCancel:React.PropTypes.func,onCommit:React.PropTypes.func}).isRequired,column:React.PropTypes.object.isRequired,height:React.PropTypes.number.isRequired},changeCommitted:false,getInitialState:function getInitialState(){return {isInvalid:false};},componentDidMount:function componentDidMount(){var inputNode=this.getInputNode();if(inputNode!==undefined){this.setTextInputFocus();if(!this.getEditor().disableContainerStyles){inputNode.className+=' editor-main';inputNode.style.height=this.props.height-1+'px';}}},componentWillUnmount:function componentWillUnmount(){if(!this.changeCommitted&&!this.hasEscapeBeenPressed()){this.commit({key:'Enter'});}},createEditor:function createEditor(){var _this=this;var editorRef=function editorRef(c){return _this.editor=c;};var editorProps={ref:editorRef,column:this.props.column,value:this.getInitialValue(),onCommit:this.commit,rowMetaData:this.getRowMetaData(),height:this.props.height,onBlur:this.commit,onOverrideKeyDown:this.onKeyDown};var customEditor=this.props.column.editor;if(customEditor&&React.isValidElement(customEditor)){ // return custom column editor or SimpleEditor if none specified
	return React.cloneElement(customEditor,editorProps);}return React.createElement(SimpleTextEditor,{ref:editorRef,column:this.props.column,value:this.getInitialValue(),onBlur:this.commit,rowMetaData:this.getRowMetaData(),onKeyDown:function onKeyDown(){},commit:function commit(){}});},onPressEnter:function onPressEnter(){this.commit({key:'Enter'});},onPressTab:function onPressTab(){this.commit({key:'Tab'});},onPressEscape:function onPressEscape(e){if(!this.editorIsSelectOpen()){this.props.cellMetaData.onCommitCancel();}else { // prevent event from bubbling if editor has results to select
	e.stopPropagation();}},onPressArrowDown:function onPressArrowDown(e){if(this.editorHasResults()){ // dont want to propogate as that then moves us round the grid
	e.stopPropagation();}else {this.commit(e);}},onPressArrowUp:function onPressArrowUp(e){if(this.editorHasResults()){ // dont want to propogate as that then moves us round the grid
	e.stopPropagation();}else {this.commit(e);}},onPressArrowLeft:function onPressArrowLeft(e){ // prevent event propogation. this disables left cell navigation
	if(!this.isCaretAtBeginningOfInput()){e.stopPropagation();}else {this.commit(e);}},onPressArrowRight:function onPressArrowRight(e){ // prevent event propogation. this disables right cell navigation
	if(!this.isCaretAtEndOfInput()){e.stopPropagation();}else {this.commit(e);}},editorHasResults:function editorHasResults(){if(isFunction(this.getEditor().hasResults)){return this.getEditor().hasResults();}return false;},editorIsSelectOpen:function editorIsSelectOpen(){if(isFunction(this.getEditor().isSelectOpen)){return this.getEditor().isSelectOpen();}return false;},getRowMetaData:function getRowMetaData(){ // clone row data so editor cannot actually change this
	// convention based method to get corresponding Id or Name of any Name or Id property
	if(typeof this.props.column.getRowMetaData==='function'){return this.props.column.getRowMetaData(this.props.rowData,this.props.column);}},getEditor:function getEditor(){return this.editor;},getInputNode:function getInputNode(){return this.getEditor().getInputNode();},getInitialValue:function getInitialValue(){var selected=this.props.cellMetaData.selected;var keyCode=selected.initialKeyCode;if(keyCode==='Delete'||keyCode==='Backspace'){return '';}else if(keyCode==='Enter'){return this.props.value;}var text=keyCode?String.fromCharCode(keyCode):this.props.value;return text;},getContainerClass:function getContainerClass(){return joinClasses({'has-error':this.state.isInvalid===true});},commit:function commit(args){var opts=args||{};var updated=this.getEditor().getValue();if(this.isNewValueValid(updated)){this.changeCommitted=true;var cellKey=this.props.column.key;this.props.cellMetaData.onCommit({cellKey:cellKey,rowIdx:this.props.rowIdx,updated:updated,key:opts.key});}},isNewValueValid:function isNewValueValid(value){if(isFunction(this.getEditor().validate)){var isValid=this.getEditor().validate(value);this.setState({isInvalid:!isValid});return isValid;}return true;},setCaretAtEndOfInput:function setCaretAtEndOfInput(){var input=this.getInputNode(); // taken from http://stackoverflow.com/questions/511088/use-javascript-to-place-cursor-at-end-of-text-in-text-input-element
	var txtLength=input.value.length;if(input.setSelectionRange){input.setSelectionRange(txtLength,txtLength);}else if(input.createTextRange){var fieldRange=input.createTextRange();fieldRange.moveStart('character',txtLength);fieldRange.collapse();fieldRange.select();}},isCaretAtBeginningOfInput:function isCaretAtBeginningOfInput(){var inputNode=this.getInputNode();return inputNode.selectionStart===inputNode.selectionEnd&&inputNode.selectionStart===0;},isCaretAtEndOfInput:function isCaretAtEndOfInput(){var inputNode=this.getInputNode();return inputNode.selectionStart===inputNode.value.length;},setTextInputFocus:function setTextInputFocus(){var selected=this.props.cellMetaData.selected;var keyCode=selected.initialKeyCode;var inputNode=this.getInputNode();inputNode.focus();if(inputNode.tagName==='INPUT'){if(!this.isKeyPrintable(keyCode)){inputNode.focus();inputNode.select();}else {inputNode.select();}}},hasEscapeBeenPressed:function hasEscapeBeenPressed(){var pressed=false;var escapeKey=27;if(window.event){if(window.event.keyCode===escapeKey){pressed=true;}else if(window.event.which===escapeKey){pressed=true;}}return pressed;},renderStatusIcon:function renderStatusIcon(){if(this.state.isInvalid===true){return React.createElement('span',{className:'glyphicon glyphicon-remove form-control-feedback'});}},render:function render(){return React.createElement('div',{className:this.getContainerClass(),onKeyDown:this.onKeyDown,commit:this.commit},this.createEditor(),this.renderStatusIcon());}});module.exports=EditorContainer; /***/}, /* 90 */ /***/function(module,exports){'use strict';var KeyboardHandlerMixin={onKeyDown:function onKeyDown(e){if(this.isCtrlKeyHeldDown(e)){this.checkAndCall('onPressKeyWithCtrl',e);}else if(this.isKeyExplicitlyHandled(e.key)){ // break up individual keyPress events to have their own specific callbacks
	// this allows multiple mixins to listen to onKeyDown events and somewhat reduces methodName clashing
	var callBack='onPress'+e.key;this.checkAndCall(callBack,e);}else if(this.isKeyPrintable(e.keyCode)){this.checkAndCall('onPressChar',e);}}, // taken from http://stackoverflow.com/questions/12467240/determine-if-javascript-e-keycode-is-a-printable-non-control-character
	isKeyPrintable:function isKeyPrintable(keycode){var valid=keycode>47&&keycode<58|| // number keys
	keycode===32||keycode===13|| // spacebar & return key(s) (if you want to allow carriage returns)
	keycode>64&&keycode<91|| // letter keys
	keycode>95&&keycode<112|| // numpad keys
	keycode>185&&keycode<193|| // ;=,-./` (in order)
	keycode>218&&keycode<223; // [\]' (in order)
	return valid;},isKeyExplicitlyHandled:function isKeyExplicitlyHandled(key){return typeof this['onPress'+key]==='function';},isCtrlKeyHeldDown:function isCtrlKeyHeldDown(e){return e.ctrlKey===true&&e.key!=='Control';},checkAndCall:function checkAndCall(methodName,args){if(typeof this[methodName]==='function'){this[methodName](args);}}};module.exports=KeyboardHandlerMixin; /***/}, /* 91 */ /***/function(module,exports,__webpack_require__){'use strict';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==='undefined'?'undefined':_typeof2(call))==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+(typeof superClass==='undefined'?'undefined':_typeof2(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var React=__webpack_require__(2);var EditorBase=__webpack_require__(92);var SimpleTextEditor=function(_EditorBase){_inherits(SimpleTextEditor,_EditorBase);function SimpleTextEditor(){_classCallCheck(this,SimpleTextEditor);return _possibleConstructorReturn(this,Object.getPrototypeOf(SimpleTextEditor).apply(this,arguments));}_createClass(SimpleTextEditor,[{key:'render',value:function render(){return React.createElement('input',{ref:'input',type:'text',onBlur:this.props.onBlur,className:'form-control',defaultValue:this.props.value});}}]);return SimpleTextEditor;}(EditorBase);module.exports=SimpleTextEditor; /***/}, /* 92 */ /***/function(module,exports,__webpack_require__){'use strict';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==='undefined'?'undefined':_typeof2(call))==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+(typeof superClass==='undefined'?'undefined':_typeof2(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var React=__webpack_require__(2);var ReactDOM=__webpack_require__(3);var ExcelColumn=__webpack_require__(15);var EditorBase=function(_React$Component){_inherits(EditorBase,_React$Component);function EditorBase(){_classCallCheck(this,EditorBase);return _possibleConstructorReturn(this,Object.getPrototypeOf(EditorBase).apply(this,arguments));}_createClass(EditorBase,[{key:'getStyle',value:function getStyle(){return {width:'100%'};}},{key:'getValue',value:function getValue(){var updated={};updated[this.props.column.key]=this.getInputNode().value;return updated;}},{key:'getInputNode',value:function getInputNode(){var domNode=ReactDOM.findDOMNode(this);if(domNode.tagName==='INPUT'){return domNode;}return domNode.querySelector('input:not([type=hidden])');}},{key:'inheritContainerStyles',value:function inheritContainerStyles(){return true;}}]);return EditorBase;}(React.Component);EditorBase.propTypes={onKeyDown:React.PropTypes.func.isRequired,value:React.PropTypes.any.isRequired,onBlur:React.PropTypes.func.isRequired,column:React.PropTypes.shape(ExcelColumn).isRequired,commit:React.PropTypes.func.isRequired};module.exports=EditorBase; /***/}, /* 93 */ /***/function(module,exports){'use strict';var isFunction=function isFunction(functionToCheck){var getType={};return functionToCheck&&getType.toString.call(functionToCheck)==='[object Function]';};module.exports=isFunction; /***/}, /* 94 */ /***/function(module,exports,__webpack_require__){'use strict';var PropTypes=__webpack_require__(2).PropTypes;module.exports={selected:PropTypes.object.isRequired,copied:PropTypes.object,dragged:PropTypes.object,onCellClick:PropTypes.func.isRequired,onCellDoubleClick:PropTypes.func.isRequired,onCommit:PropTypes.func.isRequired,onCommitCancel:PropTypes.func.isRequired,handleDragEnterRow:PropTypes.func.isRequired,handleTerminateDrag:PropTypes.func.isRequired}; /***/}, /* 95 */ /***/function(module,exports,__webpack_require__){'use strict';var React=__webpack_require__(2);var SimpleCellFormatter=React.createClass({displayName:'SimpleCellFormatter',propTypes:{value:React.PropTypes.oneOfType([React.PropTypes.string,React.PropTypes.number,React.PropTypes.object,React.PropTypes.bool]).isRequired},shouldComponentUpdate:function shouldComponentUpdate(nextProps){return nextProps.value!==this.props.value;},render:function render(){return React.createElement('div',{title:this.props.value},this.props.value);}});module.exports=SimpleCellFormatter; /***/}, /* 96 */ /***/function(module,exports,__webpack_require__){'use strict';var React=__webpack_require__(2);var ReactDOM=__webpack_require__(3);var DOMMetrics=__webpack_require__(97);var min=Math.min;var max=Math.max;var floor=Math.floor;var ceil=Math.ceil;module.exports={mixins:[DOMMetrics.MetricsMixin],DOMMetrics:{viewportHeight:function viewportHeight(){return ReactDOM.findDOMNode(this).offsetHeight;}},propTypes:{rowHeight:React.PropTypes.number,rowsCount:React.PropTypes.number.isRequired},getDefaultProps:function getDefaultProps(){return {rowHeight:30};},getInitialState:function getInitialState(){return this.getGridState(this.props);},getGridState:function getGridState(props){var renderedRowsCount=ceil((props.minHeight-props.rowHeight)/props.rowHeight);var totalRowCount=min(renderedRowsCount*2,props.rowsCount);return {displayStart:0,displayEnd:totalRowCount,height:props.minHeight,scrollTop:0,scrollLeft:0};},updateScroll:function updateScroll(scrollTop,scrollLeft,height,rowHeight,length){var renderedRowsCount=ceil(height/rowHeight);var visibleStart=floor(scrollTop/rowHeight);var visibleEnd=min(visibleStart+renderedRowsCount,length);var displayStart=max(0,visibleStart-renderedRowsCount*2);var displayEnd=min(visibleStart+renderedRowsCount*2,length);var nextScrollState={visibleStart:visibleStart,visibleEnd:visibleEnd,displayStart:displayStart,displayEnd:displayEnd,height:height,scrollTop:scrollTop,scrollLeft:scrollLeft};this.setState(nextScrollState);},metricsUpdated:function metricsUpdated(){var height=this.DOMMetrics.viewportHeight();if(height){this.updateScroll(this.state.scrollTop,this.state.scrollLeft,height,this.props.rowHeight,this.props.rowsCount);}},componentWillReceiveProps:function componentWillReceiveProps(nextProps){if(this.props.rowHeight!==nextProps.rowHeight||this.props.minHeight!==nextProps.minHeight){this.setState(this.getGridState(nextProps));}else if(this.props.rowsCount!==nextProps.rowsCount){this.updateScroll(this.state.scrollTop,this.state.scrollLeft,this.state.height,nextProps.rowHeight,nextProps.rowsCount); // Added to fix the hiding of the bottom scrollbar when showing the filters.
	}else if(this.props.rowOffsetHeight!==nextProps.rowOffsetHeight){ // The value of height can be positive or negative and will be added to the current height to cater for changes in the header height (due to the filer)
	var _height=this.props.rowOffsetHeight-nextProps.rowOffsetHeight;this.updateScroll(this.state.scrollTop,this.state.scrollLeft,this.state.height+_height,nextProps.rowHeight,nextProps.rowsCount);}}}; /***/}, /* 97 */ /***/function(module,exports,__webpack_require__){'use strict';var React=__webpack_require__(2);var shallowCloneObject=__webpack_require__(7);var contextTypes={metricsComputator:React.PropTypes.object};var MetricsComputatorMixin={childContextTypes:contextTypes,getChildContext:function getChildContext(){return {metricsComputator:this};},getMetricImpl:function getMetricImpl(name){return this._DOMMetrics.metrics[name].value;},registerMetricsImpl:function registerMetricsImpl(component,metrics){var getters={};var s=this._DOMMetrics;for(var name in metrics){if(s.metrics[name]!==undefined){throw new Error('DOM metric '+name+' is already defined');}s.metrics[name]={component:component,computator:metrics[name].bind(component)};getters[name]=this.getMetricImpl.bind(null,name);}if(s.components.indexOf(component)===-1){s.components.push(component);}return getters;},unregisterMetricsFor:function unregisterMetricsFor(component){var s=this._DOMMetrics;var idx=s.components.indexOf(component);if(idx>-1){s.components.splice(idx,1);var name=void 0;var metricsToDelete={};for(name in s.metrics){if(s.metrics[name].component===component){metricsToDelete[name]=true;}}for(name in metricsToDelete){if(metricsToDelete.hasOwnProperty(name)){delete s.metrics[name];}}}},updateMetrics:function updateMetrics(){var s=this._DOMMetrics;var needUpdate=false;for(var name in s.metrics){if(!s.metrics.hasOwnProperty(name))continue;var newMetric=s.metrics[name].computator();if(newMetric!==s.metrics[name].value){needUpdate=true;}s.metrics[name].value=newMetric;}if(needUpdate){for(var i=0,len=s.components.length;i<len;i++){if(s.components[i].metricsUpdated){s.components[i].metricsUpdated();}}}},componentWillMount:function componentWillMount(){this._DOMMetrics={metrics:{},components:[]};},componentDidMount:function componentDidMount(){if(window.addEventListener){window.addEventListener('resize',this.updateMetrics);}else {window.attachEvent('resize',this.updateMetrics);}this.updateMetrics();},componentWillUnmount:function componentWillUnmount(){window.removeEventListener('resize',this.updateMetrics);}};var MetricsMixin={contextTypes:contextTypes,componentWillMount:function componentWillMount(){if(this.DOMMetrics){this._DOMMetricsDefs=shallowCloneObject(this.DOMMetrics);this.DOMMetrics={};for(var name in this._DOMMetricsDefs){if(!this._DOMMetricsDefs.hasOwnProperty(name))continue;this.DOMMetrics[name]=function(){};}}},componentDidMount:function componentDidMount(){if(this.DOMMetrics){this.DOMMetrics=this.registerMetrics(this._DOMMetricsDefs);}},componentWillUnmount:function componentWillUnmount(){if(!this.registerMetricsImpl){return this.context.metricsComputator.unregisterMetricsFor(this);}if(this.hasOwnProperty('DOMMetrics')){delete this.DOMMetrics;}},registerMetrics:function registerMetrics(metrics){if(this.registerMetricsImpl){return this.registerMetricsImpl(this,metrics);}return this.context.metricsComputator.registerMetricsImpl(this,metrics);},getMetric:function getMetric(name){if(this.getMetricImpl){return this.getMetricImpl(name);}return this.context.metricsComputator.getMetricImpl(name);}};module.exports={MetricsComputatorMixin:MetricsComputatorMixin,MetricsMixin:MetricsMixin}; /***/}, /* 98 */ /***/function(module,exports){"use strict";module.exports={componentDidMount:function componentDidMount(){this._scrollLeft=this.refs.viewport?this.refs.viewport.getScroll().scrollLeft:0;this._onScroll();},componentDidUpdate:function componentDidUpdate(){this._onScroll();},componentWillMount:function componentWillMount(){this._scrollLeft=undefined;},componentWillUnmount:function componentWillUnmount(){this._scrollLeft=undefined;},onScroll:function onScroll(props){if(this._scrollLeft!==props.scrollLeft){this._scrollLeft=props.scrollLeft;this._onScroll();}},onHeaderScroll:function onHeaderScroll(e){var scrollLeft=e.target.scrollLeft;if(this._scrollLeft!==scrollLeft){this._scrollLeft=scrollLeft;this.refs.header.setScrollLeft(scrollLeft);var canvas=ReactDOM.findDOMNode(this.refs.viewport.refs.canvas);canvas.scrollLeft=scrollLeft;this.refs.viewport.refs.canvas.setScrollLeft(scrollLeft);}},_onScroll:function _onScroll(){if(this._scrollLeft!==undefined){this.refs.header.setScrollLeft(this._scrollLeft);if(this.refs.viewport){this.refs.viewport.setScrollLeft(this._scrollLeft);}}}}; /***/}, /* 99 */ /***/function(module,exports,__webpack_require__){'use strict';var React=__webpack_require__(2);var CheckboxEditor=React.createClass({displayName:'CheckboxEditor',propTypes:{value:React.PropTypes.bool,rowIdx:React.PropTypes.number,column:React.PropTypes.shape({key:React.PropTypes.string,onCellChange:React.PropTypes.func}),dependentValues:React.PropTypes.object},handleChange:function handleChange(e){this.props.column.onCellChange(this.props.rowIdx,this.props.column.key,this.props.dependentValues,e);},render:function render(){var checked=this.props.value!=null?this.props.value:false;var checkboxName='checkbox'+this.props.rowIdx;return React.createElement('div',{className:'react-grid-checkbox-container',onClick:this.handleChange},React.createElement('input',{className:'react-grid-checkbox',type:'checkbox',name:checkboxName,checked:checked}),React.createElement('label',{htmlFor:checkboxName,className:'react-grid-checkbox-label'}));}});module.exports=CheckboxEditor; /***/}, /* 100 */ /***/function(module,exports,__webpack_require__){'use strict';var _reactDom=__webpack_require__(3);var _reactDom2=_interopRequireDefault(_reactDom);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var ColumnMetrics=__webpack_require__(8);var DOMMetrics=__webpack_require__(97);Object.assign=__webpack_require__(101);var PropTypes=__webpack_require__(2).PropTypes;var ColumnUtils=__webpack_require__(10);var Column=function Column(){_classCallCheck(this,Column);};module.exports={mixins:[DOMMetrics.MetricsMixin],propTypes:{columns:PropTypes.arrayOf(Column),minColumnWidth:PropTypes.number,columnEquality:PropTypes.func,onColumnResize:PropTypes.func},DOMMetrics:{gridWidth:function gridWidth(){return _reactDom2['default'].findDOMNode(this).parentElement.offsetWidth;}},getDefaultProps:function getDefaultProps(){return {minColumnWidth:80,columnEquality:ColumnMetrics.sameColumn};},componentWillMount:function componentWillMount(){this._mounted=true;},componentWillReceiveProps:function componentWillReceiveProps(nextProps){if(nextProps.columns){if(!ColumnMetrics.sameColumns(this.props.columns,nextProps.columns,this.props.columnEquality)||nextProps.minWidth!==this.props.minWidth){var columnMetrics=this.createColumnMetrics(nextProps);this.setState({columnMetrics:columnMetrics});}}},getTotalWidth:function getTotalWidth(){var totalWidth=0;if(this._mounted){totalWidth=this.DOMMetrics.gridWidth();}else {totalWidth=ColumnUtils.getSize(this.props.columns)*this.props.minColumnWidth;}return totalWidth;},getColumnMetricsType:function getColumnMetricsType(metrics){var totalWidth=metrics.totalWidth||this.getTotalWidth();var currentMetrics={columns:metrics.columns,totalWidth:totalWidth,minColumnWidth:metrics.minColumnWidth};var updatedMetrics=ColumnMetrics.recalculate(currentMetrics);return updatedMetrics;},getColumn:function getColumn(idx){var columns=this.state.columnMetrics.columns;if(Array.isArray(columns)){return columns[idx];}else if(typeof Immutable!=='undefined'){return columns.get(idx);}},getSize:function getSize(){var columns=this.state.columnMetrics.columns;if(Array.isArray(columns)){return columns.length;}else if(typeof Immutable!=='undefined'){return columns.size;}},metricsUpdated:function metricsUpdated(){var columnMetrics=this.createColumnMetrics();this.setState({columnMetrics:columnMetrics});},createColumnMetrics:function createColumnMetrics(){var props=arguments.length<=0||arguments[0]===undefined?this.props:arguments[0];var gridColumns=this.setupGridColumns(props);return this.getColumnMetricsType({columns:gridColumns,minColumnWidth:this.props.minColumnWidth,totalWidth:props.minWidth});},onColumnResize:function onColumnResize(index,width){var columnMetrics=ColumnMetrics.resizeColumn(this.state.columnMetrics,index,width);this.setState({columnMetrics:columnMetrics});if(this.props.onColumnResize){this.props.onColumnResize(index,width);}}}; /***/}, /* 101 */ /***/function(module,exports){'use strict';function ToObject(val){if(val==null){throw new TypeError('Object.assign cannot be called with null or undefined');}return Object(val);}module.exports=Object.assign||function(target,source){var from;var keys;var to=ToObject(target);for(var s=1;s<arguments.length;s++){from=arguments[s];keys=Object.keys(Object(from));for(var i=0;i<keys.length;i++){to[keys[i]]=from[keys[i]];}}return to;}; /***/}, /* 102 */ /***/function(module,exports){'use strict';var RowUtils={get:function get(row,property){if(typeof row.get==='function'){return row.get(property);}return row[property];}};module.exports=RowUtils; /***/} /******/]));});;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(59)(module)))

/***/ },
/* 59 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ReactGrid = __webpack_require__(58);
	var QuickStartDescription = __webpack_require__(53);
	var ReactPlayground = __webpack_require__(56);

	var FixedExample = '\n\n//helper to generate a random date\nfunction randomDate(start, end) {\n  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();\n};\n\nvar _rows = [];\nfor (var i = 1; i < 1000; i++) {\n  _rows.push({\n    id: i,\n    task: \'Task \' + i,\n    complete: Math.min(100, Math.round(Math.random() * 110)),\n    priority : [\'Critical\', \'High\', \'Medium\', \'Low\'][Math.floor((Math.random() * 3) + 1)],\n    issueType : [\'Bug\', \'Improvement\', \'Epic\', \'Story\'][Math.floor((Math.random() * 3) + 1)],\n    startDate: randomDate(new Date(2015, 3, 1), new Date()),\n    completeDate: randomDate(new Date(), new Date(2016, 0, 1))\n  });\n};\n\n//function to retrieve a row for a given index\nvar rowGetter = function(i){\n  return _rows[i];\n};\n\n\n//Columns definition\nvar columns = [\n{\n  key: \'id\',\n  name: \'ID\',\n  locked : true\n},\n{\n  key: \'task\',\n  name: \'Title\',\n  width: 200\n},\n{\n  key: \'priority\',\n  name: \'Priority\',\n  width: 200\n},\n{\n  key: \'issueType\',\n  name: \'Issue Type\',\n  width: 200\n},\n{\n  key: \'complete\',\n  name: \'% Complete\',\n  width: 200\n},\n{\n  key: \'startDate\',\n  name: \'Start Date\',\n  width: 200\n},\n{\n  key: \'completeDate\',\n  name: \'Expected Complete\',\n  width: 200\n},\n{\n  key: \'completeDate\',\n  name: \'Expected Complete\',\n  width: 200\n}\n]\n\n\nReactDOM.render(<ReactDataGrid\n  columns={columns}\n  rowGetter={rowGetter}\n  rowsCount={_rows.length}\n  minHeight={500} />, mountNode);\n';

	module.exports = React.createClass({
	  displayName: 'exports',


	  render: function render() {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'h3',
	        null,
	        'Frozen Columns Example'
	      ),
	      React.createElement(
	        'p',
	        null,
	        'To make a given column frozen, set ',
	        React.createElement(
	          'code',
	          null,
	          'column.locked = true'
	        ),
	        '. In this example, the ID columns has been frozen and will remain in position as you scroll horizontally'
	      ),
	      React.createElement(ReactPlayground, { codeText: FixedExample })
	    );
	  }

	});

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ReactGrid = __webpack_require__(58);
	var QuickStartDescription = __webpack_require__(53);
	var ReactPlayground = __webpack_require__(56);

	var EditableExample = '\n//helper to generate a random date\nfunction randomDate(start, end) {\n  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();\n}\n\n//helper to create a fixed number of rows\nfunction createRows(numberOfRows){\n  var _rows = [];\n  for (var i = 1; i < numberOfRows; i++) {\n    _rows.push({\n      id: i,\n      task: \'Task \' + i,\n      complete: Math.min(100, Math.round(Math.random() * 110)),\n      priority : [\'Critical\', \'High\', \'Medium\', \'Low\'][Math.floor((Math.random() * 3) + 1)],\n      issueType : [\'Bug\', \'Improvement\', \'Epic\', \'Story\'][Math.floor((Math.random() * 3) + 1)],\n      startDate: randomDate(new Date(2015, 3, 1), new Date()),\n      completeDate: randomDate(new Date(), new Date(2016, 0, 1))\n    });\n  }\n  return _rows;\n}\n\n//function to retrieve a row for a given index\nvar rowGetter = function(i){\n  return _rows[i];\n};\n\n//Columns definition\nvar columns = [\n{\n  key: \'id\',\n  name: \'ID\',\n  width: 80\n},\n{\n  key: \'task\',\n  name: \'Title\',\n  editable : true\n},\n{\n  key: \'priority\',\n  name: \'Priority\',\n  editable : true\n},\n{\n  key: \'issueType\',\n  name: \'Issue Type\',\n  editable : true\n},\n{\n  key: \'complete\',\n  name: \'% Complete\',\n  editable : true\n},\n{\n  key: \'startDate\',\n  name: \'Start Date\',\n  editable : true\n},\n{\n  key: \'completeDate\',\n  name: \'Expected Complete\',\n  editable : true\n}\n]\n\n\nvar Example = React.createClass({\n\n  getInitialState : function(){\n    return {rows : createRows(1000)}\n  },\n\n  rowGetter : function(rowIdx){\n    return this.state.rows[rowIdx]\n  },\n\n  handleRowUpdated : function(e){\n    //merge updated row with current row and rerender by setting state\n    var rows = this.state.rows;\n    Object.assign(rows[e.rowIdx], e.updated);\n    this.setState({rows:rows});\n  },\n\n  render:function(){\n    return(\n      <ReactDataGrid\n      enableCellSelect={true}\n      columns={columns}\n      rowGetter={this.rowGetter}\n      rowsCount={this.state.rows.length}\n      minHeight={500}\n      onRowUpdated={this.handleRowUpdated} />\n    )\n  }\n\n});\n\nReactDOM.render(<Example />, mountNode);\n';

	module.exports = React.createClass({
	  displayName: 'exports',


	  render: function render() {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'h3',
	        null,
	        'Editable Example'
	      ),
	      React.createElement(ReactPlayground, { codeText: EditableExample })
	    );
	  }

	});

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var QuickStartDescription = __webpack_require__(53);
	var ReactPlayground = __webpack_require__(56);

	var SimpleExample = '\n//helper to generate a random date\nfunction randomDate(start, end) {\n  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();\n}\n\n//generate a fixed number of rows and set their properties\nvar _rows = [];\nfor (var i = 1; i < 100; i++) {\n  _rows.push({\n    id: i,\n    task: \'Task \' + i,\n    complete: Math.min(100, Math.round(Math.random() * 110)),\n    priority : [\'Critical\', \'High\', \'Medium\', \'Low\'][Math.floor((Math.random() * 3) + 1)],\n    issueType : [\'Bug\', \'Improvement\', \'Epic\', \'Story\'][Math.floor((Math.random() * 3) + 1)],\n    startDate: randomDate(new Date(2015, 3, 1), new Date()),\n    completeDate: randomDate(new Date(), new Date(2016, 0, 1))\n  });\n}\n\n\n//function to retrieve a row for a given index\nvar rowGetter = function(i){\n  return _rows[i];\n};\n\n//Custom Formatter component\nvar PercentCompleteFormatter = React.createClass({\n  render:function(){\n    var percentComplete = this.props.value + \'%\';\n    return (\n      <div className="progress" style={{marginTop:\'20px\'}}>\n        <div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width:percentComplete}}>\n        {percentComplete}\n      </div>\n      </div>);\n    }\n  });\n\n//Columns definition\nvar columns = [\n{\n  key: \'id\',\n  name: \'ID\',\n  width: 80\n},\n{\n  key: \'task\',\n  name: \'Title\'\n},\n{\n  key: \'priority\',\n  name: \'Priority\'\n},\n{\n  key: \'issueType\',\n  name: \'Issue Type\'\n},\n{\n  key: \'complete\',\n  name: \'% Complete\',\n  formatter : PercentCompleteFormatter\n},\n{\n  key: \'startDate\',\n  name: \'Start Date\'\n},\n{\n  key: \'completeDate\',\n  name: \'Expected Complete\'\n}\n]\n\nvar Example = React.createClass({\n  render: function() {\n    return  (<ReactDataGrid\n    columns={columns}\n    rowGetter={rowGetter}\n    rowsCount={_rows.length}\n    minHeight={500} />);\n  }\n});\nReactDOM.render(<Example />, mountNode);\n';

	module.exports = React.createClass({
	  displayName: 'exports',


	  render: function render() {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'h3',
	        null,
	        'Custom Formatter Example'
	      ),
	      React.createElement(
	        'p',
	        null,
	        'Its possible to create your own formatters for a given column by setting its ',
	        React.createElement(
	          'code',
	          null,
	          'formatter'
	        ),
	        ' property. Here a React component is used to format the %complete column. A custom formatter will always receive a ',
	        React.createElement(
	          'code',
	          null,
	          'value'
	        ),
	        ' prop, the value of the cell and this can be used however needed. Here we render a progress bar based on the ',
	        React.createElement(
	          'code',
	          null,
	          'props.value'
	        )
	      ),
	      React.createElement(ReactPlayground, { codeText: SimpleExample })
	    );
	  }

	});

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var QuickStartDescription = __webpack_require__(53);
	var ReactPlayground = __webpack_require__(56);

	var EditableExample = '\n\n//options for priorities autocomplete editor\nvar priorities = [{id:0, title : \'Critical\'}, {id:1, title : \'High\'}, {id:2, title : \'Medium\'}, {id:3, title : \'Low\'}]\nvar AutoCompleteEditor = ReactDataGrid.Editors.AutoComplete;\nvar PrioritiesEditor = <AutoCompleteEditor options={priorities}/>\n\n//options for IssueType dropdown editor\nvar issueTypes = [\'Bug\', \'Improvement\', \'Epic\', \'Story\'];\nvar DropDownEditor = ReactDataGrid.Editors.DropDownEditor;\nvar IssueTypesEditor = <DropDownEditor options={issueTypes}/>\n\n//helper to generate a random date\nfunction randomDate(start, end) {\n  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();\n}\n\n//helper to create a fixed number of rows\nfunction createRows(numberOfRows){\n  var _rows = [];\n  for (var i = 1; i < numberOfRows; i++) {\n    _rows.push({\n      id: i,\n      task: \'Task \' + i,\n      complete: Math.min(100, Math.round(Math.random() * 110)),\n      priority : [\'Critical\', \'High\', \'Medium\', \'Low\'][Math.floor((Math.random() * 3) + 1)],\n      issueType : issueTypes[Math.floor((Math.random() * 3) + 1)],\n      startDate: randomDate(new Date(2015, 3, 1), new Date()),\n      completeDate: randomDate(new Date(), new Date(2016, 0, 1))\n    });\n  }\n  return _rows;\n}\n\n//function to retrieve a row for a given index\nvar rowGetter = function(i){\n  return _rows[i];\n};\n\n//Columns definition\nvar columns = [\n{\n  key: \'id\',\n  name: \'ID\',\n  width: 80\n},\n{\n  key: \'task\',\n  name: \'Title\',\n  editable : true\n},\n{\n  key : \'priority\',\n  name : \'Priority\',\n  editor : PrioritiesEditor\n},\n{\n  key : \'issueType\',\n  name : \'Issue Type\',\n  editor : IssueTypesEditor\n}\n]\n\n\nvar Example = React.createClass({\n\n  getInitialState : function(){\n    return {rows : createRows(1000)}\n  },\n\n  rowGetter : function(rowIdx){\n    return this.state.rows[rowIdx]\n  },\n\n  handleRowUpdated : function(e){\n    //merge updated row with current row and rerender by setting state\n    var rows = this.state.rows;\n    Object.assign(rows[e.rowIdx], e.updated);\n    this.setState({rows:rows});\n  },\n\n  render:function(){\n    return(\n      <ReactDataGrid\n      enableCellSelect={true}\n      columns={columns}\n      rowGetter={this.rowGetter}\n      rowsCount={this.state.rows.length}\n      minHeight={500}\n      onRowUpdated={this.handleRowUpdated} />\n    )\n  }\n\n});\n\nReactDOM.render(<Example />, mountNode);\n';

	module.exports = React.createClass({
	  displayName: 'exports',


	  render: function render() {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'h3',
	        null,
	        'Built-In Cell Editor Example'
	      ),
	      React.createElement(
	        'p',
	        null,
	        'This example uses the built in ',
	        React.createElement(
	          'strong',
	          null,
	          'Autocomplete'
	        ),
	        ' editor for the priorities column and the ',
	        React.createElement(
	          'strong',
	          null,
	          'DropdownEditor'
	        ),
	        ' for the IssueType column. ',
	        React.createElement(
	          'strong',
	          null,
	          'You must be using the ',
	          React.createElement(
	            'code',
	            null,
	            'react-data-grid-with-addons.js'
	          ),
	          ' package to use the built in editors.'
	        )
	      ),
	      React.createElement(ReactPlayground, { codeText: EditableExample })
	    );
	  }

	});

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ReactGrid = __webpack_require__(58);
	var QuickStartDescription = __webpack_require__(53);
	var ReactPlayground = __webpack_require__(56);

	var EditableExample = '\n//helper to generate a random date\nfunction randomDate(start, end) {\n  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();\n}\n\n//helper to create a fixed number of rows\nfunction createRows(numberOfRows){\n  var _rows = [];\n  for (var i = 1; i < numberOfRows; i++) {\n    _rows.push({\n      id: i,\n      task: \'Task \' + i,\n      complete: Math.min(100, Math.round(Math.random() * 110)),\n      priority : [\'Critical\', \'High\', \'Medium\', \'Low\'][Math.floor((Math.random() * 3) + 1)],\n      issueType : [\'Bug\', \'Improvement\', \'Epic\', \'Story\'][Math.floor((Math.random() * 3) + 1)],\n      startDate: randomDate(new Date(2015, 3, 1), new Date()),\n      completeDate: randomDate(new Date(), new Date(2016, 0, 1))\n    });\n  }\n  return _rows;\n}\n\n//function to retrieve a row for a given index\nvar rowGetter = function(i){\n  return _rows[i];\n};\n\n//Columns definition\nvar columns = [\n{\n  key: \'id\',\n  name: \'ID\',\n  width: 80\n},\n{\n  key: \'task\',\n  name: \'Title\',\n  sortable : true\n},\n{\n  key: \'priority\',\n  name: \'Priority\',\n  sortable : true\n},\n{\n  key: \'issueType\',\n  name: \'Issue Type\',\n  sortable : true\n},\n{\n  key: \'complete\',\n  name: \'% Complete\',\n  sortable : true\n},\n{\n  key: \'startDate\',\n  name: \'Start Date\',\n  sortable : true\n},\n{\n  key: \'completeDate\',\n  name: \'Expected Complete\',\n  sortable : true\n}\n]\n\n\nvar Example = React.createClass({\n\n  getInitialState : function(){\n    var originalRows = createRows(1000);\n    var rows = originalRows.slice(0);\n    //store the original rows array, and make a copy that can be used for modifying eg.filtering, sorting\n    return {originalRows : originalRows, rows : rows};\n  },\n\n  rowGetter : function(rowIdx){\n    return this.state.rows[rowIdx];\n  },\n\n  handleGridSort : function(sortColumn, sortDirection){\n\n    var comparer = function(a, b) {\n      if(sortDirection === \'ASC\'){\n        return (a[sortColumn] > b[sortColumn]) ? 1 : -1;\n      }else if(sortDirection === \'DESC\'){\n        return (a[sortColumn] < b[sortColumn]) ? 1 : -1;\n      }\n    }\n    var rows = sortDirection === \'NONE\' ? this.state.originalRows.slice(0) : this.state.rows.sort(comparer);\n    this.setState({rows : rows});\n  },\n\n  render:function(){\n    return(\n      <ReactDataGrid\n        onGridSort={this.handleGridSort}\n        columns={columns}\n        rowGetter={this.rowGetter}\n        rowsCount={this.state.rows.length}\n        minHeight={500}\n        onRowUpdated={this.handleRowUpdated} />\n    )\n  }\n\n});\n\nReactDOM.render(<Example />, mountNode);\n';

	module.exports = React.createClass({
	  displayName: 'exports',


	  render: function render() {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'h3',
	        null,
	        'Sortable Columns Example'
	      ),
	      React.createElement(
	        'p',
	        null,
	        'While ReactDataGrid doesnt not provide the ability to sort directly, it does provide hooks that allow you to provide your own sort function. This is done via the ',
	        React.createElement(
	          'code',
	          null,
	          'onGridSort'
	        ),
	        ' prop. To enable sorting for a given column, set ',
	        React.createElement(
	          'code',
	          null,
	          'column.sortable = true'
	        ),
	        ' for that column. Now when the header cell is clicked for that column, ',
	        React.createElement(
	          'code',
	          null,
	          'onGridSort'
	        ),
	        ' will be triggered passing the column name and the sort direction.'
	      ),
	      React.createElement(ReactPlayground, { codeText: EditableExample })
	    );
	  }

	});

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ReactGrid = __webpack_require__(58);
	var QuickStartDescription = __webpack_require__(53);
	var ReactPlayground = __webpack_require__(56);

	var EditableExample = '\nvar Toolbar = ReactDataGrid.Toolbar;\n\n//helper to generate a random date\nfunction randomDate(start, end) {\n  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();\n}\n\n//helper to create a fixed number of rows\nfunction createRows(numberOfRows){\n  var _rows = [];\n  for (var i = 1; i < numberOfRows; i++) {\n    _rows.push({\n      id: i,\n      task: \'Task \' + i,\n      complete: Math.min(100, Math.round(Math.random() * 110)),\n      priority : [\'Critical\', \'High\', \'Medium\', \'Low\'][Math.floor((Math.random() * 3) + 1)],\n      issueType : [\'Bug\', \'Improvement\', \'Epic\', \'Story\'][Math.floor((Math.random() * 3) + 1)],\n      startDate: randomDate(new Date(2015, 3, 1), new Date()),\n      completeDate: randomDate(new Date(), new Date(2016, 0, 1))\n    });\n  }\n  return _rows;\n}\n\n//function to retrieve a row for a given index\nvar rowGetter = function(i){\n  return _rows[i];\n};\n\n//Columns definition\nvar columns = [\n{\n  key: \'id\',\n  name: \'ID\',\n  width: 80,\n  filterable: true\n},\n{\n  key: \'task\',\n  name: \'Title\',\n  filterable: true\n},\n{\n  key: \'priority\',\n  name: \'Priority\',\n  filterable: true\n},\n{\n  key: \'issueType\',\n  name: \'Issue Type\',\n  filterable: true\n},\n{\n  key: \'complete\',\n  name: \'% Complete\',\n  filterable: true\n},\n{\n  key: \'startDate\',\n  name: \'Start Date\',\n  filterable: true\n},\n{\n  key: \'completeDate\',\n  name: \'Expected Complete\',\n  filterable: true\n}\n]\n\n\nvar Example = React.createClass({\n\n  getInitialState : function(){\n    var originalRows = createRows(1000);\n    var rows = originalRows.slice(0);\n    //store the original rows array, and make a copy that can be used for modifying eg.filtering, sorting\n    return {originalRows : originalRows, rows : rows, filters : {}};\n  },\n\n  rowGetter : function(rowIdx){\n    return this.state.rows[rowIdx];\n  },\n\n  filterRows : function(originalRows, filters) {\n    var rows = originalRows.filter(function(r){\n      var include = true;\n      for (var columnKey in filters) {\n        if(filters.hasOwnProperty(columnKey)) {\n          var rowValue = r[columnKey].toString().toLowerCase();\n          if(rowValue.indexOf(filters[columnKey].toLowerCase()) === -1) {\n            include = false;\n          }\n        }\n      }\n      return include;\n    });\n    return rows;\n  },\n\n  handleFilterChange : function(filter){\n    this.setState(function(currentState) {\n      if (filter.filterTerm) {\n        currentState.filters[filter.columnKey] = filter.filterTerm;\n      } else {\n        delete currentState.filters[filter.columnKey];\n      }\n      currentState.rows = this.filterRows(currentState.originalRows, currentState.filters);\n      return currentState;\n    });\n  },\n\n  render:function(){\n    return(\n      <ReactDataGrid\n        columns={columns}\n        rowGetter={this.rowGetter}\n        enableCellSelect={true}\n        rowsCount={this.state.rows.length}\n        minHeight={500}\n        toolbar={<Toolbar enableFilter={true}/>}\n        onAddFilter={this.handleFilterChange}/>\n    )\n  }\n\n});\n\nReactDOM.render(<Example />, mountNode);\n';

	module.exports = React.createClass({
	  displayName: 'exports',


	  render: function render() {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'h3',
	        null,
	        'Filterable Columns Example'
	      ),
	      React.createElement(
	        'p',
	        null,
	        'While ReactDataGrid doesn\'t not provide the ability to filter directly, it does provide hooks that allow you to provide your own filter function. This is done via the ',
	        React.createElement(
	          'code',
	          null,
	          'onAddFilter'
	        ),
	        ' prop. To enable filtering for a given column, set ',
	        React.createElement(
	          'code',
	          null,
	          'column.filterable = true'
	        ),
	        ' for that column. Now when the header cell has a new filter value entered for that column, ',
	        React.createElement(
	          'code',
	          null,
	          'onAddFilter'
	        ),
	        ' will be triggered passing the filter key and value.'
	      ),
	      React.createElement(ReactPlayground, { codeText: EditableExample })
	    );
	  }

	});

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ReactGrid = __webpack_require__(58);
	var QuickStartDescription = __webpack_require__(53);
	var ReactPlayground = __webpack_require__(56);

	var millionRowsExample = '\n//helper to generate a random date\nfunction randomDate(start, end) {\n  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();\n};\n\nvar _rows = [];\nfor (var i = 1; i < 1000000; i++) {\n  _rows.push({\n    id: i,\n    task: \'Task \' + i,\n    complete: \'a\',\n    priority : \'b\',\n    issueType : \'c\'\n  });\n}\n\n//function to retrieve a row for a given index\nvar rowGetter = function(i){\n  return _rows[i];\n};\n\n\n//Columns definition\nvar columns = [\n{\n  key: \'id\',\n  name: \'ID\'\n\n},\n{\n  key: \'task\',\n  name: \'Title\'\n},\n{\n  key: \'priority\',\n  name: \'Priority\'\n},\n{\n  key: \'issueType\',\n  name: \'Issue Type\'\n},\n{\n  key: \'complete\',\n  name: \'% Complete\'\n}\n]\n\nReactDOM.render(<ReactDataGrid\n  columns={columns}\n  rowGetter={rowGetter}\n  rowsCount={_rows.length}\n  minHeight={500} />, mountNode);\n  ';

	module.exports = React.createClass({
	  displayName: 'exports',


	  render: function render() {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'h3',
	        null,
	        'One Million Rows Example'
	      ),
	      React.createElement('p', null),
	      React.createElement(ReactPlayground, { codeText: millionRowsExample })
	    );
	  }

	});

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ReactGrid = __webpack_require__(58);
	var QuickStartDescription = __webpack_require__(53);
	var ReactPlayground = __webpack_require__(56);
	var Immutable = __webpack_require__(68);

	var immutableDataExample = '\n//helper to generate a random date\nfunction randomDate(start, end) {\n  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();\n};\n\nvar _rows = [];\nvar _cols = [];\nfor(var j = 0; j < 50; j++){\n    _cols.push({key: \'col\' + j, name: \'col\' + j, width: 150, editable:true});\n};\n\nfor (var rowIdx = 1; rowIdx < 100; rowIdx++) {\n  var row = {};\n  _cols.forEach(function(c, colIdx){\n    row[c.key] = \'(\' + colIdx + \',\' + rowIdx + \')\';\n  });\n  _rows.push(row);\n}\n\nvar Example = React.createClass({\n\n  getInitialState : function(){\n    return {rows : new Immutable.fromJS(_rows), cols: new Immutable.List(_cols)}\n  },\n\n  rowGetter : function(rowIdx){\n    return this.state.rows.get(rowIdx)\n  },\n\n  handleRowUpdated : function(e){\n    //merge updated row with current row and rerender by setting state\n    var rows = this.state.rows.update(e.rowIdx, function(row){\n      return row.merge(e.updated);\n    });\n    this.setState({rows:rows});\n  },\n\n  render:function(){\n    return(\n      <ReactDataGrid\n      enableCellSelect={true}\n      columns={this.state.cols}\n      rowGetter={this.rowGetter}\n      rowsCount={this.state.rows.size}\n      minHeight={500}\n      onRowUpdated={this.handleRowUpdated} />\n    )\n  }\n\n});\n\nReactDOM.render(<Example />, mountNode);\n  ';

	module.exports = React.createClass({
	  displayName: 'exports',


	  render: function render() {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'h3',
	        null,
	        'Immutable Data Example'
	      ),
	      React.createElement('p', null),
	      React.createElement(ReactPlayground, { codeText: immutableDataExample })
	    );
	  }

	});

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 *  Copyright (c) 2014-2015, Facebook, Inc.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the BSD-style license found in the
	 *  LICENSE file in the root directory of this source tree. An additional grant
	 *  of patent rights can be found in the PATENTS file in the same directory.
	 */

	(function (global, factory) {
	   true ? module.exports = factory() :
	  typeof define === 'function' && define.amd ? define(factory) :
	  (global.Immutable = factory());
	}(this, function () { 'use strict';var SLICE$0 = Array.prototype.slice;

	  function createClass(ctor, superClass) {
	    if (superClass) {
	      ctor.prototype = Object.create(superClass.prototype);
	    }
	    ctor.prototype.constructor = ctor;
	  }

	  function Iterable(value) {
	      return isIterable(value) ? value : Seq(value);
	    }


	  createClass(KeyedIterable, Iterable);
	    function KeyedIterable(value) {
	      return isKeyed(value) ? value : KeyedSeq(value);
	    }


	  createClass(IndexedIterable, Iterable);
	    function IndexedIterable(value) {
	      return isIndexed(value) ? value : IndexedSeq(value);
	    }


	  createClass(SetIterable, Iterable);
	    function SetIterable(value) {
	      return isIterable(value) && !isAssociative(value) ? value : SetSeq(value);
	    }



	  function isIterable(maybeIterable) {
	    return !!(maybeIterable && maybeIterable[IS_ITERABLE_SENTINEL]);
	  }

	  function isKeyed(maybeKeyed) {
	    return !!(maybeKeyed && maybeKeyed[IS_KEYED_SENTINEL]);
	  }

	  function isIndexed(maybeIndexed) {
	    return !!(maybeIndexed && maybeIndexed[IS_INDEXED_SENTINEL]);
	  }

	  function isAssociative(maybeAssociative) {
	    return isKeyed(maybeAssociative) || isIndexed(maybeAssociative);
	  }

	  function isOrdered(maybeOrdered) {
	    return !!(maybeOrdered && maybeOrdered[IS_ORDERED_SENTINEL]);
	  }

	  Iterable.isIterable = isIterable;
	  Iterable.isKeyed = isKeyed;
	  Iterable.isIndexed = isIndexed;
	  Iterable.isAssociative = isAssociative;
	  Iterable.isOrdered = isOrdered;

	  Iterable.Keyed = KeyedIterable;
	  Iterable.Indexed = IndexedIterable;
	  Iterable.Set = SetIterable;


	  var IS_ITERABLE_SENTINEL = '@@__IMMUTABLE_ITERABLE__@@';
	  var IS_KEYED_SENTINEL = '@@__IMMUTABLE_KEYED__@@';
	  var IS_INDEXED_SENTINEL = '@@__IMMUTABLE_INDEXED__@@';
	  var IS_ORDERED_SENTINEL = '@@__IMMUTABLE_ORDERED__@@';

	  // Used for setting prototype methods that IE8 chokes on.
	  var DELETE = 'delete';

	  // Constants describing the size of trie nodes.
	  var SHIFT = 5; // Resulted in best performance after ______?
	  var SIZE = 1 << SHIFT;
	  var MASK = SIZE - 1;

	  // A consistent shared value representing "not set" which equals nothing other
	  // than itself, and nothing that could be provided externally.
	  var NOT_SET = {};

	  // Boolean references, Rough equivalent of `bool &`.
	  var CHANGE_LENGTH = { value: false };
	  var DID_ALTER = { value: false };

	  function MakeRef(ref) {
	    ref.value = false;
	    return ref;
	  }

	  function SetRef(ref) {
	    ref && (ref.value = true);
	  }

	  // A function which returns a value representing an "owner" for transient writes
	  // to tries. The return value will only ever equal itself, and will not equal
	  // the return of any subsequent call of this function.
	  function OwnerID() {}

	  // http://jsperf.com/copy-array-inline
	  function arrCopy(arr, offset) {
	    offset = offset || 0;
	    var len = Math.max(0, arr.length - offset);
	    var newArr = new Array(len);
	    for (var ii = 0; ii < len; ii++) {
	      newArr[ii] = arr[ii + offset];
	    }
	    return newArr;
	  }

	  function ensureSize(iter) {
	    if (iter.size === undefined) {
	      iter.size = iter.__iterate(returnTrue);
	    }
	    return iter.size;
	  }

	  function wrapIndex(iter, index) {
	    // This implements "is array index" which the ECMAString spec defines as:
	    //
	    //     A String property name P is an array index if and only if
	    //     ToString(ToUint32(P)) is equal to P and ToUint32(P) is not equal
	    //     to 2^32−1.
	    //
	    // http://www.ecma-international.org/ecma-262/6.0/#sec-array-exotic-objects
	    if (typeof index !== 'number') {
	      var uint32Index = index >>> 0; // N >>> 0 is shorthand for ToUint32
	      if ('' + uint32Index !== index || uint32Index === 4294967295) {
	        return NaN;
	      }
	      index = uint32Index;
	    }
	    return index < 0 ? ensureSize(iter) + index : index;
	  }

	  function returnTrue() {
	    return true;
	  }

	  function wholeSlice(begin, end, size) {
	    return (begin === 0 || (size !== undefined && begin <= -size)) &&
	      (end === undefined || (size !== undefined && end >= size));
	  }

	  function resolveBegin(begin, size) {
	    return resolveIndex(begin, size, 0);
	  }

	  function resolveEnd(end, size) {
	    return resolveIndex(end, size, size);
	  }

	  function resolveIndex(index, size, defaultIndex) {
	    return index === undefined ?
	      defaultIndex :
	      index < 0 ?
	        Math.max(0, size + index) :
	        size === undefined ?
	          index :
	          Math.min(size, index);
	  }

	  /* global Symbol */

	  var ITERATE_KEYS = 0;
	  var ITERATE_VALUES = 1;
	  var ITERATE_ENTRIES = 2;

	  var REAL_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
	  var FAUX_ITERATOR_SYMBOL = '@@iterator';

	  var ITERATOR_SYMBOL = REAL_ITERATOR_SYMBOL || FAUX_ITERATOR_SYMBOL;


	  function Iterator(next) {
	      this.next = next;
	    }

	    Iterator.prototype.toString = function() {
	      return '[Iterator]';
	    };


	  Iterator.KEYS = ITERATE_KEYS;
	  Iterator.VALUES = ITERATE_VALUES;
	  Iterator.ENTRIES = ITERATE_ENTRIES;

	  Iterator.prototype.inspect =
	  Iterator.prototype.toSource = function () { return this.toString(); }
	  Iterator.prototype[ITERATOR_SYMBOL] = function () {
	    return this;
	  };


	  function iteratorValue(type, k, v, iteratorResult) {
	    var value = type === 0 ? k : type === 1 ? v : [k, v];
	    iteratorResult ? (iteratorResult.value = value) : (iteratorResult = {
	      value: value, done: false
	    });
	    return iteratorResult;
	  }

	  function iteratorDone() {
	    return { value: undefined, done: true };
	  }

	  function hasIterator(maybeIterable) {
	    return !!getIteratorFn(maybeIterable);
	  }

	  function isIterator(maybeIterator) {
	    return maybeIterator && typeof maybeIterator.next === 'function';
	  }

	  function getIterator(iterable) {
	    var iteratorFn = getIteratorFn(iterable);
	    return iteratorFn && iteratorFn.call(iterable);
	  }

	  function getIteratorFn(iterable) {
	    var iteratorFn = iterable && (
	      (REAL_ITERATOR_SYMBOL && iterable[REAL_ITERATOR_SYMBOL]) ||
	      iterable[FAUX_ITERATOR_SYMBOL]
	    );
	    if (typeof iteratorFn === 'function') {
	      return iteratorFn;
	    }
	  }

	  function isArrayLike(value) {
	    return value && typeof value.length === 'number';
	  }

	  createClass(Seq, Iterable);
	    function Seq(value) {
	      return value === null || value === undefined ? emptySequence() :
	        isIterable(value) ? value.toSeq() : seqFromValue(value);
	    }

	    Seq.of = function(/*...values*/) {
	      return Seq(arguments);
	    };

	    Seq.prototype.toSeq = function() {
	      return this;
	    };

	    Seq.prototype.toString = function() {
	      return this.__toString('Seq {', '}');
	    };

	    Seq.prototype.cacheResult = function() {
	      if (!this._cache && this.__iterateUncached) {
	        this._cache = this.entrySeq().toArray();
	        this.size = this._cache.length;
	      }
	      return this;
	    };

	    // abstract __iterateUncached(fn, reverse)

	    Seq.prototype.__iterate = function(fn, reverse) {
	      return seqIterate(this, fn, reverse, true);
	    };

	    // abstract __iteratorUncached(type, reverse)

	    Seq.prototype.__iterator = function(type, reverse) {
	      return seqIterator(this, type, reverse, true);
	    };



	  createClass(KeyedSeq, Seq);
	    function KeyedSeq(value) {
	      return value === null || value === undefined ?
	        emptySequence().toKeyedSeq() :
	        isIterable(value) ?
	          (isKeyed(value) ? value.toSeq() : value.fromEntrySeq()) :
	          keyedSeqFromValue(value);
	    }

	    KeyedSeq.prototype.toKeyedSeq = function() {
	      return this;
	    };



	  createClass(IndexedSeq, Seq);
	    function IndexedSeq(value) {
	      return value === null || value === undefined ? emptySequence() :
	        !isIterable(value) ? indexedSeqFromValue(value) :
	        isKeyed(value) ? value.entrySeq() : value.toIndexedSeq();
	    }

	    IndexedSeq.of = function(/*...values*/) {
	      return IndexedSeq(arguments);
	    };

	    IndexedSeq.prototype.toIndexedSeq = function() {
	      return this;
	    };

	    IndexedSeq.prototype.toString = function() {
	      return this.__toString('Seq [', ']');
	    };

	    IndexedSeq.prototype.__iterate = function(fn, reverse) {
	      return seqIterate(this, fn, reverse, false);
	    };

	    IndexedSeq.prototype.__iterator = function(type, reverse) {
	      return seqIterator(this, type, reverse, false);
	    };



	  createClass(SetSeq, Seq);
	    function SetSeq(value) {
	      return (
	        value === null || value === undefined ? emptySequence() :
	        !isIterable(value) ? indexedSeqFromValue(value) :
	        isKeyed(value) ? value.entrySeq() : value
	      ).toSetSeq();
	    }

	    SetSeq.of = function(/*...values*/) {
	      return SetSeq(arguments);
	    };

	    SetSeq.prototype.toSetSeq = function() {
	      return this;
	    };



	  Seq.isSeq = isSeq;
	  Seq.Keyed = KeyedSeq;
	  Seq.Set = SetSeq;
	  Seq.Indexed = IndexedSeq;

	  var IS_SEQ_SENTINEL = '@@__IMMUTABLE_SEQ__@@';

	  Seq.prototype[IS_SEQ_SENTINEL] = true;



	  createClass(ArraySeq, IndexedSeq);
	    function ArraySeq(array) {
	      this._array = array;
	      this.size = array.length;
	    }

	    ArraySeq.prototype.get = function(index, notSetValue) {
	      return this.has(index) ? this._array[wrapIndex(this, index)] : notSetValue;
	    };

	    ArraySeq.prototype.__iterate = function(fn, reverse) {
	      var array = this._array;
	      var maxIndex = array.length - 1;
	      for (var ii = 0; ii <= maxIndex; ii++) {
	        if (fn(array[reverse ? maxIndex - ii : ii], ii, this) === false) {
	          return ii + 1;
	        }
	      }
	      return ii;
	    };

	    ArraySeq.prototype.__iterator = function(type, reverse) {
	      var array = this._array;
	      var maxIndex = array.length - 1;
	      var ii = 0;
	      return new Iterator(function() 
	        {return ii > maxIndex ?
	          iteratorDone() :
	          iteratorValue(type, ii, array[reverse ? maxIndex - ii++ : ii++])}
	      );
	    };



	  createClass(ObjectSeq, KeyedSeq);
	    function ObjectSeq(object) {
	      var keys = Object.keys(object);
	      this._object = object;
	      this._keys = keys;
	      this.size = keys.length;
	    }

	    ObjectSeq.prototype.get = function(key, notSetValue) {
	      if (notSetValue !== undefined && !this.has(key)) {
	        return notSetValue;
	      }
	      return this._object[key];
	    };

	    ObjectSeq.prototype.has = function(key) {
	      return this._object.hasOwnProperty(key);
	    };

	    ObjectSeq.prototype.__iterate = function(fn, reverse) {
	      var object = this._object;
	      var keys = this._keys;
	      var maxIndex = keys.length - 1;
	      for (var ii = 0; ii <= maxIndex; ii++) {
	        var key = keys[reverse ? maxIndex - ii : ii];
	        if (fn(object[key], key, this) === false) {
	          return ii + 1;
	        }
	      }
	      return ii;
	    };

	    ObjectSeq.prototype.__iterator = function(type, reverse) {
	      var object = this._object;
	      var keys = this._keys;
	      var maxIndex = keys.length - 1;
	      var ii = 0;
	      return new Iterator(function()  {
	        var key = keys[reverse ? maxIndex - ii : ii];
	        return ii++ > maxIndex ?
	          iteratorDone() :
	          iteratorValue(type, key, object[key]);
	      });
	    };

	  ObjectSeq.prototype[IS_ORDERED_SENTINEL] = true;


	  createClass(IterableSeq, IndexedSeq);
	    function IterableSeq(iterable) {
	      this._iterable = iterable;
	      this.size = iterable.length || iterable.size;
	    }

	    IterableSeq.prototype.__iterateUncached = function(fn, reverse) {
	      if (reverse) {
	        return this.cacheResult().__iterate(fn, reverse);
	      }
	      var iterable = this._iterable;
	      var iterator = getIterator(iterable);
	      var iterations = 0;
	      if (isIterator(iterator)) {
	        var step;
	        while (!(step = iterator.next()).done) {
	          if (fn(step.value, iterations++, this) === false) {
	            break;
	          }
	        }
	      }
	      return iterations;
	    };

	    IterableSeq.prototype.__iteratorUncached = function(type, reverse) {
	      if (reverse) {
	        return this.cacheResult().__iterator(type, reverse);
	      }
	      var iterable = this._iterable;
	      var iterator = getIterator(iterable);
	      if (!isIterator(iterator)) {
	        return new Iterator(iteratorDone);
	      }
	      var iterations = 0;
	      return new Iterator(function()  {
	        var step = iterator.next();
	        return step.done ? step : iteratorValue(type, iterations++, step.value);
	      });
	    };



	  createClass(IteratorSeq, IndexedSeq);
	    function IteratorSeq(iterator) {
	      this._iterator = iterator;
	      this._iteratorCache = [];
	    }

	    IteratorSeq.prototype.__iterateUncached = function(fn, reverse) {
	      if (reverse) {
	        return this.cacheResult().__iterate(fn, reverse);
	      }
	      var iterator = this._iterator;
	      var cache = this._iteratorCache;
	      var iterations = 0;
	      while (iterations < cache.length) {
	        if (fn(cache[iterations], iterations++, this) === false) {
	          return iterations;
	        }
	      }
	      var step;
	      while (!(step = iterator.next()).done) {
	        var val = step.value;
	        cache[iterations] = val;
	        if (fn(val, iterations++, this) === false) {
	          break;
	        }
	      }
	      return iterations;
	    };

	    IteratorSeq.prototype.__iteratorUncached = function(type, reverse) {
	      if (reverse) {
	        return this.cacheResult().__iterator(type, reverse);
	      }
	      var iterator = this._iterator;
	      var cache = this._iteratorCache;
	      var iterations = 0;
	      return new Iterator(function()  {
	        if (iterations >= cache.length) {
	          var step = iterator.next();
	          if (step.done) {
	            return step;
	          }
	          cache[iterations] = step.value;
	        }
	        return iteratorValue(type, iterations, cache[iterations++]);
	      });
	    };




	  // # pragma Helper functions

	  function isSeq(maybeSeq) {
	    return !!(maybeSeq && maybeSeq[IS_SEQ_SENTINEL]);
	  }

	  var EMPTY_SEQ;

	  function emptySequence() {
	    return EMPTY_SEQ || (EMPTY_SEQ = new ArraySeq([]));
	  }

	  function keyedSeqFromValue(value) {
	    var seq =
	      Array.isArray(value) ? new ArraySeq(value).fromEntrySeq() :
	      isIterator(value) ? new IteratorSeq(value).fromEntrySeq() :
	      hasIterator(value) ? new IterableSeq(value).fromEntrySeq() :
	      typeof value === 'object' ? new ObjectSeq(value) :
	      undefined;
	    if (!seq) {
	      throw new TypeError(
	        'Expected Array or iterable object of [k, v] entries, '+
	        'or keyed object: ' + value
	      );
	    }
	    return seq;
	  }

	  function indexedSeqFromValue(value) {
	    var seq = maybeIndexedSeqFromValue(value);
	    if (!seq) {
	      throw new TypeError(
	        'Expected Array or iterable object of values: ' + value
	      );
	    }
	    return seq;
	  }

	  function seqFromValue(value) {
	    var seq = maybeIndexedSeqFromValue(value) ||
	      (typeof value === 'object' && new ObjectSeq(value));
	    if (!seq) {
	      throw new TypeError(
	        'Expected Array or iterable object of values, or keyed object: ' + value
	      );
	    }
	    return seq;
	  }

	  function maybeIndexedSeqFromValue(value) {
	    return (
	      isArrayLike(value) ? new ArraySeq(value) :
	      isIterator(value) ? new IteratorSeq(value) :
	      hasIterator(value) ? new IterableSeq(value) :
	      undefined
	    );
	  }

	  function seqIterate(seq, fn, reverse, useKeys) {
	    var cache = seq._cache;
	    if (cache) {
	      var maxIndex = cache.length - 1;
	      for (var ii = 0; ii <= maxIndex; ii++) {
	        var entry = cache[reverse ? maxIndex - ii : ii];
	        if (fn(entry[1], useKeys ? entry[0] : ii, seq) === false) {
	          return ii + 1;
	        }
	      }
	      return ii;
	    }
	    return seq.__iterateUncached(fn, reverse);
	  }

	  function seqIterator(seq, type, reverse, useKeys) {
	    var cache = seq._cache;
	    if (cache) {
	      var maxIndex = cache.length - 1;
	      var ii = 0;
	      return new Iterator(function()  {
	        var entry = cache[reverse ? maxIndex - ii : ii];
	        return ii++ > maxIndex ?
	          iteratorDone() :
	          iteratorValue(type, useKeys ? entry[0] : ii - 1, entry[1]);
	      });
	    }
	    return seq.__iteratorUncached(type, reverse);
	  }

	  function fromJS(json, converter) {
	    return converter ?
	      fromJSWith(converter, json, '', {'': json}) :
	      fromJSDefault(json);
	  }

	  function fromJSWith(converter, json, key, parentJSON) {
	    if (Array.isArray(json)) {
	      return converter.call(parentJSON, key, IndexedSeq(json).map(function(v, k)  {return fromJSWith(converter, v, k, json)}));
	    }
	    if (isPlainObj(json)) {
	      return converter.call(parentJSON, key, KeyedSeq(json).map(function(v, k)  {return fromJSWith(converter, v, k, json)}));
	    }
	    return json;
	  }

	  function fromJSDefault(json) {
	    if (Array.isArray(json)) {
	      return IndexedSeq(json).map(fromJSDefault).toList();
	    }
	    if (isPlainObj(json)) {
	      return KeyedSeq(json).map(fromJSDefault).toMap();
	    }
	    return json;
	  }

	  function isPlainObj(value) {
	    return value && (value.constructor === Object || value.constructor === undefined);
	  }

	  /**
	   * An extension of the "same-value" algorithm as [described for use by ES6 Map
	   * and Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#Key_equality)
	   *
	   * NaN is considered the same as NaN, however -0 and 0 are considered the same
	   * value, which is different from the algorithm described by
	   * [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is).
	   *
	   * This is extended further to allow Objects to describe the values they
	   * represent, by way of `valueOf` or `equals` (and `hashCode`).
	   *
	   * Note: because of this extension, the key equality of Immutable.Map and the
	   * value equality of Immutable.Set will differ from ES6 Map and Set.
	   *
	   * ### Defining custom values
	   *
	   * The easiest way to describe the value an object represents is by implementing
	   * `valueOf`. For example, `Date` represents a value by returning a unix
	   * timestamp for `valueOf`:
	   *
	   *     var date1 = new Date(1234567890000); // Fri Feb 13 2009 ...
	   *     var date2 = new Date(1234567890000);
	   *     date1.valueOf(); // 1234567890000
	   *     assert( date1 !== date2 );
	   *     assert( Immutable.is( date1, date2 ) );
	   *
	   * Note: overriding `valueOf` may have other implications if you use this object
	   * where JavaScript expects a primitive, such as implicit string coercion.
	   *
	   * For more complex types, especially collections, implementing `valueOf` may
	   * not be performant. An alternative is to implement `equals` and `hashCode`.
	   *
	   * `equals` takes another object, presumably of similar type, and returns true
	   * if the it is equal. Equality is symmetrical, so the same result should be
	   * returned if this and the argument are flipped.
	   *
	   *     assert( a.equals(b) === b.equals(a) );
	   *
	   * `hashCode` returns a 32bit integer number representing the object which will
	   * be used to determine how to store the value object in a Map or Set. You must
	   * provide both or neither methods, one must not exist without the other.
	   *
	   * Also, an important relationship between these methods must be upheld: if two
	   * values are equal, they *must* return the same hashCode. If the values are not
	   * equal, they might have the same hashCode; this is called a hash collision,
	   * and while undesirable for performance reasons, it is acceptable.
	   *
	   *     if (a.equals(b)) {
	   *       assert( a.hashCode() === b.hashCode() );
	   *     }
	   *
	   * All Immutable collections implement `equals` and `hashCode`.
	   *
	   */
	  function is(valueA, valueB) {
	    if (valueA === valueB || (valueA !== valueA && valueB !== valueB)) {
	      return true;
	    }
	    if (!valueA || !valueB) {
	      return false;
	    }
	    if (typeof valueA.valueOf === 'function' &&
	        typeof valueB.valueOf === 'function') {
	      valueA = valueA.valueOf();
	      valueB = valueB.valueOf();
	      if (valueA === valueB || (valueA !== valueA && valueB !== valueB)) {
	        return true;
	      }
	      if (!valueA || !valueB) {
	        return false;
	      }
	    }
	    if (typeof valueA.equals === 'function' &&
	        typeof valueB.equals === 'function' &&
	        valueA.equals(valueB)) {
	      return true;
	    }
	    return false;
	  }

	  function deepEqual(a, b) {
	    if (a === b) {
	      return true;
	    }

	    if (
	      !isIterable(b) ||
	      a.size !== undefined && b.size !== undefined && a.size !== b.size ||
	      a.__hash !== undefined && b.__hash !== undefined && a.__hash !== b.__hash ||
	      isKeyed(a) !== isKeyed(b) ||
	      isIndexed(a) !== isIndexed(b) ||
	      isOrdered(a) !== isOrdered(b)
	    ) {
	      return false;
	    }

	    if (a.size === 0 && b.size === 0) {
	      return true;
	    }

	    var notAssociative = !isAssociative(a);

	    if (isOrdered(a)) {
	      var entries = a.entries();
	      return b.every(function(v, k)  {
	        var entry = entries.next().value;
	        return entry && is(entry[1], v) && (notAssociative || is(entry[0], k));
	      }) && entries.next().done;
	    }

	    var flipped = false;

	    if (a.size === undefined) {
	      if (b.size === undefined) {
	        if (typeof a.cacheResult === 'function') {
	          a.cacheResult();
	        }
	      } else {
	        flipped = true;
	        var _ = a;
	        a = b;
	        b = _;
	      }
	    }

	    var allEqual = true;
	    var bSize = b.__iterate(function(v, k)  {
	      if (notAssociative ? !a.has(v) :
	          flipped ? !is(v, a.get(k, NOT_SET)) : !is(a.get(k, NOT_SET), v)) {
	        allEqual = false;
	        return false;
	      }
	    });

	    return allEqual && a.size === bSize;
	  }

	  createClass(Repeat, IndexedSeq);

	    function Repeat(value, times) {
	      if (!(this instanceof Repeat)) {
	        return new Repeat(value, times);
	      }
	      this._value = value;
	      this.size = times === undefined ? Infinity : Math.max(0, times);
	      if (this.size === 0) {
	        if (EMPTY_REPEAT) {
	          return EMPTY_REPEAT;
	        }
	        EMPTY_REPEAT = this;
	      }
	    }

	    Repeat.prototype.toString = function() {
	      if (this.size === 0) {
	        return 'Repeat []';
	      }
	      return 'Repeat [ ' + this._value + ' ' + this.size + ' times ]';
	    };

	    Repeat.prototype.get = function(index, notSetValue) {
	      return this.has(index) ? this._value : notSetValue;
	    };

	    Repeat.prototype.includes = function(searchValue) {
	      return is(this._value, searchValue);
	    };

	    Repeat.prototype.slice = function(begin, end) {
	      var size = this.size;
	      return wholeSlice(begin, end, size) ? this :
	        new Repeat(this._value, resolveEnd(end, size) - resolveBegin(begin, size));
	    };

	    Repeat.prototype.reverse = function() {
	      return this;
	    };

	    Repeat.prototype.indexOf = function(searchValue) {
	      if (is(this._value, searchValue)) {
	        return 0;
	      }
	      return -1;
	    };

	    Repeat.prototype.lastIndexOf = function(searchValue) {
	      if (is(this._value, searchValue)) {
	        return this.size;
	      }
	      return -1;
	    };

	    Repeat.prototype.__iterate = function(fn, reverse) {
	      for (var ii = 0; ii < this.size; ii++) {
	        if (fn(this._value, ii, this) === false) {
	          return ii + 1;
	        }
	      }
	      return ii;
	    };

	    Repeat.prototype.__iterator = function(type, reverse) {var this$0 = this;
	      var ii = 0;
	      return new Iterator(function() 
	        {return ii < this$0.size ? iteratorValue(type, ii++, this$0._value) : iteratorDone()}
	      );
	    };

	    Repeat.prototype.equals = function(other) {
	      return other instanceof Repeat ?
	        is(this._value, other._value) :
	        deepEqual(other);
	    };


	  var EMPTY_REPEAT;

	  function invariant(condition, error) {
	    if (!condition) throw new Error(error);
	  }

	  createClass(Range, IndexedSeq);

	    function Range(start, end, step) {
	      if (!(this instanceof Range)) {
	        return new Range(start, end, step);
	      }
	      invariant(step !== 0, 'Cannot step a Range by 0');
	      start = start || 0;
	      if (end === undefined) {
	        end = Infinity;
	      }
	      step = step === undefined ? 1 : Math.abs(step);
	      if (end < start) {
	        step = -step;
	      }
	      this._start = start;
	      this._end = end;
	      this._step = step;
	      this.size = Math.max(0, Math.ceil((end - start) / step - 1) + 1);
	      if (this.size === 0) {
	        if (EMPTY_RANGE) {
	          return EMPTY_RANGE;
	        }
	        EMPTY_RANGE = this;
	      }
	    }

	    Range.prototype.toString = function() {
	      if (this.size === 0) {
	        return 'Range []';
	      }
	      return 'Range [ ' +
	        this._start + '...' + this._end +
	        (this._step !== 1 ? ' by ' + this._step : '') +
	      ' ]';
	    };

	    Range.prototype.get = function(index, notSetValue) {
	      return this.has(index) ?
	        this._start + wrapIndex(this, index) * this._step :
	        notSetValue;
	    };

	    Range.prototype.includes = function(searchValue) {
	      var possibleIndex = (searchValue - this._start) / this._step;
	      return possibleIndex >= 0 &&
	        possibleIndex < this.size &&
	        possibleIndex === Math.floor(possibleIndex);
	    };

	    Range.prototype.slice = function(begin, end) {
	      if (wholeSlice(begin, end, this.size)) {
	        return this;
	      }
	      begin = resolveBegin(begin, this.size);
	      end = resolveEnd(end, this.size);
	      if (end <= begin) {
	        return new Range(0, 0);
	      }
	      return new Range(this.get(begin, this._end), this.get(end, this._end), this._step);
	    };

	    Range.prototype.indexOf = function(searchValue) {
	      var offsetValue = searchValue - this._start;
	      if (offsetValue % this._step === 0) {
	        var index = offsetValue / this._step;
	        if (index >= 0 && index < this.size) {
	          return index
	        }
	      }
	      return -1;
	    };

	    Range.prototype.lastIndexOf = function(searchValue) {
	      return this.indexOf(searchValue);
	    };

	    Range.prototype.__iterate = function(fn, reverse) {
	      var maxIndex = this.size - 1;
	      var step = this._step;
	      var value = reverse ? this._start + maxIndex * step : this._start;
	      for (var ii = 0; ii <= maxIndex; ii++) {
	        if (fn(value, ii, this) === false) {
	          return ii + 1;
	        }
	        value += reverse ? -step : step;
	      }
	      return ii;
	    };

	    Range.prototype.__iterator = function(type, reverse) {
	      var maxIndex = this.size - 1;
	      var step = this._step;
	      var value = reverse ? this._start + maxIndex * step : this._start;
	      var ii = 0;
	      return new Iterator(function()  {
	        var v = value;
	        value += reverse ? -step : step;
	        return ii > maxIndex ? iteratorDone() : iteratorValue(type, ii++, v);
	      });
	    };

	    Range.prototype.equals = function(other) {
	      return other instanceof Range ?
	        this._start === other._start &&
	        this._end === other._end &&
	        this._step === other._step :
	        deepEqual(this, other);
	    };


	  var EMPTY_RANGE;

	  createClass(Collection, Iterable);
	    function Collection() {
	      throw TypeError('Abstract');
	    }


	  createClass(KeyedCollection, Collection);function KeyedCollection() {}

	  createClass(IndexedCollection, Collection);function IndexedCollection() {}

	  createClass(SetCollection, Collection);function SetCollection() {}


	  Collection.Keyed = KeyedCollection;
	  Collection.Indexed = IndexedCollection;
	  Collection.Set = SetCollection;

	  var imul =
	    typeof Math.imul === 'function' && Math.imul(0xffffffff, 2) === -2 ?
	    Math.imul :
	    function imul(a, b) {
	      a = a | 0; // int
	      b = b | 0; // int
	      var c = a & 0xffff;
	      var d = b & 0xffff;
	      // Shift by 0 fixes the sign on the high part.
	      return (c * d) + ((((a >>> 16) * d + c * (b >>> 16)) << 16) >>> 0) | 0; // int
	    };

	  // v8 has an optimization for storing 31-bit signed numbers.
	  // Values which have either 00 or 11 as the high order bits qualify.
	  // This function drops the highest order bit in a signed number, maintaining
	  // the sign bit.
	  function smi(i32) {
	    return ((i32 >>> 1) & 0x40000000) | (i32 & 0xBFFFFFFF);
	  }

	  function hash(o) {
	    if (o === false || o === null || o === undefined) {
	      return 0;
	    }
	    if (typeof o.valueOf === 'function') {
	      o = o.valueOf();
	      if (o === false || o === null || o === undefined) {
	        return 0;
	      }
	    }
	    if (o === true) {
	      return 1;
	    }
	    var type = typeof o;
	    if (type === 'number') {
	      if (o !== o || o === Infinity) {
	        return 0;
	      }
	      var h = o | 0;
	      if (h !== o) {
	        h ^= o * 0xFFFFFFFF;
	      }
	      while (o > 0xFFFFFFFF) {
	        o /= 0xFFFFFFFF;
	        h ^= o;
	      }
	      return smi(h);
	    }
	    if (type === 'string') {
	      return o.length > STRING_HASH_CACHE_MIN_STRLEN ? cachedHashString(o) : hashString(o);
	    }
	    if (typeof o.hashCode === 'function') {
	      return o.hashCode();
	    }
	    if (type === 'object') {
	      return hashJSObj(o);
	    }
	    if (typeof o.toString === 'function') {
	      return hashString(o.toString());
	    }
	    throw new Error('Value type ' + type + ' cannot be hashed.');
	  }

	  function cachedHashString(string) {
	    var hash = stringHashCache[string];
	    if (hash === undefined) {
	      hash = hashString(string);
	      if (STRING_HASH_CACHE_SIZE === STRING_HASH_CACHE_MAX_SIZE) {
	        STRING_HASH_CACHE_SIZE = 0;
	        stringHashCache = {};
	      }
	      STRING_HASH_CACHE_SIZE++;
	      stringHashCache[string] = hash;
	    }
	    return hash;
	  }

	  // http://jsperf.com/hashing-strings
	  function hashString(string) {
	    // This is the hash from JVM
	    // The hash code for a string is computed as
	    // s[0] * 31 ^ (n - 1) + s[1] * 31 ^ (n - 2) + ... + s[n - 1],
	    // where s[i] is the ith character of the string and n is the length of
	    // the string. We "mod" the result to make it between 0 (inclusive) and 2^31
	    // (exclusive) by dropping high bits.
	    var hash = 0;
	    for (var ii = 0; ii < string.length; ii++) {
	      hash = 31 * hash + string.charCodeAt(ii) | 0;
	    }
	    return smi(hash);
	  }

	  function hashJSObj(obj) {
	    var hash;
	    if (usingWeakMap) {
	      hash = weakMap.get(obj);
	      if (hash !== undefined) {
	        return hash;
	      }
	    }

	    hash = obj[UID_HASH_KEY];
	    if (hash !== undefined) {
	      return hash;
	    }

	    if (!canDefineProperty) {
	      hash = obj.propertyIsEnumerable && obj.propertyIsEnumerable[UID_HASH_KEY];
	      if (hash !== undefined) {
	        return hash;
	      }

	      hash = getIENodeHash(obj);
	      if (hash !== undefined) {
	        return hash;
	      }
	    }

	    hash = ++objHashUID;
	    if (objHashUID & 0x40000000) {
	      objHashUID = 0;
	    }

	    if (usingWeakMap) {
	      weakMap.set(obj, hash);
	    } else if (isExtensible !== undefined && isExtensible(obj) === false) {
	      throw new Error('Non-extensible objects are not allowed as keys.');
	    } else if (canDefineProperty) {
	      Object.defineProperty(obj, UID_HASH_KEY, {
	        'enumerable': false,
	        'configurable': false,
	        'writable': false,
	        'value': hash
	      });
	    } else if (obj.propertyIsEnumerable !== undefined &&
	               obj.propertyIsEnumerable === obj.constructor.prototype.propertyIsEnumerable) {
	      // Since we can't define a non-enumerable property on the object
	      // we'll hijack one of the less-used non-enumerable properties to
	      // save our hash on it. Since this is a function it will not show up in
	      // `JSON.stringify` which is what we want.
	      obj.propertyIsEnumerable = function() {
	        return this.constructor.prototype.propertyIsEnumerable.apply(this, arguments);
	      };
	      obj.propertyIsEnumerable[UID_HASH_KEY] = hash;
	    } else if (obj.nodeType !== undefined) {
	      // At this point we couldn't get the IE `uniqueID` to use as a hash
	      // and we couldn't use a non-enumerable property to exploit the
	      // dontEnum bug so we simply add the `UID_HASH_KEY` on the node
	      // itself.
	      obj[UID_HASH_KEY] = hash;
	    } else {
	      throw new Error('Unable to set a non-enumerable property on object.');
	    }

	    return hash;
	  }

	  // Get references to ES5 object methods.
	  var isExtensible = Object.isExtensible;

	  // True if Object.defineProperty works as expected. IE8 fails this test.
	  var canDefineProperty = (function() {
	    try {
	      Object.defineProperty({}, '@', {});
	      return true;
	    } catch (e) {
	      return false;
	    }
	  }());

	  // IE has a `uniqueID` property on DOM nodes. We can construct the hash from it
	  // and avoid memory leaks from the IE cloneNode bug.
	  function getIENodeHash(node) {
	    if (node && node.nodeType > 0) {
	      switch (node.nodeType) {
	        case 1: // Element
	          return node.uniqueID;
	        case 9: // Document
	          return node.documentElement && node.documentElement.uniqueID;
	      }
	    }
	  }

	  // If possible, use a WeakMap.
	  var usingWeakMap = typeof WeakMap === 'function';
	  var weakMap;
	  if (usingWeakMap) {
	    weakMap = new WeakMap();
	  }

	  var objHashUID = 0;

	  var UID_HASH_KEY = '__immutablehash__';
	  if (typeof Symbol === 'function') {
	    UID_HASH_KEY = Symbol(UID_HASH_KEY);
	  }

	  var STRING_HASH_CACHE_MIN_STRLEN = 16;
	  var STRING_HASH_CACHE_MAX_SIZE = 255;
	  var STRING_HASH_CACHE_SIZE = 0;
	  var stringHashCache = {};

	  function assertNotInfinite(size) {
	    invariant(
	      size !== Infinity,
	      'Cannot perform this action with an infinite size.'
	    );
	  }

	  createClass(Map, KeyedCollection);

	    // @pragma Construction

	    function Map(value) {
	      return value === null || value === undefined ? emptyMap() :
	        isMap(value) && !isOrdered(value) ? value :
	        emptyMap().withMutations(function(map ) {
	          var iter = KeyedIterable(value);
	          assertNotInfinite(iter.size);
	          iter.forEach(function(v, k)  {return map.set(k, v)});
	        });
	    }

	    Map.of = function() {var keyValues = SLICE$0.call(arguments, 0);
	      return emptyMap().withMutations(function(map ) {
	        for (var i = 0; i < keyValues.length; i += 2) {
	          if (i + 1 >= keyValues.length) {
	            throw new Error('Missing value for key: ' + keyValues[i]);
	          }
	          map.set(keyValues[i], keyValues[i + 1]);
	        }
	      });
	    };

	    Map.prototype.toString = function() {
	      return this.__toString('Map {', '}');
	    };

	    // @pragma Access

	    Map.prototype.get = function(k, notSetValue) {
	      return this._root ?
	        this._root.get(0, undefined, k, notSetValue) :
	        notSetValue;
	    };

	    // @pragma Modification

	    Map.prototype.set = function(k, v) {
	      return updateMap(this, k, v);
	    };

	    Map.prototype.setIn = function(keyPath, v) {
	      return this.updateIn(keyPath, NOT_SET, function()  {return v});
	    };

	    Map.prototype.remove = function(k) {
	      return updateMap(this, k, NOT_SET);
	    };

	    Map.prototype.deleteIn = function(keyPath) {
	      return this.updateIn(keyPath, function()  {return NOT_SET});
	    };

	    Map.prototype.update = function(k, notSetValue, updater) {
	      return arguments.length === 1 ?
	        k(this) :
	        this.updateIn([k], notSetValue, updater);
	    };

	    Map.prototype.updateIn = function(keyPath, notSetValue, updater) {
	      if (!updater) {
	        updater = notSetValue;
	        notSetValue = undefined;
	      }
	      var updatedValue = updateInDeepMap(
	        this,
	        forceIterator(keyPath),
	        notSetValue,
	        updater
	      );
	      return updatedValue === NOT_SET ? undefined : updatedValue;
	    };

	    Map.prototype.clear = function() {
	      if (this.size === 0) {
	        return this;
	      }
	      if (this.__ownerID) {
	        this.size = 0;
	        this._root = null;
	        this.__hash = undefined;
	        this.__altered = true;
	        return this;
	      }
	      return emptyMap();
	    };

	    // @pragma Composition

	    Map.prototype.merge = function(/*...iters*/) {
	      return mergeIntoMapWith(this, undefined, arguments);
	    };

	    Map.prototype.mergeWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
	      return mergeIntoMapWith(this, merger, iters);
	    };

	    Map.prototype.mergeIn = function(keyPath) {var iters = SLICE$0.call(arguments, 1);
	      return this.updateIn(
	        keyPath,
	        emptyMap(),
	        function(m ) {return typeof m.merge === 'function' ?
	          m.merge.apply(m, iters) :
	          iters[iters.length - 1]}
	      );
	    };

	    Map.prototype.mergeDeep = function(/*...iters*/) {
	      return mergeIntoMapWith(this, deepMerger, arguments);
	    };

	    Map.prototype.mergeDeepWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
	      return mergeIntoMapWith(this, deepMergerWith(merger), iters);
	    };

	    Map.prototype.mergeDeepIn = function(keyPath) {var iters = SLICE$0.call(arguments, 1);
	      return this.updateIn(
	        keyPath,
	        emptyMap(),
	        function(m ) {return typeof m.mergeDeep === 'function' ?
	          m.mergeDeep.apply(m, iters) :
	          iters[iters.length - 1]}
	      );
	    };

	    Map.prototype.sort = function(comparator) {
	      // Late binding
	      return OrderedMap(sortFactory(this, comparator));
	    };

	    Map.prototype.sortBy = function(mapper, comparator) {
	      // Late binding
	      return OrderedMap(sortFactory(this, comparator, mapper));
	    };

	    // @pragma Mutability

	    Map.prototype.withMutations = function(fn) {
	      var mutable = this.asMutable();
	      fn(mutable);
	      return mutable.wasAltered() ? mutable.__ensureOwner(this.__ownerID) : this;
	    };

	    Map.prototype.asMutable = function() {
	      return this.__ownerID ? this : this.__ensureOwner(new OwnerID());
	    };

	    Map.prototype.asImmutable = function() {
	      return this.__ensureOwner();
	    };

	    Map.prototype.wasAltered = function() {
	      return this.__altered;
	    };

	    Map.prototype.__iterator = function(type, reverse) {
	      return new MapIterator(this, type, reverse);
	    };

	    Map.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      var iterations = 0;
	      this._root && this._root.iterate(function(entry ) {
	        iterations++;
	        return fn(entry[1], entry[0], this$0);
	      }, reverse);
	      return iterations;
	    };

	    Map.prototype.__ensureOwner = function(ownerID) {
	      if (ownerID === this.__ownerID) {
	        return this;
	      }
	      if (!ownerID) {
	        this.__ownerID = ownerID;
	        this.__altered = false;
	        return this;
	      }
	      return makeMap(this.size, this._root, ownerID, this.__hash);
	    };


	  function isMap(maybeMap) {
	    return !!(maybeMap && maybeMap[IS_MAP_SENTINEL]);
	  }

	  Map.isMap = isMap;

	  var IS_MAP_SENTINEL = '@@__IMMUTABLE_MAP__@@';

	  var MapPrototype = Map.prototype;
	  MapPrototype[IS_MAP_SENTINEL] = true;
	  MapPrototype[DELETE] = MapPrototype.remove;
	  MapPrototype.removeIn = MapPrototype.deleteIn;


	  // #pragma Trie Nodes



	    function ArrayMapNode(ownerID, entries) {
	      this.ownerID = ownerID;
	      this.entries = entries;
	    }

	    ArrayMapNode.prototype.get = function(shift, keyHash, key, notSetValue) {
	      var entries = this.entries;
	      for (var ii = 0, len = entries.length; ii < len; ii++) {
	        if (is(key, entries[ii][0])) {
	          return entries[ii][1];
	        }
	      }
	      return notSetValue;
	    };

	    ArrayMapNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	      var removed = value === NOT_SET;

	      var entries = this.entries;
	      var idx = 0;
	      for (var len = entries.length; idx < len; idx++) {
	        if (is(key, entries[idx][0])) {
	          break;
	        }
	      }
	      var exists = idx < len;

	      if (exists ? entries[idx][1] === value : removed) {
	        return this;
	      }

	      SetRef(didAlter);
	      (removed || !exists) && SetRef(didChangeSize);

	      if (removed && entries.length === 1) {
	        return; // undefined
	      }

	      if (!exists && !removed && entries.length >= MAX_ARRAY_MAP_SIZE) {
	        return createNodes(ownerID, entries, key, value);
	      }

	      var isEditable = ownerID && ownerID === this.ownerID;
	      var newEntries = isEditable ? entries : arrCopy(entries);

	      if (exists) {
	        if (removed) {
	          idx === len - 1 ? newEntries.pop() : (newEntries[idx] = newEntries.pop());
	        } else {
	          newEntries[idx] = [key, value];
	        }
	      } else {
	        newEntries.push([key, value]);
	      }

	      if (isEditable) {
	        this.entries = newEntries;
	        return this;
	      }

	      return new ArrayMapNode(ownerID, newEntries);
	    };




	    function BitmapIndexedNode(ownerID, bitmap, nodes) {
	      this.ownerID = ownerID;
	      this.bitmap = bitmap;
	      this.nodes = nodes;
	    }

	    BitmapIndexedNode.prototype.get = function(shift, keyHash, key, notSetValue) {
	      if (keyHash === undefined) {
	        keyHash = hash(key);
	      }
	      var bit = (1 << ((shift === 0 ? keyHash : keyHash >>> shift) & MASK));
	      var bitmap = this.bitmap;
	      return (bitmap & bit) === 0 ? notSetValue :
	        this.nodes[popCount(bitmap & (bit - 1))].get(shift + SHIFT, keyHash, key, notSetValue);
	    };

	    BitmapIndexedNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	      if (keyHash === undefined) {
	        keyHash = hash(key);
	      }
	      var keyHashFrag = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
	      var bit = 1 << keyHashFrag;
	      var bitmap = this.bitmap;
	      var exists = (bitmap & bit) !== 0;

	      if (!exists && value === NOT_SET) {
	        return this;
	      }

	      var idx = popCount(bitmap & (bit - 1));
	      var nodes = this.nodes;
	      var node = exists ? nodes[idx] : undefined;
	      var newNode = updateNode(node, ownerID, shift + SHIFT, keyHash, key, value, didChangeSize, didAlter);

	      if (newNode === node) {
	        return this;
	      }

	      if (!exists && newNode && nodes.length >= MAX_BITMAP_INDEXED_SIZE) {
	        return expandNodes(ownerID, nodes, bitmap, keyHashFrag, newNode);
	      }

	      if (exists && !newNode && nodes.length === 2 && isLeafNode(nodes[idx ^ 1])) {
	        return nodes[idx ^ 1];
	      }

	      if (exists && newNode && nodes.length === 1 && isLeafNode(newNode)) {
	        return newNode;
	      }

	      var isEditable = ownerID && ownerID === this.ownerID;
	      var newBitmap = exists ? newNode ? bitmap : bitmap ^ bit : bitmap | bit;
	      var newNodes = exists ? newNode ?
	        setIn(nodes, idx, newNode, isEditable) :
	        spliceOut(nodes, idx, isEditable) :
	        spliceIn(nodes, idx, newNode, isEditable);

	      if (isEditable) {
	        this.bitmap = newBitmap;
	        this.nodes = newNodes;
	        return this;
	      }

	      return new BitmapIndexedNode(ownerID, newBitmap, newNodes);
	    };




	    function HashArrayMapNode(ownerID, count, nodes) {
	      this.ownerID = ownerID;
	      this.count = count;
	      this.nodes = nodes;
	    }

	    HashArrayMapNode.prototype.get = function(shift, keyHash, key, notSetValue) {
	      if (keyHash === undefined) {
	        keyHash = hash(key);
	      }
	      var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
	      var node = this.nodes[idx];
	      return node ? node.get(shift + SHIFT, keyHash, key, notSetValue) : notSetValue;
	    };

	    HashArrayMapNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	      if (keyHash === undefined) {
	        keyHash = hash(key);
	      }
	      var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
	      var removed = value === NOT_SET;
	      var nodes = this.nodes;
	      var node = nodes[idx];

	      if (removed && !node) {
	        return this;
	      }

	      var newNode = updateNode(node, ownerID, shift + SHIFT, keyHash, key, value, didChangeSize, didAlter);
	      if (newNode === node) {
	        return this;
	      }

	      var newCount = this.count;
	      if (!node) {
	        newCount++;
	      } else if (!newNode) {
	        newCount--;
	        if (newCount < MIN_HASH_ARRAY_MAP_SIZE) {
	          return packNodes(ownerID, nodes, newCount, idx);
	        }
	      }

	      var isEditable = ownerID && ownerID === this.ownerID;
	      var newNodes = setIn(nodes, idx, newNode, isEditable);

	      if (isEditable) {
	        this.count = newCount;
	        this.nodes = newNodes;
	        return this;
	      }

	      return new HashArrayMapNode(ownerID, newCount, newNodes);
	    };




	    function HashCollisionNode(ownerID, keyHash, entries) {
	      this.ownerID = ownerID;
	      this.keyHash = keyHash;
	      this.entries = entries;
	    }

	    HashCollisionNode.prototype.get = function(shift, keyHash, key, notSetValue) {
	      var entries = this.entries;
	      for (var ii = 0, len = entries.length; ii < len; ii++) {
	        if (is(key, entries[ii][0])) {
	          return entries[ii][1];
	        }
	      }
	      return notSetValue;
	    };

	    HashCollisionNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	      if (keyHash === undefined) {
	        keyHash = hash(key);
	      }

	      var removed = value === NOT_SET;

	      if (keyHash !== this.keyHash) {
	        if (removed) {
	          return this;
	        }
	        SetRef(didAlter);
	        SetRef(didChangeSize);
	        return mergeIntoNode(this, ownerID, shift, keyHash, [key, value]);
	      }

	      var entries = this.entries;
	      var idx = 0;
	      for (var len = entries.length; idx < len; idx++) {
	        if (is(key, entries[idx][0])) {
	          break;
	        }
	      }
	      var exists = idx < len;

	      if (exists ? entries[idx][1] === value : removed) {
	        return this;
	      }

	      SetRef(didAlter);
	      (removed || !exists) && SetRef(didChangeSize);

	      if (removed && len === 2) {
	        return new ValueNode(ownerID, this.keyHash, entries[idx ^ 1]);
	      }

	      var isEditable = ownerID && ownerID === this.ownerID;
	      var newEntries = isEditable ? entries : arrCopy(entries);

	      if (exists) {
	        if (removed) {
	          idx === len - 1 ? newEntries.pop() : (newEntries[idx] = newEntries.pop());
	        } else {
	          newEntries[idx] = [key, value];
	        }
	      } else {
	        newEntries.push([key, value]);
	      }

	      if (isEditable) {
	        this.entries = newEntries;
	        return this;
	      }

	      return new HashCollisionNode(ownerID, this.keyHash, newEntries);
	    };




	    function ValueNode(ownerID, keyHash, entry) {
	      this.ownerID = ownerID;
	      this.keyHash = keyHash;
	      this.entry = entry;
	    }

	    ValueNode.prototype.get = function(shift, keyHash, key, notSetValue) {
	      return is(key, this.entry[0]) ? this.entry[1] : notSetValue;
	    };

	    ValueNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	      var removed = value === NOT_SET;
	      var keyMatch = is(key, this.entry[0]);
	      if (keyMatch ? value === this.entry[1] : removed) {
	        return this;
	      }

	      SetRef(didAlter);

	      if (removed) {
	        SetRef(didChangeSize);
	        return; // undefined
	      }

	      if (keyMatch) {
	        if (ownerID && ownerID === this.ownerID) {
	          this.entry[1] = value;
	          return this;
	        }
	        return new ValueNode(ownerID, this.keyHash, [key, value]);
	      }

	      SetRef(didChangeSize);
	      return mergeIntoNode(this, ownerID, shift, hash(key), [key, value]);
	    };



	  // #pragma Iterators

	  ArrayMapNode.prototype.iterate =
	  HashCollisionNode.prototype.iterate = function (fn, reverse) {
	    var entries = this.entries;
	    for (var ii = 0, maxIndex = entries.length - 1; ii <= maxIndex; ii++) {
	      if (fn(entries[reverse ? maxIndex - ii : ii]) === false) {
	        return false;
	      }
	    }
	  }

	  BitmapIndexedNode.prototype.iterate =
	  HashArrayMapNode.prototype.iterate = function (fn, reverse) {
	    var nodes = this.nodes;
	    for (var ii = 0, maxIndex = nodes.length - 1; ii <= maxIndex; ii++) {
	      var node = nodes[reverse ? maxIndex - ii : ii];
	      if (node && node.iterate(fn, reverse) === false) {
	        return false;
	      }
	    }
	  }

	  ValueNode.prototype.iterate = function (fn, reverse) {
	    return fn(this.entry);
	  }

	  createClass(MapIterator, Iterator);

	    function MapIterator(map, type, reverse) {
	      this._type = type;
	      this._reverse = reverse;
	      this._stack = map._root && mapIteratorFrame(map._root);
	    }

	    MapIterator.prototype.next = function() {
	      var type = this._type;
	      var stack = this._stack;
	      while (stack) {
	        var node = stack.node;
	        var index = stack.index++;
	        var maxIndex;
	        if (node.entry) {
	          if (index === 0) {
	            return mapIteratorValue(type, node.entry);
	          }
	        } else if (node.entries) {
	          maxIndex = node.entries.length - 1;
	          if (index <= maxIndex) {
	            return mapIteratorValue(type, node.entries[this._reverse ? maxIndex - index : index]);
	          }
	        } else {
	          maxIndex = node.nodes.length - 1;
	          if (index <= maxIndex) {
	            var subNode = node.nodes[this._reverse ? maxIndex - index : index];
	            if (subNode) {
	              if (subNode.entry) {
	                return mapIteratorValue(type, subNode.entry);
	              }
	              stack = this._stack = mapIteratorFrame(subNode, stack);
	            }
	            continue;
	          }
	        }
	        stack = this._stack = this._stack.__prev;
	      }
	      return iteratorDone();
	    };


	  function mapIteratorValue(type, entry) {
	    return iteratorValue(type, entry[0], entry[1]);
	  }

	  function mapIteratorFrame(node, prev) {
	    return {
	      node: node,
	      index: 0,
	      __prev: prev
	    };
	  }

	  function makeMap(size, root, ownerID, hash) {
	    var map = Object.create(MapPrototype);
	    map.size = size;
	    map._root = root;
	    map.__ownerID = ownerID;
	    map.__hash = hash;
	    map.__altered = false;
	    return map;
	  }

	  var EMPTY_MAP;
	  function emptyMap() {
	    return EMPTY_MAP || (EMPTY_MAP = makeMap(0));
	  }

	  function updateMap(map, k, v) {
	    var newRoot;
	    var newSize;
	    if (!map._root) {
	      if (v === NOT_SET) {
	        return map;
	      }
	      newSize = 1;
	      newRoot = new ArrayMapNode(map.__ownerID, [[k, v]]);
	    } else {
	      var didChangeSize = MakeRef(CHANGE_LENGTH);
	      var didAlter = MakeRef(DID_ALTER);
	      newRoot = updateNode(map._root, map.__ownerID, 0, undefined, k, v, didChangeSize, didAlter);
	      if (!didAlter.value) {
	        return map;
	      }
	      newSize = map.size + (didChangeSize.value ? v === NOT_SET ? -1 : 1 : 0);
	    }
	    if (map.__ownerID) {
	      map.size = newSize;
	      map._root = newRoot;
	      map.__hash = undefined;
	      map.__altered = true;
	      return map;
	    }
	    return newRoot ? makeMap(newSize, newRoot) : emptyMap();
	  }

	  function updateNode(node, ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	    if (!node) {
	      if (value === NOT_SET) {
	        return node;
	      }
	      SetRef(didAlter);
	      SetRef(didChangeSize);
	      return new ValueNode(ownerID, keyHash, [key, value]);
	    }
	    return node.update(ownerID, shift, keyHash, key, value, didChangeSize, didAlter);
	  }

	  function isLeafNode(node) {
	    return node.constructor === ValueNode || node.constructor === HashCollisionNode;
	  }

	  function mergeIntoNode(node, ownerID, shift, keyHash, entry) {
	    if (node.keyHash === keyHash) {
	      return new HashCollisionNode(ownerID, keyHash, [node.entry, entry]);
	    }

	    var idx1 = (shift === 0 ? node.keyHash : node.keyHash >>> shift) & MASK;
	    var idx2 = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;

	    var newNode;
	    var nodes = idx1 === idx2 ?
	      [mergeIntoNode(node, ownerID, shift + SHIFT, keyHash, entry)] :
	      ((newNode = new ValueNode(ownerID, keyHash, entry)), idx1 < idx2 ? [node, newNode] : [newNode, node]);

	    return new BitmapIndexedNode(ownerID, (1 << idx1) | (1 << idx2), nodes);
	  }

	  function createNodes(ownerID, entries, key, value) {
	    if (!ownerID) {
	      ownerID = new OwnerID();
	    }
	    var node = new ValueNode(ownerID, hash(key), [key, value]);
	    for (var ii = 0; ii < entries.length; ii++) {
	      var entry = entries[ii];
	      node = node.update(ownerID, 0, undefined, entry[0], entry[1]);
	    }
	    return node;
	  }

	  function packNodes(ownerID, nodes, count, excluding) {
	    var bitmap = 0;
	    var packedII = 0;
	    var packedNodes = new Array(count);
	    for (var ii = 0, bit = 1, len = nodes.length; ii < len; ii++, bit <<= 1) {
	      var node = nodes[ii];
	      if (node !== undefined && ii !== excluding) {
	        bitmap |= bit;
	        packedNodes[packedII++] = node;
	      }
	    }
	    return new BitmapIndexedNode(ownerID, bitmap, packedNodes);
	  }

	  function expandNodes(ownerID, nodes, bitmap, including, node) {
	    var count = 0;
	    var expandedNodes = new Array(SIZE);
	    for (var ii = 0; bitmap !== 0; ii++, bitmap >>>= 1) {
	      expandedNodes[ii] = bitmap & 1 ? nodes[count++] : undefined;
	    }
	    expandedNodes[including] = node;
	    return new HashArrayMapNode(ownerID, count + 1, expandedNodes);
	  }

	  function mergeIntoMapWith(map, merger, iterables) {
	    var iters = [];
	    for (var ii = 0; ii < iterables.length; ii++) {
	      var value = iterables[ii];
	      var iter = KeyedIterable(value);
	      if (!isIterable(value)) {
	        iter = iter.map(function(v ) {return fromJS(v)});
	      }
	      iters.push(iter);
	    }
	    return mergeIntoCollectionWith(map, merger, iters);
	  }

	  function deepMerger(existing, value, key) {
	    return existing && existing.mergeDeep && isIterable(value) ?
	      existing.mergeDeep(value) :
	      is(existing, value) ? existing : value;
	  }

	  function deepMergerWith(merger) {
	    return function(existing, value, key)  {
	      if (existing && existing.mergeDeepWith && isIterable(value)) {
	        return existing.mergeDeepWith(merger, value);
	      }
	      var nextValue = merger(existing, value, key);
	      return is(existing, nextValue) ? existing : nextValue;
	    };
	  }

	  function mergeIntoCollectionWith(collection, merger, iters) {
	    iters = iters.filter(function(x ) {return x.size !== 0});
	    if (iters.length === 0) {
	      return collection;
	    }
	    if (collection.size === 0 && !collection.__ownerID && iters.length === 1) {
	      return collection.constructor(iters[0]);
	    }
	    return collection.withMutations(function(collection ) {
	      var mergeIntoMap = merger ?
	        function(value, key)  {
	          collection.update(key, NOT_SET, function(existing )
	            {return existing === NOT_SET ? value : merger(existing, value, key)}
	          );
	        } :
	        function(value, key)  {
	          collection.set(key, value);
	        }
	      for (var ii = 0; ii < iters.length; ii++) {
	        iters[ii].forEach(mergeIntoMap);
	      }
	    });
	  }

	  function updateInDeepMap(existing, keyPathIter, notSetValue, updater) {
	    var isNotSet = existing === NOT_SET;
	    var step = keyPathIter.next();
	    if (step.done) {
	      var existingValue = isNotSet ? notSetValue : existing;
	      var newValue = updater(existingValue);
	      return newValue === existingValue ? existing : newValue;
	    }
	    invariant(
	      isNotSet || (existing && existing.set),
	      'invalid keyPath'
	    );
	    var key = step.value;
	    var nextExisting = isNotSet ? NOT_SET : existing.get(key, NOT_SET);
	    var nextUpdated = updateInDeepMap(
	      nextExisting,
	      keyPathIter,
	      notSetValue,
	      updater
	    );
	    return nextUpdated === nextExisting ? existing :
	      nextUpdated === NOT_SET ? existing.remove(key) :
	      (isNotSet ? emptyMap() : existing).set(key, nextUpdated);
	  }

	  function popCount(x) {
	    x = x - ((x >> 1) & 0x55555555);
	    x = (x & 0x33333333) + ((x >> 2) & 0x33333333);
	    x = (x + (x >> 4)) & 0x0f0f0f0f;
	    x = x + (x >> 8);
	    x = x + (x >> 16);
	    return x & 0x7f;
	  }

	  function setIn(array, idx, val, canEdit) {
	    var newArray = canEdit ? array : arrCopy(array);
	    newArray[idx] = val;
	    return newArray;
	  }

	  function spliceIn(array, idx, val, canEdit) {
	    var newLen = array.length + 1;
	    if (canEdit && idx + 1 === newLen) {
	      array[idx] = val;
	      return array;
	    }
	    var newArray = new Array(newLen);
	    var after = 0;
	    for (var ii = 0; ii < newLen; ii++) {
	      if (ii === idx) {
	        newArray[ii] = val;
	        after = -1;
	      } else {
	        newArray[ii] = array[ii + after];
	      }
	    }
	    return newArray;
	  }

	  function spliceOut(array, idx, canEdit) {
	    var newLen = array.length - 1;
	    if (canEdit && idx === newLen) {
	      array.pop();
	      return array;
	    }
	    var newArray = new Array(newLen);
	    var after = 0;
	    for (var ii = 0; ii < newLen; ii++) {
	      if (ii === idx) {
	        after = 1;
	      }
	      newArray[ii] = array[ii + after];
	    }
	    return newArray;
	  }

	  var MAX_ARRAY_MAP_SIZE = SIZE / 4;
	  var MAX_BITMAP_INDEXED_SIZE = SIZE / 2;
	  var MIN_HASH_ARRAY_MAP_SIZE = SIZE / 4;

	  createClass(List, IndexedCollection);

	    // @pragma Construction

	    function List(value) {
	      var empty = emptyList();
	      if (value === null || value === undefined) {
	        return empty;
	      }
	      if (isList(value)) {
	        return value;
	      }
	      var iter = IndexedIterable(value);
	      var size = iter.size;
	      if (size === 0) {
	        return empty;
	      }
	      assertNotInfinite(size);
	      if (size > 0 && size < SIZE) {
	        return makeList(0, size, SHIFT, null, new VNode(iter.toArray()));
	      }
	      return empty.withMutations(function(list ) {
	        list.setSize(size);
	        iter.forEach(function(v, i)  {return list.set(i, v)});
	      });
	    }

	    List.of = function(/*...values*/) {
	      return this(arguments);
	    };

	    List.prototype.toString = function() {
	      return this.__toString('List [', ']');
	    };

	    // @pragma Access

	    List.prototype.get = function(index, notSetValue) {
	      index = wrapIndex(this, index);
	      if (index >= 0 && index < this.size) {
	        index += this._origin;
	        var node = listNodeFor(this, index);
	        return node && node.array[index & MASK];
	      }
	      return notSetValue;
	    };

	    // @pragma Modification

	    List.prototype.set = function(index, value) {
	      return updateList(this, index, value);
	    };

	    List.prototype.remove = function(index) {
	      return !this.has(index) ? this :
	        index === 0 ? this.shift() :
	        index === this.size - 1 ? this.pop() :
	        this.splice(index, 1);
	    };

	    List.prototype.insert = function(index, value) {
	      return this.splice(index, 0, value);
	    };

	    List.prototype.clear = function() {
	      if (this.size === 0) {
	        return this;
	      }
	      if (this.__ownerID) {
	        this.size = this._origin = this._capacity = 0;
	        this._level = SHIFT;
	        this._root = this._tail = null;
	        this.__hash = undefined;
	        this.__altered = true;
	        return this;
	      }
	      return emptyList();
	    };

	    List.prototype.push = function(/*...values*/) {
	      var values = arguments;
	      var oldSize = this.size;
	      return this.withMutations(function(list ) {
	        setListBounds(list, 0, oldSize + values.length);
	        for (var ii = 0; ii < values.length; ii++) {
	          list.set(oldSize + ii, values[ii]);
	        }
	      });
	    };

	    List.prototype.pop = function() {
	      return setListBounds(this, 0, -1);
	    };

	    List.prototype.unshift = function(/*...values*/) {
	      var values = arguments;
	      return this.withMutations(function(list ) {
	        setListBounds(list, -values.length);
	        for (var ii = 0; ii < values.length; ii++) {
	          list.set(ii, values[ii]);
	        }
	      });
	    };

	    List.prototype.shift = function() {
	      return setListBounds(this, 1);
	    };

	    // @pragma Composition

	    List.prototype.merge = function(/*...iters*/) {
	      return mergeIntoListWith(this, undefined, arguments);
	    };

	    List.prototype.mergeWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
	      return mergeIntoListWith(this, merger, iters);
	    };

	    List.prototype.mergeDeep = function(/*...iters*/) {
	      return mergeIntoListWith(this, deepMerger, arguments);
	    };

	    List.prototype.mergeDeepWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
	      return mergeIntoListWith(this, deepMergerWith(merger), iters);
	    };

	    List.prototype.setSize = function(size) {
	      return setListBounds(this, 0, size);
	    };

	    // @pragma Iteration

	    List.prototype.slice = function(begin, end) {
	      var size = this.size;
	      if (wholeSlice(begin, end, size)) {
	        return this;
	      }
	      return setListBounds(
	        this,
	        resolveBegin(begin, size),
	        resolveEnd(end, size)
	      );
	    };

	    List.prototype.__iterator = function(type, reverse) {
	      var index = 0;
	      var values = iterateList(this, reverse);
	      return new Iterator(function()  {
	        var value = values();
	        return value === DONE ?
	          iteratorDone() :
	          iteratorValue(type, index++, value);
	      });
	    };

	    List.prototype.__iterate = function(fn, reverse) {
	      var index = 0;
	      var values = iterateList(this, reverse);
	      var value;
	      while ((value = values()) !== DONE) {
	        if (fn(value, index++, this) === false) {
	          break;
	        }
	      }
	      return index;
	    };

	    List.prototype.__ensureOwner = function(ownerID) {
	      if (ownerID === this.__ownerID) {
	        return this;
	      }
	      if (!ownerID) {
	        this.__ownerID = ownerID;
	        return this;
	      }
	      return makeList(this._origin, this._capacity, this._level, this._root, this._tail, ownerID, this.__hash);
	    };


	  function isList(maybeList) {
	    return !!(maybeList && maybeList[IS_LIST_SENTINEL]);
	  }

	  List.isList = isList;

	  var IS_LIST_SENTINEL = '@@__IMMUTABLE_LIST__@@';

	  var ListPrototype = List.prototype;
	  ListPrototype[IS_LIST_SENTINEL] = true;
	  ListPrototype[DELETE] = ListPrototype.remove;
	  ListPrototype.setIn = MapPrototype.setIn;
	  ListPrototype.deleteIn =
	  ListPrototype.removeIn = MapPrototype.removeIn;
	  ListPrototype.update = MapPrototype.update;
	  ListPrototype.updateIn = MapPrototype.updateIn;
	  ListPrototype.mergeIn = MapPrototype.mergeIn;
	  ListPrototype.mergeDeepIn = MapPrototype.mergeDeepIn;
	  ListPrototype.withMutations = MapPrototype.withMutations;
	  ListPrototype.asMutable = MapPrototype.asMutable;
	  ListPrototype.asImmutable = MapPrototype.asImmutable;
	  ListPrototype.wasAltered = MapPrototype.wasAltered;



	    function VNode(array, ownerID) {
	      this.array = array;
	      this.ownerID = ownerID;
	    }

	    // TODO: seems like these methods are very similar

	    VNode.prototype.removeBefore = function(ownerID, level, index) {
	      if (index === level ? 1 << level : 0 || this.array.length === 0) {
	        return this;
	      }
	      var originIndex = (index >>> level) & MASK;
	      if (originIndex >= this.array.length) {
	        return new VNode([], ownerID);
	      }
	      var removingFirst = originIndex === 0;
	      var newChild;
	      if (level > 0) {
	        var oldChild = this.array[originIndex];
	        newChild = oldChild && oldChild.removeBefore(ownerID, level - SHIFT, index);
	        if (newChild === oldChild && removingFirst) {
	          return this;
	        }
	      }
	      if (removingFirst && !newChild) {
	        return this;
	      }
	      var editable = editableVNode(this, ownerID);
	      if (!removingFirst) {
	        for (var ii = 0; ii < originIndex; ii++) {
	          editable.array[ii] = undefined;
	        }
	      }
	      if (newChild) {
	        editable.array[originIndex] = newChild;
	      }
	      return editable;
	    };

	    VNode.prototype.removeAfter = function(ownerID, level, index) {
	      if (index === (level ? 1 << level : 0) || this.array.length === 0) {
	        return this;
	      }
	      var sizeIndex = ((index - 1) >>> level) & MASK;
	      if (sizeIndex >= this.array.length) {
	        return this;
	      }

	      var newChild;
	      if (level > 0) {
	        var oldChild = this.array[sizeIndex];
	        newChild = oldChild && oldChild.removeAfter(ownerID, level - SHIFT, index);
	        if (newChild === oldChild && sizeIndex === this.array.length - 1) {
	          return this;
	        }
	      }

	      var editable = editableVNode(this, ownerID);
	      editable.array.splice(sizeIndex + 1);
	      if (newChild) {
	        editable.array[sizeIndex] = newChild;
	      }
	      return editable;
	    };



	  var DONE = {};

	  function iterateList(list, reverse) {
	    var left = list._origin;
	    var right = list._capacity;
	    var tailPos = getTailOffset(right);
	    var tail = list._tail;

	    return iterateNodeOrLeaf(list._root, list._level, 0);

	    function iterateNodeOrLeaf(node, level, offset) {
	      return level === 0 ?
	        iterateLeaf(node, offset) :
	        iterateNode(node, level, offset);
	    }

	    function iterateLeaf(node, offset) {
	      var array = offset === tailPos ? tail && tail.array : node && node.array;
	      var from = offset > left ? 0 : left - offset;
	      var to = right - offset;
	      if (to > SIZE) {
	        to = SIZE;
	      }
	      return function()  {
	        if (from === to) {
	          return DONE;
	        }
	        var idx = reverse ? --to : from++;
	        return array && array[idx];
	      };
	    }

	    function iterateNode(node, level, offset) {
	      var values;
	      var array = node && node.array;
	      var from = offset > left ? 0 : (left - offset) >> level;
	      var to = ((right - offset) >> level) + 1;
	      if (to > SIZE) {
	        to = SIZE;
	      }
	      return function()  {
	        do {
	          if (values) {
	            var value = values();
	            if (value !== DONE) {
	              return value;
	            }
	            values = null;
	          }
	          if (from === to) {
	            return DONE;
	          }
	          var idx = reverse ? --to : from++;
	          values = iterateNodeOrLeaf(
	            array && array[idx], level - SHIFT, offset + (idx << level)
	          );
	        } while (true);
	      };
	    }
	  }

	  function makeList(origin, capacity, level, root, tail, ownerID, hash) {
	    var list = Object.create(ListPrototype);
	    list.size = capacity - origin;
	    list._origin = origin;
	    list._capacity = capacity;
	    list._level = level;
	    list._root = root;
	    list._tail = tail;
	    list.__ownerID = ownerID;
	    list.__hash = hash;
	    list.__altered = false;
	    return list;
	  }

	  var EMPTY_LIST;
	  function emptyList() {
	    return EMPTY_LIST || (EMPTY_LIST = makeList(0, 0, SHIFT));
	  }

	  function updateList(list, index, value) {
	    index = wrapIndex(list, index);

	    if (index !== index) {
	      return list;
	    }

	    if (index >= list.size || index < 0) {
	      return list.withMutations(function(list ) {
	        index < 0 ?
	          setListBounds(list, index).set(0, value) :
	          setListBounds(list, 0, index + 1).set(index, value)
	      });
	    }

	    index += list._origin;

	    var newTail = list._tail;
	    var newRoot = list._root;
	    var didAlter = MakeRef(DID_ALTER);
	    if (index >= getTailOffset(list._capacity)) {
	      newTail = updateVNode(newTail, list.__ownerID, 0, index, value, didAlter);
	    } else {
	      newRoot = updateVNode(newRoot, list.__ownerID, list._level, index, value, didAlter);
	    }

	    if (!didAlter.value) {
	      return list;
	    }

	    if (list.__ownerID) {
	      list._root = newRoot;
	      list._tail = newTail;
	      list.__hash = undefined;
	      list.__altered = true;
	      return list;
	    }
	    return makeList(list._origin, list._capacity, list._level, newRoot, newTail);
	  }

	  function updateVNode(node, ownerID, level, index, value, didAlter) {
	    var idx = (index >>> level) & MASK;
	    var nodeHas = node && idx < node.array.length;
	    if (!nodeHas && value === undefined) {
	      return node;
	    }

	    var newNode;

	    if (level > 0) {
	      var lowerNode = node && node.array[idx];
	      var newLowerNode = updateVNode(lowerNode, ownerID, level - SHIFT, index, value, didAlter);
	      if (newLowerNode === lowerNode) {
	        return node;
	      }
	      newNode = editableVNode(node, ownerID);
	      newNode.array[idx] = newLowerNode;
	      return newNode;
	    }

	    if (nodeHas && node.array[idx] === value) {
	      return node;
	    }

	    SetRef(didAlter);

	    newNode = editableVNode(node, ownerID);
	    if (value === undefined && idx === newNode.array.length - 1) {
	      newNode.array.pop();
	    } else {
	      newNode.array[idx] = value;
	    }
	    return newNode;
	  }

	  function editableVNode(node, ownerID) {
	    if (ownerID && node && ownerID === node.ownerID) {
	      return node;
	    }
	    return new VNode(node ? node.array.slice() : [], ownerID);
	  }

	  function listNodeFor(list, rawIndex) {
	    if (rawIndex >= getTailOffset(list._capacity)) {
	      return list._tail;
	    }
	    if (rawIndex < 1 << (list._level + SHIFT)) {
	      var node = list._root;
	      var level = list._level;
	      while (node && level > 0) {
	        node = node.array[(rawIndex >>> level) & MASK];
	        level -= SHIFT;
	      }
	      return node;
	    }
	  }

	  function setListBounds(list, begin, end) {
	    // Sanitize begin & end using this shorthand for ToInt32(argument)
	    // http://www.ecma-international.org/ecma-262/6.0/#sec-toint32
	    if (begin !== undefined) {
	      begin = begin | 0;
	    }
	    if (end !== undefined) {
	      end = end | 0;
	    }
	    var owner = list.__ownerID || new OwnerID();
	    var oldOrigin = list._origin;
	    var oldCapacity = list._capacity;
	    var newOrigin = oldOrigin + begin;
	    var newCapacity = end === undefined ? oldCapacity : end < 0 ? oldCapacity + end : oldOrigin + end;
	    if (newOrigin === oldOrigin && newCapacity === oldCapacity) {
	      return list;
	    }

	    // If it's going to end after it starts, it's empty.
	    if (newOrigin >= newCapacity) {
	      return list.clear();
	    }

	    var newLevel = list._level;
	    var newRoot = list._root;

	    // New origin might need creating a higher root.
	    var offsetShift = 0;
	    while (newOrigin + offsetShift < 0) {
	      newRoot = new VNode(newRoot && newRoot.array.length ? [undefined, newRoot] : [], owner);
	      newLevel += SHIFT;
	      offsetShift += 1 << newLevel;
	    }
	    if (offsetShift) {
	      newOrigin += offsetShift;
	      oldOrigin += offsetShift;
	      newCapacity += offsetShift;
	      oldCapacity += offsetShift;
	    }

	    var oldTailOffset = getTailOffset(oldCapacity);
	    var newTailOffset = getTailOffset(newCapacity);

	    // New size might need creating a higher root.
	    while (newTailOffset >= 1 << (newLevel + SHIFT)) {
	      newRoot = new VNode(newRoot && newRoot.array.length ? [newRoot] : [], owner);
	      newLevel += SHIFT;
	    }

	    // Locate or create the new tail.
	    var oldTail = list._tail;
	    var newTail = newTailOffset < oldTailOffset ?
	      listNodeFor(list, newCapacity - 1) :
	      newTailOffset > oldTailOffset ? new VNode([], owner) : oldTail;

	    // Merge Tail into tree.
	    if (oldTail && newTailOffset > oldTailOffset && newOrigin < oldCapacity && oldTail.array.length) {
	      newRoot = editableVNode(newRoot, owner);
	      var node = newRoot;
	      for (var level = newLevel; level > SHIFT; level -= SHIFT) {
	        var idx = (oldTailOffset >>> level) & MASK;
	        node = node.array[idx] = editableVNode(node.array[idx], owner);
	      }
	      node.array[(oldTailOffset >>> SHIFT) & MASK] = oldTail;
	    }

	    // If the size has been reduced, there's a chance the tail needs to be trimmed.
	    if (newCapacity < oldCapacity) {
	      newTail = newTail && newTail.removeAfter(owner, 0, newCapacity);
	    }

	    // If the new origin is within the tail, then we do not need a root.
	    if (newOrigin >= newTailOffset) {
	      newOrigin -= newTailOffset;
	      newCapacity -= newTailOffset;
	      newLevel = SHIFT;
	      newRoot = null;
	      newTail = newTail && newTail.removeBefore(owner, 0, newOrigin);

	    // Otherwise, if the root has been trimmed, garbage collect.
	    } else if (newOrigin > oldOrigin || newTailOffset < oldTailOffset) {
	      offsetShift = 0;

	      // Identify the new top root node of the subtree of the old root.
	      while (newRoot) {
	        var beginIndex = (newOrigin >>> newLevel) & MASK;
	        if (beginIndex !== (newTailOffset >>> newLevel) & MASK) {
	          break;
	        }
	        if (beginIndex) {
	          offsetShift += (1 << newLevel) * beginIndex;
	        }
	        newLevel -= SHIFT;
	        newRoot = newRoot.array[beginIndex];
	      }

	      // Trim the new sides of the new root.
	      if (newRoot && newOrigin > oldOrigin) {
	        newRoot = newRoot.removeBefore(owner, newLevel, newOrigin - offsetShift);
	      }
	      if (newRoot && newTailOffset < oldTailOffset) {
	        newRoot = newRoot.removeAfter(owner, newLevel, newTailOffset - offsetShift);
	      }
	      if (offsetShift) {
	        newOrigin -= offsetShift;
	        newCapacity -= offsetShift;
	      }
	    }

	    if (list.__ownerID) {
	      list.size = newCapacity - newOrigin;
	      list._origin = newOrigin;
	      list._capacity = newCapacity;
	      list._level = newLevel;
	      list._root = newRoot;
	      list._tail = newTail;
	      list.__hash = undefined;
	      list.__altered = true;
	      return list;
	    }
	    return makeList(newOrigin, newCapacity, newLevel, newRoot, newTail);
	  }

	  function mergeIntoListWith(list, merger, iterables) {
	    var iters = [];
	    var maxSize = 0;
	    for (var ii = 0; ii < iterables.length; ii++) {
	      var value = iterables[ii];
	      var iter = IndexedIterable(value);
	      if (iter.size > maxSize) {
	        maxSize = iter.size;
	      }
	      if (!isIterable(value)) {
	        iter = iter.map(function(v ) {return fromJS(v)});
	      }
	      iters.push(iter);
	    }
	    if (maxSize > list.size) {
	      list = list.setSize(maxSize);
	    }
	    return mergeIntoCollectionWith(list, merger, iters);
	  }

	  function getTailOffset(size) {
	    return size < SIZE ? 0 : (((size - 1) >>> SHIFT) << SHIFT);
	  }

	  createClass(OrderedMap, Map);

	    // @pragma Construction

	    function OrderedMap(value) {
	      return value === null || value === undefined ? emptyOrderedMap() :
	        isOrderedMap(value) ? value :
	        emptyOrderedMap().withMutations(function(map ) {
	          var iter = KeyedIterable(value);
	          assertNotInfinite(iter.size);
	          iter.forEach(function(v, k)  {return map.set(k, v)});
	        });
	    }

	    OrderedMap.of = function(/*...values*/) {
	      return this(arguments);
	    };

	    OrderedMap.prototype.toString = function() {
	      return this.__toString('OrderedMap {', '}');
	    };

	    // @pragma Access

	    OrderedMap.prototype.get = function(k, notSetValue) {
	      var index = this._map.get(k);
	      return index !== undefined ? this._list.get(index)[1] : notSetValue;
	    };

	    // @pragma Modification

	    OrderedMap.prototype.clear = function() {
	      if (this.size === 0) {
	        return this;
	      }
	      if (this.__ownerID) {
	        this.size = 0;
	        this._map.clear();
	        this._list.clear();
	        return this;
	      }
	      return emptyOrderedMap();
	    };

	    OrderedMap.prototype.set = function(k, v) {
	      return updateOrderedMap(this, k, v);
	    };

	    OrderedMap.prototype.remove = function(k) {
	      return updateOrderedMap(this, k, NOT_SET);
	    };

	    OrderedMap.prototype.wasAltered = function() {
	      return this._map.wasAltered() || this._list.wasAltered();
	    };

	    OrderedMap.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      return this._list.__iterate(
	        function(entry ) {return entry && fn(entry[1], entry[0], this$0)},
	        reverse
	      );
	    };

	    OrderedMap.prototype.__iterator = function(type, reverse) {
	      return this._list.fromEntrySeq().__iterator(type, reverse);
	    };

	    OrderedMap.prototype.__ensureOwner = function(ownerID) {
	      if (ownerID === this.__ownerID) {
	        return this;
	      }
	      var newMap = this._map.__ensureOwner(ownerID);
	      var newList = this._list.__ensureOwner(ownerID);
	      if (!ownerID) {
	        this.__ownerID = ownerID;
	        this._map = newMap;
	        this._list = newList;
	        return this;
	      }
	      return makeOrderedMap(newMap, newList, ownerID, this.__hash);
	    };


	  function isOrderedMap(maybeOrderedMap) {
	    return isMap(maybeOrderedMap) && isOrdered(maybeOrderedMap);
	  }

	  OrderedMap.isOrderedMap = isOrderedMap;

	  OrderedMap.prototype[IS_ORDERED_SENTINEL] = true;
	  OrderedMap.prototype[DELETE] = OrderedMap.prototype.remove;



	  function makeOrderedMap(map, list, ownerID, hash) {
	    var omap = Object.create(OrderedMap.prototype);
	    omap.size = map ? map.size : 0;
	    omap._map = map;
	    omap._list = list;
	    omap.__ownerID = ownerID;
	    omap.__hash = hash;
	    return omap;
	  }

	  var EMPTY_ORDERED_MAP;
	  function emptyOrderedMap() {
	    return EMPTY_ORDERED_MAP || (EMPTY_ORDERED_MAP = makeOrderedMap(emptyMap(), emptyList()));
	  }

	  function updateOrderedMap(omap, k, v) {
	    var map = omap._map;
	    var list = omap._list;
	    var i = map.get(k);
	    var has = i !== undefined;
	    var newMap;
	    var newList;
	    if (v === NOT_SET) { // removed
	      if (!has) {
	        return omap;
	      }
	      if (list.size >= SIZE && list.size >= map.size * 2) {
	        newList = list.filter(function(entry, idx)  {return entry !== undefined && i !== idx});
	        newMap = newList.toKeyedSeq().map(function(entry ) {return entry[0]}).flip().toMap();
	        if (omap.__ownerID) {
	          newMap.__ownerID = newList.__ownerID = omap.__ownerID;
	        }
	      } else {
	        newMap = map.remove(k);
	        newList = i === list.size - 1 ? list.pop() : list.set(i, undefined);
	      }
	    } else {
	      if (has) {
	        if (v === list.get(i)[1]) {
	          return omap;
	        }
	        newMap = map;
	        newList = list.set(i, [k, v]);
	      } else {
	        newMap = map.set(k, list.size);
	        newList = list.set(list.size, [k, v]);
	      }
	    }
	    if (omap.__ownerID) {
	      omap.size = newMap.size;
	      omap._map = newMap;
	      omap._list = newList;
	      omap.__hash = undefined;
	      return omap;
	    }
	    return makeOrderedMap(newMap, newList);
	  }

	  createClass(ToKeyedSequence, KeyedSeq);
	    function ToKeyedSequence(indexed, useKeys) {
	      this._iter = indexed;
	      this._useKeys = useKeys;
	      this.size = indexed.size;
	    }

	    ToKeyedSequence.prototype.get = function(key, notSetValue) {
	      return this._iter.get(key, notSetValue);
	    };

	    ToKeyedSequence.prototype.has = function(key) {
	      return this._iter.has(key);
	    };

	    ToKeyedSequence.prototype.valueSeq = function() {
	      return this._iter.valueSeq();
	    };

	    ToKeyedSequence.prototype.reverse = function() {var this$0 = this;
	      var reversedSequence = reverseFactory(this, true);
	      if (!this._useKeys) {
	        reversedSequence.valueSeq = function()  {return this$0._iter.toSeq().reverse()};
	      }
	      return reversedSequence;
	    };

	    ToKeyedSequence.prototype.map = function(mapper, context) {var this$0 = this;
	      var mappedSequence = mapFactory(this, mapper, context);
	      if (!this._useKeys) {
	        mappedSequence.valueSeq = function()  {return this$0._iter.toSeq().map(mapper, context)};
	      }
	      return mappedSequence;
	    };

	    ToKeyedSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      var ii;
	      return this._iter.__iterate(
	        this._useKeys ?
	          function(v, k)  {return fn(v, k, this$0)} :
	          ((ii = reverse ? resolveSize(this) : 0),
	            function(v ) {return fn(v, reverse ? --ii : ii++, this$0)}),
	        reverse
	      );
	    };

	    ToKeyedSequence.prototype.__iterator = function(type, reverse) {
	      if (this._useKeys) {
	        return this._iter.__iterator(type, reverse);
	      }
	      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
	      var ii = reverse ? resolveSize(this) : 0;
	      return new Iterator(function()  {
	        var step = iterator.next();
	        return step.done ? step :
	          iteratorValue(type, reverse ? --ii : ii++, step.value, step);
	      });
	    };

	  ToKeyedSequence.prototype[IS_ORDERED_SENTINEL] = true;


	  createClass(ToIndexedSequence, IndexedSeq);
	    function ToIndexedSequence(iter) {
	      this._iter = iter;
	      this.size = iter.size;
	    }

	    ToIndexedSequence.prototype.includes = function(value) {
	      return this._iter.includes(value);
	    };

	    ToIndexedSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      var iterations = 0;
	      return this._iter.__iterate(function(v ) {return fn(v, iterations++, this$0)}, reverse);
	    };

	    ToIndexedSequence.prototype.__iterator = function(type, reverse) {
	      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
	      var iterations = 0;
	      return new Iterator(function()  {
	        var step = iterator.next();
	        return step.done ? step :
	          iteratorValue(type, iterations++, step.value, step)
	      });
	    };



	  createClass(ToSetSequence, SetSeq);
	    function ToSetSequence(iter) {
	      this._iter = iter;
	      this.size = iter.size;
	    }

	    ToSetSequence.prototype.has = function(key) {
	      return this._iter.includes(key);
	    };

	    ToSetSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      return this._iter.__iterate(function(v ) {return fn(v, v, this$0)}, reverse);
	    };

	    ToSetSequence.prototype.__iterator = function(type, reverse) {
	      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
	      return new Iterator(function()  {
	        var step = iterator.next();
	        return step.done ? step :
	          iteratorValue(type, step.value, step.value, step);
	      });
	    };



	  createClass(FromEntriesSequence, KeyedSeq);
	    function FromEntriesSequence(entries) {
	      this._iter = entries;
	      this.size = entries.size;
	    }

	    FromEntriesSequence.prototype.entrySeq = function() {
	      return this._iter.toSeq();
	    };

	    FromEntriesSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      return this._iter.__iterate(function(entry ) {
	        // Check if entry exists first so array access doesn't throw for holes
	        // in the parent iteration.
	        if (entry) {
	          validateEntry(entry);
	          var indexedIterable = isIterable(entry);
	          return fn(
	            indexedIterable ? entry.get(1) : entry[1],
	            indexedIterable ? entry.get(0) : entry[0],
	            this$0
	          );
	        }
	      }, reverse);
	    };

	    FromEntriesSequence.prototype.__iterator = function(type, reverse) {
	      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
	      return new Iterator(function()  {
	        while (true) {
	          var step = iterator.next();
	          if (step.done) {
	            return step;
	          }
	          var entry = step.value;
	          // Check if entry exists first so array access doesn't throw for holes
	          // in the parent iteration.
	          if (entry) {
	            validateEntry(entry);
	            var indexedIterable = isIterable(entry);
	            return iteratorValue(
	              type,
	              indexedIterable ? entry.get(0) : entry[0],
	              indexedIterable ? entry.get(1) : entry[1],
	              step
	            );
	          }
	        }
	      });
	    };


	  ToIndexedSequence.prototype.cacheResult =
	  ToKeyedSequence.prototype.cacheResult =
	  ToSetSequence.prototype.cacheResult =
	  FromEntriesSequence.prototype.cacheResult =
	    cacheResultThrough;


	  function flipFactory(iterable) {
	    var flipSequence = makeSequence(iterable);
	    flipSequence._iter = iterable;
	    flipSequence.size = iterable.size;
	    flipSequence.flip = function()  {return iterable};
	    flipSequence.reverse = function () {
	      var reversedSequence = iterable.reverse.apply(this); // super.reverse()
	      reversedSequence.flip = function()  {return iterable.reverse()};
	      return reversedSequence;
	    };
	    flipSequence.has = function(key ) {return iterable.includes(key)};
	    flipSequence.includes = function(key ) {return iterable.has(key)};
	    flipSequence.cacheResult = cacheResultThrough;
	    flipSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
	      return iterable.__iterate(function(v, k)  {return fn(k, v, this$0) !== false}, reverse);
	    }
	    flipSequence.__iteratorUncached = function(type, reverse) {
	      if (type === ITERATE_ENTRIES) {
	        var iterator = iterable.__iterator(type, reverse);
	        return new Iterator(function()  {
	          var step = iterator.next();
	          if (!step.done) {
	            var k = step.value[0];
	            step.value[0] = step.value[1];
	            step.value[1] = k;
	          }
	          return step;
	        });
	      }
	      return iterable.__iterator(
	        type === ITERATE_VALUES ? ITERATE_KEYS : ITERATE_VALUES,
	        reverse
	      );
	    }
	    return flipSequence;
	  }


	  function mapFactory(iterable, mapper, context) {
	    var mappedSequence = makeSequence(iterable);
	    mappedSequence.size = iterable.size;
	    mappedSequence.has = function(key ) {return iterable.has(key)};
	    mappedSequence.get = function(key, notSetValue)  {
	      var v = iterable.get(key, NOT_SET);
	      return v === NOT_SET ?
	        notSetValue :
	        mapper.call(context, v, key, iterable);
	    };
	    mappedSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
	      return iterable.__iterate(
	        function(v, k, c)  {return fn(mapper.call(context, v, k, c), k, this$0) !== false},
	        reverse
	      );
	    }
	    mappedSequence.__iteratorUncached = function (type, reverse) {
	      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
	      return new Iterator(function()  {
	        var step = iterator.next();
	        if (step.done) {
	          return step;
	        }
	        var entry = step.value;
	        var key = entry[0];
	        return iteratorValue(
	          type,
	          key,
	          mapper.call(context, entry[1], key, iterable),
	          step
	        );
	      });
	    }
	    return mappedSequence;
	  }


	  function reverseFactory(iterable, useKeys) {
	    var reversedSequence = makeSequence(iterable);
	    reversedSequence._iter = iterable;
	    reversedSequence.size = iterable.size;
	    reversedSequence.reverse = function()  {return iterable};
	    if (iterable.flip) {
	      reversedSequence.flip = function () {
	        var flipSequence = flipFactory(iterable);
	        flipSequence.reverse = function()  {return iterable.flip()};
	        return flipSequence;
	      };
	    }
	    reversedSequence.get = function(key, notSetValue) 
	      {return iterable.get(useKeys ? key : -1 - key, notSetValue)};
	    reversedSequence.has = function(key )
	      {return iterable.has(useKeys ? key : -1 - key)};
	    reversedSequence.includes = function(value ) {return iterable.includes(value)};
	    reversedSequence.cacheResult = cacheResultThrough;
	    reversedSequence.__iterate = function (fn, reverse) {var this$0 = this;
	      return iterable.__iterate(function(v, k)  {return fn(v, k, this$0)}, !reverse);
	    };
	    reversedSequence.__iterator =
	      function(type, reverse)  {return iterable.__iterator(type, !reverse)};
	    return reversedSequence;
	  }


	  function filterFactory(iterable, predicate, context, useKeys) {
	    var filterSequence = makeSequence(iterable);
	    if (useKeys) {
	      filterSequence.has = function(key ) {
	        var v = iterable.get(key, NOT_SET);
	        return v !== NOT_SET && !!predicate.call(context, v, key, iterable);
	      };
	      filterSequence.get = function(key, notSetValue)  {
	        var v = iterable.get(key, NOT_SET);
	        return v !== NOT_SET && predicate.call(context, v, key, iterable) ?
	          v : notSetValue;
	      };
	    }
	    filterSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
	      var iterations = 0;
	      iterable.__iterate(function(v, k, c)  {
	        if (predicate.call(context, v, k, c)) {
	          iterations++;
	          return fn(v, useKeys ? k : iterations - 1, this$0);
	        }
	      }, reverse);
	      return iterations;
	    };
	    filterSequence.__iteratorUncached = function (type, reverse) {
	      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
	      var iterations = 0;
	      return new Iterator(function()  {
	        while (true) {
	          var step = iterator.next();
	          if (step.done) {
	            return step;
	          }
	          var entry = step.value;
	          var key = entry[0];
	          var value = entry[1];
	          if (predicate.call(context, value, key, iterable)) {
	            return iteratorValue(type, useKeys ? key : iterations++, value, step);
	          }
	        }
	      });
	    }
	    return filterSequence;
	  }


	  function countByFactory(iterable, grouper, context) {
	    var groups = Map().asMutable();
	    iterable.__iterate(function(v, k)  {
	      groups.update(
	        grouper.call(context, v, k, iterable),
	        0,
	        function(a ) {return a + 1}
	      );
	    });
	    return groups.asImmutable();
	  }


	  function groupByFactory(iterable, grouper, context) {
	    var isKeyedIter = isKeyed(iterable);
	    var groups = (isOrdered(iterable) ? OrderedMap() : Map()).asMutable();
	    iterable.__iterate(function(v, k)  {
	      groups.update(
	        grouper.call(context, v, k, iterable),
	        function(a ) {return (a = a || [], a.push(isKeyedIter ? [k, v] : v), a)}
	      );
	    });
	    var coerce = iterableClass(iterable);
	    return groups.map(function(arr ) {return reify(iterable, coerce(arr))});
	  }


	  function sliceFactory(iterable, begin, end, useKeys) {
	    var originalSize = iterable.size;

	    // Sanitize begin & end using this shorthand for ToInt32(argument)
	    // http://www.ecma-international.org/ecma-262/6.0/#sec-toint32
	    if (begin !== undefined) {
	      begin = begin | 0;
	    }
	    if (end !== undefined) {
	      if (end === Infinity) {
	        end = originalSize;
	      } else {
	        end = end | 0;
	      }
	    }

	    if (wholeSlice(begin, end, originalSize)) {
	      return iterable;
	    }

	    var resolvedBegin = resolveBegin(begin, originalSize);
	    var resolvedEnd = resolveEnd(end, originalSize);

	    // begin or end will be NaN if they were provided as negative numbers and
	    // this iterable's size is unknown. In that case, cache first so there is
	    // a known size and these do not resolve to NaN.
	    if (resolvedBegin !== resolvedBegin || resolvedEnd !== resolvedEnd) {
	      return sliceFactory(iterable.toSeq().cacheResult(), begin, end, useKeys);
	    }

	    // Note: resolvedEnd is undefined when the original sequence's length is
	    // unknown and this slice did not supply an end and should contain all
	    // elements after resolvedBegin.
	    // In that case, resolvedSize will be NaN and sliceSize will remain undefined.
	    var resolvedSize = resolvedEnd - resolvedBegin;
	    var sliceSize;
	    if (resolvedSize === resolvedSize) {
	      sliceSize = resolvedSize < 0 ? 0 : resolvedSize;
	    }

	    var sliceSeq = makeSequence(iterable);

	    // If iterable.size is undefined, the size of the realized sliceSeq is
	    // unknown at this point unless the number of items to slice is 0
	    sliceSeq.size = sliceSize === 0 ? sliceSize : iterable.size && sliceSize || undefined;

	    if (!useKeys && isSeq(iterable) && sliceSize >= 0) {
	      sliceSeq.get = function (index, notSetValue) {
	        index = wrapIndex(this, index);
	        return index >= 0 && index < sliceSize ?
	          iterable.get(index + resolvedBegin, notSetValue) :
	          notSetValue;
	      }
	    }

	    sliceSeq.__iterateUncached = function(fn, reverse) {var this$0 = this;
	      if (sliceSize === 0) {
	        return 0;
	      }
	      if (reverse) {
	        return this.cacheResult().__iterate(fn, reverse);
	      }
	      var skipped = 0;
	      var isSkipping = true;
	      var iterations = 0;
	      iterable.__iterate(function(v, k)  {
	        if (!(isSkipping && (isSkipping = skipped++ < resolvedBegin))) {
	          iterations++;
	          return fn(v, useKeys ? k : iterations - 1, this$0) !== false &&
	                 iterations !== sliceSize;
	        }
	      });
	      return iterations;
	    };

	    sliceSeq.__iteratorUncached = function(type, reverse) {
	      if (sliceSize !== 0 && reverse) {
	        return this.cacheResult().__iterator(type, reverse);
	      }
	      // Don't bother instantiating parent iterator if taking 0.
	      var iterator = sliceSize !== 0 && iterable.__iterator(type, reverse);
	      var skipped = 0;
	      var iterations = 0;
	      return new Iterator(function()  {
	        while (skipped++ < resolvedBegin) {
	          iterator.next();
	        }
	        if (++iterations > sliceSize) {
	          return iteratorDone();
	        }
	        var step = iterator.next();
	        if (useKeys || type === ITERATE_VALUES) {
	          return step;
	        } else if (type === ITERATE_KEYS) {
	          return iteratorValue(type, iterations - 1, undefined, step);
	        } else {
	          return iteratorValue(type, iterations - 1, step.value[1], step);
	        }
	      });
	    }

	    return sliceSeq;
	  }


	  function takeWhileFactory(iterable, predicate, context) {
	    var takeSequence = makeSequence(iterable);
	    takeSequence.__iterateUncached = function(fn, reverse) {var this$0 = this;
	      if (reverse) {
	        return this.cacheResult().__iterate(fn, reverse);
	      }
	      var iterations = 0;
	      iterable.__iterate(function(v, k, c) 
	        {return predicate.call(context, v, k, c) && ++iterations && fn(v, k, this$0)}
	      );
	      return iterations;
	    };
	    takeSequence.__iteratorUncached = function(type, reverse) {var this$0 = this;
	      if (reverse) {
	        return this.cacheResult().__iterator(type, reverse);
	      }
	      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
	      var iterating = true;
	      return new Iterator(function()  {
	        if (!iterating) {
	          return iteratorDone();
	        }
	        var step = iterator.next();
	        if (step.done) {
	          return step;
	        }
	        var entry = step.value;
	        var k = entry[0];
	        var v = entry[1];
	        if (!predicate.call(context, v, k, this$0)) {
	          iterating = false;
	          return iteratorDone();
	        }
	        return type === ITERATE_ENTRIES ? step :
	          iteratorValue(type, k, v, step);
	      });
	    };
	    return takeSequence;
	  }


	  function skipWhileFactory(iterable, predicate, context, useKeys) {
	    var skipSequence = makeSequence(iterable);
	    skipSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
	      if (reverse) {
	        return this.cacheResult().__iterate(fn, reverse);
	      }
	      var isSkipping = true;
	      var iterations = 0;
	      iterable.__iterate(function(v, k, c)  {
	        if (!(isSkipping && (isSkipping = predicate.call(context, v, k, c)))) {
	          iterations++;
	          return fn(v, useKeys ? k : iterations - 1, this$0);
	        }
	      });
	      return iterations;
	    };
	    skipSequence.__iteratorUncached = function(type, reverse) {var this$0 = this;
	      if (reverse) {
	        return this.cacheResult().__iterator(type, reverse);
	      }
	      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
	      var skipping = true;
	      var iterations = 0;
	      return new Iterator(function()  {
	        var step, k, v;
	        do {
	          step = iterator.next();
	          if (step.done) {
	            if (useKeys || type === ITERATE_VALUES) {
	              return step;
	            } else if (type === ITERATE_KEYS) {
	              return iteratorValue(type, iterations++, undefined, step);
	            } else {
	              return iteratorValue(type, iterations++, step.value[1], step);
	            }
	          }
	          var entry = step.value;
	          k = entry[0];
	          v = entry[1];
	          skipping && (skipping = predicate.call(context, v, k, this$0));
	        } while (skipping);
	        return type === ITERATE_ENTRIES ? step :
	          iteratorValue(type, k, v, step);
	      });
	    };
	    return skipSequence;
	  }


	  function concatFactory(iterable, values) {
	    var isKeyedIterable = isKeyed(iterable);
	    var iters = [iterable].concat(values).map(function(v ) {
	      if (!isIterable(v)) {
	        v = isKeyedIterable ?
	          keyedSeqFromValue(v) :
	          indexedSeqFromValue(Array.isArray(v) ? v : [v]);
	      } else if (isKeyedIterable) {
	        v = KeyedIterable(v);
	      }
	      return v;
	    }).filter(function(v ) {return v.size !== 0});

	    if (iters.length === 0) {
	      return iterable;
	    }

	    if (iters.length === 1) {
	      var singleton = iters[0];
	      if (singleton === iterable ||
	          isKeyedIterable && isKeyed(singleton) ||
	          isIndexed(iterable) && isIndexed(singleton)) {
	        return singleton;
	      }
	    }

	    var concatSeq = new ArraySeq(iters);
	    if (isKeyedIterable) {
	      concatSeq = concatSeq.toKeyedSeq();
	    } else if (!isIndexed(iterable)) {
	      concatSeq = concatSeq.toSetSeq();
	    }
	    concatSeq = concatSeq.flatten(true);
	    concatSeq.size = iters.reduce(
	      function(sum, seq)  {
	        if (sum !== undefined) {
	          var size = seq.size;
	          if (size !== undefined) {
	            return sum + size;
	          }
	        }
	      },
	      0
	    );
	    return concatSeq;
	  }


	  function flattenFactory(iterable, depth, useKeys) {
	    var flatSequence = makeSequence(iterable);
	    flatSequence.__iterateUncached = function(fn, reverse) {
	      var iterations = 0;
	      var stopped = false;
	      function flatDeep(iter, currentDepth) {var this$0 = this;
	        iter.__iterate(function(v, k)  {
	          if ((!depth || currentDepth < depth) && isIterable(v)) {
	            flatDeep(v, currentDepth + 1);
	          } else if (fn(v, useKeys ? k : iterations++, this$0) === false) {
	            stopped = true;
	          }
	          return !stopped;
	        }, reverse);
	      }
	      flatDeep(iterable, 0);
	      return iterations;
	    }
	    flatSequence.__iteratorUncached = function(type, reverse) {
	      var iterator = iterable.__iterator(type, reverse);
	      var stack = [];
	      var iterations = 0;
	      return new Iterator(function()  {
	        while (iterator) {
	          var step = iterator.next();
	          if (step.done !== false) {
	            iterator = stack.pop();
	            continue;
	          }
	          var v = step.value;
	          if (type === ITERATE_ENTRIES) {
	            v = v[1];
	          }
	          if ((!depth || stack.length < depth) && isIterable(v)) {
	            stack.push(iterator);
	            iterator = v.__iterator(type, reverse);
	          } else {
	            return useKeys ? step : iteratorValue(type, iterations++, v, step);
	          }
	        }
	        return iteratorDone();
	      });
	    }
	    return flatSequence;
	  }


	  function flatMapFactory(iterable, mapper, context) {
	    var coerce = iterableClass(iterable);
	    return iterable.toSeq().map(
	      function(v, k)  {return coerce(mapper.call(context, v, k, iterable))}
	    ).flatten(true);
	  }


	  function interposeFactory(iterable, separator) {
	    var interposedSequence = makeSequence(iterable);
	    interposedSequence.size = iterable.size && iterable.size * 2 -1;
	    interposedSequence.__iterateUncached = function(fn, reverse) {var this$0 = this;
	      var iterations = 0;
	      iterable.__iterate(function(v, k) 
	        {return (!iterations || fn(separator, iterations++, this$0) !== false) &&
	        fn(v, iterations++, this$0) !== false},
	        reverse
	      );
	      return iterations;
	    };
	    interposedSequence.__iteratorUncached = function(type, reverse) {
	      var iterator = iterable.__iterator(ITERATE_VALUES, reverse);
	      var iterations = 0;
	      var step;
	      return new Iterator(function()  {
	        if (!step || iterations % 2) {
	          step = iterator.next();
	          if (step.done) {
	            return step;
	          }
	        }
	        return iterations % 2 ?
	          iteratorValue(type, iterations++, separator) :
	          iteratorValue(type, iterations++, step.value, step);
	      });
	    };
	    return interposedSequence;
	  }


	  function sortFactory(iterable, comparator, mapper) {
	    if (!comparator) {
	      comparator = defaultComparator;
	    }
	    var isKeyedIterable = isKeyed(iterable);
	    var index = 0;
	    var entries = iterable.toSeq().map(
	      function(v, k)  {return [k, v, index++, mapper ? mapper(v, k, iterable) : v]}
	    ).toArray();
	    entries.sort(function(a, b)  {return comparator(a[3], b[3]) || a[2] - b[2]}).forEach(
	      isKeyedIterable ?
	      function(v, i)  { entries[i].length = 2; } :
	      function(v, i)  { entries[i] = v[1]; }
	    );
	    return isKeyedIterable ? KeyedSeq(entries) :
	      isIndexed(iterable) ? IndexedSeq(entries) :
	      SetSeq(entries);
	  }


	  function maxFactory(iterable, comparator, mapper) {
	    if (!comparator) {
	      comparator = defaultComparator;
	    }
	    if (mapper) {
	      var entry = iterable.toSeq()
	        .map(function(v, k)  {return [v, mapper(v, k, iterable)]})
	        .reduce(function(a, b)  {return maxCompare(comparator, a[1], b[1]) ? b : a});
	      return entry && entry[0];
	    } else {
	      return iterable.reduce(function(a, b)  {return maxCompare(comparator, a, b) ? b : a});
	    }
	  }

	  function maxCompare(comparator, a, b) {
	    var comp = comparator(b, a);
	    // b is considered the new max if the comparator declares them equal, but
	    // they are not equal and b is in fact a nullish value.
	    return (comp === 0 && b !== a && (b === undefined || b === null || b !== b)) || comp > 0;
	  }


	  function zipWithFactory(keyIter, zipper, iters) {
	    var zipSequence = makeSequence(keyIter);
	    zipSequence.size = new ArraySeq(iters).map(function(i ) {return i.size}).min();
	    // Note: this a generic base implementation of __iterate in terms of
	    // __iterator which may be more generically useful in the future.
	    zipSequence.__iterate = function(fn, reverse) {
	      /* generic:
	      var iterator = this.__iterator(ITERATE_ENTRIES, reverse);
	      var step;
	      var iterations = 0;
	      while (!(step = iterator.next()).done) {
	        iterations++;
	        if (fn(step.value[1], step.value[0], this) === false) {
	          break;
	        }
	      }
	      return iterations;
	      */
	      // indexed:
	      var iterator = this.__iterator(ITERATE_VALUES, reverse);
	      var step;
	      var iterations = 0;
	      while (!(step = iterator.next()).done) {
	        if (fn(step.value, iterations++, this) === false) {
	          break;
	        }
	      }
	      return iterations;
	    };
	    zipSequence.__iteratorUncached = function(type, reverse) {
	      var iterators = iters.map(function(i )
	        {return (i = Iterable(i), getIterator(reverse ? i.reverse() : i))}
	      );
	      var iterations = 0;
	      var isDone = false;
	      return new Iterator(function()  {
	        var steps;
	        if (!isDone) {
	          steps = iterators.map(function(i ) {return i.next()});
	          isDone = steps.some(function(s ) {return s.done});
	        }
	        if (isDone) {
	          return iteratorDone();
	        }
	        return iteratorValue(
	          type,
	          iterations++,
	          zipper.apply(null, steps.map(function(s ) {return s.value}))
	        );
	      });
	    };
	    return zipSequence
	  }


	  // #pragma Helper Functions

	  function reify(iter, seq) {
	    return isSeq(iter) ? seq : iter.constructor(seq);
	  }

	  function validateEntry(entry) {
	    if (entry !== Object(entry)) {
	      throw new TypeError('Expected [K, V] tuple: ' + entry);
	    }
	  }

	  function resolveSize(iter) {
	    assertNotInfinite(iter.size);
	    return ensureSize(iter);
	  }

	  function iterableClass(iterable) {
	    return isKeyed(iterable) ? KeyedIterable :
	      isIndexed(iterable) ? IndexedIterable :
	      SetIterable;
	  }

	  function makeSequence(iterable) {
	    return Object.create(
	      (
	        isKeyed(iterable) ? KeyedSeq :
	        isIndexed(iterable) ? IndexedSeq :
	        SetSeq
	      ).prototype
	    );
	  }

	  function cacheResultThrough() {
	    if (this._iter.cacheResult) {
	      this._iter.cacheResult();
	      this.size = this._iter.size;
	      return this;
	    } else {
	      return Seq.prototype.cacheResult.call(this);
	    }
	  }

	  function defaultComparator(a, b) {
	    return a > b ? 1 : a < b ? -1 : 0;
	  }

	  function forceIterator(keyPath) {
	    var iter = getIterator(keyPath);
	    if (!iter) {
	      // Array might not be iterable in this environment, so we need a fallback
	      // to our wrapped type.
	      if (!isArrayLike(keyPath)) {
	        throw new TypeError('Expected iterable or array-like: ' + keyPath);
	      }
	      iter = getIterator(Iterable(keyPath));
	    }
	    return iter;
	  }

	  createClass(Record, KeyedCollection);

	    function Record(defaultValues, name) {
	      var hasInitialized;

	      var RecordType = function Record(values) {
	        if (values instanceof RecordType) {
	          return values;
	        }
	        if (!(this instanceof RecordType)) {
	          return new RecordType(values);
	        }
	        if (!hasInitialized) {
	          hasInitialized = true;
	          var keys = Object.keys(defaultValues);
	          setProps(RecordTypePrototype, keys);
	          RecordTypePrototype.size = keys.length;
	          RecordTypePrototype._name = name;
	          RecordTypePrototype._keys = keys;
	          RecordTypePrototype._defaultValues = defaultValues;
	        }
	        this._map = Map(values);
	      };

	      var RecordTypePrototype = RecordType.prototype = Object.create(RecordPrototype);
	      RecordTypePrototype.constructor = RecordType;

	      return RecordType;
	    }

	    Record.prototype.toString = function() {
	      return this.__toString(recordName(this) + ' {', '}');
	    };

	    // @pragma Access

	    Record.prototype.has = function(k) {
	      return this._defaultValues.hasOwnProperty(k);
	    };

	    Record.prototype.get = function(k, notSetValue) {
	      if (!this.has(k)) {
	        return notSetValue;
	      }
	      var defaultVal = this._defaultValues[k];
	      return this._map ? this._map.get(k, defaultVal) : defaultVal;
	    };

	    // @pragma Modification

	    Record.prototype.clear = function() {
	      if (this.__ownerID) {
	        this._map && this._map.clear();
	        return this;
	      }
	      var RecordType = this.constructor;
	      return RecordType._empty || (RecordType._empty = makeRecord(this, emptyMap()));
	    };

	    Record.prototype.set = function(k, v) {
	      if (!this.has(k)) {
	        throw new Error('Cannot set unknown key "' + k + '" on ' + recordName(this));
	      }
	      if (this._map && !this._map.has(k)) {
	        var defaultVal = this._defaultValues[k];
	        if (v === defaultVal) {
	          return this;
	        }
	      }
	      var newMap = this._map && this._map.set(k, v);
	      if (this.__ownerID || newMap === this._map) {
	        return this;
	      }
	      return makeRecord(this, newMap);
	    };

	    Record.prototype.remove = function(k) {
	      if (!this.has(k)) {
	        return this;
	      }
	      var newMap = this._map && this._map.remove(k);
	      if (this.__ownerID || newMap === this._map) {
	        return this;
	      }
	      return makeRecord(this, newMap);
	    };

	    Record.prototype.wasAltered = function() {
	      return this._map.wasAltered();
	    };

	    Record.prototype.__iterator = function(type, reverse) {var this$0 = this;
	      return KeyedIterable(this._defaultValues).map(function(_, k)  {return this$0.get(k)}).__iterator(type, reverse);
	    };

	    Record.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      return KeyedIterable(this._defaultValues).map(function(_, k)  {return this$0.get(k)}).__iterate(fn, reverse);
	    };

	    Record.prototype.__ensureOwner = function(ownerID) {
	      if (ownerID === this.__ownerID) {
	        return this;
	      }
	      var newMap = this._map && this._map.__ensureOwner(ownerID);
	      if (!ownerID) {
	        this.__ownerID = ownerID;
	        this._map = newMap;
	        return this;
	      }
	      return makeRecord(this, newMap, ownerID);
	    };


	  var RecordPrototype = Record.prototype;
	  RecordPrototype[DELETE] = RecordPrototype.remove;
	  RecordPrototype.deleteIn =
	  RecordPrototype.removeIn = MapPrototype.removeIn;
	  RecordPrototype.merge = MapPrototype.merge;
	  RecordPrototype.mergeWith = MapPrototype.mergeWith;
	  RecordPrototype.mergeIn = MapPrototype.mergeIn;
	  RecordPrototype.mergeDeep = MapPrototype.mergeDeep;
	  RecordPrototype.mergeDeepWith = MapPrototype.mergeDeepWith;
	  RecordPrototype.mergeDeepIn = MapPrototype.mergeDeepIn;
	  RecordPrototype.setIn = MapPrototype.setIn;
	  RecordPrototype.update = MapPrototype.update;
	  RecordPrototype.updateIn = MapPrototype.updateIn;
	  RecordPrototype.withMutations = MapPrototype.withMutations;
	  RecordPrototype.asMutable = MapPrototype.asMutable;
	  RecordPrototype.asImmutable = MapPrototype.asImmutable;


	  function makeRecord(likeRecord, map, ownerID) {
	    var record = Object.create(Object.getPrototypeOf(likeRecord));
	    record._map = map;
	    record.__ownerID = ownerID;
	    return record;
	  }

	  function recordName(record) {
	    return record._name || record.constructor.name || 'Record';
	  }

	  function setProps(prototype, names) {
	    try {
	      names.forEach(setProp.bind(undefined, prototype));
	    } catch (error) {
	      // Object.defineProperty failed. Probably IE8.
	    }
	  }

	  function setProp(prototype, name) {
	    Object.defineProperty(prototype, name, {
	      get: function() {
	        return this.get(name);
	      },
	      set: function(value) {
	        invariant(this.__ownerID, 'Cannot set on an immutable record.');
	        this.set(name, value);
	      }
	    });
	  }

	  createClass(Set, SetCollection);

	    // @pragma Construction

	    function Set(value) {
	      return value === null || value === undefined ? emptySet() :
	        isSet(value) && !isOrdered(value) ? value :
	        emptySet().withMutations(function(set ) {
	          var iter = SetIterable(value);
	          assertNotInfinite(iter.size);
	          iter.forEach(function(v ) {return set.add(v)});
	        });
	    }

	    Set.of = function(/*...values*/) {
	      return this(arguments);
	    };

	    Set.fromKeys = function(value) {
	      return this(KeyedIterable(value).keySeq());
	    };

	    Set.prototype.toString = function() {
	      return this.__toString('Set {', '}');
	    };

	    // @pragma Access

	    Set.prototype.has = function(value) {
	      return this._map.has(value);
	    };

	    // @pragma Modification

	    Set.prototype.add = function(value) {
	      return updateSet(this, this._map.set(value, true));
	    };

	    Set.prototype.remove = function(value) {
	      return updateSet(this, this._map.remove(value));
	    };

	    Set.prototype.clear = function() {
	      return updateSet(this, this._map.clear());
	    };

	    // @pragma Composition

	    Set.prototype.union = function() {var iters = SLICE$0.call(arguments, 0);
	      iters = iters.filter(function(x ) {return x.size !== 0});
	      if (iters.length === 0) {
	        return this;
	      }
	      if (this.size === 0 && !this.__ownerID && iters.length === 1) {
	        return this.constructor(iters[0]);
	      }
	      return this.withMutations(function(set ) {
	        for (var ii = 0; ii < iters.length; ii++) {
	          SetIterable(iters[ii]).forEach(function(value ) {return set.add(value)});
	        }
	      });
	    };

	    Set.prototype.intersect = function() {var iters = SLICE$0.call(arguments, 0);
	      if (iters.length === 0) {
	        return this;
	      }
	      iters = iters.map(function(iter ) {return SetIterable(iter)});
	      var originalSet = this;
	      return this.withMutations(function(set ) {
	        originalSet.forEach(function(value ) {
	          if (!iters.every(function(iter ) {return iter.includes(value)})) {
	            set.remove(value);
	          }
	        });
	      });
	    };

	    Set.prototype.subtract = function() {var iters = SLICE$0.call(arguments, 0);
	      if (iters.length === 0) {
	        return this;
	      }
	      iters = iters.map(function(iter ) {return SetIterable(iter)});
	      var originalSet = this;
	      return this.withMutations(function(set ) {
	        originalSet.forEach(function(value ) {
	          if (iters.some(function(iter ) {return iter.includes(value)})) {
	            set.remove(value);
	          }
	        });
	      });
	    };

	    Set.prototype.merge = function() {
	      return this.union.apply(this, arguments);
	    };

	    Set.prototype.mergeWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
	      return this.union.apply(this, iters);
	    };

	    Set.prototype.sort = function(comparator) {
	      // Late binding
	      return OrderedSet(sortFactory(this, comparator));
	    };

	    Set.prototype.sortBy = function(mapper, comparator) {
	      // Late binding
	      return OrderedSet(sortFactory(this, comparator, mapper));
	    };

	    Set.prototype.wasAltered = function() {
	      return this._map.wasAltered();
	    };

	    Set.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      return this._map.__iterate(function(_, k)  {return fn(k, k, this$0)}, reverse);
	    };

	    Set.prototype.__iterator = function(type, reverse) {
	      return this._map.map(function(_, k)  {return k}).__iterator(type, reverse);
	    };

	    Set.prototype.__ensureOwner = function(ownerID) {
	      if (ownerID === this.__ownerID) {
	        return this;
	      }
	      var newMap = this._map.__ensureOwner(ownerID);
	      if (!ownerID) {
	        this.__ownerID = ownerID;
	        this._map = newMap;
	        return this;
	      }
	      return this.__make(newMap, ownerID);
	    };


	  function isSet(maybeSet) {
	    return !!(maybeSet && maybeSet[IS_SET_SENTINEL]);
	  }

	  Set.isSet = isSet;

	  var IS_SET_SENTINEL = '@@__IMMUTABLE_SET__@@';

	  var SetPrototype = Set.prototype;
	  SetPrototype[IS_SET_SENTINEL] = true;
	  SetPrototype[DELETE] = SetPrototype.remove;
	  SetPrototype.mergeDeep = SetPrototype.merge;
	  SetPrototype.mergeDeepWith = SetPrototype.mergeWith;
	  SetPrototype.withMutations = MapPrototype.withMutations;
	  SetPrototype.asMutable = MapPrototype.asMutable;
	  SetPrototype.asImmutable = MapPrototype.asImmutable;

	  SetPrototype.__empty = emptySet;
	  SetPrototype.__make = makeSet;

	  function updateSet(set, newMap) {
	    if (set.__ownerID) {
	      set.size = newMap.size;
	      set._map = newMap;
	      return set;
	    }
	    return newMap === set._map ? set :
	      newMap.size === 0 ? set.__empty() :
	      set.__make(newMap);
	  }

	  function makeSet(map, ownerID) {
	    var set = Object.create(SetPrototype);
	    set.size = map ? map.size : 0;
	    set._map = map;
	    set.__ownerID = ownerID;
	    return set;
	  }

	  var EMPTY_SET;
	  function emptySet() {
	    return EMPTY_SET || (EMPTY_SET = makeSet(emptyMap()));
	  }

	  createClass(OrderedSet, Set);

	    // @pragma Construction

	    function OrderedSet(value) {
	      return value === null || value === undefined ? emptyOrderedSet() :
	        isOrderedSet(value) ? value :
	        emptyOrderedSet().withMutations(function(set ) {
	          var iter = SetIterable(value);
	          assertNotInfinite(iter.size);
	          iter.forEach(function(v ) {return set.add(v)});
	        });
	    }

	    OrderedSet.of = function(/*...values*/) {
	      return this(arguments);
	    };

	    OrderedSet.fromKeys = function(value) {
	      return this(KeyedIterable(value).keySeq());
	    };

	    OrderedSet.prototype.toString = function() {
	      return this.__toString('OrderedSet {', '}');
	    };


	  function isOrderedSet(maybeOrderedSet) {
	    return isSet(maybeOrderedSet) && isOrdered(maybeOrderedSet);
	  }

	  OrderedSet.isOrderedSet = isOrderedSet;

	  var OrderedSetPrototype = OrderedSet.prototype;
	  OrderedSetPrototype[IS_ORDERED_SENTINEL] = true;

	  OrderedSetPrototype.__empty = emptyOrderedSet;
	  OrderedSetPrototype.__make = makeOrderedSet;

	  function makeOrderedSet(map, ownerID) {
	    var set = Object.create(OrderedSetPrototype);
	    set.size = map ? map.size : 0;
	    set._map = map;
	    set.__ownerID = ownerID;
	    return set;
	  }

	  var EMPTY_ORDERED_SET;
	  function emptyOrderedSet() {
	    return EMPTY_ORDERED_SET || (EMPTY_ORDERED_SET = makeOrderedSet(emptyOrderedMap()));
	  }

	  createClass(Stack, IndexedCollection);

	    // @pragma Construction

	    function Stack(value) {
	      return value === null || value === undefined ? emptyStack() :
	        isStack(value) ? value :
	        emptyStack().unshiftAll(value);
	    }

	    Stack.of = function(/*...values*/) {
	      return this(arguments);
	    };

	    Stack.prototype.toString = function() {
	      return this.__toString('Stack [', ']');
	    };

	    // @pragma Access

	    Stack.prototype.get = function(index, notSetValue) {
	      var head = this._head;
	      index = wrapIndex(this, index);
	      while (head && index--) {
	        head = head.next;
	      }
	      return head ? head.value : notSetValue;
	    };

	    Stack.prototype.peek = function() {
	      return this._head && this._head.value;
	    };

	    // @pragma Modification

	    Stack.prototype.push = function(/*...values*/) {
	      if (arguments.length === 0) {
	        return this;
	      }
	      var newSize = this.size + arguments.length;
	      var head = this._head;
	      for (var ii = arguments.length - 1; ii >= 0; ii--) {
	        head = {
	          value: arguments[ii],
	          next: head
	        };
	      }
	      if (this.__ownerID) {
	        this.size = newSize;
	        this._head = head;
	        this.__hash = undefined;
	        this.__altered = true;
	        return this;
	      }
	      return makeStack(newSize, head);
	    };

	    Stack.prototype.pushAll = function(iter) {
	      iter = IndexedIterable(iter);
	      if (iter.size === 0) {
	        return this;
	      }
	      assertNotInfinite(iter.size);
	      var newSize = this.size;
	      var head = this._head;
	      iter.reverse().forEach(function(value ) {
	        newSize++;
	        head = {
	          value: value,
	          next: head
	        };
	      });
	      if (this.__ownerID) {
	        this.size = newSize;
	        this._head = head;
	        this.__hash = undefined;
	        this.__altered = true;
	        return this;
	      }
	      return makeStack(newSize, head);
	    };

	    Stack.prototype.pop = function() {
	      return this.slice(1);
	    };

	    Stack.prototype.unshift = function(/*...values*/) {
	      return this.push.apply(this, arguments);
	    };

	    Stack.prototype.unshiftAll = function(iter) {
	      return this.pushAll(iter);
	    };

	    Stack.prototype.shift = function() {
	      return this.pop.apply(this, arguments);
	    };

	    Stack.prototype.clear = function() {
	      if (this.size === 0) {
	        return this;
	      }
	      if (this.__ownerID) {
	        this.size = 0;
	        this._head = undefined;
	        this.__hash = undefined;
	        this.__altered = true;
	        return this;
	      }
	      return emptyStack();
	    };

	    Stack.prototype.slice = function(begin, end) {
	      if (wholeSlice(begin, end, this.size)) {
	        return this;
	      }
	      var resolvedBegin = resolveBegin(begin, this.size);
	      var resolvedEnd = resolveEnd(end, this.size);
	      if (resolvedEnd !== this.size) {
	        // super.slice(begin, end);
	        return IndexedCollection.prototype.slice.call(this, begin, end);
	      }
	      var newSize = this.size - resolvedBegin;
	      var head = this._head;
	      while (resolvedBegin--) {
	        head = head.next;
	      }
	      if (this.__ownerID) {
	        this.size = newSize;
	        this._head = head;
	        this.__hash = undefined;
	        this.__altered = true;
	        return this;
	      }
	      return makeStack(newSize, head);
	    };

	    // @pragma Mutability

	    Stack.prototype.__ensureOwner = function(ownerID) {
	      if (ownerID === this.__ownerID) {
	        return this;
	      }
	      if (!ownerID) {
	        this.__ownerID = ownerID;
	        this.__altered = false;
	        return this;
	      }
	      return makeStack(this.size, this._head, ownerID, this.__hash);
	    };

	    // @pragma Iteration

	    Stack.prototype.__iterate = function(fn, reverse) {
	      if (reverse) {
	        return this.reverse().__iterate(fn);
	      }
	      var iterations = 0;
	      var node = this._head;
	      while (node) {
	        if (fn(node.value, iterations++, this) === false) {
	          break;
	        }
	        node = node.next;
	      }
	      return iterations;
	    };

	    Stack.prototype.__iterator = function(type, reverse) {
	      if (reverse) {
	        return this.reverse().__iterator(type);
	      }
	      var iterations = 0;
	      var node = this._head;
	      return new Iterator(function()  {
	        if (node) {
	          var value = node.value;
	          node = node.next;
	          return iteratorValue(type, iterations++, value);
	        }
	        return iteratorDone();
	      });
	    };


	  function isStack(maybeStack) {
	    return !!(maybeStack && maybeStack[IS_STACK_SENTINEL]);
	  }

	  Stack.isStack = isStack;

	  var IS_STACK_SENTINEL = '@@__IMMUTABLE_STACK__@@';

	  var StackPrototype = Stack.prototype;
	  StackPrototype[IS_STACK_SENTINEL] = true;
	  StackPrototype.withMutations = MapPrototype.withMutations;
	  StackPrototype.asMutable = MapPrototype.asMutable;
	  StackPrototype.asImmutable = MapPrototype.asImmutable;
	  StackPrototype.wasAltered = MapPrototype.wasAltered;


	  function makeStack(size, head, ownerID, hash) {
	    var map = Object.create(StackPrototype);
	    map.size = size;
	    map._head = head;
	    map.__ownerID = ownerID;
	    map.__hash = hash;
	    map.__altered = false;
	    return map;
	  }

	  var EMPTY_STACK;
	  function emptyStack() {
	    return EMPTY_STACK || (EMPTY_STACK = makeStack(0));
	  }

	  /**
	   * Contributes additional methods to a constructor
	   */
	  function mixin(ctor, methods) {
	    var keyCopier = function(key ) { ctor.prototype[key] = methods[key]; };
	    Object.keys(methods).forEach(keyCopier);
	    Object.getOwnPropertySymbols &&
	      Object.getOwnPropertySymbols(methods).forEach(keyCopier);
	    return ctor;
	  }

	  Iterable.Iterator = Iterator;

	  mixin(Iterable, {

	    // ### Conversion to other types

	    toArray: function() {
	      assertNotInfinite(this.size);
	      var array = new Array(this.size || 0);
	      this.valueSeq().__iterate(function(v, i)  { array[i] = v; });
	      return array;
	    },

	    toIndexedSeq: function() {
	      return new ToIndexedSequence(this);
	    },

	    toJS: function() {
	      return this.toSeq().map(
	        function(value ) {return value && typeof value.toJS === 'function' ? value.toJS() : value}
	      ).__toJS();
	    },

	    toJSON: function() {
	      return this.toSeq().map(
	        function(value ) {return value && typeof value.toJSON === 'function' ? value.toJSON() : value}
	      ).__toJS();
	    },

	    toKeyedSeq: function() {
	      return new ToKeyedSequence(this, true);
	    },

	    toMap: function() {
	      // Use Late Binding here to solve the circular dependency.
	      return Map(this.toKeyedSeq());
	    },

	    toObject: function() {
	      assertNotInfinite(this.size);
	      var object = {};
	      this.__iterate(function(v, k)  { object[k] = v; });
	      return object;
	    },

	    toOrderedMap: function() {
	      // Use Late Binding here to solve the circular dependency.
	      return OrderedMap(this.toKeyedSeq());
	    },

	    toOrderedSet: function() {
	      // Use Late Binding here to solve the circular dependency.
	      return OrderedSet(isKeyed(this) ? this.valueSeq() : this);
	    },

	    toSet: function() {
	      // Use Late Binding here to solve the circular dependency.
	      return Set(isKeyed(this) ? this.valueSeq() : this);
	    },

	    toSetSeq: function() {
	      return new ToSetSequence(this);
	    },

	    toSeq: function() {
	      return isIndexed(this) ? this.toIndexedSeq() :
	        isKeyed(this) ? this.toKeyedSeq() :
	        this.toSetSeq();
	    },

	    toStack: function() {
	      // Use Late Binding here to solve the circular dependency.
	      return Stack(isKeyed(this) ? this.valueSeq() : this);
	    },

	    toList: function() {
	      // Use Late Binding here to solve the circular dependency.
	      return List(isKeyed(this) ? this.valueSeq() : this);
	    },


	    // ### Common JavaScript methods and properties

	    toString: function() {
	      return '[Iterable]';
	    },

	    __toString: function(head, tail) {
	      if (this.size === 0) {
	        return head + tail;
	      }
	      return head + ' ' + this.toSeq().map(this.__toStringMapper).join(', ') + ' ' + tail;
	    },


	    // ### ES6 Collection methods (ES6 Array and Map)

	    concat: function() {var values = SLICE$0.call(arguments, 0);
	      return reify(this, concatFactory(this, values));
	    },

	    includes: function(searchValue) {
	      return this.some(function(value ) {return is(value, searchValue)});
	    },

	    entries: function() {
	      return this.__iterator(ITERATE_ENTRIES);
	    },

	    every: function(predicate, context) {
	      assertNotInfinite(this.size);
	      var returnValue = true;
	      this.__iterate(function(v, k, c)  {
	        if (!predicate.call(context, v, k, c)) {
	          returnValue = false;
	          return false;
	        }
	      });
	      return returnValue;
	    },

	    filter: function(predicate, context) {
	      return reify(this, filterFactory(this, predicate, context, true));
	    },

	    find: function(predicate, context, notSetValue) {
	      var entry = this.findEntry(predicate, context);
	      return entry ? entry[1] : notSetValue;
	    },

	    forEach: function(sideEffect, context) {
	      assertNotInfinite(this.size);
	      return this.__iterate(context ? sideEffect.bind(context) : sideEffect);
	    },

	    join: function(separator) {
	      assertNotInfinite(this.size);
	      separator = separator !== undefined ? '' + separator : ',';
	      var joined = '';
	      var isFirst = true;
	      this.__iterate(function(v ) {
	        isFirst ? (isFirst = false) : (joined += separator);
	        joined += v !== null && v !== undefined ? v.toString() : '';
	      });
	      return joined;
	    },

	    keys: function() {
	      return this.__iterator(ITERATE_KEYS);
	    },

	    map: function(mapper, context) {
	      return reify(this, mapFactory(this, mapper, context));
	    },

	    reduce: function(reducer, initialReduction, context) {
	      assertNotInfinite(this.size);
	      var reduction;
	      var useFirst;
	      if (arguments.length < 2) {
	        useFirst = true;
	      } else {
	        reduction = initialReduction;
	      }
	      this.__iterate(function(v, k, c)  {
	        if (useFirst) {
	          useFirst = false;
	          reduction = v;
	        } else {
	          reduction = reducer.call(context, reduction, v, k, c);
	        }
	      });
	      return reduction;
	    },

	    reduceRight: function(reducer, initialReduction, context) {
	      var reversed = this.toKeyedSeq().reverse();
	      return reversed.reduce.apply(reversed, arguments);
	    },

	    reverse: function() {
	      return reify(this, reverseFactory(this, true));
	    },

	    slice: function(begin, end) {
	      return reify(this, sliceFactory(this, begin, end, true));
	    },

	    some: function(predicate, context) {
	      return !this.every(not(predicate), context);
	    },

	    sort: function(comparator) {
	      return reify(this, sortFactory(this, comparator));
	    },

	    values: function() {
	      return this.__iterator(ITERATE_VALUES);
	    },


	    // ### More sequential methods

	    butLast: function() {
	      return this.slice(0, -1);
	    },

	    isEmpty: function() {
	      return this.size !== undefined ? this.size === 0 : !this.some(function()  {return true});
	    },

	    count: function(predicate, context) {
	      return ensureSize(
	        predicate ? this.toSeq().filter(predicate, context) : this
	      );
	    },

	    countBy: function(grouper, context) {
	      return countByFactory(this, grouper, context);
	    },

	    equals: function(other) {
	      return deepEqual(this, other);
	    },

	    entrySeq: function() {
	      var iterable = this;
	      if (iterable._cache) {
	        // We cache as an entries array, so we can just return the cache!
	        return new ArraySeq(iterable._cache);
	      }
	      var entriesSequence = iterable.toSeq().map(entryMapper).toIndexedSeq();
	      entriesSequence.fromEntrySeq = function()  {return iterable.toSeq()};
	      return entriesSequence;
	    },

	    filterNot: function(predicate, context) {
	      return this.filter(not(predicate), context);
	    },

	    findEntry: function(predicate, context, notSetValue) {
	      var found = notSetValue;
	      this.__iterate(function(v, k, c)  {
	        if (predicate.call(context, v, k, c)) {
	          found = [k, v];
	          return false;
	        }
	      });
	      return found;
	    },

	    findKey: function(predicate, context) {
	      var entry = this.findEntry(predicate, context);
	      return entry && entry[0];
	    },

	    findLast: function(predicate, context, notSetValue) {
	      return this.toKeyedSeq().reverse().find(predicate, context, notSetValue);
	    },

	    findLastEntry: function(predicate, context, notSetValue) {
	      return this.toKeyedSeq().reverse().findEntry(predicate, context, notSetValue);
	    },

	    findLastKey: function(predicate, context) {
	      return this.toKeyedSeq().reverse().findKey(predicate, context);
	    },

	    first: function() {
	      return this.find(returnTrue);
	    },

	    flatMap: function(mapper, context) {
	      return reify(this, flatMapFactory(this, mapper, context));
	    },

	    flatten: function(depth) {
	      return reify(this, flattenFactory(this, depth, true));
	    },

	    fromEntrySeq: function() {
	      return new FromEntriesSequence(this);
	    },

	    get: function(searchKey, notSetValue) {
	      return this.find(function(_, key)  {return is(key, searchKey)}, undefined, notSetValue);
	    },

	    getIn: function(searchKeyPath, notSetValue) {
	      var nested = this;
	      // Note: in an ES6 environment, we would prefer:
	      // for (var key of searchKeyPath) {
	      var iter = forceIterator(searchKeyPath);
	      var step;
	      while (!(step = iter.next()).done) {
	        var key = step.value;
	        nested = nested && nested.get ? nested.get(key, NOT_SET) : NOT_SET;
	        if (nested === NOT_SET) {
	          return notSetValue;
	        }
	      }
	      return nested;
	    },

	    groupBy: function(grouper, context) {
	      return groupByFactory(this, grouper, context);
	    },

	    has: function(searchKey) {
	      return this.get(searchKey, NOT_SET) !== NOT_SET;
	    },

	    hasIn: function(searchKeyPath) {
	      return this.getIn(searchKeyPath, NOT_SET) !== NOT_SET;
	    },

	    isSubset: function(iter) {
	      iter = typeof iter.includes === 'function' ? iter : Iterable(iter);
	      return this.every(function(value ) {return iter.includes(value)});
	    },

	    isSuperset: function(iter) {
	      iter = typeof iter.isSubset === 'function' ? iter : Iterable(iter);
	      return iter.isSubset(this);
	    },

	    keyOf: function(searchValue) {
	      return this.findKey(function(value ) {return is(value, searchValue)});
	    },

	    keySeq: function() {
	      return this.toSeq().map(keyMapper).toIndexedSeq();
	    },

	    last: function() {
	      return this.toSeq().reverse().first();
	    },

	    lastKeyOf: function(searchValue) {
	      return this.toKeyedSeq().reverse().keyOf(searchValue);
	    },

	    max: function(comparator) {
	      return maxFactory(this, comparator);
	    },

	    maxBy: function(mapper, comparator) {
	      return maxFactory(this, comparator, mapper);
	    },

	    min: function(comparator) {
	      return maxFactory(this, comparator ? neg(comparator) : defaultNegComparator);
	    },

	    minBy: function(mapper, comparator) {
	      return maxFactory(this, comparator ? neg(comparator) : defaultNegComparator, mapper);
	    },

	    rest: function() {
	      return this.slice(1);
	    },

	    skip: function(amount) {
	      return this.slice(Math.max(0, amount));
	    },

	    skipLast: function(amount) {
	      return reify(this, this.toSeq().reverse().skip(amount).reverse());
	    },

	    skipWhile: function(predicate, context) {
	      return reify(this, skipWhileFactory(this, predicate, context, true));
	    },

	    skipUntil: function(predicate, context) {
	      return this.skipWhile(not(predicate), context);
	    },

	    sortBy: function(mapper, comparator) {
	      return reify(this, sortFactory(this, comparator, mapper));
	    },

	    take: function(amount) {
	      return this.slice(0, Math.max(0, amount));
	    },

	    takeLast: function(amount) {
	      return reify(this, this.toSeq().reverse().take(amount).reverse());
	    },

	    takeWhile: function(predicate, context) {
	      return reify(this, takeWhileFactory(this, predicate, context));
	    },

	    takeUntil: function(predicate, context) {
	      return this.takeWhile(not(predicate), context);
	    },

	    valueSeq: function() {
	      return this.toIndexedSeq();
	    },


	    // ### Hashable Object

	    hashCode: function() {
	      return this.__hash || (this.__hash = hashIterable(this));
	    }


	    // ### Internal

	    // abstract __iterate(fn, reverse)

	    // abstract __iterator(type, reverse)
	  });

	  // var IS_ITERABLE_SENTINEL = '@@__IMMUTABLE_ITERABLE__@@';
	  // var IS_KEYED_SENTINEL = '@@__IMMUTABLE_KEYED__@@';
	  // var IS_INDEXED_SENTINEL = '@@__IMMUTABLE_INDEXED__@@';
	  // var IS_ORDERED_SENTINEL = '@@__IMMUTABLE_ORDERED__@@';

	  var IterablePrototype = Iterable.prototype;
	  IterablePrototype[IS_ITERABLE_SENTINEL] = true;
	  IterablePrototype[ITERATOR_SYMBOL] = IterablePrototype.values;
	  IterablePrototype.__toJS = IterablePrototype.toArray;
	  IterablePrototype.__toStringMapper = quoteString;
	  IterablePrototype.inspect =
	  IterablePrototype.toSource = function() { return this.toString(); };
	  IterablePrototype.chain = IterablePrototype.flatMap;
	  IterablePrototype.contains = IterablePrototype.includes;

	  mixin(KeyedIterable, {

	    // ### More sequential methods

	    flip: function() {
	      return reify(this, flipFactory(this));
	    },

	    mapEntries: function(mapper, context) {var this$0 = this;
	      var iterations = 0;
	      return reify(this,
	        this.toSeq().map(
	          function(v, k)  {return mapper.call(context, [k, v], iterations++, this$0)}
	        ).fromEntrySeq()
	      );
	    },

	    mapKeys: function(mapper, context) {var this$0 = this;
	      return reify(this,
	        this.toSeq().flip().map(
	          function(k, v)  {return mapper.call(context, k, v, this$0)}
	        ).flip()
	      );
	    }

	  });

	  var KeyedIterablePrototype = KeyedIterable.prototype;
	  KeyedIterablePrototype[IS_KEYED_SENTINEL] = true;
	  KeyedIterablePrototype[ITERATOR_SYMBOL] = IterablePrototype.entries;
	  KeyedIterablePrototype.__toJS = IterablePrototype.toObject;
	  KeyedIterablePrototype.__toStringMapper = function(v, k)  {return JSON.stringify(k) + ': ' + quoteString(v)};



	  mixin(IndexedIterable, {

	    // ### Conversion to other types

	    toKeyedSeq: function() {
	      return new ToKeyedSequence(this, false);
	    },


	    // ### ES6 Collection methods (ES6 Array and Map)

	    filter: function(predicate, context) {
	      return reify(this, filterFactory(this, predicate, context, false));
	    },

	    findIndex: function(predicate, context) {
	      var entry = this.findEntry(predicate, context);
	      return entry ? entry[0] : -1;
	    },

	    indexOf: function(searchValue) {
	      var key = this.keyOf(searchValue);
	      return key === undefined ? -1 : key;
	    },

	    lastIndexOf: function(searchValue) {
	      var key = this.lastKeyOf(searchValue);
	      return key === undefined ? -1 : key;
	    },

	    reverse: function() {
	      return reify(this, reverseFactory(this, false));
	    },

	    slice: function(begin, end) {
	      return reify(this, sliceFactory(this, begin, end, false));
	    },

	    splice: function(index, removeNum /*, ...values*/) {
	      var numArgs = arguments.length;
	      removeNum = Math.max(removeNum | 0, 0);
	      if (numArgs === 0 || (numArgs === 2 && !removeNum)) {
	        return this;
	      }
	      // If index is negative, it should resolve relative to the size of the
	      // collection. However size may be expensive to compute if not cached, so
	      // only call count() if the number is in fact negative.
	      index = resolveBegin(index, index < 0 ? this.count() : this.size);
	      var spliced = this.slice(0, index);
	      return reify(
	        this,
	        numArgs === 1 ?
	          spliced :
	          spliced.concat(arrCopy(arguments, 2), this.slice(index + removeNum))
	      );
	    },


	    // ### More collection methods

	    findLastIndex: function(predicate, context) {
	      var entry = this.findLastEntry(predicate, context);
	      return entry ? entry[0] : -1;
	    },

	    first: function() {
	      return this.get(0);
	    },

	    flatten: function(depth) {
	      return reify(this, flattenFactory(this, depth, false));
	    },

	    get: function(index, notSetValue) {
	      index = wrapIndex(this, index);
	      return (index < 0 || (this.size === Infinity ||
	          (this.size !== undefined && index > this.size))) ?
	        notSetValue :
	        this.find(function(_, key)  {return key === index}, undefined, notSetValue);
	    },

	    has: function(index) {
	      index = wrapIndex(this, index);
	      return index >= 0 && (this.size !== undefined ?
	        this.size === Infinity || index < this.size :
	        this.indexOf(index) !== -1
	      );
	    },

	    interpose: function(separator) {
	      return reify(this, interposeFactory(this, separator));
	    },

	    interleave: function(/*...iterables*/) {
	      var iterables = [this].concat(arrCopy(arguments));
	      var zipped = zipWithFactory(this.toSeq(), IndexedSeq.of, iterables);
	      var interleaved = zipped.flatten(true);
	      if (zipped.size) {
	        interleaved.size = zipped.size * iterables.length;
	      }
	      return reify(this, interleaved);
	    },

	    keySeq: function() {
	      return Range(0, this.size);
	    },

	    last: function() {
	      return this.get(-1);
	    },

	    skipWhile: function(predicate, context) {
	      return reify(this, skipWhileFactory(this, predicate, context, false));
	    },

	    zip: function(/*, ...iterables */) {
	      var iterables = [this].concat(arrCopy(arguments));
	      return reify(this, zipWithFactory(this, defaultZipper, iterables));
	    },

	    zipWith: function(zipper/*, ...iterables */) {
	      var iterables = arrCopy(arguments);
	      iterables[0] = this;
	      return reify(this, zipWithFactory(this, zipper, iterables));
	    }

	  });

	  IndexedIterable.prototype[IS_INDEXED_SENTINEL] = true;
	  IndexedIterable.prototype[IS_ORDERED_SENTINEL] = true;



	  mixin(SetIterable, {

	    // ### ES6 Collection methods (ES6 Array and Map)

	    get: function(value, notSetValue) {
	      return this.has(value) ? value : notSetValue;
	    },

	    includes: function(value) {
	      return this.has(value);
	    },


	    // ### More sequential methods

	    keySeq: function() {
	      return this.valueSeq();
	    }

	  });

	  SetIterable.prototype.has = IterablePrototype.includes;
	  SetIterable.prototype.contains = SetIterable.prototype.includes;


	  // Mixin subclasses

	  mixin(KeyedSeq, KeyedIterable.prototype);
	  mixin(IndexedSeq, IndexedIterable.prototype);
	  mixin(SetSeq, SetIterable.prototype);

	  mixin(KeyedCollection, KeyedIterable.prototype);
	  mixin(IndexedCollection, IndexedIterable.prototype);
	  mixin(SetCollection, SetIterable.prototype);


	  // #pragma Helper functions

	  function keyMapper(v, k) {
	    return k;
	  }

	  function entryMapper(v, k) {
	    return [k, v];
	  }

	  function not(predicate) {
	    return function() {
	      return !predicate.apply(this, arguments);
	    }
	  }

	  function neg(predicate) {
	    return function() {
	      return -predicate.apply(this, arguments);
	    }
	  }

	  function quoteString(value) {
	    return typeof value === 'string' ? JSON.stringify(value) : String(value);
	  }

	  function defaultZipper() {
	    return arrCopy(arguments);
	  }

	  function defaultNegComparator(a, b) {
	    return a < b ? 1 : a > b ? -1 : 0;
	  }

	  function hashIterable(iterable) {
	    if (iterable.size === Infinity) {
	      return 0;
	    }
	    var ordered = isOrdered(iterable);
	    var keyed = isKeyed(iterable);
	    var h = ordered ? 1 : 0;
	    var size = iterable.__iterate(
	      keyed ?
	        ordered ?
	          function(v, k)  { h = 31 * h + hashMerge(hash(v), hash(k)) | 0; } :
	          function(v, k)  { h = h + hashMerge(hash(v), hash(k)) | 0; } :
	        ordered ?
	          function(v ) { h = 31 * h + hash(v) | 0; } :
	          function(v ) { h = h + hash(v) | 0; }
	    );
	    return murmurHashOfSize(size, h);
	  }

	  function murmurHashOfSize(size, h) {
	    h = imul(h, 0xCC9E2D51);
	    h = imul(h << 15 | h >>> -15, 0x1B873593);
	    h = imul(h << 13 | h >>> -13, 5);
	    h = (h + 0xE6546B64 | 0) ^ size;
	    h = imul(h ^ h >>> 16, 0x85EBCA6B);
	    h = imul(h ^ h >>> 13, 0xC2B2AE35);
	    h = smi(h ^ h >>> 16);
	    return h;
	  }

	  function hashMerge(a, b) {
	    return a ^ b + 0x9E3779B9 + (a << 6) + (a >> 2) | 0; // int
	  }

	  var Immutable = {

	    Iterable: Iterable,

	    Seq: Seq,
	    Collection: Collection,
	    Map: Map,
	    OrderedMap: OrderedMap,
	    List: List,
	    Stack: Stack,
	    Set: Set,
	    OrderedSet: OrderedSet,

	    Record: Record,
	    Range: Range,
	    Repeat: Repeat,

	    is: is,
	    fromJS: fromJS

	  };

	  return Immutable;

	}));

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var QuickStartDescription = __webpack_require__(53);
	var ReactPlayground = __webpack_require__(56);
	//this leads to Row is undefined?
	var Row = __webpack_require__(70).Row;

	var SimpleExample = '\n\n//helper to generate a random date\nfunction randomDate(start, end) {\n  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();\n};\n\nvar _rows = [];\nfor (var i = 1; i < 1000; i++) {\n  _rows.push({\n    id: i,\n    task: \'Task \' + i,\n    complete: Math.min(100, Math.round(Math.random() * 110)),\n    priority : [\'Critical\', \'High\', \'Medium\', \'Low\'][Math.floor((Math.random() * 3) + 1)],\n    issueType : [\'Bug\', \'Improvement\', \'Epic\', \'Story\'][Math.floor((Math.random() * 3) + 1)],\n    startDate: randomDate(new Date(2015, 3, 1), new Date()),\n    completeDate: randomDate(new Date(), new Date(2016, 0, 1))\n  });\n};\n\n//function to retrieve a row for a given index\nvar rowGetter = function(i){\n  return _rows[i];\n};\n\n\n//Columns definition\nvar columns = [\n{\n  key: \'id\',\n  name: \'ID\',\n  locked : true\n},\n{\n  key: \'task\',\n  name: \'Title\',\n  width: 200\n},\n{\n  key: \'priority\',\n  name: \'Priority\',\n  width: 200\n},\n{\n  key: \'issueType\',\n  name: \'Issue Type\',\n  width: 200\n},\n{\n  key: \'complete\',\n  name: \'% Complete\',\n  width: 200\n},\n{\n  key: \'startDate\',\n  name: \'Start Date\',\n  width: 200\n},\n{\n  key: \'completeDate\',\n  name: \'Expected Complete\',\n  width: 200\n},\n{\n  key: \'completeDate\',\n  name: \'Expected Complete\',\n  width: 200\n}\n]\n\n\n\n\nvar RowRenderer = React.createClass({\n  setScrollLeft: function(scrollBy) {\n    //if you want freeze columns to work, you need to make sure you implement this as apass through\n    this.refs.row.setScrollLeft(scrollBy);\n  },\n getRowStyle: function() {\n   return {\n     color: this.getRowBackground()\n   }\n },\n getRowBackground: function() {\n   return this.props.idx % 2 ?  \'green\' : \'blue\'\n },\n render: function() {\n   //here we are just changing the style\n   //but we could replace this with anything we liked, cards, images, etc\n   //usually though it will just be a matter of wrapping a div, and then calling back through to the grid\n   return (<div style={this.getRowStyle()}><ReactDataGrid.Row ref="row" {...this.props}/></div>)\n }\n});\n\nvar Example = React.createClass({\n  render: function() {\n    return  (<ReactDataGrid\n    columns={columns}\n    rowGetter={rowGetter}\n    rowsCount={_rows.length}\n    minHeight={500}\n    rowRenderer={RowRenderer}/>);\n  }\n});\nReactDOM.render(<Example />, mountNode);\n';

	module.exports = React.createClass({
	  displayName: 'exports',


	  render: function render() {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'h3',
	        null,
	        'Overriding the row renderer'
	      ),
	      React.createElement(
	        'p',
	        null,
	        'This shows how you can easily override the default row renderer'
	      ),
	      React.createElement(
	        'p',
	        null,
	        'Here we are just using that to wrap the default renderer, and then going back into the \'normal\' flow, just changing some backgrounds'
	      ),
	      React.createElement(
	        'p',
	        null,
	        'NOTE: if you want to use fixed columns as well, make sure you implement and pass through the call to setScrollLeft'
	      ),
	      React.createElement(ReactPlayground, { codeText: SimpleExample })
	    );
	  }

	});

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {'use strict';var _typeof2=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol?"symbol":typeof obj;};(function webpackUniversalModuleDefinition(root,factory){if(( false?'undefined':_typeof2(exports))==='object'&&( false?'undefined':_typeof2(module))==='object')module.exports=factory(__webpack_require__(1),__webpack_require__(2));else if(true)!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1),__webpack_require__(2)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else if((typeof exports==='undefined'?'undefined':_typeof2(exports))==='object')exports["ReactDataGrid"]=factory(require("react"),require("react-dom"));else root["ReactDataGrid"]=factory(root["React"],root["ReactDOM"]);})(undefined,function(__WEBPACK_EXTERNAL_MODULE_2__,__WEBPACK_EXTERNAL_MODULE_3__){return  (/******/function(modules){ // webpackBootstrap
	/******/ // The module cache
	/******/var installedModules={}; /******/ // The require function
	/******/function __webpack_require__(moduleId){ /******/ // Check if module is in cache
	/******/if(installedModules[moduleId]) /******/return installedModules[moduleId].exports; /******/ // Create a new module (and put it into the cache)
	/******/var module=installedModules[moduleId]={ /******/exports:{}, /******/id:moduleId, /******/loaded:false /******/}; /******/ // Execute the module function
	/******/modules[moduleId].call(module.exports,module,module.exports,__webpack_require__); /******/ // Flag the module as loaded
	/******/module.loaded=true; /******/ // Return the exports of the module
	/******/return module.exports; /******/} /******/ // expose the modules object (__webpack_modules__)
	/******/__webpack_require__.m=modules; /******/ // expose the module cache
	/******/__webpack_require__.c=installedModules; /******/ // __webpack_public_path__
	/******/__webpack_require__.p=""; /******/ // Load entry module and return exports
	/******/return __webpack_require__(0); /******/}( /************************************************************************/ /******/[ /* 0 */ /***/function(module,exports,__webpack_require__){'use strict';module.exports=__webpack_require__(1);module.exports.Editors=__webpack_require__(103);module.exports.Formatters=__webpack_require__(107);module.exports.Toolbar=__webpack_require__(109);module.exports.Row=__webpack_require__(87);module.exports.Menu=__webpack_require__(110); /***/}, /* 1 */ /***/function(module,exports,__webpack_require__){'use strict';var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else {obj[key]=value;}return obj;}var React=__webpack_require__(2);var ReactDOM=__webpack_require__(3);var BaseGrid=__webpack_require__(4);var Row=__webpack_require__(87);var ExcelColumn=__webpack_require__(15);var KeyboardHandlerMixin=__webpack_require__(90);var CheckboxEditor=__webpack_require__(99);var DOMMetrics=__webpack_require__(97);var ColumnMetricsMixin=__webpack_require__(100);var RowUtils=__webpack_require__(102);var ColumnUtils=__webpack_require__(10);if(!Object.assign){Object.assign=__webpack_require__(101);}var ReactDataGrid=React.createClass({displayName:'ReactDataGrid',mixins:[ColumnMetricsMixin,DOMMetrics.MetricsComputatorMixin,KeyboardHandlerMixin],propTypes:{rowHeight:React.PropTypes.number.isRequired,headerRowHeight:React.PropTypes.number,minHeight:React.PropTypes.number.isRequired,minWidth:React.PropTypes.number,enableRowSelect:React.PropTypes.oneOfType([React.PropTypes.bool,React.PropTypes.string]),onRowUpdated:React.PropTypes.func,rowGetter:React.PropTypes.func.isRequired,rowsCount:React.PropTypes.number.isRequired,toolbar:React.PropTypes.element,enableCellSelect:React.PropTypes.bool,columns:React.PropTypes.oneOfType([React.PropTypes.object,React.PropTypes.array]).isRequired,onFilter:React.PropTypes.func,onCellCopyPaste:React.PropTypes.func,onCellsDragged:React.PropTypes.func,onAddFilter:React.PropTypes.func,onGridSort:React.PropTypes.func,onDragHandleDoubleClick:React.PropTypes.func,onGridRowsUpdated:React.PropTypes.func,onRowSelect:React.PropTypes.func,rowKey:React.PropTypes.string,rowScrollTimeout:React.PropTypes.number,onClearFilters:React.PropTypes.func,contextMenu:React.PropTypes.element,cellNavigationMode:React.PropTypes.oneOf(['none','loopOverRow','changeRow']),onCellSelected:React.PropTypes.func,onCellDeSelected:React.PropTypes.func},getDefaultProps:function getDefaultProps(){return {enableCellSelect:false,tabIndex:-1,rowHeight:35,enableRowSelect:false,minHeight:350,rowKey:'id',rowScrollTimeout:0,cellNavigationMode:'none'};},getInitialState:function getInitialState(){var columnMetrics=this.createColumnMetrics();var initialState={columnMetrics:columnMetrics,selectedRows:[],copied:null,expandedRows:[],canFilter:false,columnFilters:{},sortDirection:null,sortColumn:null,dragged:null,scrollOffset:0};if(this.props.enableCellSelect){initialState.selected={rowIdx:0,idx:0};}else {initialState.selected={rowIdx:-1,idx:-1};}return initialState;},hasSelectedCellChanged:function hasSelectedCellChanged(selected){var previouslySelected=Object.assign({},this.state.selected);return previouslySelected.rowIdx!==selected.rowIdx||previouslySelected.idx!==selected.idx||previouslySelected.active===false;},onContextMenuHide:function onContextMenuHide(){document.removeEventListener('click',this.onContextMenuHide);var newSelected=Object.assign({},this.state.selected,{contextMenuDisplayed:false});this.setState({selected:newSelected});},onColumnEvent:function onColumnEvent(ev,columnEvent){var idx=columnEvent.idx;var name=columnEvent.name;if(name&&typeof idx!=='undefined'){var column=this.getColumn(idx);if(column&&column.events&&column.events[name]&&typeof column.events[name]==='function'){var eventArgs={rowIdx:columnEvent.rowIdx,idx:idx,column:column};column.events[name](ev,eventArgs);}}},onSelect:function onSelect(selected){var _this=this;if(this.state.selected.rowIdx!==selected.rowIdx||this.state.selected.idx!==selected.idx||this.state.selected.active===false){var _idx=selected.idx;var _rowIdx=selected.rowIdx;if(_idx>=0&&_rowIdx>=0&&_idx<ColumnUtils.getSize(this.state.columnMetrics.columns)&&_rowIdx<this.props.rowsCount){(function(){var oldSelection=_this.state.selected;_this.setState({selected:selected},function(){if(typeof _this.props.onCellDeSelected==='function'){_this.props.onCellDeSelected(oldSelection);}if(typeof _this.props.onCellSelected==='function'){_this.props.onCellSelected(selected);}});})();}}},onCellClick:function onCellClick(cell){this.onSelect({rowIdx:cell.rowIdx,idx:cell.idx});},onCellContextMenu:function onCellContextMenu(cell){this.onSelect({rowIdx:cell.rowIdx,idx:cell.idx,contextMenuDisplayed:this.props.contextMenu});if(this.props.contextMenu){document.addEventListener('click',this.onContextMenuHide);}},onCellDoubleClick:function onCellDoubleClick(cell){this.onSelect({rowIdx:cell.rowIdx,idx:cell.idx});this.setActive('Enter');},onViewportDoubleClick:function onViewportDoubleClick(){this.setActive();},onPressArrowUp:function onPressArrowUp(e){this.moveSelectedCell(e,-1,0);},onPressArrowDown:function onPressArrowDown(e){this.moveSelectedCell(e,1,0);},onPressArrowLeft:function onPressArrowLeft(e){this.moveSelectedCell(e,0,-1);},onPressArrowRight:function onPressArrowRight(e){this.moveSelectedCell(e,0,1);},onPressTab:function onPressTab(e){this.moveSelectedCell(e,0,e.shiftKey?-1:1);},onPressEnter:function onPressEnter(e){this.setActive(e.key);},onPressDelete:function onPressDelete(e){this.setActive(e.key);},onPressEscape:function onPressEscape(e){this.setInactive(e.key);},onPressBackspace:function onPressBackspace(e){this.setActive(e.key);},onPressChar:function onPressChar(e){if(this.isKeyPrintable(e.keyCode)){this.setActive(e.keyCode);}},onPressKeyWithCtrl:function onPressKeyWithCtrl(e){var keys={KeyCode_c:99,KeyCode_C:67,KeyCode_V:86,KeyCode_v:118};var rowIdx=this.state.selected.rowIdx;var row=this.props.rowGetter(rowIdx);var idx=this.state.selected.idx;var col=this.getColumn(idx);if(ColumnUtils.canEdit(col,row,this.props.enableCellSelect)){if(e.keyCode===keys.KeyCode_c||e.keyCode===keys.KeyCode_C){var _value=this.getSelectedValue();this.handleCopy({value:_value});}else if(e.keyCode===keys.KeyCode_v||e.keyCode===keys.KeyCode_V){this.handlePaste();}}},onCellCommit:function onCellCommit(commit){var selected=Object.assign({},this.state.selected);selected.active=false;if(commit.key==='Tab'){selected.idx+=1;}var expandedRows=this.state.expandedRows; // if(commit.changed && commit.changed.expandedHeight){
	//   expandedRows = this.expandRow(commit.rowIdx, commit.changed.expandedHeight);
	// }
	this.setState({selected:selected,expandedRows:expandedRows});if(this.props.onRowUpdated){this.props.onRowUpdated(commit);}var targetRow=commit.rowIdx;if(this.props.onGridRowsUpdated){this.props.onGridRowsUpdated({cellKey:commit.cellKey,fromRow:targetRow,toRow:targetRow,updated:commit.updated,action:'cellUpdate'});}},onDragStart:function onDragStart(e){var value=this.getSelectedValue();this.handleDragStart({idx:this.state.selected.idx,rowIdx:this.state.selected.rowIdx,value:value}); // need to set dummy data for FF
	if(e&&e.dataTransfer){if(e.dataTransfer.setData){e.dataTransfer.dropEffect='move';e.dataTransfer.effectAllowed='move';e.dataTransfer.setData('text/plain','dummy');}}},onToggleFilter:function onToggleFilter(){var _this2=this; // setState() does not immediately mutate this.state but creates a pending state transition.
	// Therefore if you want to do something after the state change occurs, pass it in as a callback function.
	this.setState({canFilter:!this.state.canFilter},function(){if(_this2.state.canFilter===false&&_this2.props.onClearFilters){_this2.props.onClearFilters();}});},onDragHandleDoubleClick:function onDragHandleDoubleClick(e){if(this.props.onDragHandleDoubleClick){this.props.onDragHandleDoubleClick(e);}if(this.props.onGridRowsUpdated){var cellKey=this.getColumn(e.idx).key;var updated=_defineProperty({},cellKey,e.rowData[cellKey]);this.props.onGridRowsUpdated({cellKey:cellKey,fromRow:e.rowIdx,toRow:this.props.rowsCount-1,updated:updated,action:'columnFill'});}},handleDragStart:function handleDragStart(dragged){if(!this.dragEnabled()){return;}var idx=dragged.idx;var rowIdx=dragged.rowIdx;if(idx>=0&&rowIdx>=0&&idx<this.getSize()&&rowIdx<this.props.rowsCount){this.setState({dragged:dragged});}},handleDragEnd:function handleDragEnd(){if(!this.dragEnabled()){return;}var fromRow=void 0;var toRow=void 0;var selected=this.state.selected;var dragged=this.state.dragged;var cellKey=this.getColumn(this.state.selected.idx).key;fromRow=selected.rowIdx<dragged.overRowIdx?selected.rowIdx:dragged.overRowIdx;toRow=selected.rowIdx>dragged.overRowIdx?selected.rowIdx:dragged.overRowIdx;if(this.props.onCellsDragged){this.props.onCellsDragged({cellKey:cellKey,fromRow:fromRow,toRow:toRow,value:dragged.value});}if(this.props.onGridRowsUpdated){var updated=_defineProperty({},cellKey,dragged.value);this.props.onGridRowsUpdated({cellKey:cellKey,fromRow:fromRow,toRow:toRow,updated:updated,action:'cellDrag'});}this.setState({dragged:{complete:true}});},handleDragEnter:function handleDragEnter(row){if(!this.dragEnabled()){return;}var dragged=this.state.dragged;dragged.overRowIdx=row;this.setState({dragged:dragged});},handleTerminateDrag:function handleTerminateDrag(){if(!this.dragEnabled()){return;}this.setState({dragged:null});},handlePaste:function handlePaste(){if(!this.copyPasteEnabled()){return;}var selected=this.state.selected;var cellKey=this.getColumn(this.state.selected.idx).key;var textToCopy=this.state.textToCopy;var toRow=selected.rowIdx;if(this.props.onCellCopyPaste){this.props.onCellCopyPaste({cellKey:cellKey,rowIdx:toRow,value:textToCopy,fromRow:this.state.copied.rowIdx,toRow:toRow});}if(this.props.onGridRowsUpdated){var updated=_defineProperty({},cellKey,textToCopy);this.props.onGridRowsUpdated({cellKey:cellKey,fromRow:toRow,toRow:toRow,updated:updated,action:'copyPaste'});}this.setState({copied:null});},handleCopy:function handleCopy(args){if(!this.copyPasteEnabled()){return;}var textToCopy=args.value;var selected=this.state.selected;var copied={idx:selected.idx,rowIdx:selected.rowIdx};this.setState({textToCopy:textToCopy,copied:copied});},handleSort:function handleSort(columnKey,direction){this.setState({sortDirection:direction,sortColumn:columnKey},function(){this.props.onGridSort(columnKey,direction);});},getSelectedRow:function getSelectedRow(rows,key){var _this3=this;var selectedRow=rows.filter(function(r){if(r[_this3.props.rowKey]===key){return true;}return false;});if(selectedRow.length>0){return selectedRow[0];}}, // columnKey not used here as this function will select the whole row,
	// but needed to match the function signature in the CheckboxEditor
	handleRowSelect:function handleRowSelect(rowIdx,columnKey,rowData,e){e.stopPropagation();var selectedRows=this.props.enableRowSelect==='single'?[]:this.state.selectedRows.slice(0);var selectedRow=this.getSelectedRow(selectedRows,rowData[this.props.rowKey]);if(selectedRow){selectedRow.isSelected=!selectedRow.isSelected;}else {rowData.isSelected=true;selectedRows.push(rowData);}this.setState({selectedRows:selectedRows,selected:{rowIdx:rowIdx,idx:0}});if(this.props.onRowSelect){this.props.onRowSelect(selectedRows.filter(function(r){return r.isSelected===true;}));}},handleCheckboxChange:function handleCheckboxChange(e){var allRowsSelected=void 0;if(e.currentTarget instanceof HTMLInputElement&&e.currentTarget.checked===true){allRowsSelected=true;}else {allRowsSelected=false;}var selectedRows=[];for(var i=0;i<this.props.rowsCount;i++){var row=Object.assign({},this.props.rowGetter(i),{isSelected:allRowsSelected});selectedRows.push(row);}this.setState({selectedRows:selectedRows});if(typeof this.props.onRowSelect==='function'){this.props.onRowSelect(selectedRows.filter(function(r){return r.isSelected===true;}));}},getScrollOffSet:function getScrollOffSet(){var scrollOffset=0;var canvas=ReactDOM.findDOMNode(this).querySelector('.react-grid-Canvas');if(canvas){scrollOffset=canvas.offsetWidth-canvas.clientWidth;}this.setState({scrollOffset:scrollOffset});},getRowOffsetHeight:function getRowOffsetHeight(){var offsetHeight=0;this.getHeaderRows().forEach(function(row){return offsetHeight+=parseFloat(row.height,10);});return offsetHeight;},getHeaderRows:function getHeaderRows(){var rows=[{ref:'row',height:this.props.headerRowHeight||this.props.rowHeight,rowType:'header'}];if(this.state.canFilter===true){rows.push({ref:'filterRow',filterable:true,onFilterChange:this.props.onAddFilter,height:45,rowType:'filter'});}return rows;},getInitialSelectedRows:function getInitialSelectedRows(){var selectedRows=[];for(var i=0;i<this.props.rowsCount;i++){selectedRows.push(false);}return selectedRows;},getSelectedValue:function getSelectedValue(){var rowIdx=this.state.selected.rowIdx;var idx=this.state.selected.idx;var cellKey=this.getColumn(idx).key;var row=this.props.rowGetter(rowIdx);return RowUtils.get(row,cellKey);},moveSelectedCell:function moveSelectedCell(e,rowDelta,cellDelta){ // we need to prevent default as we control grid scroll
	// otherwise it moves every time you left/right which is janky
	e.preventDefault();var rowIdx=void 0;var idx=void 0;var cellNavigationMode=this.props.cellNavigationMode;if(cellNavigationMode!=='none'){var _calculateNextSelecti=this.calculateNextSelectionPosition(cellNavigationMode,cellDelta,rowDelta);idx=_calculateNextSelecti.idx;rowIdx=_calculateNextSelecti.rowIdx;}else {rowIdx=this.state.selected.rowIdx+rowDelta;idx=this.state.selected.idx+cellDelta;}this.onSelect({idx:idx,rowIdx:rowIdx});},getNbrColumns:function getNbrColumns(){var _props=this.props;var columns=_props.columns;var enableRowSelect=_props.enableRowSelect;return enableRowSelect?columns.length+1:columns.length;},calculateNextSelectionPosition:function calculateNextSelectionPosition(cellNavigationMode,cellDelta,rowDelta){var _rowDelta=rowDelta;var idx=this.state.selected.idx+cellDelta;var nbrColumns=this.getNbrColumns();if(cellDelta>0){if(this.isAtLastCellInRow(nbrColumns)){if(cellNavigationMode==='changeRow'){_rowDelta=this.isAtLastRow()?rowDelta:rowDelta+1;idx=this.isAtLastRow()?idx:0;}else {idx=0;}}}else if(cellDelta<0){if(this.isAtFirstCellInRow()){if(cellNavigationMode==='changeRow'){_rowDelta=this.isAtFirstRow()?rowDelta:rowDelta-1;idx=this.isAtFirstRow()?0:nbrColumns-1;}else {idx=nbrColumns-1;}}}var rowIdx=this.state.selected.rowIdx+_rowDelta;return {idx:idx,rowIdx:rowIdx};},isAtLastCellInRow:function isAtLastCellInRow(nbrColumns){return this.state.selected.idx===nbrColumns-1;},isAtLastRow:function isAtLastRow(){return this.state.selected.rowIdx===this.props.rowsCount-1;},isAtFirstCellInRow:function isAtFirstCellInRow(){return this.state.selected.idx===0;},isAtFirstRow:function isAtFirstRow(){return this.state.selected.rowIdx===0;},openCellEditor:function openCellEditor(rowIdx,idx){var _this4=this;var row=this.props.rowGetter(rowIdx);var col=this.getColumn(idx);if(!ColumnUtils.canEdit(col,row,this.props.enableCellSelect)){return;}var selected={rowIdx:rowIdx,idx:idx};if(this.hasSelectedCellChanged(selected)){this.setState({selected:selected},function(){_this4.setActive('Enter');});}else {this.setActive('Enter');}},setActive:function setActive(keyPressed){var rowIdx=this.state.selected.rowIdx;var row=this.props.rowGetter(rowIdx);var idx=this.state.selected.idx;var col=this.getColumn(idx);if(ColumnUtils.canEdit(col,row,this.props.enableCellSelect)&&!this.isActive()){var _selected=Object.assign(this.state.selected,{idx:idx,rowIdx:rowIdx,active:true,initialKeyCode:keyPressed});this.setState({selected:_selected});}},setInactive:function setInactive(){var rowIdx=this.state.selected.rowIdx;var row=this.props.rowGetter(rowIdx);var idx=this.state.selected.idx;var col=this.getColumn(idx);if(ColumnUtils.canEdit(col,row,this.props.enableCellSelect)&&this.isActive()){var _selected2=Object.assign(this.state.selected,{idx:idx,rowIdx:rowIdx,active:false});this.setState({selected:_selected2});}},isActive:function isActive(){return this.state.selected.active===true;},setupGridColumns:function setupGridColumns(){var props=arguments.length<=0||arguments[0]===undefined?this.props:arguments[0];var cols=props.columns.slice(0);var unshiftedCols={};if(props.enableRowSelect){var headerRenderer=props.enableRowSelect==='single'?null:React.createElement('div',{className:'react-grid-checkbox-container'},React.createElement('input',{className:'react-grid-checkbox',type:'checkbox',name:'select-all-checkbox',onChange:this.handleCheckboxChange}),React.createElement('label',{htmlFor:'select-all-checkbox',className:'react-grid-checkbox-label'}));var selectColumn={key:'select-row',name:'',formatter:React.createElement(CheckboxEditor,null),onCellChange:this.handleRowSelect,filterable:false,headerRenderer:headerRenderer,width:60,locked:true,getRowMetaData:function getRowMetaData(rowData){return rowData;}};unshiftedCols=cols.unshift(selectColumn);cols=unshiftedCols>0?cols:unshiftedCols;}return cols;},copyPasteEnabled:function copyPasteEnabled(){return this.props.onCellCopyPaste!==null;},dragEnabled:function dragEnabled(){return this.props.onCellsDragged!==null;},renderToolbar:function renderToolbar(){var Toolbar=this.props.toolbar;if(React.isValidElement(Toolbar)){return React.cloneElement(Toolbar,{onToggleFilter:this.onToggleFilter,numberOfRows:this.props.rowsCount});}},render:function render(){var cellMetaData={selected:this.state.selected,dragged:this.state.dragged,onCellClick:this.onCellClick,onCellContextMenu:this.onCellContextMenu,onCellDoubleClick:this.onCellDoubleClick,onCommit:this.onCellCommit,onCommitCancel:this.setInactive,copied:this.state.copied,handleDragEnterRow:this.handleDragEnter,handleTerminateDrag:this.handleTerminateDrag,onDragHandleDoubleClick:this.onDragHandleDoubleClick,enableCellSelect:this.props.enableCellSelect,onColumnEvent:this.onColumnEvent,openCellEditor:this.openCellEditor};var toolbar=this.renderToolbar();var containerWidth=this.props.minWidth||this.DOMMetrics.gridWidth();var gridWidth=containerWidth-this.state.scrollOffset; // depending on the current lifecycle stage, gridWidth() may not initialize correctly
	// this also handles cases where it always returns undefined -- such as when inside a div with display:none
	// eg Bootstrap tabs and collapses
	if(typeof containerWidth==='undefined'||isNaN(containerWidth)||containerWidth===0){containerWidth='100%';}if(typeof gridWidth==='undefined'||isNaN(gridWidth)||gridWidth===0){gridWidth='100%';}return React.createElement('div',{className:'react-grid-Container',style:{width:containerWidth}},toolbar,React.createElement('div',{className:'react-grid-Main'},React.createElement(BaseGrid,_extends({ref:'base'},this.props,{rowKey:this.props.rowKey,headerRows:this.getHeaderRows(),columnMetrics:this.state.columnMetrics,rowGetter:this.props.rowGetter,rowsCount:this.props.rowsCount,rowHeight:this.props.rowHeight,cellMetaData:cellMetaData,selectedRows:this.state.selectedRows.filter(function(r){return r.isSelected===true;}),expandedRows:this.state.expandedRows,rowOffsetHeight:this.getRowOffsetHeight(),sortColumn:this.state.sortColumn,sortDirection:this.state.sortDirection,onSort:this.handleSort,minHeight:this.props.minHeight,totalWidth:gridWidth,onViewportKeydown:this.onKeyDown,onViewportDragStart:this.onDragStart,onViewportDragEnd:this.handleDragEnd,onViewportDoubleClick:this.onViewportDoubleClick,onColumnResize:this.onColumnResize,rowScrollTimeout:this.props.rowScrollTimeout,contextMenu:this.props.contextMenu}))));}});module.exports=ReactDataGrid; /***/}, /* 2 */ /***/function(module,exports){module.exports=__WEBPACK_EXTERNAL_MODULE_2__; /***/}, /* 3 */ /***/function(module,exports){module.exports=__WEBPACK_EXTERNAL_MODULE_3__; /***/}, /* 4 */ /***/function(module,exports,__webpack_require__){'use strict';var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var React=__webpack_require__(2);var PropTypes=React.PropTypes;var Header=__webpack_require__(5);var Viewport=__webpack_require__(21);var GridScrollMixin=__webpack_require__(98);var DOMMetrics=__webpack_require__(97);var cellMetaDataShape=__webpack_require__(94);var Grid=React.createClass({displayName:'Grid',propTypes:{rowGetter:PropTypes.oneOfType([PropTypes.array,PropTypes.func]).isRequired,columns:PropTypes.oneOfType([PropTypes.array,PropTypes.object]),columnMetrics:PropTypes.object,minHeight:PropTypes.number,totalWidth:PropTypes.oneOfType([PropTypes.number,PropTypes.string]),headerRows:PropTypes.oneOfType([PropTypes.array,PropTypes.func]),rowHeight:PropTypes.number,rowRenderer:PropTypes.func,emptyRowsView:PropTypes.func,expandedRows:PropTypes.oneOfType([PropTypes.array,PropTypes.func]),selectedRows:PropTypes.oneOfType([PropTypes.array,PropTypes.func]),rowsCount:PropTypes.number,onRows:PropTypes.func,sortColumn:React.PropTypes.string,sortDirection:React.PropTypes.oneOf(['ASC','DESC','NONE']),rowOffsetHeight:PropTypes.number.isRequired,onViewportKeydown:PropTypes.func.isRequired,onViewportDragStart:PropTypes.func.isRequired,onViewportDragEnd:PropTypes.func.isRequired,onViewportDoubleClick:PropTypes.func.isRequired,onColumnResize:PropTypes.func,onSort:PropTypes.func,cellMetaData:PropTypes.shape(cellMetaDataShape),rowKey:PropTypes.string.isRequired,rowScrollTimeout:PropTypes.number,contextMenu:PropTypes.element},mixins:[GridScrollMixin,DOMMetrics.MetricsComputatorMixin],getDefaultProps:function getDefaultProps(){return {rowHeight:35,minHeight:350};},getStyle:function getStyle(){return {overflow:'hidden',outline:0,position:'relative',minHeight:this.props.minHeight};},render:function render(){var headerRows=this.props.headerRows||[{ref:'row'}];var EmptyRowsView=this.props.emptyRowsView;return React.createElement('div',_extends({},this.props,{style:this.getStyle(),className:'react-grid-Grid'}),React.createElement(Header,{ref:'header',columnMetrics:this.props.columnMetrics,onColumnResize:this.props.onColumnResize,height:this.props.rowHeight,totalWidth:this.props.totalWidth,headerRows:headerRows,sortColumn:this.props.sortColumn,sortDirection:this.props.sortDirection,onSort:this.props.onSort,onScroll:this.onHeaderScroll}),this.props.rowsCount>=1||this.props.rowsCount===0&&!this.props.emptyRowsView?React.createElement('div',{ref:'viewPortContainer',onKeyDown:this.props.onViewportKeydown,onDoubleClick:this.props.onViewportDoubleClick,onDragStart:this.props.onViewportDragStart,onDragEnd:this.props.onViewportDragEnd},React.createElement(Viewport,{ref:'viewport',rowKey:this.props.rowKey,width:this.props.columnMetrics.width,rowHeight:this.props.rowHeight,rowRenderer:this.props.rowRenderer,rowGetter:this.props.rowGetter,rowsCount:this.props.rowsCount,selectedRows:this.props.selectedRows,expandedRows:this.props.expandedRows,columnMetrics:this.props.columnMetrics,totalWidth:this.props.totalWidth,onScroll:this.onScroll,onRows:this.props.onRows,cellMetaData:this.props.cellMetaData,rowOffsetHeight:this.props.rowOffsetHeight||this.props.rowHeight*headerRows.length,minHeight:this.props.minHeight,rowScrollTimeout:this.props.rowScrollTimeout,contextMenu:this.props.contextMenu})):React.createElement('div',{ref:'emptyView',className:'react-grid-Empty'},React.createElement(EmptyRowsView,null)));}});module.exports=Grid; /***/}, /* 5 */ /***/function(module,exports,__webpack_require__){'use strict';var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var React=__webpack_require__(2);var ReactDOM=__webpack_require__(3);var joinClasses=__webpack_require__(6);var shallowCloneObject=__webpack_require__(7);var ColumnMetrics=__webpack_require__(8);var ColumnUtils=__webpack_require__(10);var HeaderRow=__webpack_require__(12);var PropTypes=React.PropTypes;var Header=React.createClass({displayName:'Header',propTypes:{columnMetrics:PropTypes.shape({width:PropTypes.number.isRequired,columns:PropTypes.any}).isRequired,totalWidth:PropTypes.oneOfType([PropTypes.number,PropTypes.string]),height:PropTypes.number.isRequired,headerRows:PropTypes.array.isRequired,sortColumn:PropTypes.string,sortDirection:PropTypes.oneOf(['ASC','DESC','NONE']),onSort:PropTypes.func,onColumnResize:PropTypes.func,onScroll:PropTypes.func},getInitialState:function getInitialState(){return {resizing:null};},componentWillReceiveProps:function componentWillReceiveProps(){this.setState({resizing:null});},shouldComponentUpdate:function shouldComponentUpdate(nextProps,nextState){var update=!ColumnMetrics.sameColumns(this.props.columnMetrics.columns,nextProps.columnMetrics.columns,ColumnMetrics.sameColumn)||this.props.totalWidth!==nextProps.totalWidth||this.props.headerRows.length!==nextProps.headerRows.length||this.state.resizing!==nextState.resizing||this.props.sortColumn!==nextProps.sortColumn||this.props.sortDirection!==nextProps.sortDirection;return update;},onColumnResize:function onColumnResize(column,width){var state=this.state.resizing||this.props;var pos=this.getColumnPosition(column);if(pos!=null){var _resizing={columnMetrics:shallowCloneObject(state.columnMetrics)};_resizing.columnMetrics=ColumnMetrics.resizeColumn(_resizing.columnMetrics,pos,width); // we don't want to influence scrollLeft while resizing
	if(_resizing.columnMetrics.totalWidth<state.columnMetrics.totalWidth){_resizing.columnMetrics.totalWidth=state.columnMetrics.totalWidth;}_resizing.column=ColumnUtils.getColumn(_resizing.columnMetrics.columns,pos);this.setState({resizing:_resizing});}},onColumnResizeEnd:function onColumnResizeEnd(column,width){var pos=this.getColumnPosition(column);if(pos!==null&&this.props.onColumnResize){this.props.onColumnResize(pos,width||column.width);}},getHeaderRows:function getHeaderRows(){var _this=this;var columnMetrics=this.getColumnMetrics();var resizeColumn=void 0;if(this.state.resizing){resizeColumn=this.state.resizing.column;}var headerRows=[];this.props.headerRows.forEach(function(row,index){var headerRowStyle={position:'absolute',top:_this.getCombinedHeaderHeights(index),left:0,width:_this.props.totalWidth,overflow:'hidden'};headerRows.push(React.createElement(HeaderRow,{key:row.ref,ref:row.ref,rowType:row.rowType,style:headerRowStyle,onColumnResize:_this.onColumnResize,onColumnResizeEnd:_this.onColumnResizeEnd,width:columnMetrics.width,height:row.height||_this.props.height,columns:columnMetrics.columns,resizing:resizeColumn,filterable:row.filterable,onFilterChange:row.onFilterChange,sortColumn:_this.props.sortColumn,sortDirection:_this.props.sortDirection,onSort:_this.props.onSort,onScroll:_this.props.onScroll}));});return headerRows;},getColumnMetrics:function getColumnMetrics(){var columnMetrics=void 0;if(this.state.resizing){columnMetrics=this.state.resizing.columnMetrics;}else {columnMetrics=this.props.columnMetrics;}return columnMetrics;},getColumnPosition:function getColumnPosition(column){var columnMetrics=this.getColumnMetrics();var pos=-1;columnMetrics.columns.forEach(function(c,idx){if(c.key===column.key){pos=idx;}});return pos===-1?null:pos;},getCombinedHeaderHeights:function getCombinedHeaderHeights(until){var stopAt=this.props.headerRows.length;if(typeof until!=='undefined'){stopAt=until;}var height=0;for(var index=0;index<stopAt;index++){height+=this.props.headerRows[index].height||this.props.height;}return height;},getStyle:function getStyle(){return {position:'relative',height:this.getCombinedHeaderHeights(),overflow:'hidden'};},setScrollLeft:function setScrollLeft(scrollLeft){var node=ReactDOM.findDOMNode(this.refs.row);node.scrollLeft=scrollLeft;this.refs.row.setScrollLeft(scrollLeft);if(this.refs.filterRow){var nodeFilters=ReactDOM.findDOMNode(this.refs.filterRow);nodeFilters.scrollLeft=scrollLeft;this.refs.filterRow.setScrollLeft(scrollLeft);}},render:function render(){var className=joinClasses({'react-grid-Header':true,'react-grid-Header--resizing':!!this.state.resizing});var headerRows=this.getHeaderRows();return React.createElement('div',_extends({},this.props,{style:this.getStyle(),className:className}),headerRows);}});module.exports=Header; /***/}, /* 6 */ /***/function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__; /*!
		  Copyright (c) 2015 Jed Watson.
		  Licensed under the MIT License (MIT), see
		  http://jedwatson.github.io/classnames
		*/function classNames(){var classes='';var arg;for(var i=0;i<arguments.length;i++){arg=arguments[i];if(!arg){continue;}if('string'===typeof arg||'number'===typeof arg){classes+=' '+arg;}else if(Object.prototype.toString.call(arg)==='[object Array]'){classes+=' '+classNames.apply(null,arg);}else if('object'===(typeof arg==='undefined'?'undefined':_typeof2(arg))){for(var key in arg){if(!arg.hasOwnProperty(key)||!arg[key]){continue;}classes+=' '+key;}}}return classes.substr(1);} // safely export classNames for node / browserify
	if(typeof module!=='undefined'&&module.exports){module.exports=classNames;} // safely export classNames for RequireJS
	if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__=[],__WEBPACK_AMD_DEFINE_RESULT__=function(){return classNames;}.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__),__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));} /***/}, /* 7 */ /***/function(module,exports){"use strict";function shallowCloneObject(obj){var result={};for(var k in obj){if(obj.hasOwnProperty(k)){result[k]=obj[k];}}return result;}module.exports=shallowCloneObject; /***/}, /* 8 */ /***/function(module,exports,__webpack_require__){'use strict';var shallowCloneObject=__webpack_require__(7);var sameColumn=__webpack_require__(9);var ColumnUtils=__webpack_require__(10);var getScrollbarSize=__webpack_require__(11);function setColumnWidths(columns,totalWidth){return columns.map(function(column){var colInfo=Object.assign({},column);if(column.width){if(/^([0-9]+)%$/.exec(column.width.toString())){colInfo.width=Math.floor(column.width/100*totalWidth);}}return colInfo;});}function setDefferedColumnWidths(columns,unallocatedWidth,minColumnWidth){var defferedColumns=columns.filter(function(c){return !c.width;});return columns.map(function(column){if(!column.width){if(unallocatedWidth<=0){column.width=minColumnWidth;}else {column.width=Math.floor(unallocatedWidth/ColumnUtils.getSize(defferedColumns));}}return column;});}function setColumnOffsets(columns){var left=0;return columns.map(function(column){column.left=left;left+=column.width;return column;});} /**
		 * Update column metrics calculation.
		 *
		 * @param {ColumnMetricsType} metrics
		 */function recalculate(metrics){ // compute width for columns which specify width
	var columns=setColumnWidths(metrics.columns,metrics.totalWidth);var unallocatedWidth=columns.filter(function(c){return c.width;}).reduce(function(w,column){return w-column.width;},metrics.totalWidth);unallocatedWidth-=getScrollbarSize();var width=columns.filter(function(c){return c.width;}).reduce(function(w,column){return w+column.width;},0); // compute width for columns which doesn't specify width
	columns=setDefferedColumnWidths(columns,unallocatedWidth,metrics.minColumnWidth); // compute left offset
	columns=setColumnOffsets(columns);return {columns:columns,width:width,totalWidth:metrics.totalWidth,minColumnWidth:metrics.minColumnWidth};} /**
		 * Update column metrics calculation by resizing a column.
		 *
		 * @param {ColumnMetricsType} metrics
		 * @param {Column} column
		 * @param {number} width
		 */function resizeColumn(metrics,index,width){var column=ColumnUtils.getColumn(metrics.columns,index);var metricsClone=shallowCloneObject(metrics);metricsClone.columns=metrics.columns.slice(0);var updatedColumn=shallowCloneObject(column);updatedColumn.width=Math.max(width,metricsClone.minColumnWidth);metricsClone=ColumnUtils.spliceColumn(metricsClone,index,updatedColumn);return recalculate(metricsClone);}function areColumnsImmutable(prevColumns,nextColumns){return typeof Immutable!=='undefined'&&prevColumns instanceof Immutable.List&&nextColumns instanceof Immutable.List;}function compareEachColumn(prevColumns,nextColumns,isSameColumn){var i=void 0;var len=void 0;var column=void 0;var prevColumnsByKey={};var nextColumnsByKey={};if(ColumnUtils.getSize(prevColumns)!==ColumnUtils.getSize(nextColumns)){return false;}for(i=0,len=ColumnUtils.getSize(prevColumns);i<len;i++){column=prevColumns[i];prevColumnsByKey[column.key]=column;}for(i=0,len=ColumnUtils.getSize(nextColumns);i<len;i++){column=nextColumns[i];nextColumnsByKey[column.key]=column;var prevColumn=prevColumnsByKey[column.key];if(prevColumn===undefined||!isSameColumn(prevColumn,column)){return false;}}for(i=0,len=ColumnUtils.getSize(prevColumns);i<len;i++){column=prevColumns[i];var nextColumn=nextColumnsByKey[column.key];if(nextColumn===undefined){return false;}}return true;}function sameColumns(prevColumns,nextColumns,isSameColumn){if(areColumnsImmutable(prevColumns,nextColumns)){return prevColumns===nextColumns;}return compareEachColumn(prevColumns,nextColumns,isSameColumn);}module.exports={recalculate:recalculate,resizeColumn:resizeColumn,sameColumn:sameColumn,sameColumns:sameColumns}; /***/}, /* 9 */ /***/function(module,exports,__webpack_require__){'use strict';var isValidElement=__webpack_require__(2).isValidElement;module.exports=function sameColumn(a,b){var k=void 0;for(k in a){if(a.hasOwnProperty(k)){if(typeof a[k]==='function'&&typeof b[k]==='function'||isValidElement(a[k])&&isValidElement(b[k])){continue;}if(!b.hasOwnProperty(k)||a[k]!==b[k]){return false;}}}for(k in b){if(b.hasOwnProperty(k)&&!a.hasOwnProperty(k)){return false;}}return true;}; /***/}, /* 10 */ /***/function(module,exports){'use strict';module.exports={getColumn:function getColumn(columns,idx){if(Array.isArray(columns)){return columns[idx];}else if(typeof Immutable!=='undefined'){return columns.get(idx);}},spliceColumn:function spliceColumn(metrics,idx,column){if(Array.isArray(metrics.columns)){metrics.columns.splice(idx,1,column);}else if(typeof Immutable!=='undefined'){metrics.columns=metrics.columns.splice(idx,1,column);}return metrics;},getSize:function getSize(columns){if(Array.isArray(columns)){return columns.length;}else if(typeof Immutable!=='undefined'){return columns.size;}}, // Logic extented to allow for functions to be passed down in column.editable
	// this allows us to deicde whether we can be edting from a cell level
	canEdit:function canEdit(col,rowData,enableCellSelect){if(col.editable!=null&&typeof col.editable==='function'){return enableCellSelect===true&&col.editable(rowData);}return enableCellSelect===true&&(!!col.editor||!!col.editable);}}; /***/}, /* 11 */ /***/function(module,exports){'use strict';var size=void 0;function getScrollbarSize(){if(size===undefined){var outer=document.createElement('div');outer.style.width='50px';outer.style.height='50px';outer.style.position='absolute';outer.style.top='-200px';outer.style.left='-200px';var inner=document.createElement('div');inner.style.height='100px';inner.style.width='100%';outer.appendChild(inner);document.body.appendChild(outer);var outerWidth=outer.clientWidth;outer.style.overflowY='scroll';var innerWidth=inner.clientWidth;document.body.removeChild(outer);size=outerWidth-innerWidth;}return size;}module.exports=getScrollbarSize; /***/}, /* 12 */ /***/function(module,exports,__webpack_require__){'use strict';var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var React=__webpack_require__(2);var shallowEqual=__webpack_require__(13);var HeaderCell=__webpack_require__(14);var getScrollbarSize=__webpack_require__(11);var ExcelColumn=__webpack_require__(15);var ColumnUtilsMixin=__webpack_require__(10);var SortableHeaderCell=__webpack_require__(18);var FilterableHeaderCell=__webpack_require__(19);var HeaderCellType=__webpack_require__(20);var PropTypes=React.PropTypes;var HeaderRowStyle={overflow:React.PropTypes.string,width:PropTypes.oneOfType([PropTypes.number,PropTypes.string]),height:React.PropTypes.number,position:React.PropTypes.string};var DEFINE_SORT=['ASC','DESC','NONE'];var HeaderRow=React.createClass({displayName:'HeaderRow',propTypes:{width:PropTypes.oneOfType([PropTypes.number,PropTypes.string]),height:PropTypes.number.isRequired,columns:PropTypes.oneOfType([PropTypes.array,PropTypes.object]),onColumnResize:PropTypes.func,onSort:PropTypes.func.isRequired,onColumnResizeEnd:PropTypes.func,style:PropTypes.shape(HeaderRowStyle),sortColumn:PropTypes.string,sortDirection:React.PropTypes.oneOf(DEFINE_SORT),cellRenderer:PropTypes.func,headerCellRenderer:PropTypes.func,filterable:PropTypes.bool,onFilterChange:PropTypes.func,resizing:PropTypes.object,onScroll:PropTypes.func,rowType:PropTypes.string},mixins:[ColumnUtilsMixin],shouldComponentUpdate:function shouldComponentUpdate(nextProps){return nextProps.width!==this.props.width||nextProps.height!==this.props.height||nextProps.columns!==this.props.columns||!shallowEqual(nextProps.style,this.props.style)||this.props.sortColumn!==nextProps.sortColumn||this.props.sortDirection!==nextProps.sortDirection;},getHeaderCellType:function getHeaderCellType(column){if(column.filterable){if(this.props.filterable)return HeaderCellType.FILTERABLE;}if(column.sortable)return HeaderCellType.SORTABLE;return HeaderCellType.NONE;},getFilterableHeaderCell:function getFilterableHeaderCell(){return React.createElement(FilterableHeaderCell,{onChange:this.props.onFilterChange});},getSortableHeaderCell:function getSortableHeaderCell(column){var sortDirection=this.props.sortColumn===column.key?this.props.sortDirection:DEFINE_SORT.NONE;return React.createElement(SortableHeaderCell,{columnKey:column.key,onSort:this.props.onSort,sortDirection:sortDirection});},getHeaderRenderer:function getHeaderRenderer(column){var renderer=void 0;if(column.headerRenderer){renderer=column.headerRenderer;}else {var headerCellType=this.getHeaderCellType(column);switch(headerCellType){case HeaderCellType.SORTABLE:renderer=this.getSortableHeaderCell(column);break;case HeaderCellType.FILTERABLE:renderer=this.getFilterableHeaderCell();break;default:break;}}return renderer;},getStyle:function getStyle(){return {overflow:'hidden',width:'100%',height:this.props.height,position:'absolute'};},getCells:function getCells(){var cells=[];var lockedCells=[];for(var i=0,len=this.getSize(this.props.columns);i<len;i++){var column=this.getColumn(this.props.columns,i);var _renderer=this.getHeaderRenderer(column);if(column.key==='select-row'&&this.props.rowType==='filter'){_renderer=React.createElement('div',null);}var cell=React.createElement(HeaderCell,{ref:i,key:i,height:this.props.height,column:column,renderer:_renderer,resizing:this.props.resizing===column,onResize:this.props.onColumnResize,onResizeEnd:this.props.onColumnResizeEnd});if(column.locked){lockedCells.push(cell);}else {cells.push(cell);}}return cells.concat(lockedCells);},setScrollLeft:function setScrollLeft(scrollLeft){var _this=this;this.props.columns.forEach(function(column,i){if(column.locked){_this.refs[i].setScrollLeft(scrollLeft);}});},render:function render(){var cellsStyle={width:this.props.width?this.props.width+getScrollbarSize():'100%',height:this.props.height,whiteSpace:'nowrap',overflowX:'hidden',overflowY:'hidden'};var cells=this.getCells();return React.createElement('div',_extends({},this.props,{className:'react-grid-HeaderRow',onScroll:this.props.onScroll}),React.createElement('div',{style:cellsStyle},cells));}});module.exports=HeaderRow; /***/}, /* 13 */ /***/function(module,exports){ /**
		 * Copyright 2013-2015, Facebook, Inc.
		 * All rights reserved.
		 *
		 * This source code is licensed under the BSD-style license found in the
		 * LICENSE file in the root directory of this source tree. An additional grant
		 * of patent rights can be found in the PATENTS file in the same directory.
		 *
		 * @providesModule shallowEqual
		 * @typechecks
		 * 
		 */'use strict';var hasOwnProperty=Object.prototype.hasOwnProperty; /**
		 * Performs equality by iterating through keys on an object and returning false
		 * when any key has values which are not strictly equal between the arguments.
		 * Returns true when the values of all keys are strictly equal.
		 */function shallowEqual(objA,objB){if(objA===objB){return true;}if((typeof objA==='undefined'?'undefined':_typeof2(objA))!=='object'||objA===null||(typeof objB==='undefined'?'undefined':_typeof2(objB))!=='object'||objB===null){return false;}var keysA=Object.keys(objA);var keysB=Object.keys(objB);if(keysA.length!==keysB.length){return false;} // Test for A's keys different from B.
	var bHasOwnProperty=hasOwnProperty.bind(objB);for(var i=0;i<keysA.length;i++){if(!bHasOwnProperty(keysA[i])||objA[keysA[i]]!==objB[keysA[i]]){return false;}}return true;}module.exports=shallowEqual; /***/}, /* 14 */ /***/function(module,exports,__webpack_require__){'use strict';var React=__webpack_require__(2);var ReactDOM=__webpack_require__(3);var joinClasses=__webpack_require__(6);var ExcelColumn=__webpack_require__(15);var ResizeHandle=__webpack_require__(16);var PropTypes=React.PropTypes;function simpleCellRenderer(objArgs){return React.createElement('div',{className:'widget-HeaderCell__value'},objArgs.column.name);}var HeaderCell=React.createClass({displayName:'HeaderCell',propTypes:{renderer:PropTypes.oneOfType([PropTypes.func,PropTypes.element]).isRequired,column:PropTypes.shape(ExcelColumn).isRequired,onResize:PropTypes.func.isRequired,height:PropTypes.number.isRequired,onResizeEnd:PropTypes.func.isRequired,className:PropTypes.string},getDefaultProps:function getDefaultProps(){return {renderer:simpleCellRenderer};},getInitialState:function getInitialState(){return {resizing:false};},onDragStart:function onDragStart(e){this.setState({resizing:true}); // need to set dummy data for FF
	if(e&&e.dataTransfer&&e.dataTransfer.setData)e.dataTransfer.setData('text/plain','dummy');},onDrag:function onDrag(e){var resize=this.props.onResize||null; // for flows sake, doesnt recognise a null check direct
	if(resize){var _width=this.getWidthFromMouseEvent(e);if(_width>0){resize(this.props.column,_width);}}},onDragEnd:function onDragEnd(e){var width=this.getWidthFromMouseEvent(e);this.props.onResizeEnd(this.props.column,width);this.setState({resizing:false});},getWidthFromMouseEvent:function getWidthFromMouseEvent(e){var right=e.pageX||e.touches&&e.touches[0]&&e.touches[0].pageX||e.changedTouches&&e.changedTouches[e.changedTouches.length-1].pageX;var left=ReactDOM.findDOMNode(this).getBoundingClientRect().left;return right-left;},getCell:function getCell(){if(React.isValidElement(this.props.renderer)){return React.cloneElement(this.props.renderer,{column:this.props.column,height:this.props.height});}return this.props.renderer({column:this.props.column});},getStyle:function getStyle(){return {width:this.props.column.width,left:this.props.column.left,display:'inline-block',position:'absolute',overflow:'hidden',height:this.props.height,margin:0,textOverflow:'ellipsis',whiteSpace:'nowrap'};},setScrollLeft:function setScrollLeft(scrollLeft){var node=ReactDOM.findDOMNode(this);node.style.webkitTransform='translate3d('+scrollLeft+'px, 0px, 0px)';node.style.transform='translate3d('+scrollLeft+'px, 0px, 0px)';},render:function render(){var resizeHandle=void 0;if(this.props.column.resizable){resizeHandle=React.createElement(ResizeHandle,{onDrag:this.onDrag,onDragStart:this.onDragStart,onDragEnd:this.onDragEnd});}var className=joinClasses({'react-grid-HeaderCell':true,'react-grid-HeaderCell--resizing':this.state.resizing,'react-grid-HeaderCell--locked':this.props.column.locked});className=joinClasses(className,this.props.className,this.props.column.cellClass);var cell=this.getCell();return React.createElement('div',{className:className,style:this.getStyle()},cell,resizeHandle);}});module.exports=HeaderCell; /***/}, /* 15 */ /***/function(module,exports,__webpack_require__){'use strict';var React=__webpack_require__(2);var ExcelColumnShape={name:React.PropTypes.node.isRequired,key:React.PropTypes.string.isRequired,width:React.PropTypes.number.isRequired,filterable:React.PropTypes.bool};module.exports=ExcelColumnShape; /***/}, /* 16 */ /***/function(module,exports,__webpack_require__){'use strict';var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var React=__webpack_require__(2);var Draggable=__webpack_require__(17);var ResizeHandle=React.createClass({displayName:'ResizeHandle',style:{position:'absolute',top:0,right:0,width:6,height:'100%'},render:function render(){return React.createElement(Draggable,_extends({},this.props,{className:'react-grid-HeaderCell__resizeHandle',style:this.style}));}});module.exports=ResizeHandle; /***/}, /* 17 */ /***/function(module,exports,__webpack_require__){'use strict';var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var React=__webpack_require__(2);var PropTypes=React.PropTypes;var Draggable=React.createClass({displayName:'Draggable',propTypes:{onDragStart:PropTypes.func,onDragEnd:PropTypes.func,onDrag:PropTypes.func,component:PropTypes.oneOfType([PropTypes.func,PropTypes.constructor])},getDefaultProps:function getDefaultProps(){return {onDragStart:function onDragStart(){return true;},onDragEnd:function onDragEnd(){},onDrag:function onDrag(){}};},getInitialState:function getInitialState(){return {drag:null};},componentWillUnmount:function componentWillUnmount(){this.cleanUp();},onMouseDown:function onMouseDown(e){var drag=this.props.onDragStart(e);if(drag===null&&e.button!==0){return;}window.addEventListener('mouseup',this.onMouseUp);window.addEventListener('mousemove',this.onMouseMove);window.addEventListener('touchend',this.onMouseUp);window.addEventListener('touchmove',this.onMouseMove);this.setState({drag:drag});},onMouseMove:function onMouseMove(e){if(this.state.drag===null){return;}if(e.preventDefault){e.preventDefault();}this.props.onDrag(e);},onMouseUp:function onMouseUp(e){this.cleanUp();this.props.onDragEnd(e,this.state.drag);this.setState({drag:null});},cleanUp:function cleanUp(){window.removeEventListener('mouseup',this.onMouseUp);window.removeEventListener('mousemove',this.onMouseMove);window.removeEventListener('touchend',this.onMouseUp);window.removeEventListener('touchmove',this.onMouseMove);},render:function render(){return React.createElement('div',_extends({},this.props,{onMouseDown:this.onMouseDown,onTouchStart:this.onMouseDown,className:'react-grid-HeaderCell__draggable'}));}});module.exports=Draggable; /***/}, /* 18 */ /***/function(module,exports,__webpack_require__){'use strict';var React=__webpack_require__(2);var joinClasses=__webpack_require__(6);var DEFINE_SORT={ASC:'ASC',DESC:'DESC',NONE:'NONE'};var SortableHeaderCell=React.createClass({displayName:'SortableHeaderCell',propTypes:{columnKey:React.PropTypes.string.isRequired,column:React.PropTypes.shape({name:React.PropTypes.node}),onSort:React.PropTypes.func.isRequired,sortDirection:React.PropTypes.oneOf(['ASC','DESC','NONE'])},onClick:function onClick(){var direction=void 0;switch(this.props.sortDirection){default:case null:case undefined:case DEFINE_SORT.NONE:direction=DEFINE_SORT.ASC;break;case DEFINE_SORT.ASC:direction=DEFINE_SORT.DESC;break;case DEFINE_SORT.DESC:direction=DEFINE_SORT.NONE;break;}this.props.onSort(this.props.columnKey,direction);},getSortByText:function getSortByText(){var unicodeKeys={ASC:'9650',DESC:'9660',NONE:''};return String.fromCharCode(unicodeKeys[this.props.sortDirection]);},render:function render(){var className=joinClasses({'react-grid-HeaderCell-sortable':true,'react-grid-HeaderCell-sortable--ascending':this.props.sortDirection==='ASC','react-grid-HeaderCell-sortable--descending':this.props.sortDirection==='DESC'});return React.createElement('div',{className:className,onClick:this.onClick,style:{cursor:'pointer'}},this.props.column.name,React.createElement('span',{className:'pull-right'},this.getSortByText()));}});module.exports=SortableHeaderCell; /***/}, /* 19 */ /***/function(module,exports,__webpack_require__){'use strict';var React=__webpack_require__(2);var ExcelColumn=__webpack_require__(15);var FilterableHeaderCell=React.createClass({displayName:'FilterableHeaderCell',propTypes:{onChange:React.PropTypes.func.isRequired,column:React.PropTypes.shape(ExcelColumn)},getInitialState:function getInitialState(){return {filterTerm:''};},handleChange:function handleChange(e){var val=e.target.value;this.setState({filterTerm:val});this.props.onChange({filterTerm:val,columnKey:this.props.column.key});},renderInput:function renderInput(){if(this.props.column.filterable===false){return React.createElement('span',null);}var inputKey='header-filter-'+this.props.column.key;return React.createElement('input',{key:inputKey,type:'text',className:'form-control input-sm',placeholder:'Search',value:this.state.filterTerm,onChange:this.handleChange});},render:function render(){return React.createElement('div',null,React.createElement('div',{className:'form-group'},this.renderInput()));}});module.exports=FilterableHeaderCell; /***/}, /* 20 */ /***/function(module,exports){"use strict";var HeaderCellType={SORTABLE:0,FILTERABLE:1,NONE:2,CHECKBOX:3};module.exports=HeaderCellType; /***/}, /* 21 */ /***/function(module,exports,__webpack_require__){'use strict';var React=__webpack_require__(2);var Canvas=__webpack_require__(22);var ViewportScroll=__webpack_require__(96);var cellMetaDataShape=__webpack_require__(94);var PropTypes=React.PropTypes;var Viewport=React.createClass({displayName:'Viewport',mixins:[ViewportScroll],propTypes:{rowOffsetHeight:PropTypes.number.isRequired,totalWidth:PropTypes.oneOfType([PropTypes.number,PropTypes.string]).isRequired,columnMetrics:PropTypes.object.isRequired,rowGetter:PropTypes.oneOfType([PropTypes.array,PropTypes.func]).isRequired,selectedRows:PropTypes.array,expandedRows:PropTypes.array,rowRenderer:PropTypes.func,rowsCount:PropTypes.number.isRequired,rowHeight:PropTypes.number.isRequired,onRows:PropTypes.func,onScroll:PropTypes.func,minHeight:PropTypes.number,cellMetaData:PropTypes.shape(cellMetaDataShape),rowKey:PropTypes.string.isRequired,rowScrollTimeout:PropTypes.number,contextMenu:PropTypes.element},onScroll:function onScroll(scroll){this.updateScroll(scroll.scrollTop,scroll.scrollLeft,this.state.height,this.props.rowHeight,this.props.rowsCount);if(this.props.onScroll){this.props.onScroll({scrollTop:scroll.scrollTop,scrollLeft:scroll.scrollLeft});}},getScroll:function getScroll(){return this.refs.canvas.getScroll();},setScrollLeft:function setScrollLeft(scrollLeft){this.refs.canvas.setScrollLeft(scrollLeft);},render:function render(){var style={padding:0,bottom:0,left:0,right:0,overflow:'hidden',position:'absolute',top:this.props.rowOffsetHeight};return React.createElement('div',{className:'react-grid-Viewport',style:style},React.createElement(Canvas,{ref:'canvas',rowKey:this.props.rowKey,totalWidth:this.props.totalWidth,width:this.props.columnMetrics.width,rowGetter:this.props.rowGetter,rowsCount:this.props.rowsCount,selectedRows:this.props.selectedRows,expandedRows:this.props.expandedRows,columns:this.props.columnMetrics.columns,rowRenderer:this.props.rowRenderer,displayStart:this.state.displayStart,displayEnd:this.state.displayEnd,cellMetaData:this.props.cellMetaData,height:this.state.height,rowHeight:this.props.rowHeight,onScroll:this.onScroll,onRows:this.props.onRows,rowScrollTimeout:this.props.rowScrollTimeout,contextMenu:this.props.contextMenu}));}});module.exports=Viewport; /***/}, /* 22 */ /***/function(module,exports,__webpack_require__){'use strict';var _shallowEqual=__webpack_require__(13);var _shallowEqual2=_interopRequireDefault(_shallowEqual);var _RowsContainer=__webpack_require__(23);var _RowsContainer2=_interopRequireDefault(_RowsContainer);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var React=__webpack_require__(2);var ReactDOM=__webpack_require__(3);var joinClasses=__webpack_require__(6);var PropTypes=React.PropTypes;var ScrollShim=__webpack_require__(86);var Row=__webpack_require__(87);var cellMetaDataShape=__webpack_require__(94);var Canvas=React.createClass({displayName:'Canvas',mixins:[ScrollShim],propTypes:{rowRenderer:PropTypes.oneOfType([PropTypes.func,PropTypes.element]),rowHeight:PropTypes.number.isRequired,height:PropTypes.number.isRequired,width:PropTypes.number,totalWidth:PropTypes.oneOfType([PropTypes.number,PropTypes.string]),style:PropTypes.string,className:PropTypes.string,displayStart:PropTypes.number.isRequired,displayEnd:PropTypes.number.isRequired,rowsCount:PropTypes.number.isRequired,rowGetter:PropTypes.oneOfType([PropTypes.func.isRequired,PropTypes.array.isRequired]),expandedRows:PropTypes.array,onRows:PropTypes.func,onScroll:PropTypes.func,columns:PropTypes.oneOfType([PropTypes.object,PropTypes.array]).isRequired,cellMetaData:PropTypes.shape(cellMetaDataShape).isRequired,selectedRows:PropTypes.array,rowKey:React.PropTypes.string,rowScrollTimeout:React.PropTypes.number,contextMenu:PropTypes.element},getDefaultProps:function getDefaultProps(){return {rowRenderer:Row,onRows:function onRows(){},selectedRows:[],rowScrollTimeout:0};},getInitialState:function getInitialState(){return {displayStart:this.props.displayStart,displayEnd:this.props.displayEnd,scrollingTimeout:null};},componentWillMount:function componentWillMount(){this._currentRowsLength=0;this._currentRowsRange={start:0,end:0};this._scroll={scrollTop:0,scrollLeft:0};},componentDidMount:function componentDidMount(){this.onRows();},componentWillReceiveProps:function componentWillReceiveProps(nextProps){if(nextProps.displayStart!==this.state.displayStart||nextProps.displayEnd!==this.state.displayEnd){this.setState({displayStart:nextProps.displayStart,displayEnd:nextProps.displayEnd});}},shouldComponentUpdate:function shouldComponentUpdate(nextProps,nextState){var shouldUpdate=nextState.displayStart!==this.state.displayStart||nextState.displayEnd!==this.state.displayEnd||nextState.scrollingTimeout!==this.state.scrollingTimeout||nextProps.rowsCount!==this.props.rowsCount||nextProps.rowHeight!==this.props.rowHeight||nextProps.columns!==this.props.columns||nextProps.width!==this.props.width||nextProps.cellMetaData!==this.props.cellMetaData||!(0,_shallowEqual2['default'])(nextProps.style,this.props.style);return shouldUpdate;},componentWillUnmount:function componentWillUnmount(){this._currentRowsLength=0;this._currentRowsRange={start:0,end:0};this._scroll={scrollTop:0,scrollLeft:0};},componentDidUpdate:function componentDidUpdate(){if(this._scroll.scrollTop!==0&&this._scroll.scrollLeft!==0){this.setScrollLeft(this._scroll.scrollLeft);}this.onRows();},onRows:function onRows(){if(this._currentRowsRange!=={start:0,end:0}){this.props.onRows(this._currentRowsRange);this._currentRowsRange={start:0,end:0};}},onScroll:function onScroll(e){var _this=this;if(ReactDOM.findDOMNode(this)!==e.target){return;}this.appendScrollShim();var scrollLeft=e.target.scrollLeft;var scrollTop=e.target.scrollTop;var scroll={scrollTop:scrollTop,scrollLeft:scrollLeft}; // check how far we have scrolled, and if this means we are being taken out of range
	var scrollYRange=Math.abs(this._scroll.scrollTop-scroll.scrollTop)/this.props.rowHeight;var scrolledOutOfRange=scrollYRange>this.props.displayEnd-this.props.displayStart;this._scroll=scroll;this.props.onScroll(scroll); // if we go out of range, we queue the actual render, just rendering cheap placeholders
	// avoiding rendering anything expensive while a user scrolls down
	if(scrolledOutOfRange&&this.props.rowScrollTimeout>0){var scrollTO=this.state.scrollingTimeout;if(scrollTO){clearTimeout(scrollTO);} // queue up, and set state to clear the TO so we render the rows (not placeholders)
	scrollTO=setTimeout(function(){if(_this.state.scrollingTimeout!==null){_this.setState({scrollingTimeout:null});}},this.props.rowScrollTimeout);this.setState({scrollingTimeout:scrollTO});}},getRows:function getRows(displayStart,displayEnd){this._currentRowsRange={start:displayStart,end:displayEnd};if(Array.isArray(this.props.rowGetter)){return this.props.rowGetter.slice(displayStart,displayEnd);}var rows=[];for(var i=displayStart;i<displayEnd;i++){rows.push(this.props.rowGetter(i));}return rows;},getScrollbarWidth:function getScrollbarWidth(){var scrollbarWidth=0; // Get the scrollbar width
	var canvas=ReactDOM.findDOMNode(this);scrollbarWidth=canvas.offsetWidth-canvas.clientWidth;return scrollbarWidth;},getScroll:function getScroll(){var _ReactDOM$findDOMNode=ReactDOM.findDOMNode(this);var scrollTop=_ReactDOM$findDOMNode.scrollTop;var scrollLeft=_ReactDOM$findDOMNode.scrollLeft;return {scrollTop:scrollTop,scrollLeft:scrollLeft};},isRowSelected:function isRowSelected(row){var _this2=this;var selectedRows=this.props.selectedRows.filter(function(r){var rowKeyValue=row.get?row.get(_this2.props.rowKey):row[_this2.props.rowKey];return r[_this2.props.rowKey]===rowKeyValue;});return selectedRows.length>0&&selectedRows[0].isSelected;},_currentRowsLength:0,_currentRowsRange:{start:0,end:0},_scroll:{scrollTop:0,scrollLeft:0},setScrollLeft:function setScrollLeft(scrollLeft){if(this._currentRowsLength!==0){if(!this.refs)return;for(var i=0,len=this._currentRowsLength;i<len;i++){if(this.refs[i]&&this.refs[i].setScrollLeft){this.refs[i].setScrollLeft(scrollLeft);}}}},renderRow:function renderRow(props){if(this.state.scrollingTimeout!==null){ // in the midst of a rapid scroll, so we render placeholders
	// the actual render is then queued (through a timeout)
	// this avoids us redering a bunch of rows that a user is trying to scroll past
	return this.renderScrollingPlaceholder(props);}var RowsRenderer=this.props.rowRenderer;if(typeof RowsRenderer==='function'){return React.createElement(RowsRenderer,props);}if(React.isValidElement(this.props.rowRenderer)){return React.cloneElement(this.props.rowRenderer,props);}},renderScrollingPlaceholder:function renderScrollingPlaceholder(props){ // here we are just rendering empty cells
	// we may want to allow a user to inject this, and/or just render the cells that are in view
	// for now though we essentially are doing a (very lightweight) row + cell with empty content
	var styles={row:{height:props.height,overflow:'hidden'},cell:{height:props.height,position:'absolute'},placeholder:{backgroundColor:'rgba(211, 211, 211, 0.45)',width:'60%',height:Math.floor(props.height*0.3)}};return React.createElement('div',{key:props.key,style:styles.row,className:'react-grid-Row'},this.props.columns.map(function(col,idx){return React.createElement('div',{style:Object.assign(styles.cell,{width:col.width,left:col.left}),key:idx,className:'react-grid-Cell'},React.createElement('div',{style:Object.assign(styles.placeholder,{width:Math.floor(col.width*0.6)})}));}));},renderPlaceholder:function renderPlaceholder(key,height){ // just renders empty cells
	// if we wanted to show gridlines, we'd need classes and position as with renderScrollingPlaceholder
	return React.createElement('div',{key:key,style:{height:height}},this.props.columns.map(function(column,idx){return React.createElement('div',{style:{width:column.width},key:idx});}));},render:function render(){var _this3=this;var displayStart=this.state.displayStart;var displayEnd=this.state.displayEnd;var rowHeight=this.props.rowHeight;var length=this.props.rowsCount;var rows=this.getRows(displayStart,displayEnd).map(function(row,idx){return _this3.renderRow({key:displayStart+idx,ref:idx,idx:displayStart+idx,row:row,height:rowHeight,columns:_this3.props.columns,isSelected:_this3.isRowSelected(row),expandedRows:_this3.props.expandedRows,cellMetaData:_this3.props.cellMetaData});});this._currentRowsLength=rows.length;if(displayStart>0){rows.unshift(this.renderPlaceholder('top',displayStart*rowHeight));}if(length-displayEnd>0){rows.push(this.renderPlaceholder('bottom',(length-displayEnd)*rowHeight));}var style={position:'absolute',top:0,left:0,overflowX:'auto',overflowY:'scroll',width:this.props.totalWidth,height:this.props.height,transform:'translate3d(0, 0, 0)'};return React.createElement('div',{style:style,onScroll:this.onScroll,className:joinClasses('react-grid-Canvas',this.props.className,{opaque:this.props.cellMetaData.selected&&this.props.cellMetaData.selected.active})},React.createElement(_RowsContainer2['default'],{width:this.props.width,rows:rows,contextMenu:this.props.contextMenu,rowIdx:this.props.cellMetaData.selected.rowIdx,idx:this.props.cellMetaData.selected.idx}));}});module.exports=Canvas; /***/}, /* 23 */ /***/function(module,exports,__webpack_require__){'use strict';Object.defineProperty(exports,"__esModule",{value:true});exports.ContextMenuRowsContainer=exports.SimpleRowsContainer=undefined;var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=__webpack_require__(2);var _react2=_interopRequireDefault(_react);var _reactContextmenu=__webpack_require__(24);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==='undefined'?'undefined':_typeof2(call))==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+(typeof superClass==='undefined'?'undefined':_typeof2(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var RowsContainer=function(_React$Component){_inherits(RowsContainer,_React$Component);function RowsContainer(){_classCallCheck(this,RowsContainer);return _possibleConstructorReturn(this,Object.getPrototypeOf(RowsContainer).apply(this,arguments));}_createClass(RowsContainer,[{key:'hasContextMenu',value:function hasContextMenu(){return this.props.contextMenu&&_react2['default'].isValidElement(this.props.contextMenu);}},{key:'renderRowsWithContextMenu',value:function renderRowsWithContextMenu(){var newProps={rowIdx:this.props.rowIdx,idx:this.props.idx};var contextMenu=_react2['default'].cloneElement(this.props.contextMenu,newProps);return _react2['default'].createElement('div',null,_react2['default'].createElement(ContextMenuRowsContainer,this.props),contextMenu);}},{key:'render',value:function render(){return this.hasContextMenu()?this.renderRowsWithContextMenu():_react2['default'].createElement(SimpleRowsContainer,this.props);}}]);return RowsContainer;}(_react2['default'].Component);RowsContainer.propTypes={contextMenu:_react.PropTypes.element,rowIdx:_react.PropTypes.number,idx:_react.PropTypes.number};var SimpleRowsContainer=function(_React$Component2){_inherits(SimpleRowsContainer,_React$Component2);function SimpleRowsContainer(){_classCallCheck(this,SimpleRowsContainer);return _possibleConstructorReturn(this,Object.getPrototypeOf(SimpleRowsContainer).apply(this,arguments));}_createClass(SimpleRowsContainer,[{key:'render',value:function render(){return _react2['default'].createElement('div',{style:{width:this.props.width,overflow:'hidden'}},this.props.rows);}}]);return SimpleRowsContainer;}(_react2['default'].Component);SimpleRowsContainer.propTypes={width:_react.PropTypes.number,rows:_react.PropTypes.array};var ContextMenuRowsContainer=(0,_reactContextmenu.ContextMenuLayer)('reactDataGridContextMenu')(SimpleRowsContainer);exports['default']=RowsContainer;exports.SimpleRowsContainer=SimpleRowsContainer;exports.ContextMenuRowsContainer=ContextMenuRowsContainer; /***/}, /* 24 */ /***/function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _contextMenu=__webpack_require__(25);Object.defineProperty(exports,"ContextMenu",{enumerable:true,get:function get(){return _interopRequireDefault(_contextMenu)['default'];}});var _contextmenuLayer=__webpack_require__(78);Object.defineProperty(exports,"ContextMenuLayer",{enumerable:true,get:function get(){return _interopRequireDefault(_contextmenuLayer)['default'];}});var _menuItem=__webpack_require__(81);Object.defineProperty(exports,"MenuItem",{enumerable:true,get:function get(){return _interopRequireDefault(_menuItem)['default'];}});var _monitor=__webpack_require__(44);Object.defineProperty(exports,"monitor",{enumerable:true,get:function get(){return _interopRequireDefault(_monitor)['default'];}});var _submenu=__webpack_require__(83);Object.defineProperty(exports,"SubMenu",{enumerable:true,get:function get(){return _interopRequireDefault(_submenu)['default'];}});var _connect=__webpack_require__(85);Object.defineProperty(exports,"connect",{enumerable:true,get:function get(){return _interopRequireDefault(_connect)['default'];}});function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};} /***/}, /* 25 */ /***/function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _react=__webpack_require__(2);var _react2=_interopRequireDefault(_react);var _store=__webpack_require__(26);var _store2=_interopRequireDefault(_store);var _wrapper=__webpack_require__(43);var _wrapper2=_interopRequireDefault(_wrapper);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var PropTypes=_react2['default'].PropTypes;var ContextMenu=_react2['default'].createClass({displayName:"ContextMenu",propTypes:{identifier:PropTypes.string.isRequired},getInitialState:function getInitialState(){return _store2['default'].getState();},componentDidMount:function componentDidMount(){this.unsubscribe=_store2['default'].subscribe(this.handleUpdate);},componentWillUnmount:function componentWillUnmount(){if(this.unsubscribe)this.unsubscribe();},handleUpdate:function handleUpdate(){this.setState(this.getInitialState());},render:function render(){return _react2['default'].createElement(_wrapper2['default'],_extends({},this.props,this.state));}});exports['default']=ContextMenu; /***/}, /* 26 */ /***/function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _redux=__webpack_require__(27);var _reducers=__webpack_require__(41);var _reducers2=_interopRequireDefault(_reducers);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}exports['default']=(0,_redux.createStore)(_reducers2['default']); /***/}, /* 27 */ /***/function(module,exports,__webpack_require__){ /* WEBPACK VAR INJECTION */(function(process){'use strict';exports.__esModule=true;exports.compose=exports.applyMiddleware=exports.bindActionCreators=exports.combineReducers=exports.createStore=undefined;var _createStore=__webpack_require__(29);var _createStore2=_interopRequireDefault(_createStore);var _combineReducers=__webpack_require__(36);var _combineReducers2=_interopRequireDefault(_combineReducers);var _bindActionCreators=__webpack_require__(38);var _bindActionCreators2=_interopRequireDefault(_bindActionCreators);var _applyMiddleware=__webpack_require__(39);var _applyMiddleware2=_interopRequireDefault(_applyMiddleware);var _compose=__webpack_require__(40);var _compose2=_interopRequireDefault(_compose);var _warning=__webpack_require__(37);var _warning2=_interopRequireDefault(_warning);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj};} /*
		* This is a dummy function to check if the function name has been altered by minification.
		* If the function has been minified and NODE_ENV !== 'production', warn the user.
		*/function isCrushed(){}if(process.env.NODE_ENV!=='production'&&typeof isCrushed.name==='string'&&isCrushed.name!=='isCrushed'){(0,_warning2["default"])('You are currently using minified code outside of NODE_ENV === \'production\'. '+'This means that you are running a slower development build of Redux. '+'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify '+'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) '+'to ensure you have the correct code for your production build.');}exports.createStore=_createStore2["default"];exports.combineReducers=_combineReducers2["default"];exports.bindActionCreators=_bindActionCreators2["default"];exports.applyMiddleware=_applyMiddleware2["default"];exports.compose=_compose2["default"]; /* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(28)); /***/}, /* 28 */ /***/function(module,exports){ // shim for using process in browser
	var process=module.exports={};var queue=[];var draining=false;var currentQueue;var queueIndex=-1;function cleanUpNextTick(){if(!draining||!currentQueue){return;}draining=false;if(currentQueue.length){queue=currentQueue.concat(queue);}else {queueIndex=-1;}if(queue.length){drainQueue();}}function drainQueue(){if(draining){return;}var timeout=setTimeout(cleanUpNextTick);draining=true;var len=queue.length;while(len){currentQueue=queue;queue=[];while(++queueIndex<len){if(currentQueue){currentQueue[queueIndex].run();}}queueIndex=-1;len=queue.length;}currentQueue=null;draining=false;clearTimeout(timeout);}process.nextTick=function(fun){var args=new Array(arguments.length-1);if(arguments.length>1){for(var i=1;i<arguments.length;i++){args[i-1]=arguments[i];}}queue.push(new Item(fun,args));if(queue.length===1&&!draining){setTimeout(drainQueue,0);}}; // v8 likes predictible objects
	function Item(fun,array){this.fun=fun;this.array=array;}Item.prototype.run=function(){this.fun.apply(null,this.array);};process.title='browser';process.browser=true;process.env={};process.argv=[];process.version=''; // empty string to avoid regexp issues
	process.versions={};function noop(){}process.on=noop;process.addListener=noop;process.once=noop;process.off=noop;process.removeListener=noop;process.removeAllListeners=noop;process.emit=noop;process.binding=function(name){throw new Error('process.binding is not supported');};process.cwd=function(){return '/';};process.chdir=function(dir){throw new Error('process.chdir is not supported');};process.umask=function(){return 0;}; /***/}, /* 29 */ /***/function(module,exports,__webpack_require__){'use strict';exports.__esModule=true;exports.ActionTypes=undefined;exports["default"]=createStore;var _isPlainObject=__webpack_require__(30);var _isPlainObject2=_interopRequireDefault(_isPlainObject);var _symbolObservable=__webpack_require__(34);var _symbolObservable2=_interopRequireDefault(_symbolObservable);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj};} /**
		 * These are private action types reserved by Redux.
		 * For any unknown actions, you must return the current state.
		 * If the current state is undefined, you must return the initial state.
		 * Do not reference these action types directly in your code.
		 */var ActionTypes=exports.ActionTypes={INIT:'@@redux/INIT'}; /**
		 * Creates a Redux store that holds the state tree.
		 * The only way to change the data in the store is to call `dispatch()` on it.
		 *
		 * There should only be a single store in your app. To specify how different
		 * parts of the state tree respond to actions, you may combine several reducers
		 * into a single reducer function by using `combineReducers`.
		 *
		 * @param {Function} reducer A function that returns the next state tree, given
		 * the current state tree and the action to handle.
		 *
		 * @param {any} [initialState] The initial state. You may optionally specify it
		 * to hydrate the state from the server in universal apps, or to restore a
		 * previously serialized user session.
		 * If you use `combineReducers` to produce the root reducer function, this must be
		 * an object with the same shape as `combineReducers` keys.
		 *
		 * @param {Function} enhancer The store enhancer. You may optionally specify it
		 * to enhance the store with third-party capabilities such as middleware,
		 * time travel, persistence, etc. The only store enhancer that ships with Redux
		 * is `applyMiddleware()`.
		 *
		 * @returns {Store} A Redux store that lets you read the state, dispatch actions
		 * and subscribe to changes.
		 */function createStore(reducer,initialState,enhancer){var _ref2;if(typeof initialState==='function'&&typeof enhancer==='undefined'){enhancer=initialState;initialState=undefined;}if(typeof enhancer!=='undefined'){if(typeof enhancer!=='function'){throw new Error('Expected the enhancer to be a function.');}return enhancer(createStore)(reducer,initialState);}if(typeof reducer!=='function'){throw new Error('Expected the reducer to be a function.');}var currentReducer=reducer;var currentState=initialState;var currentListeners=[];var nextListeners=currentListeners;var isDispatching=false;function ensureCanMutateNextListeners(){if(nextListeners===currentListeners){nextListeners=currentListeners.slice();}} /**
		   * Reads the state tree managed by the store.
		   *
		   * @returns {any} The current state tree of your application.
		   */function getState(){return currentState;} /**
		   * Adds a change listener. It will be called any time an action is dispatched,
		   * and some part of the state tree may potentially have changed. You may then
		   * call `getState()` to read the current state tree inside the callback.
		   *
		   * You may call `dispatch()` from a change listener, with the following
		   * caveats:
		   *
		   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
		   * If you subscribe or unsubscribe while the listeners are being invoked, this
		   * will not have any effect on the `dispatch()` that is currently in progress.
		   * However, the next `dispatch()` call, whether nested or not, will use a more
		   * recent snapshot of the subscription list.
		   *
		   * 2. The listener should not expect to see all state changes, as the state
		   * might have been updated multiple times during a nested `dispatch()` before
		   * the listener is called. It is, however, guaranteed that all subscribers
		   * registered before the `dispatch()` started will be called with the latest
		   * state by the time it exits.
		   *
		   * @param {Function} listener A callback to be invoked on every dispatch.
		   * @returns {Function} A function to remove this change listener.
		   */function subscribe(listener){if(typeof listener!=='function'){throw new Error('Expected listener to be a function.');}var isSubscribed=true;ensureCanMutateNextListeners();nextListeners.push(listener);return function unsubscribe(){if(!isSubscribed){return;}isSubscribed=false;ensureCanMutateNextListeners();var index=nextListeners.indexOf(listener);nextListeners.splice(index,1);};} /**
		   * Dispatches an action. It is the only way to trigger a state change.
		   *
		   * The `reducer` function, used to create the store, will be called with the
		   * current state tree and the given `action`. Its return value will
		   * be considered the **next** state of the tree, and the change listeners
		   * will be notified.
		   *
		   * The base implementation only supports plain object actions. If you want to
		   * dispatch a Promise, an Observable, a thunk, or something else, you need to
		   * wrap your store creating function into the corresponding middleware. For
		   * example, see the documentation for the `redux-thunk` package. Even the
		   * middleware will eventually dispatch plain object actions using this method.
		   *
		   * @param {Object} action A plain object representing “what changed”. It is
		   * a good idea to keep actions serializable so you can record and replay user
		   * sessions, or use the time travelling `redux-devtools`. An action must have
		   * a `type` property which may not be `undefined`. It is a good idea to use
		   * string constants for action types.
		   *
		   * @returns {Object} For convenience, the same action object you dispatched.
		   *
		   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
		   * return something else (for example, a Promise you can await).
		   */function dispatch(action){if(!(0,_isPlainObject2["default"])(action)){throw new Error('Actions must be plain objects. '+'Use custom middleware for async actions.');}if(typeof action.type==='undefined'){throw new Error('Actions may not have an undefined "type" property. '+'Have you misspelled a constant?');}if(isDispatching){throw new Error('Reducers may not dispatch actions.');}try{isDispatching=true;currentState=currentReducer(currentState,action);}finally {isDispatching=false;}var listeners=currentListeners=nextListeners;for(var i=0;i<listeners.length;i++){listeners[i]();}return action;} /**
		   * Replaces the reducer currently used by the store to calculate the state.
		   *
		   * You might need this if your app implements code splitting and you want to
		   * load some of the reducers dynamically. You might also need this if you
		   * implement a hot reloading mechanism for Redux.
		   *
		   * @param {Function} nextReducer The reducer for the store to use instead.
		   * @returns {void}
		   */function replaceReducer(nextReducer){if(typeof nextReducer!=='function'){throw new Error('Expected the nextReducer to be a function.');}currentReducer=nextReducer;dispatch({type:ActionTypes.INIT});} /**
		   * Interoperability point for observable/reactive libraries.
		   * @returns {observable} A minimal observable of state changes.
		   * For more information, see the observable proposal:
		   * https://github.com/zenparsing/es-observable
		   */function observable(){var _ref;var outerSubscribe=subscribe;return _ref={ /**
		       * The minimal observable subscription method.
		       * @param {Object} observer Any object that can be used as an observer.
		       * The observer object should have a `next` method.
		       * @returns {subscription} An object with an `unsubscribe` method that can
		       * be used to unsubscribe the observable from the store, and prevent further
		       * emission of values from the observable.
		       */subscribe:function subscribe(observer){if((typeof observer==='undefined'?'undefined':_typeof2(observer))!=='object'){throw new TypeError('Expected the observer to be an object.');}function observeState(){if(observer.next){observer.next(getState());}}observeState();var unsubscribe=outerSubscribe(observeState);return {unsubscribe:unsubscribe};}},_ref[_symbolObservable2["default"]]=function(){return this;},_ref;} // When a store is created, an "INIT" action is dispatched so that every
	// reducer returns their initial state. This effectively populates
	// the initial state tree.
	dispatch({type:ActionTypes.INIT});return _ref2={dispatch:dispatch,subscribe:subscribe,getState:getState,replaceReducer:replaceReducer},_ref2[_symbolObservable2["default"]]=observable,_ref2;} /***/}, /* 30 */ /***/function(module,exports,__webpack_require__){var getPrototype=__webpack_require__(31),isHostObject=__webpack_require__(32),isObjectLike=__webpack_require__(33); /** `Object#toString` result references. */var objectTag='[object Object]'; /** Used for built-in method references. */var objectProto=Object.prototype; /** Used to resolve the decompiled source of functions. */var funcToString=Function.prototype.toString; /** Used to check objects for own properties. */var hasOwnProperty=objectProto.hasOwnProperty; /** Used to infer the `Object` constructor. */var objectCtorString=funcToString.call(Object); /**
		 * Used to resolve the
		 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
		 * of values.
		 */var objectToString=objectProto.toString; /**
		 * Checks if `value` is a plain object, that is, an object created by the
		 * `Object` constructor or one with a `[[Prototype]]` of `null`.
		 *
		 * @static
		 * @memberOf _
		 * @since 0.8.0
		 * @category Lang
		 * @param {*} value The value to check.
		 * @returns {boolean} Returns `true` if `value` is a plain object,
		 *  else `false`.
		 * @example
		 *
		 * function Foo() {
		 *   this.a = 1;
		 * }
		 *
		 * _.isPlainObject(new Foo);
		 * // => false
		 *
		 * _.isPlainObject([1, 2, 3]);
		 * // => false
		 *
		 * _.isPlainObject({ 'x': 0, 'y': 0 });
		 * // => true
		 *
		 * _.isPlainObject(Object.create(null));
		 * // => true
		 */function isPlainObject(value){if(!isObjectLike(value)||objectToString.call(value)!=objectTag||isHostObject(value)){return false;}var proto=getPrototype(value);if(proto===null){return true;}var Ctor=hasOwnProperty.call(proto,'constructor')&&proto.constructor;return typeof Ctor=='function'&&Ctor instanceof Ctor&&funcToString.call(Ctor)==objectCtorString;}module.exports=isPlainObject; /***/}, /* 31 */ /***/function(module,exports){ /* Built-in method references for those with the same name as other `lodash` methods. */var nativeGetPrototype=Object.getPrototypeOf; /**
		 * Gets the `[[Prototype]]` of `value`.
		 *
		 * @private
		 * @param {*} value The value to query.
		 * @returns {null|Object} Returns the `[[Prototype]]`.
		 */function getPrototype(value){return nativeGetPrototype(Object(value));}module.exports=getPrototype; /***/}, /* 32 */ /***/function(module,exports){ /**
		 * Checks if `value` is a host object in IE < 9.
		 *
		 * @private
		 * @param {*} value The value to check.
		 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
		 */function isHostObject(value){ // Many host objects are `Object` objects that can coerce to strings
	// despite having improperly defined `toString` methods.
	var result=false;if(value!=null&&typeof value.toString!='function'){try{result=!!(value+'');}catch(e){}}return result;}module.exports=isHostObject; /***/}, /* 33 */ /***/function(module,exports){ /**
		 * Checks if `value` is object-like. A value is object-like if it's not `null`
		 * and has a `typeof` result of "object".
		 *
		 * @static
		 * @memberOf _
		 * @since 4.0.0
		 * @category Lang
		 * @param {*} value The value to check.
		 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
		 * @example
		 *
		 * _.isObjectLike({});
		 * // => true
		 *
		 * _.isObjectLike([1, 2, 3]);
		 * // => true
		 *
		 * _.isObjectLike(_.noop);
		 * // => false
		 *
		 * _.isObjectLike(null);
		 * // => false
		 */function isObjectLike(value){return !!value&&(typeof value==='undefined'?'undefined':_typeof2(value))=='object';}module.exports=isObjectLike; /***/}, /* 34 */ /***/function(module,exports,__webpack_require__){ /* WEBPACK VAR INJECTION */(function(global){ /* global window */'use strict';module.exports=__webpack_require__(35)(global||window||this); /* WEBPACK VAR INJECTION */}).call(exports,function(){return this;}()); /***/}, /* 35 */ /***/function(module,exports){'use strict';module.exports=function symbolObservablePonyfill(root){var result;var _Symbol=root.Symbol;if(typeof _Symbol==='function'){if(_Symbol.observable){result=_Symbol.observable;}else {result=_Symbol('observable');_Symbol.observable=result;}}else {result='@@observable';}return result;}; /***/}, /* 36 */ /***/function(module,exports,__webpack_require__){ /* WEBPACK VAR INJECTION */(function(process){'use strict';exports.__esModule=true;exports["default"]=combineReducers;var _createStore=__webpack_require__(29);var _isPlainObject=__webpack_require__(30);var _isPlainObject2=_interopRequireDefault(_isPlainObject);var _warning=__webpack_require__(37);var _warning2=_interopRequireDefault(_warning);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj};}function getUndefinedStateErrorMessage(key,action){var actionType=action&&action.type;var actionName=actionType&&'"'+actionType.toString()+'"'||'an action';return 'Given action '+actionName+', reducer "'+key+'" returned undefined. '+'To ignore an action, you must explicitly return the previous state.';}function getUnexpectedStateShapeWarningMessage(inputState,reducers,action){var reducerKeys=Object.keys(reducers);var argumentName=action&&action.type===_createStore.ActionTypes.INIT?'initialState argument passed to createStore':'previous state received by the reducer';if(reducerKeys.length===0){return 'Store does not have a valid reducer. Make sure the argument passed '+'to combineReducers is an object whose values are reducers.';}if(!(0,_isPlainObject2["default"])(inputState)){return 'The '+argumentName+' has unexpected type of "'+{}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1]+'". Expected argument to be an object with the following '+('keys: "'+reducerKeys.join('", "')+'"');}var unexpectedKeys=Object.keys(inputState).filter(function(key){return !reducers.hasOwnProperty(key);});if(unexpectedKeys.length>0){return 'Unexpected '+(unexpectedKeys.length>1?'keys':'key')+' '+('"'+unexpectedKeys.join('", "')+'" found in '+argumentName+'. ')+'Expected to find one of the known reducer keys instead: '+('"'+reducerKeys.join('", "')+'". Unexpected keys will be ignored.');}}function assertReducerSanity(reducers){Object.keys(reducers).forEach(function(key){var reducer=reducers[key];var initialState=reducer(undefined,{type:_createStore.ActionTypes.INIT});if(typeof initialState==='undefined'){throw new Error('Reducer "'+key+'" returned undefined during initialization. '+'If the state passed to the reducer is undefined, you must '+'explicitly return the initial state. The initial state may '+'not be undefined.');}var type='@@redux/PROBE_UNKNOWN_ACTION_'+Math.random().toString(36).substring(7).split('').join('.');if(typeof reducer(undefined,{type:type})==='undefined'){throw new Error('Reducer "'+key+'" returned undefined when probed with a random type. '+('Don\'t try to handle '+_createStore.ActionTypes.INIT+' or other actions in "redux/*" ')+'namespace. They are considered private. Instead, you must return the '+'current state for any unknown actions, unless it is undefined, '+'in which case you must return the initial state, regardless of the '+'action type. The initial state may not be undefined.');}});} /**
		 * Turns an object whose values are different reducer functions, into a single
		 * reducer function. It will call every child reducer, and gather their results
		 * into a single state object, whose keys correspond to the keys of the passed
		 * reducer functions.
		 *
		 * @param {Object} reducers An object whose values correspond to different
		 * reducer functions that need to be combined into one. One handy way to obtain
		 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
		 * undefined for any action. Instead, they should return their initial state
		 * if the state passed to them was undefined, and the current state for any
		 * unrecognized action.
		 *
		 * @returns {Function} A reducer function that invokes every reducer inside the
		 * passed object, and builds a state object with the same shape.
		 */function combineReducers(reducers){var reducerKeys=Object.keys(reducers);var finalReducers={};for(var i=0;i<reducerKeys.length;i++){var key=reducerKeys[i];if(typeof reducers[key]==='function'){finalReducers[key]=reducers[key];}}var finalReducerKeys=Object.keys(finalReducers);var sanityError;try{assertReducerSanity(finalReducers);}catch(e){sanityError=e;}return function combination(){var state=arguments.length<=0||arguments[0]===undefined?{}:arguments[0];var action=arguments[1];if(sanityError){throw sanityError;}if(process.env.NODE_ENV!=='production'){var warningMessage=getUnexpectedStateShapeWarningMessage(state,finalReducers,action);if(warningMessage){(0,_warning2["default"])(warningMessage);}}var hasChanged=false;var nextState={};for(var i=0;i<finalReducerKeys.length;i++){var key=finalReducerKeys[i];var reducer=finalReducers[key];var previousStateForKey=state[key];var nextStateForKey=reducer(previousStateForKey,action);if(typeof nextStateForKey==='undefined'){var errorMessage=getUndefinedStateErrorMessage(key,action);throw new Error(errorMessage);}nextState[key]=nextStateForKey;hasChanged=hasChanged||nextStateForKey!==previousStateForKey;}return hasChanged?nextState:state;};} /* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(28)); /***/}, /* 37 */ /***/function(module,exports){'use strict';exports.__esModule=true;exports["default"]=warning; /**
		 * Prints a warning in the console if it exists.
		 *
		 * @param {String} message The warning message.
		 * @returns {void}
		 */function warning(message){ /* eslint-disable no-console */if(typeof console!=='undefined'&&typeof console.error==='function'){console.error(message);} /* eslint-enable no-console */try{ // This error was thrown as a convenience so that if you enable
	// "break on all exceptions" in your console,
	// it would pause the execution at this line.
	throw new Error(message); /* eslint-disable no-empty */}catch(e){} /* eslint-enable no-empty */} /***/}, /* 38 */ /***/function(module,exports){'use strict';exports.__esModule=true;exports["default"]=bindActionCreators;function bindActionCreator(actionCreator,dispatch){return function(){return dispatch(actionCreator.apply(undefined,arguments));};} /**
		 * Turns an object whose values are action creators, into an object with the
		 * same keys, but with every function wrapped into a `dispatch` call so they
		 * may be invoked directly. This is just a convenience method, as you can call
		 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
		 *
		 * For convenience, you can also pass a single function as the first argument,
		 * and get a function in return.
		 *
		 * @param {Function|Object} actionCreators An object whose values are action
		 * creator functions. One handy way to obtain it is to use ES6 `import * as`
		 * syntax. You may also pass a single function.
		 *
		 * @param {Function} dispatch The `dispatch` function available on your Redux
		 * store.
		 *
		 * @returns {Function|Object} The object mimicking the original object, but with
		 * every action creator wrapped into the `dispatch` call. If you passed a
		 * function as `actionCreators`, the return value will also be a single
		 * function.
		 */function bindActionCreators(actionCreators,dispatch){if(typeof actionCreators==='function'){return bindActionCreator(actionCreators,dispatch);}if((typeof actionCreators==='undefined'?'undefined':_typeof2(actionCreators))!=='object'||actionCreators===null){throw new Error('bindActionCreators expected an object or a function, instead received '+(actionCreators===null?'null':typeof actionCreators==='undefined'?'undefined':_typeof2(actionCreators))+'. '+'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');}var keys=Object.keys(actionCreators);var boundActionCreators={};for(var i=0;i<keys.length;i++){var key=keys[i];var actionCreator=actionCreators[key];if(typeof actionCreator==='function'){boundActionCreators[key]=bindActionCreator(actionCreator,dispatch);}}return boundActionCreators;} /***/}, /* 39 */ /***/function(module,exports,__webpack_require__){'use strict';exports.__esModule=true;var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};exports["default"]=applyMiddleware;var _compose=__webpack_require__(40);var _compose2=_interopRequireDefault(_compose);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj};} /**
		 * Creates a store enhancer that applies middleware to the dispatch method
		 * of the Redux store. This is handy for a variety of tasks, such as expressing
		 * asynchronous actions in a concise manner, or logging every action payload.
		 *
		 * See `redux-thunk` package as an example of the Redux middleware.
		 *
		 * Because middleware is potentially asynchronous, this should be the first
		 * store enhancer in the composition chain.
		 *
		 * Note that each middleware will be given the `dispatch` and `getState` functions
		 * as named arguments.
		 *
		 * @param {...Function} middlewares The middleware chain to be applied.
		 * @returns {Function} A store enhancer applying the middleware.
		 */function applyMiddleware(){for(var _len=arguments.length,middlewares=Array(_len),_key=0;_key<_len;_key++){middlewares[_key]=arguments[_key];}return function(createStore){return function(reducer,initialState,enhancer){var store=createStore(reducer,initialState,enhancer);var _dispatch=store.dispatch;var chain=[];var middlewareAPI={getState:store.getState,dispatch:function dispatch(action){return _dispatch(action);}};chain=middlewares.map(function(middleware){return middleware(middlewareAPI);});_dispatch=_compose2["default"].apply(undefined,chain)(store.dispatch);return _extends({},store,{dispatch:_dispatch});};};} /***/}, /* 40 */ /***/function(module,exports){"use strict";exports.__esModule=true;exports["default"]=compose; /**
		 * Composes single-argument functions from right to left. The rightmost
		 * function can take multiple arguments as it provides the signature for
		 * the resulting composite function.
		 *
		 * @param {...Function} funcs The functions to compose.
		 * @returns {Function} A function obtained by composing the argument functions
		 * from right to left. For example, compose(f, g, h) is identical to doing
		 * (...args) => f(g(h(...args))).
		 */function compose(){for(var _len=arguments.length,funcs=Array(_len),_key=0;_key<_len;_key++){funcs[_key]=arguments[_key];}if(funcs.length===0){return function(arg){return arg;};}else {var _ret=function(){var last=funcs[funcs.length-1];var rest=funcs.slice(0,-1);return {v:function v(){return rest.reduceRight(function(composed,f){return f(composed);},last.apply(undefined,arguments));}};}();if((typeof _ret==='undefined'?'undefined':_typeof2(_ret))==="object")return _ret.v;}} /***/}, /* 41 */ /***/function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports['default']=function(){var state=arguments.length<=0||arguments[0]===undefined?defaultState:arguments[0];var action=arguments[1];return action.type==="SET_PARAMS"?(0,_objectAssign2['default'])({},state,action.data):state;};var _objectAssign=__webpack_require__(42);var _objectAssign2=_interopRequireDefault(_objectAssign);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var defaultState={x:0,y:0,isVisible:false,currentItem:{}}; /***/}, /* 42 */ /***/function(module,exports){'use strict'; /* eslint-disable no-unused-vars */var hasOwnProperty=Object.prototype.hasOwnProperty;var propIsEnumerable=Object.prototype.propertyIsEnumerable;function toObject(val){if(val===null||val===undefined){throw new TypeError('Object.assign cannot be called with null or undefined');}return Object(val);}function shouldUseNative(){try{if(!Object.assign){return false;} // Detect buggy property enumeration order in older V8 versions.
	// https://bugs.chromium.org/p/v8/issues/detail?id=4118
	var test1=new String('abc'); // eslint-disable-line
	test1[5]='de';if(Object.getOwnPropertyNames(test1)[0]==='5'){return false;} // https://bugs.chromium.org/p/v8/issues/detail?id=3056
	var test2={};for(var i=0;i<10;i++){test2['_'+String.fromCharCode(i)]=i;}var order2=Object.getOwnPropertyNames(test2).map(function(n){return test2[n];});if(order2.join('')!=='0123456789'){return false;} // https://bugs.chromium.org/p/v8/issues/detail?id=3056
	var test3={};'abcdefghijklmnopqrst'.split('').forEach(function(letter){test3[letter]=letter;});if(Object.keys(Object.assign({},test3)).join('')!=='abcdefghijklmnopqrst'){return false;}return true;}catch(e){ // We don't expect any of the above to throw, but better to be safe.
	return false;}}module.exports=shouldUseNative()?Object.assign:function(target,source){var from;var to=toObject(target);var symbols;for(var s=1;s<arguments.length;s++){from=Object(arguments[s]);for(var key in from){if(hasOwnProperty.call(from,key)){to[key]=from[key];}}if(Object.getOwnPropertySymbols){symbols=Object.getOwnPropertySymbols(from);for(var i=0;i<symbols.length;i++){if(propIsEnumerable.call(from,symbols[i])){to[symbols[i]]=from[symbols[i]];}}}}return to;}; /***/}, /* 43 */ /***/function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _react=__webpack_require__(2);var _react2=_interopRequireDefault(_react);var _monitor=__webpack_require__(44);var _monitor2=_interopRequireDefault(_monitor);var _Modal=__webpack_require__(45);var _Modal2=_interopRequireDefault(_Modal);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var modalStyle={position:"fixed",zIndex:1040,top:0,bottom:0,left:0,right:0},backdropStyle=_extends({},modalStyle,{zIndex:"auto",backgroundColor:"transparent"}),menuStyles={position:"fixed",zIndex:"auto"};var ContextMenuWrapper=_react2['default'].createClass({displayName:"ContextMenuWrapper",getInitialState:function getInitialState(){return {left:0,top:0};},componentWillReceiveProps:function componentWillReceiveProps(nextProps){var _this=this;if(nextProps.isVisible===nextProps.identifier){var wrapper=window.requestAnimationFrame||setTimeout;wrapper(function(){return _this.setState(_this.getMenuPosition(nextProps.x,nextProps.y));});}},shouldComponentUpdate:function shouldComponentUpdate(nextProps){return this.props.isVisible!==nextProps.visible;},getMenuPosition:function getMenuPosition(x,y){var scrollX=document.documentElement.scrollTop;var scrollY=document.documentElement.scrollLeft;var _window=window;var innerWidth=_window.innerWidth;var innerHeight=_window.innerHeight;var rect=this.menu.getBoundingClientRect();var menuStyles={top:y+scrollY,left:x+scrollX};if(y+rect.height>innerHeight){menuStyles.top-=rect.height;}if(x+rect.width>innerWidth){menuStyles.left-=rect.width;}return menuStyles;},render:function render(){var _this2=this;var _props=this.props;var isVisible=_props.isVisible;var identifier=_props.identifier;var children=_props.children;var style=_extends({},menuStyles,this.state);return _react2['default'].createElement(_Modal2['default'],{style:modalStyle,backdropStyle:backdropStyle,show:isVisible===identifier,onHide:function onHide(){return _monitor2['default'].hideMenu();}},_react2['default'].createElement("nav",{ref:function ref(c){return _this2.menu=c;},style:style,className:"react-context-menu"},children));}});exports['default']=ContextMenuWrapper; /***/}, /* 44 */ /***/function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _store=__webpack_require__(26);var _store2=_interopRequireDefault(_store);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}exports['default']={getItem:function getItem(){return _store2['default'].getState().currentItem;},getPosition:function getPosition(){var _store$getState=_store2['default'].getState();var x=_store$getState.x;var y=_store$getState.y;return {x:x,y:y};},hideMenu:function hideMenu(){_store2['default'].dispatch({type:"SET_PARAMS",data:{isVisible:false,currentItem:{}}});}}; /***/}, /* 45 */ /***/function(module,exports,__webpack_require__){ /*eslint-disable react/prop-types */'use strict';exports.__esModule=true;var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}function _objectWithoutProperties(obj,keys){var target={};for(var i in obj){if(keys.indexOf(i)>=0)continue;if(!Object.prototype.hasOwnProperty.call(obj,i))continue;target[i]=obj[i];}return target;}var _react=__webpack_require__(2);var _react2=_interopRequireDefault(_react);var _warning=__webpack_require__(46);var _warning2=_interopRequireDefault(_warning);var _reactPropTypesLibMountable=__webpack_require__(47);var _reactPropTypesLibMountable2=_interopRequireDefault(_reactPropTypesLibMountable);var _reactPropTypesLibElementType=__webpack_require__(49);var _reactPropTypesLibElementType2=_interopRequireDefault(_reactPropTypesLibElementType);var _Portal=__webpack_require__(50);var _Portal2=_interopRequireDefault(_Portal);var _ModalManager=__webpack_require__(54);var _ModalManager2=_interopRequireDefault(_ModalManager);var _utilsOwnerDocument=__webpack_require__(51);var _utilsOwnerDocument2=_interopRequireDefault(_utilsOwnerDocument);var _utilsAddEventListener=__webpack_require__(72);var _utilsAddEventListener2=_interopRequireDefault(_utilsAddEventListener);var _utilsAddFocusListener=__webpack_require__(75);var _utilsAddFocusListener2=_interopRequireDefault(_utilsAddFocusListener);var _domHelpersUtilInDOM=__webpack_require__(68);var _domHelpersUtilInDOM2=_interopRequireDefault(_domHelpersUtilInDOM);var _domHelpersActiveElement=__webpack_require__(76);var _domHelpersActiveElement2=_interopRequireDefault(_domHelpersActiveElement);var _domHelpersQueryContains=__webpack_require__(77);var _domHelpersQueryContains2=_interopRequireDefault(_domHelpersQueryContains);var _utilsGetContainer=__webpack_require__(53);var _utilsGetContainer2=_interopRequireDefault(_utilsGetContainer);var modalManager=new _ModalManager2['default'](); /**
		 * Love them or hate them, `<Modal/>` provides a solid foundation for creating dialogs, lightboxes, or whatever else.
		 * The Modal component renders its `children` node in front of a backdrop component.
		 *
		 * The Modal offers a few helpful features over using just a `<Portal/>` component and some styles:
		 *
		 * - Manages dialog stacking when one-at-a-time just isn't enough.
		 * - Creates a backdrop, for disabling interaction below the modal.
		 * - It properly manages focus; moving to the modal content, and keeping it there until the modal is closed.
		 * - It disables scrolling of the page content while open.
		 * - Adds the appropriate ARIA roles are automatically.
		 * - Easily pluggable animations via a `<Transition/>` component.
		 *
		 * Note that, in the same way the backdrop element prevents users from clicking or interacting
		 * with the page content underneath the Modal, Screen readers also need to be signaled to not to
		 * interact with page content while the Modal is open. To do this, we use a common technique of applying
		 * the `aria-hidden='true'` attribute to the non-Modal elements in the Modal `container`. This means that for
		 * a Modal to be truly modal, it should have a `container` that is _outside_ your app's
		 * React hierarchy (such as the default: document.body).
		 */var Modal=_react2['default'].createClass({displayName:'Modal',propTypes:_extends({},_Portal2['default'].propTypes,{ /**
		     * Set the visibility of the Modal
		     */show:_react2['default'].PropTypes.bool, /**
		     * A Node, Component instance, or function that returns either. The Modal is appended to it's container element.
		     *
		     * For the sake of assistive technologies, the container should usually be the document body, so that the rest of the
		     * page content can be placed behind a virtual backdrop as well as a visual one.
		     */container:_react2['default'].PropTypes.oneOfType([_reactPropTypesLibMountable2['default'],_react2['default'].PropTypes.func]), /**
		     * A callback fired when the Modal is opening.
		     */onShow:_react2['default'].PropTypes.func, /**
		     * A callback fired when either the backdrop is clicked, or the escape key is pressed.
		     *
		     * The `onHide` callback only signals intent from the Modal,
		     * you must actually set the `show` prop to `false` for the Modal to close.
		     */onHide:_react2['default'].PropTypes.func, /**
		     * Include a backdrop component.
		     */backdrop:_react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.bool,_react2['default'].PropTypes.oneOf(['static'])]), /**
		     * A callback fired when the escape key, if specified in `keyboard`, is pressed.
		     */onEscapeKeyUp:_react2['default'].PropTypes.func, /**
		     * A callback fired when the backdrop, if specified, is clicked.
		     */onBackdropClick:_react2['default'].PropTypes.func, /**
		     * A style object for the backdrop component.
		     */backdropStyle:_react2['default'].PropTypes.object, /**
		     * A css class or classes for the backdrop component.
		     */backdropClassName:_react2['default'].PropTypes.string, /**
		     * A css class or set of classes applied to the modal container when the modal is open,
		     * and removed when it is closed.
		     */containerClassName:_react2['default'].PropTypes.string, /**
		     * Close the modal when escape key is pressed
		     */keyboard:_react2['default'].PropTypes.bool, /**
		     * A `<Transition/>` component to use for the dialog and backdrop components.
		     */transition:_reactPropTypesLibElementType2['default'], /**
		     * The `timeout` of the dialog transition if specified. This number is used to ensure that
		     * transition callbacks are always fired, even if browser transition events are canceled.
		     *
		     * See the Transition `timeout` prop for more infomation.
		     */dialogTransitionTimeout:_react2['default'].PropTypes.number, /**
		     * The `timeout` of the backdrop transition if specified. This number is used to
		     * ensure that transition callbacks are always fired, even if browser transition events are canceled.
		     *
		     * See the Transition `timeout` prop for more infomation.
		     */backdropTransitionTimeout:_react2['default'].PropTypes.number, /**
		     * When `true` The modal will automatically shift focus to itself when it opens, and
		     * replace it to the last focused element when it closes. This also
		     * works correctly with any Modal children that have the `autoFocus` prop.
		     *
		     * Generally this should never be set to `false` as it makes the Modal less
		     * accessible to assistive technologies, like screen readers.
		     */autoFocus:_react2['default'].PropTypes.bool, /**
		     * When `true` The modal will prevent focus from leaving the Modal while open.
		     *
		     * Generally this should never be set to `false` as it makes the Modal less
		     * accessible to assistive technologies, like screen readers.
		     */enforceFocus:_react2['default'].PropTypes.bool, /**
		     * Callback fired before the Modal transitions in
		     */onEnter:_react2['default'].PropTypes.func, /**
		     * Callback fired as the Modal begins to transition in
		     */onEntering:_react2['default'].PropTypes.func, /**
		     * Callback fired after the Modal finishes transitioning in
		     */onEntered:_react2['default'].PropTypes.func, /**
		     * Callback fired right before the Modal transitions out
		     */onExit:_react2['default'].PropTypes.func, /**
		     * Callback fired as the Modal begins to transition out
		     */onExiting:_react2['default'].PropTypes.func, /**
		     * Callback fired after the Modal finishes transitioning out
		     */onExited:_react2['default'].PropTypes.func}),getDefaultProps:function getDefaultProps(){var noop=function noop(){};return {show:false,backdrop:true,keyboard:true,autoFocus:true,enforceFocus:true,onHide:noop};},getInitialState:function getInitialState(){return {exited:!this.props.show};},render:function render(){var _props=this.props;var children=_props.children;var Transition=_props.transition;var backdrop=_props.backdrop;var dialogTransitionTimeout=_props.dialogTransitionTimeout;var props=_objectWithoutProperties(_props,['children','transition','backdrop','dialogTransitionTimeout']);var onExit=props.onExit;var onExiting=props.onExiting;var onEnter=props.onEnter;var onEntering=props.onEntering;var onEntered=props.onEntered;var show=!!props.show;var dialog=_react2['default'].Children.only(this.props.children);var mountModal=show||Transition&&!this.state.exited;if(!mountModal){return null;}var _dialog$props=dialog.props;var role=_dialog$props.role;var tabIndex=_dialog$props.tabIndex;if(role===undefined||tabIndex===undefined){dialog=_react.cloneElement(dialog,{role:role===undefined?'document':role,tabIndex:tabIndex==null?'-1':tabIndex});}if(Transition){dialog=_react2['default'].createElement(Transition,{transitionAppear:true,unmountOnExit:true,'in':show,timeout:dialogTransitionTimeout,onExit:onExit,onExiting:onExiting,onExited:this.handleHidden,onEnter:onEnter,onEntering:onEntering,onEntered:onEntered},dialog);}return _react2['default'].createElement(_Portal2['default'],{ref:this.setMountNode,container:props.container},_react2['default'].createElement('div',{ref:'modal',role:props.role||'dialog',style:props.style,className:props.className},backdrop&&this.renderBackdrop(),dialog));},renderBackdrop:function renderBackdrop(){var _props2=this.props;var Transition=_props2.transition;var backdropTransitionTimeout=_props2.backdropTransitionTimeout;var backdrop=_react2['default'].createElement('div',{ref:'backdrop',style:this.props.backdropStyle,className:this.props.backdropClassName,onClick:this.handleBackdropClick});if(Transition){backdrop=_react2['default'].createElement(Transition,{transitionAppear:true,'in':this.props.show,timeout:backdropTransitionTimeout},backdrop);}return backdrop;},componentWillReceiveProps:function componentWillReceiveProps(nextProps){if(nextProps.show){this.setState({exited:false});}else if(!nextProps.transition){ // Otherwise let handleHidden take care of marking exited.
	this.setState({exited:true});}},componentWillUpdate:function componentWillUpdate(nextProps){if(nextProps.show){this.checkForFocus();}},componentDidMount:function componentDidMount(){if(this.props.show){this.onShow();}},componentDidUpdate:function componentDidUpdate(prevProps){var transition=this.props.transition;if(prevProps.show&&!this.props.show&&!transition){ // Otherwise handleHidden will call this.
	this.onHide();}else if(!prevProps.show&&this.props.show){this.onShow();}},componentWillUnmount:function componentWillUnmount(){var _props3=this.props;var show=_props3.show;var transition=_props3.transition;if(show||transition&&!this.state.exited){this.onHide();}},onShow:function onShow(){var doc=_utilsOwnerDocument2['default'](this);var container=_utilsGetContainer2['default'](this.props.container,doc.body);modalManager.add(this,container,this.props.containerClassName);this._onDocumentKeyupListener=_utilsAddEventListener2['default'](doc,'keyup',this.handleDocumentKeyUp);this._onFocusinListener=_utilsAddFocusListener2['default'](this.enforceFocus);this.focus();if(this.props.onShow){this.props.onShow();}},onHide:function onHide(){modalManager.remove(this);this._onDocumentKeyupListener.remove();this._onFocusinListener.remove();this.restoreLastFocus();},setMountNode:function setMountNode(ref){this.mountNode=ref?ref.getMountNode():ref;},handleHidden:function handleHidden(){this.setState({exited:true});this.onHide();if(this.props.onExited){var _props4;(_props4=this.props).onExited.apply(_props4,arguments);}},handleBackdropClick:function handleBackdropClick(e){if(e.target!==e.currentTarget){return;}if(this.props.onBackdropClick){this.props.onBackdropClick(e);}if(this.props.backdrop===true){this.props.onHide();}},handleDocumentKeyUp:function handleDocumentKeyUp(e){if(this.props.keyboard&&e.keyCode===27&&this.isTopModal()){if(this.props.onEscapeKeyUp){this.props.onEscapeKeyUp(e);}this.props.onHide();}},checkForFocus:function checkForFocus(){if(_domHelpersUtilInDOM2['default']){this.lastFocus=_domHelpersActiveElement2['default']();}},focus:function focus(){var autoFocus=this.props.autoFocus;var modalContent=this.getDialogElement();var current=_domHelpersActiveElement2['default'](_utilsOwnerDocument2['default'](this));var focusInModal=current&&_domHelpersQueryContains2['default'](modalContent,current);if(modalContent&&autoFocus&&!focusInModal){this.lastFocus=current;if(!modalContent.hasAttribute('tabIndex')){modalContent.setAttribute('tabIndex',-1);_warning2['default'](false,'The modal content node does not accept focus. '+'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".');}modalContent.focus();}},restoreLastFocus:function restoreLastFocus(){ // Support: <=IE11 doesn't support `focus()` on svg elements (RB: #917)
	if(this.lastFocus&&this.lastFocus.focus){this.lastFocus.focus();this.lastFocus=null;}},enforceFocus:function enforceFocus(){var enforceFocus=this.props.enforceFocus;if(!enforceFocus||!this.isMounted()||!this.isTopModal()){return;}var active=_domHelpersActiveElement2['default'](_utilsOwnerDocument2['default'](this));var modal=this.getDialogElement();if(modal&&modal!==active&&!_domHelpersQueryContains2['default'](modal,active)){modal.focus();}}, //instead of a ref, which might conflict with one the parent applied.
	getDialogElement:function getDialogElement(){var node=this.refs.modal;return node&&node.lastChild;},isTopModal:function isTopModal(){return modalManager.isTopModal(this);}});Modal.manager=modalManager;exports['default']=Modal;module.exports=exports['default']; /***/}, /* 46 */ /***/function(module,exports,__webpack_require__){ /* WEBPACK VAR INJECTION */(function(process){ /**
		 * Copyright 2014-2015, Facebook, Inc.
		 * All rights reserved.
		 *
		 * This source code is licensed under the BSD-style license found in the
		 * LICENSE file in the root directory of this source tree. An additional grant
		 * of patent rights can be found in the PATENTS file in the same directory.
		 */'use strict'; /**
		 * Similar to invariant but only logs a warning if the condition is not met.
		 * This can be used to log issues in development environments in critical
		 * paths. Removing the logging code for production environments will keep the
		 * same logic and follow the same code paths.
		 */var warning=function warning(){};if(process.env.NODE_ENV!=='production'){warning=function warning(condition,format,args){var len=arguments.length;args=new Array(len>2?len-2:0);for(var key=2;key<len;key++){args[key-2]=arguments[key];}if(format===undefined){throw new Error('`warning(condition, format, ...args)` requires a warning '+'message argument');}if(format.length<10||/^[s\W]*$/.test(format)){throw new Error('The warning format should be able to uniquely identify this '+'warning. Please, use a more descriptive format than: '+format);}if(!condition){var argIndex=0;var message='Warning: '+format.replace(/%s/g,function(){return args[argIndex++];});if(typeof console!=='undefined'){console.error(message);}try{ // This error was thrown as a convenience so that you can use this stack
	// to find the callsite that caused this warning to fire.
	throw new Error(message);}catch(x){}}};}module.exports=warning; /* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(28)); /***/}, /* 47 */ /***/function(module,exports,__webpack_require__){'use strict';exports.__esModule=true;var _common=__webpack_require__(48); /**
		 * Checks whether a prop provides a DOM element
		 *
		 * The element can be provided in two forms:
		 * - Directly passed
		 * - Or passed an object that has a `render` method
		 *
		 * @param props
		 * @param propName
		 * @param componentName
		 * @returns {Error|undefined}
		 */function validate(props,propName,componentName){if(_typeof2(props[propName])!=='object'||typeof props[propName].render!=='function'&&props[propName].nodeType!==1){return new Error(_common.errMsg(props,propName,componentName,', expected a DOM element or an object that has a `render` method'));}}exports['default']=_common.createChainableTypeChecker(validate);module.exports=exports['default']; /***/}, /* 48 */ /***/function(module,exports){'use strict';exports.__esModule=true;exports.errMsg=errMsg;exports.createChainableTypeChecker=createChainableTypeChecker;function errMsg(props,propName,componentName,msgContinuation){return 'Invalid prop \''+propName+'\' of value \''+props[propName]+'\''+(' supplied to \''+componentName+'\''+msgContinuation);} /**
		 * Create chain-able isRequired validator
		 *
		 * Largely copied directly from:
		 *  https://github.com/facebook/react/blob/0.11-stable/src/core/ReactPropTypes.js#L94
		 */function createChainableTypeChecker(validate){function checkType(isRequired,props,propName,componentName){componentName=componentName||'<<anonymous>>';if(props[propName]==null){if(isRequired){return new Error('Required prop \''+propName+'\' was not specified in \''+componentName+'\'.');}}else {return validate(props,propName,componentName);}}var chainedCheckType=checkType.bind(null,false);chainedCheckType.isRequired=checkType.bind(null,true);return chainedCheckType;} /***/}, /* 49 */ /***/function(module,exports,__webpack_require__){'use strict';exports.__esModule=true;function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var _react=__webpack_require__(2);var _react2=_interopRequireDefault(_react);var _common=__webpack_require__(48); /**
		 * Checks whether a prop provides a type of element.
		 *
		 * The type of element can be provided in two forms:
		 * - tag name (string)
		 * - a return value of React.createClass(...)
		 *
		 * @param props
		 * @param propName
		 * @param componentName
		 * @returns {Error|undefined}
		 */function validate(props,propName,componentName){var errBeginning=_common.errMsg(props,propName,componentName,'. Expected an Element `type`');if(typeof props[propName]!=='function'){if(_react2['default'].isValidElement(props[propName])){return new Error(errBeginning+', not an actual Element');}if(typeof props[propName]!=='string'){return new Error(errBeginning+' such as a tag name or return value of React.createClass(...)');}}}exports['default']=_common.createChainableTypeChecker(validate);module.exports=exports['default']; /***/}, /* 50 */ /***/function(module,exports,__webpack_require__){'use strict';exports.__esModule=true;function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var _react=__webpack_require__(2);var _react2=_interopRequireDefault(_react);var _reactDom=__webpack_require__(3);var _reactDom2=_interopRequireDefault(_reactDom);var _reactPropTypesLibMountable=__webpack_require__(47);var _reactPropTypesLibMountable2=_interopRequireDefault(_reactPropTypesLibMountable);var _utilsOwnerDocument=__webpack_require__(51);var _utilsOwnerDocument2=_interopRequireDefault(_utilsOwnerDocument);var _utilsGetContainer=__webpack_require__(53);var _utilsGetContainer2=_interopRequireDefault(_utilsGetContainer); /**
		 * The `<Portal/>` component renders its children into a new "subtree" outside of current component hierarchy.
		 * You can think of it as a declarative `appendChild()`, or jQuery's `$.fn.appendTo()`.
		 * The children of `<Portal/>` component will be appended to the `container` specified.
		 */var Portal=_react2['default'].createClass({displayName:'Portal',propTypes:{ /**
		     * A Node, Component instance, or function that returns either. The `container` will have the Portal children
		     * appended to it.
		     */container:_react2['default'].PropTypes.oneOfType([_reactPropTypesLibMountable2['default'],_react2['default'].PropTypes.func])},componentDidMount:function componentDidMount(){this._renderOverlay();},componentDidUpdate:function componentDidUpdate(){this._renderOverlay();},componentWillReceiveProps:function componentWillReceiveProps(nextProps){if(this._overlayTarget&&nextProps.container!==this.props.container){this._portalContainerNode.removeChild(this._overlayTarget);this._portalContainerNode=_utilsGetContainer2['default'](nextProps.container,_utilsOwnerDocument2['default'](this).body);this._portalContainerNode.appendChild(this._overlayTarget);}},componentWillUnmount:function componentWillUnmount(){this._unrenderOverlay();this._unmountOverlayTarget();},_mountOverlayTarget:function _mountOverlayTarget(){if(!this._overlayTarget){this._overlayTarget=document.createElement('div');this._portalContainerNode=_utilsGetContainer2['default'](this.props.container,_utilsOwnerDocument2['default'](this).body);this._portalContainerNode.appendChild(this._overlayTarget);}},_unmountOverlayTarget:function _unmountOverlayTarget(){if(this._overlayTarget){this._portalContainerNode.removeChild(this._overlayTarget);this._overlayTarget=null;}this._portalContainerNode=null;},_renderOverlay:function _renderOverlay(){var overlay=!this.props.children?null:_react2['default'].Children.only(this.props.children); // Save reference for future access.
	if(overlay!==null){this._mountOverlayTarget();this._overlayInstance=_reactDom2['default'].unstable_renderSubtreeIntoContainer(this,overlay,this._overlayTarget);}else { // Unrender if the component is null for transitions to null
	this._unrenderOverlay();this._unmountOverlayTarget();}},_unrenderOverlay:function _unrenderOverlay(){if(this._overlayTarget){_reactDom2['default'].unmountComponentAtNode(this._overlayTarget);this._overlayInstance=null;}},render:function render(){return null;},getMountNode:function getMountNode(){return this._overlayTarget;},getOverlayDOMNode:function getOverlayDOMNode(){if(!this.isMounted()){throw new Error('getOverlayDOMNode(): A component must be mounted to have a DOM node.');}if(this._overlayInstance){if(this._overlayInstance.getWrappedDOMNode){return this._overlayInstance.getWrappedDOMNode();}else {return _reactDom2['default'].findDOMNode(this._overlayInstance);}}return null;}});exports['default']=Portal;module.exports=exports['default']; /***/}, /* 51 */ /***/function(module,exports,__webpack_require__){'use strict';exports.__esModule=true;function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var _reactDom=__webpack_require__(3);var _reactDom2=_interopRequireDefault(_reactDom);var _domHelpersOwnerDocument=__webpack_require__(52);var _domHelpersOwnerDocument2=_interopRequireDefault(_domHelpersOwnerDocument);exports['default']=function(componentOrElement){return _domHelpersOwnerDocument2['default'](_reactDom2['default'].findDOMNode(componentOrElement));};module.exports=exports['default']; /***/}, /* 52 */ /***/function(module,exports){"use strict";exports.__esModule=true;exports["default"]=ownerDocument;function ownerDocument(node){return node&&node.ownerDocument||document;}module.exports=exports["default"]; /***/}, /* 53 */ /***/function(module,exports,__webpack_require__){'use strict';exports.__esModule=true;exports['default']=getContainer;function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var _reactDom=__webpack_require__(3);var _reactDom2=_interopRequireDefault(_reactDom);function getContainer(container,defaultContainer){container=typeof container==='function'?container():container;return _reactDom2['default'].findDOMNode(container)||defaultContainer;}module.exports=exports['default']; /***/}, /* 54 */ /***/function(module,exports,__webpack_require__){'use strict';exports.__esModule=true;function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}var _domHelpersStyle=__webpack_require__(55);var _domHelpersStyle2=_interopRequireDefault(_domHelpersStyle);var _domHelpersClass=__webpack_require__(63);var _domHelpersClass2=_interopRequireDefault(_domHelpersClass);var _domHelpersUtilScrollbarSize=__webpack_require__(67);var _domHelpersUtilScrollbarSize2=_interopRequireDefault(_domHelpersUtilScrollbarSize);var _utilsIsOverflowing=__webpack_require__(69);var _utilsIsOverflowing2=_interopRequireDefault(_utilsIsOverflowing);var _utilsManageAriaHidden=__webpack_require__(71);function findIndexOf(arr,cb){var idx=-1;arr.some(function(d,i){if(cb(d,i)){idx=i;return true;}});return idx;}function findContainer(data,modal){return findIndexOf(data,function(d){return d.modals.indexOf(modal)!==-1;});} /**
		 * Proper state managment for containers and the modals in those containers.
		 *
		 * @internal Used by the Modal to ensure proper styling of containers.
		 */var ModalManager=function(){function ModalManager(){var hideSiblingNodes=arguments.length<=0||arguments[0]===undefined?true:arguments[0];_classCallCheck(this,ModalManager);this.hideSiblingNodes=hideSiblingNodes;this.modals=[];this.containers=[];this.data=[];}ModalManager.prototype.add=function add(modal,container,className){var modalIdx=this.modals.indexOf(modal);var containerIdx=this.containers.indexOf(container);if(modalIdx!==-1){return modalIdx;}modalIdx=this.modals.length;this.modals.push(modal);if(this.hideSiblingNodes){_utilsManageAriaHidden.hideSiblings(container,modal.mountNode);}if(containerIdx!==-1){this.data[containerIdx].modals.push(modal);return modalIdx;}var data={modals:[modal], //right now only the first modal of a container will have its classes applied
	classes:className?className.split(/\s+/):[], //we are only interested in the actual `style` here becasue we will override it
	style:{overflow:container.style.overflow,paddingRight:container.style.paddingRight}};var style={overflow:'hidden'};data.overflowing=_utilsIsOverflowing2['default'](container);if(data.overflowing){ // use computed style, here to get the real padding
	// to add our scrollbar width
	style.paddingRight=parseInt(_domHelpersStyle2['default'](container,'paddingRight')||0,10)+_domHelpersUtilScrollbarSize2['default']()+'px';}_domHelpersStyle2['default'](container,style);data.classes.forEach(_domHelpersClass2['default'].addClass.bind(null,container));this.containers.push(container);this.data.push(data);return modalIdx;};ModalManager.prototype.remove=function remove(modal){var modalIdx=this.modals.indexOf(modal);if(modalIdx===-1){return;}var containerIdx=findContainer(this.data,modal);var data=this.data[containerIdx];var container=this.containers[containerIdx];data.modals.splice(data.modals.indexOf(modal),1);this.modals.splice(modalIdx,1); // if that was the last modal in a container,
	// clean up the container stylinhg.
	if(data.modals.length===0){Object.keys(data.style).forEach(function(key){return container.style[key]=data.style[key];});data.classes.forEach(_domHelpersClass2['default'].removeClass.bind(null,container));if(this.hideSiblingNodes){_utilsManageAriaHidden.showSiblings(container,modal.mountNode);}this.containers.splice(containerIdx,1);this.data.splice(containerIdx,1);}else if(this.hideSiblingNodes){ //otherwise make sure the next top modal is visible to a SR
	_utilsManageAriaHidden.ariaHidden(false,data.modals[data.modals.length-1].mountNode);}};ModalManager.prototype.isTopModal=function isTopModal(modal){return !!this.modals.length&&this.modals[this.modals.length-1]===modal;};return ModalManager;}();exports['default']=ModalManager;module.exports=exports['default']; /***/}, /* 55 */ /***/function(module,exports,__webpack_require__){'use strict';var camelize=__webpack_require__(56),hyphenate=__webpack_require__(58),_getComputedStyle=__webpack_require__(60),removeStyle=__webpack_require__(62);var has=Object.prototype.hasOwnProperty;module.exports=function style(node,property,value){var css='',props=property;if(typeof property==='string'){if(value===undefined)return node.style[camelize(property)]||_getComputedStyle(node).getPropertyValue(hyphenate(property));else (props={})[property]=value;}for(var key in props){if(has.call(props,key)){!props[key]&&props[key]!==0?removeStyle(node,hyphenate(key)):css+=hyphenate(key)+':'+props[key]+';';}}node.style.cssText+=';'+css;}; /***/}, /* 56 */ /***/function(module,exports,__webpack_require__){ /**
		 * Copyright 2014-2015, Facebook, Inc.
		 * All rights reserved.
		 * https://github.com/facebook/react/blob/2aeb8a2a6beb00617a4217f7f8284924fa2ad819/src/vendor/core/camelizeStyleName.js
		 */'use strict';var camelize=__webpack_require__(57);var msPattern=/^-ms-/;module.exports=function camelizeStyleName(string){return camelize(string.replace(msPattern,'ms-'));}; /***/}, /* 57 */ /***/function(module,exports){"use strict";var rHyphen=/-(.)/g;module.exports=function camelize(string){return string.replace(rHyphen,function(_,chr){return chr.toUpperCase();});}; /***/}, /* 58 */ /***/function(module,exports,__webpack_require__){ /**
		 * Copyright 2013-2014, Facebook, Inc.
		 * All rights reserved.
		 * https://github.com/facebook/react/blob/2aeb8a2a6beb00617a4217f7f8284924fa2ad819/src/vendor/core/hyphenateStyleName.js
		 */"use strict";var hyphenate=__webpack_require__(59);var msPattern=/^ms-/;module.exports=function hyphenateStyleName(string){return hyphenate(string).replace(msPattern,"-ms-");}; /***/}, /* 59 */ /***/function(module,exports){'use strict';var rUpper=/([A-Z])/g;module.exports=function hyphenate(string){return string.replace(rUpper,'-$1').toLowerCase();}; /***/}, /* 60 */ /***/function(module,exports,__webpack_require__){'use strict';var babelHelpers=__webpack_require__(61);var _utilCamelizeStyle=__webpack_require__(56);var _utilCamelizeStyle2=babelHelpers.interopRequireDefault(_utilCamelizeStyle);var rposition=/^(top|right|bottom|left)$/;var rnumnonpx=/^([+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|))(?!px)[a-z%]+$/i;module.exports=function _getComputedStyle(node){if(!node)throw new TypeError('No Element passed to `getComputedStyle()`');var doc=node.ownerDocument;return 'defaultView' in doc?doc.defaultView.opener?node.ownerDocument.defaultView.getComputedStyle(node,null):window.getComputedStyle(node,null):{ //ie 8 "magic" from: https://github.com/jquery/jquery/blob/1.11-stable/src/css/curCSS.js#L72
	getPropertyValue:function getPropertyValue(prop){var style=node.style;prop=(0,_utilCamelizeStyle2['default'])(prop);if(prop=='float')prop='styleFloat';var current=node.currentStyle[prop]||null;if(current==null&&style&&style[prop])current=style[prop];if(rnumnonpx.test(current)&&!rposition.test(prop)){ // Remember the original values
	var left=style.left;var runStyle=node.runtimeStyle;var rsLeft=runStyle&&runStyle.left; // Put in the new values to get a computed value out
	if(rsLeft)runStyle.left=node.currentStyle.left;style.left=prop==='fontSize'?'1em':current;current=style.pixelLeft+'px'; // Revert the changed values
	style.left=left;if(rsLeft)runStyle.left=rsLeft;}return current;}};}; /***/}, /* 61 */ /***/function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;(function(root,factory){if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__=[exports],__WEBPACK_AMD_DEFINE_FACTORY__=factory,__WEBPACK_AMD_DEFINE_RESULT__=typeof __WEBPACK_AMD_DEFINE_FACTORY__==='function'?__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__):__WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else if((typeof exports==='undefined'?'undefined':_typeof2(exports))==="object"){factory(exports);}else {factory(root.babelHelpers={});}})(this,function(global){var babelHelpers=global;babelHelpers.interopRequireDefault=function(obj){return obj&&obj.__esModule?obj:{"default":obj};};babelHelpers._extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};}); /***/}, /* 62 */ /***/function(module,exports){'use strict';module.exports=function removeStyle(node,key){return 'removeProperty' in node.style?node.style.removeProperty(key):node.style.removeAttribute(key);}; /***/}, /* 63 */ /***/function(module,exports,__webpack_require__){'use strict';module.exports={addClass:__webpack_require__(64),removeClass:__webpack_require__(66),hasClass:__webpack_require__(65)}; /***/}, /* 64 */ /***/function(module,exports,__webpack_require__){'use strict';var hasClass=__webpack_require__(65);module.exports=function addClass(element,className){if(element.classList)element.classList.add(className);else if(!hasClass(element))element.className=element.className+' '+className;}; /***/}, /* 65 */ /***/function(module,exports){'use strict';module.exports=function hasClass(element,className){if(element.classList)return !!className&&element.classList.contains(className);else return (' '+element.className+' ').indexOf(' '+className+' ')!==-1;}; /***/}, /* 66 */ /***/function(module,exports){'use strict';module.exports=function removeClass(element,className){if(element.classList)element.classList.remove(className);else element.className=element.className.replace(new RegExp('(^|\\s)'+className+'(?:\\s|$)','g'),'$1').replace(/\s+/g,' ').replace(/^\s*|\s*$/g,'');}; /***/}, /* 67 */ /***/function(module,exports,__webpack_require__){'use strict';var canUseDOM=__webpack_require__(68);var size;module.exports=function(recalc){if(!size||recalc){if(canUseDOM){var scrollDiv=document.createElement('div');scrollDiv.style.position='absolute';scrollDiv.style.top='-9999px';scrollDiv.style.width='50px';scrollDiv.style.height='50px';scrollDiv.style.overflow='scroll';document.body.appendChild(scrollDiv);size=scrollDiv.offsetWidth-scrollDiv.clientWidth;document.body.removeChild(scrollDiv);}}return size;}; /***/}, /* 68 */ /***/function(module,exports){'use strict';module.exports=!!(typeof window!=='undefined'&&window.document&&window.document.createElement); /***/}, /* 69 */ /***/function(module,exports,__webpack_require__){'use strict';exports.__esModule=true;exports['default']=isOverflowing;function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var _domHelpersQueryIsWindow=__webpack_require__(70);var _domHelpersQueryIsWindow2=_interopRequireDefault(_domHelpersQueryIsWindow);var _domHelpersOwnerDocument=__webpack_require__(52);var _domHelpersOwnerDocument2=_interopRequireDefault(_domHelpersOwnerDocument);function isBody(node){return node&&node.tagName.toLowerCase()==='body';}function bodyIsOverflowing(node){var doc=_domHelpersOwnerDocument2['default'](node);var win=_domHelpersQueryIsWindow2['default'](doc);var fullWidth=win.innerWidth; // Support: ie8, no innerWidth
	if(!fullWidth){var documentElementRect=doc.documentElement.getBoundingClientRect();fullWidth=documentElementRect.right-Math.abs(documentElementRect.left);}return doc.body.clientWidth<fullWidth;}function isOverflowing(container){var win=_domHelpersQueryIsWindow2['default'](container);return win||isBody(container)?bodyIsOverflowing(container):container.scrollHeight>container.clientHeight;}module.exports=exports['default']; /***/}, /* 70 */ /***/function(module,exports){'use strict';module.exports=function getWindow(node){return node===node.window?node:node.nodeType===9?node.defaultView||node.parentWindow:false;}; /***/}, /* 71 */ /***/function(module,exports){'use strict';exports.__esModule=true;exports.ariaHidden=ariaHidden;exports.hideSiblings=hideSiblings;exports.showSiblings=showSiblings;var BLACKLIST=['template','script','style'];var isHidable=function isHidable(_ref){var nodeType=_ref.nodeType;var tagName=_ref.tagName;return nodeType===1&&BLACKLIST.indexOf(tagName.toLowerCase())===-1;};var siblings=function siblings(container,mount,cb){mount=[].concat(mount);[].forEach.call(container.children,function(node){if(mount.indexOf(node)===-1&&isHidable(node)){cb(node);}});};function ariaHidden(show,node){if(!node){return;}if(show){node.setAttribute('aria-hidden','true');}else {node.removeAttribute('aria-hidden');}}function hideSiblings(container,mountNode){siblings(container,mountNode,function(node){return ariaHidden(true,node);});}function showSiblings(container,mountNode){siblings(container,mountNode,function(node){return ariaHidden(false,node);});} /***/}, /* 72 */ /***/function(module,exports,__webpack_require__){'use strict';exports.__esModule=true;function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var _domHelpersEventsOn=__webpack_require__(73);var _domHelpersEventsOn2=_interopRequireDefault(_domHelpersEventsOn);var _domHelpersEventsOff=__webpack_require__(74);var _domHelpersEventsOff2=_interopRequireDefault(_domHelpersEventsOff);exports['default']=function(node,event,handler){_domHelpersEventsOn2['default'](node,event,handler);return {remove:function remove(){_domHelpersEventsOff2['default'](node,event,handler);}};};module.exports=exports['default']; /***/}, /* 73 */ /***/function(module,exports,__webpack_require__){'use strict';var canUseDOM=__webpack_require__(68);var on=function on(){};if(canUseDOM){on=function(){if(document.addEventListener)return function(node,eventName,handler,capture){return node.addEventListener(eventName,handler,capture||false);};else if(document.attachEvent)return function(node,eventName,handler){return node.attachEvent('on'+eventName,handler);};}();}module.exports=on; /***/}, /* 74 */ /***/function(module,exports,__webpack_require__){'use strict';var canUseDOM=__webpack_require__(68);var off=function off(){};if(canUseDOM){off=function(){if(document.addEventListener)return function(node,eventName,handler,capture){return node.removeEventListener(eventName,handler,capture||false);};else if(document.attachEvent)return function(node,eventName,handler){return node.detachEvent('on'+eventName,handler);};}();}module.exports=off; /***/}, /* 75 */ /***/function(module,exports){ /**
		 * Firefox doesn't have a focusin event so using capture is easiest way to get bubbling
		 * IE8 can't do addEventListener, but does have onfocusin, so we use that in ie8
		 *
		 * We only allow one Listener at a time to avoid stack overflows
		 */'use strict';exports.__esModule=true;exports['default']=addFocusListener;function addFocusListener(handler){var useFocusin=!document.addEventListener;var remove=undefined;if(useFocusin){document.attachEvent('onfocusin',handler);remove=function remove(){return document.detachEvent('onfocusin',handler);};}else {document.addEventListener('focus',handler,true);remove=function remove(){return document.removeEventListener('focus',handler,true);};}return {remove:remove};}module.exports=exports['default']; /***/}, /* 76 */ /***/function(module,exports,__webpack_require__){'use strict';var babelHelpers=__webpack_require__(61);exports.__esModule=true; /**
		 * document.activeElement
		 */exports['default']=activeElement;var _ownerDocument=__webpack_require__(52);var _ownerDocument2=babelHelpers.interopRequireDefault(_ownerDocument);function activeElement(){var doc=arguments[0]===undefined?document:arguments[0];try{return doc.activeElement;}catch(e){}}module.exports=exports['default']; /***/}, /* 77 */ /***/function(module,exports,__webpack_require__){'use strict';var canUseDOM=__webpack_require__(68);var contains=function(){var root=canUseDOM&&document.documentElement;return root&&root.contains?function(context,node){return context.contains(node);}:root&&root.compareDocumentPosition?function(context,node){return context===node||!!(context.compareDocumentPosition(node)&16);}:function(context,node){if(node)do {if(node===context)return true;}while(node=node.parentNode);return false;};}();module.exports=contains; /***/}, /* 78 */ /***/function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _typeof=typeof Symbol==="function"&&_typeof2(Symbol.iterator)==="symbol"?function(obj){return typeof obj==='undefined'?'undefined':_typeof2(obj);}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol?"symbol":typeof obj==='undefined'?'undefined':_typeof2(obj);};exports['default']=function(identifier,configure){return function(Component){var displayName=Component.displayName||Component.name||"Component";(0,_invariant2['default'])(identifier&&(typeof identifier==="string"||(typeof identifier==="undefined"?"undefined":_typeof(identifier))==="symbol"||typeof identifier==="function"),"Expected identifier to be string, symbol or function. See %s",displayName);if(configure){(0,_invariant2['default'])(typeof configure==="function","Expected configure to be a function. See %s",displayName);}return _react2['default'].createClass({displayName:displayName+"ContextMenuLayer",getDefaultProps:function getDefaultProps(){return {renderTag:"div",attributes:{}};},handleContextClick:function handleContextClick(event){var currentItem=typeof configure==="function"?configure(this.props):{};(0,_invariant2['default'])((0,_lodash2['default'])(currentItem),"Expected configure to return an object. See %s",displayName);event.preventDefault();_store2['default'].dispatch({type:"SET_PARAMS",data:{x:event.clientX,y:event.clientY,currentItem:currentItem,isVisible:typeof identifier==="function"?identifier(this.props):identifier}});},render:function render(){var _props=this.props;var _props$attributes=_props.attributes;var _props$attributes$cla=_props$attributes.className;var className=_props$attributes$cla===undefined?"":_props$attributes$cla;var attributes=_objectWithoutProperties(_props$attributes,["className"]);var renderTag=_props.renderTag;var props=_objectWithoutProperties(_props,["attributes","renderTag"]);attributes.className="react-context-menu-wrapper "+className;attributes.onContextMenu=this.handleContextClick;return _react2['default'].createElement(renderTag,attributes,_react2['default'].createElement(Component,props));}});};};var _react=__webpack_require__(2);var _react2=_interopRequireDefault(_react);var _invariant=__webpack_require__(79);var _invariant2=_interopRequireDefault(_invariant);var _lodash=__webpack_require__(80);var _lodash2=_interopRequireDefault(_lodash);var _store=__webpack_require__(26);var _store2=_interopRequireDefault(_store);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}function _objectWithoutProperties(obj,keys){var target={};for(var i in obj){if(keys.indexOf(i)>=0)continue;if(!Object.prototype.hasOwnProperty.call(obj,i))continue;target[i]=obj[i];}return target;} /***/}, /* 79 */ /***/function(module,exports,__webpack_require__){ /* WEBPACK VAR INJECTION */(function(process){ /**
		 * Copyright 2013-2015, Facebook, Inc.
		 * All rights reserved.
		 *
		 * This source code is licensed under the BSD-style license found in the
		 * LICENSE file in the root directory of this source tree. An additional grant
		 * of patent rights can be found in the PATENTS file in the same directory.
		 */'use strict'; /**
		 * Use invariant() to assert state which your program assumes to be true.
		 *
		 * Provide sprintf-style format (only %s is supported) and arguments
		 * to provide information about what broke and what you were
		 * expecting.
		 *
		 * The invariant message will be stripped in production, but the invariant
		 * will remain to ensure logic does not differ in production.
		 */var invariant=function invariant(condition,format,a,b,c,d,e,f){if(process.env.NODE_ENV!=='production'){if(format===undefined){throw new Error('invariant requires an error message argument');}}if(!condition){var error;if(format===undefined){error=new Error('Minified exception occurred; use the non-minified dev environment '+'for the full error message and additional helpful warnings.');}else {var args=[a,b,c,d,e,f];var argIndex=0;error=new Error(format.replace(/%s/g,function(){return args[argIndex++];}));error.name='Invariant Violation';}error.framesToPop=1; // we don't care about invariant's own frame
	throw error;}};module.exports=invariant; /* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(28)); /***/}, /* 80 */ /***/function(module,exports){ /**
		 * lodash 3.0.2 (Custom Build) <https://lodash.com/>
		 * Build: `lodash modern modularize exports="npm" -o ./`
		 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
		 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
		 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
		 * Available under MIT license <https://lodash.com/license>
		 */ /**
		 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
		 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
		 *
		 * @static
		 * @memberOf _
		 * @category Lang
		 * @param {*} value The value to check.
		 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
		 * @example
		 *
		 * _.isObject({});
		 * // => true
		 *
		 * _.isObject([1, 2, 3]);
		 * // => true
		 *
		 * _.isObject(1);
		 * // => false
		 */function isObject(value){ // Avoid a V8 JIT bug in Chrome 19-20.
	// See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	var type=typeof value==='undefined'?'undefined':_typeof2(value);return !!value&&(type=='object'||type=='function');}module.exports=isObject; /***/}, /* 81 */ /***/function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _react=__webpack_require__(2);var _react2=_interopRequireDefault(_react);var _classnames=__webpack_require__(82);var _classnames2=_interopRequireDefault(_classnames);var _objectAssign=__webpack_require__(42);var _objectAssign2=_interopRequireDefault(_objectAssign);var _monitor=__webpack_require__(44);var _monitor2=_interopRequireDefault(_monitor);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}function _objectWithoutProperties(obj,keys){var target={};for(var i in obj){if(keys.indexOf(i)>=0)continue;if(!Object.prototype.hasOwnProperty.call(obj,i))continue;target[i]=obj[i];}return target;}var PropTypes=_react2['default'].PropTypes;var MenuItem=_react2['default'].createClass({displayName:"MenuItem",propTypes:{onClick:PropTypes.func.isRequired,data:PropTypes.object,disabled:PropTypes.bool,preventClose:PropTypes.bool},getDefaultProps:function getDefaultProps(){return {disabled:false,data:{},attributes:{}};},handleClick:function handleClick(event){var _props=this.props;var disabled=_props.disabled;var onClick=_props.onClick;var data=_props.data;var preventClose=_props.preventClose;event.preventDefault();if(disabled)return;(0,_objectAssign2['default'])(data,_monitor2['default'].getItem());if(typeof onClick==="function"){onClick(event,data);}if(preventClose)return;_monitor2['default'].hideMenu();},render:function render(){var _props2=this.props;var disabled=_props2.disabled;var children=_props2.children;var _props2$attributes=_props2.attributes;var _props2$attributes$cl=_props2$attributes.className;var className=_props2$attributes$cl===undefined?"":_props2$attributes$cl;var props=_objectWithoutProperties(_props2$attributes,["className"]);var menuItemClassNames="react-context-menu-item "+className;var classes=(0,_classnames2['default'])({"react-context-menu-link":true,disabled:disabled});return _react2['default'].createElement("div",_extends({className:menuItemClassNames},props),_react2['default'].createElement("a",{href:"#",className:classes,onClick:this.handleClick},children));}});exports['default']=MenuItem; /***/}, /* 82 */ /***/function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__; /*!
		  Copyright (c) 2016 Jed Watson.
		  Licensed under the MIT License (MIT), see
		  http://jedwatson.github.io/classnames
		*/ /* global define */(function(){'use strict';var hasOwn={}.hasOwnProperty;function classNames(){var classes=[];for(var i=0;i<arguments.length;i++){var arg=arguments[i];if(!arg)continue;var argType=typeof arg==='undefined'?'undefined':_typeof2(arg);if(argType==='string'||argType==='number'){classes.push(arg);}else if(Array.isArray(arg)){classes.push(classNames.apply(null,arg));}else if(argType==='object'){for(var key in arg){if(hasOwn.call(arg,key)&&arg[key]){classes.push(key);}}}}return classes.join(' ');}if(typeof module!=='undefined'&&module.exports){module.exports=classNames;}else if(true){ // register as 'classnames', consistent with npm package name
	!(__WEBPACK_AMD_DEFINE_ARRAY__=[],__WEBPACK_AMD_DEFINE_RESULT__=function(){return classNames;}.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__),__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else {window.classNames=classNames;}})(); /***/}, /* 83 */ /***/function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _react=__webpack_require__(2);var _react2=_interopRequireDefault(_react);var _classnames=__webpack_require__(82);var _classnames2=_interopRequireDefault(_classnames);var _wrapper=__webpack_require__(84);var _wrapper2=_interopRequireDefault(_wrapper);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var menuStyles={position:"relative",zIndex:"auto"};var SubMenu=_react2['default'].createClass({displayName:"SubMenu",propTypes:{title:_react2['default'].PropTypes.string.isRequired,disabled:_react2['default'].PropTypes.bool,hoverDelay:_react2['default'].PropTypes.number},getDefaultProps:function getDefaultProps(){return {hoverDelay:500};},getInitialState:function getInitialState(){return {visible:false};},shouldComponentUpdate:function shouldComponentUpdate(nextProps,nextState){return this.state.isVisible!==nextState.visible;},handleClick:function handleClick(e){e.preventDefault();},handleMouseEnter:function handleMouseEnter(){var _this=this;if(this.closetimer)clearTimeout(this.closetimer);if(this.props.disabled||this.state.visible)return;this.opentimer=setTimeout(function(){return _this.setState({visible:true});},this.props.hoverDelay);},handleMouseLeave:function handleMouseLeave(){var _this2=this;if(this.opentimer)clearTimeout(this.opentimer);if(!this.state.visible)return;this.closetimer=setTimeout(function(){return _this2.setState({visible:false});},this.props.hoverDelay);},render:function render(){var _this3=this;var _props=this.props;var disabled=_props.disabled;var children=_props.children;var title=_props.title;var visible=this.state.visible;var classes=(0,_classnames2['default'])({"react-context-menu-link":true,disabled:disabled,active:visible}),menuClasses="react-context-menu-item submenu";return _react2['default'].createElement("div",{ref:function ref(c){return _this3.item=c;},className:menuClasses,style:menuStyles,onMouseEnter:this.handleMouseEnter,onMouseLeave:this.handleMouseLeave},_react2['default'].createElement("a",{href:"#",className:classes,onClick:this.handleClick},title),_react2['default'].createElement(_wrapper2['default'],{visible:visible},children));}});exports['default']=SubMenu; /***/}, /* 84 */ /***/function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _react=__webpack_require__(2);var _react2=_interopRequireDefault(_react);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var SubMenuWrapper=_react2['default'].createClass({displayName:"SubMenuWrapper",propTypes:{visible:_react2['default'].PropTypes.bool},getInitialState:function getInitialState(){return {position:{top:true,right:true}};},componentWillReceiveProps:function componentWillReceiveProps(nextProps){var _this=this;if(nextProps.visible){var wrapper=window.requestAnimationFrame||setTimeout;wrapper(function(){_this.setState(_this.getMenuPosition());_this.forceUpdate();});}else {this.setState(this.getInitialState());}},shouldComponentUpdate:function shouldComponentUpdate(nextProps){return this.props.visible!==nextProps.visible;},getMenuPosition:function getMenuPosition(){var _window=window;var innerWidth=_window.innerWidth;var innerHeight=_window.innerHeight;var rect=this.menu.getBoundingClientRect();var position={};if(rect.bottom>innerHeight){position.bottom=true;}else {position.top=true;}if(rect.right>innerWidth){position.left=true;}else {position.right=true;}return {position:position};},getPositionStyles:function getPositionStyles(){var style={};var position=this.state.position;if(position.top)style.top=0;if(position.bottom)style.bottom=0;if(position.right)style.left="100%";if(position.left)style.right="100%";return style;},render:function render(){var _this2=this;var _props=this.props;var children=_props.children;var visible=_props.visible;var style=_extends({display:visible?"block":"none",position:"absolute"},this.getPositionStyles());return _react2['default'].createElement("nav",{ref:function ref(c){return _this2.menu=c;},style:style,className:"react-context-menu"},children);}});exports['default']=SubMenuWrapper; /***/}, /* 85 */ /***/function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};exports['default']=function(Component){var displayName=Component.displayName||Component.name||"Component";return _react2['default'].createClass({displayName:"ContextMenuConnector("+displayName+")",getInitialState:function getInitialState(){return {item:_store2['default'].getState().currentItem};},componentDidMount:function componentDidMount(){this.unsubscribe=_store2['default'].subscribe(this.handleUpdate);},componentWillUnmount:function componentWillUnmount(){this.unsubscribe();},handleUpdate:function handleUpdate(){this.setState(this.getInitialState());},render:function render(){return _react2['default'].createElement(Component,_extends({},this.props,{item:this.state.item}));}});};var _react=__webpack_require__(2);var _react2=_interopRequireDefault(_react);var _store=__webpack_require__(26);var _store2=_interopRequireDefault(_store);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};} /***/}, /* 86 */ /***/function(module,exports,__webpack_require__){'use strict';var _reactDom=__webpack_require__(3);var _reactDom2=_interopRequireDefault(_reactDom);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var ScrollShim={appendScrollShim:function appendScrollShim(){if(!this._scrollShim){var size=this._scrollShimSize();var shim=document.createElement('div');if(shim.classList){shim.classList.add('react-grid-ScrollShim'); // flow - not compatible with HTMLElement
	}else {shim.className+=' react-grid-ScrollShim';}shim.style.position='absolute';shim.style.top=0;shim.style.left=0;shim.style.width=size.width+'px';shim.style.height=size.height+'px';_reactDom2['default'].findDOMNode(this).appendChild(shim);this._scrollShim=shim;}this._scheduleRemoveScrollShim();},_scrollShimSize:function _scrollShimSize(){return {width:this.props.width,height:this.props.length*this.props.rowHeight};},_scheduleRemoveScrollShim:function _scheduleRemoveScrollShim(){if(this._scheduleRemoveScrollShimTimer){clearTimeout(this._scheduleRemoveScrollShimTimer);}this._scheduleRemoveScrollShimTimer=setTimeout(this._removeScrollShim,200);},_removeScrollShim:function _removeScrollShim(){if(this._scrollShim){this._scrollShim.parentNode.removeChild(this._scrollShim);this._scrollShim=undefined;}}};module.exports=ScrollShim; /***/}, /* 87 */ /***/function(module,exports,__webpack_require__){'use strict';var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var React=__webpack_require__(2);var joinClasses=__webpack_require__(6);var Cell=__webpack_require__(88);var ColumnMetrics=__webpack_require__(8);var ColumnUtilsMixin=__webpack_require__(10);var cellMetaDataShape=__webpack_require__(94);var PropTypes=React.PropTypes;var Row=React.createClass({displayName:'Row',propTypes:{height:PropTypes.number.isRequired,columns:PropTypes.oneOfType([PropTypes.object,PropTypes.array]).isRequired,row:PropTypes.any.isRequired,cellRenderer:PropTypes.func,cellMetaData:PropTypes.shape(cellMetaDataShape),isSelected:PropTypes.bool,idx:PropTypes.number.isRequired,key:PropTypes.string,expandedRows:PropTypes.arrayOf(PropTypes.object),extraClasses:PropTypes.string,forceUpdate:PropTypes.bool},mixins:[ColumnUtilsMixin],getDefaultProps:function getDefaultProps(){return {cellRenderer:Cell,isSelected:false,height:35};},shouldComponentUpdate:function shouldComponentUpdate(nextProps){return !ColumnMetrics.sameColumns(this.props.columns,nextProps.columns,ColumnMetrics.sameColumn)||this.doesRowContainSelectedCell(this.props)||this.doesRowContainSelectedCell(nextProps)||this.willRowBeDraggedOver(nextProps)||nextProps.row!==this.props.row||this.hasRowBeenCopied()||this.props.isSelected!==nextProps.isSelected||nextProps.height!==this.props.height||this.props.forceUpdate===true;},handleDragEnter:function handleDragEnter(){var handleDragEnterRow=this.props.cellMetaData.handleDragEnterRow;if(handleDragEnterRow){handleDragEnterRow(this.props.idx);}},getSelectedColumn:function getSelectedColumn(){if(this.props.cellMetaData){var selected=this.props.cellMetaData.selected;if(selected&&selected.idx){return this.getColumn(this.props.columns,selected.idx);}}},getCells:function getCells(){var _this=this;var cells=[];var lockedCells=[];var selectedColumn=this.getSelectedColumn();if(this.props.columns){this.props.columns.forEach(function(column,i){var CellRenderer=_this.props.cellRenderer;var cell=React.createElement(CellRenderer,{ref:i,key:column.key+'-'+i,idx:i,rowIdx:_this.props.idx,value:_this.getCellValue(column.key||i),column:column,height:_this.getRowHeight(),formatter:column.formatter,cellMetaData:_this.props.cellMetaData,rowData:_this.props.row,selectedColumn:selectedColumn,isRowSelected:_this.props.isSelected});if(column.locked){lockedCells.push(cell);}else {cells.push(cell);}});}return cells.concat(lockedCells);},getRowHeight:function getRowHeight(){var rows=this.props.expandedRows||null;if(rows&&this.props.key){var row=rows[this.props.key]||null;if(row){return row.height;}}return this.props.height;},getCellValue:function getCellValue(key){var val=void 0;if(key==='select-row'){return this.props.isSelected;}else if(typeof this.props.row.get==='function'){val=this.props.row.get(key);}else {val=this.props.row[key];}return val;},setScrollLeft:function setScrollLeft(scrollLeft){var _this2=this;this.props.columns.forEach(function(column,i){if(column.locked){if(!_this2.refs[i])return;_this2.refs[i].setScrollLeft(scrollLeft);}});},doesRowContainSelectedCell:function doesRowContainSelectedCell(props){var selected=props.cellMetaData.selected;if(selected&&selected.rowIdx===props.idx){return true;}return false;},isContextMenuDisplayed:function isContextMenuDisplayed(){if(this.props.cellMetaData){var selected=this.props.cellMetaData.selected;if(selected&&selected.contextMenuDisplayed&&selected.rowIdx===this.props.idx){return true;}}return false;},willRowBeDraggedOver:function willRowBeDraggedOver(props){var dragged=props.cellMetaData.dragged;return dragged!=null&&(dragged.rowIdx>=0||dragged.complete===true);},hasRowBeenCopied:function hasRowBeenCopied(){var copied=this.props.cellMetaData.copied;return copied!=null&&copied.rowIdx===this.props.idx;},renderCell:function renderCell(props){if(typeof this.props.cellRenderer==='function'){this.props.cellRenderer.call(this,props);}if(React.isValidElement(this.props.cellRenderer)){return React.cloneElement(this.props.cellRenderer,props);}return this.props.cellRenderer(props);},render:function render(){var className=joinClasses('react-grid-Row','react-grid-Row--'+(this.props.idx%2===0?'even':'odd'),{'row-selected':this.props.isSelected,'row-context-menu':this.isContextMenuDisplayed()},this.props.extraClasses);var style={height:this.getRowHeight(this.props),overflow:'hidden'};var cells=this.getCells();return React.createElement('div',_extends({},this.props,{className:className,style:style,onDragEnter:this.handleDragEnter}),React.isValidElement(this.props.row)?this.props.row:cells);}});module.exports=Row; /***/}, /* 88 */ /***/function(module,exports,__webpack_require__){'use strict';var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var React=__webpack_require__(2);var ReactDOM=__webpack_require__(3);var joinClasses=__webpack_require__(6);var EditorContainer=__webpack_require__(89);var ExcelColumn=__webpack_require__(15);var isFunction=__webpack_require__(93);var CellMetaDataShape=__webpack_require__(94);var SimpleCellFormatter=__webpack_require__(95);var ColumnUtils=__webpack_require__(10);var Cell=React.createClass({displayName:'Cell',propTypes:{rowIdx:React.PropTypes.number.isRequired,idx:React.PropTypes.number.isRequired,selected:React.PropTypes.shape({idx:React.PropTypes.number.isRequired}),selectedColumn:React.PropTypes.object,height:React.PropTypes.number,tabIndex:React.PropTypes.number,ref:React.PropTypes.string,column:React.PropTypes.shape(ExcelColumn).isRequired,value:React.PropTypes.oneOfType([React.PropTypes.string,React.PropTypes.number,React.PropTypes.object,React.PropTypes.bool]).isRequired,isExpanded:React.PropTypes.bool,isRowSelected:React.PropTypes.bool,cellMetaData:React.PropTypes.shape(CellMetaDataShape).isRequired,handleDragStart:React.PropTypes.func,className:React.PropTypes.string,cellControls:React.PropTypes.any,rowData:React.PropTypes.object.isRequired,forceUpdate:React.PropTypes.bool},getDefaultProps:function getDefaultProps(){return {tabIndex:-1,ref:'cell',isExpanded:false};},getInitialState:function getInitialState(){return {isCellValueChanging:false,oldRowData:{},newRowData:{}};},componentDidMount:function componentDidMount(){this.checkFocus();},componentWillReceiveProps:function componentWillReceiveProps(nextProps){this.setState({isCellValueChanging:this.props.value!==nextProps.value,oldRowData:this.props.rowData,newRowData:nextProps.rowData});},componentDidUpdate:function componentDidUpdate(){this.checkFocus();var dragged=this.props.cellMetaData.dragged;if(dragged&&dragged.complete===true){this.props.cellMetaData.handleTerminateDrag();}if(this.state.isCellValueChanging&&this.props.selectedColumn!=null){this.applyUpdateClass();}},shouldComponentUpdate:function shouldComponentUpdate(nextProps){return this.props.column.width!==nextProps.column.width||this.props.column.left!==nextProps.column.left||this.props.height!==nextProps.height||this.props.rowIdx!==nextProps.rowIdx||this.isCellSelectionChanging(nextProps)||this.isDraggedCellChanging(nextProps)||this.isCopyCellChanging(nextProps)||this.props.isRowSelected!==nextProps.isRowSelected||this.isSelected()||this.props.value!==nextProps.value||this.props.forceUpdate===true;},onCellClick:function onCellClick(e){var meta=this.props.cellMetaData;if(meta!=null&&meta.onCellClick&&typeof meta.onCellClick==='function'){meta.onCellClick({rowIdx:this.props.rowIdx,idx:this.props.idx},e);}},onCellContextMenu:function onCellContextMenu(){var meta=this.props.cellMetaData;if(meta!=null&&meta.onCellContextMenu&&typeof meta.onCellContextMenu==='function'){meta.onCellContextMenu({rowIdx:this.props.rowIdx,idx:this.props.idx});}},onCellDoubleClick:function onCellDoubleClick(e){var meta=this.props.cellMetaData;if(meta!=null&&meta.onCellDoubleClick&&typeof meta.onCellDoubleClick==='function'){meta.onCellDoubleClick({rowIdx:this.props.rowIdx,idx:this.props.idx},e);}},onDragHandleDoubleClick:function onDragHandleDoubleClick(e){e.stopPropagation();var meta=this.props.cellMetaData;if(meta!=null&&meta.onDragHandleDoubleClick&&typeof meta.onDragHandleDoubleClick==='function'){meta.onDragHandleDoubleClick({rowIdx:this.props.rowIdx,idx:this.props.idx,rowData:this.getRowData(),e:e});}},onDragOver:function onDragOver(e){e.preventDefault();},getStyle:function getStyle(){var style={position:'absolute',width:this.props.column.width,height:this.props.height,left:this.props.column.left};return style;},getFormatter:function getFormatter(){var col=this.props.column;if(this.isActive()){return React.createElement(EditorContainer,{rowData:this.getRowData(),rowIdx:this.props.rowIdx,idx:this.props.idx,cellMetaData:this.props.cellMetaData,column:col,height:this.props.height});}return this.props.column.formatter;},getRowData:function getRowData(){return this.props.rowData.toJSON?this.props.rowData.toJSON():this.props.rowData;},getFormatterDependencies:function getFormatterDependencies(){ // convention based method to get corresponding Id or Name of any Name or Id property
	if(typeof this.props.column.getRowMetaData==='function'){return this.props.column.getRowMetaData(this.getRowData(),this.props.column);}},getCellClass:function getCellClass(){var className=joinClasses(this.props.column.cellClass,'react-grid-Cell',this.props.className,this.props.column.locked?'react-grid-Cell--locked':null);var extraClasses=joinClasses({'row-selected':this.props.isRowSelected,selected:this.isSelected()&&!this.isActive()&&this.isCellSelectEnabled(),editing:this.isActive(),copied:this.isCopied()||this.wasDraggedOver()||this.isDraggedOverUpwards()||this.isDraggedOverDownwards(),'active-drag-cell':this.isSelected()||this.isDraggedOver(),'is-dragged-over-up':this.isDraggedOverUpwards(),'is-dragged-over-down':this.isDraggedOverDownwards(),'was-dragged-over':this.wasDraggedOver()});return joinClasses(className,extraClasses);},getUpdateCellClass:function getUpdateCellClass(){return this.props.column.getUpdateCellClass?this.props.column.getUpdateCellClass(this.props.selectedColumn,this.props.column,this.state.isCellValueChanging,this.state.oldRowData,this.state.newRowData):'';},isColumnSelected:function isColumnSelected(){var meta=this.props.cellMetaData;if(meta==null){return false;}return meta.selected&&meta.selected.idx===this.props.idx;},isSelected:function isSelected(){var meta=this.props.cellMetaData;if(meta==null){return false;}return meta.selected&&meta.selected.rowIdx===this.props.rowIdx&&meta.selected.idx===this.props.idx;},isActive:function isActive(){var meta=this.props.cellMetaData;if(meta==null){return false;}return this.isSelected()&&meta.selected.active===true;},isCellSelectionChanging:function isCellSelectionChanging(nextProps){var meta=this.props.cellMetaData;if(meta==null){return false;}var nextSelected=nextProps.cellMetaData.selected;if(meta.selected&&nextSelected){return this.props.idx===nextSelected.idx||this.props.idx===meta.selected.idx;}return true;},isCellSelectEnabled:function isCellSelectEnabled(){var meta=this.props.cellMetaData;if(meta==null){return false;}return meta.enableCellSelect;},applyUpdateClass:function applyUpdateClass(){var updateCellClass=this.getUpdateCellClass(); // -> removing the class
	if(updateCellClass!=null&&updateCellClass!==''){var cellDOMNode=ReactDOM.findDOMNode(this);if(cellDOMNode.classList){cellDOMNode.classList.remove(updateCellClass); // -> and re-adding the class
	cellDOMNode.classList.add(updateCellClass);}else if(cellDOMNode.className.indexOf(updateCellClass)===-1){ // IE9 doesn't support classList, nor (I think) altering element.className
	// without replacing it wholesale.
	cellDOMNode.className=cellDOMNode.className+' '+updateCellClass;}}},setScrollLeft:function setScrollLeft(scrollLeft){var ctrl=this; // flow on windows has an outdated react declaration, once that gets updated, we can remove this
	if(ctrl.isMounted()){var node=ReactDOM.findDOMNode(this);var transform='translate3d('+scrollLeft+'px, 0px, 0px)';node.style.webkitTransform=transform;node.style.transform=transform;}},isCopied:function isCopied(){var copied=this.props.cellMetaData.copied;return copied&&copied.rowIdx===this.props.rowIdx&&copied.idx===this.props.idx;},isDraggedOver:function isDraggedOver(){var dragged=this.props.cellMetaData.dragged;return dragged&&dragged.overRowIdx===this.props.rowIdx&&dragged.idx===this.props.idx;},wasDraggedOver:function wasDraggedOver(){var dragged=this.props.cellMetaData.dragged;return dragged&&(dragged.overRowIdx<this.props.rowIdx&&this.props.rowIdx<dragged.rowIdx||dragged.overRowIdx>this.props.rowIdx&&this.props.rowIdx>dragged.rowIdx)&&dragged.idx===this.props.idx;},isDraggedCellChanging:function isDraggedCellChanging(nextProps){var isChanging=void 0;var dragged=this.props.cellMetaData.dragged;var nextDragged=nextProps.cellMetaData.dragged;if(dragged){isChanging=nextDragged&&this.props.idx===nextDragged.idx||dragged&&this.props.idx===dragged.idx;return isChanging;}return false;},isCopyCellChanging:function isCopyCellChanging(nextProps){var isChanging=void 0;var copied=this.props.cellMetaData.copied;var nextCopied=nextProps.cellMetaData.copied;if(copied){isChanging=nextCopied&&this.props.idx===nextCopied.idx||copied&&this.props.idx===copied.idx;return isChanging;}return false;},isDraggedOverUpwards:function isDraggedOverUpwards(){var dragged=this.props.cellMetaData.dragged;return !this.isSelected()&&this.isDraggedOver()&&this.props.rowIdx<dragged.rowIdx;},isDraggedOverDownwards:function isDraggedOverDownwards(){var dragged=this.props.cellMetaData.dragged;return !this.isSelected()&&this.isDraggedOver()&&this.props.rowIdx>dragged.rowIdx;},checkFocus:function checkFocus(){if(this.isSelected()&&!this.isActive()){ // determine the parent viewport element of this cell
	var parentViewport=ReactDOM.findDOMNode(this);while(parentViewport!=null&&parentViewport.className.indexOf('react-grid-Viewport')===-1){parentViewport=parentViewport.parentElement;}var focusInGrid=false; // if the focus is on the body of the document, the user won't mind if we focus them on a cell
	if(document.activeElement==null||document.activeElement.nodeName&&typeof document.activeElement.nodeName==='string'&&document.activeElement.nodeName.toLowerCase()==='body'){focusInGrid=true; // otherwise
	}else { // only pull focus if the currently focused element is contained within the viewport
	if(parentViewport){var focusedParent=document.activeElement;while(focusedParent!=null){if(focusedParent===parentViewport){focusInGrid=true;break;}focusedParent=focusedParent.parentElement;}}}if(focusInGrid){ReactDOM.findDOMNode(this).focus();}}},createColumEventCallBack:function createColumEventCallBack(onColumnEvent,info){return function(e){onColumnEvent(e,info);};},createCellEventCallBack:function createCellEventCallBack(gridEvent,columnEvent){return function(e){gridEvent(e);columnEvent(e);};},createEventDTO:function createEventDTO(gridEvents,columnEvents,onColumnEvent){var allEvents=Object.assign({},gridEvents);for(var eventKey in columnEvents){if(columnEvents.hasOwnProperty(eventKey)){var event=columnEvents[event];var eventInfo={rowIdx:this.props.rowIdx,idx:this.props.idx,name:eventKey};var eventCallback=this.createColumEventCallBack(onColumnEvent,eventInfo);if(allEvents.hasOwnProperty(eventKey)){var currentEvent=allEvents[eventKey];allEvents[eventKey]=this.createCellEventCallBack(currentEvent,eventCallback);}else {allEvents[eventKey]=eventCallback;}}}return allEvents;},getEvents:function getEvents(){var columnEvents=this.props.column?Object.assign({},this.props.column.events):undefined;var onColumnEvent=this.props.cellMetaData?this.props.cellMetaData.onColumnEvent:undefined;var gridEvents={onClick:this.onCellClick,onDoubleClick:this.onCellDoubleClick,onDragOver:this.onDragOver};if(!columnEvents||!onColumnEvent){return gridEvents;}return this.createEventDTO(gridEvents,columnEvents,onColumnEvent);},renderCellContent:function renderCellContent(props){var CellContent=void 0;var Formatter=this.getFormatter();if(React.isValidElement(Formatter)){props.dependentValues=this.getFormatterDependencies();CellContent=React.cloneElement(Formatter,props);}else if(isFunction(Formatter)){CellContent=React.createElement(Formatter,{value:this.props.value,dependentValues:this.getFormatterDependencies()});}else {CellContent=React.createElement(SimpleCellFormatter,{value:this.props.value});}return React.createElement('div',{ref:'cell',className:'react-grid-Cell__value'},CellContent,' ',this.props.cellControls);},render:function render(){var style=this.getStyle();var className=this.getCellClass();var cellContent=this.renderCellContent({value:this.props.value,column:this.props.column,rowIdx:this.props.rowIdx,isExpanded:this.props.isExpanded});var dragHandle=!this.isActive()&&ColumnUtils.canEdit(this.props.column,this.props.rowData,this.props.cellMetaData.enableCellSelect)?React.createElement('div',{className:'drag-handle',draggable:'true',onDoubleClick:this.onDragHandleDoubleClick},React.createElement('span',{style:{display:'none'}})):null;var events=this.getEvents();return React.createElement('div',_extends({},this.props,{className:className,style:style,onContextMenu:this.onCellContextMenu},events),cellContent,dragHandle);}});module.exports=Cell; /***/}, /* 89 */ /***/function(module,exports,__webpack_require__){'use strict';var React=__webpack_require__(2);var joinClasses=__webpack_require__(6);var keyboardHandlerMixin=__webpack_require__(90);var SimpleTextEditor=__webpack_require__(91);var isFunction=__webpack_require__(93);var EditorContainer=React.createClass({displayName:'EditorContainer',mixins:[keyboardHandlerMixin],propTypes:{rowIdx:React.PropTypes.number,rowData:React.PropTypes.object.isRequired,value:React.PropTypes.oneOfType([React.PropTypes.string,React.PropTypes.number,React.PropTypes.object,React.PropTypes.bool]).isRequired,cellMetaData:React.PropTypes.shape({selected:React.PropTypes.object.isRequired,copied:React.PropTypes.object,dragged:React.PropTypes.object,onCellClick:React.PropTypes.func,onCellDoubleClick:React.PropTypes.func,onCommitCancel:React.PropTypes.func,onCommit:React.PropTypes.func}).isRequired,column:React.PropTypes.object.isRequired,height:React.PropTypes.number.isRequired},changeCommitted:false,getInitialState:function getInitialState(){return {isInvalid:false};},componentDidMount:function componentDidMount(){var inputNode=this.getInputNode();if(inputNode!==undefined){this.setTextInputFocus();if(!this.getEditor().disableContainerStyles){inputNode.className+=' editor-main';inputNode.style.height=this.props.height-1+'px';}}},componentWillUnmount:function componentWillUnmount(){if(!this.changeCommitted&&!this.hasEscapeBeenPressed()){this.commit({key:'Enter'});}},createEditor:function createEditor(){var _this=this;var editorRef=function editorRef(c){return _this.editor=c;};var editorProps={ref:editorRef,column:this.props.column,value:this.getInitialValue(),onCommit:this.commit,rowMetaData:this.getRowMetaData(),height:this.props.height,onBlur:this.commit,onOverrideKeyDown:this.onKeyDown};var customEditor=this.props.column.editor;if(customEditor&&React.isValidElement(customEditor)){ // return custom column editor or SimpleEditor if none specified
	return React.cloneElement(customEditor,editorProps);}return React.createElement(SimpleTextEditor,{ref:editorRef,column:this.props.column,value:this.getInitialValue(),onBlur:this.commit,rowMetaData:this.getRowMetaData(),onKeyDown:function onKeyDown(){},commit:function commit(){}});},onPressEnter:function onPressEnter(){this.commit({key:'Enter'});},onPressTab:function onPressTab(){this.commit({key:'Tab'});},onPressEscape:function onPressEscape(e){if(!this.editorIsSelectOpen()){this.props.cellMetaData.onCommitCancel();}else { // prevent event from bubbling if editor has results to select
	e.stopPropagation();}},onPressArrowDown:function onPressArrowDown(e){if(this.editorHasResults()){ // dont want to propogate as that then moves us round the grid
	e.stopPropagation();}else {this.commit(e);}},onPressArrowUp:function onPressArrowUp(e){if(this.editorHasResults()){ // dont want to propogate as that then moves us round the grid
	e.stopPropagation();}else {this.commit(e);}},onPressArrowLeft:function onPressArrowLeft(e){ // prevent event propogation. this disables left cell navigation
	if(!this.isCaretAtBeginningOfInput()){e.stopPropagation();}else {this.commit(e);}},onPressArrowRight:function onPressArrowRight(e){ // prevent event propogation. this disables right cell navigation
	if(!this.isCaretAtEndOfInput()){e.stopPropagation();}else {this.commit(e);}},editorHasResults:function editorHasResults(){if(isFunction(this.getEditor().hasResults)){return this.getEditor().hasResults();}return false;},editorIsSelectOpen:function editorIsSelectOpen(){if(isFunction(this.getEditor().isSelectOpen)){return this.getEditor().isSelectOpen();}return false;},getRowMetaData:function getRowMetaData(){ // clone row data so editor cannot actually change this
	// convention based method to get corresponding Id or Name of any Name or Id property
	if(typeof this.props.column.getRowMetaData==='function'){return this.props.column.getRowMetaData(this.props.rowData,this.props.column);}},getEditor:function getEditor(){return this.editor;},getInputNode:function getInputNode(){return this.getEditor().getInputNode();},getInitialValue:function getInitialValue(){var selected=this.props.cellMetaData.selected;var keyCode=selected.initialKeyCode;if(keyCode==='Delete'||keyCode==='Backspace'){return '';}else if(keyCode==='Enter'){return this.props.value;}var text=keyCode?String.fromCharCode(keyCode):this.props.value;return text;},getContainerClass:function getContainerClass(){return joinClasses({'has-error':this.state.isInvalid===true});},commit:function commit(args){var opts=args||{};var updated=this.getEditor().getValue();if(this.isNewValueValid(updated)){this.changeCommitted=true;var cellKey=this.props.column.key;this.props.cellMetaData.onCommit({cellKey:cellKey,rowIdx:this.props.rowIdx,updated:updated,key:opts.key});}},isNewValueValid:function isNewValueValid(value){if(isFunction(this.getEditor().validate)){var isValid=this.getEditor().validate(value);this.setState({isInvalid:!isValid});return isValid;}return true;},setCaretAtEndOfInput:function setCaretAtEndOfInput(){var input=this.getInputNode(); // taken from http://stackoverflow.com/questions/511088/use-javascript-to-place-cursor-at-end-of-text-in-text-input-element
	var txtLength=input.value.length;if(input.setSelectionRange){input.setSelectionRange(txtLength,txtLength);}else if(input.createTextRange){var fieldRange=input.createTextRange();fieldRange.moveStart('character',txtLength);fieldRange.collapse();fieldRange.select();}},isCaretAtBeginningOfInput:function isCaretAtBeginningOfInput(){var inputNode=this.getInputNode();return inputNode.selectionStart===inputNode.selectionEnd&&inputNode.selectionStart===0;},isCaretAtEndOfInput:function isCaretAtEndOfInput(){var inputNode=this.getInputNode();return inputNode.selectionStart===inputNode.value.length;},setTextInputFocus:function setTextInputFocus(){var selected=this.props.cellMetaData.selected;var keyCode=selected.initialKeyCode;var inputNode=this.getInputNode();inputNode.focus();if(inputNode.tagName==='INPUT'){if(!this.isKeyPrintable(keyCode)){inputNode.focus();inputNode.select();}else {inputNode.select();}}},hasEscapeBeenPressed:function hasEscapeBeenPressed(){var pressed=false;var escapeKey=27;if(window.event){if(window.event.keyCode===escapeKey){pressed=true;}else if(window.event.which===escapeKey){pressed=true;}}return pressed;},renderStatusIcon:function renderStatusIcon(){if(this.state.isInvalid===true){return React.createElement('span',{className:'glyphicon glyphicon-remove form-control-feedback'});}},render:function render(){return React.createElement('div',{className:this.getContainerClass(),onKeyDown:this.onKeyDown,commit:this.commit},this.createEditor(),this.renderStatusIcon());}});module.exports=EditorContainer; /***/}, /* 90 */ /***/function(module,exports){'use strict';var KeyboardHandlerMixin={onKeyDown:function onKeyDown(e){if(this.isCtrlKeyHeldDown(e)){this.checkAndCall('onPressKeyWithCtrl',e);}else if(this.isKeyExplicitlyHandled(e.key)){ // break up individual keyPress events to have their own specific callbacks
	// this allows multiple mixins to listen to onKeyDown events and somewhat reduces methodName clashing
	var callBack='onPress'+e.key;this.checkAndCall(callBack,e);}else if(this.isKeyPrintable(e.keyCode)){this.checkAndCall('onPressChar',e);}}, // taken from http://stackoverflow.com/questions/12467240/determine-if-javascript-e-keycode-is-a-printable-non-control-character
	isKeyPrintable:function isKeyPrintable(keycode){var valid=keycode>47&&keycode<58|| // number keys
	keycode===32||keycode===13|| // spacebar & return key(s) (if you want to allow carriage returns)
	keycode>64&&keycode<91|| // letter keys
	keycode>95&&keycode<112|| // numpad keys
	keycode>185&&keycode<193|| // ;=,-./` (in order)
	keycode>218&&keycode<223; // [\]' (in order)
	return valid;},isKeyExplicitlyHandled:function isKeyExplicitlyHandled(key){return typeof this['onPress'+key]==='function';},isCtrlKeyHeldDown:function isCtrlKeyHeldDown(e){return e.ctrlKey===true&&e.key!=='Control';},checkAndCall:function checkAndCall(methodName,args){if(typeof this[methodName]==='function'){this[methodName](args);}}};module.exports=KeyboardHandlerMixin; /***/}, /* 91 */ /***/function(module,exports,__webpack_require__){'use strict';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==='undefined'?'undefined':_typeof2(call))==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+(typeof superClass==='undefined'?'undefined':_typeof2(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var React=__webpack_require__(2);var EditorBase=__webpack_require__(92);var SimpleTextEditor=function(_EditorBase){_inherits(SimpleTextEditor,_EditorBase);function SimpleTextEditor(){_classCallCheck(this,SimpleTextEditor);return _possibleConstructorReturn(this,Object.getPrototypeOf(SimpleTextEditor).apply(this,arguments));}_createClass(SimpleTextEditor,[{key:'render',value:function render(){return React.createElement('input',{ref:'input',type:'text',onBlur:this.props.onBlur,className:'form-control',defaultValue:this.props.value});}}]);return SimpleTextEditor;}(EditorBase);module.exports=SimpleTextEditor; /***/}, /* 92 */ /***/function(module,exports,__webpack_require__){'use strict';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==='undefined'?'undefined':_typeof2(call))==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+(typeof superClass==='undefined'?'undefined':_typeof2(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var React=__webpack_require__(2);var ReactDOM=__webpack_require__(3);var ExcelColumn=__webpack_require__(15);var EditorBase=function(_React$Component){_inherits(EditorBase,_React$Component);function EditorBase(){_classCallCheck(this,EditorBase);return _possibleConstructorReturn(this,Object.getPrototypeOf(EditorBase).apply(this,arguments));}_createClass(EditorBase,[{key:'getStyle',value:function getStyle(){return {width:'100%'};}},{key:'getValue',value:function getValue(){var updated={};updated[this.props.column.key]=this.getInputNode().value;return updated;}},{key:'getInputNode',value:function getInputNode(){var domNode=ReactDOM.findDOMNode(this);if(domNode.tagName==='INPUT'){return domNode;}return domNode.querySelector('input:not([type=hidden])');}},{key:'inheritContainerStyles',value:function inheritContainerStyles(){return true;}}]);return EditorBase;}(React.Component);EditorBase.propTypes={onKeyDown:React.PropTypes.func.isRequired,value:React.PropTypes.any.isRequired,onBlur:React.PropTypes.func.isRequired,column:React.PropTypes.shape(ExcelColumn).isRequired,commit:React.PropTypes.func.isRequired};module.exports=EditorBase; /***/}, /* 93 */ /***/function(module,exports){'use strict';var isFunction=function isFunction(functionToCheck){var getType={};return functionToCheck&&getType.toString.call(functionToCheck)==='[object Function]';};module.exports=isFunction; /***/}, /* 94 */ /***/function(module,exports,__webpack_require__){'use strict';var PropTypes=__webpack_require__(2).PropTypes;module.exports={selected:PropTypes.object.isRequired,copied:PropTypes.object,dragged:PropTypes.object,onCellClick:PropTypes.func.isRequired,onCellDoubleClick:PropTypes.func.isRequired,onCommit:PropTypes.func.isRequired,onCommitCancel:PropTypes.func.isRequired,handleDragEnterRow:PropTypes.func.isRequired,handleTerminateDrag:PropTypes.func.isRequired}; /***/}, /* 95 */ /***/function(module,exports,__webpack_require__){'use strict';var React=__webpack_require__(2);var SimpleCellFormatter=React.createClass({displayName:'SimpleCellFormatter',propTypes:{value:React.PropTypes.oneOfType([React.PropTypes.string,React.PropTypes.number,React.PropTypes.object,React.PropTypes.bool]).isRequired},shouldComponentUpdate:function shouldComponentUpdate(nextProps){return nextProps.value!==this.props.value;},render:function render(){return React.createElement('div',{title:this.props.value},this.props.value);}});module.exports=SimpleCellFormatter; /***/}, /* 96 */ /***/function(module,exports,__webpack_require__){'use strict';var React=__webpack_require__(2);var ReactDOM=__webpack_require__(3);var DOMMetrics=__webpack_require__(97);var min=Math.min;var max=Math.max;var floor=Math.floor;var ceil=Math.ceil;module.exports={mixins:[DOMMetrics.MetricsMixin],DOMMetrics:{viewportHeight:function viewportHeight(){return ReactDOM.findDOMNode(this).offsetHeight;}},propTypes:{rowHeight:React.PropTypes.number,rowsCount:React.PropTypes.number.isRequired},getDefaultProps:function getDefaultProps(){return {rowHeight:30};},getInitialState:function getInitialState(){return this.getGridState(this.props);},getGridState:function getGridState(props){var renderedRowsCount=ceil((props.minHeight-props.rowHeight)/props.rowHeight);var totalRowCount=min(renderedRowsCount*2,props.rowsCount);return {displayStart:0,displayEnd:totalRowCount,height:props.minHeight,scrollTop:0,scrollLeft:0};},updateScroll:function updateScroll(scrollTop,scrollLeft,height,rowHeight,length){var renderedRowsCount=ceil(height/rowHeight);var visibleStart=floor(scrollTop/rowHeight);var visibleEnd=min(visibleStart+renderedRowsCount,length);var displayStart=max(0,visibleStart-renderedRowsCount*2);var displayEnd=min(visibleStart+renderedRowsCount*2,length);var nextScrollState={visibleStart:visibleStart,visibleEnd:visibleEnd,displayStart:displayStart,displayEnd:displayEnd,height:height,scrollTop:scrollTop,scrollLeft:scrollLeft};this.setState(nextScrollState);},metricsUpdated:function metricsUpdated(){var height=this.DOMMetrics.viewportHeight();if(height){this.updateScroll(this.state.scrollTop,this.state.scrollLeft,height,this.props.rowHeight,this.props.rowsCount);}},componentWillReceiveProps:function componentWillReceiveProps(nextProps){if(this.props.rowHeight!==nextProps.rowHeight||this.props.minHeight!==nextProps.minHeight){this.setState(this.getGridState(nextProps));}else if(this.props.rowsCount!==nextProps.rowsCount){this.updateScroll(this.state.scrollTop,this.state.scrollLeft,this.state.height,nextProps.rowHeight,nextProps.rowsCount); // Added to fix the hiding of the bottom scrollbar when showing the filters.
	}else if(this.props.rowOffsetHeight!==nextProps.rowOffsetHeight){ // The value of height can be positive or negative and will be added to the current height to cater for changes in the header height (due to the filer)
	var _height=this.props.rowOffsetHeight-nextProps.rowOffsetHeight;this.updateScroll(this.state.scrollTop,this.state.scrollLeft,this.state.height+_height,nextProps.rowHeight,nextProps.rowsCount);}}}; /***/}, /* 97 */ /***/function(module,exports,__webpack_require__){'use strict';var React=__webpack_require__(2);var shallowCloneObject=__webpack_require__(7);var contextTypes={metricsComputator:React.PropTypes.object};var MetricsComputatorMixin={childContextTypes:contextTypes,getChildContext:function getChildContext(){return {metricsComputator:this};},getMetricImpl:function getMetricImpl(name){return this._DOMMetrics.metrics[name].value;},registerMetricsImpl:function registerMetricsImpl(component,metrics){var getters={};var s=this._DOMMetrics;for(var name in metrics){if(s.metrics[name]!==undefined){throw new Error('DOM metric '+name+' is already defined');}s.metrics[name]={component:component,computator:metrics[name].bind(component)};getters[name]=this.getMetricImpl.bind(null,name);}if(s.components.indexOf(component)===-1){s.components.push(component);}return getters;},unregisterMetricsFor:function unregisterMetricsFor(component){var s=this._DOMMetrics;var idx=s.components.indexOf(component);if(idx>-1){s.components.splice(idx,1);var name=void 0;var metricsToDelete={};for(name in s.metrics){if(s.metrics[name].component===component){metricsToDelete[name]=true;}}for(name in metricsToDelete){if(metricsToDelete.hasOwnProperty(name)){delete s.metrics[name];}}}},updateMetrics:function updateMetrics(){var s=this._DOMMetrics;var needUpdate=false;for(var name in s.metrics){if(!s.metrics.hasOwnProperty(name))continue;var newMetric=s.metrics[name].computator();if(newMetric!==s.metrics[name].value){needUpdate=true;}s.metrics[name].value=newMetric;}if(needUpdate){for(var i=0,len=s.components.length;i<len;i++){if(s.components[i].metricsUpdated){s.components[i].metricsUpdated();}}}},componentWillMount:function componentWillMount(){this._DOMMetrics={metrics:{},components:[]};},componentDidMount:function componentDidMount(){if(window.addEventListener){window.addEventListener('resize',this.updateMetrics);}else {window.attachEvent('resize',this.updateMetrics);}this.updateMetrics();},componentWillUnmount:function componentWillUnmount(){window.removeEventListener('resize',this.updateMetrics);}};var MetricsMixin={contextTypes:contextTypes,componentWillMount:function componentWillMount(){if(this.DOMMetrics){this._DOMMetricsDefs=shallowCloneObject(this.DOMMetrics);this.DOMMetrics={};for(var name in this._DOMMetricsDefs){if(!this._DOMMetricsDefs.hasOwnProperty(name))continue;this.DOMMetrics[name]=function(){};}}},componentDidMount:function componentDidMount(){if(this.DOMMetrics){this.DOMMetrics=this.registerMetrics(this._DOMMetricsDefs);}},componentWillUnmount:function componentWillUnmount(){if(!this.registerMetricsImpl){return this.context.metricsComputator.unregisterMetricsFor(this);}if(this.hasOwnProperty('DOMMetrics')){delete this.DOMMetrics;}},registerMetrics:function registerMetrics(metrics){if(this.registerMetricsImpl){return this.registerMetricsImpl(this,metrics);}return this.context.metricsComputator.registerMetricsImpl(this,metrics);},getMetric:function getMetric(name){if(this.getMetricImpl){return this.getMetricImpl(name);}return this.context.metricsComputator.getMetricImpl(name);}};module.exports={MetricsComputatorMixin:MetricsComputatorMixin,MetricsMixin:MetricsMixin}; /***/}, /* 98 */ /***/function(module,exports){"use strict";module.exports={componentDidMount:function componentDidMount(){this._scrollLeft=this.refs.viewport?this.refs.viewport.getScroll().scrollLeft:0;this._onScroll();},componentDidUpdate:function componentDidUpdate(){this._onScroll();},componentWillMount:function componentWillMount(){this._scrollLeft=undefined;},componentWillUnmount:function componentWillUnmount(){this._scrollLeft=undefined;},onScroll:function onScroll(props){if(this._scrollLeft!==props.scrollLeft){this._scrollLeft=props.scrollLeft;this._onScroll();}},onHeaderScroll:function onHeaderScroll(e){var scrollLeft=e.target.scrollLeft;if(this._scrollLeft!==scrollLeft){this._scrollLeft=scrollLeft;this.refs.header.setScrollLeft(scrollLeft);var canvas=ReactDOM.findDOMNode(this.refs.viewport.refs.canvas);canvas.scrollLeft=scrollLeft;this.refs.viewport.refs.canvas.setScrollLeft(scrollLeft);}},_onScroll:function _onScroll(){if(this._scrollLeft!==undefined){this.refs.header.setScrollLeft(this._scrollLeft);if(this.refs.viewport){this.refs.viewport.setScrollLeft(this._scrollLeft);}}}}; /***/}, /* 99 */ /***/function(module,exports,__webpack_require__){'use strict';var React=__webpack_require__(2);var CheckboxEditor=React.createClass({displayName:'CheckboxEditor',propTypes:{value:React.PropTypes.bool,rowIdx:React.PropTypes.number,column:React.PropTypes.shape({key:React.PropTypes.string,onCellChange:React.PropTypes.func}),dependentValues:React.PropTypes.object},handleChange:function handleChange(e){this.props.column.onCellChange(this.props.rowIdx,this.props.column.key,this.props.dependentValues,e);},render:function render(){var checked=this.props.value!=null?this.props.value:false;var checkboxName='checkbox'+this.props.rowIdx;return React.createElement('div',{className:'react-grid-checkbox-container',onClick:this.handleChange},React.createElement('input',{className:'react-grid-checkbox',type:'checkbox',name:checkboxName,checked:checked}),React.createElement('label',{htmlFor:checkboxName,className:'react-grid-checkbox-label'}));}});module.exports=CheckboxEditor; /***/}, /* 100 */ /***/function(module,exports,__webpack_require__){'use strict';var _reactDom=__webpack_require__(3);var _reactDom2=_interopRequireDefault(_reactDom);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var ColumnMetrics=__webpack_require__(8);var DOMMetrics=__webpack_require__(97);Object.assign=__webpack_require__(101);var PropTypes=__webpack_require__(2).PropTypes;var ColumnUtils=__webpack_require__(10);var Column=function Column(){_classCallCheck(this,Column);};module.exports={mixins:[DOMMetrics.MetricsMixin],propTypes:{columns:PropTypes.arrayOf(Column),minColumnWidth:PropTypes.number,columnEquality:PropTypes.func,onColumnResize:PropTypes.func},DOMMetrics:{gridWidth:function gridWidth(){return _reactDom2['default'].findDOMNode(this).parentElement.offsetWidth;}},getDefaultProps:function getDefaultProps(){return {minColumnWidth:80,columnEquality:ColumnMetrics.sameColumn};},componentWillMount:function componentWillMount(){this._mounted=true;},componentWillReceiveProps:function componentWillReceiveProps(nextProps){if(nextProps.columns){if(!ColumnMetrics.sameColumns(this.props.columns,nextProps.columns,this.props.columnEquality)||nextProps.minWidth!==this.props.minWidth){var columnMetrics=this.createColumnMetrics(nextProps);this.setState({columnMetrics:columnMetrics});}}},getTotalWidth:function getTotalWidth(){var totalWidth=0;if(this._mounted){totalWidth=this.DOMMetrics.gridWidth();}else {totalWidth=ColumnUtils.getSize(this.props.columns)*this.props.minColumnWidth;}return totalWidth;},getColumnMetricsType:function getColumnMetricsType(metrics){var totalWidth=metrics.totalWidth||this.getTotalWidth();var currentMetrics={columns:metrics.columns,totalWidth:totalWidth,minColumnWidth:metrics.minColumnWidth};var updatedMetrics=ColumnMetrics.recalculate(currentMetrics);return updatedMetrics;},getColumn:function getColumn(idx){var columns=this.state.columnMetrics.columns;if(Array.isArray(columns)){return columns[idx];}else if(typeof Immutable!=='undefined'){return columns.get(idx);}},getSize:function getSize(){var columns=this.state.columnMetrics.columns;if(Array.isArray(columns)){return columns.length;}else if(typeof Immutable!=='undefined'){return columns.size;}},metricsUpdated:function metricsUpdated(){var columnMetrics=this.createColumnMetrics();this.setState({columnMetrics:columnMetrics});},createColumnMetrics:function createColumnMetrics(){var props=arguments.length<=0||arguments[0]===undefined?this.props:arguments[0];var gridColumns=this.setupGridColumns(props);return this.getColumnMetricsType({columns:gridColumns,minColumnWidth:this.props.minColumnWidth,totalWidth:props.minWidth});},onColumnResize:function onColumnResize(index,width){var columnMetrics=ColumnMetrics.resizeColumn(this.state.columnMetrics,index,width);this.setState({columnMetrics:columnMetrics});if(this.props.onColumnResize){this.props.onColumnResize(index,width);}}}; /***/}, /* 101 */ /***/function(module,exports){'use strict';function ToObject(val){if(val==null){throw new TypeError('Object.assign cannot be called with null or undefined');}return Object(val);}module.exports=Object.assign||function(target,source){var from;var keys;var to=ToObject(target);for(var s=1;s<arguments.length;s++){from=arguments[s];keys=Object.keys(Object(from));for(var i=0;i<keys.length;i++){to[keys[i]]=from[keys[i]];}}return to;}; /***/}, /* 102 */ /***/function(module,exports){'use strict';var RowUtils={get:function get(row,property){if(typeof row.get==='function'){return row.get(property);}return row[property];}};module.exports=RowUtils; /***/}, /* 103 */ /***/function(module,exports,__webpack_require__){'use strict';var Editors={AutoComplete:__webpack_require__(104),DropDownEditor:__webpack_require__(106),SimpleTextEditor:__webpack_require__(91),CheckboxEditor:__webpack_require__(99)};module.exports=Editors; /***/}, /* 104 */ /***/function(module,exports,__webpack_require__){'use strict';var React=__webpack_require__(2);var ReactDOM=__webpack_require__(3);var ReactAutocomplete=__webpack_require__(105);var ExcelColumn=__webpack_require__(15);var optionPropType=React.PropTypes.shape({id:React.PropTypes.required,title:React.PropTypes.string});var AutoCompleteEditor=React.createClass({displayName:'AutoCompleteEditor',propTypes:{onCommit:React.PropTypes.func,options:React.PropTypes.arrayOf(optionPropType),label:React.PropTypes.any,value:React.PropTypes.any,height:React.PropTypes.number,valueParams:React.PropTypes.arrayOf(React.PropTypes.string),column:React.PropTypes.shape(ExcelColumn),resultIdentifier:React.PropTypes.string,search:React.PropTypes.string,onKeyDown:React.PropTypes.func,onFocus:React.PropTypes.func},getDefaultProps:function getDefaultProps(){return {resultIdentifier:'id'};},handleChange:function handleChange(){this.props.onCommit();},getValue:function getValue(){var value=void 0;var updated={};if(this.hasResults()&&this.isFocusedOnSuggestion()){value=this.getLabel(this.refs.autoComplete.state.focusedValue);if(this.props.valueParams){value=this.constuctValueFromParams(this.refs.autoComplete.state.focusedValue,this.props.valueParams);}}else {value=this.refs.autoComplete.state.searchTerm;}updated[this.props.column.key]=value;return updated;},getInputNode:function getInputNode(){return ReactDOM.findDOMNode(this).getElementsByTagName('input')[0];},getLabel:function getLabel(item){var label=this.props.label!=null?this.props.label:'title';if(typeof label==='function'){return label(item);}else if(typeof label==='string'){return item[label];}},hasResults:function hasResults(){return this.refs.autoComplete.state.results.length>0;},isFocusedOnSuggestion:function isFocusedOnSuggestion(){var autoComplete=this.refs.autoComplete;return autoComplete.state.focusedValue!=null;},constuctValueFromParams:function constuctValueFromParams(obj,props){if(!props){return '';}var ret=[];for(var i=0,ii=props.length;i<ii;i++){ret.push(obj[props[i]]);}return ret.join('|');},render:function render(){var label=this.props.label!=null?this.props.label:'title';return React.createElement('div',{height:this.props.height,onKeyDown:this.props.onKeyDown},React.createElement(ReactAutocomplete,{search:this.props.search,ref:'autoComplete',label:label,onChange:this.handleChange,onFocus:this.props.onFocus,resultIdentifier:this.props.resultIdentifier,options:this.props.options,value:{title:this.props.value}}));}});module.exports=AutoCompleteEditor; /***/}, /* 105 */ /***/function(module,exports,__webpack_require__){(function webpackUniversalModuleDefinition(root,factory){if(true)module.exports=factory(__webpack_require__(2));else if(typeof define==='function'&&define.amd)define(["react"],factory);else if((typeof exports==='undefined'?'undefined':_typeof2(exports))==='object')exports["ReactAutocomplete"]=factory(require("react"));else root["ReactAutocomplete"]=factory(root["React"]);})(this,function(__WEBPACK_EXTERNAL_MODULE_1__){return  (/******/function(modules){ // webpackBootstrap
	/******/ // The module cache
	/******/var installedModules={}; /******/ // The require function
	/******/function __webpack_require__(moduleId){ /******/ // Check if module is in cache
	/******/if(installedModules[moduleId]) /******/return installedModules[moduleId].exports; /******/ // Create a new module (and put it into the cache)
	/******/var module=installedModules[moduleId]={ /******/exports:{}, /******/id:moduleId, /******/loaded:false /******/}; /******/ // Execute the module function
	/******/modules[moduleId].call(module.exports,module,module.exports,__webpack_require__); /******/ // Flag the module as loaded
	/******/module.loaded=true; /******/ // Return the exports of the module
	/******/return module.exports; /******/} /******/ // expose the modules object (__webpack_modules__)
	/******/__webpack_require__.m=modules; /******/ // expose the module cache
	/******/__webpack_require__.c=installedModules; /******/ // __webpack_public_path__
	/******/__webpack_require__.p=""; /******/ // Load entry module and return exports
	/******/return __webpack_require__(0); /******/}( /************************************************************************/ /******/[ /* 0 */ /***/function(module,exports,__webpack_require__){"use strict";var React=__webpack_require__(1);var joinClasses=__webpack_require__(2);var Autocomplete=React.createClass({displayName:"Autocomplete",propTypes:{options:React.PropTypes.any,search:React.PropTypes.func,resultRenderer:React.PropTypes.oneOfType([React.PropTypes.component,React.PropTypes.func]),value:React.PropTypes.object,onChange:React.PropTypes.func,onError:React.PropTypes.func,onFocus:React.PropTypes.func},getDefaultProps:function getDefaultProps(){return {search:searchArray};},getInitialState:function getInitialState(){var searchTerm=this.props.searchTerm?this.props.searchTerm:this.props.value?this.props.value.title:"";return {results:[],showResults:false,showResultsInProgress:false,searchTerm:searchTerm,focusedValue:null};},getResultIdentifier:function getResultIdentifier(result){if(this.props.resultIdentifier===undefined){return result.id;}else {return result[this.props.resultIdentifier];}},render:function render(){var className=joinClasses(this.props.className,"react-autocomplete-Autocomplete",this.state.showResults?"react-autocomplete-Autocomplete--resultsShown":undefined);var style={position:"relative",outline:"none"};return React.createElement("div",{tabIndex:"1",className:className,onFocus:this.onFocus,onBlur:this.onBlur,style:style},React.createElement("input",{ref:"search",className:"react-autocomplete-Autocomplete__search",style:{width:"100%"},onClick:this.showAllResults,onChange:this.onQueryChange,onFocus:this.onSearchInputFocus,onBlur:this.onQueryBlur,onKeyDown:this.onQueryKeyDown,value:this.state.searchTerm}),React.createElement(Results,{className:"react-autocomplete-Autocomplete__results",onSelect:this.onValueChange,onFocus:this.onValueFocus,results:this.state.results,focusedValue:this.state.focusedValue,show:this.state.showResults,renderer:this.props.resultRenderer,label:this.props.label,resultIdentifier:this.props.resultIdentifier}));},componentWillReceiveProps:function componentWillReceiveProps(nextProps){var searchTerm=nextProps.searchTerm?nextProps.searchTerm:nextProps.value?nextProps.value.title:"";this.setState({searchTerm:searchTerm});},componentWillMount:function componentWillMount(){this.blurTimer=null;}, /**
			    * Show results for a search term value.
			    *
			    * This method doesn't update search term value itself.
			    *
			    * @param {Search} searchTerm
			    */showResults:function showResults(searchTerm){this.setState({showResultsInProgress:true});this.props.search(this.props.options,searchTerm.trim(),this.onSearchComplete);},showAllResults:function showAllResults(){if(!this.state.showResultsInProgress&&!this.state.showResults){this.showResults("");}},onValueChange:function onValueChange(value){var state={value:value,showResults:false};if(value){state.searchTerm=value.title;}this.setState(state);if(this.props.onChange){this.props.onChange(value);}},onSearchComplete:function onSearchComplete(err,results){if(err){if(this.props.onError){this.props.onError(err);}else {throw err;}}this.setState({showResultsInProgress:false,showResults:true,results:results});},onValueFocus:function onValueFocus(value){this.setState({focusedValue:value});},onQueryChange:function onQueryChange(e){var searchTerm=e.target.value;this.setState({searchTerm:searchTerm,focusedValue:null});this.showResults(searchTerm);},onFocus:function onFocus(){if(this.blurTimer){clearTimeout(this.blurTimer);this.blurTimer=null;}this.refs.search.getDOMNode().focus();},onSearchInputFocus:function onSearchInputFocus(){if(this.props.onFocus){this.props.onFocus();}this.showAllResults();},onBlur:function onBlur(){ // wrap in setTimeout so we can catch a click on results
	this.blurTimer=setTimeout(function(){if(this.isMounted()){this.setState({showResults:false});}}.bind(this),100);},onQueryKeyDown:function onQueryKeyDown(e){if(e.key==="Enter"){e.preventDefault();if(this.state.focusedValue){this.onValueChange(this.state.focusedValue);}}else if(e.key==="ArrowUp"&&this.state.showResults){e.preventDefault();var prevIdx=Math.max(this.focusedValueIndex()-1,0);this.setState({focusedValue:this.state.results[prevIdx]});}else if(e.key==="ArrowDown"){e.preventDefault();if(this.state.showResults){var nextIdx=Math.min(this.focusedValueIndex()+(this.state.showResults?1:0),this.state.results.length-1);this.setState({showResults:true,focusedValue:this.state.results[nextIdx]});}else {this.showAllResults();}}},focusedValueIndex:function focusedValueIndex(){if(!this.state.focusedValue){return -1;}for(var i=0,len=this.state.results.length;i<len;i++){if(this.getResultIdentifier(this.state.results[i])===this.getResultIdentifier(this.state.focusedValue)){return i;}}return -1;}});var Results=React.createClass({displayName:"Results",getResultIdentifier:function getResultIdentifier(result){if(this.props.resultIdentifier===undefined){if(!result.id){throw "id property not found on result. You must specify a resultIdentifier and pass as props to autocomplete component";}return result.id;}else {return result[this.props.resultIdentifier];}},render:function render(){var style={display:this.props.show?"block":"none",position:"absolute",listStyleType:"none"};var $__0=this.props,className=$__0.className,props=function(source,exclusion){var rest={};var hasOwn=Object.prototype.hasOwnProperty;if(source==null){throw new TypeError();}for(var key in source){if(hasOwn.call(source,key)&&!hasOwn.call(exclusion,key)){rest[key]=source[key];}}return rest;}($__0,{className:1});return React.createElement("ul",React.__spread({},props,{style:style,className:className+" react-autocomplete-Results"}),this.props.results.map(this.renderResult));},renderResult:function renderResult(result){var focused=this.props.focusedValue&&this.getResultIdentifier(this.props.focusedValue)===this.getResultIdentifier(result);var Renderer=this.props.renderer||Result;return React.createElement(Renderer,{ref:focused?"focused":undefined,key:this.getResultIdentifier(result),result:result,focused:focused,onMouseEnter:this.onMouseEnterResult,onClick:this.props.onSelect,label:this.props.label});},componentDidUpdate:function componentDidUpdate(){this.scrollToFocused();},componentDidMount:function componentDidMount(){this.scrollToFocused();},componentWillMount:function componentWillMount(){this.ignoreFocus=false;},scrollToFocused:function scrollToFocused(){var focused=this.refs&&this.refs.focused;if(focused){var containerNode=this.getDOMNode();var scroll=containerNode.scrollTop;var height=containerNode.offsetHeight;var node=focused.getDOMNode();var top=node.offsetTop;var bottom=top+node.offsetHeight; // we update ignoreFocus to true if we change the scroll position so
	// the mouseover event triggered because of that won't have an
	// effect
	if(top<scroll){this.ignoreFocus=true;containerNode.scrollTop=top;}else if(bottom-scroll>height){this.ignoreFocus=true;containerNode.scrollTop=bottom-height;}}},onMouseEnterResult:function onMouseEnterResult(e,result){ // check if we need to prevent the next onFocus event because it was
	// probably caused by a mouseover due to scroll position change
	if(this.ignoreFocus){this.ignoreFocus=false;}else { // we need to make sure focused node is visible
	// for some reason mouse events fire on visible nodes due to
	// box-shadow
	var containerNode=this.getDOMNode();var scroll=containerNode.scrollTop;var height=containerNode.offsetHeight;var node=e.target;var top=node.offsetTop;var bottom=top+node.offsetHeight;if(bottom>scroll&&top<scroll+height){this.props.onFocus(result);}}}});var Result=React.createClass({displayName:"Result",getDefaultProps:function getDefaultProps(){return {label:function label(result){return result.title;}};},getLabel:function getLabel(result){if(typeof this.props.label==="function"){return this.props.label(result);}else if(typeof this.props.label==="string"){return result[this.props.label];}},render:function render(){var className=joinClasses({"react-autocomplete-Result":true,"react-autocomplete-Result--active":this.props.focused});return React.createElement("li",{style:{listStyleType:"none"},className:className,onClick:this.onClick,onMouseEnter:this.onMouseEnter},React.createElement("a",null,this.getLabel(this.props.result)));},onClick:function onClick(){this.props.onClick(this.props.result);},onMouseEnter:function onMouseEnter(e){if(this.props.onMouseEnter){this.props.onMouseEnter(e,this.props.result);}},shouldComponentUpdate:function shouldComponentUpdate(nextProps){return nextProps.result.id!==this.props.result.id||nextProps.focused!==this.props.focused;}}); /**
			* Search options using specified search term treating options as an array
			* of candidates.
			*
			* @param {Array.<Object>} options
			* @param {String} searchTerm
			* @param {Callback} cb
			*/function searchArray(options,searchTerm,cb){if(!options){return cb(null,[]);}searchTerm=new RegExp(searchTerm,"i");var results=[];for(var i=0,len=options.length;i<len;i++){if(searchTerm.exec(options[i].title)){results.push(options[i]);}}cb(null,results);}module.exports=Autocomplete; /***/}, /* 1 */ /***/function(module,exports){module.exports=__WEBPACK_EXTERNAL_MODULE_1__; /***/}, /* 2 */ /***/function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__; /*!
			  Copyright (c) 2015 Jed Watson.
			  Licensed under the MIT License (MIT), see
			  http://jedwatson.github.io/classnames
			*/function classNames(){var classes='';var arg;for(var i=0;i<arguments.length;i++){arg=arguments[i];if(!arg){continue;}if('string'===typeof arg||'number'===typeof arg){classes+=' '+arg;}else if(Object.prototype.toString.call(arg)==='[object Array]'){classes+=' '+classNames.apply(null,arg);}else if('object'===(typeof arg==='undefined'?'undefined':_typeof2(arg))){for(var key in arg){if(!arg.hasOwnProperty(key)||!arg[key]){continue;}classes+=' '+key;}}}return classes.substr(1);} // safely export classNames for node / browserify
	if(typeof module!=='undefined'&&module.exports){module.exports=classNames;} // safely export classNames for RequireJS
	if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__=[],__WEBPACK_AMD_DEFINE_RESULT__=function(){return classNames;}.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__),__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));} /***/} /******/]));});; /***/}, /* 106 */ /***/function(module,exports,__webpack_require__){'use strict';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _reactDom=__webpack_require__(3);var _reactDom2=_interopRequireDefault(_reactDom);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==='undefined'?'undefined':_typeof2(call))==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+(typeof superClass==='undefined'?'undefined':_typeof2(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var React=__webpack_require__(2);var EditorBase=__webpack_require__(92);var DropDownEditor=function(_EditorBase){_inherits(DropDownEditor,_EditorBase);function DropDownEditor(){_classCallCheck(this,DropDownEditor);return _possibleConstructorReturn(this,Object.getPrototypeOf(DropDownEditor).apply(this,arguments));}_createClass(DropDownEditor,[{key:'getInputNode',value:function getInputNode(){return _reactDom2['default'].findDOMNode(this);}},{key:'onClick',value:function onClick(){this.getInputNode().focus();}},{key:'onDoubleClick',value:function onDoubleClick(){this.getInputNode().focus();}},{key:'render',value:function render(){return React.createElement('select',{style:this.getStyle(),defaultValue:this.props.value,onBlur:this.props.onBlur,onChange:this.onChange},this.renderOptions());}},{key:'renderOptions',value:function renderOptions(){var options=[];this.props.options.forEach(function(name){if(typeof name==='string'){options.push(React.createElement('option',{key:name,value:name},name));}else {options.push(React.createElement('option',{key:name.id,value:name.value,title:name.title},name.value));}},this);return options;}}]);return DropDownEditor;}(EditorBase);DropDownEditor.propTypes={options:React.PropTypes.arrayOf(React.PropTypes.oneOfType([React.PropTypes.string,React.PropTypes.objectOf({id:React.PropTypes.string,title:React.PropTypes.string,meta:React.PropTypes.string})])).isRequired};module.exports=DropDownEditor; /***/}, /* 107 */ /***/function(module,exports,__webpack_require__){'use strict'; // not including this
	// it currently requires the whole of moment, which we dont want to take as a dependency
	var ImageFormatter=__webpack_require__(108);var Formatters={ImageFormatter:ImageFormatter};module.exports=Formatters; /***/}, /* 108 */ /***/function(module,exports,__webpack_require__){'use strict';var React=__webpack_require__(2);var PendingPool={};var ReadyPool={};var ImageFormatter=React.createClass({displayName:'ImageFormatter',propTypes:{value:React.PropTypes.string.isRequired},getInitialState:function getInitialState(){return {ready:false};},componentWillMount:function componentWillMount(){this._load(this.props.value);},componentWillReceiveProps:function componentWillReceiveProps(nextProps){if(nextProps.value!==this.props.value){this.setState({value:null});this._load(nextProps.value);}},_load:function _load(src){var imageSrc=src;if(ReadyPool[imageSrc]){this.setState({value:imageSrc});return;}if(PendingPool[imageSrc]){PendingPool[imageSrc].push(this._onLoad);return;}PendingPool[imageSrc]=[this._onLoad];var img=new Image();img.onload=function(){PendingPool[imageSrc].forEach(function(callback){callback(imageSrc);});delete PendingPool[imageSrc];img.onload=null;imageSrc=undefined;};img.src=imageSrc;},_onLoad:function _onLoad(src){if(this.isMounted()&&src===this.props.value){this.setState({value:src});}},render:function render(){var style=this.state.value?{backgroundImage:'url('+this.state.value+')'}:undefined;return React.createElement('div',{className:'react-grid-image',style:style});}});module.exports=ImageFormatter; /***/}, /* 109 */ /***/function(module,exports,__webpack_require__){"use strict";var React=__webpack_require__(2);var Toolbar=React.createClass({displayName:"Toolbar",propTypes:{onAddRow:React.PropTypes.func,onToggleFilter:React.PropTypes.func,enableFilter:React.PropTypes.bool,numberOfRows:React.PropTypes.number},onAddRow:function onAddRow(){if(this.props.onAddRow!==null&&this.props.onAddRow instanceof Function){this.props.onAddRow({newRowIndex:this.props.numberOfRows});}},getDefaultProps:function getDefaultProps(){return {enableAddRow:true};},renderAddRowButton:function renderAddRowButton(){if(this.props.onAddRow){return React.createElement("button",{type:"button",className:"btn",onClick:this.onAddRow},"Add Row");}},renderToggleFilterButton:function renderToggleFilterButton(){if(this.props.enableFilter){return React.createElement("button",{type:"button",className:"btn",onClick:this.props.onToggleFilter},"Filter Rows");}},render:function render(){return React.createElement("div",{className:"react-grid-Toolbar"},React.createElement("div",{className:"tools"},this.renderAddRowButton(),this.renderToggleFilterButton()));}});module.exports=Toolbar; /***/}, /* 110 */ /***/function(module,exports,__webpack_require__){'use strict';Object.defineProperty(exports,"__esModule",{value:true});exports.connect=exports.SubMenu=exports.monitor=exports.MenuItem=exports.MenuHeader=exports.ContextMenu=undefined;var _reactContextmenu=__webpack_require__(24);var _ContextMenu=__webpack_require__(111);var _ContextMenu2=_interopRequireDefault(_ContextMenu);var _MenuHeader=__webpack_require__(112);var _MenuHeader2=_interopRequireDefault(_MenuHeader);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}exports.ContextMenu=_ContextMenu2['default'];exports.MenuHeader=_MenuHeader2['default'];exports.MenuItem=_reactContextmenu.MenuItem;exports.monitor=_reactContextmenu.monitor;exports.SubMenu=_reactContextmenu.SubMenu;exports.connect=_reactContextmenu.connect; /***/}, /* 111 */ /***/function(module,exports,__webpack_require__){'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=__webpack_require__(2);var _react2=_interopRequireDefault(_react);var _reactContextmenu=__webpack_require__(24);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==='undefined'?'undefined':_typeof2(call))==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+(typeof superClass==='undefined'?'undefined':_typeof2(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var ReactDataGridContextMenu=function(_React$Component){_inherits(ReactDataGridContextMenu,_React$Component);function ReactDataGridContextMenu(){_classCallCheck(this,ReactDataGridContextMenu);return _possibleConstructorReturn(this,Object.getPrototypeOf(ReactDataGridContextMenu).apply(this,arguments));}_createClass(ReactDataGridContextMenu,[{key:'render',value:function render(){return _react2['default'].createElement(_reactContextmenu.ContextMenu,{identifier:'reactDataGridContextMenu'},this.props.children);}}]);return ReactDataGridContextMenu;}(_react2['default'].Component);ReactDataGridContextMenu.propTypes={children:_react.PropTypes.node};exports['default']=ReactDataGridContextMenu; /***/}, /* 112 */ /***/function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=__webpack_require__(2);var _react2=_interopRequireDefault(_react);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==='undefined'?'undefined':_typeof2(call))==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+(typeof superClass==='undefined'?'undefined':_typeof2(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var MenuHeader=function(_React$Component){_inherits(MenuHeader,_React$Component);function MenuHeader(){_classCallCheck(this,MenuHeader);return _possibleConstructorReturn(this,Object.getPrototypeOf(MenuHeader).apply(this,arguments));}_createClass(MenuHeader,[{key:"render",value:function render(){return _react2["default"].createElement("div",{className:"react-context-menu-header"},this.props.children);}}]);return MenuHeader;}(_react2["default"].Component);MenuHeader.propTypes={children:_react.PropTypes.any};exports["default"]=MenuHeader; /***/} /******/]));});;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(59)(module)))

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var QuickStartDescription = __webpack_require__(53);
	var ReactPlayground = __webpack_require__(56);
	var faker = __webpack_require__(72);

	var AllFeaturesExample = '\n  var Editors             = ReactDataGrid.Editors;\n  var Toolbar             = ReactDataGrid.Toolbar;\n  var AutoCompleteEditor  = Editors.AutoComplete;\n  var DropDownEditor      = Editors.DropDownEditor;\n\n  faker.locale = \'en_GB\';\n\n  function createFakeRowObjectData(/*number*/ index) {\n    return {\n      id: \'id_\' + index,\n      avartar: faker.image.avatar(),\n      county: faker.address.county(),\n      email: faker.internet.email(),\n      title: faker.name.prefix(),\n      firstName: faker.name.firstName(),\n      lastName: faker.name.lastName(),\n      street: faker.address.streetName(),\n      zipCode: faker.address.zipCode(),\n      date: faker.date.past().toLocaleDateString(),\n      bs: faker.company.bs(),\n      catchPhrase: faker.company.catchPhrase(),\n      companyName: faker.company.companyName(),\n      words: faker.lorem.words(),\n      sentence: faker.lorem.sentence()\n    };\n  }\n\n  function createRows(numberOfRows) {\n    var rows = [];\n    for (var i = 0; i < numberOfRows; i++) {\n      rows[i] = createFakeRowObjectData(i);\n    }\n    return rows;\n  }\n\n  var counties = [{id : 0, title : \'Bedfordshire\'}, { id : 1, title : \'Berkshire\'}, { id : 2, title : \'Buckinghamshire\'}, { id : 3, title : \'Cambridgeshire\'}, { id : 4, title : \'Cheshire\'}, { id : 5, title :\'Cornwall\'}, {id : 6, title : \'Cumbria, (Cumberland)\'}, {id : 7, title : \'Derbyshire\'}, { id : 8, title :\'Devon\'}, { id : 9, title :\'Dorset\'},\n   { id : 10, title :\'Durham\'},\n   { id : 11, title :\'Essex\'},\n   { id : 12, title :\'Gloucestershire\'},\n   { id : 13, title :\'Hampshire\'},\n   { id : 14, title :\'Hertfordshire\'},\n   { id : 15, title :\'Huntingdonshire\'},\n   { id : 16, title :\'Kent\'},\n   { id : 17, title :\'Lancashire\'},\n   { id : 18, title :\'Leicestershire\'},\n   { id : 19, title :\'Lincolnshire\'},\n   { id : 20, title :\'Middlesex\'},\n   { id : 21, title :\'Norfolk\'},\n   { id : 22, title :\'Northamptonshire\'},\n   { id : 23, title :\'Northumberland\'},\n   { id : 24, title :\'Nottinghamshire\'},\n   { id : 25, title :\'Northamptonshire\'},\n   { id : 26, title :\'Oxfordshire\'},\n   { id : 27, title :\'Northamptonshire\'},\n   { id : 28, title :\'Rutland\'},\n   { id : 29, title :\'Shropshire\'},\n   { id : 30, title :\'Somerset\'},\n   { id : 31, title :\'Staffordshire\'},\n   { id : 32, title :\'Suffolk\'},\n   { id : 33, title :\'Surrey\'},\n   { id : 34, title :\'Sussex\'},\n   { id : 35, title :\'Warwickshire\'},\n   { id : 36, title :\'Westmoreland\'},\n   { id : 37, title :\'Wiltshire\'},\n   { id : 38, title :\'Worcestershire\'},\n   { id : 39, title :\'Yorkshire\'}]\n\n  var titles = [\'Dr.\', \'Mr.\', \'Mrs.\', \'Miss\', \'Ms.\'];\n\n  var columns = [\n    {\n      key: \'id\',\n      name: \'ID\',\n      width : 80,\n      resizable: true\n    },\n    {\n      key: \'avartar\',\n      name: \'Avartar\',\n      width : 60,\n      formatter : ReactDataGrid.Formatters.ImageFormatter,\n      resizable : true,\n      headerRenderer: <ReactDataGrid.Formatters.ImageFormatter value={faker.image.cats()} />\n    },\n    {\n      key: \'county\',\n      name: \'County\',\n      editor: <AutoCompleteEditor options={counties}/>,\n      width : 200,\n      resizable: true\n    },\n    {\n      key: \'title\',\n      name: \'Title\',\n      editor : <DropDownEditor options={titles}/>,\n      width : 200,\n      resizable: true,\n      events: {\n        onDoubleClick: function() {\n           console.log("The user double clicked on title column");\n        }\n      }\n    },\n    {\n      key: \'firstName\',\n      name: \'First Name\',\n      editable:true,\n      width : 200,\n      resizable: true\n    },\n    {\n      key: \'lastName\',\n      name: \'Last Name\',\n      editable:true,\n      width : 200,\n      resizable: true\n    },\n    {\n      key: \'email\',\n      name: \'Email\',\n      editable:true,\n      width : 200,\n      resizable: true\n    },\n    {\n      key: \'street\',\n      name: \'Street\',\n      editable:true,\n      width : 200,\n      resizable: true\n    },\n    {\n      key: \'zipCode\',\n      name: \'ZipCode\',\n      editable:true,\n      width : 200,\n      resizable: true\n    },\n    {\n      key: \'date\',\n      name: \'Date\',\n      editable:true,\n      width : 200,\n      resizable: true\n    },\n    {\n      key: \'bs\',\n      name: \'bs\',\n      editable:true,\n      width : 200,\n      resizable: true\n    },\n    {\n      key: \'catchPhrase\',\n      name: \'Catch Phrase\',\n      editable:true,\n      width : 200,\n      resizable: true\n    },\n    {\n      key: \'companyName\',\n      name: \'Company Name\',\n      editable:true,\n      width : 200,\n      resizable: true\n    },\n    {\n      key: \'sentence\',\n      name: \'Sentence\',\n      editable:true,\n      width : 200,\n      resizable: true\n    }\n  ];\n\n\n var Example = React.createClass({displayName: \'component\',\n\n    getInitialState : function(){\n      var fakeRows = createRows(2000);\n      return {rows :fakeRows};\n    },\n\n    getColumns: function() {\n      var clonedColumns = columns.slice();\n      clonedColumns[2].events = {\n        onClick: function(ev, args) {\n          var idx = args.idx;\n          var rowIdx = args.rowIdx;\n          this.refs.grid.openCellEditor(rowIdx, idx);\n        }.bind(this)\n      }\n\n      return clonedColumns;\n    },\n\n    handleGridRowsUpdated : function(updatedRowData) {\n      var rows = this.state.rows;\n\n      for (var i = updatedRowData.fromRow; i <= updatedRowData.toRow; i++) {\n        var rowToUpdate = rows[i];\n        var updatedRow = React.addons.update(rowToUpdate, {$merge: updatedRowData.updated});\n        rows[i] = updatedRow;\n      }\n\n      this.setState({rows: rows});\n    },\n\n    handleAddRow : function(e){\n      var newRow = {\n        value: e.newRowIndex,\n        userStory: \'\',\n        developer : \'\',\n        epic : \'\'};\n        var rows = React.addons.update(this.state.rows, {$push : [newRow]});\n        this.setState({rows : rows});\n    },\n\n    getRowAt : function(index){\n      if (index < 0 || index > this.getSize()){\n        return undefined;\n      }\n      return this.state.rows[index];\n    },\n\n    getSize : function() {\n      return this.state.rows.length;\n    },\n\n    render : function() {\n      return (\n            <ReactDataGrid\n              ref=\'grid\'\n              enableCellSelect={true}\n              columns={this.getColumns()}\n              rowGetter={this.getRowAt}\n              rowsCount={this.getSize()}\n              onGridRowsUpdated={this.handleGridRowsUpdated}\n              toolbar={<Toolbar onAddRow={this.handleAddRow}/>}\n              enableRowSelect={true}\n              rowHeight={50}\n              minHeight={600}\n              rowScrollTimeout={200}\n              />\n\n      );\n    }\n  });\n  ReactDOM.render(<Example />, mountNode);\n';

	module.exports = React.createClass({
	  displayName: 'exports',


	  render: function render() {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'h3',
	        null,
	        'All the features grid'
	      ),
	      React.createElement(
	        'p',
	        null,
	        'This example demonstrates all the features from the previous examples. The ReactDataGrid with addons is globally available in this example so you need to have \'react-data-grid-with-addons.js\' on the page or require(\'react-data-grid\'/addons) if you are using Common JS.'
	      ),
	      React.createElement(
	        'p',
	        null,
	        'Fake data is generated using the ',
	        React.createElement(
	          'a',
	          { href: 'https://github.com/Marak/faker.js' },
	          'Faker'
	        ),
	        ' library which is also a global variable in this example.'
	      ),
	      React.createElement(ReactPlayground, { codeText: AllFeaturesExample })
	    );
	  }

	});

/***/ },
/* 72 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_72__;

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	(function () {
	  var React = __webpack_require__(1);
	  var ReactDataGrid = __webpack_require__(74);
	  var Editors = ReactDataGrid.Editors;
	  var Toolbar = ReactDataGrid.Toolbar;
	  var AutoCompleteEditor = Editors.AutoComplete;
	  var DropDownEditor = Editors.DropDownEditor;
	  var joinClasses = __webpack_require__(75);
	  var FakeObjectDataStore = __webpack_require__(76);
	  var _ReactDataGrid$Menu = ReactDataGrid.Menu;
	  var ContextMenu = _ReactDataGrid$Menu.ContextMenu;
	  var MenuItem = _ReactDataGrid$Menu.MenuItem;

	  var counties = [{ id: 0, title: 'Bedfordshire' }, { id: 1, title: 'Berkshire' }, { id: 2, title: 'Buckinghamshire' }, { id: 3, title: 'Cambridgeshire' }, { id: 4, title: 'Cheshire' }, { id: 5, title: 'Cornwall' }, { id: 6, title: 'Cumbria, (Cumberland)' }, { id: 7, title: 'Derbyshire' }, { id: 8, title: 'Devon' }, { id: 9, title: 'Dorset' }, { id: 10, title: 'Durham' }, { id: 11, title: 'Essex' }, { id: 12, title: 'Gloucestershire' }, { id: 13, title: 'Hampshire' }, { id: 14, title: 'Hertfordshire' }, { id: 15, title: 'Huntingdonshire' }, { id: 16, title: 'Kent' }, { id: 17, title: 'Lancashire' }, { id: 18, title: 'Leicestershire' }, { id: 19, title: 'Lincolnshire' }, { id: 20, title: 'Middlesex' }, { id: 21, title: 'Norfolk' }, { id: 22, title: 'Northamptonshire' }, { id: 23, title: 'Northumberland' }, { id: 24, title: 'Nottinghamshire' }, { id: 25, title: 'Northamptonshire' }, { id: 26, title: 'Oxfordshire' }, { id: 27, title: 'Northamptonshire' }, { id: 28, title: 'Rutland' }, { id: 29, title: 'Shropshire' }, { id: 30, title: 'Somerset' }, { id: 31, title: 'Staffordshire' }, { id: 32, title: 'Suffolk' }, { id: 33, title: 'Surrey' }, { id: 34, title: 'Sussex' }, { id: 35, title: 'Warwickshire' }, { id: 36, title: 'Westmoreland' }, { id: 37, title: 'Wiltshire' }, { id: 38, title: 'Worcestershire' }, { id: 39, title: 'Yorkshire' }];

	  var titles = ['Dr.', 'Mr.', 'Mrs.', 'Miss', 'Ms.'];

	  var columns = new Immutable.List([{
	    key: 'id',
	    name: 'ID',
	    width: 80,
	    resizable: true
	  }, {
	    key: 'avartar',
	    name: 'Avartar',
	    width: 60,
	    formatter: ReactDataGrid.Formatters.ImageFormatter,
	    resizable: true
	  }, {
	    key: 'county',
	    name: 'County',
	    editor: React.createElement(AutoCompleteEditor, { options: counties, onCommit: function onCommit() {}, column: { name: 'county', key: 'county', width: 200 }, value: 'wicklow' }),
	    width: 200,
	    resizable: true
	  }, {
	    key: 'title',
	    name: 'Title',
	    editor: React.createElement(DropDownEditor, { options: titles }),
	    width: 200,
	    resizable: true
	  }, {
	    key: 'firstName',
	    name: 'First Name',
	    editable: true,
	    width: 200,
	    resizable: true
	  }, {
	    key: 'lastName',
	    name: 'Last Name',
	    editable: true,
	    width: 200,
	    resizable: true
	  }, {
	    key: 'email',
	    name: 'Email',
	    editable: true,
	    width: 200,
	    resizable: true
	  }, {
	    key: 'street',
	    name: 'Street',
	    editable: true,
	    width: 200,
	    resizable: true
	  }, {
	    key: 'zipCode',
	    name: 'ZipCode',
	    editable: true,
	    width: 200,
	    resizable: true
	  }, {
	    key: 'date',
	    name: 'Date',
	    editable: true,
	    width: 200,
	    resizable: true
	  }, {
	    key: 'bs',
	    name: 'bs',
	    editable: true,
	    width: 200,
	    resizable: true
	  }, {
	    key: 'catchPhrase',
	    name: 'Catch Phrase',
	    editable: true,
	    width: 200,
	    resizable: true
	  }, {
	    key: 'companyName',
	    name: 'Company Name',
	    editable: true,
	    width: 200,
	    resizable: true
	  }, {
	    key: 'sentence',
	    name: 'Sentence',
	    editable: true,
	    width: 200,
	    resizable: true
	  }]);

	  var MyContextMenu = React.createClass({
	    displayName: 'MyContextMenu',

	    onItemClick: function onItemClick(e, data) {
	      // alert('Row: ' + (data.rowIdx + 1) + ', Column: ' + (data.idx + 1));
	    },
	    render: function render() {
	      return React.createElement(
	        ContextMenu,
	        null,
	        React.createElement(
	          MenuItem,
	          { data: { rowIdx: this.props.rowIdx, idx: this.props.idx }, onClick: this.onItemClick },
	          this.props.rowIdx,
	          ',',
	          this.props.idx
	        )
	      );
	    }
	  });

	  var Component = React.createClass({ displayName: 'component',

	    getInitialState: function getInitialState() {
	      var fakeRows = FakeObjectDataStore.createRows(100);
	      return { rows: Immutable.fromJS(fakeRows) };
	    },

	    handleRowUpdated: function handleRowUpdated(commit) {
	      //merge the updated row values with the existing row
	      var newRows = this.state.rows.update(commit.rowIdx, function (r) {
	        return r.merge(commit.updated);
	      });
	      this.setState({ rows: newRows });
	    },

	    handleCellDrag: function handleCellDrag(e) {
	      var rows = this.state.rows;
	      for (var i = e.fromRow; i <= e.toRow; i++) {
	        rows = rows.update(i, function (r) {
	          return r.set(e.cellKey, e.value);
	        });
	      }
	      if (this.props.handleCellDrag) {
	        this.props.handleCellDrag(e);
	      }
	      this.setState({ rows: rows });
	    },

	    handleCellCopyPaste: function handleCellCopyPaste(e) {
	      var rows = this.state.rows.update(e.toRow, function (r) {
	        return r.set(e.cellKey, e.value);
	      });
	      this.setState({ rows: rows });
	    },

	    handleAddRow: function handleAddRow(e) {
	      var newRow = {
	        id: e.newRowIndex,
	        userStory: '',
	        developer: '',
	        epic: '' };
	      var rows = this.state.rows.push(newRow);
	      this.setState({ rows: rows });
	    },

	    getRowAt: function getRowAt(index) {
	      if (index < 0 || index > this.getSize()) {
	        return undefined;
	      }
	      return this.state.rows.get(index);
	    },
	    getSize: function getSize() {
	      return this.state.rows.size;
	    },
	    render: function render() {
	      return React.createElement(ReactDataGrid, {
	        contextMenu: React.createElement(MyContextMenu, null),
	        ref: 'reactDataGrid',
	        enableCellSelect: true,
	        columns: columns,
	        rowGetter: this.getRowAt,
	        rowsCount: this.getSize(),
	        onRowUpdated: this.handleRowUpdated,
	        onCellsDragged: this.handleCellDrag,
	        onCellCopyPaste: this.handleCellCopyPaste,
	        toolbar: React.createElement(Toolbar, { onAddRow: this.handleAddRow, onToggleFilter: function onToggleFilter() {}, numberOfRows: this.getSize() }),
	        enableRowSelect: true,
	        rowHeight: 50,
	        minHeight: 600
	      });
	    }
	  });

	  if (typeof module !== 'undefined' && module.exports) {
	    module.exports = Component;
	  } else {
	    this.ReactDataGrid = Component;
	  }
	}).call(undefined);

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {'use strict';var _typeof2=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol?"symbol":typeof obj;};(function webpackUniversalModuleDefinition(root,factory){if(( false?'undefined':_typeof2(exports))==='object'&&( false?'undefined':_typeof2(module))==='object')module.exports=factory(__webpack_require__(1),__webpack_require__(2));else if(true)!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1),__webpack_require__(2)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else if((typeof exports==='undefined'?'undefined':_typeof2(exports))==='object')exports["ReactDataGrid"]=factory(require("react"),require("react-dom"));else root["ReactDataGrid"]=factory(root["React"],root["ReactDOM"]);})(undefined,function(__WEBPACK_EXTERNAL_MODULE_2__,__WEBPACK_EXTERNAL_MODULE_3__){return  (/******/function(modules){ // webpackBootstrap
	/******/ // The module cache
	/******/var installedModules={}; /******/ // The require function
	/******/function __webpack_require__(moduleId){ /******/ // Check if module is in cache
	/******/if(installedModules[moduleId]) /******/return installedModules[moduleId].exports; /******/ // Create a new module (and put it into the cache)
	/******/var module=installedModules[moduleId]={ /******/exports:{}, /******/id:moduleId, /******/loaded:false /******/}; /******/ // Execute the module function
	/******/modules[moduleId].call(module.exports,module,module.exports,__webpack_require__); /******/ // Flag the module as loaded
	/******/module.loaded=true; /******/ // Return the exports of the module
	/******/return module.exports; /******/} /******/ // expose the modules object (__webpack_modules__)
	/******/__webpack_require__.m=modules; /******/ // expose the module cache
	/******/__webpack_require__.c=installedModules; /******/ // __webpack_public_path__
	/******/__webpack_require__.p=""; /******/ // Load entry module and return exports
	/******/return __webpack_require__(0); /******/}( /************************************************************************/ /******/[ /* 0 */ /***/function(module,exports,__webpack_require__){'use strict';module.exports=__webpack_require__(1);module.exports.Editors=__webpack_require__(103);module.exports.Formatters=__webpack_require__(107);module.exports.Toolbar=__webpack_require__(109);module.exports.Row=__webpack_require__(87);module.exports.Menu=__webpack_require__(110); /***/}, /* 1 */ /***/function(module,exports,__webpack_require__){'use strict';var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else {obj[key]=value;}return obj;}var React=__webpack_require__(2);var ReactDOM=__webpack_require__(3);var BaseGrid=__webpack_require__(4);var Row=__webpack_require__(87);var ExcelColumn=__webpack_require__(15);var KeyboardHandlerMixin=__webpack_require__(90);var CheckboxEditor=__webpack_require__(99);var DOMMetrics=__webpack_require__(97);var ColumnMetricsMixin=__webpack_require__(100);var RowUtils=__webpack_require__(102);var ColumnUtils=__webpack_require__(10);if(!Object.assign){Object.assign=__webpack_require__(101);}var ReactDataGrid=React.createClass({displayName:'ReactDataGrid',mixins:[ColumnMetricsMixin,DOMMetrics.MetricsComputatorMixin,KeyboardHandlerMixin],propTypes:{rowHeight:React.PropTypes.number.isRequired,headerRowHeight:React.PropTypes.number,minHeight:React.PropTypes.number.isRequired,minWidth:React.PropTypes.number,enableRowSelect:React.PropTypes.oneOfType([React.PropTypes.bool,React.PropTypes.string]),onRowUpdated:React.PropTypes.func,rowGetter:React.PropTypes.func.isRequired,rowsCount:React.PropTypes.number.isRequired,toolbar:React.PropTypes.element,enableCellSelect:React.PropTypes.bool,columns:React.PropTypes.oneOfType([React.PropTypes.object,React.PropTypes.array]).isRequired,onFilter:React.PropTypes.func,onCellCopyPaste:React.PropTypes.func,onCellsDragged:React.PropTypes.func,onAddFilter:React.PropTypes.func,onGridSort:React.PropTypes.func,onDragHandleDoubleClick:React.PropTypes.func,onGridRowsUpdated:React.PropTypes.func,onRowSelect:React.PropTypes.func,rowKey:React.PropTypes.string,rowScrollTimeout:React.PropTypes.number,onClearFilters:React.PropTypes.func,contextMenu:React.PropTypes.element,cellNavigationMode:React.PropTypes.oneOf(['none','loopOverRow','changeRow']),onCellSelected:React.PropTypes.func,onCellDeSelected:React.PropTypes.func},getDefaultProps:function getDefaultProps(){return {enableCellSelect:false,tabIndex:-1,rowHeight:35,enableRowSelect:false,minHeight:350,rowKey:'id',rowScrollTimeout:0,cellNavigationMode:'none'};},getInitialState:function getInitialState(){var columnMetrics=this.createColumnMetrics();var initialState={columnMetrics:columnMetrics,selectedRows:[],copied:null,expandedRows:[],canFilter:false,columnFilters:{},sortDirection:null,sortColumn:null,dragged:null,scrollOffset:0};if(this.props.enableCellSelect){initialState.selected={rowIdx:0,idx:0};}else {initialState.selected={rowIdx:-1,idx:-1};}return initialState;},hasSelectedCellChanged:function hasSelectedCellChanged(selected){var previouslySelected=Object.assign({},this.state.selected);return previouslySelected.rowIdx!==selected.rowIdx||previouslySelected.idx!==selected.idx||previouslySelected.active===false;},onContextMenuHide:function onContextMenuHide(){document.removeEventListener('click',this.onContextMenuHide);var newSelected=Object.assign({},this.state.selected,{contextMenuDisplayed:false});this.setState({selected:newSelected});},onColumnEvent:function onColumnEvent(ev,columnEvent){var idx=columnEvent.idx;var name=columnEvent.name;if(name&&typeof idx!=='undefined'){var column=this.getColumn(idx);if(column&&column.events&&column.events[name]&&typeof column.events[name]==='function'){var eventArgs={rowIdx:columnEvent.rowIdx,idx:idx,column:column};column.events[name](ev,eventArgs);}}},onSelect:function onSelect(selected){var _this=this;if(this.state.selected.rowIdx!==selected.rowIdx||this.state.selected.idx!==selected.idx||this.state.selected.active===false){var _idx=selected.idx;var _rowIdx=selected.rowIdx;if(_idx>=0&&_rowIdx>=0&&_idx<ColumnUtils.getSize(this.state.columnMetrics.columns)&&_rowIdx<this.props.rowsCount){(function(){var oldSelection=_this.state.selected;_this.setState({selected:selected},function(){if(typeof _this.props.onCellDeSelected==='function'){_this.props.onCellDeSelected(oldSelection);}if(typeof _this.props.onCellSelected==='function'){_this.props.onCellSelected(selected);}});})();}}},onCellClick:function onCellClick(cell){this.onSelect({rowIdx:cell.rowIdx,idx:cell.idx});},onCellContextMenu:function onCellContextMenu(cell){this.onSelect({rowIdx:cell.rowIdx,idx:cell.idx,contextMenuDisplayed:this.props.contextMenu});if(this.props.contextMenu){document.addEventListener('click',this.onContextMenuHide);}},onCellDoubleClick:function onCellDoubleClick(cell){this.onSelect({rowIdx:cell.rowIdx,idx:cell.idx});this.setActive('Enter');},onViewportDoubleClick:function onViewportDoubleClick(){this.setActive();},onPressArrowUp:function onPressArrowUp(e){this.moveSelectedCell(e,-1,0);},onPressArrowDown:function onPressArrowDown(e){this.moveSelectedCell(e,1,0);},onPressArrowLeft:function onPressArrowLeft(e){this.moveSelectedCell(e,0,-1);},onPressArrowRight:function onPressArrowRight(e){this.moveSelectedCell(e,0,1);},onPressTab:function onPressTab(e){this.moveSelectedCell(e,0,e.shiftKey?-1:1);},onPressEnter:function onPressEnter(e){this.setActive(e.key);},onPressDelete:function onPressDelete(e){this.setActive(e.key);},onPressEscape:function onPressEscape(e){this.setInactive(e.key);},onPressBackspace:function onPressBackspace(e){this.setActive(e.key);},onPressChar:function onPressChar(e){if(this.isKeyPrintable(e.keyCode)){this.setActive(e.keyCode);}},onPressKeyWithCtrl:function onPressKeyWithCtrl(e){var keys={KeyCode_c:99,KeyCode_C:67,KeyCode_V:86,KeyCode_v:118};var rowIdx=this.state.selected.rowIdx;var row=this.props.rowGetter(rowIdx);var idx=this.state.selected.idx;var col=this.getColumn(idx);if(ColumnUtils.canEdit(col,row,this.props.enableCellSelect)){if(e.keyCode===keys.KeyCode_c||e.keyCode===keys.KeyCode_C){var _value=this.getSelectedValue();this.handleCopy({value:_value});}else if(e.keyCode===keys.KeyCode_v||e.keyCode===keys.KeyCode_V){this.handlePaste();}}},onCellCommit:function onCellCommit(commit){var selected=Object.assign({},this.state.selected);selected.active=false;if(commit.key==='Tab'){selected.idx+=1;}var expandedRows=this.state.expandedRows; // if(commit.changed && commit.changed.expandedHeight){
	//   expandedRows = this.expandRow(commit.rowIdx, commit.changed.expandedHeight);
	// }
	this.setState({selected:selected,expandedRows:expandedRows});if(this.props.onRowUpdated){this.props.onRowUpdated(commit);}var targetRow=commit.rowIdx;if(this.props.onGridRowsUpdated){this.props.onGridRowsUpdated({cellKey:commit.cellKey,fromRow:targetRow,toRow:targetRow,updated:commit.updated,action:'cellUpdate'});}},onDragStart:function onDragStart(e){var value=this.getSelectedValue();this.handleDragStart({idx:this.state.selected.idx,rowIdx:this.state.selected.rowIdx,value:value}); // need to set dummy data for FF
	if(e&&e.dataTransfer){if(e.dataTransfer.setData){e.dataTransfer.dropEffect='move';e.dataTransfer.effectAllowed='move';e.dataTransfer.setData('text/plain','dummy');}}},onToggleFilter:function onToggleFilter(){var _this2=this; // setState() does not immediately mutate this.state but creates a pending state transition.
	// Therefore if you want to do something after the state change occurs, pass it in as a callback function.
	this.setState({canFilter:!this.state.canFilter},function(){if(_this2.state.canFilter===false&&_this2.props.onClearFilters){_this2.props.onClearFilters();}});},onDragHandleDoubleClick:function onDragHandleDoubleClick(e){if(this.props.onDragHandleDoubleClick){this.props.onDragHandleDoubleClick(e);}if(this.props.onGridRowsUpdated){var cellKey=this.getColumn(e.idx).key;var updated=_defineProperty({},cellKey,e.rowData[cellKey]);this.props.onGridRowsUpdated({cellKey:cellKey,fromRow:e.rowIdx,toRow:this.props.rowsCount-1,updated:updated,action:'columnFill'});}},handleDragStart:function handleDragStart(dragged){if(!this.dragEnabled()){return;}var idx=dragged.idx;var rowIdx=dragged.rowIdx;if(idx>=0&&rowIdx>=0&&idx<this.getSize()&&rowIdx<this.props.rowsCount){this.setState({dragged:dragged});}},handleDragEnd:function handleDragEnd(){if(!this.dragEnabled()){return;}var fromRow=void 0;var toRow=void 0;var selected=this.state.selected;var dragged=this.state.dragged;var cellKey=this.getColumn(this.state.selected.idx).key;fromRow=selected.rowIdx<dragged.overRowIdx?selected.rowIdx:dragged.overRowIdx;toRow=selected.rowIdx>dragged.overRowIdx?selected.rowIdx:dragged.overRowIdx;if(this.props.onCellsDragged){this.props.onCellsDragged({cellKey:cellKey,fromRow:fromRow,toRow:toRow,value:dragged.value});}if(this.props.onGridRowsUpdated){var updated=_defineProperty({},cellKey,dragged.value);this.props.onGridRowsUpdated({cellKey:cellKey,fromRow:fromRow,toRow:toRow,updated:updated,action:'cellDrag'});}this.setState({dragged:{complete:true}});},handleDragEnter:function handleDragEnter(row){if(!this.dragEnabled()){return;}var dragged=this.state.dragged;dragged.overRowIdx=row;this.setState({dragged:dragged});},handleTerminateDrag:function handleTerminateDrag(){if(!this.dragEnabled()){return;}this.setState({dragged:null});},handlePaste:function handlePaste(){if(!this.copyPasteEnabled()){return;}var selected=this.state.selected;var cellKey=this.getColumn(this.state.selected.idx).key;var textToCopy=this.state.textToCopy;var toRow=selected.rowIdx;if(this.props.onCellCopyPaste){this.props.onCellCopyPaste({cellKey:cellKey,rowIdx:toRow,value:textToCopy,fromRow:this.state.copied.rowIdx,toRow:toRow});}if(this.props.onGridRowsUpdated){var updated=_defineProperty({},cellKey,textToCopy);this.props.onGridRowsUpdated({cellKey:cellKey,fromRow:toRow,toRow:toRow,updated:updated,action:'copyPaste'});}this.setState({copied:null});},handleCopy:function handleCopy(args){if(!this.copyPasteEnabled()){return;}var textToCopy=args.value;var selected=this.state.selected;var copied={idx:selected.idx,rowIdx:selected.rowIdx};this.setState({textToCopy:textToCopy,copied:copied});},handleSort:function handleSort(columnKey,direction){this.setState({sortDirection:direction,sortColumn:columnKey},function(){this.props.onGridSort(columnKey,direction);});},getSelectedRow:function getSelectedRow(rows,key){var _this3=this;var selectedRow=rows.filter(function(r){if(r[_this3.props.rowKey]===key){return true;}return false;});if(selectedRow.length>0){return selectedRow[0];}}, // columnKey not used here as this function will select the whole row,
	// but needed to match the function signature in the CheckboxEditor
	handleRowSelect:function handleRowSelect(rowIdx,columnKey,rowData,e){e.stopPropagation();var selectedRows=this.props.enableRowSelect==='single'?[]:this.state.selectedRows.slice(0);var selectedRow=this.getSelectedRow(selectedRows,rowData[this.props.rowKey]);if(selectedRow){selectedRow.isSelected=!selectedRow.isSelected;}else {rowData.isSelected=true;selectedRows.push(rowData);}this.setState({selectedRows:selectedRows,selected:{rowIdx:rowIdx,idx:0}});if(this.props.onRowSelect){this.props.onRowSelect(selectedRows.filter(function(r){return r.isSelected===true;}));}},handleCheckboxChange:function handleCheckboxChange(e){var allRowsSelected=void 0;if(e.currentTarget instanceof HTMLInputElement&&e.currentTarget.checked===true){allRowsSelected=true;}else {allRowsSelected=false;}var selectedRows=[];for(var i=0;i<this.props.rowsCount;i++){var row=Object.assign({},this.props.rowGetter(i),{isSelected:allRowsSelected});selectedRows.push(row);}this.setState({selectedRows:selectedRows});if(typeof this.props.onRowSelect==='function'){this.props.onRowSelect(selectedRows.filter(function(r){return r.isSelected===true;}));}},getScrollOffSet:function getScrollOffSet(){var scrollOffset=0;var canvas=ReactDOM.findDOMNode(this).querySelector('.react-grid-Canvas');if(canvas){scrollOffset=canvas.offsetWidth-canvas.clientWidth;}this.setState({scrollOffset:scrollOffset});},getRowOffsetHeight:function getRowOffsetHeight(){var offsetHeight=0;this.getHeaderRows().forEach(function(row){return offsetHeight+=parseFloat(row.height,10);});return offsetHeight;},getHeaderRows:function getHeaderRows(){var rows=[{ref:'row',height:this.props.headerRowHeight||this.props.rowHeight,rowType:'header'}];if(this.state.canFilter===true){rows.push({ref:'filterRow',filterable:true,onFilterChange:this.props.onAddFilter,height:45,rowType:'filter'});}return rows;},getInitialSelectedRows:function getInitialSelectedRows(){var selectedRows=[];for(var i=0;i<this.props.rowsCount;i++){selectedRows.push(false);}return selectedRows;},getSelectedValue:function getSelectedValue(){var rowIdx=this.state.selected.rowIdx;var idx=this.state.selected.idx;var cellKey=this.getColumn(idx).key;var row=this.props.rowGetter(rowIdx);return RowUtils.get(row,cellKey);},moveSelectedCell:function moveSelectedCell(e,rowDelta,cellDelta){ // we need to prevent default as we control grid scroll
	// otherwise it moves every time you left/right which is janky
	e.preventDefault();var rowIdx=void 0;var idx=void 0;var cellNavigationMode=this.props.cellNavigationMode;if(cellNavigationMode!=='none'){var _calculateNextSelecti=this.calculateNextSelectionPosition(cellNavigationMode,cellDelta,rowDelta);idx=_calculateNextSelecti.idx;rowIdx=_calculateNextSelecti.rowIdx;}else {rowIdx=this.state.selected.rowIdx+rowDelta;idx=this.state.selected.idx+cellDelta;}this.onSelect({idx:idx,rowIdx:rowIdx});},getNbrColumns:function getNbrColumns(){var _props=this.props;var columns=_props.columns;var enableRowSelect=_props.enableRowSelect;return enableRowSelect?columns.length+1:columns.length;},calculateNextSelectionPosition:function calculateNextSelectionPosition(cellNavigationMode,cellDelta,rowDelta){var _rowDelta=rowDelta;var idx=this.state.selected.idx+cellDelta;var nbrColumns=this.getNbrColumns();if(cellDelta>0){if(this.isAtLastCellInRow(nbrColumns)){if(cellNavigationMode==='changeRow'){_rowDelta=this.isAtLastRow()?rowDelta:rowDelta+1;idx=this.isAtLastRow()?idx:0;}else {idx=0;}}}else if(cellDelta<0){if(this.isAtFirstCellInRow()){if(cellNavigationMode==='changeRow'){_rowDelta=this.isAtFirstRow()?rowDelta:rowDelta-1;idx=this.isAtFirstRow()?0:nbrColumns-1;}else {idx=nbrColumns-1;}}}var rowIdx=this.state.selected.rowIdx+_rowDelta;return {idx:idx,rowIdx:rowIdx};},isAtLastCellInRow:function isAtLastCellInRow(nbrColumns){return this.state.selected.idx===nbrColumns-1;},isAtLastRow:function isAtLastRow(){return this.state.selected.rowIdx===this.props.rowsCount-1;},isAtFirstCellInRow:function isAtFirstCellInRow(){return this.state.selected.idx===0;},isAtFirstRow:function isAtFirstRow(){return this.state.selected.rowIdx===0;},openCellEditor:function openCellEditor(rowIdx,idx){var _this4=this;var row=this.props.rowGetter(rowIdx);var col=this.getColumn(idx);if(!ColumnUtils.canEdit(col,row,this.props.enableCellSelect)){return;}var selected={rowIdx:rowIdx,idx:idx};if(this.hasSelectedCellChanged(selected)){this.setState({selected:selected},function(){_this4.setActive('Enter');});}else {this.setActive('Enter');}},setActive:function setActive(keyPressed){var rowIdx=this.state.selected.rowIdx;var row=this.props.rowGetter(rowIdx);var idx=this.state.selected.idx;var col=this.getColumn(idx);if(ColumnUtils.canEdit(col,row,this.props.enableCellSelect)&&!this.isActive()){var _selected=Object.assign(this.state.selected,{idx:idx,rowIdx:rowIdx,active:true,initialKeyCode:keyPressed});this.setState({selected:_selected});}},setInactive:function setInactive(){var rowIdx=this.state.selected.rowIdx;var row=this.props.rowGetter(rowIdx);var idx=this.state.selected.idx;var col=this.getColumn(idx);if(ColumnUtils.canEdit(col,row,this.props.enableCellSelect)&&this.isActive()){var _selected2=Object.assign(this.state.selected,{idx:idx,rowIdx:rowIdx,active:false});this.setState({selected:_selected2});}},isActive:function isActive(){return this.state.selected.active===true;},setupGridColumns:function setupGridColumns(){var props=arguments.length<=0||arguments[0]===undefined?this.props:arguments[0];var cols=props.columns.slice(0);var unshiftedCols={};if(props.enableRowSelect){var headerRenderer=props.enableRowSelect==='single'?null:React.createElement('div',{className:'react-grid-checkbox-container'},React.createElement('input',{className:'react-grid-checkbox',type:'checkbox',name:'select-all-checkbox',onChange:this.handleCheckboxChange}),React.createElement('label',{htmlFor:'select-all-checkbox',className:'react-grid-checkbox-label'}));var selectColumn={key:'select-row',name:'',formatter:React.createElement(CheckboxEditor,null),onCellChange:this.handleRowSelect,filterable:false,headerRenderer:headerRenderer,width:60,locked:true,getRowMetaData:function getRowMetaData(rowData){return rowData;}};unshiftedCols=cols.unshift(selectColumn);cols=unshiftedCols>0?cols:unshiftedCols;}return cols;},copyPasteEnabled:function copyPasteEnabled(){return this.props.onCellCopyPaste!==null;},dragEnabled:function dragEnabled(){return this.props.onCellsDragged!==null;},renderToolbar:function renderToolbar(){var Toolbar=this.props.toolbar;if(React.isValidElement(Toolbar)){return React.cloneElement(Toolbar,{onToggleFilter:this.onToggleFilter,numberOfRows:this.props.rowsCount});}},render:function render(){var cellMetaData={selected:this.state.selected,dragged:this.state.dragged,onCellClick:this.onCellClick,onCellContextMenu:this.onCellContextMenu,onCellDoubleClick:this.onCellDoubleClick,onCommit:this.onCellCommit,onCommitCancel:this.setInactive,copied:this.state.copied,handleDragEnterRow:this.handleDragEnter,handleTerminateDrag:this.handleTerminateDrag,onDragHandleDoubleClick:this.onDragHandleDoubleClick,enableCellSelect:this.props.enableCellSelect,onColumnEvent:this.onColumnEvent,openCellEditor:this.openCellEditor};var toolbar=this.renderToolbar();var containerWidth=this.props.minWidth||this.DOMMetrics.gridWidth();var gridWidth=containerWidth-this.state.scrollOffset; // depending on the current lifecycle stage, gridWidth() may not initialize correctly
	// this also handles cases where it always returns undefined -- such as when inside a div with display:none
	// eg Bootstrap tabs and collapses
	if(typeof containerWidth==='undefined'||isNaN(containerWidth)||containerWidth===0){containerWidth='100%';}if(typeof gridWidth==='undefined'||isNaN(gridWidth)||gridWidth===0){gridWidth='100%';}return React.createElement('div',{className:'react-grid-Container',style:{width:containerWidth}},toolbar,React.createElement('div',{className:'react-grid-Main'},React.createElement(BaseGrid,_extends({ref:'base'},this.props,{rowKey:this.props.rowKey,headerRows:this.getHeaderRows(),columnMetrics:this.state.columnMetrics,rowGetter:this.props.rowGetter,rowsCount:this.props.rowsCount,rowHeight:this.props.rowHeight,cellMetaData:cellMetaData,selectedRows:this.state.selectedRows.filter(function(r){return r.isSelected===true;}),expandedRows:this.state.expandedRows,rowOffsetHeight:this.getRowOffsetHeight(),sortColumn:this.state.sortColumn,sortDirection:this.state.sortDirection,onSort:this.handleSort,minHeight:this.props.minHeight,totalWidth:gridWidth,onViewportKeydown:this.onKeyDown,onViewportDragStart:this.onDragStart,onViewportDragEnd:this.handleDragEnd,onViewportDoubleClick:this.onViewportDoubleClick,onColumnResize:this.onColumnResize,rowScrollTimeout:this.props.rowScrollTimeout,contextMenu:this.props.contextMenu}))));}});module.exports=ReactDataGrid; /***/}, /* 2 */ /***/function(module,exports){module.exports=__WEBPACK_EXTERNAL_MODULE_2__; /***/}, /* 3 */ /***/function(module,exports){module.exports=__WEBPACK_EXTERNAL_MODULE_3__; /***/}, /* 4 */ /***/function(module,exports,__webpack_require__){'use strict';var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var React=__webpack_require__(2);var PropTypes=React.PropTypes;var Header=__webpack_require__(5);var Viewport=__webpack_require__(21);var GridScrollMixin=__webpack_require__(98);var DOMMetrics=__webpack_require__(97);var cellMetaDataShape=__webpack_require__(94);var Grid=React.createClass({displayName:'Grid',propTypes:{rowGetter:PropTypes.oneOfType([PropTypes.array,PropTypes.func]).isRequired,columns:PropTypes.oneOfType([PropTypes.array,PropTypes.object]),columnMetrics:PropTypes.object,minHeight:PropTypes.number,totalWidth:PropTypes.oneOfType([PropTypes.number,PropTypes.string]),headerRows:PropTypes.oneOfType([PropTypes.array,PropTypes.func]),rowHeight:PropTypes.number,rowRenderer:PropTypes.func,emptyRowsView:PropTypes.func,expandedRows:PropTypes.oneOfType([PropTypes.array,PropTypes.func]),selectedRows:PropTypes.oneOfType([PropTypes.array,PropTypes.func]),rowsCount:PropTypes.number,onRows:PropTypes.func,sortColumn:React.PropTypes.string,sortDirection:React.PropTypes.oneOf(['ASC','DESC','NONE']),rowOffsetHeight:PropTypes.number.isRequired,onViewportKeydown:PropTypes.func.isRequired,onViewportDragStart:PropTypes.func.isRequired,onViewportDragEnd:PropTypes.func.isRequired,onViewportDoubleClick:PropTypes.func.isRequired,onColumnResize:PropTypes.func,onSort:PropTypes.func,cellMetaData:PropTypes.shape(cellMetaDataShape),rowKey:PropTypes.string.isRequired,rowScrollTimeout:PropTypes.number,contextMenu:PropTypes.element},mixins:[GridScrollMixin,DOMMetrics.MetricsComputatorMixin],getDefaultProps:function getDefaultProps(){return {rowHeight:35,minHeight:350};},getStyle:function getStyle(){return {overflow:'hidden',outline:0,position:'relative',minHeight:this.props.minHeight};},render:function render(){var headerRows=this.props.headerRows||[{ref:'row'}];var EmptyRowsView=this.props.emptyRowsView;return React.createElement('div',_extends({},this.props,{style:this.getStyle(),className:'react-grid-Grid'}),React.createElement(Header,{ref:'header',columnMetrics:this.props.columnMetrics,onColumnResize:this.props.onColumnResize,height:this.props.rowHeight,totalWidth:this.props.totalWidth,headerRows:headerRows,sortColumn:this.props.sortColumn,sortDirection:this.props.sortDirection,onSort:this.props.onSort,onScroll:this.onHeaderScroll}),this.props.rowsCount>=1||this.props.rowsCount===0&&!this.props.emptyRowsView?React.createElement('div',{ref:'viewPortContainer',onKeyDown:this.props.onViewportKeydown,onDoubleClick:this.props.onViewportDoubleClick,onDragStart:this.props.onViewportDragStart,onDragEnd:this.props.onViewportDragEnd},React.createElement(Viewport,{ref:'viewport',rowKey:this.props.rowKey,width:this.props.columnMetrics.width,rowHeight:this.props.rowHeight,rowRenderer:this.props.rowRenderer,rowGetter:this.props.rowGetter,rowsCount:this.props.rowsCount,selectedRows:this.props.selectedRows,expandedRows:this.props.expandedRows,columnMetrics:this.props.columnMetrics,totalWidth:this.props.totalWidth,onScroll:this.onScroll,onRows:this.props.onRows,cellMetaData:this.props.cellMetaData,rowOffsetHeight:this.props.rowOffsetHeight||this.props.rowHeight*headerRows.length,minHeight:this.props.minHeight,rowScrollTimeout:this.props.rowScrollTimeout,contextMenu:this.props.contextMenu})):React.createElement('div',{ref:'emptyView',className:'react-grid-Empty'},React.createElement(EmptyRowsView,null)));}});module.exports=Grid; /***/}, /* 5 */ /***/function(module,exports,__webpack_require__){'use strict';var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var React=__webpack_require__(2);var ReactDOM=__webpack_require__(3);var joinClasses=__webpack_require__(6);var shallowCloneObject=__webpack_require__(7);var ColumnMetrics=__webpack_require__(8);var ColumnUtils=__webpack_require__(10);var HeaderRow=__webpack_require__(12);var PropTypes=React.PropTypes;var Header=React.createClass({displayName:'Header',propTypes:{columnMetrics:PropTypes.shape({width:PropTypes.number.isRequired,columns:PropTypes.any}).isRequired,totalWidth:PropTypes.oneOfType([PropTypes.number,PropTypes.string]),height:PropTypes.number.isRequired,headerRows:PropTypes.array.isRequired,sortColumn:PropTypes.string,sortDirection:PropTypes.oneOf(['ASC','DESC','NONE']),onSort:PropTypes.func,onColumnResize:PropTypes.func,onScroll:PropTypes.func},getInitialState:function getInitialState(){return {resizing:null};},componentWillReceiveProps:function componentWillReceiveProps(){this.setState({resizing:null});},shouldComponentUpdate:function shouldComponentUpdate(nextProps,nextState){var update=!ColumnMetrics.sameColumns(this.props.columnMetrics.columns,nextProps.columnMetrics.columns,ColumnMetrics.sameColumn)||this.props.totalWidth!==nextProps.totalWidth||this.props.headerRows.length!==nextProps.headerRows.length||this.state.resizing!==nextState.resizing||this.props.sortColumn!==nextProps.sortColumn||this.props.sortDirection!==nextProps.sortDirection;return update;},onColumnResize:function onColumnResize(column,width){var state=this.state.resizing||this.props;var pos=this.getColumnPosition(column);if(pos!=null){var _resizing={columnMetrics:shallowCloneObject(state.columnMetrics)};_resizing.columnMetrics=ColumnMetrics.resizeColumn(_resizing.columnMetrics,pos,width); // we don't want to influence scrollLeft while resizing
	if(_resizing.columnMetrics.totalWidth<state.columnMetrics.totalWidth){_resizing.columnMetrics.totalWidth=state.columnMetrics.totalWidth;}_resizing.column=ColumnUtils.getColumn(_resizing.columnMetrics.columns,pos);this.setState({resizing:_resizing});}},onColumnResizeEnd:function onColumnResizeEnd(column,width){var pos=this.getColumnPosition(column);if(pos!==null&&this.props.onColumnResize){this.props.onColumnResize(pos,width||column.width);}},getHeaderRows:function getHeaderRows(){var _this=this;var columnMetrics=this.getColumnMetrics();var resizeColumn=void 0;if(this.state.resizing){resizeColumn=this.state.resizing.column;}var headerRows=[];this.props.headerRows.forEach(function(row,index){var headerRowStyle={position:'absolute',top:_this.getCombinedHeaderHeights(index),left:0,width:_this.props.totalWidth,overflow:'hidden'};headerRows.push(React.createElement(HeaderRow,{key:row.ref,ref:row.ref,rowType:row.rowType,style:headerRowStyle,onColumnResize:_this.onColumnResize,onColumnResizeEnd:_this.onColumnResizeEnd,width:columnMetrics.width,height:row.height||_this.props.height,columns:columnMetrics.columns,resizing:resizeColumn,filterable:row.filterable,onFilterChange:row.onFilterChange,sortColumn:_this.props.sortColumn,sortDirection:_this.props.sortDirection,onSort:_this.props.onSort,onScroll:_this.props.onScroll}));});return headerRows;},getColumnMetrics:function getColumnMetrics(){var columnMetrics=void 0;if(this.state.resizing){columnMetrics=this.state.resizing.columnMetrics;}else {columnMetrics=this.props.columnMetrics;}return columnMetrics;},getColumnPosition:function getColumnPosition(column){var columnMetrics=this.getColumnMetrics();var pos=-1;columnMetrics.columns.forEach(function(c,idx){if(c.key===column.key){pos=idx;}});return pos===-1?null:pos;},getCombinedHeaderHeights:function getCombinedHeaderHeights(until){var stopAt=this.props.headerRows.length;if(typeof until!=='undefined'){stopAt=until;}var height=0;for(var index=0;index<stopAt;index++){height+=this.props.headerRows[index].height||this.props.height;}return height;},getStyle:function getStyle(){return {position:'relative',height:this.getCombinedHeaderHeights(),overflow:'hidden'};},setScrollLeft:function setScrollLeft(scrollLeft){var node=ReactDOM.findDOMNode(this.refs.row);node.scrollLeft=scrollLeft;this.refs.row.setScrollLeft(scrollLeft);if(this.refs.filterRow){var nodeFilters=ReactDOM.findDOMNode(this.refs.filterRow);nodeFilters.scrollLeft=scrollLeft;this.refs.filterRow.setScrollLeft(scrollLeft);}},render:function render(){var className=joinClasses({'react-grid-Header':true,'react-grid-Header--resizing':!!this.state.resizing});var headerRows=this.getHeaderRows();return React.createElement('div',_extends({},this.props,{style:this.getStyle(),className:className}),headerRows);}});module.exports=Header; /***/}, /* 6 */ /***/function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__; /*!
		  Copyright (c) 2015 Jed Watson.
		  Licensed under the MIT License (MIT), see
		  http://jedwatson.github.io/classnames
		*/function classNames(){var classes='';var arg;for(var i=0;i<arguments.length;i++){arg=arguments[i];if(!arg){continue;}if('string'===typeof arg||'number'===typeof arg){classes+=' '+arg;}else if(Object.prototype.toString.call(arg)==='[object Array]'){classes+=' '+classNames.apply(null,arg);}else if('object'===(typeof arg==='undefined'?'undefined':_typeof2(arg))){for(var key in arg){if(!arg.hasOwnProperty(key)||!arg[key]){continue;}classes+=' '+key;}}}return classes.substr(1);} // safely export classNames for node / browserify
	if(typeof module!=='undefined'&&module.exports){module.exports=classNames;} // safely export classNames for RequireJS
	if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__=[],__WEBPACK_AMD_DEFINE_RESULT__=function(){return classNames;}.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__),__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));} /***/}, /* 7 */ /***/function(module,exports){"use strict";function shallowCloneObject(obj){var result={};for(var k in obj){if(obj.hasOwnProperty(k)){result[k]=obj[k];}}return result;}module.exports=shallowCloneObject; /***/}, /* 8 */ /***/function(module,exports,__webpack_require__){'use strict';var shallowCloneObject=__webpack_require__(7);var sameColumn=__webpack_require__(9);var ColumnUtils=__webpack_require__(10);var getScrollbarSize=__webpack_require__(11);function setColumnWidths(columns,totalWidth){return columns.map(function(column){var colInfo=Object.assign({},column);if(column.width){if(/^([0-9]+)%$/.exec(column.width.toString())){colInfo.width=Math.floor(column.width/100*totalWidth);}}return colInfo;});}function setDefferedColumnWidths(columns,unallocatedWidth,minColumnWidth){var defferedColumns=columns.filter(function(c){return !c.width;});return columns.map(function(column){if(!column.width){if(unallocatedWidth<=0){column.width=minColumnWidth;}else {column.width=Math.floor(unallocatedWidth/ColumnUtils.getSize(defferedColumns));}}return column;});}function setColumnOffsets(columns){var left=0;return columns.map(function(column){column.left=left;left+=column.width;return column;});} /**
		 * Update column metrics calculation.
		 *
		 * @param {ColumnMetricsType} metrics
		 */function recalculate(metrics){ // compute width for columns which specify width
	var columns=setColumnWidths(metrics.columns,metrics.totalWidth);var unallocatedWidth=columns.filter(function(c){return c.width;}).reduce(function(w,column){return w-column.width;},metrics.totalWidth);unallocatedWidth-=getScrollbarSize();var width=columns.filter(function(c){return c.width;}).reduce(function(w,column){return w+column.width;},0); // compute width for columns which doesn't specify width
	columns=setDefferedColumnWidths(columns,unallocatedWidth,metrics.minColumnWidth); // compute left offset
	columns=setColumnOffsets(columns);return {columns:columns,width:width,totalWidth:metrics.totalWidth,minColumnWidth:metrics.minColumnWidth};} /**
		 * Update column metrics calculation by resizing a column.
		 *
		 * @param {ColumnMetricsType} metrics
		 * @param {Column} column
		 * @param {number} width
		 */function resizeColumn(metrics,index,width){var column=ColumnUtils.getColumn(metrics.columns,index);var metricsClone=shallowCloneObject(metrics);metricsClone.columns=metrics.columns.slice(0);var updatedColumn=shallowCloneObject(column);updatedColumn.width=Math.max(width,metricsClone.minColumnWidth);metricsClone=ColumnUtils.spliceColumn(metricsClone,index,updatedColumn);return recalculate(metricsClone);}function areColumnsImmutable(prevColumns,nextColumns){return typeof Immutable!=='undefined'&&prevColumns instanceof Immutable.List&&nextColumns instanceof Immutable.List;}function compareEachColumn(prevColumns,nextColumns,isSameColumn){var i=void 0;var len=void 0;var column=void 0;var prevColumnsByKey={};var nextColumnsByKey={};if(ColumnUtils.getSize(prevColumns)!==ColumnUtils.getSize(nextColumns)){return false;}for(i=0,len=ColumnUtils.getSize(prevColumns);i<len;i++){column=prevColumns[i];prevColumnsByKey[column.key]=column;}for(i=0,len=ColumnUtils.getSize(nextColumns);i<len;i++){column=nextColumns[i];nextColumnsByKey[column.key]=column;var prevColumn=prevColumnsByKey[column.key];if(prevColumn===undefined||!isSameColumn(prevColumn,column)){return false;}}for(i=0,len=ColumnUtils.getSize(prevColumns);i<len;i++){column=prevColumns[i];var nextColumn=nextColumnsByKey[column.key];if(nextColumn===undefined){return false;}}return true;}function sameColumns(prevColumns,nextColumns,isSameColumn){if(areColumnsImmutable(prevColumns,nextColumns)){return prevColumns===nextColumns;}return compareEachColumn(prevColumns,nextColumns,isSameColumn);}module.exports={recalculate:recalculate,resizeColumn:resizeColumn,sameColumn:sameColumn,sameColumns:sameColumns}; /***/}, /* 9 */ /***/function(module,exports,__webpack_require__){'use strict';var isValidElement=__webpack_require__(2).isValidElement;module.exports=function sameColumn(a,b){var k=void 0;for(k in a){if(a.hasOwnProperty(k)){if(typeof a[k]==='function'&&typeof b[k]==='function'||isValidElement(a[k])&&isValidElement(b[k])){continue;}if(!b.hasOwnProperty(k)||a[k]!==b[k]){return false;}}}for(k in b){if(b.hasOwnProperty(k)&&!a.hasOwnProperty(k)){return false;}}return true;}; /***/}, /* 10 */ /***/function(module,exports){'use strict';module.exports={getColumn:function getColumn(columns,idx){if(Array.isArray(columns)){return columns[idx];}else if(typeof Immutable!=='undefined'){return columns.get(idx);}},spliceColumn:function spliceColumn(metrics,idx,column){if(Array.isArray(metrics.columns)){metrics.columns.splice(idx,1,column);}else if(typeof Immutable!=='undefined'){metrics.columns=metrics.columns.splice(idx,1,column);}return metrics;},getSize:function getSize(columns){if(Array.isArray(columns)){return columns.length;}else if(typeof Immutable!=='undefined'){return columns.size;}}, // Logic extented to allow for functions to be passed down in column.editable
	// this allows us to deicde whether we can be edting from a cell level
	canEdit:function canEdit(col,rowData,enableCellSelect){if(col.editable!=null&&typeof col.editable==='function'){return enableCellSelect===true&&col.editable(rowData);}return enableCellSelect===true&&(!!col.editor||!!col.editable);}}; /***/}, /* 11 */ /***/function(module,exports){'use strict';var size=void 0;function getScrollbarSize(){if(size===undefined){var outer=document.createElement('div');outer.style.width='50px';outer.style.height='50px';outer.style.position='absolute';outer.style.top='-200px';outer.style.left='-200px';var inner=document.createElement('div');inner.style.height='100px';inner.style.width='100%';outer.appendChild(inner);document.body.appendChild(outer);var outerWidth=outer.clientWidth;outer.style.overflowY='scroll';var innerWidth=inner.clientWidth;document.body.removeChild(outer);size=outerWidth-innerWidth;}return size;}module.exports=getScrollbarSize; /***/}, /* 12 */ /***/function(module,exports,__webpack_require__){'use strict';var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var React=__webpack_require__(2);var shallowEqual=__webpack_require__(13);var HeaderCell=__webpack_require__(14);var getScrollbarSize=__webpack_require__(11);var ExcelColumn=__webpack_require__(15);var ColumnUtilsMixin=__webpack_require__(10);var SortableHeaderCell=__webpack_require__(18);var FilterableHeaderCell=__webpack_require__(19);var HeaderCellType=__webpack_require__(20);var PropTypes=React.PropTypes;var HeaderRowStyle={overflow:React.PropTypes.string,width:PropTypes.oneOfType([PropTypes.number,PropTypes.string]),height:React.PropTypes.number,position:React.PropTypes.string};var DEFINE_SORT=['ASC','DESC','NONE'];var HeaderRow=React.createClass({displayName:'HeaderRow',propTypes:{width:PropTypes.oneOfType([PropTypes.number,PropTypes.string]),height:PropTypes.number.isRequired,columns:PropTypes.oneOfType([PropTypes.array,PropTypes.object]),onColumnResize:PropTypes.func,onSort:PropTypes.func.isRequired,onColumnResizeEnd:PropTypes.func,style:PropTypes.shape(HeaderRowStyle),sortColumn:PropTypes.string,sortDirection:React.PropTypes.oneOf(DEFINE_SORT),cellRenderer:PropTypes.func,headerCellRenderer:PropTypes.func,filterable:PropTypes.bool,onFilterChange:PropTypes.func,resizing:PropTypes.object,onScroll:PropTypes.func,rowType:PropTypes.string},mixins:[ColumnUtilsMixin],shouldComponentUpdate:function shouldComponentUpdate(nextProps){return nextProps.width!==this.props.width||nextProps.height!==this.props.height||nextProps.columns!==this.props.columns||!shallowEqual(nextProps.style,this.props.style)||this.props.sortColumn!==nextProps.sortColumn||this.props.sortDirection!==nextProps.sortDirection;},getHeaderCellType:function getHeaderCellType(column){if(column.filterable){if(this.props.filterable)return HeaderCellType.FILTERABLE;}if(column.sortable)return HeaderCellType.SORTABLE;return HeaderCellType.NONE;},getFilterableHeaderCell:function getFilterableHeaderCell(){return React.createElement(FilterableHeaderCell,{onChange:this.props.onFilterChange});},getSortableHeaderCell:function getSortableHeaderCell(column){var sortDirection=this.props.sortColumn===column.key?this.props.sortDirection:DEFINE_SORT.NONE;return React.createElement(SortableHeaderCell,{columnKey:column.key,onSort:this.props.onSort,sortDirection:sortDirection});},getHeaderRenderer:function getHeaderRenderer(column){var renderer=void 0;if(column.headerRenderer){renderer=column.headerRenderer;}else {var headerCellType=this.getHeaderCellType(column);switch(headerCellType){case HeaderCellType.SORTABLE:renderer=this.getSortableHeaderCell(column);break;case HeaderCellType.FILTERABLE:renderer=this.getFilterableHeaderCell();break;default:break;}}return renderer;},getStyle:function getStyle(){return {overflow:'hidden',width:'100%',height:this.props.height,position:'absolute'};},getCells:function getCells(){var cells=[];var lockedCells=[];for(var i=0,len=this.getSize(this.props.columns);i<len;i++){var column=this.getColumn(this.props.columns,i);var _renderer=this.getHeaderRenderer(column);if(column.key==='select-row'&&this.props.rowType==='filter'){_renderer=React.createElement('div',null);}var cell=React.createElement(HeaderCell,{ref:i,key:i,height:this.props.height,column:column,renderer:_renderer,resizing:this.props.resizing===column,onResize:this.props.onColumnResize,onResizeEnd:this.props.onColumnResizeEnd});if(column.locked){lockedCells.push(cell);}else {cells.push(cell);}}return cells.concat(lockedCells);},setScrollLeft:function setScrollLeft(scrollLeft){var _this=this;this.props.columns.forEach(function(column,i){if(column.locked){_this.refs[i].setScrollLeft(scrollLeft);}});},render:function render(){var cellsStyle={width:this.props.width?this.props.width+getScrollbarSize():'100%',height:this.props.height,whiteSpace:'nowrap',overflowX:'hidden',overflowY:'hidden'};var cells=this.getCells();return React.createElement('div',_extends({},this.props,{className:'react-grid-HeaderRow',onScroll:this.props.onScroll}),React.createElement('div',{style:cellsStyle},cells));}});module.exports=HeaderRow; /***/}, /* 13 */ /***/function(module,exports){ /**
		 * Copyright 2013-2015, Facebook, Inc.
		 * All rights reserved.
		 *
		 * This source code is licensed under the BSD-style license found in the
		 * LICENSE file in the root directory of this source tree. An additional grant
		 * of patent rights can be found in the PATENTS file in the same directory.
		 *
		 * @providesModule shallowEqual
		 * @typechecks
		 * 
		 */'use strict';var hasOwnProperty=Object.prototype.hasOwnProperty; /**
		 * Performs equality by iterating through keys on an object and returning false
		 * when any key has values which are not strictly equal between the arguments.
		 * Returns true when the values of all keys are strictly equal.
		 */function shallowEqual(objA,objB){if(objA===objB){return true;}if((typeof objA==='undefined'?'undefined':_typeof2(objA))!=='object'||objA===null||(typeof objB==='undefined'?'undefined':_typeof2(objB))!=='object'||objB===null){return false;}var keysA=Object.keys(objA);var keysB=Object.keys(objB);if(keysA.length!==keysB.length){return false;} // Test for A's keys different from B.
	var bHasOwnProperty=hasOwnProperty.bind(objB);for(var i=0;i<keysA.length;i++){if(!bHasOwnProperty(keysA[i])||objA[keysA[i]]!==objB[keysA[i]]){return false;}}return true;}module.exports=shallowEqual; /***/}, /* 14 */ /***/function(module,exports,__webpack_require__){'use strict';var React=__webpack_require__(2);var ReactDOM=__webpack_require__(3);var joinClasses=__webpack_require__(6);var ExcelColumn=__webpack_require__(15);var ResizeHandle=__webpack_require__(16);var PropTypes=React.PropTypes;function simpleCellRenderer(objArgs){return React.createElement('div',{className:'widget-HeaderCell__value'},objArgs.column.name);}var HeaderCell=React.createClass({displayName:'HeaderCell',propTypes:{renderer:PropTypes.oneOfType([PropTypes.func,PropTypes.element]).isRequired,column:PropTypes.shape(ExcelColumn).isRequired,onResize:PropTypes.func.isRequired,height:PropTypes.number.isRequired,onResizeEnd:PropTypes.func.isRequired,className:PropTypes.string},getDefaultProps:function getDefaultProps(){return {renderer:simpleCellRenderer};},getInitialState:function getInitialState(){return {resizing:false};},onDragStart:function onDragStart(e){this.setState({resizing:true}); // need to set dummy data for FF
	if(e&&e.dataTransfer&&e.dataTransfer.setData)e.dataTransfer.setData('text/plain','dummy');},onDrag:function onDrag(e){var resize=this.props.onResize||null; // for flows sake, doesnt recognise a null check direct
	if(resize){var _width=this.getWidthFromMouseEvent(e);if(_width>0){resize(this.props.column,_width);}}},onDragEnd:function onDragEnd(e){var width=this.getWidthFromMouseEvent(e);this.props.onResizeEnd(this.props.column,width);this.setState({resizing:false});},getWidthFromMouseEvent:function getWidthFromMouseEvent(e){var right=e.pageX||e.touches&&e.touches[0]&&e.touches[0].pageX||e.changedTouches&&e.changedTouches[e.changedTouches.length-1].pageX;var left=ReactDOM.findDOMNode(this).getBoundingClientRect().left;return right-left;},getCell:function getCell(){if(React.isValidElement(this.props.renderer)){return React.cloneElement(this.props.renderer,{column:this.props.column,height:this.props.height});}return this.props.renderer({column:this.props.column});},getStyle:function getStyle(){return {width:this.props.column.width,left:this.props.column.left,display:'inline-block',position:'absolute',overflow:'hidden',height:this.props.height,margin:0,textOverflow:'ellipsis',whiteSpace:'nowrap'};},setScrollLeft:function setScrollLeft(scrollLeft){var node=ReactDOM.findDOMNode(this);node.style.webkitTransform='translate3d('+scrollLeft+'px, 0px, 0px)';node.style.transform='translate3d('+scrollLeft+'px, 0px, 0px)';},render:function render(){var resizeHandle=void 0;if(this.props.column.resizable){resizeHandle=React.createElement(ResizeHandle,{onDrag:this.onDrag,onDragStart:this.onDragStart,onDragEnd:this.onDragEnd});}var className=joinClasses({'react-grid-HeaderCell':true,'react-grid-HeaderCell--resizing':this.state.resizing,'react-grid-HeaderCell--locked':this.props.column.locked});className=joinClasses(className,this.props.className,this.props.column.cellClass);var cell=this.getCell();return React.createElement('div',{className:className,style:this.getStyle()},cell,resizeHandle);}});module.exports=HeaderCell; /***/}, /* 15 */ /***/function(module,exports,__webpack_require__){'use strict';var React=__webpack_require__(2);var ExcelColumnShape={name:React.PropTypes.node.isRequired,key:React.PropTypes.string.isRequired,width:React.PropTypes.number.isRequired,filterable:React.PropTypes.bool};module.exports=ExcelColumnShape; /***/}, /* 16 */ /***/function(module,exports,__webpack_require__){'use strict';var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var React=__webpack_require__(2);var Draggable=__webpack_require__(17);var ResizeHandle=React.createClass({displayName:'ResizeHandle',style:{position:'absolute',top:0,right:0,width:6,height:'100%'},render:function render(){return React.createElement(Draggable,_extends({},this.props,{className:'react-grid-HeaderCell__resizeHandle',style:this.style}));}});module.exports=ResizeHandle; /***/}, /* 17 */ /***/function(module,exports,__webpack_require__){'use strict';var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var React=__webpack_require__(2);var PropTypes=React.PropTypes;var Draggable=React.createClass({displayName:'Draggable',propTypes:{onDragStart:PropTypes.func,onDragEnd:PropTypes.func,onDrag:PropTypes.func,component:PropTypes.oneOfType([PropTypes.func,PropTypes.constructor])},getDefaultProps:function getDefaultProps(){return {onDragStart:function onDragStart(){return true;},onDragEnd:function onDragEnd(){},onDrag:function onDrag(){}};},getInitialState:function getInitialState(){return {drag:null};},componentWillUnmount:function componentWillUnmount(){this.cleanUp();},onMouseDown:function onMouseDown(e){var drag=this.props.onDragStart(e);if(drag===null&&e.button!==0){return;}window.addEventListener('mouseup',this.onMouseUp);window.addEventListener('mousemove',this.onMouseMove);window.addEventListener('touchend',this.onMouseUp);window.addEventListener('touchmove',this.onMouseMove);this.setState({drag:drag});},onMouseMove:function onMouseMove(e){if(this.state.drag===null){return;}if(e.preventDefault){e.preventDefault();}this.props.onDrag(e);},onMouseUp:function onMouseUp(e){this.cleanUp();this.props.onDragEnd(e,this.state.drag);this.setState({drag:null});},cleanUp:function cleanUp(){window.removeEventListener('mouseup',this.onMouseUp);window.removeEventListener('mousemove',this.onMouseMove);window.removeEventListener('touchend',this.onMouseUp);window.removeEventListener('touchmove',this.onMouseMove);},render:function render(){return React.createElement('div',_extends({},this.props,{onMouseDown:this.onMouseDown,onTouchStart:this.onMouseDown,className:'react-grid-HeaderCell__draggable'}));}});module.exports=Draggable; /***/}, /* 18 */ /***/function(module,exports,__webpack_require__){'use strict';var React=__webpack_require__(2);var joinClasses=__webpack_require__(6);var DEFINE_SORT={ASC:'ASC',DESC:'DESC',NONE:'NONE'};var SortableHeaderCell=React.createClass({displayName:'SortableHeaderCell',propTypes:{columnKey:React.PropTypes.string.isRequired,column:React.PropTypes.shape({name:React.PropTypes.node}),onSort:React.PropTypes.func.isRequired,sortDirection:React.PropTypes.oneOf(['ASC','DESC','NONE'])},onClick:function onClick(){var direction=void 0;switch(this.props.sortDirection){default:case null:case undefined:case DEFINE_SORT.NONE:direction=DEFINE_SORT.ASC;break;case DEFINE_SORT.ASC:direction=DEFINE_SORT.DESC;break;case DEFINE_SORT.DESC:direction=DEFINE_SORT.NONE;break;}this.props.onSort(this.props.columnKey,direction);},getSortByText:function getSortByText(){var unicodeKeys={ASC:'9650',DESC:'9660',NONE:''};return String.fromCharCode(unicodeKeys[this.props.sortDirection]);},render:function render(){var className=joinClasses({'react-grid-HeaderCell-sortable':true,'react-grid-HeaderCell-sortable--ascending':this.props.sortDirection==='ASC','react-grid-HeaderCell-sortable--descending':this.props.sortDirection==='DESC'});return React.createElement('div',{className:className,onClick:this.onClick,style:{cursor:'pointer'}},this.props.column.name,React.createElement('span',{className:'pull-right'},this.getSortByText()));}});module.exports=SortableHeaderCell; /***/}, /* 19 */ /***/function(module,exports,__webpack_require__){'use strict';var React=__webpack_require__(2);var ExcelColumn=__webpack_require__(15);var FilterableHeaderCell=React.createClass({displayName:'FilterableHeaderCell',propTypes:{onChange:React.PropTypes.func.isRequired,column:React.PropTypes.shape(ExcelColumn)},getInitialState:function getInitialState(){return {filterTerm:''};},handleChange:function handleChange(e){var val=e.target.value;this.setState({filterTerm:val});this.props.onChange({filterTerm:val,columnKey:this.props.column.key});},renderInput:function renderInput(){if(this.props.column.filterable===false){return React.createElement('span',null);}var inputKey='header-filter-'+this.props.column.key;return React.createElement('input',{key:inputKey,type:'text',className:'form-control input-sm',placeholder:'Search',value:this.state.filterTerm,onChange:this.handleChange});},render:function render(){return React.createElement('div',null,React.createElement('div',{className:'form-group'},this.renderInput()));}});module.exports=FilterableHeaderCell; /***/}, /* 20 */ /***/function(module,exports){"use strict";var HeaderCellType={SORTABLE:0,FILTERABLE:1,NONE:2,CHECKBOX:3};module.exports=HeaderCellType; /***/}, /* 21 */ /***/function(module,exports,__webpack_require__){'use strict';var React=__webpack_require__(2);var Canvas=__webpack_require__(22);var ViewportScroll=__webpack_require__(96);var cellMetaDataShape=__webpack_require__(94);var PropTypes=React.PropTypes;var Viewport=React.createClass({displayName:'Viewport',mixins:[ViewportScroll],propTypes:{rowOffsetHeight:PropTypes.number.isRequired,totalWidth:PropTypes.oneOfType([PropTypes.number,PropTypes.string]).isRequired,columnMetrics:PropTypes.object.isRequired,rowGetter:PropTypes.oneOfType([PropTypes.array,PropTypes.func]).isRequired,selectedRows:PropTypes.array,expandedRows:PropTypes.array,rowRenderer:PropTypes.func,rowsCount:PropTypes.number.isRequired,rowHeight:PropTypes.number.isRequired,onRows:PropTypes.func,onScroll:PropTypes.func,minHeight:PropTypes.number,cellMetaData:PropTypes.shape(cellMetaDataShape),rowKey:PropTypes.string.isRequired,rowScrollTimeout:PropTypes.number,contextMenu:PropTypes.element},onScroll:function onScroll(scroll){this.updateScroll(scroll.scrollTop,scroll.scrollLeft,this.state.height,this.props.rowHeight,this.props.rowsCount);if(this.props.onScroll){this.props.onScroll({scrollTop:scroll.scrollTop,scrollLeft:scroll.scrollLeft});}},getScroll:function getScroll(){return this.refs.canvas.getScroll();},setScrollLeft:function setScrollLeft(scrollLeft){this.refs.canvas.setScrollLeft(scrollLeft);},render:function render(){var style={padding:0,bottom:0,left:0,right:0,overflow:'hidden',position:'absolute',top:this.props.rowOffsetHeight};return React.createElement('div',{className:'react-grid-Viewport',style:style},React.createElement(Canvas,{ref:'canvas',rowKey:this.props.rowKey,totalWidth:this.props.totalWidth,width:this.props.columnMetrics.width,rowGetter:this.props.rowGetter,rowsCount:this.props.rowsCount,selectedRows:this.props.selectedRows,expandedRows:this.props.expandedRows,columns:this.props.columnMetrics.columns,rowRenderer:this.props.rowRenderer,displayStart:this.state.displayStart,displayEnd:this.state.displayEnd,cellMetaData:this.props.cellMetaData,height:this.state.height,rowHeight:this.props.rowHeight,onScroll:this.onScroll,onRows:this.props.onRows,rowScrollTimeout:this.props.rowScrollTimeout,contextMenu:this.props.contextMenu}));}});module.exports=Viewport; /***/}, /* 22 */ /***/function(module,exports,__webpack_require__){'use strict';var _shallowEqual=__webpack_require__(13);var _shallowEqual2=_interopRequireDefault(_shallowEqual);var _RowsContainer=__webpack_require__(23);var _RowsContainer2=_interopRequireDefault(_RowsContainer);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var React=__webpack_require__(2);var ReactDOM=__webpack_require__(3);var joinClasses=__webpack_require__(6);var PropTypes=React.PropTypes;var ScrollShim=__webpack_require__(86);var Row=__webpack_require__(87);var cellMetaDataShape=__webpack_require__(94);var Canvas=React.createClass({displayName:'Canvas',mixins:[ScrollShim],propTypes:{rowRenderer:PropTypes.oneOfType([PropTypes.func,PropTypes.element]),rowHeight:PropTypes.number.isRequired,height:PropTypes.number.isRequired,width:PropTypes.number,totalWidth:PropTypes.oneOfType([PropTypes.number,PropTypes.string]),style:PropTypes.string,className:PropTypes.string,displayStart:PropTypes.number.isRequired,displayEnd:PropTypes.number.isRequired,rowsCount:PropTypes.number.isRequired,rowGetter:PropTypes.oneOfType([PropTypes.func.isRequired,PropTypes.array.isRequired]),expandedRows:PropTypes.array,onRows:PropTypes.func,onScroll:PropTypes.func,columns:PropTypes.oneOfType([PropTypes.object,PropTypes.array]).isRequired,cellMetaData:PropTypes.shape(cellMetaDataShape).isRequired,selectedRows:PropTypes.array,rowKey:React.PropTypes.string,rowScrollTimeout:React.PropTypes.number,contextMenu:PropTypes.element},getDefaultProps:function getDefaultProps(){return {rowRenderer:Row,onRows:function onRows(){},selectedRows:[],rowScrollTimeout:0};},getInitialState:function getInitialState(){return {displayStart:this.props.displayStart,displayEnd:this.props.displayEnd,scrollingTimeout:null};},componentWillMount:function componentWillMount(){this._currentRowsLength=0;this._currentRowsRange={start:0,end:0};this._scroll={scrollTop:0,scrollLeft:0};},componentDidMount:function componentDidMount(){this.onRows();},componentWillReceiveProps:function componentWillReceiveProps(nextProps){if(nextProps.displayStart!==this.state.displayStart||nextProps.displayEnd!==this.state.displayEnd){this.setState({displayStart:nextProps.displayStart,displayEnd:nextProps.displayEnd});}},shouldComponentUpdate:function shouldComponentUpdate(nextProps,nextState){var shouldUpdate=nextState.displayStart!==this.state.displayStart||nextState.displayEnd!==this.state.displayEnd||nextState.scrollingTimeout!==this.state.scrollingTimeout||nextProps.rowsCount!==this.props.rowsCount||nextProps.rowHeight!==this.props.rowHeight||nextProps.columns!==this.props.columns||nextProps.width!==this.props.width||nextProps.cellMetaData!==this.props.cellMetaData||!(0,_shallowEqual2['default'])(nextProps.style,this.props.style);return shouldUpdate;},componentWillUnmount:function componentWillUnmount(){this._currentRowsLength=0;this._currentRowsRange={start:0,end:0};this._scroll={scrollTop:0,scrollLeft:0};},componentDidUpdate:function componentDidUpdate(){if(this._scroll.scrollTop!==0&&this._scroll.scrollLeft!==0){this.setScrollLeft(this._scroll.scrollLeft);}this.onRows();},onRows:function onRows(){if(this._currentRowsRange!=={start:0,end:0}){this.props.onRows(this._currentRowsRange);this._currentRowsRange={start:0,end:0};}},onScroll:function onScroll(e){var _this=this;if(ReactDOM.findDOMNode(this)!==e.target){return;}this.appendScrollShim();var scrollLeft=e.target.scrollLeft;var scrollTop=e.target.scrollTop;var scroll={scrollTop:scrollTop,scrollLeft:scrollLeft}; // check how far we have scrolled, and if this means we are being taken out of range
	var scrollYRange=Math.abs(this._scroll.scrollTop-scroll.scrollTop)/this.props.rowHeight;var scrolledOutOfRange=scrollYRange>this.props.displayEnd-this.props.displayStart;this._scroll=scroll;this.props.onScroll(scroll); // if we go out of range, we queue the actual render, just rendering cheap placeholders
	// avoiding rendering anything expensive while a user scrolls down
	if(scrolledOutOfRange&&this.props.rowScrollTimeout>0){var scrollTO=this.state.scrollingTimeout;if(scrollTO){clearTimeout(scrollTO);} // queue up, and set state to clear the TO so we render the rows (not placeholders)
	scrollTO=setTimeout(function(){if(_this.state.scrollingTimeout!==null){_this.setState({scrollingTimeout:null});}},this.props.rowScrollTimeout);this.setState({scrollingTimeout:scrollTO});}},getRows:function getRows(displayStart,displayEnd){this._currentRowsRange={start:displayStart,end:displayEnd};if(Array.isArray(this.props.rowGetter)){return this.props.rowGetter.slice(displayStart,displayEnd);}var rows=[];for(var i=displayStart;i<displayEnd;i++){rows.push(this.props.rowGetter(i));}return rows;},getScrollbarWidth:function getScrollbarWidth(){var scrollbarWidth=0; // Get the scrollbar width
	var canvas=ReactDOM.findDOMNode(this);scrollbarWidth=canvas.offsetWidth-canvas.clientWidth;return scrollbarWidth;},getScroll:function getScroll(){var _ReactDOM$findDOMNode=ReactDOM.findDOMNode(this);var scrollTop=_ReactDOM$findDOMNode.scrollTop;var scrollLeft=_ReactDOM$findDOMNode.scrollLeft;return {scrollTop:scrollTop,scrollLeft:scrollLeft};},isRowSelected:function isRowSelected(row){var _this2=this;var selectedRows=this.props.selectedRows.filter(function(r){var rowKeyValue=row.get?row.get(_this2.props.rowKey):row[_this2.props.rowKey];return r[_this2.props.rowKey]===rowKeyValue;});return selectedRows.length>0&&selectedRows[0].isSelected;},_currentRowsLength:0,_currentRowsRange:{start:0,end:0},_scroll:{scrollTop:0,scrollLeft:0},setScrollLeft:function setScrollLeft(scrollLeft){if(this._currentRowsLength!==0){if(!this.refs)return;for(var i=0,len=this._currentRowsLength;i<len;i++){if(this.refs[i]&&this.refs[i].setScrollLeft){this.refs[i].setScrollLeft(scrollLeft);}}}},renderRow:function renderRow(props){if(this.state.scrollingTimeout!==null){ // in the midst of a rapid scroll, so we render placeholders
	// the actual render is then queued (through a timeout)
	// this avoids us redering a bunch of rows that a user is trying to scroll past
	return this.renderScrollingPlaceholder(props);}var RowsRenderer=this.props.rowRenderer;if(typeof RowsRenderer==='function'){return React.createElement(RowsRenderer,props);}if(React.isValidElement(this.props.rowRenderer)){return React.cloneElement(this.props.rowRenderer,props);}},renderScrollingPlaceholder:function renderScrollingPlaceholder(props){ // here we are just rendering empty cells
	// we may want to allow a user to inject this, and/or just render the cells that are in view
	// for now though we essentially are doing a (very lightweight) row + cell with empty content
	var styles={row:{height:props.height,overflow:'hidden'},cell:{height:props.height,position:'absolute'},placeholder:{backgroundColor:'rgba(211, 211, 211, 0.45)',width:'60%',height:Math.floor(props.height*0.3)}};return React.createElement('div',{key:props.key,style:styles.row,className:'react-grid-Row'},this.props.columns.map(function(col,idx){return React.createElement('div',{style:Object.assign(styles.cell,{width:col.width,left:col.left}),key:idx,className:'react-grid-Cell'},React.createElement('div',{style:Object.assign(styles.placeholder,{width:Math.floor(col.width*0.6)})}));}));},renderPlaceholder:function renderPlaceholder(key,height){ // just renders empty cells
	// if we wanted to show gridlines, we'd need classes and position as with renderScrollingPlaceholder
	return React.createElement('div',{key:key,style:{height:height}},this.props.columns.map(function(column,idx){return React.createElement('div',{style:{width:column.width},key:idx});}));},render:function render(){var _this3=this;var displayStart=this.state.displayStart;var displayEnd=this.state.displayEnd;var rowHeight=this.props.rowHeight;var length=this.props.rowsCount;var rows=this.getRows(displayStart,displayEnd).map(function(row,idx){return _this3.renderRow({key:displayStart+idx,ref:idx,idx:displayStart+idx,row:row,height:rowHeight,columns:_this3.props.columns,isSelected:_this3.isRowSelected(row),expandedRows:_this3.props.expandedRows,cellMetaData:_this3.props.cellMetaData});});this._currentRowsLength=rows.length;if(displayStart>0){rows.unshift(this.renderPlaceholder('top',displayStart*rowHeight));}if(length-displayEnd>0){rows.push(this.renderPlaceholder('bottom',(length-displayEnd)*rowHeight));}var style={position:'absolute',top:0,left:0,overflowX:'auto',overflowY:'scroll',width:this.props.totalWidth,height:this.props.height,transform:'translate3d(0, 0, 0)'};return React.createElement('div',{style:style,onScroll:this.onScroll,className:joinClasses('react-grid-Canvas',this.props.className,{opaque:this.props.cellMetaData.selected&&this.props.cellMetaData.selected.active})},React.createElement(_RowsContainer2['default'],{width:this.props.width,rows:rows,contextMenu:this.props.contextMenu,rowIdx:this.props.cellMetaData.selected.rowIdx,idx:this.props.cellMetaData.selected.idx}));}});module.exports=Canvas; /***/}, /* 23 */ /***/function(module,exports,__webpack_require__){'use strict';Object.defineProperty(exports,"__esModule",{value:true});exports.ContextMenuRowsContainer=exports.SimpleRowsContainer=undefined;var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=__webpack_require__(2);var _react2=_interopRequireDefault(_react);var _reactContextmenu=__webpack_require__(24);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==='undefined'?'undefined':_typeof2(call))==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+(typeof superClass==='undefined'?'undefined':_typeof2(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var RowsContainer=function(_React$Component){_inherits(RowsContainer,_React$Component);function RowsContainer(){_classCallCheck(this,RowsContainer);return _possibleConstructorReturn(this,Object.getPrototypeOf(RowsContainer).apply(this,arguments));}_createClass(RowsContainer,[{key:'hasContextMenu',value:function hasContextMenu(){return this.props.contextMenu&&_react2['default'].isValidElement(this.props.contextMenu);}},{key:'renderRowsWithContextMenu',value:function renderRowsWithContextMenu(){var newProps={rowIdx:this.props.rowIdx,idx:this.props.idx};var contextMenu=_react2['default'].cloneElement(this.props.contextMenu,newProps);return _react2['default'].createElement('div',null,_react2['default'].createElement(ContextMenuRowsContainer,this.props),contextMenu);}},{key:'render',value:function render(){return this.hasContextMenu()?this.renderRowsWithContextMenu():_react2['default'].createElement(SimpleRowsContainer,this.props);}}]);return RowsContainer;}(_react2['default'].Component);RowsContainer.propTypes={contextMenu:_react.PropTypes.element,rowIdx:_react.PropTypes.number,idx:_react.PropTypes.number};var SimpleRowsContainer=function(_React$Component2){_inherits(SimpleRowsContainer,_React$Component2);function SimpleRowsContainer(){_classCallCheck(this,SimpleRowsContainer);return _possibleConstructorReturn(this,Object.getPrototypeOf(SimpleRowsContainer).apply(this,arguments));}_createClass(SimpleRowsContainer,[{key:'render',value:function render(){return _react2['default'].createElement('div',{style:{width:this.props.width,overflow:'hidden'}},this.props.rows);}}]);return SimpleRowsContainer;}(_react2['default'].Component);SimpleRowsContainer.propTypes={width:_react.PropTypes.number,rows:_react.PropTypes.array};var ContextMenuRowsContainer=(0,_reactContextmenu.ContextMenuLayer)('reactDataGridContextMenu')(SimpleRowsContainer);exports['default']=RowsContainer;exports.SimpleRowsContainer=SimpleRowsContainer;exports.ContextMenuRowsContainer=ContextMenuRowsContainer; /***/}, /* 24 */ /***/function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _contextMenu=__webpack_require__(25);Object.defineProperty(exports,"ContextMenu",{enumerable:true,get:function get(){return _interopRequireDefault(_contextMenu)['default'];}});var _contextmenuLayer=__webpack_require__(78);Object.defineProperty(exports,"ContextMenuLayer",{enumerable:true,get:function get(){return _interopRequireDefault(_contextmenuLayer)['default'];}});var _menuItem=__webpack_require__(81);Object.defineProperty(exports,"MenuItem",{enumerable:true,get:function get(){return _interopRequireDefault(_menuItem)['default'];}});var _monitor=__webpack_require__(44);Object.defineProperty(exports,"monitor",{enumerable:true,get:function get(){return _interopRequireDefault(_monitor)['default'];}});var _submenu=__webpack_require__(83);Object.defineProperty(exports,"SubMenu",{enumerable:true,get:function get(){return _interopRequireDefault(_submenu)['default'];}});var _connect=__webpack_require__(85);Object.defineProperty(exports,"connect",{enumerable:true,get:function get(){return _interopRequireDefault(_connect)['default'];}});function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};} /***/}, /* 25 */ /***/function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _react=__webpack_require__(2);var _react2=_interopRequireDefault(_react);var _store=__webpack_require__(26);var _store2=_interopRequireDefault(_store);var _wrapper=__webpack_require__(43);var _wrapper2=_interopRequireDefault(_wrapper);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var PropTypes=_react2['default'].PropTypes;var ContextMenu=_react2['default'].createClass({displayName:"ContextMenu",propTypes:{identifier:PropTypes.string.isRequired},getInitialState:function getInitialState(){return _store2['default'].getState();},componentDidMount:function componentDidMount(){this.unsubscribe=_store2['default'].subscribe(this.handleUpdate);},componentWillUnmount:function componentWillUnmount(){if(this.unsubscribe)this.unsubscribe();},handleUpdate:function handleUpdate(){this.setState(this.getInitialState());},render:function render(){return _react2['default'].createElement(_wrapper2['default'],_extends({},this.props,this.state));}});exports['default']=ContextMenu; /***/}, /* 26 */ /***/function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _redux=__webpack_require__(27);var _reducers=__webpack_require__(41);var _reducers2=_interopRequireDefault(_reducers);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}exports['default']=(0,_redux.createStore)(_reducers2['default']); /***/}, /* 27 */ /***/function(module,exports,__webpack_require__){ /* WEBPACK VAR INJECTION */(function(process){'use strict';exports.__esModule=true;exports.compose=exports.applyMiddleware=exports.bindActionCreators=exports.combineReducers=exports.createStore=undefined;var _createStore=__webpack_require__(29);var _createStore2=_interopRequireDefault(_createStore);var _combineReducers=__webpack_require__(36);var _combineReducers2=_interopRequireDefault(_combineReducers);var _bindActionCreators=__webpack_require__(38);var _bindActionCreators2=_interopRequireDefault(_bindActionCreators);var _applyMiddleware=__webpack_require__(39);var _applyMiddleware2=_interopRequireDefault(_applyMiddleware);var _compose=__webpack_require__(40);var _compose2=_interopRequireDefault(_compose);var _warning=__webpack_require__(37);var _warning2=_interopRequireDefault(_warning);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj};} /*
		* This is a dummy function to check if the function name has been altered by minification.
		* If the function has been minified and NODE_ENV !== 'production', warn the user.
		*/function isCrushed(){}if(process.env.NODE_ENV!=='production'&&typeof isCrushed.name==='string'&&isCrushed.name!=='isCrushed'){(0,_warning2["default"])('You are currently using minified code outside of NODE_ENV === \'production\'. '+'This means that you are running a slower development build of Redux. '+'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify '+'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) '+'to ensure you have the correct code for your production build.');}exports.createStore=_createStore2["default"];exports.combineReducers=_combineReducers2["default"];exports.bindActionCreators=_bindActionCreators2["default"];exports.applyMiddleware=_applyMiddleware2["default"];exports.compose=_compose2["default"]; /* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(28)); /***/}, /* 28 */ /***/function(module,exports){ // shim for using process in browser
	var process=module.exports={};var queue=[];var draining=false;var currentQueue;var queueIndex=-1;function cleanUpNextTick(){if(!draining||!currentQueue){return;}draining=false;if(currentQueue.length){queue=currentQueue.concat(queue);}else {queueIndex=-1;}if(queue.length){drainQueue();}}function drainQueue(){if(draining){return;}var timeout=setTimeout(cleanUpNextTick);draining=true;var len=queue.length;while(len){currentQueue=queue;queue=[];while(++queueIndex<len){if(currentQueue){currentQueue[queueIndex].run();}}queueIndex=-1;len=queue.length;}currentQueue=null;draining=false;clearTimeout(timeout);}process.nextTick=function(fun){var args=new Array(arguments.length-1);if(arguments.length>1){for(var i=1;i<arguments.length;i++){args[i-1]=arguments[i];}}queue.push(new Item(fun,args));if(queue.length===1&&!draining){setTimeout(drainQueue,0);}}; // v8 likes predictible objects
	function Item(fun,array){this.fun=fun;this.array=array;}Item.prototype.run=function(){this.fun.apply(null,this.array);};process.title='browser';process.browser=true;process.env={};process.argv=[];process.version=''; // empty string to avoid regexp issues
	process.versions={};function noop(){}process.on=noop;process.addListener=noop;process.once=noop;process.off=noop;process.removeListener=noop;process.removeAllListeners=noop;process.emit=noop;process.binding=function(name){throw new Error('process.binding is not supported');};process.cwd=function(){return '/';};process.chdir=function(dir){throw new Error('process.chdir is not supported');};process.umask=function(){return 0;}; /***/}, /* 29 */ /***/function(module,exports,__webpack_require__){'use strict';exports.__esModule=true;exports.ActionTypes=undefined;exports["default"]=createStore;var _isPlainObject=__webpack_require__(30);var _isPlainObject2=_interopRequireDefault(_isPlainObject);var _symbolObservable=__webpack_require__(34);var _symbolObservable2=_interopRequireDefault(_symbolObservable);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj};} /**
		 * These are private action types reserved by Redux.
		 * For any unknown actions, you must return the current state.
		 * If the current state is undefined, you must return the initial state.
		 * Do not reference these action types directly in your code.
		 */var ActionTypes=exports.ActionTypes={INIT:'@@redux/INIT'}; /**
		 * Creates a Redux store that holds the state tree.
		 * The only way to change the data in the store is to call `dispatch()` on it.
		 *
		 * There should only be a single store in your app. To specify how different
		 * parts of the state tree respond to actions, you may combine several reducers
		 * into a single reducer function by using `combineReducers`.
		 *
		 * @param {Function} reducer A function that returns the next state tree, given
		 * the current state tree and the action to handle.
		 *
		 * @param {any} [initialState] The initial state. You may optionally specify it
		 * to hydrate the state from the server in universal apps, or to restore a
		 * previously serialized user session.
		 * If you use `combineReducers` to produce the root reducer function, this must be
		 * an object with the same shape as `combineReducers` keys.
		 *
		 * @param {Function} enhancer The store enhancer. You may optionally specify it
		 * to enhance the store with third-party capabilities such as middleware,
		 * time travel, persistence, etc. The only store enhancer that ships with Redux
		 * is `applyMiddleware()`.
		 *
		 * @returns {Store} A Redux store that lets you read the state, dispatch actions
		 * and subscribe to changes.
		 */function createStore(reducer,initialState,enhancer){var _ref2;if(typeof initialState==='function'&&typeof enhancer==='undefined'){enhancer=initialState;initialState=undefined;}if(typeof enhancer!=='undefined'){if(typeof enhancer!=='function'){throw new Error('Expected the enhancer to be a function.');}return enhancer(createStore)(reducer,initialState);}if(typeof reducer!=='function'){throw new Error('Expected the reducer to be a function.');}var currentReducer=reducer;var currentState=initialState;var currentListeners=[];var nextListeners=currentListeners;var isDispatching=false;function ensureCanMutateNextListeners(){if(nextListeners===currentListeners){nextListeners=currentListeners.slice();}} /**
		   * Reads the state tree managed by the store.
		   *
		   * @returns {any} The current state tree of your application.
		   */function getState(){return currentState;} /**
		   * Adds a change listener. It will be called any time an action is dispatched,
		   * and some part of the state tree may potentially have changed. You may then
		   * call `getState()` to read the current state tree inside the callback.
		   *
		   * You may call `dispatch()` from a change listener, with the following
		   * caveats:
		   *
		   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
		   * If you subscribe or unsubscribe while the listeners are being invoked, this
		   * will not have any effect on the `dispatch()` that is currently in progress.
		   * However, the next `dispatch()` call, whether nested or not, will use a more
		   * recent snapshot of the subscription list.
		   *
		   * 2. The listener should not expect to see all state changes, as the state
		   * might have been updated multiple times during a nested `dispatch()` before
		   * the listener is called. It is, however, guaranteed that all subscribers
		   * registered before the `dispatch()` started will be called with the latest
		   * state by the time it exits.
		   *
		   * @param {Function} listener A callback to be invoked on every dispatch.
		   * @returns {Function} A function to remove this change listener.
		   */function subscribe(listener){if(typeof listener!=='function'){throw new Error('Expected listener to be a function.');}var isSubscribed=true;ensureCanMutateNextListeners();nextListeners.push(listener);return function unsubscribe(){if(!isSubscribed){return;}isSubscribed=false;ensureCanMutateNextListeners();var index=nextListeners.indexOf(listener);nextListeners.splice(index,1);};} /**
		   * Dispatches an action. It is the only way to trigger a state change.
		   *
		   * The `reducer` function, used to create the store, will be called with the
		   * current state tree and the given `action`. Its return value will
		   * be considered the **next** state of the tree, and the change listeners
		   * will be notified.
		   *
		   * The base implementation only supports plain object actions. If you want to
		   * dispatch a Promise, an Observable, a thunk, or something else, you need to
		   * wrap your store creating function into the corresponding middleware. For
		   * example, see the documentation for the `redux-thunk` package. Even the
		   * middleware will eventually dispatch plain object actions using this method.
		   *
		   * @param {Object} action A plain object representing “what changed”. It is
		   * a good idea to keep actions serializable so you can record and replay user
		   * sessions, or use the time travelling `redux-devtools`. An action must have
		   * a `type` property which may not be `undefined`. It is a good idea to use
		   * string constants for action types.
		   *
		   * @returns {Object} For convenience, the same action object you dispatched.
		   *
		   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
		   * return something else (for example, a Promise you can await).
		   */function dispatch(action){if(!(0,_isPlainObject2["default"])(action)){throw new Error('Actions must be plain objects. '+'Use custom middleware for async actions.');}if(typeof action.type==='undefined'){throw new Error('Actions may not have an undefined "type" property. '+'Have you misspelled a constant?');}if(isDispatching){throw new Error('Reducers may not dispatch actions.');}try{isDispatching=true;currentState=currentReducer(currentState,action);}finally {isDispatching=false;}var listeners=currentListeners=nextListeners;for(var i=0;i<listeners.length;i++){listeners[i]();}return action;} /**
		   * Replaces the reducer currently used by the store to calculate the state.
		   *
		   * You might need this if your app implements code splitting and you want to
		   * load some of the reducers dynamically. You might also need this if you
		   * implement a hot reloading mechanism for Redux.
		   *
		   * @param {Function} nextReducer The reducer for the store to use instead.
		   * @returns {void}
		   */function replaceReducer(nextReducer){if(typeof nextReducer!=='function'){throw new Error('Expected the nextReducer to be a function.');}currentReducer=nextReducer;dispatch({type:ActionTypes.INIT});} /**
		   * Interoperability point for observable/reactive libraries.
		   * @returns {observable} A minimal observable of state changes.
		   * For more information, see the observable proposal:
		   * https://github.com/zenparsing/es-observable
		   */function observable(){var _ref;var outerSubscribe=subscribe;return _ref={ /**
		       * The minimal observable subscription method.
		       * @param {Object} observer Any object that can be used as an observer.
		       * The observer object should have a `next` method.
		       * @returns {subscription} An object with an `unsubscribe` method that can
		       * be used to unsubscribe the observable from the store, and prevent further
		       * emission of values from the observable.
		       */subscribe:function subscribe(observer){if((typeof observer==='undefined'?'undefined':_typeof2(observer))!=='object'){throw new TypeError('Expected the observer to be an object.');}function observeState(){if(observer.next){observer.next(getState());}}observeState();var unsubscribe=outerSubscribe(observeState);return {unsubscribe:unsubscribe};}},_ref[_symbolObservable2["default"]]=function(){return this;},_ref;} // When a store is created, an "INIT" action is dispatched so that every
	// reducer returns their initial state. This effectively populates
	// the initial state tree.
	dispatch({type:ActionTypes.INIT});return _ref2={dispatch:dispatch,subscribe:subscribe,getState:getState,replaceReducer:replaceReducer},_ref2[_symbolObservable2["default"]]=observable,_ref2;} /***/}, /* 30 */ /***/function(module,exports,__webpack_require__){var getPrototype=__webpack_require__(31),isHostObject=__webpack_require__(32),isObjectLike=__webpack_require__(33); /** `Object#toString` result references. */var objectTag='[object Object]'; /** Used for built-in method references. */var objectProto=Object.prototype; /** Used to resolve the decompiled source of functions. */var funcToString=Function.prototype.toString; /** Used to check objects for own properties. */var hasOwnProperty=objectProto.hasOwnProperty; /** Used to infer the `Object` constructor. */var objectCtorString=funcToString.call(Object); /**
		 * Used to resolve the
		 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
		 * of values.
		 */var objectToString=objectProto.toString; /**
		 * Checks if `value` is a plain object, that is, an object created by the
		 * `Object` constructor or one with a `[[Prototype]]` of `null`.
		 *
		 * @static
		 * @memberOf _
		 * @since 0.8.0
		 * @category Lang
		 * @param {*} value The value to check.
		 * @returns {boolean} Returns `true` if `value` is a plain object,
		 *  else `false`.
		 * @example
		 *
		 * function Foo() {
		 *   this.a = 1;
		 * }
		 *
		 * _.isPlainObject(new Foo);
		 * // => false
		 *
		 * _.isPlainObject([1, 2, 3]);
		 * // => false
		 *
		 * _.isPlainObject({ 'x': 0, 'y': 0 });
		 * // => true
		 *
		 * _.isPlainObject(Object.create(null));
		 * // => true
		 */function isPlainObject(value){if(!isObjectLike(value)||objectToString.call(value)!=objectTag||isHostObject(value)){return false;}var proto=getPrototype(value);if(proto===null){return true;}var Ctor=hasOwnProperty.call(proto,'constructor')&&proto.constructor;return typeof Ctor=='function'&&Ctor instanceof Ctor&&funcToString.call(Ctor)==objectCtorString;}module.exports=isPlainObject; /***/}, /* 31 */ /***/function(module,exports){ /* Built-in method references for those with the same name as other `lodash` methods. */var nativeGetPrototype=Object.getPrototypeOf; /**
		 * Gets the `[[Prototype]]` of `value`.
		 *
		 * @private
		 * @param {*} value The value to query.
		 * @returns {null|Object} Returns the `[[Prototype]]`.
		 */function getPrototype(value){return nativeGetPrototype(Object(value));}module.exports=getPrototype; /***/}, /* 32 */ /***/function(module,exports){ /**
		 * Checks if `value` is a host object in IE < 9.
		 *
		 * @private
		 * @param {*} value The value to check.
		 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
		 */function isHostObject(value){ // Many host objects are `Object` objects that can coerce to strings
	// despite having improperly defined `toString` methods.
	var result=false;if(value!=null&&typeof value.toString!='function'){try{result=!!(value+'');}catch(e){}}return result;}module.exports=isHostObject; /***/}, /* 33 */ /***/function(module,exports){ /**
		 * Checks if `value` is object-like. A value is object-like if it's not `null`
		 * and has a `typeof` result of "object".
		 *
		 * @static
		 * @memberOf _
		 * @since 4.0.0
		 * @category Lang
		 * @param {*} value The value to check.
		 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
		 * @example
		 *
		 * _.isObjectLike({});
		 * // => true
		 *
		 * _.isObjectLike([1, 2, 3]);
		 * // => true
		 *
		 * _.isObjectLike(_.noop);
		 * // => false
		 *
		 * _.isObjectLike(null);
		 * // => false
		 */function isObjectLike(value){return !!value&&(typeof value==='undefined'?'undefined':_typeof2(value))=='object';}module.exports=isObjectLike; /***/}, /* 34 */ /***/function(module,exports,__webpack_require__){ /* WEBPACK VAR INJECTION */(function(global){ /* global window */'use strict';module.exports=__webpack_require__(35)(global||window||this); /* WEBPACK VAR INJECTION */}).call(exports,function(){return this;}()); /***/}, /* 35 */ /***/function(module,exports){'use strict';module.exports=function symbolObservablePonyfill(root){var result;var _Symbol=root.Symbol;if(typeof _Symbol==='function'){if(_Symbol.observable){result=_Symbol.observable;}else {result=_Symbol('observable');_Symbol.observable=result;}}else {result='@@observable';}return result;}; /***/}, /* 36 */ /***/function(module,exports,__webpack_require__){ /* WEBPACK VAR INJECTION */(function(process){'use strict';exports.__esModule=true;exports["default"]=combineReducers;var _createStore=__webpack_require__(29);var _isPlainObject=__webpack_require__(30);var _isPlainObject2=_interopRequireDefault(_isPlainObject);var _warning=__webpack_require__(37);var _warning2=_interopRequireDefault(_warning);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj};}function getUndefinedStateErrorMessage(key,action){var actionType=action&&action.type;var actionName=actionType&&'"'+actionType.toString()+'"'||'an action';return 'Given action '+actionName+', reducer "'+key+'" returned undefined. '+'To ignore an action, you must explicitly return the previous state.';}function getUnexpectedStateShapeWarningMessage(inputState,reducers,action){var reducerKeys=Object.keys(reducers);var argumentName=action&&action.type===_createStore.ActionTypes.INIT?'initialState argument passed to createStore':'previous state received by the reducer';if(reducerKeys.length===0){return 'Store does not have a valid reducer. Make sure the argument passed '+'to combineReducers is an object whose values are reducers.';}if(!(0,_isPlainObject2["default"])(inputState)){return 'The '+argumentName+' has unexpected type of "'+{}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1]+'". Expected argument to be an object with the following '+('keys: "'+reducerKeys.join('", "')+'"');}var unexpectedKeys=Object.keys(inputState).filter(function(key){return !reducers.hasOwnProperty(key);});if(unexpectedKeys.length>0){return 'Unexpected '+(unexpectedKeys.length>1?'keys':'key')+' '+('"'+unexpectedKeys.join('", "')+'" found in '+argumentName+'. ')+'Expected to find one of the known reducer keys instead: '+('"'+reducerKeys.join('", "')+'". Unexpected keys will be ignored.');}}function assertReducerSanity(reducers){Object.keys(reducers).forEach(function(key){var reducer=reducers[key];var initialState=reducer(undefined,{type:_createStore.ActionTypes.INIT});if(typeof initialState==='undefined'){throw new Error('Reducer "'+key+'" returned undefined during initialization. '+'If the state passed to the reducer is undefined, you must '+'explicitly return the initial state. The initial state may '+'not be undefined.');}var type='@@redux/PROBE_UNKNOWN_ACTION_'+Math.random().toString(36).substring(7).split('').join('.');if(typeof reducer(undefined,{type:type})==='undefined'){throw new Error('Reducer "'+key+'" returned undefined when probed with a random type. '+('Don\'t try to handle '+_createStore.ActionTypes.INIT+' or other actions in "redux/*" ')+'namespace. They are considered private. Instead, you must return the '+'current state for any unknown actions, unless it is undefined, '+'in which case you must return the initial state, regardless of the '+'action type. The initial state may not be undefined.');}});} /**
		 * Turns an object whose values are different reducer functions, into a single
		 * reducer function. It will call every child reducer, and gather their results
		 * into a single state object, whose keys correspond to the keys of the passed
		 * reducer functions.
		 *
		 * @param {Object} reducers An object whose values correspond to different
		 * reducer functions that need to be combined into one. One handy way to obtain
		 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
		 * undefined for any action. Instead, they should return their initial state
		 * if the state passed to them was undefined, and the current state for any
		 * unrecognized action.
		 *
		 * @returns {Function} A reducer function that invokes every reducer inside the
		 * passed object, and builds a state object with the same shape.
		 */function combineReducers(reducers){var reducerKeys=Object.keys(reducers);var finalReducers={};for(var i=0;i<reducerKeys.length;i++){var key=reducerKeys[i];if(typeof reducers[key]==='function'){finalReducers[key]=reducers[key];}}var finalReducerKeys=Object.keys(finalReducers);var sanityError;try{assertReducerSanity(finalReducers);}catch(e){sanityError=e;}return function combination(){var state=arguments.length<=0||arguments[0]===undefined?{}:arguments[0];var action=arguments[1];if(sanityError){throw sanityError;}if(process.env.NODE_ENV!=='production'){var warningMessage=getUnexpectedStateShapeWarningMessage(state,finalReducers,action);if(warningMessage){(0,_warning2["default"])(warningMessage);}}var hasChanged=false;var nextState={};for(var i=0;i<finalReducerKeys.length;i++){var key=finalReducerKeys[i];var reducer=finalReducers[key];var previousStateForKey=state[key];var nextStateForKey=reducer(previousStateForKey,action);if(typeof nextStateForKey==='undefined'){var errorMessage=getUndefinedStateErrorMessage(key,action);throw new Error(errorMessage);}nextState[key]=nextStateForKey;hasChanged=hasChanged||nextStateForKey!==previousStateForKey;}return hasChanged?nextState:state;};} /* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(28)); /***/}, /* 37 */ /***/function(module,exports){'use strict';exports.__esModule=true;exports["default"]=warning; /**
		 * Prints a warning in the console if it exists.
		 *
		 * @param {String} message The warning message.
		 * @returns {void}
		 */function warning(message){ /* eslint-disable no-console */if(typeof console!=='undefined'&&typeof console.error==='function'){console.error(message);} /* eslint-enable no-console */try{ // This error was thrown as a convenience so that if you enable
	// "break on all exceptions" in your console,
	// it would pause the execution at this line.
	throw new Error(message); /* eslint-disable no-empty */}catch(e){} /* eslint-enable no-empty */} /***/}, /* 38 */ /***/function(module,exports){'use strict';exports.__esModule=true;exports["default"]=bindActionCreators;function bindActionCreator(actionCreator,dispatch){return function(){return dispatch(actionCreator.apply(undefined,arguments));};} /**
		 * Turns an object whose values are action creators, into an object with the
		 * same keys, but with every function wrapped into a `dispatch` call so they
		 * may be invoked directly. This is just a convenience method, as you can call
		 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
		 *
		 * For convenience, you can also pass a single function as the first argument,
		 * and get a function in return.
		 *
		 * @param {Function|Object} actionCreators An object whose values are action
		 * creator functions. One handy way to obtain it is to use ES6 `import * as`
		 * syntax. You may also pass a single function.
		 *
		 * @param {Function} dispatch The `dispatch` function available on your Redux
		 * store.
		 *
		 * @returns {Function|Object} The object mimicking the original object, but with
		 * every action creator wrapped into the `dispatch` call. If you passed a
		 * function as `actionCreators`, the return value will also be a single
		 * function.
		 */function bindActionCreators(actionCreators,dispatch){if(typeof actionCreators==='function'){return bindActionCreator(actionCreators,dispatch);}if((typeof actionCreators==='undefined'?'undefined':_typeof2(actionCreators))!=='object'||actionCreators===null){throw new Error('bindActionCreators expected an object or a function, instead received '+(actionCreators===null?'null':typeof actionCreators==='undefined'?'undefined':_typeof2(actionCreators))+'. '+'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');}var keys=Object.keys(actionCreators);var boundActionCreators={};for(var i=0;i<keys.length;i++){var key=keys[i];var actionCreator=actionCreators[key];if(typeof actionCreator==='function'){boundActionCreators[key]=bindActionCreator(actionCreator,dispatch);}}return boundActionCreators;} /***/}, /* 39 */ /***/function(module,exports,__webpack_require__){'use strict';exports.__esModule=true;var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};exports["default"]=applyMiddleware;var _compose=__webpack_require__(40);var _compose2=_interopRequireDefault(_compose);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj};} /**
		 * Creates a store enhancer that applies middleware to the dispatch method
		 * of the Redux store. This is handy for a variety of tasks, such as expressing
		 * asynchronous actions in a concise manner, or logging every action payload.
		 *
		 * See `redux-thunk` package as an example of the Redux middleware.
		 *
		 * Because middleware is potentially asynchronous, this should be the first
		 * store enhancer in the composition chain.
		 *
		 * Note that each middleware will be given the `dispatch` and `getState` functions
		 * as named arguments.
		 *
		 * @param {...Function} middlewares The middleware chain to be applied.
		 * @returns {Function} A store enhancer applying the middleware.
		 */function applyMiddleware(){for(var _len=arguments.length,middlewares=Array(_len),_key=0;_key<_len;_key++){middlewares[_key]=arguments[_key];}return function(createStore){return function(reducer,initialState,enhancer){var store=createStore(reducer,initialState,enhancer);var _dispatch=store.dispatch;var chain=[];var middlewareAPI={getState:store.getState,dispatch:function dispatch(action){return _dispatch(action);}};chain=middlewares.map(function(middleware){return middleware(middlewareAPI);});_dispatch=_compose2["default"].apply(undefined,chain)(store.dispatch);return _extends({},store,{dispatch:_dispatch});};};} /***/}, /* 40 */ /***/function(module,exports){"use strict";exports.__esModule=true;exports["default"]=compose; /**
		 * Composes single-argument functions from right to left. The rightmost
		 * function can take multiple arguments as it provides the signature for
		 * the resulting composite function.
		 *
		 * @param {...Function} funcs The functions to compose.
		 * @returns {Function} A function obtained by composing the argument functions
		 * from right to left. For example, compose(f, g, h) is identical to doing
		 * (...args) => f(g(h(...args))).
		 */function compose(){for(var _len=arguments.length,funcs=Array(_len),_key=0;_key<_len;_key++){funcs[_key]=arguments[_key];}if(funcs.length===0){return function(arg){return arg;};}else {var _ret=function(){var last=funcs[funcs.length-1];var rest=funcs.slice(0,-1);return {v:function v(){return rest.reduceRight(function(composed,f){return f(composed);},last.apply(undefined,arguments));}};}();if((typeof _ret==='undefined'?'undefined':_typeof2(_ret))==="object")return _ret.v;}} /***/}, /* 41 */ /***/function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports['default']=function(){var state=arguments.length<=0||arguments[0]===undefined?defaultState:arguments[0];var action=arguments[1];return action.type==="SET_PARAMS"?(0,_objectAssign2['default'])({},state,action.data):state;};var _objectAssign=__webpack_require__(42);var _objectAssign2=_interopRequireDefault(_objectAssign);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var defaultState={x:0,y:0,isVisible:false,currentItem:{}}; /***/}, /* 42 */ /***/function(module,exports){'use strict'; /* eslint-disable no-unused-vars */var hasOwnProperty=Object.prototype.hasOwnProperty;var propIsEnumerable=Object.prototype.propertyIsEnumerable;function toObject(val){if(val===null||val===undefined){throw new TypeError('Object.assign cannot be called with null or undefined');}return Object(val);}function shouldUseNative(){try{if(!Object.assign){return false;} // Detect buggy property enumeration order in older V8 versions.
	// https://bugs.chromium.org/p/v8/issues/detail?id=4118
	var test1=new String('abc'); // eslint-disable-line
	test1[5]='de';if(Object.getOwnPropertyNames(test1)[0]==='5'){return false;} // https://bugs.chromium.org/p/v8/issues/detail?id=3056
	var test2={};for(var i=0;i<10;i++){test2['_'+String.fromCharCode(i)]=i;}var order2=Object.getOwnPropertyNames(test2).map(function(n){return test2[n];});if(order2.join('')!=='0123456789'){return false;} // https://bugs.chromium.org/p/v8/issues/detail?id=3056
	var test3={};'abcdefghijklmnopqrst'.split('').forEach(function(letter){test3[letter]=letter;});if(Object.keys(Object.assign({},test3)).join('')!=='abcdefghijklmnopqrst'){return false;}return true;}catch(e){ // We don't expect any of the above to throw, but better to be safe.
	return false;}}module.exports=shouldUseNative()?Object.assign:function(target,source){var from;var to=toObject(target);var symbols;for(var s=1;s<arguments.length;s++){from=Object(arguments[s]);for(var key in from){if(hasOwnProperty.call(from,key)){to[key]=from[key];}}if(Object.getOwnPropertySymbols){symbols=Object.getOwnPropertySymbols(from);for(var i=0;i<symbols.length;i++){if(propIsEnumerable.call(from,symbols[i])){to[symbols[i]]=from[symbols[i]];}}}}return to;}; /***/}, /* 43 */ /***/function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _react=__webpack_require__(2);var _react2=_interopRequireDefault(_react);var _monitor=__webpack_require__(44);var _monitor2=_interopRequireDefault(_monitor);var _Modal=__webpack_require__(45);var _Modal2=_interopRequireDefault(_Modal);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var modalStyle={position:"fixed",zIndex:1040,top:0,bottom:0,left:0,right:0},backdropStyle=_extends({},modalStyle,{zIndex:"auto",backgroundColor:"transparent"}),menuStyles={position:"fixed",zIndex:"auto"};var ContextMenuWrapper=_react2['default'].createClass({displayName:"ContextMenuWrapper",getInitialState:function getInitialState(){return {left:0,top:0};},componentWillReceiveProps:function componentWillReceiveProps(nextProps){var _this=this;if(nextProps.isVisible===nextProps.identifier){var wrapper=window.requestAnimationFrame||setTimeout;wrapper(function(){return _this.setState(_this.getMenuPosition(nextProps.x,nextProps.y));});}},shouldComponentUpdate:function shouldComponentUpdate(nextProps){return this.props.isVisible!==nextProps.visible;},getMenuPosition:function getMenuPosition(x,y){var scrollX=document.documentElement.scrollTop;var scrollY=document.documentElement.scrollLeft;var _window=window;var innerWidth=_window.innerWidth;var innerHeight=_window.innerHeight;var rect=this.menu.getBoundingClientRect();var menuStyles={top:y+scrollY,left:x+scrollX};if(y+rect.height>innerHeight){menuStyles.top-=rect.height;}if(x+rect.width>innerWidth){menuStyles.left-=rect.width;}return menuStyles;},render:function render(){var _this2=this;var _props=this.props;var isVisible=_props.isVisible;var identifier=_props.identifier;var children=_props.children;var style=_extends({},menuStyles,this.state);return _react2['default'].createElement(_Modal2['default'],{style:modalStyle,backdropStyle:backdropStyle,show:isVisible===identifier,onHide:function onHide(){return _monitor2['default'].hideMenu();}},_react2['default'].createElement("nav",{ref:function ref(c){return _this2.menu=c;},style:style,className:"react-context-menu"},children));}});exports['default']=ContextMenuWrapper; /***/}, /* 44 */ /***/function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _store=__webpack_require__(26);var _store2=_interopRequireDefault(_store);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}exports['default']={getItem:function getItem(){return _store2['default'].getState().currentItem;},getPosition:function getPosition(){var _store$getState=_store2['default'].getState();var x=_store$getState.x;var y=_store$getState.y;return {x:x,y:y};},hideMenu:function hideMenu(){_store2['default'].dispatch({type:"SET_PARAMS",data:{isVisible:false,currentItem:{}}});}}; /***/}, /* 45 */ /***/function(module,exports,__webpack_require__){ /*eslint-disable react/prop-types */'use strict';exports.__esModule=true;var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}function _objectWithoutProperties(obj,keys){var target={};for(var i in obj){if(keys.indexOf(i)>=0)continue;if(!Object.prototype.hasOwnProperty.call(obj,i))continue;target[i]=obj[i];}return target;}var _react=__webpack_require__(2);var _react2=_interopRequireDefault(_react);var _warning=__webpack_require__(46);var _warning2=_interopRequireDefault(_warning);var _reactPropTypesLibMountable=__webpack_require__(47);var _reactPropTypesLibMountable2=_interopRequireDefault(_reactPropTypesLibMountable);var _reactPropTypesLibElementType=__webpack_require__(49);var _reactPropTypesLibElementType2=_interopRequireDefault(_reactPropTypesLibElementType);var _Portal=__webpack_require__(50);var _Portal2=_interopRequireDefault(_Portal);var _ModalManager=__webpack_require__(54);var _ModalManager2=_interopRequireDefault(_ModalManager);var _utilsOwnerDocument=__webpack_require__(51);var _utilsOwnerDocument2=_interopRequireDefault(_utilsOwnerDocument);var _utilsAddEventListener=__webpack_require__(72);var _utilsAddEventListener2=_interopRequireDefault(_utilsAddEventListener);var _utilsAddFocusListener=__webpack_require__(75);var _utilsAddFocusListener2=_interopRequireDefault(_utilsAddFocusListener);var _domHelpersUtilInDOM=__webpack_require__(68);var _domHelpersUtilInDOM2=_interopRequireDefault(_domHelpersUtilInDOM);var _domHelpersActiveElement=__webpack_require__(76);var _domHelpersActiveElement2=_interopRequireDefault(_domHelpersActiveElement);var _domHelpersQueryContains=__webpack_require__(77);var _domHelpersQueryContains2=_interopRequireDefault(_domHelpersQueryContains);var _utilsGetContainer=__webpack_require__(53);var _utilsGetContainer2=_interopRequireDefault(_utilsGetContainer);var modalManager=new _ModalManager2['default'](); /**
		 * Love them or hate them, `<Modal/>` provides a solid foundation for creating dialogs, lightboxes, or whatever else.
		 * The Modal component renders its `children` node in front of a backdrop component.
		 *
		 * The Modal offers a few helpful features over using just a `<Portal/>` component and some styles:
		 *
		 * - Manages dialog stacking when one-at-a-time just isn't enough.
		 * - Creates a backdrop, for disabling interaction below the modal.
		 * - It properly manages focus; moving to the modal content, and keeping it there until the modal is closed.
		 * - It disables scrolling of the page content while open.
		 * - Adds the appropriate ARIA roles are automatically.
		 * - Easily pluggable animations via a `<Transition/>` component.
		 *
		 * Note that, in the same way the backdrop element prevents users from clicking or interacting
		 * with the page content underneath the Modal, Screen readers also need to be signaled to not to
		 * interact with page content while the Modal is open. To do this, we use a common technique of applying
		 * the `aria-hidden='true'` attribute to the non-Modal elements in the Modal `container`. This means that for
		 * a Modal to be truly modal, it should have a `container` that is _outside_ your app's
		 * React hierarchy (such as the default: document.body).
		 */var Modal=_react2['default'].createClass({displayName:'Modal',propTypes:_extends({},_Portal2['default'].propTypes,{ /**
		     * Set the visibility of the Modal
		     */show:_react2['default'].PropTypes.bool, /**
		     * A Node, Component instance, or function that returns either. The Modal is appended to it's container element.
		     *
		     * For the sake of assistive technologies, the container should usually be the document body, so that the rest of the
		     * page content can be placed behind a virtual backdrop as well as a visual one.
		     */container:_react2['default'].PropTypes.oneOfType([_reactPropTypesLibMountable2['default'],_react2['default'].PropTypes.func]), /**
		     * A callback fired when the Modal is opening.
		     */onShow:_react2['default'].PropTypes.func, /**
		     * A callback fired when either the backdrop is clicked, or the escape key is pressed.
		     *
		     * The `onHide` callback only signals intent from the Modal,
		     * you must actually set the `show` prop to `false` for the Modal to close.
		     */onHide:_react2['default'].PropTypes.func, /**
		     * Include a backdrop component.
		     */backdrop:_react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.bool,_react2['default'].PropTypes.oneOf(['static'])]), /**
		     * A callback fired when the escape key, if specified in `keyboard`, is pressed.
		     */onEscapeKeyUp:_react2['default'].PropTypes.func, /**
		     * A callback fired when the backdrop, if specified, is clicked.
		     */onBackdropClick:_react2['default'].PropTypes.func, /**
		     * A style object for the backdrop component.
		     */backdropStyle:_react2['default'].PropTypes.object, /**
		     * A css class or classes for the backdrop component.
		     */backdropClassName:_react2['default'].PropTypes.string, /**
		     * A css class or set of classes applied to the modal container when the modal is open,
		     * and removed when it is closed.
		     */containerClassName:_react2['default'].PropTypes.string, /**
		     * Close the modal when escape key is pressed
		     */keyboard:_react2['default'].PropTypes.bool, /**
		     * A `<Transition/>` component to use for the dialog and backdrop components.
		     */transition:_reactPropTypesLibElementType2['default'], /**
		     * The `timeout` of the dialog transition if specified. This number is used to ensure that
		     * transition callbacks are always fired, even if browser transition events are canceled.
		     *
		     * See the Transition `timeout` prop for more infomation.
		     */dialogTransitionTimeout:_react2['default'].PropTypes.number, /**
		     * The `timeout` of the backdrop transition if specified. This number is used to
		     * ensure that transition callbacks are always fired, even if browser transition events are canceled.
		     *
		     * See the Transition `timeout` prop for more infomation.
		     */backdropTransitionTimeout:_react2['default'].PropTypes.number, /**
		     * When `true` The modal will automatically shift focus to itself when it opens, and
		     * replace it to the last focused element when it closes. This also
		     * works correctly with any Modal children that have the `autoFocus` prop.
		     *
		     * Generally this should never be set to `false` as it makes the Modal less
		     * accessible to assistive technologies, like screen readers.
		     */autoFocus:_react2['default'].PropTypes.bool, /**
		     * When `true` The modal will prevent focus from leaving the Modal while open.
		     *
		     * Generally this should never be set to `false` as it makes the Modal less
		     * accessible to assistive technologies, like screen readers.
		     */enforceFocus:_react2['default'].PropTypes.bool, /**
		     * Callback fired before the Modal transitions in
		     */onEnter:_react2['default'].PropTypes.func, /**
		     * Callback fired as the Modal begins to transition in
		     */onEntering:_react2['default'].PropTypes.func, /**
		     * Callback fired after the Modal finishes transitioning in
		     */onEntered:_react2['default'].PropTypes.func, /**
		     * Callback fired right before the Modal transitions out
		     */onExit:_react2['default'].PropTypes.func, /**
		     * Callback fired as the Modal begins to transition out
		     */onExiting:_react2['default'].PropTypes.func, /**
		     * Callback fired after the Modal finishes transitioning out
		     */onExited:_react2['default'].PropTypes.func}),getDefaultProps:function getDefaultProps(){var noop=function noop(){};return {show:false,backdrop:true,keyboard:true,autoFocus:true,enforceFocus:true,onHide:noop};},getInitialState:function getInitialState(){return {exited:!this.props.show};},render:function render(){var _props=this.props;var children=_props.children;var Transition=_props.transition;var backdrop=_props.backdrop;var dialogTransitionTimeout=_props.dialogTransitionTimeout;var props=_objectWithoutProperties(_props,['children','transition','backdrop','dialogTransitionTimeout']);var onExit=props.onExit;var onExiting=props.onExiting;var onEnter=props.onEnter;var onEntering=props.onEntering;var onEntered=props.onEntered;var show=!!props.show;var dialog=_react2['default'].Children.only(this.props.children);var mountModal=show||Transition&&!this.state.exited;if(!mountModal){return null;}var _dialog$props=dialog.props;var role=_dialog$props.role;var tabIndex=_dialog$props.tabIndex;if(role===undefined||tabIndex===undefined){dialog=_react.cloneElement(dialog,{role:role===undefined?'document':role,tabIndex:tabIndex==null?'-1':tabIndex});}if(Transition){dialog=_react2['default'].createElement(Transition,{transitionAppear:true,unmountOnExit:true,'in':show,timeout:dialogTransitionTimeout,onExit:onExit,onExiting:onExiting,onExited:this.handleHidden,onEnter:onEnter,onEntering:onEntering,onEntered:onEntered},dialog);}return _react2['default'].createElement(_Portal2['default'],{ref:this.setMountNode,container:props.container},_react2['default'].createElement('div',{ref:'modal',role:props.role||'dialog',style:props.style,className:props.className},backdrop&&this.renderBackdrop(),dialog));},renderBackdrop:function renderBackdrop(){var _props2=this.props;var Transition=_props2.transition;var backdropTransitionTimeout=_props2.backdropTransitionTimeout;var backdrop=_react2['default'].createElement('div',{ref:'backdrop',style:this.props.backdropStyle,className:this.props.backdropClassName,onClick:this.handleBackdropClick});if(Transition){backdrop=_react2['default'].createElement(Transition,{transitionAppear:true,'in':this.props.show,timeout:backdropTransitionTimeout},backdrop);}return backdrop;},componentWillReceiveProps:function componentWillReceiveProps(nextProps){if(nextProps.show){this.setState({exited:false});}else if(!nextProps.transition){ // Otherwise let handleHidden take care of marking exited.
	this.setState({exited:true});}},componentWillUpdate:function componentWillUpdate(nextProps){if(nextProps.show){this.checkForFocus();}},componentDidMount:function componentDidMount(){if(this.props.show){this.onShow();}},componentDidUpdate:function componentDidUpdate(prevProps){var transition=this.props.transition;if(prevProps.show&&!this.props.show&&!transition){ // Otherwise handleHidden will call this.
	this.onHide();}else if(!prevProps.show&&this.props.show){this.onShow();}},componentWillUnmount:function componentWillUnmount(){var _props3=this.props;var show=_props3.show;var transition=_props3.transition;if(show||transition&&!this.state.exited){this.onHide();}},onShow:function onShow(){var doc=_utilsOwnerDocument2['default'](this);var container=_utilsGetContainer2['default'](this.props.container,doc.body);modalManager.add(this,container,this.props.containerClassName);this._onDocumentKeyupListener=_utilsAddEventListener2['default'](doc,'keyup',this.handleDocumentKeyUp);this._onFocusinListener=_utilsAddFocusListener2['default'](this.enforceFocus);this.focus();if(this.props.onShow){this.props.onShow();}},onHide:function onHide(){modalManager.remove(this);this._onDocumentKeyupListener.remove();this._onFocusinListener.remove();this.restoreLastFocus();},setMountNode:function setMountNode(ref){this.mountNode=ref?ref.getMountNode():ref;},handleHidden:function handleHidden(){this.setState({exited:true});this.onHide();if(this.props.onExited){var _props4;(_props4=this.props).onExited.apply(_props4,arguments);}},handleBackdropClick:function handleBackdropClick(e){if(e.target!==e.currentTarget){return;}if(this.props.onBackdropClick){this.props.onBackdropClick(e);}if(this.props.backdrop===true){this.props.onHide();}},handleDocumentKeyUp:function handleDocumentKeyUp(e){if(this.props.keyboard&&e.keyCode===27&&this.isTopModal()){if(this.props.onEscapeKeyUp){this.props.onEscapeKeyUp(e);}this.props.onHide();}},checkForFocus:function checkForFocus(){if(_domHelpersUtilInDOM2['default']){this.lastFocus=_domHelpersActiveElement2['default']();}},focus:function focus(){var autoFocus=this.props.autoFocus;var modalContent=this.getDialogElement();var current=_domHelpersActiveElement2['default'](_utilsOwnerDocument2['default'](this));var focusInModal=current&&_domHelpersQueryContains2['default'](modalContent,current);if(modalContent&&autoFocus&&!focusInModal){this.lastFocus=current;if(!modalContent.hasAttribute('tabIndex')){modalContent.setAttribute('tabIndex',-1);_warning2['default'](false,'The modal content node does not accept focus. '+'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".');}modalContent.focus();}},restoreLastFocus:function restoreLastFocus(){ // Support: <=IE11 doesn't support `focus()` on svg elements (RB: #917)
	if(this.lastFocus&&this.lastFocus.focus){this.lastFocus.focus();this.lastFocus=null;}},enforceFocus:function enforceFocus(){var enforceFocus=this.props.enforceFocus;if(!enforceFocus||!this.isMounted()||!this.isTopModal()){return;}var active=_domHelpersActiveElement2['default'](_utilsOwnerDocument2['default'](this));var modal=this.getDialogElement();if(modal&&modal!==active&&!_domHelpersQueryContains2['default'](modal,active)){modal.focus();}}, //instead of a ref, which might conflict with one the parent applied.
	getDialogElement:function getDialogElement(){var node=this.refs.modal;return node&&node.lastChild;},isTopModal:function isTopModal(){return modalManager.isTopModal(this);}});Modal.manager=modalManager;exports['default']=Modal;module.exports=exports['default']; /***/}, /* 46 */ /***/function(module,exports,__webpack_require__){ /* WEBPACK VAR INJECTION */(function(process){ /**
		 * Copyright 2014-2015, Facebook, Inc.
		 * All rights reserved.
		 *
		 * This source code is licensed under the BSD-style license found in the
		 * LICENSE file in the root directory of this source tree. An additional grant
		 * of patent rights can be found in the PATENTS file in the same directory.
		 */'use strict'; /**
		 * Similar to invariant but only logs a warning if the condition is not met.
		 * This can be used to log issues in development environments in critical
		 * paths. Removing the logging code for production environments will keep the
		 * same logic and follow the same code paths.
		 */var warning=function warning(){};if(process.env.NODE_ENV!=='production'){warning=function warning(condition,format,args){var len=arguments.length;args=new Array(len>2?len-2:0);for(var key=2;key<len;key++){args[key-2]=arguments[key];}if(format===undefined){throw new Error('`warning(condition, format, ...args)` requires a warning '+'message argument');}if(format.length<10||/^[s\W]*$/.test(format)){throw new Error('The warning format should be able to uniquely identify this '+'warning. Please, use a more descriptive format than: '+format);}if(!condition){var argIndex=0;var message='Warning: '+format.replace(/%s/g,function(){return args[argIndex++];});if(typeof console!=='undefined'){console.error(message);}try{ // This error was thrown as a convenience so that you can use this stack
	// to find the callsite that caused this warning to fire.
	throw new Error(message);}catch(x){}}};}module.exports=warning; /* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(28)); /***/}, /* 47 */ /***/function(module,exports,__webpack_require__){'use strict';exports.__esModule=true;var _common=__webpack_require__(48); /**
		 * Checks whether a prop provides a DOM element
		 *
		 * The element can be provided in two forms:
		 * - Directly passed
		 * - Or passed an object that has a `render` method
		 *
		 * @param props
		 * @param propName
		 * @param componentName
		 * @returns {Error|undefined}
		 */function validate(props,propName,componentName){if(_typeof2(props[propName])!=='object'||typeof props[propName].render!=='function'&&props[propName].nodeType!==1){return new Error(_common.errMsg(props,propName,componentName,', expected a DOM element or an object that has a `render` method'));}}exports['default']=_common.createChainableTypeChecker(validate);module.exports=exports['default']; /***/}, /* 48 */ /***/function(module,exports){'use strict';exports.__esModule=true;exports.errMsg=errMsg;exports.createChainableTypeChecker=createChainableTypeChecker;function errMsg(props,propName,componentName,msgContinuation){return 'Invalid prop \''+propName+'\' of value \''+props[propName]+'\''+(' supplied to \''+componentName+'\''+msgContinuation);} /**
		 * Create chain-able isRequired validator
		 *
		 * Largely copied directly from:
		 *  https://github.com/facebook/react/blob/0.11-stable/src/core/ReactPropTypes.js#L94
		 */function createChainableTypeChecker(validate){function checkType(isRequired,props,propName,componentName){componentName=componentName||'<<anonymous>>';if(props[propName]==null){if(isRequired){return new Error('Required prop \''+propName+'\' was not specified in \''+componentName+'\'.');}}else {return validate(props,propName,componentName);}}var chainedCheckType=checkType.bind(null,false);chainedCheckType.isRequired=checkType.bind(null,true);return chainedCheckType;} /***/}, /* 49 */ /***/function(module,exports,__webpack_require__){'use strict';exports.__esModule=true;function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var _react=__webpack_require__(2);var _react2=_interopRequireDefault(_react);var _common=__webpack_require__(48); /**
		 * Checks whether a prop provides a type of element.
		 *
		 * The type of element can be provided in two forms:
		 * - tag name (string)
		 * - a return value of React.createClass(...)
		 *
		 * @param props
		 * @param propName
		 * @param componentName
		 * @returns {Error|undefined}
		 */function validate(props,propName,componentName){var errBeginning=_common.errMsg(props,propName,componentName,'. Expected an Element `type`');if(typeof props[propName]!=='function'){if(_react2['default'].isValidElement(props[propName])){return new Error(errBeginning+', not an actual Element');}if(typeof props[propName]!=='string'){return new Error(errBeginning+' such as a tag name or return value of React.createClass(...)');}}}exports['default']=_common.createChainableTypeChecker(validate);module.exports=exports['default']; /***/}, /* 50 */ /***/function(module,exports,__webpack_require__){'use strict';exports.__esModule=true;function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var _react=__webpack_require__(2);var _react2=_interopRequireDefault(_react);var _reactDom=__webpack_require__(3);var _reactDom2=_interopRequireDefault(_reactDom);var _reactPropTypesLibMountable=__webpack_require__(47);var _reactPropTypesLibMountable2=_interopRequireDefault(_reactPropTypesLibMountable);var _utilsOwnerDocument=__webpack_require__(51);var _utilsOwnerDocument2=_interopRequireDefault(_utilsOwnerDocument);var _utilsGetContainer=__webpack_require__(53);var _utilsGetContainer2=_interopRequireDefault(_utilsGetContainer); /**
		 * The `<Portal/>` component renders its children into a new "subtree" outside of current component hierarchy.
		 * You can think of it as a declarative `appendChild()`, or jQuery's `$.fn.appendTo()`.
		 * The children of `<Portal/>` component will be appended to the `container` specified.
		 */var Portal=_react2['default'].createClass({displayName:'Portal',propTypes:{ /**
		     * A Node, Component instance, or function that returns either. The `container` will have the Portal children
		     * appended to it.
		     */container:_react2['default'].PropTypes.oneOfType([_reactPropTypesLibMountable2['default'],_react2['default'].PropTypes.func])},componentDidMount:function componentDidMount(){this._renderOverlay();},componentDidUpdate:function componentDidUpdate(){this._renderOverlay();},componentWillReceiveProps:function componentWillReceiveProps(nextProps){if(this._overlayTarget&&nextProps.container!==this.props.container){this._portalContainerNode.removeChild(this._overlayTarget);this._portalContainerNode=_utilsGetContainer2['default'](nextProps.container,_utilsOwnerDocument2['default'](this).body);this._portalContainerNode.appendChild(this._overlayTarget);}},componentWillUnmount:function componentWillUnmount(){this._unrenderOverlay();this._unmountOverlayTarget();},_mountOverlayTarget:function _mountOverlayTarget(){if(!this._overlayTarget){this._overlayTarget=document.createElement('div');this._portalContainerNode=_utilsGetContainer2['default'](this.props.container,_utilsOwnerDocument2['default'](this).body);this._portalContainerNode.appendChild(this._overlayTarget);}},_unmountOverlayTarget:function _unmountOverlayTarget(){if(this._overlayTarget){this._portalContainerNode.removeChild(this._overlayTarget);this._overlayTarget=null;}this._portalContainerNode=null;},_renderOverlay:function _renderOverlay(){var overlay=!this.props.children?null:_react2['default'].Children.only(this.props.children); // Save reference for future access.
	if(overlay!==null){this._mountOverlayTarget();this._overlayInstance=_reactDom2['default'].unstable_renderSubtreeIntoContainer(this,overlay,this._overlayTarget);}else { // Unrender if the component is null for transitions to null
	this._unrenderOverlay();this._unmountOverlayTarget();}},_unrenderOverlay:function _unrenderOverlay(){if(this._overlayTarget){_reactDom2['default'].unmountComponentAtNode(this._overlayTarget);this._overlayInstance=null;}},render:function render(){return null;},getMountNode:function getMountNode(){return this._overlayTarget;},getOverlayDOMNode:function getOverlayDOMNode(){if(!this.isMounted()){throw new Error('getOverlayDOMNode(): A component must be mounted to have a DOM node.');}if(this._overlayInstance){if(this._overlayInstance.getWrappedDOMNode){return this._overlayInstance.getWrappedDOMNode();}else {return _reactDom2['default'].findDOMNode(this._overlayInstance);}}return null;}});exports['default']=Portal;module.exports=exports['default']; /***/}, /* 51 */ /***/function(module,exports,__webpack_require__){'use strict';exports.__esModule=true;function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var _reactDom=__webpack_require__(3);var _reactDom2=_interopRequireDefault(_reactDom);var _domHelpersOwnerDocument=__webpack_require__(52);var _domHelpersOwnerDocument2=_interopRequireDefault(_domHelpersOwnerDocument);exports['default']=function(componentOrElement){return _domHelpersOwnerDocument2['default'](_reactDom2['default'].findDOMNode(componentOrElement));};module.exports=exports['default']; /***/}, /* 52 */ /***/function(module,exports){"use strict";exports.__esModule=true;exports["default"]=ownerDocument;function ownerDocument(node){return node&&node.ownerDocument||document;}module.exports=exports["default"]; /***/}, /* 53 */ /***/function(module,exports,__webpack_require__){'use strict';exports.__esModule=true;exports['default']=getContainer;function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var _reactDom=__webpack_require__(3);var _reactDom2=_interopRequireDefault(_reactDom);function getContainer(container,defaultContainer){container=typeof container==='function'?container():container;return _reactDom2['default'].findDOMNode(container)||defaultContainer;}module.exports=exports['default']; /***/}, /* 54 */ /***/function(module,exports,__webpack_require__){'use strict';exports.__esModule=true;function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}var _domHelpersStyle=__webpack_require__(55);var _domHelpersStyle2=_interopRequireDefault(_domHelpersStyle);var _domHelpersClass=__webpack_require__(63);var _domHelpersClass2=_interopRequireDefault(_domHelpersClass);var _domHelpersUtilScrollbarSize=__webpack_require__(67);var _domHelpersUtilScrollbarSize2=_interopRequireDefault(_domHelpersUtilScrollbarSize);var _utilsIsOverflowing=__webpack_require__(69);var _utilsIsOverflowing2=_interopRequireDefault(_utilsIsOverflowing);var _utilsManageAriaHidden=__webpack_require__(71);function findIndexOf(arr,cb){var idx=-1;arr.some(function(d,i){if(cb(d,i)){idx=i;return true;}});return idx;}function findContainer(data,modal){return findIndexOf(data,function(d){return d.modals.indexOf(modal)!==-1;});} /**
		 * Proper state managment for containers and the modals in those containers.
		 *
		 * @internal Used by the Modal to ensure proper styling of containers.
		 */var ModalManager=function(){function ModalManager(){var hideSiblingNodes=arguments.length<=0||arguments[0]===undefined?true:arguments[0];_classCallCheck(this,ModalManager);this.hideSiblingNodes=hideSiblingNodes;this.modals=[];this.containers=[];this.data=[];}ModalManager.prototype.add=function add(modal,container,className){var modalIdx=this.modals.indexOf(modal);var containerIdx=this.containers.indexOf(container);if(modalIdx!==-1){return modalIdx;}modalIdx=this.modals.length;this.modals.push(modal);if(this.hideSiblingNodes){_utilsManageAriaHidden.hideSiblings(container,modal.mountNode);}if(containerIdx!==-1){this.data[containerIdx].modals.push(modal);return modalIdx;}var data={modals:[modal], //right now only the first modal of a container will have its classes applied
	classes:className?className.split(/\s+/):[], //we are only interested in the actual `style` here becasue we will override it
	style:{overflow:container.style.overflow,paddingRight:container.style.paddingRight}};var style={overflow:'hidden'};data.overflowing=_utilsIsOverflowing2['default'](container);if(data.overflowing){ // use computed style, here to get the real padding
	// to add our scrollbar width
	style.paddingRight=parseInt(_domHelpersStyle2['default'](container,'paddingRight')||0,10)+_domHelpersUtilScrollbarSize2['default']()+'px';}_domHelpersStyle2['default'](container,style);data.classes.forEach(_domHelpersClass2['default'].addClass.bind(null,container));this.containers.push(container);this.data.push(data);return modalIdx;};ModalManager.prototype.remove=function remove(modal){var modalIdx=this.modals.indexOf(modal);if(modalIdx===-1){return;}var containerIdx=findContainer(this.data,modal);var data=this.data[containerIdx];var container=this.containers[containerIdx];data.modals.splice(data.modals.indexOf(modal),1);this.modals.splice(modalIdx,1); // if that was the last modal in a container,
	// clean up the container stylinhg.
	if(data.modals.length===0){Object.keys(data.style).forEach(function(key){return container.style[key]=data.style[key];});data.classes.forEach(_domHelpersClass2['default'].removeClass.bind(null,container));if(this.hideSiblingNodes){_utilsManageAriaHidden.showSiblings(container,modal.mountNode);}this.containers.splice(containerIdx,1);this.data.splice(containerIdx,1);}else if(this.hideSiblingNodes){ //otherwise make sure the next top modal is visible to a SR
	_utilsManageAriaHidden.ariaHidden(false,data.modals[data.modals.length-1].mountNode);}};ModalManager.prototype.isTopModal=function isTopModal(modal){return !!this.modals.length&&this.modals[this.modals.length-1]===modal;};return ModalManager;}();exports['default']=ModalManager;module.exports=exports['default']; /***/}, /* 55 */ /***/function(module,exports,__webpack_require__){'use strict';var camelize=__webpack_require__(56),hyphenate=__webpack_require__(58),_getComputedStyle=__webpack_require__(60),removeStyle=__webpack_require__(62);var has=Object.prototype.hasOwnProperty;module.exports=function style(node,property,value){var css='',props=property;if(typeof property==='string'){if(value===undefined)return node.style[camelize(property)]||_getComputedStyle(node).getPropertyValue(hyphenate(property));else (props={})[property]=value;}for(var key in props){if(has.call(props,key)){!props[key]&&props[key]!==0?removeStyle(node,hyphenate(key)):css+=hyphenate(key)+':'+props[key]+';';}}node.style.cssText+=';'+css;}; /***/}, /* 56 */ /***/function(module,exports,__webpack_require__){ /**
		 * Copyright 2014-2015, Facebook, Inc.
		 * All rights reserved.
		 * https://github.com/facebook/react/blob/2aeb8a2a6beb00617a4217f7f8284924fa2ad819/src/vendor/core/camelizeStyleName.js
		 */'use strict';var camelize=__webpack_require__(57);var msPattern=/^-ms-/;module.exports=function camelizeStyleName(string){return camelize(string.replace(msPattern,'ms-'));}; /***/}, /* 57 */ /***/function(module,exports){"use strict";var rHyphen=/-(.)/g;module.exports=function camelize(string){return string.replace(rHyphen,function(_,chr){return chr.toUpperCase();});}; /***/}, /* 58 */ /***/function(module,exports,__webpack_require__){ /**
		 * Copyright 2013-2014, Facebook, Inc.
		 * All rights reserved.
		 * https://github.com/facebook/react/blob/2aeb8a2a6beb00617a4217f7f8284924fa2ad819/src/vendor/core/hyphenateStyleName.js
		 */"use strict";var hyphenate=__webpack_require__(59);var msPattern=/^ms-/;module.exports=function hyphenateStyleName(string){return hyphenate(string).replace(msPattern,"-ms-");}; /***/}, /* 59 */ /***/function(module,exports){'use strict';var rUpper=/([A-Z])/g;module.exports=function hyphenate(string){return string.replace(rUpper,'-$1').toLowerCase();}; /***/}, /* 60 */ /***/function(module,exports,__webpack_require__){'use strict';var babelHelpers=__webpack_require__(61);var _utilCamelizeStyle=__webpack_require__(56);var _utilCamelizeStyle2=babelHelpers.interopRequireDefault(_utilCamelizeStyle);var rposition=/^(top|right|bottom|left)$/;var rnumnonpx=/^([+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|))(?!px)[a-z%]+$/i;module.exports=function _getComputedStyle(node){if(!node)throw new TypeError('No Element passed to `getComputedStyle()`');var doc=node.ownerDocument;return 'defaultView' in doc?doc.defaultView.opener?node.ownerDocument.defaultView.getComputedStyle(node,null):window.getComputedStyle(node,null):{ //ie 8 "magic" from: https://github.com/jquery/jquery/blob/1.11-stable/src/css/curCSS.js#L72
	getPropertyValue:function getPropertyValue(prop){var style=node.style;prop=(0,_utilCamelizeStyle2['default'])(prop);if(prop=='float')prop='styleFloat';var current=node.currentStyle[prop]||null;if(current==null&&style&&style[prop])current=style[prop];if(rnumnonpx.test(current)&&!rposition.test(prop)){ // Remember the original values
	var left=style.left;var runStyle=node.runtimeStyle;var rsLeft=runStyle&&runStyle.left; // Put in the new values to get a computed value out
	if(rsLeft)runStyle.left=node.currentStyle.left;style.left=prop==='fontSize'?'1em':current;current=style.pixelLeft+'px'; // Revert the changed values
	style.left=left;if(rsLeft)runStyle.left=rsLeft;}return current;}};}; /***/}, /* 61 */ /***/function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;(function(root,factory){if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__=[exports],__WEBPACK_AMD_DEFINE_FACTORY__=factory,__WEBPACK_AMD_DEFINE_RESULT__=typeof __WEBPACK_AMD_DEFINE_FACTORY__==='function'?__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__):__WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else if((typeof exports==='undefined'?'undefined':_typeof2(exports))==="object"){factory(exports);}else {factory(root.babelHelpers={});}})(this,function(global){var babelHelpers=global;babelHelpers.interopRequireDefault=function(obj){return obj&&obj.__esModule?obj:{"default":obj};};babelHelpers._extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};}); /***/}, /* 62 */ /***/function(module,exports){'use strict';module.exports=function removeStyle(node,key){return 'removeProperty' in node.style?node.style.removeProperty(key):node.style.removeAttribute(key);}; /***/}, /* 63 */ /***/function(module,exports,__webpack_require__){'use strict';module.exports={addClass:__webpack_require__(64),removeClass:__webpack_require__(66),hasClass:__webpack_require__(65)}; /***/}, /* 64 */ /***/function(module,exports,__webpack_require__){'use strict';var hasClass=__webpack_require__(65);module.exports=function addClass(element,className){if(element.classList)element.classList.add(className);else if(!hasClass(element))element.className=element.className+' '+className;}; /***/}, /* 65 */ /***/function(module,exports){'use strict';module.exports=function hasClass(element,className){if(element.classList)return !!className&&element.classList.contains(className);else return (' '+element.className+' ').indexOf(' '+className+' ')!==-1;}; /***/}, /* 66 */ /***/function(module,exports){'use strict';module.exports=function removeClass(element,className){if(element.classList)element.classList.remove(className);else element.className=element.className.replace(new RegExp('(^|\\s)'+className+'(?:\\s|$)','g'),'$1').replace(/\s+/g,' ').replace(/^\s*|\s*$/g,'');}; /***/}, /* 67 */ /***/function(module,exports,__webpack_require__){'use strict';var canUseDOM=__webpack_require__(68);var size;module.exports=function(recalc){if(!size||recalc){if(canUseDOM){var scrollDiv=document.createElement('div');scrollDiv.style.position='absolute';scrollDiv.style.top='-9999px';scrollDiv.style.width='50px';scrollDiv.style.height='50px';scrollDiv.style.overflow='scroll';document.body.appendChild(scrollDiv);size=scrollDiv.offsetWidth-scrollDiv.clientWidth;document.body.removeChild(scrollDiv);}}return size;}; /***/}, /* 68 */ /***/function(module,exports){'use strict';module.exports=!!(typeof window!=='undefined'&&window.document&&window.document.createElement); /***/}, /* 69 */ /***/function(module,exports,__webpack_require__){'use strict';exports.__esModule=true;exports['default']=isOverflowing;function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var _domHelpersQueryIsWindow=__webpack_require__(70);var _domHelpersQueryIsWindow2=_interopRequireDefault(_domHelpersQueryIsWindow);var _domHelpersOwnerDocument=__webpack_require__(52);var _domHelpersOwnerDocument2=_interopRequireDefault(_domHelpersOwnerDocument);function isBody(node){return node&&node.tagName.toLowerCase()==='body';}function bodyIsOverflowing(node){var doc=_domHelpersOwnerDocument2['default'](node);var win=_domHelpersQueryIsWindow2['default'](doc);var fullWidth=win.innerWidth; // Support: ie8, no innerWidth
	if(!fullWidth){var documentElementRect=doc.documentElement.getBoundingClientRect();fullWidth=documentElementRect.right-Math.abs(documentElementRect.left);}return doc.body.clientWidth<fullWidth;}function isOverflowing(container){var win=_domHelpersQueryIsWindow2['default'](container);return win||isBody(container)?bodyIsOverflowing(container):container.scrollHeight>container.clientHeight;}module.exports=exports['default']; /***/}, /* 70 */ /***/function(module,exports){'use strict';module.exports=function getWindow(node){return node===node.window?node:node.nodeType===9?node.defaultView||node.parentWindow:false;}; /***/}, /* 71 */ /***/function(module,exports){'use strict';exports.__esModule=true;exports.ariaHidden=ariaHidden;exports.hideSiblings=hideSiblings;exports.showSiblings=showSiblings;var BLACKLIST=['template','script','style'];var isHidable=function isHidable(_ref){var nodeType=_ref.nodeType;var tagName=_ref.tagName;return nodeType===1&&BLACKLIST.indexOf(tagName.toLowerCase())===-1;};var siblings=function siblings(container,mount,cb){mount=[].concat(mount);[].forEach.call(container.children,function(node){if(mount.indexOf(node)===-1&&isHidable(node)){cb(node);}});};function ariaHidden(show,node){if(!node){return;}if(show){node.setAttribute('aria-hidden','true');}else {node.removeAttribute('aria-hidden');}}function hideSiblings(container,mountNode){siblings(container,mountNode,function(node){return ariaHidden(true,node);});}function showSiblings(container,mountNode){siblings(container,mountNode,function(node){return ariaHidden(false,node);});} /***/}, /* 72 */ /***/function(module,exports,__webpack_require__){'use strict';exports.__esModule=true;function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var _domHelpersEventsOn=__webpack_require__(73);var _domHelpersEventsOn2=_interopRequireDefault(_domHelpersEventsOn);var _domHelpersEventsOff=__webpack_require__(74);var _domHelpersEventsOff2=_interopRequireDefault(_domHelpersEventsOff);exports['default']=function(node,event,handler){_domHelpersEventsOn2['default'](node,event,handler);return {remove:function remove(){_domHelpersEventsOff2['default'](node,event,handler);}};};module.exports=exports['default']; /***/}, /* 73 */ /***/function(module,exports,__webpack_require__){'use strict';var canUseDOM=__webpack_require__(68);var on=function on(){};if(canUseDOM){on=function(){if(document.addEventListener)return function(node,eventName,handler,capture){return node.addEventListener(eventName,handler,capture||false);};else if(document.attachEvent)return function(node,eventName,handler){return node.attachEvent('on'+eventName,handler);};}();}module.exports=on; /***/}, /* 74 */ /***/function(module,exports,__webpack_require__){'use strict';var canUseDOM=__webpack_require__(68);var off=function off(){};if(canUseDOM){off=function(){if(document.addEventListener)return function(node,eventName,handler,capture){return node.removeEventListener(eventName,handler,capture||false);};else if(document.attachEvent)return function(node,eventName,handler){return node.detachEvent('on'+eventName,handler);};}();}module.exports=off; /***/}, /* 75 */ /***/function(module,exports){ /**
		 * Firefox doesn't have a focusin event so using capture is easiest way to get bubbling
		 * IE8 can't do addEventListener, but does have onfocusin, so we use that in ie8
		 *
		 * We only allow one Listener at a time to avoid stack overflows
		 */'use strict';exports.__esModule=true;exports['default']=addFocusListener;function addFocusListener(handler){var useFocusin=!document.addEventListener;var remove=undefined;if(useFocusin){document.attachEvent('onfocusin',handler);remove=function remove(){return document.detachEvent('onfocusin',handler);};}else {document.addEventListener('focus',handler,true);remove=function remove(){return document.removeEventListener('focus',handler,true);};}return {remove:remove};}module.exports=exports['default']; /***/}, /* 76 */ /***/function(module,exports,__webpack_require__){'use strict';var babelHelpers=__webpack_require__(61);exports.__esModule=true; /**
		 * document.activeElement
		 */exports['default']=activeElement;var _ownerDocument=__webpack_require__(52);var _ownerDocument2=babelHelpers.interopRequireDefault(_ownerDocument);function activeElement(){var doc=arguments[0]===undefined?document:arguments[0];try{return doc.activeElement;}catch(e){}}module.exports=exports['default']; /***/}, /* 77 */ /***/function(module,exports,__webpack_require__){'use strict';var canUseDOM=__webpack_require__(68);var contains=function(){var root=canUseDOM&&document.documentElement;return root&&root.contains?function(context,node){return context.contains(node);}:root&&root.compareDocumentPosition?function(context,node){return context===node||!!(context.compareDocumentPosition(node)&16);}:function(context,node){if(node)do {if(node===context)return true;}while(node=node.parentNode);return false;};}();module.exports=contains; /***/}, /* 78 */ /***/function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _typeof=typeof Symbol==="function"&&_typeof2(Symbol.iterator)==="symbol"?function(obj){return typeof obj==='undefined'?'undefined':_typeof2(obj);}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol?"symbol":typeof obj==='undefined'?'undefined':_typeof2(obj);};exports['default']=function(identifier,configure){return function(Component){var displayName=Component.displayName||Component.name||"Component";(0,_invariant2['default'])(identifier&&(typeof identifier==="string"||(typeof identifier==="undefined"?"undefined":_typeof(identifier))==="symbol"||typeof identifier==="function"),"Expected identifier to be string, symbol or function. See %s",displayName);if(configure){(0,_invariant2['default'])(typeof configure==="function","Expected configure to be a function. See %s",displayName);}return _react2['default'].createClass({displayName:displayName+"ContextMenuLayer",getDefaultProps:function getDefaultProps(){return {renderTag:"div",attributes:{}};},handleContextClick:function handleContextClick(event){var currentItem=typeof configure==="function"?configure(this.props):{};(0,_invariant2['default'])((0,_lodash2['default'])(currentItem),"Expected configure to return an object. See %s",displayName);event.preventDefault();_store2['default'].dispatch({type:"SET_PARAMS",data:{x:event.clientX,y:event.clientY,currentItem:currentItem,isVisible:typeof identifier==="function"?identifier(this.props):identifier}});},render:function render(){var _props=this.props;var _props$attributes=_props.attributes;var _props$attributes$cla=_props$attributes.className;var className=_props$attributes$cla===undefined?"":_props$attributes$cla;var attributes=_objectWithoutProperties(_props$attributes,["className"]);var renderTag=_props.renderTag;var props=_objectWithoutProperties(_props,["attributes","renderTag"]);attributes.className="react-context-menu-wrapper "+className;attributes.onContextMenu=this.handleContextClick;return _react2['default'].createElement(renderTag,attributes,_react2['default'].createElement(Component,props));}});};};var _react=__webpack_require__(2);var _react2=_interopRequireDefault(_react);var _invariant=__webpack_require__(79);var _invariant2=_interopRequireDefault(_invariant);var _lodash=__webpack_require__(80);var _lodash2=_interopRequireDefault(_lodash);var _store=__webpack_require__(26);var _store2=_interopRequireDefault(_store);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}function _objectWithoutProperties(obj,keys){var target={};for(var i in obj){if(keys.indexOf(i)>=0)continue;if(!Object.prototype.hasOwnProperty.call(obj,i))continue;target[i]=obj[i];}return target;} /***/}, /* 79 */ /***/function(module,exports,__webpack_require__){ /* WEBPACK VAR INJECTION */(function(process){ /**
		 * Copyright 2013-2015, Facebook, Inc.
		 * All rights reserved.
		 *
		 * This source code is licensed under the BSD-style license found in the
		 * LICENSE file in the root directory of this source tree. An additional grant
		 * of patent rights can be found in the PATENTS file in the same directory.
		 */'use strict'; /**
		 * Use invariant() to assert state which your program assumes to be true.
		 *
		 * Provide sprintf-style format (only %s is supported) and arguments
		 * to provide information about what broke and what you were
		 * expecting.
		 *
		 * The invariant message will be stripped in production, but the invariant
		 * will remain to ensure logic does not differ in production.
		 */var invariant=function invariant(condition,format,a,b,c,d,e,f){if(process.env.NODE_ENV!=='production'){if(format===undefined){throw new Error('invariant requires an error message argument');}}if(!condition){var error;if(format===undefined){error=new Error('Minified exception occurred; use the non-minified dev environment '+'for the full error message and additional helpful warnings.');}else {var args=[a,b,c,d,e,f];var argIndex=0;error=new Error(format.replace(/%s/g,function(){return args[argIndex++];}));error.name='Invariant Violation';}error.framesToPop=1; // we don't care about invariant's own frame
	throw error;}};module.exports=invariant; /* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(28)); /***/}, /* 80 */ /***/function(module,exports){ /**
		 * lodash 3.0.2 (Custom Build) <https://lodash.com/>
		 * Build: `lodash modern modularize exports="npm" -o ./`
		 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
		 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
		 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
		 * Available under MIT license <https://lodash.com/license>
		 */ /**
		 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
		 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
		 *
		 * @static
		 * @memberOf _
		 * @category Lang
		 * @param {*} value The value to check.
		 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
		 * @example
		 *
		 * _.isObject({});
		 * // => true
		 *
		 * _.isObject([1, 2, 3]);
		 * // => true
		 *
		 * _.isObject(1);
		 * // => false
		 */function isObject(value){ // Avoid a V8 JIT bug in Chrome 19-20.
	// See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	var type=typeof value==='undefined'?'undefined':_typeof2(value);return !!value&&(type=='object'||type=='function');}module.exports=isObject; /***/}, /* 81 */ /***/function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _react=__webpack_require__(2);var _react2=_interopRequireDefault(_react);var _classnames=__webpack_require__(82);var _classnames2=_interopRequireDefault(_classnames);var _objectAssign=__webpack_require__(42);var _objectAssign2=_interopRequireDefault(_objectAssign);var _monitor=__webpack_require__(44);var _monitor2=_interopRequireDefault(_monitor);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}function _objectWithoutProperties(obj,keys){var target={};for(var i in obj){if(keys.indexOf(i)>=0)continue;if(!Object.prototype.hasOwnProperty.call(obj,i))continue;target[i]=obj[i];}return target;}var PropTypes=_react2['default'].PropTypes;var MenuItem=_react2['default'].createClass({displayName:"MenuItem",propTypes:{onClick:PropTypes.func.isRequired,data:PropTypes.object,disabled:PropTypes.bool,preventClose:PropTypes.bool},getDefaultProps:function getDefaultProps(){return {disabled:false,data:{},attributes:{}};},handleClick:function handleClick(event){var _props=this.props;var disabled=_props.disabled;var onClick=_props.onClick;var data=_props.data;var preventClose=_props.preventClose;event.preventDefault();if(disabled)return;(0,_objectAssign2['default'])(data,_monitor2['default'].getItem());if(typeof onClick==="function"){onClick(event,data);}if(preventClose)return;_monitor2['default'].hideMenu();},render:function render(){var _props2=this.props;var disabled=_props2.disabled;var children=_props2.children;var _props2$attributes=_props2.attributes;var _props2$attributes$cl=_props2$attributes.className;var className=_props2$attributes$cl===undefined?"":_props2$attributes$cl;var props=_objectWithoutProperties(_props2$attributes,["className"]);var menuItemClassNames="react-context-menu-item "+className;var classes=(0,_classnames2['default'])({"react-context-menu-link":true,disabled:disabled});return _react2['default'].createElement("div",_extends({className:menuItemClassNames},props),_react2['default'].createElement("a",{href:"#",className:classes,onClick:this.handleClick},children));}});exports['default']=MenuItem; /***/}, /* 82 */ /***/function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__; /*!
		  Copyright (c) 2016 Jed Watson.
		  Licensed under the MIT License (MIT), see
		  http://jedwatson.github.io/classnames
		*/ /* global define */(function(){'use strict';var hasOwn={}.hasOwnProperty;function classNames(){var classes=[];for(var i=0;i<arguments.length;i++){var arg=arguments[i];if(!arg)continue;var argType=typeof arg==='undefined'?'undefined':_typeof2(arg);if(argType==='string'||argType==='number'){classes.push(arg);}else if(Array.isArray(arg)){classes.push(classNames.apply(null,arg));}else if(argType==='object'){for(var key in arg){if(hasOwn.call(arg,key)&&arg[key]){classes.push(key);}}}}return classes.join(' ');}if(typeof module!=='undefined'&&module.exports){module.exports=classNames;}else if(true){ // register as 'classnames', consistent with npm package name
	!(__WEBPACK_AMD_DEFINE_ARRAY__=[],__WEBPACK_AMD_DEFINE_RESULT__=function(){return classNames;}.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__),__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else {window.classNames=classNames;}})(); /***/}, /* 83 */ /***/function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _react=__webpack_require__(2);var _react2=_interopRequireDefault(_react);var _classnames=__webpack_require__(82);var _classnames2=_interopRequireDefault(_classnames);var _wrapper=__webpack_require__(84);var _wrapper2=_interopRequireDefault(_wrapper);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var menuStyles={position:"relative",zIndex:"auto"};var SubMenu=_react2['default'].createClass({displayName:"SubMenu",propTypes:{title:_react2['default'].PropTypes.string.isRequired,disabled:_react2['default'].PropTypes.bool,hoverDelay:_react2['default'].PropTypes.number},getDefaultProps:function getDefaultProps(){return {hoverDelay:500};},getInitialState:function getInitialState(){return {visible:false};},shouldComponentUpdate:function shouldComponentUpdate(nextProps,nextState){return this.state.isVisible!==nextState.visible;},handleClick:function handleClick(e){e.preventDefault();},handleMouseEnter:function handleMouseEnter(){var _this=this;if(this.closetimer)clearTimeout(this.closetimer);if(this.props.disabled||this.state.visible)return;this.opentimer=setTimeout(function(){return _this.setState({visible:true});},this.props.hoverDelay);},handleMouseLeave:function handleMouseLeave(){var _this2=this;if(this.opentimer)clearTimeout(this.opentimer);if(!this.state.visible)return;this.closetimer=setTimeout(function(){return _this2.setState({visible:false});},this.props.hoverDelay);},render:function render(){var _this3=this;var _props=this.props;var disabled=_props.disabled;var children=_props.children;var title=_props.title;var visible=this.state.visible;var classes=(0,_classnames2['default'])({"react-context-menu-link":true,disabled:disabled,active:visible}),menuClasses="react-context-menu-item submenu";return _react2['default'].createElement("div",{ref:function ref(c){return _this3.item=c;},className:menuClasses,style:menuStyles,onMouseEnter:this.handleMouseEnter,onMouseLeave:this.handleMouseLeave},_react2['default'].createElement("a",{href:"#",className:classes,onClick:this.handleClick},title),_react2['default'].createElement(_wrapper2['default'],{visible:visible},children));}});exports['default']=SubMenu; /***/}, /* 84 */ /***/function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _react=__webpack_require__(2);var _react2=_interopRequireDefault(_react);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var SubMenuWrapper=_react2['default'].createClass({displayName:"SubMenuWrapper",propTypes:{visible:_react2['default'].PropTypes.bool},getInitialState:function getInitialState(){return {position:{top:true,right:true}};},componentWillReceiveProps:function componentWillReceiveProps(nextProps){var _this=this;if(nextProps.visible){var wrapper=window.requestAnimationFrame||setTimeout;wrapper(function(){_this.setState(_this.getMenuPosition());_this.forceUpdate();});}else {this.setState(this.getInitialState());}},shouldComponentUpdate:function shouldComponentUpdate(nextProps){return this.props.visible!==nextProps.visible;},getMenuPosition:function getMenuPosition(){var _window=window;var innerWidth=_window.innerWidth;var innerHeight=_window.innerHeight;var rect=this.menu.getBoundingClientRect();var position={};if(rect.bottom>innerHeight){position.bottom=true;}else {position.top=true;}if(rect.right>innerWidth){position.left=true;}else {position.right=true;}return {position:position};},getPositionStyles:function getPositionStyles(){var style={};var position=this.state.position;if(position.top)style.top=0;if(position.bottom)style.bottom=0;if(position.right)style.left="100%";if(position.left)style.right="100%";return style;},render:function render(){var _this2=this;var _props=this.props;var children=_props.children;var visible=_props.visible;var style=_extends({display:visible?"block":"none",position:"absolute"},this.getPositionStyles());return _react2['default'].createElement("nav",{ref:function ref(c){return _this2.menu=c;},style:style,className:"react-context-menu"},children);}});exports['default']=SubMenuWrapper; /***/}, /* 85 */ /***/function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};exports['default']=function(Component){var displayName=Component.displayName||Component.name||"Component";return _react2['default'].createClass({displayName:"ContextMenuConnector("+displayName+")",getInitialState:function getInitialState(){return {item:_store2['default'].getState().currentItem};},componentDidMount:function componentDidMount(){this.unsubscribe=_store2['default'].subscribe(this.handleUpdate);},componentWillUnmount:function componentWillUnmount(){this.unsubscribe();},handleUpdate:function handleUpdate(){this.setState(this.getInitialState());},render:function render(){return _react2['default'].createElement(Component,_extends({},this.props,{item:this.state.item}));}});};var _react=__webpack_require__(2);var _react2=_interopRequireDefault(_react);var _store=__webpack_require__(26);var _store2=_interopRequireDefault(_store);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};} /***/}, /* 86 */ /***/function(module,exports,__webpack_require__){'use strict';var _reactDom=__webpack_require__(3);var _reactDom2=_interopRequireDefault(_reactDom);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var ScrollShim={appendScrollShim:function appendScrollShim(){if(!this._scrollShim){var size=this._scrollShimSize();var shim=document.createElement('div');if(shim.classList){shim.classList.add('react-grid-ScrollShim'); // flow - not compatible with HTMLElement
	}else {shim.className+=' react-grid-ScrollShim';}shim.style.position='absolute';shim.style.top=0;shim.style.left=0;shim.style.width=size.width+'px';shim.style.height=size.height+'px';_reactDom2['default'].findDOMNode(this).appendChild(shim);this._scrollShim=shim;}this._scheduleRemoveScrollShim();},_scrollShimSize:function _scrollShimSize(){return {width:this.props.width,height:this.props.length*this.props.rowHeight};},_scheduleRemoveScrollShim:function _scheduleRemoveScrollShim(){if(this._scheduleRemoveScrollShimTimer){clearTimeout(this._scheduleRemoveScrollShimTimer);}this._scheduleRemoveScrollShimTimer=setTimeout(this._removeScrollShim,200);},_removeScrollShim:function _removeScrollShim(){if(this._scrollShim){this._scrollShim.parentNode.removeChild(this._scrollShim);this._scrollShim=undefined;}}};module.exports=ScrollShim; /***/}, /* 87 */ /***/function(module,exports,__webpack_require__){'use strict';var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var React=__webpack_require__(2);var joinClasses=__webpack_require__(6);var Cell=__webpack_require__(88);var ColumnMetrics=__webpack_require__(8);var ColumnUtilsMixin=__webpack_require__(10);var cellMetaDataShape=__webpack_require__(94);var PropTypes=React.PropTypes;var Row=React.createClass({displayName:'Row',propTypes:{height:PropTypes.number.isRequired,columns:PropTypes.oneOfType([PropTypes.object,PropTypes.array]).isRequired,row:PropTypes.any.isRequired,cellRenderer:PropTypes.func,cellMetaData:PropTypes.shape(cellMetaDataShape),isSelected:PropTypes.bool,idx:PropTypes.number.isRequired,key:PropTypes.string,expandedRows:PropTypes.arrayOf(PropTypes.object),extraClasses:PropTypes.string,forceUpdate:PropTypes.bool},mixins:[ColumnUtilsMixin],getDefaultProps:function getDefaultProps(){return {cellRenderer:Cell,isSelected:false,height:35};},shouldComponentUpdate:function shouldComponentUpdate(nextProps){return !ColumnMetrics.sameColumns(this.props.columns,nextProps.columns,ColumnMetrics.sameColumn)||this.doesRowContainSelectedCell(this.props)||this.doesRowContainSelectedCell(nextProps)||this.willRowBeDraggedOver(nextProps)||nextProps.row!==this.props.row||this.hasRowBeenCopied()||this.props.isSelected!==nextProps.isSelected||nextProps.height!==this.props.height||this.props.forceUpdate===true;},handleDragEnter:function handleDragEnter(){var handleDragEnterRow=this.props.cellMetaData.handleDragEnterRow;if(handleDragEnterRow){handleDragEnterRow(this.props.idx);}},getSelectedColumn:function getSelectedColumn(){if(this.props.cellMetaData){var selected=this.props.cellMetaData.selected;if(selected&&selected.idx){return this.getColumn(this.props.columns,selected.idx);}}},getCells:function getCells(){var _this=this;var cells=[];var lockedCells=[];var selectedColumn=this.getSelectedColumn();if(this.props.columns){this.props.columns.forEach(function(column,i){var CellRenderer=_this.props.cellRenderer;var cell=React.createElement(CellRenderer,{ref:i,key:column.key+'-'+i,idx:i,rowIdx:_this.props.idx,value:_this.getCellValue(column.key||i),column:column,height:_this.getRowHeight(),formatter:column.formatter,cellMetaData:_this.props.cellMetaData,rowData:_this.props.row,selectedColumn:selectedColumn,isRowSelected:_this.props.isSelected});if(column.locked){lockedCells.push(cell);}else {cells.push(cell);}});}return cells.concat(lockedCells);},getRowHeight:function getRowHeight(){var rows=this.props.expandedRows||null;if(rows&&this.props.key){var row=rows[this.props.key]||null;if(row){return row.height;}}return this.props.height;},getCellValue:function getCellValue(key){var val=void 0;if(key==='select-row'){return this.props.isSelected;}else if(typeof this.props.row.get==='function'){val=this.props.row.get(key);}else {val=this.props.row[key];}return val;},setScrollLeft:function setScrollLeft(scrollLeft){var _this2=this;this.props.columns.forEach(function(column,i){if(column.locked){if(!_this2.refs[i])return;_this2.refs[i].setScrollLeft(scrollLeft);}});},doesRowContainSelectedCell:function doesRowContainSelectedCell(props){var selected=props.cellMetaData.selected;if(selected&&selected.rowIdx===props.idx){return true;}return false;},isContextMenuDisplayed:function isContextMenuDisplayed(){if(this.props.cellMetaData){var selected=this.props.cellMetaData.selected;if(selected&&selected.contextMenuDisplayed&&selected.rowIdx===this.props.idx){return true;}}return false;},willRowBeDraggedOver:function willRowBeDraggedOver(props){var dragged=props.cellMetaData.dragged;return dragged!=null&&(dragged.rowIdx>=0||dragged.complete===true);},hasRowBeenCopied:function hasRowBeenCopied(){var copied=this.props.cellMetaData.copied;return copied!=null&&copied.rowIdx===this.props.idx;},renderCell:function renderCell(props){if(typeof this.props.cellRenderer==='function'){this.props.cellRenderer.call(this,props);}if(React.isValidElement(this.props.cellRenderer)){return React.cloneElement(this.props.cellRenderer,props);}return this.props.cellRenderer(props);},render:function render(){var className=joinClasses('react-grid-Row','react-grid-Row--'+(this.props.idx%2===0?'even':'odd'),{'row-selected':this.props.isSelected,'row-context-menu':this.isContextMenuDisplayed()},this.props.extraClasses);var style={height:this.getRowHeight(this.props),overflow:'hidden'};var cells=this.getCells();return React.createElement('div',_extends({},this.props,{className:className,style:style,onDragEnter:this.handleDragEnter}),React.isValidElement(this.props.row)?this.props.row:cells);}});module.exports=Row; /***/}, /* 88 */ /***/function(module,exports,__webpack_require__){'use strict';var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var React=__webpack_require__(2);var ReactDOM=__webpack_require__(3);var joinClasses=__webpack_require__(6);var EditorContainer=__webpack_require__(89);var ExcelColumn=__webpack_require__(15);var isFunction=__webpack_require__(93);var CellMetaDataShape=__webpack_require__(94);var SimpleCellFormatter=__webpack_require__(95);var ColumnUtils=__webpack_require__(10);var Cell=React.createClass({displayName:'Cell',propTypes:{rowIdx:React.PropTypes.number.isRequired,idx:React.PropTypes.number.isRequired,selected:React.PropTypes.shape({idx:React.PropTypes.number.isRequired}),selectedColumn:React.PropTypes.object,height:React.PropTypes.number,tabIndex:React.PropTypes.number,ref:React.PropTypes.string,column:React.PropTypes.shape(ExcelColumn).isRequired,value:React.PropTypes.oneOfType([React.PropTypes.string,React.PropTypes.number,React.PropTypes.object,React.PropTypes.bool]).isRequired,isExpanded:React.PropTypes.bool,isRowSelected:React.PropTypes.bool,cellMetaData:React.PropTypes.shape(CellMetaDataShape).isRequired,handleDragStart:React.PropTypes.func,className:React.PropTypes.string,cellControls:React.PropTypes.any,rowData:React.PropTypes.object.isRequired,forceUpdate:React.PropTypes.bool},getDefaultProps:function getDefaultProps(){return {tabIndex:-1,ref:'cell',isExpanded:false};},getInitialState:function getInitialState(){return {isCellValueChanging:false,oldRowData:{},newRowData:{}};},componentDidMount:function componentDidMount(){this.checkFocus();},componentWillReceiveProps:function componentWillReceiveProps(nextProps){this.setState({isCellValueChanging:this.props.value!==nextProps.value,oldRowData:this.props.rowData,newRowData:nextProps.rowData});},componentDidUpdate:function componentDidUpdate(){this.checkFocus();var dragged=this.props.cellMetaData.dragged;if(dragged&&dragged.complete===true){this.props.cellMetaData.handleTerminateDrag();}if(this.state.isCellValueChanging&&this.props.selectedColumn!=null){this.applyUpdateClass();}},shouldComponentUpdate:function shouldComponentUpdate(nextProps){return this.props.column.width!==nextProps.column.width||this.props.column.left!==nextProps.column.left||this.props.height!==nextProps.height||this.props.rowIdx!==nextProps.rowIdx||this.isCellSelectionChanging(nextProps)||this.isDraggedCellChanging(nextProps)||this.isCopyCellChanging(nextProps)||this.props.isRowSelected!==nextProps.isRowSelected||this.isSelected()||this.props.value!==nextProps.value||this.props.forceUpdate===true;},onCellClick:function onCellClick(e){var meta=this.props.cellMetaData;if(meta!=null&&meta.onCellClick&&typeof meta.onCellClick==='function'){meta.onCellClick({rowIdx:this.props.rowIdx,idx:this.props.idx},e);}},onCellContextMenu:function onCellContextMenu(){var meta=this.props.cellMetaData;if(meta!=null&&meta.onCellContextMenu&&typeof meta.onCellContextMenu==='function'){meta.onCellContextMenu({rowIdx:this.props.rowIdx,idx:this.props.idx});}},onCellDoubleClick:function onCellDoubleClick(e){var meta=this.props.cellMetaData;if(meta!=null&&meta.onCellDoubleClick&&typeof meta.onCellDoubleClick==='function'){meta.onCellDoubleClick({rowIdx:this.props.rowIdx,idx:this.props.idx},e);}},onDragHandleDoubleClick:function onDragHandleDoubleClick(e){e.stopPropagation();var meta=this.props.cellMetaData;if(meta!=null&&meta.onDragHandleDoubleClick&&typeof meta.onDragHandleDoubleClick==='function'){meta.onDragHandleDoubleClick({rowIdx:this.props.rowIdx,idx:this.props.idx,rowData:this.getRowData(),e:e});}},onDragOver:function onDragOver(e){e.preventDefault();},getStyle:function getStyle(){var style={position:'absolute',width:this.props.column.width,height:this.props.height,left:this.props.column.left};return style;},getFormatter:function getFormatter(){var col=this.props.column;if(this.isActive()){return React.createElement(EditorContainer,{rowData:this.getRowData(),rowIdx:this.props.rowIdx,idx:this.props.idx,cellMetaData:this.props.cellMetaData,column:col,height:this.props.height});}return this.props.column.formatter;},getRowData:function getRowData(){return this.props.rowData.toJSON?this.props.rowData.toJSON():this.props.rowData;},getFormatterDependencies:function getFormatterDependencies(){ // convention based method to get corresponding Id or Name of any Name or Id property
	if(typeof this.props.column.getRowMetaData==='function'){return this.props.column.getRowMetaData(this.getRowData(),this.props.column);}},getCellClass:function getCellClass(){var className=joinClasses(this.props.column.cellClass,'react-grid-Cell',this.props.className,this.props.column.locked?'react-grid-Cell--locked':null);var extraClasses=joinClasses({'row-selected':this.props.isRowSelected,selected:this.isSelected()&&!this.isActive()&&this.isCellSelectEnabled(),editing:this.isActive(),copied:this.isCopied()||this.wasDraggedOver()||this.isDraggedOverUpwards()||this.isDraggedOverDownwards(),'active-drag-cell':this.isSelected()||this.isDraggedOver(),'is-dragged-over-up':this.isDraggedOverUpwards(),'is-dragged-over-down':this.isDraggedOverDownwards(),'was-dragged-over':this.wasDraggedOver()});return joinClasses(className,extraClasses);},getUpdateCellClass:function getUpdateCellClass(){return this.props.column.getUpdateCellClass?this.props.column.getUpdateCellClass(this.props.selectedColumn,this.props.column,this.state.isCellValueChanging,this.state.oldRowData,this.state.newRowData):'';},isColumnSelected:function isColumnSelected(){var meta=this.props.cellMetaData;if(meta==null){return false;}return meta.selected&&meta.selected.idx===this.props.idx;},isSelected:function isSelected(){var meta=this.props.cellMetaData;if(meta==null){return false;}return meta.selected&&meta.selected.rowIdx===this.props.rowIdx&&meta.selected.idx===this.props.idx;},isActive:function isActive(){var meta=this.props.cellMetaData;if(meta==null){return false;}return this.isSelected()&&meta.selected.active===true;},isCellSelectionChanging:function isCellSelectionChanging(nextProps){var meta=this.props.cellMetaData;if(meta==null){return false;}var nextSelected=nextProps.cellMetaData.selected;if(meta.selected&&nextSelected){return this.props.idx===nextSelected.idx||this.props.idx===meta.selected.idx;}return true;},isCellSelectEnabled:function isCellSelectEnabled(){var meta=this.props.cellMetaData;if(meta==null){return false;}return meta.enableCellSelect;},applyUpdateClass:function applyUpdateClass(){var updateCellClass=this.getUpdateCellClass(); // -> removing the class
	if(updateCellClass!=null&&updateCellClass!==''){var cellDOMNode=ReactDOM.findDOMNode(this);if(cellDOMNode.classList){cellDOMNode.classList.remove(updateCellClass); // -> and re-adding the class
	cellDOMNode.classList.add(updateCellClass);}else if(cellDOMNode.className.indexOf(updateCellClass)===-1){ // IE9 doesn't support classList, nor (I think) altering element.className
	// without replacing it wholesale.
	cellDOMNode.className=cellDOMNode.className+' '+updateCellClass;}}},setScrollLeft:function setScrollLeft(scrollLeft){var ctrl=this; // flow on windows has an outdated react declaration, once that gets updated, we can remove this
	if(ctrl.isMounted()){var node=ReactDOM.findDOMNode(this);var transform='translate3d('+scrollLeft+'px, 0px, 0px)';node.style.webkitTransform=transform;node.style.transform=transform;}},isCopied:function isCopied(){var copied=this.props.cellMetaData.copied;return copied&&copied.rowIdx===this.props.rowIdx&&copied.idx===this.props.idx;},isDraggedOver:function isDraggedOver(){var dragged=this.props.cellMetaData.dragged;return dragged&&dragged.overRowIdx===this.props.rowIdx&&dragged.idx===this.props.idx;},wasDraggedOver:function wasDraggedOver(){var dragged=this.props.cellMetaData.dragged;return dragged&&(dragged.overRowIdx<this.props.rowIdx&&this.props.rowIdx<dragged.rowIdx||dragged.overRowIdx>this.props.rowIdx&&this.props.rowIdx>dragged.rowIdx)&&dragged.idx===this.props.idx;},isDraggedCellChanging:function isDraggedCellChanging(nextProps){var isChanging=void 0;var dragged=this.props.cellMetaData.dragged;var nextDragged=nextProps.cellMetaData.dragged;if(dragged){isChanging=nextDragged&&this.props.idx===nextDragged.idx||dragged&&this.props.idx===dragged.idx;return isChanging;}return false;},isCopyCellChanging:function isCopyCellChanging(nextProps){var isChanging=void 0;var copied=this.props.cellMetaData.copied;var nextCopied=nextProps.cellMetaData.copied;if(copied){isChanging=nextCopied&&this.props.idx===nextCopied.idx||copied&&this.props.idx===copied.idx;return isChanging;}return false;},isDraggedOverUpwards:function isDraggedOverUpwards(){var dragged=this.props.cellMetaData.dragged;return !this.isSelected()&&this.isDraggedOver()&&this.props.rowIdx<dragged.rowIdx;},isDraggedOverDownwards:function isDraggedOverDownwards(){var dragged=this.props.cellMetaData.dragged;return !this.isSelected()&&this.isDraggedOver()&&this.props.rowIdx>dragged.rowIdx;},checkFocus:function checkFocus(){if(this.isSelected()&&!this.isActive()){ // determine the parent viewport element of this cell
	var parentViewport=ReactDOM.findDOMNode(this);while(parentViewport!=null&&parentViewport.className.indexOf('react-grid-Viewport')===-1){parentViewport=parentViewport.parentElement;}var focusInGrid=false; // if the focus is on the body of the document, the user won't mind if we focus them on a cell
	if(document.activeElement==null||document.activeElement.nodeName&&typeof document.activeElement.nodeName==='string'&&document.activeElement.nodeName.toLowerCase()==='body'){focusInGrid=true; // otherwise
	}else { // only pull focus if the currently focused element is contained within the viewport
	if(parentViewport){var focusedParent=document.activeElement;while(focusedParent!=null){if(focusedParent===parentViewport){focusInGrid=true;break;}focusedParent=focusedParent.parentElement;}}}if(focusInGrid){ReactDOM.findDOMNode(this).focus();}}},createColumEventCallBack:function createColumEventCallBack(onColumnEvent,info){return function(e){onColumnEvent(e,info);};},createCellEventCallBack:function createCellEventCallBack(gridEvent,columnEvent){return function(e){gridEvent(e);columnEvent(e);};},createEventDTO:function createEventDTO(gridEvents,columnEvents,onColumnEvent){var allEvents=Object.assign({},gridEvents);for(var eventKey in columnEvents){if(columnEvents.hasOwnProperty(eventKey)){var event=columnEvents[event];var eventInfo={rowIdx:this.props.rowIdx,idx:this.props.idx,name:eventKey};var eventCallback=this.createColumEventCallBack(onColumnEvent,eventInfo);if(allEvents.hasOwnProperty(eventKey)){var currentEvent=allEvents[eventKey];allEvents[eventKey]=this.createCellEventCallBack(currentEvent,eventCallback);}else {allEvents[eventKey]=eventCallback;}}}return allEvents;},getEvents:function getEvents(){var columnEvents=this.props.column?Object.assign({},this.props.column.events):undefined;var onColumnEvent=this.props.cellMetaData?this.props.cellMetaData.onColumnEvent:undefined;var gridEvents={onClick:this.onCellClick,onDoubleClick:this.onCellDoubleClick,onDragOver:this.onDragOver};if(!columnEvents||!onColumnEvent){return gridEvents;}return this.createEventDTO(gridEvents,columnEvents,onColumnEvent);},renderCellContent:function renderCellContent(props){var CellContent=void 0;var Formatter=this.getFormatter();if(React.isValidElement(Formatter)){props.dependentValues=this.getFormatterDependencies();CellContent=React.cloneElement(Formatter,props);}else if(isFunction(Formatter)){CellContent=React.createElement(Formatter,{value:this.props.value,dependentValues:this.getFormatterDependencies()});}else {CellContent=React.createElement(SimpleCellFormatter,{value:this.props.value});}return React.createElement('div',{ref:'cell',className:'react-grid-Cell__value'},CellContent,' ',this.props.cellControls);},render:function render(){var style=this.getStyle();var className=this.getCellClass();var cellContent=this.renderCellContent({value:this.props.value,column:this.props.column,rowIdx:this.props.rowIdx,isExpanded:this.props.isExpanded});var dragHandle=!this.isActive()&&ColumnUtils.canEdit(this.props.column,this.props.rowData,this.props.cellMetaData.enableCellSelect)?React.createElement('div',{className:'drag-handle',draggable:'true',onDoubleClick:this.onDragHandleDoubleClick},React.createElement('span',{style:{display:'none'}})):null;var events=this.getEvents();return React.createElement('div',_extends({},this.props,{className:className,style:style,onContextMenu:this.onCellContextMenu},events),cellContent,dragHandle);}});module.exports=Cell; /***/}, /* 89 */ /***/function(module,exports,__webpack_require__){'use strict';var React=__webpack_require__(2);var joinClasses=__webpack_require__(6);var keyboardHandlerMixin=__webpack_require__(90);var SimpleTextEditor=__webpack_require__(91);var isFunction=__webpack_require__(93);var EditorContainer=React.createClass({displayName:'EditorContainer',mixins:[keyboardHandlerMixin],propTypes:{rowIdx:React.PropTypes.number,rowData:React.PropTypes.object.isRequired,value:React.PropTypes.oneOfType([React.PropTypes.string,React.PropTypes.number,React.PropTypes.object,React.PropTypes.bool]).isRequired,cellMetaData:React.PropTypes.shape({selected:React.PropTypes.object.isRequired,copied:React.PropTypes.object,dragged:React.PropTypes.object,onCellClick:React.PropTypes.func,onCellDoubleClick:React.PropTypes.func,onCommitCancel:React.PropTypes.func,onCommit:React.PropTypes.func}).isRequired,column:React.PropTypes.object.isRequired,height:React.PropTypes.number.isRequired},changeCommitted:false,getInitialState:function getInitialState(){return {isInvalid:false};},componentDidMount:function componentDidMount(){var inputNode=this.getInputNode();if(inputNode!==undefined){this.setTextInputFocus();if(!this.getEditor().disableContainerStyles){inputNode.className+=' editor-main';inputNode.style.height=this.props.height-1+'px';}}},componentWillUnmount:function componentWillUnmount(){if(!this.changeCommitted&&!this.hasEscapeBeenPressed()){this.commit({key:'Enter'});}},createEditor:function createEditor(){var _this=this;var editorRef=function editorRef(c){return _this.editor=c;};var editorProps={ref:editorRef,column:this.props.column,value:this.getInitialValue(),onCommit:this.commit,rowMetaData:this.getRowMetaData(),height:this.props.height,onBlur:this.commit,onOverrideKeyDown:this.onKeyDown};var customEditor=this.props.column.editor;if(customEditor&&React.isValidElement(customEditor)){ // return custom column editor or SimpleEditor if none specified
	return React.cloneElement(customEditor,editorProps);}return React.createElement(SimpleTextEditor,{ref:editorRef,column:this.props.column,value:this.getInitialValue(),onBlur:this.commit,rowMetaData:this.getRowMetaData(),onKeyDown:function onKeyDown(){},commit:function commit(){}});},onPressEnter:function onPressEnter(){this.commit({key:'Enter'});},onPressTab:function onPressTab(){this.commit({key:'Tab'});},onPressEscape:function onPressEscape(e){if(!this.editorIsSelectOpen()){this.props.cellMetaData.onCommitCancel();}else { // prevent event from bubbling if editor has results to select
	e.stopPropagation();}},onPressArrowDown:function onPressArrowDown(e){if(this.editorHasResults()){ // dont want to propogate as that then moves us round the grid
	e.stopPropagation();}else {this.commit(e);}},onPressArrowUp:function onPressArrowUp(e){if(this.editorHasResults()){ // dont want to propogate as that then moves us round the grid
	e.stopPropagation();}else {this.commit(e);}},onPressArrowLeft:function onPressArrowLeft(e){ // prevent event propogation. this disables left cell navigation
	if(!this.isCaretAtBeginningOfInput()){e.stopPropagation();}else {this.commit(e);}},onPressArrowRight:function onPressArrowRight(e){ // prevent event propogation. this disables right cell navigation
	if(!this.isCaretAtEndOfInput()){e.stopPropagation();}else {this.commit(e);}},editorHasResults:function editorHasResults(){if(isFunction(this.getEditor().hasResults)){return this.getEditor().hasResults();}return false;},editorIsSelectOpen:function editorIsSelectOpen(){if(isFunction(this.getEditor().isSelectOpen)){return this.getEditor().isSelectOpen();}return false;},getRowMetaData:function getRowMetaData(){ // clone row data so editor cannot actually change this
	// convention based method to get corresponding Id or Name of any Name or Id property
	if(typeof this.props.column.getRowMetaData==='function'){return this.props.column.getRowMetaData(this.props.rowData,this.props.column);}},getEditor:function getEditor(){return this.editor;},getInputNode:function getInputNode(){return this.getEditor().getInputNode();},getInitialValue:function getInitialValue(){var selected=this.props.cellMetaData.selected;var keyCode=selected.initialKeyCode;if(keyCode==='Delete'||keyCode==='Backspace'){return '';}else if(keyCode==='Enter'){return this.props.value;}var text=keyCode?String.fromCharCode(keyCode):this.props.value;return text;},getContainerClass:function getContainerClass(){return joinClasses({'has-error':this.state.isInvalid===true});},commit:function commit(args){var opts=args||{};var updated=this.getEditor().getValue();if(this.isNewValueValid(updated)){this.changeCommitted=true;var cellKey=this.props.column.key;this.props.cellMetaData.onCommit({cellKey:cellKey,rowIdx:this.props.rowIdx,updated:updated,key:opts.key});}},isNewValueValid:function isNewValueValid(value){if(isFunction(this.getEditor().validate)){var isValid=this.getEditor().validate(value);this.setState({isInvalid:!isValid});return isValid;}return true;},setCaretAtEndOfInput:function setCaretAtEndOfInput(){var input=this.getInputNode(); // taken from http://stackoverflow.com/questions/511088/use-javascript-to-place-cursor-at-end-of-text-in-text-input-element
	var txtLength=input.value.length;if(input.setSelectionRange){input.setSelectionRange(txtLength,txtLength);}else if(input.createTextRange){var fieldRange=input.createTextRange();fieldRange.moveStart('character',txtLength);fieldRange.collapse();fieldRange.select();}},isCaretAtBeginningOfInput:function isCaretAtBeginningOfInput(){var inputNode=this.getInputNode();return inputNode.selectionStart===inputNode.selectionEnd&&inputNode.selectionStart===0;},isCaretAtEndOfInput:function isCaretAtEndOfInput(){var inputNode=this.getInputNode();return inputNode.selectionStart===inputNode.value.length;},setTextInputFocus:function setTextInputFocus(){var selected=this.props.cellMetaData.selected;var keyCode=selected.initialKeyCode;var inputNode=this.getInputNode();inputNode.focus();if(inputNode.tagName==='INPUT'){if(!this.isKeyPrintable(keyCode)){inputNode.focus();inputNode.select();}else {inputNode.select();}}},hasEscapeBeenPressed:function hasEscapeBeenPressed(){var pressed=false;var escapeKey=27;if(window.event){if(window.event.keyCode===escapeKey){pressed=true;}else if(window.event.which===escapeKey){pressed=true;}}return pressed;},renderStatusIcon:function renderStatusIcon(){if(this.state.isInvalid===true){return React.createElement('span',{className:'glyphicon glyphicon-remove form-control-feedback'});}},render:function render(){return React.createElement('div',{className:this.getContainerClass(),onKeyDown:this.onKeyDown,commit:this.commit},this.createEditor(),this.renderStatusIcon());}});module.exports=EditorContainer; /***/}, /* 90 */ /***/function(module,exports){'use strict';var KeyboardHandlerMixin={onKeyDown:function onKeyDown(e){if(this.isCtrlKeyHeldDown(e)){this.checkAndCall('onPressKeyWithCtrl',e);}else if(this.isKeyExplicitlyHandled(e.key)){ // break up individual keyPress events to have their own specific callbacks
	// this allows multiple mixins to listen to onKeyDown events and somewhat reduces methodName clashing
	var callBack='onPress'+e.key;this.checkAndCall(callBack,e);}else if(this.isKeyPrintable(e.keyCode)){this.checkAndCall('onPressChar',e);}}, // taken from http://stackoverflow.com/questions/12467240/determine-if-javascript-e-keycode-is-a-printable-non-control-character
	isKeyPrintable:function isKeyPrintable(keycode){var valid=keycode>47&&keycode<58|| // number keys
	keycode===32||keycode===13|| // spacebar & return key(s) (if you want to allow carriage returns)
	keycode>64&&keycode<91|| // letter keys
	keycode>95&&keycode<112|| // numpad keys
	keycode>185&&keycode<193|| // ;=,-./` (in order)
	keycode>218&&keycode<223; // [\]' (in order)
	return valid;},isKeyExplicitlyHandled:function isKeyExplicitlyHandled(key){return typeof this['onPress'+key]==='function';},isCtrlKeyHeldDown:function isCtrlKeyHeldDown(e){return e.ctrlKey===true&&e.key!=='Control';},checkAndCall:function checkAndCall(methodName,args){if(typeof this[methodName]==='function'){this[methodName](args);}}};module.exports=KeyboardHandlerMixin; /***/}, /* 91 */ /***/function(module,exports,__webpack_require__){'use strict';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==='undefined'?'undefined':_typeof2(call))==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+(typeof superClass==='undefined'?'undefined':_typeof2(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var React=__webpack_require__(2);var EditorBase=__webpack_require__(92);var SimpleTextEditor=function(_EditorBase){_inherits(SimpleTextEditor,_EditorBase);function SimpleTextEditor(){_classCallCheck(this,SimpleTextEditor);return _possibleConstructorReturn(this,Object.getPrototypeOf(SimpleTextEditor).apply(this,arguments));}_createClass(SimpleTextEditor,[{key:'render',value:function render(){return React.createElement('input',{ref:'input',type:'text',onBlur:this.props.onBlur,className:'form-control',defaultValue:this.props.value});}}]);return SimpleTextEditor;}(EditorBase);module.exports=SimpleTextEditor; /***/}, /* 92 */ /***/function(module,exports,__webpack_require__){'use strict';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==='undefined'?'undefined':_typeof2(call))==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+(typeof superClass==='undefined'?'undefined':_typeof2(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var React=__webpack_require__(2);var ReactDOM=__webpack_require__(3);var ExcelColumn=__webpack_require__(15);var EditorBase=function(_React$Component){_inherits(EditorBase,_React$Component);function EditorBase(){_classCallCheck(this,EditorBase);return _possibleConstructorReturn(this,Object.getPrototypeOf(EditorBase).apply(this,arguments));}_createClass(EditorBase,[{key:'getStyle',value:function getStyle(){return {width:'100%'};}},{key:'getValue',value:function getValue(){var updated={};updated[this.props.column.key]=this.getInputNode().value;return updated;}},{key:'getInputNode',value:function getInputNode(){var domNode=ReactDOM.findDOMNode(this);if(domNode.tagName==='INPUT'){return domNode;}return domNode.querySelector('input:not([type=hidden])');}},{key:'inheritContainerStyles',value:function inheritContainerStyles(){return true;}}]);return EditorBase;}(React.Component);EditorBase.propTypes={onKeyDown:React.PropTypes.func.isRequired,value:React.PropTypes.any.isRequired,onBlur:React.PropTypes.func.isRequired,column:React.PropTypes.shape(ExcelColumn).isRequired,commit:React.PropTypes.func.isRequired};module.exports=EditorBase; /***/}, /* 93 */ /***/function(module,exports){'use strict';var isFunction=function isFunction(functionToCheck){var getType={};return functionToCheck&&getType.toString.call(functionToCheck)==='[object Function]';};module.exports=isFunction; /***/}, /* 94 */ /***/function(module,exports,__webpack_require__){'use strict';var PropTypes=__webpack_require__(2).PropTypes;module.exports={selected:PropTypes.object.isRequired,copied:PropTypes.object,dragged:PropTypes.object,onCellClick:PropTypes.func.isRequired,onCellDoubleClick:PropTypes.func.isRequired,onCommit:PropTypes.func.isRequired,onCommitCancel:PropTypes.func.isRequired,handleDragEnterRow:PropTypes.func.isRequired,handleTerminateDrag:PropTypes.func.isRequired}; /***/}, /* 95 */ /***/function(module,exports,__webpack_require__){'use strict';var React=__webpack_require__(2);var SimpleCellFormatter=React.createClass({displayName:'SimpleCellFormatter',propTypes:{value:React.PropTypes.oneOfType([React.PropTypes.string,React.PropTypes.number,React.PropTypes.object,React.PropTypes.bool]).isRequired},shouldComponentUpdate:function shouldComponentUpdate(nextProps){return nextProps.value!==this.props.value;},render:function render(){return React.createElement('div',{title:this.props.value},this.props.value);}});module.exports=SimpleCellFormatter; /***/}, /* 96 */ /***/function(module,exports,__webpack_require__){'use strict';var React=__webpack_require__(2);var ReactDOM=__webpack_require__(3);var DOMMetrics=__webpack_require__(97);var min=Math.min;var max=Math.max;var floor=Math.floor;var ceil=Math.ceil;module.exports={mixins:[DOMMetrics.MetricsMixin],DOMMetrics:{viewportHeight:function viewportHeight(){return ReactDOM.findDOMNode(this).offsetHeight;}},propTypes:{rowHeight:React.PropTypes.number,rowsCount:React.PropTypes.number.isRequired},getDefaultProps:function getDefaultProps(){return {rowHeight:30};},getInitialState:function getInitialState(){return this.getGridState(this.props);},getGridState:function getGridState(props){var renderedRowsCount=ceil((props.minHeight-props.rowHeight)/props.rowHeight);var totalRowCount=min(renderedRowsCount*2,props.rowsCount);return {displayStart:0,displayEnd:totalRowCount,height:props.minHeight,scrollTop:0,scrollLeft:0};},updateScroll:function updateScroll(scrollTop,scrollLeft,height,rowHeight,length){var renderedRowsCount=ceil(height/rowHeight);var visibleStart=floor(scrollTop/rowHeight);var visibleEnd=min(visibleStart+renderedRowsCount,length);var displayStart=max(0,visibleStart-renderedRowsCount*2);var displayEnd=min(visibleStart+renderedRowsCount*2,length);var nextScrollState={visibleStart:visibleStart,visibleEnd:visibleEnd,displayStart:displayStart,displayEnd:displayEnd,height:height,scrollTop:scrollTop,scrollLeft:scrollLeft};this.setState(nextScrollState);},metricsUpdated:function metricsUpdated(){var height=this.DOMMetrics.viewportHeight();if(height){this.updateScroll(this.state.scrollTop,this.state.scrollLeft,height,this.props.rowHeight,this.props.rowsCount);}},componentWillReceiveProps:function componentWillReceiveProps(nextProps){if(this.props.rowHeight!==nextProps.rowHeight||this.props.minHeight!==nextProps.minHeight){this.setState(this.getGridState(nextProps));}else if(this.props.rowsCount!==nextProps.rowsCount){this.updateScroll(this.state.scrollTop,this.state.scrollLeft,this.state.height,nextProps.rowHeight,nextProps.rowsCount); // Added to fix the hiding of the bottom scrollbar when showing the filters.
	}else if(this.props.rowOffsetHeight!==nextProps.rowOffsetHeight){ // The value of height can be positive or negative and will be added to the current height to cater for changes in the header height (due to the filer)
	var _height=this.props.rowOffsetHeight-nextProps.rowOffsetHeight;this.updateScroll(this.state.scrollTop,this.state.scrollLeft,this.state.height+_height,nextProps.rowHeight,nextProps.rowsCount);}}}; /***/}, /* 97 */ /***/function(module,exports,__webpack_require__){'use strict';var React=__webpack_require__(2);var shallowCloneObject=__webpack_require__(7);var contextTypes={metricsComputator:React.PropTypes.object};var MetricsComputatorMixin={childContextTypes:contextTypes,getChildContext:function getChildContext(){return {metricsComputator:this};},getMetricImpl:function getMetricImpl(name){return this._DOMMetrics.metrics[name].value;},registerMetricsImpl:function registerMetricsImpl(component,metrics){var getters={};var s=this._DOMMetrics;for(var name in metrics){if(s.metrics[name]!==undefined){throw new Error('DOM metric '+name+' is already defined');}s.metrics[name]={component:component,computator:metrics[name].bind(component)};getters[name]=this.getMetricImpl.bind(null,name);}if(s.components.indexOf(component)===-1){s.components.push(component);}return getters;},unregisterMetricsFor:function unregisterMetricsFor(component){var s=this._DOMMetrics;var idx=s.components.indexOf(component);if(idx>-1){s.components.splice(idx,1);var name=void 0;var metricsToDelete={};for(name in s.metrics){if(s.metrics[name].component===component){metricsToDelete[name]=true;}}for(name in metricsToDelete){if(metricsToDelete.hasOwnProperty(name)){delete s.metrics[name];}}}},updateMetrics:function updateMetrics(){var s=this._DOMMetrics;var needUpdate=false;for(var name in s.metrics){if(!s.metrics.hasOwnProperty(name))continue;var newMetric=s.metrics[name].computator();if(newMetric!==s.metrics[name].value){needUpdate=true;}s.metrics[name].value=newMetric;}if(needUpdate){for(var i=0,len=s.components.length;i<len;i++){if(s.components[i].metricsUpdated){s.components[i].metricsUpdated();}}}},componentWillMount:function componentWillMount(){this._DOMMetrics={metrics:{},components:[]};},componentDidMount:function componentDidMount(){if(window.addEventListener){window.addEventListener('resize',this.updateMetrics);}else {window.attachEvent('resize',this.updateMetrics);}this.updateMetrics();},componentWillUnmount:function componentWillUnmount(){window.removeEventListener('resize',this.updateMetrics);}};var MetricsMixin={contextTypes:contextTypes,componentWillMount:function componentWillMount(){if(this.DOMMetrics){this._DOMMetricsDefs=shallowCloneObject(this.DOMMetrics);this.DOMMetrics={};for(var name in this._DOMMetricsDefs){if(!this._DOMMetricsDefs.hasOwnProperty(name))continue;this.DOMMetrics[name]=function(){};}}},componentDidMount:function componentDidMount(){if(this.DOMMetrics){this.DOMMetrics=this.registerMetrics(this._DOMMetricsDefs);}},componentWillUnmount:function componentWillUnmount(){if(!this.registerMetricsImpl){return this.context.metricsComputator.unregisterMetricsFor(this);}if(this.hasOwnProperty('DOMMetrics')){delete this.DOMMetrics;}},registerMetrics:function registerMetrics(metrics){if(this.registerMetricsImpl){return this.registerMetricsImpl(this,metrics);}return this.context.metricsComputator.registerMetricsImpl(this,metrics);},getMetric:function getMetric(name){if(this.getMetricImpl){return this.getMetricImpl(name);}return this.context.metricsComputator.getMetricImpl(name);}};module.exports={MetricsComputatorMixin:MetricsComputatorMixin,MetricsMixin:MetricsMixin}; /***/}, /* 98 */ /***/function(module,exports){"use strict";module.exports={componentDidMount:function componentDidMount(){this._scrollLeft=this.refs.viewport?this.refs.viewport.getScroll().scrollLeft:0;this._onScroll();},componentDidUpdate:function componentDidUpdate(){this._onScroll();},componentWillMount:function componentWillMount(){this._scrollLeft=undefined;},componentWillUnmount:function componentWillUnmount(){this._scrollLeft=undefined;},onScroll:function onScroll(props){if(this._scrollLeft!==props.scrollLeft){this._scrollLeft=props.scrollLeft;this._onScroll();}},onHeaderScroll:function onHeaderScroll(e){var scrollLeft=e.target.scrollLeft;if(this._scrollLeft!==scrollLeft){this._scrollLeft=scrollLeft;this.refs.header.setScrollLeft(scrollLeft);var canvas=ReactDOM.findDOMNode(this.refs.viewport.refs.canvas);canvas.scrollLeft=scrollLeft;this.refs.viewport.refs.canvas.setScrollLeft(scrollLeft);}},_onScroll:function _onScroll(){if(this._scrollLeft!==undefined){this.refs.header.setScrollLeft(this._scrollLeft);if(this.refs.viewport){this.refs.viewport.setScrollLeft(this._scrollLeft);}}}}; /***/}, /* 99 */ /***/function(module,exports,__webpack_require__){'use strict';var React=__webpack_require__(2);var CheckboxEditor=React.createClass({displayName:'CheckboxEditor',propTypes:{value:React.PropTypes.bool,rowIdx:React.PropTypes.number,column:React.PropTypes.shape({key:React.PropTypes.string,onCellChange:React.PropTypes.func}),dependentValues:React.PropTypes.object},handleChange:function handleChange(e){this.props.column.onCellChange(this.props.rowIdx,this.props.column.key,this.props.dependentValues,e);},render:function render(){var checked=this.props.value!=null?this.props.value:false;var checkboxName='checkbox'+this.props.rowIdx;return React.createElement('div',{className:'react-grid-checkbox-container',onClick:this.handleChange},React.createElement('input',{className:'react-grid-checkbox',type:'checkbox',name:checkboxName,checked:checked}),React.createElement('label',{htmlFor:checkboxName,className:'react-grid-checkbox-label'}));}});module.exports=CheckboxEditor; /***/}, /* 100 */ /***/function(module,exports,__webpack_require__){'use strict';var _reactDom=__webpack_require__(3);var _reactDom2=_interopRequireDefault(_reactDom);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var ColumnMetrics=__webpack_require__(8);var DOMMetrics=__webpack_require__(97);Object.assign=__webpack_require__(101);var PropTypes=__webpack_require__(2).PropTypes;var ColumnUtils=__webpack_require__(10);var Column=function Column(){_classCallCheck(this,Column);};module.exports={mixins:[DOMMetrics.MetricsMixin],propTypes:{columns:PropTypes.arrayOf(Column),minColumnWidth:PropTypes.number,columnEquality:PropTypes.func,onColumnResize:PropTypes.func},DOMMetrics:{gridWidth:function gridWidth(){return _reactDom2['default'].findDOMNode(this).parentElement.offsetWidth;}},getDefaultProps:function getDefaultProps(){return {minColumnWidth:80,columnEquality:ColumnMetrics.sameColumn};},componentWillMount:function componentWillMount(){this._mounted=true;},componentWillReceiveProps:function componentWillReceiveProps(nextProps){if(nextProps.columns){if(!ColumnMetrics.sameColumns(this.props.columns,nextProps.columns,this.props.columnEquality)||nextProps.minWidth!==this.props.minWidth){var columnMetrics=this.createColumnMetrics(nextProps);this.setState({columnMetrics:columnMetrics});}}},getTotalWidth:function getTotalWidth(){var totalWidth=0;if(this._mounted){totalWidth=this.DOMMetrics.gridWidth();}else {totalWidth=ColumnUtils.getSize(this.props.columns)*this.props.minColumnWidth;}return totalWidth;},getColumnMetricsType:function getColumnMetricsType(metrics){var totalWidth=metrics.totalWidth||this.getTotalWidth();var currentMetrics={columns:metrics.columns,totalWidth:totalWidth,minColumnWidth:metrics.minColumnWidth};var updatedMetrics=ColumnMetrics.recalculate(currentMetrics);return updatedMetrics;},getColumn:function getColumn(idx){var columns=this.state.columnMetrics.columns;if(Array.isArray(columns)){return columns[idx];}else if(typeof Immutable!=='undefined'){return columns.get(idx);}},getSize:function getSize(){var columns=this.state.columnMetrics.columns;if(Array.isArray(columns)){return columns.length;}else if(typeof Immutable!=='undefined'){return columns.size;}},metricsUpdated:function metricsUpdated(){var columnMetrics=this.createColumnMetrics();this.setState({columnMetrics:columnMetrics});},createColumnMetrics:function createColumnMetrics(){var props=arguments.length<=0||arguments[0]===undefined?this.props:arguments[0];var gridColumns=this.setupGridColumns(props);return this.getColumnMetricsType({columns:gridColumns,minColumnWidth:this.props.minColumnWidth,totalWidth:props.minWidth});},onColumnResize:function onColumnResize(index,width){var columnMetrics=ColumnMetrics.resizeColumn(this.state.columnMetrics,index,width);this.setState({columnMetrics:columnMetrics});if(this.props.onColumnResize){this.props.onColumnResize(index,width);}}}; /***/}, /* 101 */ /***/function(module,exports){'use strict';function ToObject(val){if(val==null){throw new TypeError('Object.assign cannot be called with null or undefined');}return Object(val);}module.exports=Object.assign||function(target,source){var from;var keys;var to=ToObject(target);for(var s=1;s<arguments.length;s++){from=arguments[s];keys=Object.keys(Object(from));for(var i=0;i<keys.length;i++){to[keys[i]]=from[keys[i]];}}return to;}; /***/}, /* 102 */ /***/function(module,exports){'use strict';var RowUtils={get:function get(row,property){if(typeof row.get==='function'){return row.get(property);}return row[property];}};module.exports=RowUtils; /***/}, /* 103 */ /***/function(module,exports,__webpack_require__){'use strict';var Editors={AutoComplete:__webpack_require__(104),DropDownEditor:__webpack_require__(106),SimpleTextEditor:__webpack_require__(91),CheckboxEditor:__webpack_require__(99)};module.exports=Editors; /***/}, /* 104 */ /***/function(module,exports,__webpack_require__){'use strict';var React=__webpack_require__(2);var ReactDOM=__webpack_require__(3);var ReactAutocomplete=__webpack_require__(105);var ExcelColumn=__webpack_require__(15);var optionPropType=React.PropTypes.shape({id:React.PropTypes.required,title:React.PropTypes.string});var AutoCompleteEditor=React.createClass({displayName:'AutoCompleteEditor',propTypes:{onCommit:React.PropTypes.func,options:React.PropTypes.arrayOf(optionPropType),label:React.PropTypes.any,value:React.PropTypes.any,height:React.PropTypes.number,valueParams:React.PropTypes.arrayOf(React.PropTypes.string),column:React.PropTypes.shape(ExcelColumn),resultIdentifier:React.PropTypes.string,search:React.PropTypes.string,onKeyDown:React.PropTypes.func,onFocus:React.PropTypes.func},getDefaultProps:function getDefaultProps(){return {resultIdentifier:'id'};},handleChange:function handleChange(){this.props.onCommit();},getValue:function getValue(){var value=void 0;var updated={};if(this.hasResults()&&this.isFocusedOnSuggestion()){value=this.getLabel(this.refs.autoComplete.state.focusedValue);if(this.props.valueParams){value=this.constuctValueFromParams(this.refs.autoComplete.state.focusedValue,this.props.valueParams);}}else {value=this.refs.autoComplete.state.searchTerm;}updated[this.props.column.key]=value;return updated;},getInputNode:function getInputNode(){return ReactDOM.findDOMNode(this).getElementsByTagName('input')[0];},getLabel:function getLabel(item){var label=this.props.label!=null?this.props.label:'title';if(typeof label==='function'){return label(item);}else if(typeof label==='string'){return item[label];}},hasResults:function hasResults(){return this.refs.autoComplete.state.results.length>0;},isFocusedOnSuggestion:function isFocusedOnSuggestion(){var autoComplete=this.refs.autoComplete;return autoComplete.state.focusedValue!=null;},constuctValueFromParams:function constuctValueFromParams(obj,props){if(!props){return '';}var ret=[];for(var i=0,ii=props.length;i<ii;i++){ret.push(obj[props[i]]);}return ret.join('|');},render:function render(){var label=this.props.label!=null?this.props.label:'title';return React.createElement('div',{height:this.props.height,onKeyDown:this.props.onKeyDown},React.createElement(ReactAutocomplete,{search:this.props.search,ref:'autoComplete',label:label,onChange:this.handleChange,onFocus:this.props.onFocus,resultIdentifier:this.props.resultIdentifier,options:this.props.options,value:{title:this.props.value}}));}});module.exports=AutoCompleteEditor; /***/}, /* 105 */ /***/function(module,exports,__webpack_require__){(function webpackUniversalModuleDefinition(root,factory){if(true)module.exports=factory(__webpack_require__(2));else if(typeof define==='function'&&define.amd)define(["react"],factory);else if((typeof exports==='undefined'?'undefined':_typeof2(exports))==='object')exports["ReactAutocomplete"]=factory(require("react"));else root["ReactAutocomplete"]=factory(root["React"]);})(this,function(__WEBPACK_EXTERNAL_MODULE_1__){return  (/******/function(modules){ // webpackBootstrap
	/******/ // The module cache
	/******/var installedModules={}; /******/ // The require function
	/******/function __webpack_require__(moduleId){ /******/ // Check if module is in cache
	/******/if(installedModules[moduleId]) /******/return installedModules[moduleId].exports; /******/ // Create a new module (and put it into the cache)
	/******/var module=installedModules[moduleId]={ /******/exports:{}, /******/id:moduleId, /******/loaded:false /******/}; /******/ // Execute the module function
	/******/modules[moduleId].call(module.exports,module,module.exports,__webpack_require__); /******/ // Flag the module as loaded
	/******/module.loaded=true; /******/ // Return the exports of the module
	/******/return module.exports; /******/} /******/ // expose the modules object (__webpack_modules__)
	/******/__webpack_require__.m=modules; /******/ // expose the module cache
	/******/__webpack_require__.c=installedModules; /******/ // __webpack_public_path__
	/******/__webpack_require__.p=""; /******/ // Load entry module and return exports
	/******/return __webpack_require__(0); /******/}( /************************************************************************/ /******/[ /* 0 */ /***/function(module,exports,__webpack_require__){"use strict";var React=__webpack_require__(1);var joinClasses=__webpack_require__(2);var Autocomplete=React.createClass({displayName:"Autocomplete",propTypes:{options:React.PropTypes.any,search:React.PropTypes.func,resultRenderer:React.PropTypes.oneOfType([React.PropTypes.component,React.PropTypes.func]),value:React.PropTypes.object,onChange:React.PropTypes.func,onError:React.PropTypes.func,onFocus:React.PropTypes.func},getDefaultProps:function getDefaultProps(){return {search:searchArray};},getInitialState:function getInitialState(){var searchTerm=this.props.searchTerm?this.props.searchTerm:this.props.value?this.props.value.title:"";return {results:[],showResults:false,showResultsInProgress:false,searchTerm:searchTerm,focusedValue:null};},getResultIdentifier:function getResultIdentifier(result){if(this.props.resultIdentifier===undefined){return result.id;}else {return result[this.props.resultIdentifier];}},render:function render(){var className=joinClasses(this.props.className,"react-autocomplete-Autocomplete",this.state.showResults?"react-autocomplete-Autocomplete--resultsShown":undefined);var style={position:"relative",outline:"none"};return React.createElement("div",{tabIndex:"1",className:className,onFocus:this.onFocus,onBlur:this.onBlur,style:style},React.createElement("input",{ref:"search",className:"react-autocomplete-Autocomplete__search",style:{width:"100%"},onClick:this.showAllResults,onChange:this.onQueryChange,onFocus:this.onSearchInputFocus,onBlur:this.onQueryBlur,onKeyDown:this.onQueryKeyDown,value:this.state.searchTerm}),React.createElement(Results,{className:"react-autocomplete-Autocomplete__results",onSelect:this.onValueChange,onFocus:this.onValueFocus,results:this.state.results,focusedValue:this.state.focusedValue,show:this.state.showResults,renderer:this.props.resultRenderer,label:this.props.label,resultIdentifier:this.props.resultIdentifier}));},componentWillReceiveProps:function componentWillReceiveProps(nextProps){var searchTerm=nextProps.searchTerm?nextProps.searchTerm:nextProps.value?nextProps.value.title:"";this.setState({searchTerm:searchTerm});},componentWillMount:function componentWillMount(){this.blurTimer=null;}, /**
			    * Show results for a search term value.
			    *
			    * This method doesn't update search term value itself.
			    *
			    * @param {Search} searchTerm
			    */showResults:function showResults(searchTerm){this.setState({showResultsInProgress:true});this.props.search(this.props.options,searchTerm.trim(),this.onSearchComplete);},showAllResults:function showAllResults(){if(!this.state.showResultsInProgress&&!this.state.showResults){this.showResults("");}},onValueChange:function onValueChange(value){var state={value:value,showResults:false};if(value){state.searchTerm=value.title;}this.setState(state);if(this.props.onChange){this.props.onChange(value);}},onSearchComplete:function onSearchComplete(err,results){if(err){if(this.props.onError){this.props.onError(err);}else {throw err;}}this.setState({showResultsInProgress:false,showResults:true,results:results});},onValueFocus:function onValueFocus(value){this.setState({focusedValue:value});},onQueryChange:function onQueryChange(e){var searchTerm=e.target.value;this.setState({searchTerm:searchTerm,focusedValue:null});this.showResults(searchTerm);},onFocus:function onFocus(){if(this.blurTimer){clearTimeout(this.blurTimer);this.blurTimer=null;}this.refs.search.getDOMNode().focus();},onSearchInputFocus:function onSearchInputFocus(){if(this.props.onFocus){this.props.onFocus();}this.showAllResults();},onBlur:function onBlur(){ // wrap in setTimeout so we can catch a click on results
	this.blurTimer=setTimeout(function(){if(this.isMounted()){this.setState({showResults:false});}}.bind(this),100);},onQueryKeyDown:function onQueryKeyDown(e){if(e.key==="Enter"){e.preventDefault();if(this.state.focusedValue){this.onValueChange(this.state.focusedValue);}}else if(e.key==="ArrowUp"&&this.state.showResults){e.preventDefault();var prevIdx=Math.max(this.focusedValueIndex()-1,0);this.setState({focusedValue:this.state.results[prevIdx]});}else if(e.key==="ArrowDown"){e.preventDefault();if(this.state.showResults){var nextIdx=Math.min(this.focusedValueIndex()+(this.state.showResults?1:0),this.state.results.length-1);this.setState({showResults:true,focusedValue:this.state.results[nextIdx]});}else {this.showAllResults();}}},focusedValueIndex:function focusedValueIndex(){if(!this.state.focusedValue){return -1;}for(var i=0,len=this.state.results.length;i<len;i++){if(this.getResultIdentifier(this.state.results[i])===this.getResultIdentifier(this.state.focusedValue)){return i;}}return -1;}});var Results=React.createClass({displayName:"Results",getResultIdentifier:function getResultIdentifier(result){if(this.props.resultIdentifier===undefined){if(!result.id){throw "id property not found on result. You must specify a resultIdentifier and pass as props to autocomplete component";}return result.id;}else {return result[this.props.resultIdentifier];}},render:function render(){var style={display:this.props.show?"block":"none",position:"absolute",listStyleType:"none"};var $__0=this.props,className=$__0.className,props=function(source,exclusion){var rest={};var hasOwn=Object.prototype.hasOwnProperty;if(source==null){throw new TypeError();}for(var key in source){if(hasOwn.call(source,key)&&!hasOwn.call(exclusion,key)){rest[key]=source[key];}}return rest;}($__0,{className:1});return React.createElement("ul",React.__spread({},props,{style:style,className:className+" react-autocomplete-Results"}),this.props.results.map(this.renderResult));},renderResult:function renderResult(result){var focused=this.props.focusedValue&&this.getResultIdentifier(this.props.focusedValue)===this.getResultIdentifier(result);var Renderer=this.props.renderer||Result;return React.createElement(Renderer,{ref:focused?"focused":undefined,key:this.getResultIdentifier(result),result:result,focused:focused,onMouseEnter:this.onMouseEnterResult,onClick:this.props.onSelect,label:this.props.label});},componentDidUpdate:function componentDidUpdate(){this.scrollToFocused();},componentDidMount:function componentDidMount(){this.scrollToFocused();},componentWillMount:function componentWillMount(){this.ignoreFocus=false;},scrollToFocused:function scrollToFocused(){var focused=this.refs&&this.refs.focused;if(focused){var containerNode=this.getDOMNode();var scroll=containerNode.scrollTop;var height=containerNode.offsetHeight;var node=focused.getDOMNode();var top=node.offsetTop;var bottom=top+node.offsetHeight; // we update ignoreFocus to true if we change the scroll position so
	// the mouseover event triggered because of that won't have an
	// effect
	if(top<scroll){this.ignoreFocus=true;containerNode.scrollTop=top;}else if(bottom-scroll>height){this.ignoreFocus=true;containerNode.scrollTop=bottom-height;}}},onMouseEnterResult:function onMouseEnterResult(e,result){ // check if we need to prevent the next onFocus event because it was
	// probably caused by a mouseover due to scroll position change
	if(this.ignoreFocus){this.ignoreFocus=false;}else { // we need to make sure focused node is visible
	// for some reason mouse events fire on visible nodes due to
	// box-shadow
	var containerNode=this.getDOMNode();var scroll=containerNode.scrollTop;var height=containerNode.offsetHeight;var node=e.target;var top=node.offsetTop;var bottom=top+node.offsetHeight;if(bottom>scroll&&top<scroll+height){this.props.onFocus(result);}}}});var Result=React.createClass({displayName:"Result",getDefaultProps:function getDefaultProps(){return {label:function label(result){return result.title;}};},getLabel:function getLabel(result){if(typeof this.props.label==="function"){return this.props.label(result);}else if(typeof this.props.label==="string"){return result[this.props.label];}},render:function render(){var className=joinClasses({"react-autocomplete-Result":true,"react-autocomplete-Result--active":this.props.focused});return React.createElement("li",{style:{listStyleType:"none"},className:className,onClick:this.onClick,onMouseEnter:this.onMouseEnter},React.createElement("a",null,this.getLabel(this.props.result)));},onClick:function onClick(){this.props.onClick(this.props.result);},onMouseEnter:function onMouseEnter(e){if(this.props.onMouseEnter){this.props.onMouseEnter(e,this.props.result);}},shouldComponentUpdate:function shouldComponentUpdate(nextProps){return nextProps.result.id!==this.props.result.id||nextProps.focused!==this.props.focused;}}); /**
			* Search options using specified search term treating options as an array
			* of candidates.
			*
			* @param {Array.<Object>} options
			* @param {String} searchTerm
			* @param {Callback} cb
			*/function searchArray(options,searchTerm,cb){if(!options){return cb(null,[]);}searchTerm=new RegExp(searchTerm,"i");var results=[];for(var i=0,len=options.length;i<len;i++){if(searchTerm.exec(options[i].title)){results.push(options[i]);}}cb(null,results);}module.exports=Autocomplete; /***/}, /* 1 */ /***/function(module,exports){module.exports=__WEBPACK_EXTERNAL_MODULE_1__; /***/}, /* 2 */ /***/function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__; /*!
			  Copyright (c) 2015 Jed Watson.
			  Licensed under the MIT License (MIT), see
			  http://jedwatson.github.io/classnames
			*/function classNames(){var classes='';var arg;for(var i=0;i<arguments.length;i++){arg=arguments[i];if(!arg){continue;}if('string'===typeof arg||'number'===typeof arg){classes+=' '+arg;}else if(Object.prototype.toString.call(arg)==='[object Array]'){classes+=' '+classNames.apply(null,arg);}else if('object'===(typeof arg==='undefined'?'undefined':_typeof2(arg))){for(var key in arg){if(!arg.hasOwnProperty(key)||!arg[key]){continue;}classes+=' '+key;}}}return classes.substr(1);} // safely export classNames for node / browserify
	if(typeof module!=='undefined'&&module.exports){module.exports=classNames;} // safely export classNames for RequireJS
	if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__=[],__WEBPACK_AMD_DEFINE_RESULT__=function(){return classNames;}.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__),__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));} /***/} /******/]));});; /***/}, /* 106 */ /***/function(module,exports,__webpack_require__){'use strict';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _reactDom=__webpack_require__(3);var _reactDom2=_interopRequireDefault(_reactDom);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==='undefined'?'undefined':_typeof2(call))==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+(typeof superClass==='undefined'?'undefined':_typeof2(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var React=__webpack_require__(2);var EditorBase=__webpack_require__(92);var DropDownEditor=function(_EditorBase){_inherits(DropDownEditor,_EditorBase);function DropDownEditor(){_classCallCheck(this,DropDownEditor);return _possibleConstructorReturn(this,Object.getPrototypeOf(DropDownEditor).apply(this,arguments));}_createClass(DropDownEditor,[{key:'getInputNode',value:function getInputNode(){return _reactDom2['default'].findDOMNode(this);}},{key:'onClick',value:function onClick(){this.getInputNode().focus();}},{key:'onDoubleClick',value:function onDoubleClick(){this.getInputNode().focus();}},{key:'render',value:function render(){return React.createElement('select',{style:this.getStyle(),defaultValue:this.props.value,onBlur:this.props.onBlur,onChange:this.onChange},this.renderOptions());}},{key:'renderOptions',value:function renderOptions(){var options=[];this.props.options.forEach(function(name){if(typeof name==='string'){options.push(React.createElement('option',{key:name,value:name},name));}else {options.push(React.createElement('option',{key:name.id,value:name.value,title:name.title},name.value));}},this);return options;}}]);return DropDownEditor;}(EditorBase);DropDownEditor.propTypes={options:React.PropTypes.arrayOf(React.PropTypes.oneOfType([React.PropTypes.string,React.PropTypes.objectOf({id:React.PropTypes.string,title:React.PropTypes.string,meta:React.PropTypes.string})])).isRequired};module.exports=DropDownEditor; /***/}, /* 107 */ /***/function(module,exports,__webpack_require__){'use strict'; // not including this
	// it currently requires the whole of moment, which we dont want to take as a dependency
	var ImageFormatter=__webpack_require__(108);var Formatters={ImageFormatter:ImageFormatter};module.exports=Formatters; /***/}, /* 108 */ /***/function(module,exports,__webpack_require__){'use strict';var React=__webpack_require__(2);var PendingPool={};var ReadyPool={};var ImageFormatter=React.createClass({displayName:'ImageFormatter',propTypes:{value:React.PropTypes.string.isRequired},getInitialState:function getInitialState(){return {ready:false};},componentWillMount:function componentWillMount(){this._load(this.props.value);},componentWillReceiveProps:function componentWillReceiveProps(nextProps){if(nextProps.value!==this.props.value){this.setState({value:null});this._load(nextProps.value);}},_load:function _load(src){var imageSrc=src;if(ReadyPool[imageSrc]){this.setState({value:imageSrc});return;}if(PendingPool[imageSrc]){PendingPool[imageSrc].push(this._onLoad);return;}PendingPool[imageSrc]=[this._onLoad];var img=new Image();img.onload=function(){PendingPool[imageSrc].forEach(function(callback){callback(imageSrc);});delete PendingPool[imageSrc];img.onload=null;imageSrc=undefined;};img.src=imageSrc;},_onLoad:function _onLoad(src){if(this.isMounted()&&src===this.props.value){this.setState({value:src});}},render:function render(){var style=this.state.value?{backgroundImage:'url('+this.state.value+')'}:undefined;return React.createElement('div',{className:'react-grid-image',style:style});}});module.exports=ImageFormatter; /***/}, /* 109 */ /***/function(module,exports,__webpack_require__){"use strict";var React=__webpack_require__(2);var Toolbar=React.createClass({displayName:"Toolbar",propTypes:{onAddRow:React.PropTypes.func,onToggleFilter:React.PropTypes.func,enableFilter:React.PropTypes.bool,numberOfRows:React.PropTypes.number},onAddRow:function onAddRow(){if(this.props.onAddRow!==null&&this.props.onAddRow instanceof Function){this.props.onAddRow({newRowIndex:this.props.numberOfRows});}},getDefaultProps:function getDefaultProps(){return {enableAddRow:true};},renderAddRowButton:function renderAddRowButton(){if(this.props.onAddRow){return React.createElement("button",{type:"button",className:"btn",onClick:this.onAddRow},"Add Row");}},renderToggleFilterButton:function renderToggleFilterButton(){if(this.props.enableFilter){return React.createElement("button",{type:"button",className:"btn",onClick:this.props.onToggleFilter},"Filter Rows");}},render:function render(){return React.createElement("div",{className:"react-grid-Toolbar"},React.createElement("div",{className:"tools"},this.renderAddRowButton(),this.renderToggleFilterButton()));}});module.exports=Toolbar; /***/}, /* 110 */ /***/function(module,exports,__webpack_require__){'use strict';Object.defineProperty(exports,"__esModule",{value:true});exports.connect=exports.SubMenu=exports.monitor=exports.MenuItem=exports.MenuHeader=exports.ContextMenu=undefined;var _reactContextmenu=__webpack_require__(24);var _ContextMenu=__webpack_require__(111);var _ContextMenu2=_interopRequireDefault(_ContextMenu);var _MenuHeader=__webpack_require__(112);var _MenuHeader2=_interopRequireDefault(_MenuHeader);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}exports.ContextMenu=_ContextMenu2['default'];exports.MenuHeader=_MenuHeader2['default'];exports.MenuItem=_reactContextmenu.MenuItem;exports.monitor=_reactContextmenu.monitor;exports.SubMenu=_reactContextmenu.SubMenu;exports.connect=_reactContextmenu.connect; /***/}, /* 111 */ /***/function(module,exports,__webpack_require__){'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=__webpack_require__(2);var _react2=_interopRequireDefault(_react);var _reactContextmenu=__webpack_require__(24);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==='undefined'?'undefined':_typeof2(call))==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+(typeof superClass==='undefined'?'undefined':_typeof2(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var ReactDataGridContextMenu=function(_React$Component){_inherits(ReactDataGridContextMenu,_React$Component);function ReactDataGridContextMenu(){_classCallCheck(this,ReactDataGridContextMenu);return _possibleConstructorReturn(this,Object.getPrototypeOf(ReactDataGridContextMenu).apply(this,arguments));}_createClass(ReactDataGridContextMenu,[{key:'render',value:function render(){return _react2['default'].createElement(_reactContextmenu.ContextMenu,{identifier:'reactDataGridContextMenu'},this.props.children);}}]);return ReactDataGridContextMenu;}(_react2['default'].Component);ReactDataGridContextMenu.propTypes={children:_react.PropTypes.node};exports['default']=ReactDataGridContextMenu; /***/}, /* 112 */ /***/function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=__webpack_require__(2);var _react2=_interopRequireDefault(_react);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==='undefined'?'undefined':_typeof2(call))==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+(typeof superClass==='undefined'?'undefined':_typeof2(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var MenuHeader=function(_React$Component){_inherits(MenuHeader,_React$Component);function MenuHeader(){_classCallCheck(this,MenuHeader);return _possibleConstructorReturn(this,Object.getPrototypeOf(MenuHeader).apply(this,arguments));}_createClass(MenuHeader,[{key:"render",value:function render(){return _react2["default"].createElement("div",{className:"react-context-menu-header"},this.props.children);}}]);return MenuHeader;}(_react2["default"].Component);MenuHeader.propTypes={children:_react.PropTypes.any};exports["default"]=MenuHeader; /***/} /******/]));});;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(59)(module)))

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2015 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/

	function classNames() {
		var classes = '';
		var arg;

		for (var i = 0; i < arguments.length; i++) {
			arg = arguments[i];
			if (!arg) {
				continue;
			}

			if ('string' === typeof arg || 'number' === typeof arg) {
				classes += ' ' + arg;
			} else if (Object.prototype.toString.call(arg) === '[object Array]') {
				classes += ' ' + classNames.apply(null, arg);
			} else if ('object' === typeof arg) {
				for (var key in arg) {
					if (!arg.hasOwnProperty(key) || !arg[key]) {
						continue;
					}
					classes += ' ' + key;
				}
			}
		}
		return classes.substr(1);
	}

	// safely export classNames for node / browserify
	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	}

	// safely export classNames for RequireJS
	if (true) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
			return classNames;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}


/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var faker = __webpack_require__(72);
	faker.locale = 'en_GB';
	var SIZE = 2000;
	var _cache = [];

	function createFakeRowObjectData( /*number*/index) {
	  return {
	    id: 'id_' + index,
	    avartar: faker.image.avatar(),
	    county: faker.address.county(),
	    email: faker.internet.email(),
	    title: faker.name.prefix(),
	    firstName: faker.name.firstName(),
	    lastName: faker.name.lastName(),
	    street: faker.address.streetName(),
	    zipCode: faker.address.zipCode(),
	    date: faker.date.past().toLocaleDateString(),
	    bs: faker.company.bs(),
	    catchPhrase: faker.company.catchPhrase(),
	    companyName: faker.company.companyName(),
	    words: faker.lorem.words(),
	    sentence: faker.lorem.sentence()
	  };
	}

	function getObjectAt( /*number*/index) /*?object*/{
	  if (index < 0 || index > SIZE) {
	    return undefined;
	  }
	  if (_cache[index] === undefined) {
	    _cache[index] = createFakeRowObjectData(index);
	  }
	  return _cache[index];
	}

	function getSize() {
	  return SIZE;
	}

	function createRows(numberOfRows) {
	  for (var i = 0; i < numberOfRows; i++) {
	    _cache[i] = createFakeRowObjectData(i);
	  }
	  return _cache;
	}

	var FakeObjectDataListStore = {
	  getObjectAt: getObjectAt,
	  getSize: getSize,
	  createRows: createRows
	};
	module.exports = FakeObjectDataListStore;

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var QuickStartDescription = __webpack_require__(53);
	var ReactPlayground = __webpack_require__(56);

	var EmptyRowsExample = '\nvar _rows = [];\nvar rowGetter = function(i){\n  return _rows[i];\n};\n\n\nvar columns = [\n{\n  key: \'id\',\n  name: \'ID\'\n},\n{\n  key: \'title\',\n  name: \'Title\'\n},\n{\n  key: \'count\',\n  name: \'Count\'\n}\n]\n\nvar EmptyRowsView = React.createClass({\n render: function() {\n   return (<div>Nothing to show</div>)\n }\n});\n\n\nvar Example = React.createClass({\n  render: function() {\n    return  (<ReactDataGrid\n    columns={columns}\n    rowGetter={rowGetter}\n    rowsCount={_rows.length}\n    minHeight={500}\n    emptyRowsView={EmptyRowsView} />);\n  }\n});\nReactDOM.render(<Example />, mountNode);\n';

	module.exports = React.createClass({
	  displayName: 'exports',


	  render: function render() {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'h3',
	        null,
	        'Empty Rows Example'
	      ),
	      React.createElement(ReactPlayground, { codeText: EmptyRowsExample })
	    );
	  }

	});

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var QuickStartDescription = __webpack_require__(53);
	var ReactPlayground = __webpack_require__(56);

	var EditableExample = '\n\n\n//helper to generate a random date\nfunction randomDate(start, end) {\n  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();\n}\n\nvar issueTypes = [\'Bug\', \'Improvement\', \'Epic\', \'Story\'];\n\n//helper to create a fixed number of rows\nfunction createRows(numberOfRows){\n  var _rows = [];\n  for (var i = 1; i < numberOfRows; i++) {\n    _rows.push({\n      id: i,\n      task: \'Task \' + i,\n      complete: Math.min(100, Math.round(Math.random() * 110)),\n      priority : [\'Critical\', \'High\', \'Medium\', \'Low\'][Math.floor((Math.random() * 3) + 1)],\n      issueType : issueTypes[Math.floor((Math.random() * 3) + 1)],\n      startDate: randomDate(new Date(2015, 3, 1), new Date()),\n      completeDate: randomDate(new Date(), new Date(2016, 0, 1))\n    });\n  }\n  return _rows;\n}\n\n//function to retrieve a row for a given index\nvar rowGetter = function(i){\n  return _rows[i];\n};\n\n//Columns definition\nvar columns = [\n{\n  key: \'id\',\n  name: \'ID\',\n  width: 80\n},\n{\n  key: \'task\',\n  name: \'Title\',\n  editable : true\n},\n{\n  key : \'priority\',\n  name : \'Priority\',\n  editable : true\n},\n{\n  key : \'issueType\',\n  name : \'Issue Type\',\n  editable : true\n}\n]\n\n\nvar Example = React.createClass({\n\n  getInitialState : function(){\n    return {rows : createRows(1000)}\n  },\n\n  rowGetter : function(rowIdx){\n    return this.state.rows[rowIdx]\n  },\n\n  handleRowUpdated : function(e){\n    //merge updated row with current row and rerender by setting state\n    var rows = this.state.rows;\n    Object.assign(rows[e.rowIdx], e.updated);\n    this.setState({rows:rows});\n  },\n\n  handleCellDrag : function(e){\n    var rows = this.state.rows.slice(0);\n    for (var i = e.fromRow; i <= e.toRow; i++){\n      var rowToUpdate = rows[i];\n      rowToUpdate[e.cellKey] = e.value;\n    }\n    this.setState({rows:rows});\n  },\n\n  handleDragHandleDoubleClick: function(e) {\n    var rows = this.state.rows.map(function(r){\n      return Object.assign({}, r);\n    });\n    var column = columns[e.idx];\n    for (var i = e.rowIdx; i <= rows.length - 1; i++){\n      var rowToUpdate = rows[i];\n      rowToUpdate[column.key] = e.rowData[column.key];\n    }\n    this.setState({rows:rows});\n  },\n\n  render:function(){\n    return(\n      <ReactDataGrid\n      enableCellSelect={true}\n      columns={columns}\n      rowGetter={this.rowGetter}\n      rowsCount={this.state.rows.length}\n      onDragHandleDoubleClick={this.handleDragHandleDoubleClick}\n      onCellsDragged={this.handleCellDrag}\n      minHeight={500}\n      onRowUpdated={this.handleRowUpdated} />\n    )\n  }\n\n});\n\nReactDOM.render(<Example />, mountNode);\n';

	module.exports = React.createClass({
	  displayName: 'exports',


	  render: function render() {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'h3',
	        null,
	        'Cell Drag Down Example'
	      ),
	      React.createElement(
	        'p',
	        null,
	        'This example demonstrates how you can easily update multiple cells by dragging from the drag handle of an editable cell.'
	      ),
	      React.createElement(
	        'p',
	        null,
	        'Alternatively by double clicking on the drag handle, you can update all the cells underneath the active cell.'
	      ),
	      React.createElement(ReactPlayground, { codeText: EditableExample })
	    );
	  }

	});

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ReactGrid = __webpack_require__(58);
	var QuickStartDescription = __webpack_require__(53);
	var ReactPlayground = __webpack_require__(56);

	var EditableExample = '\nvar Toolbar = ReactDataGrid.Toolbar;\n\n//helper to generate a random date\nfunction randomDate(start, end) {\n  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();\n}\n\n//helper to create a fixed number of rows\nfunction createRows(numberOfRows){\n  var _rows = [];\n  for (var i = 1; i < numberOfRows; i++) {\n    _rows.push({\n      id: i,\n      task: \'Task \' + i,\n      complete: Math.min(100, Math.round(Math.random() * 110)),\n      priority : [\'Critical\', \'High\', \'Medium\', \'Low\'][Math.floor((Math.random() * 3) + 1)],\n      issueType : [\'Bug\', \'Improvement\', \'Epic\', \'Story\'][Math.floor((Math.random() * 3) + 1)],\n      startDate: randomDate(new Date(2015, 3, 1), new Date()),\n      completeDate: randomDate(new Date(), new Date(2016, 0, 1))\n    });\n  }\n  return _rows;\n}\n\n//function to retrieve a row for a given index\nvar rowGetter = function(i){\n  return _rows[i];\n};\n\n//Columns definition\nvar columns = [\n{\n  key: \'id\',\n  name: \'ID\',\n  width: 80\n},\n{\n  key: \'task\',\n  name: \'Title\',\n  sortable : true,\n  filterable: true\n},\n{\n  key: \'priority\',\n  name: \'Priority\',\n  sortable : true,\n  filterable: true\n},\n{\n  key: \'issueType\',\n  name: \'Issue Type\',\n  sortable : true,\n  filterable: true\n},\n{\n  key: \'complete\',\n  name: \'% Complete\',\n  sortable : true,\n  filterable: true\n},\n{\n  key: \'startDate\',\n  name: \'Start Date\',\n  sortable : true,\n  filterable: true\n},\n{\n  key: \'completeDate\',\n  name: \'Expected Complete\',\n  sortable : true,\n  filterable: true\n}\n]\n\nvar Example = React.createClass({\n\n  getInitialState : function(){\n    var originalRows = createRows(1000);\n    var rows = originalRows.slice(0);\n    //store the original rows array, and make a copy that can be used for modifying eg.filtering, sorting\n    return {originalRows : originalRows, rows : rows, filters : {}};\n  },\n\n  rowGetter : function(rowIdx){\n    return this.state.rows[rowIdx];\n  },\n\n  handleGridSort : function(sortColumn, sortDirection){\n\n    var comparer = function(a, b) {\n      if(sortDirection === \'ASC\'){\n        return (a[sortColumn] > b[sortColumn]) ? 1 : -1;\n      }else if(sortDirection === \'DESC\'){\n        return (a[sortColumn] < b[sortColumn]) ? 1 : -1;\n      }\n    }\n\n    var rows;\n\n    if (sortDirection === \'NONE\') {\n      var originalRows = this.state.originalRows;\n      rows = this.filterRows(originalRows, this.state.filters);\n    } else {\n      rows = this.state.rows.sort(comparer);\n    }\n\n    this.setState({rows : rows});\n  },\n\n  filterRows : function(originalRows, filters) {\n    var rows = originalRows.filter(function(r){\n      var include = true;\n      for (var columnKey in filters) {\n        if(filters.hasOwnProperty(columnKey)) {\n          var rowValue = r[columnKey].toString().toLowerCase();\n          if(rowValue.indexOf(filters[columnKey].toLowerCase()) === -1) {\n            include = false;\n          }\n        }\n      }\n      return include;\n    });\n    return rows;\n  },\n\n  handleFilterChange : function(filter){\n    this.setState(function(currentState) {\n      if (filter.filterTerm) {\n        currentState.filters[filter.columnKey] = filter.filterTerm;\n      } else {\n        delete currentState.filters[filter.columnKey];\n      }\n      currentState.rows = this.filterRows(currentState.originalRows, currentState.filters);\n      return currentState;\n    });\n  },\n\n  render:function(){\n    return(\n      <ReactDataGrid\n        onGridSort={this.handleGridSort}\n        columns={columns}\n        rowGetter={this.rowGetter}\n        rowsCount={this.state.rows.length}\n        minHeight={500}\n        onRowUpdated={this.handleRowUpdated}\n        toolbar={<Toolbar enableFilter={true}/>}\n        onAddFilter={this.handleFilterChange} />\n    )\n  }\n\n});\n\nReactDOM.render(<Example />, mountNode);\n';

	module.exports = React.createClass({
	  displayName: 'exports',


	  render: function render() {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'h3',
	        null,
	        'Filterable Sortable Columns Example'
	      ),
	      React.createElement(
	        'p',
	        null,
	        'While ReactDataGrid does not provide the ability to sort or filter directly, it does provide hooks that allow you to provide your own sort and filter function. This is done via the ',
	        React.createElement(
	          'code',
	          null,
	          'onGridSort'
	        ),
	        ' and ',
	        React.createElement(
	          'code',
	          null,
	          'onAddFilter'
	        ),
	        ' props. To enable sorting for a given column, set ',
	        React.createElement(
	          'code',
	          null,
	          'column.sortable = true'
	        ),
	        ' for that column, to enable filtering for a given column, set ',
	        React.createElement(
	          'code',
	          null,
	          'column.filterable = true'
	        ),
	        ' for that column. Now when the header cell is clicked for that column, ',
	        React.createElement(
	          'code',
	          null,
	          'onGridSort'
	        ),
	        ' will be triggered passing the column name and the sort direction, when the filterable cell has a new filter value entered for that column, ',
	        React.createElement(
	          'code',
	          null,
	          'onAddFilter'
	        ),
	        ' will be triggered passing the filter key and value.'
	      ),
	      React.createElement(ReactPlayground, { codeText: EditableExample })
	    );
	  }

	});

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var QuickStartDescription = __webpack_require__(53);
	var ReactPlayground = __webpack_require__(56);

	var SimpleExample = '\n\nvar _rows = [];\nfor (var i = 1; i < 1000; i++) {\n  _rows.push({\n    id: i,\n    title: \'Title \' + i,\n    count: i * 1000\n  });\n}\n\n//A rowGetter function is required by the grid to retrieve a row for a given index\nvar rowGetter = function(i){\n  return _rows[i];\n};\n\n\nvar columns = [\n{\n  key: \'id\',\n  name: \'ID\'\n},\n{\n  key: \'title\',\n  name: \'Title\'\n},\n{\n  key: \'count\',\n  name: \'Count\'\n}\n]\n\nvar Example = React.createClass({\n\n  getInitialState: function() {\n    return {selectedRows: []}\n  },\n\n  onRowSelect: function(rows) {\n    this.setState({selectedRows: rows});\n  },\n\n  render: function() {\n    var rowText = this.state.selectedRows.length === 1 ? \'row\' : \'rows\';\n    return  (<div>\n      <span>{this.state.selectedRows.length} {rowText} selected</span>\n      <ReactDataGrid\n    rowKey=\'id\'\n    columns={columns}\n    rowGetter={rowGetter}\n    rowsCount={_rows.length}\n    enableRowSelect=\'multi\'\n    minHeight={500}\n    onRowSelect={this.onRowSelect} /></div>);\n  }\n});\nReactDOM.render(<Example />, mountNode);\n';

	module.exports = React.createClass({
	  displayName: 'exports',


	  render: function render() {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'h3',
	        null,
	        'Multiple Row Select'
	      ),
	      React.createElement(
	        'p',
	        null,
	        'By setting enableRowSelect=\'multi\' and passing a rowKey property to determine the name of the unique id of each row, you can enable multi row select'
	      ),
	      React.createElement(
	        'p',
	        null,
	        'Each time a row is clicked, onRowSelect prop will be called passing the array of selected rows'
	      ),
	      React.createElement(ReactPlayground, { codeText: SimpleExample })
	    );
	  }

	});

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var QuickStartDescription = __webpack_require__(53);
	var ReactPlayground = __webpack_require__(56);

	var SimpleExample = '\n\nvar _rows = [];\nfor (var i = 1; i < 1000; i++) {\n  _rows.push({\n    id: i,\n    title: \'Title \' + i,\n    count: i * 1000\n  });\n}\n\n//A rowGetter function is required by the grid to retrieve a row for a given index\nvar rowGetter = function(i){\n  return _rows[i];\n};\n\n\nvar columns = [\n{\n  key: \'id\',\n  name: \'ID\'\n},\n{\n  key: \'title\',\n  name: \'Title\'\n},\n{\n  key: \'count\',\n  name: \'Count\'\n}\n]\n\nvar Example = React.createClass({\n  render: function() {\n    return  (<ReactDataGrid\n    rowKey=\'id\'\n    columns={columns}\n    rowGetter={rowGetter}\n    rowsCount={_rows.length}\n    enableRowSelect=\'single\'\n    minHeight={500} />);\n  }\n});\nReactDOM.render(<Example />, mountNode);\n';

	module.exports = React.createClass({
	  displayName: 'exports',


	  render: function render() {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'h3',
	        null,
	        'Single Row Select'
	      ),
	      React.createElement(
	        'p',
	        null,
	        'By setting enableRowSelect=\'single\' and passing a rowKey property to determine the name of the unique id of each row, you can enable single row select'
	      ),
	      React.createElement(
	        'p',
	        null,
	        'Each time a row is clicked, onRowSelect prop will be called passing the selected row'
	      ),
	      React.createElement(ReactPlayground, { codeText: SimpleExample })
	    );
	  }

	});

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _ReactPlayground = __webpack_require__(56);

	var _ReactPlayground2 = _interopRequireDefault(_ReactPlayground);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var example = '\n// Import the necessary modules.\nvar ContextMenu = ReactDataGrid.Menu.ContextMenu;\nvar MenuItem = ReactDataGrid.Menu.MenuItem;\nvar SubMenu = ReactDataGrid.Menu.SubMenu;\n\nvar _rows = [];\nfor (var i = 1; i < 1000; i++) {\n  _rows.push({\n    id: i,\n    title: \'Title \' + i,\n    count: i * 1000\n  });\n}\n\nvar columns = [\n  {\n    key: \'id\',\n    name: \'ID\'\n  },\n  {\n    key: \'title\',\n    name: \'Title\'\n  },\n  {\n    key: \'count\',\n    name: \'Count\'\n  }\n];\n\n// Create the React Data Grid and pass your context menu to the contextMenu prop.\nvar Example = React.createClass({\n  getInitialState: function() {\n    return {rows: _rows};\n  },\n  rowGetter: function(rowIdx) {\n    return this.state.rows[rowIdx];\n  },\n  deleteRow: function(e, data) {\n    this.state.rows.splice(data.rowIdx, 1);\n    this.setState({rows: this.state.rows});\n  },\n  insertRowAbove: function(e, data) {\n    this.insertRow(data.rowIdx);\n  },\n  insertRowBelow: function(e, data) {\n    this.insertRow(data.rowIdx + 1);\n  },\n  insertRow: function(rowIdx) {\n    var newRow = {\n      id: 0,\n      title: \'New at \' + (rowIdx + 1),\n      count: 0\n    }\n    this.state.rows.splice(rowIdx, 0, newRow);\n    this.setState({rows: this.state.rows});\n  },\n  render: function() {\n    return (\n      <ReactDataGrid\n        contextMenu={<MyContextMenu onRowDelete={this.deleteRow} onRowInsertAbove={this.insertRowAbove} onRowInsertBelow={this.insertRowBelow} />}\n        columns={columns}\n        rowGetter={this.rowGetter}\n        rowsCount={this.state.rows.length}\n        minHeight={500} />\n    );\n  }\n});\n\n// Create the context menu.\n// Use this.props.rowIdx and this.props.idx to get the row/column where the menu is shown.\nvar MyContextMenu = React.createClass({\n  onRowDelete: function(e, data) {\n    if (typeof(this.props.onRowDelete) === \'function\') {\n      this.props.onRowDelete(e, data);\n    }\n  },\n  onRowInsertAbove: function(e, data) {\n    if (typeof(this.props.onRowInsertAbove) === \'function\') {\n      this.props.onRowInsertAbove(e, data);\n    }\n  },\n  onRowInsertBelow: function(e, data) {\n    if (typeof(this.props.onRowInsertBelow) === \'function\') {\n      this.props.onRowInsertBelow(e, data);\n    }\n  },\n  render: function() {\n    return (\n      <ContextMenu>\n        <MenuItem data={{rowIdx: this.props.rowIdx, idx: this.props.idx}} onClick={this.onRowDelete}>Delete Row</MenuItem>\n        <SubMenu title="Insert Row">\n          <MenuItem data={{rowIdx: this.props.rowIdx, idx: this.props.idx}} onClick={this.onRowInsertAbove}>Above</MenuItem>\n          <MenuItem data={{rowIdx: this.props.rowIdx, idx: this.props.idx}} onClick={this.onRowInsertBelow}>Below</MenuItem>\n        </SubMenu>\n      </ContextMenu>\n    );\n  }\n});\n\nReactDOM.render(<Example />, mountNode);\n';

	var ContextMenuExample = function (_React$Component) {
	  _inherits(ContextMenuExample, _React$Component);

	  function ContextMenuExample() {
	    _classCallCheck(this, ContextMenuExample);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(ContextMenuExample).apply(this, arguments));
	  }

	  _createClass(ContextMenuExample, [{
	    key: 'render',
	    value: function render() {
	      return _react2['default'].createElement(
	        'div',
	        null,
	        _react2['default'].createElement(
	          'h3',
	          null,
	          'Context Menu Example'
	        ),
	        _react2['default'].createElement(
	          'p',
	          null,
	          'To use a context menu on the grid, create a ',
	          _react2['default'].createElement(
	            'code',
	            null,
	            'ReactDataGrid.Menu.ContextMenu'
	          ),
	          ' and then set the ',
	          _react2['default'].createElement(
	            'code',
	            null,
	            'contextMenu'
	          ),
	          ' prop of the grid to this context menu. Please note you must use the ',
	          _react2['default'].createElement(
	            'code',
	            null,
	            'react-data-grid-with-addons.js'
	          ),
	          ' package to create the context menu.'
	        ),
	        _react2['default'].createElement(
	          'p',
	          null,
	          'If you need to know the row and column index where the context menu is shown, use the context menu\'s ',
	          _react2['default'].createElement(
	            'code',
	            null,
	            'rowIdx'
	          ),
	          ' and ',
	          _react2['default'].createElement(
	            'code',
	            null,
	            'idx'
	          ),
	          ' props.'
	        ),
	        _react2['default'].createElement(
	          'p',
	          null,
	          'Credits: the context menu we use is ',
	          _react2['default'].createElement(
	            'a',
	            { href: 'https://github.com/vkbansal/react-contextmenu' },
	            'react-contextmenu'
	          ),
	          ' by ',
	          _react2['default'].createElement(
	            'a',
	            { href: 'https://github.com/vkbansal' },
	            'Vivek Kumar Bansal'
	          ),
	          '.'
	        ),
	        _react2['default'].createElement(_ReactPlayground2['default'], { codeText: example })
	      );
	    }
	  }]);

	  return ContextMenuExample;
	}(_react2['default'].Component);

	module.exports = ContextMenuExample;

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _ReactPlayground = __webpack_require__(56);

	var _ReactPlayground2 = _interopRequireDefault(_ReactPlayground);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var example = '\nvar Editors             = ReactDataGrid.Editors;\nvar DropDownEditor      = Editors.DropDownEditor;\n\nvar titles = [\'Dr.\', \'Mr.\', \'Mrs.\', \'Miss\', \'Ms.\'];\n\nvar _rows = [];\nfor (var i = 1; i < 1000; i++) {\n  _rows.push({\n    id: i,\n    title: titles[Math.floor((Math.random() * 4))],\n    name: "Name " + i,\n    age: Math.floor((Math.random() * 100) + 1)\n  });\n};\n\nvar columns = [\n  {\n    key: \'id\',\n    name: \'ID\',\n    resizable: true\n  },\n  {\n    key: \'title\',\n    name: \'Title\',\n    editor : <DropDownEditor options={titles}/>,\n    resizable: true,\n    events: {\n      onDoubleClick: function(ev, args) {\n          console.log("The user entered edit mode on title column with rowId: " + args.rowIdx);\n      },\n    }\n  },\n  {\n    key: \'name\',\n    name: \'Name\',\n    editable:true,\n    resizable: true,\n    events: {\n      onKeyDown: function(ev) {\n        if (ev.key === \'Enter\') {\n          alert(\'Thanks for commiting a result with Enter\');\n        }\n      }\n    }\n  },\n  {\n    key: \'age\',\n    name: \'Age\',\n    editable:true,\n    resizable: true\n  }\n];\n\n// Create the React Data Grid and pass your context menu to the contextMenu prop.\nvar Example = React.createClass({\n  getInitialState: function() {\n    return {rows: _rows};\n  },\n\n  rowGetter: function(rowIdx) {\n    return this.state.rows[rowIdx];\n  },\n\n  handleGridRowsUpdated : function(updatedRowData) {\n    var rows = this.state.rows;\n\n    for (var i = updatedRowData.fromRow; i <= updatedRowData.toRow; i++) {\n      var rowToUpdate = rows[i];\n      var updatedRow = React.addons.update(rowToUpdate, {$merge: updatedRowData.updated});\n      rows[i] = updatedRow;\n    }\n\n    this.setState({rows: rows});\n  },\n\n  cellEditWithOneClick: function(ev, args) {\n    var idx = args.idx;\n    var rowIdx = args.rowIdx;\n    this.refs.grid.openCellEditor(rowIdx, idx);\n  },\n\n  getColumns: function() {\n    var clonedColumns = columns.slice();\n    clonedColumns[1].events = {\n      onClick: this.cellEditWithOneClick.bind(this)\n    };\n    clonedColumns[3].events = {\n      onClick: this.cellEditWithOneClick.bind(this)\n    };\n\n    return clonedColumns;\n  },\n\n  render: function() {\n    return (\n      <ReactDataGrid\n        ref="grid"\n        columns={this.getColumns()}\n        enableCellSelect={true}\n        rowGetter={this.rowGetter}\n        onGridRowsUpdated={this.handleGridRowsUpdated}\n        rowsCount={this.state.rows.length}\n        minHeight={500} />\n    );\n  }\n});\n\nReactDOM.render(<Example />, mountNode);\n';

	var ColumnEventsExample = function (_React$Component) {
	  _inherits(ColumnEventsExample, _React$Component);

	  function ColumnEventsExample() {
	    _classCallCheck(this, ColumnEventsExample);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(ColumnEventsExample).apply(this, arguments));
	  }

	  _createClass(ColumnEventsExample, [{
	    key: 'render',
	    value: function render() {
	      return _react2['default'].createElement(
	        'div',
	        null,
	        _react2['default'].createElement(
	          'h3',
	          null,
	          'Column Events Example'
	        ),
	        _react2['default'].createElement(
	          'p',
	          null,
	          'By adding an ',
	          _react2['default'].createElement(
	            'code',
	            null,
	            'event'
	          ),
	          ' object with callbacks for the native react events you can bind events to a specific column. That will not break the default behaviour of the grid and will run only for the specified column.'
	        ),
	        _react2['default'].createElement(
	          'p',
	          null,
	          'Every event callback must respect this standard in order to work correctly: ',
	          _react2['default'].createElement(
	            'code',
	            null,
	            'function onXxx(ev :SyntheticEvent, (rowIdx, idx, column): args)'
	          )
	        ),
	        _react2['default'].createElement(_ReactPlayground2['default'], { codeText: example })
	      );
	    }
	  }]);

	  return ColumnEventsExample;
	}(_react2['default'].Component);

	module.exports = ColumnEventsExample;

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ReactGrid = __webpack_require__(58);
	var QuickStartDescription = __webpack_require__(53);
	var ReactPlayground = __webpack_require__(56);

	var NavigationExample = '\n\n//helper to generate a random date\nfunction randomDate(start, end) {\n  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();\n};\n\nvar _rows = [];\nfor (var i = 1; i < 1000; i++) {\n  _rows.push({\n    id: i,\n    task: \'Task \' + i,\n    complete: Math.min(100, Math.round(Math.random() * 110)),\n    priority : [\'Critical\', \'High\', \'Medium\', \'Low\'][Math.floor((Math.random() * 3) + 1)],\n    issueType : [\'Bug\', \'Improvement\', \'Epic\', \'Story\'][Math.floor((Math.random() * 3) + 1)],\n    startDate: randomDate(new Date(2015, 3, 1), new Date()),\n    completeDate: randomDate(new Date(), new Date(2016, 0, 1))\n  });\n};\n\n//function to retrieve a row for a given index\nvar rowGetter = function(i){\n  return _rows[i];\n};\n\n\n//Columns definition\nvar columns = [\n{\n  key: \'id\',\n  name: \'ID\',\n  locked : true\n},\n{\n  key: \'task\',\n  name: \'Title\',\n  width: 200\n},\n{\n  key: \'priority\',\n  name: \'Priority\',\n  width: 200\n},\n{\n  key: \'issueType\',\n  name: \'Issue Type\',\n  width: 200\n},\n{\n  key: \'complete\',\n  name: \'% Complete\',\n  width: 200\n},\n{\n  key: \'startDate\',\n  name: \'Start Date\',\n  width: 200\n},\n{\n  key: \'completeDate\',\n  name: \'Expected Complete\',\n  width: 200\n},\n{\n  key: \'completeDate\',\n  name: \'Expected Complete\',\n  width: 200\n}\n]\n\n\nReactDOM.render(<ReactDataGrid\n  columns={columns}\n  rowGetter={rowGetter}\n  rowsCount={_rows.length}\n  minHeight={500}\n  enableCellSelect={true}\n  cellNavigationMode="changeRow" />, mountNode);\n';

	module.exports = React.createClass({
	  displayName: 'exports',


	  render: function render() {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'h3',
	        null,
	        'Column Navigation Modes Example'
	      ),
	      React.createElement(
	        'p',
	        null,
	        'By setting ',
	        React.createElement(
	          'code',
	          null,
	          'cellNavigationMode = \'loopOverRow\''
	        ),
	        ', you enable looping round the same row when navigation goes beyond the first/last cells.'
	      ),
	      React.createElement(
	        'p',
	        null,
	        'Setting ',
	        React.createElement(
	          'code',
	          null,
	          'cellNavigationMode = \'changeRow\''
	        ),
	        ', would make the selection jump to the next/previous row.'
	      ),
	      React.createElement(
	        'p',
	        null,
	        'The default behavior is to do nothing.'
	      ),
	      React.createElement(ReactPlayground, { codeText: NavigationExample })
	    );
	  }

	});

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var QuickStartDescription = __webpack_require__(53);
	var ReactPlayground = __webpack_require__(56);

	var SimpleExample = '\n\nvar SimpleCheckboxEditor = ReactDataGrid.Editors.SimpleCheckboxEditor;\nvar SimpleCheckboxFormatter = ReactDataGrid.Editors.SimpleCheckboxFormatter;\nvar _rows = [];\nfor (var i = 1; i < 1000; i++) {\n  _rows.push({\n    id: i,\n    title: \'Title \' + i,\n    count: i * 1000,\n    active: i % 2\n  });\n}\n\n//A rowGetter function is required by the grid to retrieve a row for a given index\nvar rowGetter = function(i){\n  return _rows[i];\n};\n\n\nvar columns = [\n{\n  key: \'id\',\n  name: \'ID\'\n},\n{\n  key: \'title\',\n  name: \'Title\',\n  editable: true\n},\n{\n  key: \'count\',\n  name: \'Count\'\n}\n]\n\nvar Example = React.createClass({\n\n  getInitialState: function() {\n    return {selectedRows: []}\n  },\n\n  onRowSelect: function(rows) {\n    this.setState({selectedRows: rows});\n  },\n  \n  onCellSelected(coordinates) {\n    this.refs.grid.openCellEditor(coordinates.rowIdx, coordinates.idx);\n  },\n  \n  onCellDeSelected(coordinates) {\n    if (coordinates.idx === 2) {\n      alert(\'the editor for cell (\' + coordinates.rowIdx + \',\' + coordinates.idx + \') should have just closed\');\n    }\n  },\n  \n  render: function() {\n    var rowText = this.state.selectedRows.length === 1 ? \'row\' : \'rows\';\n    return  (<div>\n      <span>{this.state.selectedRows.length} {rowText} selected</span>\n      <ReactDataGrid ref="grid"\n    rowKey=\'id\'\n    columns={columns}\n    rowGetter={rowGetter}\n    rowsCount={_rows.length}\n    enableRowSelect=\'multi\'\n    minHeight={500}\n    onRowSelect={this.onRowSelect}\n    enableCellSelect={true}\n    onCellSelected={this.onCellSelected}\n    onCellDeSelected={this.onCellDeSelected} /></div>);\n  }\n});\nReactDOM.render(<Example />, mountNode);\n';

	module.exports = React.createClass({
	  displayName: 'exports',


	  render: function render() {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'h3',
	        null,
	        'Cell selection/delesection events'
	      ),
	      React.createElement(
	        'p',
	        null,
	        'Define onCellSelected and onCellDeSelected callback handlers and pass them as props to enable events upon cell selection/deselection.'
	      ),
	      React.createElement(
	        'p',
	        null,
	        'if passed, onCellSelected will be triggered each time a cell is selected with the cell coordinates. Similarly, onCellDeSelected will be triggered when a cell is deselected.'
	      ),
	      React.createElement(ReactPlayground, { codeText: SimpleExample })
	    );
	  }

	});

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _ExampleList = __webpack_require__(49);

	var _ExampleList2 = _interopRequireDefault(_ExampleList);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Navbar = function (_React$Component) {
	  _inherits(Navbar, _React$Component);

	  function Navbar() {
	    _classCallCheck(this, Navbar);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Navbar).apply(this, arguments));
	  }

	  _createClass(Navbar, [{
	    key: 'render',
	    value: function render() {
	      return _react2['default'].createElement(
	        'div',
	        { className: 'navbar navbar-fixed-top headroom' },
	        _react2['default'].createElement(
	          'div',
	          { className: 'container' },
	          _react2['default'].createElement(
	            'div',
	            { className: 'navbar-header' },
	            _react2['default'].createElement(
	              'a',
	              { href: 'https://github.com/adazzle/react-data-grid/fork' },
	              _react2['default'].createElement('img', { className: 'github-ribbon', src: 'http://aral.github.com/fork-me-on-github-retina-ribbons/right-green@2x.png', alt: 'Fork me on GitHub' })
	            ),
	            _react2['default'].createElement(
	              'button',
	              { type: 'button', className: 'navbar-toggle', 'data-toggle': 'collapse', 'data-target': '.navbar-collapse' },
	              _react2['default'].createElement('span', { className: 'icon-bar' }),
	              ' ',
	              _react2['default'].createElement('span', { className: 'icon-bar' }),
	              ' ',
	              _react2['default'].createElement('span', { className: 'icon-bar' }),
	              ' '
	            ),
	            _react2['default'].createElement(
	              'a',
	              { className: 'navbar-brand', href: 'https://www.adazzle.com' },
	              _react2['default'].createElement('img', { className: 'header-logo', src: 'assets/images/AdazzleHeaderLogo.png' })
	            ),
	            ' ',
	            _react2['default'].createElement(
	              'a',
	              { className: 'navbar-brand', href: 'index.html#' },
	              'React Data Grid'
	            )
	          ),
	          _react2['default'].createElement(
	            'div',
	            { className: 'navbar-collapse collapse' },
	            _react2['default'].createElement(
	              'ul',
	              { className: 'nav navbar-nav pull-right' },
	              _react2['default'].createElement(
	                'li',
	                { className: 'active' },
	                _react2['default'].createElement(
	                  'a',
	                  { href: 'index.html#' },
	                  'Home'
	                )
	              ),
	              _react2['default'].createElement(
	                'li',
	                { className: 'dropdown' },
	                _react2['default'].createElement(
	                  'a',
	                  { href: '#', className: 'dropdown-toggle', 'data-toggle': 'dropdown' },
	                  'Documentation ',
	                  _react2['default'].createElement('b', { className: 'caret' })
	                ),
	                _react2['default'].createElement(
	                  'ul',
	                  { className: 'dropdown-menu' },
	                  _react2['default'].createElement(
	                    'li',
	                    null,
	                    _react2['default'].createElement(
	                      'a',
	                      { href: 'documentation.html#/gettingstarted' },
	                      'Getting Started'
	                    )
	                  ),
	                  _react2['default'].createElement(
	                    'li',
	                    null,
	                    _react2['default'].createElement(
	                      'a',
	                      { href: 'documentation.html#/apireference' },
	                      'API Reference'
	                    )
	                  )
	                )
	              ),
	              _react2['default'].createElement(
	                'li',
	                { className: 'dropdown' },
	                _react2['default'].createElement(
	                  'a',
	                  { href: '#', className: 'dropdown-toggle', 'data-toggle': 'dropdown' },
	                  'Examples ',
	                  _react2['default'].createElement('b', { className: 'caret' })
	                ),
	                _react2['default'].createElement(_ExampleList2['default'], { links: this.props.exampleLinks, className: 'dropdown-menu' })
	              )
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return Navbar;
	}(_react2['default'].Component);

	Navbar.propTypes = {
	  exampleLinks: _react.PropTypes.array.isRequired
	};

	exports['default'] = Navbar;

/***/ }
/******/ ])
});
;