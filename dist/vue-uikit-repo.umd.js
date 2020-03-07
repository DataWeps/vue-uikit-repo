/*!
 * vue-uikit-repo v1.0.3 
 * (c) 2020 Martin Kravec
 * Released under the MIT License.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = global || self, global.VueUikitRepo = factory());
}(this, (function () { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var check = function (it) {
	  return it && it.Math == Math && it;
	}; // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028


	var global_1 = // eslint-disable-next-line no-undef
	check(typeof globalThis == 'object' && globalThis) || check(typeof window == 'object' && window) || check(typeof self == 'object' && self) || check(typeof commonjsGlobal == 'object' && commonjsGlobal) || // eslint-disable-next-line no-new-func
	Function('return this')();

	var fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	var descriptors = !fails(function () {
	  return Object.defineProperty({}, 1, {
	    get: function () {
	      return 7;
	    }
	  })[1] != 7;
	});

	var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // Nashorn ~ JDK8 bug

	var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({
	  1: 2
	}, 1); // `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable

	var f = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : nativePropertyIsEnumerable;
	var objectPropertyIsEnumerable = {
	  f: f
	};

	var createPropertyDescriptor = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var toString = {}.toString;

	var classofRaw = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	var split = ''.split; // fallback for non-array-like ES3 and non-enumerable old V8 strings

	var indexedObject = fails(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins
	  return !Object('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
	} : Object;

	// `RequireObjectCoercible` abstract operation
	// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
	var requireObjectCoercible = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on " + it);
	  return it;
	};

	var toIndexedObject = function (it) {
	  return indexedObject(requireObjectCoercible(it));
	};

	var isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	// https://tc39.github.io/ecma262/#sec-toprimitive
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string

	var toPrimitive = function (input, PREFERRED_STRING) {
	  if (!isObject(input)) return input;
	  var fn, val;
	  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
	  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
	  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var hasOwnProperty = {}.hasOwnProperty;

	var has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var document$1 = global_1.document; // typeof document.createElement is 'object' in old IE

	var EXISTS = isObject(document$1) && isObject(document$1.createElement);

	var documentCreateElement = function (it) {
	  return EXISTS ? document$1.createElement(it) : {};
	};

	var ie8DomDefine = !descriptors && !fails(function () {
	  return Object.defineProperty(documentCreateElement('div'), 'a', {
	    get: function () {
	      return 7;
	    }
	  }).a != 7;
	});

	var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // `Object.getOwnPropertyDescriptor` method
	// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor

	var f$1 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject(O);
	  P = toPrimitive(P, true);
	  if (ie8DomDefine) try {
	    return nativeGetOwnPropertyDescriptor(O, P);
	  } catch (error) {
	    /* empty */
	  }
	  if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
	};
	var objectGetOwnPropertyDescriptor = {
	  f: f$1
	};

	var anObject = function (it) {
	  if (!isObject(it)) {
	    throw TypeError(String(it) + ' is not an object');
	  }

	  return it;
	};

	var nativeDefineProperty = Object.defineProperty; // `Object.defineProperty` method
	// https://tc39.github.io/ecma262/#sec-object.defineproperty

	var f$2 = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if (ie8DomDefine) try {
	    return nativeDefineProperty(O, P, Attributes);
	  } catch (error) {
	    /* empty */
	  }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};
	var objectDefineProperty = {
	  f: f$2
	};

	var createNonEnumerableProperty = descriptors ? function (object, key, value) {
	  return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var setGlobal = function (key, value) {
	  try {
	    createNonEnumerableProperty(global_1, key, value);
	  } catch (error) {
	    global_1[key] = value;
	  }

	  return value;
	};

	var SHARED = '__core-js_shared__';
	var store = global_1[SHARED] || setGlobal(SHARED, {});
	var sharedStore = store;

	var functionToString = Function.toString; // this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper

	if (typeof sharedStore.inspectSource != 'function') {
	  sharedStore.inspectSource = function (it) {
	    return functionToString.call(it);
	  };
	}

	var inspectSource = sharedStore.inspectSource;

	var WeakMap = global_1.WeakMap;
	var nativeWeakMap = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));

	var shared = createCommonjsModule(function (module) {
	  (module.exports = function (key, value) {
	    return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
	  })('versions', []).push({
	    version: '3.6.4',
	    mode:  'global',
	    copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
	  });
	});

	var id = 0;
	var postfix = Math.random();

	var uid = function (key) {
	  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
	};

	var keys = shared('keys');

	var sharedKey = function (key) {
	  return keys[key] || (keys[key] = uid(key));
	};

	var hiddenKeys = {};

	var WeakMap$1 = global_1.WeakMap;
	var set, get, has$1;

	var enforce = function (it) {
	  return has$1(it) ? get(it) : set(it, {});
	};

	var getterFor = function (TYPE) {
	  return function (it) {
	    var state;

	    if (!isObject(it) || (state = get(it)).type !== TYPE) {
	      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
	    }

	    return state;
	  };
	};

	if (nativeWeakMap) {
	  var store$1 = new WeakMap$1();
	  var wmget = store$1.get;
	  var wmhas = store$1.has;
	  var wmset = store$1.set;

	  set = function (it, metadata) {
	    wmset.call(store$1, it, metadata);
	    return metadata;
	  };

	  get = function (it) {
	    return wmget.call(store$1, it) || {};
	  };

	  has$1 = function (it) {
	    return wmhas.call(store$1, it);
	  };
	} else {
	  var STATE = sharedKey('state');
	  hiddenKeys[STATE] = true;

	  set = function (it, metadata) {
	    createNonEnumerableProperty(it, STATE, metadata);
	    return metadata;
	  };

	  get = function (it) {
	    return has(it, STATE) ? it[STATE] : {};
	  };

	  has$1 = function (it) {
	    return has(it, STATE);
	  };
	}

	var internalState = {
	  set: set,
	  get: get,
	  has: has$1,
	  enforce: enforce,
	  getterFor: getterFor
	};

	var redefine = createCommonjsModule(function (module) {
	  var getInternalState = internalState.get;
	  var enforceInternalState = internalState.enforce;
	  var TEMPLATE = String(String).split('String');
	  (module.exports = function (O, key, value, options) {
	    var unsafe = options ? !!options.unsafe : false;
	    var simple = options ? !!options.enumerable : false;
	    var noTargetGet = options ? !!options.noTargetGet : false;

	    if (typeof value == 'function') {
	      if (typeof key == 'string' && !has(value, 'name')) createNonEnumerableProperty(value, 'name', key);
	      enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
	    }

	    if (O === global_1) {
	      if (simple) O[key] = value;else setGlobal(key, value);
	      return;
	    } else if (!unsafe) {
	      delete O[key];
	    } else if (!noTargetGet && O[key]) {
	      simple = true;
	    }

	    if (simple) O[key] = value;else createNonEnumerableProperty(O, key, value); // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	  })(Function.prototype, 'toString', function toString() {
	    return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
	  });
	});

	var path = global_1;

	var aFunction = function (variable) {
	  return typeof variable == 'function' ? variable : undefined;
	};

	var getBuiltIn = function (namespace, method) {
	  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global_1[namespace]) : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
	};

	var ceil = Math.ceil;
	var floor = Math.floor; // `ToInteger` abstract operation
	// https://tc39.github.io/ecma262/#sec-tointeger

	var toInteger = function (argument) {
	  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
	};

	var min = Math.min; // `ToLength` abstract operation
	// https://tc39.github.io/ecma262/#sec-tolength

	var toLength = function (argument) {
	  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	var max = Math.max;
	var min$1 = Math.min; // Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).

	var toAbsoluteIndex = function (index, length) {
	  var integer = toInteger(index);
	  return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
	};

	var createMethod = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject($this);
	    var length = toLength(O.length);
	    var index = toAbsoluteIndex(fromIndex, length);
	    var value; // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare

	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++]; // eslint-disable-next-line no-self-compare

	      if (value != value) return true; // Array#indexOf ignores holes, Array#includes - not
	    } else for (; length > index; index++) {
	      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
	    }
	    return !IS_INCLUDES && -1;
	  };
	};

	var arrayIncludes = {
	  // `Array.prototype.includes` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
	  includes: createMethod(true),
	  // `Array.prototype.indexOf` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
	  indexOf: createMethod(false)
	};

	var indexOf = arrayIncludes.indexOf;

	var objectKeysInternal = function (object, names) {
	  var O = toIndexedObject(object);
	  var i = 0;
	  var result = [];
	  var key;

	  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key); // Don't enum bug & hidden keys


	  while (names.length > i) if (has(O, key = names[i++])) {
	    ~indexOf(result, key) || result.push(key);
	  }

	  return result;
	};

	// IE8- don't enum bug keys
	var enumBugKeys = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf'];

	var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype'); // `Object.getOwnPropertyNames` method
	// https://tc39.github.io/ecma262/#sec-object.getownpropertynames

	var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return objectKeysInternal(O, hiddenKeys$1);
	};

	var objectGetOwnPropertyNames = {
	  f: f$3
	};

	var f$4 = Object.getOwnPropertySymbols;
	var objectGetOwnPropertySymbols = {
	  f: f$4
	};

	var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
	  var keys = objectGetOwnPropertyNames.f(anObject(it));
	  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
	  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
	};

	var copyConstructorProperties = function (target, source) {
	  var keys = ownKeys(source);
	  var defineProperty = objectDefineProperty.f;
	  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;

	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
	  }
	};

	var replacement = /#|\.prototype\./;

	var isForced = function (feature, detection) {
	  var value = data[normalize(feature)];
	  return value == POLYFILL ? true : value == NATIVE ? false : typeof detection == 'function' ? fails(detection) : !!detection;
	};

	var normalize = isForced.normalize = function (string) {
	  return String(string).replace(replacement, '.').toLowerCase();
	};

	var data = isForced.data = {};
	var NATIVE = isForced.NATIVE = 'N';
	var POLYFILL = isForced.POLYFILL = 'P';
	var isForced_1 = isForced;

	var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
	/*
	  options.target      - name of the target object
	  options.global      - target is the global object
	  options.stat        - export as static methods of target
	  options.proto       - export as prototype methods of target
	  options.real        - real prototype method for the `pure` version
	  options.forced      - export even if the native feature is available
	  options.bind        - bind methods to the target, required for the `pure` version
	  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
	  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
	  options.sham        - add a flag to not completely full polyfills
	  options.enumerable  - export as enumerable property
	  options.noTargetGet - prevent calling a getter on target
	*/

	var _export = function (options, source) {
	  var TARGET = options.target;
	  var GLOBAL = options.global;
	  var STATIC = options.stat;
	  var FORCED, target, key, targetProperty, sourceProperty, descriptor;

	  if (GLOBAL) {
	    target = global_1;
	  } else if (STATIC) {
	    target = global_1[TARGET] || setGlobal(TARGET, {});
	  } else {
	    target = (global_1[TARGET] || {}).prototype;
	  }

	  if (target) for (key in source) {
	    sourceProperty = source[key];

	    if (options.noTargetGet) {
	      descriptor = getOwnPropertyDescriptor$1(target, key);
	      targetProperty = descriptor && descriptor.value;
	    } else targetProperty = target[key];

	    FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced); // contained in target

	    if (!FORCED && targetProperty !== undefined) {
	      if (typeof sourceProperty === typeof targetProperty) continue;
	      copyConstructorProperties(sourceProperty, targetProperty);
	    } // add a flag to not completely full polyfills


	    if (options.sham || targetProperty && targetProperty.sham) {
	      createNonEnumerableProperty(sourceProperty, 'sham', true);
	    } // extend global


	    redefine(target, key, sourceProperty, options);
	  }
	};

	var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
	  // Chrome 38 Symbol has incorrect toString conversion
	  // eslint-disable-next-line no-undef
	  return !String(Symbol());
	});

	var useSymbolAsUid = nativeSymbol // eslint-disable-next-line no-undef
	&& !Symbol.sham // eslint-disable-next-line no-undef
	&& typeof Symbol.iterator == 'symbol';

	// https://tc39.github.io/ecma262/#sec-isarray

	var isArray = Array.isArray || function isArray(arg) {
	  return classofRaw(arg) == 'Array';
	};

	// https://tc39.github.io/ecma262/#sec-toobject

	var toObject = function (argument) {
	  return Object(requireObjectCoercible(argument));
	};

	// https://tc39.github.io/ecma262/#sec-object.keys

	var objectKeys = Object.keys || function keys(O) {
	  return objectKeysInternal(O, enumBugKeys);
	};

	// https://tc39.github.io/ecma262/#sec-object.defineproperties

	var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject(O);
	  var keys = objectKeys(Properties);
	  var length = keys.length;
	  var index = 0;
	  var key;

	  while (length > index) objectDefineProperty.f(O, key = keys[index++], Properties[key]);

	  return O;
	};

	var html = getBuiltIn('document', 'documentElement');

	var GT = '>';
	var LT = '<';
	var PROTOTYPE = 'prototype';
	var SCRIPT = 'script';
	var IE_PROTO = sharedKey('IE_PROTO');

	var EmptyConstructor = function () {
	  /* empty */
	};

	var scriptTag = function (content) {
	  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
	}; // Create object with fake `null` prototype: use ActiveX Object with cleared prototype


	var NullProtoObjectViaActiveX = function (activeXDocument) {
	  activeXDocument.write(scriptTag(''));
	  activeXDocument.close();
	  var temp = activeXDocument.parentWindow.Object;
	  activeXDocument = null; // avoid memory leak

	  return temp;
	}; // Create object with fake `null` prototype: use iframe Object with cleared prototype


	var NullProtoObjectViaIFrame = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = documentCreateElement('iframe');
	  var JS = 'java' + SCRIPT + ':';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  html.appendChild(iframe); // https://github.com/zloirock/core-js/issues/475

	  iframe.src = String(JS);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(scriptTag('document.F=Object'));
	  iframeDocument.close();
	  return iframeDocument.F;
	}; // Check for document.domain and active x support
	// No need to use active x approach when document.domain is not set
	// see https://github.com/es-shims/es5-shim/issues/150
	// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
	// avoid IE GC bug


	var activeXDocument;

	var NullProtoObject = function () {
	  try {
	    /* global ActiveXObject */
	    activeXDocument = document.domain && new ActiveXObject('htmlfile');
	  } catch (error) {
	    /* ignore */
	  }

	  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
	  var length = enumBugKeys.length;

	  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];

	  return NullProtoObject();
	};

	hiddenKeys[IE_PROTO] = true; // `Object.create` method
	// https://tc39.github.io/ecma262/#sec-object.create

	var objectCreate = Object.create || function create(O, Properties) {
	  var result;

	  if (O !== null) {
	    EmptyConstructor[PROTOTYPE] = anObject(O);
	    result = new EmptyConstructor();
	    EmptyConstructor[PROTOTYPE] = null; // add "__proto__" for Object.getPrototypeOf polyfill

	    result[IE_PROTO] = O;
	  } else result = NullProtoObject();

	  return Properties === undefined ? result : objectDefineProperties(result, Properties);
	};

	var nativeGetOwnPropertyNames = objectGetOwnPropertyNames.f;
	var toString$1 = {}.toString;
	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function (it) {
	  try {
	    return nativeGetOwnPropertyNames(it);
	  } catch (error) {
	    return windowNames.slice();
	  }
	}; // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window


	var f$5 = function getOwnPropertyNames(it) {
	  return windowNames && toString$1.call(it) == '[object Window]' ? getWindowNames(it) : nativeGetOwnPropertyNames(toIndexedObject(it));
	};

	var objectGetOwnPropertyNamesExternal = {
	  f: f$5
	};

	var WellKnownSymbolsStore = shared('wks');
	var Symbol$1 = global_1.Symbol;
	var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;

	var wellKnownSymbol = function (name) {
	  if (!has(WellKnownSymbolsStore, name)) {
	    if (nativeSymbol && has(Symbol$1, name)) WellKnownSymbolsStore[name] = Symbol$1[name];else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
	  }

	  return WellKnownSymbolsStore[name];
	};

	var f$6 = wellKnownSymbol;
	var wellKnownSymbolWrapped = {
	  f: f$6
	};

	var defineProperty = objectDefineProperty.f;

	var defineWellKnownSymbol = function (NAME) {
	  var Symbol = path.Symbol || (path.Symbol = {});
	  if (!has(Symbol, NAME)) defineProperty(Symbol, NAME, {
	    value: wellKnownSymbolWrapped.f(NAME)
	  });
	};

	var defineProperty$1 = objectDefineProperty.f;
	var TO_STRING_TAG = wellKnownSymbol('toStringTag');

	var setToStringTag = function (it, TAG, STATIC) {
	  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
	    defineProperty$1(it, TO_STRING_TAG, {
	      configurable: true,
	      value: TAG
	    });
	  }
	};

	var aFunction$1 = function (it) {
	  if (typeof it != 'function') {
	    throw TypeError(String(it) + ' is not a function');
	  }

	  return it;
	};

	var functionBindContext = function (fn, that, length) {
	  aFunction$1(fn);
	  if (that === undefined) return fn;

	  switch (length) {
	    case 0:
	      return function () {
	        return fn.call(that);
	      };

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

	  return function ()
	  /* ...args */
	  {
	    return fn.apply(that, arguments);
	  };
	};

	var SPECIES = wellKnownSymbol('species'); // `ArraySpeciesCreate` abstract operation
	// https://tc39.github.io/ecma262/#sec-arrayspeciescreate

	var arraySpeciesCreate = function (originalArray, length) {
	  var C;

	  if (isArray(originalArray)) {
	    C = originalArray.constructor; // cross-realm fallback

	    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;else if (isObject(C)) {
	      C = C[SPECIES];
	      if (C === null) C = undefined;
	    }
	  }

	  return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
	};

	var push = [].push; // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation

	var createMethod$1 = function (TYPE) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  return function ($this, callbackfn, that, specificCreate) {
	    var O = toObject($this);
	    var self = indexedObject(O);
	    var boundFunction = functionBindContext(callbackfn, that, 3);
	    var length = toLength(self.length);
	    var index = 0;
	    var create = specificCreate || arraySpeciesCreate;
	    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
	    var value, result;

	    for (; length > index; index++) if (NO_HOLES || index in self) {
	      value = self[index];
	      result = boundFunction(value, index, O);

	      if (TYPE) {
	        if (IS_MAP) target[index] = result; // map
	        else if (result) switch (TYPE) {
	            case 3:
	              return true;
	            // some

	            case 5:
	              return value;
	            // find

	            case 6:
	              return index;
	            // findIndex

	            case 2:
	              push.call(target, value);
	            // filter
	          } else if (IS_EVERY) return false; // every
	      }
	    }

	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
	  };
	};

	var arrayIteration = {
	  // `Array.prototype.forEach` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
	  forEach: createMethod$1(0),
	  // `Array.prototype.map` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.map
	  map: createMethod$1(1),
	  // `Array.prototype.filter` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
	  filter: createMethod$1(2),
	  // `Array.prototype.some` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.some
	  some: createMethod$1(3),
	  // `Array.prototype.every` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.every
	  every: createMethod$1(4),
	  // `Array.prototype.find` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.find
	  find: createMethod$1(5),
	  // `Array.prototype.findIndex` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
	  findIndex: createMethod$1(6)
	};

	var $forEach = arrayIteration.forEach;
	var HIDDEN = sharedKey('hidden');
	var SYMBOL = 'Symbol';
	var PROTOTYPE$1 = 'prototype';
	var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
	var setInternalState = internalState.set;
	var getInternalState = internalState.getterFor(SYMBOL);
	var ObjectPrototype = Object[PROTOTYPE$1];
	var $Symbol = global_1.Symbol;
	var $stringify = getBuiltIn('JSON', 'stringify');
	var nativeGetOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
	var nativeDefineProperty$1 = objectDefineProperty.f;
	var nativeGetOwnPropertyNames$1 = objectGetOwnPropertyNamesExternal.f;
	var nativePropertyIsEnumerable$1 = objectPropertyIsEnumerable.f;
	var AllSymbols = shared('symbols');
	var ObjectPrototypeSymbols = shared('op-symbols');
	var StringToSymbolRegistry = shared('string-to-symbol-registry');
	var SymbolToStringRegistry = shared('symbol-to-string-registry');
	var WellKnownSymbolsStore$1 = shared('wks');
	var QObject = global_1.QObject; // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173

	var USE_SETTER = !QObject || !QObject[PROTOTYPE$1] || !QObject[PROTOTYPE$1].findChild; // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687

	var setSymbolDescriptor = descriptors && fails(function () {
	  return objectCreate(nativeDefineProperty$1({}, 'a', {
	    get: function () {
	      return nativeDefineProperty$1(this, 'a', {
	        value: 7
	      }).a;
	    }
	  })).a != 7;
	}) ? function (O, P, Attributes) {
	  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor$1(ObjectPrototype, P);
	  if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
	  nativeDefineProperty$1(O, P, Attributes);

	  if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
	    nativeDefineProperty$1(ObjectPrototype, P, ObjectPrototypeDescriptor);
	  }
	} : nativeDefineProperty$1;

	var wrap = function (tag, description) {
	  var symbol = AllSymbols[tag] = objectCreate($Symbol[PROTOTYPE$1]);
	  setInternalState(symbol, {
	    type: SYMBOL,
	    tag: tag,
	    description: description
	  });
	  if (!descriptors) symbol.description = description;
	  return symbol;
	};

	var isSymbol = useSymbolAsUid ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  return Object(it) instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(O, P, Attributes) {
	  if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
	  anObject(O);
	  var key = toPrimitive(P, true);
	  anObject(Attributes);

	  if (has(AllSymbols, key)) {
	    if (!Attributes.enumerable) {
	      if (!has(O, HIDDEN)) nativeDefineProperty$1(O, HIDDEN, createPropertyDescriptor(1, {}));
	      O[HIDDEN][key] = true;
	    } else {
	      if (has(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
	      Attributes = objectCreate(Attributes, {
	        enumerable: createPropertyDescriptor(0, false)
	      });
	    }

	    return setSymbolDescriptor(O, key, Attributes);
	  }

	  return nativeDefineProperty$1(O, key, Attributes);
	};

	var $defineProperties = function defineProperties(O, Properties) {
	  anObject(O);
	  var properties = toIndexedObject(Properties);
	  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
	  $forEach(keys, function (key) {
	    if (!descriptors || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
	  });
	  return O;
	};

	var $create = function create(O, Properties) {
	  return Properties === undefined ? objectCreate(O) : $defineProperties(objectCreate(O), Properties);
	};

	var $propertyIsEnumerable = function propertyIsEnumerable(V) {
	  var P = toPrimitive(V, true);
	  var enumerable = nativePropertyIsEnumerable$1.call(this, P);
	  if (this === ObjectPrototype && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P)) return false;
	  return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
	};

	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
	  var it = toIndexedObject(O);
	  var key = toPrimitive(P, true);
	  if (it === ObjectPrototype && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) return;
	  var descriptor = nativeGetOwnPropertyDescriptor$1(it, key);

	  if (descriptor && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) {
	    descriptor.enumerable = true;
	  }

	  return descriptor;
	};

	var $getOwnPropertyNames = function getOwnPropertyNames(O) {
	  var names = nativeGetOwnPropertyNames$1(toIndexedObject(O));
	  var result = [];
	  $forEach(names, function (key) {
	    if (!has(AllSymbols, key) && !has(hiddenKeys, key)) result.push(key);
	  });
	  return result;
	};

	var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
	  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
	  var names = nativeGetOwnPropertyNames$1(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
	  var result = [];
	  $forEach(names, function (key) {
	    if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype, key))) {
	      result.push(AllSymbols[key]);
	    }
	  });
	  return result;
	}; // `Symbol` constructor
	// https://tc39.github.io/ecma262/#sec-symbol-constructor


	if (!nativeSymbol) {
	  $Symbol = function Symbol() {
	    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
	    var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
	    var tag = uid(description);

	    var setter = function (value) {
	      if (this === ObjectPrototype) setter.call(ObjectPrototypeSymbols, value);
	      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
	    };

	    if (descriptors && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, {
	      configurable: true,
	      set: setter
	    });
	    return wrap(tag, description);
	  };

	  redefine($Symbol[PROTOTYPE$1], 'toString', function toString() {
	    return getInternalState(this).tag;
	  });
	  redefine($Symbol, 'withoutSetter', function (description) {
	    return wrap(uid(description), description);
	  });
	  objectPropertyIsEnumerable.f = $propertyIsEnumerable;
	  objectDefineProperty.f = $defineProperty;
	  objectGetOwnPropertyDescriptor.f = $getOwnPropertyDescriptor;
	  objectGetOwnPropertyNames.f = objectGetOwnPropertyNamesExternal.f = $getOwnPropertyNames;
	  objectGetOwnPropertySymbols.f = $getOwnPropertySymbols;

	  wellKnownSymbolWrapped.f = function (name) {
	    return wrap(wellKnownSymbol(name), name);
	  };

	  if (descriptors) {
	    // https://github.com/tc39/proposal-Symbol-description
	    nativeDefineProperty$1($Symbol[PROTOTYPE$1], 'description', {
	      configurable: true,
	      get: function description() {
	        return getInternalState(this).description;
	      }
	    });

	    {
	      redefine(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, {
	        unsafe: true
	      });
	    }
	  }
	}

	_export({
	  global: true,
	  wrap: true,
	  forced: !nativeSymbol,
	  sham: !nativeSymbol
	}, {
	  Symbol: $Symbol
	});
	$forEach(objectKeys(WellKnownSymbolsStore$1), function (name) {
	  defineWellKnownSymbol(name);
	});
	_export({
	  target: SYMBOL,
	  stat: true,
	  forced: !nativeSymbol
	}, {
	  // `Symbol.for` method
	  // https://tc39.github.io/ecma262/#sec-symbol.for
	  'for': function (key) {
	    var string = String(key);
	    if (has(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
	    var symbol = $Symbol(string);
	    StringToSymbolRegistry[string] = symbol;
	    SymbolToStringRegistry[symbol] = string;
	    return symbol;
	  },
	  // `Symbol.keyFor` method
	  // https://tc39.github.io/ecma262/#sec-symbol.keyfor
	  keyFor: function keyFor(sym) {
	    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
	    if (has(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
	  },
	  useSetter: function () {
	    USE_SETTER = true;
	  },
	  useSimple: function () {
	    USE_SETTER = false;
	  }
	});
	_export({
	  target: 'Object',
	  stat: true,
	  forced: !nativeSymbol,
	  sham: !descriptors
	}, {
	  // `Object.create` method
	  // https://tc39.github.io/ecma262/#sec-object.create
	  create: $create,
	  // `Object.defineProperty` method
	  // https://tc39.github.io/ecma262/#sec-object.defineproperty
	  defineProperty: $defineProperty,
	  // `Object.defineProperties` method
	  // https://tc39.github.io/ecma262/#sec-object.defineproperties
	  defineProperties: $defineProperties,
	  // `Object.getOwnPropertyDescriptor` method
	  // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
	});
	_export({
	  target: 'Object',
	  stat: true,
	  forced: !nativeSymbol
	}, {
	  // `Object.getOwnPropertyNames` method
	  // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // `Object.getOwnPropertySymbols` method
	  // https://tc39.github.io/ecma262/#sec-object.getownpropertysymbols
	  getOwnPropertySymbols: $getOwnPropertySymbols
	}); // Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
	// https://bugs.chromium.org/p/v8/issues/detail?id=3443

	_export({
	  target: 'Object',
	  stat: true,
	  forced: fails(function () {
	    objectGetOwnPropertySymbols.f(1);
	  })
	}, {
	  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
	    return objectGetOwnPropertySymbols.f(toObject(it));
	  }
	}); // `JSON.stringify` method behavior with symbols
	// https://tc39.github.io/ecma262/#sec-json.stringify

	if ($stringify) {
	  var FORCED_JSON_STRINGIFY = !nativeSymbol || fails(function () {
	    var symbol = $Symbol(); // MS Edge converts symbol values to JSON as {}

	    return $stringify([symbol]) != '[null]' // WebKit converts symbol values to JSON as null
	    || $stringify({
	      a: symbol
	    }) != '{}' // V8 throws on boxed symbols
	    || $stringify(Object(symbol)) != '{}';
	  });
	  _export({
	    target: 'JSON',
	    stat: true,
	    forced: FORCED_JSON_STRINGIFY
	  }, {
	    // eslint-disable-next-line no-unused-vars
	    stringify: function stringify(it, replacer, space) {
	      var args = [it];
	      var index = 1;
	      var $replacer;

	      while (arguments.length > index) args.push(arguments[index++]);

	      $replacer = replacer;
	      if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined

	      if (!isArray(replacer)) replacer = function (key, value) {
	        if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
	        if (!isSymbol(value)) return value;
	      };
	      args[1] = replacer;
	      return $stringify.apply(null, args);
	    }
	  });
	} // `Symbol.prototype[@@toPrimitive]` method
	// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@toprimitive


	if (!$Symbol[PROTOTYPE$1][TO_PRIMITIVE]) {
	  createNonEnumerableProperty($Symbol[PROTOTYPE$1], TO_PRIMITIVE, $Symbol[PROTOTYPE$1].valueOf);
	} // `Symbol.prototype[@@toStringTag]` property
	// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@tostringtag


	setToStringTag($Symbol, SYMBOL);
	hiddenKeys[HIDDEN] = true;

	var defineProperty$2 = objectDefineProperty.f;
	var NativeSymbol = global_1.Symbol;

	if (descriptors && typeof NativeSymbol == 'function' && (!('description' in NativeSymbol.prototype) || // Safari 12 bug
	NativeSymbol().description !== undefined)) {
	  var EmptyStringDescriptionStore = {}; // wrap Symbol constructor for correct work with undefined description

	  var SymbolWrapper = function Symbol() {
	    var description = arguments.length < 1 || arguments[0] === undefined ? undefined : String(arguments[0]);
	    var result = this instanceof SymbolWrapper ? new NativeSymbol(description) // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
	    : description === undefined ? NativeSymbol() : NativeSymbol(description);
	    if (description === '') EmptyStringDescriptionStore[result] = true;
	    return result;
	  };

	  copyConstructorProperties(SymbolWrapper, NativeSymbol);
	  var symbolPrototype = SymbolWrapper.prototype = NativeSymbol.prototype;
	  symbolPrototype.constructor = SymbolWrapper;
	  var symbolToString = symbolPrototype.toString;
	  var native = String(NativeSymbol('test')) == 'Symbol(test)';
	  var regexp = /^Symbol\((.*)\)[^)]+$/;
	  defineProperty$2(symbolPrototype, 'description', {
	    configurable: true,
	    get: function description() {
	      var symbol = isObject(this) ? this.valueOf() : this;
	      var string = symbolToString.call(symbol);
	      if (has(EmptyStringDescriptionStore, symbol)) return '';
	      var desc = native ? string.slice(7, -1) : string.replace(regexp, '$1');
	      return desc === '' ? undefined : desc;
	    }
	  });
	  _export({
	    global: true,
	    forced: true
	  }, {
	    Symbol: SymbolWrapper
	  });
	}

	// https://tc39.github.io/ecma262/#sec-symbol.iterator

	defineWellKnownSymbol('iterator');

	// https://tc39.github.io/ecma262/#sec-symbol.tostringtag

	defineWellKnownSymbol('toStringTag');

	var createProperty = function (object, key, value) {
	  var propertyKey = toPrimitive(key);
	  if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));else object[propertyKey] = value;
	};

	var engineUserAgent = getBuiltIn('navigator', 'userAgent') || '';

	var process = global_1.process;
	var versions = process && process.versions;
	var v8 = versions && versions.v8;
	var match, version;

	if (v8) {
	  match = v8.split('.');
	  version = match[0] + match[1];
	} else if (engineUserAgent) {
	  match = engineUserAgent.match(/Edge\/(\d+)/);

	  if (!match || match[1] >= 74) {
	    match = engineUserAgent.match(/Chrome\/(\d+)/);
	    if (match) version = match[1];
	  }
	}

	var engineV8Version = version && +version;

	var SPECIES$1 = wellKnownSymbol('species');

	var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
	  // We can't use this feature detection in V8 since it causes
	  // deoptimization and serious performance degradation
	  // https://github.com/zloirock/core-js/issues/677
	  return engineV8Version >= 51 || !fails(function () {
	    var array = [];
	    var constructor = array.constructor = {};

	    constructor[SPECIES$1] = function () {
	      return {
	        foo: 1
	      };
	    };

	    return array[METHOD_NAME](Boolean).foo !== 1;
	  });
	};

	var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
	var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
	var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded'; // We can't use this feature detection in V8 since it causes
	// deoptimization and serious performance degradation
	// https://github.com/zloirock/core-js/issues/679

	var IS_CONCAT_SPREADABLE_SUPPORT = engineV8Version >= 51 || !fails(function () {
	  var array = [];
	  array[IS_CONCAT_SPREADABLE] = false;
	  return array.concat()[0] !== array;
	});
	var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

	var isConcatSpreadable = function (O) {
	  if (!isObject(O)) return false;
	  var spreadable = O[IS_CONCAT_SPREADABLE];
	  return spreadable !== undefined ? !!spreadable : isArray(O);
	};

	var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT; // `Array.prototype.concat` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.concat
	// with adding support of @@isConcatSpreadable and @@species

	_export({
	  target: 'Array',
	  proto: true,
	  forced: FORCED
	}, {
	  concat: function concat(arg) {
	    // eslint-disable-line no-unused-vars
	    var O = toObject(this);
	    var A = arraySpeciesCreate(O, 0);
	    var n = 0;
	    var i, k, length, len, E;

	    for (i = -1, length = arguments.length; i < length; i++) {
	      E = i === -1 ? O : arguments[i];

	      if (isConcatSpreadable(E)) {
	        len = toLength(E.length);
	        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);

	        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
	      } else {
	        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
	        createProperty(A, n++, E);
	      }
	    }

	    A.length = n;
	    return A;
	  }
	});

	var arrayMethodIsStrict = function (METHOD_NAME, argument) {
	  var method = [][METHOD_NAME];
	  return !!method && fails(function () {
	    // eslint-disable-next-line no-useless-call,no-throw-literal
	    method.call(null, argument || function () {
	      throw 1;
	    }, 1);
	  });
	};

	var defineProperty$3 = Object.defineProperty;
	var cache = {};

	var thrower = function (it) {
	  throw it;
	};

	var arrayMethodUsesToLength = function (METHOD_NAME, options) {
	  if (has(cache, METHOD_NAME)) return cache[METHOD_NAME];
	  if (!options) options = {};
	  var method = [][METHOD_NAME];
	  var ACCESSORS = has(options, 'ACCESSORS') ? options.ACCESSORS : false;
	  var argument0 = has(options, 0) ? options[0] : thrower;
	  var argument1 = has(options, 1) ? options[1] : undefined;
	  return cache[METHOD_NAME] = !!method && !fails(function () {
	    if (ACCESSORS && !descriptors) return true;
	    var O = {
	      length: -1
	    };
	    if (ACCESSORS) defineProperty$3(O, 1, {
	      enumerable: true,
	      get: thrower
	    });else O[1] = 1;
	    method.call(O, argument0, argument1);
	  });
	};

	var $every = arrayIteration.every;
	var STRICT_METHOD = arrayMethodIsStrict('every');
	var USES_TO_LENGTH = arrayMethodUsesToLength('every'); // `Array.prototype.every` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.every

	_export({
	  target: 'Array',
	  proto: true,
	  forced: !STRICT_METHOD || !USES_TO_LENGTH
	}, {
	  every: function every(callbackfn
	  /* , thisArg */
	  ) {
	    return $every(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var $filter = arrayIteration.filter;
	var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter'); // Edge 14- issue

	var USES_TO_LENGTH$1 = arrayMethodUsesToLength('filter'); // `Array.prototype.filter` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.filter
	// with adding support of @@species

	_export({
	  target: 'Array',
	  proto: true,
	  forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH$1
	}, {
	  filter: function filter(callbackfn
	  /* , thisArg */
	  ) {
	    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var $forEach$1 = arrayIteration.forEach;
	var STRICT_METHOD$1 = arrayMethodIsStrict('forEach');
	var USES_TO_LENGTH$2 = arrayMethodUsesToLength('forEach'); // `Array.prototype.forEach` method implementation
	// https://tc39.github.io/ecma262/#sec-array.prototype.foreach

	var arrayForEach = !STRICT_METHOD$1 || !USES_TO_LENGTH$2 ? function forEach(callbackfn
	/* , thisArg */
	) {
	  return $forEach$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	} : [].forEach;

	// https://tc39.github.io/ecma262/#sec-array.prototype.foreach


	_export({
	  target: 'Array',
	  proto: true,
	  forced: [].forEach != arrayForEach
	}, {
	  forEach: arrayForEach
	});

	var $indexOf = arrayIncludes.indexOf;
	var nativeIndexOf = [].indexOf;
	var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
	var STRICT_METHOD$2 = arrayMethodIsStrict('indexOf');
	var USES_TO_LENGTH$3 = arrayMethodUsesToLength('indexOf', {
	  ACCESSORS: true,
	  1: 0
	}); // `Array.prototype.indexOf` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.indexof

	_export({
	  target: 'Array',
	  proto: true,
	  forced: NEGATIVE_ZERO || !STRICT_METHOD$2 || !USES_TO_LENGTH$3
	}, {
	  indexOf: function indexOf(searchElement
	  /* , fromIndex = 0 */
	  ) {
	    return NEGATIVE_ZERO // convert -0 to +0
	    ? nativeIndexOf.apply(this, arguments) || 0 : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var nativeJoin = [].join;
	var ES3_STRINGS = indexedObject != Object;
	var STRICT_METHOD$3 = arrayMethodIsStrict('join', ','); // `Array.prototype.join` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.join

	_export({
	  target: 'Array',
	  proto: true,
	  forced: ES3_STRINGS || !STRICT_METHOD$3
	}, {
	  join: function join(separator) {
	    return nativeJoin.call(toIndexedObject(this), separator === undefined ? ',' : separator);
	  }
	});

	var $map = arrayIteration.map;
	var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport('map'); // FF49- issue

	var USES_TO_LENGTH$4 = arrayMethodUsesToLength('map'); // `Array.prototype.map` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.map
	// with adding support of @@species

	_export({
	  target: 'Array',
	  proto: true,
	  forced: !HAS_SPECIES_SUPPORT$1 || !USES_TO_LENGTH$4
	}, {
	  map: function map(callbackfn
	  /* , thisArg */
	  ) {
	    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport('slice');
	var USES_TO_LENGTH$5 = arrayMethodUsesToLength('slice', {
	  ACCESSORS: true,
	  0: 0,
	  1: 2
	});
	var SPECIES$2 = wellKnownSymbol('species');
	var nativeSlice = [].slice;
	var max$1 = Math.max; // `Array.prototype.slice` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.slice
	// fallback for not array-like ES3 strings and DOM objects

	_export({
	  target: 'Array',
	  proto: true,
	  forced: !HAS_SPECIES_SUPPORT$2 || !USES_TO_LENGTH$5
	}, {
	  slice: function slice(start, end) {
	    var O = toIndexedObject(this);
	    var length = toLength(O.length);
	    var k = toAbsoluteIndex(start, length);
	    var fin = toAbsoluteIndex(end === undefined ? length : end, length); // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible

	    var Constructor, result, n;

	    if (isArray(O)) {
	      Constructor = O.constructor; // cross-realm fallback

	      if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
	        Constructor = undefined;
	      } else if (isObject(Constructor)) {
	        Constructor = Constructor[SPECIES$2];
	        if (Constructor === null) Constructor = undefined;
	      }

	      if (Constructor === Array || Constructor === undefined) {
	        return nativeSlice.call(O, k, fin);
	      }
	    }

	    result = new (Constructor === undefined ? Array : Constructor)(max$1(fin - k, 0));

	    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);

	    result.length = n;
	    return result;
	  }
	});

	var $some = arrayIteration.some;
	var STRICT_METHOD$4 = arrayMethodIsStrict('some');
	var USES_TO_LENGTH$6 = arrayMethodUsesToLength('some'); // `Array.prototype.some` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.some

	_export({
	  target: 'Array',
	  proto: true,
	  forced: !STRICT_METHOD$4 || !USES_TO_LENGTH$6
	}, {
	  some: function some(callbackfn
	  /* , thisArg */
	  ) {
	    return $some(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var HAS_SPECIES_SUPPORT$3 = arrayMethodHasSpeciesSupport('splice');
	var USES_TO_LENGTH$7 = arrayMethodUsesToLength('splice', {
	  ACCESSORS: true,
	  0: 0,
	  1: 2
	});
	var max$2 = Math.max;
	var min$2 = Math.min;
	var MAX_SAFE_INTEGER$1 = 0x1FFFFFFFFFFFFF;
	var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded'; // `Array.prototype.splice` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.splice
	// with adding support of @@species

	_export({
	  target: 'Array',
	  proto: true,
	  forced: !HAS_SPECIES_SUPPORT$3 || !USES_TO_LENGTH$7
	}, {
	  splice: function splice(start, deleteCount
	  /* , ...items */
	  ) {
	    var O = toObject(this);
	    var len = toLength(O.length);
	    var actualStart = toAbsoluteIndex(start, len);
	    var argumentsLength = arguments.length;
	    var insertCount, actualDeleteCount, A, k, from, to;

	    if (argumentsLength === 0) {
	      insertCount = actualDeleteCount = 0;
	    } else if (argumentsLength === 1) {
	      insertCount = 0;
	      actualDeleteCount = len - actualStart;
	    } else {
	      insertCount = argumentsLength - 2;
	      actualDeleteCount = min$2(max$2(toInteger(deleteCount), 0), len - actualStart);
	    }

	    if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER$1) {
	      throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
	    }

	    A = arraySpeciesCreate(O, actualDeleteCount);

	    for (k = 0; k < actualDeleteCount; k++) {
	      from = actualStart + k;
	      if (from in O) createProperty(A, k, O[from]);
	    }

	    A.length = actualDeleteCount;

	    if (insertCount < actualDeleteCount) {
	      for (k = actualStart; k < len - actualDeleteCount; k++) {
	        from = k + actualDeleteCount;
	        to = k + insertCount;
	        if (from in O) O[to] = O[from];else delete O[to];
	      }

	      for (k = len; k > len - actualDeleteCount + insertCount; k--) delete O[k - 1];
	    } else if (insertCount > actualDeleteCount) {
	      for (k = len - actualDeleteCount; k > actualStart; k--) {
	        from = k + actualDeleteCount - 1;
	        to = k + insertCount - 1;
	        if (from in O) O[to] = O[from];else delete O[to];
	      }
	    }

	    for (k = 0; k < insertCount; k++) {
	      O[k + actualStart] = arguments[k + 2];
	    }

	    O.length = len - actualDeleteCount + insertCount;
	    return A;
	  }
	});

	var defineProperty$4 = objectDefineProperty.f;
	var FunctionPrototype = Function.prototype;
	var FunctionPrototypeToString = FunctionPrototype.toString;
	var nameRE = /^\s*function ([^ (]*)/;
	var NAME = 'name'; // Function instances `.name` property
	// https://tc39.github.io/ecma262/#sec-function-instances-name

	if (descriptors && !(NAME in FunctionPrototype)) {
	  defineProperty$4(FunctionPrototype, NAME, {
	    configurable: true,
	    get: function () {
	      try {
	        return FunctionPrototypeToString.call(this).match(nameRE)[1];
	      } catch (error) {
	        return '';
	      }
	    }
	  });
	}

	// https://tc39.github.io/ecma262/#sec-json-@@tostringtag

	setToStringTag(global_1.JSON, 'JSON', true);

	// https://tc39.github.io/ecma262/#sec-math-@@tostringtag

	setToStringTag(Math, 'Math', true);

	var aPossiblePrototype = function (it) {
	  if (!isObject(it) && it !== null) {
	    throw TypeError("Can't set " + String(it) + ' as a prototype');
	  }

	  return it;
	};

	// https://tc39.github.io/ecma262/#sec-object.setprototypeof
	// Works with __proto__ only. Old v8 can't work with null proto objects.

	/* eslint-disable no-proto */

	var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
	  var CORRECT_SETTER = false;
	  var test = {};
	  var setter;

	  try {
	    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
	    setter.call(test, []);
	    CORRECT_SETTER = test instanceof Array;
	  } catch (error) {
	    /* empty */
	  }

	  return function setPrototypeOf(O, proto) {
	    anObject(O);
	    aPossiblePrototype(proto);
	    if (CORRECT_SETTER) setter.call(O, proto);else O.__proto__ = proto;
	    return O;
	  };
	}() : undefined);

	var inheritIfRequired = function ($this, dummy, Wrapper) {
	  var NewTarget, NewTargetPrototype;
	  if ( // it can work only with native `setPrototypeOf`
	  objectSetPrototypeOf && // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
	  typeof (NewTarget = dummy.constructor) == 'function' && NewTarget !== Wrapper && isObject(NewTargetPrototype = NewTarget.prototype) && NewTargetPrototype !== Wrapper.prototype) objectSetPrototypeOf($this, NewTargetPrototype);
	  return $this;
	};

	// a string of all valid unicode whitespaces
	// eslint-disable-next-line max-len
	var whitespaces = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

	var whitespace = '[' + whitespaces + ']';
	var ltrim = RegExp('^' + whitespace + whitespace + '*');
	var rtrim = RegExp(whitespace + whitespace + '*$'); // `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation

	var createMethod$2 = function (TYPE) {
	  return function ($this) {
	    var string = String(requireObjectCoercible($this));
	    if (TYPE & 1) string = string.replace(ltrim, '');
	    if (TYPE & 2) string = string.replace(rtrim, '');
	    return string;
	  };
	};

	var stringTrim = {
	  // `String.prototype.{ trimLeft, trimStart }` methods
	  // https://tc39.github.io/ecma262/#sec-string.prototype.trimstart
	  start: createMethod$2(1),
	  // `String.prototype.{ trimRight, trimEnd }` methods
	  // https://tc39.github.io/ecma262/#sec-string.prototype.trimend
	  end: createMethod$2(2),
	  // `String.prototype.trim` method
	  // https://tc39.github.io/ecma262/#sec-string.prototype.trim
	  trim: createMethod$2(3)
	};

	var getOwnPropertyNames = objectGetOwnPropertyNames.f;
	var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;
	var defineProperty$5 = objectDefineProperty.f;
	var trim = stringTrim.trim;
	var NUMBER = 'Number';
	var NativeNumber = global_1[NUMBER];
	var NumberPrototype = NativeNumber.prototype; // Opera ~12 has broken Object#toString

	var BROKEN_CLASSOF = classofRaw(objectCreate(NumberPrototype)) == NUMBER; // `ToNumber` abstract operation
	// https://tc39.github.io/ecma262/#sec-tonumber

	var toNumber = function (argument) {
	  var it = toPrimitive(argument, false);
	  var first, third, radix, maxCode, digits, length, index, code;

	  if (typeof it == 'string' && it.length > 2) {
	    it = trim(it);
	    first = it.charCodeAt(0);

	    if (first === 43 || first === 45) {
	      third = it.charCodeAt(2);
	      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
	    } else if (first === 48) {
	      switch (it.charCodeAt(1)) {
	        case 66:
	        case 98:
	          radix = 2;
	          maxCode = 49;
	          break;
	        // fast equal of /^0b[01]+$/i

	        case 79:
	        case 111:
	          radix = 8;
	          maxCode = 55;
	          break;
	        // fast equal of /^0o[0-7]+$/i

	        default:
	          return +it;
	      }

	      digits = it.slice(2);
	      length = digits.length;

	      for (index = 0; index < length; index++) {
	        code = digits.charCodeAt(index); // parseInt parses a string to a first unavailable symbol
	        // but ToNumber should return NaN if a string contains unavailable symbols

	        if (code < 48 || code > maxCode) return NaN;
	      }

	      return parseInt(digits, radix);
	    }
	  }

	  return +it;
	}; // `Number` constructor
	// https://tc39.github.io/ecma262/#sec-number-constructor


	if (isForced_1(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'))) {
	  var NumberWrapper = function Number(value) {
	    var it = arguments.length < 1 ? 0 : value;
	    var dummy = this;
	    return dummy instanceof NumberWrapper // check on 1..constructor(foo) case
	    && (BROKEN_CLASSOF ? fails(function () {
	      NumberPrototype.valueOf.call(dummy);
	    }) : classofRaw(dummy) != NUMBER) ? inheritIfRequired(new NativeNumber(toNumber(it)), dummy, NumberWrapper) : toNumber(it);
	  };

	  for (var keys$1 = descriptors ? getOwnPropertyNames(NativeNumber) : ( // ES3:
	  'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' + // ES2015 (in case, if modules with ES2015 Number statics required before):
	  'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' + 'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger').split(','), j = 0, key; keys$1.length > j; j++) {
	    if (has(NativeNumber, key = keys$1[j]) && !has(NumberWrapper, key)) {
	      defineProperty$5(NumberWrapper, key, getOwnPropertyDescriptor$2(NativeNumber, key));
	    }
	  }

	  NumberWrapper.prototype = NumberPrototype;
	  NumberPrototype.constructor = NumberWrapper;
	  redefine(global_1, NUMBER, NumberWrapper);
	}

	var freezing = !fails(function () {
	  return Object.isExtensible(Object.preventExtensions({}));
	});

	var internalMetadata = createCommonjsModule(function (module) {
	  var defineProperty = objectDefineProperty.f;
	  var METADATA = uid('meta');
	  var id = 0;

	  var isExtensible = Object.isExtensible || function () {
	    return true;
	  };

	  var setMetadata = function (it) {
	    defineProperty(it, METADATA, {
	      value: {
	        objectID: 'O' + ++id,
	        // object ID
	        weakData: {} // weak collections IDs

	      }
	    });
	  };

	  var fastKey = function (it, create) {
	    // return a primitive with prefix
	    if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;

	    if (!has(it, METADATA)) {
	      // can't set metadata to uncaught frozen object
	      if (!isExtensible(it)) return 'F'; // not necessary to add metadata

	      if (!create) return 'E'; // add missing metadata

	      setMetadata(it); // return object ID
	    }

	    return it[METADATA].objectID;
	  };

	  var getWeakData = function (it, create) {
	    if (!has(it, METADATA)) {
	      // can't set metadata to uncaught frozen object
	      if (!isExtensible(it)) return true; // not necessary to add metadata

	      if (!create) return false; // add missing metadata

	      setMetadata(it); // return the store of weak collections IDs
	    }

	    return it[METADATA].weakData;
	  }; // add metadata on freeze-family methods calling


	  var onFreeze = function (it) {
	    if (freezing && meta.REQUIRED && isExtensible(it) && !has(it, METADATA)) setMetadata(it);
	    return it;
	  };

	  var meta = module.exports = {
	    REQUIRED: false,
	    fastKey: fastKey,
	    getWeakData: getWeakData,
	    onFreeze: onFreeze
	  };
	  hiddenKeys[METADATA] = true;
	});
	var internalMetadata_1 = internalMetadata.REQUIRED;
	var internalMetadata_2 = internalMetadata.fastKey;
	var internalMetadata_3 = internalMetadata.getWeakData;
	var internalMetadata_4 = internalMetadata.onFreeze;

	var onFreeze = internalMetadata.onFreeze;
	var nativeFreeze = Object.freeze;
	var FAILS_ON_PRIMITIVES = fails(function () {
	  nativeFreeze(1);
	}); // `Object.freeze` method
	// https://tc39.github.io/ecma262/#sec-object.freeze

	_export({
	  target: 'Object',
	  stat: true,
	  forced: FAILS_ON_PRIMITIVES,
	  sham: !freezing
	}, {
	  freeze: function freeze(it) {
	    return nativeFreeze && isObject(it) ? nativeFreeze(onFreeze(it)) : it;
	  }
	});

	var nativeGetOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;
	var FAILS_ON_PRIMITIVES$1 = fails(function () {
	  nativeGetOwnPropertyDescriptor$2(1);
	});
	var FORCED$1 = !descriptors || FAILS_ON_PRIMITIVES$1; // `Object.getOwnPropertyDescriptor` method
	// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor

	_export({
	  target: 'Object',
	  stat: true,
	  forced: FORCED$1,
	  sham: !descriptors
	}, {
	  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
	    return nativeGetOwnPropertyDescriptor$2(toIndexedObject(it), key);
	  }
	});

	var nativeGetOwnPropertyNames$2 = objectGetOwnPropertyNamesExternal.f;
	var FAILS_ON_PRIMITIVES$2 = fails(function () {
	  return !Object.getOwnPropertyNames(1);
	}); // `Object.getOwnPropertyNames` method
	// https://tc39.github.io/ecma262/#sec-object.getownpropertynames

	_export({
	  target: 'Object',
	  stat: true,
	  forced: FAILS_ON_PRIMITIVES$2
	}, {
	  getOwnPropertyNames: nativeGetOwnPropertyNames$2
	});

	var nativeIsExtensible = Object.isExtensible;
	var FAILS_ON_PRIMITIVES$3 = fails(function () {
	  nativeIsExtensible(1);
	}); // `Object.isExtensible` method
	// https://tc39.github.io/ecma262/#sec-object.isextensible

	_export({
	  target: 'Object',
	  stat: true,
	  forced: FAILS_ON_PRIMITIVES$3
	}, {
	  isExtensible: function isExtensible(it) {
	    return isObject(it) ? nativeIsExtensible ? nativeIsExtensible(it) : true : false;
	  }
	});

	var nativeIsFrozen = Object.isFrozen;
	var FAILS_ON_PRIMITIVES$4 = fails(function () {
	  nativeIsFrozen(1);
	}); // `Object.isFrozen` method
	// https://tc39.github.io/ecma262/#sec-object.isfrozen

	_export({
	  target: 'Object',
	  stat: true,
	  forced: FAILS_ON_PRIMITIVES$4
	}, {
	  isFrozen: function isFrozen(it) {
	    return isObject(it) ? nativeIsFrozen ? nativeIsFrozen(it) : false : true;
	  }
	});

	var FAILS_ON_PRIMITIVES$5 = fails(function () {
	  objectKeys(1);
	}); // `Object.keys` method
	// https://tc39.github.io/ecma262/#sec-object.keys

	_export({
	  target: 'Object',
	  stat: true,
	  forced: FAILS_ON_PRIMITIVES$5
	}, {
	  keys: function keys(it) {
	    return objectKeys(toObject(it));
	  }
	});

	var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');
	var test = {};
	test[TO_STRING_TAG$1] = 'z';
	var toStringTagSupport = String(test) === '[object z]';

	var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag'); // ES3 wrong here

	var CORRECT_ARGUMENTS = classofRaw(function () {
	  return arguments;
	}()) == 'Arguments'; // fallback for IE11 Script Access Denied error

	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (error) {
	    /* empty */
	  }
	}; // getting tag from ES6+ `Object.prototype.toString`


	var classof = toStringTagSupport ? classofRaw : function (it) {
	  var O, tag, result;
	  return it === undefined ? 'Undefined' : it === null ? 'Null' // @@toStringTag case
	  : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$2)) == 'string' ? tag // builtinTag case
	  : CORRECT_ARGUMENTS ? classofRaw(O) // ES3 arguments fallback
	  : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
	};

	// https://tc39.github.io/ecma262/#sec-object.prototype.tostring


	var objectToString = toStringTagSupport ? {}.toString : function toString() {
	  return '[object ' + classof(this) + ']';
	};

	// https://tc39.github.io/ecma262/#sec-object.prototype.tostring

	if (!toStringTagSupport) {
	  redefine(Object.prototype, 'toString', objectToString, {
	    unsafe: true
	  });
	}

	// https://tc39.github.io/ecma262/#sec-reflect.ownkeys

	_export({
	  target: 'Reflect',
	  stat: true
	}, {
	  ownKeys: ownKeys
	});

	var MATCH = wellKnownSymbol('match'); // `IsRegExp` abstract operation
	// https://tc39.github.io/ecma262/#sec-isregexp

	var isRegexp = function (it) {
	  var isRegExp;
	  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classofRaw(it) == 'RegExp');
	};

	// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags


	var regexpFlags = function () {
	  var that = anObject(this);
	  var result = '';
	  if (that.global) result += 'g';
	  if (that.ignoreCase) result += 'i';
	  if (that.multiline) result += 'm';
	  if (that.dotAll) result += 's';
	  if (that.unicode) result += 'u';
	  if (that.sticky) result += 'y';
	  return result;
	};

	// so we use an intermediate function.


	function RE(s, f) {
	  return RegExp(s, f);
	}

	var UNSUPPORTED_Y = fails(function () {
	  // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
	  var re = RE('a', 'y');
	  re.lastIndex = 2;
	  return re.exec('abcd') != null;
	});
	var BROKEN_CARET = fails(function () {
	  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
	  var re = RE('^r', 'gy');
	  re.lastIndex = 2;
	  return re.exec('str') != null;
	});
	var regexpStickyHelpers = {
	  UNSUPPORTED_Y: UNSUPPORTED_Y,
	  BROKEN_CARET: BROKEN_CARET
	};

	var SPECIES$3 = wellKnownSymbol('species');

	var setSpecies = function (CONSTRUCTOR_NAME) {
	  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
	  var defineProperty = objectDefineProperty.f;

	  if (descriptors && Constructor && !Constructor[SPECIES$3]) {
	    defineProperty(Constructor, SPECIES$3, {
	      configurable: true,
	      get: function () {
	        return this;
	      }
	    });
	  }
	};

	var defineProperty$6 = objectDefineProperty.f;
	var getOwnPropertyNames$1 = objectGetOwnPropertyNames.f;
	var setInternalState$1 = internalState.set;
	var MATCH$1 = wellKnownSymbol('match');
	var NativeRegExp = global_1.RegExp;
	var RegExpPrototype = NativeRegExp.prototype;
	var re1 = /a/g;
	var re2 = /a/g; // "new" should create a new object, old webkit bug

	var CORRECT_NEW = new NativeRegExp(re1) !== re1;
	var UNSUPPORTED_Y$1 = regexpStickyHelpers.UNSUPPORTED_Y;
	var FORCED$2 = descriptors && isForced_1('RegExp', !CORRECT_NEW || UNSUPPORTED_Y$1 || fails(function () {
	  re2[MATCH$1] = false; // RegExp constructor can alter flags and IsRegExp works correct with @@match

	  return NativeRegExp(re1) != re1 || NativeRegExp(re2) == re2 || NativeRegExp(re1, 'i') != '/a/i';
	})); // `RegExp` constructor
	// https://tc39.github.io/ecma262/#sec-regexp-constructor

	if (FORCED$2) {
	  var RegExpWrapper = function RegExp(pattern, flags) {
	    var thisIsRegExp = this instanceof RegExpWrapper;
	    var patternIsRegExp = isRegexp(pattern);
	    var flagsAreUndefined = flags === undefined;
	    var sticky;

	    if (!thisIsRegExp && patternIsRegExp && pattern.constructor === RegExpWrapper && flagsAreUndefined) {
	      return pattern;
	    }

	    if (CORRECT_NEW) {
	      if (patternIsRegExp && !flagsAreUndefined) pattern = pattern.source;
	    } else if (pattern instanceof RegExpWrapper) {
	      if (flagsAreUndefined) flags = regexpFlags.call(pattern);
	      pattern = pattern.source;
	    }

	    if (UNSUPPORTED_Y$1) {
	      sticky = !!flags && flags.indexOf('y') > -1;
	      if (sticky) flags = flags.replace(/y/g, '');
	    }

	    var result = inheritIfRequired(CORRECT_NEW ? new NativeRegExp(pattern, flags) : NativeRegExp(pattern, flags), thisIsRegExp ? this : RegExpPrototype, RegExpWrapper);
	    if (UNSUPPORTED_Y$1 && sticky) setInternalState$1(result, {
	      sticky: sticky
	    });
	    return result;
	  };

	  var proxy = function (key) {
	    key in RegExpWrapper || defineProperty$6(RegExpWrapper, key, {
	      configurable: true,
	      get: function () {
	        return NativeRegExp[key];
	      },
	      set: function (it) {
	        NativeRegExp[key] = it;
	      }
	    });
	  };

	  var keys$2 = getOwnPropertyNames$1(NativeRegExp);
	  var index = 0;

	  while (keys$2.length > index) proxy(keys$2[index++]);

	  RegExpPrototype.constructor = RegExpWrapper;
	  RegExpWrapper.prototype = RegExpPrototype;
	  redefine(global_1, 'RegExp', RegExpWrapper);
	} // https://tc39.github.io/ecma262/#sec-get-regexp-@@species


	setSpecies('RegExp');

	var nativeExec = RegExp.prototype.exec; // This always refers to the native implementation, because the
	// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
	// which loads this file before patching the method.

	var nativeReplace = String.prototype.replace;
	var patchedExec = nativeExec;

	var UPDATES_LAST_INDEX_WRONG = function () {
	  var re1 = /a/;
	  var re2 = /b*/g;
	  nativeExec.call(re1, 'a');
	  nativeExec.call(re2, 'a');
	  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
	}();

	var UNSUPPORTED_Y$2 = regexpStickyHelpers.UNSUPPORTED_Y || regexpStickyHelpers.BROKEN_CARET; // nonparticipating capturing group, copied from es5-shim's String#split patch.

	var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;
	var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$2;

	if (PATCH) {
	  patchedExec = function exec(str) {
	    var re = this;
	    var lastIndex, reCopy, match, i;
	    var sticky = UNSUPPORTED_Y$2 && re.sticky;
	    var flags = regexpFlags.call(re);
	    var source = re.source;
	    var charsAdded = 0;
	    var strCopy = str;

	    if (sticky) {
	      flags = flags.replace('y', '');

	      if (flags.indexOf('g') === -1) {
	        flags += 'g';
	      }

	      strCopy = String(str).slice(re.lastIndex); // Support anchored sticky behavior.

	      if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== '\n')) {
	        source = '(?: ' + source + ')';
	        strCopy = ' ' + strCopy;
	        charsAdded++;
	      } // ^(? + rx + ) is needed, in combination with some str slicing, to
	      // simulate the 'y' flag.


	      reCopy = new RegExp('^(?:' + source + ')', flags);
	    }

	    if (NPCG_INCLUDED) {
	      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
	    }

	    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;
	    match = nativeExec.call(sticky ? reCopy : re, strCopy);

	    if (sticky) {
	      if (match) {
	        match.input = match.input.slice(charsAdded);
	        match[0] = match[0].slice(charsAdded);
	        match.index = re.lastIndex;
	        re.lastIndex += match[0].length;
	      } else re.lastIndex = 0;
	    } else if (UPDATES_LAST_INDEX_WRONG && match) {
	      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
	    }

	    if (NPCG_INCLUDED && match && match.length > 1) {
	      // Fix browsers whose `exec` methods don't consistently return `undefined`
	      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
	      nativeReplace.call(match[0], reCopy, function () {
	        for (i = 1; i < arguments.length - 2; i++) {
	          if (arguments[i] === undefined) match[i] = undefined;
	        }
	      });
	    }

	    return match;
	  };
	}

	var regexpExec = patchedExec;

	_export({
	  target: 'RegExp',
	  proto: true,
	  forced: /./.exec !== regexpExec
	}, {
	  exec: regexpExec
	});

	var TO_STRING = 'toString';
	var RegExpPrototype$1 = RegExp.prototype;
	var nativeToString = RegExpPrototype$1[TO_STRING];
	var NOT_GENERIC = fails(function () {
	  return nativeToString.call({
	    source: 'a',
	    flags: 'b'
	  }) != '/a/b';
	}); // FF44- RegExp#toString has a wrong name

	var INCORRECT_NAME = nativeToString.name != TO_STRING; // `RegExp.prototype.toString` method
	// https://tc39.github.io/ecma262/#sec-regexp.prototype.tostring

	if (NOT_GENERIC || INCORRECT_NAME) {
	  redefine(RegExp.prototype, TO_STRING, function toString() {
	    var R = anObject(this);
	    var p = String(R.source);
	    var rf = R.flags;
	    var f = String(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype$1) ? regexpFlags.call(R) : rf);
	    return '/' + p + '/' + f;
	  }, {
	    unsafe: true
	  });
	}

	var iterators = {};

	var ITERATOR = wellKnownSymbol('iterator');
	var ArrayPrototype = Array.prototype; // check on default Array iterator

	var isArrayIteratorMethod = function (it) {
	  return it !== undefined && (iterators.Array === it || ArrayPrototype[ITERATOR] === it);
	};

	var ITERATOR$1 = wellKnownSymbol('iterator');

	var getIteratorMethod = function (it) {
	  if (it != undefined) return it[ITERATOR$1] || it['@@iterator'] || iterators[classof(it)];
	};

	var callWithSafeIterationClosing = function (iterator, fn, value, ENTRIES) {
	  try {
	    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value); // 7.4.6 IteratorClose(iterator, completion)
	  } catch (error) {
	    var returnMethod = iterator['return'];
	    if (returnMethod !== undefined) anObject(returnMethod.call(iterator));
	    throw error;
	  }
	};

	var iterate_1 = createCommonjsModule(function (module) {
	  var Result = function (stopped, result) {
	    this.stopped = stopped;
	    this.result = result;
	  };

	  var iterate = module.exports = function (iterable, fn, that, AS_ENTRIES, IS_ITERATOR) {
	    var boundFunction = functionBindContext(fn, that, AS_ENTRIES ? 2 : 1);
	    var iterator, iterFn, index, length, result, next, step;

	    if (IS_ITERATOR) {
	      iterator = iterable;
	    } else {
	      iterFn = getIteratorMethod(iterable);
	      if (typeof iterFn != 'function') throw TypeError('Target is not iterable'); // optimisation for array iterators

	      if (isArrayIteratorMethod(iterFn)) {
	        for (index = 0, length = toLength(iterable.length); length > index; index++) {
	          result = AS_ENTRIES ? boundFunction(anObject(step = iterable[index])[0], step[1]) : boundFunction(iterable[index]);
	          if (result && result instanceof Result) return result;
	        }

	        return new Result(false);
	      }

	      iterator = iterFn.call(iterable);
	    }

	    next = iterator.next;

	    while (!(step = next.call(iterator)).done) {
	      result = callWithSafeIterationClosing(iterator, boundFunction, step.value, AS_ENTRIES);
	      if (typeof result == 'object' && result && result instanceof Result) return result;
	    }

	    return new Result(false);
	  };

	  iterate.stop = function (result) {
	    return new Result(true, result);
	  };
	});

	var anInstance = function (it, Constructor, name) {
	  if (!(it instanceof Constructor)) {
	    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
	  }

	  return it;
	};

	var ITERATOR$2 = wellKnownSymbol('iterator');
	var SAFE_CLOSING = false;

	try {
	  var called = 0;
	  var iteratorWithReturn = {
	    next: function () {
	      return {
	        done: !!called++
	      };
	    },
	    'return': function () {
	      SAFE_CLOSING = true;
	    }
	  };

	  iteratorWithReturn[ITERATOR$2] = function () {
	    return this;
	  }; // eslint-disable-next-line no-throw-literal


	  Array.from(iteratorWithReturn, function () {
	    throw 2;
	  });
	} catch (error) {
	  /* empty */
	}

	var checkCorrectnessOfIteration = function (exec, SKIP_CLOSING) {
	  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
	  var ITERATION_SUPPORT = false;

	  try {
	    var object = {};

	    object[ITERATOR$2] = function () {
	      return {
	        next: function () {
	          return {
	            done: ITERATION_SUPPORT = true
	          };
	        }
	      };
	    };

	    exec(object);
	  } catch (error) {
	    /* empty */
	  }

	  return ITERATION_SUPPORT;
	};

	var collection = function (CONSTRUCTOR_NAME, wrapper, common) {
	  var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
	  var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
	  var ADDER = IS_MAP ? 'set' : 'add';
	  var NativeConstructor = global_1[CONSTRUCTOR_NAME];
	  var NativePrototype = NativeConstructor && NativeConstructor.prototype;
	  var Constructor = NativeConstructor;
	  var exported = {};

	  var fixMethod = function (KEY) {
	    var nativeMethod = NativePrototype[KEY];
	    redefine(NativePrototype, KEY, KEY == 'add' ? function add(value) {
	      nativeMethod.call(this, value === 0 ? 0 : value);
	      return this;
	    } : KEY == 'delete' ? function (key) {
	      return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
	    } : KEY == 'get' ? function get(key) {
	      return IS_WEAK && !isObject(key) ? undefined : nativeMethod.call(this, key === 0 ? 0 : key);
	    } : KEY == 'has' ? function has(key) {
	      return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
	    } : function set(key, value) {
	      nativeMethod.call(this, key === 0 ? 0 : key, value);
	      return this;
	    });
	  }; // eslint-disable-next-line max-len


	  if (isForced_1(CONSTRUCTOR_NAME, typeof NativeConstructor != 'function' || !(IS_WEAK || NativePrototype.forEach && !fails(function () {
	    new NativeConstructor().entries().next();
	  })))) {
	    // create collection constructor
	    Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
	    internalMetadata.REQUIRED = true;
	  } else if (isForced_1(CONSTRUCTOR_NAME, true)) {
	    var instance = new Constructor(); // early implementations not supports chaining

	    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance; // V8 ~ Chromium 40- weak-collections throws on primitives, but should return false

	    var THROWS_ON_PRIMITIVES = fails(function () {
	      instance.has(1);
	    }); // most early implementations doesn't supports iterables, most modern - not close it correctly
	    // eslint-disable-next-line no-new

	    var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function (iterable) {
	      new NativeConstructor(iterable);
	    }); // for early implementations -0 and +0 not the same

	    var BUGGY_ZERO = !IS_WEAK && fails(function () {
	      // V8 ~ Chromium 42- fails only with 5+ elements
	      var $instance = new NativeConstructor();
	      var index = 5;

	      while (index--) $instance[ADDER](index, index);

	      return !$instance.has(-0);
	    });

	    if (!ACCEPT_ITERABLES) {
	      Constructor = wrapper(function (dummy, iterable) {
	        anInstance(dummy, Constructor, CONSTRUCTOR_NAME);
	        var that = inheritIfRequired(new NativeConstructor(), dummy, Constructor);
	        if (iterable != undefined) iterate_1(iterable, that[ADDER], that, IS_MAP);
	        return that;
	      });
	      Constructor.prototype = NativePrototype;
	      NativePrototype.constructor = Constructor;
	    }

	    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
	      fixMethod('delete');
	      fixMethod('has');
	      IS_MAP && fixMethod('get');
	    }

	    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER); // weak collections should not contains .clear method

	    if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
	  }

	  exported[CONSTRUCTOR_NAME] = Constructor;
	  _export({
	    global: true,
	    forced: Constructor != NativeConstructor
	  }, exported);
	  setToStringTag(Constructor, CONSTRUCTOR_NAME);
	  if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);
	  return Constructor;
	};

	var redefineAll = function (target, src, options) {
	  for (var key in src) redefine(target, key, src[key], options);

	  return target;
	};

	var correctPrototypeGetter = !fails(function () {
	  function F() {
	    /* empty */
	  }

	  F.prototype.constructor = null;
	  return Object.getPrototypeOf(new F()) !== F.prototype;
	});

	var IE_PROTO$1 = sharedKey('IE_PROTO');
	var ObjectPrototype$1 = Object.prototype; // `Object.getPrototypeOf` method
	// https://tc39.github.io/ecma262/#sec-object.getprototypeof

	var objectGetPrototypeOf = correctPrototypeGetter ? Object.getPrototypeOf : function (O) {
	  O = toObject(O);
	  if (has(O, IE_PROTO$1)) return O[IE_PROTO$1];

	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  }

	  return O instanceof Object ? ObjectPrototype$1 : null;
	};

	var ITERATOR$3 = wellKnownSymbol('iterator');
	var BUGGY_SAFARI_ITERATORS = false;

	var returnThis = function () {
	  return this;
	}; // `%IteratorPrototype%` object
	// https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object


	var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

	if ([].keys) {
	  arrayIterator = [].keys(); // Safari 8 has buggy iterators w/o `next`

	  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;else {
	    PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(objectGetPrototypeOf(arrayIterator));
	    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
	  }
	}

	if (IteratorPrototype == undefined) IteratorPrototype = {}; // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()

	if ( !has(IteratorPrototype, ITERATOR$3)) {
	  createNonEnumerableProperty(IteratorPrototype, ITERATOR$3, returnThis);
	}

	var iteratorsCore = {
	  IteratorPrototype: IteratorPrototype,
	  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
	};

	var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;

	var returnThis$1 = function () {
	  return this;
	};

	var createIteratorConstructor = function (IteratorConstructor, NAME, next) {
	  var TO_STRING_TAG = NAME + ' Iterator';
	  IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, {
	    next: createPropertyDescriptor(1, next)
	  });
	  setToStringTag(IteratorConstructor, TO_STRING_TAG, false);
	  iterators[TO_STRING_TAG] = returnThis$1;
	  return IteratorConstructor;
	};

	var IteratorPrototype$2 = iteratorsCore.IteratorPrototype;
	var BUGGY_SAFARI_ITERATORS$1 = iteratorsCore.BUGGY_SAFARI_ITERATORS;
	var ITERATOR$4 = wellKnownSymbol('iterator');
	var KEYS = 'keys';
	var VALUES = 'values';
	var ENTRIES = 'entries';

	var returnThis$2 = function () {
	  return this;
	};

	var defineIterator = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
	  createIteratorConstructor(IteratorConstructor, NAME, next);

	  var getIterationMethod = function (KIND) {
	    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
	    if (!BUGGY_SAFARI_ITERATORS$1 && KIND in IterablePrototype) return IterablePrototype[KIND];

	    switch (KIND) {
	      case KEYS:
	        return function keys() {
	          return new IteratorConstructor(this, KIND);
	        };

	      case VALUES:
	        return function values() {
	          return new IteratorConstructor(this, KIND);
	        };

	      case ENTRIES:
	        return function entries() {
	          return new IteratorConstructor(this, KIND);
	        };
	    }

	    return function () {
	      return new IteratorConstructor(this);
	    };
	  };

	  var TO_STRING_TAG = NAME + ' Iterator';
	  var INCORRECT_VALUES_NAME = false;
	  var IterablePrototype = Iterable.prototype;
	  var nativeIterator = IterablePrototype[ITERATOR$4] || IterablePrototype['@@iterator'] || DEFAULT && IterablePrototype[DEFAULT];
	  var defaultIterator = !BUGGY_SAFARI_ITERATORS$1 && nativeIterator || getIterationMethod(DEFAULT);
	  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
	  var CurrentIteratorPrototype, methods, KEY; // fix native

	  if (anyNativeIterator) {
	    CurrentIteratorPrototype = objectGetPrototypeOf(anyNativeIterator.call(new Iterable()));

	    if (IteratorPrototype$2 !== Object.prototype && CurrentIteratorPrototype.next) {
	      if ( objectGetPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype$2) {
	        if (objectSetPrototypeOf) {
	          objectSetPrototypeOf(CurrentIteratorPrototype, IteratorPrototype$2);
	        } else if (typeof CurrentIteratorPrototype[ITERATOR$4] != 'function') {
	          createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR$4, returnThis$2);
	        }
	      } // Set @@toStringTag to native iterators


	      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true);
	    }
	  } // fix Array#{values, @@iterator}.name in V8 / FF


	  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
	    INCORRECT_VALUES_NAME = true;

	    defaultIterator = function values() {
	      return nativeIterator.call(this);
	    };
	  } // define iterator


	  if ( IterablePrototype[ITERATOR$4] !== defaultIterator) {
	    createNonEnumerableProperty(IterablePrototype, ITERATOR$4, defaultIterator);
	  }

	  iterators[NAME] = defaultIterator; // export additional methods

	  if (DEFAULT) {
	    methods = {
	      values: getIterationMethod(VALUES),
	      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
	      entries: getIterationMethod(ENTRIES)
	    };
	    if (FORCED) for (KEY in methods) {
	      if (BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
	        redefine(IterablePrototype, KEY, methods[KEY]);
	      }
	    } else _export({
	      target: NAME,
	      proto: true,
	      forced: BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME
	    }, methods);
	  }

	  return methods;
	};

	var defineProperty$7 = objectDefineProperty.f;
	var fastKey = internalMetadata.fastKey;
	var setInternalState$2 = internalState.set;
	var internalStateGetterFor = internalState.getterFor;
	var collectionStrong = {
	  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
	    var C = wrapper(function (that, iterable) {
	      anInstance(that, C, CONSTRUCTOR_NAME);
	      setInternalState$2(that, {
	        type: CONSTRUCTOR_NAME,
	        index: objectCreate(null),
	        first: undefined,
	        last: undefined,
	        size: 0
	      });
	      if (!descriptors) that.size = 0;
	      if (iterable != undefined) iterate_1(iterable, that[ADDER], that, IS_MAP);
	    });
	    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

	    var define = function (that, key, value) {
	      var state = getInternalState(that);
	      var entry = getEntry(that, key);
	      var previous, index; // change existing entry

	      if (entry) {
	        entry.value = value; // create new entry
	      } else {
	        state.last = entry = {
	          index: index = fastKey(key, true),
	          key: key,
	          value: value,
	          previous: previous = state.last,
	          next: undefined,
	          removed: false
	        };
	        if (!state.first) state.first = entry;
	        if (previous) previous.next = entry;
	        if (descriptors) state.size++;else that.size++; // add to index

	        if (index !== 'F') state.index[index] = entry;
	      }

	      return that;
	    };

	    var getEntry = function (that, key) {
	      var state = getInternalState(that); // fast case

	      var index = fastKey(key);
	      var entry;
	      if (index !== 'F') return state.index[index]; // frozen object case

	      for (entry = state.first; entry; entry = entry.next) {
	        if (entry.key == key) return entry;
	      }
	    };

	    redefineAll(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear() {
	        var that = this;
	        var state = getInternalState(that);
	        var data = state.index;
	        var entry = state.first;

	        while (entry) {
	          entry.removed = true;
	          if (entry.previous) entry.previous = entry.previous.next = undefined;
	          delete data[entry.index];
	          entry = entry.next;
	        }

	        state.first = state.last = undefined;
	        if (descriptors) state.size = 0;else that.size = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
	      'delete': function (key) {
	        var that = this;
	        var state = getInternalState(that);
	        var entry = getEntry(that, key);

	        if (entry) {
	          var next = entry.next;
	          var prev = entry.previous;
	          delete state.index[entry.index];
	          entry.removed = true;
	          if (prev) prev.next = next;
	          if (next) next.previous = prev;
	          if (state.first == entry) state.first = next;
	          if (state.last == entry) state.last = prev;
	          if (descriptors) state.size--;else that.size--;
	        }

	        return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn
	      /* , that = undefined */
	      ) {
	        var state = getInternalState(this);
	        var boundFunction = functionBindContext(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
	        var entry;

	        while (entry = entry ? entry.next : state.first) {
	          boundFunction(entry.value, entry.key, this); // revert to the last existing entry

	          while (entry && entry.removed) entry = entry.previous;
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key) {
	        return !!getEntry(this, key);
	      }
	    });
	    redefineAll(C.prototype, IS_MAP ? {
	      // 23.1.3.6 Map.prototype.get(key)
	      get: function get(key) {
	        var entry = getEntry(this, key);
	        return entry && entry.value;
	      },
	      // 23.1.3.9 Map.prototype.set(key, value)
	      set: function set(key, value) {
	        return define(this, key === 0 ? 0 : key, value);
	      }
	    } : {
	      // 23.2.3.1 Set.prototype.add(value)
	      add: function add(value) {
	        return define(this, value = value === 0 ? 0 : value, value);
	      }
	    });
	    if (descriptors) defineProperty$7(C.prototype, 'size', {
	      get: function () {
	        return getInternalState(this).size;
	      }
	    });
	    return C;
	  },
	  setStrong: function (C, CONSTRUCTOR_NAME, IS_MAP) {
	    var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
	    var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);
	    var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME); // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11

	    defineIterator(C, CONSTRUCTOR_NAME, function (iterated, kind) {
	      setInternalState$2(this, {
	        type: ITERATOR_NAME,
	        target: iterated,
	        state: getInternalCollectionState(iterated),
	        kind: kind,
	        last: undefined
	      });
	    }, function () {
	      var state = getInternalIteratorState(this);
	      var kind = state.kind;
	      var entry = state.last; // revert to the last existing entry

	      while (entry && entry.removed) entry = entry.previous; // get next entry


	      if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
	        // or finish the iteration
	        state.target = undefined;
	        return {
	          value: undefined,
	          done: true
	        };
	      } // return step by kind


	      if (kind == 'keys') return {
	        value: entry.key,
	        done: false
	      };
	      if (kind == 'values') return {
	        value: entry.value,
	        done: false
	      };
	      return {
	        value: [entry.key, entry.value],
	        done: false
	      };
	    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true); // add [@@species], 23.1.2.2, 23.2.2.2

	    setSpecies(CONSTRUCTOR_NAME);
	  }
	};

	// https://tc39.github.io/ecma262/#sec-set-objects


	var es_set = collection('Set', function (init) {
	  return function Set() {
	    return init(this, arguments.length ? arguments[0] : undefined);
	  };
	}, collectionStrong);

	var createMethod$3 = function (CONVERT_TO_STRING) {
	  return function ($this, pos) {
	    var S = String(requireObjectCoercible($this));
	    var position = toInteger(pos);
	    var size = S.length;
	    var first, second;
	    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
	    first = S.charCodeAt(position);
	    return first < 0xD800 || first > 0xDBFF || position + 1 === size || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF ? CONVERT_TO_STRING ? S.charAt(position) : first : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
	  };
	};

	var stringMultibyte = {
	  // `String.prototype.codePointAt` method
	  // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
	  codeAt: createMethod$3(false),
	  // `String.prototype.at` method
	  // https://github.com/mathiasbynens/String.prototype.at
	  charAt: createMethod$3(true)
	};

	var charAt = stringMultibyte.charAt;
	var STRING_ITERATOR = 'String Iterator';
	var setInternalState$3 = internalState.set;
	var getInternalState$1 = internalState.getterFor(STRING_ITERATOR); // `String.prototype[@@iterator]` method
	// https://tc39.github.io/ecma262/#sec-string.prototype-@@iterator

	defineIterator(String, 'String', function (iterated) {
	  setInternalState$3(this, {
	    type: STRING_ITERATOR,
	    string: String(iterated),
	    index: 0
	  }); // `%StringIteratorPrototype%.next` method
	  // https://tc39.github.io/ecma262/#sec-%stringiteratorprototype%.next
	}, function next() {
	  var state = getInternalState$1(this);
	  var string = state.string;
	  var index = state.index;
	  var point;
	  if (index >= string.length) return {
	    value: undefined,
	    done: true
	  };
	  point = charAt(string, index);
	  state.index += point.length;
	  return {
	    value: point,
	    done: false
	  };
	});

	var SPECIES$4 = wellKnownSymbol('species');
	var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
	  // #replace needs built-in support for named groups.
	  // #match works fine because it just return the exec results, even if it has
	  // a "grops" property.
	  var re = /./;

	  re.exec = function () {
	    var result = [];
	    result.groups = {
	      a: '7'
	    };
	    return result;
	  };

	  return ''.replace(re, '$<a>') !== '7';
	}); // IE <= 11 replaces $0 with the whole match, as if it was $&
	// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0

	var REPLACE_KEEPS_$0 = function () {
	  return 'a'.replace(/./, '$0') === '$0';
	}();

	var REPLACE = wellKnownSymbol('replace'); // Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string

	var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = function () {
	  if (/./[REPLACE]) {
	    return /./[REPLACE]('a', '$0') === '';
	  }

	  return false;
	}(); // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
	// Weex JS has frozen built-in prototypes, so use try / catch wrapper


	var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
	  var re = /(?:)/;
	  var originalExec = re.exec;

	  re.exec = function () {
	    return originalExec.apply(this, arguments);
	  };

	  var result = 'ab'.split(re);
	  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
	});

	var fixRegexpWellKnownSymbolLogic = function (KEY, length, exec, sham) {
	  var SYMBOL = wellKnownSymbol(KEY);
	  var DELEGATES_TO_SYMBOL = !fails(function () {
	    // String methods call symbol-named RegEp methods
	    var O = {};

	    O[SYMBOL] = function () {
	      return 7;
	    };

	    return ''[KEY](O) != 7;
	  });
	  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
	    // Symbol-named RegExp methods call .exec
	    var execCalled = false;
	    var re = /a/;

	    if (KEY === 'split') {
	      // We can't use real regex here since it causes deoptimization
	      // and serious performance degradation in V8
	      // https://github.com/zloirock/core-js/issues/306
	      re = {}; // RegExp[@@split] doesn't call the regex's exec method, but first creates
	      // a new one. We need to return the patched regex when creating the new one.

	      re.constructor = {};

	      re.constructor[SPECIES$4] = function () {
	        return re;
	      };

	      re.flags = '';
	      re[SYMBOL] = /./[SYMBOL];
	    }

	    re.exec = function () {
	      execCalled = true;
	      return null;
	    };

	    re[SYMBOL]('');
	    return !execCalled;
	  });

	  if (!DELEGATES_TO_SYMBOL || !DELEGATES_TO_EXEC || KEY === 'replace' && !(REPLACE_SUPPORTS_NAMED_GROUPS && REPLACE_KEEPS_$0 && !REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE) || KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC) {
	    var nativeRegExpMethod = /./[SYMBOL];
	    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
	      if (regexp.exec === regexpExec) {
	        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
	          // The native String method already delegates to @@method (this
	          // polyfilled function), leasing to infinite recursion.
	          // We avoid it by directly calling the native @@method method.
	          return {
	            done: true,
	            value: nativeRegExpMethod.call(regexp, str, arg2)
	          };
	        }

	        return {
	          done: true,
	          value: nativeMethod.call(str, regexp, arg2)
	        };
	      }

	      return {
	        done: false
	      };
	    }, {
	      REPLACE_KEEPS_$0: REPLACE_KEEPS_$0,
	      REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
	    });
	    var stringMethod = methods[0];
	    var regexMethod = methods[1];
	    redefine(String.prototype, KEY, stringMethod);
	    redefine(RegExp.prototype, SYMBOL, length == 2 // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
	    // 21.2.5.11 RegExp.prototype[@@split](string, limit)
	    ? function (string, arg) {
	      return regexMethod.call(string, this, arg);
	    } // 21.2.5.6 RegExp.prototype[@@match](string)
	    // 21.2.5.9 RegExp.prototype[@@search](string)
	    : function (string) {
	      return regexMethod.call(string, this);
	    });
	  }

	  if (sham) createNonEnumerableProperty(RegExp.prototype[SYMBOL], 'sham', true);
	};

	var charAt$1 = stringMultibyte.charAt; // `AdvanceStringIndex` abstract operation
	// https://tc39.github.io/ecma262/#sec-advancestringindex

	var advanceStringIndex = function (S, index, unicode) {
	  return index + (unicode ? charAt$1(S, index).length : 1);
	};

	// https://tc39.github.io/ecma262/#sec-regexpexec

	var regexpExecAbstract = function (R, S) {
	  var exec = R.exec;

	  if (typeof exec === 'function') {
	    var result = exec.call(R, S);

	    if (typeof result !== 'object') {
	      throw TypeError('RegExp exec method returned something other than an Object or null');
	    }

	    return result;
	  }

	  if (classofRaw(R) !== 'RegExp') {
	    throw TypeError('RegExp#exec called on incompatible receiver');
	  }

	  return regexpExec.call(R, S);
	};

	fixRegexpWellKnownSymbolLogic('match', 1, function (MATCH, nativeMatch, maybeCallNative) {
	  return [// `String.prototype.match` method
	  // https://tc39.github.io/ecma262/#sec-string.prototype.match
	  function match(regexp) {
	    var O = requireObjectCoercible(this);
	    var matcher = regexp == undefined ? undefined : regexp[MATCH];
	    return matcher !== undefined ? matcher.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
	  }, // `RegExp.prototype[@@match]` method
	  // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
	  function (regexp) {
	    var res = maybeCallNative(nativeMatch, regexp, this);
	    if (res.done) return res.value;
	    var rx = anObject(regexp);
	    var S = String(this);
	    if (!rx.global) return regexpExecAbstract(rx, S);
	    var fullUnicode = rx.unicode;
	    rx.lastIndex = 0;
	    var A = [];
	    var n = 0;
	    var result;

	    while ((result = regexpExecAbstract(rx, S)) !== null) {
	      var matchStr = String(result[0]);
	      A[n] = matchStr;
	      if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
	      n++;
	    }

	    return n === 0 ? null : A;
	  }];
	});

	var max$3 = Math.max;
	var min$3 = Math.min;
	var floor$1 = Math.floor;
	var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d\d?|<[^>]*>)/g;
	var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d\d?)/g;

	var maybeToString = function (it) {
	  return it === undefined ? it : String(it);
	}; // @@replace logic


	fixRegexpWellKnownSymbolLogic('replace', 2, function (REPLACE, nativeReplace, maybeCallNative, reason) {
	  var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = reason.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE;
	  var REPLACE_KEEPS_$0 = reason.REPLACE_KEEPS_$0;
	  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';
	  return [// `String.prototype.replace` method
	  // https://tc39.github.io/ecma262/#sec-string.prototype.replace
	  function replace(searchValue, replaceValue) {
	    var O = requireObjectCoercible(this);
	    var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
	    return replacer !== undefined ? replacer.call(searchValue, O, replaceValue) : nativeReplace.call(String(O), searchValue, replaceValue);
	  }, // `RegExp.prototype[@@replace]` method
	  // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
	  function (regexp, replaceValue) {
	    if (!REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE && REPLACE_KEEPS_$0 || typeof replaceValue === 'string' && replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1) {
	      var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);
	      if (res.done) return res.value;
	    }

	    var rx = anObject(regexp);
	    var S = String(this);
	    var functionalReplace = typeof replaceValue === 'function';
	    if (!functionalReplace) replaceValue = String(replaceValue);
	    var global = rx.global;

	    if (global) {
	      var fullUnicode = rx.unicode;
	      rx.lastIndex = 0;
	    }

	    var results = [];

	    while (true) {
	      var result = regexpExecAbstract(rx, S);
	      if (result === null) break;
	      results.push(result);
	      if (!global) break;
	      var matchStr = String(result[0]);
	      if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
	    }

	    var accumulatedResult = '';
	    var nextSourcePosition = 0;

	    for (var i = 0; i < results.length; i++) {
	      result = results[i];
	      var matched = String(result[0]);
	      var position = max$3(min$3(toInteger(result.index), S.length), 0);
	      var captures = []; // NOTE: This is equivalent to
	      //   captures = result.slice(1).map(maybeToString)
	      // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
	      // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
	      // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.

	      for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));

	      var namedCaptures = result.groups;

	      if (functionalReplace) {
	        var replacerArgs = [matched].concat(captures, position, S);
	        if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
	        var replacement = String(replaceValue.apply(undefined, replacerArgs));
	      } else {
	        replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
	      }

	      if (position >= nextSourcePosition) {
	        accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
	        nextSourcePosition = position + matched.length;
	      }
	    }

	    return accumulatedResult + S.slice(nextSourcePosition);
	  }]; // https://tc39.github.io/ecma262/#sec-getsubstitution

	  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
	    var tailPos = position + matched.length;
	    var m = captures.length;
	    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;

	    if (namedCaptures !== undefined) {
	      namedCaptures = toObject(namedCaptures);
	      symbols = SUBSTITUTION_SYMBOLS;
	    }

	    return nativeReplace.call(replacement, symbols, function (match, ch) {
	      var capture;

	      switch (ch.charAt(0)) {
	        case '$':
	          return '$';

	        case '&':
	          return matched;

	        case '`':
	          return str.slice(0, position);

	        case "'":
	          return str.slice(tailPos);

	        case '<':
	          capture = namedCaptures[ch.slice(1, -1)];
	          break;

	        default:
	          // \d\d?
	          var n = +ch;
	          if (n === 0) return match;

	          if (n > m) {
	            var f = floor$1(n / 10);
	            if (f === 0) return match;
	            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
	            return match;
	          }

	          capture = captures[n - 1];
	      }

	      return capture === undefined ? '' : capture;
	    });
	  }
	});

	var SPECIES$5 = wellKnownSymbol('species'); // `SpeciesConstructor` abstract operation
	// https://tc39.github.io/ecma262/#sec-speciesconstructor

	var speciesConstructor = function (O, defaultConstructor) {
	  var C = anObject(O).constructor;
	  var S;
	  return C === undefined || (S = anObject(C)[SPECIES$5]) == undefined ? defaultConstructor : aFunction$1(S);
	};

	var arrayPush = [].push;
	var min$4 = Math.min;
	var MAX_UINT32 = 0xFFFFFFFF; // babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError

	var SUPPORTS_Y = !fails(function () {
	  return !RegExp(MAX_UINT32, 'y');
	}); // @@split logic

	fixRegexpWellKnownSymbolLogic('split', 2, function (SPLIT, nativeSplit, maybeCallNative) {
	  var internalSplit;

	  if ('abbc'.split(/(b)*/)[1] == 'c' || 'test'.split(/(?:)/, -1).length != 4 || 'ab'.split(/(?:ab)*/).length != 2 || '.'.split(/(.?)(.?)/).length != 4 || '.'.split(/()()/).length > 1 || ''.split(/.?/).length) {
	    // based on es5-shim implementation, need to rework it
	    internalSplit = function (separator, limit) {
	      var string = String(requireObjectCoercible(this));
	      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
	      if (lim === 0) return [];
	      if (separator === undefined) return [string]; // If `separator` is not a regex, use native split

	      if (!isRegexp(separator)) {
	        return nativeSplit.call(string, separator, lim);
	      }

	      var output = [];
	      var flags = (separator.ignoreCase ? 'i' : '') + (separator.multiline ? 'm' : '') + (separator.unicode ? 'u' : '') + (separator.sticky ? 'y' : '');
	      var lastLastIndex = 0; // Make `global` and avoid `lastIndex` issues by working with a copy

	      var separatorCopy = new RegExp(separator.source, flags + 'g');
	      var match, lastIndex, lastLength;

	      while (match = regexpExec.call(separatorCopy, string)) {
	        lastIndex = separatorCopy.lastIndex;

	        if (lastIndex > lastLastIndex) {
	          output.push(string.slice(lastLastIndex, match.index));
	          if (match.length > 1 && match.index < string.length) arrayPush.apply(output, match.slice(1));
	          lastLength = match[0].length;
	          lastLastIndex = lastIndex;
	          if (output.length >= lim) break;
	        }

	        if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
	      }

	      if (lastLastIndex === string.length) {
	        if (lastLength || !separatorCopy.test('')) output.push('');
	      } else output.push(string.slice(lastLastIndex));

	      return output.length > lim ? output.slice(0, lim) : output;
	    }; // Chakra, V8

	  } else if ('0'.split(undefined, 0).length) {
	    internalSplit = function (separator, limit) {
	      return separator === undefined && limit === 0 ? [] : nativeSplit.call(this, separator, limit);
	    };
	  } else internalSplit = nativeSplit;

	  return [// `String.prototype.split` method
	  // https://tc39.github.io/ecma262/#sec-string.prototype.split
	  function split(separator, limit) {
	    var O = requireObjectCoercible(this);
	    var splitter = separator == undefined ? undefined : separator[SPLIT];
	    return splitter !== undefined ? splitter.call(separator, O, limit) : internalSplit.call(String(O), separator, limit);
	  }, // `RegExp.prototype[@@split]` method
	  // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
	  //
	  // NOTE: This cannot be properly polyfilled in engines that don't support
	  // the 'y' flag.
	  function (regexp, limit) {
	    var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== nativeSplit);
	    if (res.done) return res.value;
	    var rx = anObject(regexp);
	    var S = String(this);
	    var C = speciesConstructor(rx, RegExp);
	    var unicodeMatching = rx.unicode;
	    var flags = (rx.ignoreCase ? 'i' : '') + (rx.multiline ? 'm' : '') + (rx.unicode ? 'u' : '') + (SUPPORTS_Y ? 'y' : 'g'); // ^(? + rx + ) is needed, in combination with some S slicing, to
	    // simulate the 'y' flag.

	    var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
	    var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
	    if (lim === 0) return [];
	    if (S.length === 0) return regexpExecAbstract(splitter, S) === null ? [S] : [];
	    var p = 0;
	    var q = 0;
	    var A = [];

	    while (q < S.length) {
	      splitter.lastIndex = SUPPORTS_Y ? q : 0;
	      var z = regexpExecAbstract(splitter, SUPPORTS_Y ? S : S.slice(q));
	      var e;

	      if (z === null || (e = min$4(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p) {
	        q = advanceStringIndex(S, q, unicodeMatching);
	      } else {
	        A.push(S.slice(p, q));
	        if (A.length === lim) return A;

	        for (var i = 1; i <= z.length - 1; i++) {
	          A.push(z[i]);
	          if (A.length === lim) return A;
	        }

	        q = p = e;
	      }
	    }

	    A.push(S.slice(p));
	    return A;
	  }];
	}, !SUPPORTS_Y);

	var non = '\u200B\u0085\u180E'; // check that a method works with the correct list
	// of whitespaces and has a correct name

	var stringTrimForced = function (METHOD_NAME) {
	  return fails(function () {
	    return !!whitespaces[METHOD_NAME]() || non[METHOD_NAME]() != non || whitespaces[METHOD_NAME].name !== METHOD_NAME;
	  });
	};

	var $trim = stringTrim.trim; // `String.prototype.trim` method
	// https://tc39.github.io/ecma262/#sec-string.prototype.trim

	_export({
	  target: 'String',
	  proto: true,
	  forced: stringTrimForced('trim')
	}, {
	  trim: function trim() {
	    return $trim(this);
	  }
	});

	// iterable DOM collections
	// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
	var domIterables = {
	  CSSRuleList: 0,
	  CSSStyleDeclaration: 0,
	  CSSValueList: 0,
	  ClientRectList: 0,
	  DOMRectList: 0,
	  DOMStringList: 0,
	  DOMTokenList: 1,
	  DataTransferItemList: 0,
	  FileList: 0,
	  HTMLAllCollection: 0,
	  HTMLCollection: 0,
	  HTMLFormElement: 0,
	  HTMLSelectElement: 0,
	  MediaList: 0,
	  MimeTypeArray: 0,
	  NamedNodeMap: 0,
	  NodeList: 1,
	  PaintRequestList: 0,
	  Plugin: 0,
	  PluginArray: 0,
	  SVGLengthList: 0,
	  SVGNumberList: 0,
	  SVGPathSegList: 0,
	  SVGPointList: 0,
	  SVGStringList: 0,
	  SVGTransformList: 0,
	  SourceBufferList: 0,
	  StyleSheetList: 0,
	  TextTrackCueList: 0,
	  TextTrackList: 0,
	  TouchList: 0
	};

	for (var COLLECTION_NAME in domIterables) {
	  var Collection = global_1[COLLECTION_NAME];
	  var CollectionPrototype = Collection && Collection.prototype; // some Chrome versions have non-configurable methods on DOMTokenList

	  if (CollectionPrototype && CollectionPrototype.forEach !== arrayForEach) try {
	    createNonEnumerableProperty(CollectionPrototype, 'forEach', arrayForEach);
	  } catch (error) {
	    CollectionPrototype.forEach = arrayForEach;
	  }
	}

	var UNSCOPABLES = wellKnownSymbol('unscopables');
	var ArrayPrototype$1 = Array.prototype; // Array.prototype[@@unscopables]
	// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables

	if (ArrayPrototype$1[UNSCOPABLES] == undefined) {
	  objectDefineProperty.f(ArrayPrototype$1, UNSCOPABLES, {
	    configurable: true,
	    value: objectCreate(null)
	  });
	} // add a key to Array.prototype[@@unscopables]


	var addToUnscopables = function (key) {
	  ArrayPrototype$1[UNSCOPABLES][key] = true;
	};

	var ARRAY_ITERATOR = 'Array Iterator';
	var setInternalState$4 = internalState.set;
	var getInternalState$2 = internalState.getterFor(ARRAY_ITERATOR); // `Array.prototype.entries` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.entries
	// `Array.prototype.keys` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.keys
	// `Array.prototype.values` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.values
	// `Array.prototype[@@iterator]` method
	// https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator
	// `CreateArrayIterator` internal method
	// https://tc39.github.io/ecma262/#sec-createarrayiterator

	var es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
	  setInternalState$4(this, {
	    type: ARRAY_ITERATOR,
	    target: toIndexedObject(iterated),
	    // target
	    index: 0,
	    // next index
	    kind: kind // kind

	  }); // `%ArrayIteratorPrototype%.next` method
	  // https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
	}, function () {
	  var state = getInternalState$2(this);
	  var target = state.target;
	  var kind = state.kind;
	  var index = state.index++;

	  if (!target || index >= target.length) {
	    state.target = undefined;
	    return {
	      value: undefined,
	      done: true
	    };
	  }

	  if (kind == 'keys') return {
	    value: index,
	    done: false
	  };
	  if (kind == 'values') return {
	    value: target[index],
	    done: false
	  };
	  return {
	    value: [index, target[index]],
	    done: false
	  };
	}, 'values'); // argumentsList[@@iterator] is %ArrayProto_values%
	// https://tc39.github.io/ecma262/#sec-createunmappedargumentsobject
	// https://tc39.github.io/ecma262/#sec-createmappedargumentsobject

	iterators.Arguments = iterators.Array; // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

	var ITERATOR$5 = wellKnownSymbol('iterator');
	var TO_STRING_TAG$3 = wellKnownSymbol('toStringTag');
	var ArrayValues = es_array_iterator.values;

	for (var COLLECTION_NAME$1 in domIterables) {
	  var Collection$1 = global_1[COLLECTION_NAME$1];
	  var CollectionPrototype$1 = Collection$1 && Collection$1.prototype;

	  if (CollectionPrototype$1) {
	    // some Chrome versions have non-configurable methods on DOMTokenList
	    if (CollectionPrototype$1[ITERATOR$5] !== ArrayValues) try {
	      createNonEnumerableProperty(CollectionPrototype$1, ITERATOR$5, ArrayValues);
	    } catch (error) {
	      CollectionPrototype$1[ITERATOR$5] = ArrayValues;
	    }

	    if (!CollectionPrototype$1[TO_STRING_TAG$3]) {
	      createNonEnumerableProperty(CollectionPrototype$1, TO_STRING_TAG$3, COLLECTION_NAME$1);
	    }

	    if (domIterables[COLLECTION_NAME$1]) for (var METHOD_NAME in es_array_iterator) {
	      // some Chrome versions have non-configurable methods on DOMTokenList
	      if (CollectionPrototype$1[METHOD_NAME] !== es_array_iterator[METHOD_NAME]) try {
	        createNonEnumerableProperty(CollectionPrototype$1, METHOD_NAME, es_array_iterator[METHOD_NAME]);
	      } catch (error) {
	        CollectionPrototype$1[METHOD_NAME] = es_array_iterator[METHOD_NAME];
	      }
	    }
	  }
	}

	var engineIsIos = /(iphone|ipod|ipad).*applewebkit/i.test(engineUserAgent);

	var location = global_1.location;
	var set$1 = global_1.setImmediate;
	var clear = global_1.clearImmediate;
	var process$1 = global_1.process;
	var MessageChannel = global_1.MessageChannel;
	var Dispatch = global_1.Dispatch;
	var counter = 0;
	var queue = {};
	var ONREADYSTATECHANGE = 'onreadystatechange';
	var defer, channel, port;

	var run = function (id) {
	  // eslint-disable-next-line no-prototype-builtins
	  if (queue.hasOwnProperty(id)) {
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};

	var runner = function (id) {
	  return function () {
	    run(id);
	  };
	};

	var listener = function (event) {
	  run(event.data);
	};

	var post = function (id) {
	  // old engines have not location.origin
	  global_1.postMessage(id + '', location.protocol + '//' + location.host);
	}; // Node.js 0.9+ & IE10+ has setImmediate, otherwise:


	if (!set$1 || !clear) {
	  set$1 = function setImmediate(fn) {
	    var args = [];
	    var i = 1;

	    while (arguments.length > i) args.push(arguments[i++]);

	    queue[++counter] = function () {
	      // eslint-disable-next-line no-new-func
	      (typeof fn == 'function' ? fn : Function(fn)).apply(undefined, args);
	    };

	    defer(counter);
	    return counter;
	  };

	  clear = function clearImmediate(id) {
	    delete queue[id];
	  }; // Node.js 0.8-


	  if (classofRaw(process$1) == 'process') {
	    defer = function (id) {
	      process$1.nextTick(runner(id));
	    }; // Sphere (JS game engine) Dispatch API

	  } else if (Dispatch && Dispatch.now) {
	    defer = function (id) {
	      Dispatch.now(runner(id));
	    }; // Browsers with MessageChannel, includes WebWorkers
	    // except iOS - https://github.com/zloirock/core-js/issues/624

	  } else if (MessageChannel && !engineIsIos) {
	    channel = new MessageChannel();
	    port = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = functionBindContext(port.postMessage, port, 1); // Browsers with postMessage, skip WebWorkers
	    // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if (global_1.addEventListener && typeof postMessage == 'function' && !global_1.importScripts && !fails(post)) {
	    defer = post;
	    global_1.addEventListener('message', listener, false); // IE8-
	  } else if (ONREADYSTATECHANGE in documentCreateElement('script')) {
	    defer = function (id) {
	      html.appendChild(documentCreateElement('script'))[ONREADYSTATECHANGE] = function () {
	        html.removeChild(this);
	        run(id);
	      };
	    }; // Rest old browsers

	  } else {
	    defer = function (id) {
	      setTimeout(runner(id), 0);
	    };
	  }
	}

	var task = {
	  set: set$1,
	  clear: clear
	};

	var FORCED$3 = !global_1.setImmediate || !global_1.clearImmediate; // http://w3c.github.io/setImmediate/

	_export({
	  global: true,
	  bind: true,
	  enumerable: true,
	  forced: FORCED$3
	}, {
	  // `setImmediate` method
	  // http://w3c.github.io/setImmediate/#si-setImmediate
	  setImmediate: task.set,
	  // `clearImmediate` method
	  // http://w3c.github.io/setImmediate/#si-clearImmediate
	  clearImmediate: task.clear
	});

	function _typeof(obj) {
	  "@babel/helpers - typeof";

	  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
	    _typeof = function _typeof(obj) {
	      return typeof obj;
	    };
	  } else {
	    _typeof = function _typeof(obj) {
	      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	    };
	  }

	  return _typeof(obj);
	}

	/*!
	 * Vue.js v2.6.11
	 * (c) 2014-2019 Evan You
	 * Released under the MIT License.
	 */

	/*  */
	var emptyObject = Object.freeze({}); // These helpers produce better VM code in JS engines due to their
	// explicitness and function inlining.

	function isUndef(v) {
	  return v === undefined || v === null;
	}

	function isDef(v) {
	  return v !== undefined && v !== null;
	}

	function isTrue(v) {
	  return v === true;
	}

	function isFalse(v) {
	  return v === false;
	}
	/**
	 * Check if value is primitive.
	 */


	function isPrimitive(value) {
	  return typeof value === 'string' || typeof value === 'number' || // $flow-disable-line
	  _typeof(value) === 'symbol' || typeof value === 'boolean';
	}
	/**
	 * Quick object check - this is primarily used to tell
	 * Objects from primitive values when we know the value
	 * is a JSON-compliant type.
	 */


	function isObject$1(obj) {
	  return obj !== null && _typeof(obj) === 'object';
	}
	/**
	 * Get the raw type string of a value, e.g., [object Object].
	 */


	var _toString = Object.prototype.toString;

	function toRawType(value) {
	  return _toString.call(value).slice(8, -1);
	}
	/**
	 * Strict object type check. Only returns true
	 * for plain JavaScript objects.
	 */


	function isPlainObject(obj) {
	  return _toString.call(obj) === '[object Object]';
	}

	function isRegExp(v) {
	  return _toString.call(v) === '[object RegExp]';
	}
	/**
	 * Check if val is a valid array index.
	 */


	function isValidArrayIndex(val) {
	  var n = parseFloat(String(val));
	  return n >= 0 && Math.floor(n) === n && isFinite(val);
	}

	function isPromise(val) {
	  return isDef(val) && typeof val.then === 'function' && typeof val.catch === 'function';
	}
	/**
	 * Convert a value to a string that is actually rendered.
	 */


	function toString$2(val) {
	  return val == null ? '' : Array.isArray(val) || isPlainObject(val) && val.toString === _toString ? JSON.stringify(val, null, 2) : String(val);
	}
	/**
	 * Convert an input value to a number for persistence.
	 * If the conversion fails, return original string.
	 */


	function toNumber$1(val) {
	  var n = parseFloat(val);
	  return isNaN(n) ? val : n;
	}
	/**
	 * Make a map and return a function for checking if a key
	 * is in that map.
	 */


	function makeMap(str, expectsLowerCase) {
	  var map = Object.create(null);
	  var list = str.split(',');

	  for (var i = 0; i < list.length; i++) {
	    map[list[i]] = true;
	  }

	  return expectsLowerCase ? function (val) {
	    return map[val.toLowerCase()];
	  } : function (val) {
	    return map[val];
	  };
	}
	/**
	 * Check if a tag is a built-in tag.
	 */


	var isBuiltInTag = makeMap('slot,component', true);
	/**
	 * Check if an attribute is a reserved attribute.
	 */

	var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');
	/**
	 * Remove an item from an array.
	 */

	function remove(arr, item) {
	  if (arr.length) {
	    var index = arr.indexOf(item);

	    if (index > -1) {
	      return arr.splice(index, 1);
	    }
	  }
	}
	/**
	 * Check whether an object has the property.
	 */


	var hasOwnProperty$1 = Object.prototype.hasOwnProperty;

	function hasOwn(obj, key) {
	  return hasOwnProperty$1.call(obj, key);
	}
	/**
	 * Create a cached version of a pure function.
	 */


	function cached(fn) {
	  var cache = Object.create(null);
	  return function cachedFn(str) {
	    var hit = cache[str];
	    return hit || (cache[str] = fn(str));
	  };
	}
	/**
	 * Camelize a hyphen-delimited string.
	 */


	var camelizeRE = /-(\w)/g;
	var camelize = cached(function (str) {
	  return str.replace(camelizeRE, function (_, c) {
	    return c ? c.toUpperCase() : '';
	  });
	});
	/**
	 * Capitalize a string.
	 */

	var capitalize = cached(function (str) {
	  return str.charAt(0).toUpperCase() + str.slice(1);
	});
	/**
	 * Hyphenate a camelCase string.
	 */

	var hyphenateRE = /\B([A-Z])/g;
	var hyphenate = cached(function (str) {
	  return str.replace(hyphenateRE, '-$1').toLowerCase();
	});
	/**
	 * Simple bind polyfill for environments that do not support it,
	 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
	 * since native bind is now performant enough in most browsers.
	 * But removing it would mean breaking code that was able to run in
	 * PhantomJS 1.x, so this must be kept for backward compatibility.
	 */

	/* istanbul ignore next */

	function polyfillBind(fn, ctx) {
	  function boundFn(a) {
	    var l = arguments.length;
	    return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
	  }

	  boundFn._length = fn.length;
	  return boundFn;
	}

	function nativeBind(fn, ctx) {
	  return fn.bind(ctx);
	}

	var bind = Function.prototype.bind ? nativeBind : polyfillBind;
	/**
	 * Convert an Array-like object to a real Array.
	 */

	function toArray(list, start) {
	  start = start || 0;
	  var i = list.length - start;
	  var ret = new Array(i);

	  while (i--) {
	    ret[i] = list[i + start];
	  }

	  return ret;
	}
	/**
	 * Mix properties into target object.
	 */


	function extend(to, _from) {
	  for (var key in _from) {
	    to[key] = _from[key];
	  }

	  return to;
	}
	/**
	 * Merge an Array of Objects into a single Object.
	 */


	function toObject$1(arr) {
	  var res = {};

	  for (var i = 0; i < arr.length; i++) {
	    if (arr[i]) {
	      extend(res, arr[i]);
	    }
	  }

	  return res;
	}
	/* eslint-disable no-unused-vars */

	/**
	 * Perform no operation.
	 * Stubbing args to make Flow happy without leaving useless transpiled code
	 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
	 */


	function noop(a, b, c) {}
	/**
	 * Always return false.
	 */


	var no = function no(a, b, c) {
	  return false;
	};
	/* eslint-enable no-unused-vars */

	/**
	 * Return the same value.
	 */


	var identity = function identity(_) {
	  return _;
	};
	/**
	 * Check if two values are loosely equal - that is,
	 * if they are plain objects, do they have the same shape?
	 */


	function looseEqual(a, b) {
	  if (a === b) {
	    return true;
	  }

	  var isObjectA = isObject$1(a);
	  var isObjectB = isObject$1(b);

	  if (isObjectA && isObjectB) {
	    try {
	      var isArrayA = Array.isArray(a);
	      var isArrayB = Array.isArray(b);

	      if (isArrayA && isArrayB) {
	        return a.length === b.length && a.every(function (e, i) {
	          return looseEqual(e, b[i]);
	        });
	      } else if (a instanceof Date && b instanceof Date) {
	        return a.getTime() === b.getTime();
	      } else if (!isArrayA && !isArrayB) {
	        var keysA = Object.keys(a);
	        var keysB = Object.keys(b);
	        return keysA.length === keysB.length && keysA.every(function (key) {
	          return looseEqual(a[key], b[key]);
	        });
	      } else {
	        /* istanbul ignore next */
	        return false;
	      }
	    } catch (e) {
	      /* istanbul ignore next */
	      return false;
	    }
	  } else if (!isObjectA && !isObjectB) {
	    return String(a) === String(b);
	  } else {
	    return false;
	  }
	}
	/**
	 * Return the first index at which a loosely equal value can be
	 * found in the array (if value is a plain object, the array must
	 * contain an object of the same shape), or -1 if it is not present.
	 */


	function looseIndexOf(arr, val) {
	  for (var i = 0; i < arr.length; i++) {
	    if (looseEqual(arr[i], val)) {
	      return i;
	    }
	  }

	  return -1;
	}
	/**
	 * Ensure a function is called only once.
	 */


	function once(fn) {
	  var called = false;
	  return function () {
	    if (!called) {
	      called = true;
	      fn.apply(this, arguments);
	    }
	  };
	}

	var SSR_ATTR = 'data-server-rendered';
	var ASSET_TYPES = ['component', 'directive', 'filter'];
	var LIFECYCLE_HOOKS = ['beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeUpdate', 'updated', 'beforeDestroy', 'destroyed', 'activated', 'deactivated', 'errorCaptured', 'serverPrefetch'];
	/*  */

	var config = {
	  /**
	   * Option merge strategies (used in core/util/options)
	   */
	  // $flow-disable-line
	  optionMergeStrategies: Object.create(null),

	  /**
	   * Whether to suppress warnings.
	   */
	  silent: false,

	  /**
	   * Show production mode tip message on boot?
	   */
	  productionTip: "development" !== 'production',

	  /**
	   * Whether to enable devtools
	   */
	  devtools: "development" !== 'production',

	  /**
	   * Whether to record perf
	   */
	  performance: false,

	  /**
	   * Error handler for watcher errors
	   */
	  errorHandler: null,

	  /**
	   * Warn handler for watcher warns
	   */
	  warnHandler: null,

	  /**
	   * Ignore certain custom elements
	   */
	  ignoredElements: [],

	  /**
	   * Custom user key aliases for v-on
	   */
	  // $flow-disable-line
	  keyCodes: Object.create(null),

	  /**
	   * Check if a tag is reserved so that it cannot be registered as a
	   * component. This is platform-dependent and may be overwritten.
	   */
	  isReservedTag: no,

	  /**
	   * Check if an attribute is reserved so that it cannot be used as a component
	   * prop. This is platform-dependent and may be overwritten.
	   */
	  isReservedAttr: no,

	  /**
	   * Check if a tag is an unknown element.
	   * Platform-dependent.
	   */
	  isUnknownElement: no,

	  /**
	   * Get the namespace of an element
	   */
	  getTagNamespace: noop,

	  /**
	   * Parse the real tag name for the specific platform.
	   */
	  parsePlatformTagName: identity,

	  /**
	   * Check if an attribute must be bound using property, e.g. value
	   * Platform-dependent.
	   */
	  mustUseProp: no,

	  /**
	   * Perform updates asynchronously. Intended to be used by Vue Test Utils
	   * This will significantly reduce performance if set to false.
	   */
	  async: true,

	  /**
	   * Exposed for legacy reasons
	   */
	  _lifecycleHooks: LIFECYCLE_HOOKS
	};
	/*  */

	/**
	 * unicode letters used for parsing html tags, component names and property paths.
	 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
	 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
	 */

	var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;
	/**
	 * Check if a string starts with $ or _
	 */

	function isReserved(str) {
	  var c = (str + '').charCodeAt(0);
	  return c === 0x24 || c === 0x5F;
	}
	/**
	 * Define a property.
	 */


	function def(obj, key, val, enumerable) {
	  Object.defineProperty(obj, key, {
	    value: val,
	    enumerable: !!enumerable,
	    writable: true,
	    configurable: true
	  });
	}
	/**
	 * Parse simple path.
	 */


	var bailRE = new RegExp("[^" + unicodeRegExp.source + ".$_\\d]");

	function parsePath(path) {
	  if (bailRE.test(path)) {
	    return;
	  }

	  var segments = path.split('.');
	  return function (obj) {
	    for (var i = 0; i < segments.length; i++) {
	      if (!obj) {
	        return;
	      }

	      obj = obj[segments[i]];
	    }

	    return obj;
	  };
	}
	/*  */
	// can we use __proto__?


	var hasProto = '__proto__' in {}; // Browser environment sniffing

	var inBrowser = typeof window !== 'undefined';
	var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
	var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
	var UA = inBrowser && window.navigator.userAgent.toLowerCase();
	var isIE = UA && /msie|trident/.test(UA);
	var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
	var isEdge = UA && UA.indexOf('edge/') > 0;
	var isAndroid = UA && UA.indexOf('android') > 0 || weexPlatform === 'android';
	var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA) || weexPlatform === 'ios';
	var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
	var isPhantomJS = UA && /phantomjs/.test(UA);
	var isFF = UA && UA.match(/firefox\/(\d+)/); // Firefox has a "watch" function on Object.prototype...

	var nativeWatch = {}.watch;
	var supportsPassive = false;

	if (inBrowser) {
	  try {
	    var opts = {};
	    Object.defineProperty(opts, 'passive', {
	      get: function get() {
	        /* istanbul ignore next */
	        supportsPassive = true;
	      }
	    }); // https://github.com/facebook/flow/issues/285

	    window.addEventListener('test-passive', null, opts);
	  } catch (e) {}
	} // this needs to be lazy-evaled because vue may be required before
	// vue-server-renderer can set VUE_ENV


	var _isServer;

	var isServerRendering = function isServerRendering() {
	  if (_isServer === undefined) {
	    /* istanbul ignore if */
	    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
	      // detect presence of vue-server-renderer and avoid
	      // Webpack shimming the process
	      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
	    } else {
	      _isServer = false;
	    }
	  }

	  return _isServer;
	}; // detect devtools


	var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;
	/* istanbul ignore next */

	function isNative(Ctor) {
	  return typeof Ctor === 'function' && /native code/.test(Ctor.toString());
	}

	var hasSymbol = typeof Symbol !== 'undefined' && isNative(Symbol) && typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

	var _Set;
	/* istanbul ignore if */
	// $flow-disable-line


	if (typeof Set !== 'undefined' && isNative(Set)) {
	  // use native Set when available.
	  _Set = Set;
	} else {
	  // a non-standard Set polyfill that only works with primitive keys.
	  _Set =
	  /*@__PURE__*/
	  function () {
	    function Set() {
	      this.set = Object.create(null);
	    }

	    Set.prototype.has = function has(key) {
	      return this.set[key] === true;
	    };

	    Set.prototype.add = function add(key) {
	      this.set[key] = true;
	    };

	    Set.prototype.clear = function clear() {
	      this.set = Object.create(null);
	    };

	    return Set;
	  }();
	}
	/*  */


	var warn = noop;
	var tip = noop;
	var generateComponentTrace = noop; // work around flow check

	var formatComponentName = noop;

	{
	  var hasConsole = typeof console !== 'undefined';
	  var classifyRE = /(?:^|[-_])(\w)/g;

	  var classify = function classify(str) {
	    return str.replace(classifyRE, function (c) {
	      return c.toUpperCase();
	    }).replace(/[-_]/g, '');
	  };

	  warn = function warn(msg, vm) {
	    var trace = vm ? generateComponentTrace(vm) : '';

	    if (config.warnHandler) {
	      config.warnHandler.call(null, msg, vm, trace);
	    } else if (hasConsole && !config.silent) {
	      console.error("[Vue warn]: " + msg + trace);
	    }
	  };

	  tip = function tip(msg, vm) {
	    if (hasConsole && !config.silent) {
	      console.warn("[Vue tip]: " + msg + (vm ? generateComponentTrace(vm) : ''));
	    }
	  };

	  formatComponentName = function formatComponentName(vm, includeFile) {
	    if (vm.$root === vm) {
	      return '<Root>';
	    }

	    var options = typeof vm === 'function' && vm.cid != null ? vm.options : vm._isVue ? vm.$options || vm.constructor.options : vm;
	    var name = options.name || options._componentTag;
	    var file = options.__file;

	    if (!name && file) {
	      var match = file.match(/([^/\\]+)\.vue$/);
	      name = match && match[1];
	    }

	    return (name ? "<" + classify(name) + ">" : "<Anonymous>") + (file && includeFile !== false ? " at " + file : '');
	  };

	  var repeat = function repeat(str, n) {
	    var res = '';

	    while (n) {
	      if (n % 2 === 1) {
	        res += str;
	      }

	      if (n > 1) {
	        str += str;
	      }

	      n >>= 1;
	    }

	    return res;
	  };

	  generateComponentTrace = function generateComponentTrace(vm) {
	    if (vm._isVue && vm.$parent) {
	      var tree = [];
	      var currentRecursiveSequence = 0;

	      while (vm) {
	        if (tree.length > 0) {
	          var last = tree[tree.length - 1];

	          if (last.constructor === vm.constructor) {
	            currentRecursiveSequence++;
	            vm = vm.$parent;
	            continue;
	          } else if (currentRecursiveSequence > 0) {
	            tree[tree.length - 1] = [last, currentRecursiveSequence];
	            currentRecursiveSequence = 0;
	          }
	        }

	        tree.push(vm);
	        vm = vm.$parent;
	      }

	      return '\n\nfound in\n\n' + tree.map(function (vm, i) {
	        return "" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm) ? formatComponentName(vm[0]) + "... (" + vm[1] + " recursive calls)" : formatComponentName(vm));
	      }).join('\n');
	    } else {
	      return "\n\n(found in " + formatComponentName(vm) + ")";
	    }
	  };
	}
	/*  */


	var uid$1 = 0;
	/**
	 * A dep is an observable that can have multiple
	 * directives subscribing to it.
	 */

	var Dep = function Dep() {
	  this.id = uid$1++;
	  this.subs = [];
	};

	Dep.prototype.addSub = function addSub(sub) {
	  this.subs.push(sub);
	};

	Dep.prototype.removeSub = function removeSub(sub) {
	  remove(this.subs, sub);
	};

	Dep.prototype.depend = function depend() {
	  if (Dep.target) {
	    Dep.target.addDep(this);
	  }
	};

	Dep.prototype.notify = function notify() {
	  // stabilize the subscriber list first
	  var subs = this.subs.slice();

	  if ( !config.async) {
	    // subs aren't sorted in scheduler if not running async
	    // we need to sort them now to make sure they fire in correct
	    // order
	    subs.sort(function (a, b) {
	      return a.id - b.id;
	    });
	  }

	  for (var i = 0, l = subs.length; i < l; i++) {
	    subs[i].update();
	  }
	}; // The current target watcher being evaluated.
	// This is globally unique because only one watcher
	// can be evaluated at a time.


	Dep.target = null;
	var targetStack = [];

	function pushTarget(target) {
	  targetStack.push(target);
	  Dep.target = target;
	}

	function popTarget() {
	  targetStack.pop();
	  Dep.target = targetStack[targetStack.length - 1];
	}
	/*  */


	var VNode = function VNode(tag, data, children, text, elm, context, componentOptions, asyncFactory) {
	  this.tag = tag;
	  this.data = data;
	  this.children = children;
	  this.text = text;
	  this.elm = elm;
	  this.ns = undefined;
	  this.context = context;
	  this.fnContext = undefined;
	  this.fnOptions = undefined;
	  this.fnScopeId = undefined;
	  this.key = data && data.key;
	  this.componentOptions = componentOptions;
	  this.componentInstance = undefined;
	  this.parent = undefined;
	  this.raw = false;
	  this.isStatic = false;
	  this.isRootInsert = true;
	  this.isComment = false;
	  this.isCloned = false;
	  this.isOnce = false;
	  this.asyncFactory = asyncFactory;
	  this.asyncMeta = undefined;
	  this.isAsyncPlaceholder = false;
	};

	var prototypeAccessors = {
	  child: {
	    configurable: true
	  }
	}; // DEPRECATED: alias for componentInstance for backwards compat.

	/* istanbul ignore next */

	prototypeAccessors.child.get = function () {
	  return this.componentInstance;
	};

	Object.defineProperties(VNode.prototype, prototypeAccessors);

	var createEmptyVNode = function createEmptyVNode(text) {
	  if (text === void 0) text = '';
	  var node = new VNode();
	  node.text = text;
	  node.isComment = true;
	  return node;
	};

	function createTextVNode(val) {
	  return new VNode(undefined, undefined, undefined, String(val));
	} // optimized shallow clone
	// used for static nodes and slot nodes because they may be reused across
	// multiple renders, cloning them avoids errors when DOM manipulations rely
	// on their elm reference.


	function cloneVNode(vnode) {
	  var cloned = new VNode(vnode.tag, vnode.data, // #7975
	  // clone children array to avoid mutating original in case of cloning
	  // a child.
	  vnode.children && vnode.children.slice(), vnode.text, vnode.elm, vnode.context, vnode.componentOptions, vnode.asyncFactory);
	  cloned.ns = vnode.ns;
	  cloned.isStatic = vnode.isStatic;
	  cloned.key = vnode.key;
	  cloned.isComment = vnode.isComment;
	  cloned.fnContext = vnode.fnContext;
	  cloned.fnOptions = vnode.fnOptions;
	  cloned.fnScopeId = vnode.fnScopeId;
	  cloned.asyncMeta = vnode.asyncMeta;
	  cloned.isCloned = true;
	  return cloned;
	}
	/*
	 * not type checking this file because flow doesn't play well with
	 * dynamically accessing methods on Array prototype
	 */


	var arrayProto = Array.prototype;
	var arrayMethods = Object.create(arrayProto);
	var methodsToPatch = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];
	/**
	 * Intercept mutating methods and emit events
	 */

	methodsToPatch.forEach(function (method) {
	  // cache original method
	  var original = arrayProto[method];
	  def(arrayMethods, method, function mutator() {
	    var args = [],
	        len = arguments.length;

	    while (len--) {
	      args[len] = arguments[len];
	    }

	    var result = original.apply(this, args);
	    var ob = this.__ob__;
	    var inserted;

	    switch (method) {
	      case 'push':
	      case 'unshift':
	        inserted = args;
	        break;

	      case 'splice':
	        inserted = args.slice(2);
	        break;
	    }

	    if (inserted) {
	      ob.observeArray(inserted);
	    } // notify change


	    ob.dep.notify();
	    return result;
	  });
	});
	/*  */

	var arrayKeys = Object.getOwnPropertyNames(arrayMethods);
	/**
	 * In some cases we may want to disable observation inside a component's
	 * update computation.
	 */

	var shouldObserve = true;

	function toggleObserving(value) {
	  shouldObserve = value;
	}
	/**
	 * Observer class that is attached to each observed
	 * object. Once attached, the observer converts the target
	 * object's property keys into getter/setters that
	 * collect dependencies and dispatch updates.
	 */


	var Observer = function Observer(value) {
	  this.value = value;
	  this.dep = new Dep();
	  this.vmCount = 0;
	  def(value, '__ob__', this);

	  if (Array.isArray(value)) {
	    if (hasProto) {
	      protoAugment(value, arrayMethods);
	    } else {
	      copyAugment(value, arrayMethods, arrayKeys);
	    }

	    this.observeArray(value);
	  } else {
	    this.walk(value);
	  }
	};
	/**
	 * Walk through all properties and convert them into
	 * getter/setters. This method should only be called when
	 * value type is Object.
	 */


	Observer.prototype.walk = function walk(obj) {
	  var keys = Object.keys(obj);

	  for (var i = 0; i < keys.length; i++) {
	    defineReactive$$1(obj, keys[i]);
	  }
	};
	/**
	 * Observe a list of Array items.
	 */


	Observer.prototype.observeArray = function observeArray(items) {
	  for (var i = 0, l = items.length; i < l; i++) {
	    observe(items[i]);
	  }
	}; // helpers

	/**
	 * Augment a target Object or Array by intercepting
	 * the prototype chain using __proto__
	 */


	function protoAugment(target, src) {
	  /* eslint-disable no-proto */
	  target.__proto__ = src;
	  /* eslint-enable no-proto */
	}
	/**
	 * Augment a target Object or Array by defining
	 * hidden properties.
	 */

	/* istanbul ignore next */


	function copyAugment(target, src, keys) {
	  for (var i = 0, l = keys.length; i < l; i++) {
	    var key = keys[i];
	    def(target, key, src[key]);
	  }
	}
	/**
	 * Attempt to create an observer instance for a value,
	 * returns the new observer if successfully observed,
	 * or the existing observer if the value already has one.
	 */


	function observe(value, asRootData) {
	  if (!isObject$1(value) || value instanceof VNode) {
	    return;
	  }

	  var ob;

	  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
	    ob = value.__ob__;
	  } else if (shouldObserve && !isServerRendering() && (Array.isArray(value) || isPlainObject(value)) && Object.isExtensible(value) && !value._isVue) {
	    ob = new Observer(value);
	  }

	  if (asRootData && ob) {
	    ob.vmCount++;
	  }

	  return ob;
	}
	/**
	 * Define a reactive property on an Object.
	 */


	function defineReactive$$1(obj, key, val, customSetter, shallow) {
	  var dep = new Dep();
	  var property = Object.getOwnPropertyDescriptor(obj, key);

	  if (property && property.configurable === false) {
	    return;
	  } // cater for pre-defined getter/setters


	  var getter = property && property.get;
	  var setter = property && property.set;

	  if ((!getter || setter) && arguments.length === 2) {
	    val = obj[key];
	  }

	  var childOb = !shallow && observe(val);
	  Object.defineProperty(obj, key, {
	    enumerable: true,
	    configurable: true,
	    get: function reactiveGetter() {
	      var value = getter ? getter.call(obj) : val;

	      if (Dep.target) {
	        dep.depend();

	        if (childOb) {
	          childOb.dep.depend();

	          if (Array.isArray(value)) {
	            dependArray(value);
	          }
	        }
	      }

	      return value;
	    },
	    set: function reactiveSetter(newVal) {
	      var value = getter ? getter.call(obj) : val;
	      /* eslint-disable no-self-compare */

	      if (newVal === value || newVal !== newVal && value !== value) {
	        return;
	      }
	      /* eslint-enable no-self-compare */


	      if ( customSetter) {
	        customSetter();
	      } // #7981: for accessor properties without setter


	      if (getter && !setter) {
	        return;
	      }

	      if (setter) {
	        setter.call(obj, newVal);
	      } else {
	        val = newVal;
	      }

	      childOb = !shallow && observe(newVal);
	      dep.notify();
	    }
	  });
	}
	/**
	 * Set a property on an object. Adds the new property and
	 * triggers change notification if the property doesn't
	 * already exist.
	 */


	function set$2(target, key, val) {
	  if ( (isUndef(target) || isPrimitive(target))) {
	    warn("Cannot set reactive property on undefined, null, or primitive value: " + target);
	  }

	  if (Array.isArray(target) && isValidArrayIndex(key)) {
	    target.length = Math.max(target.length, key);
	    target.splice(key, 1, val);
	    return val;
	  }

	  if (key in target && !(key in Object.prototype)) {
	    target[key] = val;
	    return val;
	  }

	  var ob = target.__ob__;

	  if (target._isVue || ob && ob.vmCount) {
	     warn('Avoid adding reactive properties to a Vue instance or its root $data ' + 'at runtime - declare it upfront in the data option.');
	    return val;
	  }

	  if (!ob) {
	    target[key] = val;
	    return val;
	  }

	  defineReactive$$1(ob.value, key, val);
	  ob.dep.notify();
	  return val;
	}
	/**
	 * Delete a property and trigger change if necessary.
	 */


	function del(target, key) {
	  if ( (isUndef(target) || isPrimitive(target))) {
	    warn("Cannot delete reactive property on undefined, null, or primitive value: " + target);
	  }

	  if (Array.isArray(target) && isValidArrayIndex(key)) {
	    target.splice(key, 1);
	    return;
	  }

	  var ob = target.__ob__;

	  if (target._isVue || ob && ob.vmCount) {
	     warn('Avoid deleting properties on a Vue instance or its root $data ' + '- just set it to null.');
	    return;
	  }

	  if (!hasOwn(target, key)) {
	    return;
	  }

	  delete target[key];

	  if (!ob) {
	    return;
	  }

	  ob.dep.notify();
	}
	/**
	 * Collect dependencies on array elements when the array is touched, since
	 * we cannot intercept array element access like property getters.
	 */


	function dependArray(value) {
	  for (var e = void 0, i = 0, l = value.length; i < l; i++) {
	    e = value[i];
	    e && e.__ob__ && e.__ob__.dep.depend();

	    if (Array.isArray(e)) {
	      dependArray(e);
	    }
	  }
	}
	/*  */

	/**
	 * Option overwriting strategies are functions that handle
	 * how to merge a parent option value and a child option
	 * value into the final value.
	 */


	var strats = config.optionMergeStrategies;
	/**
	 * Options with restrictions
	 */

	{
	  strats.el = strats.propsData = function (parent, child, vm, key) {
	    if (!vm) {
	      warn("option \"" + key + "\" can only be used during instance " + 'creation with the `new` keyword.');
	    }

	    return defaultStrat(parent, child);
	  };
	}
	/**
	 * Helper that recursively merges two data objects together.
	 */


	function mergeData(to, from) {
	  if (!from) {
	    return to;
	  }

	  var key, toVal, fromVal;
	  var keys = hasSymbol ? Reflect.ownKeys(from) : Object.keys(from);

	  for (var i = 0; i < keys.length; i++) {
	    key = keys[i]; // in case the object is already observed...

	    if (key === '__ob__') {
	      continue;
	    }

	    toVal = to[key];
	    fromVal = from[key];

	    if (!hasOwn(to, key)) {
	      set$2(to, key, fromVal);
	    } else if (toVal !== fromVal && isPlainObject(toVal) && isPlainObject(fromVal)) {
	      mergeData(toVal, fromVal);
	    }
	  }

	  return to;
	}
	/**
	 * Data
	 */


	function mergeDataOrFn(parentVal, childVal, vm) {
	  if (!vm) {
	    // in a Vue.extend merge, both should be functions
	    if (!childVal) {
	      return parentVal;
	    }

	    if (!parentVal) {
	      return childVal;
	    } // when parentVal & childVal are both present,
	    // we need to return a function that returns the
	    // merged result of both functions... no need to
	    // check if parentVal is a function here because
	    // it has to be a function to pass previous merges.


	    return function mergedDataFn() {
	      return mergeData(typeof childVal === 'function' ? childVal.call(this, this) : childVal, typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal);
	    };
	  } else {
	    return function mergedInstanceDataFn() {
	      // instance merge
	      var instanceData = typeof childVal === 'function' ? childVal.call(vm, vm) : childVal;
	      var defaultData = typeof parentVal === 'function' ? parentVal.call(vm, vm) : parentVal;

	      if (instanceData) {
	        return mergeData(instanceData, defaultData);
	      } else {
	        return defaultData;
	      }
	    };
	  }
	}

	strats.data = function (parentVal, childVal, vm) {
	  if (!vm) {
	    if (childVal && typeof childVal !== 'function') {
	       warn('The "data" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.', vm);
	      return parentVal;
	    }

	    return mergeDataOrFn(parentVal, childVal);
	  }

	  return mergeDataOrFn(parentVal, childVal, vm);
	};
	/**
	 * Hooks and props are merged as arrays.
	 */


	function mergeHook(parentVal, childVal) {
	  var res = childVal ? parentVal ? parentVal.concat(childVal) : Array.isArray(childVal) ? childVal : [childVal] : parentVal;
	  return res ? dedupeHooks(res) : res;
	}

	function dedupeHooks(hooks) {
	  var res = [];

	  for (var i = 0; i < hooks.length; i++) {
	    if (res.indexOf(hooks[i]) === -1) {
	      res.push(hooks[i]);
	    }
	  }

	  return res;
	}

	LIFECYCLE_HOOKS.forEach(function (hook) {
	  strats[hook] = mergeHook;
	});
	/**
	 * Assets
	 *
	 * When a vm is present (instance creation), we need to do
	 * a three-way merge between constructor options, instance
	 * options and parent options.
	 */

	function mergeAssets(parentVal, childVal, vm, key) {
	  var res = Object.create(parentVal || null);

	  if (childVal) {
	     assertObjectType(key, childVal, vm);
	    return extend(res, childVal);
	  } else {
	    return res;
	  }
	}

	ASSET_TYPES.forEach(function (type) {
	  strats[type + 's'] = mergeAssets;
	});
	/**
	 * Watchers.
	 *
	 * Watchers hashes should not overwrite one
	 * another, so we merge them as arrays.
	 */

	strats.watch = function (parentVal, childVal, vm, key) {
	  // work around Firefox's Object.prototype.watch...
	  if (parentVal === nativeWatch) {
	    parentVal = undefined;
	  }

	  if (childVal === nativeWatch) {
	    childVal = undefined;
	  }
	  /* istanbul ignore if */


	  if (!childVal) {
	    return Object.create(parentVal || null);
	  }

	  {
	    assertObjectType(key, childVal, vm);
	  }

	  if (!parentVal) {
	    return childVal;
	  }

	  var ret = {};
	  extend(ret, parentVal);

	  for (var key$1 in childVal) {
	    var parent = ret[key$1];
	    var child = childVal[key$1];

	    if (parent && !Array.isArray(parent)) {
	      parent = [parent];
	    }

	    ret[key$1] = parent ? parent.concat(child) : Array.isArray(child) ? child : [child];
	  }

	  return ret;
	};
	/**
	 * Other object hashes.
	 */


	strats.props = strats.methods = strats.inject = strats.computed = function (parentVal, childVal, vm, key) {
	  if (childVal && "development" !== 'production') {
	    assertObjectType(key, childVal, vm);
	  }

	  if (!parentVal) {
	    return childVal;
	  }

	  var ret = Object.create(null);
	  extend(ret, parentVal);

	  if (childVal) {
	    extend(ret, childVal);
	  }

	  return ret;
	};

	strats.provide = mergeDataOrFn;
	/**
	 * Default strategy.
	 */

	var defaultStrat = function defaultStrat(parentVal, childVal) {
	  return childVal === undefined ? parentVal : childVal;
	};
	/**
	 * Validate component names
	 */


	function checkComponents(options) {
	  for (var key in options.components) {
	    validateComponentName(key);
	  }
	}

	function validateComponentName(name) {
	  if (!new RegExp("^[a-zA-Z][\\-\\.0-9_" + unicodeRegExp.source + "]*$").test(name)) {
	    warn('Invalid component name: "' + name + '". Component names ' + 'should conform to valid custom element name in html5 specification.');
	  }

	  if (isBuiltInTag(name) || config.isReservedTag(name)) {
	    warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + name);
	  }
	}
	/**
	 * Ensure all props option syntax are normalized into the
	 * Object-based format.
	 */


	function normalizeProps(options, vm) {
	  var props = options.props;

	  if (!props) {
	    return;
	  }

	  var res = {};
	  var i, val, name;

	  if (Array.isArray(props)) {
	    i = props.length;

	    while (i--) {
	      val = props[i];

	      if (typeof val === 'string') {
	        name = camelize(val);
	        res[name] = {
	          type: null
	        };
	      } else {
	        warn('props must be strings when using array syntax.');
	      }
	    }
	  } else if (isPlainObject(props)) {
	    for (var key in props) {
	      val = props[key];
	      name = camelize(key);
	      res[name] = isPlainObject(val) ? val : {
	        type: val
	      };
	    }
	  } else {
	    warn("Invalid value for option \"props\": expected an Array or an Object, " + "but got " + toRawType(props) + ".", vm);
	  }

	  options.props = res;
	}
	/**
	 * Normalize all injections into Object-based format
	 */


	function normalizeInject(options, vm) {
	  var inject = options.inject;

	  if (!inject) {
	    return;
	  }

	  var normalized = options.inject = {};

	  if (Array.isArray(inject)) {
	    for (var i = 0; i < inject.length; i++) {
	      normalized[inject[i]] = {
	        from: inject[i]
	      };
	    }
	  } else if (isPlainObject(inject)) {
	    for (var key in inject) {
	      var val = inject[key];
	      normalized[key] = isPlainObject(val) ? extend({
	        from: key
	      }, val) : {
	        from: val
	      };
	    }
	  } else {
	    warn("Invalid value for option \"inject\": expected an Array or an Object, " + "but got " + toRawType(inject) + ".", vm);
	  }
	}
	/**
	 * Normalize raw function directives into object format.
	 */


	function normalizeDirectives(options) {
	  var dirs = options.directives;

	  if (dirs) {
	    for (var key in dirs) {
	      var def$$1 = dirs[key];

	      if (typeof def$$1 === 'function') {
	        dirs[key] = {
	          bind: def$$1,
	          update: def$$1
	        };
	      }
	    }
	  }
	}

	function assertObjectType(name, value, vm) {
	  if (!isPlainObject(value)) {
	    warn("Invalid value for option \"" + name + "\": expected an Object, " + "but got " + toRawType(value) + ".", vm);
	  }
	}
	/**
	 * Merge two option objects into a new one.
	 * Core utility used in both instantiation and inheritance.
	 */


	function mergeOptions(parent, child, vm) {
	  {
	    checkComponents(child);
	  }

	  if (typeof child === 'function') {
	    child = child.options;
	  }

	  normalizeProps(child, vm);
	  normalizeInject(child, vm);
	  normalizeDirectives(child); // Apply extends and mixins on the child options,
	  // but only if it is a raw options object that isn't
	  // the result of another mergeOptions call.
	  // Only merged options has the _base property.

	  if (!child._base) {
	    if (child.extends) {
	      parent = mergeOptions(parent, child.extends, vm);
	    }

	    if (child.mixins) {
	      for (var i = 0, l = child.mixins.length; i < l; i++) {
	        parent = mergeOptions(parent, child.mixins[i], vm);
	      }
	    }
	  }

	  var options = {};
	  var key;

	  for (key in parent) {
	    mergeField(key);
	  }

	  for (key in child) {
	    if (!hasOwn(parent, key)) {
	      mergeField(key);
	    }
	  }

	  function mergeField(key) {
	    var strat = strats[key] || defaultStrat;
	    options[key] = strat(parent[key], child[key], vm, key);
	  }

	  return options;
	}
	/**
	 * Resolve an asset.
	 * This function is used because child instances need access
	 * to assets defined in its ancestor chain.
	 */


	function resolveAsset(options, type, id, warnMissing) {
	  /* istanbul ignore if */
	  if (typeof id !== 'string') {
	    return;
	  }

	  var assets = options[type]; // check local registration variations first

	  if (hasOwn(assets, id)) {
	    return assets[id];
	  }

	  var camelizedId = camelize(id);

	  if (hasOwn(assets, camelizedId)) {
	    return assets[camelizedId];
	  }

	  var PascalCaseId = capitalize(camelizedId);

	  if (hasOwn(assets, PascalCaseId)) {
	    return assets[PascalCaseId];
	  } // fallback to prototype chain


	  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];

	  if ( warnMissing && !res) {
	    warn('Failed to resolve ' + type.slice(0, -1) + ': ' + id, options);
	  }

	  return res;
	}
	/*  */


	function validateProp(key, propOptions, propsData, vm) {
	  var prop = propOptions[key];
	  var absent = !hasOwn(propsData, key);
	  var value = propsData[key]; // boolean casting

	  var booleanIndex = getTypeIndex(Boolean, prop.type);

	  if (booleanIndex > -1) {
	    if (absent && !hasOwn(prop, 'default')) {
	      value = false;
	    } else if (value === '' || value === hyphenate(key)) {
	      // only cast empty string / same name to boolean if
	      // boolean has higher priority
	      var stringIndex = getTypeIndex(String, prop.type);

	      if (stringIndex < 0 || booleanIndex < stringIndex) {
	        value = true;
	      }
	    }
	  } // check default value


	  if (value === undefined) {
	    value = getPropDefaultValue(vm, prop, key); // since the default value is a fresh copy,
	    // make sure to observe it.

	    var prevShouldObserve = shouldObserve;
	    toggleObserving(true);
	    observe(value);
	    toggleObserving(prevShouldObserve);
	  }

	  {
	    assertProp(prop, key, value, vm, absent);
	  }

	  return value;
	}
	/**
	 * Get the default value of a prop.
	 */


	function getPropDefaultValue(vm, prop, key) {
	  // no default, return undefined
	  if (!hasOwn(prop, 'default')) {
	    return undefined;
	  }

	  var def = prop.default; // warn against non-factory defaults for Object & Array

	  if ( isObject$1(def)) {
	    warn('Invalid default value for prop "' + key + '": ' + 'Props with type Object/Array must use a factory function ' + 'to return the default value.', vm);
	  } // the raw prop value was also undefined from previous render,
	  // return previous default value to avoid unnecessary watcher trigger


	  if (vm && vm.$options.propsData && vm.$options.propsData[key] === undefined && vm._props[key] !== undefined) {
	    return vm._props[key];
	  } // call factory function for non-Function types
	  // a value is Function if its prototype is function even across different execution context


	  return typeof def === 'function' && getType(prop.type) !== 'Function' ? def.call(vm) : def;
	}
	/**
	 * Assert whether a prop is valid.
	 */


	function assertProp(prop, name, value, vm, absent) {
	  if (prop.required && absent) {
	    warn('Missing required prop: "' + name + '"', vm);
	    return;
	  }

	  if (value == null && !prop.required) {
	    return;
	  }

	  var type = prop.type;
	  var valid = !type || type === true;
	  var expectedTypes = [];

	  if (type) {
	    if (!Array.isArray(type)) {
	      type = [type];
	    }

	    for (var i = 0; i < type.length && !valid; i++) {
	      var assertedType = assertType(value, type[i]);
	      expectedTypes.push(assertedType.expectedType || '');
	      valid = assertedType.valid;
	    }
	  }

	  if (!valid) {
	    warn(getInvalidTypeMessage(name, value, expectedTypes), vm);
	    return;
	  }

	  var validator = prop.validator;

	  if (validator) {
	    if (!validator(value)) {
	      warn('Invalid prop: custom validator check failed for prop "' + name + '".', vm);
	    }
	  }
	}

	var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

	function assertType(value, type) {
	  var valid;
	  var expectedType = getType(type);

	  if (simpleCheckRE.test(expectedType)) {
	    var t = _typeof(value);

	    valid = t === expectedType.toLowerCase(); // for primitive wrapper objects

	    if (!valid && t === 'object') {
	      valid = value instanceof type;
	    }
	  } else if (expectedType === 'Object') {
	    valid = isPlainObject(value);
	  } else if (expectedType === 'Array') {
	    valid = Array.isArray(value);
	  } else {
	    valid = value instanceof type;
	  }

	  return {
	    valid: valid,
	    expectedType: expectedType
	  };
	}
	/**
	 * Use function string name to check built-in types,
	 * because a simple equality check will fail when running
	 * across different vms / iframes.
	 */


	function getType(fn) {
	  var match = fn && fn.toString().match(/^\s*function (\w+)/);
	  return match ? match[1] : '';
	}

	function isSameType(a, b) {
	  return getType(a) === getType(b);
	}

	function getTypeIndex(type, expectedTypes) {
	  if (!Array.isArray(expectedTypes)) {
	    return isSameType(expectedTypes, type) ? 0 : -1;
	  }

	  for (var i = 0, len = expectedTypes.length; i < len; i++) {
	    if (isSameType(expectedTypes[i], type)) {
	      return i;
	    }
	  }

	  return -1;
	}

	function getInvalidTypeMessage(name, value, expectedTypes) {
	  var message = "Invalid prop: type check failed for prop \"" + name + "\"." + " Expected " + expectedTypes.map(capitalize).join(', ');
	  var expectedType = expectedTypes[0];
	  var receivedType = toRawType(value);
	  var expectedValue = styleValue(value, expectedType);
	  var receivedValue = styleValue(value, receivedType); // check if we need to specify expected value

	  if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean(expectedType, receivedType)) {
	    message += " with value " + expectedValue;
	  }

	  message += ", got " + receivedType + " "; // check if we need to specify received value

	  if (isExplicable(receivedType)) {
	    message += "with value " + receivedValue + ".";
	  }

	  return message;
	}

	function styleValue(value, type) {
	  if (type === 'String') {
	    return "\"" + value + "\"";
	  } else if (type === 'Number') {
	    return "" + Number(value);
	  } else {
	    return "" + value;
	  }
	}

	function isExplicable(value) {
	  var explicitTypes = ['string', 'number', 'boolean'];
	  return explicitTypes.some(function (elem) {
	    return value.toLowerCase() === elem;
	  });
	}

	function isBoolean() {
	  var args = [],
	      len = arguments.length;

	  while (len--) {
	    args[len] = arguments[len];
	  }

	  return args.some(function (elem) {
	    return elem.toLowerCase() === 'boolean';
	  });
	}
	/*  */


	function handleError(err, vm, info) {
	  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
	  // See: https://github.com/vuejs/vuex/issues/1505
	  pushTarget();

	  try {
	    if (vm) {
	      var cur = vm;

	      while (cur = cur.$parent) {
	        var hooks = cur.$options.errorCaptured;

	        if (hooks) {
	          for (var i = 0; i < hooks.length; i++) {
	            try {
	              var capture = hooks[i].call(cur, err, vm, info) === false;

	              if (capture) {
	                return;
	              }
	            } catch (e) {
	              globalHandleError(e, cur, 'errorCaptured hook');
	            }
	          }
	        }
	      }
	    }

	    globalHandleError(err, vm, info);
	  } finally {
	    popTarget();
	  }
	}

	function invokeWithErrorHandling(handler, context, args, vm, info) {
	  var res;

	  try {
	    res = args ? handler.apply(context, args) : handler.call(context);

	    if (res && !res._isVue && isPromise(res) && !res._handled) {
	      res.catch(function (e) {
	        return handleError(e, vm, info + " (Promise/async)");
	      }); // issue #9511
	      // avoid catch triggering multiple times when nested calls

	      res._handled = true;
	    }
	  } catch (e) {
	    handleError(e, vm, info);
	  }

	  return res;
	}

	function globalHandleError(err, vm, info) {
	  if (config.errorHandler) {
	    try {
	      return config.errorHandler.call(null, err, vm, info);
	    } catch (e) {
	      // if the user intentionally throws the original error in the handler,
	      // do not log it twice
	      if (e !== err) {
	        logError(e, null, 'config.errorHandler');
	      }
	    }
	  }

	  logError(err, vm, info);
	}

	function logError(err, vm, info) {
	  {
	    warn("Error in " + info + ": \"" + err.toString() + "\"", vm);
	  }
	  /* istanbul ignore else */


	  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
	    console.error(err);
	  } else {
	    throw err;
	  }
	}
	/*  */


	var isUsingMicroTask = false;
	var callbacks = [];
	var pending = false;

	function flushCallbacks() {
	  pending = false;
	  var copies = callbacks.slice(0);
	  callbacks.length = 0;

	  for (var i = 0; i < copies.length; i++) {
	    copies[i]();
	  }
	} // Here we have async deferring wrappers using microtasks.
	// In 2.5 we used (macro) tasks (in combination with microtasks).
	// However, it has subtle problems when state is changed right before repaint
	// (e.g. #6813, out-in transitions).
	// Also, using (macro) tasks in event handler would cause some weird behaviors
	// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
	// So we now use microtasks everywhere, again.
	// A major drawback of this tradeoff is that there are some scenarios
	// where microtasks have too high a priority and fire in between supposedly
	// sequential events (e.g. #4521, #6690, which have workarounds)
	// or even between bubbling of the same event (#6566).


	var timerFunc; // The nextTick behavior leverages the microtask queue, which can be accessed
	// via either native Promise.then or MutationObserver.
	// MutationObserver has wider support, however it is seriously bugged in
	// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
	// completely stops working after triggering a few times... so, if native
	// Promise is available, we will use it:

	/* istanbul ignore next, $flow-disable-line */

	if (typeof Promise !== 'undefined' && isNative(Promise)) {
	  var p = Promise.resolve();

	  timerFunc = function timerFunc() {
	    p.then(flushCallbacks); // In problematic UIWebViews, Promise.then doesn't completely break, but
	    // it can get stuck in a weird state where callbacks are pushed into the
	    // microtask queue but the queue isn't being flushed, until the browser
	    // needs to do some other work, e.g. handle a timer. Therefore we can
	    // "force" the microtask queue to be flushed by adding an empty timer.

	    if (isIOS) {
	      setTimeout(noop);
	    }
	  };

	  isUsingMicroTask = true;
	} else if (!isIE && typeof MutationObserver !== 'undefined' && (isNative(MutationObserver) || // PhantomJS and iOS 7.x
	MutationObserver.toString() === '[object MutationObserverConstructor]')) {
	  // Use MutationObserver where native Promise is not available,
	  // e.g. PhantomJS, iOS7, Android 4.4
	  // (#6466 MutationObserver is unreliable in IE11)
	  var counter$1 = 1;
	  var observer = new MutationObserver(flushCallbacks);
	  var textNode = document.createTextNode(String(counter$1));
	  observer.observe(textNode, {
	    characterData: true
	  });

	  timerFunc = function timerFunc() {
	    counter$1 = (counter$1 + 1) % 2;
	    textNode.data = String(counter$1);
	  };

	  isUsingMicroTask = true;
	} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
	  // Fallback to setImmediate.
	  // Technically it leverages the (macro) task queue,
	  // but it is still a better choice than setTimeout.
	  timerFunc = function timerFunc() {
	    setImmediate(flushCallbacks);
	  };
	} else {
	  // Fallback to setTimeout.
	  timerFunc = function timerFunc() {
	    setTimeout(flushCallbacks, 0);
	  };
	}

	function nextTick(cb, ctx) {
	  var _resolve;

	  callbacks.push(function () {
	    if (cb) {
	      try {
	        cb.call(ctx);
	      } catch (e) {
	        handleError(e, ctx, 'nextTick');
	      }
	    } else if (_resolve) {
	      _resolve(ctx);
	    }
	  });

	  if (!pending) {
	    pending = true;
	    timerFunc();
	  } // $flow-disable-line


	  if (!cb && typeof Promise !== 'undefined') {
	    return new Promise(function (resolve) {
	      _resolve = resolve;
	    });
	  }
	}
	/*  */

	/* not type checking this file because flow doesn't play well with Proxy */


	var initProxy;

	{
	  var allowedGlobals = makeMap('Infinity,undefined,NaN,isFinite,isNaN,' + 'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' + 'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' + 'require' // for Webpack/Browserify
	  );

	  var warnNonPresent = function warnNonPresent(target, key) {
	    warn("Property or method \"" + key + "\" is not defined on the instance but " + 'referenced during render. Make sure that this property is reactive, ' + 'either in the data option, or for class-based components, by ' + 'initializing the property. ' + 'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.', target);
	  };

	  var warnReservedPrefix = function warnReservedPrefix(target, key) {
	    warn("Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " + 'properties starting with "$" or "_" are not proxied in the Vue instance to ' + 'prevent conflicts with Vue internals. ' + 'See: https://vuejs.org/v2/api/#data', target);
	  };

	  var hasProxy = typeof Proxy !== 'undefined' && isNative(Proxy);

	  if (hasProxy) {
	    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
	    config.keyCodes = new Proxy(config.keyCodes, {
	      set: function set(target, key, value) {
	        if (isBuiltInModifier(key)) {
	          warn("Avoid overwriting built-in modifier in config.keyCodes: ." + key);
	          return false;
	        } else {
	          target[key] = value;
	          return true;
	        }
	      }
	    });
	  }

	  var hasHandler = {
	    has: function has(target, key) {
	      var has = key in target;
	      var isAllowed = allowedGlobals(key) || typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data);

	      if (!has && !isAllowed) {
	        if (key in target.$data) {
	          warnReservedPrefix(target, key);
	        } else {
	          warnNonPresent(target, key);
	        }
	      }

	      return has || !isAllowed;
	    }
	  };
	  var getHandler = {
	    get: function get(target, key) {
	      if (typeof key === 'string' && !(key in target)) {
	        if (key in target.$data) {
	          warnReservedPrefix(target, key);
	        } else {
	          warnNonPresent(target, key);
	        }
	      }

	      return target[key];
	    }
	  };

	  initProxy = function initProxy(vm) {
	    if (hasProxy) {
	      // determine which proxy handler to use
	      var options = vm.$options;
	      var handlers = options.render && options.render._withStripped ? getHandler : hasHandler;
	      vm._renderProxy = new Proxy(vm, handlers);
	    } else {
	      vm._renderProxy = vm;
	    }
	  };
	}
	/*  */


	var seenObjects = new _Set();
	/**
	 * Recursively traverse an object to evoke all converted
	 * getters, so that every nested property inside the object
	 * is collected as a "deep" dependency.
	 */

	function traverse(val) {
	  _traverse(val, seenObjects);

	  seenObjects.clear();
	}

	function _traverse(val, seen) {
	  var i, keys;
	  var isA = Array.isArray(val);

	  if (!isA && !isObject$1(val) || Object.isFrozen(val) || val instanceof VNode) {
	    return;
	  }

	  if (val.__ob__) {
	    var depId = val.__ob__.dep.id;

	    if (seen.has(depId)) {
	      return;
	    }

	    seen.add(depId);
	  }

	  if (isA) {
	    i = val.length;

	    while (i--) {
	      _traverse(val[i], seen);
	    }
	  } else {
	    keys = Object.keys(val);
	    i = keys.length;

	    while (i--) {
	      _traverse(val[keys[i]], seen);
	    }
	  }
	}

	var mark;
	var measure;

	{
	  var perf = inBrowser && window.performance;
	  /* istanbul ignore if */

	  if (perf && perf.mark && perf.measure && perf.clearMarks && perf.clearMeasures) {
	    mark = function mark(tag) {
	      return perf.mark(tag);
	    };

	    measure = function measure(name, startTag, endTag) {
	      perf.measure(name, startTag, endTag);
	      perf.clearMarks(startTag);
	      perf.clearMarks(endTag); // perf.clearMeasures(name)
	    };
	  }
	}
	/*  */


	var normalizeEvent = cached(function (name) {
	  var passive = name.charAt(0) === '&';
	  name = passive ? name.slice(1) : name;
	  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first

	  name = once$$1 ? name.slice(1) : name;
	  var capture = name.charAt(0) === '!';
	  name = capture ? name.slice(1) : name;
	  return {
	    name: name,
	    once: once$$1,
	    capture: capture,
	    passive: passive
	  };
	});

	function createFnInvoker(fns, vm) {
	  function invoker() {
	    var arguments$1 = arguments;
	    var fns = invoker.fns;

	    if (Array.isArray(fns)) {
	      var cloned = fns.slice();

	      for (var i = 0; i < cloned.length; i++) {
	        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
	      }
	    } else {
	      // return handler return value for single handlers
	      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler");
	    }
	  }

	  invoker.fns = fns;
	  return invoker;
	}

	function updateListeners(on, oldOn, add, remove$$1, createOnceHandler, vm) {
	  var name, def$$1, cur, old, event;

	  for (name in on) {
	    def$$1 = cur = on[name];
	    old = oldOn[name];
	    event = normalizeEvent(name);

	    if (isUndef(cur)) {
	       warn("Invalid handler for event \"" + event.name + "\": got " + String(cur), vm);
	    } else if (isUndef(old)) {
	      if (isUndef(cur.fns)) {
	        cur = on[name] = createFnInvoker(cur, vm);
	      }

	      if (isTrue(event.once)) {
	        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
	      }

	      add(event.name, cur, event.capture, event.passive, event.params);
	    } else if (cur !== old) {
	      old.fns = cur;
	      on[name] = old;
	    }
	  }

	  for (name in oldOn) {
	    if (isUndef(on[name])) {
	      event = normalizeEvent(name);
	      remove$$1(event.name, oldOn[name], event.capture);
	    }
	  }
	}
	/*  */


	function mergeVNodeHook(def, hookKey, hook) {
	  if (def instanceof VNode) {
	    def = def.data.hook || (def.data.hook = {});
	  }

	  var invoker;
	  var oldHook = def[hookKey];

	  function wrappedHook() {
	    hook.apply(this, arguments); // important: remove merged hook to ensure it's called only once
	    // and prevent memory leak

	    remove(invoker.fns, wrappedHook);
	  }

	  if (isUndef(oldHook)) {
	    // no existing hook
	    invoker = createFnInvoker([wrappedHook]);
	  } else {
	    /* istanbul ignore if */
	    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
	      // already a merged invoker
	      invoker = oldHook;
	      invoker.fns.push(wrappedHook);
	    } else {
	      // existing plain hook
	      invoker = createFnInvoker([oldHook, wrappedHook]);
	    }
	  }

	  invoker.merged = true;
	  def[hookKey] = invoker;
	}
	/*  */


	function extractPropsFromVNodeData(data, Ctor, tag) {
	  // we are only extracting raw values here.
	  // validation and default values are handled in the child
	  // component itself.
	  var propOptions = Ctor.options.props;

	  if (isUndef(propOptions)) {
	    return;
	  }

	  var res = {};
	  var attrs = data.attrs;
	  var props = data.props;

	  if (isDef(attrs) || isDef(props)) {
	    for (var key in propOptions) {
	      var altKey = hyphenate(key);

	      {
	        var keyInLowerCase = key.toLowerCase();

	        if (key !== keyInLowerCase && attrs && hasOwn(attrs, keyInLowerCase)) {
	          tip("Prop \"" + keyInLowerCase + "\" is passed to component " + formatComponentName(tag || Ctor) + ", but the declared prop name is" + " \"" + key + "\". " + "Note that HTML attributes are case-insensitive and camelCased " + "props need to use their kebab-case equivalents when using in-DOM " + "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\".");
	        }
	      }

	      checkProp(res, props, key, altKey, true) || checkProp(res, attrs, key, altKey, false);
	    }
	  }

	  return res;
	}

	function checkProp(res, hash, key, altKey, preserve) {
	  if (isDef(hash)) {
	    if (hasOwn(hash, key)) {
	      res[key] = hash[key];

	      if (!preserve) {
	        delete hash[key];
	      }

	      return true;
	    } else if (hasOwn(hash, altKey)) {
	      res[key] = hash[altKey];

	      if (!preserve) {
	        delete hash[altKey];
	      }

	      return true;
	    }
	  }

	  return false;
	}
	/*  */
	// The template compiler attempts to minimize the need for normalization by
	// statically analyzing the template at compile time.
	//
	// For plain HTML markup, normalization can be completely skipped because the
	// generated render function is guaranteed to return Array<VNode>. There are
	// two cases where extra normalization is needed:
	// 1. When the children contains components - because a functional component
	// may return an Array instead of a single root. In this case, just a simple
	// normalization is needed - if any child is an Array, we flatten the whole
	// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
	// because functional components already normalize their own children.


	function simpleNormalizeChildren(children) {
	  for (var i = 0; i < children.length; i++) {
	    if (Array.isArray(children[i])) {
	      return Array.prototype.concat.apply([], children);
	    }
	  }

	  return children;
	} // 2. When the children contains constructs that always generated nested Arrays,
	// e.g. <template>, <slot>, v-for, or when the children is provided by user
	// with hand-written render functions / JSX. In such cases a full normalization
	// is needed to cater to all possible types of children values.


	function normalizeChildren(children) {
	  return isPrimitive(children) ? [createTextVNode(children)] : Array.isArray(children) ? normalizeArrayChildren(children) : undefined;
	}

	function isTextNode(node) {
	  return isDef(node) && isDef(node.text) && isFalse(node.isComment);
	}

	function normalizeArrayChildren(children, nestedIndex) {
	  var res = [];
	  var i, c, lastIndex, last;

	  for (i = 0; i < children.length; i++) {
	    c = children[i];

	    if (isUndef(c) || typeof c === 'boolean') {
	      continue;
	    }

	    lastIndex = res.length - 1;
	    last = res[lastIndex]; //  nested

	    if (Array.isArray(c)) {
	      if (c.length > 0) {
	        c = normalizeArrayChildren(c, (nestedIndex || '') + "_" + i); // merge adjacent text nodes

	        if (isTextNode(c[0]) && isTextNode(last)) {
	          res[lastIndex] = createTextVNode(last.text + c[0].text);
	          c.shift();
	        }

	        res.push.apply(res, c);
	      }
	    } else if (isPrimitive(c)) {
	      if (isTextNode(last)) {
	        // merge adjacent text nodes
	        // this is necessary for SSR hydration because text nodes are
	        // essentially merged when rendered to HTML strings
	        res[lastIndex] = createTextVNode(last.text + c);
	      } else if (c !== '') {
	        // convert primitive to vnode
	        res.push(createTextVNode(c));
	      }
	    } else {
	      if (isTextNode(c) && isTextNode(last)) {
	        // merge adjacent text nodes
	        res[lastIndex] = createTextVNode(last.text + c.text);
	      } else {
	        // default key for nested array children (likely generated by v-for)
	        if (isTrue(children._isVList) && isDef(c.tag) && isUndef(c.key) && isDef(nestedIndex)) {
	          c.key = "__vlist" + nestedIndex + "_" + i + "__";
	        }

	        res.push(c);
	      }
	    }
	  }

	  return res;
	}
	/*  */


	function initProvide(vm) {
	  var provide = vm.$options.provide;

	  if (provide) {
	    vm._provided = typeof provide === 'function' ? provide.call(vm) : provide;
	  }
	}

	function initInjections(vm) {
	  var result = resolveInject(vm.$options.inject, vm);

	  if (result) {
	    toggleObserving(false);
	    Object.keys(result).forEach(function (key) {
	      /* istanbul ignore else */
	      {
	        defineReactive$$1(vm, key, result[key], function () {
	          warn("Avoid mutating an injected value directly since the changes will be " + "overwritten whenever the provided component re-renders. " + "injection being mutated: \"" + key + "\"", vm);
	        });
	      }
	    });
	    toggleObserving(true);
	  }
	}

	function resolveInject(inject, vm) {
	  if (inject) {
	    // inject is :any because flow is not smart enough to figure out cached
	    var result = Object.create(null);
	    var keys = hasSymbol ? Reflect.ownKeys(inject) : Object.keys(inject);

	    for (var i = 0; i < keys.length; i++) {
	      var key = keys[i]; // #6574 in case the inject object is observed...

	      if (key === '__ob__') {
	        continue;
	      }

	      var provideKey = inject[key].from;
	      var source = vm;

	      while (source) {
	        if (source._provided && hasOwn(source._provided, provideKey)) {
	          result[key] = source._provided[provideKey];
	          break;
	        }

	        source = source.$parent;
	      }

	      if (!source) {
	        if ('default' in inject[key]) {
	          var provideDefault = inject[key].default;
	          result[key] = typeof provideDefault === 'function' ? provideDefault.call(vm) : provideDefault;
	        } else {
	          warn("Injection \"" + key + "\" not found", vm);
	        }
	      }
	    }

	    return result;
	  }
	}
	/*  */

	/**
	 * Runtime helper for resolving raw children VNodes into a slot object.
	 */


	function resolveSlots(children, context) {
	  if (!children || !children.length) {
	    return {};
	  }

	  var slots = {};

	  for (var i = 0, l = children.length; i < l; i++) {
	    var child = children[i];
	    var data = child.data; // remove slot attribute if the node is resolved as a Vue slot node

	    if (data && data.attrs && data.attrs.slot) {
	      delete data.attrs.slot;
	    } // named slots should only be respected if the vnode was rendered in the
	    // same context.


	    if ((child.context === context || child.fnContext === context) && data && data.slot != null) {
	      var name = data.slot;
	      var slot = slots[name] || (slots[name] = []);

	      if (child.tag === 'template') {
	        slot.push.apply(slot, child.children || []);
	      } else {
	        slot.push(child);
	      }
	    } else {
	      (slots.default || (slots.default = [])).push(child);
	    }
	  } // ignore slots that contains only whitespace


	  for (var name$1 in slots) {
	    if (slots[name$1].every(isWhitespace)) {
	      delete slots[name$1];
	    }
	  }

	  return slots;
	}

	function isWhitespace(node) {
	  return node.isComment && !node.asyncFactory || node.text === ' ';
	}
	/*  */


	function normalizeScopedSlots(slots, normalSlots, prevSlots) {
	  var res;
	  var hasNormalSlots = Object.keys(normalSlots).length > 0;
	  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
	  var key = slots && slots.$key;

	  if (!slots) {
	    res = {};
	  } else if (slots._normalized) {
	    // fast path 1: child component re-render only, parent did not change
	    return slots._normalized;
	  } else if (isStable && prevSlots && prevSlots !== emptyObject && key === prevSlots.$key && !hasNormalSlots && !prevSlots.$hasNormal) {
	    // fast path 2: stable scoped slots w/ no normal slots to proxy,
	    // only need to normalize once
	    return prevSlots;
	  } else {
	    res = {};

	    for (var key$1 in slots) {
	      if (slots[key$1] && key$1[0] !== '$') {
	        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
	      }
	    }
	  } // expose normal slots on scopedSlots


	  for (var key$2 in normalSlots) {
	    if (!(key$2 in res)) {
	      res[key$2] = proxyNormalSlot(normalSlots, key$2);
	    }
	  } // avoriaz seems to mock a non-extensible $scopedSlots object
	  // and when that is passed down this would cause an error


	  if (slots && Object.isExtensible(slots)) {
	    slots._normalized = res;
	  }

	  def(res, '$stable', isStable);
	  def(res, '$key', key);
	  def(res, '$hasNormal', hasNormalSlots);
	  return res;
	}

	function normalizeScopedSlot(normalSlots, key, fn) {
	  var normalized = function normalized() {
	    var res = arguments.length ? fn.apply(null, arguments) : fn({});
	    res = res && _typeof(res) === 'object' && !Array.isArray(res) ? [res] // single vnode
	    : normalizeChildren(res);
	    return res && (res.length === 0 || res.length === 1 && res[0].isComment // #9658
	    ) ? undefined : res;
	  }; // this is a slot using the new v-slot syntax without scope. although it is
	  // compiled as a scoped slot, render fn users would expect it to be present
	  // on this.$slots because the usage is semantically a normal slot.


	  if (fn.proxy) {
	    Object.defineProperty(normalSlots, key, {
	      get: normalized,
	      enumerable: true,
	      configurable: true
	    });
	  }

	  return normalized;
	}

	function proxyNormalSlot(slots, key) {
	  return function () {
	    return slots[key];
	  };
	}
	/*  */

	/**
	 * Runtime helper for rendering v-for lists.
	 */


	function renderList(val, render) {
	  var ret, i, l, keys, key;

	  if (Array.isArray(val) || typeof val === 'string') {
	    ret = new Array(val.length);

	    for (i = 0, l = val.length; i < l; i++) {
	      ret[i] = render(val[i], i);
	    }
	  } else if (typeof val === 'number') {
	    ret = new Array(val);

	    for (i = 0; i < val; i++) {
	      ret[i] = render(i + 1, i);
	    }
	  } else if (isObject$1(val)) {
	    if (hasSymbol && val[Symbol.iterator]) {
	      ret = [];
	      var iterator = val[Symbol.iterator]();
	      var result = iterator.next();

	      while (!result.done) {
	        ret.push(render(result.value, ret.length));
	        result = iterator.next();
	      }
	    } else {
	      keys = Object.keys(val);
	      ret = new Array(keys.length);

	      for (i = 0, l = keys.length; i < l; i++) {
	        key = keys[i];
	        ret[i] = render(val[key], key, i);
	      }
	    }
	  }

	  if (!isDef(ret)) {
	    ret = [];
	  }

	  ret._isVList = true;
	  return ret;
	}
	/*  */

	/**
	 * Runtime helper for rendering <slot>
	 */


	function renderSlot(name, fallback, props, bindObject) {
	  var scopedSlotFn = this.$scopedSlots[name];
	  var nodes;

	  if (scopedSlotFn) {
	    // scoped slot
	    props = props || {};

	    if (bindObject) {
	      if ( !isObject$1(bindObject)) {
	        warn('slot v-bind without argument expects an Object', this);
	      }

	      props = extend(extend({}, bindObject), props);
	    }

	    nodes = scopedSlotFn(props) || fallback;
	  } else {
	    nodes = this.$slots[name] || fallback;
	  }

	  var target = props && props.slot;

	  if (target) {
	    return this.$createElement('template', {
	      slot: target
	    }, nodes);
	  } else {
	    return nodes;
	  }
	}
	/*  */

	/**
	 * Runtime helper for resolving filters
	 */


	function resolveFilter(id) {
	  return resolveAsset(this.$options, 'filters', id, true) || identity;
	}
	/*  */


	function isKeyNotMatch(expect, actual) {
	  if (Array.isArray(expect)) {
	    return expect.indexOf(actual) === -1;
	  } else {
	    return expect !== actual;
	  }
	}
	/**
	 * Runtime helper for checking keyCodes from config.
	 * exposed as Vue.prototype._k
	 * passing in eventKeyName as last argument separately for backwards compat
	 */


	function checkKeyCodes(eventKeyCode, key, builtInKeyCode, eventKeyName, builtInKeyName) {
	  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;

	  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
	    return isKeyNotMatch(builtInKeyName, eventKeyName);
	  } else if (mappedKeyCode) {
	    return isKeyNotMatch(mappedKeyCode, eventKeyCode);
	  } else if (eventKeyName) {
	    return hyphenate(eventKeyName) !== key;
	  }
	}
	/*  */

	/**
	 * Runtime helper for merging v-bind="object" into a VNode's data.
	 */


	function bindObjectProps(data, tag, value, asProp, isSync) {
	  if (value) {
	    if (!isObject$1(value)) {
	       warn('v-bind without argument expects an Object or Array value', this);
	    } else {
	      if (Array.isArray(value)) {
	        value = toObject$1(value);
	      }

	      var hash;

	      var loop = function loop(key) {
	        if (key === 'class' || key === 'style' || isReservedAttribute(key)) {
	          hash = data;
	        } else {
	          var type = data.attrs && data.attrs.type;
	          hash = asProp || config.mustUseProp(tag, type, key) ? data.domProps || (data.domProps = {}) : data.attrs || (data.attrs = {});
	        }

	        var camelizedKey = camelize(key);
	        var hyphenatedKey = hyphenate(key);

	        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
	          hash[key] = value[key];

	          if (isSync) {
	            var on = data.on || (data.on = {});

	            on["update:" + key] = function ($event) {
	              value[key] = $event;
	            };
	          }
	        }
	      };

	      for (var key in value) {
	        loop(key);
	      }
	    }
	  }

	  return data;
	}
	/*  */

	/**
	 * Runtime helper for rendering static trees.
	 */


	function renderStatic(index, isInFor) {
	  var cached = this._staticTrees || (this._staticTrees = []);
	  var tree = cached[index]; // if has already-rendered static tree and not inside v-for,
	  // we can reuse the same tree.

	  if (tree && !isInFor) {
	    return tree;
	  } // otherwise, render a fresh tree.


	  tree = cached[index] = this.$options.staticRenderFns[index].call(this._renderProxy, null, this // for render fns generated for functional component templates
	  );
	  markStatic(tree, "__static__" + index, false);
	  return tree;
	}
	/**
	 * Runtime helper for v-once.
	 * Effectively it means marking the node as static with a unique key.
	 */


	function markOnce(tree, index, key) {
	  markStatic(tree, "__once__" + index + (key ? "_" + key : ""), true);
	  return tree;
	}

	function markStatic(tree, key, isOnce) {
	  if (Array.isArray(tree)) {
	    for (var i = 0; i < tree.length; i++) {
	      if (tree[i] && typeof tree[i] !== 'string') {
	        markStaticNode(tree[i], key + "_" + i, isOnce);
	      }
	    }
	  } else {
	    markStaticNode(tree, key, isOnce);
	  }
	}

	function markStaticNode(node, key, isOnce) {
	  node.isStatic = true;
	  node.key = key;
	  node.isOnce = isOnce;
	}
	/*  */


	function bindObjectListeners(data, value) {
	  if (value) {
	    if (!isPlainObject(value)) {
	       warn('v-on without argument expects an Object value', this);
	    } else {
	      var on = data.on = data.on ? extend({}, data.on) : {};

	      for (var key in value) {
	        var existing = on[key];
	        var ours = value[key];
	        on[key] = existing ? [].concat(existing, ours) : ours;
	      }
	    }
	  }

	  return data;
	}
	/*  */


	function resolveScopedSlots(fns, // see flow/vnode
	res, // the following are added in 2.6
	hasDynamicKeys, contentHashKey) {
	  res = res || {
	    $stable: !hasDynamicKeys
	  };

	  for (var i = 0; i < fns.length; i++) {
	    var slot = fns[i];

	    if (Array.isArray(slot)) {
	      resolveScopedSlots(slot, res, hasDynamicKeys);
	    } else if (slot) {
	      // marker for reverse proxying v-slot without scope on this.$slots
	      if (slot.proxy) {
	        slot.fn.proxy = true;
	      }

	      res[slot.key] = slot.fn;
	    }
	  }

	  if (contentHashKey) {
	    res.$key = contentHashKey;
	  }

	  return res;
	}
	/*  */


	function bindDynamicKeys(baseObj, values) {
	  for (var i = 0; i < values.length; i += 2) {
	    var key = values[i];

	    if (typeof key === 'string' && key) {
	      baseObj[values[i]] = values[i + 1];
	    } else if ( key !== '' && key !== null) {
	      // null is a special value for explicitly removing a binding
	      warn("Invalid value for dynamic directive argument (expected string or null): " + key, this);
	    }
	  }

	  return baseObj;
	} // helper to dynamically append modifier runtime markers to event names.
	// ensure only append when value is already string, otherwise it will be cast
	// to string and cause the type check to miss.


	function prependModifier(value, symbol) {
	  return typeof value === 'string' ? symbol + value : value;
	}
	/*  */


	function installRenderHelpers(target) {
	  target._o = markOnce;
	  target._n = toNumber$1;
	  target._s = toString$2;
	  target._l = renderList;
	  target._t = renderSlot;
	  target._q = looseEqual;
	  target._i = looseIndexOf;
	  target._m = renderStatic;
	  target._f = resolveFilter;
	  target._k = checkKeyCodes;
	  target._b = bindObjectProps;
	  target._v = createTextVNode;
	  target._e = createEmptyVNode;
	  target._u = resolveScopedSlots;
	  target._g = bindObjectListeners;
	  target._d = bindDynamicKeys;
	  target._p = prependModifier;
	}
	/*  */


	function FunctionalRenderContext(data, props, children, parent, Ctor) {
	  var this$1 = this;
	  var options = Ctor.options; // ensure the createElement function in functional components
	  // gets a unique context - this is necessary for correct named slot check

	  var contextVm;

	  if (hasOwn(parent, '_uid')) {
	    contextVm = Object.create(parent); // $flow-disable-line

	    contextVm._original = parent;
	  } else {
	    // the context vm passed in is a functional context as well.
	    // in this case we want to make sure we are able to get a hold to the
	    // real context instance.
	    contextVm = parent; // $flow-disable-line

	    parent = parent._original;
	  }

	  var isCompiled = isTrue(options._compiled);
	  var needNormalization = !isCompiled;
	  this.data = data;
	  this.props = props;
	  this.children = children;
	  this.parent = parent;
	  this.listeners = data.on || emptyObject;
	  this.injections = resolveInject(options.inject, parent);

	  this.slots = function () {
	    if (!this$1.$slots) {
	      normalizeScopedSlots(data.scopedSlots, this$1.$slots = resolveSlots(children, parent));
	    }

	    return this$1.$slots;
	  };

	  Object.defineProperty(this, 'scopedSlots', {
	    enumerable: true,
	    get: function get() {
	      return normalizeScopedSlots(data.scopedSlots, this.slots());
	    }
	  }); // support for compiled functional template

	  if (isCompiled) {
	    // exposing $options for renderStatic()
	    this.$options = options; // pre-resolve slots for renderSlot()

	    this.$slots = this.slots();
	    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
	  }

	  if (options._scopeId) {
	    this._c = function (a, b, c, d) {
	      var vnode = createElement(contextVm, a, b, c, d, needNormalization);

	      if (vnode && !Array.isArray(vnode)) {
	        vnode.fnScopeId = options._scopeId;
	        vnode.fnContext = parent;
	      }

	      return vnode;
	    };
	  } else {
	    this._c = function (a, b, c, d) {
	      return createElement(contextVm, a, b, c, d, needNormalization);
	    };
	  }
	}

	installRenderHelpers(FunctionalRenderContext.prototype);

	function createFunctionalComponent(Ctor, propsData, data, contextVm, children) {
	  var options = Ctor.options;
	  var props = {};
	  var propOptions = options.props;

	  if (isDef(propOptions)) {
	    for (var key in propOptions) {
	      props[key] = validateProp(key, propOptions, propsData || emptyObject);
	    }
	  } else {
	    if (isDef(data.attrs)) {
	      mergeProps(props, data.attrs);
	    }

	    if (isDef(data.props)) {
	      mergeProps(props, data.props);
	    }
	  }

	  var renderContext = new FunctionalRenderContext(data, props, children, contextVm, Ctor);
	  var vnode = options.render.call(null, renderContext._c, renderContext);

	  if (vnode instanceof VNode) {
	    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext);
	  } else if (Array.isArray(vnode)) {
	    var vnodes = normalizeChildren(vnode) || [];
	    var res = new Array(vnodes.length);

	    for (var i = 0; i < vnodes.length; i++) {
	      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
	    }

	    return res;
	  }
	}

	function cloneAndMarkFunctionalResult(vnode, data, contextVm, options, renderContext) {
	  // #7817 clone node before setting fnContext, otherwise if the node is reused
	  // (e.g. it was from a cached normal slot) the fnContext causes named slots
	  // that should not be matched to match.
	  var clone = cloneVNode(vnode);
	  clone.fnContext = contextVm;
	  clone.fnOptions = options;

	  {
	    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
	  }

	  if (data.slot) {
	    (clone.data || (clone.data = {})).slot = data.slot;
	  }

	  return clone;
	}

	function mergeProps(to, from) {
	  for (var key in from) {
	    to[camelize(key)] = from[key];
	  }
	}
	/*  */

	/*  */

	/*  */

	/*  */
	// inline hooks to be invoked on component VNodes during patch


	var componentVNodeHooks = {
	  init: function init(vnode, hydrating) {
	    if (vnode.componentInstance && !vnode.componentInstance._isDestroyed && vnode.data.keepAlive) {
	      // kept-alive components, treat as a patch
	      var mountedNode = vnode; // work around flow

	      componentVNodeHooks.prepatch(mountedNode, mountedNode);
	    } else {
	      var child = vnode.componentInstance = createComponentInstanceForVnode(vnode, activeInstance);
	      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
	    }
	  },
	  prepatch: function prepatch(oldVnode, vnode) {
	    var options = vnode.componentOptions;
	    var child = vnode.componentInstance = oldVnode.componentInstance;
	    updateChildComponent(child, options.propsData, // updated props
	    options.listeners, // updated listeners
	    vnode, // new parent vnode
	    options.children // new children
	    );
	  },
	  insert: function insert(vnode) {
	    var context = vnode.context;
	    var componentInstance = vnode.componentInstance;

	    if (!componentInstance._isMounted) {
	      componentInstance._isMounted = true;
	      callHook(componentInstance, 'mounted');
	    }

	    if (vnode.data.keepAlive) {
	      if (context._isMounted) {
	        // vue-router#1212
	        // During updates, a kept-alive component's child components may
	        // change, so directly walking the tree here may call activated hooks
	        // on incorrect children. Instead we push them into a queue which will
	        // be processed after the whole patch process ended.
	        queueActivatedComponent(componentInstance);
	      } else {
	        activateChildComponent(componentInstance, true
	        /* direct */
	        );
	      }
	    }
	  },
	  destroy: function destroy(vnode) {
	    var componentInstance = vnode.componentInstance;

	    if (!componentInstance._isDestroyed) {
	      if (!vnode.data.keepAlive) {
	        componentInstance.$destroy();
	      } else {
	        deactivateChildComponent(componentInstance, true
	        /* direct */
	        );
	      }
	    }
	  }
	};
	var hooksToMerge = Object.keys(componentVNodeHooks);

	function createComponent(Ctor, data, context, children, tag) {
	  if (isUndef(Ctor)) {
	    return;
	  }

	  var baseCtor = context.$options._base; // plain options object: turn it into a constructor

	  if (isObject$1(Ctor)) {
	    Ctor = baseCtor.extend(Ctor);
	  } // if at this stage it's not a constructor or an async component factory,
	  // reject.


	  if (typeof Ctor !== 'function') {
	    {
	      warn("Invalid Component definition: " + String(Ctor), context);
	    }

	    return;
	  } // async component


	  var asyncFactory;

	  if (isUndef(Ctor.cid)) {
	    asyncFactory = Ctor;
	    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);

	    if (Ctor === undefined) {
	      // return a placeholder node for async component, which is rendered
	      // as a comment node but preserves all the raw information for the node.
	      // the information will be used for async server-rendering and hydration.
	      return createAsyncPlaceholder(asyncFactory, data, context, children, tag);
	    }
	  }

	  data = data || {}; // resolve constructor options in case global mixins are applied after
	  // component constructor creation

	  resolveConstructorOptions(Ctor); // transform component v-model data into props & events

	  if (isDef(data.model)) {
	    transformModel(Ctor.options, data);
	  } // extract props


	  var propsData = extractPropsFromVNodeData(data, Ctor, tag); // functional component

	  if (isTrue(Ctor.options.functional)) {
	    return createFunctionalComponent(Ctor, propsData, data, context, children);
	  } // extract listeners, since these needs to be treated as
	  // child component listeners instead of DOM listeners


	  var listeners = data.on; // replace with listeners with .native modifier
	  // so it gets processed during parent component patch.

	  data.on = data.nativeOn;

	  if (isTrue(Ctor.options.abstract)) {
	    // abstract components do not keep anything
	    // other than props & listeners & slot
	    // work around flow
	    var slot = data.slot;
	    data = {};

	    if (slot) {
	      data.slot = slot;
	    }
	  } // install component management hooks onto the placeholder node


	  installComponentHooks(data); // return a placeholder vnode

	  var name = Ctor.options.name || tag;
	  var vnode = new VNode("vue-component-" + Ctor.cid + (name ? "-" + name : ''), data, undefined, undefined, undefined, context, {
	    Ctor: Ctor,
	    propsData: propsData,
	    listeners: listeners,
	    tag: tag,
	    children: children
	  }, asyncFactory);
	  return vnode;
	}

	function createComponentInstanceForVnode(vnode, // we know it's MountedComponentVNode but flow doesn't
	parent // activeInstance in lifecycle state
	) {
	  var options = {
	    _isComponent: true,
	    _parentVnode: vnode,
	    parent: parent
	  }; // check inline-template render functions

	  var inlineTemplate = vnode.data.inlineTemplate;

	  if (isDef(inlineTemplate)) {
	    options.render = inlineTemplate.render;
	    options.staticRenderFns = inlineTemplate.staticRenderFns;
	  }

	  return new vnode.componentOptions.Ctor(options);
	}

	function installComponentHooks(data) {
	  var hooks = data.hook || (data.hook = {});

	  for (var i = 0; i < hooksToMerge.length; i++) {
	    var key = hooksToMerge[i];
	    var existing = hooks[key];
	    var toMerge = componentVNodeHooks[key];

	    if (existing !== toMerge && !(existing && existing._merged)) {
	      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
	    }
	  }
	}

	function mergeHook$1(f1, f2) {
	  var merged = function merged(a, b) {
	    // flow complains about extra args which is why we use any
	    f1(a, b);
	    f2(a, b);
	  };

	  merged._merged = true;
	  return merged;
	} // transform component v-model info (value and callback) into
	// prop and event handler respectively.


	function transformModel(options, data) {
	  var prop = options.model && options.model.prop || 'value';
	  var event = options.model && options.model.event || 'input';
	  (data.attrs || (data.attrs = {}))[prop] = data.model.value;
	  var on = data.on || (data.on = {});
	  var existing = on[event];
	  var callback = data.model.callback;

	  if (isDef(existing)) {
	    if (Array.isArray(existing) ? existing.indexOf(callback) === -1 : existing !== callback) {
	      on[event] = [callback].concat(existing);
	    }
	  } else {
	    on[event] = callback;
	  }
	}
	/*  */


	var SIMPLE_NORMALIZE = 1;
	var ALWAYS_NORMALIZE = 2; // wrapper function for providing a more flexible interface
	// without getting yelled at by flow

	function createElement(context, tag, data, children, normalizationType, alwaysNormalize) {
	  if (Array.isArray(data) || isPrimitive(data)) {
	    normalizationType = children;
	    children = data;
	    data = undefined;
	  }

	  if (isTrue(alwaysNormalize)) {
	    normalizationType = ALWAYS_NORMALIZE;
	  }

	  return _createElement(context, tag, data, children, normalizationType);
	}

	function _createElement(context, tag, data, children, normalizationType) {
	  if (isDef(data) && isDef(data.__ob__)) {
	     warn("Avoid using observed data object as vnode data: " + JSON.stringify(data) + "\n" + 'Always create fresh vnode data objects in each render!', context);
	    return createEmptyVNode();
	  } // object syntax in v-bind


	  if (isDef(data) && isDef(data.is)) {
	    tag = data.is;
	  }

	  if (!tag) {
	    // in case of component :is set to falsy value
	    return createEmptyVNode();
	  } // warn against non-primitive key


	  if ( isDef(data) && isDef(data.key) && !isPrimitive(data.key)) {
	    {
	      warn('Avoid using non-primitive value as key, ' + 'use string/number value instead.', context);
	    }
	  } // support single function children as default scoped slot


	  if (Array.isArray(children) && typeof children[0] === 'function') {
	    data = data || {};
	    data.scopedSlots = {
	      default: children[0]
	    };
	    children.length = 0;
	  }

	  if (normalizationType === ALWAYS_NORMALIZE) {
	    children = normalizeChildren(children);
	  } else if (normalizationType === SIMPLE_NORMALIZE) {
	    children = simpleNormalizeChildren(children);
	  }

	  var vnode, ns;

	  if (typeof tag === 'string') {
	    var Ctor;
	    ns = context.$vnode && context.$vnode.ns || config.getTagNamespace(tag);

	    if (config.isReservedTag(tag)) {
	      // platform built-in elements
	      if ( isDef(data) && isDef(data.nativeOn)) {
	        warn("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">.", context);
	      }

	      vnode = new VNode(config.parsePlatformTagName(tag), data, children, undefined, undefined, context);
	    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
	      // component
	      vnode = createComponent(Ctor, data, context, children, tag);
	    } else {
	      // unknown or unlisted namespaced elements
	      // check at runtime because it may get assigned a namespace when its
	      // parent normalizes children
	      vnode = new VNode(tag, data, children, undefined, undefined, context);
	    }
	  } else {
	    // direct component options / constructor
	    vnode = createComponent(tag, data, context, children);
	  }

	  if (Array.isArray(vnode)) {
	    return vnode;
	  } else if (isDef(vnode)) {
	    if (isDef(ns)) {
	      applyNS(vnode, ns);
	    }

	    if (isDef(data)) {
	      registerDeepBindings(data);
	    }

	    return vnode;
	  } else {
	    return createEmptyVNode();
	  }
	}

	function applyNS(vnode, ns, force) {
	  vnode.ns = ns;

	  if (vnode.tag === 'foreignObject') {
	    // use default namespace inside foreignObject
	    ns = undefined;
	    force = true;
	  }

	  if (isDef(vnode.children)) {
	    for (var i = 0, l = vnode.children.length; i < l; i++) {
	      var child = vnode.children[i];

	      if (isDef(child.tag) && (isUndef(child.ns) || isTrue(force) && child.tag !== 'svg')) {
	        applyNS(child, ns, force);
	      }
	    }
	  }
	} // ref #5318
	// necessary to ensure parent re-render when deep bindings like :style and
	// :class are used on slot nodes


	function registerDeepBindings(data) {
	  if (isObject$1(data.style)) {
	    traverse(data.style);
	  }

	  if (isObject$1(data.class)) {
	    traverse(data.class);
	  }
	}
	/*  */


	function initRender(vm) {
	  vm._vnode = null; // the root of the child tree

	  vm._staticTrees = null; // v-once cached trees

	  var options = vm.$options;
	  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree

	  var renderContext = parentVnode && parentVnode.context;
	  vm.$slots = resolveSlots(options._renderChildren, renderContext);
	  vm.$scopedSlots = emptyObject; // bind the createElement fn to this instance
	  // so that we get proper render context inside it.
	  // args order: tag, data, children, normalizationType, alwaysNormalize
	  // internal version is used by render functions compiled from templates

	  vm._c = function (a, b, c, d) {
	    return createElement(vm, a, b, c, d, false);
	  }; // normalization is always applied for the public version, used in
	  // user-written render functions.


	  vm.$createElement = function (a, b, c, d) {
	    return createElement(vm, a, b, c, d, true);
	  }; // $attrs & $listeners are exposed for easier HOC creation.
	  // they need to be reactive so that HOCs using them are always updated


	  var parentData = parentVnode && parentVnode.data;
	  /* istanbul ignore else */

	  {
	    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
	      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
	    }, true);
	    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
	      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
	    }, true);
	  }
	}

	var currentRenderingInstance = null;

	function renderMixin(Vue) {
	  // install runtime convenience helpers
	  installRenderHelpers(Vue.prototype);

	  Vue.prototype.$nextTick = function (fn) {
	    return nextTick(fn, this);
	  };

	  Vue.prototype._render = function () {
	    var vm = this;
	    var ref = vm.$options;
	    var render = ref.render;
	    var _parentVnode = ref._parentVnode;

	    if (_parentVnode) {
	      vm.$scopedSlots = normalizeScopedSlots(_parentVnode.data.scopedSlots, vm.$slots, vm.$scopedSlots);
	    } // set parent vnode. this allows render functions to have access
	    // to the data on the placeholder node.


	    vm.$vnode = _parentVnode; // render self

	    var vnode;

	    try {
	      // There's no need to maintain a stack because all render fns are called
	      // separately from one another. Nested component's render fns are called
	      // when parent component is patched.
	      currentRenderingInstance = vm;
	      vnode = render.call(vm._renderProxy, vm.$createElement);
	    } catch (e) {
	      handleError(e, vm, "render"); // return error render result,
	      // or previous vnode to prevent render error causing blank component

	      /* istanbul ignore else */

	      if ( vm.$options.renderError) {
	        try {
	          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
	        } catch (e) {
	          handleError(e, vm, "renderError");
	          vnode = vm._vnode;
	        }
	      } else {
	        vnode = vm._vnode;
	      }
	    } finally {
	      currentRenderingInstance = null;
	    } // if the returned array contains only a single node, allow it


	    if (Array.isArray(vnode) && vnode.length === 1) {
	      vnode = vnode[0];
	    } // return empty vnode in case the render function errored out


	    if (!(vnode instanceof VNode)) {
	      if ( Array.isArray(vnode)) {
	        warn('Multiple root nodes returned from render function. Render function ' + 'should return a single root node.', vm);
	      }

	      vnode = createEmptyVNode();
	    } // set parent


	    vnode.parent = _parentVnode;
	    return vnode;
	  };
	}
	/*  */


	function ensureCtor(comp, base) {
	  if (comp.__esModule || hasSymbol && comp[Symbol.toStringTag] === 'Module') {
	    comp = comp.default;
	  }

	  return isObject$1(comp) ? base.extend(comp) : comp;
	}

	function createAsyncPlaceholder(factory, data, context, children, tag) {
	  var node = createEmptyVNode();
	  node.asyncFactory = factory;
	  node.asyncMeta = {
	    data: data,
	    context: context,
	    children: children,
	    tag: tag
	  };
	  return node;
	}

	function resolveAsyncComponent(factory, baseCtor) {
	  if (isTrue(factory.error) && isDef(factory.errorComp)) {
	    return factory.errorComp;
	  }

	  if (isDef(factory.resolved)) {
	    return factory.resolved;
	  }

	  var owner = currentRenderingInstance;

	  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
	    // already pending
	    factory.owners.push(owner);
	  }

	  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
	    return factory.loadingComp;
	  }

	  if (owner && !isDef(factory.owners)) {
	    var owners = factory.owners = [owner];
	    var sync = true;
	    var timerLoading = null;
	    var timerTimeout = null;
	    owner.$on('hook:destroyed', function () {
	      return remove(owners, owner);
	    });

	    var forceRender = function forceRender(renderCompleted) {
	      for (var i = 0, l = owners.length; i < l; i++) {
	        owners[i].$forceUpdate();
	      }

	      if (renderCompleted) {
	        owners.length = 0;

	        if (timerLoading !== null) {
	          clearTimeout(timerLoading);
	          timerLoading = null;
	        }

	        if (timerTimeout !== null) {
	          clearTimeout(timerTimeout);
	          timerTimeout = null;
	        }
	      }
	    };

	    var resolve = once(function (res) {
	      // cache resolved
	      factory.resolved = ensureCtor(res, baseCtor); // invoke callbacks only if this is not a synchronous resolve
	      // (async resolves are shimmed as synchronous during SSR)

	      if (!sync) {
	        forceRender(true);
	      } else {
	        owners.length = 0;
	      }
	    });
	    var reject = once(function (reason) {
	       warn("Failed to resolve async component: " + String(factory) + (reason ? "\nReason: " + reason : ''));

	      if (isDef(factory.errorComp)) {
	        factory.error = true;
	        forceRender(true);
	      }
	    });
	    var res = factory(resolve, reject);

	    if (isObject$1(res)) {
	      if (isPromise(res)) {
	        // () => Promise
	        if (isUndef(factory.resolved)) {
	          res.then(resolve, reject);
	        }
	      } else if (isPromise(res.component)) {
	        res.component.then(resolve, reject);

	        if (isDef(res.error)) {
	          factory.errorComp = ensureCtor(res.error, baseCtor);
	        }

	        if (isDef(res.loading)) {
	          factory.loadingComp = ensureCtor(res.loading, baseCtor);

	          if (res.delay === 0) {
	            factory.loading = true;
	          } else {
	            timerLoading = setTimeout(function () {
	              timerLoading = null;

	              if (isUndef(factory.resolved) && isUndef(factory.error)) {
	                factory.loading = true;
	                forceRender(false);
	              }
	            }, res.delay || 200);
	          }
	        }

	        if (isDef(res.timeout)) {
	          timerTimeout = setTimeout(function () {
	            timerTimeout = null;

	            if (isUndef(factory.resolved)) {
	              reject( "timeout (" + res.timeout + "ms)" );
	            }
	          }, res.timeout);
	        }
	      }
	    }

	    sync = false; // return in case resolved synchronously

	    return factory.loading ? factory.loadingComp : factory.resolved;
	  }
	}
	/*  */


	function isAsyncPlaceholder(node) {
	  return node.isComment && node.asyncFactory;
	}
	/*  */


	function getFirstComponentChild(children) {
	  if (Array.isArray(children)) {
	    for (var i = 0; i < children.length; i++) {
	      var c = children[i];

	      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
	        return c;
	      }
	    }
	  }
	}
	/*  */

	/*  */


	function initEvents(vm) {
	  vm._events = Object.create(null);
	  vm._hasHookEvent = false; // init parent attached events

	  var listeners = vm.$options._parentListeners;

	  if (listeners) {
	    updateComponentListeners(vm, listeners);
	  }
	}

	var target;

	function add(event, fn) {
	  target.$on(event, fn);
	}

	function remove$1(event, fn) {
	  target.$off(event, fn);
	}

	function createOnceHandler(event, fn) {
	  var _target = target;
	  return function onceHandler() {
	    var res = fn.apply(null, arguments);

	    if (res !== null) {
	      _target.$off(event, onceHandler);
	    }
	  };
	}

	function updateComponentListeners(vm, listeners, oldListeners) {
	  target = vm;
	  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
	  target = undefined;
	}

	function eventsMixin(Vue) {
	  var hookRE = /^hook:/;

	  Vue.prototype.$on = function (event, fn) {
	    var vm = this;

	    if (Array.isArray(event)) {
	      for (var i = 0, l = event.length; i < l; i++) {
	        vm.$on(event[i], fn);
	      }
	    } else {
	      (vm._events[event] || (vm._events[event] = [])).push(fn); // optimize hook:event cost by using a boolean flag marked at registration
	      // instead of a hash lookup

	      if (hookRE.test(event)) {
	        vm._hasHookEvent = true;
	      }
	    }

	    return vm;
	  };

	  Vue.prototype.$once = function (event, fn) {
	    var vm = this;

	    function on() {
	      vm.$off(event, on);
	      fn.apply(vm, arguments);
	    }

	    on.fn = fn;
	    vm.$on(event, on);
	    return vm;
	  };

	  Vue.prototype.$off = function (event, fn) {
	    var vm = this; // all

	    if (!arguments.length) {
	      vm._events = Object.create(null);
	      return vm;
	    } // array of events


	    if (Array.isArray(event)) {
	      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
	        vm.$off(event[i$1], fn);
	      }

	      return vm;
	    } // specific event


	    var cbs = vm._events[event];

	    if (!cbs) {
	      return vm;
	    }

	    if (!fn) {
	      vm._events[event] = null;
	      return vm;
	    } // specific handler


	    var cb;
	    var i = cbs.length;

	    while (i--) {
	      cb = cbs[i];

	      if (cb === fn || cb.fn === fn) {
	        cbs.splice(i, 1);
	        break;
	      }
	    }

	    return vm;
	  };

	  Vue.prototype.$emit = function (event) {
	    var vm = this;

	    {
	      var lowerCaseEvent = event.toLowerCase();

	      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
	        tip("Event \"" + lowerCaseEvent + "\" is emitted in component " + formatComponentName(vm) + " but the handler is registered for \"" + event + "\". " + "Note that HTML attributes are case-insensitive and you cannot use " + "v-on to listen to camelCase events when using in-DOM templates. " + "You should probably use \"" + hyphenate(event) + "\" instead of \"" + event + "\".");
	      }
	    }

	    var cbs = vm._events[event];

	    if (cbs) {
	      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
	      var args = toArray(arguments, 1);
	      var info = "event handler for \"" + event + "\"";

	      for (var i = 0, l = cbs.length; i < l; i++) {
	        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
	      }
	    }

	    return vm;
	  };
	}
	/*  */


	var activeInstance = null;
	var isUpdatingChildComponent = false;

	function setActiveInstance(vm) {
	  var prevActiveInstance = activeInstance;
	  activeInstance = vm;
	  return function () {
	    activeInstance = prevActiveInstance;
	  };
	}

	function initLifecycle(vm) {
	  var options = vm.$options; // locate first non-abstract parent

	  var parent = options.parent;

	  if (parent && !options.abstract) {
	    while (parent.$options.abstract && parent.$parent) {
	      parent = parent.$parent;
	    }

	    parent.$children.push(vm);
	  }

	  vm.$parent = parent;
	  vm.$root = parent ? parent.$root : vm;
	  vm.$children = [];
	  vm.$refs = {};
	  vm._watcher = null;
	  vm._inactive = null;
	  vm._directInactive = false;
	  vm._isMounted = false;
	  vm._isDestroyed = false;
	  vm._isBeingDestroyed = false;
	}

	function lifecycleMixin(Vue) {
	  Vue.prototype._update = function (vnode, hydrating) {
	    var vm = this;
	    var prevEl = vm.$el;
	    var prevVnode = vm._vnode;
	    var restoreActiveInstance = setActiveInstance(vm);
	    vm._vnode = vnode; // Vue.prototype.__patch__ is injected in entry points
	    // based on the rendering backend used.

	    if (!prevVnode) {
	      // initial render
	      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false
	      /* removeOnly */
	      );
	    } else {
	      // updates
	      vm.$el = vm.__patch__(prevVnode, vnode);
	    }

	    restoreActiveInstance(); // update __vue__ reference

	    if (prevEl) {
	      prevEl.__vue__ = null;
	    }

	    if (vm.$el) {
	      vm.$el.__vue__ = vm;
	    } // if parent is an HOC, update its $el as well


	    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
	      vm.$parent.$el = vm.$el;
	    } // updated hook is called by the scheduler to ensure that children are
	    // updated in a parent's updated hook.

	  };

	  Vue.prototype.$forceUpdate = function () {
	    var vm = this;

	    if (vm._watcher) {
	      vm._watcher.update();
	    }
	  };

	  Vue.prototype.$destroy = function () {
	    var vm = this;

	    if (vm._isBeingDestroyed) {
	      return;
	    }

	    callHook(vm, 'beforeDestroy');
	    vm._isBeingDestroyed = true; // remove self from parent

	    var parent = vm.$parent;

	    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
	      remove(parent.$children, vm);
	    } // teardown watchers


	    if (vm._watcher) {
	      vm._watcher.teardown();
	    }

	    var i = vm._watchers.length;

	    while (i--) {
	      vm._watchers[i].teardown();
	    } // remove reference from data ob
	    // frozen object may not have observer.


	    if (vm._data.__ob__) {
	      vm._data.__ob__.vmCount--;
	    } // call the last hook...


	    vm._isDestroyed = true; // invoke destroy hooks on current rendered tree

	    vm.__patch__(vm._vnode, null); // fire destroyed hook


	    callHook(vm, 'destroyed'); // turn off all instance listeners.

	    vm.$off(); // remove __vue__ reference

	    if (vm.$el) {
	      vm.$el.__vue__ = null;
	    } // release circular reference (#6759)


	    if (vm.$vnode) {
	      vm.$vnode.parent = null;
	    }
	  };
	}

	function mountComponent(vm, el, hydrating) {
	  vm.$el = el;

	  if (!vm.$options.render) {
	    vm.$options.render = createEmptyVNode;

	    {
	      /* istanbul ignore if */
	      if (vm.$options.template && vm.$options.template.charAt(0) !== '#' || vm.$options.el || el) {
	        warn('You are using the runtime-only build of Vue where the template ' + 'compiler is not available. Either pre-compile the templates into ' + 'render functions, or use the compiler-included build.', vm);
	      } else {
	        warn('Failed to mount component: template or render function not defined.', vm);
	      }
	    }
	  }

	  callHook(vm, 'beforeMount');
	  var updateComponent;
	  /* istanbul ignore if */

	  if ( config.performance && mark) {
	    updateComponent = function updateComponent() {
	      var name = vm._name;
	      var id = vm._uid;
	      var startTag = "vue-perf-start:" + id;
	      var endTag = "vue-perf-end:" + id;
	      mark(startTag);

	      var vnode = vm._render();

	      mark(endTag);
	      measure("vue " + name + " render", startTag, endTag);
	      mark(startTag);

	      vm._update(vnode, hydrating);

	      mark(endTag);
	      measure("vue " + name + " patch", startTag, endTag);
	    };
	  } else {
	    updateComponent = function updateComponent() {
	      vm._update(vm._render(), hydrating);
	    };
	  } // we set this to vm._watcher inside the watcher's constructor
	  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
	  // component's mounted hook), which relies on vm._watcher being already defined


	  new Watcher(vm, updateComponent, noop, {
	    before: function before() {
	      if (vm._isMounted && !vm._isDestroyed) {
	        callHook(vm, 'beforeUpdate');
	      }
	    }
	  }, true
	  /* isRenderWatcher */
	  );
	  hydrating = false; // manually mounted instance, call mounted on self
	  // mounted is called for render-created child components in its inserted hook

	  if (vm.$vnode == null) {
	    vm._isMounted = true;
	    callHook(vm, 'mounted');
	  }

	  return vm;
	}

	function updateChildComponent(vm, propsData, listeners, parentVnode, renderChildren) {
	  {
	    isUpdatingChildComponent = true;
	  } // determine whether component has slot children
	  // we need to do this before overwriting $options._renderChildren.
	  // check if there are dynamic scopedSlots (hand-written or compiled but with
	  // dynamic slot names). Static scoped slots compiled from template has the
	  // "$stable" marker.


	  var newScopedSlots = parentVnode.data.scopedSlots;
	  var oldScopedSlots = vm.$scopedSlots;
	  var hasDynamicScopedSlot = !!(newScopedSlots && !newScopedSlots.$stable || oldScopedSlots !== emptyObject && !oldScopedSlots.$stable || newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key); // Any static slot children from the parent may have changed during parent's
	  // update. Dynamic scoped slots may also have changed. In such cases, a forced
	  // update is necessary to ensure correctness.

	  var needsForceUpdate = !!(renderChildren || // has new static slots
	  vm.$options._renderChildren || // has old static slots
	  hasDynamicScopedSlot);
	  vm.$options._parentVnode = parentVnode;
	  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

	  if (vm._vnode) {
	    // update child tree's parent
	    vm._vnode.parent = parentVnode;
	  }

	  vm.$options._renderChildren = renderChildren; // update $attrs and $listeners hash
	  // these are also reactive so they may trigger child update if the child
	  // used them during render

	  vm.$attrs = parentVnode.data.attrs || emptyObject;
	  vm.$listeners = listeners || emptyObject; // update props

	  if (propsData && vm.$options.props) {
	    toggleObserving(false);
	    var props = vm._props;
	    var propKeys = vm.$options._propKeys || [];

	    for (var i = 0; i < propKeys.length; i++) {
	      var key = propKeys[i];
	      var propOptions = vm.$options.props; // wtf flow?

	      props[key] = validateProp(key, propOptions, propsData, vm);
	    }

	    toggleObserving(true); // keep a copy of raw propsData

	    vm.$options.propsData = propsData;
	  } // update listeners


	  listeners = listeners || emptyObject;
	  var oldListeners = vm.$options._parentListeners;
	  vm.$options._parentListeners = listeners;
	  updateComponentListeners(vm, listeners, oldListeners); // resolve slots + force update if has children

	  if (needsForceUpdate) {
	    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
	    vm.$forceUpdate();
	  }

	  {
	    isUpdatingChildComponent = false;
	  }
	}

	function isInInactiveTree(vm) {
	  while (vm && (vm = vm.$parent)) {
	    if (vm._inactive) {
	      return true;
	    }
	  }

	  return false;
	}

	function activateChildComponent(vm, direct) {
	  if (direct) {
	    vm._directInactive = false;

	    if (isInInactiveTree(vm)) {
	      return;
	    }
	  } else if (vm._directInactive) {
	    return;
	  }

	  if (vm._inactive || vm._inactive === null) {
	    vm._inactive = false;

	    for (var i = 0; i < vm.$children.length; i++) {
	      activateChildComponent(vm.$children[i]);
	    }

	    callHook(vm, 'activated');
	  }
	}

	function deactivateChildComponent(vm, direct) {
	  if (direct) {
	    vm._directInactive = true;

	    if (isInInactiveTree(vm)) {
	      return;
	    }
	  }

	  if (!vm._inactive) {
	    vm._inactive = true;

	    for (var i = 0; i < vm.$children.length; i++) {
	      deactivateChildComponent(vm.$children[i]);
	    }

	    callHook(vm, 'deactivated');
	  }
	}

	function callHook(vm, hook) {
	  // #7573 disable dep collection when invoking lifecycle hooks
	  pushTarget();
	  var handlers = vm.$options[hook];
	  var info = hook + " hook";

	  if (handlers) {
	    for (var i = 0, j = handlers.length; i < j; i++) {
	      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
	    }
	  }

	  if (vm._hasHookEvent) {
	    vm.$emit('hook:' + hook);
	  }

	  popTarget();
	}
	/*  */


	var MAX_UPDATE_COUNT = 100;
	var queue$1 = [];
	var activatedChildren = [];
	var has$2 = {};
	var circular = {};
	var waiting = false;
	var flushing = false;
	var index$1 = 0;
	/**
	 * Reset the scheduler's state.
	 */

	function resetSchedulerState() {
	  index$1 = queue$1.length = activatedChildren.length = 0;
	  has$2 = {};

	  {
	    circular = {};
	  }

	  waiting = flushing = false;
	} // Async edge case #6566 requires saving the timestamp when event listeners are
	// attached. However, calling performance.now() has a perf overhead especially
	// if the page has thousands of event listeners. Instead, we take a timestamp
	// every time the scheduler flushes and use that for all event listeners
	// attached during that flush.


	var currentFlushTimestamp = 0; // Async edge case fix requires storing an event listener's attach timestamp.

	var getNow = Date.now; // Determine what event timestamp the browser is using. Annoyingly, the
	// timestamp can either be hi-res (relative to page load) or low-res
	// (relative to UNIX epoch), so in order to compare time we have to use the
	// same timestamp type when saving the flush timestamp.
	// All IE versions use low-res event timestamps, and have problematic clock
	// implementations (#9632)

	if (inBrowser && !isIE) {
	  var performance = window.performance;

	  if (performance && typeof performance.now === 'function' && getNow() > document.createEvent('Event').timeStamp) {
	    // if the event timestamp, although evaluated AFTER the Date.now(), is
	    // smaller than it, it means the event is using a hi-res timestamp,
	    // and we need to use the hi-res version for event listener timestamps as
	    // well.
	    getNow = function getNow() {
	      return performance.now();
	    };
	  }
	}
	/**
	 * Flush both queues and run the watchers.
	 */


	function flushSchedulerQueue() {
	  currentFlushTimestamp = getNow();
	  flushing = true;
	  var watcher, id; // Sort queue before flush.
	  // This ensures that:
	  // 1. Components are updated from parent to child. (because parent is always
	  //    created before the child)
	  // 2. A component's user watchers are run before its render watcher (because
	  //    user watchers are created before the render watcher)
	  // 3. If a component is destroyed during a parent component's watcher run,
	  //    its watchers can be skipped.

	  queue$1.sort(function (a, b) {
	    return a.id - b.id;
	  }); // do not cache length because more watchers might be pushed
	  // as we run existing watchers

	  for (index$1 = 0; index$1 < queue$1.length; index$1++) {
	    watcher = queue$1[index$1];

	    if (watcher.before) {
	      watcher.before();
	    }

	    id = watcher.id;
	    has$2[id] = null;
	    watcher.run(); // in dev build, check and stop circular updates.

	    if ( has$2[id] != null) {
	      circular[id] = (circular[id] || 0) + 1;

	      if (circular[id] > MAX_UPDATE_COUNT) {
	        warn('You may have an infinite update loop ' + (watcher.user ? "in watcher with expression \"" + watcher.expression + "\"" : "in a component render function."), watcher.vm);
	        break;
	      }
	    }
	  } // keep copies of post queues before resetting state


	  var activatedQueue = activatedChildren.slice();
	  var updatedQueue = queue$1.slice();
	  resetSchedulerState(); // call component updated and activated hooks

	  callActivatedHooks(activatedQueue);
	  callUpdatedHooks(updatedQueue); // devtool hook

	  /* istanbul ignore if */

	  if (devtools && config.devtools) {
	    devtools.emit('flush');
	  }
	}

	function callUpdatedHooks(queue) {
	  var i = queue.length;

	  while (i--) {
	    var watcher = queue[i];
	    var vm = watcher.vm;

	    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
	      callHook(vm, 'updated');
	    }
	  }
	}
	/**
	 * Queue a kept-alive component that was activated during patch.
	 * The queue will be processed after the entire tree has been patched.
	 */


	function queueActivatedComponent(vm) {
	  // setting _inactive to false here so that a render function can
	  // rely on checking whether it's in an inactive tree (e.g. router-view)
	  vm._inactive = false;
	  activatedChildren.push(vm);
	}

	function callActivatedHooks(queue) {
	  for (var i = 0; i < queue.length; i++) {
	    queue[i]._inactive = true;
	    activateChildComponent(queue[i], true
	    /* true */
	    );
	  }
	}
	/**
	 * Push a watcher into the watcher queue.
	 * Jobs with duplicate IDs will be skipped unless it's
	 * pushed when the queue is being flushed.
	 */


	function queueWatcher(watcher) {
	  var id = watcher.id;

	  if (has$2[id] == null) {
	    has$2[id] = true;

	    if (!flushing) {
	      queue$1.push(watcher);
	    } else {
	      // if already flushing, splice the watcher based on its id
	      // if already past its id, it will be run next immediately.
	      var i = queue$1.length - 1;

	      while (i > index$1 && queue$1[i].id > watcher.id) {
	        i--;
	      }

	      queue$1.splice(i + 1, 0, watcher);
	    } // queue the flush


	    if (!waiting) {
	      waiting = true;

	      if ( !config.async) {
	        flushSchedulerQueue();
	        return;
	      }

	      nextTick(flushSchedulerQueue);
	    }
	  }
	}
	/*  */


	var uid$2 = 0;
	/**
	 * A watcher parses an expression, collects dependencies,
	 * and fires callback when the expression value changes.
	 * This is used for both the $watch() api and directives.
	 */

	var Watcher = function Watcher(vm, expOrFn, cb, options, isRenderWatcher) {
	  this.vm = vm;

	  if (isRenderWatcher) {
	    vm._watcher = this;
	  }

	  vm._watchers.push(this); // options


	  if (options) {
	    this.deep = !!options.deep;
	    this.user = !!options.user;
	    this.lazy = !!options.lazy;
	    this.sync = !!options.sync;
	    this.before = options.before;
	  } else {
	    this.deep = this.user = this.lazy = this.sync = false;
	  }

	  this.cb = cb;
	  this.id = ++uid$2; // uid for batching

	  this.active = true;
	  this.dirty = this.lazy; // for lazy watchers

	  this.deps = [];
	  this.newDeps = [];
	  this.depIds = new _Set();
	  this.newDepIds = new _Set();
	  this.expression =  expOrFn.toString() ; // parse expression for getter

	  if (typeof expOrFn === 'function') {
	    this.getter = expOrFn;
	  } else {
	    this.getter = parsePath(expOrFn);

	    if (!this.getter) {
	      this.getter = noop;
	       warn("Failed watching path: \"" + expOrFn + "\" " + 'Watcher only accepts simple dot-delimited paths. ' + 'For full control, use a function instead.', vm);
	    }
	  }

	  this.value = this.lazy ? undefined : this.get();
	};
	/**
	 * Evaluate the getter, and re-collect dependencies.
	 */


	Watcher.prototype.get = function get() {
	  pushTarget(this);
	  var value;
	  var vm = this.vm;

	  try {
	    value = this.getter.call(vm, vm);
	  } catch (e) {
	    if (this.user) {
	      handleError(e, vm, "getter for watcher \"" + this.expression + "\"");
	    } else {
	      throw e;
	    }
	  } finally {
	    // "touch" every property so they are all tracked as
	    // dependencies for deep watching
	    if (this.deep) {
	      traverse(value);
	    }

	    popTarget();
	    this.cleanupDeps();
	  }

	  return value;
	};
	/**
	 * Add a dependency to this directive.
	 */


	Watcher.prototype.addDep = function addDep(dep) {
	  var id = dep.id;

	  if (!this.newDepIds.has(id)) {
	    this.newDepIds.add(id);
	    this.newDeps.push(dep);

	    if (!this.depIds.has(id)) {
	      dep.addSub(this);
	    }
	  }
	};
	/**
	 * Clean up for dependency collection.
	 */


	Watcher.prototype.cleanupDeps = function cleanupDeps() {
	  var i = this.deps.length;

	  while (i--) {
	    var dep = this.deps[i];

	    if (!this.newDepIds.has(dep.id)) {
	      dep.removeSub(this);
	    }
	  }

	  var tmp = this.depIds;
	  this.depIds = this.newDepIds;
	  this.newDepIds = tmp;
	  this.newDepIds.clear();
	  tmp = this.deps;
	  this.deps = this.newDeps;
	  this.newDeps = tmp;
	  this.newDeps.length = 0;
	};
	/**
	 * Subscriber interface.
	 * Will be called when a dependency changes.
	 */


	Watcher.prototype.update = function update() {
	  /* istanbul ignore else */
	  if (this.lazy) {
	    this.dirty = true;
	  } else if (this.sync) {
	    this.run();
	  } else {
	    queueWatcher(this);
	  }
	};
	/**
	 * Scheduler job interface.
	 * Will be called by the scheduler.
	 */


	Watcher.prototype.run = function run() {
	  if (this.active) {
	    var value = this.get();

	    if (value !== this.value || // Deep watchers and watchers on Object/Arrays should fire even
	    // when the value is the same, because the value may
	    // have mutated.
	    isObject$1(value) || this.deep) {
	      // set new value
	      var oldValue = this.value;
	      this.value = value;

	      if (this.user) {
	        try {
	          this.cb.call(this.vm, value, oldValue);
	        } catch (e) {
	          handleError(e, this.vm, "callback for watcher \"" + this.expression + "\"");
	        }
	      } else {
	        this.cb.call(this.vm, value, oldValue);
	      }
	    }
	  }
	};
	/**
	 * Evaluate the value of the watcher.
	 * This only gets called for lazy watchers.
	 */


	Watcher.prototype.evaluate = function evaluate() {
	  this.value = this.get();
	  this.dirty = false;
	};
	/**
	 * Depend on all deps collected by this watcher.
	 */


	Watcher.prototype.depend = function depend() {
	  var i = this.deps.length;

	  while (i--) {
	    this.deps[i].depend();
	  }
	};
	/**
	 * Remove self from all dependencies' subscriber list.
	 */


	Watcher.prototype.teardown = function teardown() {
	  if (this.active) {
	    // remove self from vm's watcher list
	    // this is a somewhat expensive operation so we skip it
	    // if the vm is being destroyed.
	    if (!this.vm._isBeingDestroyed) {
	      remove(this.vm._watchers, this);
	    }

	    var i = this.deps.length;

	    while (i--) {
	      this.deps[i].removeSub(this);
	    }

	    this.active = false;
	  }
	};
	/*  */


	var sharedPropertyDefinition = {
	  enumerable: true,
	  configurable: true,
	  get: noop,
	  set: noop
	};

	function proxy$1(target, sourceKey, key) {
	  sharedPropertyDefinition.get = function proxyGetter() {
	    return this[sourceKey][key];
	  };

	  sharedPropertyDefinition.set = function proxySetter(val) {
	    this[sourceKey][key] = val;
	  };

	  Object.defineProperty(target, key, sharedPropertyDefinition);
	}

	function initState(vm) {
	  vm._watchers = [];
	  var opts = vm.$options;

	  if (opts.props) {
	    initProps(vm, opts.props);
	  }

	  if (opts.methods) {
	    initMethods(vm, opts.methods);
	  }

	  if (opts.data) {
	    initData(vm);
	  } else {
	    observe(vm._data = {}, true
	    /* asRootData */
	    );
	  }

	  if (opts.computed) {
	    initComputed(vm, opts.computed);
	  }

	  if (opts.watch && opts.watch !== nativeWatch) {
	    initWatch(vm, opts.watch);
	  }
	}

	function initProps(vm, propsOptions) {
	  var propsData = vm.$options.propsData || {};
	  var props = vm._props = {}; // cache prop keys so that future props updates can iterate using Array
	  // instead of dynamic object key enumeration.

	  var keys = vm.$options._propKeys = [];
	  var isRoot = !vm.$parent; // root instance props should be converted

	  if (!isRoot) {
	    toggleObserving(false);
	  }

	  var loop = function loop(key) {
	    keys.push(key);
	    var value = validateProp(key, propsOptions, propsData, vm);
	    /* istanbul ignore else */

	    {
	      var hyphenatedKey = hyphenate(key);

	      if (isReservedAttribute(hyphenatedKey) || config.isReservedAttr(hyphenatedKey)) {
	        warn("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop.", vm);
	      }

	      defineReactive$$1(props, key, value, function () {
	        if (!isRoot && !isUpdatingChildComponent) {
	          warn("Avoid mutating a prop directly since the value will be " + "overwritten whenever the parent component re-renders. " + "Instead, use a data or computed property based on the prop's " + "value. Prop being mutated: \"" + key + "\"", vm);
	        }
	      });
	    } // static props are already proxied on the component's prototype
	    // during Vue.extend(). We only need to proxy props defined at
	    // instantiation here.


	    if (!(key in vm)) {
	      proxy$1(vm, "_props", key);
	    }
	  };

	  for (var key in propsOptions) {
	    loop(key);
	  }

	  toggleObserving(true);
	}

	function initData(vm) {
	  var data = vm.$options.data;
	  data = vm._data = typeof data === 'function' ? getData(data, vm) : data || {};

	  if (!isPlainObject(data)) {
	    data = {};
	     warn('data functions should return an object:\n' + 'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function', vm);
	  } // proxy data on instance


	  var keys = Object.keys(data);
	  var props = vm.$options.props;
	  var methods = vm.$options.methods;
	  var i = keys.length;

	  while (i--) {
	    var key = keys[i];

	    {
	      if (methods && hasOwn(methods, key)) {
	        warn("Method \"" + key + "\" has already been defined as a data property.", vm);
	      }
	    }

	    if (props && hasOwn(props, key)) {
	       warn("The data property \"" + key + "\" is already declared as a prop. " + "Use prop default value instead.", vm);
	    } else if (!isReserved(key)) {
	      proxy$1(vm, "_data", key);
	    }
	  } // observe data


	  observe(data, true
	  /* asRootData */
	  );
	}

	function getData(data, vm) {
	  // #7573 disable dep collection when invoking data getters
	  pushTarget();

	  try {
	    return data.call(vm, vm);
	  } catch (e) {
	    handleError(e, vm, "data()");
	    return {};
	  } finally {
	    popTarget();
	  }
	}

	var computedWatcherOptions = {
	  lazy: true
	};

	function initComputed(vm, computed) {
	  // $flow-disable-line
	  var watchers = vm._computedWatchers = Object.create(null); // computed properties are just getters during SSR

	  var isSSR = isServerRendering();

	  for (var key in computed) {
	    var userDef = computed[key];
	    var getter = typeof userDef === 'function' ? userDef : userDef.get;

	    if ( getter == null) {
	      warn("Getter is missing for computed property \"" + key + "\".", vm);
	    }

	    if (!isSSR) {
	      // create internal watcher for the computed property.
	      watchers[key] = new Watcher(vm, getter || noop, noop, computedWatcherOptions);
	    } // component-defined computed properties are already defined on the
	    // component prototype. We only need to define computed properties defined
	    // at instantiation here.


	    if (!(key in vm)) {
	      defineComputed(vm, key, userDef);
	    } else {
	      if (key in vm.$data) {
	        warn("The computed property \"" + key + "\" is already defined in data.", vm);
	      } else if (vm.$options.props && key in vm.$options.props) {
	        warn("The computed property \"" + key + "\" is already defined as a prop.", vm);
	      }
	    }
	  }
	}

	function defineComputed(target, key, userDef) {
	  var shouldCache = !isServerRendering();

	  if (typeof userDef === 'function') {
	    sharedPropertyDefinition.get = shouldCache ? createComputedGetter(key) : createGetterInvoker(userDef);
	    sharedPropertyDefinition.set = noop;
	  } else {
	    sharedPropertyDefinition.get = userDef.get ? shouldCache && userDef.cache !== false ? createComputedGetter(key) : createGetterInvoker(userDef.get) : noop;
	    sharedPropertyDefinition.set = userDef.set || noop;
	  }

	  if ( sharedPropertyDefinition.set === noop) {
	    sharedPropertyDefinition.set = function () {
	      warn("Computed property \"" + key + "\" was assigned to but it has no setter.", this);
	    };
	  }

	  Object.defineProperty(target, key, sharedPropertyDefinition);
	}

	function createComputedGetter(key) {
	  return function computedGetter() {
	    var watcher = this._computedWatchers && this._computedWatchers[key];

	    if (watcher) {
	      if (watcher.dirty) {
	        watcher.evaluate();
	      }

	      if (Dep.target) {
	        watcher.depend();
	      }

	      return watcher.value;
	    }
	  };
	}

	function createGetterInvoker(fn) {
	  return function computedGetter() {
	    return fn.call(this, this);
	  };
	}

	function initMethods(vm, methods) {
	  var props = vm.$options.props;

	  for (var key in methods) {
	    {
	      if (typeof methods[key] !== 'function') {
	        warn("Method \"" + key + "\" has type \"" + _typeof(methods[key]) + "\" in the component definition. " + "Did you reference the function correctly?", vm);
	      }

	      if (props && hasOwn(props, key)) {
	        warn("Method \"" + key + "\" has already been defined as a prop.", vm);
	      }

	      if (key in vm && isReserved(key)) {
	        warn("Method \"" + key + "\" conflicts with an existing Vue instance method. " + "Avoid defining component methods that start with _ or $.");
	      }
	    }

	    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
	  }
	}

	function initWatch(vm, watch) {
	  for (var key in watch) {
	    var handler = watch[key];

	    if (Array.isArray(handler)) {
	      for (var i = 0; i < handler.length; i++) {
	        createWatcher(vm, key, handler[i]);
	      }
	    } else {
	      createWatcher(vm, key, handler);
	    }
	  }
	}

	function createWatcher(vm, expOrFn, handler, options) {
	  if (isPlainObject(handler)) {
	    options = handler;
	    handler = handler.handler;
	  }

	  if (typeof handler === 'string') {
	    handler = vm[handler];
	  }

	  return vm.$watch(expOrFn, handler, options);
	}

	function stateMixin(Vue) {
	  // flow somehow has problems with directly declared definition object
	  // when using Object.defineProperty, so we have to procedurally build up
	  // the object here.
	  var dataDef = {};

	  dataDef.get = function () {
	    return this._data;
	  };

	  var propsDef = {};

	  propsDef.get = function () {
	    return this._props;
	  };

	  {
	    dataDef.set = function () {
	      warn('Avoid replacing instance root $data. ' + 'Use nested data properties instead.', this);
	    };

	    propsDef.set = function () {
	      warn("$props is readonly.", this);
	    };
	  }

	  Object.defineProperty(Vue.prototype, '$data', dataDef);
	  Object.defineProperty(Vue.prototype, '$props', propsDef);
	  Vue.prototype.$set = set$2;
	  Vue.prototype.$delete = del;

	  Vue.prototype.$watch = function (expOrFn, cb, options) {
	    var vm = this;

	    if (isPlainObject(cb)) {
	      return createWatcher(vm, expOrFn, cb, options);
	    }

	    options = options || {};
	    options.user = true;
	    var watcher = new Watcher(vm, expOrFn, cb, options);

	    if (options.immediate) {
	      try {
	        cb.call(vm, watcher.value);
	      } catch (error) {
	        handleError(error, vm, "callback for immediate watcher \"" + watcher.expression + "\"");
	      }
	    }

	    return function unwatchFn() {
	      watcher.teardown();
	    };
	  };
	}
	/*  */


	var uid$3 = 0;

	function initMixin(Vue) {
	  Vue.prototype._init = function (options) {
	    var vm = this; // a uid

	    vm._uid = uid$3++;
	    var startTag, endTag;
	    /* istanbul ignore if */

	    if ( config.performance && mark) {
	      startTag = "vue-perf-start:" + vm._uid;
	      endTag = "vue-perf-end:" + vm._uid;
	      mark(startTag);
	    } // a flag to avoid this being observed


	    vm._isVue = true; // merge options

	    if (options && options._isComponent) {
	      // optimize internal component instantiation
	      // since dynamic options merging is pretty slow, and none of the
	      // internal component options needs special treatment.
	      initInternalComponent(vm, options);
	    } else {
	      vm.$options = mergeOptions(resolveConstructorOptions(vm.constructor), options || {}, vm);
	    }
	    /* istanbul ignore else */


	    {
	      initProxy(vm);
	    } // expose real self


	    vm._self = vm;
	    initLifecycle(vm);
	    initEvents(vm);
	    initRender(vm);
	    callHook(vm, 'beforeCreate');
	    initInjections(vm); // resolve injections before data/props

	    initState(vm);
	    initProvide(vm); // resolve provide after data/props

	    callHook(vm, 'created');
	    /* istanbul ignore if */

	    if ( config.performance && mark) {
	      vm._name = formatComponentName(vm, false);
	      mark(endTag);
	      measure("vue " + vm._name + " init", startTag, endTag);
	    }

	    if (vm.$options.el) {
	      vm.$mount(vm.$options.el);
	    }
	  };
	}

	function initInternalComponent(vm, options) {
	  var opts = vm.$options = Object.create(vm.constructor.options); // doing this because it's faster than dynamic enumeration.

	  var parentVnode = options._parentVnode;
	  opts.parent = options.parent;
	  opts._parentVnode = parentVnode;
	  var vnodeComponentOptions = parentVnode.componentOptions;
	  opts.propsData = vnodeComponentOptions.propsData;
	  opts._parentListeners = vnodeComponentOptions.listeners;
	  opts._renderChildren = vnodeComponentOptions.children;
	  opts._componentTag = vnodeComponentOptions.tag;

	  if (options.render) {
	    opts.render = options.render;
	    opts.staticRenderFns = options.staticRenderFns;
	  }
	}

	function resolveConstructorOptions(Ctor) {
	  var options = Ctor.options;

	  if (Ctor.super) {
	    var superOptions = resolveConstructorOptions(Ctor.super);
	    var cachedSuperOptions = Ctor.superOptions;

	    if (superOptions !== cachedSuperOptions) {
	      // super option changed,
	      // need to resolve new options.
	      Ctor.superOptions = superOptions; // check if there are any late-modified/attached options (#4976)

	      var modifiedOptions = resolveModifiedOptions(Ctor); // update base extend options

	      if (modifiedOptions) {
	        extend(Ctor.extendOptions, modifiedOptions);
	      }

	      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);

	      if (options.name) {
	        options.components[options.name] = Ctor;
	      }
	    }
	  }

	  return options;
	}

	function resolveModifiedOptions(Ctor) {
	  var modified;
	  var latest = Ctor.options;
	  var sealed = Ctor.sealedOptions;

	  for (var key in latest) {
	    if (latest[key] !== sealed[key]) {
	      if (!modified) {
	        modified = {};
	      }

	      modified[key] = latest[key];
	    }
	  }

	  return modified;
	}

	function Vue(options) {
	  if ( !(this instanceof Vue)) {
	    warn('Vue is a constructor and should be called with the `new` keyword');
	  }

	  this._init(options);
	}

	initMixin(Vue);
	stateMixin(Vue);
	eventsMixin(Vue);
	lifecycleMixin(Vue);
	renderMixin(Vue);
	/*  */

	function initUse(Vue) {
	  Vue.use = function (plugin) {
	    var installedPlugins = this._installedPlugins || (this._installedPlugins = []);

	    if (installedPlugins.indexOf(plugin) > -1) {
	      return this;
	    } // additional parameters


	    var args = toArray(arguments, 1);
	    args.unshift(this);

	    if (typeof plugin.install === 'function') {
	      plugin.install.apply(plugin, args);
	    } else if (typeof plugin === 'function') {
	      plugin.apply(null, args);
	    }

	    installedPlugins.push(plugin);
	    return this;
	  };
	}
	/*  */


	function initMixin$1(Vue) {
	  Vue.mixin = function (mixin) {
	    this.options = mergeOptions(this.options, mixin);
	    return this;
	  };
	}
	/*  */


	function initExtend(Vue) {
	  /**
	   * Each instance constructor, including Vue, has a unique
	   * cid. This enables us to create wrapped "child
	   * constructors" for prototypal inheritance and cache them.
	   */
	  Vue.cid = 0;
	  var cid = 1;
	  /**
	   * Class inheritance
	   */

	  Vue.extend = function (extendOptions) {
	    extendOptions = extendOptions || {};
	    var Super = this;
	    var SuperId = Super.cid;
	    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});

	    if (cachedCtors[SuperId]) {
	      return cachedCtors[SuperId];
	    }

	    var name = extendOptions.name || Super.options.name;

	    if ( name) {
	      validateComponentName(name);
	    }

	    var Sub = function VueComponent(options) {
	      this._init(options);
	    };

	    Sub.prototype = Object.create(Super.prototype);
	    Sub.prototype.constructor = Sub;
	    Sub.cid = cid++;
	    Sub.options = mergeOptions(Super.options, extendOptions);
	    Sub['super'] = Super; // For props and computed properties, we define the proxy getters on
	    // the Vue instances at extension time, on the extended prototype. This
	    // avoids Object.defineProperty calls for each instance created.

	    if (Sub.options.props) {
	      initProps$1(Sub);
	    }

	    if (Sub.options.computed) {
	      initComputed$1(Sub);
	    } // allow further extension/mixin/plugin usage


	    Sub.extend = Super.extend;
	    Sub.mixin = Super.mixin;
	    Sub.use = Super.use; // create asset registers, so extended classes
	    // can have their private assets too.

	    ASSET_TYPES.forEach(function (type) {
	      Sub[type] = Super[type];
	    }); // enable recursive self-lookup

	    if (name) {
	      Sub.options.components[name] = Sub;
	    } // keep a reference to the super options at extension time.
	    // later at instantiation we can check if Super's options have
	    // been updated.


	    Sub.superOptions = Super.options;
	    Sub.extendOptions = extendOptions;
	    Sub.sealedOptions = extend({}, Sub.options); // cache constructor

	    cachedCtors[SuperId] = Sub;
	    return Sub;
	  };
	}

	function initProps$1(Comp) {
	  var props = Comp.options.props;

	  for (var key in props) {
	    proxy$1(Comp.prototype, "_props", key);
	  }
	}

	function initComputed$1(Comp) {
	  var computed = Comp.options.computed;

	  for (var key in computed) {
	    defineComputed(Comp.prototype, key, computed[key]);
	  }
	}
	/*  */


	function initAssetRegisters(Vue) {
	  /**
	   * Create asset registration methods.
	   */
	  ASSET_TYPES.forEach(function (type) {
	    Vue[type] = function (id, definition) {
	      if (!definition) {
	        return this.options[type + 's'][id];
	      } else {
	        /* istanbul ignore if */
	        if ( type === 'component') {
	          validateComponentName(id);
	        }

	        if (type === 'component' && isPlainObject(definition)) {
	          definition.name = definition.name || id;
	          definition = this.options._base.extend(definition);
	        }

	        if (type === 'directive' && typeof definition === 'function') {
	          definition = {
	            bind: definition,
	            update: definition
	          };
	        }

	        this.options[type + 's'][id] = definition;
	        return definition;
	      }
	    };
	  });
	}
	/*  */


	function getComponentName(opts) {
	  return opts && (opts.Ctor.options.name || opts.tag);
	}

	function matches(pattern, name) {
	  if (Array.isArray(pattern)) {
	    return pattern.indexOf(name) > -1;
	  } else if (typeof pattern === 'string') {
	    return pattern.split(',').indexOf(name) > -1;
	  } else if (isRegExp(pattern)) {
	    return pattern.test(name);
	  }
	  /* istanbul ignore next */


	  return false;
	}

	function pruneCache(keepAliveInstance, filter) {
	  var cache = keepAliveInstance.cache;
	  var keys = keepAliveInstance.keys;
	  var _vnode = keepAliveInstance._vnode;

	  for (var key in cache) {
	    var cachedNode = cache[key];

	    if (cachedNode) {
	      var name = getComponentName(cachedNode.componentOptions);

	      if (name && !filter(name)) {
	        pruneCacheEntry(cache, key, keys, _vnode);
	      }
	    }
	  }
	}

	function pruneCacheEntry(cache, key, keys, current) {
	  var cached$$1 = cache[key];

	  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
	    cached$$1.componentInstance.$destroy();
	  }

	  cache[key] = null;
	  remove(keys, key);
	}

	var patternTypes = [String, RegExp, Array];
	var KeepAlive = {
	  name: 'keep-alive',
	  abstract: true,
	  props: {
	    include: patternTypes,
	    exclude: patternTypes,
	    max: [String, Number]
	  },
	  created: function created() {
	    this.cache = Object.create(null);
	    this.keys = [];
	  },
	  destroyed: function destroyed() {
	    for (var key in this.cache) {
	      pruneCacheEntry(this.cache, key, this.keys);
	    }
	  },
	  mounted: function mounted() {
	    var this$1 = this;
	    this.$watch('include', function (val) {
	      pruneCache(this$1, function (name) {
	        return matches(val, name);
	      });
	    });
	    this.$watch('exclude', function (val) {
	      pruneCache(this$1, function (name) {
	        return !matches(val, name);
	      });
	    });
	  },
	  render: function render() {
	    var slot = this.$slots.default;
	    var vnode = getFirstComponentChild(slot);
	    var componentOptions = vnode && vnode.componentOptions;

	    if (componentOptions) {
	      // check pattern
	      var name = getComponentName(componentOptions);
	      var ref = this;
	      var include = ref.include;
	      var exclude = ref.exclude;

	      if ( // not included
	      include && (!name || !matches(include, name)) || // excluded
	      exclude && name && matches(exclude, name)) {
	        return vnode;
	      }

	      var ref$1 = this;
	      var cache = ref$1.cache;
	      var keys = ref$1.keys;
	      var key = vnode.key == null // same constructor may get registered as different local components
	      // so cid alone is not enough (#3269)
	      ? componentOptions.Ctor.cid + (componentOptions.tag ? "::" + componentOptions.tag : '') : vnode.key;

	      if (cache[key]) {
	        vnode.componentInstance = cache[key].componentInstance; // make current key freshest

	        remove(keys, key);
	        keys.push(key);
	      } else {
	        cache[key] = vnode;
	        keys.push(key); // prune oldest entry

	        if (this.max && keys.length > parseInt(this.max)) {
	          pruneCacheEntry(cache, keys[0], keys, this._vnode);
	        }
	      }

	      vnode.data.keepAlive = true;
	    }

	    return vnode || slot && slot[0];
	  }
	};
	var builtInComponents = {
	  KeepAlive: KeepAlive
	};
	/*  */

	function initGlobalAPI(Vue) {
	  // config
	  var configDef = {};

	  configDef.get = function () {
	    return config;
	  };

	  {
	    configDef.set = function () {
	      warn('Do not replace the Vue.config object, set individual fields instead.');
	    };
	  }

	  Object.defineProperty(Vue, 'config', configDef); // exposed util methods.
	  // NOTE: these are not considered part of the public API - avoid relying on
	  // them unless you are aware of the risk.

	  Vue.util = {
	    warn: warn,
	    extend: extend,
	    mergeOptions: mergeOptions,
	    defineReactive: defineReactive$$1
	  };
	  Vue.set = set$2;
	  Vue.delete = del;
	  Vue.nextTick = nextTick; // 2.6 explicit observable API

	  Vue.observable = function (obj) {
	    observe(obj);
	    return obj;
	  };

	  Vue.options = Object.create(null);
	  ASSET_TYPES.forEach(function (type) {
	    Vue.options[type + 's'] = Object.create(null);
	  }); // this is used to identify the "base" constructor to extend all plain-object
	  // components with in Weex's multi-instance scenarios.

	  Vue.options._base = Vue;
	  extend(Vue.options.components, builtInComponents);
	  initUse(Vue);
	  initMixin$1(Vue);
	  initExtend(Vue);
	  initAssetRegisters(Vue);
	}

	initGlobalAPI(Vue);
	Object.defineProperty(Vue.prototype, '$isServer', {
	  get: isServerRendering
	});
	Object.defineProperty(Vue.prototype, '$ssrContext', {
	  get: function get() {
	    /* istanbul ignore next */
	    return this.$vnode && this.$vnode.ssrContext;
	  }
	}); // expose FunctionalRenderContext for ssr runtime helper installation

	Object.defineProperty(Vue, 'FunctionalRenderContext', {
	  value: FunctionalRenderContext
	});
	Vue.version = '2.6.11';
	/*  */
	// these are reserved for web because they are directly compiled away
	// during template compilation

	var isReservedAttr = makeMap('style,class'); // attributes that should be using props for binding

	var acceptValue = makeMap('input,textarea,option,select,progress');

	var mustUseProp = function mustUseProp(tag, type, attr) {
	  return attr === 'value' && acceptValue(tag) && type !== 'button' || attr === 'selected' && tag === 'option' || attr === 'checked' && tag === 'input' || attr === 'muted' && tag === 'video';
	};

	var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');
	var isValidContentEditableValue = makeMap('events,caret,typing,plaintext-only');

	var convertEnumeratedValue = function convertEnumeratedValue(key, value) {
	  return isFalsyAttrValue(value) || value === 'false' ? 'false' // allow arbitrary string value for contenteditable
	  : key === 'contenteditable' && isValidContentEditableValue(value) ? value : 'true';
	};

	var isBooleanAttr = makeMap('allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' + 'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' + 'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' + 'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' + 'required,reversed,scoped,seamless,selected,sortable,translate,' + 'truespeed,typemustmatch,visible');
	var xlinkNS = 'http://www.w3.org/1999/xlink';

	var isXlink = function isXlink(name) {
	  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink';
	};

	var getXlinkProp = function getXlinkProp(name) {
	  return isXlink(name) ? name.slice(6, name.length) : '';
	};

	var isFalsyAttrValue = function isFalsyAttrValue(val) {
	  return val == null || val === false;
	};
	/*  */


	function genClassForVnode(vnode) {
	  var data = vnode.data;
	  var parentNode = vnode;
	  var childNode = vnode;

	  while (isDef(childNode.componentInstance)) {
	    childNode = childNode.componentInstance._vnode;

	    if (childNode && childNode.data) {
	      data = mergeClassData(childNode.data, data);
	    }
	  }

	  while (isDef(parentNode = parentNode.parent)) {
	    if (parentNode && parentNode.data) {
	      data = mergeClassData(data, parentNode.data);
	    }
	  }

	  return renderClass(data.staticClass, data.class);
	}

	function mergeClassData(child, parent) {
	  return {
	    staticClass: concat(child.staticClass, parent.staticClass),
	    class: isDef(child.class) ? [child.class, parent.class] : parent.class
	  };
	}

	function renderClass(staticClass, dynamicClass) {
	  if (isDef(staticClass) || isDef(dynamicClass)) {
	    return concat(staticClass, stringifyClass(dynamicClass));
	  }
	  /* istanbul ignore next */


	  return '';
	}

	function concat(a, b) {
	  return a ? b ? a + ' ' + b : a : b || '';
	}

	function stringifyClass(value) {
	  if (Array.isArray(value)) {
	    return stringifyArray(value);
	  }

	  if (isObject$1(value)) {
	    return stringifyObject(value);
	  }

	  if (typeof value === 'string') {
	    return value;
	  }
	  /* istanbul ignore next */


	  return '';
	}

	function stringifyArray(value) {
	  var res = '';
	  var stringified;

	  for (var i = 0, l = value.length; i < l; i++) {
	    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
	      if (res) {
	        res += ' ';
	      }

	      res += stringified;
	    }
	  }

	  return res;
	}

	function stringifyObject(value) {
	  var res = '';

	  for (var key in value) {
	    if (value[key]) {
	      if (res) {
	        res += ' ';
	      }

	      res += key;
	    }
	  }

	  return res;
	}
	/*  */


	var namespaceMap = {
	  svg: 'http://www.w3.org/2000/svg',
	  math: 'http://www.w3.org/1998/Math/MathML'
	};
	var isHTMLTag = makeMap('html,body,base,head,link,meta,style,title,' + 'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' + 'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' + 'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' + 's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' + 'embed,object,param,source,canvas,script,noscript,del,ins,' + 'caption,col,colgroup,table,thead,tbody,td,th,tr,' + 'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' + 'output,progress,select,textarea,' + 'details,dialog,menu,menuitem,summary,' + 'content,element,shadow,template,blockquote,iframe,tfoot'); // this map is intentionally selective, only covering SVG elements that may
	// contain child elements.

	var isSVG = makeMap('svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' + 'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' + 'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view', true);

	var isReservedTag = function isReservedTag(tag) {
	  return isHTMLTag(tag) || isSVG(tag);
	};

	function getTagNamespace(tag) {
	  if (isSVG(tag)) {
	    return 'svg';
	  } // basic support for MathML
	  // note it doesn't support other MathML elements being component roots


	  if (tag === 'math') {
	    return 'math';
	  }
	}

	var unknownElementCache = Object.create(null);

	function isUnknownElement(tag) {
	  /* istanbul ignore if */
	  if (!inBrowser) {
	    return true;
	  }

	  if (isReservedTag(tag)) {
	    return false;
	  }

	  tag = tag.toLowerCase();
	  /* istanbul ignore if */

	  if (unknownElementCache[tag] != null) {
	    return unknownElementCache[tag];
	  }

	  var el = document.createElement(tag);

	  if (tag.indexOf('-') > -1) {
	    // http://stackoverflow.com/a/28210364/1070244
	    return unknownElementCache[tag] = el.constructor === window.HTMLUnknownElement || el.constructor === window.HTMLElement;
	  } else {
	    return unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString());
	  }
	}

	var isTextInputType = makeMap('text,number,password,search,email,tel,url');
	/*  */

	/**
	 * Query an element selector if it's not an element already.
	 */

	function query(el) {
	  if (typeof el === 'string') {
	    var selected = document.querySelector(el);

	    if (!selected) {
	       warn('Cannot find element: ' + el);
	      return document.createElement('div');
	    }

	    return selected;
	  } else {
	    return el;
	  }
	}
	/*  */


	function createElement$1(tagName, vnode) {
	  var elm = document.createElement(tagName);

	  if (tagName !== 'select') {
	    return elm;
	  } // false or null will remove the attribute but undefined will not


	  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
	    elm.setAttribute('multiple', 'multiple');
	  }

	  return elm;
	}

	function createElementNS(namespace, tagName) {
	  return document.createElementNS(namespaceMap[namespace], tagName);
	}

	function createTextNode(text) {
	  return document.createTextNode(text);
	}

	function createComment(text) {
	  return document.createComment(text);
	}

	function insertBefore(parentNode, newNode, referenceNode) {
	  parentNode.insertBefore(newNode, referenceNode);
	}

	function removeChild(node, child) {
	  node.removeChild(child);
	}

	function appendChild(node, child) {
	  node.appendChild(child);
	}

	function parentNode(node) {
	  return node.parentNode;
	}

	function nextSibling(node) {
	  return node.nextSibling;
	}

	function tagName(node) {
	  return node.tagName;
	}

	function setTextContent(node, text) {
	  node.textContent = text;
	}

	function setStyleScope(node, scopeId) {
	  node.setAttribute(scopeId, '');
	}

	var nodeOps =
	/*#__PURE__*/
	Object.freeze({
	  createElement: createElement$1,
	  createElementNS: createElementNS,
	  createTextNode: createTextNode,
	  createComment: createComment,
	  insertBefore: insertBefore,
	  removeChild: removeChild,
	  appendChild: appendChild,
	  parentNode: parentNode,
	  nextSibling: nextSibling,
	  tagName: tagName,
	  setTextContent: setTextContent,
	  setStyleScope: setStyleScope
	});
	/*  */

	var ref = {
	  create: function create(_, vnode) {
	    registerRef(vnode);
	  },
	  update: function update(oldVnode, vnode) {
	    if (oldVnode.data.ref !== vnode.data.ref) {
	      registerRef(oldVnode, true);
	      registerRef(vnode);
	    }
	  },
	  destroy: function destroy(vnode) {
	    registerRef(vnode, true);
	  }
	};

	function registerRef(vnode, isRemoval) {
	  var key = vnode.data.ref;

	  if (!isDef(key)) {
	    return;
	  }

	  var vm = vnode.context;
	  var ref = vnode.componentInstance || vnode.elm;
	  var refs = vm.$refs;

	  if (isRemoval) {
	    if (Array.isArray(refs[key])) {
	      remove(refs[key], ref);
	    } else if (refs[key] === ref) {
	      refs[key] = undefined;
	    }
	  } else {
	    if (vnode.data.refInFor) {
	      if (!Array.isArray(refs[key])) {
	        refs[key] = [ref];
	      } else if (refs[key].indexOf(ref) < 0) {
	        // $flow-disable-line
	        refs[key].push(ref);
	      }
	    } else {
	      refs[key] = ref;
	    }
	  }
	}
	/**
	 * Virtual DOM patching algorithm based on Snabbdom by
	 * Simon Friis Vindum (@paldepind)
	 * Licensed under the MIT License
	 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
	 *
	 * modified by Evan You (@yyx990803)
	 *
	 * Not type-checking this because this file is perf-critical and the cost
	 * of making flow understand it is not worth it.
	 */


	var emptyNode = new VNode('', {}, []);
	var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

	function sameVnode(a, b) {
	  return a.key === b.key && (a.tag === b.tag && a.isComment === b.isComment && isDef(a.data) === isDef(b.data) && sameInputType(a, b) || isTrue(a.isAsyncPlaceholder) && a.asyncFactory === b.asyncFactory && isUndef(b.asyncFactory.error));
	}

	function sameInputType(a, b) {
	  if (a.tag !== 'input') {
	    return true;
	  }

	  var i;
	  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
	  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
	  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB);
	}

	function createKeyToOldIdx(children, beginIdx, endIdx) {
	  var i, key;
	  var map = {};

	  for (i = beginIdx; i <= endIdx; ++i) {
	    key = children[i].key;

	    if (isDef(key)) {
	      map[key] = i;
	    }
	  }

	  return map;
	}

	function createPatchFunction(backend) {
	  var i, j;
	  var cbs = {};
	  var modules = backend.modules;
	  var nodeOps = backend.nodeOps;

	  for (i = 0; i < hooks.length; ++i) {
	    cbs[hooks[i]] = [];

	    for (j = 0; j < modules.length; ++j) {
	      if (isDef(modules[j][hooks[i]])) {
	        cbs[hooks[i]].push(modules[j][hooks[i]]);
	      }
	    }
	  }

	  function emptyNodeAt(elm) {
	    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm);
	  }

	  function createRmCb(childElm, listeners) {
	    function remove$$1() {
	      if (--remove$$1.listeners === 0) {
	        removeNode(childElm);
	      }
	    }

	    remove$$1.listeners = listeners;
	    return remove$$1;
	  }

	  function removeNode(el) {
	    var parent = nodeOps.parentNode(el); // element may have already been removed due to v-html / v-text

	    if (isDef(parent)) {
	      nodeOps.removeChild(parent, el);
	    }
	  }

	  function isUnknownElement$$1(vnode, inVPre) {
	    return !inVPre && !vnode.ns && !(config.ignoredElements.length && config.ignoredElements.some(function (ignore) {
	      return isRegExp(ignore) ? ignore.test(vnode.tag) : ignore === vnode.tag;
	    })) && config.isUnknownElement(vnode.tag);
	  }

	  var creatingElmInVPre = 0;

	  function createElm(vnode, insertedVnodeQueue, parentElm, refElm, nested, ownerArray, index) {
	    if (isDef(vnode.elm) && isDef(ownerArray)) {
	      // This vnode was used in a previous render!
	      // now it's used as a new node, overwriting its elm would cause
	      // potential patch errors down the road when it's used as an insertion
	      // reference node. Instead, we clone the node on-demand before creating
	      // associated DOM element for it.
	      vnode = ownerArray[index] = cloneVNode(vnode);
	    }

	    vnode.isRootInsert = !nested; // for transition enter check

	    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
	      return;
	    }

	    var data = vnode.data;
	    var children = vnode.children;
	    var tag = vnode.tag;

	    if (isDef(tag)) {
	      {
	        if (data && data.pre) {
	          creatingElmInVPre++;
	        }

	        if (isUnknownElement$$1(vnode, creatingElmInVPre)) {
	          warn('Unknown custom element: <' + tag + '> - did you ' + 'register the component correctly? For recursive components, ' + 'make sure to provide the "name" option.', vnode.context);
	        }
	      }

	      vnode.elm = vnode.ns ? nodeOps.createElementNS(vnode.ns, tag) : nodeOps.createElement(tag, vnode);
	      setScope(vnode);
	      /* istanbul ignore if */

	      {
	        createChildren(vnode, children, insertedVnodeQueue);

	        if (isDef(data)) {
	          invokeCreateHooks(vnode, insertedVnodeQueue);
	        }

	        insert(parentElm, vnode.elm, refElm);
	      }

	      if ( data && data.pre) {
	        creatingElmInVPre--;
	      }
	    } else if (isTrue(vnode.isComment)) {
	      vnode.elm = nodeOps.createComment(vnode.text);
	      insert(parentElm, vnode.elm, refElm);
	    } else {
	      vnode.elm = nodeOps.createTextNode(vnode.text);
	      insert(parentElm, vnode.elm, refElm);
	    }
	  }

	  function createComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
	    var i = vnode.data;

	    if (isDef(i)) {
	      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;

	      if (isDef(i = i.hook) && isDef(i = i.init)) {
	        i(vnode, false
	        /* hydrating */
	        );
	      } // after calling the init hook, if the vnode is a child component
	      // it should've created a child instance and mounted it. the child
	      // component also has set the placeholder vnode's elm.
	      // in that case we can just return the element and be done.


	      if (isDef(vnode.componentInstance)) {
	        initComponent(vnode, insertedVnodeQueue);
	        insert(parentElm, vnode.elm, refElm);

	        if (isTrue(isReactivated)) {
	          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
	        }

	        return true;
	      }
	    }
	  }

	  function initComponent(vnode, insertedVnodeQueue) {
	    if (isDef(vnode.data.pendingInsert)) {
	      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
	      vnode.data.pendingInsert = null;
	    }

	    vnode.elm = vnode.componentInstance.$el;

	    if (isPatchable(vnode)) {
	      invokeCreateHooks(vnode, insertedVnodeQueue);
	      setScope(vnode);
	    } else {
	      // empty component root.
	      // skip all element-related modules except for ref (#3455)
	      registerRef(vnode); // make sure to invoke the insert hook

	      insertedVnodeQueue.push(vnode);
	    }
	  }

	  function reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
	    var i; // hack for #4339: a reactivated component with inner transition
	    // does not trigger because the inner node's created hooks are not called
	    // again. It's not ideal to involve module-specific logic in here but
	    // there doesn't seem to be a better way to do it.

	    var innerNode = vnode;

	    while (innerNode.componentInstance) {
	      innerNode = innerNode.componentInstance._vnode;

	      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
	        for (i = 0; i < cbs.activate.length; ++i) {
	          cbs.activate[i](emptyNode, innerNode);
	        }

	        insertedVnodeQueue.push(innerNode);
	        break;
	      }
	    } // unlike a newly created component,
	    // a reactivated keep-alive component doesn't insert itself


	    insert(parentElm, vnode.elm, refElm);
	  }

	  function insert(parent, elm, ref$$1) {
	    if (isDef(parent)) {
	      if (isDef(ref$$1)) {
	        if (nodeOps.parentNode(ref$$1) === parent) {
	          nodeOps.insertBefore(parent, elm, ref$$1);
	        }
	      } else {
	        nodeOps.appendChild(parent, elm);
	      }
	    }
	  }

	  function createChildren(vnode, children, insertedVnodeQueue) {
	    if (Array.isArray(children)) {
	      {
	        checkDuplicateKeys(children);
	      }

	      for (var i = 0; i < children.length; ++i) {
	        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i);
	      }
	    } else if (isPrimitive(vnode.text)) {
	      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
	    }
	  }

	  function isPatchable(vnode) {
	    while (vnode.componentInstance) {
	      vnode = vnode.componentInstance._vnode;
	    }

	    return isDef(vnode.tag);
	  }

	  function invokeCreateHooks(vnode, insertedVnodeQueue) {
	    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
	      cbs.create[i$1](emptyNode, vnode);
	    }

	    i = vnode.data.hook; // Reuse variable

	    if (isDef(i)) {
	      if (isDef(i.create)) {
	        i.create(emptyNode, vnode);
	      }

	      if (isDef(i.insert)) {
	        insertedVnodeQueue.push(vnode);
	      }
	    }
	  } // set scope id attribute for scoped CSS.
	  // this is implemented as a special case to avoid the overhead
	  // of going through the normal attribute patching process.


	  function setScope(vnode) {
	    var i;

	    if (isDef(i = vnode.fnScopeId)) {
	      nodeOps.setStyleScope(vnode.elm, i);
	    } else {
	      var ancestor = vnode;

	      while (ancestor) {
	        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
	          nodeOps.setStyleScope(vnode.elm, i);
	        }

	        ancestor = ancestor.parent;
	      }
	    } // for slot content they should also get the scopeId from the host instance.


	    if (isDef(i = activeInstance) && i !== vnode.context && i !== vnode.fnContext && isDef(i = i.$options._scopeId)) {
	      nodeOps.setStyleScope(vnode.elm, i);
	    }
	  }

	  function addVnodes(parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
	    for (; startIdx <= endIdx; ++startIdx) {
	      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
	    }
	  }

	  function invokeDestroyHook(vnode) {
	    var i, j;
	    var data = vnode.data;

	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.destroy)) {
	        i(vnode);
	      }

	      for (i = 0; i < cbs.destroy.length; ++i) {
	        cbs.destroy[i](vnode);
	      }
	    }

	    if (isDef(i = vnode.children)) {
	      for (j = 0; j < vnode.children.length; ++j) {
	        invokeDestroyHook(vnode.children[j]);
	      }
	    }
	  }

	  function removeVnodes(vnodes, startIdx, endIdx) {
	    for (; startIdx <= endIdx; ++startIdx) {
	      var ch = vnodes[startIdx];

	      if (isDef(ch)) {
	        if (isDef(ch.tag)) {
	          removeAndInvokeRemoveHook(ch);
	          invokeDestroyHook(ch);
	        } else {
	          // Text node
	          removeNode(ch.elm);
	        }
	      }
	    }
	  }

	  function removeAndInvokeRemoveHook(vnode, rm) {
	    if (isDef(rm) || isDef(vnode.data)) {
	      var i;
	      var listeners = cbs.remove.length + 1;

	      if (isDef(rm)) {
	        // we have a recursively passed down rm callback
	        // increase the listeners count
	        rm.listeners += listeners;
	      } else {
	        // directly removing
	        rm = createRmCb(vnode.elm, listeners);
	      } // recursively invoke hooks on child component root node


	      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
	        removeAndInvokeRemoveHook(i, rm);
	      }

	      for (i = 0; i < cbs.remove.length; ++i) {
	        cbs.remove[i](vnode, rm);
	      }

	      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
	        i(vnode, rm);
	      } else {
	        rm();
	      }
	    } else {
	      removeNode(vnode.elm);
	    }
	  }

	  function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
	    var oldStartIdx = 0;
	    var newStartIdx = 0;
	    var oldEndIdx = oldCh.length - 1;
	    var oldStartVnode = oldCh[0];
	    var oldEndVnode = oldCh[oldEndIdx];
	    var newEndIdx = newCh.length - 1;
	    var newStartVnode = newCh[0];
	    var newEndVnode = newCh[newEndIdx];
	    var oldKeyToIdx, idxInOld, vnodeToMove, refElm; // removeOnly is a special flag used only by <transition-group>
	    // to ensure removed elements stay in correct relative positions
	    // during leaving transitions

	    var canMove = !removeOnly;

	    {
	      checkDuplicateKeys(newCh);
	    }

	    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
	      if (isUndef(oldStartVnode)) {
	        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
	      } else if (isUndef(oldEndVnode)) {
	        oldEndVnode = oldCh[--oldEndIdx];
	      } else if (sameVnode(oldStartVnode, newStartVnode)) {
	        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
	        oldStartVnode = oldCh[++oldStartIdx];
	        newStartVnode = newCh[++newStartIdx];
	      } else if (sameVnode(oldEndVnode, newEndVnode)) {
	        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
	        oldEndVnode = oldCh[--oldEndIdx];
	        newEndVnode = newCh[--newEndIdx];
	      } else if (sameVnode(oldStartVnode, newEndVnode)) {
	        // Vnode moved right
	        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
	        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
	        oldStartVnode = oldCh[++oldStartIdx];
	        newEndVnode = newCh[--newEndIdx];
	      } else if (sameVnode(oldEndVnode, newStartVnode)) {
	        // Vnode moved left
	        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
	        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
	        oldEndVnode = oldCh[--oldEndIdx];
	        newStartVnode = newCh[++newStartIdx];
	      } else {
	        if (isUndef(oldKeyToIdx)) {
	          oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
	        }

	        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);

	        if (isUndef(idxInOld)) {
	          // New element
	          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
	        } else {
	          vnodeToMove = oldCh[idxInOld];

	          if (sameVnode(vnodeToMove, newStartVnode)) {
	            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
	            oldCh[idxInOld] = undefined;
	            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
	          } else {
	            // same key but different element. treat as new element
	            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
	          }
	        }

	        newStartVnode = newCh[++newStartIdx];
	      }
	    }

	    if (oldStartIdx > oldEndIdx) {
	      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
	      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
	    } else if (newStartIdx > newEndIdx) {
	      removeVnodes(oldCh, oldStartIdx, oldEndIdx);
	    }
	  }

	  function checkDuplicateKeys(children) {
	    var seenKeys = {};

	    for (var i = 0; i < children.length; i++) {
	      var vnode = children[i];
	      var key = vnode.key;

	      if (isDef(key)) {
	        if (seenKeys[key]) {
	          warn("Duplicate keys detected: '" + key + "'. This may cause an update error.", vnode.context);
	        } else {
	          seenKeys[key] = true;
	        }
	      }
	    }
	  }

	  function findIdxInOld(node, oldCh, start, end) {
	    for (var i = start; i < end; i++) {
	      var c = oldCh[i];

	      if (isDef(c) && sameVnode(node, c)) {
	        return i;
	      }
	    }
	  }

	  function patchVnode(oldVnode, vnode, insertedVnodeQueue, ownerArray, index, removeOnly) {
	    if (oldVnode === vnode) {
	      return;
	    }

	    if (isDef(vnode.elm) && isDef(ownerArray)) {
	      // clone reused vnode
	      vnode = ownerArray[index] = cloneVNode(vnode);
	    }

	    var elm = vnode.elm = oldVnode.elm;

	    if (isTrue(oldVnode.isAsyncPlaceholder)) {
	      if (isDef(vnode.asyncFactory.resolved)) {
	        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
	      } else {
	        vnode.isAsyncPlaceholder = true;
	      }

	      return;
	    } // reuse element for static trees.
	    // note we only do this if the vnode is cloned -
	    // if the new node is not cloned it means the render functions have been
	    // reset by the hot-reload-api and we need to do a proper re-render.


	    if (isTrue(vnode.isStatic) && isTrue(oldVnode.isStatic) && vnode.key === oldVnode.key && (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))) {
	      vnode.componentInstance = oldVnode.componentInstance;
	      return;
	    }

	    var i;
	    var data = vnode.data;

	    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
	      i(oldVnode, vnode);
	    }

	    var oldCh = oldVnode.children;
	    var ch = vnode.children;

	    if (isDef(data) && isPatchable(vnode)) {
	      for (i = 0; i < cbs.update.length; ++i) {
	        cbs.update[i](oldVnode, vnode);
	      }

	      if (isDef(i = data.hook) && isDef(i = i.update)) {
	        i(oldVnode, vnode);
	      }
	    }

	    if (isUndef(vnode.text)) {
	      if (isDef(oldCh) && isDef(ch)) {
	        if (oldCh !== ch) {
	          updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly);
	        }
	      } else if (isDef(ch)) {
	        {
	          checkDuplicateKeys(ch);
	        }

	        if (isDef(oldVnode.text)) {
	          nodeOps.setTextContent(elm, '');
	        }

	        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
	      } else if (isDef(oldCh)) {
	        removeVnodes(oldCh, 0, oldCh.length - 1);
	      } else if (isDef(oldVnode.text)) {
	        nodeOps.setTextContent(elm, '');
	      }
	    } else if (oldVnode.text !== vnode.text) {
	      nodeOps.setTextContent(elm, vnode.text);
	    }

	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.postpatch)) {
	        i(oldVnode, vnode);
	      }
	    }
	  }

	  function invokeInsertHook(vnode, queue, initial) {
	    // delay insert hooks for component root nodes, invoke them after the
	    // element is really inserted
	    if (isTrue(initial) && isDef(vnode.parent)) {
	      vnode.parent.data.pendingInsert = queue;
	    } else {
	      for (var i = 0; i < queue.length; ++i) {
	        queue[i].data.hook.insert(queue[i]);
	      }
	    }
	  }

	  var hydrationBailed = false; // list of modules that can skip create hook during hydration because they
	  // are already rendered on the client or has no need for initialization
	  // Note: style is excluded because it relies on initial clone for future
	  // deep updates (#7063).

	  var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key'); // Note: this is a browser-only function so we can assume elms are DOM nodes.

	  function hydrate(elm, vnode, insertedVnodeQueue, inVPre) {
	    var i;
	    var tag = vnode.tag;
	    var data = vnode.data;
	    var children = vnode.children;
	    inVPre = inVPre || data && data.pre;
	    vnode.elm = elm;

	    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
	      vnode.isAsyncPlaceholder = true;
	      return true;
	    } // assert node match


	    {
	      if (!assertNodeMatch(elm, vnode, inVPre)) {
	        return false;
	      }
	    }

	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.init)) {
	        i(vnode, true
	        /* hydrating */
	        );
	      }

	      if (isDef(i = vnode.componentInstance)) {
	        // child component. it should have hydrated its own tree.
	        initComponent(vnode, insertedVnodeQueue);
	        return true;
	      }
	    }

	    if (isDef(tag)) {
	      if (isDef(children)) {
	        // empty element, allow client to pick up and populate children
	        if (!elm.hasChildNodes()) {
	          createChildren(vnode, children, insertedVnodeQueue);
	        } else {
	          // v-html and domProps: innerHTML
	          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
	            if (i !== elm.innerHTML) {
	              /* istanbul ignore if */
	              if ( typeof console !== 'undefined' && !hydrationBailed) {
	                hydrationBailed = true;
	                console.warn('Parent: ', elm);
	                console.warn('server innerHTML: ', i);
	                console.warn('client innerHTML: ', elm.innerHTML);
	              }

	              return false;
	            }
	          } else {
	            // iterate and compare children lists
	            var childrenMatch = true;
	            var childNode = elm.firstChild;

	            for (var i$1 = 0; i$1 < children.length; i$1++) {
	              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
	                childrenMatch = false;
	                break;
	              }

	              childNode = childNode.nextSibling;
	            } // if childNode is not null, it means the actual childNodes list is
	            // longer than the virtual children list.


	            if (!childrenMatch || childNode) {
	              /* istanbul ignore if */
	              if ( typeof console !== 'undefined' && !hydrationBailed) {
	                hydrationBailed = true;
	                console.warn('Parent: ', elm);
	                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
	              }

	              return false;
	            }
	          }
	        }
	      }

	      if (isDef(data)) {
	        var fullInvoke = false;

	        for (var key in data) {
	          if (!isRenderedModule(key)) {
	            fullInvoke = true;
	            invokeCreateHooks(vnode, insertedVnodeQueue);
	            break;
	          }
	        }

	        if (!fullInvoke && data['class']) {
	          // ensure collecting deps for deep class bindings for future updates
	          traverse(data['class']);
	        }
	      }
	    } else if (elm.data !== vnode.text) {
	      elm.data = vnode.text;
	    }

	    return true;
	  }

	  function assertNodeMatch(node, vnode, inVPre) {
	    if (isDef(vnode.tag)) {
	      return vnode.tag.indexOf('vue-component') === 0 || !isUnknownElement$$1(vnode, inVPre) && vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase());
	    } else {
	      return node.nodeType === (vnode.isComment ? 8 : 3);
	    }
	  }

	  return function patch(oldVnode, vnode, hydrating, removeOnly) {
	    if (isUndef(vnode)) {
	      if (isDef(oldVnode)) {
	        invokeDestroyHook(oldVnode);
	      }

	      return;
	    }

	    var isInitialPatch = false;
	    var insertedVnodeQueue = [];

	    if (isUndef(oldVnode)) {
	      // empty mount (likely as component), create new root element
	      isInitialPatch = true;
	      createElm(vnode, insertedVnodeQueue);
	    } else {
	      var isRealElement = isDef(oldVnode.nodeType);

	      if (!isRealElement && sameVnode(oldVnode, vnode)) {
	        // patch existing root node
	        patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly);
	      } else {
	        if (isRealElement) {
	          // mounting to a real element
	          // check if this is server-rendered content and if we can perform
	          // a successful hydration.
	          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
	            oldVnode.removeAttribute(SSR_ATTR);
	            hydrating = true;
	          }

	          if (isTrue(hydrating)) {
	            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
	              invokeInsertHook(vnode, insertedVnodeQueue, true);
	              return oldVnode;
	            } else {
	              warn('The client-side rendered virtual DOM tree is not matching ' + 'server-rendered content. This is likely caused by incorrect ' + 'HTML markup, for example nesting block-level elements inside ' + '<p>, or missing <tbody>. Bailing hydration and performing ' + 'full client-side render.');
	            }
	          } // either not server-rendered, or hydration failed.
	          // create an empty node and replace it


	          oldVnode = emptyNodeAt(oldVnode);
	        } // replacing existing element


	        var oldElm = oldVnode.elm;
	        var parentElm = nodeOps.parentNode(oldElm); // create new node

	        createElm(vnode, insertedVnodeQueue, // extremely rare edge case: do not insert if old element is in a
	        // leaving transition. Only happens when combining transition +
	        // keep-alive + HOCs. (#4590)
	        oldElm._leaveCb ? null : parentElm, nodeOps.nextSibling(oldElm)); // update parent placeholder node element, recursively

	        if (isDef(vnode.parent)) {
	          var ancestor = vnode.parent;
	          var patchable = isPatchable(vnode);

	          while (ancestor) {
	            for (var i = 0; i < cbs.destroy.length; ++i) {
	              cbs.destroy[i](ancestor);
	            }

	            ancestor.elm = vnode.elm;

	            if (patchable) {
	              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
	                cbs.create[i$1](emptyNode, ancestor);
	              } // #6513
	              // invoke insert hooks that may have been merged by create hooks.
	              // e.g. for directives that uses the "inserted" hook.


	              var insert = ancestor.data.hook.insert;

	              if (insert.merged) {
	                // start at index 1 to avoid re-invoking component mounted hook
	                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
	                  insert.fns[i$2]();
	                }
	              }
	            } else {
	              registerRef(ancestor);
	            }

	            ancestor = ancestor.parent;
	          }
	        } // destroy old node


	        if (isDef(parentElm)) {
	          removeVnodes([oldVnode], 0, 0);
	        } else if (isDef(oldVnode.tag)) {
	          invokeDestroyHook(oldVnode);
	        }
	      }
	    }

	    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
	    return vnode.elm;
	  };
	}
	/*  */


	var directives = {
	  create: updateDirectives,
	  update: updateDirectives,
	  destroy: function unbindDirectives(vnode) {
	    updateDirectives(vnode, emptyNode);
	  }
	};

	function updateDirectives(oldVnode, vnode) {
	  if (oldVnode.data.directives || vnode.data.directives) {
	    _update(oldVnode, vnode);
	  }
	}

	function _update(oldVnode, vnode) {
	  var isCreate = oldVnode === emptyNode;
	  var isDestroy = vnode === emptyNode;
	  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
	  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);
	  var dirsWithInsert = [];
	  var dirsWithPostpatch = [];
	  var key, oldDir, dir;

	  for (key in newDirs) {
	    oldDir = oldDirs[key];
	    dir = newDirs[key];

	    if (!oldDir) {
	      // new directive, bind
	      callHook$1(dir, 'bind', vnode, oldVnode);

	      if (dir.def && dir.def.inserted) {
	        dirsWithInsert.push(dir);
	      }
	    } else {
	      // existing directive, update
	      dir.oldValue = oldDir.value;
	      dir.oldArg = oldDir.arg;
	      callHook$1(dir, 'update', vnode, oldVnode);

	      if (dir.def && dir.def.componentUpdated) {
	        dirsWithPostpatch.push(dir);
	      }
	    }
	  }

	  if (dirsWithInsert.length) {
	    var callInsert = function callInsert() {
	      for (var i = 0; i < dirsWithInsert.length; i++) {
	        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
	      }
	    };

	    if (isCreate) {
	      mergeVNodeHook(vnode, 'insert', callInsert);
	    } else {
	      callInsert();
	    }
	  }

	  if (dirsWithPostpatch.length) {
	    mergeVNodeHook(vnode, 'postpatch', function () {
	      for (var i = 0; i < dirsWithPostpatch.length; i++) {
	        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
	      }
	    });
	  }

	  if (!isCreate) {
	    for (key in oldDirs) {
	      if (!newDirs[key]) {
	        // no longer present, unbind
	        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
	      }
	    }
	  }
	}

	var emptyModifiers = Object.create(null);

	function normalizeDirectives$1(dirs, vm) {
	  var res = Object.create(null);

	  if (!dirs) {
	    // $flow-disable-line
	    return res;
	  }

	  var i, dir;

	  for (i = 0; i < dirs.length; i++) {
	    dir = dirs[i];

	    if (!dir.modifiers) {
	      // $flow-disable-line
	      dir.modifiers = emptyModifiers;
	    }

	    res[getRawDirName(dir)] = dir;
	    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
	  } // $flow-disable-line


	  return res;
	}

	function getRawDirName(dir) {
	  return dir.rawName || dir.name + "." + Object.keys(dir.modifiers || {}).join('.');
	}

	function callHook$1(dir, hook, vnode, oldVnode, isDestroy) {
	  var fn = dir.def && dir.def[hook];

	  if (fn) {
	    try {
	      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
	    } catch (e) {
	      handleError(e, vnode.context, "directive " + dir.name + " " + hook + " hook");
	    }
	  }
	}

	var baseModules = [ref, directives];
	/*  */

	function updateAttrs(oldVnode, vnode) {
	  var opts = vnode.componentOptions;

	  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
	    return;
	  }

	  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
	    return;
	  }

	  var key, cur, old;
	  var elm = vnode.elm;
	  var oldAttrs = oldVnode.data.attrs || {};
	  var attrs = vnode.data.attrs || {}; // clone observed objects, as the user probably wants to mutate it

	  if (isDef(attrs.__ob__)) {
	    attrs = vnode.data.attrs = extend({}, attrs);
	  }

	  for (key in attrs) {
	    cur = attrs[key];
	    old = oldAttrs[key];

	    if (old !== cur) {
	      setAttr(elm, key, cur);
	    }
	  } // #4391: in IE9, setting type can reset value for input[type=radio]
	  // #6666: IE/Edge forces progress value down to 1 before setting a max

	  /* istanbul ignore if */


	  if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
	    setAttr(elm, 'value', attrs.value);
	  }

	  for (key in oldAttrs) {
	    if (isUndef(attrs[key])) {
	      if (isXlink(key)) {
	        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
	      } else if (!isEnumeratedAttr(key)) {
	        elm.removeAttribute(key);
	      }
	    }
	  }
	}

	function setAttr(el, key, value) {
	  if (el.tagName.indexOf('-') > -1) {
	    baseSetAttr(el, key, value);
	  } else if (isBooleanAttr(key)) {
	    // set attribute for blank value
	    // e.g. <option disabled>Select one</option>
	    if (isFalsyAttrValue(value)) {
	      el.removeAttribute(key);
	    } else {
	      // technically allowfullscreen is a boolean attribute for <iframe>,
	      // but Flash expects a value of "true" when used on <embed> tag
	      value = key === 'allowfullscreen' && el.tagName === 'EMBED' ? 'true' : key;
	      el.setAttribute(key, value);
	    }
	  } else if (isEnumeratedAttr(key)) {
	    el.setAttribute(key, convertEnumeratedValue(key, value));
	  } else if (isXlink(key)) {
	    if (isFalsyAttrValue(value)) {
	      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
	    } else {
	      el.setAttributeNS(xlinkNS, key, value);
	    }
	  } else {
	    baseSetAttr(el, key, value);
	  }
	}

	function baseSetAttr(el, key, value) {
	  if (isFalsyAttrValue(value)) {
	    el.removeAttribute(key);
	  } else {
	    // #7138: IE10 & 11 fires input event when setting placeholder on
	    // <textarea>... block the first input event and remove the blocker
	    // immediately.

	    /* istanbul ignore if */
	    if (isIE && !isIE9 && el.tagName === 'TEXTAREA' && key === 'placeholder' && value !== '' && !el.__ieph) {
	      var blocker = function blocker(e) {
	        e.stopImmediatePropagation();
	        el.removeEventListener('input', blocker);
	      };

	      el.addEventListener('input', blocker); // $flow-disable-line

	      el.__ieph = true;
	      /* IE placeholder patched */
	    }

	    el.setAttribute(key, value);
	  }
	}

	var attrs = {
	  create: updateAttrs,
	  update: updateAttrs
	};
	/*  */

	function updateClass(oldVnode, vnode) {
	  var el = vnode.elm;
	  var data = vnode.data;
	  var oldData = oldVnode.data;

	  if (isUndef(data.staticClass) && isUndef(data.class) && (isUndef(oldData) || isUndef(oldData.staticClass) && isUndef(oldData.class))) {
	    return;
	  }

	  var cls = genClassForVnode(vnode); // handle transition classes

	  var transitionClass = el._transitionClasses;

	  if (isDef(transitionClass)) {
	    cls = concat(cls, stringifyClass(transitionClass));
	  } // set the class


	  if (cls !== el._prevClass) {
	    el.setAttribute('class', cls);
	    el._prevClass = cls;
	  }
	}

	var klass = {
	  create: updateClass,
	  update: updateClass
	};
	/*  */

	/*  */

	/*  */

	/*  */
	// in some cases, the event used has to be determined at runtime
	// so we used some reserved tokens during compile.

	var RANGE_TOKEN = '__r';
	var CHECKBOX_RADIO_TOKEN = '__c';
	/*  */
	// normalize v-model event tokens that can only be determined at runtime.
	// it's important to place the event as the first in the array because
	// the whole point is ensuring the v-model callback gets called before
	// user-attached handlers.

	function normalizeEvents(on) {
	  /* istanbul ignore if */
	  if (isDef(on[RANGE_TOKEN])) {
	    // IE input[type=range] only supports `change` event
	    var event = isIE ? 'change' : 'input';
	    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
	    delete on[RANGE_TOKEN];
	  } // This was originally intended to fix #4521 but no longer necessary
	  // after 2.5. Keeping it for backwards compat with generated code from < 2.4

	  /* istanbul ignore if */


	  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
	    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
	    delete on[CHECKBOX_RADIO_TOKEN];
	  }
	}

	var target$1;

	function createOnceHandler$1(event, handler, capture) {
	  var _target = target$1; // save current target element in closure

	  return function onceHandler() {
	    var res = handler.apply(null, arguments);

	    if (res !== null) {
	      remove$2(event, onceHandler, capture, _target);
	    }
	  };
	} // #9446: Firefox <= 53 (in particular, ESR 52) has incorrect Event.timeStamp
	// implementation and does not fire microtasks in between event propagation, so
	// safe to exclude.


	var useMicrotaskFix = isUsingMicroTask && !(isFF && Number(isFF[1]) <= 53);

	function add$1(name, handler, capture, passive) {
	  // async edge case #6566: inner click event triggers patch, event handler
	  // attached to outer element during patch, and triggered again. This
	  // happens because browsers fire microtask ticks between event propagation.
	  // the solution is simple: we save the timestamp when a handler is attached,
	  // and the handler would only fire if the event passed to it was fired
	  // AFTER it was attached.
	  if (useMicrotaskFix) {
	    var attachedTimestamp = currentFlushTimestamp;
	    var original = handler;

	    handler = original._wrapper = function (e) {
	      if ( // no bubbling, should always fire.
	      // this is just a safety net in case event.timeStamp is unreliable in
	      // certain weird environments...
	      e.target === e.currentTarget || // event is fired after handler attachment
	      e.timeStamp >= attachedTimestamp || // bail for environments that have buggy event.timeStamp implementations
	      // #9462 iOS 9 bug: event.timeStamp is 0 after history.pushState
	      // #9681 QtWebEngine event.timeStamp is negative value
	      e.timeStamp <= 0 || // #9448 bail if event is fired in another document in a multi-page
	      // electron/nw.js app, since event.timeStamp will be using a different
	      // starting reference
	      e.target.ownerDocument !== document) {
	        return original.apply(this, arguments);
	      }
	    };
	  }

	  target$1.addEventListener(name, handler, supportsPassive ? {
	    capture: capture,
	    passive: passive
	  } : capture);
	}

	function remove$2(name, handler, capture, _target) {
	  (_target || target$1).removeEventListener(name, handler._wrapper || handler, capture);
	}

	function updateDOMListeners(oldVnode, vnode) {
	  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
	    return;
	  }

	  var on = vnode.data.on || {};
	  var oldOn = oldVnode.data.on || {};
	  target$1 = vnode.elm;
	  normalizeEvents(on);
	  updateListeners(on, oldOn, add$1, remove$2, createOnceHandler$1, vnode.context);
	  target$1 = undefined;
	}

	var events = {
	  create: updateDOMListeners,
	  update: updateDOMListeners
	};
	/*  */

	var svgContainer;

	function updateDOMProps(oldVnode, vnode) {
	  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
	    return;
	  }

	  var key, cur;
	  var elm = vnode.elm;
	  var oldProps = oldVnode.data.domProps || {};
	  var props = vnode.data.domProps || {}; // clone observed objects, as the user probably wants to mutate it

	  if (isDef(props.__ob__)) {
	    props = vnode.data.domProps = extend({}, props);
	  }

	  for (key in oldProps) {
	    if (!(key in props)) {
	      elm[key] = '';
	    }
	  }

	  for (key in props) {
	    cur = props[key]; // ignore children if the node has textContent or innerHTML,
	    // as these will throw away existing DOM nodes and cause removal errors
	    // on subsequent patches (#3360)

	    if (key === 'textContent' || key === 'innerHTML') {
	      if (vnode.children) {
	        vnode.children.length = 0;
	      }

	      if (cur === oldProps[key]) {
	        continue;
	      } // #6601 work around Chrome version <= 55 bug where single textNode
	      // replaced by innerHTML/textContent retains its parentNode property


	      if (elm.childNodes.length === 1) {
	        elm.removeChild(elm.childNodes[0]);
	      }
	    }

	    if (key === 'value' && elm.tagName !== 'PROGRESS') {
	      // store value as _value as well since
	      // non-string values will be stringified
	      elm._value = cur; // avoid resetting cursor position when value is the same

	      var strCur = isUndef(cur) ? '' : String(cur);

	      if (shouldUpdateValue(elm, strCur)) {
	        elm.value = strCur;
	      }
	    } else if (key === 'innerHTML' && isSVG(elm.tagName) && isUndef(elm.innerHTML)) {
	      // IE doesn't support innerHTML for SVG elements
	      svgContainer = svgContainer || document.createElement('div');
	      svgContainer.innerHTML = "<svg>" + cur + "</svg>";
	      var svg = svgContainer.firstChild;

	      while (elm.firstChild) {
	        elm.removeChild(elm.firstChild);
	      }

	      while (svg.firstChild) {
	        elm.appendChild(svg.firstChild);
	      }
	    } else if ( // skip the update if old and new VDOM state is the same.
	    // `value` is handled separately because the DOM value may be temporarily
	    // out of sync with VDOM state due to focus, composition and modifiers.
	    // This  #4521 by skipping the unnecesarry `checked` update.
	    cur !== oldProps[key]) {
	      // some property updates can throw
	      // e.g. `value` on <progress> w/ non-finite value
	      try {
	        elm[key] = cur;
	      } catch (e) {}
	    }
	  }
	} // check platforms/web/util/attrs.js acceptValue


	function shouldUpdateValue(elm, checkVal) {
	  return !elm.composing && (elm.tagName === 'OPTION' || isNotInFocusAndDirty(elm, checkVal) || isDirtyWithModifiers(elm, checkVal));
	}

	function isNotInFocusAndDirty(elm, checkVal) {
	  // return true when textbox (.number and .trim) loses focus and its value is
	  // not equal to the updated value
	  var notInFocus = true; // #6157
	  // work around IE bug when accessing document.activeElement in an iframe

	  try {
	    notInFocus = document.activeElement !== elm;
	  } catch (e) {}

	  return notInFocus && elm.value !== checkVal;
	}

	function isDirtyWithModifiers(elm, newVal) {
	  var value = elm.value;
	  var modifiers = elm._vModifiers; // injected by v-model runtime

	  if (isDef(modifiers)) {
	    if (modifiers.number) {
	      return toNumber$1(value) !== toNumber$1(newVal);
	    }

	    if (modifiers.trim) {
	      return value.trim() !== newVal.trim();
	    }
	  }

	  return value !== newVal;
	}

	var domProps = {
	  create: updateDOMProps,
	  update: updateDOMProps
	};
	/*  */

	var parseStyleText = cached(function (cssText) {
	  var res = {};
	  var listDelimiter = /;(?![^(]*\))/g;
	  var propertyDelimiter = /:(.+)/;
	  cssText.split(listDelimiter).forEach(function (item) {
	    if (item) {
	      var tmp = item.split(propertyDelimiter);
	      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
	    }
	  });
	  return res;
	}); // merge static and dynamic style data on the same vnode

	function normalizeStyleData(data) {
	  var style = normalizeStyleBinding(data.style); // static style is pre-processed into an object during compilation
	  // and is always a fresh object, so it's safe to merge into it

	  return data.staticStyle ? extend(data.staticStyle, style) : style;
	} // normalize possible array / string values into Object


	function normalizeStyleBinding(bindingStyle) {
	  if (Array.isArray(bindingStyle)) {
	    return toObject$1(bindingStyle);
	  }

	  if (typeof bindingStyle === 'string') {
	    return parseStyleText(bindingStyle);
	  }

	  return bindingStyle;
	}
	/**
	 * parent component style should be after child's
	 * so that parent component's style could override it
	 */


	function getStyle(vnode, checkChild) {
	  var res = {};
	  var styleData;

	  if (checkChild) {
	    var childNode = vnode;

	    while (childNode.componentInstance) {
	      childNode = childNode.componentInstance._vnode;

	      if (childNode && childNode.data && (styleData = normalizeStyleData(childNode.data))) {
	        extend(res, styleData);
	      }
	    }
	  }

	  if (styleData = normalizeStyleData(vnode.data)) {
	    extend(res, styleData);
	  }

	  var parentNode = vnode;

	  while (parentNode = parentNode.parent) {
	    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
	      extend(res, styleData);
	    }
	  }

	  return res;
	}
	/*  */


	var cssVarRE = /^--/;
	var importantRE = /\s*!important$/;

	var setProp = function setProp(el, name, val) {
	  /* istanbul ignore if */
	  if (cssVarRE.test(name)) {
	    el.style.setProperty(name, val);
	  } else if (importantRE.test(val)) {
	    el.style.setProperty(hyphenate(name), val.replace(importantRE, ''), 'important');
	  } else {
	    var normalizedName = normalize$1(name);

	    if (Array.isArray(val)) {
	      // Support values array created by autoprefixer, e.g.
	      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
	      // Set them one by one, and the browser will only set those it can recognize
	      for (var i = 0, len = val.length; i < len; i++) {
	        el.style[normalizedName] = val[i];
	      }
	    } else {
	      el.style[normalizedName] = val;
	    }
	  }
	};

	var vendorNames = ['Webkit', 'Moz', 'ms'];
	var emptyStyle;
	var normalize$1 = cached(function (prop) {
	  emptyStyle = emptyStyle || document.createElement('div').style;
	  prop = camelize(prop);

	  if (prop !== 'filter' && prop in emptyStyle) {
	    return prop;
	  }

	  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);

	  for (var i = 0; i < vendorNames.length; i++) {
	    var name = vendorNames[i] + capName;

	    if (name in emptyStyle) {
	      return name;
	    }
	  }
	});

	function updateStyle(oldVnode, vnode) {
	  var data = vnode.data;
	  var oldData = oldVnode.data;

	  if (isUndef(data.staticStyle) && isUndef(data.style) && isUndef(oldData.staticStyle) && isUndef(oldData.style)) {
	    return;
	  }

	  var cur, name;
	  var el = vnode.elm;
	  var oldStaticStyle = oldData.staticStyle;
	  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {}; // if static style exists, stylebinding already merged into it when doing normalizeStyleData

	  var oldStyle = oldStaticStyle || oldStyleBinding;
	  var style = normalizeStyleBinding(vnode.data.style) || {}; // store normalized style under a different key for next diff
	  // make sure to clone it if it's reactive, since the user likely wants
	  // to mutate it.

	  vnode.data.normalizedStyle = isDef(style.__ob__) ? extend({}, style) : style;
	  var newStyle = getStyle(vnode, true);

	  for (name in oldStyle) {
	    if (isUndef(newStyle[name])) {
	      setProp(el, name, '');
	    }
	  }

	  for (name in newStyle) {
	    cur = newStyle[name];

	    if (cur !== oldStyle[name]) {
	      // ie9 setting to null has no effect, must use empty string
	      setProp(el, name, cur == null ? '' : cur);
	    }
	  }
	}

	var style = {
	  create: updateStyle,
	  update: updateStyle
	};
	/*  */

	var whitespaceRE = /\s+/;
	/**
	 * Add class with compatibility for SVG since classList is not supported on
	 * SVG elements in IE
	 */

	function addClass(el, cls) {
	  /* istanbul ignore if */
	  if (!cls || !(cls = cls.trim())) {
	    return;
	  }
	  /* istanbul ignore else */


	  if (el.classList) {
	    if (cls.indexOf(' ') > -1) {
	      cls.split(whitespaceRE).forEach(function (c) {
	        return el.classList.add(c);
	      });
	    } else {
	      el.classList.add(cls);
	    }
	  } else {
	    var cur = " " + (el.getAttribute('class') || '') + " ";

	    if (cur.indexOf(' ' + cls + ' ') < 0) {
	      el.setAttribute('class', (cur + cls).trim());
	    }
	  }
	}
	/**
	 * Remove class with compatibility for SVG since classList is not supported on
	 * SVG elements in IE
	 */


	function removeClass(el, cls) {
	  /* istanbul ignore if */
	  if (!cls || !(cls = cls.trim())) {
	    return;
	  }
	  /* istanbul ignore else */


	  if (el.classList) {
	    if (cls.indexOf(' ') > -1) {
	      cls.split(whitespaceRE).forEach(function (c) {
	        return el.classList.remove(c);
	      });
	    } else {
	      el.classList.remove(cls);
	    }

	    if (!el.classList.length) {
	      el.removeAttribute('class');
	    }
	  } else {
	    var cur = " " + (el.getAttribute('class') || '') + " ";
	    var tar = ' ' + cls + ' ';

	    while (cur.indexOf(tar) >= 0) {
	      cur = cur.replace(tar, ' ');
	    }

	    cur = cur.trim();

	    if (cur) {
	      el.setAttribute('class', cur);
	    } else {
	      el.removeAttribute('class');
	    }
	  }
	}
	/*  */


	function resolveTransition(def$$1) {
	  if (!def$$1) {
	    return;
	  }
	  /* istanbul ignore else */


	  if (_typeof(def$$1) === 'object') {
	    var res = {};

	    if (def$$1.css !== false) {
	      extend(res, autoCssTransition(def$$1.name || 'v'));
	    }

	    extend(res, def$$1);
	    return res;
	  } else if (typeof def$$1 === 'string') {
	    return autoCssTransition(def$$1);
	  }
	}

	var autoCssTransition = cached(function (name) {
	  return {
	    enterClass: name + "-enter",
	    enterToClass: name + "-enter-to",
	    enterActiveClass: name + "-enter-active",
	    leaveClass: name + "-leave",
	    leaveToClass: name + "-leave-to",
	    leaveActiveClass: name + "-leave-active"
	  };
	});
	var hasTransition = inBrowser && !isIE9;
	var TRANSITION = 'transition';
	var ANIMATION = 'animation'; // Transition property/event sniffing

	var transitionProp = 'transition';
	var transitionEndEvent = 'transitionend';
	var animationProp = 'animation';
	var animationEndEvent = 'animationend';

	if (hasTransition) {
	  /* istanbul ignore if */
	  if (window.ontransitionend === undefined && window.onwebkittransitionend !== undefined) {
	    transitionProp = 'WebkitTransition';
	    transitionEndEvent = 'webkitTransitionEnd';
	  }

	  if (window.onanimationend === undefined && window.onwebkitanimationend !== undefined) {
	    animationProp = 'WebkitAnimation';
	    animationEndEvent = 'webkitAnimationEnd';
	  }
	} // binding to window is necessary to make hot reload work in IE in strict mode


	var raf = inBrowser ? window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : setTimeout :
	/* istanbul ignore next */
	function (fn) {
	  return fn();
	};

	function nextFrame(fn) {
	  raf(function () {
	    raf(fn);
	  });
	}

	function addTransitionClass(el, cls) {
	  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);

	  if (transitionClasses.indexOf(cls) < 0) {
	    transitionClasses.push(cls);
	    addClass(el, cls);
	  }
	}

	function removeTransitionClass(el, cls) {
	  if (el._transitionClasses) {
	    remove(el._transitionClasses, cls);
	  }

	  removeClass(el, cls);
	}

	function whenTransitionEnds(el, expectedType, cb) {
	  var ref = getTransitionInfo(el, expectedType);
	  var type = ref.type;
	  var timeout = ref.timeout;
	  var propCount = ref.propCount;

	  if (!type) {
	    return cb();
	  }

	  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
	  var ended = 0;

	  var end = function end() {
	    el.removeEventListener(event, onEnd);
	    cb();
	  };

	  var onEnd = function onEnd(e) {
	    if (e.target === el) {
	      if (++ended >= propCount) {
	        end();
	      }
	    }
	  };

	  setTimeout(function () {
	    if (ended < propCount) {
	      end();
	    }
	  }, timeout + 1);
	  el.addEventListener(event, onEnd);
	}

	var transformRE = /\b(transform|all)(,|$)/;

	function getTransitionInfo(el, expectedType) {
	  var styles = window.getComputedStyle(el); // JSDOM may return undefined for transition properties

	  var transitionDelays = (styles[transitionProp + 'Delay'] || '').split(', ');
	  var transitionDurations = (styles[transitionProp + 'Duration'] || '').split(', ');
	  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
	  var animationDelays = (styles[animationProp + 'Delay'] || '').split(', ');
	  var animationDurations = (styles[animationProp + 'Duration'] || '').split(', ');
	  var animationTimeout = getTimeout(animationDelays, animationDurations);
	  var type;
	  var timeout = 0;
	  var propCount = 0;
	  /* istanbul ignore if */

	  if (expectedType === TRANSITION) {
	    if (transitionTimeout > 0) {
	      type = TRANSITION;
	      timeout = transitionTimeout;
	      propCount = transitionDurations.length;
	    }
	  } else if (expectedType === ANIMATION) {
	    if (animationTimeout > 0) {
	      type = ANIMATION;
	      timeout = animationTimeout;
	      propCount = animationDurations.length;
	    }
	  } else {
	    timeout = Math.max(transitionTimeout, animationTimeout);
	    type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
	    propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
	  }

	  var hasTransform = type === TRANSITION && transformRE.test(styles[transitionProp + 'Property']);
	  return {
	    type: type,
	    timeout: timeout,
	    propCount: propCount,
	    hasTransform: hasTransform
	  };
	}

	function getTimeout(delays, durations) {
	  /* istanbul ignore next */
	  while (delays.length < durations.length) {
	    delays = delays.concat(delays);
	  }

	  return Math.max.apply(null, durations.map(function (d, i) {
	    return toMs(d) + toMs(delays[i]);
	  }));
	} // Old versions of Chromium (below 61.0.3163.100) formats floating pointer numbers
	// in a locale-dependent way, using a comma instead of a dot.
	// If comma is not replaced with a dot, the input will be rounded down (i.e. acting
	// as a floor function) causing unexpected behaviors


	function toMs(s) {
	  return Number(s.slice(0, -1).replace(',', '.')) * 1000;
	}
	/*  */


	function enter(vnode, toggleDisplay) {
	  var el = vnode.elm; // call leave callback now

	  if (isDef(el._leaveCb)) {
	    el._leaveCb.cancelled = true;

	    el._leaveCb();
	  }

	  var data = resolveTransition(vnode.data.transition);

	  if (isUndef(data)) {
	    return;
	  }
	  /* istanbul ignore if */


	  if (isDef(el._enterCb) || el.nodeType !== 1) {
	    return;
	  }

	  var css = data.css;
	  var type = data.type;
	  var enterClass = data.enterClass;
	  var enterToClass = data.enterToClass;
	  var enterActiveClass = data.enterActiveClass;
	  var appearClass = data.appearClass;
	  var appearToClass = data.appearToClass;
	  var appearActiveClass = data.appearActiveClass;
	  var beforeEnter = data.beforeEnter;
	  var enter = data.enter;
	  var afterEnter = data.afterEnter;
	  var enterCancelled = data.enterCancelled;
	  var beforeAppear = data.beforeAppear;
	  var appear = data.appear;
	  var afterAppear = data.afterAppear;
	  var appearCancelled = data.appearCancelled;
	  var duration = data.duration; // activeInstance will always be the <transition> component managing this
	  // transition. One edge case to check is when the <transition> is placed
	  // as the root node of a child component. In that case we need to check
	  // <transition>'s parent for appear check.

	  var context = activeInstance;
	  var transitionNode = activeInstance.$vnode;

	  while (transitionNode && transitionNode.parent) {
	    context = transitionNode.context;
	    transitionNode = transitionNode.parent;
	  }

	  var isAppear = !context._isMounted || !vnode.isRootInsert;

	  if (isAppear && !appear && appear !== '') {
	    return;
	  }

	  var startClass = isAppear && appearClass ? appearClass : enterClass;
	  var activeClass = isAppear && appearActiveClass ? appearActiveClass : enterActiveClass;
	  var toClass = isAppear && appearToClass ? appearToClass : enterToClass;
	  var beforeEnterHook = isAppear ? beforeAppear || beforeEnter : beforeEnter;
	  var enterHook = isAppear ? typeof appear === 'function' ? appear : enter : enter;
	  var afterEnterHook = isAppear ? afterAppear || afterEnter : afterEnter;
	  var enterCancelledHook = isAppear ? appearCancelled || enterCancelled : enterCancelled;
	  var explicitEnterDuration = toNumber$1(isObject$1(duration) ? duration.enter : duration);

	  if ( explicitEnterDuration != null) {
	    checkDuration(explicitEnterDuration, 'enter', vnode);
	  }

	  var expectsCSS = css !== false && !isIE9;
	  var userWantsControl = getHookArgumentsLength(enterHook);
	  var cb = el._enterCb = once(function () {
	    if (expectsCSS) {
	      removeTransitionClass(el, toClass);
	      removeTransitionClass(el, activeClass);
	    }

	    if (cb.cancelled) {
	      if (expectsCSS) {
	        removeTransitionClass(el, startClass);
	      }

	      enterCancelledHook && enterCancelledHook(el);
	    } else {
	      afterEnterHook && afterEnterHook(el);
	    }

	    el._enterCb = null;
	  });

	  if (!vnode.data.show) {
	    // remove pending leave element on enter by injecting an insert hook
	    mergeVNodeHook(vnode, 'insert', function () {
	      var parent = el.parentNode;
	      var pendingNode = parent && parent._pending && parent._pending[vnode.key];

	      if (pendingNode && pendingNode.tag === vnode.tag && pendingNode.elm._leaveCb) {
	        pendingNode.elm._leaveCb();
	      }

	      enterHook && enterHook(el, cb);
	    });
	  } // start enter transition


	  beforeEnterHook && beforeEnterHook(el);

	  if (expectsCSS) {
	    addTransitionClass(el, startClass);
	    addTransitionClass(el, activeClass);
	    nextFrame(function () {
	      removeTransitionClass(el, startClass);

	      if (!cb.cancelled) {
	        addTransitionClass(el, toClass);

	        if (!userWantsControl) {
	          if (isValidDuration(explicitEnterDuration)) {
	            setTimeout(cb, explicitEnterDuration);
	          } else {
	            whenTransitionEnds(el, type, cb);
	          }
	        }
	      }
	    });
	  }

	  if (vnode.data.show) {
	    toggleDisplay && toggleDisplay();
	    enterHook && enterHook(el, cb);
	  }

	  if (!expectsCSS && !userWantsControl) {
	    cb();
	  }
	}

	function leave(vnode, rm) {
	  var el = vnode.elm; // call enter callback now

	  if (isDef(el._enterCb)) {
	    el._enterCb.cancelled = true;

	    el._enterCb();
	  }

	  var data = resolveTransition(vnode.data.transition);

	  if (isUndef(data) || el.nodeType !== 1) {
	    return rm();
	  }
	  /* istanbul ignore if */


	  if (isDef(el._leaveCb)) {
	    return;
	  }

	  var css = data.css;
	  var type = data.type;
	  var leaveClass = data.leaveClass;
	  var leaveToClass = data.leaveToClass;
	  var leaveActiveClass = data.leaveActiveClass;
	  var beforeLeave = data.beforeLeave;
	  var leave = data.leave;
	  var afterLeave = data.afterLeave;
	  var leaveCancelled = data.leaveCancelled;
	  var delayLeave = data.delayLeave;
	  var duration = data.duration;
	  var expectsCSS = css !== false && !isIE9;
	  var userWantsControl = getHookArgumentsLength(leave);
	  var explicitLeaveDuration = toNumber$1(isObject$1(duration) ? duration.leave : duration);

	  if ( isDef(explicitLeaveDuration)) {
	    checkDuration(explicitLeaveDuration, 'leave', vnode);
	  }

	  var cb = el._leaveCb = once(function () {
	    if (el.parentNode && el.parentNode._pending) {
	      el.parentNode._pending[vnode.key] = null;
	    }

	    if (expectsCSS) {
	      removeTransitionClass(el, leaveToClass);
	      removeTransitionClass(el, leaveActiveClass);
	    }

	    if (cb.cancelled) {
	      if (expectsCSS) {
	        removeTransitionClass(el, leaveClass);
	      }

	      leaveCancelled && leaveCancelled(el);
	    } else {
	      rm();
	      afterLeave && afterLeave(el);
	    }

	    el._leaveCb = null;
	  });

	  if (delayLeave) {
	    delayLeave(performLeave);
	  } else {
	    performLeave();
	  }

	  function performLeave() {
	    // the delayed leave may have already been cancelled
	    if (cb.cancelled) {
	      return;
	    } // record leaving element


	    if (!vnode.data.show && el.parentNode) {
	      (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] = vnode;
	    }

	    beforeLeave && beforeLeave(el);

	    if (expectsCSS) {
	      addTransitionClass(el, leaveClass);
	      addTransitionClass(el, leaveActiveClass);
	      nextFrame(function () {
	        removeTransitionClass(el, leaveClass);

	        if (!cb.cancelled) {
	          addTransitionClass(el, leaveToClass);

	          if (!userWantsControl) {
	            if (isValidDuration(explicitLeaveDuration)) {
	              setTimeout(cb, explicitLeaveDuration);
	            } else {
	              whenTransitionEnds(el, type, cb);
	            }
	          }
	        }
	      });
	    }

	    leave && leave(el, cb);

	    if (!expectsCSS && !userWantsControl) {
	      cb();
	    }
	  }
	} // only used in dev mode


	function checkDuration(val, name, vnode) {
	  if (typeof val !== 'number') {
	    warn("<transition> explicit " + name + " duration is not a valid number - " + "got " + JSON.stringify(val) + ".", vnode.context);
	  } else if (isNaN(val)) {
	    warn("<transition> explicit " + name + " duration is NaN - " + 'the duration expression might be incorrect.', vnode.context);
	  }
	}

	function isValidDuration(val) {
	  return typeof val === 'number' && !isNaN(val);
	}
	/**
	 * Normalize a transition hook's argument length. The hook may be:
	 * - a merged hook (invoker) with the original in .fns
	 * - a wrapped component method (check ._length)
	 * - a plain function (.length)
	 */


	function getHookArgumentsLength(fn) {
	  if (isUndef(fn)) {
	    return false;
	  }

	  var invokerFns = fn.fns;

	  if (isDef(invokerFns)) {
	    // invoker
	    return getHookArgumentsLength(Array.isArray(invokerFns) ? invokerFns[0] : invokerFns);
	  } else {
	    return (fn._length || fn.length) > 1;
	  }
	}

	function _enter(_, vnode) {
	  if (vnode.data.show !== true) {
	    enter(vnode);
	  }
	}

	var transition = inBrowser ? {
	  create: _enter,
	  activate: _enter,
	  remove: function remove$$1(vnode, rm) {
	    /* istanbul ignore else */
	    if (vnode.data.show !== true) {
	      leave(vnode, rm);
	    } else {
	      rm();
	    }
	  }
	} : {};
	var platformModules = [attrs, klass, events, domProps, style, transition];
	/*  */
	// the directive module should be applied last, after all
	// built-in modules have been applied.

	var modules = platformModules.concat(baseModules);
	var patch = createPatchFunction({
	  nodeOps: nodeOps,
	  modules: modules
	});
	/**
	 * Not type checking this file because flow doesn't like attaching
	 * properties to Elements.
	 */

	/* istanbul ignore if */

	if (isIE9) {
	  // http://www.matts411.com/post/internet-explorer-9-oninput/
	  document.addEventListener('selectionchange', function () {
	    var el = document.activeElement;

	    if (el && el.vmodel) {
	      trigger(el, 'input');
	    }
	  });
	}

	var directive = {
	  inserted: function inserted(el, binding, vnode, oldVnode) {
	    if (vnode.tag === 'select') {
	      // #6903
	      if (oldVnode.elm && !oldVnode.elm._vOptions) {
	        mergeVNodeHook(vnode, 'postpatch', function () {
	          directive.componentUpdated(el, binding, vnode);
	        });
	      } else {
	        setSelected(el, binding, vnode.context);
	      }

	      el._vOptions = [].map.call(el.options, getValue);
	    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
	      el._vModifiers = binding.modifiers;

	      if (!binding.modifiers.lazy) {
	        el.addEventListener('compositionstart', onCompositionStart);
	        el.addEventListener('compositionend', onCompositionEnd); // Safari < 10.2 & UIWebView doesn't fire compositionend when
	        // switching focus before confirming composition choice
	        // this also fixes the issue where some browsers e.g. iOS Chrome
	        // fires "change" instead of "input" on autocomplete.

	        el.addEventListener('change', onCompositionEnd);
	        /* istanbul ignore if */

	        if (isIE9) {
	          el.vmodel = true;
	        }
	      }
	    }
	  },
	  componentUpdated: function componentUpdated(el, binding, vnode) {
	    if (vnode.tag === 'select') {
	      setSelected(el, binding, vnode.context); // in case the options rendered by v-for have changed,
	      // it's possible that the value is out-of-sync with the rendered options.
	      // detect such cases and filter out values that no longer has a matching
	      // option in the DOM.

	      var prevOptions = el._vOptions;
	      var curOptions = el._vOptions = [].map.call(el.options, getValue);

	      if (curOptions.some(function (o, i) {
	        return !looseEqual(o, prevOptions[i]);
	      })) {
	        // trigger change event if
	        // no matching option found for at least one value
	        var needReset = el.multiple ? binding.value.some(function (v) {
	          return hasNoMatchingOption(v, curOptions);
	        }) : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);

	        if (needReset) {
	          trigger(el, 'change');
	        }
	      }
	    }
	  }
	};

	function setSelected(el, binding, vm) {
	  actuallySetSelected(el, binding, vm);
	  /* istanbul ignore if */

	  if (isIE || isEdge) {
	    setTimeout(function () {
	      actuallySetSelected(el, binding, vm);
	    }, 0);
	  }
	}

	function actuallySetSelected(el, binding, vm) {
	  var value = binding.value;
	  var isMultiple = el.multiple;

	  if (isMultiple && !Array.isArray(value)) {
	     warn("<select multiple v-model=\"" + binding.expression + "\"> " + "expects an Array value for its binding, but got " + Object.prototype.toString.call(value).slice(8, -1), vm);
	    return;
	  }

	  var selected, option;

	  for (var i = 0, l = el.options.length; i < l; i++) {
	    option = el.options[i];

	    if (isMultiple) {
	      selected = looseIndexOf(value, getValue(option)) > -1;

	      if (option.selected !== selected) {
	        option.selected = selected;
	      }
	    } else {
	      if (looseEqual(getValue(option), value)) {
	        if (el.selectedIndex !== i) {
	          el.selectedIndex = i;
	        }

	        return;
	      }
	    }
	  }

	  if (!isMultiple) {
	    el.selectedIndex = -1;
	  }
	}

	function hasNoMatchingOption(value, options) {
	  return options.every(function (o) {
	    return !looseEqual(o, value);
	  });
	}

	function getValue(option) {
	  return '_value' in option ? option._value : option.value;
	}

	function onCompositionStart(e) {
	  e.target.composing = true;
	}

	function onCompositionEnd(e) {
	  // prevent triggering an input event for no reason
	  if (!e.target.composing) {
	    return;
	  }

	  e.target.composing = false;
	  trigger(e.target, 'input');
	}

	function trigger(el, type) {
	  var e = document.createEvent('HTMLEvents');
	  e.initEvent(type, true, true);
	  el.dispatchEvent(e);
	}
	/*  */
	// recursively search for possible transition defined inside the component root


	function locateNode(vnode) {
	  return vnode.componentInstance && (!vnode.data || !vnode.data.transition) ? locateNode(vnode.componentInstance._vnode) : vnode;
	}

	var show = {
	  bind: function bind(el, ref, vnode) {
	    var value = ref.value;
	    vnode = locateNode(vnode);
	    var transition$$1 = vnode.data && vnode.data.transition;
	    var originalDisplay = el.__vOriginalDisplay = el.style.display === 'none' ? '' : el.style.display;

	    if (value && transition$$1) {
	      vnode.data.show = true;
	      enter(vnode, function () {
	        el.style.display = originalDisplay;
	      });
	    } else {
	      el.style.display = value ? originalDisplay : 'none';
	    }
	  },
	  update: function update(el, ref, vnode) {
	    var value = ref.value;
	    var oldValue = ref.oldValue;
	    /* istanbul ignore if */

	    if (!value === !oldValue) {
	      return;
	    }

	    vnode = locateNode(vnode);
	    var transition$$1 = vnode.data && vnode.data.transition;

	    if (transition$$1) {
	      vnode.data.show = true;

	      if (value) {
	        enter(vnode, function () {
	          el.style.display = el.__vOriginalDisplay;
	        });
	      } else {
	        leave(vnode, function () {
	          el.style.display = 'none';
	        });
	      }
	    } else {
	      el.style.display = value ? el.__vOriginalDisplay : 'none';
	    }
	  },
	  unbind: function unbind(el, binding, vnode, oldVnode, isDestroy) {
	    if (!isDestroy) {
	      el.style.display = el.__vOriginalDisplay;
	    }
	  }
	};
	var platformDirectives = {
	  model: directive,
	  show: show
	};
	/*  */

	var transitionProps = {
	  name: String,
	  appear: Boolean,
	  css: Boolean,
	  mode: String,
	  type: String,
	  enterClass: String,
	  leaveClass: String,
	  enterToClass: String,
	  leaveToClass: String,
	  enterActiveClass: String,
	  leaveActiveClass: String,
	  appearClass: String,
	  appearActiveClass: String,
	  appearToClass: String,
	  duration: [Number, String, Object]
	}; // in case the child is also an abstract component, e.g. <keep-alive>
	// we want to recursively retrieve the real component to be rendered

	function getRealChild(vnode) {
	  var compOptions = vnode && vnode.componentOptions;

	  if (compOptions && compOptions.Ctor.options.abstract) {
	    return getRealChild(getFirstComponentChild(compOptions.children));
	  } else {
	    return vnode;
	  }
	}

	function extractTransitionData(comp) {
	  var data = {};
	  var options = comp.$options; // props

	  for (var key in options.propsData) {
	    data[key] = comp[key];
	  } // events.
	  // extract listeners and pass them directly to the transition methods


	  var listeners = options._parentListeners;

	  for (var key$1 in listeners) {
	    data[camelize(key$1)] = listeners[key$1];
	  }

	  return data;
	}

	function placeholder(h, rawChild) {
	  if (/\d-keep-alive$/.test(rawChild.tag)) {
	    return h('keep-alive', {
	      props: rawChild.componentOptions.propsData
	    });
	  }
	}

	function hasParentTransition(vnode) {
	  while (vnode = vnode.parent) {
	    if (vnode.data.transition) {
	      return true;
	    }
	  }
	}

	function isSameChild(child, oldChild) {
	  return oldChild.key === child.key && oldChild.tag === child.tag;
	}

	var isNotTextNode = function isNotTextNode(c) {
	  return c.tag || isAsyncPlaceholder(c);
	};

	var isVShowDirective = function isVShowDirective(d) {
	  return d.name === 'show';
	};

	var Transition = {
	  name: 'transition',
	  props: transitionProps,
	  abstract: true,
	  render: function render(h) {
	    var this$1 = this;
	    var children = this.$slots.default;

	    if (!children) {
	      return;
	    } // filter out text nodes (possible whitespaces)


	    children = children.filter(isNotTextNode);
	    /* istanbul ignore if */

	    if (!children.length) {
	      return;
	    } // warn multiple elements


	    if ( children.length > 1) {
	      warn('<transition> can only be used on a single element. Use ' + '<transition-group> for lists.', this.$parent);
	    }

	    var mode = this.mode; // warn invalid mode

	    if ( mode && mode !== 'in-out' && mode !== 'out-in') {
	      warn('invalid <transition> mode: ' + mode, this.$parent);
	    }

	    var rawChild = children[0]; // if this is a component root node and the component's
	    // parent container node also has transition, skip.

	    if (hasParentTransition(this.$vnode)) {
	      return rawChild;
	    } // apply transition data to child
	    // use getRealChild() to ignore abstract components e.g. keep-alive


	    var child = getRealChild(rawChild);
	    /* istanbul ignore if */

	    if (!child) {
	      return rawChild;
	    }

	    if (this._leaving) {
	      return placeholder(h, rawChild);
	    } // ensure a key that is unique to the vnode type and to this transition
	    // component instance. This key will be used to remove pending leaving nodes
	    // during entering.


	    var id = "__transition-" + this._uid + "-";
	    child.key = child.key == null ? child.isComment ? id + 'comment' : id + child.tag : isPrimitive(child.key) ? String(child.key).indexOf(id) === 0 ? child.key : id + child.key : child.key;
	    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
	    var oldRawChild = this._vnode;
	    var oldChild = getRealChild(oldRawChild); // mark v-show
	    // so that the transition module can hand over the control to the directive

	    if (child.data.directives && child.data.directives.some(isVShowDirective)) {
	      child.data.show = true;
	    }

	    if (oldChild && oldChild.data && !isSameChild(child, oldChild) && !isAsyncPlaceholder(oldChild) && // #6687 component root is a comment node
	    !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)) {
	      // replace old child transition data with fresh one
	      // important for dynamic transitions!
	      var oldData = oldChild.data.transition = extend({}, data); // handle transition mode

	      if (mode === 'out-in') {
	        // return placeholder node and queue update when leave finishes
	        this._leaving = true;
	        mergeVNodeHook(oldData, 'afterLeave', function () {
	          this$1._leaving = false;
	          this$1.$forceUpdate();
	        });
	        return placeholder(h, rawChild);
	      } else if (mode === 'in-out') {
	        if (isAsyncPlaceholder(child)) {
	          return oldRawChild;
	        }

	        var delayedLeave;

	        var performLeave = function performLeave() {
	          delayedLeave();
	        };

	        mergeVNodeHook(data, 'afterEnter', performLeave);
	        mergeVNodeHook(data, 'enterCancelled', performLeave);
	        mergeVNodeHook(oldData, 'delayLeave', function (leave) {
	          delayedLeave = leave;
	        });
	      }
	    }

	    return rawChild;
	  }
	};
	/*  */

	var props = extend({
	  tag: String,
	  moveClass: String
	}, transitionProps);
	delete props.mode;
	var TransitionGroup = {
	  props: props,
	  beforeMount: function beforeMount() {
	    var this$1 = this;
	    var update = this._update;

	    this._update = function (vnode, hydrating) {
	      var restoreActiveInstance = setActiveInstance(this$1); // force removing pass

	      this$1.__patch__(this$1._vnode, this$1.kept, false, // hydrating
	      true // removeOnly (!important, avoids unnecessary moves)
	      );

	      this$1._vnode = this$1.kept;
	      restoreActiveInstance();
	      update.call(this$1, vnode, hydrating);
	    };
	  },
	  render: function render(h) {
	    var tag = this.tag || this.$vnode.data.tag || 'span';
	    var map = Object.create(null);
	    var prevChildren = this.prevChildren = this.children;
	    var rawChildren = this.$slots.default || [];
	    var children = this.children = [];
	    var transitionData = extractTransitionData(this);

	    for (var i = 0; i < rawChildren.length; i++) {
	      var c = rawChildren[i];

	      if (c.tag) {
	        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
	          children.push(c);
	          map[c.key] = c;
	          (c.data || (c.data = {})).transition = transitionData;
	        } else {
	          var opts = c.componentOptions;
	          var name = opts ? opts.Ctor.options.name || opts.tag || '' : c.tag;
	          warn("<transition-group> children must be keyed: <" + name + ">");
	        }
	      }
	    }

	    if (prevChildren) {
	      var kept = [];
	      var removed = [];

	      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
	        var c$1 = prevChildren[i$1];
	        c$1.data.transition = transitionData;
	        c$1.data.pos = c$1.elm.getBoundingClientRect();

	        if (map[c$1.key]) {
	          kept.push(c$1);
	        } else {
	          removed.push(c$1);
	        }
	      }

	      this.kept = h(tag, null, kept);
	      this.removed = removed;
	    }

	    return h(tag, null, children);
	  },
	  updated: function updated() {
	    var children = this.prevChildren;
	    var moveClass = this.moveClass || (this.name || 'v') + '-move';

	    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
	      return;
	    } // we divide the work into three loops to avoid mixing DOM reads and writes
	    // in each iteration - which helps prevent layout thrashing.


	    children.forEach(callPendingCbs);
	    children.forEach(recordPosition);
	    children.forEach(applyTranslation); // force reflow to put everything in position
	    // assign to this to avoid being removed in tree-shaking
	    // $flow-disable-line

	    this._reflow = document.body.offsetHeight;
	    children.forEach(function (c) {
	      if (c.data.moved) {
	        var el = c.elm;
	        var s = el.style;
	        addTransitionClass(el, moveClass);
	        s.transform = s.WebkitTransform = s.transitionDuration = '';
	        el.addEventListener(transitionEndEvent, el._moveCb = function cb(e) {
	          if (e && e.target !== el) {
	            return;
	          }

	          if (!e || /transform$/.test(e.propertyName)) {
	            el.removeEventListener(transitionEndEvent, cb);
	            el._moveCb = null;
	            removeTransitionClass(el, moveClass);
	          }
	        });
	      }
	    });
	  },
	  methods: {
	    hasMove: function hasMove(el, moveClass) {
	      /* istanbul ignore if */
	      if (!hasTransition) {
	        return false;
	      }
	      /* istanbul ignore if */


	      if (this._hasMove) {
	        return this._hasMove;
	      } // Detect whether an element with the move class applied has
	      // CSS transitions. Since the element may be inside an entering
	      // transition at this very moment, we make a clone of it and remove
	      // all other transition classes applied to ensure only the move class
	      // is applied.


	      var clone = el.cloneNode();

	      if (el._transitionClasses) {
	        el._transitionClasses.forEach(function (cls) {
	          removeClass(clone, cls);
	        });
	      }

	      addClass(clone, moveClass);
	      clone.style.display = 'none';
	      this.$el.appendChild(clone);
	      var info = getTransitionInfo(clone);
	      this.$el.removeChild(clone);
	      return this._hasMove = info.hasTransform;
	    }
	  }
	};

	function callPendingCbs(c) {
	  /* istanbul ignore if */
	  if (c.elm._moveCb) {
	    c.elm._moveCb();
	  }
	  /* istanbul ignore if */


	  if (c.elm._enterCb) {
	    c.elm._enterCb();
	  }
	}

	function recordPosition(c) {
	  c.data.newPos = c.elm.getBoundingClientRect();
	}

	function applyTranslation(c) {
	  var oldPos = c.data.pos;
	  var newPos = c.data.newPos;
	  var dx = oldPos.left - newPos.left;
	  var dy = oldPos.top - newPos.top;

	  if (dx || dy) {
	    c.data.moved = true;
	    var s = c.elm.style;
	    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
	    s.transitionDuration = '0s';
	  }
	}

	var platformComponents = {
	  Transition: Transition,
	  TransitionGroup: TransitionGroup
	};
	/*  */
	// install platform specific utils

	Vue.config.mustUseProp = mustUseProp;
	Vue.config.isReservedTag = isReservedTag;
	Vue.config.isReservedAttr = isReservedAttr;
	Vue.config.getTagNamespace = getTagNamespace;
	Vue.config.isUnknownElement = isUnknownElement; // install platform runtime directives & components

	extend(Vue.options.directives, platformDirectives);
	extend(Vue.options.components, platformComponents); // install platform patch function

	Vue.prototype.__patch__ = inBrowser ? patch : noop; // public mount method

	Vue.prototype.$mount = function (el, hydrating) {
	  el = el && inBrowser ? query(el) : undefined;
	  return mountComponent(this, el, hydrating);
	}; // devtools global hook

	/* istanbul ignore next */


	if (inBrowser) {
	  setTimeout(function () {
	    if (config.devtools) {
	      if (devtools) {
	        devtools.emit('init', Vue);
	      } else {
	        console[console.info ? 'info' : 'log']('Download the Vue Devtools extension for a better development experience:\n' + 'https://github.com/vuejs/vue-devtools');
	      }
	    }

	    if ( config.productionTip !== false && typeof console !== 'undefined') {
	      console[console.info ? 'info' : 'log']("You are running Vue in development mode.\n" + "Make sure to turn on production mode when deploying for production.\n" + "See more tips at https://vuejs.org/guide/deployment.html");
	    }
	  }, 0);
	}

	var script = Vue.extend({
	  name: 'TestComponent',
	  data: function data() {
	    return {
	      title: 'Test component'
	    };
	  },
	  computed: {
	    dateTime: function dateTime() {
	      return new Date();
	    }
	  }
	});

	function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
	/* server only */
	, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
	  if (typeof shadowMode !== 'boolean') {
	    createInjectorSSR = createInjector;
	    createInjector = shadowMode;
	    shadowMode = false;
	  } // Vue.extend constructor export interop.


	  var options = typeof script === 'function' ? script.options : script; // render functions

	  if (template && template.render) {
	    options.render = template.render;
	    options.staticRenderFns = template.staticRenderFns;
	    options._compiled = true; // functional template

	    if (isFunctionalTemplate) {
	      options.functional = true;
	    }
	  } // scopedId


	  if (scopeId) {
	    options._scopeId = scopeId;
	  }

	  var hook;

	  if (moduleIdentifier) {
	    // server build
	    hook = function hook(context) {
	      // 2.3 injection
	      context = context || // cached call
	      this.$vnode && this.$vnode.ssrContext || // stateful
	      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
	      // 2.2 with runInNewContext: true

	      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
	        context = __VUE_SSR_CONTEXT__;
	      } // inject component styles


	      if (style) {
	        style.call(this, createInjectorSSR(context));
	      } // register component module identifier for async chunk inference


	      if (context && context._registeredComponents) {
	        context._registeredComponents.add(moduleIdentifier);
	      }
	    }; // used by ssr in case component is cached and beforeCreate
	    // never gets called


	    options._ssrRegister = hook;
	  } else if (style) {
	    hook = shadowMode ? function () {
	      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
	    } : function (context) {
	      style.call(this, createInjector(context));
	    };
	  }

	  if (hook) {
	    if (options.functional) {
	      // register for functional component in vue file
	      var originalRender = options.render;

	      options.render = function renderWithStyleInjection(h, context) {
	        hook.call(context);
	        return originalRender(h, context);
	      };
	    } else {
	      // inject component registration as beforeCreate hook
	      var existing = options.beforeCreate;
	      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
	    }
	  }

	  return script;
	}

	var normalizeComponent_1 = normalizeComponent;

	/* script */
	const __vue_script__ = script;

	/* template */
	var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('h1',{domProps:{"textContent":_vm._s(_vm.title)}}),_vm._v(" "),_c('p',{domProps:{"textContent":_vm._s(_vm.dateTime)}})])};
	var __vue_staticRenderFns__ = [];

	  /* style */
	  const __vue_inject_styles__ = undefined;
	  /* scoped */
	  const __vue_scope_id__ = "data-v-0de7adaa";
	  /* module identifier */
	  const __vue_module_identifier__ = undefined;
	  /* functional template */
	  const __vue_is_functional_template__ = false;
	  /* style inject */
	  
	  /* style inject SSR */
	  

	  
	  var TestComponent = normalizeComponent_1(
	    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
	    __vue_inject_styles__,
	    __vue_script__,
	    __vue_scope_id__,
	    __vue_is_functional_template__,
	    __vue_module_identifier__,
	    undefined,
	    undefined
	  );

	var version$1 = '1.0.3';

	var install = function install(Vue) {
	  /*
	   * NOTE:
	   *   if you need to extend Vue contstructor, you can extend it in here.
	   */
	  Vue.prototype.$add = function (a, b) {
	    return a + b;
	  };

	  Vue.component('TestComponent', TestComponent); // Usage:
	  // {{ $add(1, 1) }}

	  /*
	   * NOTE:
	   *  somthing implementation here ...
	   */
	};

	var plugin = {
	  install: install,
	  version: version$1
	};

	if (typeof window !== 'undefined' && window.Vue) {
	  window.Vue.use(plugin);
	}

	return plugin;

})));
