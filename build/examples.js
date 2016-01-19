(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("faker"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "faker"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("react"), require("faker")) : factory(root["React"], root["faker"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_159__) {
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

	var React = __webpack_require__(1);
	var ReactRouter = __webpack_require__(2);

	var basicExample = __webpack_require__(102);
	var resizableExample = __webpack_require__(107);
	var fixedColsExample = __webpack_require__(112);
	var editableExample = __webpack_require__(113);
	var formatterExample = __webpack_require__(114);
	var editorsExample = __webpack_require__(115);
	var sortableExample = __webpack_require__(116);
	var filterableExample = __webpack_require__(117);
	var millionRowsExample = __webpack_require__(118);
	var immutableDataExample = __webpack_require__(119);
	var customRowRenderer = __webpack_require__(156);
	var fullExample = __webpack_require__(158);
	var fullExampleImmutable = __webpack_require__(160);
	var emptyRowsExample = __webpack_require__(164);

	var Route = ReactRouter.Route;
	var RouteHandler = ReactRouter.RouteHandler;
	var Link = ReactRouter.Link;

	var App = React.createClass({
	  displayName: 'App',

	  render: function render() {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'h1',
	        { className: 'page-header' },
	        'React Data Grid Examples'
	      ),
	      React.createElement(RouteHandler, null)
	    );
	  }
	});

	var routes = React.createElement(
	  Route,
	  { handler: App },
	  React.createElement(Route, { name: 'basic', handler: basicExample }),
	  React.createElement(Route, { name: 'resizable', handler: resizableExample }),
	  React.createElement(Route, { name: 'fixed', handler: fixedColsExample }),
	  React.createElement(Route, { name: 'editable', handler: editableExample }),
	  React.createElement(Route, { name: 'formatters', handler: formatterExample }),
	  React.createElement(Route, { name: 'editors', handler: editorsExample }),
	  React.createElement(Route, { name: 'sortable', handler: sortableExample }),
	  React.createElement(Route, { name: 'filterable', handler: filterableExample }),
	  React.createElement(Route, { name: 'million-rows', handler: millionRowsExample }),
	  React.createElement(Route, { name: 'all-the-features', handler: fullExample }),
	  React.createElement(Route, { name: 'all-features-immutable', handler: fullExampleImmutable }),
	  React.createElement(Route, { name: 'immutable-data', handler: immutableDataExample }),
	  React.createElement(Route, { name: 'custom-row-renderer', handler: customRowRenderer }),
	  React.createElement(Route, { name: 'empty-rows', handler: emptyRowsExample })
	);

	ReactRouter.run(routes, function (Handler) {
	  React.render(React.createElement(Handler, null), document.getElementById('example'));
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.DefaultRoute = __webpack_require__(3);
	exports.Link = __webpack_require__(74);
	exports.NotFoundRoute = __webpack_require__(75);
	exports.Redirect = __webpack_require__(76);
	exports.Route = __webpack_require__(73);
	exports.ActiveHandler = __webpack_require__(71);
	exports.RouteHandler = exports.ActiveHandler;

	exports.HashLocation = __webpack_require__(77);
	exports.HistoryLocation = __webpack_require__(81);
	exports.RefreshLocation = __webpack_require__(82);
	exports.StaticLocation = __webpack_require__(83);
	exports.TestLocation = __webpack_require__(84);

	exports.ImitateBrowserBehavior = __webpack_require__(85);
	exports.ScrollToTopBehavior = __webpack_require__(86);

	exports.History = __webpack_require__(79);
	exports.Navigation = __webpack_require__(87);
	exports.State = __webpack_require__(88);

	exports.createRoute = __webpack_require__(29).createRoute;
	exports.createDefaultRoute = __webpack_require__(29).createDefaultRoute;
	exports.createNotFoundRoute = __webpack_require__(29).createNotFoundRoute;
	exports.createRedirect = __webpack_require__(29).createRedirect;
	exports.createRoutesFromReactChildren = __webpack_require__(89);

	exports.create = __webpack_require__(90);
	exports.run = __webpack_require__(99);

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Object$getOwnPropertyDescriptor = __webpack_require__(4)['default'];

	var _Object$create = __webpack_require__(19)['default'];

	var _Object$setPrototypeOf = __webpack_require__(21)['default'];

	var _get = function get(_x, _x2, _x3) {
	  var _again = true;_function: while (_again) {
	    var object = _x,
	        property = _x2,
	        receiver = _x3;_again = false;if (object === null) object = Function.prototype;var desc = _Object$getOwnPropertyDescriptor(object, property);if (desc === undefined) {
	      var parent = Object.getPrototypeOf(object);if (parent === null) {
	        return undefined;
	      } else {
	        _x = parent;_x2 = property;_x3 = receiver;_again = true;desc = parent = undefined;continue _function;
	      }
	    } else if ('value' in desc) {
	      return desc.value;
	    } else {
	      var getter = desc.get;if (getter === undefined) {
	        return undefined;
	      }return getter.call(receiver);
	    }
	  }
	};

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== 'function' && superClass !== null) {
	    throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
	  }subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var PropTypes = __webpack_require__(27);
	var RouteHandler = __webpack_require__(71);
	var Route = __webpack_require__(73);

	/**
	 * A <DefaultRoute> component is a special kind of <Route> that
	 * renders when its parent matches but none of its siblings do.
	 * Only one such route may be used at any given level in the
	 * route hierarchy.
	 */

	var DefaultRoute = (function (_Route) {
	  _inherits(DefaultRoute, _Route);

	  function DefaultRoute() {
	    _classCallCheck(this, DefaultRoute);

	    _get(Object.getPrototypeOf(DefaultRoute.prototype), 'constructor', this).apply(this, arguments);
	  }

	  // TODO: Include these in the above class definition
	  // once we can use ES7 property initializers.
	  // https://github.com/babel/babel/issues/619

	  return DefaultRoute;
	})(Route);

	DefaultRoute.propTypes = {
	  name: PropTypes.string,
	  path: PropTypes.falsy,
	  children: PropTypes.falsy,
	  handler: PropTypes.func.isRequired
	};

	DefaultRoute.defaultProps = {
	  handler: RouteHandler
	};

	module.exports = DefaultRoute;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(5), __esModule: true };

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(6);
	__webpack_require__(7);
	module.exports = function getOwnPropertyDescriptor(it, key) {
	  return $.getDesc(it, key);
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	var $Object = Object;
	module.exports = {
	  create: $Object.create,
	  getProto: $Object.getPrototypeOf,
	  isEnum: ({}).propertyIsEnumerable,
	  getDesc: $Object.getOwnPropertyDescriptor,
	  setDesc: $Object.defineProperty,
	  setDescs: $Object.defineProperties,
	  getKeys: $Object.keys,
	  getNames: $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each: [].forEach
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	'use strict';

	var toIObject = __webpack_require__(8);

	__webpack_require__(12)('getOwnPropertyDescriptor', function ($getOwnPropertyDescriptor) {
	  return function getOwnPropertyDescriptor(it, key) {
	    return $getOwnPropertyDescriptor(toIObject(it), key);
	  };
	});

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	'use strict';

	var IObject = __webpack_require__(9),
	    defined = __webpack_require__(11);
	module.exports = function (it) {
	  return IObject(defined(it));
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	'use strict';

	var cof = __webpack_require__(10);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";

	var toString = ({}).toString;

	module.exports = function (it) {
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	"use strict";

	module.exports = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	'use strict';

	var $export = __webpack_require__(13),
	    core = __webpack_require__(15),
	    fails = __webpack_require__(18);
	module.exports = function (KEY, exec) {
	  var fn = (core.Object || {})[KEY] || Object[KEY],
	      exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function () {
	    fn(1);
	  }), 'Object', exp);
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var global = __webpack_require__(14),
	    core = __webpack_require__(15),
	    ctx = __webpack_require__(16),
	    PROTOTYPE = 'prototype';

	var $export = function $export(type, name, source) {
	  var IS_FORCED = type & $export.F,
	      IS_GLOBAL = type & $export.G,
	      IS_STATIC = type & $export.S,
	      IS_PROTO = type & $export.P,
	      IS_BIND = type & $export.B,
	      IS_WRAP = type & $export.W,
	      exports = IS_GLOBAL ? core : core[name] || (core[name] = {}),
	      target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE],
	      key,
	      own,
	      out;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && key in target;
	    if (own && key in exports) continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function (C) {
	      var F = function F(param) {
	        return this instanceof C ? new C(param) : C(param);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	      // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    if (IS_PROTO) (exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
	  }
	};
	// type bitmap
	$export.F = 1; // forced
	$export.G = 2; // global
	$export.S = 4; // static
	$export.P = 8; // proto
	$export.B = 16; // bind
	$export.W = 32; // wrap
	module.exports = $export;

/***/ },
/* 14 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	'use strict';

	var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';

	var core = module.exports = { version: '1.2.6' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	'use strict';

	var aFunction = __webpack_require__(17);
	module.exports = function (fn, that, length) {
	  aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1:
	      return function (a) {
	        return fn.call(that, a);
	      };
	    case 2:
	      return function (a, b) {
	        return fn.call(that, a, b);
	      };
	    case 3:
	      return function (a, b, c) {
	        return fn.call(that, a, b, c);
	      };
	  }
	  return function () /* ...args */{
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 18 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(20), __esModule: true };

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(6);
	module.exports = function create(P, D) {
	  return $.create(P, D);
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(22), __esModule: true };

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(23);
	module.exports = __webpack_require__(15).Object.setPrototypeOf;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	'use strict';

	var $export = __webpack_require__(13);
	$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(24).set });

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	'use strict';

	var _Object$setPrototypeOf = __webpack_require__(21)['default'];

	var getDesc = __webpack_require__(6).getDesc,
	    isObject = __webpack_require__(25),
	    anObject = __webpack_require__(26);
	var check = function check(O, proto) {
	  anObject(O);
	  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: _Object$setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	  (function (test, buggy, set) {
	    try {
	      set = __webpack_require__(16)(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
	      set(test, []);
	      buggy = !(test instanceof Array);
	    } catch (e) {
	      buggy = true;
	    }
	    return function setPrototypeOf(O, proto) {
	      check(O, proto);
	      if (buggy) O.__proto__ = proto;else set(O, proto);
	      return O;
	    };
	  })({}, false) : undefined),
	  check: check
	};

/***/ },
/* 25 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isObject = __webpack_require__(25);
	module.exports = function (it) {
	  if (!isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var assign = __webpack_require__(28);
	var ReactPropTypes = __webpack_require__(1).PropTypes;
	var Route = __webpack_require__(29);

	var PropTypes = assign({}, ReactPropTypes, {

	  /**
	   * Indicates that a prop should be falsy.
	   */
	  falsy: function falsy(props, propName, componentName) {
	    if (props[propName]) return new Error('<' + componentName + '> should not have a "' + propName + '" prop');
	  },

	  /**
	   * Indicates that a prop should be a Route object.
	   */
	  route: ReactPropTypes.instanceOf(Route),

	  /**
	   * Indicates that a prop should be a Router object.
	   */
	  //router: ReactPropTypes.instanceOf(Router) // TODO
	  router: ReactPropTypes.func

	});

	module.exports = PropTypes;

/***/ },
/* 28 */
/***/ function(module, exports) {

	/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule Object.assign
	 */

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.assign

	'use strict';

	function assign(target, sources) {
	  if (target == null) {
	    throw new TypeError('Object.assign target cannot be null or undefined');
	  }

	  var to = Object(target);
	  var hasOwnProperty = Object.prototype.hasOwnProperty;

	  for (var nextIndex = 1; nextIndex < arguments.length; nextIndex++) {
	    var nextSource = arguments[nextIndex];
	    if (nextSource == null) {
	      continue;
	    }

	    var from = Object(nextSource);

	    // We don't currently support accessors nor proxies. Therefore this
	    // copy cannot throw. If we ever supported this then we must handle
	    // exceptions and side-effects. We don't support symbols so they won't
	    // be transferred.

	    for (var key in from) {
	      if (hasOwnProperty.call(from, key)) {
	        to[key] = from[key];
	      }
	    }
	  }

	  return to;
	}

	module.exports = assign;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Object$defineProperty = __webpack_require__(30)['default'];

	var _createClass = (function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;_Object$defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	})();

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	var assign = __webpack_require__(28);
	var invariant = __webpack_require__(32);
	var warning = __webpack_require__(34);
	var PathUtils = __webpack_require__(35);

	var _currentRoute;

	var Route = (function () {
	  _createClass(Route, null, [{
	    key: 'createRoute',

	    /**
	     * Creates and returns a new route. Options may be a URL pathname string
	     * with placeholders for named params or an object with any of the following
	     * properties:
	     *
	     * - name                     The name of the route. This is used to lookup a
	     *                            route relative to its parent route and should be
	     *                            unique among all child routes of the same parent
	     * - path                     A URL pathname string with optional placeholders
	     *                            that specify the names of params to extract from
	     *                            the URL when the path matches. Defaults to `/${name}`
	     *                            when there is a name given, or the path of the parent
	     *                            route, or /
	     * - ignoreScrollBehavior     True to make this route (and all descendants) ignore
	     *                            the scroll behavior of the router
	     * - isDefault                True to make this route the default route among all
	     *                            its siblings
	     * - isNotFound               True to make this route the "not found" route among
	     *                            all its siblings
	     * - onEnter                  A transition hook that will be called when the
	     *                            router is going to enter this route
	     * - onLeave                  A transition hook that will be called when the
	     *                            router is going to leave this route
	     * - handler                  A React component that will be rendered when
	     *                            this route is active
	     * - parentRoute              The parent route to use for this route. This option
	     *                            is automatically supplied when creating routes inside
	     *                            the callback to another invocation of createRoute. You
	     *                            only ever need to use this when declaring routes
	     *                            independently of one another to manually piece together
	     *                            the route hierarchy
	     *
	     * The callback may be used to structure your route hierarchy. Any call to
	     * createRoute, createDefaultRoute, createNotFoundRoute, or createRedirect
	     * inside the callback automatically uses this route as its parent.
	     */
	    value: function createRoute(options, callback) {
	      options = options || {};

	      if (typeof options === 'string') options = { path: options };

	      var parentRoute = _currentRoute;

	      if (parentRoute) {
	        warning(options.parentRoute == null || options.parentRoute === parentRoute, 'You should not use parentRoute with createRoute inside another route\'s child callback; it is ignored');
	      } else {
	        parentRoute = options.parentRoute;
	      }

	      var name = options.name;
	      var path = options.path || name;

	      if (path && !(options.isDefault || options.isNotFound)) {
	        if (PathUtils.isAbsolute(path)) {
	          if (parentRoute) {
	            invariant(path === parentRoute.path || parentRoute.paramNames.length === 0, 'You cannot nest path "%s" inside "%s"; the parent requires URL parameters', path, parentRoute.path);
	          }
	        } else if (parentRoute) {
	          // Relative paths extend their parent.
	          path = PathUtils.join(parentRoute.path, path);
	        } else {
	          path = '/' + path;
	        }
	      } else {
	        path = parentRoute ? parentRoute.path : '/';
	      }

	      if (options.isNotFound && !/\*$/.test(path)) path += '*'; // Auto-append * to the path of not found routes.

	      var route = new Route(name, path, options.ignoreScrollBehavior, options.isDefault, options.isNotFound, options.onEnter, options.onLeave, options.handler);

	      if (parentRoute) {
	        if (route.isDefault) {
	          invariant(parentRoute.defaultRoute == null, '%s may not have more than one default route', parentRoute);

	          parentRoute.defaultRoute = route;
	        } else if (route.isNotFound) {
	          invariant(parentRoute.notFoundRoute == null, '%s may not have more than one not found route', parentRoute);

	          parentRoute.notFoundRoute = route;
	        }

	        parentRoute.appendChild(route);
	      }

	      // Any routes created in the callback
	      // use this route as their parent.
	      if (typeof callback === 'function') {
	        var currentRoute = _currentRoute;
	        _currentRoute = route;
	        callback.call(route, route);
	        _currentRoute = currentRoute;
	      }

	      return route;
	    }

	    /**
	     * Creates and returns a route that is rendered when its parent matches
	     * the current URL.
	     */
	  }, {
	    key: 'createDefaultRoute',
	    value: function createDefaultRoute(options) {
	      return Route.createRoute(assign({}, options, { isDefault: true }));
	    }

	    /**
	     * Creates and returns a route that is rendered when its parent matches
	     * the current URL but none of its siblings do.
	     */
	  }, {
	    key: 'createNotFoundRoute',
	    value: function createNotFoundRoute(options) {
	      return Route.createRoute(assign({}, options, { isNotFound: true }));
	    }

	    /**
	     * Creates and returns a route that automatically redirects the transition
	     * to another route. In addition to the normal options to createRoute, this
	     * function accepts the following options:
	     *
	     * - from         An alias for the `path` option. Defaults to *
	     * - to           The path/route/route name to redirect to
	     * - params       The params to use in the redirect URL. Defaults
	     *                to using the current params
	     * - query        The query to use in the redirect URL. Defaults
	     *                to using the current query
	     */
	  }, {
	    key: 'createRedirect',
	    value: function createRedirect(options) {
	      return Route.createRoute(assign({}, options, {
	        path: options.path || options.from || '*',
	        onEnter: function onEnter(transition, params, query) {
	          transition.redirect(options.to, options.params || params, options.query || query);
	        }
	      }));
	    }
	  }]);

	  function Route(name, path, ignoreScrollBehavior, isDefault, isNotFound, onEnter, onLeave, handler) {
	    _classCallCheck(this, Route);

	    this.name = name;
	    this.path = path;
	    this.paramNames = PathUtils.extractParamNames(this.path);
	    this.ignoreScrollBehavior = !!ignoreScrollBehavior;
	    this.isDefault = !!isDefault;
	    this.isNotFound = !!isNotFound;
	    this.onEnter = onEnter;
	    this.onLeave = onLeave;
	    this.handler = handler;
	  }

	  /**
	   * Appends the given route to this route's child routes.
	   */

	  _createClass(Route, [{
	    key: 'appendChild',
	    value: function appendChild(route) {
	      invariant(route instanceof Route, 'route.appendChild must use a valid Route');

	      if (!this.childRoutes) this.childRoutes = [];

	      this.childRoutes.push(route);
	    }
	  }, {
	    key: 'toString',
	    value: function toString() {
	      var string = '<Route';

	      if (this.name) string += ' name="' + this.name + '"';

	      string += ' path="' + this.path + '">';

	      return string;
	    }
	  }]);

	  return Route;
	})();

	module.exports = Route;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(31), __esModule: true };

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(6);
	module.exports = function defineProperty(it, key, desc) {
	  return $.setDesc(it, key, desc);
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var invariant = function invariant(condition, format, a, b, c, d, e, f) {
	  if (process.env.NODE_ENV !== 'production') {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};

	module.exports = invariant;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(33)))

/***/ },
/* 33 */
/***/ function(module, exports) {

	// shim for using process in browser

	'use strict';

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while (len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () {
	    return '/';
	};
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function () {
	    return 0;
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of https://github.com/facebook/react/tree/0.13-stable.
	 * An additional grant of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule warning
	 */

	"use strict";

	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */

	var __DEV__ = process.env.NODE_ENV !== 'production';

	var warning = function warning() {};

	if (__DEV__) {
	  warning = function (condition, format) {
	    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	      args[_key - 2] = arguments[_key];
	    }

	    if (format === undefined) {
	      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
	    }

	    if (format.length < 10 || /^[s\W]*$/.test(format)) {
	      throw new Error('The warning format should be able to uniquely identify this ' + 'warning. Please, use a more descriptive format than: ' + format);
	    }

	    if (format.indexOf('Failed Composite propType: ') === 0) {
	      return; // Ignore CompositeComponent proptype check.
	    }

	    if (!condition) {
	      var argIndex = 0;
	      var message = 'Warning: ' + format.replace(/%s/g, function () {
	        return args[argIndex++];
	      });
	      console.warn(message);
	      try {
	        // --- Welcome to debugging React ---
	        // This error was thrown as a convenience so that you can use this stack
	        // to find the callsite that caused this warning to fire.
	        throw new Error(message);
	      } catch (x) {}
	    }
	  };
	}

	module.exports = warning;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(33)))

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var invariant = __webpack_require__(32);
	var assign = __webpack_require__(36);
	var qs = __webpack_require__(66);

	var paramCompileMatcher = /:([a-zA-Z_$][a-zA-Z0-9_$]*)|[*.()\[\]\\+|{}^$]/g;
	var paramInjectMatcher = /:([a-zA-Z_$][a-zA-Z0-9_$?]*[?]?)|[*]/g;
	var paramInjectTrailingSlashMatcher = /\/\/\?|\/\?\/|\/\?(?![^\/=]+=.*$)/g;
	var queryMatcher = /\?(.*)$/;

	var _compiledPatterns = {};

	function compilePattern(pattern) {
	  if (!(pattern in _compiledPatterns)) {
	    var paramNames = [];
	    var source = pattern.replace(paramCompileMatcher, function (match, paramName) {
	      if (paramName) {
	        paramNames.push(paramName);
	        return '([^/?#]+)';
	      } else if (match === '*') {
	        paramNames.push('splat');
	        return '(.*?)';
	      } else {
	        return '\\' + match;
	      }
	    });

	    _compiledPatterns[pattern] = {
	      matcher: new RegExp('^' + source + '$', 'i'),
	      paramNames: paramNames
	    };
	  }

	  return _compiledPatterns[pattern];
	}

	var PathUtils = {

	  /**
	   * Returns true if the given path is absolute.
	   */
	  isAbsolute: function isAbsolute(path) {
	    return path.charAt(0) === '/';
	  },

	  /**
	   * Joins two URL paths together.
	   */
	  join: function join(a, b) {
	    return a.replace(/\/*$/, '/') + b;
	  },

	  /**
	   * Returns an array of the names of all parameters in the given pattern.
	   */
	  extractParamNames: function extractParamNames(pattern) {
	    return compilePattern(pattern).paramNames;
	  },

	  /**
	   * Extracts the portions of the given URL path that match the given pattern
	   * and returns an object of param name => value pairs. Returns null if the
	   * pattern does not match the given path.
	   */
	  extractParams: function extractParams(pattern, path) {
	    var _compilePattern = compilePattern(pattern);

	    var matcher = _compilePattern.matcher;
	    var paramNames = _compilePattern.paramNames;

	    var match = path.match(matcher);

	    if (!match) return null;

	    var params = {};

	    paramNames.forEach(function (paramName, index) {
	      params[paramName] = match[index + 1];
	    });

	    return params;
	  },

	  /**
	   * Returns a version of the given route path with params interpolated. Throws
	   * if there is a dynamic segment of the route path for which there is no param.
	   */
	  injectParams: function injectParams(pattern, params) {
	    params = params || {};

	    var splatIndex = 0;

	    return pattern.replace(paramInjectMatcher, function (match, paramName) {
	      paramName = paramName || 'splat';

	      // If param is optional don't check for existence
	      if (paramName.slice(-1) === '?') {
	        paramName = paramName.slice(0, -1);

	        if (params[paramName] == null) return '';
	      } else {
	        invariant(params[paramName] != null, 'Missing "%s" parameter for path "%s"', paramName, pattern);
	      }

	      var segment;
	      if (paramName === 'splat' && Array.isArray(params[paramName])) {
	        segment = params[paramName][splatIndex++];

	        invariant(segment != null, 'Missing splat # %s for path "%s"', splatIndex, pattern);
	      } else {
	        segment = params[paramName];
	      }

	      return segment;
	    }).replace(paramInjectTrailingSlashMatcher, '/');
	  },

	  /**
	   * Returns an object that is the result of parsing any query string contained
	   * in the given path, null if the path contains no query string.
	   */
	  extractQuery: function extractQuery(path) {
	    var match = path.match(queryMatcher);
	    return match && qs.parse(match[1]);
	  },

	  /**
	   * Returns a version of the given path without the query string.
	   */
	  withoutQuery: function withoutQuery(path) {
	    return path.replace(queryMatcher, '');
	  },

	  /**
	   * Returns a version of the given path with the parameters in the given
	   * query merged into the query string.
	   */
	  withQuery: function withQuery(path, query) {
	    var existingQuery = PathUtils.extractQuery(path);

	    if (existingQuery) query = query ? assign(existingQuery, query) : existingQuery;

	    var queryString = qs.stringify(query, { arrayFormat: 'brackets' });

	    if (queryString) return PathUtils.withoutQuery(path) + '?' + queryString;

	    return PathUtils.withoutQuery(path);
	  }

	};

	module.exports = PathUtils;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Object$assign = __webpack_require__(37)['default'];

	var _Object$keys = __webpack_require__(62)['default'];

	function ToObject(val) {
		if (val == null) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	module.exports = _Object$assign || function (target, source) {
		var from;
		var keys;
		var to = ToObject(target);

		for (var s = 1; s < arguments.length; s++) {
			from = arguments[s];
			keys = _Object$keys(Object(from));

			for (var i = 0; i < keys.length; i++) {
				to[keys[i]] = from[keys[i]];
			}
		}

		return to;
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(38), __esModule: true };

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(39);
	module.exports = __webpack_require__(15).Object.assign;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	'use strict';

	var $export = __webpack_require__(13);

	$export($export.S + $export.F, 'Object', { assign: __webpack_require__(40) });

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.1 Object.assign(target, source, ...)
	'use strict';

	var _Object$assign = __webpack_require__(37)['default'];

	var _Symbol = __webpack_require__(41)['default'];

	var _Object$keys = __webpack_require__(62)['default'];

	var $ = __webpack_require__(6),
	    toObject = __webpack_require__(65),
	    IObject = __webpack_require__(9);

	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = __webpack_require__(18)(function () {
	  var a = _Object$assign,
	      A = {},
	      B = {},
	      S = _Symbol(),
	      K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function (k) {
	    B[k] = k;
	  });
	  return a({}, A)[S] != 7 || _Object$keys(a({}, B)).join('') != K;
	}) ? function assign(target, source) {
	  // eslint-disable-line no-unused-vars
	  var T = toObject(target),
	      $$ = arguments,
	      $$len = $$.length,
	      index = 1,
	      getKeys = $.getKeys,
	      getSymbols = $.getSymbols,
	      isEnum = $.isEnum;
	  while ($$len > index) {
	    var S = IObject($$[index++]),
	        keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S),
	        length = keys.length,
	        j = 0,
	        key;
	    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
	  }
	  return T;
	} : _Object$assign;

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(42), __esModule: true };

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(43);
	__webpack_require__(61);
	module.exports = __webpack_require__(15).Symbol;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var $ = __webpack_require__(6),
	    global = __webpack_require__(14),
	    has = __webpack_require__(44),
	    DESCRIPTORS = __webpack_require__(45),
	    $export = __webpack_require__(13),
	    redefine = __webpack_require__(46),
	    $fails = __webpack_require__(18),
	    shared = __webpack_require__(49),
	    setToStringTag = __webpack_require__(50),
	    uid = __webpack_require__(52),
	    wks = __webpack_require__(51),
	    keyOf = __webpack_require__(53),
	    $names = __webpack_require__(54),
	    enumKeys = __webpack_require__(58),
	    isArray = __webpack_require__(59),
	    anObject = __webpack_require__(26),
	    toIObject = __webpack_require__(8),
	    createDesc = __webpack_require__(48),
	    getDesc = $.getDesc,
	    setDesc = $.setDesc,
	    _create = $.create,
	    getNames = $names.get,
	    $Symbol = global.Symbol,
	    $JSON = global.JSON,
	    _stringify = $JSON && $JSON.stringify,
	    setter = false,
	    HIDDEN = wks('_hidden'),
	    isEnum = $.isEnum,
	    SymbolRegistry = shared('symbol-registry'),
	    AllSymbols = shared('symbols'),
	    useNative = typeof $Symbol == 'function',
	    ObjectProto = Object.prototype;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function () {
	  return _create(setDesc({}, 'a', {
	    get: function get() {
	      return setDesc(this, 'a', { value: 7 }).a;
	    }
	  })).a != 7;
	}) ? function (it, key, D) {
	  var protoDesc = getDesc(ObjectProto, key);
	  if (protoDesc) delete ObjectProto[key];
	  setDesc(it, key, D);
	  if (protoDesc && it !== ObjectProto) setDesc(ObjectProto, key, protoDesc);
	} : setDesc;

	var wrap = function wrap(tag) {
	  var sym = AllSymbols[tag] = _create($Symbol.prototype);
	  sym._k = tag;
	  DESCRIPTORS && setter && setSymbolDesc(ObjectProto, tag, {
	    configurable: true,
	    set: function set(value) {
	      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    }
	  });
	  return sym;
	};

	var isSymbol = function isSymbol(it) {
	  return typeof it == 'symbol';
	};

	var $defineProperty = function defineProperty(it, key, D) {
	  if (D && has(AllSymbols, key)) {
	    if (!D.enumerable) {
	      if (!has(it, HIDDEN)) setDesc(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
	      D = _create(D, { enumerable: createDesc(0, false) });
	    }return setSymbolDesc(it, key, D);
	  }return setDesc(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P) {
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P)),
	      i = 0,
	      l = keys.length,
	      key;
	  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P) {
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key) {
	  var E = isEnum.call(this, key);
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
	  var D = getDesc(it = toIObject(it), key);
	  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it) {
	  var names = getNames(toIObject(it)),
	      result = [],
	      i = 0,
	      key;
	  while (names.length > i) if (!has(AllSymbols, key = names[i++]) && key != HIDDEN) result.push(key);
	  return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
	  var names = getNames(toIObject(it)),
	      result = [],
	      i = 0,
	      key;
	  while (names.length > i) if (has(AllSymbols, key = names[i++])) result.push(AllSymbols[key]);
	  return result;
	};
	var $stringify = function stringify(it) {
	  if (it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
	  var args = [it],
	      i = 1,
	      $$ = arguments,
	      replacer,
	      $replacer;
	  while ($$.length > i) args.push($$[i++]);
	  replacer = args[1];
	  if (typeof replacer == 'function') $replacer = replacer;
	  if ($replacer || !isArray(replacer)) replacer = function (key, value) {
	    if ($replacer) value = $replacer.call(this, key, value);
	    if (!isSymbol(value)) return value;
	  };
	  args[1] = replacer;
	  return _stringify.apply($JSON, args);
	};
	var buggyJSON = $fails(function () {
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
	});

	// 19.4.1.1 Symbol([description])
	if (!useNative) {
	  $Symbol = function Symbol() {
	    if (isSymbol(this)) throw TypeError('Symbol is not a constructor');
	    return wrap(uid(arguments.length > 0 ? arguments[0] : undefined));
	  };
	  redefine($Symbol.prototype, 'toString', function toString() {
	    return this._k;
	  });

	  isSymbol = function (it) {
	    return it instanceof $Symbol;
	  };

	  $.create = $create;
	  $.isEnum = $propertyIsEnumerable;
	  $.getDesc = $getOwnPropertyDescriptor;
	  $.setDesc = $defineProperty;
	  $.setDescs = $defineProperties;
	  $.getNames = $names.get = $getOwnPropertyNames;
	  $.getSymbols = $getOwnPropertySymbols;

	  if (DESCRIPTORS && !__webpack_require__(60)) {
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }
	}

	var symbolStatics = {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function _for(key) {
	    return has(SymbolRegistry, key += '') ? SymbolRegistry[key] : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key) {
	    return keyOf(SymbolRegistry, key);
	  },
	  useSetter: function useSetter() {
	    setter = true;
	  },
	  useSimple: function useSimple() {
	    setter = false;
	  }
	};
	// 19.4.2.2 Symbol.hasInstance
	// 19.4.2.3 Symbol.isConcatSpreadable
	// 19.4.2.4 Symbol.iterator
	// 19.4.2.6 Symbol.match
	// 19.4.2.8 Symbol.replace
	// 19.4.2.9 Symbol.search
	// 19.4.2.10 Symbol.species
	// 19.4.2.11 Symbol.split
	// 19.4.2.12 Symbol.toPrimitive
	// 19.4.2.13 Symbol.toStringTag
	// 19.4.2.14 Symbol.unscopables
	$.each.call(('hasInstance,isConcatSpreadable,iterator,match,replace,search,' + 'species,split,toPrimitive,toStringTag,unscopables').split(','), function (it) {
	  var sym = wks(it);
	  symbolStatics[it] = useNative ? sym : wrap(sym);
	});

	setter = true;

	$export($export.G + $export.W, { Symbol: $Symbol });

	$export($export.S, 'Symbol', symbolStatics);

	$export($export.S + $export.F * !useNative, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!useNative || buggyJSON), 'JSON', { stringify: $stringify });

	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 44 */
/***/ function(module, exports) {

	"use strict";

	var hasOwnProperty = ({}).hasOwnProperty;
	module.exports = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	'use strict';

	module.exports = !__webpack_require__(18)(function () {
	  return Object.defineProperty({}, 'a', { get: function get() {
	      return 7;
	    } }).a != 7;
	});

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(47);

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(6),
	    createDesc = __webpack_require__(48);
	module.exports = __webpack_require__(45) ? function (object, key, value) {
	  return $.setDesc(object, key, createDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

/***/ },
/* 48 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var global = __webpack_require__(14),
	    SHARED = '__core-js_shared__',
	    store = global[SHARED] || (global[SHARED] = {});
	module.exports = function (key) {
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var def = __webpack_require__(6).setDesc,
	    has = __webpack_require__(44),
	    TAG = __webpack_require__(51)('toStringTag');

	module.exports = function (it, tag, stat) {
	  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var store = __webpack_require__(49)('wks'),
	    uid = __webpack_require__(52),
	    Symbol = __webpack_require__(14).Symbol;
	module.exports = function (name) {
	  return store[name] || (store[name] = Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
	};

/***/ },
/* 52 */
/***/ function(module, exports) {

	'use strict';

	var id = 0,
	    px = Math.random();
	module.exports = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(6),
	    toIObject = __webpack_require__(8);
	module.exports = function (object, el) {
	  var O = toIObject(object),
	      keys = $.getKeys(O),
	      length = keys.length,
	      index = 0,
	      key;
	  while (length > index) if (O[key = keys[index++]] === el) return key;
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	'use strict';

	var _Object$getOwnPropertyNames = __webpack_require__(55)['default'];

	var toIObject = __webpack_require__(8),
	    getNames = __webpack_require__(6).getNames,
	    toString = ({}).toString;

	var windowNames = typeof window == 'object' && _Object$getOwnPropertyNames ? _Object$getOwnPropertyNames(window) : [];

	var getWindowNames = function getWindowNames(it) {
	  try {
	    return getNames(it);
	  } catch (e) {
	    return windowNames.slice();
	  }
	};

	module.exports.get = function getOwnPropertyNames(it) {
	  if (windowNames && toString.call(it) == '[object Window]') return getWindowNames(it);
	  return getNames(toIObject(it));
	};

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(56), __esModule: true };

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(6);
	__webpack_require__(57);
	module.exports = function getOwnPropertyNames(it) {
	  return $.getNames(it);
	};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 Object.getOwnPropertyNames(O)
	'use strict';

	__webpack_require__(12)('getOwnPropertyNames', function () {
	  return __webpack_require__(54).get;
	});

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	'use strict';

	var $ = __webpack_require__(6);
	module.exports = function (it) {
	  var keys = $.getKeys(it),
	      getSymbols = $.getSymbols;
	  if (getSymbols) {
	    var symbols = getSymbols(it),
	        isEnum = $.isEnum,
	        i = 0,
	        key;
	    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) keys.push(key);
	  }
	  return keys;
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	'use strict';

	var cof = __webpack_require__(10);
	module.exports = Array.isArray || function (arg) {
	  return cof(arg) == 'Array';
	};

/***/ },
/* 60 */
/***/ function(module, exports) {

	"use strict";

	module.exports = true;

/***/ },
/* 61 */
/***/ function(module, exports) {

	"use strict";

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(63), __esModule: true };

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(64);
	module.exports = __webpack_require__(15).Object.keys;

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	'use strict';

	var toObject = __webpack_require__(65);

	__webpack_require__(12)('keys', function ($keys) {
	  return function keys(it) {
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	'use strict';

	var defined = __webpack_require__(11);
	module.exports = function (it) {
	  return Object(defined(it));
	};

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(67);

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	// Load modules

	'use strict';

	var Stringify = __webpack_require__(68);
	var Parse = __webpack_require__(70);

	// Declare internals

	var internals = {};

	module.exports = {
	    stringify: Stringify,
	    parse: Parse
	};

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	// Load modules

	'use strict';

	var _Object$keys = __webpack_require__(62)['default'];

	var Utils = __webpack_require__(69);

	// Declare internals

	var internals = {
	    delimiter: '&',
	    arrayPrefixGenerators: {
	        brackets: function brackets(prefix, key) {
	            return prefix + '[]';
	        },
	        indices: function indices(prefix, key) {
	            return prefix + '[' + key + ']';
	        },
	        repeat: function repeat(prefix, key) {
	            return prefix;
	        }
	    }
	};

	internals.stringify = function (obj, prefix, generateArrayPrefix) {

	    if (Utils.isBuffer(obj)) {
	        obj = obj.toString();
	    } else if (obj instanceof Date) {
	        obj = obj.toISOString();
	    } else if (obj === null) {
	        obj = '';
	    }

	    if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean') {

	        return [encodeURIComponent(prefix) + '=' + encodeURIComponent(obj)];
	    }

	    var values = [];

	    if (typeof obj === 'undefined') {
	        return values;
	    }

	    var objKeys = _Object$keys(obj);
	    for (var i = 0, il = objKeys.length; i < il; ++i) {
	        var key = objKeys[i];
	        if (Array.isArray(obj)) {
	            values = values.concat(internals.stringify(obj[key], generateArrayPrefix(prefix, key), generateArrayPrefix));
	        } else {
	            values = values.concat(internals.stringify(obj[key], prefix + '[' + key + ']', generateArrayPrefix));
	        }
	    }

	    return values;
	};

	module.exports = function (obj, options) {

	    options = options || {};
	    var delimiter = typeof options.delimiter === 'undefined' ? internals.delimiter : options.delimiter;

	    var keys = [];

	    if (typeof obj !== 'object' || obj === null) {

	        return '';
	    }

	    var arrayFormat;
	    if (options.arrayFormat in internals.arrayPrefixGenerators) {
	        arrayFormat = options.arrayFormat;
	    } else if ('indices' in options) {
	        arrayFormat = options.indices ? 'indices' : 'repeat';
	    } else {
	        arrayFormat = 'indices';
	    }

	    var generateArrayPrefix = internals.arrayPrefixGenerators[arrayFormat];

	    var objKeys = _Object$keys(obj);
	    for (var i = 0, il = objKeys.length; i < il; ++i) {
	        var key = objKeys[i];
	        keys = keys.concat(internals.stringify(obj[key], key, generateArrayPrefix));
	    }

	    return keys.join(delimiter);
	};

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	// Load modules

	// Declare internals

	'use strict';

	var _Object$keys = __webpack_require__(62)['default'];

	var internals = {};

	exports.arrayToObject = function (source) {

	    var obj = {};
	    for (var i = 0, il = source.length; i < il; ++i) {
	        if (typeof source[i] !== 'undefined') {

	            obj[i] = source[i];
	        }
	    }

	    return obj;
	};

	exports.merge = function (target, source) {

	    if (!source) {
	        return target;
	    }

	    if (typeof source !== 'object') {
	        if (Array.isArray(target)) {
	            target.push(source);
	        } else {
	            target[source] = true;
	        }

	        return target;
	    }

	    if (typeof target !== 'object') {
	        target = [target].concat(source);
	        return target;
	    }

	    if (Array.isArray(target) && !Array.isArray(source)) {

	        target = exports.arrayToObject(target);
	    }

	    var keys = _Object$keys(source);
	    for (var k = 0, kl = keys.length; k < kl; ++k) {
	        var key = keys[k];
	        var value = source[key];

	        if (!target[key]) {
	            target[key] = value;
	        } else {
	            target[key] = exports.merge(target[key], value);
	        }
	    }

	    return target;
	};

	exports.decode = function (str) {

	    try {
	        return decodeURIComponent(str.replace(/\+/g, ' '));
	    } catch (e) {
	        return str;
	    }
	};

	exports.compact = function (obj, refs) {

	    if (typeof obj !== 'object' || obj === null) {

	        return obj;
	    }

	    refs = refs || [];
	    var lookup = refs.indexOf(obj);
	    if (lookup !== -1) {
	        return refs[lookup];
	    }

	    refs.push(obj);

	    if (Array.isArray(obj)) {
	        var compacted = [];

	        for (var i = 0, il = obj.length; i < il; ++i) {
	            if (typeof obj[i] !== 'undefined') {
	                compacted.push(obj[i]);
	            }
	        }

	        return compacted;
	    }

	    var keys = _Object$keys(obj);
	    for (i = 0, il = keys.length; i < il; ++i) {
	        var key = keys[i];
	        obj[key] = exports.compact(obj[key], refs);
	    }

	    return obj;
	};

	exports.isRegExp = function (obj) {
	    return Object.prototype.toString.call(obj) === '[object RegExp]';
	};

	exports.isBuffer = function (obj) {

	    if (obj === null || typeof obj === 'undefined') {

	        return false;
	    }

	    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
	};

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	// Load modules

	'use strict';

	var _Object$keys = __webpack_require__(62)['default'];

	var Utils = __webpack_require__(69);

	// Declare internals

	var internals = {
	    delimiter: '&',
	    depth: 5,
	    arrayLimit: 20,
	    parameterLimit: 1000
	};

	internals.parseValues = function (str, options) {

	    var obj = {};
	    var parts = str.split(options.delimiter, options.parameterLimit === Infinity ? undefined : options.parameterLimit);

	    for (var i = 0, il = parts.length; i < il; ++i) {
	        var part = parts[i];
	        var pos = part.indexOf(']=') === -1 ? part.indexOf('=') : part.indexOf(']=') + 1;

	        if (pos === -1) {
	            obj[Utils.decode(part)] = '';
	        } else {
	            var key = Utils.decode(part.slice(0, pos));
	            var val = Utils.decode(part.slice(pos + 1));

	            if (Object.prototype.hasOwnProperty(key)) {
	                continue;
	            }

	            if (!obj.hasOwnProperty(key)) {
	                obj[key] = val;
	            } else {
	                obj[key] = [].concat(obj[key]).concat(val);
	            }
	        }
	    }

	    return obj;
	};

	internals.parseObject = function (chain, val, options) {

	    if (!chain.length) {
	        return val;
	    }

	    var root = chain.shift();

	    var obj = {};
	    if (root === '[]') {
	        obj = [];
	        obj = obj.concat(internals.parseObject(chain, val, options));
	    } else {
	        var cleanRoot = root[0] === '[' && root[root.length - 1] === ']' ? root.slice(1, root.length - 1) : root;
	        var index = parseInt(cleanRoot, 10);
	        var indexString = '' + index;
	        if (!isNaN(index) && root !== cleanRoot && indexString === cleanRoot && index >= 0 && index <= options.arrayLimit) {

	            obj = [];
	            obj[index] = internals.parseObject(chain, val, options);
	        } else {
	            obj[cleanRoot] = internals.parseObject(chain, val, options);
	        }
	    }

	    return obj;
	};

	internals.parseKeys = function (key, val, options) {

	    if (!key) {
	        return;
	    }

	    // The regex chunks

	    var parent = /^([^\[\]]*)/;
	    var child = /(\[[^\[\]]*\])/g;

	    // Get the parent

	    var segment = parent.exec(key);

	    // Don't allow them to overwrite object prototype properties

	    if (Object.prototype.hasOwnProperty(segment[1])) {
	        return;
	    }

	    // Stash the parent if it exists

	    var keys = [];
	    if (segment[1]) {
	        keys.push(segment[1]);
	    }

	    // Loop through children appending to the array until we hit depth

	    var i = 0;
	    while ((segment = child.exec(key)) !== null && i < options.depth) {

	        ++i;
	        if (!Object.prototype.hasOwnProperty(segment[1].replace(/\[|\]/g, ''))) {
	            keys.push(segment[1]);
	        }
	    }

	    // If there's a remainder, just add whatever is left

	    if (segment) {
	        keys.push('[' + key.slice(segment.index) + ']');
	    }

	    return internals.parseObject(keys, val, options);
	};

	module.exports = function (str, options) {

	    if (str === '' || str === null || typeof str === 'undefined') {

	        return {};
	    }

	    options = options || {};
	    options.delimiter = typeof options.delimiter === 'string' || Utils.isRegExp(options.delimiter) ? options.delimiter : internals.delimiter;
	    options.depth = typeof options.depth === 'number' ? options.depth : internals.depth;
	    options.arrayLimit = typeof options.arrayLimit === 'number' ? options.arrayLimit : internals.arrayLimit;
	    options.parameterLimit = typeof options.parameterLimit === 'number' ? options.parameterLimit : internals.parameterLimit;

	    var tempObj = typeof str === 'string' ? internals.parseValues(str, options) : str;
	    var obj = {};

	    // Iterate over the keys and setup the new object

	    var keys = _Object$keys(tempObj);
	    for (var i = 0, il = keys.length; i < il; ++i) {
	        var key = keys[i];
	        var newObj = internals.parseKeys(key, tempObj[key], options);
	        obj = Utils.merge(obj, newObj);
	    }

	    return Utils.compact(obj);
	};

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Object$defineProperty = __webpack_require__(30)['default'];

	var _Object$getOwnPropertyDescriptor = __webpack_require__(4)['default'];

	var _Object$create = __webpack_require__(19)['default'];

	var _Object$setPrototypeOf = __webpack_require__(21)['default'];

	var _createClass = (function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;_Object$defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	})();

	var _get = function get(_x, _x2, _x3) {
	  var _again = true;_function: while (_again) {
	    var object = _x,
	        property = _x2,
	        receiver = _x3;_again = false;if (object === null) object = Function.prototype;var desc = _Object$getOwnPropertyDescriptor(object, property);if (desc === undefined) {
	      var parent = Object.getPrototypeOf(object);if (parent === null) {
	        return undefined;
	      } else {
	        _x = parent;_x2 = property;_x3 = receiver;_again = true;desc = parent = undefined;continue _function;
	      }
	    } else if ('value' in desc) {
	      return desc.value;
	    } else {
	      var getter = desc.get;if (getter === undefined) {
	        return undefined;
	      }return getter.call(receiver);
	    }
	  }
	};

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== 'function' && superClass !== null) {
	    throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
	  }subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var React = __webpack_require__(1);
	var ContextWrapper = __webpack_require__(72);
	var assign = __webpack_require__(28);
	var PropTypes = __webpack_require__(27);

	var REF_NAME = '__routeHandler__';

	/**
	 * A <RouteHandler> component renders the active child route handler
	 * when routes are nested.
	 */

	var RouteHandler = (function (_React$Component) {
	  _inherits(RouteHandler, _React$Component);

	  function RouteHandler() {
	    _classCallCheck(this, RouteHandler);

	    _get(Object.getPrototypeOf(RouteHandler.prototype), 'constructor', this).apply(this, arguments);
	  }

	  // TODO: Include these in the above class definition
	  // once we can use ES7 property initializers.
	  // https://github.com/babel/babel/issues/619

	  _createClass(RouteHandler, [{
	    key: 'getChildContext',
	    value: function getChildContext() {
	      return {
	        routeDepth: this.context.routeDepth + 1
	      };
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this._updateRouteComponent(this.refs[REF_NAME]);
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate() {
	      this._updateRouteComponent(this.refs[REF_NAME]);
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this._updateRouteComponent(null);
	    }
	  }, {
	    key: '_updateRouteComponent',
	    value: function _updateRouteComponent(component) {
	      this.context.router.setRouteComponentAtDepth(this.getRouteDepth(), component);
	    }
	  }, {
	    key: 'getRouteDepth',
	    value: function getRouteDepth() {
	      return this.context.routeDepth;
	    }
	  }, {
	    key: 'createChildRouteHandler',
	    value: function createChildRouteHandler(props) {
	      var route = this.context.router.getRouteAtDepth(this.getRouteDepth());

	      if (route == null) return null;

	      var childProps = assign({}, props || this.props, {
	        ref: REF_NAME,
	        params: this.context.router.getCurrentParams(),
	        query: this.context.router.getCurrentQuery()
	      });

	      return React.createElement(route.handler, childProps);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var handler = this.createChildRouteHandler();
	      // <script/> for things like <CSSTransitionGroup/> that don't like null
	      return handler ? React.createElement(ContextWrapper, null, handler) : React.createElement('script', null);
	    }
	  }]);

	  return RouteHandler;
	})(React.Component);

	RouteHandler.contextTypes = {
	  routeDepth: PropTypes.number.isRequired,
	  router: PropTypes.router.isRequired
	};

	RouteHandler.childContextTypes = {
	  routeDepth: PropTypes.number.isRequired
	};

	module.exports = RouteHandler;

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * This component is necessary to get around a context warning
	 * present in React 0.13.0. It sovles this by providing a separation
	 * between the "owner" and "parent" contexts.
	 */

	'use strict';

	var _Object$defineProperty = __webpack_require__(30)['default'];

	var _Object$getOwnPropertyDescriptor = __webpack_require__(4)['default'];

	var _Object$create = __webpack_require__(19)['default'];

	var _Object$setPrototypeOf = __webpack_require__(21)['default'];

	var _createClass = (function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;_Object$defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	})();

	var _get = function get(_x, _x2, _x3) {
	  var _again = true;_function: while (_again) {
	    var object = _x,
	        property = _x2,
	        receiver = _x3;_again = false;if (object === null) object = Function.prototype;var desc = _Object$getOwnPropertyDescriptor(object, property);if (desc === undefined) {
	      var parent = Object.getPrototypeOf(object);if (parent === null) {
	        return undefined;
	      } else {
	        _x = parent;_x2 = property;_x3 = receiver;_again = true;desc = parent = undefined;continue _function;
	      }
	    } else if ('value' in desc) {
	      return desc.value;
	    } else {
	      var getter = desc.get;if (getter === undefined) {
	        return undefined;
	      }return getter.call(receiver);
	    }
	  }
	};

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== 'function' && superClass !== null) {
	    throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
	  }subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var React = __webpack_require__(1);

	var ContextWrapper = (function (_React$Component) {
	  _inherits(ContextWrapper, _React$Component);

	  function ContextWrapper() {
	    _classCallCheck(this, ContextWrapper);

	    _get(Object.getPrototypeOf(ContextWrapper.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(ContextWrapper, [{
	    key: 'render',
	    value: function render() {
	      return this.props.children;
	    }
	  }]);

	  return ContextWrapper;
	})(React.Component);

	module.exports = ContextWrapper;

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Object$defineProperty = __webpack_require__(30)['default'];

	var _Object$getOwnPropertyDescriptor = __webpack_require__(4)['default'];

	var _Object$create = __webpack_require__(19)['default'];

	var _Object$setPrototypeOf = __webpack_require__(21)['default'];

	var _createClass = (function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;_Object$defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	})();

	var _get = function get(_x, _x2, _x3) {
	  var _again = true;_function: while (_again) {
	    var object = _x,
	        property = _x2,
	        receiver = _x3;_again = false;if (object === null) object = Function.prototype;var desc = _Object$getOwnPropertyDescriptor(object, property);if (desc === undefined) {
	      var parent = Object.getPrototypeOf(object);if (parent === null) {
	        return undefined;
	      } else {
	        _x = parent;_x2 = property;_x3 = receiver;_again = true;desc = parent = undefined;continue _function;
	      }
	    } else if ('value' in desc) {
	      return desc.value;
	    } else {
	      var getter = desc.get;if (getter === undefined) {
	        return undefined;
	      }return getter.call(receiver);
	    }
	  }
	};

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== 'function' && superClass !== null) {
	    throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
	  }subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var React = __webpack_require__(1);
	var invariant = __webpack_require__(32);
	var PropTypes = __webpack_require__(27);
	var RouteHandler = __webpack_require__(71);

	/**
	 * <Route> components specify components that are rendered to the page when the
	 * URL matches a given pattern.
	 *
	 * Routes are arranged in a nested tree structure. When a new URL is requested,
	 * the tree is searched depth-first to find a route whose path matches the URL.
	 * When one is found, all routes in the tree that lead to it are considered
	 * "active" and their components are rendered into the DOM, nested in the same
	 * order as they are in the tree.
	 *
	 * The preferred way to configure a router is using JSX. The XML-like syntax is
	 * a great way to visualize how routes are laid out in an application.
	 *
	 *   var routes = [
	 *     <Route handler={App}>
	 *       <Route name="login" handler={Login}/>
	 *       <Route name="logout" handler={Logout}/>
	 *       <Route name="about" handler={About}/>
	 *     </Route>
	 *   ];
	 *   
	 *   Router.run(routes, function (Handler) {
	 *     React.render(<Handler/>, document.body);
	 *   });
	 *
	 * Handlers for Route components that contain children can render their active
	 * child route using a <RouteHandler> element.
	 *
	 *   var App = React.createClass({
	 *     render: function () {
	 *       return (
	 *         <div className="application">
	 *           <RouteHandler/>
	 *         </div>
	 *       );
	 *     }
	 *   });
	 *
	 * If no handler is provided for the route, it will render a matched child route.
	 */

	var Route = (function (_React$Component) {
	  _inherits(Route, _React$Component);

	  function Route() {
	    _classCallCheck(this, Route);

	    _get(Object.getPrototypeOf(Route.prototype), 'constructor', this).apply(this, arguments);
	  }

	  // TODO: Include these in the above class definition
	  // once we can use ES7 property initializers.
	  // https://github.com/babel/babel/issues/619

	  _createClass(Route, [{
	    key: 'render',
	    value: function render() {
	      invariant(false, '%s elements are for router configuration only and should not be rendered', this.constructor.name);
	    }
	  }]);

	  return Route;
	})(React.Component);

	Route.propTypes = {
	  name: PropTypes.string,
	  path: PropTypes.string,
	  handler: PropTypes.func,
	  ignoreScrollBehavior: PropTypes.bool
	};

	Route.defaultProps = {
	  handler: RouteHandler
	};

	module.exports = Route;

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Object$defineProperty = __webpack_require__(30)['default'];

	var _Object$getOwnPropertyDescriptor = __webpack_require__(4)['default'];

	var _Object$create = __webpack_require__(19)['default'];

	var _Object$setPrototypeOf = __webpack_require__(21)['default'];

	var _createClass = (function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;_Object$defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	})();

	var _get = function get(_x, _x2, _x3) {
	  var _again = true;_function: while (_again) {
	    var object = _x,
	        property = _x2,
	        receiver = _x3;_again = false;if (object === null) object = Function.prototype;var desc = _Object$getOwnPropertyDescriptor(object, property);if (desc === undefined) {
	      var parent = Object.getPrototypeOf(object);if (parent === null) {
	        return undefined;
	      } else {
	        _x = parent;_x2 = property;_x3 = receiver;_again = true;desc = parent = undefined;continue _function;
	      }
	    } else if ('value' in desc) {
	      return desc.value;
	    } else {
	      var getter = desc.get;if (getter === undefined) {
	        return undefined;
	      }return getter.call(receiver);
	    }
	  }
	};

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== 'function' && superClass !== null) {
	    throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
	  }subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var React = __webpack_require__(1);
	var assign = __webpack_require__(28);
	var PropTypes = __webpack_require__(27);

	function isLeftClickEvent(event) {
	  return event.button === 0;
	}

	function isModifiedEvent(event) {
	  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
	}

	/**
	 * <Link> components are used to create an <a> element that links to a route.
	 * When that route is active, the link gets an "active" class name (or the
	 * value of its `activeClassName` prop).
	 *
	 * For example, assuming you have the following route:
	 *
	 *   <Route name="showPost" path="/posts/:postID" handler={Post}/>
	 *
	 * You could use the following component to link to that route:
	 *
	 *   <Link to="showPost" params={{ postID: "123" }} />
	 *
	 * In addition to params, links may pass along query string parameters
	 * using the `query` prop.
	 *
	 *   <Link to="showPost" params={{ postID: "123" }} query={{ show:true }}/>
	 */

	var Link = (function (_React$Component) {
	  _inherits(Link, _React$Component);

	  function Link() {
	    _classCallCheck(this, Link);

	    _get(Object.getPrototypeOf(Link.prototype), 'constructor', this).apply(this, arguments);
	  }

	  // TODO: Include these in the above class definition
	  // once we can use ES7 property initializers.
	  // https://github.com/babel/babel/issues/619

	  _createClass(Link, [{
	    key: 'handleClick',
	    value: function handleClick(event) {
	      var allowTransition = true;
	      var clickResult;

	      if (this.props.onClick) clickResult = this.props.onClick(event);

	      if (isModifiedEvent(event) || !isLeftClickEvent(event)) return;

	      if (clickResult === false || event.defaultPrevented === true) allowTransition = false;

	      event.preventDefault();

	      if (allowTransition) this.context.router.transitionTo(this.props.to, this.props.params, this.props.query);
	    }

	    /**
	     * Returns the value of the "href" attribute to use on the DOM element.
	     */
	  }, {
	    key: 'getHref',
	    value: function getHref() {
	      return this.context.router.makeHref(this.props.to, this.props.params, this.props.query);
	    }

	    /**
	     * Returns the value of the "class" attribute to use on the DOM element, which contains
	     * the value of the activeClassName property when this <Link> is active.
	     */
	  }, {
	    key: 'getClassName',
	    value: function getClassName() {
	      var className = this.props.className;

	      if (this.getActiveState()) className += ' ' + this.props.activeClassName;

	      return className;
	    }
	  }, {
	    key: 'getActiveState',
	    value: function getActiveState() {
	      return this.context.router.isActive(this.props.to, this.props.params, this.props.query);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var props = assign({}, this.props, {
	        href: this.getHref(),
	        className: this.getClassName(),
	        onClick: this.handleClick.bind(this)
	      });

	      if (props.activeStyle && this.getActiveState()) props.style = props.activeStyle;

	      return React.DOM.a(props, this.props.children);
	    }
	  }]);

	  return Link;
	})(React.Component);

	Link.contextTypes = {
	  router: PropTypes.router.isRequired
	};

	Link.propTypes = {
	  activeClassName: PropTypes.string.isRequired,
	  to: PropTypes.oneOfType([PropTypes.string, PropTypes.route]).isRequired,
	  params: PropTypes.object,
	  query: PropTypes.object,
	  activeStyle: PropTypes.object,
	  onClick: PropTypes.func
	};

	Link.defaultProps = {
	  activeClassName: 'active',
	  className: ''
	};

	module.exports = Link;

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Object$getOwnPropertyDescriptor = __webpack_require__(4)['default'];

	var _Object$create = __webpack_require__(19)['default'];

	var _Object$setPrototypeOf = __webpack_require__(21)['default'];

	var _get = function get(_x, _x2, _x3) {
	  var _again = true;_function: while (_again) {
	    var object = _x,
	        property = _x2,
	        receiver = _x3;_again = false;if (object === null) object = Function.prototype;var desc = _Object$getOwnPropertyDescriptor(object, property);if (desc === undefined) {
	      var parent = Object.getPrototypeOf(object);if (parent === null) {
	        return undefined;
	      } else {
	        _x = parent;_x2 = property;_x3 = receiver;_again = true;desc = parent = undefined;continue _function;
	      }
	    } else if ('value' in desc) {
	      return desc.value;
	    } else {
	      var getter = desc.get;if (getter === undefined) {
	        return undefined;
	      }return getter.call(receiver);
	    }
	  }
	};

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== 'function' && superClass !== null) {
	    throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
	  }subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var PropTypes = __webpack_require__(27);
	var RouteHandler = __webpack_require__(71);
	var Route = __webpack_require__(73);

	/**
	 * A <NotFoundRoute> is a special kind of <Route> that
	 * renders when the beginning of its parent's path matches
	 * but none of its siblings do, including any <DefaultRoute>.
	 * Only one such route may be used at any given level in the
	 * route hierarchy.
	 */

	var NotFoundRoute = (function (_Route) {
	  _inherits(NotFoundRoute, _Route);

	  function NotFoundRoute() {
	    _classCallCheck(this, NotFoundRoute);

	    _get(Object.getPrototypeOf(NotFoundRoute.prototype), 'constructor', this).apply(this, arguments);
	  }

	  // TODO: Include these in the above class definition
	  // once we can use ES7 property initializers.
	  // https://github.com/babel/babel/issues/619

	  return NotFoundRoute;
	})(Route);

	NotFoundRoute.propTypes = {
	  name: PropTypes.string,
	  path: PropTypes.falsy,
	  children: PropTypes.falsy,
	  handler: PropTypes.func.isRequired
	};

	NotFoundRoute.defaultProps = {
	  handler: RouteHandler
	};

	module.exports = NotFoundRoute;

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Object$getOwnPropertyDescriptor = __webpack_require__(4)['default'];

	var _Object$create = __webpack_require__(19)['default'];

	var _Object$setPrototypeOf = __webpack_require__(21)['default'];

	var _get = function get(_x, _x2, _x3) {
	  var _again = true;_function: while (_again) {
	    var object = _x,
	        property = _x2,
	        receiver = _x3;_again = false;if (object === null) object = Function.prototype;var desc = _Object$getOwnPropertyDescriptor(object, property);if (desc === undefined) {
	      var parent = Object.getPrototypeOf(object);if (parent === null) {
	        return undefined;
	      } else {
	        _x = parent;_x2 = property;_x3 = receiver;_again = true;desc = parent = undefined;continue _function;
	      }
	    } else if ('value' in desc) {
	      return desc.value;
	    } else {
	      var getter = desc.get;if (getter === undefined) {
	        return undefined;
	      }return getter.call(receiver);
	    }
	  }
	};

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== 'function' && superClass !== null) {
	    throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
	  }subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var PropTypes = __webpack_require__(27);
	var Route = __webpack_require__(73);

	/**
	 * A <Redirect> component is a special kind of <Route> that always
	 * redirects to another route when it matches.
	 */

	var Redirect = (function (_Route) {
	  _inherits(Redirect, _Route);

	  function Redirect() {
	    _classCallCheck(this, Redirect);

	    _get(Object.getPrototypeOf(Redirect.prototype), 'constructor', this).apply(this, arguments);
	  }

	  // TODO: Include these in the above class definition
	  // once we can use ES7 property initializers.
	  // https://github.com/babel/babel/issues/619

	  return Redirect;
	})(Route);

	Redirect.propTypes = {
	  path: PropTypes.string,
	  from: PropTypes.string, // Alias for path.
	  to: PropTypes.string,
	  handler: PropTypes.falsy
	};

	// Redirects should not have a default handler
	Redirect.defaultProps = {};

	module.exports = Redirect;

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var LocationActions = __webpack_require__(78);
	var History = __webpack_require__(79);

	var _listeners = [];
	var _isListening = false;
	var _actionType;

	function notifyChange(type) {
	  if (type === LocationActions.PUSH) History.length += 1;

	  var change = {
	    path: HashLocation.getCurrentPath(),
	    type: type
	  };

	  _listeners.forEach(function (listener) {
	    listener.call(HashLocation, change);
	  });
	}

	function ensureSlash() {
	  var path = HashLocation.getCurrentPath();

	  if (path.charAt(0) === '/') return true;

	  HashLocation.replace('/' + path);

	  return false;
	}

	function onHashChange() {
	  if (ensureSlash()) {
	    // If we don't have an _actionType then all we know is the hash
	    // changed. It was probably caused by the user clicking the Back
	    // button, but may have also been the Forward button or manual
	    // manipulation. So just guess 'pop'.
	    var curActionType = _actionType;
	    _actionType = null;
	    notifyChange(curActionType || LocationActions.POP);
	  }
	}

	/**
	 * A Location that uses `window.location.hash`.
	 */
	var HashLocation = {

	  addChangeListener: function addChangeListener(listener) {
	    _listeners.push(listener);

	    // Do this BEFORE listening for hashchange.
	    ensureSlash();

	    if (!_isListening) {
	      if (window.addEventListener) {
	        window.addEventListener('hashchange', onHashChange, false);
	      } else {
	        window.attachEvent('onhashchange', onHashChange);
	      }

	      _isListening = true;
	    }
	  },

	  removeChangeListener: function removeChangeListener(listener) {
	    _listeners = _listeners.filter(function (l) {
	      return l !== listener;
	    });

	    if (_listeners.length === 0) {
	      if (window.removeEventListener) {
	        window.removeEventListener('hashchange', onHashChange, false);
	      } else {
	        window.removeEvent('onhashchange', onHashChange);
	      }

	      _isListening = false;
	    }
	  },

	  push: function push(path) {
	    _actionType = LocationActions.PUSH;
	    window.location.hash = path;
	  },

	  replace: function replace(path) {
	    _actionType = LocationActions.REPLACE;
	    window.location.replace(window.location.pathname + window.location.search + '#' + path);
	  },

	  pop: function pop() {
	    _actionType = LocationActions.POP;
	    History.back();
	  },

	  getCurrentPath: function getCurrentPath() {
	    return decodeURI(
	    // We can't use window.location.hash here because it's not
	    // consistent across browsers - Firefox will pre-decode it!
	    window.location.href.split('#')[1] || '');
	  },

	  toString: function toString() {
	    return '<HashLocation>';
	  }

	};

	module.exports = HashLocation;

/***/ },
/* 78 */
/***/ function(module, exports) {

	/**
	 * Actions that modify the URL.
	 */
	'use strict';

	var LocationActions = {

	  /**
	   * Indicates a new location is being pushed to the history stack.
	   */
	  PUSH: 'push',

	  /**
	   * Indicates the current location should be replaced.
	   */
	  REPLACE: 'replace',

	  /**
	   * Indicates the most recent entry should be removed from the history stack.
	   */
	  POP: 'pop'

	};

	module.exports = LocationActions;

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var invariant = __webpack_require__(32);
	var canUseDOM = __webpack_require__(80);

	var History = {

	  /**
	   * The current number of entries in the history.
	   *
	   * Note: This property is read-only.
	   */
	  length: 1,

	  /**
	   * Sends the browser back one entry in the history.
	   */
	  back: function back() {
	    invariant(canUseDOM, 'Cannot use History.back without a DOM');

	    // Do this first so that History.length will
	    // be accurate in location change listeners.
	    History.length -= 1;

	    window.history.back();
	  }

	};

	module.exports = History;

/***/ },
/* 80 */
/***/ function(module, exports) {

	'use strict';

	var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

	module.exports = canUseDOM;

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var LocationActions = __webpack_require__(78);
	var History = __webpack_require__(79);

	var _listeners = [];
	var _isListening = false;

	function notifyChange(type) {
	  var change = {
	    path: HistoryLocation.getCurrentPath(),
	    type: type
	  };

	  _listeners.forEach(function (listener) {
	    listener.call(HistoryLocation, change);
	  });
	}

	function onPopState(event) {
	  if (event.state === undefined) return; // Ignore extraneous popstate events in WebKit.

	  notifyChange(LocationActions.POP);
	}

	/**
	 * A Location that uses HTML5 history.
	 */
	var HistoryLocation = {

	  addChangeListener: function addChangeListener(listener) {
	    _listeners.push(listener);

	    if (!_isListening) {
	      if (window.addEventListener) {
	        window.addEventListener('popstate', onPopState, false);
	      } else {
	        window.attachEvent('onpopstate', onPopState);
	      }

	      _isListening = true;
	    }
	  },

	  removeChangeListener: function removeChangeListener(listener) {
	    _listeners = _listeners.filter(function (l) {
	      return l !== listener;
	    });

	    if (_listeners.length === 0) {
	      if (window.addEventListener) {
	        window.removeEventListener('popstate', onPopState, false);
	      } else {
	        window.removeEvent('onpopstate', onPopState);
	      }

	      _isListening = false;
	    }
	  },

	  push: function push(path) {
	    window.history.pushState({ path: path }, '', path);
	    History.length += 1;
	    notifyChange(LocationActions.PUSH);
	  },

	  replace: function replace(path) {
	    window.history.replaceState({ path: path }, '', path);
	    notifyChange(LocationActions.REPLACE);
	  },

	  pop: History.back,

	  getCurrentPath: function getCurrentPath() {
	    return decodeURI(window.location.pathname + window.location.search);
	  },

	  toString: function toString() {
	    return '<HistoryLocation>';
	  }

	};

	module.exports = HistoryLocation;

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var HistoryLocation = __webpack_require__(81);
	var History = __webpack_require__(79);

	/**
	 * A Location that uses full page refreshes. This is used as
	 * the fallback for HistoryLocation in browsers that do not
	 * support the HTML5 history API.
	 */
	var RefreshLocation = {

	  push: function push(path) {
	    window.location = path;
	  },

	  replace: function replace(path) {
	    window.location.replace(path);
	  },

	  pop: History.back,

	  getCurrentPath: HistoryLocation.getCurrentPath,

	  toString: function toString() {
	    return '<RefreshLocation>';
	  }

	};

	module.exports = RefreshLocation;

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Object$defineProperty = __webpack_require__(30)['default'];

	var _createClass = (function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;_Object$defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	})();

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	var invariant = __webpack_require__(32);

	function throwCannotModify() {
	  invariant(false, 'You cannot modify a static location');
	}

	/**
	 * A location that only ever contains a single path. Useful in
	 * stateless environments like servers where there is no path history,
	 * only the path that was used in the request.
	 */

	var StaticLocation = (function () {
	  function StaticLocation(path) {
	    _classCallCheck(this, StaticLocation);

	    this.path = path;
	  }

	  // TODO: Include these in the above class definition
	  // once we can use ES7 property initializers.
	  // https://github.com/babel/babel/issues/619

	  _createClass(StaticLocation, [{
	    key: 'getCurrentPath',
	    value: function getCurrentPath() {
	      return this.path;
	    }
	  }, {
	    key: 'toString',
	    value: function toString() {
	      return '<StaticLocation path="' + this.path + '">';
	    }
	  }]);

	  return StaticLocation;
	})();

	StaticLocation.prototype.push = throwCannotModify;
	StaticLocation.prototype.replace = throwCannotModify;
	StaticLocation.prototype.pop = throwCannotModify;

	module.exports = StaticLocation;

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Object$defineProperty = __webpack_require__(30)['default'];

	var _createClass = (function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;_Object$defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	})();

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	var invariant = __webpack_require__(32);
	var LocationActions = __webpack_require__(78);
	var History = __webpack_require__(79);

	/**
	 * A location that is convenient for testing and does not require a DOM.
	 */

	var TestLocation = (function () {
	  function TestLocation(history) {
	    _classCallCheck(this, TestLocation);

	    this.history = history || [];
	    this.listeners = [];
	    this.needsDOM = false;
	    this._updateHistoryLength();
	  }

	  _createClass(TestLocation, [{
	    key: '_updateHistoryLength',
	    value: function _updateHistoryLength() {
	      History.length = this.history.length;
	    }
	  }, {
	    key: '_notifyChange',
	    value: function _notifyChange(type) {
	      var change = {
	        path: this.getCurrentPath(),
	        type: type
	      };

	      for (var i = 0, len = this.listeners.length; i < len; ++i) this.listeners[i].call(this, change);
	    }
	  }, {
	    key: 'addChangeListener',
	    value: function addChangeListener(listener) {
	      this.listeners.push(listener);
	    }
	  }, {
	    key: 'removeChangeListener',
	    value: function removeChangeListener(listener) {
	      this.listeners = this.listeners.filter(function (l) {
	        return l !== listener;
	      });
	    }
	  }, {
	    key: 'push',
	    value: function push(path) {
	      this.history.push(path);
	      this._updateHistoryLength();
	      this._notifyChange(LocationActions.PUSH);
	    }
	  }, {
	    key: 'replace',
	    value: function replace(path) {
	      invariant(this.history.length, 'You cannot replace the current path with no history');

	      this.history[this.history.length - 1] = path;

	      this._notifyChange(LocationActions.REPLACE);
	    }
	  }, {
	    key: 'pop',
	    value: function pop() {
	      this.history.pop();
	      this._updateHistoryLength();
	      this._notifyChange(LocationActions.POP);
	    }
	  }, {
	    key: 'getCurrentPath',
	    value: function getCurrentPath() {
	      return this.history[this.history.length - 1];
	    }
	  }, {
	    key: 'toString',
	    value: function toString() {
	      return '<TestLocation>';
	    }
	  }]);

	  return TestLocation;
	})();

	module.exports = TestLocation;

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var LocationActions = __webpack_require__(78);

	/**
	 * A scroll behavior that attempts to imitate the default behavior
	 * of modern browsers.
	 */
	var ImitateBrowserBehavior = {

	  updateScrollPosition: function updateScrollPosition(position, actionType) {
	    switch (actionType) {
	      case LocationActions.PUSH:
	      case LocationActions.REPLACE:
	        window.scrollTo(0, 0);
	        break;
	      case LocationActions.POP:
	        if (position) {
	          window.scrollTo(position.x, position.y);
	        } else {
	          window.scrollTo(0, 0);
	        }
	        break;
	    }
	  }

	};

	module.exports = ImitateBrowserBehavior;

/***/ },
/* 86 */
/***/ function(module, exports) {

	/**
	 * A scroll behavior that always scrolls to the top of the page
	 * after a transition.
	 */
	"use strict";

	var ScrollToTopBehavior = {

	  updateScrollPosition: function updateScrollPosition() {
	    window.scrollTo(0, 0);
	  }

	};

	module.exports = ScrollToTopBehavior;

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var PropTypes = __webpack_require__(27);

	/**
	 * A mixin for components that modify the URL.
	 *
	 * Example:
	 *
	 *   var MyLink = React.createClass({
	 *     mixins: [ Router.Navigation ],
	 *     handleClick(event) {
	 *       event.preventDefault();
	 *       this.transitionTo('aRoute', { the: 'params' }, { the: 'query' });
	 *     },
	 *     render() {
	 *       return (
	 *         <a onClick={this.handleClick}>Click me!</a>
	 *       );
	 *     }
	 *   });
	 */
	var Navigation = {

	  contextTypes: {
	    router: PropTypes.router.isRequired
	  },

	  /**
	   * Returns an absolute URL path created from the given route
	   * name, URL parameters, and query values.
	   */
	  makePath: function makePath(to, params, query) {
	    return this.context.router.makePath(to, params, query);
	  },

	  /**
	   * Returns a string that may safely be used as the href of a
	   * link to the route with the given name.
	   */
	  makeHref: function makeHref(to, params, query) {
	    return this.context.router.makeHref(to, params, query);
	  },

	  /**
	   * Transitions to the URL specified in the arguments by pushing
	   * a new URL onto the history stack.
	   */
	  transitionTo: function transitionTo(to, params, query) {
	    this.context.router.transitionTo(to, params, query);
	  },

	  /**
	   * Transitions to the URL specified in the arguments by replacing
	   * the current URL in the history stack.
	   */
	  replaceWith: function replaceWith(to, params, query) {
	    this.context.router.replaceWith(to, params, query);
	  },

	  /**
	   * Transitions to the previous URL.
	   */
	  goBack: function goBack() {
	    return this.context.router.goBack();
	  }

	};

	module.exports = Navigation;

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var PropTypes = __webpack_require__(27);

	/**
	 * A mixin for components that need to know the path, routes, URL
	 * params and query that are currently active.
	 *
	 * Example:
	 *
	 *   var AboutLink = React.createClass({
	 *     mixins: [ Router.State ],
	 *     render() {
	 *       var className = this.props.className;
	 *
	 *       if (this.isActive('about'))
	 *         className += ' is-active';
	 *
	 *       return React.DOM.a({ className: className }, this.props.children);
	 *     }
	 *   });
	 */
	var State = {

	  contextTypes: {
	    router: PropTypes.router.isRequired
	  },

	  /**
	   * Returns the current URL path.
	   */
	  getPath: function getPath() {
	    return this.context.router.getCurrentPath();
	  },

	  /**
	   * Returns the current URL path without the query string.
	   */
	  getPathname: function getPathname() {
	    return this.context.router.getCurrentPathname();
	  },

	  /**
	   * Returns an object of the URL params that are currently active.
	   */
	  getParams: function getParams() {
	    return this.context.router.getCurrentParams();
	  },

	  /**
	   * Returns an object of the query params that are currently active.
	   */
	  getQuery: function getQuery() {
	    return this.context.router.getCurrentQuery();
	  },

	  /**
	   * Returns an array of the routes that are currently active.
	   */
	  getRoutes: function getRoutes() {
	    return this.context.router.getCurrentRoutes();
	  },

	  /**
	   * A helper method to determine if a given route, params, and query
	   * are active.
	   */
	  isActive: function isActive(to, params, query) {
	    return this.context.router.isActive(to, params, query);
	  }

	};

	module.exports = State;

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	/* jshint -W084 */
	'use strict';

	var React = __webpack_require__(1);
	var assign = __webpack_require__(28);
	var warning = __webpack_require__(34);
	var DefaultRoute = __webpack_require__(3);
	var NotFoundRoute = __webpack_require__(75);
	var Redirect = __webpack_require__(76);
	var Route = __webpack_require__(29);

	function checkPropTypes(componentName, propTypes, props) {
	  componentName = componentName || 'UnknownComponent';

	  for (var propName in propTypes) {
	    if (propTypes.hasOwnProperty(propName)) {
	      var error = propTypes[propName](props, propName, componentName);

	      if (error instanceof Error) warning(false, error.message);
	    }
	  }
	}

	function createRouteOptions(props) {
	  var options = assign({}, props);
	  var handler = options.handler;

	  if (handler) {
	    options.onEnter = handler.willTransitionTo;
	    options.onLeave = handler.willTransitionFrom;
	  }

	  return options;
	}

	function createRouteFromReactElement(element) {
	  if (!React.isValidElement(element)) return;

	  var type = element.type;
	  var props = assign({}, type.defaultProps, element.props);

	  if (type.propTypes) checkPropTypes(type.displayName, type.propTypes, props);

	  if (type === DefaultRoute) return Route.createDefaultRoute(createRouteOptions(props));

	  if (type === NotFoundRoute) return Route.createNotFoundRoute(createRouteOptions(props));

	  if (type === Redirect) return Route.createRedirect(createRouteOptions(props));

	  return Route.createRoute(createRouteOptions(props), function () {
	    if (props.children) createRoutesFromReactChildren(props.children);
	  });
	}

	/**
	 * Creates and returns an array of routes created from the given
	 * ReactChildren, all of which should be one of <Route>, <DefaultRoute>,
	 * <NotFoundRoute>, or <Redirect>, e.g.:
	 *
	 *   var { createRoutesFromReactChildren, Route, Redirect } = require('react-router');
	 *
	 *   var routes = createRoutesFromReactChildren(
	 *     <Route path="/" handler={App}>
	 *       <Route name="user" path="/user/:userId" handler={User}>
	 *         <Route name="task" path="tasks/:taskId" handler={Task}/>
	 *         <Redirect from="todos/:taskId" to="task"/>
	 *       </Route>
	 *     </Route>
	 *   );
	 */
	function createRoutesFromReactChildren(children) {
	  var routes = [];

	  React.Children.forEach(children, function (child) {
	    if (child = createRouteFromReactElement(child)) routes.push(child);
	  });

	  return routes;
	}

	module.exports = createRoutesFromReactChildren;

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/* jshint -W058 */
	'use strict';

	var React = __webpack_require__(1);
	var warning = __webpack_require__(34);
	var invariant = __webpack_require__(32);
	var canUseDOM = __webpack_require__(80);
	var LocationActions = __webpack_require__(78);
	var ImitateBrowserBehavior = __webpack_require__(85);
	var HashLocation = __webpack_require__(77);
	var HistoryLocation = __webpack_require__(81);
	var RefreshLocation = __webpack_require__(82);
	var StaticLocation = __webpack_require__(83);
	var ScrollHistory = __webpack_require__(91);
	var createRoutesFromReactChildren = __webpack_require__(89);
	var isReactChildren = __webpack_require__(93);
	var Transition = __webpack_require__(94);
	var PropTypes = __webpack_require__(27);
	var Redirect = __webpack_require__(96);
	var History = __webpack_require__(79);
	var Cancellation = __webpack_require__(95);
	var Match = __webpack_require__(97);
	var Route = __webpack_require__(29);
	var supportsHistory = __webpack_require__(98);
	var PathUtils = __webpack_require__(35);

	/**
	 * The default location for new routers.
	 */
	var DEFAULT_LOCATION = canUseDOM ? HashLocation : '/';

	/**
	 * The default scroll behavior for new routers.
	 */
	var DEFAULT_SCROLL_BEHAVIOR = canUseDOM ? ImitateBrowserBehavior : null;

	function hasProperties(object, properties) {
	  for (var propertyName in properties) if (properties.hasOwnProperty(propertyName) && object[propertyName] !== properties[propertyName]) return false;

	  return true;
	}

	function hasMatch(routes, route, prevParams, nextParams, prevQuery, nextQuery) {
	  return routes.some(function (r) {
	    if (r !== route) return false;

	    var paramNames = route.paramNames;
	    var paramName;

	    // Ensure that all params the route cares about did not change.
	    for (var i = 0, len = paramNames.length; i < len; ++i) {
	      paramName = paramNames[i];

	      if (nextParams[paramName] !== prevParams[paramName]) return false;
	    }

	    // Ensure the query hasn't changed.
	    return hasProperties(prevQuery, nextQuery) && hasProperties(nextQuery, prevQuery);
	  });
	}

	function addRoutesToNamedRoutes(routes, namedRoutes) {
	  var route;
	  for (var i = 0, len = routes.length; i < len; ++i) {
	    route = routes[i];

	    if (route.name) {
	      invariant(namedRoutes[route.name] == null, 'You may not have more than one route named "%s"', route.name);

	      namedRoutes[route.name] = route;
	    }

	    if (route.childRoutes) addRoutesToNamedRoutes(route.childRoutes, namedRoutes);
	  }
	}

	function routeIsActive(activeRoutes, routeName) {
	  return activeRoutes.some(function (route) {
	    return route.name === routeName;
	  });
	}

	function paramsAreActive(activeParams, params) {
	  for (var property in params) if (String(activeParams[property]) !== String(params[property])) return false;

	  return true;
	}

	function queryIsActive(activeQuery, query) {
	  for (var property in query) if (String(activeQuery[property]) !== String(query[property])) return false;

	  return true;
	}

	/**
	 * Creates and returns a new router using the given options. A router
	 * is a ReactComponent class that knows how to react to changes in the
	 * URL and keep the contents of the page in sync.
	 *
	 * Options may be any of the following:
	 *
	 * - routes           (required) The route config
	 * - location         The location to use. Defaults to HashLocation when
	 *                    the DOM is available, "/" otherwise
	 * - scrollBehavior   The scroll behavior to use. Defaults to ImitateBrowserBehavior
	 *                    when the DOM is available, null otherwise
	 * - onError          A function that is used to handle errors
	 * - onAbort          A function that is used to handle aborted transitions
	 *
	 * When rendering in a server-side environment, the location should simply
	 * be the URL path that was used in the request, including the query string.
	 */
	function createRouter(options) {
	  options = options || {};

	  if (isReactChildren(options)) options = { routes: options };

	  var mountedComponents = [];
	  var location = options.location || DEFAULT_LOCATION;
	  var scrollBehavior = options.scrollBehavior || DEFAULT_SCROLL_BEHAVIOR;
	  var state = {};
	  var nextState = {};
	  var pendingTransition = null;
	  var dispatchHandler = null;

	  if (typeof location === 'string') location = new StaticLocation(location);

	  if (location instanceof StaticLocation) {
	    warning(!canUseDOM || process.env.NODE_ENV === 'test', 'You should not use a static location in a DOM environment because ' + 'the router will not be kept in sync with the current URL');
	  } else {
	    invariant(canUseDOM || location.needsDOM === false, 'You cannot use %s without a DOM', location);
	  }

	  // Automatically fall back to full page refreshes in
	  // browsers that don't support the HTML history API.
	  if (location === HistoryLocation && !supportsHistory()) location = RefreshLocation;

	  var Router = React.createClass({

	    displayName: 'Router',

	    statics: {

	      isRunning: false,

	      cancelPendingTransition: function cancelPendingTransition() {
	        if (pendingTransition) {
	          pendingTransition.cancel();
	          pendingTransition = null;
	        }
	      },

	      clearAllRoutes: function clearAllRoutes() {
	        Router.cancelPendingTransition();
	        Router.namedRoutes = {};
	        Router.routes = [];
	      },

	      /**
	       * Adds routes to this router from the given children object (see ReactChildren).
	       */
	      addRoutes: function addRoutes(routes) {
	        if (isReactChildren(routes)) routes = createRoutesFromReactChildren(routes);

	        addRoutesToNamedRoutes(routes, Router.namedRoutes);

	        Router.routes.push.apply(Router.routes, routes);
	      },

	      /**
	       * Replaces routes of this router from the given children object (see ReactChildren).
	       */
	      replaceRoutes: function replaceRoutes(routes) {
	        Router.clearAllRoutes();
	        Router.addRoutes(routes);
	        Router.refresh();
	      },

	      /**
	       * Performs a match of the given path against this router and returns an object
	       * with the { routes, params, pathname, query } that match. Returns null if no
	       * match can be made.
	       */
	      match: function match(path) {
	        return Match.findMatch(Router.routes, path);
	      },

	      /**
	       * Returns an absolute URL path created from the given route
	       * name, URL parameters, and query.
	       */
	      makePath: function makePath(to, params, query) {
	        var path;
	        if (PathUtils.isAbsolute(to)) {
	          path = to;
	        } else {
	          var route = to instanceof Route ? to : Router.namedRoutes[to];

	          invariant(route instanceof Route, 'Cannot find a route named "%s"', to);

	          path = route.path;
	        }

	        return PathUtils.withQuery(PathUtils.injectParams(path, params), query);
	      },

	      /**
	       * Returns a string that may safely be used as the href of a link
	       * to the route with the given name, URL parameters, and query.
	       */
	      makeHref: function makeHref(to, params, query) {
	        var path = Router.makePath(to, params, query);
	        return location === HashLocation ? '#' + path : path;
	      },

	      /**
	       * Transitions to the URL specified in the arguments by pushing
	       * a new URL onto the history stack.
	       */
	      transitionTo: function transitionTo(to, params, query) {
	        var path = Router.makePath(to, params, query);

	        if (pendingTransition) {
	          // Replace so pending location does not stay in history.
	          location.replace(path);
	        } else {
	          location.push(path);
	        }
	      },

	      /**
	       * Transitions to the URL specified in the arguments by replacing
	       * the current URL in the history stack.
	       */
	      replaceWith: function replaceWith(to, params, query) {
	        location.replace(Router.makePath(to, params, query));
	      },

	      /**
	       * Transitions to the previous URL if one is available. Returns true if the
	       * router was able to go back, false otherwise.
	       *
	       * Note: The router only tracks history entries in your application, not the
	       * current browser session, so you can safely call this function without guarding
	       * against sending the user back to some other site. However, when using
	       * RefreshLocation (which is the fallback for HistoryLocation in browsers that
	       * don't support HTML5 history) this method will *always* send the client back
	       * because we cannot reliably track history length.
	       */
	      goBack: function goBack() {
	        if (History.length > 1 || location === RefreshLocation) {
	          location.pop();
	          return true;
	        }

	        warning(false, 'goBack() was ignored because there is no router history');

	        return false;
	      },

	      handleAbort: options.onAbort || function (abortReason) {
	        if (location instanceof StaticLocation) throw new Error('Unhandled aborted transition! Reason: ' + abortReason);

	        if (abortReason instanceof Cancellation) {
	          return;
	        } else if (abortReason instanceof Redirect) {
	          location.replace(Router.makePath(abortReason.to, abortReason.params, abortReason.query));
	        } else {
	          location.pop();
	        }
	      },

	      handleError: options.onError || function (error) {
	        // Throw so we don't silently swallow async errors.
	        throw error; // This error probably originated in a transition hook.
	      },

	      handleLocationChange: function handleLocationChange(change) {
	        Router.dispatch(change.path, change.type);
	      },

	      /**
	       * Performs a transition to the given path and calls callback(error, abortReason)
	       * when the transition is finished. If both arguments are null the router's state
	       * was updated. Otherwise the transition did not complete.
	       *
	       * In a transition, a router first determines which routes are involved by beginning
	       * with the current route, up the route tree to the first parent route that is shared
	       * with the destination route, and back down the tree to the destination route. The
	       * willTransitionFrom hook is invoked on all route handlers we're transitioning away
	       * from, in reverse nesting order. Likewise, the willTransitionTo hook is invoked on
	       * all route handlers we're transitioning to.
	       *
	       * Both willTransitionFrom and willTransitionTo hooks may either abort or redirect the
	       * transition. To resolve asynchronously, they may use the callback argument. If no
	       * hooks wait, the transition is fully synchronous.
	       */
	      dispatch: function dispatch(path, action) {
	        Router.cancelPendingTransition();

	        var prevPath = state.path;
	        var isRefreshing = action == null;

	        if (prevPath === path && !isRefreshing) return; // Nothing to do!

	        // Record the scroll position as early as possible to
	        // get it before browsers try update it automatically.
	        if (prevPath && action === LocationActions.PUSH) Router.recordScrollPosition(prevPath);

	        var match = Router.match(path);

	        warning(match != null, 'No route matches path "%s". Make sure you have <Route path="%s"> somewhere in your routes', path, path);

	        if (match == null) match = {};

	        var prevRoutes = state.routes || [];
	        var prevParams = state.params || {};
	        var prevQuery = state.query || {};

	        var nextRoutes = match.routes || [];
	        var nextParams = match.params || {};
	        var nextQuery = match.query || {};

	        var fromRoutes, toRoutes;
	        if (prevRoutes.length) {
	          fromRoutes = prevRoutes.filter(function (route) {
	            return !hasMatch(nextRoutes, route, prevParams, nextParams, prevQuery, nextQuery);
	          });

	          toRoutes = nextRoutes.filter(function (route) {
	            return !hasMatch(prevRoutes, route, prevParams, nextParams, prevQuery, nextQuery);
	          });
	        } else {
	          fromRoutes = [];
	          toRoutes = nextRoutes;
	        }

	        var transition = new Transition(path, Router.replaceWith.bind(Router, path));
	        pendingTransition = transition;

	        var fromComponents = mountedComponents.slice(prevRoutes.length - fromRoutes.length);

	        Transition.from(transition, fromRoutes, fromComponents, function (error) {
	          if (error || transition.abortReason) return dispatchHandler.call(Router, error, transition); // No need to continue.

	          Transition.to(transition, toRoutes, nextParams, nextQuery, function (error) {
	            dispatchHandler.call(Router, error, transition, {
	              path: path,
	              action: action,
	              pathname: match.pathname,
	              routes: nextRoutes,
	              params: nextParams,
	              query: nextQuery
	            });
	          });
	        });
	      },

	      /**
	       * Starts this router and calls callback(router, state) when the route changes.
	       *
	       * If the router's location is static (i.e. a URL path in a server environment)
	       * the callback is called only once. Otherwise, the location should be one of the
	       * Router.*Location objects (e.g. Router.HashLocation or Router.HistoryLocation).
	       */
	      run: function run(callback) {
	        invariant(!Router.isRunning, 'Router is already running');

	        dispatchHandler = function (error, transition, newState) {
	          if (error) Router.handleError(error);

	          if (pendingTransition !== transition) return;

	          pendingTransition = null;

	          if (transition.abortReason) {
	            Router.handleAbort(transition.abortReason);
	          } else {
	            callback.call(Router, Router, nextState = newState);
	          }
	        };

	        if (!(location instanceof StaticLocation)) {
	          if (location.addChangeListener) location.addChangeListener(Router.handleLocationChange);

	          Router.isRunning = true;
	        }

	        // Bootstrap using the current path.
	        Router.refresh();
	      },

	      refresh: function refresh() {
	        Router.dispatch(location.getCurrentPath(), null);
	      },

	      stop: function stop() {
	        Router.cancelPendingTransition();

	        if (location.removeChangeListener) location.removeChangeListener(Router.handleLocationChange);

	        Router.isRunning = false;
	      },

	      getLocation: function getLocation() {
	        return location;
	      },

	      getScrollBehavior: function getScrollBehavior() {
	        return scrollBehavior;
	      },

	      getRouteAtDepth: function getRouteAtDepth(routeDepth) {
	        var routes = state.routes;
	        return routes && routes[routeDepth];
	      },

	      setRouteComponentAtDepth: function setRouteComponentAtDepth(routeDepth, component) {
	        mountedComponents[routeDepth] = component;
	      },

	      /**
	       * Returns the current URL path + query string.
	       */
	      getCurrentPath: function getCurrentPath() {
	        return state.path;
	      },

	      /**
	       * Returns the current URL path without the query string.
	       */
	      getCurrentPathname: function getCurrentPathname() {
	        return state.pathname;
	      },

	      /**
	       * Returns an object of the currently active URL parameters.
	       */
	      getCurrentParams: function getCurrentParams() {
	        return state.params;
	      },

	      /**
	       * Returns an object of the currently active query parameters.
	       */
	      getCurrentQuery: function getCurrentQuery() {
	        return state.query;
	      },

	      /**
	       * Returns an array of the currently active routes.
	       */
	      getCurrentRoutes: function getCurrentRoutes() {
	        return state.routes;
	      },

	      /**
	       * Returns true if the given route, params, and query are active.
	       */
	      isActive: function isActive(to, params, query) {
	        if (PathUtils.isAbsolute(to)) return to === state.path;

	        return routeIsActive(state.routes, to) && paramsAreActive(state.params, params) && (query == null || queryIsActive(state.query, query));
	      }

	    },

	    mixins: [ScrollHistory],

	    propTypes: {
	      children: PropTypes.falsy
	    },

	    childContextTypes: {
	      routeDepth: PropTypes.number.isRequired,
	      router: PropTypes.router.isRequired
	    },

	    getChildContext: function getChildContext() {
	      return {
	        routeDepth: 1,
	        router: Router
	      };
	    },

	    getInitialState: function getInitialState() {
	      return state = nextState;
	    },

	    componentWillReceiveProps: function componentWillReceiveProps() {
	      this.setState(state = nextState);
	    },

	    componentWillUnmount: function componentWillUnmount() {
	      Router.stop();
	    },

	    render: function render() {
	      var route = Router.getRouteAtDepth(0);
	      return route ? React.createElement(route.handler, this.props) : null;
	    }

	  });

	  Router.clearAllRoutes();

	  if (options.routes) Router.addRoutes(options.routes);

	  return Router;
	}

	module.exports = createRouter;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(33)))

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var invariant = __webpack_require__(32);
	var canUseDOM = __webpack_require__(80);
	var getWindowScrollPosition = __webpack_require__(92);

	function shouldUpdateScroll(state, prevState) {
	  if (!prevState) return true;

	  // Don't update scroll position when only the query has changed.
	  if (state.pathname === prevState.pathname) return false;

	  var routes = state.routes;
	  var prevRoutes = prevState.routes;

	  var sharedAncestorRoutes = routes.filter(function (route) {
	    return prevRoutes.indexOf(route) !== -1;
	  });

	  return !sharedAncestorRoutes.some(function (route) {
	    return route.ignoreScrollBehavior;
	  });
	}

	/**
	 * Provides the router with the ability to manage window scroll position
	 * according to its scroll behavior.
	 */
	var ScrollHistory = {

	  statics: {

	    /**
	     * Records curent scroll position as the last known position for the given URL path.
	     */
	    recordScrollPosition: function recordScrollPosition(path) {
	      if (!this.scrollHistory) this.scrollHistory = {};

	      this.scrollHistory[path] = getWindowScrollPosition();
	    },

	    /**
	     * Returns the last known scroll position for the given URL path.
	     */
	    getScrollPosition: function getScrollPosition(path) {
	      if (!this.scrollHistory) this.scrollHistory = {};

	      return this.scrollHistory[path] || null;
	    }

	  },

	  componentWillMount: function componentWillMount() {
	    invariant(this.constructor.getScrollBehavior() == null || canUseDOM, 'Cannot use scroll behavior without a DOM');
	  },

	  componentDidMount: function componentDidMount() {
	    this._updateScroll();
	  },

	  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
	    this._updateScroll(prevState);
	  },

	  _updateScroll: function _updateScroll(prevState) {
	    if (!shouldUpdateScroll(this.state, prevState)) return;

	    var scrollBehavior = this.constructor.getScrollBehavior();

	    if (scrollBehavior) scrollBehavior.updateScrollPosition(this.constructor.getScrollPosition(this.state.path), this.state.action);
	  }

	};

	module.exports = ScrollHistory;

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var invariant = __webpack_require__(32);
	var canUseDOM = __webpack_require__(80);

	/**
	 * Returns the current scroll position of the window as { x, y }.
	 */
	function getWindowScrollPosition() {
	  invariant(canUseDOM, 'Cannot get current scroll position without a DOM');

	  return {
	    x: window.pageXOffset || document.documentElement.scrollLeft,
	    y: window.pageYOffset || document.documentElement.scrollTop
	  };
	}

	module.exports = getWindowScrollPosition;

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);

	function isValidChild(object) {
	  return object == null || React.isValidElement(object);
	}

	function isReactChildren(object) {
	  return isValidChild(object) || Array.isArray(object) && object.every(isValidChild);
	}

	module.exports = isReactChildren;

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	/* jshint -W058 */

	'use strict';

	var Cancellation = __webpack_require__(95);
	var Redirect = __webpack_require__(96);

	/**
	 * Encapsulates a transition to a given path.
	 *
	 * The willTransitionTo and willTransitionFrom handlers receive
	 * an instance of this class as their first argument.
	 */
	function Transition(path, retry) {
	  this.path = path;
	  this.abortReason = null;
	  // TODO: Change this to router.retryTransition(transition)
	  this.retry = retry.bind(this);
	}

	Transition.prototype.abort = function (reason) {
	  if (this.abortReason == null) this.abortReason = reason || 'ABORT';
	};

	Transition.prototype.redirect = function (to, params, query) {
	  this.abort(new Redirect(to, params, query));
	};

	Transition.prototype.cancel = function () {
	  this.abort(new Cancellation());
	};

	Transition.from = function (transition, routes, components, callback) {
	  routes.reduce(function (callback, route, index) {
	    return function (error) {
	      if (error || transition.abortReason) {
	        callback(error);
	      } else if (route.onLeave) {
	        try {
	          route.onLeave(transition, components[index], callback);

	          // If there is no callback in the argument list, call it automatically.
	          if (route.onLeave.length < 3) callback();
	        } catch (e) {
	          callback(e);
	        }
	      } else {
	        callback();
	      }
	    };
	  }, callback)();
	};

	Transition.to = function (transition, routes, params, query, callback) {
	  routes.reduceRight(function (callback, route) {
	    return function (error) {
	      if (error || transition.abortReason) {
	        callback(error);
	      } else if (route.onEnter) {
	        try {
	          route.onEnter(transition, params, query, callback);

	          // If there is no callback in the argument list, call it automatically.
	          if (route.onEnter.length < 4) callback();
	        } catch (e) {
	          callback(e);
	        }
	      } else {
	        callback();
	      }
	    };
	  }, callback)();
	};

	module.exports = Transition;

/***/ },
/* 95 */
/***/ function(module, exports) {

	/**
	 * Represents a cancellation caused by navigating away
	 * before the previous transition has fully resolved.
	 */
	"use strict";

	function Cancellation() {}

	module.exports = Cancellation;

/***/ },
/* 96 */
/***/ function(module, exports) {

	/**
	 * Encapsulates a redirect to the given route.
	 */
	"use strict";

	function Redirect(to, params, query) {
	  this.to = to;
	  this.params = params;
	  this.query = query;
	}

	module.exports = Redirect;

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	/* jshint -W084 */
	'use strict';

	var _Object$defineProperty = __webpack_require__(30)['default'];

	var _createClass = (function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;_Object$defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	})();

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	var PathUtils = __webpack_require__(35);

	function deepSearch(route, pathname, query) {
	  // Check the subtree first to find the most deeply-nested match.
	  var childRoutes = route.childRoutes;
	  if (childRoutes) {
	    var match, childRoute;
	    for (var i = 0, len = childRoutes.length; i < len; ++i) {
	      childRoute = childRoutes[i];

	      if (childRoute.isDefault || childRoute.isNotFound) continue; // Check these in order later.

	      if (match = deepSearch(childRoute, pathname, query)) {
	        // A route in the subtree matched! Add this route and we're done.
	        match.routes.unshift(route);
	        return match;
	      }
	    }
	  }

	  // No child routes matched; try the default route.
	  var defaultRoute = route.defaultRoute;
	  if (defaultRoute && (params = PathUtils.extractParams(defaultRoute.path, pathname))) return new Match(pathname, params, query, [route, defaultRoute]);

	  // Does the "not found" route match?
	  var notFoundRoute = route.notFoundRoute;
	  if (notFoundRoute && (params = PathUtils.extractParams(notFoundRoute.path, pathname))) return new Match(pathname, params, query, [route, notFoundRoute]);

	  // Last attempt: check this route.
	  var params = PathUtils.extractParams(route.path, pathname);
	  if (params) return new Match(pathname, params, query, [route]);

	  return null;
	}

	var Match = (function () {
	  _createClass(Match, null, [{
	    key: 'findMatch',

	    /**
	     * Attempts to match depth-first a route in the given route's
	     * subtree against the given path and returns the match if it
	     * succeeds, null if no match can be made.
	     */
	    value: function findMatch(routes, path) {
	      var pathname = PathUtils.withoutQuery(path);
	      var query = PathUtils.extractQuery(path);
	      var match = null;

	      for (var i = 0, len = routes.length; match == null && i < len; ++i) match = deepSearch(routes[i], pathname, query);

	      return match;
	    }
	  }]);

	  function Match(pathname, params, query, routes) {
	    _classCallCheck(this, Match);

	    this.pathname = pathname;
	    this.params = params;
	    this.query = query;
	    this.routes = routes;
	  }

	  return Match;
	})();

	module.exports = Match;

/***/ },
/* 98 */
/***/ function(module, exports) {

	'use strict';

	function supportsHistory() {
	  /*! taken from modernizr
	   * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
	   * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
	   * changed to avoid false negatives for Windows Phones: https://github.com/rackt/react-router/issues/586
	   */
	  var ua = navigator.userAgent;
	  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) {
	    return false;
	  }
	  return window.history && 'pushState' in window.history;
	}

	module.exports = supportsHistory;

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var createRouter = __webpack_require__(90);

	/**
	 * A high-level convenience method that creates, configures, and
	 * runs a router in one shot. The method signature is:
	 *
	 *   Router.run(routes[, location ], callback);
	 *
	 * Using `window.location.hash` to manage the URL, you could do:
	 *
	 *   Router.run(routes, function (Handler) {
	 *     React.render(<Handler/>, document.body);
	 *   });
	 * 
	 * Using HTML5 history and a custom "cursor" prop:
	 * 
	 *   Router.run(routes, Router.HistoryLocation, function (Handler) {
	 *     React.render(<Handler cursor={cursor}/>, document.body);
	 *   });
	 *
	 * Returns the newly created router.
	 *
	 * Note: If you need to specify further options for your router such
	 * as error/abort handling or custom scroll behavior, use Router.create
	 * instead.
	 *
	 *   var router = Router.create(options);
	 *   router.run(function (Handler) {
	 *     // ...
	 *   });
	 */
	function runRouter(routes, location, callback) {
	  if (typeof location === 'function') {
	    callback = location;
	    location = null;
	  }

	  var router = createRouter({
	    routes: routes,
	    location: location
	  });

	  router.run(callback);

	  return router;
	}

	module.exports = runRouter;

/***/ },
/* 100 */,
/* 101 */,
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var QuickStartDescription = __webpack_require__(103);
	var ReactPlayground = __webpack_require__(106);

	var SimpleExample = '\n\nvar _rows = [];\nfor (var i = 1; i < 1000; i++) {\n  _rows.push({\n    id: i,\n    title: \'Title \' + i,\n    count: i * 1000\n  });\n}\n\n//A rowGetter function is required by the grid to retrieve a row for a given index\nvar rowGetter = function(i){\n  return _rows[i];\n};\n\n\nvar columns = [\n{\n  key: \'id\',\n  name: \'ID\'\n},\n{\n  key: \'title\',\n  name: \'Title\'\n},\n{\n  key: \'count\',\n  name: \'Count\'\n}\n]\n\nvar Example = React.createClass({\n  render: function() {\n    return  (<ReactDataGrid\n    columns={columns}\n    rowGetter={rowGetter}\n    rowsCount={_rows.length}\n    minHeight={500} />);\n  }\n});\nReact.render(<Example />, mountNode);\n';

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
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var RowsDescription = __webpack_require__(104);
	var ColsDescription = __webpack_require__(105);

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
	        'Now simply invoke React.render(..) passing the array of rows and columns as props'
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
	            "React.render(<ReactDataGrid columns={columns} rowGetter={rowGetter} rowsCount={rowsCount()} minHeight={500} />, document.getElementById('example'))"
	          )
	        )
	      )
	    );
	  }
	});

/***/ },
/* 104 */
/***/ function(module, exports) {

	/**
	* @jsx React.DOM
	*/
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
/* 105 */
/***/ function(module, exports) {

	/**
	* @jsx React.DOM
	*/
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
/* 106 */
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

	    this.editor = CodeMirror.fromTextArea(this.refs.editor.getDOMNode(), {
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

	  setTimeout: (function (_setTimeout) {
	    function setTimeout() {
	      return _setTimeout.apply(this, arguments);
	    }

	    setTimeout.toString = function () {
	      return _setTimeout.toString();
	    };

	    return setTimeout;
	  })(function () {
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
	    var mountNode = this.refs.mount.getDOMNode();

	    try {
	      React.unmountComponentAtNode(mountNode);
	    } catch (e) {}

	    try {
	      var compiledCode = this.compileCode();
	      if (this.props.renderCode) {
	        React.render(React.createElement(CodeMirrorEditor, { codeText: compiledCode, readOnly: true }), mountNode);
	      } else {
	        eval(compiledCode);
	      }
	    } catch (err) {
	      this.setTimeout(function () {
	        React.render(React.createElement(
	          'div',
	          { className: 'playgroundError' },
	          err.toString()
	        ), mountNode);
	      }, 500);
	    }
	  }
	});

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ReactGrid = __webpack_require__(108);
	var QuickStartDescription = __webpack_require__(103);
	var ReactPlayground = __webpack_require__(106);

	var ResizableExample = '\n//helper to generate a random date\nfunction randomDate(start, end) {\n  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();\n};\n\nvar _rows = [];\nfor (var i = 1; i < 1000; i++) {\n  _rows.push({\n    id: i,\n    task: \'Task \' + i,\n    complete: Math.min(100, Math.round(Math.random() * 110)),\n    priority : [\'Critical\', \'High\', \'Medium\', \'Low\'][Math.floor((Math.random() * 3) + 1)],\n    issueType : [\'Bug\', \'Improvement\', \'Epic\', \'Story\'][Math.floor((Math.random() * 3) + 1)],\n    startDate: randomDate(new Date(2015, 3, 1), new Date()),\n    completeDate: randomDate(new Date(), new Date(2016, 0, 1))\n  });\n}\n\n//function to retrieve a row for a given index\nvar rowGetter = function(i){\n  return _rows[i];\n};\n\n\n//Columns definition\nvar columns = [\n{\n  key: \'id\',\n  name: \'ID\',\n  resizable : true\n\n},\n{\n  key: \'task\',\n  name: \'Title\',\n  resizable : true\n},\n{\n  key: \'priority\',\n  name: \'Priority\',\n  resizable : true\n},\n{\n  key: \'issueType\',\n  name: \'Issue Type\',\n  resizable : true\n},\n{\n  key: \'complete\',\n  name: \'% Complete\',\n  resizable : true\n},\n{\n  key: \'startDate\',\n  name: \'Start Date\',\n  resizable : true\n},\n{\n  key: \'completeDate\',\n  name: \'Expected Complete\',\n  resizable : true\n}\n]\n\nReact.render(<ReactDataGrid\n  columns={columns}\n  rowGetter={rowGetter}\n  rowsCount={_rows.length}\n  minHeight={500} />, mountNode);\n';

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
	      React.createElement(ReactPlayground, { codeText: ResizableExample })
	    );
	  }

	});

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';var _Object$assign2=__webpack_require__(37)['default'];var _Symbol=__webpack_require__(41)['default'];var _Object$keys=__webpack_require__(62)['default'];var _Object$defineProperty2=__webpack_require__(30)['default'];var _Object$freeze=__webpack_require__(109)['default'];var _Object$setPrototypeOf2=__webpack_require__(21)['default'];(function webpackUniversalModuleDefinition(root,factory){if(true)module.exports = factory(__webpack_require__(1));else if(typeof define === 'function' && define.amd)define(["react"],factory);else if(typeof exports === 'object')exports["ReactDataGrid"] = factory(require("react"));else root["ReactDataGrid"] = factory(root["React"]);})(undefined,function(__WEBPACK_EXTERNAL_MODULE_18__){return  (/******/(function(modules){ // webpackBootstrap
	/******/ // The module cache
	/******/var installedModules={}; /******/ // The require function
	/******/function __webpack_require__(moduleId){ /******/ // Check if module is in cache
	/******/if(installedModules[moduleId]) /******/return installedModules[moduleId].exports; /******/ // Create a new module (and put it into the cache)
	/******/var module=installedModules[moduleId] = { /******/exports:{}, /******/id:moduleId, /******/loaded:false /******/}; /******/ // Execute the module function
	/******/modules[moduleId].call(module.exports,module,module.exports,__webpack_require__); /******/ // Flag the module as loaded
	/******/module.loaded = true; /******/ // Return the exports of the module
	/******/return module.exports; /******/} /******/ // expose the modules object (__webpack_modules__)
	/******/__webpack_require__.m = modules; /******/ // expose the module cache
	/******/__webpack_require__.c = installedModules; /******/ // __webpack_public_path__
	/******/__webpack_require__.p = ""; /******/ // Load entry module and return exports
	/******/return __webpack_require__(0); /******/})( /************************************************************************/ /******/[ /* 0 */function(module,exports,__webpack_require__){'use strict';var Grid=__webpack_require__(1);var Row=__webpack_require__(50);var Cell=__webpack_require__(51);module.exports = Grid;module.exports.Row = Row;module.exports.Cell = Cell; /***/}, /* 1 */function(module,exports,__webpack_require__){ /**
		 * @jsx React.DOM

		 */"use strict";var _extends=__webpack_require__(2)['default'];var _Object$assign=__webpack_require__(3)['default'];var React=__webpack_require__(18);var PropTypes=React.PropTypes;var BaseGrid=__webpack_require__(19);var Row=__webpack_require__(50);var ExcelColumn=__webpack_require__(42);var KeyboardHandlerMixin=__webpack_require__(53);var CheckboxEditor=__webpack_require__(80);var FilterableHeaderCell=__webpack_require__(81);var cloneWithProps=__webpack_require__(30);var DOMMetrics=__webpack_require__(77);var ColumnMetricsMixin=__webpack_require__(82);var RowUtils=__webpack_require__(84);var ColumnUtils=__webpack_require__(25);if(!_Object$assign){Object.assign = __webpack_require__(83);}var ReactDataGrid=React.createClass({displayName:'ReactDataGrid',propTypes:{rowHeight:React.PropTypes.number.isRequired,headerRowHeight:React.PropTypes.number,minHeight:React.PropTypes.number.isRequired,minWidth:React.PropTypes.number,enableRowSelect:React.PropTypes.bool,onRowUpdated:React.PropTypes.func,rowGetter:React.PropTypes.func.isRequired,rowsCount:React.PropTypes.number.isRequired,toolbar:React.PropTypes.element,enableCellSelect:React.PropTypes.bool,columns:React.PropTypes.oneOfType([React.PropTypes.object,React.PropTypes.array]).isRequired,onFilter:React.PropTypes.func,onCellCopyPaste:React.PropTypes.func,onCellsDragged:React.PropTypes.func,onAddFilter:React.PropTypes.func},mixins:[ColumnMetricsMixin,DOMMetrics.MetricsComputatorMixin,KeyboardHandlerMixin],getDefaultProps:function getDefaultProps(){return {enableCellSelect:false,tabIndex:-1,rowHeight:35,enableRowSelect:false,minHeight:350};},getInitialState:function getInitialState(){var columnMetrics=this.createColumnMetrics();var initialState={columnMetrics:columnMetrics,selectedRows:this.getInitialSelectedRows(),copied:null,expandedRows:[],canFilter:false,columnFilters:{},sortDirection:null,sortColumn:null,dragged:null,scrollOffset:0};if(this.props.enableCellSelect){initialState.selected = {rowIdx:0,idx:0};}else {initialState.selected = {rowIdx:-1,idx:-1};}return initialState;},getInitialSelectedRows:function getInitialSelectedRows(){var selectedRows=[];for(var i=0;i < this.props.rowsCount;i++) {selectedRows.push(false);}return selectedRows;},componentWillReceiveProps:function componentWillReceiveProps(nextProps){if(nextProps.rowsCount === this.props.rowsCount + 1){this.onAfterAddRow(nextProps.rowsCount + 1);}},componentDidMount:function componentDidMount(){var scrollOffset=0;var canvas=this.getDOMNode().querySelector('.react-grid-Canvas');if(canvas != null){scrollOffset = canvas.offsetWidth - canvas.clientWidth;}this.setState({scrollOffset:scrollOffset});},render:function render(){var cellMetaData={selected:this.state.selected,dragged:this.state.dragged,onCellClick:this.onCellClick,onCellDoubleClick:this.onCellDoubleClick,onCommit:this.onCellCommit,onCommitCancel:this.setInactive,copied:this.state.copied,handleDragEnterRow:this.handleDragEnter,handleTerminateDrag:this.handleTerminateDrag};var toolbar=this.renderToolbar();var containerWidth=this.props.minWidth || this.DOMMetrics.gridWidth();var gridWidth=containerWidth - this.state.scrollOffset;return React.createElement('div',{className:'react-grid-Container',style:{width:containerWidth}},toolbar,React.createElement('div',{className:'react-grid-Main'},React.createElement(BaseGrid,_extends({ref:'base'},this.props,{headerRows:this.getHeaderRows(),columnMetrics:this.state.columnMetrics,rowGetter:this.props.rowGetter,rowsCount:this.props.rowsCount,rowHeight:this.props.rowHeight,cellMetaData:cellMetaData,selectedRows:this.state.selectedRows,expandedRows:this.state.expandedRows,rowOffsetHeight:this.getRowOffsetHeight(),sortColumn:this.state.sortColumn,sortDirection:this.state.sortDirection,onSort:this.handleSort,minHeight:this.props.minHeight,totalWidth:gridWidth,onViewportKeydown:this.onKeyDown,onViewportDragStart:this.onDragStart,onViewportDragEnd:this.handleDragEnd,onViewportDoubleClick:this.onViewportDoubleClick,onColumnResize:this.onColumnResize}))));},renderToolbar:function renderToolbar(){var Toolbar=this.props.toolbar;if(React.isValidElement(Toolbar)){return cloneWithProps(Toolbar,{onToggleFilter:this.onToggleFilter,numberOfRows:this.props.rowsCount});}},onSelect:function onSelect(selected){if(this.props.enableCellSelect){if(this.state.selected.rowIdx === selected.rowIdx && this.state.selected.idx === selected.idx && this.state.selected.active === true){}else {var idx=selected.idx;var rowIdx=selected.rowIdx;if(idx >= 0 && rowIdx >= 0 && idx < ColumnUtils.getSize(this.state.columnMetrics.columns) && rowIdx < this.props.rowsCount){this.setState({selected:selected});}}}},onCellClick:function onCellClick(cell){this.onSelect({rowIdx:cell.rowIdx,idx:cell.idx});},onCellDoubleClick:function onCellDoubleClick(cell){this.onSelect({rowIdx:cell.rowIdx,idx:cell.idx});this.setActive('Enter');},onViewportDoubleClick:function onViewportDoubleClick(e){this.setActive();},onPressArrowUp:function onPressArrowUp(e){this.moveSelectedCell(e,-1,0);},onPressArrowDown:function onPressArrowDown(e){this.moveSelectedCell(e,1,0);},onPressArrowLeft:function onPressArrowLeft(e){this.moveSelectedCell(e,0,-1);},onPressArrowRight:function onPressArrowRight(e){this.moveSelectedCell(e,0,1);},onPressTab:function onPressTab(e){this.moveSelectedCell(e,0,e.shiftKey?-1:1);},onPressEnter:function onPressEnter(e){this.setActive(e.key);},onPressDelete:function onPressDelete(e){this.setActive(e.key);},onPressEscape:function onPressEscape(e){this.setInactive(e.key);},onPressBackspace:function onPressBackspace(e){this.setActive(e.key);},onPressChar:function onPressChar(e){if(this.isKeyPrintable(e.keyCode)){this.setActive(e.keyCode);}},onPressKeyWithCtrl:function onPressKeyWithCtrl(e){var keys={KeyCode_c:99,KeyCode_C:67,KeyCode_V:86,KeyCode_v:118};var idx=this.state.selected.idx;if(this.canEdit(idx)){if(e.keyCode == keys.KeyCode_c || e.keyCode == keys.KeyCode_C){var value=this.getSelectedValue();this.handleCopy({value:value});}else if(e.keyCode == keys.KeyCode_v || e.keyCode == keys.KeyCode_V){this.handlePaste();}}},onDragStart:function onDragStart(e){var value=this.getSelectedValue();this.handleDragStart({idx:this.state.selected.idx,rowIdx:this.state.selected.rowIdx,value:value}); //need to set dummy data for FF
	if(e && e.dataTransfer && e.dataTransfer.setData)e.dataTransfer.setData('text/plain','dummy');},moveSelectedCell:function moveSelectedCell(e,rowDelta,cellDelta){ // we need to prevent default as we control grid scroll
	//otherwise it moves every time you left/right which is janky
	e.preventDefault();var rowIdx=this.state.selected.rowIdx + rowDelta;var idx=this.state.selected.idx + cellDelta;this.onSelect({idx:idx,rowIdx:rowIdx});},getSelectedValue:function getSelectedValue(){var rowIdx=this.state.selected.rowIdx;var idx=this.state.selected.idx;var cellKey=this.getColumn(idx).key;var row=this.props.rowGetter(rowIdx);return RowUtils.get(row,cellKey);},setActive:function setActive(keyPressed){var rowIdx=this.state.selected.rowIdx;var idx=this.state.selected.idx;if(this.canEdit(idx) && !this.isActive()){var selected=_Object$assign(this.state.selected,{idx:idx,rowIdx:rowIdx,active:true,initialKeyCode:keyPressed});this.setState({selected:selected});}},setInactive:function setInactive(){var rowIdx=this.state.selected.rowIdx;var idx=this.state.selected.idx;if(this.canEdit(idx) && this.isActive()){var selected=_Object$assign(this.state.selected,{idx:idx,rowIdx:rowIdx,active:false});this.setState({selected:selected});}},canEdit:function canEdit(idx){var col=this.getColumn(idx);return this.props.enableCellSelect === true && (col.editor != null || col.editable);},isActive:function isActive(){return this.state.selected.active === true;},onCellCommit:function onCellCommit(commit){var selected=_Object$assign({},this.state.selected);selected.active = false;if(commit.key === 'Tab'){selected.idx += 1;}var expandedRows=this.state.expandedRows; // if(commit.changed && commit.changed.expandedHeight){
	//   expandedRows = this.expandRow(commit.rowIdx, commit.changed.expandedHeight);
	// }
	this.setState({selected:selected,expandedRows:expandedRows});this.props.onRowUpdated(commit);},setupGridColumns:function setupGridColumns(){var props=arguments.length <= 0 || arguments[0] === undefined?this.props:arguments[0];var cols=props.columns.slice(0);if(props.enableRowSelect){var selectColumn={key:'select-row',name:'',formatter:React.createElement(CheckboxEditor,null),onCellChange:this.handleRowSelect,filterable:false,headerRenderer:React.createElement('input',{type:'checkbox',onChange:this.handleCheckboxChange}),width:60,locked:true};var unshiftedCols=cols.unshift(selectColumn);cols = unshiftedCols > 0?cols:unshiftedCols;}return cols;},handleCheckboxChange:function handleCheckboxChange(e){var allRowsSelected;if(e.currentTarget instanceof HTMLInputElement && e.currentTarget.checked === true){allRowsSelected = true;}else {allRowsSelected = false;}var selectedRows=[];for(var i=0;i < this.props.rowsCount;i++) {selectedRows.push(allRowsSelected);}this.setState({selectedRows:selectedRows});}, // columnKey not used here as this function will select the whole row,
	// but needed to match the function signature in the CheckboxEditor
	handleRowSelect:function handleRowSelect(rowIdx,columnKey,e){e.stopPropagation();if(this.state.selectedRows != null && this.state.selectedRows.length > 0){var selectedRows=this.state.selectedRows.slice();if(selectedRows[rowIdx] == null || selectedRows[rowIdx] == false){selectedRows[rowIdx] = true;}else {selectedRows[rowIdx] = false;}this.setState({selectedRows:selectedRows});}}, //EXPAND ROW Functionality - removing for now till we decide on how best to implement
	// expandRow(row: Row, newHeight: number): Array<Row>{
	//   var expandedRows = this.state.expandedRows;
	//   if(expandedRows[row]){
	//     if(expandedRows[row]== null || expandedRows[row] < newHeight){
	//       expandedRows[row] = newHeight;
	//     }
	//   }else{
	//     expandedRows[row] = newHeight;
	//   }
	//   return expandedRows;
	// },
	//
	// handleShowMore(row: Row, newHeight: number) {
	//   var expandedRows = this.expandRow(row, newHeight);
	//   this.setState({expandedRows : expandedRows});
	// },
	//
	// handleShowLess(row: Row){
	//   var expandedRows = this.state.expandedRows;
	//   if(expandedRows[row]){
	//       expandedRows[row] = false;
	//   }
	//   this.setState({expandedRows : expandedRows});
	// },
	//
	// expandAllRows(){
	//
	// },
	//
	// collapseAllRows(){
	//
	// },
	onAfterAddRow:function onAfterAddRow(numberOfRows){this.setState({selected:{idx:1,rowIdx:numberOfRows - 2}});},onToggleFilter:function onToggleFilter(){this.setState({canFilter:!this.state.canFilter});},getHeaderRows:function getHeaderRows(){var rows=[{ref:"row",height:this.props.headerRowHeight || this.props.rowHeight}];if(this.state.canFilter === true){rows.push({ref:"filterRow",headerCellRenderer:React.createElement(FilterableHeaderCell,{onChange:this.props.onAddFilter,column:this.props.column}),height:45});}return rows;},getRowOffsetHeight:function getRowOffsetHeight(){var offsetHeight=0;this.getHeaderRows().forEach(function(row){return offsetHeight += parseFloat(row.height,10);});return offsetHeight;},handleSort:function handleSort(columnKey,direction){this.setState({sortDirection:direction,sortColumn:columnKey},function(){this.props.onGridSort(columnKey,direction);});},copyPasteEnabled:function copyPasteEnabled(){return this.props.onCellCopyPaste !== null;},handleCopy:function handleCopy(args){if(!this.copyPasteEnabled()){return;}var textToCopy=args.value;var selected=this.state.selected;var copied={idx:selected.idx,rowIdx:selected.rowIdx};this.setState({textToCopy:textToCopy,copied:copied});},handlePaste:function handlePaste(){if(!this.copyPasteEnabled()){return;}var selected=this.state.selected;var cellKey=this.getColumn(this.state.selected.idx).key;if(this.props.onCellCopyPaste){this.props.onCellCopyPaste({cellKey:cellKey,rowIdx:selected.rowIdx,value:this.state.textToCopy,fromRow:this.state.copied.rowIdx,toRow:selected.rowIdx});}this.setState({copied:null});},dragEnabled:function dragEnabled(){return this.props.onCellsDragged !== null;},handleDragStart:function handleDragStart(dragged){if(!this.dragEnabled()){return;}var idx=dragged.idx;var rowIdx=dragged.rowIdx;if(idx >= 0 && rowIdx >= 0 && idx < this.getSize() && rowIdx < this.props.rowsCount){this.setState({dragged:dragged});}},handleDragEnter:function handleDragEnter(row){if(!this.dragEnabled()){return;}var selected=this.state.selected;var dragged=this.state.dragged;dragged.overRowIdx = row;this.setState({dragged:dragged});},handleDragEnd:function handleDragEnd(){if(!this.dragEnabled()){return;}var fromRow,toRow;var selected=this.state.selected;var dragged=this.state.dragged;var cellKey=this.getColumn(this.state.selected.idx).key;fromRow = selected.rowIdx < dragged.overRowIdx?selected.rowIdx:dragged.overRowIdx;toRow = selected.rowIdx > dragged.overRowIdx?selected.rowIdx:dragged.overRowIdx;if(this.props.onCellsDragged){this.props.onCellsDragged({cellKey:cellKey,fromRow:fromRow,toRow:toRow,value:dragged.value});}this.setState({dragged:{complete:true}});},handleTerminateDrag:function handleTerminateDrag(){if(!this.dragEnabled()){return;}this.setState({dragged:null});}});module.exports = ReactDataGrid; /***/}, /* 2 */function(module,exports,__webpack_require__){"use strict";var _Object$assign=__webpack_require__(3)["default"];exports["default"] = _Object$assign || function(target){for(var i=1;i < arguments.length;i++) {var source=arguments[i];for(var key in source) {if(Object.prototype.hasOwnProperty.call(source,key)){target[key] = source[key];}}}return target;};exports.__esModule = true; /***/}, /* 3 */function(module,exports,__webpack_require__){module.exports = {"default":__webpack_require__(4),__esModule:true}; /***/}, /* 4 */function(module,exports,__webpack_require__){__webpack_require__(5);module.exports = __webpack_require__(8).Object.assign; /***/}, /* 5 */function(module,exports,__webpack_require__){ // 19.1.3.1 Object.assign(target, source)
	var $export=__webpack_require__(6);$export($export.S + $export.F,'Object',{assign:__webpack_require__(11)}); /***/}, /* 6 */function(module,exports,__webpack_require__){var global=__webpack_require__(7),core=__webpack_require__(8),ctx=__webpack_require__(9),PROTOTYPE='prototype';var $export=function $export(type,name,source){var IS_FORCED=type & $export.F,IS_GLOBAL=type & $export.G,IS_STATIC=type & $export.S,IS_PROTO=type & $export.P,IS_BIND=type & $export.B,IS_WRAP=type & $export.W,exports=IS_GLOBAL?core:core[name] || (core[name] = {}),target=IS_GLOBAL?global:IS_STATIC?global[name]:(global[name] || {})[PROTOTYPE],key,own,out;if(IS_GLOBAL)source = name;for(key in source) { // contains in native
	own = !IS_FORCED && target && key in target;if(own && key in exports)continue; // export native or passed
	out = own?target[key]:source[key]; // prevent global pollution for namespaces
	exports[key] = IS_GLOBAL && typeof target[key] != 'function'?source[key] // bind timers to global for call from export context
	:IS_BIND && own?ctx(out,global) // wrap global constructors for prevent change them in library
	:IS_WRAP && target[key] == out?(function(C){var F=function F(param){return this instanceof C?new C(param):C(param);};F[PROTOTYPE] = C[PROTOTYPE];return F; // make static versions for prototype methods
	})(out):IS_PROTO && typeof out == 'function'?ctx(Function.call,out):out;if(IS_PROTO)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;}}; // type bitmap
	$export.F = 1; // forced
	$export.G = 2; // global
	$export.S = 4; // static
	$export.P = 8; // proto
	$export.B = 16; // bind
	$export.W = 32; // wrap
	module.exports = $export; /***/}, /* 7 */function(module,exports){ // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global=module.exports = typeof window != 'undefined' && window.Math == Math?window:typeof self != 'undefined' && self.Math == Math?self:Function('return this')();if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
	/***/}, /* 8 */function(module,exports){var core=module.exports = {version:'1.2.6'};if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
	/***/}, /* 9 */function(module,exports,__webpack_require__){ // optional / simple context binding
	var aFunction=__webpack_require__(10);module.exports = function(fn,that,length){aFunction(fn);if(that === undefined)return fn;switch(length){case 1:return function(a){return fn.call(that,a);};case 2:return function(a,b){return fn.call(that,a,b);};case 3:return function(a,b,c){return fn.call(that,a,b,c);};}return function() /* ...args */{return fn.apply(that,arguments);};}; /***/}, /* 10 */function(module,exports){module.exports = function(it){if(typeof it != 'function')throw TypeError(it + ' is not a function!');return it;}; /***/}, /* 11 */function(module,exports,__webpack_require__){ // 19.1.2.1 Object.assign(target, source, ...)
	var $=__webpack_require__(12),toObject=__webpack_require__(13),IObject=__webpack_require__(15); // should work with symbols and should have deterministic property order (V8 bug)
	module.exports = __webpack_require__(17)(function(){var a=_Object$assign2,A={},B={},S=_Symbol(),K='abcdefghijklmnopqrst';A[S] = 7;K.split('').forEach(function(k){B[k] = k;});return a({},A)[S] != 7 || _Object$keys(a({},B)).join('') != K;})?function assign(target,source){ // eslint-disable-line no-unused-vars
	var T=toObject(target),$$=arguments,$$len=$$.length,index=1,getKeys=$.getKeys,getSymbols=$.getSymbols,isEnum=$.isEnum;while($$len > index) {var S=IObject($$[index++]),keys=getSymbols?getKeys(S).concat(getSymbols(S)):getKeys(S),length=keys.length,j=0,key;while(length > j) if(isEnum.call(S,key = keys[j++]))T[key] = S[key];}return T;}:_Object$assign2; /***/}, /* 12 */function(module,exports){var $Object=Object;module.exports = {create:$Object.create,getProto:$Object.getPrototypeOf,isEnum:({}).propertyIsEnumerable,getDesc:$Object.getOwnPropertyDescriptor,setDesc:$Object.defineProperty,setDescs:$Object.defineProperties,getKeys:$Object.keys,getNames:$Object.getOwnPropertyNames,getSymbols:$Object.getOwnPropertySymbols,each:[].forEach}; /***/}, /* 13 */function(module,exports,__webpack_require__){ // 7.1.13 ToObject(argument)
	var defined=__webpack_require__(14);module.exports = function(it){return Object(defined(it));}; /***/}, /* 14 */function(module,exports){ // 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){if(it == undefined)throw TypeError("Can't call method on  " + it);return it;}; /***/}, /* 15 */function(module,exports,__webpack_require__){ // fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof=__webpack_require__(16);module.exports = Object('z').propertyIsEnumerable(0)?Object:function(it){return cof(it) == 'String'?it.split(''):Object(it);}; /***/}, /* 16 */function(module,exports){var toString=({}).toString;module.exports = function(it){return toString.call(it).slice(8,-1);}; /***/}, /* 17 */function(module,exports){module.exports = function(exec){try{return !!exec();}catch(e) {return true;}}; /***/}, /* 18 */function(module,exports){module.exports = __WEBPACK_EXTERNAL_MODULE_18__; /***/}, /* 19 */function(module,exports,__webpack_require__){ /**
		 * @jsx React.DOM


		 */"use strict";var _extends=__webpack_require__(2)['default'];var React=__webpack_require__(18);var PropTypes=React.PropTypes;var Header=__webpack_require__(20);var Viewport=__webpack_require__(47);var ExcelColumn=__webpack_require__(42);var GridScrollMixin=__webpack_require__(79);var DOMMetrics=__webpack_require__(77);var Grid=React.createClass({displayName:'Grid',propTypes:{rowGetter:PropTypes.oneOfType([PropTypes.array,PropTypes.func]).isRequired,columns:PropTypes.oneOfType([PropTypes.array,PropTypes.object]),minHeight:PropTypes.number,headerRows:PropTypes.oneOfType([PropTypes.array,PropTypes.func]),rowHeight:PropTypes.number,rowRenderer:PropTypes.func,emptyRowsView:PropTypes.func,expandedRows:PropTypes.oneOfType([PropTypes.array,PropTypes.func]),selectedRows:PropTypes.oneOfType([PropTypes.array,PropTypes.func]),rowsCount:PropTypes.number,onRows:PropTypes.func,sortColumn:React.PropTypes.string,sortDirection:React.PropTypes.oneOf(['ASC','DESC','NONE']),rowOffsetHeight:PropTypes.number.isRequired,onViewportKeydown:PropTypes.func.isRequired,onViewportDragStart:PropTypes.func.isRequired,onViewportDragEnd:PropTypes.func.isRequired,onViewportDoubleClick:PropTypes.func.isRequired},mixins:[GridScrollMixin,DOMMetrics.MetricsComputatorMixin],getStyle:function getStyle(){return {overflow:'hidden',outline:0,position:'relative',minHeight:this.props.minHeight};},render:function render(){var headerRows=this.props.headerRows || [{ref:'row'}];var EmptyRowsView=this.props.emptyRowsView;return React.createElement('div',_extends({},this.props,{style:this.getStyle(),className:'react-grid-Grid'}),React.createElement(Header,{ref:'header',columnMetrics:this.props.columnMetrics,onColumnResize:this.props.onColumnResize,height:this.props.rowHeight,totalWidth:this.props.totalWidth,headerRows:headerRows,sortColumn:this.props.sortColumn,sortDirection:this.props.sortDirection,onSort:this.props.onSort}),this.props.rowsCount >= 1 || this.props.rowsCount === 0 && !this.props.emptyRowsView?React.createElement('div',{ref:'viewPortContainer',onKeyDown:this.props.onViewportKeydown,onDoubleClick:this.props.onViewportDoubleClick,onDragStart:this.props.onViewportDragStart,onDragEnd:this.props.onViewportDragEnd},React.createElement(Viewport,{ref:'viewport',width:this.props.columnMetrics.width,rowHeight:this.props.rowHeight,rowRenderer:this.props.rowRenderer,rowGetter:this.props.rowGetter,rowsCount:this.props.rowsCount,selectedRows:this.props.selectedRows,expandedRows:this.props.expandedRows,columnMetrics:this.props.columnMetrics,totalWidth:this.props.totalWidth,onScroll:this.onScroll,onRows:this.props.onRows,cellMetaData:this.props.cellMetaData,rowOffsetHeight:this.props.rowOffsetHeight || this.props.rowHeight * headerRows.length,minHeight:this.props.minHeight})):React.createElement('div',{ref:'emptyView',className:'react-grid-Empty'},React.createElement(EmptyRowsView,null)));},getDefaultProps:function getDefaultProps(){return {rowHeight:35,minHeight:350};}});module.exports = Grid; /***/}, /* 20 */function(module,exports,__webpack_require__){ /**
		 * @jsx React.DOM


		 */"use strict";var _extends=__webpack_require__(2)['default'];var React=__webpack_require__(18);var joinClasses=__webpack_require__(21);var shallowCloneObject=__webpack_require__(22);var ColumnMetrics=__webpack_require__(23);var ColumnUtils=__webpack_require__(25);var HeaderRow=__webpack_require__(27);var Header=React.createClass({displayName:'Header',propTypes:{columnMetrics:React.PropTypes.shape({width:React.PropTypes.number.isRequired}).isRequired,totalWidth:React.PropTypes.number,height:React.PropTypes.number.isRequired,headerRows:React.PropTypes.array.isRequired},render:function render(){var state=this.state.resizing || this.props;var className=joinClasses({'react-grid-Header':true,'react-grid-Header--resizing':!!this.state.resizing});var headerRows=this.getHeaderRows();return React.createElement('div',_extends({},this.props,{style:this.getStyle(),className:className}),headerRows);},shouldComponentUpdate:function shouldComponentUpdate(nextProps,nextState){var update=!ColumnMetrics.sameColumns(this.props.columnMetrics.columns,nextProps.columnMetrics.columns,ColumnMetrics.sameColumn) || this.props.totalWidth != nextProps.totalWidth || this.props.headerRows.length != nextProps.headerRows.length || this.state.resizing != nextState.resizing || this.props.sortColumn != nextProps.sortColumn || this.props.sortDirection != nextProps.sortDirection;return update;},getHeaderRows:function getHeaderRows(){var columnMetrics=this.getColumnMetrics();var resizeColumn;if(this.state.resizing){resizeColumn = this.state.resizing.column;}var headerRows=[];this.props.headerRows.forEach((function(row,index){var headerRowStyle={position:'absolute',top:this.getCombinedHeaderHeights(index),left:0,width:this.props.totalWidth,overflow:'hidden'};headerRows.push(React.createElement(HeaderRow,{key:row.ref,ref:row.ref,style:headerRowStyle,onColumnResize:this.onColumnResize,onColumnResizeEnd:this.onColumnResizeEnd,width:columnMetrics.width,height:row.height || this.props.height,columns:columnMetrics.columns,resizing:resizeColumn,headerCellRenderer:row.headerCellRenderer,sortColumn:this.props.sortColumn,sortDirection:this.props.sortDirection,onSort:this.props.onSort}));}).bind(this));return headerRows;},getInitialState:function getInitialState(){return {resizing:null};},componentWillReceiveProps:function componentWillReceiveProps(nextProps){this.setState({resizing:null});},onColumnResize:function onColumnResize(column,width){var state=this.state.resizing || this.props;var pos=this.getColumnPosition(column);if(pos != null){var resizing={columnMetrics:shallowCloneObject(state.columnMetrics)};resizing.columnMetrics = ColumnMetrics.resizeColumn(resizing.columnMetrics,pos,width); // we don't want to influence scrollLeft while resizing
	if(resizing.columnMetrics.totalWidth < state.columnMetrics.totalWidth){resizing.columnMetrics.totalWidth = state.columnMetrics.totalWidth;}resizing.column = ColumnUtils.getColumn(resizing.columnMetrics.columns,pos);this.setState({resizing:resizing});}},getColumnMetrics:function getColumnMetrics(){var columnMetrics;if(this.state.resizing){columnMetrics = this.state.resizing.columnMetrics;}else {columnMetrics = this.props.columnMetrics;}return columnMetrics;},getColumnPosition:function getColumnPosition(column){var columnMetrics=this.getColumnMetrics();var pos=-1;columnMetrics.columns.forEach(function(c,idx){if(c.key === column.key){pos = idx;}});return pos === -1?null:pos;},onColumnResizeEnd:function onColumnResizeEnd(column,width){var pos=this.getColumnPosition(column);if(pos !== null && this.props.onColumnResize){this.props.onColumnResize(pos,width || column.width);}},setScrollLeft:function setScrollLeft(scrollLeft){var node=this.refs.row.getDOMNode();node.scrollLeft = scrollLeft;this.refs.row.setScrollLeft(scrollLeft);if(this.refs.filterRow){var nodeFilters=this.refs.filterRow.getDOMNode();nodeFilters.scrollLeft = scrollLeft;this.refs.filterRow.setScrollLeft(scrollLeft);}},getCombinedHeaderHeights:function getCombinedHeaderHeights(until){var stop_at=this.props.headerRows.length;if(typeof until != 'undefined')stop_at = until;var height=0;for(var index=0;index < stop_at;index++) {height += this.props.headerRows[index].height || this.props.height;}return height;},getStyle:function getStyle(){return {position:'relative',height:this.getCombinedHeaderHeights(),overflow:'hidden'};}});module.exports = Header; /***/}, /* 21 */function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__; /*!
		  Copyright (c) 2015 Jed Watson.
		  Licensed under the MIT License (MIT), see
		  http://jedwatson.github.io/classnames
		*/function classNames(){var classes='';var arg;for(var i=0;i < arguments.length;i++) {arg = arguments[i];if(!arg){continue;}if('string' === typeof arg || 'number' === typeof arg){classes += ' ' + arg;}else if(Object.prototype.toString.call(arg) === '[object Array]'){classes += ' ' + classNames.apply(null,arg);}else if('object' === typeof arg){for(var key in arg) {if(!arg.hasOwnProperty(key) || !arg[key]){continue;}classes += ' ' + key;}}}return classes.substr(1);} // safely export classNames for node / browserify
	if(typeof module !== 'undefined' && module.exports){module.exports = classNames;} // safely export classNames for RequireJS
	if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__ = [],__WEBPACK_AMD_DEFINE_RESULT__ = (function(){return classNames;}).apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__),__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));} /***/}, /* 22 */function(module,exports){ /**
		 * @jsx React.DOM


		 */'use strict';function shallowCloneObject(obj){var result={};for(var k in obj) {if(obj.hasOwnProperty(k)){result[k] = obj[k];}}return result;}module.exports = shallowCloneObject; /***/}, /* 23 */function(module,exports,__webpack_require__){ /**
		 * @jsx React.DOM


		 */"use strict";var _Object$assign=__webpack_require__(3)['default'];var shallowCloneObject=__webpack_require__(22);var isValidElement=__webpack_require__(18).isValidElement;var sameColumn=__webpack_require__(24);var ColumnUtils=__webpack_require__(25);var getScrollbarSize=__webpack_require__(26); /**
		 * Update column metrics calculation.
		 *
		 * @param {ColumnMetricsType} metrics
		 */function recalculate(metrics){ // compute width for columns which specify width
	var columns=setColumnWidths(metrics.columns,metrics.totalWidth);var unallocatedWidth=columns.filter(function(c){return c.width;}).reduce(function(w,column){return w - column.width;},metrics.totalWidth);unallocatedWidth -= getScrollbarSize();var width=columns.filter(function(c){return c.width;}).reduce(function(w,column){return w + column.width;},0); // compute width for columns which doesn't specify width
	columns = setDefferedColumnWidths(columns,unallocatedWidth,metrics.minColumnWidth); // compute left offset
	columns = setColumnOffsets(columns);return {columns:columns,width:width,totalWidth:metrics.totalWidth,minColumnWidth:metrics.minColumnWidth};}function setColumnOffsets(columns){var left=0;return columns.map(function(column){column.left = left;left += column.width;return column;});}function setColumnWidths(columns,totalWidth){return columns.map(function(column){var colInfo=_Object$assign({},column);if(column.width){if(/^([0-9]+)%$/.exec(column.width.toString())){colInfo.width = Math.floor(column.width / 100 * totalWidth);}}return colInfo;});}function setDefferedColumnWidths(columns,unallocatedWidth,minColumnWidth){var defferedColumns=columns.filter(function(c){return !c.width;});return columns.map(function(column,i,arr){if(!column.width){if(unallocatedWidth <= 0){column.width = minColumnWidth;}else {column.width = Math.floor(unallocatedWidth / ColumnUtils.getSize(defferedColumns));}}return column;});} /**
		 * Update column metrics calculation by resizing a column.
		 *
		 * @param {ColumnMetricsType} metrics
		 * @param {Column} column
		 * @param {number} width
		 */function resizeColumn(metrics,index,width){var column=ColumnUtils.getColumn(metrics.columns,index);metrics = shallowCloneObject(metrics);metrics.columns = metrics.columns.slice(0);var updatedColumn=shallowCloneObject(column);updatedColumn.width = Math.max(width,metrics.minColumnWidth);metrics = ColumnUtils.spliceColumn(metrics,index,updatedColumn);return recalculate(metrics);}function areColumnsImmutable(prevColumns,nextColumns){return typeof Immutable !== 'undefined' && prevColumns instanceof Immutable.List && nextColumns instanceof Immutable.List;}function compareEachColumn(prevColumns,nextColumns,sameColumn){var i,len,column;var prevColumnsByKey={};var nextColumnsByKey={};if(ColumnUtils.getSize(prevColumns) !== ColumnUtils.getSize(nextColumns)){return false;}for(i = 0,len = ColumnUtils.getSize(prevColumns);i < len;i++) {column = prevColumns[i];prevColumnsByKey[column.key] = column;}for(i = 0,len = ColumnUtils.getSize(nextColumns);i < len;i++) {column = nextColumns[i];nextColumnsByKey[column.key] = column;var prevColumn=prevColumnsByKey[column.key];if(prevColumn === undefined || !sameColumn(prevColumn,column)){return false;}}for(i = 0,len = ColumnUtils.getSize(prevColumns);i < len;i++) {column = prevColumns[i];var nextColumn=nextColumnsByKey[column.key];if(nextColumn === undefined){return false;}}return true;}function sameColumns(prevColumns,nextColumns,sameColumn){if(areColumnsImmutable(prevColumns,nextColumns)){return prevColumns === nextColumns;}else {return compareEachColumn(prevColumns,nextColumns,sameColumn);}}module.exports = {recalculate:recalculate,resizeColumn:resizeColumn,sameColumn:sameColumn,sameColumns:sameColumns}; /***/}, /* 24 */function(module,exports,__webpack_require__){ /* TODO objects as a map */'use strict';var isValidElement=__webpack_require__(18).isValidElement;module.exports = function sameColumn(a,b){var k;for(k in a) {if(a.hasOwnProperty(k)){if(typeof a[k] === 'function' && typeof b[k] === 'function' || isValidElement(a[k]) && isValidElement(b[k])){continue;}if(!b.hasOwnProperty(k) || a[k] !== b[k]){return false;}}}for(k in b) {if(b.hasOwnProperty(k) && !a.hasOwnProperty(k)){return false;}}return true;}; /***/}, /* 25 */function(module,exports){'use strict';module.exports = {getColumn:function getColumn(columns,idx){if(Array.isArray(columns)){return columns[idx];}else if(typeof Immutable !== 'undefined'){return columns.get(idx);}},spliceColumn:function spliceColumn(metrics,idx,column){if(Array.isArray(metrics.columns)){metrics.columns.splice(idx,1,column);}else if(typeof Immutable !== 'undefined'){metrics.columns = metrics.columns.splice(idx,1,column);}return metrics;},getSize:function getSize(columns){if(Array.isArray(columns)){return columns.length;}else if(typeof Immutable !== 'undefined'){return columns.size;}}}; /***/}, /* 26 */function(module,exports){ /*  offsetWidth in HTMLElement */"use strict";var size;function getScrollbarSize(){if(size === undefined){var outer=document.createElement('div');outer.style.width = '50px';outer.style.height = '50px';outer.style.position = 'absolute';outer.style.top = '-200px';outer.style.left = '-200px';var inner=document.createElement('div');inner.style.height = '100px';inner.style.width = '100%';outer.appendChild(inner);document.body.appendChild(outer);var outerWidth=outer.clientWidth;outer.style.overflowY = 'scroll';var innerWidth=inner.clientWidth;document.body.removeChild(outer);size = outerWidth - innerWidth;}return size;}module.exports = getScrollbarSize; /***/}, /* 27 */function(module,exports,__webpack_require__){ /**
		 * @jsx React.DOM
		 */"use strict";var _extends=__webpack_require__(2)['default'];var React=__webpack_require__(18);var PropTypes=React.PropTypes;var shallowEqual=__webpack_require__(28);var HeaderCell=__webpack_require__(29);var getScrollbarSize=__webpack_require__(26);var ExcelColumn=__webpack_require__(42);var ColumnUtilsMixin=__webpack_require__(25);var SortableHeaderCell=__webpack_require__(46);var HeaderRowStyle={overflow:React.PropTypes.string,width:PropTypes.oneOfType([PropTypes.number,PropTypes.string]),height:React.PropTypes.number,position:React.PropTypes.string};var DEFINE_SORT={ASC:'ASC',DESC:'DESC',NONE:'NONE'};var HeaderRow=React.createClass({displayName:'HeaderRow',propTypes:{width:PropTypes.oneOfType([PropTypes.number,PropTypes.string]),height:PropTypes.number.isRequired,columns:PropTypes.oneOfType([PropTypes.array,PropTypes.object]),onColumnResize:PropTypes.func,onSort:PropTypes.func.isRequired,style:PropTypes.shape(HeaderRowStyle)},mixins:[ColumnUtilsMixin],render:function render(){var cellsStyle={width:this.props.width?this.props.width + getScrollbarSize():'100%',height:this.props.height,whiteSpace:'nowrap',overflowX:'hidden',overflowY:'hidden'};var cells=this.getCells();return React.createElement('div',_extends({},this.props,{className:'react-grid-HeaderRow'}),React.createElement('div',{style:cellsStyle},cells));},getHeaderRenderer:function getHeaderRenderer(column){if(column.sortable){var sortDirection=this.props.sortColumn === column.key?this.props.sortDirection:DEFINE_SORT.NONE;return React.createElement(SortableHeaderCell,{columnKey:column.key,onSort:this.props.onSort,sortDirection:sortDirection});}else {return this.props.headerCellRenderer || column.headerRenderer || this.props.cellRenderer;}},getCells:function getCells(){var cells=[];var lockedCells=[];for(var i=0,len=this.getSize(this.props.columns);i < len;i++) {var column=this.getColumn(this.props.columns,i);var cell=React.createElement(HeaderCell,{ref:i,key:i,height:this.props.height,column:column,renderer:this.getHeaderRenderer(column),resizing:this.props.resizing === column,onResize:this.props.onColumnResize,onResizeEnd:this.props.onColumnResizeEnd});if(column.locked){lockedCells.push(cell);}else {cells.push(cell);}}return cells.concat(lockedCells);},setScrollLeft:function setScrollLeft(scrollLeft){var _this=this;this.props.columns.forEach(function(column,i){if(column.locked){_this.refs[i].setScrollLeft(scrollLeft);}});},shouldComponentUpdate:function shouldComponentUpdate(nextProps){return nextProps.width !== this.props.width || nextProps.height !== this.props.height || nextProps.columns !== this.props.columns || !shallowEqual(nextProps.style,this.props.style) || this.props.sortColumn != nextProps.sortColumn || this.props.sortDirection != nextProps.sortDirection;},getStyle:function getStyle(){return {overflow:'hidden',width:'100%',height:this.props.height,position:'absolute'};}});module.exports = HeaderRow; /***/}, /* 28 */function(module,exports){ /**
		 * Copyright 2013-2015, Facebook, Inc.
		 * All rights reserved.
		 *
		 * This source code is licensed under the BSD-style license found in the
		 * LICENSE file in the root directory of this source tree. An additional grant
		 * of patent rights can be found in the PATENTS file in the same directory.
		 *
		 * @providesModule shallowEqual
		 */'use strict'; /**
		 * Performs equality by iterating through keys on an object and returning
		 * false when any key has values which are not strictly equal between
		 * objA and objB. Returns true when the values of all keys are strictly equal.
		 *
		 * @return {boolean}
		 */function shallowEqual(objA,objB){if(objA === objB){return true;}var key; // Test for A's keys different from B.
	for(key in objA) {if(objA.hasOwnProperty(key) && (!objB.hasOwnProperty(key) || objA[key] !== objB[key])){return false;}} // Test for B's keys missing from A.
	for(key in objB) {if(objB.hasOwnProperty(key) && !objA.hasOwnProperty(key)){return false;}}return true;}module.exports = shallowEqual; /***/}, /* 29 */function(module,exports,__webpack_require__){ /* TODO unkwon */ /**
		 * @jsx React.DOM


		 */"use strict";var React=__webpack_require__(18);var joinClasses=__webpack_require__(21);var cloneWithProps=__webpack_require__(30);var PropTypes=React.PropTypes;var ExcelColumn=__webpack_require__(42);var ResizeHandle=__webpack_require__(44);var HeaderCell=React.createClass({displayName:'HeaderCell',propTypes:{renderer:PropTypes.oneOfType([PropTypes.func,PropTypes.element]).isRequired,column:PropTypes.shape(ExcelColumn).isRequired,onResize:PropTypes.func.isRequired,height:PropTypes.number.isRequired,onResizeEnd:PropTypes.func.isRequired},render:function render(){var resizeHandle;if(this.props.column.resizable){resizeHandle = React.createElement(ResizeHandle,{onDrag:this.onDrag,onDragStart:this.onDragStart,onDragEnd:this.onDragEnd});}var className=joinClasses({'react-grid-HeaderCell':true,'react-grid-HeaderCell--resizing':this.state.resizing,'react-grid-HeaderCell--locked':this.props.column.locked});className = joinClasses(className,this.props.className,this.props.column.cellClass);var cell=this.getCell();return React.createElement('div',{className:className,style:this.getStyle()},cell,resizeHandle);},getCell:function getCell(){if(React.isValidElement(this.props.renderer)){return cloneWithProps(this.props.renderer,{column:this.props.column});}else {var Renderer=this.props.renderer;return this.props.renderer({column:this.props.column});}},getDefaultProps:function getDefaultProps(){return {renderer:simpleCellRenderer};},getInitialState:function getInitialState(){return {resizing:false};},setScrollLeft:function setScrollLeft(scrollLeft){var node=React.findDOMNode(this);node.style.webkitTransform = 'translate3d(' + scrollLeft + 'px, 0px, 0px)';node.style.transform = 'translate3d(' + scrollLeft + 'px, 0px, 0px)';},getStyle:function getStyle(){return {width:this.props.column.width,left:this.props.column.left,display:'inline-block',position:'absolute',overflow:'hidden',height:this.props.height,margin:0,textOverflow:'ellipsis',whiteSpace:'nowrap'};},onDragStart:function onDragStart(e){this.setState({resizing:true}); //need to set dummy data for FF
	if(e && e.dataTransfer && e.dataTransfer.setData)e.dataTransfer.setData('text/plain','dummy');},onDrag:function onDrag(e){var resize=this.props.onResize || null; //for flows sake, doesnt recognise a null check direct
	if(resize){var width=this.getWidthFromMouseEvent(e);if(width > 0){resize(this.props.column,width);}}},onDragEnd:function onDragEnd(e){var width=this.getWidthFromMouseEvent(e);this.props.onResizeEnd(this.props.column,width);this.setState({resizing:false});},getWidthFromMouseEvent:function getWidthFromMouseEvent(e){var right=e.pageX;var left=React.findDOMNode(this).getBoundingClientRect().left;return right - left;}});function simpleCellRenderer(props){return React.createElement('div',{className:'widget-HeaderCell__value'},props.column.name);}var SimpleCellFormatter=React.createClass({displayName:'SimpleCellFormatter',propTypes:{value:React.PropTypes.oneOfType([React.PropTypes.string,React.PropTypes.number,React.PropTypes.object,React.PropTypes.bool]).isRequired},render:function render(){return React.createElement('span',null,this.props.value);},shouldComponentUpdate:function shouldComponentUpdate(nextProps,nextState){return nextProps.value !== this.props.value;}});module.exports = HeaderCell; /***/}, /* 30 */function(module,exports,__webpack_require__){ /* WEBPACK VAR INJECTION */(function(process){ /**
		 * Copyright 2013-2015, Facebook, Inc.
		 * All rights reserved.
		 *
		 * This source code is licensed under the BSD-style license found in the
		 * LICENSE file in the root directory of this source tree. An additional grant
		 * of patent rights can be found in the PATENTS file in the same directory.
		 *
		 * @typechecks static-only
		 * @providesModule cloneWithProps
		 */'use strict';var ReactElement=__webpack_require__(32);var ReactPropTransferer=__webpack_require__(39);var keyOf=__webpack_require__(41);var warning=__webpack_require__(36);var CHILDREN_PROP=keyOf({children:null}); /**
		 * Sometimes you want to change the props of a child passed to you. Usually
		 * this is to add a CSS class.
		 *
		 * @param {ReactElement} child child element you'd like to clone
		 * @param {object} props props you'd like to modify. className and style will be
		 * merged automatically.
		 * @return {ReactElement} a clone of child with props merged in.
		 */function cloneWithProps(child,props){if("production" !== process.env.NODE_ENV){"production" !== process.env.NODE_ENV?warning(!child.ref,'You are calling cloneWithProps() on a child with a ref. This is ' + 'dangerous because you\'re creating a new child which will not be ' + 'added as a ref to its parent.'):null;}var newProps=ReactPropTransferer.mergeProps(props,child.props); // Use `child.props.children` if it is provided.
	if(!newProps.hasOwnProperty(CHILDREN_PROP) && child.props.hasOwnProperty(CHILDREN_PROP)){newProps.children = child.props.children;} // The current API doesn't retain _owner and _context, which is why this
	// doesn't use ReactElement.cloneAndReplaceProps.
	return ReactElement.createElement(child.type,newProps);}module.exports = cloneWithProps; /* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(31)); /***/}, /* 31 */function(module,exports){ // shim for using process in browser
	var process=module.exports = {};var queue=[];var draining=false;var currentQueue;var queueIndex=-1;function cleanUpNextTick(){draining = false;if(currentQueue.length){queue = currentQueue.concat(queue);}else {queueIndex = -1;}if(queue.length){drainQueue();}}function drainQueue(){if(draining){return;}var timeout=setTimeout(cleanUpNextTick);draining = true;var len=queue.length;while(len) {currentQueue = queue;queue = [];while(++queueIndex < len) {if(currentQueue){currentQueue[queueIndex].run();}}queueIndex = -1;len = queue.length;}currentQueue = null;draining = false;clearTimeout(timeout);}process.nextTick = function(fun){var args=new Array(arguments.length - 1);if(arguments.length > 1){for(var i=1;i < arguments.length;i++) {args[i - 1] = arguments[i];}}queue.push(new Item(fun,args));if(queue.length === 1 && !draining){setTimeout(drainQueue,0);}}; // v8 likes predictible objects
	function Item(fun,array){this.fun = fun;this.array = array;}Item.prototype.run = function(){this.fun.apply(null,this.array);};process.title = 'browser';process.browser = true;process.env = {};process.argv = [];process.version = ''; // empty string to avoid regexp issues
	process.versions = {};function noop(){}process.on = noop;process.addListener = noop;process.once = noop;process.off = noop;process.removeListener = noop;process.removeAllListeners = noop;process.emit = noop;process.binding = function(name){throw new Error('process.binding is not supported');};process.cwd = function(){return '/';};process.chdir = function(dir){throw new Error('process.chdir is not supported');};process.umask = function(){return 0;}; /***/}, /* 32 */function(module,exports,__webpack_require__){ /* WEBPACK VAR INJECTION */(function(process){ /**
		 * Copyright 2014-2015, Facebook, Inc.
		 * All rights reserved.
		 *
		 * This source code is licensed under the BSD-style license found in the
		 * LICENSE file in the root directory of this source tree. An additional grant
		 * of patent rights can be found in the PATENTS file in the same directory.
		 *
		 * @providesModule ReactElement
		 */'use strict';var ReactContext=__webpack_require__(33);var ReactCurrentOwner=__webpack_require__(38);var assign=__webpack_require__(34);var warning=__webpack_require__(36);var RESERVED_PROPS={key:true,ref:true}; /**
		 * Warn for mutations.
		 *
		 * @internal
		 * @param {object} object
		 * @param {string} key
		 */function defineWarningProperty(object,key){_Object$defineProperty2(object,key,{configurable:false,enumerable:true,get:function get(){if(!this._store){return null;}return this._store[key];},set:function set(value){"production" !== process.env.NODE_ENV?warning(false,'Don\'t set the %s property of the React element. Instead, ' + 'specify the correct value when initially creating the element.',key):null;this._store[key] = value;}});} /**
		 * This is updated to true if the membrane is successfully created.
		 */var useMutationMembrane=false; /**
		 * Warn for mutations.
		 *
		 * @internal
		 * @param {object} element
		 */function defineMutationMembrane(prototype){try{var pseudoFrozenProperties={props:true};for(var key in pseudoFrozenProperties) {defineWarningProperty(prototype,key);}useMutationMembrane = true;}catch(x) { // IE will fail on defineProperty
	}} /**
		 * Base constructor for all React elements. This is only used to make this
		 * work with a dynamic instanceof check. Nothing should live on this prototype.
		 *
		 * @param {*} type
		 * @param {string|object} ref
		 * @param {*} key
		 * @param {*} props
		 * @internal
		 */var ReactElement=function ReactElement(type,key,ref,owner,context,props){ // Built-in properties that belong on the element
	this.type = type;this.key = key;this.ref = ref; // Record the component responsible for creating this element.
	this._owner = owner; // TODO: Deprecate withContext, and then the context becomes accessible
	// through the owner.
	this._context = context;if("production" !== process.env.NODE_ENV){ // The validation flag and props are currently mutative. We put them on
	// an external backing store so that we can freeze the whole object.
	// This can be replaced with a WeakMap once they are implemented in
	// commonly used development environments.
	this._store = {props:props,originalProps:assign({},props)}; // To make comparing ReactElements easier for testing purposes, we make
	// the validation flag non-enumerable (where possible, which should
	// include every environment we run tests in), so the test framework
	// ignores it.
	try{Object.defineProperty(this._store,'validated',{configurable:false,enumerable:false,writable:true});}catch(x) {}this._store.validated = false; // We're not allowed to set props directly on the object so we early
	// return and rely on the prototype membrane to forward to the backing
	// store.
	if(useMutationMembrane){_Object$freeze(this);return;}}this.props = props;}; // We intentionally don't expose the function on the constructor property.
	// ReactElement should be indistinguishable from a plain object.
	ReactElement.prototype = {_isReactElement:true};if("production" !== process.env.NODE_ENV){defineMutationMembrane(ReactElement.prototype);}ReactElement.createElement = function(type,config,children){var propName; // Reserved names are extracted
	var props={};var key=null;var ref=null;if(config != null){ref = config.ref === undefined?null:config.ref;key = config.key === undefined?null:'' + config.key; // Remaining properties are added to a new props object
	for(propName in config) {if(config.hasOwnProperty(propName) && !RESERVED_PROPS.hasOwnProperty(propName)){props[propName] = config[propName];}}} // Children can be more than one argument, and those are transferred onto
	// the newly allocated props object.
	var childrenLength=arguments.length - 2;if(childrenLength === 1){props.children = children;}else if(childrenLength > 1){var childArray=Array(childrenLength);for(var i=0;i < childrenLength;i++) {childArray[i] = arguments[i + 2];}props.children = childArray;} // Resolve default props
	if(type && type.defaultProps){var defaultProps=type.defaultProps;for(propName in defaultProps) {if(typeof props[propName] === 'undefined'){props[propName] = defaultProps[propName];}}}return new ReactElement(type,key,ref,ReactCurrentOwner.current,ReactContext.current,props);};ReactElement.createFactory = function(type){var factory=ReactElement.createElement.bind(null,type); // Expose the type on the factory and the prototype so that it can be
	// easily accessed on elements. E.g. <Foo />.type === Foo.type.
	// This should not be named `constructor` since this may not be the function
	// that created the element, and it may not even be a constructor.
	// Legacy hook TODO: Warn if this is accessed
	factory.type = type;return factory;};ReactElement.cloneAndReplaceProps = function(oldElement,newProps){var newElement=new ReactElement(oldElement.type,oldElement.key,oldElement.ref,oldElement._owner,oldElement._context,newProps);if("production" !== process.env.NODE_ENV){ // If the key on the original is valid, then the clone is valid
	newElement._store.validated = oldElement._store.validated;}return newElement;};ReactElement.cloneElement = function(element,config,children){var propName; // Original props are copied
	var props=assign({},element.props); // Reserved names are extracted
	var key=element.key;var ref=element.ref; // Owner will be preserved, unless ref is overridden
	var owner=element._owner;if(config != null){if(config.ref !== undefined){ // Silently steal the ref from the parent.
	ref = config.ref;owner = ReactCurrentOwner.current;}if(config.key !== undefined){key = '' + config.key;} // Remaining properties override existing props
	for(propName in config) {if(config.hasOwnProperty(propName) && !RESERVED_PROPS.hasOwnProperty(propName)){props[propName] = config[propName];}}} // Children can be more than one argument, and those are transferred onto
	// the newly allocated props object.
	var childrenLength=arguments.length - 2;if(childrenLength === 1){props.children = children;}else if(childrenLength > 1){var childArray=Array(childrenLength);for(var i=0;i < childrenLength;i++) {childArray[i] = arguments[i + 2];}props.children = childArray;}return new ReactElement(element.type,key,ref,owner,element._context,props);}; /**
		 * @param {?object} object
		 * @return {boolean} True if `object` is a valid component.
		 * @final
		 */ReactElement.isValidElement = function(object){ // ReactTestUtils is often used outside of beforeEach where as React is
	// within it. This leads to two different instances of React on the same
	// page. To identify a element from a different React instance we use
	// a flag instead of an instanceof check.
	var isElement=!!(object && object._isReactElement); // if (isElement && !(object instanceof ReactElement)) {
	// This is an indicator that you're using multiple versions of React at the
	// same time. This will screw with ownership and stuff. Fix it, please.
	// TODO: We could possibly warn here.
	// }
	return isElement;};module.exports = ReactElement; /* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(31)); /***/}, /* 33 */function(module,exports,__webpack_require__){ /* WEBPACK VAR INJECTION */(function(process){ /**
		 * Copyright 2013-2015, Facebook, Inc.
		 * All rights reserved.
		 *
		 * This source code is licensed under the BSD-style license found in the
		 * LICENSE file in the root directory of this source tree. An additional grant
		 * of patent rights can be found in the PATENTS file in the same directory.
		 *
		 * @providesModule ReactContext
		 */'use strict';var assign=__webpack_require__(34);var emptyObject=__webpack_require__(35);var warning=__webpack_require__(36);var didWarn=false; /**
		 * Keeps track of the current context.
		 *
		 * The context is automatically passed down the component ownership hierarchy
		 * and is accessible via `this.context` on ReactCompositeComponents.
		 */var ReactContext={ /**
		   * @internal
		   * @type {object}
		   */current:emptyObject, /**
		   * Temporarily extends the current context while executing scopedCallback.
		   *
		   * A typical use case might look like
		   *
		   *  render: function() {
		   *    var children = ReactContext.withContext({foo: 'foo'}, () => (
		   *
		   *    ));
		   *    return <div>{children}</div>;
		   *  }
		   *
		   * @param {object} newContext New context to merge into the existing context
		   * @param {function} scopedCallback Callback to run with the new context
		   * @return {ReactComponent|array<ReactComponent>}
		   */withContext:function withContext(newContext,scopedCallback){if("production" !== process.env.NODE_ENV){"production" !== process.env.NODE_ENV?warning(didWarn,'withContext is deprecated and will be removed in a future version. ' + 'Use a wrapper component with getChildContext instead.'):null;didWarn = true;}var result;var previousContext=ReactContext.current;ReactContext.current = assign({},previousContext,newContext);try{result = scopedCallback();}finally {ReactContext.current = previousContext;}return result;}};module.exports = ReactContext; /* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(31)); /***/}, /* 34 */function(module,exports){ /**
		 * Copyright 2014-2015, Facebook, Inc.
		 * All rights reserved.
		 *
		 * This source code is licensed under the BSD-style license found in the
		 * LICENSE file in the root directory of this source tree. An additional grant
		 * of patent rights can be found in the PATENTS file in the same directory.
		 *
		 * @providesModule Object.assign
		 */ // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.assign
	'use strict';function assign(target,sources){if(target == null){throw new TypeError('Object.assign target cannot be null or undefined');}var to=Object(target);var hasOwnProperty=Object.prototype.hasOwnProperty;for(var nextIndex=1;nextIndex < arguments.length;nextIndex++) {var nextSource=arguments[nextIndex];if(nextSource == null){continue;}var from=Object(nextSource); // We don't currently support accessors nor proxies. Therefore this
	// copy cannot throw. If we ever supported this then we must handle
	// exceptions and side-effects. We don't support symbols so they won't
	// be transferred.
	for(var key in from) {if(hasOwnProperty.call(from,key)){to[key] = from[key];}}}return to;}module.exports = assign; /***/}, /* 35 */function(module,exports,__webpack_require__){ /* WEBPACK VAR INJECTION */(function(process){ /**
		 * Copyright 2013-2015, Facebook, Inc.
		 * All rights reserved.
		 *
		 * This source code is licensed under the BSD-style license found in the
		 * LICENSE file in the root directory of this source tree. An additional grant
		 * of patent rights can be found in the PATENTS file in the same directory.
		 *
		 * @providesModule emptyObject
		 */"use strict";var emptyObject={};if("production" !== process.env.NODE_ENV){_Object$freeze(emptyObject);}module.exports = emptyObject; /* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(31)); /***/}, /* 36 */function(module,exports,__webpack_require__){ /* WEBPACK VAR INJECTION */(function(process){ /**
		 * Copyright 2014-2015, Facebook, Inc.
		 * All rights reserved.
		 *
		 * This source code is licensed under the BSD-style license found in the
		 * LICENSE file in the root directory of this source tree. An additional grant
		 * of patent rights can be found in the PATENTS file in the same directory.
		 *
		 * @providesModule warning
		 */"use strict";var emptyFunction=__webpack_require__(37); /**
		 * Similar to invariant but only logs a warning if the condition is not met.
		 * This can be used to log issues in development environments in critical
		 * paths. Removing the logging code for production environments will keep the
		 * same logic and follow the same code paths.
		 */var warning=emptyFunction;if("production" !== process.env.NODE_ENV){warning = function(condition,format){for(var args=[],$__0=2,$__1=arguments.length;$__0 < $__1;$__0++) args.push(arguments[$__0]);if(format === undefined){throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');}if(format.length < 10 || /^[s\W]*$/.test(format)){throw new Error('The warning format should be able to uniquely identify this ' + 'warning. Please, use a more descriptive format than: ' + format);}if(format.indexOf('Failed Composite propType: ') === 0){return; // Ignore CompositeComponent proptype check.
	}if(!condition){var argIndex=0;var message='Warning: ' + format.replace(/%s/g,function(){return args[argIndex++];});console.warn(message);try{ // --- Welcome to debugging React ---
	// This error was thrown as a convenience so that you can use this stack
	// to find the callsite that caused this warning to fire.
	throw new Error(message);}catch(x) {}}};}module.exports = warning; /* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(31)); /***/}, /* 37 */function(module,exports){ /**
		 * Copyright 2013-2015, Facebook, Inc.
		 * All rights reserved.
		 *
		 * This source code is licensed under the BSD-style license found in the
		 * LICENSE file in the root directory of this source tree. An additional grant
		 * of patent rights can be found in the PATENTS file in the same directory.
		 *
		 * @providesModule emptyFunction
		 */function makeEmptyFunction(arg){return function(){return arg;};} /**
		 * This function accepts and discards inputs; it has no side effects. This is
		 * primarily useful idiomatically for overridable function endpoints which
		 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
		 */function emptyFunction(){}emptyFunction.thatReturns = makeEmptyFunction;emptyFunction.thatReturnsFalse = makeEmptyFunction(false);emptyFunction.thatReturnsTrue = makeEmptyFunction(true);emptyFunction.thatReturnsNull = makeEmptyFunction(null);emptyFunction.thatReturnsThis = function(){return this;};emptyFunction.thatReturnsArgument = function(arg){return arg;};module.exports = emptyFunction; /***/}, /* 38 */function(module,exports){ /**
		 * Copyright 2013-2015, Facebook, Inc.
		 * All rights reserved.
		 *
		 * This source code is licensed under the BSD-style license found in the
		 * LICENSE file in the root directory of this source tree. An additional grant
		 * of patent rights can be found in the PATENTS file in the same directory.
		 *
		 * @providesModule ReactCurrentOwner
		 */'use strict'; /**
		 * Keeps track of the current owner.
		 *
		 * The current owner is the component who should own any components that are
		 * currently being constructed.
		 *
		 * The depth indicate how many composite components are above this render level.
		 */var ReactCurrentOwner={ /**
		   * @internal
		   * @type {ReactComponent}
		   */current:null};module.exports = ReactCurrentOwner; /***/}, /* 39 */function(module,exports,__webpack_require__){ /**
		 * Copyright 2013-2015, Facebook, Inc.
		 * All rights reserved.
		 *
		 * This source code is licensed under the BSD-style license found in the
		 * LICENSE file in the root directory of this source tree. An additional grant
		 * of patent rights can be found in the PATENTS file in the same directory.
		 *
		 * @providesModule ReactPropTransferer
		 */'use strict';var assign=__webpack_require__(34);var emptyFunction=__webpack_require__(37);var joinClasses=__webpack_require__(40); /**
		 * Creates a transfer strategy that will merge prop values using the supplied
		 * `mergeStrategy`. If a prop was previously unset, this just sets it.
		 *
		 * @param {function} mergeStrategy
		 * @return {function}
		 */function createTransferStrategy(mergeStrategy){return function(props,key,value){if(!props.hasOwnProperty(key)){props[key] = value;}else {props[key] = mergeStrategy(props[key],value);}};}var transferStrategyMerge=createTransferStrategy(function(a,b){ // `merge` overrides the first object's (`props[key]` above) keys using the
	// second object's (`value`) keys. An object's style's existing `propA` would
	// get overridden. Flip the order here.
	return assign({},b,a);}); /**
		 * Transfer strategies dictate how props are transferred by `transferPropsTo`.
		 * NOTE: if you add any more exceptions to this list you should be sure to
		 * update `cloneWithProps()` accordingly.
		 */var TransferStrategies={ /**
		   * Never transfer `children`.
		   */children:emptyFunction, /**
		   * Transfer the `className` prop by merging them.
		   */className:createTransferStrategy(joinClasses), /**
		   * Transfer the `style` prop (which is an object) by merging them.
		   */style:transferStrategyMerge}; /**
		 * Mutates the first argument by transferring the properties from the second
		 * argument.
		 *
		 * @param {object} props
		 * @param {object} newProps
		 * @return {object}
		 */function transferInto(props,newProps){for(var thisKey in newProps) {if(!newProps.hasOwnProperty(thisKey)){continue;}var transferStrategy=TransferStrategies[thisKey];if(transferStrategy && TransferStrategies.hasOwnProperty(thisKey)){transferStrategy(props,thisKey,newProps[thisKey]);}else if(!props.hasOwnProperty(thisKey)){props[thisKey] = newProps[thisKey];}}return props;} /**
		 * ReactPropTransferer are capable of transferring props to another component
		 * using a `transferPropsTo` method.
		 *
		 * @class ReactPropTransferer
		 */var ReactPropTransferer={ /**
		   * Merge two props objects using TransferStrategies.
		   *
		   * @param {object} oldProps original props (they take precedence)
		   * @param {object} newProps new props to merge in
		   * @return {object} a new object containing both sets of props merged.
		   */mergeProps:function mergeProps(oldProps,newProps){return transferInto(assign({},oldProps),newProps);}};module.exports = ReactPropTransferer; /***/}, /* 40 */function(module,exports){ /**
		 * Copyright 2013-2015, Facebook, Inc.
		 * All rights reserved.
		 *
		 * This source code is licensed under the BSD-style license found in the
		 * LICENSE file in the root directory of this source tree. An additional grant
		 * of patent rights can be found in the PATENTS file in the same directory.
		 *
		 * @providesModule joinClasses
		 * @typechecks static-only
		 */'use strict'; /**
		 * Combines multiple className strings into one.
		 * http://jsperf.com/joinclasses-args-vs-array
		 *
		 * @param {...?string} classes
		 * @return {string}
		 */function joinClasses(className /*, ... */){if(!className){className = '';}var nextClass;var argLength=arguments.length;if(argLength > 1){for(var ii=1;ii < argLength;ii++) {nextClass = arguments[ii];if(nextClass){className = (className?className + ' ':'') + nextClass;}}}return className;}module.exports = joinClasses; /***/}, /* 41 */function(module,exports){ /**
		 * Copyright 2013-2015, Facebook, Inc.
		 * All rights reserved.
		 *
		 * This source code is licensed under the BSD-style license found in the
		 * LICENSE file in the root directory of this source tree. An additional grant
		 * of patent rights can be found in the PATENTS file in the same directory.
		 *
		 * @providesModule keyOf
		 */ /**
		 * Allows extraction of a minified key. Let's the build system minify keys
		 * without loosing the ability to dynamically use key strings as values
		 * themselves. Pass in an object with a single key/val pair and it will return
		 * you the string key of that single record. Suppose you want to grab the
		 * value for a key 'className' inside of an object. Key/val minification may
		 * have aliased that key to be 'xa12'. keyOf({className: null}) will return
		 * 'xa12' in that case. Resolve keys you want to use once at startup time, then
		 * reuse those resolutions.
		 */var keyOf=function keyOf(oneKeyObj){var key;for(key in oneKeyObj) {if(!oneKeyObj.hasOwnProperty(key)){continue;}return key;}return null;};module.exports = keyOf; /***/}, /* 42 */function(module,exports,__webpack_require__){'use strict';var _classCallCheck=__webpack_require__(43)['default'];var React=__webpack_require__(18);var ExcelColumn=function ExcelColumn(){_classCallCheck(this,ExcelColumn);};var ExcelColumnShape={name:React.PropTypes.string.isRequired,key:React.PropTypes.string.isRequired,width:React.PropTypes.number.isRequired};module.exports = ExcelColumnShape; /***/}, /* 43 */function(module,exports){"use strict";exports["default"] = function(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}};exports.__esModule = true; /***/}, /* 44 */function(module,exports,__webpack_require__){'use strict';var _extends=__webpack_require__(2)['default'];var React=__webpack_require__(18);var joinClasses=__webpack_require__(21);var Draggable=__webpack_require__(45);var cloneWithProps=__webpack_require__(30);var PropTypes=React.PropTypes;var ResizeHandle=React.createClass({displayName:'ResizeHandle',style:{position:'absolute',top:0,right:0,width:6,height:'100%'},render:function render(){return React.createElement(Draggable,_extends({},this.props,{className:'react-grid-HeaderCell__resizeHandle',style:this.style}));}});module.exports = ResizeHandle; /***/}, /* 45 */function(module,exports,__webpack_require__){ /*  need   */ /**
		 * @jsx React.DOM


		 */'use strict';var _extends=__webpack_require__(2)['default'];var React=__webpack_require__(18);var PropTypes=React.PropTypes;var emptyFunction=__webpack_require__(37);var Draggable=React.createClass({displayName:'Draggable',propTypes:{onDragStart:PropTypes.func,onDragEnd:PropTypes.func,onDrag:PropTypes.func,component:PropTypes.oneOfType([PropTypes.func,PropTypes.constructor])},render:function render(){var Component=this.props.component;return React.createElement('div',_extends({},this.props,{onMouseDown:this.onMouseDown,className:'react-grid-HeaderCell__draggable'}));},getDefaultProps:function getDefaultProps(){return {onDragStart:emptyFunction.thatReturnsTrue,onDragEnd:emptyFunction,onDrag:emptyFunction};},getInitialState:function getInitialState(){return {drag:null};},onMouseDown:function onMouseDown(e){var drag=this.props.onDragStart(e);if(drag === null && e.button !== 0){return;}window.addEventListener('mouseup',this.onMouseUp);window.addEventListener('mousemove',this.onMouseMove);this.setState({drag:drag});},onMouseMove:function onMouseMove(e){if(this.state.drag === null){return;}if(e.preventDefault){e.preventDefault();}this.props.onDrag(e);},onMouseUp:function onMouseUp(e){this.cleanUp();this.props.onDragEnd(e,this.state.drag);this.setState({drag:null});},componentWillUnmount:function componentWillUnmount(){this.cleanUp();},cleanUp:function cleanUp(){window.removeEventListener('mouseup',this.onMouseUp);window.removeEventListener('mousemove',this.onMouseMove);}});module.exports = Draggable; /***/}, /* 46 */function(module,exports,__webpack_require__){ /**
		 * @jsx React.DOM


		 */'use strict';var React=__webpack_require__(18);var joinClasses=__webpack_require__(21);var ExcelColumn=__webpack_require__(42);var DEFINE_SORT={ASC:'ASC',DESC:'DESC',NONE:'NONE'};var SortableHeaderCell=React.createClass({displayName:'SortableHeaderCell',propTypes:{columnKey:React.PropTypes.string.isRequired,onSort:React.PropTypes.func.isRequired,sortDirection:React.PropTypes.oneOf(['ASC','DESC','NONE'])},onClick:function onClick(){var direction;switch(this.props.sortDirection){case null:case undefined:case DEFINE_SORT.NONE:direction = DEFINE_SORT.ASC;break;case DEFINE_SORT.ASC:direction = DEFINE_SORT.DESC;break;case DEFINE_SORT.DESC:direction = DEFINE_SORT.NONE;break;}this.props.onSort(this.props.columnKey,direction);},getSortByText:function getSortByText(){var unicodeKeys={'ASC':'9650','DESC':'9660','NONE':''};return String.fromCharCode(unicodeKeys[this.props.sortDirection]);},render:function render(){var className=joinClasses({'react-grid-HeaderCell-sortable':true,'react-grid-HeaderCell-sortable--ascending':this.props.sortDirection === 'ASC','react-grid-HeaderCell-sortable--descending':this.props.sortDirection === 'DESC'});return React.createElement('div',{className:className,onClick:this.onClick,style:{cursor:'pointer'}},this.props.column.name,React.createElement('span',{className:'pull-right'},this.getSortByText()));}});module.exports = SortableHeaderCell; /***/}, /* 47 */function(module,exports,__webpack_require__){ /**
		 * @jsx React.DOM


		 */'use strict';var React=__webpack_require__(18);var Canvas=__webpack_require__(48);var PropTypes=React.PropTypes;var ViewportScroll=__webpack_require__(76);var Viewport=React.createClass({displayName:'Viewport',mixins:[ViewportScroll],propTypes:{rowOffsetHeight:PropTypes.number.isRequired,totalWidth:PropTypes.number.isRequired,columnMetrics:PropTypes.object.isRequired,rowGetter:PropTypes.oneOfType([PropTypes.array,PropTypes.func]).isRequired,selectedRows:PropTypes.array,expandedRows:PropTypes.array,rowRenderer:PropTypes.func,rowsCount:PropTypes.number.isRequired,rowHeight:PropTypes.number.isRequired,onRows:PropTypes.func,onScroll:PropTypes.func,minHeight:PropTypes.number},render:function render(){var style={padding:0,bottom:0,left:0,right:0,overflow:'hidden',position:'absolute',top:this.props.rowOffsetHeight};return React.createElement('div',{className:'react-grid-Viewport',style:style},React.createElement(Canvas,{ref:'canvas',totalWidth:this.props.totalWidth,width:this.props.columnMetrics.width,rowGetter:this.props.rowGetter,rowsCount:this.props.rowsCount,selectedRows:this.props.selectedRows,expandedRows:this.props.expandedRows,columns:this.props.columnMetrics.columns,rowRenderer:this.props.rowRenderer,visibleStart:this.state.visibleStart,visibleEnd:this.state.visibleEnd,displayStart:this.state.displayStart,displayEnd:this.state.displayEnd,cellMetaData:this.props.cellMetaData,height:this.state.height,rowHeight:this.props.rowHeight,onScroll:this.onScroll,onRows:this.props.onRows}));},getScroll:function getScroll(){return this.refs.canvas.getScroll();},onScroll:function onScroll(scroll){this.updateScroll(scroll.scrollTop,scroll.scrollLeft,this.state.height,this.props.rowHeight,this.props.rowsCount);if(this.props.onScroll){this.props.onScroll({scrollTop:scroll.scrollTop,scrollLeft:scroll.scrollLeft});}},setScrollLeft:function setScrollLeft(scrollLeft){this.refs.canvas.setScrollLeft(scrollLeft);}});module.exports = Viewport; /***/}, /* 48 */function(module,exports,__webpack_require__){ /**
		 * @jsx React.DOM
		 */"use strict";var React=__webpack_require__(18);var joinClasses=__webpack_require__(21);var PropTypes=React.PropTypes;var cloneWithProps=__webpack_require__(30);var shallowEqual=__webpack_require__(28);var emptyFunction=__webpack_require__(37);var ScrollShim=__webpack_require__(49);var Row=__webpack_require__(50);var ExcelColumn=__webpack_require__(42);var Canvas=React.createClass({displayName:'Canvas',mixins:[ScrollShim],propTypes:{rowRenderer:PropTypes.oneOfType([PropTypes.func,PropTypes.element]),rowHeight:PropTypes.number.isRequired,height:PropTypes.number.isRequired,displayStart:PropTypes.number.isRequired,displayEnd:PropTypes.number.isRequired,rowsCount:PropTypes.number.isRequired,rowGetter:PropTypes.oneOfType([PropTypes.func.isRequired,PropTypes.array.isRequired]),onRows:PropTypes.func,columns:PropTypes.oneOfType([PropTypes.object,PropTypes.array]).isRequired},render:function render(){var _this=this;var displayStart=this.state.displayStart;var displayEnd=this.state.displayEnd;var rowHeight=this.props.rowHeight;var length=this.props.rowsCount;var rows=this.getRows(displayStart,displayEnd).map(function(row,idx){return _this.renderRow({key:displayStart + idx,ref:idx,idx:displayStart + idx,row:row,height:rowHeight,columns:_this.props.columns,isSelected:_this.isRowSelected(displayStart + idx),expandedRows:_this.props.expandedRows,cellMetaData:_this.props.cellMetaData});});this._currentRowsLength = rows.length;if(displayStart > 0){rows.unshift(this.renderPlaceholder('top',displayStart * rowHeight));}if(length - displayEnd > 0){rows.push(this.renderPlaceholder('bottom',(length - displayEnd) * rowHeight));}var style={position:'absolute',top:0,left:0,overflowX:'auto',overflowY:'scroll',width:this.props.totalWidth + this.state.scrollbarWidth,height:this.props.height,transform:'translate3d(0, 0, 0)'};return React.createElement('div',{style:style,onScroll:this.onScroll,className:joinClasses("react-grid-Canvas",this.props.className,{opaque:this.props.cellMetaData.selected && this.props.cellMetaData.selected.active})},React.createElement('div',{style:{width:this.props.width,overflow:'hidden'}},rows));},renderRow:function renderRow(props){var RowsRenderer=this.props.rowRenderer;if(typeof RowsRenderer === 'function'){return React.createElement(RowsRenderer,props);}else if(React.isValidElement(this.props.rowRenderer)){return cloneWithProps(this.props.rowRenderer,props);}},renderPlaceholder:function renderPlaceholder(key,height){return React.createElement('div',{key:key,style:{height:height}},this.props.columns.map(function(column,idx){return React.createElement('div',{style:{width:column.width},key:idx});}));},getDefaultProps:function getDefaultProps(){return {rowRenderer:Row,onRows:emptyFunction};},isRowSelected:function isRowSelected(rowIdx){return this.props.selectedRows && this.props.selectedRows[rowIdx] === true;},_currentRowsLength:0,_currentRowsRange:{start:0,end:0},_scroll:{scrollTop:0,scrollLeft:0},getInitialState:function getInitialState(){return {shouldUpdate:true,displayStart:this.props.displayStart,displayEnd:this.props.displayEnd,scrollbarWidth:0};},componentWillMount:function componentWillMount(){this._currentRowsLength = 0;this._currentRowsRange = {start:0,end:0};this._scroll = {scrollTop:0,scrollLeft:0};},componentDidMount:function componentDidMount(){this.onRows();},componentDidUpdate:function componentDidUpdate(nextProps){if(this._scroll.scrollTop !== 0 && this._scroll.scrollLeft !== 0){this.setScrollLeft(this._scroll.scrollLeft);}this.onRows();},componentWillUnmount:function componentWillUnmount(){this._currentRowsLength = 0;this._currentRowsRange = {start:0,end:0};this._scroll = {scrollTop:0,scrollLeft:0};},componentWillReceiveProps:function componentWillReceiveProps(nextProps){if(nextProps.rowsCount > this.props.rowsCount){React.findDOMNode(this).scrollTop = nextProps.rowsCount * this.props.rowHeight;}var scrollbarWidth=this.getScrollbarWidth();var shouldUpdate=!(nextProps.visibleStart > this.state.displayStart && nextProps.visibleEnd < this.state.displayEnd) || nextProps.rowsCount !== this.props.rowsCount || nextProps.rowHeight !== this.props.rowHeight || nextProps.columns !== this.props.columns || nextProps.width !== this.props.width || nextProps.cellMetaData !== this.props.cellMetaData || !shallowEqual(nextProps.style,this.props.style);if(shouldUpdate){this.setState({shouldUpdate:true,displayStart:nextProps.displayStart,displayEnd:nextProps.displayEnd,scrollbarWidth:scrollbarWidth});}else {this.setState({shouldUpdate:false,scrollbarWidth:scrollbarWidth});}},shouldComponentUpdate:function shouldComponentUpdate(nextProps,nextState){return !nextState || nextState.shouldUpdate;},onRows:function onRows(){if(this._currentRowsRange !== {start:0,end:0}){this.props.onRows(this._currentRowsRange);this._currentRowsRange = {start:0,end:0};}},getRows:function getRows(displayStart,displayEnd){this._currentRowsRange = {start:displayStart,end:displayEnd};if(Array.isArray(this.props.rowGetter)){return this.props.rowGetter.slice(displayStart,displayEnd);}else {var rows=[];for(var i=displayStart;i < displayEnd;i++) {rows.push(this.props.rowGetter(i));}return rows;}},getScrollbarWidth:function getScrollbarWidth(){var scrollbarWidth=0; // Get the scrollbar width
	var canvas=this.getDOMNode();scrollbarWidth = canvas.offsetWidth - canvas.clientWidth;return scrollbarWidth;},setScrollLeft:function setScrollLeft(scrollLeft){if(this._currentRowsLength !== 0){if(!this.refs)return;for(var i=0,len=this._currentRowsLength;i < len;i++) {if(this.refs[i] && this.refs[i].setScrollLeft){this.refs[i].setScrollLeft(scrollLeft);}}}},getScroll:function getScroll(){var _React$findDOMNode=React.findDOMNode(this);var scrollTop=_React$findDOMNode.scrollTop;var scrollLeft=_React$findDOMNode.scrollLeft;return {scrollTop:scrollTop,scrollLeft:scrollLeft};},onScroll:function onScroll(e){this.appendScrollShim();var _e$target=e.target;var scrollTop=_e$target.scrollTop;var scrollLeft=_e$target.scrollLeft;var scroll={scrollTop:scrollTop,scrollLeft:scrollLeft};this._scroll = scroll;this.props.onScroll(scroll);}});module.exports = Canvas; /***/}, /* 49 */function(module,exports,__webpack_require__){ /* TODO mixin not compatible and HTMLElement classList */ /**
		 * @jsx React.DOM


		 */'use strict';var React=__webpack_require__(18);var ScrollShim={appendScrollShim:function appendScrollShim(){if(!this._scrollShim){var size=this._scrollShimSize();var shim=document.createElement('div');if(shim.classList){shim.classList.add('react-grid-ScrollShim'); //flow - not compatible with HTMLElement
	}else {shim.className += ' react-grid-ScrollShim';}shim.style.position = 'absolute';shim.style.top = 0;shim.style.left = 0;shim.style.width = size.width + 'px';shim.style.height = size.height + 'px';React.findDOMNode(this).appendChild(shim);this._scrollShim = shim;}this._scheduleRemoveScrollShim();},_scrollShimSize:function _scrollShimSize(){return {width:this.props.width,height:this.props.length * this.props.rowHeight};},_scheduleRemoveScrollShim:function _scheduleRemoveScrollShim(){if(this._scheduleRemoveScrollShimTimer){clearTimeout(this._scheduleRemoveScrollShimTimer);}this._scheduleRemoveScrollShimTimer = setTimeout(this._removeScrollShim,200);},_removeScrollShim:function _removeScrollShim(){if(this._scrollShim){this._scrollShim.parentNode.removeChild(this._scrollShim);this._scrollShim = undefined;}}};module.exports = ScrollShim; /***/}, /* 50 */function(module,exports,__webpack_require__){ /**
		 * @jsx React.DOM


		 */'use strict';var _extends=__webpack_require__(2)['default'];var React=__webpack_require__(18);var joinClasses=__webpack_require__(21);var Cell=__webpack_require__(51);var ColumnMetrics=__webpack_require__(23);var ColumnUtilsMixin=__webpack_require__(25);var Row=React.createClass({displayName:'Row',propTypes:{height:React.PropTypes.number.isRequired,columns:React.PropTypes.oneOfType([React.PropTypes.object,React.PropTypes.array]).isRequired,row:React.PropTypes.object.isRequired,cellRenderer:React.PropTypes.func,isSelected:React.PropTypes.bool,idx:React.PropTypes.number.isRequired,expandedRows:React.PropTypes.arrayOf(React.PropTypes.object)},mixins:[ColumnUtilsMixin],render:function render(){var className=joinClasses('react-grid-Row','react-grid-Row--' + (this.props.idx % 2 === 0?'even':'odd'));var style={height:this.getRowHeight(this.props),overflow:'hidden'};var cells=this.getCells();return React.createElement('div',_extends({},this.props,{className:className,style:style,onDragEnter:this.handleDragEnter}),React.isValidElement(this.props.row)?this.props.row:cells);},getCells:function getCells(){var _this=this;var cells=[];var lockedCells=[];var selectedColumn=this.getSelectedColumn();this.props.columns.forEach(function(column,i){var CellRenderer=_this.props.cellRenderer;var cell=React.createElement(CellRenderer,{ref:i,key:column.key + '-' + i,idx:i,rowIdx:_this.props.idx,value:_this.getCellValue(column.key || i),column:column,height:_this.getRowHeight(),formatter:column.formatter,cellMetaData:_this.props.cellMetaData,rowData:_this.props.row,selectedColumn:selectedColumn,isRowSelected:_this.props.isSelected});if(column.locked){lockedCells.push(cell);}else {cells.push(cell);}});return cells.concat(lockedCells);},getRowHeight:function getRowHeight(){var rows=this.props.expandedRows || null;if(rows && this.props.key){var row=rows[this.props.key] || null;if(row){return row.height;}}return this.props.height;},getCellValue:function getCellValue(key){var val;if(key === 'select-row'){return this.props.isSelected;}else if(typeof this.props.row.get === 'function'){val = this.props.row.get(key);}else {val = this.props.row[key];}return val;},renderCell:function renderCell(props){if(typeof this.props.cellRenderer == 'function'){this.props.cellRenderer.call(this,props);}if(React.isValidElement(this.props.cellRenderer)){return cloneWithProps(this.props.cellRenderer,props);}else {return this.props.cellRenderer(props);}},getDefaultProps:function getDefaultProps(){return {cellRenderer:Cell,isSelected:false,height:35};},setScrollLeft:function setScrollLeft(scrollLeft){var _this2=this;this.props.columns.forEach(function(column,i){if(column.locked){if(!_this2.refs[i])return;_this2.refs[i].setScrollLeft(scrollLeft);}});},doesRowContainSelectedCell:function doesRowContainSelectedCell(props){var selected=props.cellMetaData.selected;if(selected && selected.rowIdx === props.idx){return true;}else {return false;}},willRowBeDraggedOver:function willRowBeDraggedOver(props){var dragged=props.cellMetaData.dragged;return dragged != null && (dragged.rowIdx >= 0 || dragged.complete === true);},hasRowBeenCopied:function hasRowBeenCopied(){var copied=this.props.cellMetaData.copied;return copied != null && copied.rowIdx === this.props.idx;},shouldComponentUpdate:function shouldComponentUpdate(nextProps,nextState){return !ColumnMetrics.sameColumns(this.props.columns,nextProps.columns,ColumnMetrics.sameColumn) || this.doesRowContainSelectedCell(this.props) || this.doesRowContainSelectedCell(nextProps) || this.willRowBeDraggedOver(nextProps) || nextProps.row !== this.props.row || this.hasRowBeenCopied() || this.props.isSelected !== nextProps.isSelected || nextProps.height !== this.props.height;},handleDragEnter:function handleDragEnter(){var handleDragEnterRow=this.props.cellMetaData.handleDragEnterRow;if(handleDragEnterRow){handleDragEnterRow(this.props.idx);}},getSelectedColumn:function getSelectedColumn(){var selected=this.props.cellMetaData.selected;if(selected && selected.idx){return this.getColumn(this.props.columns,selected.idx);}}});module.exports = Row; /***/}, /* 51 */function(module,exports,__webpack_require__){ /**
		 * @jsx React.DOM


		 */'use strict';var _extends=__webpack_require__(2)['default'];var React=__webpack_require__(18);var joinClasses=__webpack_require__(21);var cloneWithProps=__webpack_require__(30);var EditorContainer=__webpack_require__(52);var ExcelColumn=__webpack_require__(42);var isFunction=__webpack_require__(74);var CellMetaDataShape=__webpack_require__(75);var Cell=React.createClass({displayName:'Cell',propTypes:{rowIdx:React.PropTypes.number.isRequired,idx:React.PropTypes.number.isRequired,selected:React.PropTypes.shape({idx:React.PropTypes.number.isRequired}),tabIndex:React.PropTypes.number,ref:React.PropTypes.string,column:React.PropTypes.shape(ExcelColumn).isRequired,value:React.PropTypes.oneOfType([React.PropTypes.string,React.PropTypes.number,React.PropTypes.object,React.PropTypes.bool]).isRequired,isExpanded:React.PropTypes.bool,cellMetaData:React.PropTypes.shape(CellMetaDataShape).isRequired,handleDragStart:React.PropTypes.func,className:React.PropTypes.string,rowData:React.PropTypes.object.isRequired},getDefaultProps:function getDefaultProps(){return {tabIndex:-1,ref:"cell",isExpanded:false};},getInitialState:function getInitialState(){return {isRowChanging:false,isCellValueChanging:false};},componentDidMount:function componentDidMount(){this.checkFocus();},componentDidUpdate:function componentDidUpdate(prevProps,prevState){this.checkFocus();var dragged=this.props.cellMetaData.dragged;if(dragged && dragged.complete === true){this.props.cellMetaData.handleTerminateDrag();}if(this.state.isRowChanging && this.props.selectedColumn != null){this.applyUpdateClass();}},componentWillReceiveProps:function componentWillReceiveProps(nextProps){this.setState({isRowChanging:this.props.rowData !== nextProps.rowData,isCellValueChanging:this.props.value !== nextProps.value});},shouldComponentUpdate:function shouldComponentUpdate(nextProps,nextState){return this.props.column.width !== nextProps.column.width || this.props.column.left !== nextProps.column.left || this.props.rowData !== nextProps.rowData || this.props.height !== nextProps.height || this.props.rowIdx !== nextProps.rowIdx || this.isCellSelectionChanging(nextProps) || this.isDraggedCellChanging(nextProps) || this.isCopyCellChanging(nextProps) || this.props.isRowSelected !== nextProps.isRowSelected || this.isSelected();},getStyle:function getStyle(){var style={position:'absolute',width:this.props.column.width,height:this.props.height,left:this.props.column.left};return style;},render:function render(){var style=this.getStyle();var className=this.getCellClass();var cellContent=this.renderCellContent({value:this.props.value,column:this.props.column,rowIdx:this.props.rowIdx,isExpanded:this.props.isExpanded});return React.createElement('div',_extends({},this.props,{className:className,style:style,onClick:this.onCellClick,onDoubleClick:this.onCellDoubleClick}),cellContent,React.createElement('div',{className:'drag-handle',draggable:'true'}));},renderCellContent:function renderCellContent(props){var CellContent;var Formatter=this.getFormatter();if(React.isValidElement(Formatter)){props.dependentValues = this.getFormatterDependencies();CellContent = cloneWithProps(Formatter,props);}else if(isFunction(Formatter)){CellContent = React.createElement(Formatter,{value:this.props.value,dependentValues:this.getFormatterDependencies()});}else {CellContent = React.createElement(SimpleCellFormatter,{value:this.props.value});}return React.createElement('div',{ref:'cell',className:'react-grid-Cell__value'},CellContent,' ',this.props.cellControls);},isColumnSelected:function isColumnSelected(){var meta=this.props.cellMetaData;if(meta == null || meta.selected == null){return false;}return meta.selected && meta.selected.idx === this.props.idx;},isSelected:function isSelected(){var meta=this.props.cellMetaData;if(meta == null || meta.selected == null){return false;}return meta.selected && meta.selected.rowIdx === this.props.rowIdx && meta.selected.idx === this.props.idx;},isActive:function isActive(){var meta=this.props.cellMetaData;if(meta == null || meta.selected == null){return false;}return this.isSelected() && meta.selected.active === true;},isCellSelectionChanging:function isCellSelectionChanging(nextProps){var meta=this.props.cellMetaData;if(meta == null || meta.selected == null){return false;}var nextSelected=nextProps.cellMetaData.selected;if(meta.selected && nextSelected){return this.props.idx === nextSelected.idx || this.props.idx === meta.selected.idx;}else {return true;}},getFormatter:function getFormatter(){var col=this.props.column;if(this.isActive()){return React.createElement(EditorContainer,{rowData:this.getRowData(),rowIdx:this.props.rowIdx,idx:this.props.idx,cellMetaData:this.props.cellMetaData,column:col,height:this.props.height});}else {return this.props.column.formatter;}},getRowData:function getRowData(){return this.props.rowData.toJSON?this.props.rowData.toJSON():this.props.rowData;},getFormatterDependencies:function getFormatterDependencies(){ //clone row data so editor cannot actually change this
	var columnName=this.props.column.ItemId; //convention based method to get corresponding Id or Name of any Name or Id property
	if(typeof this.props.column.getRowMetaData === 'function'){return this.props.column.getRowMetaData(this.getRowData(),this.props.column);}},onCellClick:function onCellClick(e){var meta=this.props.cellMetaData;if(meta != null && meta.onCellClick != null){meta.onCellClick({rowIdx:this.props.rowIdx,idx:this.props.idx});}},onCellDoubleClick:function onCellDoubleClick(e){var meta=this.props.cellMetaData;if(meta != null && meta.onCellDoubleClick != null){meta.onCellDoubleClick({rowIdx:this.props.rowIdx,idx:this.props.idx});}},checkFocus:function checkFocus(){if(this.isSelected() && !this.isActive()){React.findDOMNode(this).focus();}},getCellClass:function getCellClass(){var className=joinClasses(this.props.column.cellClass,'react-grid-Cell',this.props.className,this.props.column.locked?'react-grid-Cell--locked':null);var extraClasses=joinClasses({'selected':this.isSelected() && !this.isActive(),'editing':this.isActive(),'copied':this.isCopied(),'active-drag-cell':this.isSelected() || this.isDraggedOver(),'is-dragged-over-up':this.isDraggedOverUpwards(),'is-dragged-over-down':this.isDraggedOverDownwards(),'was-dragged-over':this.wasDraggedOver()});return joinClasses(className,extraClasses);},getUpdateCellClass:function getUpdateCellClass(){return this.props.column.getUpdateCellClass?this.props.column.getUpdateCellClass(this.props.selectedColumn,this.props.column,this.state.isCellValueChanging):'';},applyUpdateClass:function applyUpdateClass(){var updateCellClass=this.getUpdateCellClass(); // -> removing the class
	if(updateCellClass != null && updateCellClass != ""){var cellDOMNode=this.getDOMNode();if(cellDOMNode.classList){cellDOMNode.classList.remove(updateCellClass); // -> and re-adding the class
	cellDOMNode.classList.add(updateCellClass);}else if(cellDOMNode.className.indexOf(updateCellClass) === -1){ // IE9 doesn't support classList, nor (I think) altering element.className
	// without replacing it wholesale.
	cellDOMNode.className = cellDOMNode.className + ' ' + updateCellClass;}}},setScrollLeft:function setScrollLeft(scrollLeft){var ctrl=this; //flow on windows has an outdated react declaration, once that gets updated, we can remove this
	if(ctrl.isMounted()){var node=React.findDOMNode(this);var transform='translate3d(' + scrollLeft + 'px, 0px, 0px)';node.style.webkitTransform = transform;node.style.transform = transform;}},isCopied:function isCopied(){var copied=this.props.cellMetaData.copied;return copied && copied.rowIdx === this.props.rowIdx && copied.idx === this.props.idx;},isDraggedOver:function isDraggedOver(){var dragged=this.props.cellMetaData.dragged;return dragged && dragged.overRowIdx === this.props.rowIdx && dragged.idx === this.props.idx;},wasDraggedOver:function wasDraggedOver(){var dragged=this.props.cellMetaData.dragged;return dragged && (dragged.overRowIdx < this.props.rowIdx && this.props.rowIdx < dragged.rowIdx || dragged.overRowIdx > this.props.rowIdx && this.props.rowIdx > dragged.rowIdx) && dragged.idx === this.props.idx;},isDraggedCellChanging:function isDraggedCellChanging(nextProps){var isChanging;var dragged=this.props.cellMetaData.dragged;var nextDragged=nextProps.cellMetaData.dragged;if(dragged){isChanging = nextDragged && this.props.idx === nextDragged.idx || dragged && this.props.idx === dragged.idx;return isChanging;}else {return false;}},isCopyCellChanging:function isCopyCellChanging(nextProps){var isChanging;var copied=this.props.cellMetaData.copied;var nextCopied=nextProps.cellMetaData.copied;if(copied){isChanging = nextCopied && this.props.idx === nextCopied.idx || copied && this.props.idx === copied.idx;return isChanging;}else {return false;}},isDraggedOverUpwards:function isDraggedOverUpwards(){var dragged=this.props.cellMetaData.dragged;return !this.isSelected() && this.isDraggedOver() && this.props.rowIdx < dragged.rowIdx;},isDraggedOverDownwards:function isDraggedOverDownwards(){var dragged=this.props.cellMetaData.dragged;return !this.isSelected() && this.isDraggedOver() && this.props.rowIdx > dragged.rowIdx;}});var SimpleCellFormatter=React.createClass({displayName:'SimpleCellFormatter',propTypes:{value:React.PropTypes.oneOfType([React.PropTypes.string,React.PropTypes.number,React.PropTypes.object,React.PropTypes.bool]).isRequired},render:function render(){return React.createElement('span',null,this.props.value);},shouldComponentUpdate:function shouldComponentUpdate(nextProps,nextState){return nextProps.value !== this.props.value;}});module.exports = Cell; /***/}, /* 52 */function(module,exports,__webpack_require__){ /**
		* @jsx React.DOM


		*/'use strict';var React=__webpack_require__(18);var joinClasses=__webpack_require__(21);var keyboardHandlerMixin=__webpack_require__(53);var SimpleTextEditor=__webpack_require__(54);var isFunction=__webpack_require__(74);var cloneWithProps=__webpack_require__(30);var EditorContainer=React.createClass({displayName:'EditorContainer',mixins:[keyboardHandlerMixin],propTypes:{rowData:React.PropTypes.object.isRequired,value:React.PropTypes.oneOfType([React.PropTypes.string,React.PropTypes.number,React.PropTypes.object,React.PropTypes.bool]).isRequired,cellMetaData:React.PropTypes.shape({selected:React.PropTypes.object.isRequired,copied:React.PropTypes.object,dragged:React.PropTypes.object,onCellClick:React.PropTypes.func,onCellDoubleClick:React.PropTypes.func}).isRequired,column:React.PropTypes.object.isRequired,height:React.PropTypes.number.isRequired},changeCommitted:false,getInitialState:function getInitialState(){return {isInvalid:false};},componentDidMount:function componentDidMount(){var inputNode=this.getInputNode();if(inputNode !== undefined){this.setTextInputFocus();if(!this.getEditor().disableContainerStyles){inputNode.className += ' editor-main';inputNode.style.height = this.props.height - 1 + 'px';}}},createEditor:function createEditor(){var _this=this;var editorRef=function editorRef(c){return _this.editor = c;};var editorProps={ref:editorRef,column:this.props.column,value:this.getInitialValue(),onCommit:this.commit,rowMetaData:this.getRowMetaData(),height:this.props.height,onBlur:this.commit,onOverrideKeyDown:this.onKeyDown};var customEditor=this.props.column.editor;if(customEditor && React.isValidElement(customEditor)){ //return custom column editor or SimpleEditor if none specified
	return cloneWithProps(customEditor,editorProps);}else {return React.createElement(SimpleTextEditor,{ref:editorRef,column:this.props.column,value:this.getInitialValue(),onBlur:this.commit,rowMetaData:this.getRowMetaData()});}},getRowMetaData:function getRowMetaData(){ //clone row data so editor cannot actually change this
	var columnName=this.props.column.ItemId; //convention based method to get corresponding Id or Name of any Name or Id property
	if(typeof this.props.column.getRowMetaData === 'function'){return this.props.column.getRowMetaData(this.props.rowData,this.props.column);}},onPressEnter:function onPressEnter(e){this.commit({key:'Enter'});},onPressTab:function onPressTab(e){this.commit({key:'Tab'});},onPressEscape:function onPressEscape(e){if(!this.editorIsSelectOpen()){this.props.cellMetaData.onCommitCancel();}else { // prevent event from bubbling if editor has results to select
	e.stopPropagation();}},onPressArrowDown:function onPressArrowDown(e){if(this.editorHasResults()){ //dont want to propogate as that then moves us round the grid
	e.stopPropagation();}else {this.commit(e);}},onPressArrowUp:function onPressArrowUp(e){if(this.editorHasResults()){ //dont want to propogate as that then moves us round the grid
	e.stopPropagation();}else {this.commit(e);}},onPressArrowLeft:function onPressArrowLeft(e){ //prevent event propogation. this disables left cell navigation
	if(!this.isCaretAtBeginningOfInput()){e.stopPropagation();}else {this.commit(e);}},onPressArrowRight:function onPressArrowRight(e){ //prevent event propogation. this disables right cell navigation
	if(!this.isCaretAtEndOfInput()){e.stopPropagation();}else {this.commit(e);}},editorHasResults:function editorHasResults(){if(isFunction(this.getEditor().hasResults)){return this.getEditor().hasResults();}else {return false;}},editorIsSelectOpen:function editorIsSelectOpen(){if(isFunction(this.getEditor().isSelectOpen)){return this.getEditor().isSelectOpen();}else {return false;}},getEditor:function getEditor(){return this.editor;},commit:function commit(args){var opts=args || {};var updated=this.getEditor().getValue();if(this.isNewValueValid(updated)){var cellKey=this.props.column.key;this.props.cellMetaData.onCommit({cellKey:cellKey,rowIdx:this.props.rowIdx,updated:updated,key:opts.key});}this.changeCommitted = true;},isNewValueValid:function isNewValueValid(value){if(isFunction(this.getEditor().validate)){var isValid=this.getEditor().validate(value);this.setState({isInvalid:!isValid});return isValid;}else {return true;}},getInputNode:function getInputNode(){return this.getEditor().getInputNode();},getInitialValue:function getInitialValue(){var selected=this.props.cellMetaData.selected;var keyCode=selected.initialKeyCode;if(keyCode === 'Delete' || keyCode === 'Backspace'){return '';}else if(keyCode === 'Enter'){return this.props.value;}else {var text=keyCode?String.fromCharCode(keyCode):this.props.value;return text;}},getContainerClass:function getContainerClass(){return joinClasses({'has-error':this.state.isInvalid === true});},renderStatusIcon:function renderStatusIcon(){if(this.state.isInvalid === true){return React.createElement('span',{className:'glyphicon glyphicon-remove form-control-feedback'});}},render:function render(){return React.createElement('div',{className:this.getContainerClass(),onKeyDown:this.onKeyDown},this.createEditor(),this.renderStatusIcon());},setCaretAtEndOfInput:function setCaretAtEndOfInput(){var input=this.getInputNode(); //taken from http://stackoverflow.com/questions/511088/use-javascript-to-place-cursor-at-end-of-text-in-text-input-element
	var txtLength=input.value.length;if(input.setSelectionRange){input.setSelectionRange(txtLength,txtLength);}else if(input.createTextRange){var fieldRange=input.createTextRange();fieldRange.moveStart('character',txtLength);fieldRange.collapse();fieldRange.select();}},isCaretAtBeginningOfInput:function isCaretAtBeginningOfInput(){var inputNode=this.getInputNode();return inputNode.selectionStart === inputNode.selectionEnd && inputNode.selectionStart === 0;},isCaretAtEndOfInput:function isCaretAtEndOfInput(){var inputNode=this.getInputNode();return inputNode.selectionStart === inputNode.value.length;},setTextInputFocus:function setTextInputFocus(){var selected=this.props.cellMetaData.selected;var keyCode=selected.initialKeyCode;var inputNode=this.getInputNode();inputNode.focus();if(inputNode.tagName === "INPUT"){if(!this.isKeyPrintable(keyCode)){inputNode.focus();inputNode.select();}else {inputNode.select();}}},componentWillUnmount:function componentWillUnmount(){if(!this.changeCommitted && !this.hasEscapeBeenPressed()){this.commit({key:'Enter'});}},hasEscapeBeenPressed:function hasEscapeBeenPressed(){var pressed=false;var escapeKey=27;if(window.event){if(window.event.keyCode === escapeKey){pressed = true;}else if(window.event.which === escapeKey){pressed = true;}}return pressed;}});module.exports = EditorContainer; /***/}, /* 53 */function(module,exports,__webpack_require__){ /* TODO: mixins */ /**
		 * @jsx React.DOM


		 */'use strict';var React=__webpack_require__(18);var KeyboardHandlerMixin={onKeyDown:function onKeyDown(e){if(this.isCtrlKeyHeldDown(e)){this.checkAndCall('onPressKeyWithCtrl',e);}else if(this.isKeyExplicitlyHandled(e.key)){ //break up individual keyPress events to have their own specific callbacks
	//this allows multiple mixins to listen to onKeyDown events and somewhat reduces methodName clashing
	var callBack='onPress' + e.key;this.checkAndCall(callBack,e);}else if(this.isKeyPrintable(e.keyCode)){this.checkAndCall('onPressChar',e);}}, //taken from http://stackoverflow.com/questions/12467240/determine-if-javascript-e-keycode-is-a-printable-non-control-character
	isKeyPrintable:function isKeyPrintable(keycode){var valid=keycode > 47 && keycode < 58 ||  // number keys
	keycode == 32 || keycode == 13 ||  // spacebar & return key(s) (if you want to allow carriage returns)
	keycode > 64 && keycode < 91 ||  // letter keys
	keycode > 95 && keycode < 112 ||  // numpad keys
	keycode > 185 && keycode < 193 ||  // ;=,-./` (in order)
	keycode > 218 && keycode < 223; // [\]' (in order)
	return valid;},isKeyExplicitlyHandled:function isKeyExplicitlyHandled(key){return typeof this['onPress' + key] === 'function';},isCtrlKeyHeldDown:function isCtrlKeyHeldDown(e){return e.ctrlKey === true && e.key !== "Control";},checkAndCall:function checkAndCall(methodName,args){if(typeof this[methodName] === 'function'){this[methodName](args);}}};module.exports = KeyboardHandlerMixin; /***/}, /* 54 */function(module,exports,__webpack_require__){ /**
		 * @jsx React.DOM


		 */'use strict';var _get=__webpack_require__(55)['default'];var _inherits=__webpack_require__(61)['default'];var _createClass=__webpack_require__(70)['default'];var _classCallCheck=__webpack_require__(43)['default'];var React=__webpack_require__(18);var keyboardHandlerMixin=__webpack_require__(53);var ExcelColumn=__webpack_require__(42);var EditorBase=__webpack_require__(73);var SimpleTextEditor=(function(_EditorBase){_inherits(SimpleTextEditor,_EditorBase);function SimpleTextEditor(){_classCallCheck(this,SimpleTextEditor);_get(Object.getPrototypeOf(SimpleTextEditor.prototype),'constructor',this).apply(this,arguments);}_createClass(SimpleTextEditor,[{key:'render',value:function render(){return React.createElement('input',{ref:'input',type:'text',onBlur:this.props.onBlur,className:'form-control',defaultValue:this.props.value});}}]);return SimpleTextEditor;})(EditorBase);;module.exports = SimpleTextEditor; /***/}, /* 55 */function(module,exports,__webpack_require__){"use strict";var _Object$getOwnPropertyDescriptor=__webpack_require__(56)["default"];exports["default"] = function get(_x,_x2,_x3){var _again=true;_function: while(_again) {var object=_x,property=_x2,receiver=_x3;_again = false;if(object === null)object = Function.prototype;var desc=_Object$getOwnPropertyDescriptor(object,property);if(desc === undefined){var parent=Object.getPrototypeOf(object);if(parent === null){return undefined;}else {_x = parent;_x2 = property;_x3 = receiver;_again = true;desc = parent = undefined;continue _function;}}else if("value" in desc){return desc.value;}else {var getter=desc.get;if(getter === undefined){return undefined;}return getter.call(receiver);}}};exports.__esModule = true; /***/}, /* 56 */function(module,exports,__webpack_require__){module.exports = {"default":__webpack_require__(57),__esModule:true}; /***/}, /* 57 */function(module,exports,__webpack_require__){var $=__webpack_require__(12);__webpack_require__(58);module.exports = function getOwnPropertyDescriptor(it,key){return $.getDesc(it,key);}; /***/}, /* 58 */function(module,exports,__webpack_require__){ // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	var toIObject=__webpack_require__(59);__webpack_require__(60)('getOwnPropertyDescriptor',function($getOwnPropertyDescriptor){return function getOwnPropertyDescriptor(it,key){return $getOwnPropertyDescriptor(toIObject(it),key);};}); /***/}, /* 59 */function(module,exports,__webpack_require__){ // to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject=__webpack_require__(15),defined=__webpack_require__(14);module.exports = function(it){return IObject(defined(it));}; /***/}, /* 60 */function(module,exports,__webpack_require__){ // most Object methods by ES6 should accept primitives
	var $export=__webpack_require__(6),core=__webpack_require__(8),fails=__webpack_require__(17);module.exports = function(KEY,exec){var fn=(core.Object || {})[KEY] || Object[KEY],exp={};exp[KEY] = exec(fn);$export($export.S + $export.F * fails(function(){fn(1);}),'Object',exp);}; /***/}, /* 61 */function(module,exports,__webpack_require__){"use strict";var _Object$create=__webpack_require__(62)["default"];var _Object$setPrototypeOf=__webpack_require__(64)["default"];exports["default"] = function(subClass,superClass){if(typeof superClass !== "function" && superClass !== null){throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = _Object$create(superClass && superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)_Object$setPrototypeOf?_Object$setPrototypeOf(subClass,superClass):subClass.__proto__ = superClass;};exports.__esModule = true; /***/}, /* 62 */function(module,exports,__webpack_require__){module.exports = {"default":__webpack_require__(63),__esModule:true}; /***/}, /* 63 */function(module,exports,__webpack_require__){var $=__webpack_require__(12);module.exports = function create(P,D){return $.create(P,D);}; /***/}, /* 64 */function(module,exports,__webpack_require__){module.exports = {"default":__webpack_require__(65),__esModule:true}; /***/}, /* 65 */function(module,exports,__webpack_require__){__webpack_require__(66);module.exports = __webpack_require__(8).Object.setPrototypeOf; /***/}, /* 66 */function(module,exports,__webpack_require__){ // 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export=__webpack_require__(6);$export($export.S,'Object',{setPrototypeOf:__webpack_require__(67).set}); /***/}, /* 67 */function(module,exports,__webpack_require__){ // Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */var getDesc=__webpack_require__(12).getDesc,isObject=__webpack_require__(68),anObject=__webpack_require__(69);var check=function check(O,proto){anObject(O);if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");};module.exports = {set:_Object$setPrototypeOf2 || ('__proto__' in {}? // eslint-disable-line
	(function(test,buggy,set){try{set = __webpack_require__(9)(Function.call,getDesc(Object.prototype,'__proto__').set,2);set(test,[]);buggy = !(test instanceof Array);}catch(e) {buggy = true;}return function setPrototypeOf(O,proto){check(O,proto);if(buggy)O.__proto__ = proto;else set(O,proto);return O;};})({},false):undefined),check:check}; /***/}, /* 68 */function(module,exports){module.exports = function(it){return typeof it === 'object'?it !== null:typeof it === 'function';}; /***/}, /* 69 */function(module,exports,__webpack_require__){var isObject=__webpack_require__(68);module.exports = function(it){if(!isObject(it))throw TypeError(it + ' is not an object!');return it;}; /***/}, /* 70 */function(module,exports,__webpack_require__){"use strict";var _Object$defineProperty=__webpack_require__(71)["default"];exports["default"] = (function(){function defineProperties(target,props){for(var i=0;i < props.length;i++) {var descriptor=props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if("value" in descriptor)descriptor.writable = true;_Object$defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};})();exports.__esModule = true; /***/}, /* 71 */function(module,exports,__webpack_require__){module.exports = {"default":__webpack_require__(72),__esModule:true}; /***/}, /* 72 */function(module,exports,__webpack_require__){var $=__webpack_require__(12);module.exports = function defineProperty(it,key,desc){return $.setDesc(it,key,desc);}; /***/}, /* 73 */function(module,exports,__webpack_require__){ /**
		 * @jsx React.DOM


		 */'use strict';var _get=__webpack_require__(55)['default'];var _inherits=__webpack_require__(61)['default'];var _createClass=__webpack_require__(70)['default'];var _classCallCheck=__webpack_require__(43)['default'];var React=__webpack_require__(18);var keyboardHandlerMixin=__webpack_require__(53);var ExcelColumn=__webpack_require__(42);var EditorBase=(function(_React$Component){_inherits(EditorBase,_React$Component);function EditorBase(){_classCallCheck(this,EditorBase);_get(Object.getPrototypeOf(EditorBase.prototype),'constructor',this).apply(this,arguments);}_createClass(EditorBase,[{key:'getStyle',value:function getStyle(){return {width:'100%'};}},{key:'getValue',value:function getValue(){var updated={};updated[this.props.column.key] = this.getInputNode().value;return updated;}},{key:'getInputNode',value:function getInputNode(){var domNode=React.findDOMNode(this);if(domNode.tagName === 'INPUT'){return domNode;}else {return domNode.querySelector("input:not([type=hidden])");}}},{key:'inheritContainerStyles',value:function inheritContainerStyles(){return true;}}]);return EditorBase;})(React.Component);EditorBase.propTypes = {onKeyDown:React.PropTypes.func.isRequired,value:React.PropTypes.any.isRequired,onBlur:React.PropTypes.func.isRequired,column:React.PropTypes.shape(ExcelColumn).isRequired,commit:React.PropTypes.func.isRequired};module.exports = EditorBase; /***/}, /* 74 */function(module,exports){"use strict";var isFunction=function isFunction(functionToCheck){var getType={};return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';};module.exports = isFunction; /***/}, /* 75 */function(module,exports,__webpack_require__){'use strict';var PropTypes=__webpack_require__(18).PropTypes;module.exports = {selected:PropTypes.object.isRequired,copied:PropTypes.object,dragged:PropTypes.object,onCellClick:PropTypes.func.isRequired}; /***/}, /* 76 */function(module,exports,__webpack_require__){ /* TODO mixins */'use strict';var React=__webpack_require__(18);var DOMMetrics=__webpack_require__(77);var getWindowSize=__webpack_require__(78);var PropTypes=React.PropTypes;var min=Math.min;var max=Math.max;var floor=Math.floor;var ceil=Math.ceil;module.exports = {mixins:[DOMMetrics.MetricsMixin],DOMMetrics:{viewportHeight:function viewportHeight(){return React.findDOMNode(this).offsetHeight;}},propTypes:{rowHeight:React.PropTypes.number,rowsCount:React.PropTypes.number.isRequired},getDefaultProps:function getDefaultProps(){return {rowHeight:30};},getInitialState:function getInitialState(){return this.getGridState(this.props);},getGridState:function getGridState(props){var renderedRowsCount=ceil((props.minHeight - props.rowHeight) / props.rowHeight);var totalRowCount=min(renderedRowsCount * 2,props.rowsCount);return {displayStart:0,displayEnd:totalRowCount,height:props.minHeight,scrollTop:0,scrollLeft:0};},updateScroll:function updateScroll(scrollTop,scrollLeft,height,rowHeight,length){var renderedRowsCount=ceil(height / rowHeight);var visibleStart=floor(scrollTop / rowHeight);var visibleEnd=min(visibleStart + renderedRowsCount,length);var displayStart=max(0,visibleStart - renderedRowsCount * 2);var displayEnd=min(visibleStart + renderedRowsCount * 2,length);var nextScrollState={visibleStart:visibleStart,visibleEnd:visibleEnd,displayStart:displayStart,displayEnd:displayEnd,height:height,scrollTop:scrollTop,scrollLeft:scrollLeft};this.setState(nextScrollState);},metricsUpdated:function metricsUpdated(){var height=this.DOMMetrics.viewportHeight();if(height){this.updateScroll(this.state.scrollTop,this.state.scrollLeft,height,this.props.rowHeight,this.props.rowsCount);}},componentWillReceiveProps:function componentWillReceiveProps(nextProps){if(this.props.rowHeight !== nextProps.rowHeight || this.props.minHeight !== nextProps.minHeight){this.setState(this.getGridState(nextProps));}else if(this.props.rowsCount !== nextProps.rowsCount){this.updateScroll(this.state.scrollTop,this.state.scrollLeft,this.state.height,nextProps.rowHeight,nextProps.rowsCount);}}}; /***/}, /* 77 */function(module,exports,__webpack_require__){ /* TODO mixin and invarient splat */ /**
		 * @jsx React.DOM


		 */'use strict';var React=__webpack_require__(18);var emptyFunction=__webpack_require__(37);var shallowCloneObject=__webpack_require__(22);var contextTypes={metricsComputator:React.PropTypes.object};var MetricsComputatorMixin={childContextTypes:contextTypes,getChildContext:function getChildContext(){return {metricsComputator:this};},getMetricImpl:function getMetricImpl(name){return this._DOMMetrics.metrics[name].value;},registerMetricsImpl:function registerMetricsImpl(component,metrics){var getters={};var s=this._DOMMetrics;for(var name in metrics) {if(s.metrics[name] !== undefined){throw new Error('DOM metric ' + name + ' is already defined');}s.metrics[name] = {component:component,computator:metrics[name].bind(component)};getters[name] = this.getMetricImpl.bind(null,name);}if(s.components.indexOf(component) === -1){s.components.push(component);}return getters;},unregisterMetricsFor:function unregisterMetricsFor(component){var s=this._DOMMetrics;var idx=s.components.indexOf(component);if(idx > -1){s.components.splice(idx,1);var name;var metricsToDelete={};for(name in s.metrics) {if(s.metrics[name].component === component){metricsToDelete[name] = true;}}for(name in metricsToDelete) {delete s.metrics[name];}}},updateMetrics:function updateMetrics(){var s=this._DOMMetrics;var needUpdate=false;for(var name in s.metrics) {var newMetric=s.metrics[name].computator();if(newMetric !== s.metrics[name].value){needUpdate = true;}s.metrics[name].value = newMetric;}if(needUpdate){for(var i=0,len=s.components.length;i < len;i++) {if(s.components[i].metricsUpdated){s.components[i].metricsUpdated();}}}},componentWillMount:function componentWillMount(){this._DOMMetrics = {metrics:{},components:[]};},componentDidMount:function componentDidMount(){if(window.addEventListener){window.addEventListener('resize',this.updateMetrics);}else {window.attachEvent('resize',this.updateMetrics);}this.updateMetrics();},componentWillUnmount:function componentWillUnmount(){window.removeEventListener('resize',this.updateMetrics);}};var MetricsMixin={contextTypes:contextTypes,componentWillMount:function componentWillMount(){if(this.DOMMetrics){this._DOMMetricsDefs = shallowCloneObject(this.DOMMetrics);this.DOMMetrics = {};for(var name in this._DOMMetricsDefs) {this.DOMMetrics[name] = emptyFunction;}}},componentDidMount:function componentDidMount(){if(this.DOMMetrics){this.DOMMetrics = this.registerMetrics(this._DOMMetricsDefs);}},componentWillUnmount:function componentWillUnmount(){if(!this.registerMetricsImpl){return this.context.metricsComputator.unregisterMetricsFor(this);}if(this.hasOwnProperty('DOMMetrics')){delete this.DOMMetrics;}},registerMetrics:function registerMetrics(metrics){if(this.registerMetricsImpl){return this.registerMetricsImpl(this,metrics);}else {return this.context.metricsComputator.registerMetricsImpl(this,metrics);}},getMetric:function getMetric(name){if(this.getMetricImpl){return this.getMetricImpl(name);}else {return this.context.metricsComputator.getMetricImpl(name);}}};module.exports = {MetricsComputatorMixin:MetricsComputatorMixin,MetricsMixin:MetricsMixin}; /***/}, /* 78 */function(module,exports){ /**
		 * @jsx React.DOM



		 */'use strict'; /**
		 * Return window's height and width
		 *
		 * @return {Object} height and width of the window
		 */function getWindowSize(){var width=window.innerWidth;var height=window.innerHeight;if(!width || !height){width = document.documentElement.clientWidth;height = document.documentElement.clientHeight;}if(!width || !height){width = document.body.clientWidth;height = document.body.clientHeight;}return {width:width,height:height};}module.exports = getWindowSize; /***/}, /* 79 */function(module,exports){ /* TODO mixins */"use strict";module.exports = {componentDidMount:function componentDidMount(){this._scrollLeft = this.refs.viewport?this.refs.viewport.getScroll().scrollLeft:0;this._onScroll();},componentDidUpdate:function componentDidUpdate(){this._onScroll();},componentWillMount:function componentWillMount(){this._scrollLeft = undefined;},componentWillUnmount:function componentWillUnmount(){this._scrollLeft = undefined;},onScroll:function onScroll(props){if(this._scrollLeft !== props.scrollLeft){this._scrollLeft = props.scrollLeft;this._onScroll();}},_onScroll:function _onScroll(){if(this._scrollLeft !== undefined){this.refs.header.setScrollLeft(this._scrollLeft);if(this.refs.viewport){this.refs.viewport.setScrollLeft(this._scrollLeft);}}}}; /***/}, /* 80 */function(module,exports,__webpack_require__){ /**
		 * @jsx React.DOM
		 */'use strict';var React=__webpack_require__(18);var CheckboxEditor=React.createClass({displayName:'CheckboxEditor',PropTypes:{value:React.PropTypes.bool.isRequired,rowIdx:React.PropTypes.number.isRequired,column:React.PropTypes.shape({key:React.PropTypes.string.isRequired,onCellChange:React.PropTypes.func.isRequired}).isRequired},render:function render(){var checked=this.props.value != null?this.props.value:false;return React.createElement('input',{className:'react-grid-CheckBox',type:'checkbox',checked:checked,onClick:this.handleChange});},handleChange:function handleChange(e){this.props.column.onCellChange(this.props.rowIdx,this.props.column.key,e);}});module.exports = CheckboxEditor; /***/}, /* 81 */function(module,exports,__webpack_require__){ /**
		 * @jsx React.DOM


		 */'use strict';var React=__webpack_require__(18);var ExcelColumn=__webpack_require__(42);var FilterableHeaderCell=React.createClass({displayName:'FilterableHeaderCell',propTypes:{onChange:React.PropTypes.func.isRequired,column:React.PropTypes.shape(ExcelColumn).isRequired},getInitialState:function getInitialState(){return {filterTerm:''};},handleChange:function handleChange(e){var val=e.target.value;this.setState({filterTerm:val});this.props.onChange({filterTerm:val,columnKey:this.props.column.key});},render:function render(){return React.createElement('div',null,React.createElement('div',{className:'form-group'},this.renderInput()));},renderInput:function renderInput(){if(this.props.column.filterable === false){return React.createElement('span',null);}else {var input_key='header-filter-' + this.props.column.key;return React.createElement('input',{key:input_key,type:'text',className:'form-control input-sm',placeholder:'Search',value:this.state.filterTerm,onChange:this.handleChange});}}});module.exports = FilterableHeaderCell; /***/}, /* 82 */function(module,exports,__webpack_require__){ /* TODO mixins */'use strict';var _classCallCheck=__webpack_require__(43)['default'];var ColumnMetrics=__webpack_require__(23);var DOMMetrics=__webpack_require__(77);Object.assign = __webpack_require__(83);var PropTypes=__webpack_require__(18).PropTypes;var ColumnUtils=__webpack_require__(25);var React=__webpack_require__(18);var Column=function Column(){_classCallCheck(this,Column);};;module.exports = {mixins:[DOMMetrics.MetricsMixin],propTypes:{columns:PropTypes.arrayOf(Column),minColumnWidth:PropTypes.number,columnEquality:PropTypes.func},DOMMetrics:{gridWidth:function gridWidth(){return React.findDOMNode(this).parentElement.offsetWidth;}},getDefaultProps:function getDefaultProps(){return {minColumnWidth:80,columnEquality:ColumnMetrics.sameColumn};},componentWillReceiveProps:function componentWillReceiveProps(nextProps){if(nextProps.columns){if(!ColumnMetrics.sameColumns(this.props.columns,nextProps.columns,this.props.columnEquality) || nextProps.minWidth !== this.props.minWidth){var columnMetrics=this.createColumnMetrics(nextProps);this.setState({columnMetrics:columnMetrics});}}},getTotalWidth:function getTotalWidth(){var totalWidth=0;if(this.isMounted()){totalWidth = this.DOMMetrics.gridWidth();}else {totalWidth = ColumnUtils.getSize(this.props.columns) * this.props.minColumnWidth;}return totalWidth;},getColumnMetricsType:function getColumnMetricsType(metrics){var totalWidth=metrics.totalWidth || this.getTotalWidth();var currentMetrics={columns:metrics.columns,totalWidth:totalWidth,minColumnWidth:metrics.minColumnWidth};var updatedMetrics=ColumnMetrics.recalculate(currentMetrics);return updatedMetrics;},getColumn:function getColumn(idx){var columns=this.state.columnMetrics.columns;if(Array.isArray(columns)){return columns[idx];}else if(typeof Immutable !== 'undefined'){return columns.get(idx);}},getSize:function getSize(){var columns=this.state.columnMetrics.columns;if(Array.isArray(columns)){return columns.length;}else if(typeof Immutable !== 'undefined'){return columns.size;}},metricsUpdated:function metricsUpdated(){var columnMetrics=this.createColumnMetrics();this.setState({columnMetrics:columnMetrics});},createColumnMetrics:function createColumnMetrics(){var props=arguments.length <= 0 || arguments[0] === undefined?this.props:arguments[0];var gridColumns=this.setupGridColumns(props);return this.getColumnMetricsType({columns:gridColumns,minColumnWidth:this.props.minColumnWidth,totalWidth:props.minWidth});},onColumnResize:function onColumnResize(index,width){var columnMetrics=ColumnMetrics.resizeColumn(this.state.columnMetrics,index,width);this.setState({columnMetrics:columnMetrics});}}; /***/}, /* 83 */function(module,exports){'use strict';function ToObject(val){if(val == null){throw new TypeError('Object.assign cannot be called with null or undefined');}return Object(val);}module.exports = _Object$assign2 || function(target,source){var from;var keys;var to=ToObject(target);for(var s=1;s < arguments.length;s++) {from = arguments[s];keys = _Object$keys(Object(from));for(var i=0;i < keys.length;i++) {to[keys[i]] = from[keys[i]];}}return to;}; /***/}, /* 84 */function(module,exports){'use strict';var RowUtils={get:function get(row,property){if(typeof row.get === 'function'){return row.get(property);}else {return row[property];}}};module.exports = RowUtils; /***/} /******/]));});; /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(110), __esModule: true };

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(111);
	module.exports = __webpack_require__(15).Object.freeze;

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.5 Object.freeze(O)
	'use strict';

	var isObject = __webpack_require__(25);

	__webpack_require__(12)('freeze', function ($freeze) {
	  return function freeze(it) {
	    return $freeze && isObject(it) ? $freeze(it) : it;
	  };
	});

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ReactGrid = __webpack_require__(108);
	var QuickStartDescription = __webpack_require__(103);
	var ReactPlayground = __webpack_require__(106);

	var FixedExample = '\n\n//helper to generate a random date\nfunction randomDate(start, end) {\n  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();\n};\n\nvar _rows = [];\nfor (var i = 1; i < 1000; i++) {\n  _rows.push({\n    id: i,\n    task: \'Task \' + i,\n    complete: Math.min(100, Math.round(Math.random() * 110)),\n    priority : [\'Critical\', \'High\', \'Medium\', \'Low\'][Math.floor((Math.random() * 3) + 1)],\n    issueType : [\'Bug\', \'Improvement\', \'Epic\', \'Story\'][Math.floor((Math.random() * 3) + 1)],\n    startDate: randomDate(new Date(2015, 3, 1), new Date()),\n    completeDate: randomDate(new Date(), new Date(2016, 0, 1))\n  });\n};\n\n//function to retrieve a row for a given index\nvar rowGetter = function(i){\n  return _rows[i];\n};\n\n\n//Columns definition\nvar columns = [\n{\n  key: \'id\',\n  name: \'ID\',\n  locked : true\n},\n{\n  key: \'task\',\n  name: \'Title\',\n  width: 200\n},\n{\n  key: \'priority\',\n  name: \'Priority\',\n  width: 200\n},\n{\n  key: \'issueType\',\n  name: \'Issue Type\',\n  width: 200\n},\n{\n  key: \'complete\',\n  name: \'% Complete\',\n  width: 200\n},\n{\n  key: \'startDate\',\n  name: \'Start Date\',\n  width: 200\n},\n{\n  key: \'completeDate\',\n  name: \'Expected Complete\',\n  width: 200\n},\n{\n  key: \'completeDate\',\n  name: \'Expected Complete\',\n  width: 200\n}\n]\n\n\nReact.render(<ReactDataGrid\n  columns={columns}\n  rowGetter={rowGetter}\n  rowsCount={_rows.length}\n  minHeight={500} />, mountNode);\n';

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
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ReactGrid = __webpack_require__(108);
	var QuickStartDescription = __webpack_require__(103);
	var ReactPlayground = __webpack_require__(106);

	var EditableExample = '\n//helper to generate a random date\nfunction randomDate(start, end) {\n  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();\n}\n\n//helper to create a fixed number of rows\nfunction createRows(numberOfRows){\n  var _rows = [];\n  for (var i = 1; i < numberOfRows; i++) {\n    _rows.push({\n      id: i,\n      task: \'Task \' + i,\n      complete: Math.min(100, Math.round(Math.random() * 110)),\n      priority : [\'Critical\', \'High\', \'Medium\', \'Low\'][Math.floor((Math.random() * 3) + 1)],\n      issueType : [\'Bug\', \'Improvement\', \'Epic\', \'Story\'][Math.floor((Math.random() * 3) + 1)],\n      startDate: randomDate(new Date(2015, 3, 1), new Date()),\n      completeDate: randomDate(new Date(), new Date(2016, 0, 1))\n    });\n  }\n  return _rows;\n}\n\n//function to retrieve a row for a given index\nvar rowGetter = function(i){\n  return _rows[i];\n};\n\n//Columns definition\nvar columns = [\n{\n  key: \'id\',\n  name: \'ID\',\n  width: 80\n},\n{\n  key: \'task\',\n  name: \'Title\',\n  editable : true\n},\n{\n  key: \'priority\',\n  name: \'Priority\',\n  editable : true\n},\n{\n  key: \'issueType\',\n  name: \'Issue Type\',\n  editable : true\n},\n{\n  key: \'complete\',\n  name: \'% Complete\',\n  editable : true\n},\n{\n  key: \'startDate\',\n  name: \'Start Date\',\n  editable : true\n},\n{\n  key: \'completeDate\',\n  name: \'Expected Complete\',\n  editable : true\n}\n]\n\n\nvar Example = React.createClass({\n\n  getInitialState : function(){\n    return {rows : createRows(1000)}\n  },\n\n  rowGetter : function(rowIdx){\n    return this.state.rows[rowIdx]\n  },\n\n  handleRowUpdated : function(e){\n    //merge updated row with current row and rerender by setting state\n    var rows = this.state.rows;\n    Object.assign(rows[e.rowIdx], e.updated);\n    this.setState({rows:rows});\n  },\n\n  render:function(){\n    return(\n      <ReactDataGrid\n      enableCellSelect={true}\n      columns={columns}\n      rowGetter={this.rowGetter}\n      rowsCount={this.state.rows.length}\n      minHeight={500}\n      onRowUpdated={this.handleRowUpdated} />\n    )\n  }\n\n});\n\nReact.render(<Example />, mountNode);\n';

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
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var QuickStartDescription = __webpack_require__(103);
	var ReactPlayground = __webpack_require__(106);

	var SimpleExample = '\n//helper to generate a random date\nfunction randomDate(start, end) {\n  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();\n}\n\n//generate a fixed number of rows and set their properties\nvar _rows = [];\nfor (var i = 1; i < 100; i++) {\n  _rows.push({\n    id: i,\n    task: \'Task \' + i,\n    complete: Math.min(100, Math.round(Math.random() * 110)),\n    priority : [\'Critical\', \'High\', \'Medium\', \'Low\'][Math.floor((Math.random() * 3) + 1)],\n    issueType : [\'Bug\', \'Improvement\', \'Epic\', \'Story\'][Math.floor((Math.random() * 3) + 1)],\n    startDate: randomDate(new Date(2015, 3, 1), new Date()),\n    completeDate: randomDate(new Date(), new Date(2016, 0, 1))\n  });\n}\n\n\n//function to retrieve a row for a given index\nvar rowGetter = function(i){\n  return _rows[i];\n};\n\n//Custom Formatter component\nvar PercentCompleteFormatter = React.createClass({\n  render:function(){\n    var percentComplete = this.props.value + \'%\';\n    return (\n      <div className="progress" style={{marginTop:\'20px\'}}>\n        <div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width:percentComplete}}>\n        {percentComplete}\n      </div>\n      </div>);\n    }\n  });\n\n//Columns definition\nvar columns = [\n{\n  key: \'id\',\n  name: \'ID\',\n  width: 80\n},\n{\n  key: \'task\',\n  name: \'Title\'\n},\n{\n  key: \'priority\',\n  name: \'Priority\'\n},\n{\n  key: \'issueType\',\n  name: \'Issue Type\'\n},\n{\n  key: \'complete\',\n  name: \'% Complete\',\n  formatter : PercentCompleteFormatter\n},\n{\n  key: \'startDate\',\n  name: \'Start Date\'\n},\n{\n  key: \'completeDate\',\n  name: \'Expected Complete\'\n}\n]\n\nvar Example = React.createClass({\n  render: function() {\n    return  (<ReactDataGrid\n    columns={columns}\n    rowGetter={rowGetter}\n    rowsCount={_rows.length}\n    minHeight={500} />);\n  }\n});\nReact.render(<Example />, mountNode);\n';

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
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var QuickStartDescription = __webpack_require__(103);
	var ReactPlayground = __webpack_require__(106);

	var EditableExample = '\n\n//options for priorities autocomplete editor\nvar priorities = [{id:0, title : \'Critical\'}, {id:1, title : \'High\'}, {id:2, title : \'Medium\'}, {id:3, title : \'Low\'}]\nvar AutoCompleteEditor = ReactDataGrid.Editors.AutoComplete;\nvar PrioritiesEditor = <AutoCompleteEditor options={priorities}/>\n\n//options for IssueType dropdown editor\nvar issueTypes = [\'Bug\', \'Improvement\', \'Epic\', \'Story\'];\nvar DropDownEditor = ReactDataGrid.Editors.DropDownEditor;\nvar IssueTypesEditor = <DropDownEditor options={issueTypes}/>\n\n//helper to generate a random date\nfunction randomDate(start, end) {\n  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();\n}\n\n//helper to create a fixed number of rows\nfunction createRows(numberOfRows){\n  var _rows = [];\n  for (var i = 1; i < numberOfRows; i++) {\n    _rows.push({\n      id: i,\n      task: \'Task \' + i,\n      complete: Math.min(100, Math.round(Math.random() * 110)),\n      priority : [\'Critical\', \'High\', \'Medium\', \'Low\'][Math.floor((Math.random() * 3) + 1)],\n      issueType : issueTypes[Math.floor((Math.random() * 3) + 1)],\n      startDate: randomDate(new Date(2015, 3, 1), new Date()),\n      completeDate: randomDate(new Date(), new Date(2016, 0, 1))\n    });\n  }\n  return _rows;\n}\n\n//function to retrieve a row for a given index\nvar rowGetter = function(i){\n  return _rows[i];\n};\n\n//Columns definition\nvar columns = [\n{\n  key: \'id\',\n  name: \'ID\',\n  width: 80\n},\n{\n  key: \'task\',\n  name: \'Title\',\n  editable : true\n},\n{\n  key : \'priority\',\n  name : \'Priority\',\n  editor : PrioritiesEditor\n},\n{\n  key : \'issueType\',\n  name : \'Issue Type\',\n  editor : IssueTypesEditor\n}\n]\n\n\nvar Example = React.createClass({\n\n  getInitialState : function(){\n    return {rows : createRows(1000)}\n  },\n\n  rowGetter : function(rowIdx){\n    return this.state.rows[rowIdx]\n  },\n\n  handleRowUpdated : function(e){\n    //merge updated row with current row and rerender by setting state\n    var rows = this.state.rows;\n    Object.assign(rows[e.rowIdx], e.updated);\n    this.setState({rows:rows});\n  },\n\n  render:function(){\n    return(\n      <ReactDataGrid\n      enableCellSelect={true}\n      columns={columns}\n      rowGetter={this.rowGetter}\n      rowsCount={this.state.rows.length}\n      minHeight={500}\n      onRowUpdated={this.handleRowUpdated} />\n    )\n  }\n\n});\n\nReact.render(<Example />, mountNode);\n';

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
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ReactGrid = __webpack_require__(108);
	var QuickStartDescription = __webpack_require__(103);
	var ReactPlayground = __webpack_require__(106);

	var EditableExample = '\n//helper to generate a random date\nfunction randomDate(start, end) {\n  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();\n}\n\n//helper to create a fixed number of rows\nfunction createRows(numberOfRows){\n  var _rows = [];\n  for (var i = 1; i < numberOfRows; i++) {\n    _rows.push({\n      id: i,\n      task: \'Task \' + i,\n      complete: Math.min(100, Math.round(Math.random() * 110)),\n      priority : [\'Critical\', \'High\', \'Medium\', \'Low\'][Math.floor((Math.random() * 3) + 1)],\n      issueType : [\'Bug\', \'Improvement\', \'Epic\', \'Story\'][Math.floor((Math.random() * 3) + 1)],\n      startDate: randomDate(new Date(2015, 3, 1), new Date()),\n      completeDate: randomDate(new Date(), new Date(2016, 0, 1))\n    });\n  }\n  return _rows;\n}\n\n//function to retrieve a row for a given index\nvar rowGetter = function(i){\n  return _rows[i];\n};\n\n//Columns definition\nvar columns = [\n{\n  key: \'id\',\n  name: \'ID\',\n  width: 80\n},\n{\n  key: \'task\',\n  name: \'Title\',\n  sortable : true\n},\n{\n  key: \'priority\',\n  name: \'Priority\',\n  sortable : true\n},\n{\n  key: \'issueType\',\n  name: \'Issue Type\',\n  sortable : true\n},\n{\n  key: \'complete\',\n  name: \'% Complete\',\n  sortable : true\n},\n{\n  key: \'startDate\',\n  name: \'Start Date\',\n  sortable : true\n},\n{\n  key: \'completeDate\',\n  name: \'Expected Complete\',\n  sortable : true\n}\n]\n\n\nvar Example = React.createClass({\n\n  getInitialState : function(){\n    var originalRows = createRows(1000);\n    var rows = originalRows.slice(0);\n    //store the original rows array, and make a copy that can be used for modifying eg.filtering, sorting\n    return {originalRows : originalRows, rows : rows};\n  },\n\n  rowGetter : function(rowIdx){\n    return this.state.rows[rowIdx];\n  },\n\n  handleGridSort : function(sortColumn, sortDirection){\n\n    var comparer = function(a, b) {\n      if(sortDirection === \'ASC\'){\n        return (a[sortColumn] > b[sortColumn]) ? 1 : -1;\n      }else if(sortDirection === \'DESC\'){\n        return (a[sortColumn] < b[sortColumn]) ? 1 : -1;\n      }\n    }\n    var rows = sortDirection === \'NONE\' ? this.state.originalRows.slice(0) : this.state.rows.sort(comparer);\n    this.setState({rows : rows});\n  },\n\n  render:function(){\n    return(\n      <ReactDataGrid\n        onGridSort={this.handleGridSort}\n        columns={columns}\n        rowGetter={this.rowGetter}\n        rowsCount={this.state.rows.length}\n        minHeight={500}\n        onRowUpdated={this.handleRowUpdated} />\n    )\n  }\n\n});\n\nReact.render(<Example />, mountNode);\n';

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
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ReactGrid = __webpack_require__(108);
	var QuickStartDescription = __webpack_require__(103);
	var ReactPlayground = __webpack_require__(106);

	var EditableExample = '\nvar Toolbar = ReactDataGrid.Toolbar;\n\n//helper to generate a random date\nfunction randomDate(start, end) {\n  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();\n}\n\n//helper to create a fixed number of rows\nfunction createRows(numberOfRows){\n  var _rows = [];\n  for (var i = 1; i < numberOfRows; i++) {\n    _rows.push({\n      id: i,\n      task: \'Task \' + i,\n      complete: Math.min(100, Math.round(Math.random() * 110)),\n      priority : [\'Critical\', \'High\', \'Medium\', \'Low\'][Math.floor((Math.random() * 3) + 1)],\n      issueType : [\'Bug\', \'Improvement\', \'Epic\', \'Story\'][Math.floor((Math.random() * 3) + 1)],\n      startDate: randomDate(new Date(2015, 3, 1), new Date()),\n      completeDate: randomDate(new Date(), new Date(2016, 0, 1))\n    });\n  }\n  return _rows;\n}\n\n//function to retrieve a row for a given index\nvar rowGetter = function(i){\n  return _rows[i];\n};\n\n//Columns definition\nvar columns = [\n{\n  key: \'id\',\n  name: \'ID\',\n  width: 80,\n  filterable: true\n},\n{\n  key: \'task\',\n  name: \'Title\',\n  filterable: true\n},\n{\n  key: \'priority\',\n  name: \'Priority\',\n  filterable: true\n},\n{\n  key: \'issueType\',\n  name: \'Issue Type\',\n  filterable: true\n},\n{\n  key: \'complete\',\n  name: \'% Complete\',\n  filterable: true\n},\n{\n  key: \'startDate\',\n  name: \'Start Date\',\n  filterable: true\n},\n{\n  key: \'completeDate\',\n  name: \'Expected Complete\',\n  filterable: true\n}\n]\n\n\nvar Example = React.createClass({\n\n  getInitialState : function(){\n    var originalRows = createRows(1000);\n    var rows = originalRows.slice(0);\n    //store the original rows array, and make a copy that can be used for modifying eg.filtering, sorting\n    return {originalRows : originalRows, rows : rows, filters : {}};\n  },\n\n  rowGetter : function(rowIdx){\n    return this.state.rows[rowIdx];\n  },\n\n  filterRows : function(originalRows, filters) {\n    var rows = originalRows.filter(function(r){\n      var include = true;\n      for (var columnKey in filters) {\n        if(filters.hasOwnProperty(columnKey)) {\n          var rowValue = r[columnKey].toString().toLowerCase();\n          if(rowValue.indexOf(filters[columnKey].toLowerCase()) === -1) {\n            include = false;\n          }\n        }\n      }\n      return include;\n    });\n    return rows;\n  },\n\n  handleFilterChange : function(filter){\n    this.setState(function(currentState) {\n      if (filter.filterTerm) {\n        currentState.filters[filter.columnKey] = filter.filterTerm;\n      } else {\n        delete currentState.filters[filter.columnKey];\n      }\n      currentState.rows = this.filterRows(currentState.originalRows, currentState.filters);\n      return currentState;\n    });\n  },\n\n  render:function(){\n    return(\n      <ReactDataGrid\n        columns={columns}\n        rowGetter={this.rowGetter}\n        rowsCount={this.state.rows.length}\n        minHeight={500}\n        toolbar={<Toolbar enableFilter={true}/>}\n        onAddFilter={this.handleFilterChange}/>\n    )\n  }\n\n});\n\nReact.render(<Example />, mountNode);\n';

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
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ReactGrid = __webpack_require__(108);
	var QuickStartDescription = __webpack_require__(103);
	var ReactPlayground = __webpack_require__(106);

	var millionRowsExample = '\n//helper to generate a random date\nfunction randomDate(start, end) {\n  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();\n};\n\nvar _rows = [];\nfor (var i = 1; i < 1000000; i++) {\n  _rows.push({\n    id: i,\n    task: \'Task \' + i,\n    complete: \'a\',\n    priority : \'b\',\n    issueType : \'c\'\n  });\n}\n\n//function to retrieve a row for a given index\nvar rowGetter = function(i){\n  return _rows[i];\n};\n\n\n//Columns definition\nvar columns = [\n{\n  key: \'id\',\n  name: \'ID\'\n\n},\n{\n  key: \'task\',\n  name: \'Title\'\n},\n{\n  key: \'priority\',\n  name: \'Priority\'\n},\n{\n  key: \'issueType\',\n  name: \'Issue Type\'\n},\n{\n  key: \'complete\',\n  name: \'% Complete\'\n}\n]\n\nReact.render(<ReactDataGrid\n  columns={columns}\n  rowGetter={rowGetter}\n  rowsCount={_rows.length}\n  minHeight={500} />, mountNode);\n  ';

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
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ReactGrid = __webpack_require__(108);
	var QuickStartDescription = __webpack_require__(103);
	var ReactPlayground = __webpack_require__(106);
	var Immutable = __webpack_require__(120);

	var immutableDataExample = '\n//helper to generate a random date\nfunction randomDate(start, end) {\n  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();\n};\n\nvar _rows = [];\nvar _cols = [];\nfor(var j = 0; j < 50; j++){\n    _cols.push({key: \'col\' + j, name: \'col\' + j, width: 150, editable:true});\n};\n\nfor (var rowIdx = 1; rowIdx < 100; rowIdx++) {\n  var row = {};\n  _cols.forEach(function(c, colIdx){\n    row[c.key] = \'(\' + colIdx + \',\' + rowIdx + \')\';\n  });\n  _rows.push(row);\n}\n\nvar Example = React.createClass({\n\n  getInitialState : function(){\n    return {rows : new Immutable.fromJS(_rows), cols: new Immutable.List(_cols)}\n  },\n\n  rowGetter : function(rowIdx){\n    return this.state.rows.get(rowIdx)\n  },\n\n  handleRowUpdated : function(e){\n    //merge updated row with current row and rerender by setting state\n    var rows = this.state.rows.update(e.rowIdx, function(row){\n      return row.merge(e.updated);\n    });\n    this.setState({rows:rows});\n  },\n\n  render:function(){\n    return(\n      <ReactDataGrid\n      enableCellSelect={true}\n      columns={this.state.cols}\n      rowGetter={this.rowGetter}\n      rowsCount={this.state.rows.size}\n      minHeight={500}\n      onRowUpdated={this.handleRowUpdated} />\n    )\n  }\n\n});\n\nReact.render(<Example />, mountNode);\n  ';

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
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 *  Copyright (c) 2014-2015, Facebook, Inc.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the BSD-style license found in the
	 *  LICENSE file in the root directory of this source tree. An additional grant
	 *  of patent rights can be found in the PATENTS file in the same directory.
	 */'use strict';var _Object$create=__webpack_require__(19)['default'];var _Symbol=__webpack_require__(41)['default'];var _Symbol$iterator=__webpack_require__(121)['default'];var _Object$keys=__webpack_require__(62)['default'];var _Math$imul=__webpack_require__(133)['default'];var _Object$defineProperty=__webpack_require__(30)['default'];var _Object$isExtensible=__webpack_require__(136)['default'];var _WeakMap=__webpack_require__(139)['default'];var _Object$getOwnPropertySymbols=__webpack_require__(154)['default'];(function(global,factory){ true?module.exports = factory():typeof define === 'function' && define.amd?define(factory):global.Immutable = factory();})(undefined,function(){'use strict';var SLICE$0=Array.prototype.slice;function createClass(ctor,superClass){if(superClass){ctor.prototype = _Object$create(superClass.prototype);}ctor.prototype.constructor = ctor;}function Iterable(value){return isIterable(value)?value:Seq(value);}createClass(KeyedIterable,Iterable);function KeyedIterable(value){return isKeyed(value)?value:KeyedSeq(value);}createClass(IndexedIterable,Iterable);function IndexedIterable(value){return isIndexed(value)?value:IndexedSeq(value);}createClass(SetIterable,Iterable);function SetIterable(value){return isIterable(value) && !isAssociative(value)?value:SetSeq(value);}function isIterable(maybeIterable){return !!(maybeIterable && maybeIterable[IS_ITERABLE_SENTINEL]);}function isKeyed(maybeKeyed){return !!(maybeKeyed && maybeKeyed[IS_KEYED_SENTINEL]);}function isIndexed(maybeIndexed){return !!(maybeIndexed && maybeIndexed[IS_INDEXED_SENTINEL]);}function isAssociative(maybeAssociative){return isKeyed(maybeAssociative) || isIndexed(maybeAssociative);}function isOrdered(maybeOrdered){return !!(maybeOrdered && maybeOrdered[IS_ORDERED_SENTINEL]);}Iterable.isIterable = isIterable;Iterable.isKeyed = isKeyed;Iterable.isIndexed = isIndexed;Iterable.isAssociative = isAssociative;Iterable.isOrdered = isOrdered;Iterable.Keyed = KeyedIterable;Iterable.Indexed = IndexedIterable;Iterable.Set = SetIterable;var IS_ITERABLE_SENTINEL='@@__IMMUTABLE_ITERABLE__@@';var IS_KEYED_SENTINEL='@@__IMMUTABLE_KEYED__@@';var IS_INDEXED_SENTINEL='@@__IMMUTABLE_INDEXED__@@';var IS_ORDERED_SENTINEL='@@__IMMUTABLE_ORDERED__@@'; // Used for setting prototype methods that IE8 chokes on.
	var DELETE='delete'; // Constants describing the size of trie nodes.
	var SHIFT=5; // Resulted in best performance after ______?
	var SIZE=1 << SHIFT;var MASK=SIZE - 1; // A consistent shared value representing "not set" which equals nothing other
	// than itself, and nothing that could be provided externally.
	var NOT_SET={}; // Boolean references, Rough equivalent of `bool &`.
	var CHANGE_LENGTH={value:false};var DID_ALTER={value:false};function MakeRef(ref){ref.value = false;return ref;}function SetRef(ref){ref && (ref.value = true);} // A function which returns a value representing an "owner" for transient writes
	// to tries. The return value will only ever equal itself, and will not equal
	// the return of any subsequent call of this function.
	function OwnerID(){} // http://jsperf.com/copy-array-inline
	function arrCopy(arr,offset){offset = offset || 0;var len=Math.max(0,arr.length - offset);var newArr=new Array(len);for(var ii=0;ii < len;ii++) {newArr[ii] = arr[ii + offset];}return newArr;}function ensureSize(iter){if(iter.size === undefined){iter.size = iter.__iterate(returnTrue);}return iter.size;}function wrapIndex(iter,index){ // This implements "is array index" which the ECMAString spec defines as:
	//
	//     A String property name P is an array index if and only if
	//     ToString(ToUint32(P)) is equal to P and ToUint32(P) is not equal
	//     to 2^32−1.
	//
	// http://www.ecma-international.org/ecma-262/6.0/#sec-array-exotic-objects
	if(typeof index !== 'number'){var uint32Index=index >>> 0; // N >>> 0 is shorthand for ToUint32
	if('' + uint32Index !== index || uint32Index === 4294967295){return NaN;}index = uint32Index;}return index < 0?ensureSize(iter) + index:index;}function returnTrue(){return true;}function wholeSlice(begin,end,size){return (begin === 0 || size !== undefined && begin <= -size) && (end === undefined || size !== undefined && end >= size);}function resolveBegin(begin,size){return resolveIndex(begin,size,0);}function resolveEnd(end,size){return resolveIndex(end,size,size);}function resolveIndex(index,size,defaultIndex){return index === undefined?defaultIndex:index < 0?Math.max(0,size + index):size === undefined?index:Math.min(size,index);} /* global Symbol */var ITERATE_KEYS=0;var ITERATE_VALUES=1;var ITERATE_ENTRIES=2;var REAL_ITERATOR_SYMBOL=typeof _Symbol === 'function' && _Symbol$iterator;var FAUX_ITERATOR_SYMBOL='@@iterator';var ITERATOR_SYMBOL=REAL_ITERATOR_SYMBOL || FAUX_ITERATOR_SYMBOL;function Iterator(next){this.next = next;}Iterator.prototype.toString = function(){return '[Iterator]';};Iterator.KEYS = ITERATE_KEYS;Iterator.VALUES = ITERATE_VALUES;Iterator.ENTRIES = ITERATE_ENTRIES;Iterator.prototype.inspect = Iterator.prototype.toSource = function(){return this.toString();};Iterator.prototype[ITERATOR_SYMBOL] = function(){return this;};function iteratorValue(type,k,v,iteratorResult){var value=type === 0?k:type === 1?v:[k,v];iteratorResult?iteratorResult.value = value:iteratorResult = {value:value,done:false};return iteratorResult;}function iteratorDone(){return {value:undefined,done:true};}function hasIterator(maybeIterable){return !!getIteratorFn(maybeIterable);}function isIterator(maybeIterator){return maybeIterator && typeof maybeIterator.next === 'function';}function getIterator(iterable){var iteratorFn=getIteratorFn(iterable);return iteratorFn && iteratorFn.call(iterable);}function getIteratorFn(iterable){var iteratorFn=iterable && (REAL_ITERATOR_SYMBOL && iterable[REAL_ITERATOR_SYMBOL] || iterable[FAUX_ITERATOR_SYMBOL]);if(typeof iteratorFn === 'function'){return iteratorFn;}}function isArrayLike(value){return value && typeof value.length === 'number';}createClass(Seq,Iterable);function Seq(value){return value === null || value === undefined?emptySequence():isIterable(value)?value.toSeq():seqFromValue(value);}Seq.of = function() /*...values*/{return Seq(arguments);};Seq.prototype.toSeq = function(){return this;};Seq.prototype.toString = function(){return this.__toString('Seq {','}');};Seq.prototype.cacheResult = function(){if(!this._cache && this.__iterateUncached){this._cache = this.entrySeq().toArray();this.size = this._cache.length;}return this;}; // abstract __iterateUncached(fn, reverse)
	Seq.prototype.__iterate = function(fn,reverse){return seqIterate(this,fn,reverse,true);}; // abstract __iteratorUncached(type, reverse)
	Seq.prototype.__iterator = function(type,reverse){return seqIterator(this,type,reverse,true);};createClass(KeyedSeq,Seq);function KeyedSeq(value){return value === null || value === undefined?emptySequence().toKeyedSeq():isIterable(value)?isKeyed(value)?value.toSeq():value.fromEntrySeq():keyedSeqFromValue(value);}KeyedSeq.prototype.toKeyedSeq = function(){return this;};createClass(IndexedSeq,Seq);function IndexedSeq(value){return value === null || value === undefined?emptySequence():!isIterable(value)?indexedSeqFromValue(value):isKeyed(value)?value.entrySeq():value.toIndexedSeq();}IndexedSeq.of = function() /*...values*/{return IndexedSeq(arguments);};IndexedSeq.prototype.toIndexedSeq = function(){return this;};IndexedSeq.prototype.toString = function(){return this.__toString('Seq [',']');};IndexedSeq.prototype.__iterate = function(fn,reverse){return seqIterate(this,fn,reverse,false);};IndexedSeq.prototype.__iterator = function(type,reverse){return seqIterator(this,type,reverse,false);};createClass(SetSeq,Seq);function SetSeq(value){return (value === null || value === undefined?emptySequence():!isIterable(value)?indexedSeqFromValue(value):isKeyed(value)?value.entrySeq():value).toSetSeq();}SetSeq.of = function() /*...values*/{return SetSeq(arguments);};SetSeq.prototype.toSetSeq = function(){return this;};Seq.isSeq = isSeq;Seq.Keyed = KeyedSeq;Seq.Set = SetSeq;Seq.Indexed = IndexedSeq;var IS_SEQ_SENTINEL='@@__IMMUTABLE_SEQ__@@';Seq.prototype[IS_SEQ_SENTINEL] = true;createClass(ArraySeq,IndexedSeq);function ArraySeq(array){this._array = array;this.size = array.length;}ArraySeq.prototype.get = function(index,notSetValue){return this.has(index)?this._array[wrapIndex(this,index)]:notSetValue;};ArraySeq.prototype.__iterate = function(fn,reverse){var array=this._array;var maxIndex=array.length - 1;for(var ii=0;ii <= maxIndex;ii++) {if(fn(array[reverse?maxIndex - ii:ii],ii,this) === false){return ii + 1;}}return ii;};ArraySeq.prototype.__iterator = function(type,reverse){var array=this._array;var maxIndex=array.length - 1;var ii=0;return new Iterator(function(){return ii > maxIndex?iteratorDone():iteratorValue(type,ii,array[reverse?maxIndex - ii++:ii++]);});};createClass(ObjectSeq,KeyedSeq);function ObjectSeq(object){var keys=_Object$keys(object);this._object = object;this._keys = keys;this.size = keys.length;}ObjectSeq.prototype.get = function(key,notSetValue){if(notSetValue !== undefined && !this.has(key)){return notSetValue;}return this._object[key];};ObjectSeq.prototype.has = function(key){return this._object.hasOwnProperty(key);};ObjectSeq.prototype.__iterate = function(fn,reverse){var object=this._object;var keys=this._keys;var maxIndex=keys.length - 1;for(var ii=0;ii <= maxIndex;ii++) {var key=keys[reverse?maxIndex - ii:ii];if(fn(object[key],key,this) === false){return ii + 1;}}return ii;};ObjectSeq.prototype.__iterator = function(type,reverse){var object=this._object;var keys=this._keys;var maxIndex=keys.length - 1;var ii=0;return new Iterator(function(){var key=keys[reverse?maxIndex - ii:ii];return ii++ > maxIndex?iteratorDone():iteratorValue(type,key,object[key]);});};ObjectSeq.prototype[IS_ORDERED_SENTINEL] = true;createClass(IterableSeq,IndexedSeq);function IterableSeq(iterable){this._iterable = iterable;this.size = iterable.length || iterable.size;}IterableSeq.prototype.__iterateUncached = function(fn,reverse){if(reverse){return this.cacheResult().__iterate(fn,reverse);}var iterable=this._iterable;var iterator=getIterator(iterable);var iterations=0;if(isIterator(iterator)){var step;while(!(step = iterator.next()).done) {if(fn(step.value,iterations++,this) === false){break;}}}return iterations;};IterableSeq.prototype.__iteratorUncached = function(type,reverse){if(reverse){return this.cacheResult().__iterator(type,reverse);}var iterable=this._iterable;var iterator=getIterator(iterable);if(!isIterator(iterator)){return new Iterator(iteratorDone);}var iterations=0;return new Iterator(function(){var step=iterator.next();return step.done?step:iteratorValue(type,iterations++,step.value);});};createClass(IteratorSeq,IndexedSeq);function IteratorSeq(iterator){this._iterator = iterator;this._iteratorCache = [];}IteratorSeq.prototype.__iterateUncached = function(fn,reverse){if(reverse){return this.cacheResult().__iterate(fn,reverse);}var iterator=this._iterator;var cache=this._iteratorCache;var iterations=0;while(iterations < cache.length) {if(fn(cache[iterations],iterations++,this) === false){return iterations;}}var step;while(!(step = iterator.next()).done) {var val=step.value;cache[iterations] = val;if(fn(val,iterations++,this) === false){break;}}return iterations;};IteratorSeq.prototype.__iteratorUncached = function(type,reverse){if(reverse){return this.cacheResult().__iterator(type,reverse);}var iterator=this._iterator;var cache=this._iteratorCache;var iterations=0;return new Iterator(function(){if(iterations >= cache.length){var step=iterator.next();if(step.done){return step;}cache[iterations] = step.value;}return iteratorValue(type,iterations,cache[iterations++]);});}; // # pragma Helper functions
	function isSeq(maybeSeq){return !!(maybeSeq && maybeSeq[IS_SEQ_SENTINEL]);}var EMPTY_SEQ;function emptySequence(){return EMPTY_SEQ || (EMPTY_SEQ = new ArraySeq([]));}function keyedSeqFromValue(value){var seq=Array.isArray(value)?new ArraySeq(value).fromEntrySeq():isIterator(value)?new IteratorSeq(value).fromEntrySeq():hasIterator(value)?new IterableSeq(value).fromEntrySeq():typeof value === 'object'?new ObjectSeq(value):undefined;if(!seq){throw new TypeError('Expected Array or iterable object of [k, v] entries, ' + 'or keyed object: ' + value);}return seq;}function indexedSeqFromValue(value){var seq=maybeIndexedSeqFromValue(value);if(!seq){throw new TypeError('Expected Array or iterable object of values: ' + value);}return seq;}function seqFromValue(value){var seq=maybeIndexedSeqFromValue(value) || typeof value === 'object' && new ObjectSeq(value);if(!seq){throw new TypeError('Expected Array or iterable object of values, or keyed object: ' + value);}return seq;}function maybeIndexedSeqFromValue(value){return isArrayLike(value)?new ArraySeq(value):isIterator(value)?new IteratorSeq(value):hasIterator(value)?new IterableSeq(value):undefined;}function seqIterate(seq,fn,reverse,useKeys){var cache=seq._cache;if(cache){var maxIndex=cache.length - 1;for(var ii=0;ii <= maxIndex;ii++) {var entry=cache[reverse?maxIndex - ii:ii];if(fn(entry[1],useKeys?entry[0]:ii,seq) === false){return ii + 1;}}return ii;}return seq.__iterateUncached(fn,reverse);}function seqIterator(seq,type,reverse,useKeys){var cache=seq._cache;if(cache){var maxIndex=cache.length - 1;var ii=0;return new Iterator(function(){var entry=cache[reverse?maxIndex - ii:ii];return ii++ > maxIndex?iteratorDone():iteratorValue(type,useKeys?entry[0]:ii - 1,entry[1]);});}return seq.__iteratorUncached(type,reverse);}function fromJS(json,converter){return converter?fromJSWith(converter,json,'',{'':json}):fromJSDefault(json);}function fromJSWith(converter,json,key,parentJSON){if(Array.isArray(json)){return converter.call(parentJSON,key,IndexedSeq(json).map(function(v,k){return fromJSWith(converter,v,k,json);}));}if(isPlainObj(json)){return converter.call(parentJSON,key,KeyedSeq(json).map(function(v,k){return fromJSWith(converter,v,k,json);}));}return json;}function fromJSDefault(json){if(Array.isArray(json)){return IndexedSeq(json).map(fromJSDefault).toList();}if(isPlainObj(json)){return KeyedSeq(json).map(fromJSDefault).toMap();}return json;}function isPlainObj(value){return value && (value.constructor === Object || value.constructor === undefined);} /**
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
	   */function is(valueA,valueB){if(valueA === valueB || valueA !== valueA && valueB !== valueB){return true;}if(!valueA || !valueB){return false;}if(typeof valueA.valueOf === 'function' && typeof valueB.valueOf === 'function'){valueA = valueA.valueOf();valueB = valueB.valueOf();if(valueA === valueB || valueA !== valueA && valueB !== valueB){return true;}if(!valueA || !valueB){return false;}}if(typeof valueA.equals === 'function' && typeof valueB.equals === 'function' && valueA.equals(valueB)){return true;}return false;}function deepEqual(a,b){if(a === b){return true;}if(!isIterable(b) || a.size !== undefined && b.size !== undefined && a.size !== b.size || a.__hash !== undefined && b.__hash !== undefined && a.__hash !== b.__hash || isKeyed(a) !== isKeyed(b) || isIndexed(a) !== isIndexed(b) || isOrdered(a) !== isOrdered(b)){return false;}if(a.size === 0 && b.size === 0){return true;}var notAssociative=!isAssociative(a);if(isOrdered(a)){var entries=a.entries();return b.every(function(v,k){var entry=entries.next().value;return entry && is(entry[1],v) && (notAssociative || is(entry[0],k));}) && entries.next().done;}var flipped=false;if(a.size === undefined){if(b.size === undefined){if(typeof a.cacheResult === 'function'){a.cacheResult();}}else {flipped = true;var _=a;a = b;b = _;}}var allEqual=true;var bSize=b.__iterate(function(v,k){if(notAssociative?!a.has(v):flipped?!is(v,a.get(k,NOT_SET)):!is(a.get(k,NOT_SET),v)){allEqual = false;return false;}});return allEqual && a.size === bSize;}createClass(Repeat,IndexedSeq);function Repeat(value,times){if(!(this instanceof Repeat)){return new Repeat(value,times);}this._value = value;this.size = times === undefined?Infinity:Math.max(0,times);if(this.size === 0){if(EMPTY_REPEAT){return EMPTY_REPEAT;}EMPTY_REPEAT = this;}}Repeat.prototype.toString = function(){if(this.size === 0){return 'Repeat []';}return 'Repeat [ ' + this._value + ' ' + this.size + ' times ]';};Repeat.prototype.get = function(index,notSetValue){return this.has(index)?this._value:notSetValue;};Repeat.prototype.includes = function(searchValue){return is(this._value,searchValue);};Repeat.prototype.slice = function(begin,end){var size=this.size;return wholeSlice(begin,end,size)?this:new Repeat(this._value,resolveEnd(end,size) - resolveBegin(begin,size));};Repeat.prototype.reverse = function(){return this;};Repeat.prototype.indexOf = function(searchValue){if(is(this._value,searchValue)){return 0;}return -1;};Repeat.prototype.lastIndexOf = function(searchValue){if(is(this._value,searchValue)){return this.size;}return -1;};Repeat.prototype.__iterate = function(fn,reverse){for(var ii=0;ii < this.size;ii++) {if(fn(this._value,ii,this) === false){return ii + 1;}}return ii;};Repeat.prototype.__iterator = function(type,reverse){var this$0=this;var ii=0;return new Iterator(function(){return ii < this$0.size?iteratorValue(type,ii++,this$0._value):iteratorDone();});};Repeat.prototype.equals = function(other){return other instanceof Repeat?is(this._value,other._value):deepEqual(other);};var EMPTY_REPEAT;function invariant(condition,error){if(!condition)throw new Error(error);}createClass(Range,IndexedSeq);function Range(start,end,step){if(!(this instanceof Range)){return new Range(start,end,step);}invariant(step !== 0,'Cannot step a Range by 0');start = start || 0;if(end === undefined){end = Infinity;}step = step === undefined?1:Math.abs(step);if(end < start){step = -step;}this._start = start;this._end = end;this._step = step;this.size = Math.max(0,Math.ceil((end - start) / step - 1) + 1);if(this.size === 0){if(EMPTY_RANGE){return EMPTY_RANGE;}EMPTY_RANGE = this;}}Range.prototype.toString = function(){if(this.size === 0){return 'Range []';}return 'Range [ ' + this._start + '...' + this._end + (this._step > 1?' by ' + this._step:'') + ' ]';};Range.prototype.get = function(index,notSetValue){return this.has(index)?this._start + wrapIndex(this,index) * this._step:notSetValue;};Range.prototype.includes = function(searchValue){var possibleIndex=(searchValue - this._start) / this._step;return possibleIndex >= 0 && possibleIndex < this.size && possibleIndex === Math.floor(possibleIndex);};Range.prototype.slice = function(begin,end){if(wholeSlice(begin,end,this.size)){return this;}begin = resolveBegin(begin,this.size);end = resolveEnd(end,this.size);if(end <= begin){return new Range(0,0);}return new Range(this.get(begin,this._end),this.get(end,this._end),this._step);};Range.prototype.indexOf = function(searchValue){var offsetValue=searchValue - this._start;if(offsetValue % this._step === 0){var index=offsetValue / this._step;if(index >= 0 && index < this.size){return index;}}return -1;};Range.prototype.lastIndexOf = function(searchValue){return this.indexOf(searchValue);};Range.prototype.__iterate = function(fn,reverse){var maxIndex=this.size - 1;var step=this._step;var value=reverse?this._start + maxIndex * step:this._start;for(var ii=0;ii <= maxIndex;ii++) {if(fn(value,ii,this) === false){return ii + 1;}value += reverse?-step:step;}return ii;};Range.prototype.__iterator = function(type,reverse){var maxIndex=this.size - 1;var step=this._step;var value=reverse?this._start + maxIndex * step:this._start;var ii=0;return new Iterator(function(){var v=value;value += reverse?-step:step;return ii > maxIndex?iteratorDone():iteratorValue(type,ii++,v);});};Range.prototype.equals = function(other){return other instanceof Range?this._start === other._start && this._end === other._end && this._step === other._step:deepEqual(this,other);};var EMPTY_RANGE;createClass(Collection,Iterable);function Collection(){throw TypeError('Abstract');}createClass(KeyedCollection,Collection);function KeyedCollection(){}createClass(IndexedCollection,Collection);function IndexedCollection(){}createClass(SetCollection,Collection);function SetCollection(){}Collection.Keyed = KeyedCollection;Collection.Indexed = IndexedCollection;Collection.Set = SetCollection;var imul=typeof _Math$imul === 'function' && _Math$imul(0xffffffff,2) === -2?_Math$imul:function imul(a,b){a = a | 0; // int
	b = b | 0; // int
	var c=a & 0xffff;var d=b & 0xffff; // Shift by 0 fixes the sign on the high part.
	return c * d + ((a >>> 16) * d + c * (b >>> 16) << 16 >>> 0) | 0; // int
	}; // v8 has an optimization for storing 31-bit signed numbers.
	// Values which have either 00 or 11 as the high order bits qualify.
	// This function drops the highest order bit in a signed number, maintaining
	// the sign bit.
	function smi(i32){return i32 >>> 1 & 0x40000000 | i32 & 0xBFFFFFFF;}function hash(o){if(o === false || o === null || o === undefined){return 0;}if(typeof o.valueOf === 'function'){o = o.valueOf();if(o === false || o === null || o === undefined){return 0;}}if(o === true){return 1;}var type=typeof o;if(type === 'number'){var h=o | 0;if(h !== o){h ^= o * 0xFFFFFFFF;}while(o > 0xFFFFFFFF) {o /= 0xFFFFFFFF;h ^= o;}return smi(h);}if(type === 'string'){return o.length > STRING_HASH_CACHE_MIN_STRLEN?cachedHashString(o):hashString(o);}if(typeof o.hashCode === 'function'){return o.hashCode();}if(type === 'object'){return hashJSObj(o);}if(typeof o.toString === 'function'){return hashString(o.toString());}throw new Error('Value type ' + type + ' cannot be hashed.');}function cachedHashString(string){var hash=stringHashCache[string];if(hash === undefined){hash = hashString(string);if(STRING_HASH_CACHE_SIZE === STRING_HASH_CACHE_MAX_SIZE){STRING_HASH_CACHE_SIZE = 0;stringHashCache = {};}STRING_HASH_CACHE_SIZE++;stringHashCache[string] = hash;}return hash;} // http://jsperf.com/hashing-strings
	function hashString(string){ // This is the hash from JVM
	// The hash code for a string is computed as
	// s[0] * 31 ^ (n - 1) + s[1] * 31 ^ (n - 2) + ... + s[n - 1],
	// where s[i] is the ith character of the string and n is the length of
	// the string. We "mod" the result to make it between 0 (inclusive) and 2^31
	// (exclusive) by dropping high bits.
	var hash=0;for(var ii=0;ii < string.length;ii++) {hash = 31 * hash + string.charCodeAt(ii) | 0;}return smi(hash);}function hashJSObj(obj){var hash;if(usingWeakMap){hash = weakMap.get(obj);if(hash !== undefined){return hash;}}hash = obj[UID_HASH_KEY];if(hash !== undefined){return hash;}if(!canDefineProperty){hash = obj.propertyIsEnumerable && obj.propertyIsEnumerable[UID_HASH_KEY];if(hash !== undefined){return hash;}hash = getIENodeHash(obj);if(hash !== undefined){return hash;}}hash = ++objHashUID;if(objHashUID & 0x40000000){objHashUID = 0;}if(usingWeakMap){weakMap.set(obj,hash);}else if(isExtensible !== undefined && isExtensible(obj) === false){throw new Error('Non-extensible objects are not allowed as keys.');}else if(canDefineProperty){_Object$defineProperty(obj,UID_HASH_KEY,{'enumerable':false,'configurable':false,'writable':false,'value':hash});}else if(obj.propertyIsEnumerable !== undefined && obj.propertyIsEnumerable === obj.constructor.prototype.propertyIsEnumerable){ // Since we can't define a non-enumerable property on the object
	// we'll hijack one of the less-used non-enumerable properties to
	// save our hash on it. Since this is a function it will not show up in
	// `JSON.stringify` which is what we want.
	obj.propertyIsEnumerable = function(){return this.constructor.prototype.propertyIsEnumerable.apply(this,arguments);};obj.propertyIsEnumerable[UID_HASH_KEY] = hash;}else if(obj.nodeType !== undefined){ // At this point we couldn't get the IE `uniqueID` to use as a hash
	// and we couldn't use a non-enumerable property to exploit the
	// dontEnum bug so we simply add the `UID_HASH_KEY` on the node
	// itself.
	obj[UID_HASH_KEY] = hash;}else {throw new Error('Unable to set a non-enumerable property on object.');}return hash;} // Get references to ES5 object methods.
	var isExtensible=_Object$isExtensible; // True if Object.defineProperty works as expected. IE8 fails this test.
	var canDefineProperty=(function(){try{Object.defineProperty({},'@',{});return true;}catch(e) {return false;}})(); // IE has a `uniqueID` property on DOM nodes. We can construct the hash from it
	// and avoid memory leaks from the IE cloneNode bug.
	function getIENodeHash(node){if(node && node.nodeType > 0){switch(node.nodeType){case 1: // Element
	return node.uniqueID;case 9: // Document
	return node.documentElement && node.documentElement.uniqueID;}}} // If possible, use a WeakMap.
	var usingWeakMap=typeof _WeakMap === 'function';var weakMap;if(usingWeakMap){weakMap = new _WeakMap();}var objHashUID=0;var UID_HASH_KEY='__immutablehash__';if(typeof _Symbol === 'function'){UID_HASH_KEY = _Symbol(UID_HASH_KEY);}var STRING_HASH_CACHE_MIN_STRLEN=16;var STRING_HASH_CACHE_MAX_SIZE=255;var STRING_HASH_CACHE_SIZE=0;var stringHashCache={};function assertNotInfinite(size){invariant(size !== Infinity,'Cannot perform this action with an infinite size.');}createClass(Map,KeyedCollection); // @pragma Construction
	function Map(value){return value === null || value === undefined?emptyMap():isMap(value) && !isOrdered(value)?value:emptyMap().withMutations(function(map){var iter=KeyedIterable(value);assertNotInfinite(iter.size);iter.forEach(function(v,k){return map.set(k,v);});});}Map.prototype.toString = function(){return this.__toString('Map {','}');}; // @pragma Access
	Map.prototype.get = function(k,notSetValue){return this._root?this._root.get(0,undefined,k,notSetValue):notSetValue;}; // @pragma Modification
	Map.prototype.set = function(k,v){return updateMap(this,k,v);};Map.prototype.setIn = function(keyPath,v){return this.updateIn(keyPath,NOT_SET,function(){return v;});};Map.prototype.remove = function(k){return updateMap(this,k,NOT_SET);};Map.prototype.deleteIn = function(keyPath){return this.updateIn(keyPath,function(){return NOT_SET;});};Map.prototype.update = function(k,notSetValue,updater){return arguments.length === 1?k(this):this.updateIn([k],notSetValue,updater);};Map.prototype.updateIn = function(keyPath,notSetValue,updater){if(!updater){updater = notSetValue;notSetValue = undefined;}var updatedValue=updateInDeepMap(this,forceIterator(keyPath),notSetValue,updater);return updatedValue === NOT_SET?undefined:updatedValue;};Map.prototype.clear = function(){if(this.size === 0){return this;}if(this.__ownerID){this.size = 0;this._root = null;this.__hash = undefined;this.__altered = true;return this;}return emptyMap();}; // @pragma Composition
	Map.prototype.merge = function() /*...iters*/{return mergeIntoMapWith(this,undefined,arguments);};Map.prototype.mergeWith = function(merger){var iters=SLICE$0.call(arguments,1);return mergeIntoMapWith(this,merger,iters);};Map.prototype.mergeIn = function(keyPath){var iters=SLICE$0.call(arguments,1);return this.updateIn(keyPath,emptyMap(),function(m){return typeof m.merge === 'function'?m.merge.apply(m,iters):iters[iters.length - 1];});};Map.prototype.mergeDeep = function() /*...iters*/{return mergeIntoMapWith(this,deepMerger,arguments);};Map.prototype.mergeDeepWith = function(merger){var iters=SLICE$0.call(arguments,1);return mergeIntoMapWith(this,deepMergerWith(merger),iters);};Map.prototype.mergeDeepIn = function(keyPath){var iters=SLICE$0.call(arguments,1);return this.updateIn(keyPath,emptyMap(),function(m){return typeof m.mergeDeep === 'function'?m.mergeDeep.apply(m,iters):iters[iters.length - 1];});};Map.prototype.sort = function(comparator){ // Late binding
	return OrderedMap(sortFactory(this,comparator));};Map.prototype.sortBy = function(mapper,comparator){ // Late binding
	return OrderedMap(sortFactory(this,comparator,mapper));}; // @pragma Mutability
	Map.prototype.withMutations = function(fn){var mutable=this.asMutable();fn(mutable);return mutable.wasAltered()?mutable.__ensureOwner(this.__ownerID):this;};Map.prototype.asMutable = function(){return this.__ownerID?this:this.__ensureOwner(new OwnerID());};Map.prototype.asImmutable = function(){return this.__ensureOwner();};Map.prototype.wasAltered = function(){return this.__altered;};Map.prototype.__iterator = function(type,reverse){return new MapIterator(this,type,reverse);};Map.prototype.__iterate = function(fn,reverse){var this$0=this;var iterations=0;this._root && this._root.iterate(function(entry){iterations++;return fn(entry[1],entry[0],this$0);},reverse);return iterations;};Map.prototype.__ensureOwner = function(ownerID){if(ownerID === this.__ownerID){return this;}if(!ownerID){this.__ownerID = ownerID;this.__altered = false;return this;}return makeMap(this.size,this._root,ownerID,this.__hash);};function isMap(maybeMap){return !!(maybeMap && maybeMap[IS_MAP_SENTINEL]);}Map.isMap = isMap;var IS_MAP_SENTINEL='@@__IMMUTABLE_MAP__@@';var MapPrototype=Map.prototype;MapPrototype[IS_MAP_SENTINEL] = true;MapPrototype[DELETE] = MapPrototype.remove;MapPrototype.removeIn = MapPrototype.deleteIn; // #pragma Trie Nodes
	function ArrayMapNode(ownerID,entries){this.ownerID = ownerID;this.entries = entries;}ArrayMapNode.prototype.get = function(shift,keyHash,key,notSetValue){var entries=this.entries;for(var ii=0,len=entries.length;ii < len;ii++) {if(is(key,entries[ii][0])){return entries[ii][1];}}return notSetValue;};ArrayMapNode.prototype.update = function(ownerID,shift,keyHash,key,value,didChangeSize,didAlter){var removed=value === NOT_SET;var entries=this.entries;var idx=0;for(var len=entries.length;idx < len;idx++) {if(is(key,entries[idx][0])){break;}}var exists=idx < len;if(exists?entries[idx][1] === value:removed){return this;}SetRef(didAlter);(removed || !exists) && SetRef(didChangeSize);if(removed && entries.length === 1){return; // undefined
	}if(!exists && !removed && entries.length >= MAX_ARRAY_MAP_SIZE){return createNodes(ownerID,entries,key,value);}var isEditable=ownerID && ownerID === this.ownerID;var newEntries=isEditable?entries:arrCopy(entries);if(exists){if(removed){idx === len - 1?newEntries.pop():newEntries[idx] = newEntries.pop();}else {newEntries[idx] = [key,value];}}else {newEntries.push([key,value]);}if(isEditable){this.entries = newEntries;return this;}return new ArrayMapNode(ownerID,newEntries);};function BitmapIndexedNode(ownerID,bitmap,nodes){this.ownerID = ownerID;this.bitmap = bitmap;this.nodes = nodes;}BitmapIndexedNode.prototype.get = function(shift,keyHash,key,notSetValue){if(keyHash === undefined){keyHash = hash(key);}var bit=1 << ((shift === 0?keyHash:keyHash >>> shift) & MASK);var bitmap=this.bitmap;return (bitmap & bit) === 0?notSetValue:this.nodes[popCount(bitmap & bit - 1)].get(shift + SHIFT,keyHash,key,notSetValue);};BitmapIndexedNode.prototype.update = function(ownerID,shift,keyHash,key,value,didChangeSize,didAlter){if(keyHash === undefined){keyHash = hash(key);}var keyHashFrag=(shift === 0?keyHash:keyHash >>> shift) & MASK;var bit=1 << keyHashFrag;var bitmap=this.bitmap;var exists=(bitmap & bit) !== 0;if(!exists && value === NOT_SET){return this;}var idx=popCount(bitmap & bit - 1);var nodes=this.nodes;var node=exists?nodes[idx]:undefined;var newNode=updateNode(node,ownerID,shift + SHIFT,keyHash,key,value,didChangeSize,didAlter);if(newNode === node){return this;}if(!exists && newNode && nodes.length >= MAX_BITMAP_INDEXED_SIZE){return expandNodes(ownerID,nodes,bitmap,keyHashFrag,newNode);}if(exists && !newNode && nodes.length === 2 && isLeafNode(nodes[idx ^ 1])){return nodes[idx ^ 1];}if(exists && newNode && nodes.length === 1 && isLeafNode(newNode)){return newNode;}var isEditable=ownerID && ownerID === this.ownerID;var newBitmap=exists?newNode?bitmap:bitmap ^ bit:bitmap | bit;var newNodes=exists?newNode?setIn(nodes,idx,newNode,isEditable):spliceOut(nodes,idx,isEditable):spliceIn(nodes,idx,newNode,isEditable);if(isEditable){this.bitmap = newBitmap;this.nodes = newNodes;return this;}return new BitmapIndexedNode(ownerID,newBitmap,newNodes);};function HashArrayMapNode(ownerID,count,nodes){this.ownerID = ownerID;this.count = count;this.nodes = nodes;}HashArrayMapNode.prototype.get = function(shift,keyHash,key,notSetValue){if(keyHash === undefined){keyHash = hash(key);}var idx=(shift === 0?keyHash:keyHash >>> shift) & MASK;var node=this.nodes[idx];return node?node.get(shift + SHIFT,keyHash,key,notSetValue):notSetValue;};HashArrayMapNode.prototype.update = function(ownerID,shift,keyHash,key,value,didChangeSize,didAlter){if(keyHash === undefined){keyHash = hash(key);}var idx=(shift === 0?keyHash:keyHash >>> shift) & MASK;var removed=value === NOT_SET;var nodes=this.nodes;var node=nodes[idx];if(removed && !node){return this;}var newNode=updateNode(node,ownerID,shift + SHIFT,keyHash,key,value,didChangeSize,didAlter);if(newNode === node){return this;}var newCount=this.count;if(!node){newCount++;}else if(!newNode){newCount--;if(newCount < MIN_HASH_ARRAY_MAP_SIZE){return packNodes(ownerID,nodes,newCount,idx);}}var isEditable=ownerID && ownerID === this.ownerID;var newNodes=setIn(nodes,idx,newNode,isEditable);if(isEditable){this.count = newCount;this.nodes = newNodes;return this;}return new HashArrayMapNode(ownerID,newCount,newNodes);};function HashCollisionNode(ownerID,keyHash,entries){this.ownerID = ownerID;this.keyHash = keyHash;this.entries = entries;}HashCollisionNode.prototype.get = function(shift,keyHash,key,notSetValue){var entries=this.entries;for(var ii=0,len=entries.length;ii < len;ii++) {if(is(key,entries[ii][0])){return entries[ii][1];}}return notSetValue;};HashCollisionNode.prototype.update = function(ownerID,shift,keyHash,key,value,didChangeSize,didAlter){if(keyHash === undefined){keyHash = hash(key);}var removed=value === NOT_SET;if(keyHash !== this.keyHash){if(removed){return this;}SetRef(didAlter);SetRef(didChangeSize);return mergeIntoNode(this,ownerID,shift,keyHash,[key,value]);}var entries=this.entries;var idx=0;for(var len=entries.length;idx < len;idx++) {if(is(key,entries[idx][0])){break;}}var exists=idx < len;if(exists?entries[idx][1] === value:removed){return this;}SetRef(didAlter);(removed || !exists) && SetRef(didChangeSize);if(removed && len === 2){return new ValueNode(ownerID,this.keyHash,entries[idx ^ 1]);}var isEditable=ownerID && ownerID === this.ownerID;var newEntries=isEditable?entries:arrCopy(entries);if(exists){if(removed){idx === len - 1?newEntries.pop():newEntries[idx] = newEntries.pop();}else {newEntries[idx] = [key,value];}}else {newEntries.push([key,value]);}if(isEditable){this.entries = newEntries;return this;}return new HashCollisionNode(ownerID,this.keyHash,newEntries);};function ValueNode(ownerID,keyHash,entry){this.ownerID = ownerID;this.keyHash = keyHash;this.entry = entry;}ValueNode.prototype.get = function(shift,keyHash,key,notSetValue){return is(key,this.entry[0])?this.entry[1]:notSetValue;};ValueNode.prototype.update = function(ownerID,shift,keyHash,key,value,didChangeSize,didAlter){var removed=value === NOT_SET;var keyMatch=is(key,this.entry[0]);if(keyMatch?value === this.entry[1]:removed){return this;}SetRef(didAlter);if(removed){SetRef(didChangeSize);return; // undefined
	}if(keyMatch){if(ownerID && ownerID === this.ownerID){this.entry[1] = value;return this;}return new ValueNode(ownerID,this.keyHash,[key,value]);}SetRef(didChangeSize);return mergeIntoNode(this,ownerID,shift,hash(key),[key,value]);}; // #pragma Iterators
	ArrayMapNode.prototype.iterate = HashCollisionNode.prototype.iterate = function(fn,reverse){var entries=this.entries;for(var ii=0,maxIndex=entries.length - 1;ii <= maxIndex;ii++) {if(fn(entries[reverse?maxIndex - ii:ii]) === false){return false;}}};BitmapIndexedNode.prototype.iterate = HashArrayMapNode.prototype.iterate = function(fn,reverse){var nodes=this.nodes;for(var ii=0,maxIndex=nodes.length - 1;ii <= maxIndex;ii++) {var node=nodes[reverse?maxIndex - ii:ii];if(node && node.iterate(fn,reverse) === false){return false;}}};ValueNode.prototype.iterate = function(fn,reverse){return fn(this.entry);};createClass(MapIterator,Iterator);function MapIterator(map,type,reverse){this._type = type;this._reverse = reverse;this._stack = map._root && mapIteratorFrame(map._root);}MapIterator.prototype.next = function(){var type=this._type;var stack=this._stack;while(stack) {var node=stack.node;var index=stack.index++;var maxIndex;if(node.entry){if(index === 0){return mapIteratorValue(type,node.entry);}}else if(node.entries){maxIndex = node.entries.length - 1;if(index <= maxIndex){return mapIteratorValue(type,node.entries[this._reverse?maxIndex - index:index]);}}else {maxIndex = node.nodes.length - 1;if(index <= maxIndex){var subNode=node.nodes[this._reverse?maxIndex - index:index];if(subNode){if(subNode.entry){return mapIteratorValue(type,subNode.entry);}stack = this._stack = mapIteratorFrame(subNode,stack);}continue;}}stack = this._stack = this._stack.__prev;}return iteratorDone();};function mapIteratorValue(type,entry){return iteratorValue(type,entry[0],entry[1]);}function mapIteratorFrame(node,prev){return {node:node,index:0,__prev:prev};}function makeMap(size,root,ownerID,hash){var map=_Object$create(MapPrototype);map.size = size;map._root = root;map.__ownerID = ownerID;map.__hash = hash;map.__altered = false;return map;}var EMPTY_MAP;function emptyMap(){return EMPTY_MAP || (EMPTY_MAP = makeMap(0));}function updateMap(map,k,v){var newRoot;var newSize;if(!map._root){if(v === NOT_SET){return map;}newSize = 1;newRoot = new ArrayMapNode(map.__ownerID,[[k,v]]);}else {var didChangeSize=MakeRef(CHANGE_LENGTH);var didAlter=MakeRef(DID_ALTER);newRoot = updateNode(map._root,map.__ownerID,0,undefined,k,v,didChangeSize,didAlter);if(!didAlter.value){return map;}newSize = map.size + (didChangeSize.value?v === NOT_SET?-1:1:0);}if(map.__ownerID){map.size = newSize;map._root = newRoot;map.__hash = undefined;map.__altered = true;return map;}return newRoot?makeMap(newSize,newRoot):emptyMap();}function updateNode(node,ownerID,shift,keyHash,key,value,didChangeSize,didAlter){if(!node){if(value === NOT_SET){return node;}SetRef(didAlter);SetRef(didChangeSize);return new ValueNode(ownerID,keyHash,[key,value]);}return node.update(ownerID,shift,keyHash,key,value,didChangeSize,didAlter);}function isLeafNode(node){return node.constructor === ValueNode || node.constructor === HashCollisionNode;}function mergeIntoNode(node,ownerID,shift,keyHash,entry){if(node.keyHash === keyHash){return new HashCollisionNode(ownerID,keyHash,[node.entry,entry]);}var idx1=(shift === 0?node.keyHash:node.keyHash >>> shift) & MASK;var idx2=(shift === 0?keyHash:keyHash >>> shift) & MASK;var newNode;var nodes=idx1 === idx2?[mergeIntoNode(node,ownerID,shift + SHIFT,keyHash,entry)]:(newNode = new ValueNode(ownerID,keyHash,entry),idx1 < idx2?[node,newNode]:[newNode,node]);return new BitmapIndexedNode(ownerID,1 << idx1 | 1 << idx2,nodes);}function createNodes(ownerID,entries,key,value){if(!ownerID){ownerID = new OwnerID();}var node=new ValueNode(ownerID,hash(key),[key,value]);for(var ii=0;ii < entries.length;ii++) {var entry=entries[ii];node = node.update(ownerID,0,undefined,entry[0],entry[1]);}return node;}function packNodes(ownerID,nodes,count,excluding){var bitmap=0;var packedII=0;var packedNodes=new Array(count);for(var ii=0,bit=1,len=nodes.length;ii < len;ii++,bit <<= 1) {var node=nodes[ii];if(node !== undefined && ii !== excluding){bitmap |= bit;packedNodes[packedII++] = node;}}return new BitmapIndexedNode(ownerID,bitmap,packedNodes);}function expandNodes(ownerID,nodes,bitmap,including,node){var count=0;var expandedNodes=new Array(SIZE);for(var ii=0;bitmap !== 0;ii++,bitmap >>>= 1) {expandedNodes[ii] = bitmap & 1?nodes[count++]:undefined;}expandedNodes[including] = node;return new HashArrayMapNode(ownerID,count + 1,expandedNodes);}function mergeIntoMapWith(map,merger,iterables){var iters=[];for(var ii=0;ii < iterables.length;ii++) {var value=iterables[ii];var iter=KeyedIterable(value);if(!isIterable(value)){iter = iter.map(function(v){return fromJS(v);});}iters.push(iter);}return mergeIntoCollectionWith(map,merger,iters);}function deepMerger(existing,value,key){return existing && existing.mergeDeep && isIterable(value)?existing.mergeDeep(value):is(existing,value)?existing:value;}function deepMergerWith(merger){return function(existing,value,key){if(existing && existing.mergeDeepWith && isIterable(value)){return existing.mergeDeepWith(merger,value);}var nextValue=merger(existing,value,key);return is(existing,nextValue)?existing:nextValue;};}function mergeIntoCollectionWith(collection,merger,iters){iters = iters.filter(function(x){return x.size !== 0;});if(iters.length === 0){return collection;}if(collection.size === 0 && !collection.__ownerID && iters.length === 1){return collection.constructor(iters[0]);}return collection.withMutations(function(collection){var mergeIntoMap=merger?function(value,key){collection.update(key,NOT_SET,function(existing){return existing === NOT_SET?value:merger(existing,value,key);});}:function(value,key){collection.set(key,value);};for(var ii=0;ii < iters.length;ii++) {iters[ii].forEach(mergeIntoMap);}});}function updateInDeepMap(existing,keyPathIter,notSetValue,updater){var isNotSet=existing === NOT_SET;var step=keyPathIter.next();if(step.done){var existingValue=isNotSet?notSetValue:existing;var newValue=updater(existingValue);return newValue === existingValue?existing:newValue;}invariant(isNotSet || existing && existing.set,'invalid keyPath');var key=step.value;var nextExisting=isNotSet?NOT_SET:existing.get(key,NOT_SET);var nextUpdated=updateInDeepMap(nextExisting,keyPathIter,notSetValue,updater);return nextUpdated === nextExisting?existing:nextUpdated === NOT_SET?existing.remove(key):(isNotSet?emptyMap():existing).set(key,nextUpdated);}function popCount(x){x = x - (x >> 1 & 0x55555555);x = (x & 0x33333333) + (x >> 2 & 0x33333333);x = x + (x >> 4) & 0x0f0f0f0f;x = x + (x >> 8);x = x + (x >> 16);return x & 0x7f;}function setIn(array,idx,val,canEdit){var newArray=canEdit?array:arrCopy(array);newArray[idx] = val;return newArray;}function spliceIn(array,idx,val,canEdit){var newLen=array.length + 1;if(canEdit && idx + 1 === newLen){array[idx] = val;return array;}var newArray=new Array(newLen);var after=0;for(var ii=0;ii < newLen;ii++) {if(ii === idx){newArray[ii] = val;after = -1;}else {newArray[ii] = array[ii + after];}}return newArray;}function spliceOut(array,idx,canEdit){var newLen=array.length - 1;if(canEdit && idx === newLen){array.pop();return array;}var newArray=new Array(newLen);var after=0;for(var ii=0;ii < newLen;ii++) {if(ii === idx){after = 1;}newArray[ii] = array[ii + after];}return newArray;}var MAX_ARRAY_MAP_SIZE=SIZE / 4;var MAX_BITMAP_INDEXED_SIZE=SIZE / 2;var MIN_HASH_ARRAY_MAP_SIZE=SIZE / 4;createClass(List,IndexedCollection); // @pragma Construction
	function List(value){var empty=emptyList();if(value === null || value === undefined){return empty;}if(isList(value)){return value;}var iter=IndexedIterable(value);var size=iter.size;if(size === 0){return empty;}assertNotInfinite(size);if(size > 0 && size < SIZE){return makeList(0,size,SHIFT,null,new VNode(iter.toArray()));}return empty.withMutations(function(list){list.setSize(size);iter.forEach(function(v,i){return list.set(i,v);});});}List.of = function() /*...values*/{return this(arguments);};List.prototype.toString = function(){return this.__toString('List [',']');}; // @pragma Access
	List.prototype.get = function(index,notSetValue){index = wrapIndex(this,index);if(index >= 0 && index < this.size){index += this._origin;var node=listNodeFor(this,index);return node && node.array[index & MASK];}return notSetValue;}; // @pragma Modification
	List.prototype.set = function(index,value){return updateList(this,index,value);};List.prototype.remove = function(index){return !this.has(index)?this:index === 0?this.shift():index === this.size - 1?this.pop():this.splice(index,1);};List.prototype.insert = function(index,value){return this.splice(index,0,value);};List.prototype.clear = function(){if(this.size === 0){return this;}if(this.__ownerID){this.size = this._origin = this._capacity = 0;this._level = SHIFT;this._root = this._tail = null;this.__hash = undefined;this.__altered = true;return this;}return emptyList();};List.prototype.push = function() /*...values*/{var values=arguments;var oldSize=this.size;return this.withMutations(function(list){setListBounds(list,0,oldSize + values.length);for(var ii=0;ii < values.length;ii++) {list.set(oldSize + ii,values[ii]);}});};List.prototype.pop = function(){return setListBounds(this,0,-1);};List.prototype.unshift = function() /*...values*/{var values=arguments;return this.withMutations(function(list){setListBounds(list,-values.length);for(var ii=0;ii < values.length;ii++) {list.set(ii,values[ii]);}});};List.prototype.shift = function(){return setListBounds(this,1);}; // @pragma Composition
	List.prototype.merge = function() /*...iters*/{return mergeIntoListWith(this,undefined,arguments);};List.prototype.mergeWith = function(merger){var iters=SLICE$0.call(arguments,1);return mergeIntoListWith(this,merger,iters);};List.prototype.mergeDeep = function() /*...iters*/{return mergeIntoListWith(this,deepMerger,arguments);};List.prototype.mergeDeepWith = function(merger){var iters=SLICE$0.call(arguments,1);return mergeIntoListWith(this,deepMergerWith(merger),iters);};List.prototype.setSize = function(size){return setListBounds(this,0,size);}; // @pragma Iteration
	List.prototype.slice = function(begin,end){var size=this.size;if(wholeSlice(begin,end,size)){return this;}return setListBounds(this,resolveBegin(begin,size),resolveEnd(end,size));};List.prototype.__iterator = function(type,reverse){var index=0;var values=iterateList(this,reverse);return new Iterator(function(){var value=values();return value === DONE?iteratorDone():iteratorValue(type,index++,value);});};List.prototype.__iterate = function(fn,reverse){var index=0;var values=iterateList(this,reverse);var value;while((value = values()) !== DONE) {if(fn(value,index++,this) === false){break;}}return index;};List.prototype.__ensureOwner = function(ownerID){if(ownerID === this.__ownerID){return this;}if(!ownerID){this.__ownerID = ownerID;return this;}return makeList(this._origin,this._capacity,this._level,this._root,this._tail,ownerID,this.__hash);};function isList(maybeList){return !!(maybeList && maybeList[IS_LIST_SENTINEL]);}List.isList = isList;var IS_LIST_SENTINEL='@@__IMMUTABLE_LIST__@@';var ListPrototype=List.prototype;ListPrototype[IS_LIST_SENTINEL] = true;ListPrototype[DELETE] = ListPrototype.remove;ListPrototype.setIn = MapPrototype.setIn;ListPrototype.deleteIn = ListPrototype.removeIn = MapPrototype.removeIn;ListPrototype.update = MapPrototype.update;ListPrototype.updateIn = MapPrototype.updateIn;ListPrototype.mergeIn = MapPrototype.mergeIn;ListPrototype.mergeDeepIn = MapPrototype.mergeDeepIn;ListPrototype.withMutations = MapPrototype.withMutations;ListPrototype.asMutable = MapPrototype.asMutable;ListPrototype.asImmutable = MapPrototype.asImmutable;ListPrototype.wasAltered = MapPrototype.wasAltered;function VNode(array,ownerID){this.array = array;this.ownerID = ownerID;} // TODO: seems like these methods are very similar
	VNode.prototype.removeBefore = function(ownerID,level,index){if(index === level?1 << level:0 || this.array.length === 0){return this;}var originIndex=index >>> level & MASK;if(originIndex >= this.array.length){return new VNode([],ownerID);}var removingFirst=originIndex === 0;var newChild;if(level > 0){var oldChild=this.array[originIndex];newChild = oldChild && oldChild.removeBefore(ownerID,level - SHIFT,index);if(newChild === oldChild && removingFirst){return this;}}if(removingFirst && !newChild){return this;}var editable=editableVNode(this,ownerID);if(!removingFirst){for(var ii=0;ii < originIndex;ii++) {editable.array[ii] = undefined;}}if(newChild){editable.array[originIndex] = newChild;}return editable;};VNode.prototype.removeAfter = function(ownerID,level,index){if(index === (level?1 << level:0) || this.array.length === 0){return this;}var sizeIndex=index - 1 >>> level & MASK;if(sizeIndex >= this.array.length){return this;}var newChild;if(level > 0){var oldChild=this.array[sizeIndex];newChild = oldChild && oldChild.removeAfter(ownerID,level - SHIFT,index);if(newChild === oldChild && sizeIndex === this.array.length - 1){return this;}}var editable=editableVNode(this,ownerID);editable.array.splice(sizeIndex + 1);if(newChild){editable.array[sizeIndex] = newChild;}return editable;};var DONE={};function iterateList(list,reverse){var left=list._origin;var right=list._capacity;var tailPos=getTailOffset(right);var tail=list._tail;return iterateNodeOrLeaf(list._root,list._level,0);function iterateNodeOrLeaf(node,level,offset){return level === 0?iterateLeaf(node,offset):iterateNode(node,level,offset);}function iterateLeaf(node,offset){var array=offset === tailPos?tail && tail.array:node && node.array;var from=offset > left?0:left - offset;var to=right - offset;if(to > SIZE){to = SIZE;}return function(){if(from === to){return DONE;}var idx=reverse?--to:from++;return array && array[idx];};}function iterateNode(node,level,offset){var values;var array=node && node.array;var from=offset > left?0:left - offset >> level;var to=(right - offset >> level) + 1;if(to > SIZE){to = SIZE;}return function(){do {if(values){var value=values();if(value !== DONE){return value;}values = null;}if(from === to){return DONE;}var idx=reverse?--to:from++;values = iterateNodeOrLeaf(array && array[idx],level - SHIFT,offset + (idx << level));}while(true);};}}function makeList(origin,capacity,level,root,tail,ownerID,hash){var list=_Object$create(ListPrototype);list.size = capacity - origin;list._origin = origin;list._capacity = capacity;list._level = level;list._root = root;list._tail = tail;list.__ownerID = ownerID;list.__hash = hash;list.__altered = false;return list;}var EMPTY_LIST;function emptyList(){return EMPTY_LIST || (EMPTY_LIST = makeList(0,0,SHIFT));}function updateList(list,index,value){index = wrapIndex(list,index);if(index !== index){return list;}if(index >= list.size || index < 0){return list.withMutations(function(list){index < 0?setListBounds(list,index).set(0,value):setListBounds(list,0,index + 1).set(index,value);});}index += list._origin;var newTail=list._tail;var newRoot=list._root;var didAlter=MakeRef(DID_ALTER);if(index >= getTailOffset(list._capacity)){newTail = updateVNode(newTail,list.__ownerID,0,index,value,didAlter);}else {newRoot = updateVNode(newRoot,list.__ownerID,list._level,index,value,didAlter);}if(!didAlter.value){return list;}if(list.__ownerID){list._root = newRoot;list._tail = newTail;list.__hash = undefined;list.__altered = true;return list;}return makeList(list._origin,list._capacity,list._level,newRoot,newTail);}function updateVNode(node,ownerID,level,index,value,didAlter){var idx=index >>> level & MASK;var nodeHas=node && idx < node.array.length;if(!nodeHas && value === undefined){return node;}var newNode;if(level > 0){var lowerNode=node && node.array[idx];var newLowerNode=updateVNode(lowerNode,ownerID,level - SHIFT,index,value,didAlter);if(newLowerNode === lowerNode){return node;}newNode = editableVNode(node,ownerID);newNode.array[idx] = newLowerNode;return newNode;}if(nodeHas && node.array[idx] === value){return node;}SetRef(didAlter);newNode = editableVNode(node,ownerID);if(value === undefined && idx === newNode.array.length - 1){newNode.array.pop();}else {newNode.array[idx] = value;}return newNode;}function editableVNode(node,ownerID){if(ownerID && node && ownerID === node.ownerID){return node;}return new VNode(node?node.array.slice():[],ownerID);}function listNodeFor(list,rawIndex){if(rawIndex >= getTailOffset(list._capacity)){return list._tail;}if(rawIndex < 1 << list._level + SHIFT){var node=list._root;var level=list._level;while(node && level > 0) {node = node.array[rawIndex >>> level & MASK];level -= SHIFT;}return node;}}function setListBounds(list,begin,end){ // Sanitize begin & end using this shorthand for ToInt32(argument)
	// http://www.ecma-international.org/ecma-262/6.0/#sec-toint32
	if(begin !== undefined){begin = begin | 0;}if(end !== undefined){end = end | 0;}var owner=list.__ownerID || new OwnerID();var oldOrigin=list._origin;var oldCapacity=list._capacity;var newOrigin=oldOrigin + begin;var newCapacity=end === undefined?oldCapacity:end < 0?oldCapacity + end:oldOrigin + end;if(newOrigin === oldOrigin && newCapacity === oldCapacity){return list;} // If it's going to end after it starts, it's empty.
	if(newOrigin >= newCapacity){return list.clear();}var newLevel=list._level;var newRoot=list._root; // New origin might need creating a higher root.
	var offsetShift=0;while(newOrigin + offsetShift < 0) {newRoot = new VNode(newRoot && newRoot.array.length?[undefined,newRoot]:[],owner);newLevel += SHIFT;offsetShift += 1 << newLevel;}if(offsetShift){newOrigin += offsetShift;oldOrigin += offsetShift;newCapacity += offsetShift;oldCapacity += offsetShift;}var oldTailOffset=getTailOffset(oldCapacity);var newTailOffset=getTailOffset(newCapacity); // New size might need creating a higher root.
	while(newTailOffset >= 1 << newLevel + SHIFT) {newRoot = new VNode(newRoot && newRoot.array.length?[newRoot]:[],owner);newLevel += SHIFT;} // Locate or create the new tail.
	var oldTail=list._tail;var newTail=newTailOffset < oldTailOffset?listNodeFor(list,newCapacity - 1):newTailOffset > oldTailOffset?new VNode([],owner):oldTail; // Merge Tail into tree.
	if(oldTail && newTailOffset > oldTailOffset && newOrigin < oldCapacity && oldTail.array.length){newRoot = editableVNode(newRoot,owner);var node=newRoot;for(var level=newLevel;level > SHIFT;level -= SHIFT) {var idx=oldTailOffset >>> level & MASK;node = node.array[idx] = editableVNode(node.array[idx],owner);}node.array[oldTailOffset >>> SHIFT & MASK] = oldTail;} // If the size has been reduced, there's a chance the tail needs to be trimmed.
	if(newCapacity < oldCapacity){newTail = newTail && newTail.removeAfter(owner,0,newCapacity);} // If the new origin is within the tail, then we do not need a root.
	if(newOrigin >= newTailOffset){newOrigin -= newTailOffset;newCapacity -= newTailOffset;newLevel = SHIFT;newRoot = null;newTail = newTail && newTail.removeBefore(owner,0,newOrigin); // Otherwise, if the root has been trimmed, garbage collect.
	}else if(newOrigin > oldOrigin || newTailOffset < oldTailOffset){offsetShift = 0; // Identify the new top root node of the subtree of the old root.
	while(newRoot) {var beginIndex=newOrigin >>> newLevel & MASK;if(beginIndex !== newTailOffset >>> newLevel & MASK){break;}if(beginIndex){offsetShift += (1 << newLevel) * beginIndex;}newLevel -= SHIFT;newRoot = newRoot.array[beginIndex];} // Trim the new sides of the new root.
	if(newRoot && newOrigin > oldOrigin){newRoot = newRoot.removeBefore(owner,newLevel,newOrigin - offsetShift);}if(newRoot && newTailOffset < oldTailOffset){newRoot = newRoot.removeAfter(owner,newLevel,newTailOffset - offsetShift);}if(offsetShift){newOrigin -= offsetShift;newCapacity -= offsetShift;}}if(list.__ownerID){list.size = newCapacity - newOrigin;list._origin = newOrigin;list._capacity = newCapacity;list._level = newLevel;list._root = newRoot;list._tail = newTail;list.__hash = undefined;list.__altered = true;return list;}return makeList(newOrigin,newCapacity,newLevel,newRoot,newTail);}function mergeIntoListWith(list,merger,iterables){var iters=[];var maxSize=0;for(var ii=0;ii < iterables.length;ii++) {var value=iterables[ii];var iter=IndexedIterable(value);if(iter.size > maxSize){maxSize = iter.size;}if(!isIterable(value)){iter = iter.map(function(v){return fromJS(v);});}iters.push(iter);}if(maxSize > list.size){list = list.setSize(maxSize);}return mergeIntoCollectionWith(list,merger,iters);}function getTailOffset(size){return size < SIZE?0:size - 1 >>> SHIFT << SHIFT;}createClass(OrderedMap,Map); // @pragma Construction
	function OrderedMap(value){return value === null || value === undefined?emptyOrderedMap():isOrderedMap(value)?value:emptyOrderedMap().withMutations(function(map){var iter=KeyedIterable(value);assertNotInfinite(iter.size);iter.forEach(function(v,k){return map.set(k,v);});});}OrderedMap.of = function() /*...values*/{return this(arguments);};OrderedMap.prototype.toString = function(){return this.__toString('OrderedMap {','}');}; // @pragma Access
	OrderedMap.prototype.get = function(k,notSetValue){var index=this._map.get(k);return index !== undefined?this._list.get(index)[1]:notSetValue;}; // @pragma Modification
	OrderedMap.prototype.clear = function(){if(this.size === 0){return this;}if(this.__ownerID){this.size = 0;this._map.clear();this._list.clear();return this;}return emptyOrderedMap();};OrderedMap.prototype.set = function(k,v){return updateOrderedMap(this,k,v);};OrderedMap.prototype.remove = function(k){return updateOrderedMap(this,k,NOT_SET);};OrderedMap.prototype.wasAltered = function(){return this._map.wasAltered() || this._list.wasAltered();};OrderedMap.prototype.__iterate = function(fn,reverse){var this$0=this;return this._list.__iterate(function(entry){return entry && fn(entry[1],entry[0],this$0);},reverse);};OrderedMap.prototype.__iterator = function(type,reverse){return this._list.fromEntrySeq().__iterator(type,reverse);};OrderedMap.prototype.__ensureOwner = function(ownerID){if(ownerID === this.__ownerID){return this;}var newMap=this._map.__ensureOwner(ownerID);var newList=this._list.__ensureOwner(ownerID);if(!ownerID){this.__ownerID = ownerID;this._map = newMap;this._list = newList;return this;}return makeOrderedMap(newMap,newList,ownerID,this.__hash);};function isOrderedMap(maybeOrderedMap){return isMap(maybeOrderedMap) && isOrdered(maybeOrderedMap);}OrderedMap.isOrderedMap = isOrderedMap;OrderedMap.prototype[IS_ORDERED_SENTINEL] = true;OrderedMap.prototype[DELETE] = OrderedMap.prototype.remove;function makeOrderedMap(map,list,ownerID,hash){var omap=_Object$create(OrderedMap.prototype);omap.size = map?map.size:0;omap._map = map;omap._list = list;omap.__ownerID = ownerID;omap.__hash = hash;return omap;}var EMPTY_ORDERED_MAP;function emptyOrderedMap(){return EMPTY_ORDERED_MAP || (EMPTY_ORDERED_MAP = makeOrderedMap(emptyMap(),emptyList()));}function updateOrderedMap(omap,k,v){var map=omap._map;var list=omap._list;var i=map.get(k);var has=i !== undefined;var newMap;var newList;if(v === NOT_SET){ // removed
	if(!has){return omap;}if(list.size >= SIZE && list.size >= map.size * 2){newList = list.filter(function(entry,idx){return entry !== undefined && i !== idx;});newMap = newList.toKeyedSeq().map(function(entry){return entry[0];}).flip().toMap();if(omap.__ownerID){newMap.__ownerID = newList.__ownerID = omap.__ownerID;}}else {newMap = map.remove(k);newList = i === list.size - 1?list.pop():list.set(i,undefined);}}else {if(has){if(v === list.get(i)[1]){return omap;}newMap = map;newList = list.set(i,[k,v]);}else {newMap = map.set(k,list.size);newList = list.set(list.size,[k,v]);}}if(omap.__ownerID){omap.size = newMap.size;omap._map = newMap;omap._list = newList;omap.__hash = undefined;return omap;}return makeOrderedMap(newMap,newList);}createClass(ToKeyedSequence,KeyedSeq);function ToKeyedSequence(indexed,useKeys){this._iter = indexed;this._useKeys = useKeys;this.size = indexed.size;}ToKeyedSequence.prototype.get = function(key,notSetValue){return this._iter.get(key,notSetValue);};ToKeyedSequence.prototype.has = function(key){return this._iter.has(key);};ToKeyedSequence.prototype.valueSeq = function(){return this._iter.valueSeq();};ToKeyedSequence.prototype.reverse = function(){var this$0=this;var reversedSequence=reverseFactory(this,true);if(!this._useKeys){reversedSequence.valueSeq = function(){return this$0._iter.toSeq().reverse();};}return reversedSequence;};ToKeyedSequence.prototype.map = function(mapper,context){var this$0=this;var mappedSequence=mapFactory(this,mapper,context);if(!this._useKeys){mappedSequence.valueSeq = function(){return this$0._iter.toSeq().map(mapper,context);};}return mappedSequence;};ToKeyedSequence.prototype.__iterate = function(fn,reverse){var this$0=this;var ii;return this._iter.__iterate(this._useKeys?function(v,k){return fn(v,k,this$0);}:(ii = reverse?resolveSize(this):0,function(v){return fn(v,reverse?--ii:ii++,this$0);}),reverse);};ToKeyedSequence.prototype.__iterator = function(type,reverse){if(this._useKeys){return this._iter.__iterator(type,reverse);}var iterator=this._iter.__iterator(ITERATE_VALUES,reverse);var ii=reverse?resolveSize(this):0;return new Iterator(function(){var step=iterator.next();return step.done?step:iteratorValue(type,reverse?--ii:ii++,step.value,step);});};ToKeyedSequence.prototype[IS_ORDERED_SENTINEL] = true;createClass(ToIndexedSequence,IndexedSeq);function ToIndexedSequence(iter){this._iter = iter;this.size = iter.size;}ToIndexedSequence.prototype.includes = function(value){return this._iter.includes(value);};ToIndexedSequence.prototype.__iterate = function(fn,reverse){var this$0=this;var iterations=0;return this._iter.__iterate(function(v){return fn(v,iterations++,this$0);},reverse);};ToIndexedSequence.prototype.__iterator = function(type,reverse){var iterator=this._iter.__iterator(ITERATE_VALUES,reverse);var iterations=0;return new Iterator(function(){var step=iterator.next();return step.done?step:iteratorValue(type,iterations++,step.value,step);});};createClass(ToSetSequence,SetSeq);function ToSetSequence(iter){this._iter = iter;this.size = iter.size;}ToSetSequence.prototype.has = function(key){return this._iter.includes(key);};ToSetSequence.prototype.__iterate = function(fn,reverse){var this$0=this;return this._iter.__iterate(function(v){return fn(v,v,this$0);},reverse);};ToSetSequence.prototype.__iterator = function(type,reverse){var iterator=this._iter.__iterator(ITERATE_VALUES,reverse);return new Iterator(function(){var step=iterator.next();return step.done?step:iteratorValue(type,step.value,step.value,step);});};createClass(FromEntriesSequence,KeyedSeq);function FromEntriesSequence(entries){this._iter = entries;this.size = entries.size;}FromEntriesSequence.prototype.entrySeq = function(){return this._iter.toSeq();};FromEntriesSequence.prototype.__iterate = function(fn,reverse){var this$0=this;return this._iter.__iterate(function(entry){ // Check if entry exists first so array access doesn't throw for holes
	// in the parent iteration.
	if(entry){validateEntry(entry);var indexedIterable=isIterable(entry);return fn(indexedIterable?entry.get(1):entry[1],indexedIterable?entry.get(0):entry[0],this$0);}},reverse);};FromEntriesSequence.prototype.__iterator = function(type,reverse){var iterator=this._iter.__iterator(ITERATE_VALUES,reverse);return new Iterator(function(){while(true) {var step=iterator.next();if(step.done){return step;}var entry=step.value; // Check if entry exists first so array access doesn't throw for holes
	// in the parent iteration.
	if(entry){validateEntry(entry);var indexedIterable=isIterable(entry);return iteratorValue(type,indexedIterable?entry.get(0):entry[0],indexedIterable?entry.get(1):entry[1],step);}}});};ToIndexedSequence.prototype.cacheResult = ToKeyedSequence.prototype.cacheResult = ToSetSequence.prototype.cacheResult = FromEntriesSequence.prototype.cacheResult = cacheResultThrough;function flipFactory(iterable){var flipSequence=makeSequence(iterable);flipSequence._iter = iterable;flipSequence.size = iterable.size;flipSequence.flip = function(){return iterable;};flipSequence.reverse = function(){var reversedSequence=iterable.reverse.apply(this); // super.reverse()
	reversedSequence.flip = function(){return iterable.reverse();};return reversedSequence;};flipSequence.has = function(key){return iterable.includes(key);};flipSequence.includes = function(key){return iterable.has(key);};flipSequence.cacheResult = cacheResultThrough;flipSequence.__iterateUncached = function(fn,reverse){var this$0=this;return iterable.__iterate(function(v,k){return fn(k,v,this$0) !== false;},reverse);};flipSequence.__iteratorUncached = function(type,reverse){if(type === ITERATE_ENTRIES){var iterator=iterable.__iterator(type,reverse);return new Iterator(function(){var step=iterator.next();if(!step.done){var k=step.value[0];step.value[0] = step.value[1];step.value[1] = k;}return step;});}return iterable.__iterator(type === ITERATE_VALUES?ITERATE_KEYS:ITERATE_VALUES,reverse);};return flipSequence;}function mapFactory(iterable,mapper,context){var mappedSequence=makeSequence(iterable);mappedSequence.size = iterable.size;mappedSequence.has = function(key){return iterable.has(key);};mappedSequence.get = function(key,notSetValue){var v=iterable.get(key,NOT_SET);return v === NOT_SET?notSetValue:mapper.call(context,v,key,iterable);};mappedSequence.__iterateUncached = function(fn,reverse){var this$0=this;return iterable.__iterate(function(v,k,c){return fn(mapper.call(context,v,k,c),k,this$0) !== false;},reverse);};mappedSequence.__iteratorUncached = function(type,reverse){var iterator=iterable.__iterator(ITERATE_ENTRIES,reverse);return new Iterator(function(){var step=iterator.next();if(step.done){return step;}var entry=step.value;var key=entry[0];return iteratorValue(type,key,mapper.call(context,entry[1],key,iterable),step);});};return mappedSequence;}function reverseFactory(iterable,useKeys){var reversedSequence=makeSequence(iterable);reversedSequence._iter = iterable;reversedSequence.size = iterable.size;reversedSequence.reverse = function(){return iterable;};if(iterable.flip){reversedSequence.flip = function(){var flipSequence=flipFactory(iterable);flipSequence.reverse = function(){return iterable.flip();};return flipSequence;};}reversedSequence.get = function(key,notSetValue){return iterable.get(useKeys?key:-1 - key,notSetValue);};reversedSequence.has = function(key){return iterable.has(useKeys?key:-1 - key);};reversedSequence.includes = function(value){return iterable.includes(value);};reversedSequence.cacheResult = cacheResultThrough;reversedSequence.__iterate = function(fn,reverse){var this$0=this;return iterable.__iterate(function(v,k){return fn(v,k,this$0);},!reverse);};reversedSequence.__iterator = function(type,reverse){return iterable.__iterator(type,!reverse);};return reversedSequence;}function filterFactory(iterable,predicate,context,useKeys){var filterSequence=makeSequence(iterable);if(useKeys){filterSequence.has = function(key){var v=iterable.get(key,NOT_SET);return v !== NOT_SET && !!predicate.call(context,v,key,iterable);};filterSequence.get = function(key,notSetValue){var v=iterable.get(key,NOT_SET);return v !== NOT_SET && predicate.call(context,v,key,iterable)?v:notSetValue;};}filterSequence.__iterateUncached = function(fn,reverse){var this$0=this;var iterations=0;iterable.__iterate(function(v,k,c){if(predicate.call(context,v,k,c)){iterations++;return fn(v,useKeys?k:iterations - 1,this$0);}},reverse);return iterations;};filterSequence.__iteratorUncached = function(type,reverse){var iterator=iterable.__iterator(ITERATE_ENTRIES,reverse);var iterations=0;return new Iterator(function(){while(true) {var step=iterator.next();if(step.done){return step;}var entry=step.value;var key=entry[0];var value=entry[1];if(predicate.call(context,value,key,iterable)){return iteratorValue(type,useKeys?key:iterations++,value,step);}}});};return filterSequence;}function countByFactory(iterable,grouper,context){var groups=Map().asMutable();iterable.__iterate(function(v,k){groups.update(grouper.call(context,v,k,iterable),0,function(a){return a + 1;});});return groups.asImmutable();}function groupByFactory(iterable,grouper,context){var isKeyedIter=isKeyed(iterable);var groups=(isOrdered(iterable)?OrderedMap():Map()).asMutable();iterable.__iterate(function(v,k){groups.update(grouper.call(context,v,k,iterable),function(a){return a = a || [],a.push(isKeyedIter?[k,v]:v),a;});});var coerce=iterableClass(iterable);return groups.map(function(arr){return reify(iterable,coerce(arr));});}function sliceFactory(_x,_x2,_x3,_x4){var _again=true;_function: while(_again) {var iterable=_x,begin=_x2,end=_x3,useKeys=_x4;_again = false;var originalSize=iterable.size; // Sanitize begin & end using this shorthand for ToInt32(argument)
	// http://www.ecma-international.org/ecma-262/6.0/#sec-toint32
	if(begin !== undefined){begin = begin | 0;}if(end !== undefined){end = end | 0;}if(wholeSlice(begin,end,originalSize)){return iterable;}var resolvedBegin=resolveBegin(begin,originalSize);var resolvedEnd=resolveEnd(end,originalSize); // begin or end will be NaN if they were provided as negative numbers and
	// this iterable's size is unknown. In that case, cache first so there is
	// a known size and these do not resolve to NaN.
	if(resolvedBegin !== resolvedBegin || resolvedEnd !== resolvedEnd){_x = iterable.toSeq().cacheResult();_x2 = begin;_x3 = end;_x4 = useKeys;_again = true;originalSize = resolvedBegin = resolvedEnd = undefined;continue _function;} // Note: resolvedEnd is undefined when the original sequence's length is
	// unknown and this slice did not supply an end and should contain all
	// elements after resolvedBegin.
	// In that case, resolvedSize will be NaN and sliceSize will remain undefined.
	var resolvedSize=resolvedEnd - resolvedBegin;var sliceSize;if(resolvedSize === resolvedSize){sliceSize = resolvedSize < 0?0:resolvedSize;}var sliceSeq=makeSequence(iterable); // If iterable.size is undefined, the size of the realized sliceSeq is
	// unknown at this point unless the number of items to slice is 0
	sliceSeq.size = sliceSize === 0?sliceSize:iterable.size && sliceSize || undefined;if(!useKeys && isSeq(iterable) && sliceSize >= 0){sliceSeq.get = function(index,notSetValue){index = wrapIndex(this,index);return index >= 0 && index < sliceSize?iterable.get(index + resolvedBegin,notSetValue):notSetValue;};}sliceSeq.__iterateUncached = function(fn,reverse){var this$0=this;if(sliceSize === 0){return 0;}if(reverse){return this.cacheResult().__iterate(fn,reverse);}var skipped=0;var isSkipping=true;var iterations=0;iterable.__iterate(function(v,k){if(!(isSkipping && (isSkipping = skipped++ < resolvedBegin))){iterations++;return fn(v,useKeys?k:iterations - 1,this$0) !== false && iterations !== sliceSize;}});return iterations;};sliceSeq.__iteratorUncached = function(type,reverse){if(sliceSize !== 0 && reverse){return this.cacheResult().__iterator(type,reverse);} // Don't bother instantiating parent iterator if taking 0.
	var iterator=sliceSize !== 0 && iterable.__iterator(type,reverse);var skipped=0;var iterations=0;return new Iterator(function(){while(skipped++ < resolvedBegin) {iterator.next();}if(++iterations > sliceSize){return iteratorDone();}var step=iterator.next();if(useKeys || type === ITERATE_VALUES){return step;}else if(type === ITERATE_KEYS){return iteratorValue(type,iterations - 1,undefined,step);}else {return iteratorValue(type,iterations - 1,step.value[1],step);}});};return sliceSeq;}}function takeWhileFactory(iterable,predicate,context){var takeSequence=makeSequence(iterable);takeSequence.__iterateUncached = function(fn,reverse){var this$0=this;if(reverse){return this.cacheResult().__iterate(fn,reverse);}var iterations=0;iterable.__iterate(function(v,k,c){return predicate.call(context,v,k,c) && ++iterations && fn(v,k,this$0);});return iterations;};takeSequence.__iteratorUncached = function(type,reverse){var this$0=this;if(reverse){return this.cacheResult().__iterator(type,reverse);}var iterator=iterable.__iterator(ITERATE_ENTRIES,reverse);var iterating=true;return new Iterator(function(){if(!iterating){return iteratorDone();}var step=iterator.next();if(step.done){return step;}var entry=step.value;var k=entry[0];var v=entry[1];if(!predicate.call(context,v,k,this$0)){iterating = false;return iteratorDone();}return type === ITERATE_ENTRIES?step:iteratorValue(type,k,v,step);});};return takeSequence;}function skipWhileFactory(iterable,predicate,context,useKeys){var skipSequence=makeSequence(iterable);skipSequence.__iterateUncached = function(fn,reverse){var this$0=this;if(reverse){return this.cacheResult().__iterate(fn,reverse);}var isSkipping=true;var iterations=0;iterable.__iterate(function(v,k,c){if(!(isSkipping && (isSkipping = predicate.call(context,v,k,c)))){iterations++;return fn(v,useKeys?k:iterations - 1,this$0);}});return iterations;};skipSequence.__iteratorUncached = function(type,reverse){var this$0=this;if(reverse){return this.cacheResult().__iterator(type,reverse);}var iterator=iterable.__iterator(ITERATE_ENTRIES,reverse);var skipping=true;var iterations=0;return new Iterator(function(){var step,k,v;do {step = iterator.next();if(step.done){if(useKeys || type === ITERATE_VALUES){return step;}else if(type === ITERATE_KEYS){return iteratorValue(type,iterations++,undefined,step);}else {return iteratorValue(type,iterations++,step.value[1],step);}}var entry=step.value;k = entry[0];v = entry[1];skipping && (skipping = predicate.call(context,v,k,this$0));}while(skipping);return type === ITERATE_ENTRIES?step:iteratorValue(type,k,v,step);});};return skipSequence;}function concatFactory(iterable,values){var isKeyedIterable=isKeyed(iterable);var iters=[iterable].concat(values).map(function(v){if(!isIterable(v)){v = isKeyedIterable?keyedSeqFromValue(v):indexedSeqFromValue(Array.isArray(v)?v:[v]);}else if(isKeyedIterable){v = KeyedIterable(v);}return v;}).filter(function(v){return v.size !== 0;});if(iters.length === 0){return iterable;}if(iters.length === 1){var singleton=iters[0];if(singleton === iterable || isKeyedIterable && isKeyed(singleton) || isIndexed(iterable) && isIndexed(singleton)){return singleton;}}var concatSeq=new ArraySeq(iters);if(isKeyedIterable){concatSeq = concatSeq.toKeyedSeq();}else if(!isIndexed(iterable)){concatSeq = concatSeq.toSetSeq();}concatSeq = concatSeq.flatten(true);concatSeq.size = iters.reduce(function(sum,seq){if(sum !== undefined){var size=seq.size;if(size !== undefined){return sum + size;}}},0);return concatSeq;}function flattenFactory(iterable,depth,useKeys){var flatSequence=makeSequence(iterable);flatSequence.__iterateUncached = function(fn,reverse){var iterations=0;var stopped=false;function flatDeep(iter,currentDepth){var this$0=this;iter.__iterate(function(v,k){if((!depth || currentDepth < depth) && isIterable(v)){flatDeep(v,currentDepth + 1);}else if(fn(v,useKeys?k:iterations++,this$0) === false){stopped = true;}return !stopped;},reverse);}flatDeep(iterable,0);return iterations;};flatSequence.__iteratorUncached = function(type,reverse){var iterator=iterable.__iterator(type,reverse);var stack=[];var iterations=0;return new Iterator(function(){while(iterator) {var step=iterator.next();if(step.done !== false){iterator = stack.pop();continue;}var v=step.value;if(type === ITERATE_ENTRIES){v = v[1];}if((!depth || stack.length < depth) && isIterable(v)){stack.push(iterator);iterator = v.__iterator(type,reverse);}else {return useKeys?step:iteratorValue(type,iterations++,v,step);}}return iteratorDone();});};return flatSequence;}function flatMapFactory(iterable,mapper,context){var coerce=iterableClass(iterable);return iterable.toSeq().map(function(v,k){return coerce(mapper.call(context,v,k,iterable));}).flatten(true);}function interposeFactory(iterable,separator){var interposedSequence=makeSequence(iterable);interposedSequence.size = iterable.size && iterable.size * 2 - 1;interposedSequence.__iterateUncached = function(fn,reverse){var this$0=this;var iterations=0;iterable.__iterate(function(v,k){return (!iterations || fn(separator,iterations++,this$0) !== false) && fn(v,iterations++,this$0) !== false;},reverse);return iterations;};interposedSequence.__iteratorUncached = function(type,reverse){var iterator=iterable.__iterator(ITERATE_VALUES,reverse);var iterations=0;var step;return new Iterator(function(){if(!step || iterations % 2){step = iterator.next();if(step.done){return step;}}return iterations % 2?iteratorValue(type,iterations++,separator):iteratorValue(type,iterations++,step.value,step);});};return interposedSequence;}function sortFactory(iterable,comparator,mapper){if(!comparator){comparator = defaultComparator;}var isKeyedIterable=isKeyed(iterable);var index=0;var entries=iterable.toSeq().map(function(v,k){return [k,v,index++,mapper?mapper(v,k,iterable):v];}).toArray();entries.sort(function(a,b){return comparator(a[3],b[3]) || a[2] - b[2];}).forEach(isKeyedIterable?function(v,i){entries[i].length = 2;}:function(v,i){entries[i] = v[1];});return isKeyedIterable?KeyedSeq(entries):isIndexed(iterable)?IndexedSeq(entries):SetSeq(entries);}function maxFactory(iterable,comparator,mapper){if(!comparator){comparator = defaultComparator;}if(mapper){var entry=iterable.toSeq().map(function(v,k){return [v,mapper(v,k,iterable)];}).reduce(function(a,b){return maxCompare(comparator,a[1],b[1])?b:a;});return entry && entry[0];}else {return iterable.reduce(function(a,b){return maxCompare(comparator,a,b)?b:a;});}}function maxCompare(comparator,a,b){var comp=comparator(b,a); // b is considered the new max if the comparator declares them equal, but
	// they are not equal and b is in fact a nullish value.
	return comp === 0 && b !== a && (b === undefined || b === null || b !== b) || comp > 0;}function zipWithFactory(keyIter,zipper,iters){var zipSequence=makeSequence(keyIter);zipSequence.size = new ArraySeq(iters).map(function(i){return i.size;}).min(); // Note: this a generic base implementation of __iterate in terms of
	// __iterator which may be more generically useful in the future.
	zipSequence.__iterate = function(fn,reverse){ /* generic:
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
	      */ // indexed:
	var iterator=this.__iterator(ITERATE_VALUES,reverse);var step;var iterations=0;while(!(step = iterator.next()).done) {if(fn(step.value,iterations++,this) === false){break;}}return iterations;};zipSequence.__iteratorUncached = function(type,reverse){var iterators=iters.map(function(i){return i = Iterable(i),getIterator(reverse?i.reverse():i);});var iterations=0;var isDone=false;return new Iterator(function(){var steps;if(!isDone){steps = iterators.map(function(i){return i.next();});isDone = steps.some(function(s){return s.done;});}if(isDone){return iteratorDone();}return iteratorValue(type,iterations++,zipper.apply(null,steps.map(function(s){return s.value;})));});};return zipSequence;} // #pragma Helper Functions
	function reify(iter,seq){return isSeq(iter)?seq:iter.constructor(seq);}function validateEntry(entry){if(entry !== Object(entry)){throw new TypeError('Expected [K, V] tuple: ' + entry);}}function resolveSize(iter){assertNotInfinite(iter.size);return ensureSize(iter);}function iterableClass(iterable){return isKeyed(iterable)?KeyedIterable:isIndexed(iterable)?IndexedIterable:SetIterable;}function makeSequence(iterable){return _Object$create((isKeyed(iterable)?KeyedSeq:isIndexed(iterable)?IndexedSeq:SetSeq).prototype);}function cacheResultThrough(){if(this._iter.cacheResult){this._iter.cacheResult();this.size = this._iter.size;return this;}else {return Seq.prototype.cacheResult.call(this);}}function defaultComparator(a,b){return a > b?1:a < b?-1:0;}function forceIterator(keyPath){var iter=getIterator(keyPath);if(!iter){ // Array might not be iterable in this environment, so we need a fallback
	// to our wrapped type.
	if(!isArrayLike(keyPath)){throw new TypeError('Expected iterable or array-like: ' + keyPath);}iter = getIterator(Iterable(keyPath));}return iter;}createClass(Record,KeyedCollection);function Record(defaultValues,name){var hasInitialized;var RecordType=function Record(values){if(values instanceof RecordType){return values;}if(!(this instanceof RecordType)){return new RecordType(values);}if(!hasInitialized){hasInitialized = true;var keys=_Object$keys(defaultValues);setProps(RecordTypePrototype,keys);RecordTypePrototype.size = keys.length;RecordTypePrototype._name = name;RecordTypePrototype._keys = keys;RecordTypePrototype._defaultValues = defaultValues;}this._map = Map(values);};var RecordTypePrototype=RecordType.prototype = _Object$create(RecordPrototype);RecordTypePrototype.constructor = RecordType;return RecordType;}Record.prototype.toString = function(){return this.__toString(recordName(this) + ' {','}');}; // @pragma Access
	Record.prototype.has = function(k){return this._defaultValues.hasOwnProperty(k);};Record.prototype.get = function(k,notSetValue){if(!this.has(k)){return notSetValue;}var defaultVal=this._defaultValues[k];return this._map?this._map.get(k,defaultVal):defaultVal;}; // @pragma Modification
	Record.prototype.clear = function(){if(this.__ownerID){this._map && this._map.clear();return this;}var RecordType=this.constructor;return RecordType._empty || (RecordType._empty = makeRecord(this,emptyMap()));};Record.prototype.set = function(k,v){if(!this.has(k)){throw new Error('Cannot set unknown key "' + k + '" on ' + recordName(this));}var newMap=this._map && this._map.set(k,v);if(this.__ownerID || newMap === this._map){return this;}return makeRecord(this,newMap);};Record.prototype.remove = function(k){if(!this.has(k)){return this;}var newMap=this._map && this._map.remove(k);if(this.__ownerID || newMap === this._map){return this;}return makeRecord(this,newMap);};Record.prototype.wasAltered = function(){return this._map.wasAltered();};Record.prototype.__iterator = function(type,reverse){var this$0=this;return KeyedIterable(this._defaultValues).map(function(_,k){return this$0.get(k);}).__iterator(type,reverse);};Record.prototype.__iterate = function(fn,reverse){var this$0=this;return KeyedIterable(this._defaultValues).map(function(_,k){return this$0.get(k);}).__iterate(fn,reverse);};Record.prototype.__ensureOwner = function(ownerID){if(ownerID === this.__ownerID){return this;}var newMap=this._map && this._map.__ensureOwner(ownerID);if(!ownerID){this.__ownerID = ownerID;this._map = newMap;return this;}return makeRecord(this,newMap,ownerID);};var RecordPrototype=Record.prototype;RecordPrototype[DELETE] = RecordPrototype.remove;RecordPrototype.deleteIn = RecordPrototype.removeIn = MapPrototype.removeIn;RecordPrototype.merge = MapPrototype.merge;RecordPrototype.mergeWith = MapPrototype.mergeWith;RecordPrototype.mergeIn = MapPrototype.mergeIn;RecordPrototype.mergeDeep = MapPrototype.mergeDeep;RecordPrototype.mergeDeepWith = MapPrototype.mergeDeepWith;RecordPrototype.mergeDeepIn = MapPrototype.mergeDeepIn;RecordPrototype.setIn = MapPrototype.setIn;RecordPrototype.update = MapPrototype.update;RecordPrototype.updateIn = MapPrototype.updateIn;RecordPrototype.withMutations = MapPrototype.withMutations;RecordPrototype.asMutable = MapPrototype.asMutable;RecordPrototype.asImmutable = MapPrototype.asImmutable;function makeRecord(likeRecord,map,ownerID){var record=_Object$create(Object.getPrototypeOf(likeRecord));record._map = map;record.__ownerID = ownerID;return record;}function recordName(record){return record._name || record.constructor.name || 'Record';}function setProps(prototype,names){try{names.forEach(setProp.bind(undefined,prototype));}catch(error) { // Object.defineProperty failed. Probably IE8.
	}}function setProp(prototype,name){_Object$defineProperty(prototype,name,{get:function get(){return this.get(name);},set:function set(value){invariant(this.__ownerID,'Cannot set on an immutable record.');this.set(name,value);}});}createClass(Set,SetCollection); // @pragma Construction
	function Set(value){return value === null || value === undefined?emptySet():isSet(value) && !isOrdered(value)?value:emptySet().withMutations(function(set){var iter=SetIterable(value);assertNotInfinite(iter.size);iter.forEach(function(v){return set.add(v);});});}Set.of = function() /*...values*/{return this(arguments);};Set.fromKeys = function(value){return this(KeyedIterable(value).keySeq());};Set.prototype.toString = function(){return this.__toString('Set {','}');}; // @pragma Access
	Set.prototype.has = function(value){return this._map.has(value);}; // @pragma Modification
	Set.prototype.add = function(value){return updateSet(this,this._map.set(value,true));};Set.prototype.remove = function(value){return updateSet(this,this._map.remove(value));};Set.prototype.clear = function(){return updateSet(this,this._map.clear());}; // @pragma Composition
	Set.prototype.union = function(){var iters=SLICE$0.call(arguments,0);iters = iters.filter(function(x){return x.size !== 0;});if(iters.length === 0){return this;}if(this.size === 0 && !this.__ownerID && iters.length === 1){return this.constructor(iters[0]);}return this.withMutations(function(set){for(var ii=0;ii < iters.length;ii++) {SetIterable(iters[ii]).forEach(function(value){return set.add(value);});}});};Set.prototype.intersect = function(){var iters=SLICE$0.call(arguments,0);if(iters.length === 0){return this;}iters = iters.map(function(iter){return SetIterable(iter);});var originalSet=this;return this.withMutations(function(set){originalSet.forEach(function(value){if(!iters.every(function(iter){return iter.includes(value);})){set.remove(value);}});});};Set.prototype.subtract = function(){var iters=SLICE$0.call(arguments,0);if(iters.length === 0){return this;}iters = iters.map(function(iter){return SetIterable(iter);});var originalSet=this;return this.withMutations(function(set){originalSet.forEach(function(value){if(iters.some(function(iter){return iter.includes(value);})){set.remove(value);}});});};Set.prototype.merge = function(){return this.union.apply(this,arguments);};Set.prototype.mergeWith = function(merger){var iters=SLICE$0.call(arguments,1);return this.union.apply(this,iters);};Set.prototype.sort = function(comparator){ // Late binding
	return OrderedSet(sortFactory(this,comparator));};Set.prototype.sortBy = function(mapper,comparator){ // Late binding
	return OrderedSet(sortFactory(this,comparator,mapper));};Set.prototype.wasAltered = function(){return this._map.wasAltered();};Set.prototype.__iterate = function(fn,reverse){var this$0=this;return this._map.__iterate(function(_,k){return fn(k,k,this$0);},reverse);};Set.prototype.__iterator = function(type,reverse){return this._map.map(function(_,k){return k;}).__iterator(type,reverse);};Set.prototype.__ensureOwner = function(ownerID){if(ownerID === this.__ownerID){return this;}var newMap=this._map.__ensureOwner(ownerID);if(!ownerID){this.__ownerID = ownerID;this._map = newMap;return this;}return this.__make(newMap,ownerID);};function isSet(maybeSet){return !!(maybeSet && maybeSet[IS_SET_SENTINEL]);}Set.isSet = isSet;var IS_SET_SENTINEL='@@__IMMUTABLE_SET__@@';var SetPrototype=Set.prototype;SetPrototype[IS_SET_SENTINEL] = true;SetPrototype[DELETE] = SetPrototype.remove;SetPrototype.mergeDeep = SetPrototype.merge;SetPrototype.mergeDeepWith = SetPrototype.mergeWith;SetPrototype.withMutations = MapPrototype.withMutations;SetPrototype.asMutable = MapPrototype.asMutable;SetPrototype.asImmutable = MapPrototype.asImmutable;SetPrototype.__empty = emptySet;SetPrototype.__make = makeSet;function updateSet(set,newMap){if(set.__ownerID){set.size = newMap.size;set._map = newMap;return set;}return newMap === set._map?set:newMap.size === 0?set.__empty():set.__make(newMap);}function makeSet(map,ownerID){var set=_Object$create(SetPrototype);set.size = map?map.size:0;set._map = map;set.__ownerID = ownerID;return set;}var EMPTY_SET;function emptySet(){return EMPTY_SET || (EMPTY_SET = makeSet(emptyMap()));}createClass(OrderedSet,Set); // @pragma Construction
	function OrderedSet(value){return value === null || value === undefined?emptyOrderedSet():isOrderedSet(value)?value:emptyOrderedSet().withMutations(function(set){var iter=SetIterable(value);assertNotInfinite(iter.size);iter.forEach(function(v){return set.add(v);});});}OrderedSet.of = function() /*...values*/{return this(arguments);};OrderedSet.fromKeys = function(value){return this(KeyedIterable(value).keySeq());};OrderedSet.prototype.toString = function(){return this.__toString('OrderedSet {','}');};function isOrderedSet(maybeOrderedSet){return isSet(maybeOrderedSet) && isOrdered(maybeOrderedSet);}OrderedSet.isOrderedSet = isOrderedSet;var OrderedSetPrototype=OrderedSet.prototype;OrderedSetPrototype[IS_ORDERED_SENTINEL] = true;OrderedSetPrototype.__empty = emptyOrderedSet;OrderedSetPrototype.__make = makeOrderedSet;function makeOrderedSet(map,ownerID){var set=_Object$create(OrderedSetPrototype);set.size = map?map.size:0;set._map = map;set.__ownerID = ownerID;return set;}var EMPTY_ORDERED_SET;function emptyOrderedSet(){return EMPTY_ORDERED_SET || (EMPTY_ORDERED_SET = makeOrderedSet(emptyOrderedMap()));}createClass(Stack,IndexedCollection); // @pragma Construction
	function Stack(value){return value === null || value === undefined?emptyStack():isStack(value)?value:emptyStack().unshiftAll(value);}Stack.of = function() /*...values*/{return this(arguments);};Stack.prototype.toString = function(){return this.__toString('Stack [',']');}; // @pragma Access
	Stack.prototype.get = function(index,notSetValue){var head=this._head;index = wrapIndex(this,index);while(head && index--) {head = head.next;}return head?head.value:notSetValue;};Stack.prototype.peek = function(){return this._head && this._head.value;}; // @pragma Modification
	Stack.prototype.push = function() /*...values*/{if(arguments.length === 0){return this;}var newSize=this.size + arguments.length;var head=this._head;for(var ii=arguments.length - 1;ii >= 0;ii--) {head = {value:arguments[ii],next:head};}if(this.__ownerID){this.size = newSize;this._head = head;this.__hash = undefined;this.__altered = true;return this;}return makeStack(newSize,head);};Stack.prototype.pushAll = function(iter){iter = IndexedIterable(iter);if(iter.size === 0){return this;}assertNotInfinite(iter.size);var newSize=this.size;var head=this._head;iter.reverse().forEach(function(value){newSize++;head = {value:value,next:head};});if(this.__ownerID){this.size = newSize;this._head = head;this.__hash = undefined;this.__altered = true;return this;}return makeStack(newSize,head);};Stack.prototype.pop = function(){return this.slice(1);};Stack.prototype.unshift = function() /*...values*/{return this.push.apply(this,arguments);};Stack.prototype.unshiftAll = function(iter){return this.pushAll(iter);};Stack.prototype.shift = function(){return this.pop.apply(this,arguments);};Stack.prototype.clear = function(){if(this.size === 0){return this;}if(this.__ownerID){this.size = 0;this._head = undefined;this.__hash = undefined;this.__altered = true;return this;}return emptyStack();};Stack.prototype.slice = function(begin,end){if(wholeSlice(begin,end,this.size)){return this;}var resolvedBegin=resolveBegin(begin,this.size);var resolvedEnd=resolveEnd(end,this.size);if(resolvedEnd !== this.size){ // super.slice(begin, end);
	return IndexedCollection.prototype.slice.call(this,begin,end);}var newSize=this.size - resolvedBegin;var head=this._head;while(resolvedBegin--) {head = head.next;}if(this.__ownerID){this.size = newSize;this._head = head;this.__hash = undefined;this.__altered = true;return this;}return makeStack(newSize,head);}; // @pragma Mutability
	Stack.prototype.__ensureOwner = function(ownerID){if(ownerID === this.__ownerID){return this;}if(!ownerID){this.__ownerID = ownerID;this.__altered = false;return this;}return makeStack(this.size,this._head,ownerID,this.__hash);}; // @pragma Iteration
	Stack.prototype.__iterate = function(fn,reverse){if(reverse){return this.reverse().__iterate(fn);}var iterations=0;var node=this._head;while(node) {if(fn(node.value,iterations++,this) === false){break;}node = node.next;}return iterations;};Stack.prototype.__iterator = function(type,reverse){if(reverse){return this.reverse().__iterator(type);}var iterations=0;var node=this._head;return new Iterator(function(){if(node){var value=node.value;node = node.next;return iteratorValue(type,iterations++,value);}return iteratorDone();});};function isStack(maybeStack){return !!(maybeStack && maybeStack[IS_STACK_SENTINEL]);}Stack.isStack = isStack;var IS_STACK_SENTINEL='@@__IMMUTABLE_STACK__@@';var StackPrototype=Stack.prototype;StackPrototype[IS_STACK_SENTINEL] = true;StackPrototype.withMutations = MapPrototype.withMutations;StackPrototype.asMutable = MapPrototype.asMutable;StackPrototype.asImmutable = MapPrototype.asImmutable;StackPrototype.wasAltered = MapPrototype.wasAltered;function makeStack(size,head,ownerID,hash){var map=_Object$create(StackPrototype);map.size = size;map._head = head;map.__ownerID = ownerID;map.__hash = hash;map.__altered = false;return map;}var EMPTY_STACK;function emptyStack(){return EMPTY_STACK || (EMPTY_STACK = makeStack(0));} /**
	   * Contributes additional methods to a constructor
	   */function mixin(ctor,methods){var keyCopier=function keyCopier(key){ctor.prototype[key] = methods[key];};_Object$keys(methods).forEach(keyCopier);_Object$getOwnPropertySymbols && _Object$getOwnPropertySymbols(methods).forEach(keyCopier);return ctor;}Iterable.Iterator = Iterator;mixin(Iterable,{ // ### Conversion to other types
	toArray:function toArray(){assertNotInfinite(this.size);var array=new Array(this.size || 0);this.valueSeq().__iterate(function(v,i){array[i] = v;});return array;},toIndexedSeq:function toIndexedSeq(){return new ToIndexedSequence(this);},toJS:function toJS(){return this.toSeq().map(function(value){return value && typeof value.toJS === 'function'?value.toJS():value;}).__toJS();},toJSON:function toJSON(){return this.toSeq().map(function(value){return value && typeof value.toJSON === 'function'?value.toJSON():value;}).__toJS();},toKeyedSeq:function toKeyedSeq(){return new ToKeyedSequence(this,true);},toMap:function toMap(){ // Use Late Binding here to solve the circular dependency.
	return Map(this.toKeyedSeq());},toObject:function toObject(){assertNotInfinite(this.size);var object={};this.__iterate(function(v,k){object[k] = v;});return object;},toOrderedMap:function toOrderedMap(){ // Use Late Binding here to solve the circular dependency.
	return OrderedMap(this.toKeyedSeq());},toOrderedSet:function toOrderedSet(){ // Use Late Binding here to solve the circular dependency.
	return OrderedSet(isKeyed(this)?this.valueSeq():this);},toSet:function toSet(){ // Use Late Binding here to solve the circular dependency.
	return Set(isKeyed(this)?this.valueSeq():this);},toSetSeq:function toSetSeq(){return new ToSetSequence(this);},toSeq:function toSeq(){return isIndexed(this)?this.toIndexedSeq():isKeyed(this)?this.toKeyedSeq():this.toSetSeq();},toStack:function toStack(){ // Use Late Binding here to solve the circular dependency.
	return Stack(isKeyed(this)?this.valueSeq():this);},toList:function toList(){ // Use Late Binding here to solve the circular dependency.
	return List(isKeyed(this)?this.valueSeq():this);}, // ### Common JavaScript methods and properties
	toString:function toString(){return '[Iterable]';},__toString:function __toString(head,tail){if(this.size === 0){return head + tail;}return head + ' ' + this.toSeq().map(this.__toStringMapper).join(', ') + ' ' + tail;}, // ### ES6 Collection methods (ES6 Array and Map)
	concat:function concat(){var values=SLICE$0.call(arguments,0);return reify(this,concatFactory(this,values));},includes:function includes(searchValue){return this.some(function(value){return is(value,searchValue);});},entries:function entries(){return this.__iterator(ITERATE_ENTRIES);},every:function every(predicate,context){assertNotInfinite(this.size);var returnValue=true;this.__iterate(function(v,k,c){if(!predicate.call(context,v,k,c)){returnValue = false;return false;}});return returnValue;},filter:function filter(predicate,context){return reify(this,filterFactory(this,predicate,context,true));},find:function find(predicate,context,notSetValue){var entry=this.findEntry(predicate,context);return entry?entry[1]:notSetValue;},findEntry:function findEntry(predicate,context){var found;this.__iterate(function(v,k,c){if(predicate.call(context,v,k,c)){found = [k,v];return false;}});return found;},findLastEntry:function findLastEntry(predicate,context){return this.toSeq().reverse().findEntry(predicate,context);},forEach:function forEach(sideEffect,context){assertNotInfinite(this.size);return this.__iterate(context?sideEffect.bind(context):sideEffect);},join:function join(separator){assertNotInfinite(this.size);separator = separator !== undefined?'' + separator:',';var joined='';var isFirst=true;this.__iterate(function(v){isFirst?isFirst = false:joined += separator;joined += v !== null && v !== undefined?v.toString():'';});return joined;},keys:function keys(){return this.__iterator(ITERATE_KEYS);},map:function map(mapper,context){return reify(this,mapFactory(this,mapper,context));},reduce:function reduce(reducer,initialReduction,context){assertNotInfinite(this.size);var reduction;var useFirst;if(arguments.length < 2){useFirst = true;}else {reduction = initialReduction;}this.__iterate(function(v,k,c){if(useFirst){useFirst = false;reduction = v;}else {reduction = reducer.call(context,reduction,v,k,c);}});return reduction;},reduceRight:function reduceRight(reducer,initialReduction,context){var reversed=this.toKeyedSeq().reverse();return reversed.reduce.apply(reversed,arguments);},reverse:function reverse(){return reify(this,reverseFactory(this,true));},slice:function slice(begin,end){return reify(this,sliceFactory(this,begin,end,true));},some:function some(predicate,context){return !this.every(not(predicate),context);},sort:function sort(comparator){return reify(this,sortFactory(this,comparator));},values:function values(){return this.__iterator(ITERATE_VALUES);}, // ### More sequential methods
	butLast:function butLast(){return this.slice(0,-1);},isEmpty:function isEmpty(){return this.size !== undefined?this.size === 0:!this.some(function(){return true;});},count:function count(predicate,context){return ensureSize(predicate?this.toSeq().filter(predicate,context):this);},countBy:function countBy(grouper,context){return countByFactory(this,grouper,context);},equals:function equals(other){return deepEqual(this,other);},entrySeq:function entrySeq(){var iterable=this;if(iterable._cache){ // We cache as an entries array, so we can just return the cache!
	return new ArraySeq(iterable._cache);}var entriesSequence=iterable.toSeq().map(entryMapper).toIndexedSeq();entriesSequence.fromEntrySeq = function(){return iterable.toSeq();};return entriesSequence;},filterNot:function filterNot(predicate,context){return this.filter(not(predicate),context);},findLast:function findLast(predicate,context,notSetValue){return this.toKeyedSeq().reverse().find(predicate,context,notSetValue);},first:function first(){return this.find(returnTrue);},flatMap:function flatMap(mapper,context){return reify(this,flatMapFactory(this,mapper,context));},flatten:function flatten(depth){return reify(this,flattenFactory(this,depth,true));},fromEntrySeq:function fromEntrySeq(){return new FromEntriesSequence(this);},get:function get(searchKey,notSetValue){return this.find(function(_,key){return is(key,searchKey);},undefined,notSetValue);},getIn:function getIn(searchKeyPath,notSetValue){var nested=this; // Note: in an ES6 environment, we would prefer:
	// for (var key of searchKeyPath) {
	var iter=forceIterator(searchKeyPath);var step;while(!(step = iter.next()).done) {var key=step.value;nested = nested && nested.get?nested.get(key,NOT_SET):NOT_SET;if(nested === NOT_SET){return notSetValue;}}return nested;},groupBy:function groupBy(grouper,context){return groupByFactory(this,grouper,context);},has:function has(searchKey){return this.get(searchKey,NOT_SET) !== NOT_SET;},hasIn:function hasIn(searchKeyPath){return this.getIn(searchKeyPath,NOT_SET) !== NOT_SET;},isSubset:function isSubset(iter){iter = typeof iter.includes === 'function'?iter:Iterable(iter);return this.every(function(value){return iter.includes(value);});},isSuperset:function isSuperset(iter){iter = typeof iter.isSubset === 'function'?iter:Iterable(iter);return iter.isSubset(this);},keySeq:function keySeq(){return this.toSeq().map(keyMapper).toIndexedSeq();},last:function last(){return this.toSeq().reverse().first();},max:function max(comparator){return maxFactory(this,comparator);},maxBy:function maxBy(mapper,comparator){return maxFactory(this,comparator,mapper);},min:function min(comparator){return maxFactory(this,comparator?neg(comparator):defaultNegComparator);},minBy:function minBy(mapper,comparator){return maxFactory(this,comparator?neg(comparator):defaultNegComparator,mapper);},rest:function rest(){return this.slice(1);},skip:function skip(amount){return this.slice(Math.max(0,amount));},skipLast:function skipLast(amount){return reify(this,this.toSeq().reverse().skip(amount).reverse());},skipWhile:function skipWhile(predicate,context){return reify(this,skipWhileFactory(this,predicate,context,true));},skipUntil:function skipUntil(predicate,context){return this.skipWhile(not(predicate),context);},sortBy:function sortBy(mapper,comparator){return reify(this,sortFactory(this,comparator,mapper));},take:function take(amount){return this.slice(0,Math.max(0,amount));},takeLast:function takeLast(amount){return reify(this,this.toSeq().reverse().take(amount).reverse());},takeWhile:function takeWhile(predicate,context){return reify(this,takeWhileFactory(this,predicate,context));},takeUntil:function takeUntil(predicate,context){return this.takeWhile(not(predicate),context);},valueSeq:function valueSeq(){return this.toIndexedSeq();}, // ### Hashable Object
	hashCode:function hashCode(){return this.__hash || (this.__hash = hashIterable(this));} // ### Internal
	// abstract __iterate(fn, reverse)
	// abstract __iterator(type, reverse)
	}); // var IS_ITERABLE_SENTINEL = '@@__IMMUTABLE_ITERABLE__@@';
	// var IS_KEYED_SENTINEL = '@@__IMMUTABLE_KEYED__@@';
	// var IS_INDEXED_SENTINEL = '@@__IMMUTABLE_INDEXED__@@';
	// var IS_ORDERED_SENTINEL = '@@__IMMUTABLE_ORDERED__@@';
	var IterablePrototype=Iterable.prototype;IterablePrototype[IS_ITERABLE_SENTINEL] = true;IterablePrototype[ITERATOR_SYMBOL] = IterablePrototype.values;IterablePrototype.__toJS = IterablePrototype.toArray;IterablePrototype.__toStringMapper = quoteString;IterablePrototype.inspect = IterablePrototype.toSource = function(){return this.toString();};IterablePrototype.chain = IterablePrototype.flatMap;IterablePrototype.contains = IterablePrototype.includes; // Temporary warning about using length
	(function(){try{Object.defineProperty(IterablePrototype,'length',{get:function get(){if(!Iterable.noLengthWarning){var stack;try{throw new Error();}catch(error) {stack = error.stack;}if(stack.indexOf('_wrapObject') === -1){console && console.warn && console.warn('iterable.length has been deprecated, ' + 'use iterable.size or iterable.count(). ' + 'This warning will become a silent error in a future version. ' + stack);return this.size;}}}});}catch(e) {}})();mixin(KeyedIterable,{ // ### More sequential methods
	flip:function flip(){return reify(this,flipFactory(this));},findKey:function findKey(predicate,context){var entry=this.findEntry(predicate,context);return entry && entry[0];},findLastKey:function findLastKey(predicate,context){return this.toSeq().reverse().findKey(predicate,context);},keyOf:function keyOf(searchValue){return this.findKey(function(value){return is(value,searchValue);});},lastKeyOf:function lastKeyOf(searchValue){return this.findLastKey(function(value){return is(value,searchValue);});},mapEntries:function mapEntries(mapper,context){var this$0=this;var iterations=0;return reify(this,this.toSeq().map(function(v,k){return mapper.call(context,[k,v],iterations++,this$0);}).fromEntrySeq());},mapKeys:function mapKeys(mapper,context){var this$0=this;return reify(this,this.toSeq().flip().map(function(k,v){return mapper.call(context,k,v,this$0);}).flip());}});var KeyedIterablePrototype=KeyedIterable.prototype;KeyedIterablePrototype[IS_KEYED_SENTINEL] = true;KeyedIterablePrototype[ITERATOR_SYMBOL] = IterablePrototype.entries;KeyedIterablePrototype.__toJS = IterablePrototype.toObject;KeyedIterablePrototype.__toStringMapper = function(v,k){return JSON.stringify(k) + ': ' + quoteString(v);};mixin(IndexedIterable,{ // ### Conversion to other types
	toKeyedSeq:function toKeyedSeq(){return new ToKeyedSequence(this,false);}, // ### ES6 Collection methods (ES6 Array and Map)
	filter:function filter(predicate,context){return reify(this,filterFactory(this,predicate,context,false));},findIndex:function findIndex(predicate,context){var entry=this.findEntry(predicate,context);return entry?entry[0]:-1;},indexOf:function indexOf(searchValue){var key=this.toKeyedSeq().keyOf(searchValue);return key === undefined?-1:key;},lastIndexOf:function lastIndexOf(searchValue){var key=this.toKeyedSeq().reverse().keyOf(searchValue);return key === undefined?-1:key; // var index =
	// return this.toSeq().reverse().indexOf(searchValue);
	},reverse:function reverse(){return reify(this,reverseFactory(this,false));},slice:function slice(begin,end){return reify(this,sliceFactory(this,begin,end,false));},splice:function splice(index,removeNum /*, ...values*/){var numArgs=arguments.length;removeNum = Math.max(removeNum | 0,0);if(numArgs === 0 || numArgs === 2 && !removeNum){return this;} // If index is negative, it should resolve relative to the size of the
	// collection. However size may be expensive to compute if not cached, so
	// only call count() if the number is in fact negative.
	index = resolveBegin(index,index < 0?this.count():this.size);var spliced=this.slice(0,index);return reify(this,numArgs === 1?spliced:spliced.concat(arrCopy(arguments,2),this.slice(index + removeNum)));}, // ### More collection methods
	findLastIndex:function findLastIndex(predicate,context){var key=this.toKeyedSeq().findLastKey(predicate,context);return key === undefined?-1:key;},first:function first(){return this.get(0);},flatten:function flatten(depth){return reify(this,flattenFactory(this,depth,false));},get:function get(index,notSetValue){index = wrapIndex(this,index);return index < 0 || this.size === Infinity || this.size !== undefined && index > this.size?notSetValue:this.find(function(_,key){return key === index;},undefined,notSetValue);},has:function has(index){index = wrapIndex(this,index);return index >= 0 && (this.size !== undefined?this.size === Infinity || index < this.size:this.indexOf(index) !== -1);},interpose:function interpose(separator){return reify(this,interposeFactory(this,separator));},interleave:function interleave() /*...iterables*/{var iterables=[this].concat(arrCopy(arguments));var zipped=zipWithFactory(this.toSeq(),IndexedSeq.of,iterables);var interleaved=zipped.flatten(true);if(zipped.size){interleaved.size = zipped.size * iterables.length;}return reify(this,interleaved);},last:function last(){return this.get(-1);},skipWhile:function skipWhile(predicate,context){return reify(this,skipWhileFactory(this,predicate,context,false));},zip:function zip() /*, ...iterables */{var iterables=[this].concat(arrCopy(arguments));return reify(this,zipWithFactory(this,defaultZipper,iterables));},zipWith:function zipWith(zipper /*, ...iterables */){var iterables=arrCopy(arguments);iterables[0] = this;return reify(this,zipWithFactory(this,zipper,iterables));}});IndexedIterable.prototype[IS_INDEXED_SENTINEL] = true;IndexedIterable.prototype[IS_ORDERED_SENTINEL] = true;mixin(SetIterable,{ // ### ES6 Collection methods (ES6 Array and Map)
	get:function get(value,notSetValue){return this.has(value)?value:notSetValue;},includes:function includes(value){return this.has(value);}, // ### More sequential methods
	keySeq:function keySeq(){return this.valueSeq();}});SetIterable.prototype.has = IterablePrototype.includes; // Mixin subclasses
	mixin(KeyedSeq,KeyedIterable.prototype);mixin(IndexedSeq,IndexedIterable.prototype);mixin(SetSeq,SetIterable.prototype);mixin(KeyedCollection,KeyedIterable.prototype);mixin(IndexedCollection,IndexedIterable.prototype);mixin(SetCollection,SetIterable.prototype); // #pragma Helper functions
	function keyMapper(v,k){return k;}function entryMapper(v,k){return [k,v];}function not(predicate){return function(){return !predicate.apply(this,arguments);};}function neg(predicate){return function(){return -predicate.apply(this,arguments);};}function quoteString(value){return typeof value === 'string'?JSON.stringify(value):value;}function defaultZipper(){return arrCopy(arguments);}function defaultNegComparator(a,b){return a < b?1:a > b?-1:0;}function hashIterable(iterable){if(iterable.size === Infinity){return 0;}var ordered=isOrdered(iterable);var keyed=isKeyed(iterable);var h=ordered?1:0;var size=iterable.__iterate(keyed?ordered?function(v,k){h = 31 * h + hashMerge(hash(v),hash(k)) | 0;}:function(v,k){h = h + hashMerge(hash(v),hash(k)) | 0;}:ordered?function(v){h = 31 * h + hash(v) | 0;}:function(v){h = h + hash(v) | 0;});return murmurHashOfSize(size,h);}function murmurHashOfSize(size,h){h = imul(h,0xCC9E2D51);h = imul(h << 15 | h >>> -15,0x1B873593);h = imul(h << 13 | h >>> -13,5);h = (h + 0xE6546B64 | 0) ^ size;h = imul(h ^ h >>> 16,0x85EBCA6B);h = imul(h ^ h >>> 13,0xC2B2AE35);h = smi(h ^ h >>> 16);return h;}function hashMerge(a,b){return a ^ b + 0x9E3779B9 + (a << 6) + (a >> 2) | 0; // int
	}var Immutable={Iterable:Iterable,Seq:Seq,Collection:Collection,Map:Map,OrderedMap:OrderedMap,List:List,Stack:Stack,Set:Set,OrderedSet:OrderedSet,Record:Record,Range:Range,Repeat:Repeat,is:is,fromJS:fromJS};return Immutable;});

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(122), __esModule: true };

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(123);
	__webpack_require__(129);
	module.exports = __webpack_require__(51)('iterator');

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at = __webpack_require__(124)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(126)(String, 'String', function (iterated) {
	  this._t = String(iterated); // target
	  this._i = 0; // next index
	  // 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function () {
	  var O = this._t,
	      index = this._i,
	      point;
	  if (index >= O.length) return { value: undefined, done: true };
	  point = $at(O, index);
	  this._i += point.length;
	  return { value: point, done: false };
	});

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var toInteger = __webpack_require__(125),
	    defined = __webpack_require__(11);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function (TO_STRING) {
	  return function (that, pos) {
	    var s = String(defined(that)),
	        i = toInteger(pos),
	        l = s.length,
	        a,
	        b;
	    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 125 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	"use strict";

	var ceil = Math.ceil,
	    floor = Math.floor;
	module.exports = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY = __webpack_require__(60),
	    $export = __webpack_require__(13),
	    redefine = __webpack_require__(46),
	    hide = __webpack_require__(47),
	    has = __webpack_require__(44),
	    Iterators = __webpack_require__(127),
	    $iterCreate = __webpack_require__(128),
	    setToStringTag = __webpack_require__(50),
	    getProto = __webpack_require__(6).getProto,
	    ITERATOR = __webpack_require__(51)('iterator'),
	    BUGGY = !([].keys && 'next' in [].keys()),
	    // Safari has buggy iterators w/o `next`
	FF_ITERATOR = '@@iterator',
	    KEYS = 'keys',
	    VALUES = 'values';

	var returnThis = function returnThis() {
	  return this;
	};

	module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function getMethod(kind) {
	    if (!BUGGY && kind in proto) return proto[kind];
	    switch (kind) {
	      case KEYS:
	        return function keys() {
	          return new Constructor(this, kind);
	        };
	      case VALUES:
	        return function values() {
	          return new Constructor(this, kind);
	        };
	    }return function entries() {
	      return new Constructor(this, kind);
	    };
	  };
	  var TAG = NAME + ' Iterator',
	      DEF_VALUES = DEFAULT == VALUES,
	      VALUES_BUG = false,
	      proto = Base.prototype,
	      $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT],
	      $default = $native || getMethod(DEFAULT),
	      methods,
	      key;
	  // Fix native
	  if ($native) {
	    var IteratorPrototype = getProto($default.call(new Base()));
	    // Set @@toStringTag to native iterators
	    setToStringTag(IteratorPrototype, TAG, true);
	    // FF fix
	    if (!LIBRARY && has(proto, FF_ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
	    // fix Array#{values, @@iterator}.name in V8 / FF
	    if (DEF_VALUES && $native.name !== VALUES) {
	      VALUES_BUG = true;
	      $default = function values() {
	        return $native.call(this);
	      };
	    }
	  }
	  // Define iterator
	  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG] = returnThis;
	  if (DEFAULT) {
	    methods = {
	      values: DEF_VALUES ? $default : getMethod(VALUES),
	      keys: IS_SET ? $default : getMethod(KEYS),
	      entries: !DEF_VALUES ? $default : getMethod('entries')
	    };
	    if (FORCED) for (key in methods) {
	      if (!(key in proto)) redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 127 */
/***/ function(module, exports) {

	"use strict";

	module.exports = {};

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $ = __webpack_require__(6),
	    descriptor = __webpack_require__(48),
	    setToStringTag = __webpack_require__(50),
	    IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(47)(IteratorPrototype, __webpack_require__(51)('iterator'), function () {
	  return this;
	});

	module.exports = function (Constructor, NAME, next) {
	  Constructor.prototype = $.create(IteratorPrototype, { next: descriptor(1, next) });
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(130);
	var Iterators = __webpack_require__(127);
	Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(131),
	    step = __webpack_require__(132),
	    Iterators = __webpack_require__(127),
	    toIObject = __webpack_require__(8);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(126)(Array, 'Array', function (iterated, kind) {
	  this._t = toIObject(iterated); // target
	  this._i = 0; // next index
	  this._k = kind; // kind
	  // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function () {
	  var O = this._t,
	      kind = this._k,
	      index = this._i++;
	  if (!O || index >= O.length) {
	    this._t = undefined;
	    return step(1);
	  }
	  if (kind == 'keys') return step(0, index);
	  if (kind == 'values') return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 131 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function () {/* empty */};

/***/ },
/* 132 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (done, value) {
	  return { value: value, done: !!done };
	};

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(134), __esModule: true };

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(135);
	module.exports = __webpack_require__(15).Math.imul;

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.18 Math.imul(x, y)
	'use strict';

	var _Math$imul = __webpack_require__(133)['default'];

	var $export = __webpack_require__(13),
	    $imul = _Math$imul;

	// some WebKit versions fails with big numbers, some has wrong arity
	$export($export.S + $export.F * __webpack_require__(18)(function () {
	  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
	}), 'Math', {
	  imul: function imul(x, y) {
	    var UINT16 = 0xffff,
	        xn = +x,
	        yn = +y,
	        xl = UINT16 & xn,
	        yl = UINT16 & yn;
	    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
	  }
	});

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(137), __esModule: true };

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(138);
	module.exports = __webpack_require__(15).Object.isExtensible;

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.11 Object.isExtensible(O)
	'use strict';

	var isObject = __webpack_require__(25);

	__webpack_require__(12)('isExtensible', function ($isExtensible) {
	  return function isExtensible(it) {
	    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
	  };
	});

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(140), __esModule: true };

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(61);
	__webpack_require__(129);
	__webpack_require__(141);
	module.exports = __webpack_require__(15).WeakMap;

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Object$isExtensible = __webpack_require__(136)['default'];

	var _Object$freeze = __webpack_require__(109)['default'];

	var $ = __webpack_require__(6),
	    redefine = __webpack_require__(46),
	    weak = __webpack_require__(142),
	    isObject = __webpack_require__(25),
	    has = __webpack_require__(44),
	    frozenStore = weak.frozenStore,
	    WEAK = weak.WEAK,
	    isExtensible = _Object$isExtensible || isObject,
	    tmp = {};

	// 23.3 WeakMap Objects
	var $WeakMap = __webpack_require__(153)('WeakMap', function (get) {
	  return function WeakMap() {
	    return get(this, arguments.length > 0 ? arguments[0] : undefined);
	  };
	}, {
	  // 23.3.3.3 WeakMap.prototype.get(key)
	  get: function get(key) {
	    if (isObject(key)) {
	      if (!isExtensible(key)) return frozenStore(this).get(key);
	      if (has(key, WEAK)) return key[WEAK][this._i];
	    }
	  },
	  // 23.3.3.5 WeakMap.prototype.set(key, value)
	  set: function set(key, value) {
	    return weak.def(this, key, value);
	  }
	}, weak, true, true);

	// IE11 WeakMap frozen keys fix
	if (new $WeakMap().set((_Object$freeze || Object)(tmp), 7).get(tmp) != 7) {
	  $.each.call(['delete', 'has', 'get', 'set'], function (key) {
	    var proto = $WeakMap.prototype,
	        method = proto[key];
	    redefine(proto, key, function (a, b) {
	      // store frozen objects on leaky map
	      if (isObject(a) && !isExtensible(a)) {
	        var result = frozenStore(this)[key](a, b);
	        return key == 'set' ? this : result;
	        // store all the rest on native weakmap
	      }return method.call(this, a, b);
	    });
	  });
	}

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Object$isExtensible = __webpack_require__(136)['default'];

	var hide = __webpack_require__(47),
	    redefineAll = __webpack_require__(143),
	    anObject = __webpack_require__(26),
	    isObject = __webpack_require__(25),
	    strictNew = __webpack_require__(144),
	    forOf = __webpack_require__(145),
	    createArrayMethod = __webpack_require__(151),
	    $has = __webpack_require__(44),
	    WEAK = __webpack_require__(52)('weak'),
	    isExtensible = _Object$isExtensible || isObject,
	    arrayFind = createArrayMethod(5),
	    arrayFindIndex = createArrayMethod(6),
	    id = 0;

	// fallback for frozen keys
	var frozenStore = function frozenStore(that) {
	  return that._l || (that._l = new FrozenStore());
	};
	var FrozenStore = function FrozenStore() {
	  this.a = [];
	};
	var findFrozen = function findFrozen(store, key) {
	  return arrayFind(store.a, function (it) {
	    return it[0] === key;
	  });
	};
	FrozenStore.prototype = {
	  get: function get(key) {
	    var entry = findFrozen(this, key);
	    if (entry) return entry[1];
	  },
	  has: function has(key) {
	    return !!findFrozen(this, key);
	  },
	  set: function set(key, value) {
	    var entry = findFrozen(this, key);
	    if (entry) entry[1] = value;else this.a.push([key, value]);
	  },
	  'delete': function _delete(key) {
	    var index = arrayFindIndex(this.a, function (it) {
	      return it[0] === key;
	    });
	    if (~index) this.a.splice(index, 1);
	    return !! ~index;
	  }
	};

	module.exports = {
	  getConstructor: function getConstructor(wrapper, NAME, IS_MAP, ADDER) {
	    var C = wrapper(function (that, iterable) {
	      strictNew(that, C, NAME);
	      that._i = id++; // collection id
	      that._l = undefined; // leak store for frozen objects
	      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    redefineAll(C.prototype, {
	      // 23.3.3.2 WeakMap.prototype.delete(key)
	      // 23.4.3.3 WeakSet.prototype.delete(value)
	      'delete': function _delete(key) {
	        if (!isObject(key)) return false;
	        if (!isExtensible(key)) return frozenStore(this)['delete'](key);
	        return $has(key, WEAK) && $has(key[WEAK], this._i) && delete key[WEAK][this._i];
	      },
	      // 23.3.3.4 WeakMap.prototype.has(key)
	      // 23.4.3.4 WeakSet.prototype.has(value)
	      has: function has(key) {
	        if (!isObject(key)) return false;
	        if (!isExtensible(key)) return frozenStore(this).has(key);
	        return $has(key, WEAK) && $has(key[WEAK], this._i);
	      }
	    });
	    return C;
	  },
	  def: function def(that, key, value) {
	    if (!isExtensible(anObject(key))) {
	      frozenStore(that).set(key, value);
	    } else {
	      $has(key, WEAK) || hide(key, WEAK, {});
	      key[WEAK][that._i] = value;
	    }return that;
	  },
	  frozenStore: frozenStore,
	  WEAK: WEAK
	};

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var redefine = __webpack_require__(46);
	module.exports = function (target, src) {
	  for (var key in src) redefine(target, key, src[key]);
	  return target;
	};

/***/ },
/* 144 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (it, Constructor, name) {
	  if (!(it instanceof Constructor)) throw TypeError(name + ": use the 'new' operator!");
	  return it;
	};

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ctx = __webpack_require__(16),
	    call = __webpack_require__(146),
	    isArrayIter = __webpack_require__(147),
	    anObject = __webpack_require__(26),
	    toLength = __webpack_require__(148),
	    getIterFn = __webpack_require__(149);
	module.exports = function (iterable, entries, fn, that) {
	  var iterFn = getIterFn(iterable),
	      f = ctx(fn, that, entries ? 2 : 1),
	      index = 0,
	      length,
	      step,
	      iterator;
	  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
	    entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
	    call(iterator, f, step.value, entries);
	  }
	};

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	'use strict';

	var anObject = __webpack_require__(26);
	module.exports = function (iterator, fn, value, entries) {
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	    // 7.4.6 IteratorClose(iterator, completion)
	  } catch (e) {
	    var ret = iterator['return'];
	    if (ret !== undefined) anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	'use strict';

	var Iterators = __webpack_require__(127),
	    ITERATOR = __webpack_require__(51)('iterator'),
	    ArrayProto = Array.prototype;

	module.exports = function (it) {
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	'use strict';

	var toInteger = __webpack_require__(125),
	    min = Math.min;
	module.exports = function (it) {
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var classof = __webpack_require__(150),
	    ITERATOR = __webpack_require__(51)('iterator'),
	    Iterators = __webpack_require__(127);
	module.exports = __webpack_require__(15).getIteratorMethod = function (it) {
	  if (it != undefined) return it[ITERATOR] || it['@@iterator'] || Iterators[classof(it)];
	};

/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	'use strict';

	var cof = __webpack_require__(10),
	    TAG = __webpack_require__(51)('toStringTag'),

	// ES3 wrong here
	ARG = cof((function () {
	  return arguments;
	})()) == 'Arguments';

	module.exports = function (it) {
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	  // @@toStringTag case
	  : typeof (T = (O = Object(it))[TAG]) == 'string' ? T
	  // builtinTag case
	  : ARG ? cof(O)
	  // ES3 arguments fallback
	  : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	// 0 -> Array#forEach
	// 1 -> Array#map
	// 2 -> Array#filter
	// 3 -> Array#some
	// 4 -> Array#every
	// 5 -> Array#find
	// 6 -> Array#findIndex
	'use strict';

	var ctx = __webpack_require__(16),
	    IObject = __webpack_require__(9),
	    toObject = __webpack_require__(65),
	    toLength = __webpack_require__(148),
	    asc = __webpack_require__(152);
	module.exports = function (TYPE) {
	  var IS_MAP = TYPE == 1,
	      IS_FILTER = TYPE == 2,
	      IS_SOME = TYPE == 3,
	      IS_EVERY = TYPE == 4,
	      IS_FIND_INDEX = TYPE == 6,
	      NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  return function ($this, callbackfn, that) {
	    var O = toObject($this),
	        self = IObject(O),
	        f = ctx(callbackfn, that, 3),
	        length = toLength(self.length),
	        index = 0,
	        result = IS_MAP ? asc($this, length) : IS_FILTER ? asc($this, 0) : undefined,
	        val,
	        res;
	    for (; length > index; index++) if (NO_HOLES || index in self) {
	      val = self[index];
	      res = f(val, index, O);
	      if (TYPE) {
	        if (IS_MAP) result[index] = res; // map
	        else if (res) switch (TYPE) {
	            case 3:
	              return true; // some
	            case 5:
	              return val; // find
	            case 6:
	              return index; // findIndex
	            case 2:
	              result.push(val); // filter
	          } else if (IS_EVERY) return false; // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
	  };
	};

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
	'use strict';

	var isObject = __webpack_require__(25),
	    isArray = __webpack_require__(59),
	    SPECIES = __webpack_require__(51)('species');
	module.exports = function (original, length) {
	  var C;
	  if (isArray(original)) {
	    C = original.constructor;
	    // cross-realm fallback
	    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
	    if (isObject(C)) {
	      C = C[SPECIES];
	      if (C === null) C = undefined;
	    }
	  }return new (C === undefined ? Array : C)(length);
	};

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $ = __webpack_require__(6),
	    global = __webpack_require__(14),
	    $export = __webpack_require__(13),
	    fails = __webpack_require__(18),
	    hide = __webpack_require__(47),
	    redefineAll = __webpack_require__(143),
	    forOf = __webpack_require__(145),
	    strictNew = __webpack_require__(144),
	    isObject = __webpack_require__(25),
	    setToStringTag = __webpack_require__(50),
	    DESCRIPTORS = __webpack_require__(45);

	module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
	  var Base = global[NAME],
	      C = Base,
	      ADDER = IS_MAP ? 'set' : 'add',
	      proto = C && C.prototype,
	      O = {};
	  if (!DESCRIPTORS || typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
	    new C().entries().next();
	  }))) {
	    // create collection constructor
	    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
	    redefineAll(C.prototype, methods);
	  } else {
	    C = wrapper(function (target, iterable) {
	      strictNew(target, C, NAME);
	      target._c = new Base();
	      if (iterable != undefined) forOf(iterable, IS_MAP, target[ADDER], target);
	    });
	    $.each.call('add,clear,delete,forEach,get,has,set,keys,values,entries'.split(','), function (KEY) {
	      var IS_ADDER = KEY == 'add' || KEY == 'set';
	      if (KEY in proto && !(IS_WEAK && KEY == 'clear')) hide(C.prototype, KEY, function (a, b) {
	        if (!IS_ADDER && IS_WEAK && !isObject(a)) return KEY == 'get' ? undefined : false;
	        var result = this._c[KEY](a === 0 ? 0 : a, b);
	        return IS_ADDER ? this : result;
	      });
	    });
	    if ('size' in proto) $.setDesc(C.prototype, 'size', {
	      get: function get() {
	        return this._c.size;
	      }
	    });
	  }

	  setToStringTag(C, NAME);

	  O[NAME] = C;
	  $export($export.G + $export.W + $export.F, O);

	  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

	  return C;
	};

/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(155), __esModule: true };

/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(43);
	module.exports = __webpack_require__(15).Object.getOwnPropertySymbols;

/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var QuickStartDescription = __webpack_require__(103);
	var ReactPlayground = __webpack_require__(106);
	//this leads to Row is undefined?
	var Row = __webpack_require__(157).Row;

	var SimpleExample = '\n\n//helper to generate a random date\nfunction randomDate(start, end) {\n  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();\n};\n\nvar _rows = [];\nfor (var i = 1; i < 1000; i++) {\n  _rows.push({\n    id: i,\n    task: \'Task \' + i,\n    complete: Math.min(100, Math.round(Math.random() * 110)),\n    priority : [\'Critical\', \'High\', \'Medium\', \'Low\'][Math.floor((Math.random() * 3) + 1)],\n    issueType : [\'Bug\', \'Improvement\', \'Epic\', \'Story\'][Math.floor((Math.random() * 3) + 1)],\n    startDate: randomDate(new Date(2015, 3, 1), new Date()),\n    completeDate: randomDate(new Date(), new Date(2016, 0, 1))\n  });\n};\n\n//function to retrieve a row for a given index\nvar rowGetter = function(i){\n  return _rows[i];\n};\n\n\n//Columns definition\nvar columns = [\n{\n  key: \'id\',\n  name: \'ID\',\n  locked : true\n},\n{\n  key: \'task\',\n  name: \'Title\',\n  width: 200\n},\n{\n  key: \'priority\',\n  name: \'Priority\',\n  width: 200\n},\n{\n  key: \'issueType\',\n  name: \'Issue Type\',\n  width: 200\n},\n{\n  key: \'complete\',\n  name: \'% Complete\',\n  width: 200\n},\n{\n  key: \'startDate\',\n  name: \'Start Date\',\n  width: 200\n},\n{\n  key: \'completeDate\',\n  name: \'Expected Complete\',\n  width: 200\n},\n{\n  key: \'completeDate\',\n  name: \'Expected Complete\',\n  width: 200\n}\n]\n\n\n\n\nvar RowRenderer = React.createClass({\n  setScrollLeft: function(scrollBy) {\n    //if you want freeze columns to work, you need to make sure you implement this as apass through\n    this.refs.row.setScrollLeft(scrollBy);\n  },\n getRowStyle: function() {\n   return {\n     backgroundColor: this.getRowBackground()\n   }\n },\n getRowBackground: function() {\n   return this.props.idx % 2 ?  \'green\' : \'white\'\n },\n render: function() {\n   //here we are just changing the style\n   //but we could replace this with anything we liked, cards, images, etc\n   //usually though it will just be a matter of wrapping a div, and then calling back through to the grid\n   return (<div style={this.getRowStyle()}><ReactDataGrid.Row ref="row" {...this.props}/></div>)\n }\n});\n\nvar Example = React.createClass({\n  render: function() {\n    return  (<ReactDataGrid\n    columns={columns}\n    rowGetter={rowGetter}\n    rowsCount={_rows.length}\n    minHeight={500}\n    rowRenderer={RowRenderer}/>);\n  }\n});\nReact.render(<Example />, mountNode);\n';

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
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';var _Object$assign2=__webpack_require__(37)['default'];var _Symbol=__webpack_require__(41)['default'];var _Object$keys=__webpack_require__(62)['default'];var _Object$defineProperty2=__webpack_require__(30)['default'];var _Object$freeze=__webpack_require__(109)['default'];var _Object$setPrototypeOf2=__webpack_require__(21)['default'];(function webpackUniversalModuleDefinition(root,factory){if(true)module.exports = factory(__webpack_require__(1));else if(typeof define === 'function' && define.amd)define(["react"],factory);else if(typeof exports === 'object')exports["ReactDataGrid"] = factory(require("react"));else root["ReactDataGrid"] = factory(root["React"]);})(undefined,function(__WEBPACK_EXTERNAL_MODULE_18__){return  (/******/(function(modules){ // webpackBootstrap
	/******/ // The module cache
	/******/var installedModules={}; /******/ // The require function
	/******/function __webpack_require__(moduleId){ /******/ // Check if module is in cache
	/******/if(installedModules[moduleId]) /******/return installedModules[moduleId].exports; /******/ // Create a new module (and put it into the cache)
	/******/var module=installedModules[moduleId] = { /******/exports:{}, /******/id:moduleId, /******/loaded:false /******/}; /******/ // Execute the module function
	/******/modules[moduleId].call(module.exports,module,module.exports,__webpack_require__); /******/ // Flag the module as loaded
	/******/module.loaded = true; /******/ // Return the exports of the module
	/******/return module.exports; /******/} /******/ // expose the modules object (__webpack_modules__)
	/******/__webpack_require__.m = modules; /******/ // expose the module cache
	/******/__webpack_require__.c = installedModules; /******/ // __webpack_public_path__
	/******/__webpack_require__.p = ""; /******/ // Load entry module and return exports
	/******/return __webpack_require__(0); /******/})( /************************************************************************/ /******/[ /* 0 */function(module,exports,__webpack_require__){'use strict';module.exports = __webpack_require__(1);module.exports.Editors = __webpack_require__(85);module.exports.Formatters = __webpack_require__(89);module.exports.Toolbar = __webpack_require__(91);module.exports.Row = __webpack_require__(50); /***/}, /* 1 */function(module,exports,__webpack_require__){ /**
		 * @jsx React.DOM

		 */"use strict";var _extends=__webpack_require__(2)['default'];var _Object$assign=__webpack_require__(3)['default'];var React=__webpack_require__(18);var PropTypes=React.PropTypes;var BaseGrid=__webpack_require__(19);var Row=__webpack_require__(50);var ExcelColumn=__webpack_require__(42);var KeyboardHandlerMixin=__webpack_require__(53);var CheckboxEditor=__webpack_require__(80);var FilterableHeaderCell=__webpack_require__(81);var cloneWithProps=__webpack_require__(30);var DOMMetrics=__webpack_require__(77);var ColumnMetricsMixin=__webpack_require__(82);var RowUtils=__webpack_require__(84);var ColumnUtils=__webpack_require__(25);if(!_Object$assign){Object.assign = __webpack_require__(83);}var ReactDataGrid=React.createClass({displayName:'ReactDataGrid',propTypes:{rowHeight:React.PropTypes.number.isRequired,headerRowHeight:React.PropTypes.number,minHeight:React.PropTypes.number.isRequired,minWidth:React.PropTypes.number,enableRowSelect:React.PropTypes.bool,onRowUpdated:React.PropTypes.func,rowGetter:React.PropTypes.func.isRequired,rowsCount:React.PropTypes.number.isRequired,toolbar:React.PropTypes.element,enableCellSelect:React.PropTypes.bool,columns:React.PropTypes.oneOfType([React.PropTypes.object,React.PropTypes.array]).isRequired,onFilter:React.PropTypes.func,onCellCopyPaste:React.PropTypes.func,onCellsDragged:React.PropTypes.func,onAddFilter:React.PropTypes.func},mixins:[ColumnMetricsMixin,DOMMetrics.MetricsComputatorMixin,KeyboardHandlerMixin],getDefaultProps:function getDefaultProps(){return {enableCellSelect:false,tabIndex:-1,rowHeight:35,enableRowSelect:false,minHeight:350};},getInitialState:function getInitialState(){var columnMetrics=this.createColumnMetrics();var initialState={columnMetrics:columnMetrics,selectedRows:this.getInitialSelectedRows(),copied:null,expandedRows:[],canFilter:false,columnFilters:{},sortDirection:null,sortColumn:null,dragged:null,scrollOffset:0};if(this.props.enableCellSelect){initialState.selected = {rowIdx:0,idx:0};}else {initialState.selected = {rowIdx:-1,idx:-1};}return initialState;},getInitialSelectedRows:function getInitialSelectedRows(){var selectedRows=[];for(var i=0;i < this.props.rowsCount;i++) {selectedRows.push(false);}return selectedRows;},componentWillReceiveProps:function componentWillReceiveProps(nextProps){if(nextProps.rowsCount === this.props.rowsCount + 1){this.onAfterAddRow(nextProps.rowsCount + 1);}},componentDidMount:function componentDidMount(){var scrollOffset=0;var canvas=this.getDOMNode().querySelector('.react-grid-Canvas');if(canvas != null){scrollOffset = canvas.offsetWidth - canvas.clientWidth;}this.setState({scrollOffset:scrollOffset});},render:function render(){var cellMetaData={selected:this.state.selected,dragged:this.state.dragged,onCellClick:this.onCellClick,onCellDoubleClick:this.onCellDoubleClick,onCommit:this.onCellCommit,onCommitCancel:this.setInactive,copied:this.state.copied,handleDragEnterRow:this.handleDragEnter,handleTerminateDrag:this.handleTerminateDrag};var toolbar=this.renderToolbar();var containerWidth=this.props.minWidth || this.DOMMetrics.gridWidth();var gridWidth=containerWidth - this.state.scrollOffset;return React.createElement('div',{className:'react-grid-Container',style:{width:containerWidth}},toolbar,React.createElement('div',{className:'react-grid-Main'},React.createElement(BaseGrid,_extends({ref:'base'},this.props,{headerRows:this.getHeaderRows(),columnMetrics:this.state.columnMetrics,rowGetter:this.props.rowGetter,rowsCount:this.props.rowsCount,rowHeight:this.props.rowHeight,cellMetaData:cellMetaData,selectedRows:this.state.selectedRows,expandedRows:this.state.expandedRows,rowOffsetHeight:this.getRowOffsetHeight(),sortColumn:this.state.sortColumn,sortDirection:this.state.sortDirection,onSort:this.handleSort,minHeight:this.props.minHeight,totalWidth:gridWidth,onViewportKeydown:this.onKeyDown,onViewportDragStart:this.onDragStart,onViewportDragEnd:this.handleDragEnd,onViewportDoubleClick:this.onViewportDoubleClick,onColumnResize:this.onColumnResize}))));},renderToolbar:function renderToolbar(){var Toolbar=this.props.toolbar;if(React.isValidElement(Toolbar)){return cloneWithProps(Toolbar,{onToggleFilter:this.onToggleFilter,numberOfRows:this.props.rowsCount});}},onSelect:function onSelect(selected){if(this.props.enableCellSelect){if(this.state.selected.rowIdx === selected.rowIdx && this.state.selected.idx === selected.idx && this.state.selected.active === true){}else {var idx=selected.idx;var rowIdx=selected.rowIdx;if(idx >= 0 && rowIdx >= 0 && idx < ColumnUtils.getSize(this.state.columnMetrics.columns) && rowIdx < this.props.rowsCount){this.setState({selected:selected});}}}},onCellClick:function onCellClick(cell){this.onSelect({rowIdx:cell.rowIdx,idx:cell.idx});},onCellDoubleClick:function onCellDoubleClick(cell){this.onSelect({rowIdx:cell.rowIdx,idx:cell.idx});this.setActive('Enter');},onViewportDoubleClick:function onViewportDoubleClick(e){this.setActive();},onPressArrowUp:function onPressArrowUp(e){this.moveSelectedCell(e,-1,0);},onPressArrowDown:function onPressArrowDown(e){this.moveSelectedCell(e,1,0);},onPressArrowLeft:function onPressArrowLeft(e){this.moveSelectedCell(e,0,-1);},onPressArrowRight:function onPressArrowRight(e){this.moveSelectedCell(e,0,1);},onPressTab:function onPressTab(e){this.moveSelectedCell(e,0,e.shiftKey?-1:1);},onPressEnter:function onPressEnter(e){this.setActive(e.key);},onPressDelete:function onPressDelete(e){this.setActive(e.key);},onPressEscape:function onPressEscape(e){this.setInactive(e.key);},onPressBackspace:function onPressBackspace(e){this.setActive(e.key);},onPressChar:function onPressChar(e){if(this.isKeyPrintable(e.keyCode)){this.setActive(e.keyCode);}},onPressKeyWithCtrl:function onPressKeyWithCtrl(e){var keys={KeyCode_c:99,KeyCode_C:67,KeyCode_V:86,KeyCode_v:118};var idx=this.state.selected.idx;if(this.canEdit(idx)){if(e.keyCode == keys.KeyCode_c || e.keyCode == keys.KeyCode_C){var value=this.getSelectedValue();this.handleCopy({value:value});}else if(e.keyCode == keys.KeyCode_v || e.keyCode == keys.KeyCode_V){this.handlePaste();}}},onDragStart:function onDragStart(e){var value=this.getSelectedValue();this.handleDragStart({idx:this.state.selected.idx,rowIdx:this.state.selected.rowIdx,value:value}); //need to set dummy data for FF
	if(e && e.dataTransfer && e.dataTransfer.setData)e.dataTransfer.setData('text/plain','dummy');},moveSelectedCell:function moveSelectedCell(e,rowDelta,cellDelta){ // we need to prevent default as we control grid scroll
	//otherwise it moves every time you left/right which is janky
	e.preventDefault();var rowIdx=this.state.selected.rowIdx + rowDelta;var idx=this.state.selected.idx + cellDelta;this.onSelect({idx:idx,rowIdx:rowIdx});},getSelectedValue:function getSelectedValue(){var rowIdx=this.state.selected.rowIdx;var idx=this.state.selected.idx;var cellKey=this.getColumn(idx).key;var row=this.props.rowGetter(rowIdx);return RowUtils.get(row,cellKey);},setActive:function setActive(keyPressed){var rowIdx=this.state.selected.rowIdx;var idx=this.state.selected.idx;if(this.canEdit(idx) && !this.isActive()){var selected=_Object$assign(this.state.selected,{idx:idx,rowIdx:rowIdx,active:true,initialKeyCode:keyPressed});this.setState({selected:selected});}},setInactive:function setInactive(){var rowIdx=this.state.selected.rowIdx;var idx=this.state.selected.idx;if(this.canEdit(idx) && this.isActive()){var selected=_Object$assign(this.state.selected,{idx:idx,rowIdx:rowIdx,active:false});this.setState({selected:selected});}},canEdit:function canEdit(idx){var col=this.getColumn(idx);return this.props.enableCellSelect === true && (col.editor != null || col.editable);},isActive:function isActive(){return this.state.selected.active === true;},onCellCommit:function onCellCommit(commit){var selected=_Object$assign({},this.state.selected);selected.active = false;if(commit.key === 'Tab'){selected.idx += 1;}var expandedRows=this.state.expandedRows; // if(commit.changed && commit.changed.expandedHeight){
	//   expandedRows = this.expandRow(commit.rowIdx, commit.changed.expandedHeight);
	// }
	this.setState({selected:selected,expandedRows:expandedRows});this.props.onRowUpdated(commit);},setupGridColumns:function setupGridColumns(){var props=arguments.length <= 0 || arguments[0] === undefined?this.props:arguments[0];var cols=props.columns.slice(0);if(props.enableRowSelect){var selectColumn={key:'select-row',name:'',formatter:React.createElement(CheckboxEditor,null),onCellChange:this.handleRowSelect,filterable:false,headerRenderer:React.createElement('input',{type:'checkbox',onChange:this.handleCheckboxChange}),width:60,locked:true};var unshiftedCols=cols.unshift(selectColumn);cols = unshiftedCols > 0?cols:unshiftedCols;}return cols;},handleCheckboxChange:function handleCheckboxChange(e){var allRowsSelected;if(e.currentTarget instanceof HTMLInputElement && e.currentTarget.checked === true){allRowsSelected = true;}else {allRowsSelected = false;}var selectedRows=[];for(var i=0;i < this.props.rowsCount;i++) {selectedRows.push(allRowsSelected);}this.setState({selectedRows:selectedRows});}, // columnKey not used here as this function will select the whole row,
	// but needed to match the function signature in the CheckboxEditor
	handleRowSelect:function handleRowSelect(rowIdx,columnKey,e){e.stopPropagation();if(this.state.selectedRows != null && this.state.selectedRows.length > 0){var selectedRows=this.state.selectedRows.slice();if(selectedRows[rowIdx] == null || selectedRows[rowIdx] == false){selectedRows[rowIdx] = true;}else {selectedRows[rowIdx] = false;}this.setState({selectedRows:selectedRows});}}, //EXPAND ROW Functionality - removing for now till we decide on how best to implement
	// expandRow(row: Row, newHeight: number): Array<Row>{
	//   var expandedRows = this.state.expandedRows;
	//   if(expandedRows[row]){
	//     if(expandedRows[row]== null || expandedRows[row] < newHeight){
	//       expandedRows[row] = newHeight;
	//     }
	//   }else{
	//     expandedRows[row] = newHeight;
	//   }
	//   return expandedRows;
	// },
	//
	// handleShowMore(row: Row, newHeight: number) {
	//   var expandedRows = this.expandRow(row, newHeight);
	//   this.setState({expandedRows : expandedRows});
	// },
	//
	// handleShowLess(row: Row){
	//   var expandedRows = this.state.expandedRows;
	//   if(expandedRows[row]){
	//       expandedRows[row] = false;
	//   }
	//   this.setState({expandedRows : expandedRows});
	// },
	//
	// expandAllRows(){
	//
	// },
	//
	// collapseAllRows(){
	//
	// },
	onAfterAddRow:function onAfterAddRow(numberOfRows){this.setState({selected:{idx:1,rowIdx:numberOfRows - 2}});},onToggleFilter:function onToggleFilter(){this.setState({canFilter:!this.state.canFilter});},getHeaderRows:function getHeaderRows(){var rows=[{ref:"row",height:this.props.headerRowHeight || this.props.rowHeight}];if(this.state.canFilter === true){rows.push({ref:"filterRow",headerCellRenderer:React.createElement(FilterableHeaderCell,{onChange:this.props.onAddFilter,column:this.props.column}),height:45});}return rows;},getRowOffsetHeight:function getRowOffsetHeight(){var offsetHeight=0;this.getHeaderRows().forEach(function(row){return offsetHeight += parseFloat(row.height,10);});return offsetHeight;},handleSort:function handleSort(columnKey,direction){this.setState({sortDirection:direction,sortColumn:columnKey},function(){this.props.onGridSort(columnKey,direction);});},copyPasteEnabled:function copyPasteEnabled(){return this.props.onCellCopyPaste !== null;},handleCopy:function handleCopy(args){if(!this.copyPasteEnabled()){return;}var textToCopy=args.value;var selected=this.state.selected;var copied={idx:selected.idx,rowIdx:selected.rowIdx};this.setState({textToCopy:textToCopy,copied:copied});},handlePaste:function handlePaste(){if(!this.copyPasteEnabled()){return;}var selected=this.state.selected;var cellKey=this.getColumn(this.state.selected.idx).key;if(this.props.onCellCopyPaste){this.props.onCellCopyPaste({cellKey:cellKey,rowIdx:selected.rowIdx,value:this.state.textToCopy,fromRow:this.state.copied.rowIdx,toRow:selected.rowIdx});}this.setState({copied:null});},dragEnabled:function dragEnabled(){return this.props.onCellsDragged !== null;},handleDragStart:function handleDragStart(dragged){if(!this.dragEnabled()){return;}var idx=dragged.idx;var rowIdx=dragged.rowIdx;if(idx >= 0 && rowIdx >= 0 && idx < this.getSize() && rowIdx < this.props.rowsCount){this.setState({dragged:dragged});}},handleDragEnter:function handleDragEnter(row){if(!this.dragEnabled()){return;}var selected=this.state.selected;var dragged=this.state.dragged;dragged.overRowIdx = row;this.setState({dragged:dragged});},handleDragEnd:function handleDragEnd(){if(!this.dragEnabled()){return;}var fromRow,toRow;var selected=this.state.selected;var dragged=this.state.dragged;var cellKey=this.getColumn(this.state.selected.idx).key;fromRow = selected.rowIdx < dragged.overRowIdx?selected.rowIdx:dragged.overRowIdx;toRow = selected.rowIdx > dragged.overRowIdx?selected.rowIdx:dragged.overRowIdx;if(this.props.onCellsDragged){this.props.onCellsDragged({cellKey:cellKey,fromRow:fromRow,toRow:toRow,value:dragged.value});}this.setState({dragged:{complete:true}});},handleTerminateDrag:function handleTerminateDrag(){if(!this.dragEnabled()){return;}this.setState({dragged:null});}});module.exports = ReactDataGrid; /***/}, /* 2 */function(module,exports,__webpack_require__){"use strict";var _Object$assign=__webpack_require__(3)["default"];exports["default"] = _Object$assign || function(target){for(var i=1;i < arguments.length;i++) {var source=arguments[i];for(var key in source) {if(Object.prototype.hasOwnProperty.call(source,key)){target[key] = source[key];}}}return target;};exports.__esModule = true; /***/}, /* 3 */function(module,exports,__webpack_require__){module.exports = {"default":__webpack_require__(4),__esModule:true}; /***/}, /* 4 */function(module,exports,__webpack_require__){__webpack_require__(5);module.exports = __webpack_require__(8).Object.assign; /***/}, /* 5 */function(module,exports,__webpack_require__){ // 19.1.3.1 Object.assign(target, source)
	var $export=__webpack_require__(6);$export($export.S + $export.F,'Object',{assign:__webpack_require__(11)}); /***/}, /* 6 */function(module,exports,__webpack_require__){var global=__webpack_require__(7),core=__webpack_require__(8),ctx=__webpack_require__(9),PROTOTYPE='prototype';var $export=function $export(type,name,source){var IS_FORCED=type & $export.F,IS_GLOBAL=type & $export.G,IS_STATIC=type & $export.S,IS_PROTO=type & $export.P,IS_BIND=type & $export.B,IS_WRAP=type & $export.W,exports=IS_GLOBAL?core:core[name] || (core[name] = {}),target=IS_GLOBAL?global:IS_STATIC?global[name]:(global[name] || {})[PROTOTYPE],key,own,out;if(IS_GLOBAL)source = name;for(key in source) { // contains in native
	own = !IS_FORCED && target && key in target;if(own && key in exports)continue; // export native or passed
	out = own?target[key]:source[key]; // prevent global pollution for namespaces
	exports[key] = IS_GLOBAL && typeof target[key] != 'function'?source[key] // bind timers to global for call from export context
	:IS_BIND && own?ctx(out,global) // wrap global constructors for prevent change them in library
	:IS_WRAP && target[key] == out?(function(C){var F=function F(param){return this instanceof C?new C(param):C(param);};F[PROTOTYPE] = C[PROTOTYPE];return F; // make static versions for prototype methods
	})(out):IS_PROTO && typeof out == 'function'?ctx(Function.call,out):out;if(IS_PROTO)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;}}; // type bitmap
	$export.F = 1; // forced
	$export.G = 2; // global
	$export.S = 4; // static
	$export.P = 8; // proto
	$export.B = 16; // bind
	$export.W = 32; // wrap
	module.exports = $export; /***/}, /* 7 */function(module,exports){ // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global=module.exports = typeof window != 'undefined' && window.Math == Math?window:typeof self != 'undefined' && self.Math == Math?self:Function('return this')();if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
	/***/}, /* 8 */function(module,exports){var core=module.exports = {version:'1.2.6'};if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
	/***/}, /* 9 */function(module,exports,__webpack_require__){ // optional / simple context binding
	var aFunction=__webpack_require__(10);module.exports = function(fn,that,length){aFunction(fn);if(that === undefined)return fn;switch(length){case 1:return function(a){return fn.call(that,a);};case 2:return function(a,b){return fn.call(that,a,b);};case 3:return function(a,b,c){return fn.call(that,a,b,c);};}return function() /* ...args */{return fn.apply(that,arguments);};}; /***/}, /* 10 */function(module,exports){module.exports = function(it){if(typeof it != 'function')throw TypeError(it + ' is not a function!');return it;}; /***/}, /* 11 */function(module,exports,__webpack_require__){ // 19.1.2.1 Object.assign(target, source, ...)
	var $=__webpack_require__(12),toObject=__webpack_require__(13),IObject=__webpack_require__(15); // should work with symbols and should have deterministic property order (V8 bug)
	module.exports = __webpack_require__(17)(function(){var a=_Object$assign2,A={},B={},S=_Symbol(),K='abcdefghijklmnopqrst';A[S] = 7;K.split('').forEach(function(k){B[k] = k;});return a({},A)[S] != 7 || _Object$keys(a({},B)).join('') != K;})?function assign(target,source){ // eslint-disable-line no-unused-vars
	var T=toObject(target),$$=arguments,$$len=$$.length,index=1,getKeys=$.getKeys,getSymbols=$.getSymbols,isEnum=$.isEnum;while($$len > index) {var S=IObject($$[index++]),keys=getSymbols?getKeys(S).concat(getSymbols(S)):getKeys(S),length=keys.length,j=0,key;while(length > j) if(isEnum.call(S,key = keys[j++]))T[key] = S[key];}return T;}:_Object$assign2; /***/}, /* 12 */function(module,exports){var $Object=Object;module.exports = {create:$Object.create,getProto:$Object.getPrototypeOf,isEnum:({}).propertyIsEnumerable,getDesc:$Object.getOwnPropertyDescriptor,setDesc:$Object.defineProperty,setDescs:$Object.defineProperties,getKeys:$Object.keys,getNames:$Object.getOwnPropertyNames,getSymbols:$Object.getOwnPropertySymbols,each:[].forEach}; /***/}, /* 13 */function(module,exports,__webpack_require__){ // 7.1.13 ToObject(argument)
	var defined=__webpack_require__(14);module.exports = function(it){return Object(defined(it));}; /***/}, /* 14 */function(module,exports){ // 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){if(it == undefined)throw TypeError("Can't call method on  " + it);return it;}; /***/}, /* 15 */function(module,exports,__webpack_require__){ // fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof=__webpack_require__(16);module.exports = Object('z').propertyIsEnumerable(0)?Object:function(it){return cof(it) == 'String'?it.split(''):Object(it);}; /***/}, /* 16 */function(module,exports){var toString=({}).toString;module.exports = function(it){return toString.call(it).slice(8,-1);}; /***/}, /* 17 */function(module,exports){module.exports = function(exec){try{return !!exec();}catch(e) {return true;}}; /***/}, /* 18 */function(module,exports){module.exports = __WEBPACK_EXTERNAL_MODULE_18__; /***/}, /* 19 */function(module,exports,__webpack_require__){ /**
		 * @jsx React.DOM


		 */"use strict";var _extends=__webpack_require__(2)['default'];var React=__webpack_require__(18);var PropTypes=React.PropTypes;var Header=__webpack_require__(20);var Viewport=__webpack_require__(47);var ExcelColumn=__webpack_require__(42);var GridScrollMixin=__webpack_require__(79);var DOMMetrics=__webpack_require__(77);var Grid=React.createClass({displayName:'Grid',propTypes:{rowGetter:PropTypes.oneOfType([PropTypes.array,PropTypes.func]).isRequired,columns:PropTypes.oneOfType([PropTypes.array,PropTypes.object]),minHeight:PropTypes.number,headerRows:PropTypes.oneOfType([PropTypes.array,PropTypes.func]),rowHeight:PropTypes.number,rowRenderer:PropTypes.func,emptyRowsView:PropTypes.func,expandedRows:PropTypes.oneOfType([PropTypes.array,PropTypes.func]),selectedRows:PropTypes.oneOfType([PropTypes.array,PropTypes.func]),rowsCount:PropTypes.number,onRows:PropTypes.func,sortColumn:React.PropTypes.string,sortDirection:React.PropTypes.oneOf(['ASC','DESC','NONE']),rowOffsetHeight:PropTypes.number.isRequired,onViewportKeydown:PropTypes.func.isRequired,onViewportDragStart:PropTypes.func.isRequired,onViewportDragEnd:PropTypes.func.isRequired,onViewportDoubleClick:PropTypes.func.isRequired},mixins:[GridScrollMixin,DOMMetrics.MetricsComputatorMixin],getStyle:function getStyle(){return {overflow:'hidden',outline:0,position:'relative',minHeight:this.props.minHeight};},render:function render(){var headerRows=this.props.headerRows || [{ref:'row'}];var EmptyRowsView=this.props.emptyRowsView;return React.createElement('div',_extends({},this.props,{style:this.getStyle(),className:'react-grid-Grid'}),React.createElement(Header,{ref:'header',columnMetrics:this.props.columnMetrics,onColumnResize:this.props.onColumnResize,height:this.props.rowHeight,totalWidth:this.props.totalWidth,headerRows:headerRows,sortColumn:this.props.sortColumn,sortDirection:this.props.sortDirection,onSort:this.props.onSort}),this.props.rowsCount >= 1 || this.props.rowsCount === 0 && !this.props.emptyRowsView?React.createElement('div',{ref:'viewPortContainer',onKeyDown:this.props.onViewportKeydown,onDoubleClick:this.props.onViewportDoubleClick,onDragStart:this.props.onViewportDragStart,onDragEnd:this.props.onViewportDragEnd},React.createElement(Viewport,{ref:'viewport',width:this.props.columnMetrics.width,rowHeight:this.props.rowHeight,rowRenderer:this.props.rowRenderer,rowGetter:this.props.rowGetter,rowsCount:this.props.rowsCount,selectedRows:this.props.selectedRows,expandedRows:this.props.expandedRows,columnMetrics:this.props.columnMetrics,totalWidth:this.props.totalWidth,onScroll:this.onScroll,onRows:this.props.onRows,cellMetaData:this.props.cellMetaData,rowOffsetHeight:this.props.rowOffsetHeight || this.props.rowHeight * headerRows.length,minHeight:this.props.minHeight})):React.createElement('div',{ref:'emptyView',className:'react-grid-Empty'},React.createElement(EmptyRowsView,null)));},getDefaultProps:function getDefaultProps(){return {rowHeight:35,minHeight:350};}});module.exports = Grid; /***/}, /* 20 */function(module,exports,__webpack_require__){ /**
		 * @jsx React.DOM


		 */"use strict";var _extends=__webpack_require__(2)['default'];var React=__webpack_require__(18);var joinClasses=__webpack_require__(21);var shallowCloneObject=__webpack_require__(22);var ColumnMetrics=__webpack_require__(23);var ColumnUtils=__webpack_require__(25);var HeaderRow=__webpack_require__(27);var Header=React.createClass({displayName:'Header',propTypes:{columnMetrics:React.PropTypes.shape({width:React.PropTypes.number.isRequired}).isRequired,totalWidth:React.PropTypes.number,height:React.PropTypes.number.isRequired,headerRows:React.PropTypes.array.isRequired},render:function render(){var state=this.state.resizing || this.props;var className=joinClasses({'react-grid-Header':true,'react-grid-Header--resizing':!!this.state.resizing});var headerRows=this.getHeaderRows();return React.createElement('div',_extends({},this.props,{style:this.getStyle(),className:className}),headerRows);},shouldComponentUpdate:function shouldComponentUpdate(nextProps,nextState){var update=!ColumnMetrics.sameColumns(this.props.columnMetrics.columns,nextProps.columnMetrics.columns,ColumnMetrics.sameColumn) || this.props.totalWidth != nextProps.totalWidth || this.props.headerRows.length != nextProps.headerRows.length || this.state.resizing != nextState.resizing || this.props.sortColumn != nextProps.sortColumn || this.props.sortDirection != nextProps.sortDirection;return update;},getHeaderRows:function getHeaderRows(){var columnMetrics=this.getColumnMetrics();var resizeColumn;if(this.state.resizing){resizeColumn = this.state.resizing.column;}var headerRows=[];this.props.headerRows.forEach((function(row,index){var headerRowStyle={position:'absolute',top:this.getCombinedHeaderHeights(index),left:0,width:this.props.totalWidth,overflow:'hidden'};headerRows.push(React.createElement(HeaderRow,{key:row.ref,ref:row.ref,style:headerRowStyle,onColumnResize:this.onColumnResize,onColumnResizeEnd:this.onColumnResizeEnd,width:columnMetrics.width,height:row.height || this.props.height,columns:columnMetrics.columns,resizing:resizeColumn,headerCellRenderer:row.headerCellRenderer,sortColumn:this.props.sortColumn,sortDirection:this.props.sortDirection,onSort:this.props.onSort}));}).bind(this));return headerRows;},getInitialState:function getInitialState(){return {resizing:null};},componentWillReceiveProps:function componentWillReceiveProps(nextProps){this.setState({resizing:null});},onColumnResize:function onColumnResize(column,width){var state=this.state.resizing || this.props;var pos=this.getColumnPosition(column);if(pos != null){var resizing={columnMetrics:shallowCloneObject(state.columnMetrics)};resizing.columnMetrics = ColumnMetrics.resizeColumn(resizing.columnMetrics,pos,width); // we don't want to influence scrollLeft while resizing
	if(resizing.columnMetrics.totalWidth < state.columnMetrics.totalWidth){resizing.columnMetrics.totalWidth = state.columnMetrics.totalWidth;}resizing.column = ColumnUtils.getColumn(resizing.columnMetrics.columns,pos);this.setState({resizing:resizing});}},getColumnMetrics:function getColumnMetrics(){var columnMetrics;if(this.state.resizing){columnMetrics = this.state.resizing.columnMetrics;}else {columnMetrics = this.props.columnMetrics;}return columnMetrics;},getColumnPosition:function getColumnPosition(column){var columnMetrics=this.getColumnMetrics();var pos=-1;columnMetrics.columns.forEach(function(c,idx){if(c.key === column.key){pos = idx;}});return pos === -1?null:pos;},onColumnResizeEnd:function onColumnResizeEnd(column,width){var pos=this.getColumnPosition(column);if(pos !== null && this.props.onColumnResize){this.props.onColumnResize(pos,width || column.width);}},setScrollLeft:function setScrollLeft(scrollLeft){var node=this.refs.row.getDOMNode();node.scrollLeft = scrollLeft;this.refs.row.setScrollLeft(scrollLeft);if(this.refs.filterRow){var nodeFilters=this.refs.filterRow.getDOMNode();nodeFilters.scrollLeft = scrollLeft;this.refs.filterRow.setScrollLeft(scrollLeft);}},getCombinedHeaderHeights:function getCombinedHeaderHeights(until){var stop_at=this.props.headerRows.length;if(typeof until != 'undefined')stop_at = until;var height=0;for(var index=0;index < stop_at;index++) {height += this.props.headerRows[index].height || this.props.height;}return height;},getStyle:function getStyle(){return {position:'relative',height:this.getCombinedHeaderHeights(),overflow:'hidden'};}});module.exports = Header; /***/}, /* 21 */function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__; /*!
		  Copyright (c) 2015 Jed Watson.
		  Licensed under the MIT License (MIT), see
		  http://jedwatson.github.io/classnames
		*/function classNames(){var classes='';var arg;for(var i=0;i < arguments.length;i++) {arg = arguments[i];if(!arg){continue;}if('string' === typeof arg || 'number' === typeof arg){classes += ' ' + arg;}else if(Object.prototype.toString.call(arg) === '[object Array]'){classes += ' ' + classNames.apply(null,arg);}else if('object' === typeof arg){for(var key in arg) {if(!arg.hasOwnProperty(key) || !arg[key]){continue;}classes += ' ' + key;}}}return classes.substr(1);} // safely export classNames for node / browserify
	if(typeof module !== 'undefined' && module.exports){module.exports = classNames;} // safely export classNames for RequireJS
	if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__ = [],__WEBPACK_AMD_DEFINE_RESULT__ = (function(){return classNames;}).apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__),__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));} /***/}, /* 22 */function(module,exports){ /**
		 * @jsx React.DOM


		 */'use strict';function shallowCloneObject(obj){var result={};for(var k in obj) {if(obj.hasOwnProperty(k)){result[k] = obj[k];}}return result;}module.exports = shallowCloneObject; /***/}, /* 23 */function(module,exports,__webpack_require__){ /**
		 * @jsx React.DOM


		 */"use strict";var _Object$assign=__webpack_require__(3)['default'];var shallowCloneObject=__webpack_require__(22);var isValidElement=__webpack_require__(18).isValidElement;var sameColumn=__webpack_require__(24);var ColumnUtils=__webpack_require__(25);var getScrollbarSize=__webpack_require__(26); /**
		 * Update column metrics calculation.
		 *
		 * @param {ColumnMetricsType} metrics
		 */function recalculate(metrics){ // compute width for columns which specify width
	var columns=setColumnWidths(metrics.columns,metrics.totalWidth);var unallocatedWidth=columns.filter(function(c){return c.width;}).reduce(function(w,column){return w - column.width;},metrics.totalWidth);unallocatedWidth -= getScrollbarSize();var width=columns.filter(function(c){return c.width;}).reduce(function(w,column){return w + column.width;},0); // compute width for columns which doesn't specify width
	columns = setDefferedColumnWidths(columns,unallocatedWidth,metrics.minColumnWidth); // compute left offset
	columns = setColumnOffsets(columns);return {columns:columns,width:width,totalWidth:metrics.totalWidth,minColumnWidth:metrics.minColumnWidth};}function setColumnOffsets(columns){var left=0;return columns.map(function(column){column.left = left;left += column.width;return column;});}function setColumnWidths(columns,totalWidth){return columns.map(function(column){var colInfo=_Object$assign({},column);if(column.width){if(/^([0-9]+)%$/.exec(column.width.toString())){colInfo.width = Math.floor(column.width / 100 * totalWidth);}}return colInfo;});}function setDefferedColumnWidths(columns,unallocatedWidth,minColumnWidth){var defferedColumns=columns.filter(function(c){return !c.width;});return columns.map(function(column,i,arr){if(!column.width){if(unallocatedWidth <= 0){column.width = minColumnWidth;}else {column.width = Math.floor(unallocatedWidth / ColumnUtils.getSize(defferedColumns));}}return column;});} /**
		 * Update column metrics calculation by resizing a column.
		 *
		 * @param {ColumnMetricsType} metrics
		 * @param {Column} column
		 * @param {number} width
		 */function resizeColumn(metrics,index,width){var column=ColumnUtils.getColumn(metrics.columns,index);metrics = shallowCloneObject(metrics);metrics.columns = metrics.columns.slice(0);var updatedColumn=shallowCloneObject(column);updatedColumn.width = Math.max(width,metrics.minColumnWidth);metrics = ColumnUtils.spliceColumn(metrics,index,updatedColumn);return recalculate(metrics);}function areColumnsImmutable(prevColumns,nextColumns){return typeof Immutable !== 'undefined' && prevColumns instanceof Immutable.List && nextColumns instanceof Immutable.List;}function compareEachColumn(prevColumns,nextColumns,sameColumn){var i,len,column;var prevColumnsByKey={};var nextColumnsByKey={};if(ColumnUtils.getSize(prevColumns) !== ColumnUtils.getSize(nextColumns)){return false;}for(i = 0,len = ColumnUtils.getSize(prevColumns);i < len;i++) {column = prevColumns[i];prevColumnsByKey[column.key] = column;}for(i = 0,len = ColumnUtils.getSize(nextColumns);i < len;i++) {column = nextColumns[i];nextColumnsByKey[column.key] = column;var prevColumn=prevColumnsByKey[column.key];if(prevColumn === undefined || !sameColumn(prevColumn,column)){return false;}}for(i = 0,len = ColumnUtils.getSize(prevColumns);i < len;i++) {column = prevColumns[i];var nextColumn=nextColumnsByKey[column.key];if(nextColumn === undefined){return false;}}return true;}function sameColumns(prevColumns,nextColumns,sameColumn){if(areColumnsImmutable(prevColumns,nextColumns)){return prevColumns === nextColumns;}else {return compareEachColumn(prevColumns,nextColumns,sameColumn);}}module.exports = {recalculate:recalculate,resizeColumn:resizeColumn,sameColumn:sameColumn,sameColumns:sameColumns}; /***/}, /* 24 */function(module,exports,__webpack_require__){ /* TODO objects as a map */'use strict';var isValidElement=__webpack_require__(18).isValidElement;module.exports = function sameColumn(a,b){var k;for(k in a) {if(a.hasOwnProperty(k)){if(typeof a[k] === 'function' && typeof b[k] === 'function' || isValidElement(a[k]) && isValidElement(b[k])){continue;}if(!b.hasOwnProperty(k) || a[k] !== b[k]){return false;}}}for(k in b) {if(b.hasOwnProperty(k) && !a.hasOwnProperty(k)){return false;}}return true;}; /***/}, /* 25 */function(module,exports){'use strict';module.exports = {getColumn:function getColumn(columns,idx){if(Array.isArray(columns)){return columns[idx];}else if(typeof Immutable !== 'undefined'){return columns.get(idx);}},spliceColumn:function spliceColumn(metrics,idx,column){if(Array.isArray(metrics.columns)){metrics.columns.splice(idx,1,column);}else if(typeof Immutable !== 'undefined'){metrics.columns = metrics.columns.splice(idx,1,column);}return metrics;},getSize:function getSize(columns){if(Array.isArray(columns)){return columns.length;}else if(typeof Immutable !== 'undefined'){return columns.size;}}}; /***/}, /* 26 */function(module,exports){ /*  offsetWidth in HTMLElement */"use strict";var size;function getScrollbarSize(){if(size === undefined){var outer=document.createElement('div');outer.style.width = '50px';outer.style.height = '50px';outer.style.position = 'absolute';outer.style.top = '-200px';outer.style.left = '-200px';var inner=document.createElement('div');inner.style.height = '100px';inner.style.width = '100%';outer.appendChild(inner);document.body.appendChild(outer);var outerWidth=outer.clientWidth;outer.style.overflowY = 'scroll';var innerWidth=inner.clientWidth;document.body.removeChild(outer);size = outerWidth - innerWidth;}return size;}module.exports = getScrollbarSize; /***/}, /* 27 */function(module,exports,__webpack_require__){ /**
		 * @jsx React.DOM
		 */"use strict";var _extends=__webpack_require__(2)['default'];var React=__webpack_require__(18);var PropTypes=React.PropTypes;var shallowEqual=__webpack_require__(28);var HeaderCell=__webpack_require__(29);var getScrollbarSize=__webpack_require__(26);var ExcelColumn=__webpack_require__(42);var ColumnUtilsMixin=__webpack_require__(25);var SortableHeaderCell=__webpack_require__(46);var HeaderRowStyle={overflow:React.PropTypes.string,width:PropTypes.oneOfType([PropTypes.number,PropTypes.string]),height:React.PropTypes.number,position:React.PropTypes.string};var DEFINE_SORT={ASC:'ASC',DESC:'DESC',NONE:'NONE'};var HeaderRow=React.createClass({displayName:'HeaderRow',propTypes:{width:PropTypes.oneOfType([PropTypes.number,PropTypes.string]),height:PropTypes.number.isRequired,columns:PropTypes.oneOfType([PropTypes.array,PropTypes.object]),onColumnResize:PropTypes.func,onSort:PropTypes.func.isRequired,style:PropTypes.shape(HeaderRowStyle)},mixins:[ColumnUtilsMixin],render:function render(){var cellsStyle={width:this.props.width?this.props.width + getScrollbarSize():'100%',height:this.props.height,whiteSpace:'nowrap',overflowX:'hidden',overflowY:'hidden'};var cells=this.getCells();return React.createElement('div',_extends({},this.props,{className:'react-grid-HeaderRow'}),React.createElement('div',{style:cellsStyle},cells));},getHeaderRenderer:function getHeaderRenderer(column){if(column.sortable){var sortDirection=this.props.sortColumn === column.key?this.props.sortDirection:DEFINE_SORT.NONE;return React.createElement(SortableHeaderCell,{columnKey:column.key,onSort:this.props.onSort,sortDirection:sortDirection});}else {return this.props.headerCellRenderer || column.headerRenderer || this.props.cellRenderer;}},getCells:function getCells(){var cells=[];var lockedCells=[];for(var i=0,len=this.getSize(this.props.columns);i < len;i++) {var column=this.getColumn(this.props.columns,i);var cell=React.createElement(HeaderCell,{ref:i,key:i,height:this.props.height,column:column,renderer:this.getHeaderRenderer(column),resizing:this.props.resizing === column,onResize:this.props.onColumnResize,onResizeEnd:this.props.onColumnResizeEnd});if(column.locked){lockedCells.push(cell);}else {cells.push(cell);}}return cells.concat(lockedCells);},setScrollLeft:function setScrollLeft(scrollLeft){var _this=this;this.props.columns.forEach(function(column,i){if(column.locked){_this.refs[i].setScrollLeft(scrollLeft);}});},shouldComponentUpdate:function shouldComponentUpdate(nextProps){return nextProps.width !== this.props.width || nextProps.height !== this.props.height || nextProps.columns !== this.props.columns || !shallowEqual(nextProps.style,this.props.style) || this.props.sortColumn != nextProps.sortColumn || this.props.sortDirection != nextProps.sortDirection;},getStyle:function getStyle(){return {overflow:'hidden',width:'100%',height:this.props.height,position:'absolute'};}});module.exports = HeaderRow; /***/}, /* 28 */function(module,exports){ /**
		 * Copyright 2013-2015, Facebook, Inc.
		 * All rights reserved.
		 *
		 * This source code is licensed under the BSD-style license found in the
		 * LICENSE file in the root directory of this source tree. An additional grant
		 * of patent rights can be found in the PATENTS file in the same directory.
		 *
		 * @providesModule shallowEqual
		 */'use strict'; /**
		 * Performs equality by iterating through keys on an object and returning
		 * false when any key has values which are not strictly equal between
		 * objA and objB. Returns true when the values of all keys are strictly equal.
		 *
		 * @return {boolean}
		 */function shallowEqual(objA,objB){if(objA === objB){return true;}var key; // Test for A's keys different from B.
	for(key in objA) {if(objA.hasOwnProperty(key) && (!objB.hasOwnProperty(key) || objA[key] !== objB[key])){return false;}} // Test for B's keys missing from A.
	for(key in objB) {if(objB.hasOwnProperty(key) && !objA.hasOwnProperty(key)){return false;}}return true;}module.exports = shallowEqual; /***/}, /* 29 */function(module,exports,__webpack_require__){ /* TODO unkwon */ /**
		 * @jsx React.DOM


		 */"use strict";var React=__webpack_require__(18);var joinClasses=__webpack_require__(21);var cloneWithProps=__webpack_require__(30);var PropTypes=React.PropTypes;var ExcelColumn=__webpack_require__(42);var ResizeHandle=__webpack_require__(44);var HeaderCell=React.createClass({displayName:'HeaderCell',propTypes:{renderer:PropTypes.oneOfType([PropTypes.func,PropTypes.element]).isRequired,column:PropTypes.shape(ExcelColumn).isRequired,onResize:PropTypes.func.isRequired,height:PropTypes.number.isRequired,onResizeEnd:PropTypes.func.isRequired},render:function render(){var resizeHandle;if(this.props.column.resizable){resizeHandle = React.createElement(ResizeHandle,{onDrag:this.onDrag,onDragStart:this.onDragStart,onDragEnd:this.onDragEnd});}var className=joinClasses({'react-grid-HeaderCell':true,'react-grid-HeaderCell--resizing':this.state.resizing,'react-grid-HeaderCell--locked':this.props.column.locked});className = joinClasses(className,this.props.className,this.props.column.cellClass);var cell=this.getCell();return React.createElement('div',{className:className,style:this.getStyle()},cell,resizeHandle);},getCell:function getCell(){if(React.isValidElement(this.props.renderer)){return cloneWithProps(this.props.renderer,{column:this.props.column});}else {var Renderer=this.props.renderer;return this.props.renderer({column:this.props.column});}},getDefaultProps:function getDefaultProps(){return {renderer:simpleCellRenderer};},getInitialState:function getInitialState(){return {resizing:false};},setScrollLeft:function setScrollLeft(scrollLeft){var node=React.findDOMNode(this);node.style.webkitTransform = 'translate3d(' + scrollLeft + 'px, 0px, 0px)';node.style.transform = 'translate3d(' + scrollLeft + 'px, 0px, 0px)';},getStyle:function getStyle(){return {width:this.props.column.width,left:this.props.column.left,display:'inline-block',position:'absolute',overflow:'hidden',height:this.props.height,margin:0,textOverflow:'ellipsis',whiteSpace:'nowrap'};},onDragStart:function onDragStart(e){this.setState({resizing:true}); //need to set dummy data for FF
	if(e && e.dataTransfer && e.dataTransfer.setData)e.dataTransfer.setData('text/plain','dummy');},onDrag:function onDrag(e){var resize=this.props.onResize || null; //for flows sake, doesnt recognise a null check direct
	if(resize){var width=this.getWidthFromMouseEvent(e);if(width > 0){resize(this.props.column,width);}}},onDragEnd:function onDragEnd(e){var width=this.getWidthFromMouseEvent(e);this.props.onResizeEnd(this.props.column,width);this.setState({resizing:false});},getWidthFromMouseEvent:function getWidthFromMouseEvent(e){var right=e.pageX;var left=React.findDOMNode(this).getBoundingClientRect().left;return right - left;}});function simpleCellRenderer(props){return React.createElement('div',{className:'widget-HeaderCell__value'},props.column.name);}var SimpleCellFormatter=React.createClass({displayName:'SimpleCellFormatter',propTypes:{value:React.PropTypes.oneOfType([React.PropTypes.string,React.PropTypes.number,React.PropTypes.object,React.PropTypes.bool]).isRequired},render:function render(){return React.createElement('span',null,this.props.value);},shouldComponentUpdate:function shouldComponentUpdate(nextProps,nextState){return nextProps.value !== this.props.value;}});module.exports = HeaderCell; /***/}, /* 30 */function(module,exports,__webpack_require__){ /* WEBPACK VAR INJECTION */(function(process){ /**
		 * Copyright 2013-2015, Facebook, Inc.
		 * All rights reserved.
		 *
		 * This source code is licensed under the BSD-style license found in the
		 * LICENSE file in the root directory of this source tree. An additional grant
		 * of patent rights can be found in the PATENTS file in the same directory.
		 *
		 * @typechecks static-only
		 * @providesModule cloneWithProps
		 */'use strict';var ReactElement=__webpack_require__(32);var ReactPropTransferer=__webpack_require__(39);var keyOf=__webpack_require__(41);var warning=__webpack_require__(36);var CHILDREN_PROP=keyOf({children:null}); /**
		 * Sometimes you want to change the props of a child passed to you. Usually
		 * this is to add a CSS class.
		 *
		 * @param {ReactElement} child child element you'd like to clone
		 * @param {object} props props you'd like to modify. className and style will be
		 * merged automatically.
		 * @return {ReactElement} a clone of child with props merged in.
		 */function cloneWithProps(child,props){if("production" !== process.env.NODE_ENV){"production" !== process.env.NODE_ENV?warning(!child.ref,'You are calling cloneWithProps() on a child with a ref. This is ' + 'dangerous because you\'re creating a new child which will not be ' + 'added as a ref to its parent.'):null;}var newProps=ReactPropTransferer.mergeProps(props,child.props); // Use `child.props.children` if it is provided.
	if(!newProps.hasOwnProperty(CHILDREN_PROP) && child.props.hasOwnProperty(CHILDREN_PROP)){newProps.children = child.props.children;} // The current API doesn't retain _owner and _context, which is why this
	// doesn't use ReactElement.cloneAndReplaceProps.
	return ReactElement.createElement(child.type,newProps);}module.exports = cloneWithProps; /* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(31)); /***/}, /* 31 */function(module,exports){ // shim for using process in browser
	var process=module.exports = {};var queue=[];var draining=false;var currentQueue;var queueIndex=-1;function cleanUpNextTick(){draining = false;if(currentQueue.length){queue = currentQueue.concat(queue);}else {queueIndex = -1;}if(queue.length){drainQueue();}}function drainQueue(){if(draining){return;}var timeout=setTimeout(cleanUpNextTick);draining = true;var len=queue.length;while(len) {currentQueue = queue;queue = [];while(++queueIndex < len) {if(currentQueue){currentQueue[queueIndex].run();}}queueIndex = -1;len = queue.length;}currentQueue = null;draining = false;clearTimeout(timeout);}process.nextTick = function(fun){var args=new Array(arguments.length - 1);if(arguments.length > 1){for(var i=1;i < arguments.length;i++) {args[i - 1] = arguments[i];}}queue.push(new Item(fun,args));if(queue.length === 1 && !draining){setTimeout(drainQueue,0);}}; // v8 likes predictible objects
	function Item(fun,array){this.fun = fun;this.array = array;}Item.prototype.run = function(){this.fun.apply(null,this.array);};process.title = 'browser';process.browser = true;process.env = {};process.argv = [];process.version = ''; // empty string to avoid regexp issues
	process.versions = {};function noop(){}process.on = noop;process.addListener = noop;process.once = noop;process.off = noop;process.removeListener = noop;process.removeAllListeners = noop;process.emit = noop;process.binding = function(name){throw new Error('process.binding is not supported');};process.cwd = function(){return '/';};process.chdir = function(dir){throw new Error('process.chdir is not supported');};process.umask = function(){return 0;}; /***/}, /* 32 */function(module,exports,__webpack_require__){ /* WEBPACK VAR INJECTION */(function(process){ /**
		 * Copyright 2014-2015, Facebook, Inc.
		 * All rights reserved.
		 *
		 * This source code is licensed under the BSD-style license found in the
		 * LICENSE file in the root directory of this source tree. An additional grant
		 * of patent rights can be found in the PATENTS file in the same directory.
		 *
		 * @providesModule ReactElement
		 */'use strict';var ReactContext=__webpack_require__(33);var ReactCurrentOwner=__webpack_require__(38);var assign=__webpack_require__(34);var warning=__webpack_require__(36);var RESERVED_PROPS={key:true,ref:true}; /**
		 * Warn for mutations.
		 *
		 * @internal
		 * @param {object} object
		 * @param {string} key
		 */function defineWarningProperty(object,key){_Object$defineProperty2(object,key,{configurable:false,enumerable:true,get:function get(){if(!this._store){return null;}return this._store[key];},set:function set(value){"production" !== process.env.NODE_ENV?warning(false,'Don\'t set the %s property of the React element. Instead, ' + 'specify the correct value when initially creating the element.',key):null;this._store[key] = value;}});} /**
		 * This is updated to true if the membrane is successfully created.
		 */var useMutationMembrane=false; /**
		 * Warn for mutations.
		 *
		 * @internal
		 * @param {object} element
		 */function defineMutationMembrane(prototype){try{var pseudoFrozenProperties={props:true};for(var key in pseudoFrozenProperties) {defineWarningProperty(prototype,key);}useMutationMembrane = true;}catch(x) { // IE will fail on defineProperty
	}} /**
		 * Base constructor for all React elements. This is only used to make this
		 * work with a dynamic instanceof check. Nothing should live on this prototype.
		 *
		 * @param {*} type
		 * @param {string|object} ref
		 * @param {*} key
		 * @param {*} props
		 * @internal
		 */var ReactElement=function ReactElement(type,key,ref,owner,context,props){ // Built-in properties that belong on the element
	this.type = type;this.key = key;this.ref = ref; // Record the component responsible for creating this element.
	this._owner = owner; // TODO: Deprecate withContext, and then the context becomes accessible
	// through the owner.
	this._context = context;if("production" !== process.env.NODE_ENV){ // The validation flag and props are currently mutative. We put them on
	// an external backing store so that we can freeze the whole object.
	// This can be replaced with a WeakMap once they are implemented in
	// commonly used development environments.
	this._store = {props:props,originalProps:assign({},props)}; // To make comparing ReactElements easier for testing purposes, we make
	// the validation flag non-enumerable (where possible, which should
	// include every environment we run tests in), so the test framework
	// ignores it.
	try{Object.defineProperty(this._store,'validated',{configurable:false,enumerable:false,writable:true});}catch(x) {}this._store.validated = false; // We're not allowed to set props directly on the object so we early
	// return and rely on the prototype membrane to forward to the backing
	// store.
	if(useMutationMembrane){_Object$freeze(this);return;}}this.props = props;}; // We intentionally don't expose the function on the constructor property.
	// ReactElement should be indistinguishable from a plain object.
	ReactElement.prototype = {_isReactElement:true};if("production" !== process.env.NODE_ENV){defineMutationMembrane(ReactElement.prototype);}ReactElement.createElement = function(type,config,children){var propName; // Reserved names are extracted
	var props={};var key=null;var ref=null;if(config != null){ref = config.ref === undefined?null:config.ref;key = config.key === undefined?null:'' + config.key; // Remaining properties are added to a new props object
	for(propName in config) {if(config.hasOwnProperty(propName) && !RESERVED_PROPS.hasOwnProperty(propName)){props[propName] = config[propName];}}} // Children can be more than one argument, and those are transferred onto
	// the newly allocated props object.
	var childrenLength=arguments.length - 2;if(childrenLength === 1){props.children = children;}else if(childrenLength > 1){var childArray=Array(childrenLength);for(var i=0;i < childrenLength;i++) {childArray[i] = arguments[i + 2];}props.children = childArray;} // Resolve default props
	if(type && type.defaultProps){var defaultProps=type.defaultProps;for(propName in defaultProps) {if(typeof props[propName] === 'undefined'){props[propName] = defaultProps[propName];}}}return new ReactElement(type,key,ref,ReactCurrentOwner.current,ReactContext.current,props);};ReactElement.createFactory = function(type){var factory=ReactElement.createElement.bind(null,type); // Expose the type on the factory and the prototype so that it can be
	// easily accessed on elements. E.g. <Foo />.type === Foo.type.
	// This should not be named `constructor` since this may not be the function
	// that created the element, and it may not even be a constructor.
	// Legacy hook TODO: Warn if this is accessed
	factory.type = type;return factory;};ReactElement.cloneAndReplaceProps = function(oldElement,newProps){var newElement=new ReactElement(oldElement.type,oldElement.key,oldElement.ref,oldElement._owner,oldElement._context,newProps);if("production" !== process.env.NODE_ENV){ // If the key on the original is valid, then the clone is valid
	newElement._store.validated = oldElement._store.validated;}return newElement;};ReactElement.cloneElement = function(element,config,children){var propName; // Original props are copied
	var props=assign({},element.props); // Reserved names are extracted
	var key=element.key;var ref=element.ref; // Owner will be preserved, unless ref is overridden
	var owner=element._owner;if(config != null){if(config.ref !== undefined){ // Silently steal the ref from the parent.
	ref = config.ref;owner = ReactCurrentOwner.current;}if(config.key !== undefined){key = '' + config.key;} // Remaining properties override existing props
	for(propName in config) {if(config.hasOwnProperty(propName) && !RESERVED_PROPS.hasOwnProperty(propName)){props[propName] = config[propName];}}} // Children can be more than one argument, and those are transferred onto
	// the newly allocated props object.
	var childrenLength=arguments.length - 2;if(childrenLength === 1){props.children = children;}else if(childrenLength > 1){var childArray=Array(childrenLength);for(var i=0;i < childrenLength;i++) {childArray[i] = arguments[i + 2];}props.children = childArray;}return new ReactElement(element.type,key,ref,owner,element._context,props);}; /**
		 * @param {?object} object
		 * @return {boolean} True if `object` is a valid component.
		 * @final
		 */ReactElement.isValidElement = function(object){ // ReactTestUtils is often used outside of beforeEach where as React is
	// within it. This leads to two different instances of React on the same
	// page. To identify a element from a different React instance we use
	// a flag instead of an instanceof check.
	var isElement=!!(object && object._isReactElement); // if (isElement && !(object instanceof ReactElement)) {
	// This is an indicator that you're using multiple versions of React at the
	// same time. This will screw with ownership and stuff. Fix it, please.
	// TODO: We could possibly warn here.
	// }
	return isElement;};module.exports = ReactElement; /* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(31)); /***/}, /* 33 */function(module,exports,__webpack_require__){ /* WEBPACK VAR INJECTION */(function(process){ /**
		 * Copyright 2013-2015, Facebook, Inc.
		 * All rights reserved.
		 *
		 * This source code is licensed under the BSD-style license found in the
		 * LICENSE file in the root directory of this source tree. An additional grant
		 * of patent rights can be found in the PATENTS file in the same directory.
		 *
		 * @providesModule ReactContext
		 */'use strict';var assign=__webpack_require__(34);var emptyObject=__webpack_require__(35);var warning=__webpack_require__(36);var didWarn=false; /**
		 * Keeps track of the current context.
		 *
		 * The context is automatically passed down the component ownership hierarchy
		 * and is accessible via `this.context` on ReactCompositeComponents.
		 */var ReactContext={ /**
		   * @internal
		   * @type {object}
		   */current:emptyObject, /**
		   * Temporarily extends the current context while executing scopedCallback.
		   *
		   * A typical use case might look like
		   *
		   *  render: function() {
		   *    var children = ReactContext.withContext({foo: 'foo'}, () => (
		   *
		   *    ));
		   *    return <div>{children}</div>;
		   *  }
		   *
		   * @param {object} newContext New context to merge into the existing context
		   * @param {function} scopedCallback Callback to run with the new context
		   * @return {ReactComponent|array<ReactComponent>}
		   */withContext:function withContext(newContext,scopedCallback){if("production" !== process.env.NODE_ENV){"production" !== process.env.NODE_ENV?warning(didWarn,'withContext is deprecated and will be removed in a future version. ' + 'Use a wrapper component with getChildContext instead.'):null;didWarn = true;}var result;var previousContext=ReactContext.current;ReactContext.current = assign({},previousContext,newContext);try{result = scopedCallback();}finally {ReactContext.current = previousContext;}return result;}};module.exports = ReactContext; /* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(31)); /***/}, /* 34 */function(module,exports){ /**
		 * Copyright 2014-2015, Facebook, Inc.
		 * All rights reserved.
		 *
		 * This source code is licensed under the BSD-style license found in the
		 * LICENSE file in the root directory of this source tree. An additional grant
		 * of patent rights can be found in the PATENTS file in the same directory.
		 *
		 * @providesModule Object.assign
		 */ // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.assign
	'use strict';function assign(target,sources){if(target == null){throw new TypeError('Object.assign target cannot be null or undefined');}var to=Object(target);var hasOwnProperty=Object.prototype.hasOwnProperty;for(var nextIndex=1;nextIndex < arguments.length;nextIndex++) {var nextSource=arguments[nextIndex];if(nextSource == null){continue;}var from=Object(nextSource); // We don't currently support accessors nor proxies. Therefore this
	// copy cannot throw. If we ever supported this then we must handle
	// exceptions and side-effects. We don't support symbols so they won't
	// be transferred.
	for(var key in from) {if(hasOwnProperty.call(from,key)){to[key] = from[key];}}}return to;}module.exports = assign; /***/}, /* 35 */function(module,exports,__webpack_require__){ /* WEBPACK VAR INJECTION */(function(process){ /**
		 * Copyright 2013-2015, Facebook, Inc.
		 * All rights reserved.
		 *
		 * This source code is licensed under the BSD-style license found in the
		 * LICENSE file in the root directory of this source tree. An additional grant
		 * of patent rights can be found in the PATENTS file in the same directory.
		 *
		 * @providesModule emptyObject
		 */"use strict";var emptyObject={};if("production" !== process.env.NODE_ENV){_Object$freeze(emptyObject);}module.exports = emptyObject; /* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(31)); /***/}, /* 36 */function(module,exports,__webpack_require__){ /* WEBPACK VAR INJECTION */(function(process){ /**
		 * Copyright 2014-2015, Facebook, Inc.
		 * All rights reserved.
		 *
		 * This source code is licensed under the BSD-style license found in the
		 * LICENSE file in the root directory of this source tree. An additional grant
		 * of patent rights can be found in the PATENTS file in the same directory.
		 *
		 * @providesModule warning
		 */"use strict";var emptyFunction=__webpack_require__(37); /**
		 * Similar to invariant but only logs a warning if the condition is not met.
		 * This can be used to log issues in development environments in critical
		 * paths. Removing the logging code for production environments will keep the
		 * same logic and follow the same code paths.
		 */var warning=emptyFunction;if("production" !== process.env.NODE_ENV){warning = function(condition,format){for(var args=[],$__0=2,$__1=arguments.length;$__0 < $__1;$__0++) args.push(arguments[$__0]);if(format === undefined){throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');}if(format.length < 10 || /^[s\W]*$/.test(format)){throw new Error('The warning format should be able to uniquely identify this ' + 'warning. Please, use a more descriptive format than: ' + format);}if(format.indexOf('Failed Composite propType: ') === 0){return; // Ignore CompositeComponent proptype check.
	}if(!condition){var argIndex=0;var message='Warning: ' + format.replace(/%s/g,function(){return args[argIndex++];});console.warn(message);try{ // --- Welcome to debugging React ---
	// This error was thrown as a convenience so that you can use this stack
	// to find the callsite that caused this warning to fire.
	throw new Error(message);}catch(x) {}}};}module.exports = warning; /* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(31)); /***/}, /* 37 */function(module,exports){ /**
		 * Copyright 2013-2015, Facebook, Inc.
		 * All rights reserved.
		 *
		 * This source code is licensed under the BSD-style license found in the
		 * LICENSE file in the root directory of this source tree. An additional grant
		 * of patent rights can be found in the PATENTS file in the same directory.
		 *
		 * @providesModule emptyFunction
		 */function makeEmptyFunction(arg){return function(){return arg;};} /**
		 * This function accepts and discards inputs; it has no side effects. This is
		 * primarily useful idiomatically for overridable function endpoints which
		 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
		 */function emptyFunction(){}emptyFunction.thatReturns = makeEmptyFunction;emptyFunction.thatReturnsFalse = makeEmptyFunction(false);emptyFunction.thatReturnsTrue = makeEmptyFunction(true);emptyFunction.thatReturnsNull = makeEmptyFunction(null);emptyFunction.thatReturnsThis = function(){return this;};emptyFunction.thatReturnsArgument = function(arg){return arg;};module.exports = emptyFunction; /***/}, /* 38 */function(module,exports){ /**
		 * Copyright 2013-2015, Facebook, Inc.
		 * All rights reserved.
		 *
		 * This source code is licensed under the BSD-style license found in the
		 * LICENSE file in the root directory of this source tree. An additional grant
		 * of patent rights can be found in the PATENTS file in the same directory.
		 *
		 * @providesModule ReactCurrentOwner
		 */'use strict'; /**
		 * Keeps track of the current owner.
		 *
		 * The current owner is the component who should own any components that are
		 * currently being constructed.
		 *
		 * The depth indicate how many composite components are above this render level.
		 */var ReactCurrentOwner={ /**
		   * @internal
		   * @type {ReactComponent}
		   */current:null};module.exports = ReactCurrentOwner; /***/}, /* 39 */function(module,exports,__webpack_require__){ /**
		 * Copyright 2013-2015, Facebook, Inc.
		 * All rights reserved.
		 *
		 * This source code is licensed under the BSD-style license found in the
		 * LICENSE file in the root directory of this source tree. An additional grant
		 * of patent rights can be found in the PATENTS file in the same directory.
		 *
		 * @providesModule ReactPropTransferer
		 */'use strict';var assign=__webpack_require__(34);var emptyFunction=__webpack_require__(37);var joinClasses=__webpack_require__(40); /**
		 * Creates a transfer strategy that will merge prop values using the supplied
		 * `mergeStrategy`. If a prop was previously unset, this just sets it.
		 *
		 * @param {function} mergeStrategy
		 * @return {function}
		 */function createTransferStrategy(mergeStrategy){return function(props,key,value){if(!props.hasOwnProperty(key)){props[key] = value;}else {props[key] = mergeStrategy(props[key],value);}};}var transferStrategyMerge=createTransferStrategy(function(a,b){ // `merge` overrides the first object's (`props[key]` above) keys using the
	// second object's (`value`) keys. An object's style's existing `propA` would
	// get overridden. Flip the order here.
	return assign({},b,a);}); /**
		 * Transfer strategies dictate how props are transferred by `transferPropsTo`.
		 * NOTE: if you add any more exceptions to this list you should be sure to
		 * update `cloneWithProps()` accordingly.
		 */var TransferStrategies={ /**
		   * Never transfer `children`.
		   */children:emptyFunction, /**
		   * Transfer the `className` prop by merging them.
		   */className:createTransferStrategy(joinClasses), /**
		   * Transfer the `style` prop (which is an object) by merging them.
		   */style:transferStrategyMerge}; /**
		 * Mutates the first argument by transferring the properties from the second
		 * argument.
		 *
		 * @param {object} props
		 * @param {object} newProps
		 * @return {object}
		 */function transferInto(props,newProps){for(var thisKey in newProps) {if(!newProps.hasOwnProperty(thisKey)){continue;}var transferStrategy=TransferStrategies[thisKey];if(transferStrategy && TransferStrategies.hasOwnProperty(thisKey)){transferStrategy(props,thisKey,newProps[thisKey]);}else if(!props.hasOwnProperty(thisKey)){props[thisKey] = newProps[thisKey];}}return props;} /**
		 * ReactPropTransferer are capable of transferring props to another component
		 * using a `transferPropsTo` method.
		 *
		 * @class ReactPropTransferer
		 */var ReactPropTransferer={ /**
		   * Merge two props objects using TransferStrategies.
		   *
		   * @param {object} oldProps original props (they take precedence)
		   * @param {object} newProps new props to merge in
		   * @return {object} a new object containing both sets of props merged.
		   */mergeProps:function mergeProps(oldProps,newProps){return transferInto(assign({},oldProps),newProps);}};module.exports = ReactPropTransferer; /***/}, /* 40 */function(module,exports){ /**
		 * Copyright 2013-2015, Facebook, Inc.
		 * All rights reserved.
		 *
		 * This source code is licensed under the BSD-style license found in the
		 * LICENSE file in the root directory of this source tree. An additional grant
		 * of patent rights can be found in the PATENTS file in the same directory.
		 *
		 * @providesModule joinClasses
		 * @typechecks static-only
		 */'use strict'; /**
		 * Combines multiple className strings into one.
		 * http://jsperf.com/joinclasses-args-vs-array
		 *
		 * @param {...?string} classes
		 * @return {string}
		 */function joinClasses(className /*, ... */){if(!className){className = '';}var nextClass;var argLength=arguments.length;if(argLength > 1){for(var ii=1;ii < argLength;ii++) {nextClass = arguments[ii];if(nextClass){className = (className?className + ' ':'') + nextClass;}}}return className;}module.exports = joinClasses; /***/}, /* 41 */function(module,exports){ /**
		 * Copyright 2013-2015, Facebook, Inc.
		 * All rights reserved.
		 *
		 * This source code is licensed under the BSD-style license found in the
		 * LICENSE file in the root directory of this source tree. An additional grant
		 * of patent rights can be found in the PATENTS file in the same directory.
		 *
		 * @providesModule keyOf
		 */ /**
		 * Allows extraction of a minified key. Let's the build system minify keys
		 * without loosing the ability to dynamically use key strings as values
		 * themselves. Pass in an object with a single key/val pair and it will return
		 * you the string key of that single record. Suppose you want to grab the
		 * value for a key 'className' inside of an object. Key/val minification may
		 * have aliased that key to be 'xa12'. keyOf({className: null}) will return
		 * 'xa12' in that case. Resolve keys you want to use once at startup time, then
		 * reuse those resolutions.
		 */var keyOf=function keyOf(oneKeyObj){var key;for(key in oneKeyObj) {if(!oneKeyObj.hasOwnProperty(key)){continue;}return key;}return null;};module.exports = keyOf; /***/}, /* 42 */function(module,exports,__webpack_require__){'use strict';var _classCallCheck=__webpack_require__(43)['default'];var React=__webpack_require__(18);var ExcelColumn=function ExcelColumn(){_classCallCheck(this,ExcelColumn);};var ExcelColumnShape={name:React.PropTypes.string.isRequired,key:React.PropTypes.string.isRequired,width:React.PropTypes.number.isRequired};module.exports = ExcelColumnShape; /***/}, /* 43 */function(module,exports){"use strict";exports["default"] = function(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}};exports.__esModule = true; /***/}, /* 44 */function(module,exports,__webpack_require__){'use strict';var _extends=__webpack_require__(2)['default'];var React=__webpack_require__(18);var joinClasses=__webpack_require__(21);var Draggable=__webpack_require__(45);var cloneWithProps=__webpack_require__(30);var PropTypes=React.PropTypes;var ResizeHandle=React.createClass({displayName:'ResizeHandle',style:{position:'absolute',top:0,right:0,width:6,height:'100%'},render:function render(){return React.createElement(Draggable,_extends({},this.props,{className:'react-grid-HeaderCell__resizeHandle',style:this.style}));}});module.exports = ResizeHandle; /***/}, /* 45 */function(module,exports,__webpack_require__){ /*  need   */ /**
		 * @jsx React.DOM


		 */'use strict';var _extends=__webpack_require__(2)['default'];var React=__webpack_require__(18);var PropTypes=React.PropTypes;var emptyFunction=__webpack_require__(37);var Draggable=React.createClass({displayName:'Draggable',propTypes:{onDragStart:PropTypes.func,onDragEnd:PropTypes.func,onDrag:PropTypes.func,component:PropTypes.oneOfType([PropTypes.func,PropTypes.constructor])},render:function render(){var Component=this.props.component;return React.createElement('div',_extends({},this.props,{onMouseDown:this.onMouseDown,className:'react-grid-HeaderCell__draggable'}));},getDefaultProps:function getDefaultProps(){return {onDragStart:emptyFunction.thatReturnsTrue,onDragEnd:emptyFunction,onDrag:emptyFunction};},getInitialState:function getInitialState(){return {drag:null};},onMouseDown:function onMouseDown(e){var drag=this.props.onDragStart(e);if(drag === null && e.button !== 0){return;}window.addEventListener('mouseup',this.onMouseUp);window.addEventListener('mousemove',this.onMouseMove);this.setState({drag:drag});},onMouseMove:function onMouseMove(e){if(this.state.drag === null){return;}if(e.preventDefault){e.preventDefault();}this.props.onDrag(e);},onMouseUp:function onMouseUp(e){this.cleanUp();this.props.onDragEnd(e,this.state.drag);this.setState({drag:null});},componentWillUnmount:function componentWillUnmount(){this.cleanUp();},cleanUp:function cleanUp(){window.removeEventListener('mouseup',this.onMouseUp);window.removeEventListener('mousemove',this.onMouseMove);}});module.exports = Draggable; /***/}, /* 46 */function(module,exports,__webpack_require__){ /**
		 * @jsx React.DOM


		 */'use strict';var React=__webpack_require__(18);var joinClasses=__webpack_require__(21);var ExcelColumn=__webpack_require__(42);var DEFINE_SORT={ASC:'ASC',DESC:'DESC',NONE:'NONE'};var SortableHeaderCell=React.createClass({displayName:'SortableHeaderCell',propTypes:{columnKey:React.PropTypes.string.isRequired,onSort:React.PropTypes.func.isRequired,sortDirection:React.PropTypes.oneOf(['ASC','DESC','NONE'])},onClick:function onClick(){var direction;switch(this.props.sortDirection){case null:case undefined:case DEFINE_SORT.NONE:direction = DEFINE_SORT.ASC;break;case DEFINE_SORT.ASC:direction = DEFINE_SORT.DESC;break;case DEFINE_SORT.DESC:direction = DEFINE_SORT.NONE;break;}this.props.onSort(this.props.columnKey,direction);},getSortByText:function getSortByText(){var unicodeKeys={'ASC':'9650','DESC':'9660','NONE':''};return String.fromCharCode(unicodeKeys[this.props.sortDirection]);},render:function render(){var className=joinClasses({'react-grid-HeaderCell-sortable':true,'react-grid-HeaderCell-sortable--ascending':this.props.sortDirection === 'ASC','react-grid-HeaderCell-sortable--descending':this.props.sortDirection === 'DESC'});return React.createElement('div',{className:className,onClick:this.onClick,style:{cursor:'pointer'}},this.props.column.name,React.createElement('span',{className:'pull-right'},this.getSortByText()));}});module.exports = SortableHeaderCell; /***/}, /* 47 */function(module,exports,__webpack_require__){ /**
		 * @jsx React.DOM


		 */'use strict';var React=__webpack_require__(18);var Canvas=__webpack_require__(48);var PropTypes=React.PropTypes;var ViewportScroll=__webpack_require__(76);var Viewport=React.createClass({displayName:'Viewport',mixins:[ViewportScroll],propTypes:{rowOffsetHeight:PropTypes.number.isRequired,totalWidth:PropTypes.number.isRequired,columnMetrics:PropTypes.object.isRequired,rowGetter:PropTypes.oneOfType([PropTypes.array,PropTypes.func]).isRequired,selectedRows:PropTypes.array,expandedRows:PropTypes.array,rowRenderer:PropTypes.func,rowsCount:PropTypes.number.isRequired,rowHeight:PropTypes.number.isRequired,onRows:PropTypes.func,onScroll:PropTypes.func,minHeight:PropTypes.number},render:function render(){var style={padding:0,bottom:0,left:0,right:0,overflow:'hidden',position:'absolute',top:this.props.rowOffsetHeight};return React.createElement('div',{className:'react-grid-Viewport',style:style},React.createElement(Canvas,{ref:'canvas',totalWidth:this.props.totalWidth,width:this.props.columnMetrics.width,rowGetter:this.props.rowGetter,rowsCount:this.props.rowsCount,selectedRows:this.props.selectedRows,expandedRows:this.props.expandedRows,columns:this.props.columnMetrics.columns,rowRenderer:this.props.rowRenderer,visibleStart:this.state.visibleStart,visibleEnd:this.state.visibleEnd,displayStart:this.state.displayStart,displayEnd:this.state.displayEnd,cellMetaData:this.props.cellMetaData,height:this.state.height,rowHeight:this.props.rowHeight,onScroll:this.onScroll,onRows:this.props.onRows}));},getScroll:function getScroll(){return this.refs.canvas.getScroll();},onScroll:function onScroll(scroll){this.updateScroll(scroll.scrollTop,scroll.scrollLeft,this.state.height,this.props.rowHeight,this.props.rowsCount);if(this.props.onScroll){this.props.onScroll({scrollTop:scroll.scrollTop,scrollLeft:scroll.scrollLeft});}},setScrollLeft:function setScrollLeft(scrollLeft){this.refs.canvas.setScrollLeft(scrollLeft);}});module.exports = Viewport; /***/}, /* 48 */function(module,exports,__webpack_require__){ /**
		 * @jsx React.DOM
		 */"use strict";var React=__webpack_require__(18);var joinClasses=__webpack_require__(21);var PropTypes=React.PropTypes;var cloneWithProps=__webpack_require__(30);var shallowEqual=__webpack_require__(28);var emptyFunction=__webpack_require__(37);var ScrollShim=__webpack_require__(49);var Row=__webpack_require__(50);var ExcelColumn=__webpack_require__(42);var Canvas=React.createClass({displayName:'Canvas',mixins:[ScrollShim],propTypes:{rowRenderer:PropTypes.oneOfType([PropTypes.func,PropTypes.element]),rowHeight:PropTypes.number.isRequired,height:PropTypes.number.isRequired,displayStart:PropTypes.number.isRequired,displayEnd:PropTypes.number.isRequired,rowsCount:PropTypes.number.isRequired,rowGetter:PropTypes.oneOfType([PropTypes.func.isRequired,PropTypes.array.isRequired]),onRows:PropTypes.func,columns:PropTypes.oneOfType([PropTypes.object,PropTypes.array]).isRequired},render:function render(){var _this=this;var displayStart=this.state.displayStart;var displayEnd=this.state.displayEnd;var rowHeight=this.props.rowHeight;var length=this.props.rowsCount;var rows=this.getRows(displayStart,displayEnd).map(function(row,idx){return _this.renderRow({key:displayStart + idx,ref:idx,idx:displayStart + idx,row:row,height:rowHeight,columns:_this.props.columns,isSelected:_this.isRowSelected(displayStart + idx),expandedRows:_this.props.expandedRows,cellMetaData:_this.props.cellMetaData});});this._currentRowsLength = rows.length;if(displayStart > 0){rows.unshift(this.renderPlaceholder('top',displayStart * rowHeight));}if(length - displayEnd > 0){rows.push(this.renderPlaceholder('bottom',(length - displayEnd) * rowHeight));}var style={position:'absolute',top:0,left:0,overflowX:'auto',overflowY:'scroll',width:this.props.totalWidth + this.state.scrollbarWidth,height:this.props.height,transform:'translate3d(0, 0, 0)'};return React.createElement('div',{style:style,onScroll:this.onScroll,className:joinClasses("react-grid-Canvas",this.props.className,{opaque:this.props.cellMetaData.selected && this.props.cellMetaData.selected.active})},React.createElement('div',{style:{width:this.props.width,overflow:'hidden'}},rows));},renderRow:function renderRow(props){var RowsRenderer=this.props.rowRenderer;if(typeof RowsRenderer === 'function'){return React.createElement(RowsRenderer,props);}else if(React.isValidElement(this.props.rowRenderer)){return cloneWithProps(this.props.rowRenderer,props);}},renderPlaceholder:function renderPlaceholder(key,height){return React.createElement('div',{key:key,style:{height:height}},this.props.columns.map(function(column,idx){return React.createElement('div',{style:{width:column.width},key:idx});}));},getDefaultProps:function getDefaultProps(){return {rowRenderer:Row,onRows:emptyFunction};},isRowSelected:function isRowSelected(rowIdx){return this.props.selectedRows && this.props.selectedRows[rowIdx] === true;},_currentRowsLength:0,_currentRowsRange:{start:0,end:0},_scroll:{scrollTop:0,scrollLeft:0},getInitialState:function getInitialState(){return {shouldUpdate:true,displayStart:this.props.displayStart,displayEnd:this.props.displayEnd,scrollbarWidth:0};},componentWillMount:function componentWillMount(){this._currentRowsLength = 0;this._currentRowsRange = {start:0,end:0};this._scroll = {scrollTop:0,scrollLeft:0};},componentDidMount:function componentDidMount(){this.onRows();},componentDidUpdate:function componentDidUpdate(nextProps){if(this._scroll.scrollTop !== 0 && this._scroll.scrollLeft !== 0){this.setScrollLeft(this._scroll.scrollLeft);}this.onRows();},componentWillUnmount:function componentWillUnmount(){this._currentRowsLength = 0;this._currentRowsRange = {start:0,end:0};this._scroll = {scrollTop:0,scrollLeft:0};},componentWillReceiveProps:function componentWillReceiveProps(nextProps){if(nextProps.rowsCount > this.props.rowsCount){React.findDOMNode(this).scrollTop = nextProps.rowsCount * this.props.rowHeight;}var scrollbarWidth=this.getScrollbarWidth();var shouldUpdate=!(nextProps.visibleStart > this.state.displayStart && nextProps.visibleEnd < this.state.displayEnd) || nextProps.rowsCount !== this.props.rowsCount || nextProps.rowHeight !== this.props.rowHeight || nextProps.columns !== this.props.columns || nextProps.width !== this.props.width || nextProps.cellMetaData !== this.props.cellMetaData || !shallowEqual(nextProps.style,this.props.style);if(shouldUpdate){this.setState({shouldUpdate:true,displayStart:nextProps.displayStart,displayEnd:nextProps.displayEnd,scrollbarWidth:scrollbarWidth});}else {this.setState({shouldUpdate:false,scrollbarWidth:scrollbarWidth});}},shouldComponentUpdate:function shouldComponentUpdate(nextProps,nextState){return !nextState || nextState.shouldUpdate;},onRows:function onRows(){if(this._currentRowsRange !== {start:0,end:0}){this.props.onRows(this._currentRowsRange);this._currentRowsRange = {start:0,end:0};}},getRows:function getRows(displayStart,displayEnd){this._currentRowsRange = {start:displayStart,end:displayEnd};if(Array.isArray(this.props.rowGetter)){return this.props.rowGetter.slice(displayStart,displayEnd);}else {var rows=[];for(var i=displayStart;i < displayEnd;i++) {rows.push(this.props.rowGetter(i));}return rows;}},getScrollbarWidth:function getScrollbarWidth(){var scrollbarWidth=0; // Get the scrollbar width
	var canvas=this.getDOMNode();scrollbarWidth = canvas.offsetWidth - canvas.clientWidth;return scrollbarWidth;},setScrollLeft:function setScrollLeft(scrollLeft){if(this._currentRowsLength !== 0){if(!this.refs)return;for(var i=0,len=this._currentRowsLength;i < len;i++) {if(this.refs[i] && this.refs[i].setScrollLeft){this.refs[i].setScrollLeft(scrollLeft);}}}},getScroll:function getScroll(){var _React$findDOMNode=React.findDOMNode(this);var scrollTop=_React$findDOMNode.scrollTop;var scrollLeft=_React$findDOMNode.scrollLeft;return {scrollTop:scrollTop,scrollLeft:scrollLeft};},onScroll:function onScroll(e){this.appendScrollShim();var _e$target=e.target;var scrollTop=_e$target.scrollTop;var scrollLeft=_e$target.scrollLeft;var scroll={scrollTop:scrollTop,scrollLeft:scrollLeft};this._scroll = scroll;this.props.onScroll(scroll);}});module.exports = Canvas; /***/}, /* 49 */function(module,exports,__webpack_require__){ /* TODO mixin not compatible and HTMLElement classList */ /**
		 * @jsx React.DOM


		 */'use strict';var React=__webpack_require__(18);var ScrollShim={appendScrollShim:function appendScrollShim(){if(!this._scrollShim){var size=this._scrollShimSize();var shim=document.createElement('div');if(shim.classList){shim.classList.add('react-grid-ScrollShim'); //flow - not compatible with HTMLElement
	}else {shim.className += ' react-grid-ScrollShim';}shim.style.position = 'absolute';shim.style.top = 0;shim.style.left = 0;shim.style.width = size.width + 'px';shim.style.height = size.height + 'px';React.findDOMNode(this).appendChild(shim);this._scrollShim = shim;}this._scheduleRemoveScrollShim();},_scrollShimSize:function _scrollShimSize(){return {width:this.props.width,height:this.props.length * this.props.rowHeight};},_scheduleRemoveScrollShim:function _scheduleRemoveScrollShim(){if(this._scheduleRemoveScrollShimTimer){clearTimeout(this._scheduleRemoveScrollShimTimer);}this._scheduleRemoveScrollShimTimer = setTimeout(this._removeScrollShim,200);},_removeScrollShim:function _removeScrollShim(){if(this._scrollShim){this._scrollShim.parentNode.removeChild(this._scrollShim);this._scrollShim = undefined;}}};module.exports = ScrollShim; /***/}, /* 50 */function(module,exports,__webpack_require__){ /**
		 * @jsx React.DOM


		 */'use strict';var _extends=__webpack_require__(2)['default'];var React=__webpack_require__(18);var joinClasses=__webpack_require__(21);var Cell=__webpack_require__(51);var ColumnMetrics=__webpack_require__(23);var ColumnUtilsMixin=__webpack_require__(25);var Row=React.createClass({displayName:'Row',propTypes:{height:React.PropTypes.number.isRequired,columns:React.PropTypes.oneOfType([React.PropTypes.object,React.PropTypes.array]).isRequired,row:React.PropTypes.object.isRequired,cellRenderer:React.PropTypes.func,isSelected:React.PropTypes.bool,idx:React.PropTypes.number.isRequired,expandedRows:React.PropTypes.arrayOf(React.PropTypes.object)},mixins:[ColumnUtilsMixin],render:function render(){var className=joinClasses('react-grid-Row','react-grid-Row--' + (this.props.idx % 2 === 0?'even':'odd'));var style={height:this.getRowHeight(this.props),overflow:'hidden'};var cells=this.getCells();return React.createElement('div',_extends({},this.props,{className:className,style:style,onDragEnter:this.handleDragEnter}),React.isValidElement(this.props.row)?this.props.row:cells);},getCells:function getCells(){var _this=this;var cells=[];var lockedCells=[];var selectedColumn=this.getSelectedColumn();this.props.columns.forEach(function(column,i){var CellRenderer=_this.props.cellRenderer;var cell=React.createElement(CellRenderer,{ref:i,key:column.key + '-' + i,idx:i,rowIdx:_this.props.idx,value:_this.getCellValue(column.key || i),column:column,height:_this.getRowHeight(),formatter:column.formatter,cellMetaData:_this.props.cellMetaData,rowData:_this.props.row,selectedColumn:selectedColumn,isRowSelected:_this.props.isSelected});if(column.locked){lockedCells.push(cell);}else {cells.push(cell);}});return cells.concat(lockedCells);},getRowHeight:function getRowHeight(){var rows=this.props.expandedRows || null;if(rows && this.props.key){var row=rows[this.props.key] || null;if(row){return row.height;}}return this.props.height;},getCellValue:function getCellValue(key){var val;if(key === 'select-row'){return this.props.isSelected;}else if(typeof this.props.row.get === 'function'){val = this.props.row.get(key);}else {val = this.props.row[key];}return val;},renderCell:function renderCell(props){if(typeof this.props.cellRenderer == 'function'){this.props.cellRenderer.call(this,props);}if(React.isValidElement(this.props.cellRenderer)){return cloneWithProps(this.props.cellRenderer,props);}else {return this.props.cellRenderer(props);}},getDefaultProps:function getDefaultProps(){return {cellRenderer:Cell,isSelected:false,height:35};},setScrollLeft:function setScrollLeft(scrollLeft){var _this2=this;this.props.columns.forEach(function(column,i){if(column.locked){if(!_this2.refs[i])return;_this2.refs[i].setScrollLeft(scrollLeft);}});},doesRowContainSelectedCell:function doesRowContainSelectedCell(props){var selected=props.cellMetaData.selected;if(selected && selected.rowIdx === props.idx){return true;}else {return false;}},willRowBeDraggedOver:function willRowBeDraggedOver(props){var dragged=props.cellMetaData.dragged;return dragged != null && (dragged.rowIdx >= 0 || dragged.complete === true);},hasRowBeenCopied:function hasRowBeenCopied(){var copied=this.props.cellMetaData.copied;return copied != null && copied.rowIdx === this.props.idx;},shouldComponentUpdate:function shouldComponentUpdate(nextProps,nextState){return !ColumnMetrics.sameColumns(this.props.columns,nextProps.columns,ColumnMetrics.sameColumn) || this.doesRowContainSelectedCell(this.props) || this.doesRowContainSelectedCell(nextProps) || this.willRowBeDraggedOver(nextProps) || nextProps.row !== this.props.row || this.hasRowBeenCopied() || this.props.isSelected !== nextProps.isSelected || nextProps.height !== this.props.height;},handleDragEnter:function handleDragEnter(){var handleDragEnterRow=this.props.cellMetaData.handleDragEnterRow;if(handleDragEnterRow){handleDragEnterRow(this.props.idx);}},getSelectedColumn:function getSelectedColumn(){var selected=this.props.cellMetaData.selected;if(selected && selected.idx){return this.getColumn(this.props.columns,selected.idx);}}});module.exports = Row; /***/}, /* 51 */function(module,exports,__webpack_require__){ /**
		 * @jsx React.DOM


		 */'use strict';var _extends=__webpack_require__(2)['default'];var React=__webpack_require__(18);var joinClasses=__webpack_require__(21);var cloneWithProps=__webpack_require__(30);var EditorContainer=__webpack_require__(52);var ExcelColumn=__webpack_require__(42);var isFunction=__webpack_require__(74);var CellMetaDataShape=__webpack_require__(75);var Cell=React.createClass({displayName:'Cell',propTypes:{rowIdx:React.PropTypes.number.isRequired,idx:React.PropTypes.number.isRequired,selected:React.PropTypes.shape({idx:React.PropTypes.number.isRequired}),tabIndex:React.PropTypes.number,ref:React.PropTypes.string,column:React.PropTypes.shape(ExcelColumn).isRequired,value:React.PropTypes.oneOfType([React.PropTypes.string,React.PropTypes.number,React.PropTypes.object,React.PropTypes.bool]).isRequired,isExpanded:React.PropTypes.bool,cellMetaData:React.PropTypes.shape(CellMetaDataShape).isRequired,handleDragStart:React.PropTypes.func,className:React.PropTypes.string,rowData:React.PropTypes.object.isRequired},getDefaultProps:function getDefaultProps(){return {tabIndex:-1,ref:"cell",isExpanded:false};},getInitialState:function getInitialState(){return {isRowChanging:false,isCellValueChanging:false};},componentDidMount:function componentDidMount(){this.checkFocus();},componentDidUpdate:function componentDidUpdate(prevProps,prevState){this.checkFocus();var dragged=this.props.cellMetaData.dragged;if(dragged && dragged.complete === true){this.props.cellMetaData.handleTerminateDrag();}if(this.state.isRowChanging && this.props.selectedColumn != null){this.applyUpdateClass();}},componentWillReceiveProps:function componentWillReceiveProps(nextProps){this.setState({isRowChanging:this.props.rowData !== nextProps.rowData,isCellValueChanging:this.props.value !== nextProps.value});},shouldComponentUpdate:function shouldComponentUpdate(nextProps,nextState){return this.props.column.width !== nextProps.column.width || this.props.column.left !== nextProps.column.left || this.props.rowData !== nextProps.rowData || this.props.height !== nextProps.height || this.props.rowIdx !== nextProps.rowIdx || this.isCellSelectionChanging(nextProps) || this.isDraggedCellChanging(nextProps) || this.isCopyCellChanging(nextProps) || this.props.isRowSelected !== nextProps.isRowSelected || this.isSelected();},getStyle:function getStyle(){var style={position:'absolute',width:this.props.column.width,height:this.props.height,left:this.props.column.left};return style;},render:function render(){var style=this.getStyle();var className=this.getCellClass();var cellContent=this.renderCellContent({value:this.props.value,column:this.props.column,rowIdx:this.props.rowIdx,isExpanded:this.props.isExpanded});return React.createElement('div',_extends({},this.props,{className:className,style:style,onClick:this.onCellClick,onDoubleClick:this.onCellDoubleClick}),cellContent,React.createElement('div',{className:'drag-handle',draggable:'true'}));},renderCellContent:function renderCellContent(props){var CellContent;var Formatter=this.getFormatter();if(React.isValidElement(Formatter)){props.dependentValues = this.getFormatterDependencies();CellContent = cloneWithProps(Formatter,props);}else if(isFunction(Formatter)){CellContent = React.createElement(Formatter,{value:this.props.value,dependentValues:this.getFormatterDependencies()});}else {CellContent = React.createElement(SimpleCellFormatter,{value:this.props.value});}return React.createElement('div',{ref:'cell',className:'react-grid-Cell__value'},CellContent,' ',this.props.cellControls);},isColumnSelected:function isColumnSelected(){var meta=this.props.cellMetaData;if(meta == null || meta.selected == null){return false;}return meta.selected && meta.selected.idx === this.props.idx;},isSelected:function isSelected(){var meta=this.props.cellMetaData;if(meta == null || meta.selected == null){return false;}return meta.selected && meta.selected.rowIdx === this.props.rowIdx && meta.selected.idx === this.props.idx;},isActive:function isActive(){var meta=this.props.cellMetaData;if(meta == null || meta.selected == null){return false;}return this.isSelected() && meta.selected.active === true;},isCellSelectionChanging:function isCellSelectionChanging(nextProps){var meta=this.props.cellMetaData;if(meta == null || meta.selected == null){return false;}var nextSelected=nextProps.cellMetaData.selected;if(meta.selected && nextSelected){return this.props.idx === nextSelected.idx || this.props.idx === meta.selected.idx;}else {return true;}},getFormatter:function getFormatter(){var col=this.props.column;if(this.isActive()){return React.createElement(EditorContainer,{rowData:this.getRowData(),rowIdx:this.props.rowIdx,idx:this.props.idx,cellMetaData:this.props.cellMetaData,column:col,height:this.props.height});}else {return this.props.column.formatter;}},getRowData:function getRowData(){return this.props.rowData.toJSON?this.props.rowData.toJSON():this.props.rowData;},getFormatterDependencies:function getFormatterDependencies(){ //clone row data so editor cannot actually change this
	var columnName=this.props.column.ItemId; //convention based method to get corresponding Id or Name of any Name or Id property
	if(typeof this.props.column.getRowMetaData === 'function'){return this.props.column.getRowMetaData(this.getRowData(),this.props.column);}},onCellClick:function onCellClick(e){var meta=this.props.cellMetaData;if(meta != null && meta.onCellClick != null){meta.onCellClick({rowIdx:this.props.rowIdx,idx:this.props.idx});}},onCellDoubleClick:function onCellDoubleClick(e){var meta=this.props.cellMetaData;if(meta != null && meta.onCellDoubleClick != null){meta.onCellDoubleClick({rowIdx:this.props.rowIdx,idx:this.props.idx});}},checkFocus:function checkFocus(){if(this.isSelected() && !this.isActive()){React.findDOMNode(this).focus();}},getCellClass:function getCellClass(){var className=joinClasses(this.props.column.cellClass,'react-grid-Cell',this.props.className,this.props.column.locked?'react-grid-Cell--locked':null);var extraClasses=joinClasses({'selected':this.isSelected() && !this.isActive(),'editing':this.isActive(),'copied':this.isCopied(),'active-drag-cell':this.isSelected() || this.isDraggedOver(),'is-dragged-over-up':this.isDraggedOverUpwards(),'is-dragged-over-down':this.isDraggedOverDownwards(),'was-dragged-over':this.wasDraggedOver()});return joinClasses(className,extraClasses);},getUpdateCellClass:function getUpdateCellClass(){return this.props.column.getUpdateCellClass?this.props.column.getUpdateCellClass(this.props.selectedColumn,this.props.column,this.state.isCellValueChanging):'';},applyUpdateClass:function applyUpdateClass(){var updateCellClass=this.getUpdateCellClass(); // -> removing the class
	if(updateCellClass != null && updateCellClass != ""){var cellDOMNode=this.getDOMNode();if(cellDOMNode.classList){cellDOMNode.classList.remove(updateCellClass); // -> and re-adding the class
	cellDOMNode.classList.add(updateCellClass);}else if(cellDOMNode.className.indexOf(updateCellClass) === -1){ // IE9 doesn't support classList, nor (I think) altering element.className
	// without replacing it wholesale.
	cellDOMNode.className = cellDOMNode.className + ' ' + updateCellClass;}}},setScrollLeft:function setScrollLeft(scrollLeft){var ctrl=this; //flow on windows has an outdated react declaration, once that gets updated, we can remove this
	if(ctrl.isMounted()){var node=React.findDOMNode(this);var transform='translate3d(' + scrollLeft + 'px, 0px, 0px)';node.style.webkitTransform = transform;node.style.transform = transform;}},isCopied:function isCopied(){var copied=this.props.cellMetaData.copied;return copied && copied.rowIdx === this.props.rowIdx && copied.idx === this.props.idx;},isDraggedOver:function isDraggedOver(){var dragged=this.props.cellMetaData.dragged;return dragged && dragged.overRowIdx === this.props.rowIdx && dragged.idx === this.props.idx;},wasDraggedOver:function wasDraggedOver(){var dragged=this.props.cellMetaData.dragged;return dragged && (dragged.overRowIdx < this.props.rowIdx && this.props.rowIdx < dragged.rowIdx || dragged.overRowIdx > this.props.rowIdx && this.props.rowIdx > dragged.rowIdx) && dragged.idx === this.props.idx;},isDraggedCellChanging:function isDraggedCellChanging(nextProps){var isChanging;var dragged=this.props.cellMetaData.dragged;var nextDragged=nextProps.cellMetaData.dragged;if(dragged){isChanging = nextDragged && this.props.idx === nextDragged.idx || dragged && this.props.idx === dragged.idx;return isChanging;}else {return false;}},isCopyCellChanging:function isCopyCellChanging(nextProps){var isChanging;var copied=this.props.cellMetaData.copied;var nextCopied=nextProps.cellMetaData.copied;if(copied){isChanging = nextCopied && this.props.idx === nextCopied.idx || copied && this.props.idx === copied.idx;return isChanging;}else {return false;}},isDraggedOverUpwards:function isDraggedOverUpwards(){var dragged=this.props.cellMetaData.dragged;return !this.isSelected() && this.isDraggedOver() && this.props.rowIdx < dragged.rowIdx;},isDraggedOverDownwards:function isDraggedOverDownwards(){var dragged=this.props.cellMetaData.dragged;return !this.isSelected() && this.isDraggedOver() && this.props.rowIdx > dragged.rowIdx;}});var SimpleCellFormatter=React.createClass({displayName:'SimpleCellFormatter',propTypes:{value:React.PropTypes.oneOfType([React.PropTypes.string,React.PropTypes.number,React.PropTypes.object,React.PropTypes.bool]).isRequired},render:function render(){return React.createElement('span',null,this.props.value);},shouldComponentUpdate:function shouldComponentUpdate(nextProps,nextState){return nextProps.value !== this.props.value;}});module.exports = Cell; /***/}, /* 52 */function(module,exports,__webpack_require__){ /**
		* @jsx React.DOM


		*/'use strict';var React=__webpack_require__(18);var joinClasses=__webpack_require__(21);var keyboardHandlerMixin=__webpack_require__(53);var SimpleTextEditor=__webpack_require__(54);var isFunction=__webpack_require__(74);var cloneWithProps=__webpack_require__(30);var EditorContainer=React.createClass({displayName:'EditorContainer',mixins:[keyboardHandlerMixin],propTypes:{rowData:React.PropTypes.object.isRequired,value:React.PropTypes.oneOfType([React.PropTypes.string,React.PropTypes.number,React.PropTypes.object,React.PropTypes.bool]).isRequired,cellMetaData:React.PropTypes.shape({selected:React.PropTypes.object.isRequired,copied:React.PropTypes.object,dragged:React.PropTypes.object,onCellClick:React.PropTypes.func,onCellDoubleClick:React.PropTypes.func}).isRequired,column:React.PropTypes.object.isRequired,height:React.PropTypes.number.isRequired},changeCommitted:false,getInitialState:function getInitialState(){return {isInvalid:false};},componentDidMount:function componentDidMount(){var inputNode=this.getInputNode();if(inputNode !== undefined){this.setTextInputFocus();if(!this.getEditor().disableContainerStyles){inputNode.className += ' editor-main';inputNode.style.height = this.props.height - 1 + 'px';}}},createEditor:function createEditor(){var _this=this;var editorRef=function editorRef(c){return _this.editor = c;};var editorProps={ref:editorRef,column:this.props.column,value:this.getInitialValue(),onCommit:this.commit,rowMetaData:this.getRowMetaData(),height:this.props.height,onBlur:this.commit,onOverrideKeyDown:this.onKeyDown};var customEditor=this.props.column.editor;if(customEditor && React.isValidElement(customEditor)){ //return custom column editor or SimpleEditor if none specified
	return cloneWithProps(customEditor,editorProps);}else {return React.createElement(SimpleTextEditor,{ref:editorRef,column:this.props.column,value:this.getInitialValue(),onBlur:this.commit,rowMetaData:this.getRowMetaData()});}},getRowMetaData:function getRowMetaData(){ //clone row data so editor cannot actually change this
	var columnName=this.props.column.ItemId; //convention based method to get corresponding Id or Name of any Name or Id property
	if(typeof this.props.column.getRowMetaData === 'function'){return this.props.column.getRowMetaData(this.props.rowData,this.props.column);}},onPressEnter:function onPressEnter(e){this.commit({key:'Enter'});},onPressTab:function onPressTab(e){this.commit({key:'Tab'});},onPressEscape:function onPressEscape(e){if(!this.editorIsSelectOpen()){this.props.cellMetaData.onCommitCancel();}else { // prevent event from bubbling if editor has results to select
	e.stopPropagation();}},onPressArrowDown:function onPressArrowDown(e){if(this.editorHasResults()){ //dont want to propogate as that then moves us round the grid
	e.stopPropagation();}else {this.commit(e);}},onPressArrowUp:function onPressArrowUp(e){if(this.editorHasResults()){ //dont want to propogate as that then moves us round the grid
	e.stopPropagation();}else {this.commit(e);}},onPressArrowLeft:function onPressArrowLeft(e){ //prevent event propogation. this disables left cell navigation
	if(!this.isCaretAtBeginningOfInput()){e.stopPropagation();}else {this.commit(e);}},onPressArrowRight:function onPressArrowRight(e){ //prevent event propogation. this disables right cell navigation
	if(!this.isCaretAtEndOfInput()){e.stopPropagation();}else {this.commit(e);}},editorHasResults:function editorHasResults(){if(isFunction(this.getEditor().hasResults)){return this.getEditor().hasResults();}else {return false;}},editorIsSelectOpen:function editorIsSelectOpen(){if(isFunction(this.getEditor().isSelectOpen)){return this.getEditor().isSelectOpen();}else {return false;}},getEditor:function getEditor(){return this.editor;},commit:function commit(args){var opts=args || {};var updated=this.getEditor().getValue();if(this.isNewValueValid(updated)){var cellKey=this.props.column.key;this.props.cellMetaData.onCommit({cellKey:cellKey,rowIdx:this.props.rowIdx,updated:updated,key:opts.key});}this.changeCommitted = true;},isNewValueValid:function isNewValueValid(value){if(isFunction(this.getEditor().validate)){var isValid=this.getEditor().validate(value);this.setState({isInvalid:!isValid});return isValid;}else {return true;}},getInputNode:function getInputNode(){return this.getEditor().getInputNode();},getInitialValue:function getInitialValue(){var selected=this.props.cellMetaData.selected;var keyCode=selected.initialKeyCode;if(keyCode === 'Delete' || keyCode === 'Backspace'){return '';}else if(keyCode === 'Enter'){return this.props.value;}else {var text=keyCode?String.fromCharCode(keyCode):this.props.value;return text;}},getContainerClass:function getContainerClass(){return joinClasses({'has-error':this.state.isInvalid === true});},renderStatusIcon:function renderStatusIcon(){if(this.state.isInvalid === true){return React.createElement('span',{className:'glyphicon glyphicon-remove form-control-feedback'});}},render:function render(){return React.createElement('div',{className:this.getContainerClass(),onKeyDown:this.onKeyDown},this.createEditor(),this.renderStatusIcon());},setCaretAtEndOfInput:function setCaretAtEndOfInput(){var input=this.getInputNode(); //taken from http://stackoverflow.com/questions/511088/use-javascript-to-place-cursor-at-end-of-text-in-text-input-element
	var txtLength=input.value.length;if(input.setSelectionRange){input.setSelectionRange(txtLength,txtLength);}else if(input.createTextRange){var fieldRange=input.createTextRange();fieldRange.moveStart('character',txtLength);fieldRange.collapse();fieldRange.select();}},isCaretAtBeginningOfInput:function isCaretAtBeginningOfInput(){var inputNode=this.getInputNode();return inputNode.selectionStart === inputNode.selectionEnd && inputNode.selectionStart === 0;},isCaretAtEndOfInput:function isCaretAtEndOfInput(){var inputNode=this.getInputNode();return inputNode.selectionStart === inputNode.value.length;},setTextInputFocus:function setTextInputFocus(){var selected=this.props.cellMetaData.selected;var keyCode=selected.initialKeyCode;var inputNode=this.getInputNode();inputNode.focus();if(inputNode.tagName === "INPUT"){if(!this.isKeyPrintable(keyCode)){inputNode.focus();inputNode.select();}else {inputNode.select();}}},componentWillUnmount:function componentWillUnmount(){if(!this.changeCommitted && !this.hasEscapeBeenPressed()){this.commit({key:'Enter'});}},hasEscapeBeenPressed:function hasEscapeBeenPressed(){var pressed=false;var escapeKey=27;if(window.event){if(window.event.keyCode === escapeKey){pressed = true;}else if(window.event.which === escapeKey){pressed = true;}}return pressed;}});module.exports = EditorContainer; /***/}, /* 53 */function(module,exports,__webpack_require__){ /* TODO: mixins */ /**
		 * @jsx React.DOM


		 */'use strict';var React=__webpack_require__(18);var KeyboardHandlerMixin={onKeyDown:function onKeyDown(e){if(this.isCtrlKeyHeldDown(e)){this.checkAndCall('onPressKeyWithCtrl',e);}else if(this.isKeyExplicitlyHandled(e.key)){ //break up individual keyPress events to have their own specific callbacks
	//this allows multiple mixins to listen to onKeyDown events and somewhat reduces methodName clashing
	var callBack='onPress' + e.key;this.checkAndCall(callBack,e);}else if(this.isKeyPrintable(e.keyCode)){this.checkAndCall('onPressChar',e);}}, //taken from http://stackoverflow.com/questions/12467240/determine-if-javascript-e-keycode-is-a-printable-non-control-character
	isKeyPrintable:function isKeyPrintable(keycode){var valid=keycode > 47 && keycode < 58 ||  // number keys
	keycode == 32 || keycode == 13 ||  // spacebar & return key(s) (if you want to allow carriage returns)
	keycode > 64 && keycode < 91 ||  // letter keys
	keycode > 95 && keycode < 112 ||  // numpad keys
	keycode > 185 && keycode < 193 ||  // ;=,-./` (in order)
	keycode > 218 && keycode < 223; // [\]' (in order)
	return valid;},isKeyExplicitlyHandled:function isKeyExplicitlyHandled(key){return typeof this['onPress' + key] === 'function';},isCtrlKeyHeldDown:function isCtrlKeyHeldDown(e){return e.ctrlKey === true && e.key !== "Control";},checkAndCall:function checkAndCall(methodName,args){if(typeof this[methodName] === 'function'){this[methodName](args);}}};module.exports = KeyboardHandlerMixin; /***/}, /* 54 */function(module,exports,__webpack_require__){ /**
		 * @jsx React.DOM


		 */'use strict';var _get=__webpack_require__(55)['default'];var _inherits=__webpack_require__(61)['default'];var _createClass=__webpack_require__(70)['default'];var _classCallCheck=__webpack_require__(43)['default'];var React=__webpack_require__(18);var keyboardHandlerMixin=__webpack_require__(53);var ExcelColumn=__webpack_require__(42);var EditorBase=__webpack_require__(73);var SimpleTextEditor=(function(_EditorBase){_inherits(SimpleTextEditor,_EditorBase);function SimpleTextEditor(){_classCallCheck(this,SimpleTextEditor);_get(Object.getPrototypeOf(SimpleTextEditor.prototype),'constructor',this).apply(this,arguments);}_createClass(SimpleTextEditor,[{key:'render',value:function render(){return React.createElement('input',{ref:'input',type:'text',onBlur:this.props.onBlur,className:'form-control',defaultValue:this.props.value});}}]);return SimpleTextEditor;})(EditorBase);;module.exports = SimpleTextEditor; /***/}, /* 55 */function(module,exports,__webpack_require__){"use strict";var _Object$getOwnPropertyDescriptor=__webpack_require__(56)["default"];exports["default"] = function get(_x,_x2,_x3){var _again=true;_function: while(_again) {var object=_x,property=_x2,receiver=_x3;_again = false;if(object === null)object = Function.prototype;var desc=_Object$getOwnPropertyDescriptor(object,property);if(desc === undefined){var parent=Object.getPrototypeOf(object);if(parent === null){return undefined;}else {_x = parent;_x2 = property;_x3 = receiver;_again = true;desc = parent = undefined;continue _function;}}else if("value" in desc){return desc.value;}else {var getter=desc.get;if(getter === undefined){return undefined;}return getter.call(receiver);}}};exports.__esModule = true; /***/}, /* 56 */function(module,exports,__webpack_require__){module.exports = {"default":__webpack_require__(57),__esModule:true}; /***/}, /* 57 */function(module,exports,__webpack_require__){var $=__webpack_require__(12);__webpack_require__(58);module.exports = function getOwnPropertyDescriptor(it,key){return $.getDesc(it,key);}; /***/}, /* 58 */function(module,exports,__webpack_require__){ // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	var toIObject=__webpack_require__(59);__webpack_require__(60)('getOwnPropertyDescriptor',function($getOwnPropertyDescriptor){return function getOwnPropertyDescriptor(it,key){return $getOwnPropertyDescriptor(toIObject(it),key);};}); /***/}, /* 59 */function(module,exports,__webpack_require__){ // to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject=__webpack_require__(15),defined=__webpack_require__(14);module.exports = function(it){return IObject(defined(it));}; /***/}, /* 60 */function(module,exports,__webpack_require__){ // most Object methods by ES6 should accept primitives
	var $export=__webpack_require__(6),core=__webpack_require__(8),fails=__webpack_require__(17);module.exports = function(KEY,exec){var fn=(core.Object || {})[KEY] || Object[KEY],exp={};exp[KEY] = exec(fn);$export($export.S + $export.F * fails(function(){fn(1);}),'Object',exp);}; /***/}, /* 61 */function(module,exports,__webpack_require__){"use strict";var _Object$create=__webpack_require__(62)["default"];var _Object$setPrototypeOf=__webpack_require__(64)["default"];exports["default"] = function(subClass,superClass){if(typeof superClass !== "function" && superClass !== null){throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = _Object$create(superClass && superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)_Object$setPrototypeOf?_Object$setPrototypeOf(subClass,superClass):subClass.__proto__ = superClass;};exports.__esModule = true; /***/}, /* 62 */function(module,exports,__webpack_require__){module.exports = {"default":__webpack_require__(63),__esModule:true}; /***/}, /* 63 */function(module,exports,__webpack_require__){var $=__webpack_require__(12);module.exports = function create(P,D){return $.create(P,D);}; /***/}, /* 64 */function(module,exports,__webpack_require__){module.exports = {"default":__webpack_require__(65),__esModule:true}; /***/}, /* 65 */function(module,exports,__webpack_require__){__webpack_require__(66);module.exports = __webpack_require__(8).Object.setPrototypeOf; /***/}, /* 66 */function(module,exports,__webpack_require__){ // 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export=__webpack_require__(6);$export($export.S,'Object',{setPrototypeOf:__webpack_require__(67).set}); /***/}, /* 67 */function(module,exports,__webpack_require__){ // Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */var getDesc=__webpack_require__(12).getDesc,isObject=__webpack_require__(68),anObject=__webpack_require__(69);var check=function check(O,proto){anObject(O);if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");};module.exports = {set:_Object$setPrototypeOf2 || ('__proto__' in {}? // eslint-disable-line
	(function(test,buggy,set){try{set = __webpack_require__(9)(Function.call,getDesc(Object.prototype,'__proto__').set,2);set(test,[]);buggy = !(test instanceof Array);}catch(e) {buggy = true;}return function setPrototypeOf(O,proto){check(O,proto);if(buggy)O.__proto__ = proto;else set(O,proto);return O;};})({},false):undefined),check:check}; /***/}, /* 68 */function(module,exports){module.exports = function(it){return typeof it === 'object'?it !== null:typeof it === 'function';}; /***/}, /* 69 */function(module,exports,__webpack_require__){var isObject=__webpack_require__(68);module.exports = function(it){if(!isObject(it))throw TypeError(it + ' is not an object!');return it;}; /***/}, /* 70 */function(module,exports,__webpack_require__){"use strict";var _Object$defineProperty=__webpack_require__(71)["default"];exports["default"] = (function(){function defineProperties(target,props){for(var i=0;i < props.length;i++) {var descriptor=props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if("value" in descriptor)descriptor.writable = true;_Object$defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};})();exports.__esModule = true; /***/}, /* 71 */function(module,exports,__webpack_require__){module.exports = {"default":__webpack_require__(72),__esModule:true}; /***/}, /* 72 */function(module,exports,__webpack_require__){var $=__webpack_require__(12);module.exports = function defineProperty(it,key,desc){return $.setDesc(it,key,desc);}; /***/}, /* 73 */function(module,exports,__webpack_require__){ /**
		 * @jsx React.DOM


		 */'use strict';var _get=__webpack_require__(55)['default'];var _inherits=__webpack_require__(61)['default'];var _createClass=__webpack_require__(70)['default'];var _classCallCheck=__webpack_require__(43)['default'];var React=__webpack_require__(18);var keyboardHandlerMixin=__webpack_require__(53);var ExcelColumn=__webpack_require__(42);var EditorBase=(function(_React$Component){_inherits(EditorBase,_React$Component);function EditorBase(){_classCallCheck(this,EditorBase);_get(Object.getPrototypeOf(EditorBase.prototype),'constructor',this).apply(this,arguments);}_createClass(EditorBase,[{key:'getStyle',value:function getStyle(){return {width:'100%'};}},{key:'getValue',value:function getValue(){var updated={};updated[this.props.column.key] = this.getInputNode().value;return updated;}},{key:'getInputNode',value:function getInputNode(){var domNode=React.findDOMNode(this);if(domNode.tagName === 'INPUT'){return domNode;}else {return domNode.querySelector("input:not([type=hidden])");}}},{key:'inheritContainerStyles',value:function inheritContainerStyles(){return true;}}]);return EditorBase;})(React.Component);EditorBase.propTypes = {onKeyDown:React.PropTypes.func.isRequired,value:React.PropTypes.any.isRequired,onBlur:React.PropTypes.func.isRequired,column:React.PropTypes.shape(ExcelColumn).isRequired,commit:React.PropTypes.func.isRequired};module.exports = EditorBase; /***/}, /* 74 */function(module,exports){"use strict";var isFunction=function isFunction(functionToCheck){var getType={};return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';};module.exports = isFunction; /***/}, /* 75 */function(module,exports,__webpack_require__){'use strict';var PropTypes=__webpack_require__(18).PropTypes;module.exports = {selected:PropTypes.object.isRequired,copied:PropTypes.object,dragged:PropTypes.object,onCellClick:PropTypes.func.isRequired}; /***/}, /* 76 */function(module,exports,__webpack_require__){ /* TODO mixins */'use strict';var React=__webpack_require__(18);var DOMMetrics=__webpack_require__(77);var getWindowSize=__webpack_require__(78);var PropTypes=React.PropTypes;var min=Math.min;var max=Math.max;var floor=Math.floor;var ceil=Math.ceil;module.exports = {mixins:[DOMMetrics.MetricsMixin],DOMMetrics:{viewportHeight:function viewportHeight(){return React.findDOMNode(this).offsetHeight;}},propTypes:{rowHeight:React.PropTypes.number,rowsCount:React.PropTypes.number.isRequired},getDefaultProps:function getDefaultProps(){return {rowHeight:30};},getInitialState:function getInitialState(){return this.getGridState(this.props);},getGridState:function getGridState(props){var renderedRowsCount=ceil((props.minHeight - props.rowHeight) / props.rowHeight);var totalRowCount=min(renderedRowsCount * 2,props.rowsCount);return {displayStart:0,displayEnd:totalRowCount,height:props.minHeight,scrollTop:0,scrollLeft:0};},updateScroll:function updateScroll(scrollTop,scrollLeft,height,rowHeight,length){var renderedRowsCount=ceil(height / rowHeight);var visibleStart=floor(scrollTop / rowHeight);var visibleEnd=min(visibleStart + renderedRowsCount,length);var displayStart=max(0,visibleStart - renderedRowsCount * 2);var displayEnd=min(visibleStart + renderedRowsCount * 2,length);var nextScrollState={visibleStart:visibleStart,visibleEnd:visibleEnd,displayStart:displayStart,displayEnd:displayEnd,height:height,scrollTop:scrollTop,scrollLeft:scrollLeft};this.setState(nextScrollState);},metricsUpdated:function metricsUpdated(){var height=this.DOMMetrics.viewportHeight();if(height){this.updateScroll(this.state.scrollTop,this.state.scrollLeft,height,this.props.rowHeight,this.props.rowsCount);}},componentWillReceiveProps:function componentWillReceiveProps(nextProps){if(this.props.rowHeight !== nextProps.rowHeight || this.props.minHeight !== nextProps.minHeight){this.setState(this.getGridState(nextProps));}else if(this.props.rowsCount !== nextProps.rowsCount){this.updateScroll(this.state.scrollTop,this.state.scrollLeft,this.state.height,nextProps.rowHeight,nextProps.rowsCount);}}}; /***/}, /* 77 */function(module,exports,__webpack_require__){ /* TODO mixin and invarient splat */ /**
		 * @jsx React.DOM


		 */'use strict';var React=__webpack_require__(18);var emptyFunction=__webpack_require__(37);var shallowCloneObject=__webpack_require__(22);var contextTypes={metricsComputator:React.PropTypes.object};var MetricsComputatorMixin={childContextTypes:contextTypes,getChildContext:function getChildContext(){return {metricsComputator:this};},getMetricImpl:function getMetricImpl(name){return this._DOMMetrics.metrics[name].value;},registerMetricsImpl:function registerMetricsImpl(component,metrics){var getters={};var s=this._DOMMetrics;for(var name in metrics) {if(s.metrics[name] !== undefined){throw new Error('DOM metric ' + name + ' is already defined');}s.metrics[name] = {component:component,computator:metrics[name].bind(component)};getters[name] = this.getMetricImpl.bind(null,name);}if(s.components.indexOf(component) === -1){s.components.push(component);}return getters;},unregisterMetricsFor:function unregisterMetricsFor(component){var s=this._DOMMetrics;var idx=s.components.indexOf(component);if(idx > -1){s.components.splice(idx,1);var name;var metricsToDelete={};for(name in s.metrics) {if(s.metrics[name].component === component){metricsToDelete[name] = true;}}for(name in metricsToDelete) {delete s.metrics[name];}}},updateMetrics:function updateMetrics(){var s=this._DOMMetrics;var needUpdate=false;for(var name in s.metrics) {var newMetric=s.metrics[name].computator();if(newMetric !== s.metrics[name].value){needUpdate = true;}s.metrics[name].value = newMetric;}if(needUpdate){for(var i=0,len=s.components.length;i < len;i++) {if(s.components[i].metricsUpdated){s.components[i].metricsUpdated();}}}},componentWillMount:function componentWillMount(){this._DOMMetrics = {metrics:{},components:[]};},componentDidMount:function componentDidMount(){if(window.addEventListener){window.addEventListener('resize',this.updateMetrics);}else {window.attachEvent('resize',this.updateMetrics);}this.updateMetrics();},componentWillUnmount:function componentWillUnmount(){window.removeEventListener('resize',this.updateMetrics);}};var MetricsMixin={contextTypes:contextTypes,componentWillMount:function componentWillMount(){if(this.DOMMetrics){this._DOMMetricsDefs = shallowCloneObject(this.DOMMetrics);this.DOMMetrics = {};for(var name in this._DOMMetricsDefs) {this.DOMMetrics[name] = emptyFunction;}}},componentDidMount:function componentDidMount(){if(this.DOMMetrics){this.DOMMetrics = this.registerMetrics(this._DOMMetricsDefs);}},componentWillUnmount:function componentWillUnmount(){if(!this.registerMetricsImpl){return this.context.metricsComputator.unregisterMetricsFor(this);}if(this.hasOwnProperty('DOMMetrics')){delete this.DOMMetrics;}},registerMetrics:function registerMetrics(metrics){if(this.registerMetricsImpl){return this.registerMetricsImpl(this,metrics);}else {return this.context.metricsComputator.registerMetricsImpl(this,metrics);}},getMetric:function getMetric(name){if(this.getMetricImpl){return this.getMetricImpl(name);}else {return this.context.metricsComputator.getMetricImpl(name);}}};module.exports = {MetricsComputatorMixin:MetricsComputatorMixin,MetricsMixin:MetricsMixin}; /***/}, /* 78 */function(module,exports){ /**
		 * @jsx React.DOM



		 */'use strict'; /**
		 * Return window's height and width
		 *
		 * @return {Object} height and width of the window
		 */function getWindowSize(){var width=window.innerWidth;var height=window.innerHeight;if(!width || !height){width = document.documentElement.clientWidth;height = document.documentElement.clientHeight;}if(!width || !height){width = document.body.clientWidth;height = document.body.clientHeight;}return {width:width,height:height};}module.exports = getWindowSize; /***/}, /* 79 */function(module,exports){ /* TODO mixins */"use strict";module.exports = {componentDidMount:function componentDidMount(){this._scrollLeft = this.refs.viewport?this.refs.viewport.getScroll().scrollLeft:0;this._onScroll();},componentDidUpdate:function componentDidUpdate(){this._onScroll();},componentWillMount:function componentWillMount(){this._scrollLeft = undefined;},componentWillUnmount:function componentWillUnmount(){this._scrollLeft = undefined;},onScroll:function onScroll(props){if(this._scrollLeft !== props.scrollLeft){this._scrollLeft = props.scrollLeft;this._onScroll();}},_onScroll:function _onScroll(){if(this._scrollLeft !== undefined){this.refs.header.setScrollLeft(this._scrollLeft);if(this.refs.viewport){this.refs.viewport.setScrollLeft(this._scrollLeft);}}}}; /***/}, /* 80 */function(module,exports,__webpack_require__){ /**
		 * @jsx React.DOM
		 */'use strict';var React=__webpack_require__(18);var CheckboxEditor=React.createClass({displayName:'CheckboxEditor',PropTypes:{value:React.PropTypes.bool.isRequired,rowIdx:React.PropTypes.number.isRequired,column:React.PropTypes.shape({key:React.PropTypes.string.isRequired,onCellChange:React.PropTypes.func.isRequired}).isRequired},render:function render(){var checked=this.props.value != null?this.props.value:false;return React.createElement('input',{className:'react-grid-CheckBox',type:'checkbox',checked:checked,onClick:this.handleChange});},handleChange:function handleChange(e){this.props.column.onCellChange(this.props.rowIdx,this.props.column.key,e);}});module.exports = CheckboxEditor; /***/}, /* 81 */function(module,exports,__webpack_require__){ /**
		 * @jsx React.DOM


		 */'use strict';var React=__webpack_require__(18);var ExcelColumn=__webpack_require__(42);var FilterableHeaderCell=React.createClass({displayName:'FilterableHeaderCell',propTypes:{onChange:React.PropTypes.func.isRequired,column:React.PropTypes.shape(ExcelColumn).isRequired},getInitialState:function getInitialState(){return {filterTerm:''};},handleChange:function handleChange(e){var val=e.target.value;this.setState({filterTerm:val});this.props.onChange({filterTerm:val,columnKey:this.props.column.key});},render:function render(){return React.createElement('div',null,React.createElement('div',{className:'form-group'},this.renderInput()));},renderInput:function renderInput(){if(this.props.column.filterable === false){return React.createElement('span',null);}else {var input_key='header-filter-' + this.props.column.key;return React.createElement('input',{key:input_key,type:'text',className:'form-control input-sm',placeholder:'Search',value:this.state.filterTerm,onChange:this.handleChange});}}});module.exports = FilterableHeaderCell; /***/}, /* 82 */function(module,exports,__webpack_require__){ /* TODO mixins */'use strict';var _classCallCheck=__webpack_require__(43)['default'];var ColumnMetrics=__webpack_require__(23);var DOMMetrics=__webpack_require__(77);Object.assign = __webpack_require__(83);var PropTypes=__webpack_require__(18).PropTypes;var ColumnUtils=__webpack_require__(25);var React=__webpack_require__(18);var Column=function Column(){_classCallCheck(this,Column);};;module.exports = {mixins:[DOMMetrics.MetricsMixin],propTypes:{columns:PropTypes.arrayOf(Column),minColumnWidth:PropTypes.number,columnEquality:PropTypes.func},DOMMetrics:{gridWidth:function gridWidth(){return React.findDOMNode(this).parentElement.offsetWidth;}},getDefaultProps:function getDefaultProps(){return {minColumnWidth:80,columnEquality:ColumnMetrics.sameColumn};},componentWillReceiveProps:function componentWillReceiveProps(nextProps){if(nextProps.columns){if(!ColumnMetrics.sameColumns(this.props.columns,nextProps.columns,this.props.columnEquality) || nextProps.minWidth !== this.props.minWidth){var columnMetrics=this.createColumnMetrics(nextProps);this.setState({columnMetrics:columnMetrics});}}},getTotalWidth:function getTotalWidth(){var totalWidth=0;if(this.isMounted()){totalWidth = this.DOMMetrics.gridWidth();}else {totalWidth = ColumnUtils.getSize(this.props.columns) * this.props.minColumnWidth;}return totalWidth;},getColumnMetricsType:function getColumnMetricsType(metrics){var totalWidth=metrics.totalWidth || this.getTotalWidth();var currentMetrics={columns:metrics.columns,totalWidth:totalWidth,minColumnWidth:metrics.minColumnWidth};var updatedMetrics=ColumnMetrics.recalculate(currentMetrics);return updatedMetrics;},getColumn:function getColumn(idx){var columns=this.state.columnMetrics.columns;if(Array.isArray(columns)){return columns[idx];}else if(typeof Immutable !== 'undefined'){return columns.get(idx);}},getSize:function getSize(){var columns=this.state.columnMetrics.columns;if(Array.isArray(columns)){return columns.length;}else if(typeof Immutable !== 'undefined'){return columns.size;}},metricsUpdated:function metricsUpdated(){var columnMetrics=this.createColumnMetrics();this.setState({columnMetrics:columnMetrics});},createColumnMetrics:function createColumnMetrics(){var props=arguments.length <= 0 || arguments[0] === undefined?this.props:arguments[0];var gridColumns=this.setupGridColumns(props);return this.getColumnMetricsType({columns:gridColumns,minColumnWidth:this.props.minColumnWidth,totalWidth:props.minWidth});},onColumnResize:function onColumnResize(index,width){var columnMetrics=ColumnMetrics.resizeColumn(this.state.columnMetrics,index,width);this.setState({columnMetrics:columnMetrics});}}; /***/}, /* 83 */function(module,exports){'use strict';function ToObject(val){if(val == null){throw new TypeError('Object.assign cannot be called with null or undefined');}return Object(val);}module.exports = _Object$assign2 || function(target,source){var from;var keys;var to=ToObject(target);for(var s=1;s < arguments.length;s++) {from = arguments[s];keys = _Object$keys(Object(from));for(var i=0;i < keys.length;i++) {to[keys[i]] = from[keys[i]];}}return to;}; /***/}, /* 84 */function(module,exports){'use strict';var RowUtils={get:function get(row,property){if(typeof row.get === 'function'){return row.get(property);}else {return row[property];}}};module.exports = RowUtils; /***/}, /* 85 */function(module,exports,__webpack_require__){"use strict";var Editors={AutoComplete:__webpack_require__(86),DropDownEditor:__webpack_require__(88),SimpleTextEditor:__webpack_require__(54),CheckboxEditor:__webpack_require__(80)};module.exports = Editors; /***/}, /* 86 */function(module,exports,__webpack_require__){ /* Flow issues:
		overrides? getDefaultValue, getStyle, onKeyDown
		*/ /**
		 * @jsx React.DOM
		 */'use strict';var React=__webpack_require__(18);var ReactAutocomplete=__webpack_require__(87);var KeyboardHandlerMixin=__webpack_require__(53);var ExcelColumn=__webpack_require__(42);var optionPropType=React.PropTypes.shape({id:React.PropTypes.required,title:React.PropTypes.string});var AutoCompleteEditor=React.createClass({displayName:'AutoCompleteEditor',propTypes:{onCommit:React.PropTypes.func.isRequired,options:React.PropTypes.arrayOf(optionPropType).isRequired,label:React.PropTypes.string,value:React.PropTypes.any.isRequired,valueParams:React.PropTypes.arrayOf(React.PropTypes.string),column:React.PropTypes.shape(ExcelColumn).isRequired,resultIdentifier:React.PropTypes.string,search:React.PropTypes.string},getDefaultProps:function getDefaultProps(){return {resultIdentifier:'id'};},getValue:function getValue(){var value,updated={};if(this.hasResults() && this.isFocusedOnSuggestion()){value = this.getLabel(this.refs.autoComplete.state.focusedValue);if(this.props.valueParams){value = this.constuctValueFromParams(this.refs.autoComplete.state.focusedValue,this.props.valueParams);}}else {value = this.refs.autoComplete.state.searchTerm;}updated[this.props.column.key] = value;return updated;},getInputNode:function getInputNode(){return this.getDOMNode().getElementsByTagName("input")[0];},render:function render(){var label=this.props.label != null?this.props.label:'title';return React.createElement('div',{height:this.props.height,onKeyDown:this.props.onKeyDown},React.createElement(ReactAutocomplete,{search:this.props.search,ref:'autoComplete',label:label,onChange:this.handleChange,resultIdentifier:this.props.resultIdentifier,options:this.props.options,value:{title:this.props.value}}));},handleChange:function handleChange(){this.props.onCommit();},hasResults:function hasResults(){return this.refs.autoComplete.state.results.length > 0;},isFocusedOnSuggestion:function isFocusedOnSuggestion(){var autoComplete=this.refs.autoComplete;return autoComplete.state.focusedValue != null;},getLabel:function getLabel(item){var label=this.props.label != null?this.props.label:'title';if(typeof label === "function"){return label(item);}else if(typeof label === "string"){return item[label];}},constuctValueFromParams:function constuctValueFromParams(obj,props){if(!props){return '';}var ret=[];for(var i=0,ii=props.length;i < ii;i++) {ret.push(obj[props[i]]);}return ret.join('|');}});module.exports = AutoCompleteEditor; /***/}, /* 87 */function(module,exports,__webpack_require__){(function webpackUniversalModuleDefinition(root,factory){if(true)module.exports = factory(__webpack_require__(18));else if(typeof define === 'function' && define.amd)define(["react"],factory);else if(typeof exports === 'object')exports["ReactAutocomplete"] = factory(require("react"));else root["ReactAutocomplete"] = factory(root["React"]);})(this,function(__WEBPACK_EXTERNAL_MODULE_1__){return  (/******/(function(modules){ // webpackBootstrap
	/******/ // The module cache
	/******/var installedModules={}; /******/ // The require function
	/******/function __webpack_require__(moduleId){ /******/ // Check if module is in cache
	/******/if(installedModules[moduleId]) /******/return installedModules[moduleId].exports; /******/ // Create a new module (and put it into the cache)
	/******/var module=installedModules[moduleId] = { /******/exports:{}, /******/id:moduleId, /******/loaded:false /******/}; /******/ // Execute the module function
	/******/modules[moduleId].call(module.exports,module,module.exports,__webpack_require__); /******/ // Flag the module as loaded
	/******/module.loaded = true; /******/ // Return the exports of the module
	/******/return module.exports; /******/} /******/ // expose the modules object (__webpack_modules__)
	/******/__webpack_require__.m = modules; /******/ // expose the module cache
	/******/__webpack_require__.c = installedModules; /******/ // __webpack_public_path__
	/******/__webpack_require__.p = ""; /******/ // Load entry module and return exports
	/******/return __webpack_require__(0); /******/})( /************************************************************************/ /******/[ /* 0 */function(module,exports,__webpack_require__){ /**
			 * @jsx React.DOM
			 */"use strict";var React=__webpack_require__(1);var joinClasses=__webpack_require__(2);var Autocomplete=React.createClass({displayName:"Autocomplete",propTypes:{options:React.PropTypes.any,search:React.PropTypes.func,resultRenderer:React.PropTypes.oneOfType([React.PropTypes.component,React.PropTypes.func]),value:React.PropTypes.object,onChange:React.PropTypes.func,onError:React.PropTypes.func},getDefaultProps:function getDefaultProps(){return {search:searchArray};},getInitialState:function getInitialState(){var searchTerm=this.props.searchTerm?this.props.searchTerm:this.props.value?this.props.value.title:"";return {results:[],showResults:false,showResultsInProgress:false,searchTerm:searchTerm,focusedValue:null};},getResultIdentifier:function getResultIdentifier(result){if(this.props.resultIdentifier === undefined){return result.id;}else {return result[this.props.resultIdentifier];}},render:function render(){var className=joinClasses(this.props.className,"react-autocomplete-Autocomplete",this.state.showResults?"react-autocomplete-Autocomplete--resultsShown":undefined);var style={position:"relative",outline:"none"};return React.createElement("div",{tabIndex:"1",className:className,onFocus:this.onFocus,onBlur:this.onBlur,style:style},React.createElement("input",{ref:"search",className:"react-autocomplete-Autocomplete__search",style:{width:"100%"},onClick:this.showAllResults,onChange:this.onQueryChange,onFocus:this.showAllResults,onBlur:this.onQueryBlur,onKeyDown:this.onQueryKeyDown,value:this.state.searchTerm}),React.createElement(Results,{className:"react-autocomplete-Autocomplete__results",onSelect:this.onValueChange,onFocus:this.onValueFocus,results:this.state.results,focusedValue:this.state.focusedValue,show:this.state.showResults,renderer:this.props.resultRenderer,label:this.props.label,resultIdentifier:this.props.resultIdentifier}));},componentWillReceiveProps:function componentWillReceiveProps(nextProps){var searchTerm=nextProps.searchTerm?nextProps.searchTerm:nextProps.value?nextProps.value.title:"";this.setState({searchTerm:searchTerm});},componentWillMount:function componentWillMount(){this.blurTimer = null;}, /**
			    * Show results for a search term value.
			    *
			    * This method doesn't update search term value itself.
			    *
			    * @param {Search} searchTerm
			    */showResults:function showResults(searchTerm){this.setState({showResultsInProgress:true});this.props.search(this.props.options,searchTerm.trim(),this.onSearchComplete);},showAllResults:function showAllResults(){if(!this.state.showResultsInProgress && !this.state.showResults){this.showResults("");}},onValueChange:function onValueChange(value){var state={value:value,showResults:false};if(value){state.searchTerm = value.title;}this.setState(state);if(this.props.onChange){this.props.onChange(value);}},onSearchComplete:function onSearchComplete(err,results){if(err){if(this.props.onError){this.props.onError(err);}else {throw err;}}this.setState({showResultsInProgress:false,showResults:true,results:results});},onValueFocus:function onValueFocus(value){this.setState({focusedValue:value});},onQueryChange:function onQueryChange(e){var searchTerm=e.target.value;this.setState({searchTerm:searchTerm,focusedValue:null});this.showResults(searchTerm);},onFocus:function onFocus(){if(this.blurTimer){clearTimeout(this.blurTimer);this.blurTimer = null;}this.refs.search.getDOMNode().focus();},onBlur:function onBlur(){ // wrap in setTimeout so we can catch a click on results
	this.blurTimer = setTimeout((function(){if(this.isMounted()){this.setState({showResults:false});}}).bind(this),100);},onQueryKeyDown:function onQueryKeyDown(e){if(e.key === "Enter"){e.preventDefault();if(this.state.focusedValue){this.onValueChange(this.state.focusedValue);}}else if(e.key === "ArrowUp" && this.state.showResults){e.preventDefault();var prevIdx=Math.max(this.focusedValueIndex() - 1,0);this.setState({focusedValue:this.state.results[prevIdx]});}else if(e.key === "ArrowDown"){e.preventDefault();if(this.state.showResults){var nextIdx=Math.min(this.focusedValueIndex() + (this.state.showResults?1:0),this.state.results.length - 1);this.setState({showResults:true,focusedValue:this.state.results[nextIdx]});}else {this.showAllResults();}}},focusedValueIndex:function focusedValueIndex(){if(!this.state.focusedValue){return -1;}for(var i=0,len=this.state.results.length;i < len;i++) {if(this.getResultIdentifier(this.state.results[i]) === this.getResultIdentifier(this.state.focusedValue)){return i;}}return -1;}});var Results=React.createClass({displayName:"Results",getResultIdentifier:function getResultIdentifier(result){if(this.props.resultIdentifier === undefined){if(!result.id){throw "id property not found on result. You must specify a resultIdentifier and pass as props to autocomplete component";}return result.id;}else {return result[this.props.resultIdentifier];}},render:function render(){var style={display:this.props.show?"block":"none",position:"absolute",listStyleType:"none"};var $__0=this.props,className=$__0.className,props=(function(source,exclusion){var rest={};var hasOwn=Object.prototype.hasOwnProperty;if(source == null){throw new TypeError();}for(var key in source) {if(hasOwn.call(source,key) && !hasOwn.call(exclusion,key)){rest[key] = source[key];}}return rest;})($__0,{className:1});return React.createElement("ul",React.__spread({},props,{style:style,className:className + " react-autocomplete-Results"}),this.props.results.map(this.renderResult));},renderResult:function renderResult(result){var focused=this.props.focusedValue && this.getResultIdentifier(this.props.focusedValue) === this.getResultIdentifier(result);var Renderer=this.props.renderer || Result;return React.createElement(Renderer,{ref:focused?"focused":undefined,key:this.getResultIdentifier(result),result:result,focused:focused,onMouseEnter:this.onMouseEnterResult,onClick:this.props.onSelect,label:this.props.label});},componentDidUpdate:function componentDidUpdate(){this.scrollToFocused();},componentDidMount:function componentDidMount(){this.scrollToFocused();},componentWillMount:function componentWillMount(){this.ignoreFocus = false;},scrollToFocused:function scrollToFocused(){var focused=this.refs && this.refs.focused;if(focused){var containerNode=this.getDOMNode();var scroll=containerNode.scrollTop;var height=containerNode.offsetHeight;var node=focused.getDOMNode();var top=node.offsetTop;var bottom=top + node.offsetHeight; // we update ignoreFocus to true if we change the scroll position so
	// the mouseover event triggered because of that won't have an
	// effect
	if(top < scroll){this.ignoreFocus = true;containerNode.scrollTop = top;}else if(bottom - scroll > height){this.ignoreFocus = true;containerNode.scrollTop = bottom - height;}}},onMouseEnterResult:function onMouseEnterResult(e,result){ // check if we need to prevent the next onFocus event because it was
	// probably caused by a mouseover due to scroll position change
	if(this.ignoreFocus){this.ignoreFocus = false;}else { // we need to make sure focused node is visible
	// for some reason mouse events fire on visible nodes due to
	// box-shadow
	var containerNode=this.getDOMNode();var scroll=containerNode.scrollTop;var height=containerNode.offsetHeight;var node=e.target;var top=node.offsetTop;var bottom=top + node.offsetHeight;if(bottom > scroll && top < scroll + height){this.props.onFocus(result);}}}});var Result=React.createClass({displayName:"Result",getDefaultProps:function getDefaultProps(){return {label:function label(result){return result.title;}};},getLabel:function getLabel(result){if(typeof this.props.label === "function"){return this.props.label(result);}else if(typeof this.props.label === "string"){return result[this.props.label];}},render:function render(){var className=joinClasses({"react-autocomplete-Result":true,"react-autocomplete-Result--active":this.props.focused});return React.createElement("li",{style:{listStyleType:"none"},className:className,onClick:this.onClick,onMouseEnter:this.onMouseEnter},React.createElement("a",null,this.getLabel(this.props.result)));},onClick:function onClick(){this.props.onClick(this.props.result);},onMouseEnter:function onMouseEnter(e){if(this.props.onMouseEnter){this.props.onMouseEnter(e,this.props.result);}},shouldComponentUpdate:function shouldComponentUpdate(nextProps){return nextProps.result.id !== this.props.result.id || nextProps.focused !== this.props.focused;}}); /**
			* Search options using specified search term treating options as an array
			* of candidates.
			*
			* @param {Array.<Object>} options
			* @param {String} searchTerm
			* @param {Callback} cb
			*/function searchArray(options,searchTerm,cb){if(!options){return cb(null,[]);}searchTerm = new RegExp(searchTerm,"i");var results=[];for(var i=0,len=options.length;i < len;i++) {if(searchTerm.exec(options[i].title)){results.push(options[i]);}}cb(null,results);}module.exports = Autocomplete; /***/}, /* 1 */function(module,exports){module.exports = __WEBPACK_EXTERNAL_MODULE_1__; /***/}, /* 2 */function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__; /*!
			  Copyright (c) 2015 Jed Watson.
			  Licensed under the MIT License (MIT), see
			  http://jedwatson.github.io/classnames
			*/function classNames(){var classes='';var arg;for(var i=0;i < arguments.length;i++) {arg = arguments[i];if(!arg){continue;}if('string' === typeof arg || 'number' === typeof arg){classes += ' ' + arg;}else if(Object.prototype.toString.call(arg) === '[object Array]'){classes += ' ' + classNames.apply(null,arg);}else if('object' === typeof arg){for(var key in arg) {if(!arg.hasOwnProperty(key) || !arg[key]){continue;}classes += ' ' + key;}}}return classes.substr(1);} // safely export classNames for node / browserify
	if(typeof module !== 'undefined' && module.exports){module.exports = classNames;} // safely export classNames for RequireJS
	if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__ = [],__WEBPACK_AMD_DEFINE_RESULT__ = (function(){return classNames;}).apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__),__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));} /***/} /******/]));});; /***/}, /* 88 */function(module,exports,__webpack_require__){ /**
		 * @jsx React.DOM


		 */'use strict';var _get=__webpack_require__(55)['default'];var _inherits=__webpack_require__(61)['default'];var _createClass=__webpack_require__(70)['default'];var _classCallCheck=__webpack_require__(43)['default'];var React=__webpack_require__(18);var EditorBase=__webpack_require__(73);var DropDownEditor=(function(_EditorBase){_inherits(DropDownEditor,_EditorBase);function DropDownEditor(){_classCallCheck(this,DropDownEditor);_get(Object.getPrototypeOf(DropDownEditor.prototype),'constructor',this).apply(this,arguments);}_createClass(DropDownEditor,[{key:'getInputNode',value:function getInputNode(){return React.findDOMNode(this);}},{key:'onClick',value:function onClick(e){this.getInputNode().focus();}},{key:'onDoubleClick',value:function onDoubleClick(e){this.getInputNode().focus();}},{key:'render',value:function render(){return React.createElement('select',{style:this.getStyle(),defaultValue:this.props.value,onBlur:this.props.onBlur,onChange:this.onChange},this.renderOptions());}},{key:'renderOptions',value:function renderOptions(){var options=[];this.props.options.forEach(function(name){options.push(React.createElement('option',{key:name,value:name},name));},this);return options;}}]);return DropDownEditor;})(EditorBase);;DropDownEditor.propTypes = {options:React.PropTypes.arrayOf(React.PropTypes.string).isRequired};module.exports = DropDownEditor; /***/}, /* 89 */function(module,exports,__webpack_require__){ //not including this
	//it currently requires the whole of moment, which we dont want to take as a dependency
	'use strict';var ImageFormatter=__webpack_require__(90);var Formatters={ImageFormatter:ImageFormatter};module.exports = Formatters; /***/}, /* 90 */function(module,exports,__webpack_require__){'use strict';var React=__webpack_require__(18);var PendingPool={};var ReadyPool={};var ImageFormatter=React.createClass({displayName:'ImageFormatter',propTypes:{value:React.PropTypes.string.isRequired},getInitialState:function getInitialState(){return {ready:false};},componentWillMount:function componentWillMount(){this._load(this.props.value);},componentWillReceiveProps:function componentWillReceiveProps(nextProps){if(nextProps.value !== this.props.value){this.setState({value:null});this._load(nextProps.value);}},render:function render(){var style=this.state.value?{backgroundImage:'url(' + this.state.value + ')'}:undefined;return React.createElement('div',{className:'react-grid-image',style:style});},_load:function _load( /*string*/src){if(ReadyPool[src]){this.setState({value:src});return;}if(PendingPool[src]){PendingPool[src].push(this._onLoad);return;}PendingPool[src] = [this._onLoad];var img=new Image();img.onload = function(){PendingPool[src].forEach( /*function*/function(callback){callback(src);});delete PendingPool[src];img.onload = null;src = undefined;};img.src = src;},_onLoad:function _onLoad( /*string*/src){if(this.isMounted() && src === this.props.value){this.setState({value:src});}}});module.exports = ImageFormatter; /***/}, /* 91 */function(module,exports,__webpack_require__){ /**
		* @jsx React.DOM

		*/'use strict';var React=__webpack_require__(18);var Row=__webpack_require__(50);var Toolbar=React.createClass({displayName:'Toolbar',propTypes:{onAddRow:React.PropTypes.func,onToggleFilter:React.PropTypes.func.isRequired,enableFilter:React.PropTypes.bool,numberOfRows:React.PropTypes.number.isRequired},onAddRow:function onAddRow(){if(this.props.onAddRow !== null && this.props.onAddRow instanceof Function){this.props.onAddRow({newRowIndex:this.props.numberOfRows});}},getDefaultProps:function getDefaultProps(){return {enableAddRow:true};},renderAddRowButton:function renderAddRowButton(){if(this.props.onAddRow){return React.createElement('button',{type:'button',className:'btn',onClick:this.onAddRow},'Add Row');}},renderToggleFilterButton:function renderToggleFilterButton(){if(this.props.enableFilter){return React.createElement('button',{type:'button',className:'btn',onClick:this.props.onToggleFilter},'Filter Rows');}},render:function render(){return React.createElement('div',{className:'react-grid-Toolbar'},React.createElement('div',{className:'tools'},this.renderAddRowButton(),this.renderToggleFilterButton()));}});module.exports = Toolbar; /***/} /******/]));});; /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/

/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var QuickStartDescription = __webpack_require__(103);
	var ReactPlayground = __webpack_require__(106);
	var faker = __webpack_require__(159);

	var AllFeaturesExample = '\n  var Editors             = ReactDataGrid.Editors;\n  var Toolbar             = ReactDataGrid.Toolbar;\n  var AutoCompleteEditor  = Editors.AutoComplete;\n  var DropDownEditor      = Editors.DropDownEditor;\n\n  faker.locale = \'en_GB\';\n\n  function createFakeRowObjectData(/*number*/ index) {\n    return {\n      id: \'id_\' + index,\n      avartar: faker.image.avatar(),\n      county: faker.address.county(),\n      email: faker.internet.email(),\n      title: faker.name.prefix(),\n      firstName: faker.name.firstName(),\n      lastName: faker.name.lastName(),\n      street: faker.address.streetName(),\n      zipCode: faker.address.zipCode(),\n      date: faker.date.past(),\n      bs: faker.company.bs(),\n      catchPhrase: faker.company.catchPhrase(),\n      companyName: faker.company.companyName(),\n      words: faker.lorem.words(),\n      sentence: faker.lorem.sentence()\n    };\n  }\n\n  function createRows(numberOfRows) {\n    var rows = [];\n    for (var i = 0; i < numberOfRows; i++) {\n      rows[i] = createFakeRowObjectData(i);\n    }\n    return rows;\n  }\n\n  var counties = [{id : 0, title : \'Bedfordshire\'}, { id : 1, title : \'Berkshire\'}, { id : 2, title : \'Buckinghamshire\'}, { id : 3, title : \'Cambridgeshire\'}, { id : 4, title : \'Cheshire\'}, { id : 5, title :\'Cornwall\'}, {id : 6, title : \'Cumbria, (Cumberland)\'}, {id : 7, title : \'Derbyshire\'}, { id : 8, title :\'Devon\'}, { id : 9, title :\'Dorset\'},\n   { id : 10, title :\'Durham\'},\n   { id : 11, title :\'Essex\'},\n   { id : 12, title :\'Gloucestershire\'},\n   { id : 13, title :\'Hampshire\'},\n   { id : 14, title :\'Hertfordshire\'},\n   { id : 15, title :\'Huntingdonshire\'},\n   { id : 16, title :\'Kent\'},\n   { id : 17, title :\'Lancashire\'},\n   { id : 18, title :\'Leicestershire\'},\n   { id : 19, title :\'Lincolnshire\'},\n   { id : 20, title :\'Middlesex\'},\n   { id : 21, title :\'Norfolk\'},\n   { id : 22, title :\'Northamptonshire\'},\n   { id : 23, title :\'Northumberland\'},\n   { id : 24, title :\'Nottinghamshire\'},\n   { id : 25, title :\'Northamptonshire\'},\n   { id : 26, title :\'Oxfordshire\'},\n   { id : 27, title :\'Northamptonshire\'},\n   { id : 28, title :\'Rutland\'},\n   { id : 29, title :\'Shropshire\'},\n   { id : 30, title :\'Somerset\'},\n   { id : 31, title :\'Staffordshire\'},\n   { id : 32, title :\'Suffolk\'},\n   { id : 33, title :\'Surrey\'},\n   { id : 34, title :\'Sussex\'},\n   { id : 35, title :\'Warwickshire\'},\n   { id : 36, title :\'Westmoreland\'},\n   { id : 37, title :\'Wiltshire\'},\n   { id : 38, title :\'Worcestershire\'},\n   { id : 39, title :\'Yorkshire\'}]\n\n  var titles = [\'Dr.\', \'Mr.\', \'Mrs.\', \'Miss\', \'Ms.\'];\n\n  var columns = [\n    {\n      key: \'id\',\n      name: \'ID\',\n      width : 80,\n      resizable: true\n    },\n    {\n      key: \'avartar\',\n      name: \'Avartar\',\n      width : 60,\n      formatter : ReactDataGrid.Formatters.ImageFormatter,\n      resizable : true\n    },\n    {\n      key: \'county\',\n      name: \'County\',\n      editor: <AutoCompleteEditor options={counties}/>,\n      width : 200,\n      resizable: true\n    },\n    {\n      key: \'title\',\n      name: \'Title\',\n      editor : <DropDownEditor options={titles}/>,\n      width : 200,\n      resizable: true\n    },\n    {\n      key: \'firstName\',\n      name: \'First Name\',\n      editable:true,\n      width : 200,\n      resizable: true\n    },\n    {\n      key: \'lastName\',\n      name: \'Last Name\',\n      editable:true,\n      width : 200,\n      resizable: true\n    },\n    {\n      key: \'email\',\n      name: \'Email\',\n      editable:true,\n      width : 200,\n      resizable: true\n    },\n    {\n      key: \'street\',\n      name: \'Street\',\n      editable:true,\n      width : 200,\n      resizable: true\n    },\n    {\n      key: \'zipCode\',\n      name: \'ZipCode\',\n      editable:true,\n      width : 200,\n      resizable: true\n    },\n    {\n      key: \'date\',\n      name: \'Date\',\n      editable:true,\n      width : 200,\n      resizable: true\n    },\n    {\n      key: \'bs\',\n      name: \'bs\',\n      editable:true,\n      width : 200,\n      resizable: true\n    },\n    {\n      key: \'catchPhrase\',\n      name: \'Catch Phrase\',\n      editable:true,\n      width : 200,\n      resizable: true\n    },\n    {\n      key: \'companyName\',\n      name: \'Company Name\',\n      editable:true,\n      width : 200,\n      resizable: true\n    },\n    {\n      key: \'sentence\',\n      name: \'Sentence\',\n      editable:true,\n      width : 200,\n      resizable: true\n    }\n  ];\n\n\n var Example = React.createClass({displayName: \'component\',\n\n    getInitialState : function(){\n      var fakeRows = createRows(2000);\n      return {rows :fakeRows};\n    },\n\n    handleRowUpdated : function(commit){\n      //merge the updated row values with the existing row\n      var rows = this.state.rows;\n      var updatedRow = React.addons.update(rows[commit.rowIdx], {$merge : commit.updated});\n      rows[commit.rowIdx] = updatedRow;\n      this.setState({rows:rows});\n    },\n\n    handleCellDrag : function(e){\n        var rows = this.state.rows;\n        for (var i = e.fromRow; i <= e.toRow; i++){\n          var rowToChange = rows[i];\n          if(rowToChange){\n            rowToChange[e.cellKey] = e.value;\n          }\n        }\n        if(this.props.handleCellDrag) {this.props.handleCellDrag(e)}\n        this.setState({rows:rows});\n    },\n\n    handleCellCopyPaste : function(e){\n      var rows = this.state.rows;\n      rows[e.toRow][e.cellKey] = e.value;\n      this.setState({rows:rows});\n    },\n\n    handleAddRow : function(e){\n      var newRow = {\n        value: e.newRowIndex,\n        userStory: \'\',\n        developer : \'\',\n        epic : \'\'};\n        var rows = React.addons.update(this.state.rows, {$push : [newRow]});\n        this.setState({rows : rows});\n    },\n\n    getRowAt : function(index){\n      if (index < 0 || index > this.getSize()){\n        return undefined;\n      }\n      return this.state.rows[index];\n    },\n\n    getSize : function() {\n      return this.state.rows.length;\n    },\n\n    render : function() {\n      return (\n            <ReactDataGrid\n              enableCellSelect={true}\n              columns={columns}\n              rowGetter={this.getRowAt}\n              rowsCount={this.getSize()}\n              onRowUpdated={this.handleRowUpdated}\n              onCellsDragged={this.handleCellDrag}\n              onCellCopyPaste={this.handleCellCopyPaste}\n              toolbar={<Toolbar onAddRow={this.handleAddRow}/>}\n              enableRowSelect={true}\n              rowHeight={50}\n              minHeight={600}\n              />\n\n      );\n    }\n  });\n  React.render(<Example />, mountNode);\n';

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
/* 159 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_159__;

/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 */
	'use strict';

	(function () {
	  var React = __webpack_require__(1);
	  var ReactDataGrid = __webpack_require__(161);
	  var Editors = ReactDataGrid.Editors;
	  var Toolbar = ReactDataGrid.Toolbar;
	  var AutoCompleteEditor = Editors.AutoComplete;
	  var DropDownEditor = Editors.DropDownEditor;
	  var joinClasses = __webpack_require__(162);
	  var FakeObjectDataStore = __webpack_require__(163);
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
	    editor: React.createElement(AutoCompleteEditor, { options: counties }),
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
	        ref: 'reactDataGrid',
	        enableCellSelect: true,
	        columns: columns,
	        rowGetter: this.getRowAt,
	        rowsCount: this.getSize(),
	        onRowUpdated: this.handleRowUpdated,
	        onCellsDragged: this.handleCellDrag,
	        onCellCopyPaste: this.handleCellCopyPaste,
	        toolbar: React.createElement(Toolbar, { onAddRow: this.handleAddRow }),
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
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';var _Object$assign2=__webpack_require__(37)['default'];var _Symbol=__webpack_require__(41)['default'];var _Object$keys=__webpack_require__(62)['default'];var _Object$defineProperty2=__webpack_require__(30)['default'];var _Object$freeze=__webpack_require__(109)['default'];var _Object$setPrototypeOf2=__webpack_require__(21)['default'];(function webpackUniversalModuleDefinition(root,factory){if(true)module.exports = factory(__webpack_require__(1));else if(typeof define === 'function' && define.amd)define(["react"],factory);else if(typeof exports === 'object')exports["ReactDataGrid"] = factory(require("react"));else root["ReactDataGrid"] = factory(root["React"]);})(undefined,function(__WEBPACK_EXTERNAL_MODULE_18__){return  (/******/(function(modules){ // webpackBootstrap
	/******/ // The module cache
	/******/var installedModules={}; /******/ // The require function
	/******/function __webpack_require__(moduleId){ /******/ // Check if module is in cache
	/******/if(installedModules[moduleId]) /******/return installedModules[moduleId].exports; /******/ // Create a new module (and put it into the cache)
	/******/var module=installedModules[moduleId] = { /******/exports:{}, /******/id:moduleId, /******/loaded:false /******/}; /******/ // Execute the module function
	/******/modules[moduleId].call(module.exports,module,module.exports,__webpack_require__); /******/ // Flag the module as loaded
	/******/module.loaded = true; /******/ // Return the exports of the module
	/******/return module.exports; /******/} /******/ // expose the modules object (__webpack_modules__)
	/******/__webpack_require__.m = modules; /******/ // expose the module cache
	/******/__webpack_require__.c = installedModules; /******/ // __webpack_public_path__
	/******/__webpack_require__.p = ""; /******/ // Load entry module and return exports
	/******/return __webpack_require__(0); /******/})( /************************************************************************/ /******/[ /* 0 */function(module,exports,__webpack_require__){'use strict';module.exports = __webpack_require__(1);module.exports.Editors = __webpack_require__(85);module.exports.Formatters = __webpack_require__(89);module.exports.Toolbar = __webpack_require__(91);module.exports.Row = __webpack_require__(50); /***/}, /* 1 */function(module,exports,__webpack_require__){ /**
		 * @jsx React.DOM

		 */"use strict";var _extends=__webpack_require__(2)['default'];var _Object$assign=__webpack_require__(3)['default'];var React=__webpack_require__(18);var PropTypes=React.PropTypes;var BaseGrid=__webpack_require__(19);var Row=__webpack_require__(50);var ExcelColumn=__webpack_require__(42);var KeyboardHandlerMixin=__webpack_require__(53);var CheckboxEditor=__webpack_require__(80);var FilterableHeaderCell=__webpack_require__(81);var cloneWithProps=__webpack_require__(30);var DOMMetrics=__webpack_require__(77);var ColumnMetricsMixin=__webpack_require__(82);var RowUtils=__webpack_require__(84);var ColumnUtils=__webpack_require__(25);if(!_Object$assign){Object.assign = __webpack_require__(83);}var ReactDataGrid=React.createClass({displayName:'ReactDataGrid',propTypes:{rowHeight:React.PropTypes.number.isRequired,headerRowHeight:React.PropTypes.number,minHeight:React.PropTypes.number.isRequired,minWidth:React.PropTypes.number,enableRowSelect:React.PropTypes.bool,onRowUpdated:React.PropTypes.func,rowGetter:React.PropTypes.func.isRequired,rowsCount:React.PropTypes.number.isRequired,toolbar:React.PropTypes.element,enableCellSelect:React.PropTypes.bool,columns:React.PropTypes.oneOfType([React.PropTypes.object,React.PropTypes.array]).isRequired,onFilter:React.PropTypes.func,onCellCopyPaste:React.PropTypes.func,onCellsDragged:React.PropTypes.func,onAddFilter:React.PropTypes.func},mixins:[ColumnMetricsMixin,DOMMetrics.MetricsComputatorMixin,KeyboardHandlerMixin],getDefaultProps:function getDefaultProps(){return {enableCellSelect:false,tabIndex:-1,rowHeight:35,enableRowSelect:false,minHeight:350};},getInitialState:function getInitialState(){var columnMetrics=this.createColumnMetrics();var initialState={columnMetrics:columnMetrics,selectedRows:this.getInitialSelectedRows(),copied:null,expandedRows:[],canFilter:false,columnFilters:{},sortDirection:null,sortColumn:null,dragged:null,scrollOffset:0};if(this.props.enableCellSelect){initialState.selected = {rowIdx:0,idx:0};}else {initialState.selected = {rowIdx:-1,idx:-1};}return initialState;},getInitialSelectedRows:function getInitialSelectedRows(){var selectedRows=[];for(var i=0;i < this.props.rowsCount;i++) {selectedRows.push(false);}return selectedRows;},componentWillReceiveProps:function componentWillReceiveProps(nextProps){if(nextProps.rowsCount === this.props.rowsCount + 1){this.onAfterAddRow(nextProps.rowsCount + 1);}},componentDidMount:function componentDidMount(){var scrollOffset=0;var canvas=this.getDOMNode().querySelector('.react-grid-Canvas');if(canvas != null){scrollOffset = canvas.offsetWidth - canvas.clientWidth;}this.setState({scrollOffset:scrollOffset});},render:function render(){var cellMetaData={selected:this.state.selected,dragged:this.state.dragged,onCellClick:this.onCellClick,onCellDoubleClick:this.onCellDoubleClick,onCommit:this.onCellCommit,onCommitCancel:this.setInactive,copied:this.state.copied,handleDragEnterRow:this.handleDragEnter,handleTerminateDrag:this.handleTerminateDrag};var toolbar=this.renderToolbar();var containerWidth=this.props.minWidth || this.DOMMetrics.gridWidth();var gridWidth=containerWidth - this.state.scrollOffset;return React.createElement('div',{className:'react-grid-Container',style:{width:containerWidth}},toolbar,React.createElement('div',{className:'react-grid-Main'},React.createElement(BaseGrid,_extends({ref:'base'},this.props,{headerRows:this.getHeaderRows(),columnMetrics:this.state.columnMetrics,rowGetter:this.props.rowGetter,rowsCount:this.props.rowsCount,rowHeight:this.props.rowHeight,cellMetaData:cellMetaData,selectedRows:this.state.selectedRows,expandedRows:this.state.expandedRows,rowOffsetHeight:this.getRowOffsetHeight(),sortColumn:this.state.sortColumn,sortDirection:this.state.sortDirection,onSort:this.handleSort,minHeight:this.props.minHeight,totalWidth:gridWidth,onViewportKeydown:this.onKeyDown,onViewportDragStart:this.onDragStart,onViewportDragEnd:this.handleDragEnd,onViewportDoubleClick:this.onViewportDoubleClick,onColumnResize:this.onColumnResize}))));},renderToolbar:function renderToolbar(){var Toolbar=this.props.toolbar;if(React.isValidElement(Toolbar)){return cloneWithProps(Toolbar,{onToggleFilter:this.onToggleFilter,numberOfRows:this.props.rowsCount});}},onSelect:function onSelect(selected){if(this.props.enableCellSelect){if(this.state.selected.rowIdx === selected.rowIdx && this.state.selected.idx === selected.idx && this.state.selected.active === true){}else {var idx=selected.idx;var rowIdx=selected.rowIdx;if(idx >= 0 && rowIdx >= 0 && idx < ColumnUtils.getSize(this.state.columnMetrics.columns) && rowIdx < this.props.rowsCount){this.setState({selected:selected});}}}},onCellClick:function onCellClick(cell){this.onSelect({rowIdx:cell.rowIdx,idx:cell.idx});},onCellDoubleClick:function onCellDoubleClick(cell){this.onSelect({rowIdx:cell.rowIdx,idx:cell.idx});this.setActive('Enter');},onViewportDoubleClick:function onViewportDoubleClick(e){this.setActive();},onPressArrowUp:function onPressArrowUp(e){this.moveSelectedCell(e,-1,0);},onPressArrowDown:function onPressArrowDown(e){this.moveSelectedCell(e,1,0);},onPressArrowLeft:function onPressArrowLeft(e){this.moveSelectedCell(e,0,-1);},onPressArrowRight:function onPressArrowRight(e){this.moveSelectedCell(e,0,1);},onPressTab:function onPressTab(e){this.moveSelectedCell(e,0,e.shiftKey?-1:1);},onPressEnter:function onPressEnter(e){this.setActive(e.key);},onPressDelete:function onPressDelete(e){this.setActive(e.key);},onPressEscape:function onPressEscape(e){this.setInactive(e.key);},onPressBackspace:function onPressBackspace(e){this.setActive(e.key);},onPressChar:function onPressChar(e){if(this.isKeyPrintable(e.keyCode)){this.setActive(e.keyCode);}},onPressKeyWithCtrl:function onPressKeyWithCtrl(e){var keys={KeyCode_c:99,KeyCode_C:67,KeyCode_V:86,KeyCode_v:118};var idx=this.state.selected.idx;if(this.canEdit(idx)){if(e.keyCode == keys.KeyCode_c || e.keyCode == keys.KeyCode_C){var value=this.getSelectedValue();this.handleCopy({value:value});}else if(e.keyCode == keys.KeyCode_v || e.keyCode == keys.KeyCode_V){this.handlePaste();}}},onDragStart:function onDragStart(e){var value=this.getSelectedValue();this.handleDragStart({idx:this.state.selected.idx,rowIdx:this.state.selected.rowIdx,value:value}); //need to set dummy data for FF
	if(e && e.dataTransfer && e.dataTransfer.setData)e.dataTransfer.setData('text/plain','dummy');},moveSelectedCell:function moveSelectedCell(e,rowDelta,cellDelta){ // we need to prevent default as we control grid scroll
	//otherwise it moves every time you left/right which is janky
	e.preventDefault();var rowIdx=this.state.selected.rowIdx + rowDelta;var idx=this.state.selected.idx + cellDelta;this.onSelect({idx:idx,rowIdx:rowIdx});},getSelectedValue:function getSelectedValue(){var rowIdx=this.state.selected.rowIdx;var idx=this.state.selected.idx;var cellKey=this.getColumn(idx).key;var row=this.props.rowGetter(rowIdx);return RowUtils.get(row,cellKey);},setActive:function setActive(keyPressed){var rowIdx=this.state.selected.rowIdx;var idx=this.state.selected.idx;if(this.canEdit(idx) && !this.isActive()){var selected=_Object$assign(this.state.selected,{idx:idx,rowIdx:rowIdx,active:true,initialKeyCode:keyPressed});this.setState({selected:selected});}},setInactive:function setInactive(){var rowIdx=this.state.selected.rowIdx;var idx=this.state.selected.idx;if(this.canEdit(idx) && this.isActive()){var selected=_Object$assign(this.state.selected,{idx:idx,rowIdx:rowIdx,active:false});this.setState({selected:selected});}},canEdit:function canEdit(idx){var col=this.getColumn(idx);return this.props.enableCellSelect === true && (col.editor != null || col.editable);},isActive:function isActive(){return this.state.selected.active === true;},onCellCommit:function onCellCommit(commit){var selected=_Object$assign({},this.state.selected);selected.active = false;if(commit.key === 'Tab'){selected.idx += 1;}var expandedRows=this.state.expandedRows; // if(commit.changed && commit.changed.expandedHeight){
	//   expandedRows = this.expandRow(commit.rowIdx, commit.changed.expandedHeight);
	// }
	this.setState({selected:selected,expandedRows:expandedRows});this.props.onRowUpdated(commit);},setupGridColumns:function setupGridColumns(){var props=arguments.length <= 0 || arguments[0] === undefined?this.props:arguments[0];var cols=props.columns.slice(0);if(props.enableRowSelect){var selectColumn={key:'select-row',name:'',formatter:React.createElement(CheckboxEditor,null),onCellChange:this.handleRowSelect,filterable:false,headerRenderer:React.createElement('input',{type:'checkbox',onChange:this.handleCheckboxChange}),width:60,locked:true};var unshiftedCols=cols.unshift(selectColumn);cols = unshiftedCols > 0?cols:unshiftedCols;}return cols;},handleCheckboxChange:function handleCheckboxChange(e){var allRowsSelected;if(e.currentTarget instanceof HTMLInputElement && e.currentTarget.checked === true){allRowsSelected = true;}else {allRowsSelected = false;}var selectedRows=[];for(var i=0;i < this.props.rowsCount;i++) {selectedRows.push(allRowsSelected);}this.setState({selectedRows:selectedRows});}, // columnKey not used here as this function will select the whole row,
	// but needed to match the function signature in the CheckboxEditor
	handleRowSelect:function handleRowSelect(rowIdx,columnKey,e){e.stopPropagation();if(this.state.selectedRows != null && this.state.selectedRows.length > 0){var selectedRows=this.state.selectedRows.slice();if(selectedRows[rowIdx] == null || selectedRows[rowIdx] == false){selectedRows[rowIdx] = true;}else {selectedRows[rowIdx] = false;}this.setState({selectedRows:selectedRows});}}, //EXPAND ROW Functionality - removing for now till we decide on how best to implement
	// expandRow(row: Row, newHeight: number): Array<Row>{
	//   var expandedRows = this.state.expandedRows;
	//   if(expandedRows[row]){
	//     if(expandedRows[row]== null || expandedRows[row] < newHeight){
	//       expandedRows[row] = newHeight;
	//     }
	//   }else{
	//     expandedRows[row] = newHeight;
	//   }
	//   return expandedRows;
	// },
	//
	// handleShowMore(row: Row, newHeight: number) {
	//   var expandedRows = this.expandRow(row, newHeight);
	//   this.setState({expandedRows : expandedRows});
	// },
	//
	// handleShowLess(row: Row){
	//   var expandedRows = this.state.expandedRows;
	//   if(expandedRows[row]){
	//       expandedRows[row] = false;
	//   }
	//   this.setState({expandedRows : expandedRows});
	// },
	//
	// expandAllRows(){
	//
	// },
	//
	// collapseAllRows(){
	//
	// },
	onAfterAddRow:function onAfterAddRow(numberOfRows){this.setState({selected:{idx:1,rowIdx:numberOfRows - 2}});},onToggleFilter:function onToggleFilter(){this.setState({canFilter:!this.state.canFilter});},getHeaderRows:function getHeaderRows(){var rows=[{ref:"row",height:this.props.headerRowHeight || this.props.rowHeight}];if(this.state.canFilter === true){rows.push({ref:"filterRow",headerCellRenderer:React.createElement(FilterableHeaderCell,{onChange:this.props.onAddFilter,column:this.props.column}),height:45});}return rows;},getRowOffsetHeight:function getRowOffsetHeight(){var offsetHeight=0;this.getHeaderRows().forEach(function(row){return offsetHeight += parseFloat(row.height,10);});return offsetHeight;},handleSort:function handleSort(columnKey,direction){this.setState({sortDirection:direction,sortColumn:columnKey},function(){this.props.onGridSort(columnKey,direction);});},copyPasteEnabled:function copyPasteEnabled(){return this.props.onCellCopyPaste !== null;},handleCopy:function handleCopy(args){if(!this.copyPasteEnabled()){return;}var textToCopy=args.value;var selected=this.state.selected;var copied={idx:selected.idx,rowIdx:selected.rowIdx};this.setState({textToCopy:textToCopy,copied:copied});},handlePaste:function handlePaste(){if(!this.copyPasteEnabled()){return;}var selected=this.state.selected;var cellKey=this.getColumn(this.state.selected.idx).key;if(this.props.onCellCopyPaste){this.props.onCellCopyPaste({cellKey:cellKey,rowIdx:selected.rowIdx,value:this.state.textToCopy,fromRow:this.state.copied.rowIdx,toRow:selected.rowIdx});}this.setState({copied:null});},dragEnabled:function dragEnabled(){return this.props.onCellsDragged !== null;},handleDragStart:function handleDragStart(dragged){if(!this.dragEnabled()){return;}var idx=dragged.idx;var rowIdx=dragged.rowIdx;if(idx >= 0 && rowIdx >= 0 && idx < this.getSize() && rowIdx < this.props.rowsCount){this.setState({dragged:dragged});}},handleDragEnter:function handleDragEnter(row){if(!this.dragEnabled()){return;}var selected=this.state.selected;var dragged=this.state.dragged;dragged.overRowIdx = row;this.setState({dragged:dragged});},handleDragEnd:function handleDragEnd(){if(!this.dragEnabled()){return;}var fromRow,toRow;var selected=this.state.selected;var dragged=this.state.dragged;var cellKey=this.getColumn(this.state.selected.idx).key;fromRow = selected.rowIdx < dragged.overRowIdx?selected.rowIdx:dragged.overRowIdx;toRow = selected.rowIdx > dragged.overRowIdx?selected.rowIdx:dragged.overRowIdx;if(this.props.onCellsDragged){this.props.onCellsDragged({cellKey:cellKey,fromRow:fromRow,toRow:toRow,value:dragged.value});}this.setState({dragged:{complete:true}});},handleTerminateDrag:function handleTerminateDrag(){if(!this.dragEnabled()){return;}this.setState({dragged:null});}});module.exports = ReactDataGrid; /***/}, /* 2 */function(module,exports,__webpack_require__){"use strict";var _Object$assign=__webpack_require__(3)["default"];exports["default"] = _Object$assign || function(target){for(var i=1;i < arguments.length;i++) {var source=arguments[i];for(var key in source) {if(Object.prototype.hasOwnProperty.call(source,key)){target[key] = source[key];}}}return target;};exports.__esModule = true; /***/}, /* 3 */function(module,exports,__webpack_require__){module.exports = {"default":__webpack_require__(4),__esModule:true}; /***/}, /* 4 */function(module,exports,__webpack_require__){__webpack_require__(5);module.exports = __webpack_require__(8).Object.assign; /***/}, /* 5 */function(module,exports,__webpack_require__){ // 19.1.3.1 Object.assign(target, source)
	var $export=__webpack_require__(6);$export($export.S + $export.F,'Object',{assign:__webpack_require__(11)}); /***/}, /* 6 */function(module,exports,__webpack_require__){var global=__webpack_require__(7),core=__webpack_require__(8),ctx=__webpack_require__(9),PROTOTYPE='prototype';var $export=function $export(type,name,source){var IS_FORCED=type & $export.F,IS_GLOBAL=type & $export.G,IS_STATIC=type & $export.S,IS_PROTO=type & $export.P,IS_BIND=type & $export.B,IS_WRAP=type & $export.W,exports=IS_GLOBAL?core:core[name] || (core[name] = {}),target=IS_GLOBAL?global:IS_STATIC?global[name]:(global[name] || {})[PROTOTYPE],key,own,out;if(IS_GLOBAL)source = name;for(key in source) { // contains in native
	own = !IS_FORCED && target && key in target;if(own && key in exports)continue; // export native or passed
	out = own?target[key]:source[key]; // prevent global pollution for namespaces
	exports[key] = IS_GLOBAL && typeof target[key] != 'function'?source[key] // bind timers to global for call from export context
	:IS_BIND && own?ctx(out,global) // wrap global constructors for prevent change them in library
	:IS_WRAP && target[key] == out?(function(C){var F=function F(param){return this instanceof C?new C(param):C(param);};F[PROTOTYPE] = C[PROTOTYPE];return F; // make static versions for prototype methods
	})(out):IS_PROTO && typeof out == 'function'?ctx(Function.call,out):out;if(IS_PROTO)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;}}; // type bitmap
	$export.F = 1; // forced
	$export.G = 2; // global
	$export.S = 4; // static
	$export.P = 8; // proto
	$export.B = 16; // bind
	$export.W = 32; // wrap
	module.exports = $export; /***/}, /* 7 */function(module,exports){ // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global=module.exports = typeof window != 'undefined' && window.Math == Math?window:typeof self != 'undefined' && self.Math == Math?self:Function('return this')();if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
	/***/}, /* 8 */function(module,exports){var core=module.exports = {version:'1.2.6'};if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
	/***/}, /* 9 */function(module,exports,__webpack_require__){ // optional / simple context binding
	var aFunction=__webpack_require__(10);module.exports = function(fn,that,length){aFunction(fn);if(that === undefined)return fn;switch(length){case 1:return function(a){return fn.call(that,a);};case 2:return function(a,b){return fn.call(that,a,b);};case 3:return function(a,b,c){return fn.call(that,a,b,c);};}return function() /* ...args */{return fn.apply(that,arguments);};}; /***/}, /* 10 */function(module,exports){module.exports = function(it){if(typeof it != 'function')throw TypeError(it + ' is not a function!');return it;}; /***/}, /* 11 */function(module,exports,__webpack_require__){ // 19.1.2.1 Object.assign(target, source, ...)
	var $=__webpack_require__(12),toObject=__webpack_require__(13),IObject=__webpack_require__(15); // should work with symbols and should have deterministic property order (V8 bug)
	module.exports = __webpack_require__(17)(function(){var a=_Object$assign2,A={},B={},S=_Symbol(),K='abcdefghijklmnopqrst';A[S] = 7;K.split('').forEach(function(k){B[k] = k;});return a({},A)[S] != 7 || _Object$keys(a({},B)).join('') != K;})?function assign(target,source){ // eslint-disable-line no-unused-vars
	var T=toObject(target),$$=arguments,$$len=$$.length,index=1,getKeys=$.getKeys,getSymbols=$.getSymbols,isEnum=$.isEnum;while($$len > index) {var S=IObject($$[index++]),keys=getSymbols?getKeys(S).concat(getSymbols(S)):getKeys(S),length=keys.length,j=0,key;while(length > j) if(isEnum.call(S,key = keys[j++]))T[key] = S[key];}return T;}:_Object$assign2; /***/}, /* 12 */function(module,exports){var $Object=Object;module.exports = {create:$Object.create,getProto:$Object.getPrototypeOf,isEnum:({}).propertyIsEnumerable,getDesc:$Object.getOwnPropertyDescriptor,setDesc:$Object.defineProperty,setDescs:$Object.defineProperties,getKeys:$Object.keys,getNames:$Object.getOwnPropertyNames,getSymbols:$Object.getOwnPropertySymbols,each:[].forEach}; /***/}, /* 13 */function(module,exports,__webpack_require__){ // 7.1.13 ToObject(argument)
	var defined=__webpack_require__(14);module.exports = function(it){return Object(defined(it));}; /***/}, /* 14 */function(module,exports){ // 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){if(it == undefined)throw TypeError("Can't call method on  " + it);return it;}; /***/}, /* 15 */function(module,exports,__webpack_require__){ // fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof=__webpack_require__(16);module.exports = Object('z').propertyIsEnumerable(0)?Object:function(it){return cof(it) == 'String'?it.split(''):Object(it);}; /***/}, /* 16 */function(module,exports){var toString=({}).toString;module.exports = function(it){return toString.call(it).slice(8,-1);}; /***/}, /* 17 */function(module,exports){module.exports = function(exec){try{return !!exec();}catch(e) {return true;}}; /***/}, /* 18 */function(module,exports){module.exports = __WEBPACK_EXTERNAL_MODULE_18__; /***/}, /* 19 */function(module,exports,__webpack_require__){ /**
		 * @jsx React.DOM


		 */"use strict";var _extends=__webpack_require__(2)['default'];var React=__webpack_require__(18);var PropTypes=React.PropTypes;var Header=__webpack_require__(20);var Viewport=__webpack_require__(47);var ExcelColumn=__webpack_require__(42);var GridScrollMixin=__webpack_require__(79);var DOMMetrics=__webpack_require__(77);var Grid=React.createClass({displayName:'Grid',propTypes:{rowGetter:PropTypes.oneOfType([PropTypes.array,PropTypes.func]).isRequired,columns:PropTypes.oneOfType([PropTypes.array,PropTypes.object]),minHeight:PropTypes.number,headerRows:PropTypes.oneOfType([PropTypes.array,PropTypes.func]),rowHeight:PropTypes.number,rowRenderer:PropTypes.func,emptyRowsView:PropTypes.func,expandedRows:PropTypes.oneOfType([PropTypes.array,PropTypes.func]),selectedRows:PropTypes.oneOfType([PropTypes.array,PropTypes.func]),rowsCount:PropTypes.number,onRows:PropTypes.func,sortColumn:React.PropTypes.string,sortDirection:React.PropTypes.oneOf(['ASC','DESC','NONE']),rowOffsetHeight:PropTypes.number.isRequired,onViewportKeydown:PropTypes.func.isRequired,onViewportDragStart:PropTypes.func.isRequired,onViewportDragEnd:PropTypes.func.isRequired,onViewportDoubleClick:PropTypes.func.isRequired},mixins:[GridScrollMixin,DOMMetrics.MetricsComputatorMixin],getStyle:function getStyle(){return {overflow:'hidden',outline:0,position:'relative',minHeight:this.props.minHeight};},render:function render(){var headerRows=this.props.headerRows || [{ref:'row'}];var EmptyRowsView=this.props.emptyRowsView;return React.createElement('div',_extends({},this.props,{style:this.getStyle(),className:'react-grid-Grid'}),React.createElement(Header,{ref:'header',columnMetrics:this.props.columnMetrics,onColumnResize:this.props.onColumnResize,height:this.props.rowHeight,totalWidth:this.props.totalWidth,headerRows:headerRows,sortColumn:this.props.sortColumn,sortDirection:this.props.sortDirection,onSort:this.props.onSort}),this.props.rowsCount >= 1 || this.props.rowsCount === 0 && !this.props.emptyRowsView?React.createElement('div',{ref:'viewPortContainer',onKeyDown:this.props.onViewportKeydown,onDoubleClick:this.props.onViewportDoubleClick,onDragStart:this.props.onViewportDragStart,onDragEnd:this.props.onViewportDragEnd},React.createElement(Viewport,{ref:'viewport',width:this.props.columnMetrics.width,rowHeight:this.props.rowHeight,rowRenderer:this.props.rowRenderer,rowGetter:this.props.rowGetter,rowsCount:this.props.rowsCount,selectedRows:this.props.selectedRows,expandedRows:this.props.expandedRows,columnMetrics:this.props.columnMetrics,totalWidth:this.props.totalWidth,onScroll:this.onScroll,onRows:this.props.onRows,cellMetaData:this.props.cellMetaData,rowOffsetHeight:this.props.rowOffsetHeight || this.props.rowHeight * headerRows.length,minHeight:this.props.minHeight})):React.createElement('div',{ref:'emptyView',className:'react-grid-Empty'},React.createElement(EmptyRowsView,null)));},getDefaultProps:function getDefaultProps(){return {rowHeight:35,minHeight:350};}});module.exports = Grid; /***/}, /* 20 */function(module,exports,__webpack_require__){ /**
		 * @jsx React.DOM


		 */"use strict";var _extends=__webpack_require__(2)['default'];var React=__webpack_require__(18);var joinClasses=__webpack_require__(21);var shallowCloneObject=__webpack_require__(22);var ColumnMetrics=__webpack_require__(23);var ColumnUtils=__webpack_require__(25);var HeaderRow=__webpack_require__(27);var Header=React.createClass({displayName:'Header',propTypes:{columnMetrics:React.PropTypes.shape({width:React.PropTypes.number.isRequired}).isRequired,totalWidth:React.PropTypes.number,height:React.PropTypes.number.isRequired,headerRows:React.PropTypes.array.isRequired},render:function render(){var state=this.state.resizing || this.props;var className=joinClasses({'react-grid-Header':true,'react-grid-Header--resizing':!!this.state.resizing});var headerRows=this.getHeaderRows();return React.createElement('div',_extends({},this.props,{style:this.getStyle(),className:className}),headerRows);},shouldComponentUpdate:function shouldComponentUpdate(nextProps,nextState){var update=!ColumnMetrics.sameColumns(this.props.columnMetrics.columns,nextProps.columnMetrics.columns,ColumnMetrics.sameColumn) || this.props.totalWidth != nextProps.totalWidth || this.props.headerRows.length != nextProps.headerRows.length || this.state.resizing != nextState.resizing || this.props.sortColumn != nextProps.sortColumn || this.props.sortDirection != nextProps.sortDirection;return update;},getHeaderRows:function getHeaderRows(){var columnMetrics=this.getColumnMetrics();var resizeColumn;if(this.state.resizing){resizeColumn = this.state.resizing.column;}var headerRows=[];this.props.headerRows.forEach((function(row,index){var headerRowStyle={position:'absolute',top:this.getCombinedHeaderHeights(index),left:0,width:this.props.totalWidth,overflow:'hidden'};headerRows.push(React.createElement(HeaderRow,{key:row.ref,ref:row.ref,style:headerRowStyle,onColumnResize:this.onColumnResize,onColumnResizeEnd:this.onColumnResizeEnd,width:columnMetrics.width,height:row.height || this.props.height,columns:columnMetrics.columns,resizing:resizeColumn,headerCellRenderer:row.headerCellRenderer,sortColumn:this.props.sortColumn,sortDirection:this.props.sortDirection,onSort:this.props.onSort}));}).bind(this));return headerRows;},getInitialState:function getInitialState(){return {resizing:null};},componentWillReceiveProps:function componentWillReceiveProps(nextProps){this.setState({resizing:null});},onColumnResize:function onColumnResize(column,width){var state=this.state.resizing || this.props;var pos=this.getColumnPosition(column);if(pos != null){var resizing={columnMetrics:shallowCloneObject(state.columnMetrics)};resizing.columnMetrics = ColumnMetrics.resizeColumn(resizing.columnMetrics,pos,width); // we don't want to influence scrollLeft while resizing
	if(resizing.columnMetrics.totalWidth < state.columnMetrics.totalWidth){resizing.columnMetrics.totalWidth = state.columnMetrics.totalWidth;}resizing.column = ColumnUtils.getColumn(resizing.columnMetrics.columns,pos);this.setState({resizing:resizing});}},getColumnMetrics:function getColumnMetrics(){var columnMetrics;if(this.state.resizing){columnMetrics = this.state.resizing.columnMetrics;}else {columnMetrics = this.props.columnMetrics;}return columnMetrics;},getColumnPosition:function getColumnPosition(column){var columnMetrics=this.getColumnMetrics();var pos=-1;columnMetrics.columns.forEach(function(c,idx){if(c.key === column.key){pos = idx;}});return pos === -1?null:pos;},onColumnResizeEnd:function onColumnResizeEnd(column,width){var pos=this.getColumnPosition(column);if(pos !== null && this.props.onColumnResize){this.props.onColumnResize(pos,width || column.width);}},setScrollLeft:function setScrollLeft(scrollLeft){var node=this.refs.row.getDOMNode();node.scrollLeft = scrollLeft;this.refs.row.setScrollLeft(scrollLeft);if(this.refs.filterRow){var nodeFilters=this.refs.filterRow.getDOMNode();nodeFilters.scrollLeft = scrollLeft;this.refs.filterRow.setScrollLeft(scrollLeft);}},getCombinedHeaderHeights:function getCombinedHeaderHeights(until){var stop_at=this.props.headerRows.length;if(typeof until != 'undefined')stop_at = until;var height=0;for(var index=0;index < stop_at;index++) {height += this.props.headerRows[index].height || this.props.height;}return height;},getStyle:function getStyle(){return {position:'relative',height:this.getCombinedHeaderHeights(),overflow:'hidden'};}});module.exports = Header; /***/}, /* 21 */function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__; /*!
		  Copyright (c) 2015 Jed Watson.
		  Licensed under the MIT License (MIT), see
		  http://jedwatson.github.io/classnames
		*/function classNames(){var classes='';var arg;for(var i=0;i < arguments.length;i++) {arg = arguments[i];if(!arg){continue;}if('string' === typeof arg || 'number' === typeof arg){classes += ' ' + arg;}else if(Object.prototype.toString.call(arg) === '[object Array]'){classes += ' ' + classNames.apply(null,arg);}else if('object' === typeof arg){for(var key in arg) {if(!arg.hasOwnProperty(key) || !arg[key]){continue;}classes += ' ' + key;}}}return classes.substr(1);} // safely export classNames for node / browserify
	if(typeof module !== 'undefined' && module.exports){module.exports = classNames;} // safely export classNames for RequireJS
	if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__ = [],__WEBPACK_AMD_DEFINE_RESULT__ = (function(){return classNames;}).apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__),__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));} /***/}, /* 22 */function(module,exports){ /**
		 * @jsx React.DOM


		 */'use strict';function shallowCloneObject(obj){var result={};for(var k in obj) {if(obj.hasOwnProperty(k)){result[k] = obj[k];}}return result;}module.exports = shallowCloneObject; /***/}, /* 23 */function(module,exports,__webpack_require__){ /**
		 * @jsx React.DOM


		 */"use strict";var _Object$assign=__webpack_require__(3)['default'];var shallowCloneObject=__webpack_require__(22);var isValidElement=__webpack_require__(18).isValidElement;var sameColumn=__webpack_require__(24);var ColumnUtils=__webpack_require__(25);var getScrollbarSize=__webpack_require__(26); /**
		 * Update column metrics calculation.
		 *
		 * @param {ColumnMetricsType} metrics
		 */function recalculate(metrics){ // compute width for columns which specify width
	var columns=setColumnWidths(metrics.columns,metrics.totalWidth);var unallocatedWidth=columns.filter(function(c){return c.width;}).reduce(function(w,column){return w - column.width;},metrics.totalWidth);unallocatedWidth -= getScrollbarSize();var width=columns.filter(function(c){return c.width;}).reduce(function(w,column){return w + column.width;},0); // compute width for columns which doesn't specify width
	columns = setDefferedColumnWidths(columns,unallocatedWidth,metrics.minColumnWidth); // compute left offset
	columns = setColumnOffsets(columns);return {columns:columns,width:width,totalWidth:metrics.totalWidth,minColumnWidth:metrics.minColumnWidth};}function setColumnOffsets(columns){var left=0;return columns.map(function(column){column.left = left;left += column.width;return column;});}function setColumnWidths(columns,totalWidth){return columns.map(function(column){var colInfo=_Object$assign({},column);if(column.width){if(/^([0-9]+)%$/.exec(column.width.toString())){colInfo.width = Math.floor(column.width / 100 * totalWidth);}}return colInfo;});}function setDefferedColumnWidths(columns,unallocatedWidth,minColumnWidth){var defferedColumns=columns.filter(function(c){return !c.width;});return columns.map(function(column,i,arr){if(!column.width){if(unallocatedWidth <= 0){column.width = minColumnWidth;}else {column.width = Math.floor(unallocatedWidth / ColumnUtils.getSize(defferedColumns));}}return column;});} /**
		 * Update column metrics calculation by resizing a column.
		 *
		 * @param {ColumnMetricsType} metrics
		 * @param {Column} column
		 * @param {number} width
		 */function resizeColumn(metrics,index,width){var column=ColumnUtils.getColumn(metrics.columns,index);metrics = shallowCloneObject(metrics);metrics.columns = metrics.columns.slice(0);var updatedColumn=shallowCloneObject(column);updatedColumn.width = Math.max(width,metrics.minColumnWidth);metrics = ColumnUtils.spliceColumn(metrics,index,updatedColumn);return recalculate(metrics);}function areColumnsImmutable(prevColumns,nextColumns){return typeof Immutable !== 'undefined' && prevColumns instanceof Immutable.List && nextColumns instanceof Immutable.List;}function compareEachColumn(prevColumns,nextColumns,sameColumn){var i,len,column;var prevColumnsByKey={};var nextColumnsByKey={};if(ColumnUtils.getSize(prevColumns) !== ColumnUtils.getSize(nextColumns)){return false;}for(i = 0,len = ColumnUtils.getSize(prevColumns);i < len;i++) {column = prevColumns[i];prevColumnsByKey[column.key] = column;}for(i = 0,len = ColumnUtils.getSize(nextColumns);i < len;i++) {column = nextColumns[i];nextColumnsByKey[column.key] = column;var prevColumn=prevColumnsByKey[column.key];if(prevColumn === undefined || !sameColumn(prevColumn,column)){return false;}}for(i = 0,len = ColumnUtils.getSize(prevColumns);i < len;i++) {column = prevColumns[i];var nextColumn=nextColumnsByKey[column.key];if(nextColumn === undefined){return false;}}return true;}function sameColumns(prevColumns,nextColumns,sameColumn){if(areColumnsImmutable(prevColumns,nextColumns)){return prevColumns === nextColumns;}else {return compareEachColumn(prevColumns,nextColumns,sameColumn);}}module.exports = {recalculate:recalculate,resizeColumn:resizeColumn,sameColumn:sameColumn,sameColumns:sameColumns}; /***/}, /* 24 */function(module,exports,__webpack_require__){ /* TODO objects as a map */'use strict';var isValidElement=__webpack_require__(18).isValidElement;module.exports = function sameColumn(a,b){var k;for(k in a) {if(a.hasOwnProperty(k)){if(typeof a[k] === 'function' && typeof b[k] === 'function' || isValidElement(a[k]) && isValidElement(b[k])){continue;}if(!b.hasOwnProperty(k) || a[k] !== b[k]){return false;}}}for(k in b) {if(b.hasOwnProperty(k) && !a.hasOwnProperty(k)){return false;}}return true;}; /***/}, /* 25 */function(module,exports){'use strict';module.exports = {getColumn:function getColumn(columns,idx){if(Array.isArray(columns)){return columns[idx];}else if(typeof Immutable !== 'undefined'){return columns.get(idx);}},spliceColumn:function spliceColumn(metrics,idx,column){if(Array.isArray(metrics.columns)){metrics.columns.splice(idx,1,column);}else if(typeof Immutable !== 'undefined'){metrics.columns = metrics.columns.splice(idx,1,column);}return metrics;},getSize:function getSize(columns){if(Array.isArray(columns)){return columns.length;}else if(typeof Immutable !== 'undefined'){return columns.size;}}}; /***/}, /* 26 */function(module,exports){ /*  offsetWidth in HTMLElement */"use strict";var size;function getScrollbarSize(){if(size === undefined){var outer=document.createElement('div');outer.style.width = '50px';outer.style.height = '50px';outer.style.position = 'absolute';outer.style.top = '-200px';outer.style.left = '-200px';var inner=document.createElement('div');inner.style.height = '100px';inner.style.width = '100%';outer.appendChild(inner);document.body.appendChild(outer);var outerWidth=outer.clientWidth;outer.style.overflowY = 'scroll';var innerWidth=inner.clientWidth;document.body.removeChild(outer);size = outerWidth - innerWidth;}return size;}module.exports = getScrollbarSize; /***/}, /* 27 */function(module,exports,__webpack_require__){ /**
		 * @jsx React.DOM
		 */"use strict";var _extends=__webpack_require__(2)['default'];var React=__webpack_require__(18);var PropTypes=React.PropTypes;var shallowEqual=__webpack_require__(28);var HeaderCell=__webpack_require__(29);var getScrollbarSize=__webpack_require__(26);var ExcelColumn=__webpack_require__(42);var ColumnUtilsMixin=__webpack_require__(25);var SortableHeaderCell=__webpack_require__(46);var HeaderRowStyle={overflow:React.PropTypes.string,width:PropTypes.oneOfType([PropTypes.number,PropTypes.string]),height:React.PropTypes.number,position:React.PropTypes.string};var DEFINE_SORT={ASC:'ASC',DESC:'DESC',NONE:'NONE'};var HeaderRow=React.createClass({displayName:'HeaderRow',propTypes:{width:PropTypes.oneOfType([PropTypes.number,PropTypes.string]),height:PropTypes.number.isRequired,columns:PropTypes.oneOfType([PropTypes.array,PropTypes.object]),onColumnResize:PropTypes.func,onSort:PropTypes.func.isRequired,style:PropTypes.shape(HeaderRowStyle)},mixins:[ColumnUtilsMixin],render:function render(){var cellsStyle={width:this.props.width?this.props.width + getScrollbarSize():'100%',height:this.props.height,whiteSpace:'nowrap',overflowX:'hidden',overflowY:'hidden'};var cells=this.getCells();return React.createElement('div',_extends({},this.props,{className:'react-grid-HeaderRow'}),React.createElement('div',{style:cellsStyle},cells));},getHeaderRenderer:function getHeaderRenderer(column){if(column.sortable){var sortDirection=this.props.sortColumn === column.key?this.props.sortDirection:DEFINE_SORT.NONE;return React.createElement(SortableHeaderCell,{columnKey:column.key,onSort:this.props.onSort,sortDirection:sortDirection});}else {return this.props.headerCellRenderer || column.headerRenderer || this.props.cellRenderer;}},getCells:function getCells(){var cells=[];var lockedCells=[];for(var i=0,len=this.getSize(this.props.columns);i < len;i++) {var column=this.getColumn(this.props.columns,i);var cell=React.createElement(HeaderCell,{ref:i,key:i,height:this.props.height,column:column,renderer:this.getHeaderRenderer(column),resizing:this.props.resizing === column,onResize:this.props.onColumnResize,onResizeEnd:this.props.onColumnResizeEnd});if(column.locked){lockedCells.push(cell);}else {cells.push(cell);}}return cells.concat(lockedCells);},setScrollLeft:function setScrollLeft(scrollLeft){var _this=this;this.props.columns.forEach(function(column,i){if(column.locked){_this.refs[i].setScrollLeft(scrollLeft);}});},shouldComponentUpdate:function shouldComponentUpdate(nextProps){return nextProps.width !== this.props.width || nextProps.height !== this.props.height || nextProps.columns !== this.props.columns || !shallowEqual(nextProps.style,this.props.style) || this.props.sortColumn != nextProps.sortColumn || this.props.sortDirection != nextProps.sortDirection;},getStyle:function getStyle(){return {overflow:'hidden',width:'100%',height:this.props.height,position:'absolute'};}});module.exports = HeaderRow; /***/}, /* 28 */function(module,exports){ /**
		 * Copyright 2013-2015, Facebook, Inc.
		 * All rights reserved.
		 *
		 * This source code is licensed under the BSD-style license found in the
		 * LICENSE file in the root directory of this source tree. An additional grant
		 * of patent rights can be found in the PATENTS file in the same directory.
		 *
		 * @providesModule shallowEqual
		 */'use strict'; /**
		 * Performs equality by iterating through keys on an object and returning
		 * false when any key has values which are not strictly equal between
		 * objA and objB. Returns true when the values of all keys are strictly equal.
		 *
		 * @return {boolean}
		 */function shallowEqual(objA,objB){if(objA === objB){return true;}var key; // Test for A's keys different from B.
	for(key in objA) {if(objA.hasOwnProperty(key) && (!objB.hasOwnProperty(key) || objA[key] !== objB[key])){return false;}} // Test for B's keys missing from A.
	for(key in objB) {if(objB.hasOwnProperty(key) && !objA.hasOwnProperty(key)){return false;}}return true;}module.exports = shallowEqual; /***/}, /* 29 */function(module,exports,__webpack_require__){ /* TODO unkwon */ /**
		 * @jsx React.DOM


		 */"use strict";var React=__webpack_require__(18);var joinClasses=__webpack_require__(21);var cloneWithProps=__webpack_require__(30);var PropTypes=React.PropTypes;var ExcelColumn=__webpack_require__(42);var ResizeHandle=__webpack_require__(44);var HeaderCell=React.createClass({displayName:'HeaderCell',propTypes:{renderer:PropTypes.oneOfType([PropTypes.func,PropTypes.element]).isRequired,column:PropTypes.shape(ExcelColumn).isRequired,onResize:PropTypes.func.isRequired,height:PropTypes.number.isRequired,onResizeEnd:PropTypes.func.isRequired},render:function render(){var resizeHandle;if(this.props.column.resizable){resizeHandle = React.createElement(ResizeHandle,{onDrag:this.onDrag,onDragStart:this.onDragStart,onDragEnd:this.onDragEnd});}var className=joinClasses({'react-grid-HeaderCell':true,'react-grid-HeaderCell--resizing':this.state.resizing,'react-grid-HeaderCell--locked':this.props.column.locked});className = joinClasses(className,this.props.className,this.props.column.cellClass);var cell=this.getCell();return React.createElement('div',{className:className,style:this.getStyle()},cell,resizeHandle);},getCell:function getCell(){if(React.isValidElement(this.props.renderer)){return cloneWithProps(this.props.renderer,{column:this.props.column});}else {var Renderer=this.props.renderer;return this.props.renderer({column:this.props.column});}},getDefaultProps:function getDefaultProps(){return {renderer:simpleCellRenderer};},getInitialState:function getInitialState(){return {resizing:false};},setScrollLeft:function setScrollLeft(scrollLeft){var node=React.findDOMNode(this);node.style.webkitTransform = 'translate3d(' + scrollLeft + 'px, 0px, 0px)';node.style.transform = 'translate3d(' + scrollLeft + 'px, 0px, 0px)';},getStyle:function getStyle(){return {width:this.props.column.width,left:this.props.column.left,display:'inline-block',position:'absolute',overflow:'hidden',height:this.props.height,margin:0,textOverflow:'ellipsis',whiteSpace:'nowrap'};},onDragStart:function onDragStart(e){this.setState({resizing:true}); //need to set dummy data for FF
	if(e && e.dataTransfer && e.dataTransfer.setData)e.dataTransfer.setData('text/plain','dummy');},onDrag:function onDrag(e){var resize=this.props.onResize || null; //for flows sake, doesnt recognise a null check direct
	if(resize){var width=this.getWidthFromMouseEvent(e);if(width > 0){resize(this.props.column,width);}}},onDragEnd:function onDragEnd(e){var width=this.getWidthFromMouseEvent(e);this.props.onResizeEnd(this.props.column,width);this.setState({resizing:false});},getWidthFromMouseEvent:function getWidthFromMouseEvent(e){var right=e.pageX;var left=React.findDOMNode(this).getBoundingClientRect().left;return right - left;}});function simpleCellRenderer(props){return React.createElement('div',{className:'widget-HeaderCell__value'},props.column.name);}var SimpleCellFormatter=React.createClass({displayName:'SimpleCellFormatter',propTypes:{value:React.PropTypes.oneOfType([React.PropTypes.string,React.PropTypes.number,React.PropTypes.object,React.PropTypes.bool]).isRequired},render:function render(){return React.createElement('span',null,this.props.value);},shouldComponentUpdate:function shouldComponentUpdate(nextProps,nextState){return nextProps.value !== this.props.value;}});module.exports = HeaderCell; /***/}, /* 30 */function(module,exports,__webpack_require__){ /* WEBPACK VAR INJECTION */(function(process){ /**
		 * Copyright 2013-2015, Facebook, Inc.
		 * All rights reserved.
		 *
		 * This source code is licensed under the BSD-style license found in the
		 * LICENSE file in the root directory of this source tree. An additional grant
		 * of patent rights can be found in the PATENTS file in the same directory.
		 *
		 * @typechecks static-only
		 * @providesModule cloneWithProps
		 */'use strict';var ReactElement=__webpack_require__(32);var ReactPropTransferer=__webpack_require__(39);var keyOf=__webpack_require__(41);var warning=__webpack_require__(36);var CHILDREN_PROP=keyOf({children:null}); /**
		 * Sometimes you want to change the props of a child passed to you. Usually
		 * this is to add a CSS class.
		 *
		 * @param {ReactElement} child child element you'd like to clone
		 * @param {object} props props you'd like to modify. className and style will be
		 * merged automatically.
		 * @return {ReactElement} a clone of child with props merged in.
		 */function cloneWithProps(child,props){if("production" !== process.env.NODE_ENV){"production" !== process.env.NODE_ENV?warning(!child.ref,'You are calling cloneWithProps() on a child with a ref. This is ' + 'dangerous because you\'re creating a new child which will not be ' + 'added as a ref to its parent.'):null;}var newProps=ReactPropTransferer.mergeProps(props,child.props); // Use `child.props.children` if it is provided.
	if(!newProps.hasOwnProperty(CHILDREN_PROP) && child.props.hasOwnProperty(CHILDREN_PROP)){newProps.children = child.props.children;} // The current API doesn't retain _owner and _context, which is why this
	// doesn't use ReactElement.cloneAndReplaceProps.
	return ReactElement.createElement(child.type,newProps);}module.exports = cloneWithProps; /* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(31)); /***/}, /* 31 */function(module,exports){ // shim for using process in browser
	var process=module.exports = {};var queue=[];var draining=false;var currentQueue;var queueIndex=-1;function cleanUpNextTick(){draining = false;if(currentQueue.length){queue = currentQueue.concat(queue);}else {queueIndex = -1;}if(queue.length){drainQueue();}}function drainQueue(){if(draining){return;}var timeout=setTimeout(cleanUpNextTick);draining = true;var len=queue.length;while(len) {currentQueue = queue;queue = [];while(++queueIndex < len) {if(currentQueue){currentQueue[queueIndex].run();}}queueIndex = -1;len = queue.length;}currentQueue = null;draining = false;clearTimeout(timeout);}process.nextTick = function(fun){var args=new Array(arguments.length - 1);if(arguments.length > 1){for(var i=1;i < arguments.length;i++) {args[i - 1] = arguments[i];}}queue.push(new Item(fun,args));if(queue.length === 1 && !draining){setTimeout(drainQueue,0);}}; // v8 likes predictible objects
	function Item(fun,array){this.fun = fun;this.array = array;}Item.prototype.run = function(){this.fun.apply(null,this.array);};process.title = 'browser';process.browser = true;process.env = {};process.argv = [];process.version = ''; // empty string to avoid regexp issues
	process.versions = {};function noop(){}process.on = noop;process.addListener = noop;process.once = noop;process.off = noop;process.removeListener = noop;process.removeAllListeners = noop;process.emit = noop;process.binding = function(name){throw new Error('process.binding is not supported');};process.cwd = function(){return '/';};process.chdir = function(dir){throw new Error('process.chdir is not supported');};process.umask = function(){return 0;}; /***/}, /* 32 */function(module,exports,__webpack_require__){ /* WEBPACK VAR INJECTION */(function(process){ /**
		 * Copyright 2014-2015, Facebook, Inc.
		 * All rights reserved.
		 *
		 * This source code is licensed under the BSD-style license found in the
		 * LICENSE file in the root directory of this source tree. An additional grant
		 * of patent rights can be found in the PATENTS file in the same directory.
		 *
		 * @providesModule ReactElement
		 */'use strict';var ReactContext=__webpack_require__(33);var ReactCurrentOwner=__webpack_require__(38);var assign=__webpack_require__(34);var warning=__webpack_require__(36);var RESERVED_PROPS={key:true,ref:true}; /**
		 * Warn for mutations.
		 *
		 * @internal
		 * @param {object} object
		 * @param {string} key
		 */function defineWarningProperty(object,key){_Object$defineProperty2(object,key,{configurable:false,enumerable:true,get:function get(){if(!this._store){return null;}return this._store[key];},set:function set(value){"production" !== process.env.NODE_ENV?warning(false,'Don\'t set the %s property of the React element. Instead, ' + 'specify the correct value when initially creating the element.',key):null;this._store[key] = value;}});} /**
		 * This is updated to true if the membrane is successfully created.
		 */var useMutationMembrane=false; /**
		 * Warn for mutations.
		 *
		 * @internal
		 * @param {object} element
		 */function defineMutationMembrane(prototype){try{var pseudoFrozenProperties={props:true};for(var key in pseudoFrozenProperties) {defineWarningProperty(prototype,key);}useMutationMembrane = true;}catch(x) { // IE will fail on defineProperty
	}} /**
		 * Base constructor for all React elements. This is only used to make this
		 * work with a dynamic instanceof check. Nothing should live on this prototype.
		 *
		 * @param {*} type
		 * @param {string|object} ref
		 * @param {*} key
		 * @param {*} props
		 * @internal
		 */var ReactElement=function ReactElement(type,key,ref,owner,context,props){ // Built-in properties that belong on the element
	this.type = type;this.key = key;this.ref = ref; // Record the component responsible for creating this element.
	this._owner = owner; // TODO: Deprecate withContext, and then the context becomes accessible
	// through the owner.
	this._context = context;if("production" !== process.env.NODE_ENV){ // The validation flag and props are currently mutative. We put them on
	// an external backing store so that we can freeze the whole object.
	// This can be replaced with a WeakMap once they are implemented in
	// commonly used development environments.
	this._store = {props:props,originalProps:assign({},props)}; // To make comparing ReactElements easier for testing purposes, we make
	// the validation flag non-enumerable (where possible, which should
	// include every environment we run tests in), so the test framework
	// ignores it.
	try{Object.defineProperty(this._store,'validated',{configurable:false,enumerable:false,writable:true});}catch(x) {}this._store.validated = false; // We're not allowed to set props directly on the object so we early
	// return and rely on the prototype membrane to forward to the backing
	// store.
	if(useMutationMembrane){_Object$freeze(this);return;}}this.props = props;}; // We intentionally don't expose the function on the constructor property.
	// ReactElement should be indistinguishable from a plain object.
	ReactElement.prototype = {_isReactElement:true};if("production" !== process.env.NODE_ENV){defineMutationMembrane(ReactElement.prototype);}ReactElement.createElement = function(type,config,children){var propName; // Reserved names are extracted
	var props={};var key=null;var ref=null;if(config != null){ref = config.ref === undefined?null:config.ref;key = config.key === undefined?null:'' + config.key; // Remaining properties are added to a new props object
	for(propName in config) {if(config.hasOwnProperty(propName) && !RESERVED_PROPS.hasOwnProperty(propName)){props[propName] = config[propName];}}} // Children can be more than one argument, and those are transferred onto
	// the newly allocated props object.
	var childrenLength=arguments.length - 2;if(childrenLength === 1){props.children = children;}else if(childrenLength > 1){var childArray=Array(childrenLength);for(var i=0;i < childrenLength;i++) {childArray[i] = arguments[i + 2];}props.children = childArray;} // Resolve default props
	if(type && type.defaultProps){var defaultProps=type.defaultProps;for(propName in defaultProps) {if(typeof props[propName] === 'undefined'){props[propName] = defaultProps[propName];}}}return new ReactElement(type,key,ref,ReactCurrentOwner.current,ReactContext.current,props);};ReactElement.createFactory = function(type){var factory=ReactElement.createElement.bind(null,type); // Expose the type on the factory and the prototype so that it can be
	// easily accessed on elements. E.g. <Foo />.type === Foo.type.
	// This should not be named `constructor` since this may not be the function
	// that created the element, and it may not even be a constructor.
	// Legacy hook TODO: Warn if this is accessed
	factory.type = type;return factory;};ReactElement.cloneAndReplaceProps = function(oldElement,newProps){var newElement=new ReactElement(oldElement.type,oldElement.key,oldElement.ref,oldElement._owner,oldElement._context,newProps);if("production" !== process.env.NODE_ENV){ // If the key on the original is valid, then the clone is valid
	newElement._store.validated = oldElement._store.validated;}return newElement;};ReactElement.cloneElement = function(element,config,children){var propName; // Original props are copied
	var props=assign({},element.props); // Reserved names are extracted
	var key=element.key;var ref=element.ref; // Owner will be preserved, unless ref is overridden
	var owner=element._owner;if(config != null){if(config.ref !== undefined){ // Silently steal the ref from the parent.
	ref = config.ref;owner = ReactCurrentOwner.current;}if(config.key !== undefined){key = '' + config.key;} // Remaining properties override existing props
	for(propName in config) {if(config.hasOwnProperty(propName) && !RESERVED_PROPS.hasOwnProperty(propName)){props[propName] = config[propName];}}} // Children can be more than one argument, and those are transferred onto
	// the newly allocated props object.
	var childrenLength=arguments.length - 2;if(childrenLength === 1){props.children = children;}else if(childrenLength > 1){var childArray=Array(childrenLength);for(var i=0;i < childrenLength;i++) {childArray[i] = arguments[i + 2];}props.children = childArray;}return new ReactElement(element.type,key,ref,owner,element._context,props);}; /**
		 * @param {?object} object
		 * @return {boolean} True if `object` is a valid component.
		 * @final
		 */ReactElement.isValidElement = function(object){ // ReactTestUtils is often used outside of beforeEach where as React is
	// within it. This leads to two different instances of React on the same
	// page. To identify a element from a different React instance we use
	// a flag instead of an instanceof check.
	var isElement=!!(object && object._isReactElement); // if (isElement && !(object instanceof ReactElement)) {
	// This is an indicator that you're using multiple versions of React at the
	// same time. This will screw with ownership and stuff. Fix it, please.
	// TODO: We could possibly warn here.
	// }
	return isElement;};module.exports = ReactElement; /* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(31)); /***/}, /* 33 */function(module,exports,__webpack_require__){ /* WEBPACK VAR INJECTION */(function(process){ /**
		 * Copyright 2013-2015, Facebook, Inc.
		 * All rights reserved.
		 *
		 * This source code is licensed under the BSD-style license found in the
		 * LICENSE file in the root directory of this source tree. An additional grant
		 * of patent rights can be found in the PATENTS file in the same directory.
		 *
		 * @providesModule ReactContext
		 */'use strict';var assign=__webpack_require__(34);var emptyObject=__webpack_require__(35);var warning=__webpack_require__(36);var didWarn=false; /**
		 * Keeps track of the current context.
		 *
		 * The context is automatically passed down the component ownership hierarchy
		 * and is accessible via `this.context` on ReactCompositeComponents.
		 */var ReactContext={ /**
		   * @internal
		   * @type {object}
		   */current:emptyObject, /**
		   * Temporarily extends the current context while executing scopedCallback.
		   *
		   * A typical use case might look like
		   *
		   *  render: function() {
		   *    var children = ReactContext.withContext({foo: 'foo'}, () => (
		   *
		   *    ));
		   *    return <div>{children}</div>;
		   *  }
		   *
		   * @param {object} newContext New context to merge into the existing context
		   * @param {function} scopedCallback Callback to run with the new context
		   * @return {ReactComponent|array<ReactComponent>}
		   */withContext:function withContext(newContext,scopedCallback){if("production" !== process.env.NODE_ENV){"production" !== process.env.NODE_ENV?warning(didWarn,'withContext is deprecated and will be removed in a future version. ' + 'Use a wrapper component with getChildContext instead.'):null;didWarn = true;}var result;var previousContext=ReactContext.current;ReactContext.current = assign({},previousContext,newContext);try{result = scopedCallback();}finally {ReactContext.current = previousContext;}return result;}};module.exports = ReactContext; /* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(31)); /***/}, /* 34 */function(module,exports){ /**
		 * Copyright 2014-2015, Facebook, Inc.
		 * All rights reserved.
		 *
		 * This source code is licensed under the BSD-style license found in the
		 * LICENSE file in the root directory of this source tree. An additional grant
		 * of patent rights can be found in the PATENTS file in the same directory.
		 *
		 * @providesModule Object.assign
		 */ // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.assign
	'use strict';function assign(target,sources){if(target == null){throw new TypeError('Object.assign target cannot be null or undefined');}var to=Object(target);var hasOwnProperty=Object.prototype.hasOwnProperty;for(var nextIndex=1;nextIndex < arguments.length;nextIndex++) {var nextSource=arguments[nextIndex];if(nextSource == null){continue;}var from=Object(nextSource); // We don't currently support accessors nor proxies. Therefore this
	// copy cannot throw. If we ever supported this then we must handle
	// exceptions and side-effects. We don't support symbols so they won't
	// be transferred.
	for(var key in from) {if(hasOwnProperty.call(from,key)){to[key] = from[key];}}}return to;}module.exports = assign; /***/}, /* 35 */function(module,exports,__webpack_require__){ /* WEBPACK VAR INJECTION */(function(process){ /**
		 * Copyright 2013-2015, Facebook, Inc.
		 * All rights reserved.
		 *
		 * This source code is licensed under the BSD-style license found in the
		 * LICENSE file in the root directory of this source tree. An additional grant
		 * of patent rights can be found in the PATENTS file in the same directory.
		 *
		 * @providesModule emptyObject
		 */"use strict";var emptyObject={};if("production" !== process.env.NODE_ENV){_Object$freeze(emptyObject);}module.exports = emptyObject; /* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(31)); /***/}, /* 36 */function(module,exports,__webpack_require__){ /* WEBPACK VAR INJECTION */(function(process){ /**
		 * Copyright 2014-2015, Facebook, Inc.
		 * All rights reserved.
		 *
		 * This source code is licensed under the BSD-style license found in the
		 * LICENSE file in the root directory of this source tree. An additional grant
		 * of patent rights can be found in the PATENTS file in the same directory.
		 *
		 * @providesModule warning
		 */"use strict";var emptyFunction=__webpack_require__(37); /**
		 * Similar to invariant but only logs a warning if the condition is not met.
		 * This can be used to log issues in development environments in critical
		 * paths. Removing the logging code for production environments will keep the
		 * same logic and follow the same code paths.
		 */var warning=emptyFunction;if("production" !== process.env.NODE_ENV){warning = function(condition,format){for(var args=[],$__0=2,$__1=arguments.length;$__0 < $__1;$__0++) args.push(arguments[$__0]);if(format === undefined){throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');}if(format.length < 10 || /^[s\W]*$/.test(format)){throw new Error('The warning format should be able to uniquely identify this ' + 'warning. Please, use a more descriptive format than: ' + format);}if(format.indexOf('Failed Composite propType: ') === 0){return; // Ignore CompositeComponent proptype check.
	}if(!condition){var argIndex=0;var message='Warning: ' + format.replace(/%s/g,function(){return args[argIndex++];});console.warn(message);try{ // --- Welcome to debugging React ---
	// This error was thrown as a convenience so that you can use this stack
	// to find the callsite that caused this warning to fire.
	throw new Error(message);}catch(x) {}}};}module.exports = warning; /* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(31)); /***/}, /* 37 */function(module,exports){ /**
		 * Copyright 2013-2015, Facebook, Inc.
		 * All rights reserved.
		 *
		 * This source code is licensed under the BSD-style license found in the
		 * LICENSE file in the root directory of this source tree. An additional grant
		 * of patent rights can be found in the PATENTS file in the same directory.
		 *
		 * @providesModule emptyFunction
		 */function makeEmptyFunction(arg){return function(){return arg;};} /**
		 * This function accepts and discards inputs; it has no side effects. This is
		 * primarily useful idiomatically for overridable function endpoints which
		 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
		 */function emptyFunction(){}emptyFunction.thatReturns = makeEmptyFunction;emptyFunction.thatReturnsFalse = makeEmptyFunction(false);emptyFunction.thatReturnsTrue = makeEmptyFunction(true);emptyFunction.thatReturnsNull = makeEmptyFunction(null);emptyFunction.thatReturnsThis = function(){return this;};emptyFunction.thatReturnsArgument = function(arg){return arg;};module.exports = emptyFunction; /***/}, /* 38 */function(module,exports){ /**
		 * Copyright 2013-2015, Facebook, Inc.
		 * All rights reserved.
		 *
		 * This source code is licensed under the BSD-style license found in the
		 * LICENSE file in the root directory of this source tree. An additional grant
		 * of patent rights can be found in the PATENTS file in the same directory.
		 *
		 * @providesModule ReactCurrentOwner
		 */'use strict'; /**
		 * Keeps track of the current owner.
		 *
		 * The current owner is the component who should own any components that are
		 * currently being constructed.
		 *
		 * The depth indicate how many composite components are above this render level.
		 */var ReactCurrentOwner={ /**
		   * @internal
		   * @type {ReactComponent}
		   */current:null};module.exports = ReactCurrentOwner; /***/}, /* 39 */function(module,exports,__webpack_require__){ /**
		 * Copyright 2013-2015, Facebook, Inc.
		 * All rights reserved.
		 *
		 * This source code is licensed under the BSD-style license found in the
		 * LICENSE file in the root directory of this source tree. An additional grant
		 * of patent rights can be found in the PATENTS file in the same directory.
		 *
		 * @providesModule ReactPropTransferer
		 */'use strict';var assign=__webpack_require__(34);var emptyFunction=__webpack_require__(37);var joinClasses=__webpack_require__(40); /**
		 * Creates a transfer strategy that will merge prop values using the supplied
		 * `mergeStrategy`. If a prop was previously unset, this just sets it.
		 *
		 * @param {function} mergeStrategy
		 * @return {function}
		 */function createTransferStrategy(mergeStrategy){return function(props,key,value){if(!props.hasOwnProperty(key)){props[key] = value;}else {props[key] = mergeStrategy(props[key],value);}};}var transferStrategyMerge=createTransferStrategy(function(a,b){ // `merge` overrides the first object's (`props[key]` above) keys using the
	// second object's (`value`) keys. An object's style's existing `propA` would
	// get overridden. Flip the order here.
	return assign({},b,a);}); /**
		 * Transfer strategies dictate how props are transferred by `transferPropsTo`.
		 * NOTE: if you add any more exceptions to this list you should be sure to
		 * update `cloneWithProps()` accordingly.
		 */var TransferStrategies={ /**
		   * Never transfer `children`.
		   */children:emptyFunction, /**
		   * Transfer the `className` prop by merging them.
		   */className:createTransferStrategy(joinClasses), /**
		   * Transfer the `style` prop (which is an object) by merging them.
		   */style:transferStrategyMerge}; /**
		 * Mutates the first argument by transferring the properties from the second
		 * argument.
		 *
		 * @param {object} props
		 * @param {object} newProps
		 * @return {object}
		 */function transferInto(props,newProps){for(var thisKey in newProps) {if(!newProps.hasOwnProperty(thisKey)){continue;}var transferStrategy=TransferStrategies[thisKey];if(transferStrategy && TransferStrategies.hasOwnProperty(thisKey)){transferStrategy(props,thisKey,newProps[thisKey]);}else if(!props.hasOwnProperty(thisKey)){props[thisKey] = newProps[thisKey];}}return props;} /**
		 * ReactPropTransferer are capable of transferring props to another component
		 * using a `transferPropsTo` method.
		 *
		 * @class ReactPropTransferer
		 */var ReactPropTransferer={ /**
		   * Merge two props objects using TransferStrategies.
		   *
		   * @param {object} oldProps original props (they take precedence)
		   * @param {object} newProps new props to merge in
		   * @return {object} a new object containing both sets of props merged.
		   */mergeProps:function mergeProps(oldProps,newProps){return transferInto(assign({},oldProps),newProps);}};module.exports = ReactPropTransferer; /***/}, /* 40 */function(module,exports){ /**
		 * Copyright 2013-2015, Facebook, Inc.
		 * All rights reserved.
		 *
		 * This source code is licensed under the BSD-style license found in the
		 * LICENSE file in the root directory of this source tree. An additional grant
		 * of patent rights can be found in the PATENTS file in the same directory.
		 *
		 * @providesModule joinClasses
		 * @typechecks static-only
		 */'use strict'; /**
		 * Combines multiple className strings into one.
		 * http://jsperf.com/joinclasses-args-vs-array
		 *
		 * @param {...?string} classes
		 * @return {string}
		 */function joinClasses(className /*, ... */){if(!className){className = '';}var nextClass;var argLength=arguments.length;if(argLength > 1){for(var ii=1;ii < argLength;ii++) {nextClass = arguments[ii];if(nextClass){className = (className?className + ' ':'') + nextClass;}}}return className;}module.exports = joinClasses; /***/}, /* 41 */function(module,exports){ /**
		 * Copyright 2013-2015, Facebook, Inc.
		 * All rights reserved.
		 *
		 * This source code is licensed under the BSD-style license found in the
		 * LICENSE file in the root directory of this source tree. An additional grant
		 * of patent rights can be found in the PATENTS file in the same directory.
		 *
		 * @providesModule keyOf
		 */ /**
		 * Allows extraction of a minified key. Let's the build system minify keys
		 * without loosing the ability to dynamically use key strings as values
		 * themselves. Pass in an object with a single key/val pair and it will return
		 * you the string key of that single record. Suppose you want to grab the
		 * value for a key 'className' inside of an object. Key/val minification may
		 * have aliased that key to be 'xa12'. keyOf({className: null}) will return
		 * 'xa12' in that case. Resolve keys you want to use once at startup time, then
		 * reuse those resolutions.
		 */var keyOf=function keyOf(oneKeyObj){var key;for(key in oneKeyObj) {if(!oneKeyObj.hasOwnProperty(key)){continue;}return key;}return null;};module.exports = keyOf; /***/}, /* 42 */function(module,exports,__webpack_require__){'use strict';var _classCallCheck=__webpack_require__(43)['default'];var React=__webpack_require__(18);var ExcelColumn=function ExcelColumn(){_classCallCheck(this,ExcelColumn);};var ExcelColumnShape={name:React.PropTypes.string.isRequired,key:React.PropTypes.string.isRequired,width:React.PropTypes.number.isRequired};module.exports = ExcelColumnShape; /***/}, /* 43 */function(module,exports){"use strict";exports["default"] = function(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}};exports.__esModule = true; /***/}, /* 44 */function(module,exports,__webpack_require__){'use strict';var _extends=__webpack_require__(2)['default'];var React=__webpack_require__(18);var joinClasses=__webpack_require__(21);var Draggable=__webpack_require__(45);var cloneWithProps=__webpack_require__(30);var PropTypes=React.PropTypes;var ResizeHandle=React.createClass({displayName:'ResizeHandle',style:{position:'absolute',top:0,right:0,width:6,height:'100%'},render:function render(){return React.createElement(Draggable,_extends({},this.props,{className:'react-grid-HeaderCell__resizeHandle',style:this.style}));}});module.exports = ResizeHandle; /***/}, /* 45 */function(module,exports,__webpack_require__){ /*  need   */ /**
		 * @jsx React.DOM


		 */'use strict';var _extends=__webpack_require__(2)['default'];var React=__webpack_require__(18);var PropTypes=React.PropTypes;var emptyFunction=__webpack_require__(37);var Draggable=React.createClass({displayName:'Draggable',propTypes:{onDragStart:PropTypes.func,onDragEnd:PropTypes.func,onDrag:PropTypes.func,component:PropTypes.oneOfType([PropTypes.func,PropTypes.constructor])},render:function render(){var Component=this.props.component;return React.createElement('div',_extends({},this.props,{onMouseDown:this.onMouseDown,className:'react-grid-HeaderCell__draggable'}));},getDefaultProps:function getDefaultProps(){return {onDragStart:emptyFunction.thatReturnsTrue,onDragEnd:emptyFunction,onDrag:emptyFunction};},getInitialState:function getInitialState(){return {drag:null};},onMouseDown:function onMouseDown(e){var drag=this.props.onDragStart(e);if(drag === null && e.button !== 0){return;}window.addEventListener('mouseup',this.onMouseUp);window.addEventListener('mousemove',this.onMouseMove);this.setState({drag:drag});},onMouseMove:function onMouseMove(e){if(this.state.drag === null){return;}if(e.preventDefault){e.preventDefault();}this.props.onDrag(e);},onMouseUp:function onMouseUp(e){this.cleanUp();this.props.onDragEnd(e,this.state.drag);this.setState({drag:null});},componentWillUnmount:function componentWillUnmount(){this.cleanUp();},cleanUp:function cleanUp(){window.removeEventListener('mouseup',this.onMouseUp);window.removeEventListener('mousemove',this.onMouseMove);}});module.exports = Draggable; /***/}, /* 46 */function(module,exports,__webpack_require__){ /**
		 * @jsx React.DOM


		 */'use strict';var React=__webpack_require__(18);var joinClasses=__webpack_require__(21);var ExcelColumn=__webpack_require__(42);var DEFINE_SORT={ASC:'ASC',DESC:'DESC',NONE:'NONE'};var SortableHeaderCell=React.createClass({displayName:'SortableHeaderCell',propTypes:{columnKey:React.PropTypes.string.isRequired,onSort:React.PropTypes.func.isRequired,sortDirection:React.PropTypes.oneOf(['ASC','DESC','NONE'])},onClick:function onClick(){var direction;switch(this.props.sortDirection){case null:case undefined:case DEFINE_SORT.NONE:direction = DEFINE_SORT.ASC;break;case DEFINE_SORT.ASC:direction = DEFINE_SORT.DESC;break;case DEFINE_SORT.DESC:direction = DEFINE_SORT.NONE;break;}this.props.onSort(this.props.columnKey,direction);},getSortByText:function getSortByText(){var unicodeKeys={'ASC':'9650','DESC':'9660','NONE':''};return String.fromCharCode(unicodeKeys[this.props.sortDirection]);},render:function render(){var className=joinClasses({'react-grid-HeaderCell-sortable':true,'react-grid-HeaderCell-sortable--ascending':this.props.sortDirection === 'ASC','react-grid-HeaderCell-sortable--descending':this.props.sortDirection === 'DESC'});return React.createElement('div',{className:className,onClick:this.onClick,style:{cursor:'pointer'}},this.props.column.name,React.createElement('span',{className:'pull-right'},this.getSortByText()));}});module.exports = SortableHeaderCell; /***/}, /* 47 */function(module,exports,__webpack_require__){ /**
		 * @jsx React.DOM


		 */'use strict';var React=__webpack_require__(18);var Canvas=__webpack_require__(48);var PropTypes=React.PropTypes;var ViewportScroll=__webpack_require__(76);var Viewport=React.createClass({displayName:'Viewport',mixins:[ViewportScroll],propTypes:{rowOffsetHeight:PropTypes.number.isRequired,totalWidth:PropTypes.number.isRequired,columnMetrics:PropTypes.object.isRequired,rowGetter:PropTypes.oneOfType([PropTypes.array,PropTypes.func]).isRequired,selectedRows:PropTypes.array,expandedRows:PropTypes.array,rowRenderer:PropTypes.func,rowsCount:PropTypes.number.isRequired,rowHeight:PropTypes.number.isRequired,onRows:PropTypes.func,onScroll:PropTypes.func,minHeight:PropTypes.number},render:function render(){var style={padding:0,bottom:0,left:0,right:0,overflow:'hidden',position:'absolute',top:this.props.rowOffsetHeight};return React.createElement('div',{className:'react-grid-Viewport',style:style},React.createElement(Canvas,{ref:'canvas',totalWidth:this.props.totalWidth,width:this.props.columnMetrics.width,rowGetter:this.props.rowGetter,rowsCount:this.props.rowsCount,selectedRows:this.props.selectedRows,expandedRows:this.props.expandedRows,columns:this.props.columnMetrics.columns,rowRenderer:this.props.rowRenderer,visibleStart:this.state.visibleStart,visibleEnd:this.state.visibleEnd,displayStart:this.state.displayStart,displayEnd:this.state.displayEnd,cellMetaData:this.props.cellMetaData,height:this.state.height,rowHeight:this.props.rowHeight,onScroll:this.onScroll,onRows:this.props.onRows}));},getScroll:function getScroll(){return this.refs.canvas.getScroll();},onScroll:function onScroll(scroll){this.updateScroll(scroll.scrollTop,scroll.scrollLeft,this.state.height,this.props.rowHeight,this.props.rowsCount);if(this.props.onScroll){this.props.onScroll({scrollTop:scroll.scrollTop,scrollLeft:scroll.scrollLeft});}},setScrollLeft:function setScrollLeft(scrollLeft){this.refs.canvas.setScrollLeft(scrollLeft);}});module.exports = Viewport; /***/}, /* 48 */function(module,exports,__webpack_require__){ /**
		 * @jsx React.DOM
		 */"use strict";var React=__webpack_require__(18);var joinClasses=__webpack_require__(21);var PropTypes=React.PropTypes;var cloneWithProps=__webpack_require__(30);var shallowEqual=__webpack_require__(28);var emptyFunction=__webpack_require__(37);var ScrollShim=__webpack_require__(49);var Row=__webpack_require__(50);var ExcelColumn=__webpack_require__(42);var Canvas=React.createClass({displayName:'Canvas',mixins:[ScrollShim],propTypes:{rowRenderer:PropTypes.oneOfType([PropTypes.func,PropTypes.element]),rowHeight:PropTypes.number.isRequired,height:PropTypes.number.isRequired,displayStart:PropTypes.number.isRequired,displayEnd:PropTypes.number.isRequired,rowsCount:PropTypes.number.isRequired,rowGetter:PropTypes.oneOfType([PropTypes.func.isRequired,PropTypes.array.isRequired]),onRows:PropTypes.func,columns:PropTypes.oneOfType([PropTypes.object,PropTypes.array]).isRequired},render:function render(){var _this=this;var displayStart=this.state.displayStart;var displayEnd=this.state.displayEnd;var rowHeight=this.props.rowHeight;var length=this.props.rowsCount;var rows=this.getRows(displayStart,displayEnd).map(function(row,idx){return _this.renderRow({key:displayStart + idx,ref:idx,idx:displayStart + idx,row:row,height:rowHeight,columns:_this.props.columns,isSelected:_this.isRowSelected(displayStart + idx),expandedRows:_this.props.expandedRows,cellMetaData:_this.props.cellMetaData});});this._currentRowsLength = rows.length;if(displayStart > 0){rows.unshift(this.renderPlaceholder('top',displayStart * rowHeight));}if(length - displayEnd > 0){rows.push(this.renderPlaceholder('bottom',(length - displayEnd) * rowHeight));}var style={position:'absolute',top:0,left:0,overflowX:'auto',overflowY:'scroll',width:this.props.totalWidth + this.state.scrollbarWidth,height:this.props.height,transform:'translate3d(0, 0, 0)'};return React.createElement('div',{style:style,onScroll:this.onScroll,className:joinClasses("react-grid-Canvas",this.props.className,{opaque:this.props.cellMetaData.selected && this.props.cellMetaData.selected.active})},React.createElement('div',{style:{width:this.props.width,overflow:'hidden'}},rows));},renderRow:function renderRow(props){var RowsRenderer=this.props.rowRenderer;if(typeof RowsRenderer === 'function'){return React.createElement(RowsRenderer,props);}else if(React.isValidElement(this.props.rowRenderer)){return cloneWithProps(this.props.rowRenderer,props);}},renderPlaceholder:function renderPlaceholder(key,height){return React.createElement('div',{key:key,style:{height:height}},this.props.columns.map(function(column,idx){return React.createElement('div',{style:{width:column.width},key:idx});}));},getDefaultProps:function getDefaultProps(){return {rowRenderer:Row,onRows:emptyFunction};},isRowSelected:function isRowSelected(rowIdx){return this.props.selectedRows && this.props.selectedRows[rowIdx] === true;},_currentRowsLength:0,_currentRowsRange:{start:0,end:0},_scroll:{scrollTop:0,scrollLeft:0},getInitialState:function getInitialState(){return {shouldUpdate:true,displayStart:this.props.displayStart,displayEnd:this.props.displayEnd,scrollbarWidth:0};},componentWillMount:function componentWillMount(){this._currentRowsLength = 0;this._currentRowsRange = {start:0,end:0};this._scroll = {scrollTop:0,scrollLeft:0};},componentDidMount:function componentDidMount(){this.onRows();},componentDidUpdate:function componentDidUpdate(nextProps){if(this._scroll.scrollTop !== 0 && this._scroll.scrollLeft !== 0){this.setScrollLeft(this._scroll.scrollLeft);}this.onRows();},componentWillUnmount:function componentWillUnmount(){this._currentRowsLength = 0;this._currentRowsRange = {start:0,end:0};this._scroll = {scrollTop:0,scrollLeft:0};},componentWillReceiveProps:function componentWillReceiveProps(nextProps){if(nextProps.rowsCount > this.props.rowsCount){React.findDOMNode(this).scrollTop = nextProps.rowsCount * this.props.rowHeight;}var scrollbarWidth=this.getScrollbarWidth();var shouldUpdate=!(nextProps.visibleStart > this.state.displayStart && nextProps.visibleEnd < this.state.displayEnd) || nextProps.rowsCount !== this.props.rowsCount || nextProps.rowHeight !== this.props.rowHeight || nextProps.columns !== this.props.columns || nextProps.width !== this.props.width || nextProps.cellMetaData !== this.props.cellMetaData || !shallowEqual(nextProps.style,this.props.style);if(shouldUpdate){this.setState({shouldUpdate:true,displayStart:nextProps.displayStart,displayEnd:nextProps.displayEnd,scrollbarWidth:scrollbarWidth});}else {this.setState({shouldUpdate:false,scrollbarWidth:scrollbarWidth});}},shouldComponentUpdate:function shouldComponentUpdate(nextProps,nextState){return !nextState || nextState.shouldUpdate;},onRows:function onRows(){if(this._currentRowsRange !== {start:0,end:0}){this.props.onRows(this._currentRowsRange);this._currentRowsRange = {start:0,end:0};}},getRows:function getRows(displayStart,displayEnd){this._currentRowsRange = {start:displayStart,end:displayEnd};if(Array.isArray(this.props.rowGetter)){return this.props.rowGetter.slice(displayStart,displayEnd);}else {var rows=[];for(var i=displayStart;i < displayEnd;i++) {rows.push(this.props.rowGetter(i));}return rows;}},getScrollbarWidth:function getScrollbarWidth(){var scrollbarWidth=0; // Get the scrollbar width
	var canvas=this.getDOMNode();scrollbarWidth = canvas.offsetWidth - canvas.clientWidth;return scrollbarWidth;},setScrollLeft:function setScrollLeft(scrollLeft){if(this._currentRowsLength !== 0){if(!this.refs)return;for(var i=0,len=this._currentRowsLength;i < len;i++) {if(this.refs[i] && this.refs[i].setScrollLeft){this.refs[i].setScrollLeft(scrollLeft);}}}},getScroll:function getScroll(){var _React$findDOMNode=React.findDOMNode(this);var scrollTop=_React$findDOMNode.scrollTop;var scrollLeft=_React$findDOMNode.scrollLeft;return {scrollTop:scrollTop,scrollLeft:scrollLeft};},onScroll:function onScroll(e){this.appendScrollShim();var _e$target=e.target;var scrollTop=_e$target.scrollTop;var scrollLeft=_e$target.scrollLeft;var scroll={scrollTop:scrollTop,scrollLeft:scrollLeft};this._scroll = scroll;this.props.onScroll(scroll);}});module.exports = Canvas; /***/}, /* 49 */function(module,exports,__webpack_require__){ /* TODO mixin not compatible and HTMLElement classList */ /**
		 * @jsx React.DOM


		 */'use strict';var React=__webpack_require__(18);var ScrollShim={appendScrollShim:function appendScrollShim(){if(!this._scrollShim){var size=this._scrollShimSize();var shim=document.createElement('div');if(shim.classList){shim.classList.add('react-grid-ScrollShim'); //flow - not compatible with HTMLElement
	}else {shim.className += ' react-grid-ScrollShim';}shim.style.position = 'absolute';shim.style.top = 0;shim.style.left = 0;shim.style.width = size.width + 'px';shim.style.height = size.height + 'px';React.findDOMNode(this).appendChild(shim);this._scrollShim = shim;}this._scheduleRemoveScrollShim();},_scrollShimSize:function _scrollShimSize(){return {width:this.props.width,height:this.props.length * this.props.rowHeight};},_scheduleRemoveScrollShim:function _scheduleRemoveScrollShim(){if(this._scheduleRemoveScrollShimTimer){clearTimeout(this._scheduleRemoveScrollShimTimer);}this._scheduleRemoveScrollShimTimer = setTimeout(this._removeScrollShim,200);},_removeScrollShim:function _removeScrollShim(){if(this._scrollShim){this._scrollShim.parentNode.removeChild(this._scrollShim);this._scrollShim = undefined;}}};module.exports = ScrollShim; /***/}, /* 50 */function(module,exports,__webpack_require__){ /**
		 * @jsx React.DOM


		 */'use strict';var _extends=__webpack_require__(2)['default'];var React=__webpack_require__(18);var joinClasses=__webpack_require__(21);var Cell=__webpack_require__(51);var ColumnMetrics=__webpack_require__(23);var ColumnUtilsMixin=__webpack_require__(25);var Row=React.createClass({displayName:'Row',propTypes:{height:React.PropTypes.number.isRequired,columns:React.PropTypes.oneOfType([React.PropTypes.object,React.PropTypes.array]).isRequired,row:React.PropTypes.object.isRequired,cellRenderer:React.PropTypes.func,isSelected:React.PropTypes.bool,idx:React.PropTypes.number.isRequired,expandedRows:React.PropTypes.arrayOf(React.PropTypes.object)},mixins:[ColumnUtilsMixin],render:function render(){var className=joinClasses('react-grid-Row','react-grid-Row--' + (this.props.idx % 2 === 0?'even':'odd'));var style={height:this.getRowHeight(this.props),overflow:'hidden'};var cells=this.getCells();return React.createElement('div',_extends({},this.props,{className:className,style:style,onDragEnter:this.handleDragEnter}),React.isValidElement(this.props.row)?this.props.row:cells);},getCells:function getCells(){var _this=this;var cells=[];var lockedCells=[];var selectedColumn=this.getSelectedColumn();this.props.columns.forEach(function(column,i){var CellRenderer=_this.props.cellRenderer;var cell=React.createElement(CellRenderer,{ref:i,key:column.key + '-' + i,idx:i,rowIdx:_this.props.idx,value:_this.getCellValue(column.key || i),column:column,height:_this.getRowHeight(),formatter:column.formatter,cellMetaData:_this.props.cellMetaData,rowData:_this.props.row,selectedColumn:selectedColumn,isRowSelected:_this.props.isSelected});if(column.locked){lockedCells.push(cell);}else {cells.push(cell);}});return cells.concat(lockedCells);},getRowHeight:function getRowHeight(){var rows=this.props.expandedRows || null;if(rows && this.props.key){var row=rows[this.props.key] || null;if(row){return row.height;}}return this.props.height;},getCellValue:function getCellValue(key){var val;if(key === 'select-row'){return this.props.isSelected;}else if(typeof this.props.row.get === 'function'){val = this.props.row.get(key);}else {val = this.props.row[key];}return val;},renderCell:function renderCell(props){if(typeof this.props.cellRenderer == 'function'){this.props.cellRenderer.call(this,props);}if(React.isValidElement(this.props.cellRenderer)){return cloneWithProps(this.props.cellRenderer,props);}else {return this.props.cellRenderer(props);}},getDefaultProps:function getDefaultProps(){return {cellRenderer:Cell,isSelected:false,height:35};},setScrollLeft:function setScrollLeft(scrollLeft){var _this2=this;this.props.columns.forEach(function(column,i){if(column.locked){if(!_this2.refs[i])return;_this2.refs[i].setScrollLeft(scrollLeft);}});},doesRowContainSelectedCell:function doesRowContainSelectedCell(props){var selected=props.cellMetaData.selected;if(selected && selected.rowIdx === props.idx){return true;}else {return false;}},willRowBeDraggedOver:function willRowBeDraggedOver(props){var dragged=props.cellMetaData.dragged;return dragged != null && (dragged.rowIdx >= 0 || dragged.complete === true);},hasRowBeenCopied:function hasRowBeenCopied(){var copied=this.props.cellMetaData.copied;return copied != null && copied.rowIdx === this.props.idx;},shouldComponentUpdate:function shouldComponentUpdate(nextProps,nextState){return !ColumnMetrics.sameColumns(this.props.columns,nextProps.columns,ColumnMetrics.sameColumn) || this.doesRowContainSelectedCell(this.props) || this.doesRowContainSelectedCell(nextProps) || this.willRowBeDraggedOver(nextProps) || nextProps.row !== this.props.row || this.hasRowBeenCopied() || this.props.isSelected !== nextProps.isSelected || nextProps.height !== this.props.height;},handleDragEnter:function handleDragEnter(){var handleDragEnterRow=this.props.cellMetaData.handleDragEnterRow;if(handleDragEnterRow){handleDragEnterRow(this.props.idx);}},getSelectedColumn:function getSelectedColumn(){var selected=this.props.cellMetaData.selected;if(selected && selected.idx){return this.getColumn(this.props.columns,selected.idx);}}});module.exports = Row; /***/}, /* 51 */function(module,exports,__webpack_require__){ /**
		 * @jsx React.DOM


		 */'use strict';var _extends=__webpack_require__(2)['default'];var React=__webpack_require__(18);var joinClasses=__webpack_require__(21);var cloneWithProps=__webpack_require__(30);var EditorContainer=__webpack_require__(52);var ExcelColumn=__webpack_require__(42);var isFunction=__webpack_require__(74);var CellMetaDataShape=__webpack_require__(75);var Cell=React.createClass({displayName:'Cell',propTypes:{rowIdx:React.PropTypes.number.isRequired,idx:React.PropTypes.number.isRequired,selected:React.PropTypes.shape({idx:React.PropTypes.number.isRequired}),tabIndex:React.PropTypes.number,ref:React.PropTypes.string,column:React.PropTypes.shape(ExcelColumn).isRequired,value:React.PropTypes.oneOfType([React.PropTypes.string,React.PropTypes.number,React.PropTypes.object,React.PropTypes.bool]).isRequired,isExpanded:React.PropTypes.bool,cellMetaData:React.PropTypes.shape(CellMetaDataShape).isRequired,handleDragStart:React.PropTypes.func,className:React.PropTypes.string,rowData:React.PropTypes.object.isRequired},getDefaultProps:function getDefaultProps(){return {tabIndex:-1,ref:"cell",isExpanded:false};},getInitialState:function getInitialState(){return {isRowChanging:false,isCellValueChanging:false};},componentDidMount:function componentDidMount(){this.checkFocus();},componentDidUpdate:function componentDidUpdate(prevProps,prevState){this.checkFocus();var dragged=this.props.cellMetaData.dragged;if(dragged && dragged.complete === true){this.props.cellMetaData.handleTerminateDrag();}if(this.state.isRowChanging && this.props.selectedColumn != null){this.applyUpdateClass();}},componentWillReceiveProps:function componentWillReceiveProps(nextProps){this.setState({isRowChanging:this.props.rowData !== nextProps.rowData,isCellValueChanging:this.props.value !== nextProps.value});},shouldComponentUpdate:function shouldComponentUpdate(nextProps,nextState){return this.props.column.width !== nextProps.column.width || this.props.column.left !== nextProps.column.left || this.props.rowData !== nextProps.rowData || this.props.height !== nextProps.height || this.props.rowIdx !== nextProps.rowIdx || this.isCellSelectionChanging(nextProps) || this.isDraggedCellChanging(nextProps) || this.isCopyCellChanging(nextProps) || this.props.isRowSelected !== nextProps.isRowSelected || this.isSelected();},getStyle:function getStyle(){var style={position:'absolute',width:this.props.column.width,height:this.props.height,left:this.props.column.left};return style;},render:function render(){var style=this.getStyle();var className=this.getCellClass();var cellContent=this.renderCellContent({value:this.props.value,column:this.props.column,rowIdx:this.props.rowIdx,isExpanded:this.props.isExpanded});return React.createElement('div',_extends({},this.props,{className:className,style:style,onClick:this.onCellClick,onDoubleClick:this.onCellDoubleClick}),cellContent,React.createElement('div',{className:'drag-handle',draggable:'true'}));},renderCellContent:function renderCellContent(props){var CellContent;var Formatter=this.getFormatter();if(React.isValidElement(Formatter)){props.dependentValues = this.getFormatterDependencies();CellContent = cloneWithProps(Formatter,props);}else if(isFunction(Formatter)){CellContent = React.createElement(Formatter,{value:this.props.value,dependentValues:this.getFormatterDependencies()});}else {CellContent = React.createElement(SimpleCellFormatter,{value:this.props.value});}return React.createElement('div',{ref:'cell',className:'react-grid-Cell__value'},CellContent,' ',this.props.cellControls);},isColumnSelected:function isColumnSelected(){var meta=this.props.cellMetaData;if(meta == null || meta.selected == null){return false;}return meta.selected && meta.selected.idx === this.props.idx;},isSelected:function isSelected(){var meta=this.props.cellMetaData;if(meta == null || meta.selected == null){return false;}return meta.selected && meta.selected.rowIdx === this.props.rowIdx && meta.selected.idx === this.props.idx;},isActive:function isActive(){var meta=this.props.cellMetaData;if(meta == null || meta.selected == null){return false;}return this.isSelected() && meta.selected.active === true;},isCellSelectionChanging:function isCellSelectionChanging(nextProps){var meta=this.props.cellMetaData;if(meta == null || meta.selected == null){return false;}var nextSelected=nextProps.cellMetaData.selected;if(meta.selected && nextSelected){return this.props.idx === nextSelected.idx || this.props.idx === meta.selected.idx;}else {return true;}},getFormatter:function getFormatter(){var col=this.props.column;if(this.isActive()){return React.createElement(EditorContainer,{rowData:this.getRowData(),rowIdx:this.props.rowIdx,idx:this.props.idx,cellMetaData:this.props.cellMetaData,column:col,height:this.props.height});}else {return this.props.column.formatter;}},getRowData:function getRowData(){return this.props.rowData.toJSON?this.props.rowData.toJSON():this.props.rowData;},getFormatterDependencies:function getFormatterDependencies(){ //clone row data so editor cannot actually change this
	var columnName=this.props.column.ItemId; //convention based method to get corresponding Id or Name of any Name or Id property
	if(typeof this.props.column.getRowMetaData === 'function'){return this.props.column.getRowMetaData(this.getRowData(),this.props.column);}},onCellClick:function onCellClick(e){var meta=this.props.cellMetaData;if(meta != null && meta.onCellClick != null){meta.onCellClick({rowIdx:this.props.rowIdx,idx:this.props.idx});}},onCellDoubleClick:function onCellDoubleClick(e){var meta=this.props.cellMetaData;if(meta != null && meta.onCellDoubleClick != null){meta.onCellDoubleClick({rowIdx:this.props.rowIdx,idx:this.props.idx});}},checkFocus:function checkFocus(){if(this.isSelected() && !this.isActive()){React.findDOMNode(this).focus();}},getCellClass:function getCellClass(){var className=joinClasses(this.props.column.cellClass,'react-grid-Cell',this.props.className,this.props.column.locked?'react-grid-Cell--locked':null);var extraClasses=joinClasses({'selected':this.isSelected() && !this.isActive(),'editing':this.isActive(),'copied':this.isCopied(),'active-drag-cell':this.isSelected() || this.isDraggedOver(),'is-dragged-over-up':this.isDraggedOverUpwards(),'is-dragged-over-down':this.isDraggedOverDownwards(),'was-dragged-over':this.wasDraggedOver()});return joinClasses(className,extraClasses);},getUpdateCellClass:function getUpdateCellClass(){return this.props.column.getUpdateCellClass?this.props.column.getUpdateCellClass(this.props.selectedColumn,this.props.column,this.state.isCellValueChanging):'';},applyUpdateClass:function applyUpdateClass(){var updateCellClass=this.getUpdateCellClass(); // -> removing the class
	if(updateCellClass != null && updateCellClass != ""){var cellDOMNode=this.getDOMNode();if(cellDOMNode.classList){cellDOMNode.classList.remove(updateCellClass); // -> and re-adding the class
	cellDOMNode.classList.add(updateCellClass);}else if(cellDOMNode.className.indexOf(updateCellClass) === -1){ // IE9 doesn't support classList, nor (I think) altering element.className
	// without replacing it wholesale.
	cellDOMNode.className = cellDOMNode.className + ' ' + updateCellClass;}}},setScrollLeft:function setScrollLeft(scrollLeft){var ctrl=this; //flow on windows has an outdated react declaration, once that gets updated, we can remove this
	if(ctrl.isMounted()){var node=React.findDOMNode(this);var transform='translate3d(' + scrollLeft + 'px, 0px, 0px)';node.style.webkitTransform = transform;node.style.transform = transform;}},isCopied:function isCopied(){var copied=this.props.cellMetaData.copied;return copied && copied.rowIdx === this.props.rowIdx && copied.idx === this.props.idx;},isDraggedOver:function isDraggedOver(){var dragged=this.props.cellMetaData.dragged;return dragged && dragged.overRowIdx === this.props.rowIdx && dragged.idx === this.props.idx;},wasDraggedOver:function wasDraggedOver(){var dragged=this.props.cellMetaData.dragged;return dragged && (dragged.overRowIdx < this.props.rowIdx && this.props.rowIdx < dragged.rowIdx || dragged.overRowIdx > this.props.rowIdx && this.props.rowIdx > dragged.rowIdx) && dragged.idx === this.props.idx;},isDraggedCellChanging:function isDraggedCellChanging(nextProps){var isChanging;var dragged=this.props.cellMetaData.dragged;var nextDragged=nextProps.cellMetaData.dragged;if(dragged){isChanging = nextDragged && this.props.idx === nextDragged.idx || dragged && this.props.idx === dragged.idx;return isChanging;}else {return false;}},isCopyCellChanging:function isCopyCellChanging(nextProps){var isChanging;var copied=this.props.cellMetaData.copied;var nextCopied=nextProps.cellMetaData.copied;if(copied){isChanging = nextCopied && this.props.idx === nextCopied.idx || copied && this.props.idx === copied.idx;return isChanging;}else {return false;}},isDraggedOverUpwards:function isDraggedOverUpwards(){var dragged=this.props.cellMetaData.dragged;return !this.isSelected() && this.isDraggedOver() && this.props.rowIdx < dragged.rowIdx;},isDraggedOverDownwards:function isDraggedOverDownwards(){var dragged=this.props.cellMetaData.dragged;return !this.isSelected() && this.isDraggedOver() && this.props.rowIdx > dragged.rowIdx;}});var SimpleCellFormatter=React.createClass({displayName:'SimpleCellFormatter',propTypes:{value:React.PropTypes.oneOfType([React.PropTypes.string,React.PropTypes.number,React.PropTypes.object,React.PropTypes.bool]).isRequired},render:function render(){return React.createElement('span',null,this.props.value);},shouldComponentUpdate:function shouldComponentUpdate(nextProps,nextState){return nextProps.value !== this.props.value;}});module.exports = Cell; /***/}, /* 52 */function(module,exports,__webpack_require__){ /**
		* @jsx React.DOM


		*/'use strict';var React=__webpack_require__(18);var joinClasses=__webpack_require__(21);var keyboardHandlerMixin=__webpack_require__(53);var SimpleTextEditor=__webpack_require__(54);var isFunction=__webpack_require__(74);var cloneWithProps=__webpack_require__(30);var EditorContainer=React.createClass({displayName:'EditorContainer',mixins:[keyboardHandlerMixin],propTypes:{rowData:React.PropTypes.object.isRequired,value:React.PropTypes.oneOfType([React.PropTypes.string,React.PropTypes.number,React.PropTypes.object,React.PropTypes.bool]).isRequired,cellMetaData:React.PropTypes.shape({selected:React.PropTypes.object.isRequired,copied:React.PropTypes.object,dragged:React.PropTypes.object,onCellClick:React.PropTypes.func,onCellDoubleClick:React.PropTypes.func}).isRequired,column:React.PropTypes.object.isRequired,height:React.PropTypes.number.isRequired},changeCommitted:false,getInitialState:function getInitialState(){return {isInvalid:false};},componentDidMount:function componentDidMount(){var inputNode=this.getInputNode();if(inputNode !== undefined){this.setTextInputFocus();if(!this.getEditor().disableContainerStyles){inputNode.className += ' editor-main';inputNode.style.height = this.props.height - 1 + 'px';}}},createEditor:function createEditor(){var _this=this;var editorRef=function editorRef(c){return _this.editor = c;};var editorProps={ref:editorRef,column:this.props.column,value:this.getInitialValue(),onCommit:this.commit,rowMetaData:this.getRowMetaData(),height:this.props.height,onBlur:this.commit,onOverrideKeyDown:this.onKeyDown};var customEditor=this.props.column.editor;if(customEditor && React.isValidElement(customEditor)){ //return custom column editor or SimpleEditor if none specified
	return cloneWithProps(customEditor,editorProps);}else {return React.createElement(SimpleTextEditor,{ref:editorRef,column:this.props.column,value:this.getInitialValue(),onBlur:this.commit,rowMetaData:this.getRowMetaData()});}},getRowMetaData:function getRowMetaData(){ //clone row data so editor cannot actually change this
	var columnName=this.props.column.ItemId; //convention based method to get corresponding Id or Name of any Name or Id property
	if(typeof this.props.column.getRowMetaData === 'function'){return this.props.column.getRowMetaData(this.props.rowData,this.props.column);}},onPressEnter:function onPressEnter(e){this.commit({key:'Enter'});},onPressTab:function onPressTab(e){this.commit({key:'Tab'});},onPressEscape:function onPressEscape(e){if(!this.editorIsSelectOpen()){this.props.cellMetaData.onCommitCancel();}else { // prevent event from bubbling if editor has results to select
	e.stopPropagation();}},onPressArrowDown:function onPressArrowDown(e){if(this.editorHasResults()){ //dont want to propogate as that then moves us round the grid
	e.stopPropagation();}else {this.commit(e);}},onPressArrowUp:function onPressArrowUp(e){if(this.editorHasResults()){ //dont want to propogate as that then moves us round the grid
	e.stopPropagation();}else {this.commit(e);}},onPressArrowLeft:function onPressArrowLeft(e){ //prevent event propogation. this disables left cell navigation
	if(!this.isCaretAtBeginningOfInput()){e.stopPropagation();}else {this.commit(e);}},onPressArrowRight:function onPressArrowRight(e){ //prevent event propogation. this disables right cell navigation
	if(!this.isCaretAtEndOfInput()){e.stopPropagation();}else {this.commit(e);}},editorHasResults:function editorHasResults(){if(isFunction(this.getEditor().hasResults)){return this.getEditor().hasResults();}else {return false;}},editorIsSelectOpen:function editorIsSelectOpen(){if(isFunction(this.getEditor().isSelectOpen)){return this.getEditor().isSelectOpen();}else {return false;}},getEditor:function getEditor(){return this.editor;},commit:function commit(args){var opts=args || {};var updated=this.getEditor().getValue();if(this.isNewValueValid(updated)){var cellKey=this.props.column.key;this.props.cellMetaData.onCommit({cellKey:cellKey,rowIdx:this.props.rowIdx,updated:updated,key:opts.key});}this.changeCommitted = true;},isNewValueValid:function isNewValueValid(value){if(isFunction(this.getEditor().validate)){var isValid=this.getEditor().validate(value);this.setState({isInvalid:!isValid});return isValid;}else {return true;}},getInputNode:function getInputNode(){return this.getEditor().getInputNode();},getInitialValue:function getInitialValue(){var selected=this.props.cellMetaData.selected;var keyCode=selected.initialKeyCode;if(keyCode === 'Delete' || keyCode === 'Backspace'){return '';}else if(keyCode === 'Enter'){return this.props.value;}else {var text=keyCode?String.fromCharCode(keyCode):this.props.value;return text;}},getContainerClass:function getContainerClass(){return joinClasses({'has-error':this.state.isInvalid === true});},renderStatusIcon:function renderStatusIcon(){if(this.state.isInvalid === true){return React.createElement('span',{className:'glyphicon glyphicon-remove form-control-feedback'});}},render:function render(){return React.createElement('div',{className:this.getContainerClass(),onKeyDown:this.onKeyDown},this.createEditor(),this.renderStatusIcon());},setCaretAtEndOfInput:function setCaretAtEndOfInput(){var input=this.getInputNode(); //taken from http://stackoverflow.com/questions/511088/use-javascript-to-place-cursor-at-end-of-text-in-text-input-element
	var txtLength=input.value.length;if(input.setSelectionRange){input.setSelectionRange(txtLength,txtLength);}else if(input.createTextRange){var fieldRange=input.createTextRange();fieldRange.moveStart('character',txtLength);fieldRange.collapse();fieldRange.select();}},isCaretAtBeginningOfInput:function isCaretAtBeginningOfInput(){var inputNode=this.getInputNode();return inputNode.selectionStart === inputNode.selectionEnd && inputNode.selectionStart === 0;},isCaretAtEndOfInput:function isCaretAtEndOfInput(){var inputNode=this.getInputNode();return inputNode.selectionStart === inputNode.value.length;},setTextInputFocus:function setTextInputFocus(){var selected=this.props.cellMetaData.selected;var keyCode=selected.initialKeyCode;var inputNode=this.getInputNode();inputNode.focus();if(inputNode.tagName === "INPUT"){if(!this.isKeyPrintable(keyCode)){inputNode.focus();inputNode.select();}else {inputNode.select();}}},componentWillUnmount:function componentWillUnmount(){if(!this.changeCommitted && !this.hasEscapeBeenPressed()){this.commit({key:'Enter'});}},hasEscapeBeenPressed:function hasEscapeBeenPressed(){var pressed=false;var escapeKey=27;if(window.event){if(window.event.keyCode === escapeKey){pressed = true;}else if(window.event.which === escapeKey){pressed = true;}}return pressed;}});module.exports = EditorContainer; /***/}, /* 53 */function(module,exports,__webpack_require__){ /* TODO: mixins */ /**
		 * @jsx React.DOM


		 */'use strict';var React=__webpack_require__(18);var KeyboardHandlerMixin={onKeyDown:function onKeyDown(e){if(this.isCtrlKeyHeldDown(e)){this.checkAndCall('onPressKeyWithCtrl',e);}else if(this.isKeyExplicitlyHandled(e.key)){ //break up individual keyPress events to have their own specific callbacks
	//this allows multiple mixins to listen to onKeyDown events and somewhat reduces methodName clashing
	var callBack='onPress' + e.key;this.checkAndCall(callBack,e);}else if(this.isKeyPrintable(e.keyCode)){this.checkAndCall('onPressChar',e);}}, //taken from http://stackoverflow.com/questions/12467240/determine-if-javascript-e-keycode-is-a-printable-non-control-character
	isKeyPrintable:function isKeyPrintable(keycode){var valid=keycode > 47 && keycode < 58 ||  // number keys
	keycode == 32 || keycode == 13 ||  // spacebar & return key(s) (if you want to allow carriage returns)
	keycode > 64 && keycode < 91 ||  // letter keys
	keycode > 95 && keycode < 112 ||  // numpad keys
	keycode > 185 && keycode < 193 ||  // ;=,-./` (in order)
	keycode > 218 && keycode < 223; // [\]' (in order)
	return valid;},isKeyExplicitlyHandled:function isKeyExplicitlyHandled(key){return typeof this['onPress' + key] === 'function';},isCtrlKeyHeldDown:function isCtrlKeyHeldDown(e){return e.ctrlKey === true && e.key !== "Control";},checkAndCall:function checkAndCall(methodName,args){if(typeof this[methodName] === 'function'){this[methodName](args);}}};module.exports = KeyboardHandlerMixin; /***/}, /* 54 */function(module,exports,__webpack_require__){ /**
		 * @jsx React.DOM


		 */'use strict';var _get=__webpack_require__(55)['default'];var _inherits=__webpack_require__(61)['default'];var _createClass=__webpack_require__(70)['default'];var _classCallCheck=__webpack_require__(43)['default'];var React=__webpack_require__(18);var keyboardHandlerMixin=__webpack_require__(53);var ExcelColumn=__webpack_require__(42);var EditorBase=__webpack_require__(73);var SimpleTextEditor=(function(_EditorBase){_inherits(SimpleTextEditor,_EditorBase);function SimpleTextEditor(){_classCallCheck(this,SimpleTextEditor);_get(Object.getPrototypeOf(SimpleTextEditor.prototype),'constructor',this).apply(this,arguments);}_createClass(SimpleTextEditor,[{key:'render',value:function render(){return React.createElement('input',{ref:'input',type:'text',onBlur:this.props.onBlur,className:'form-control',defaultValue:this.props.value});}}]);return SimpleTextEditor;})(EditorBase);;module.exports = SimpleTextEditor; /***/}, /* 55 */function(module,exports,__webpack_require__){"use strict";var _Object$getOwnPropertyDescriptor=__webpack_require__(56)["default"];exports["default"] = function get(_x,_x2,_x3){var _again=true;_function: while(_again) {var object=_x,property=_x2,receiver=_x3;_again = false;if(object === null)object = Function.prototype;var desc=_Object$getOwnPropertyDescriptor(object,property);if(desc === undefined){var parent=Object.getPrototypeOf(object);if(parent === null){return undefined;}else {_x = parent;_x2 = property;_x3 = receiver;_again = true;desc = parent = undefined;continue _function;}}else if("value" in desc){return desc.value;}else {var getter=desc.get;if(getter === undefined){return undefined;}return getter.call(receiver);}}};exports.__esModule = true; /***/}, /* 56 */function(module,exports,__webpack_require__){module.exports = {"default":__webpack_require__(57),__esModule:true}; /***/}, /* 57 */function(module,exports,__webpack_require__){var $=__webpack_require__(12);__webpack_require__(58);module.exports = function getOwnPropertyDescriptor(it,key){return $.getDesc(it,key);}; /***/}, /* 58 */function(module,exports,__webpack_require__){ // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	var toIObject=__webpack_require__(59);__webpack_require__(60)('getOwnPropertyDescriptor',function($getOwnPropertyDescriptor){return function getOwnPropertyDescriptor(it,key){return $getOwnPropertyDescriptor(toIObject(it),key);};}); /***/}, /* 59 */function(module,exports,__webpack_require__){ // to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject=__webpack_require__(15),defined=__webpack_require__(14);module.exports = function(it){return IObject(defined(it));}; /***/}, /* 60 */function(module,exports,__webpack_require__){ // most Object methods by ES6 should accept primitives
	var $export=__webpack_require__(6),core=__webpack_require__(8),fails=__webpack_require__(17);module.exports = function(KEY,exec){var fn=(core.Object || {})[KEY] || Object[KEY],exp={};exp[KEY] = exec(fn);$export($export.S + $export.F * fails(function(){fn(1);}),'Object',exp);}; /***/}, /* 61 */function(module,exports,__webpack_require__){"use strict";var _Object$create=__webpack_require__(62)["default"];var _Object$setPrototypeOf=__webpack_require__(64)["default"];exports["default"] = function(subClass,superClass){if(typeof superClass !== "function" && superClass !== null){throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = _Object$create(superClass && superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)_Object$setPrototypeOf?_Object$setPrototypeOf(subClass,superClass):subClass.__proto__ = superClass;};exports.__esModule = true; /***/}, /* 62 */function(module,exports,__webpack_require__){module.exports = {"default":__webpack_require__(63),__esModule:true}; /***/}, /* 63 */function(module,exports,__webpack_require__){var $=__webpack_require__(12);module.exports = function create(P,D){return $.create(P,D);}; /***/}, /* 64 */function(module,exports,__webpack_require__){module.exports = {"default":__webpack_require__(65),__esModule:true}; /***/}, /* 65 */function(module,exports,__webpack_require__){__webpack_require__(66);module.exports = __webpack_require__(8).Object.setPrototypeOf; /***/}, /* 66 */function(module,exports,__webpack_require__){ // 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export=__webpack_require__(6);$export($export.S,'Object',{setPrototypeOf:__webpack_require__(67).set}); /***/}, /* 67 */function(module,exports,__webpack_require__){ // Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */var getDesc=__webpack_require__(12).getDesc,isObject=__webpack_require__(68),anObject=__webpack_require__(69);var check=function check(O,proto){anObject(O);if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");};module.exports = {set:_Object$setPrototypeOf2 || ('__proto__' in {}? // eslint-disable-line
	(function(test,buggy,set){try{set = __webpack_require__(9)(Function.call,getDesc(Object.prototype,'__proto__').set,2);set(test,[]);buggy = !(test instanceof Array);}catch(e) {buggy = true;}return function setPrototypeOf(O,proto){check(O,proto);if(buggy)O.__proto__ = proto;else set(O,proto);return O;};})({},false):undefined),check:check}; /***/}, /* 68 */function(module,exports){module.exports = function(it){return typeof it === 'object'?it !== null:typeof it === 'function';}; /***/}, /* 69 */function(module,exports,__webpack_require__){var isObject=__webpack_require__(68);module.exports = function(it){if(!isObject(it))throw TypeError(it + ' is not an object!');return it;}; /***/}, /* 70 */function(module,exports,__webpack_require__){"use strict";var _Object$defineProperty=__webpack_require__(71)["default"];exports["default"] = (function(){function defineProperties(target,props){for(var i=0;i < props.length;i++) {var descriptor=props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if("value" in descriptor)descriptor.writable = true;_Object$defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};})();exports.__esModule = true; /***/}, /* 71 */function(module,exports,__webpack_require__){module.exports = {"default":__webpack_require__(72),__esModule:true}; /***/}, /* 72 */function(module,exports,__webpack_require__){var $=__webpack_require__(12);module.exports = function defineProperty(it,key,desc){return $.setDesc(it,key,desc);}; /***/}, /* 73 */function(module,exports,__webpack_require__){ /**
		 * @jsx React.DOM


		 */'use strict';var _get=__webpack_require__(55)['default'];var _inherits=__webpack_require__(61)['default'];var _createClass=__webpack_require__(70)['default'];var _classCallCheck=__webpack_require__(43)['default'];var React=__webpack_require__(18);var keyboardHandlerMixin=__webpack_require__(53);var ExcelColumn=__webpack_require__(42);var EditorBase=(function(_React$Component){_inherits(EditorBase,_React$Component);function EditorBase(){_classCallCheck(this,EditorBase);_get(Object.getPrototypeOf(EditorBase.prototype),'constructor',this).apply(this,arguments);}_createClass(EditorBase,[{key:'getStyle',value:function getStyle(){return {width:'100%'};}},{key:'getValue',value:function getValue(){var updated={};updated[this.props.column.key] = this.getInputNode().value;return updated;}},{key:'getInputNode',value:function getInputNode(){var domNode=React.findDOMNode(this);if(domNode.tagName === 'INPUT'){return domNode;}else {return domNode.querySelector("input:not([type=hidden])");}}},{key:'inheritContainerStyles',value:function inheritContainerStyles(){return true;}}]);return EditorBase;})(React.Component);EditorBase.propTypes = {onKeyDown:React.PropTypes.func.isRequired,value:React.PropTypes.any.isRequired,onBlur:React.PropTypes.func.isRequired,column:React.PropTypes.shape(ExcelColumn).isRequired,commit:React.PropTypes.func.isRequired};module.exports = EditorBase; /***/}, /* 74 */function(module,exports){"use strict";var isFunction=function isFunction(functionToCheck){var getType={};return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';};module.exports = isFunction; /***/}, /* 75 */function(module,exports,__webpack_require__){'use strict';var PropTypes=__webpack_require__(18).PropTypes;module.exports = {selected:PropTypes.object.isRequired,copied:PropTypes.object,dragged:PropTypes.object,onCellClick:PropTypes.func.isRequired}; /***/}, /* 76 */function(module,exports,__webpack_require__){ /* TODO mixins */'use strict';var React=__webpack_require__(18);var DOMMetrics=__webpack_require__(77);var getWindowSize=__webpack_require__(78);var PropTypes=React.PropTypes;var min=Math.min;var max=Math.max;var floor=Math.floor;var ceil=Math.ceil;module.exports = {mixins:[DOMMetrics.MetricsMixin],DOMMetrics:{viewportHeight:function viewportHeight(){return React.findDOMNode(this).offsetHeight;}},propTypes:{rowHeight:React.PropTypes.number,rowsCount:React.PropTypes.number.isRequired},getDefaultProps:function getDefaultProps(){return {rowHeight:30};},getInitialState:function getInitialState(){return this.getGridState(this.props);},getGridState:function getGridState(props){var renderedRowsCount=ceil((props.minHeight - props.rowHeight) / props.rowHeight);var totalRowCount=min(renderedRowsCount * 2,props.rowsCount);return {displayStart:0,displayEnd:totalRowCount,height:props.minHeight,scrollTop:0,scrollLeft:0};},updateScroll:function updateScroll(scrollTop,scrollLeft,height,rowHeight,length){var renderedRowsCount=ceil(height / rowHeight);var visibleStart=floor(scrollTop / rowHeight);var visibleEnd=min(visibleStart + renderedRowsCount,length);var displayStart=max(0,visibleStart - renderedRowsCount * 2);var displayEnd=min(visibleStart + renderedRowsCount * 2,length);var nextScrollState={visibleStart:visibleStart,visibleEnd:visibleEnd,displayStart:displayStart,displayEnd:displayEnd,height:height,scrollTop:scrollTop,scrollLeft:scrollLeft};this.setState(nextScrollState);},metricsUpdated:function metricsUpdated(){var height=this.DOMMetrics.viewportHeight();if(height){this.updateScroll(this.state.scrollTop,this.state.scrollLeft,height,this.props.rowHeight,this.props.rowsCount);}},componentWillReceiveProps:function componentWillReceiveProps(nextProps){if(this.props.rowHeight !== nextProps.rowHeight || this.props.minHeight !== nextProps.minHeight){this.setState(this.getGridState(nextProps));}else if(this.props.rowsCount !== nextProps.rowsCount){this.updateScroll(this.state.scrollTop,this.state.scrollLeft,this.state.height,nextProps.rowHeight,nextProps.rowsCount);}}}; /***/}, /* 77 */function(module,exports,__webpack_require__){ /* TODO mixin and invarient splat */ /**
		 * @jsx React.DOM


		 */'use strict';var React=__webpack_require__(18);var emptyFunction=__webpack_require__(37);var shallowCloneObject=__webpack_require__(22);var contextTypes={metricsComputator:React.PropTypes.object};var MetricsComputatorMixin={childContextTypes:contextTypes,getChildContext:function getChildContext(){return {metricsComputator:this};},getMetricImpl:function getMetricImpl(name){return this._DOMMetrics.metrics[name].value;},registerMetricsImpl:function registerMetricsImpl(component,metrics){var getters={};var s=this._DOMMetrics;for(var name in metrics) {if(s.metrics[name] !== undefined){throw new Error('DOM metric ' + name + ' is already defined');}s.metrics[name] = {component:component,computator:metrics[name].bind(component)};getters[name] = this.getMetricImpl.bind(null,name);}if(s.components.indexOf(component) === -1){s.components.push(component);}return getters;},unregisterMetricsFor:function unregisterMetricsFor(component){var s=this._DOMMetrics;var idx=s.components.indexOf(component);if(idx > -1){s.components.splice(idx,1);var name;var metricsToDelete={};for(name in s.metrics) {if(s.metrics[name].component === component){metricsToDelete[name] = true;}}for(name in metricsToDelete) {delete s.metrics[name];}}},updateMetrics:function updateMetrics(){var s=this._DOMMetrics;var needUpdate=false;for(var name in s.metrics) {var newMetric=s.metrics[name].computator();if(newMetric !== s.metrics[name].value){needUpdate = true;}s.metrics[name].value = newMetric;}if(needUpdate){for(var i=0,len=s.components.length;i < len;i++) {if(s.components[i].metricsUpdated){s.components[i].metricsUpdated();}}}},componentWillMount:function componentWillMount(){this._DOMMetrics = {metrics:{},components:[]};},componentDidMount:function componentDidMount(){if(window.addEventListener){window.addEventListener('resize',this.updateMetrics);}else {window.attachEvent('resize',this.updateMetrics);}this.updateMetrics();},componentWillUnmount:function componentWillUnmount(){window.removeEventListener('resize',this.updateMetrics);}};var MetricsMixin={contextTypes:contextTypes,componentWillMount:function componentWillMount(){if(this.DOMMetrics){this._DOMMetricsDefs = shallowCloneObject(this.DOMMetrics);this.DOMMetrics = {};for(var name in this._DOMMetricsDefs) {this.DOMMetrics[name] = emptyFunction;}}},componentDidMount:function componentDidMount(){if(this.DOMMetrics){this.DOMMetrics = this.registerMetrics(this._DOMMetricsDefs);}},componentWillUnmount:function componentWillUnmount(){if(!this.registerMetricsImpl){return this.context.metricsComputator.unregisterMetricsFor(this);}if(this.hasOwnProperty('DOMMetrics')){delete this.DOMMetrics;}},registerMetrics:function registerMetrics(metrics){if(this.registerMetricsImpl){return this.registerMetricsImpl(this,metrics);}else {return this.context.metricsComputator.registerMetricsImpl(this,metrics);}},getMetric:function getMetric(name){if(this.getMetricImpl){return this.getMetricImpl(name);}else {return this.context.metricsComputator.getMetricImpl(name);}}};module.exports = {MetricsComputatorMixin:MetricsComputatorMixin,MetricsMixin:MetricsMixin}; /***/}, /* 78 */function(module,exports){ /**
		 * @jsx React.DOM



		 */'use strict'; /**
		 * Return window's height and width
		 *
		 * @return {Object} height and width of the window
		 */function getWindowSize(){var width=window.innerWidth;var height=window.innerHeight;if(!width || !height){width = document.documentElement.clientWidth;height = document.documentElement.clientHeight;}if(!width || !height){width = document.body.clientWidth;height = document.body.clientHeight;}return {width:width,height:height};}module.exports = getWindowSize; /***/}, /* 79 */function(module,exports){ /* TODO mixins */"use strict";module.exports = {componentDidMount:function componentDidMount(){this._scrollLeft = this.refs.viewport?this.refs.viewport.getScroll().scrollLeft:0;this._onScroll();},componentDidUpdate:function componentDidUpdate(){this._onScroll();},componentWillMount:function componentWillMount(){this._scrollLeft = undefined;},componentWillUnmount:function componentWillUnmount(){this._scrollLeft = undefined;},onScroll:function onScroll(props){if(this._scrollLeft !== props.scrollLeft){this._scrollLeft = props.scrollLeft;this._onScroll();}},_onScroll:function _onScroll(){if(this._scrollLeft !== undefined){this.refs.header.setScrollLeft(this._scrollLeft);if(this.refs.viewport){this.refs.viewport.setScrollLeft(this._scrollLeft);}}}}; /***/}, /* 80 */function(module,exports,__webpack_require__){ /**
		 * @jsx React.DOM
		 */'use strict';var React=__webpack_require__(18);var CheckboxEditor=React.createClass({displayName:'CheckboxEditor',PropTypes:{value:React.PropTypes.bool.isRequired,rowIdx:React.PropTypes.number.isRequired,column:React.PropTypes.shape({key:React.PropTypes.string.isRequired,onCellChange:React.PropTypes.func.isRequired}).isRequired},render:function render(){var checked=this.props.value != null?this.props.value:false;return React.createElement('input',{className:'react-grid-CheckBox',type:'checkbox',checked:checked,onClick:this.handleChange});},handleChange:function handleChange(e){this.props.column.onCellChange(this.props.rowIdx,this.props.column.key,e);}});module.exports = CheckboxEditor; /***/}, /* 81 */function(module,exports,__webpack_require__){ /**
		 * @jsx React.DOM


		 */'use strict';var React=__webpack_require__(18);var ExcelColumn=__webpack_require__(42);var FilterableHeaderCell=React.createClass({displayName:'FilterableHeaderCell',propTypes:{onChange:React.PropTypes.func.isRequired,column:React.PropTypes.shape(ExcelColumn).isRequired},getInitialState:function getInitialState(){return {filterTerm:''};},handleChange:function handleChange(e){var val=e.target.value;this.setState({filterTerm:val});this.props.onChange({filterTerm:val,columnKey:this.props.column.key});},render:function render(){return React.createElement('div',null,React.createElement('div',{className:'form-group'},this.renderInput()));},renderInput:function renderInput(){if(this.props.column.filterable === false){return React.createElement('span',null);}else {var input_key='header-filter-' + this.props.column.key;return React.createElement('input',{key:input_key,type:'text',className:'form-control input-sm',placeholder:'Search',value:this.state.filterTerm,onChange:this.handleChange});}}});module.exports = FilterableHeaderCell; /***/}, /* 82 */function(module,exports,__webpack_require__){ /* TODO mixins */'use strict';var _classCallCheck=__webpack_require__(43)['default'];var ColumnMetrics=__webpack_require__(23);var DOMMetrics=__webpack_require__(77);Object.assign = __webpack_require__(83);var PropTypes=__webpack_require__(18).PropTypes;var ColumnUtils=__webpack_require__(25);var React=__webpack_require__(18);var Column=function Column(){_classCallCheck(this,Column);};;module.exports = {mixins:[DOMMetrics.MetricsMixin],propTypes:{columns:PropTypes.arrayOf(Column),minColumnWidth:PropTypes.number,columnEquality:PropTypes.func},DOMMetrics:{gridWidth:function gridWidth(){return React.findDOMNode(this).parentElement.offsetWidth;}},getDefaultProps:function getDefaultProps(){return {minColumnWidth:80,columnEquality:ColumnMetrics.sameColumn};},componentWillReceiveProps:function componentWillReceiveProps(nextProps){if(nextProps.columns){if(!ColumnMetrics.sameColumns(this.props.columns,nextProps.columns,this.props.columnEquality) || nextProps.minWidth !== this.props.minWidth){var columnMetrics=this.createColumnMetrics(nextProps);this.setState({columnMetrics:columnMetrics});}}},getTotalWidth:function getTotalWidth(){var totalWidth=0;if(this.isMounted()){totalWidth = this.DOMMetrics.gridWidth();}else {totalWidth = ColumnUtils.getSize(this.props.columns) * this.props.minColumnWidth;}return totalWidth;},getColumnMetricsType:function getColumnMetricsType(metrics){var totalWidth=metrics.totalWidth || this.getTotalWidth();var currentMetrics={columns:metrics.columns,totalWidth:totalWidth,minColumnWidth:metrics.minColumnWidth};var updatedMetrics=ColumnMetrics.recalculate(currentMetrics);return updatedMetrics;},getColumn:function getColumn(idx){var columns=this.state.columnMetrics.columns;if(Array.isArray(columns)){return columns[idx];}else if(typeof Immutable !== 'undefined'){return columns.get(idx);}},getSize:function getSize(){var columns=this.state.columnMetrics.columns;if(Array.isArray(columns)){return columns.length;}else if(typeof Immutable !== 'undefined'){return columns.size;}},metricsUpdated:function metricsUpdated(){var columnMetrics=this.createColumnMetrics();this.setState({columnMetrics:columnMetrics});},createColumnMetrics:function createColumnMetrics(){var props=arguments.length <= 0 || arguments[0] === undefined?this.props:arguments[0];var gridColumns=this.setupGridColumns(props);return this.getColumnMetricsType({columns:gridColumns,minColumnWidth:this.props.minColumnWidth,totalWidth:props.minWidth});},onColumnResize:function onColumnResize(index,width){var columnMetrics=ColumnMetrics.resizeColumn(this.state.columnMetrics,index,width);this.setState({columnMetrics:columnMetrics});}}; /***/}, /* 83 */function(module,exports){'use strict';function ToObject(val){if(val == null){throw new TypeError('Object.assign cannot be called with null or undefined');}return Object(val);}module.exports = _Object$assign2 || function(target,source){var from;var keys;var to=ToObject(target);for(var s=1;s < arguments.length;s++) {from = arguments[s];keys = _Object$keys(Object(from));for(var i=0;i < keys.length;i++) {to[keys[i]] = from[keys[i]];}}return to;}; /***/}, /* 84 */function(module,exports){'use strict';var RowUtils={get:function get(row,property){if(typeof row.get === 'function'){return row.get(property);}else {return row[property];}}};module.exports = RowUtils; /***/}, /* 85 */function(module,exports,__webpack_require__){"use strict";var Editors={AutoComplete:__webpack_require__(86),DropDownEditor:__webpack_require__(88),SimpleTextEditor:__webpack_require__(54),CheckboxEditor:__webpack_require__(80)};module.exports = Editors; /***/}, /* 86 */function(module,exports,__webpack_require__){ /* Flow issues:
		overrides? getDefaultValue, getStyle, onKeyDown
		*/ /**
		 * @jsx React.DOM
		 */'use strict';var React=__webpack_require__(18);var ReactAutocomplete=__webpack_require__(87);var KeyboardHandlerMixin=__webpack_require__(53);var ExcelColumn=__webpack_require__(42);var optionPropType=React.PropTypes.shape({id:React.PropTypes.required,title:React.PropTypes.string});var AutoCompleteEditor=React.createClass({displayName:'AutoCompleteEditor',propTypes:{onCommit:React.PropTypes.func.isRequired,options:React.PropTypes.arrayOf(optionPropType).isRequired,label:React.PropTypes.string,value:React.PropTypes.any.isRequired,valueParams:React.PropTypes.arrayOf(React.PropTypes.string),column:React.PropTypes.shape(ExcelColumn).isRequired,resultIdentifier:React.PropTypes.string,search:React.PropTypes.string},getDefaultProps:function getDefaultProps(){return {resultIdentifier:'id'};},getValue:function getValue(){var value,updated={};if(this.hasResults() && this.isFocusedOnSuggestion()){value = this.getLabel(this.refs.autoComplete.state.focusedValue);if(this.props.valueParams){value = this.constuctValueFromParams(this.refs.autoComplete.state.focusedValue,this.props.valueParams);}}else {value = this.refs.autoComplete.state.searchTerm;}updated[this.props.column.key] = value;return updated;},getInputNode:function getInputNode(){return this.getDOMNode().getElementsByTagName("input")[0];},render:function render(){var label=this.props.label != null?this.props.label:'title';return React.createElement('div',{height:this.props.height,onKeyDown:this.props.onKeyDown},React.createElement(ReactAutocomplete,{search:this.props.search,ref:'autoComplete',label:label,onChange:this.handleChange,resultIdentifier:this.props.resultIdentifier,options:this.props.options,value:{title:this.props.value}}));},handleChange:function handleChange(){this.props.onCommit();},hasResults:function hasResults(){return this.refs.autoComplete.state.results.length > 0;},isFocusedOnSuggestion:function isFocusedOnSuggestion(){var autoComplete=this.refs.autoComplete;return autoComplete.state.focusedValue != null;},getLabel:function getLabel(item){var label=this.props.label != null?this.props.label:'title';if(typeof label === "function"){return label(item);}else if(typeof label === "string"){return item[label];}},constuctValueFromParams:function constuctValueFromParams(obj,props){if(!props){return '';}var ret=[];for(var i=0,ii=props.length;i < ii;i++) {ret.push(obj[props[i]]);}return ret.join('|');}});module.exports = AutoCompleteEditor; /***/}, /* 87 */function(module,exports,__webpack_require__){(function webpackUniversalModuleDefinition(root,factory){if(true)module.exports = factory(__webpack_require__(18));else if(typeof define === 'function' && define.amd)define(["react"],factory);else if(typeof exports === 'object')exports["ReactAutocomplete"] = factory(require("react"));else root["ReactAutocomplete"] = factory(root["React"]);})(this,function(__WEBPACK_EXTERNAL_MODULE_1__){return  (/******/(function(modules){ // webpackBootstrap
	/******/ // The module cache
	/******/var installedModules={}; /******/ // The require function
	/******/function __webpack_require__(moduleId){ /******/ // Check if module is in cache
	/******/if(installedModules[moduleId]) /******/return installedModules[moduleId].exports; /******/ // Create a new module (and put it into the cache)
	/******/var module=installedModules[moduleId] = { /******/exports:{}, /******/id:moduleId, /******/loaded:false /******/}; /******/ // Execute the module function
	/******/modules[moduleId].call(module.exports,module,module.exports,__webpack_require__); /******/ // Flag the module as loaded
	/******/module.loaded = true; /******/ // Return the exports of the module
	/******/return module.exports; /******/} /******/ // expose the modules object (__webpack_modules__)
	/******/__webpack_require__.m = modules; /******/ // expose the module cache
	/******/__webpack_require__.c = installedModules; /******/ // __webpack_public_path__
	/******/__webpack_require__.p = ""; /******/ // Load entry module and return exports
	/******/return __webpack_require__(0); /******/})( /************************************************************************/ /******/[ /* 0 */function(module,exports,__webpack_require__){ /**
			 * @jsx React.DOM
			 */"use strict";var React=__webpack_require__(1);var joinClasses=__webpack_require__(2);var Autocomplete=React.createClass({displayName:"Autocomplete",propTypes:{options:React.PropTypes.any,search:React.PropTypes.func,resultRenderer:React.PropTypes.oneOfType([React.PropTypes.component,React.PropTypes.func]),value:React.PropTypes.object,onChange:React.PropTypes.func,onError:React.PropTypes.func},getDefaultProps:function getDefaultProps(){return {search:searchArray};},getInitialState:function getInitialState(){var searchTerm=this.props.searchTerm?this.props.searchTerm:this.props.value?this.props.value.title:"";return {results:[],showResults:false,showResultsInProgress:false,searchTerm:searchTerm,focusedValue:null};},getResultIdentifier:function getResultIdentifier(result){if(this.props.resultIdentifier === undefined){return result.id;}else {return result[this.props.resultIdentifier];}},render:function render(){var className=joinClasses(this.props.className,"react-autocomplete-Autocomplete",this.state.showResults?"react-autocomplete-Autocomplete--resultsShown":undefined);var style={position:"relative",outline:"none"};return React.createElement("div",{tabIndex:"1",className:className,onFocus:this.onFocus,onBlur:this.onBlur,style:style},React.createElement("input",{ref:"search",className:"react-autocomplete-Autocomplete__search",style:{width:"100%"},onClick:this.showAllResults,onChange:this.onQueryChange,onFocus:this.showAllResults,onBlur:this.onQueryBlur,onKeyDown:this.onQueryKeyDown,value:this.state.searchTerm}),React.createElement(Results,{className:"react-autocomplete-Autocomplete__results",onSelect:this.onValueChange,onFocus:this.onValueFocus,results:this.state.results,focusedValue:this.state.focusedValue,show:this.state.showResults,renderer:this.props.resultRenderer,label:this.props.label,resultIdentifier:this.props.resultIdentifier}));},componentWillReceiveProps:function componentWillReceiveProps(nextProps){var searchTerm=nextProps.searchTerm?nextProps.searchTerm:nextProps.value?nextProps.value.title:"";this.setState({searchTerm:searchTerm});},componentWillMount:function componentWillMount(){this.blurTimer = null;}, /**
			    * Show results for a search term value.
			    *
			    * This method doesn't update search term value itself.
			    *
			    * @param {Search} searchTerm
			    */showResults:function showResults(searchTerm){this.setState({showResultsInProgress:true});this.props.search(this.props.options,searchTerm.trim(),this.onSearchComplete);},showAllResults:function showAllResults(){if(!this.state.showResultsInProgress && !this.state.showResults){this.showResults("");}},onValueChange:function onValueChange(value){var state={value:value,showResults:false};if(value){state.searchTerm = value.title;}this.setState(state);if(this.props.onChange){this.props.onChange(value);}},onSearchComplete:function onSearchComplete(err,results){if(err){if(this.props.onError){this.props.onError(err);}else {throw err;}}this.setState({showResultsInProgress:false,showResults:true,results:results});},onValueFocus:function onValueFocus(value){this.setState({focusedValue:value});},onQueryChange:function onQueryChange(e){var searchTerm=e.target.value;this.setState({searchTerm:searchTerm,focusedValue:null});this.showResults(searchTerm);},onFocus:function onFocus(){if(this.blurTimer){clearTimeout(this.blurTimer);this.blurTimer = null;}this.refs.search.getDOMNode().focus();},onBlur:function onBlur(){ // wrap in setTimeout so we can catch a click on results
	this.blurTimer = setTimeout((function(){if(this.isMounted()){this.setState({showResults:false});}}).bind(this),100);},onQueryKeyDown:function onQueryKeyDown(e){if(e.key === "Enter"){e.preventDefault();if(this.state.focusedValue){this.onValueChange(this.state.focusedValue);}}else if(e.key === "ArrowUp" && this.state.showResults){e.preventDefault();var prevIdx=Math.max(this.focusedValueIndex() - 1,0);this.setState({focusedValue:this.state.results[prevIdx]});}else if(e.key === "ArrowDown"){e.preventDefault();if(this.state.showResults){var nextIdx=Math.min(this.focusedValueIndex() + (this.state.showResults?1:0),this.state.results.length - 1);this.setState({showResults:true,focusedValue:this.state.results[nextIdx]});}else {this.showAllResults();}}},focusedValueIndex:function focusedValueIndex(){if(!this.state.focusedValue){return -1;}for(var i=0,len=this.state.results.length;i < len;i++) {if(this.getResultIdentifier(this.state.results[i]) === this.getResultIdentifier(this.state.focusedValue)){return i;}}return -1;}});var Results=React.createClass({displayName:"Results",getResultIdentifier:function getResultIdentifier(result){if(this.props.resultIdentifier === undefined){if(!result.id){throw "id property not found on result. You must specify a resultIdentifier and pass as props to autocomplete component";}return result.id;}else {return result[this.props.resultIdentifier];}},render:function render(){var style={display:this.props.show?"block":"none",position:"absolute",listStyleType:"none"};var $__0=this.props,className=$__0.className,props=(function(source,exclusion){var rest={};var hasOwn=Object.prototype.hasOwnProperty;if(source == null){throw new TypeError();}for(var key in source) {if(hasOwn.call(source,key) && !hasOwn.call(exclusion,key)){rest[key] = source[key];}}return rest;})($__0,{className:1});return React.createElement("ul",React.__spread({},props,{style:style,className:className + " react-autocomplete-Results"}),this.props.results.map(this.renderResult));},renderResult:function renderResult(result){var focused=this.props.focusedValue && this.getResultIdentifier(this.props.focusedValue) === this.getResultIdentifier(result);var Renderer=this.props.renderer || Result;return React.createElement(Renderer,{ref:focused?"focused":undefined,key:this.getResultIdentifier(result),result:result,focused:focused,onMouseEnter:this.onMouseEnterResult,onClick:this.props.onSelect,label:this.props.label});},componentDidUpdate:function componentDidUpdate(){this.scrollToFocused();},componentDidMount:function componentDidMount(){this.scrollToFocused();},componentWillMount:function componentWillMount(){this.ignoreFocus = false;},scrollToFocused:function scrollToFocused(){var focused=this.refs && this.refs.focused;if(focused){var containerNode=this.getDOMNode();var scroll=containerNode.scrollTop;var height=containerNode.offsetHeight;var node=focused.getDOMNode();var top=node.offsetTop;var bottom=top + node.offsetHeight; // we update ignoreFocus to true if we change the scroll position so
	// the mouseover event triggered because of that won't have an
	// effect
	if(top < scroll){this.ignoreFocus = true;containerNode.scrollTop = top;}else if(bottom - scroll > height){this.ignoreFocus = true;containerNode.scrollTop = bottom - height;}}},onMouseEnterResult:function onMouseEnterResult(e,result){ // check if we need to prevent the next onFocus event because it was
	// probably caused by a mouseover due to scroll position change
	if(this.ignoreFocus){this.ignoreFocus = false;}else { // we need to make sure focused node is visible
	// for some reason mouse events fire on visible nodes due to
	// box-shadow
	var containerNode=this.getDOMNode();var scroll=containerNode.scrollTop;var height=containerNode.offsetHeight;var node=e.target;var top=node.offsetTop;var bottom=top + node.offsetHeight;if(bottom > scroll && top < scroll + height){this.props.onFocus(result);}}}});var Result=React.createClass({displayName:"Result",getDefaultProps:function getDefaultProps(){return {label:function label(result){return result.title;}};},getLabel:function getLabel(result){if(typeof this.props.label === "function"){return this.props.label(result);}else if(typeof this.props.label === "string"){return result[this.props.label];}},render:function render(){var className=joinClasses({"react-autocomplete-Result":true,"react-autocomplete-Result--active":this.props.focused});return React.createElement("li",{style:{listStyleType:"none"},className:className,onClick:this.onClick,onMouseEnter:this.onMouseEnter},React.createElement("a",null,this.getLabel(this.props.result)));},onClick:function onClick(){this.props.onClick(this.props.result);},onMouseEnter:function onMouseEnter(e){if(this.props.onMouseEnter){this.props.onMouseEnter(e,this.props.result);}},shouldComponentUpdate:function shouldComponentUpdate(nextProps){return nextProps.result.id !== this.props.result.id || nextProps.focused !== this.props.focused;}}); /**
			* Search options using specified search term treating options as an array
			* of candidates.
			*
			* @param {Array.<Object>} options
			* @param {String} searchTerm
			* @param {Callback} cb
			*/function searchArray(options,searchTerm,cb){if(!options){return cb(null,[]);}searchTerm = new RegExp(searchTerm,"i");var results=[];for(var i=0,len=options.length;i < len;i++) {if(searchTerm.exec(options[i].title)){results.push(options[i]);}}cb(null,results);}module.exports = Autocomplete; /***/}, /* 1 */function(module,exports){module.exports = __WEBPACK_EXTERNAL_MODULE_1__; /***/}, /* 2 */function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__; /*!
			  Copyright (c) 2015 Jed Watson.
			  Licensed under the MIT License (MIT), see
			  http://jedwatson.github.io/classnames
			*/function classNames(){var classes='';var arg;for(var i=0;i < arguments.length;i++) {arg = arguments[i];if(!arg){continue;}if('string' === typeof arg || 'number' === typeof arg){classes += ' ' + arg;}else if(Object.prototype.toString.call(arg) === '[object Array]'){classes += ' ' + classNames.apply(null,arg);}else if('object' === typeof arg){for(var key in arg) {if(!arg.hasOwnProperty(key) || !arg[key]){continue;}classes += ' ' + key;}}}return classes.substr(1);} // safely export classNames for node / browserify
	if(typeof module !== 'undefined' && module.exports){module.exports = classNames;} // safely export classNames for RequireJS
	if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__ = [],__WEBPACK_AMD_DEFINE_RESULT__ = (function(){return classNames;}).apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__),__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));} /***/} /******/]));});; /***/}, /* 88 */function(module,exports,__webpack_require__){ /**
		 * @jsx React.DOM


		 */'use strict';var _get=__webpack_require__(55)['default'];var _inherits=__webpack_require__(61)['default'];var _createClass=__webpack_require__(70)['default'];var _classCallCheck=__webpack_require__(43)['default'];var React=__webpack_require__(18);var EditorBase=__webpack_require__(73);var DropDownEditor=(function(_EditorBase){_inherits(DropDownEditor,_EditorBase);function DropDownEditor(){_classCallCheck(this,DropDownEditor);_get(Object.getPrototypeOf(DropDownEditor.prototype),'constructor',this).apply(this,arguments);}_createClass(DropDownEditor,[{key:'getInputNode',value:function getInputNode(){return React.findDOMNode(this);}},{key:'onClick',value:function onClick(e){this.getInputNode().focus();}},{key:'onDoubleClick',value:function onDoubleClick(e){this.getInputNode().focus();}},{key:'render',value:function render(){return React.createElement('select',{style:this.getStyle(),defaultValue:this.props.value,onBlur:this.props.onBlur,onChange:this.onChange},this.renderOptions());}},{key:'renderOptions',value:function renderOptions(){var options=[];this.props.options.forEach(function(name){options.push(React.createElement('option',{key:name,value:name},name));},this);return options;}}]);return DropDownEditor;})(EditorBase);;DropDownEditor.propTypes = {options:React.PropTypes.arrayOf(React.PropTypes.string).isRequired};module.exports = DropDownEditor; /***/}, /* 89 */function(module,exports,__webpack_require__){ //not including this
	//it currently requires the whole of moment, which we dont want to take as a dependency
	'use strict';var ImageFormatter=__webpack_require__(90);var Formatters={ImageFormatter:ImageFormatter};module.exports = Formatters; /***/}, /* 90 */function(module,exports,__webpack_require__){'use strict';var React=__webpack_require__(18);var PendingPool={};var ReadyPool={};var ImageFormatter=React.createClass({displayName:'ImageFormatter',propTypes:{value:React.PropTypes.string.isRequired},getInitialState:function getInitialState(){return {ready:false};},componentWillMount:function componentWillMount(){this._load(this.props.value);},componentWillReceiveProps:function componentWillReceiveProps(nextProps){if(nextProps.value !== this.props.value){this.setState({value:null});this._load(nextProps.value);}},render:function render(){var style=this.state.value?{backgroundImage:'url(' + this.state.value + ')'}:undefined;return React.createElement('div',{className:'react-grid-image',style:style});},_load:function _load( /*string*/src){if(ReadyPool[src]){this.setState({value:src});return;}if(PendingPool[src]){PendingPool[src].push(this._onLoad);return;}PendingPool[src] = [this._onLoad];var img=new Image();img.onload = function(){PendingPool[src].forEach( /*function*/function(callback){callback(src);});delete PendingPool[src];img.onload = null;src = undefined;};img.src = src;},_onLoad:function _onLoad( /*string*/src){if(this.isMounted() && src === this.props.value){this.setState({value:src});}}});module.exports = ImageFormatter; /***/}, /* 91 */function(module,exports,__webpack_require__){ /**
		* @jsx React.DOM

		*/'use strict';var React=__webpack_require__(18);var Row=__webpack_require__(50);var Toolbar=React.createClass({displayName:'Toolbar',propTypes:{onAddRow:React.PropTypes.func,onToggleFilter:React.PropTypes.func.isRequired,enableFilter:React.PropTypes.bool,numberOfRows:React.PropTypes.number.isRequired},onAddRow:function onAddRow(){if(this.props.onAddRow !== null && this.props.onAddRow instanceof Function){this.props.onAddRow({newRowIndex:this.props.numberOfRows});}},getDefaultProps:function getDefaultProps(){return {enableAddRow:true};},renderAddRowButton:function renderAddRowButton(){if(this.props.onAddRow){return React.createElement('button',{type:'button',className:'btn',onClick:this.onAddRow},'Add Row');}},renderToggleFilterButton:function renderToggleFilterButton(){if(this.props.enableFilter){return React.createElement('button',{type:'button',className:'btn',onClick:this.props.onToggleFilter},'Filter Rows');}},render:function render(){return React.createElement('div',{className:'react-grid-Toolbar'},React.createElement('div',{className:'tools'},this.renderAddRowButton(),this.renderToggleFilterButton()));}});module.exports = Toolbar; /***/} /******/]));});; /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/

/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2015 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/

	'use strict';

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
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
			return classNames;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}

/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var faker = __webpack_require__(159);
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
	    date: faker.date.past(),
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
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var QuickStartDescription = __webpack_require__(103);
	var ReactPlayground = __webpack_require__(106);

	var EmptyRowsExample = '\nvar _rows = [];\nvar rowGetter = function(i){\n  return _rows[i];\n};\n\n\nvar columns = [\n{\n  key: \'id\',\n  name: \'ID\'\n},\n{\n  key: \'title\',\n  name: \'Title\'\n},\n{\n  key: \'count\',\n  name: \'Count\'\n}\n]\n\nvar EmptyRowsView = React.createClass({\n render: function() {\n   return (<div>Nothing to show</div>)\n }\n});\n\n\nvar Example = React.createClass({\n  render: function() {\n    return  (<ReactDataGrid\n    columns={columns}\n    rowGetter={rowGetter}\n    rowsCount={_rows.length}\n    minHeight={500}\n    emptyRowsView={EmptyRowsView} />);\n  }\n});\nReact.render(<Example />, mountNode);\n';

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

/***/ }
/******/ ])
});
;