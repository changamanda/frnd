/*!
 * jQuery JavaScript Library v1.11.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-05-01T17:42Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var deletedIds = [];

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.11.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		return !jQuery.isArray( obj ) && obj - parseFloat( obj ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( support.ownLast ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v1.10.19
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-04-18
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( documentIsHTML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== strundefined && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare,
		doc = node ? node.ownerDocument || node : preferredDoc,
		parent = doc.defaultView;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsHTML = !isXML( doc );

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", function() {
				setDocument();
			}, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", function() {
				setDocument();
			});
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if getElementsByClassName can be trusted
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName ) && assert(function( div ) {
		div.innerHTML = "<div class='a'></div><div class='a i'></div>";

		// Support: Safari<4
		// Catch class over-caching
		div.firstChild.className = "i";
		// Support: Opera<10
		// Catch gEBCN failure to find non-leading classes
		return div.getElementsByClassName("i").length === 2;
	});

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select msallowclip=''><option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowclip^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !(--remaining) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};


var strundefined = typeof undefined;



// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownLast = i !== "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery(function() {
	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {
		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== strundefined ) {
		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {
			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
});




(function() {
	var div = document.createElement( "div" );

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( elem ) {
	var noData = jQuery.noData[ (elem.nodeName + " ").toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute("classid") === noData;
};


var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,
		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[0],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each(function() {
				jQuery.data( this, key, value );
			}) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};



// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[0], key ) : emptyGet;
};
var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	// Minified: var a,b,c
	var input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		fragment = document.createDocumentFragment();

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );
	div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	support.noCloneEvent = true;
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}
})();


(function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
	for ( i in { submit: true, change: true, focusin: true }) {
		eventName = "on" + i;

		if ( !(support[ i + "Bubbles" ] = eventName in window) ) {
			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i + "Bubbles" ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!support.noCloneEvent || !support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}


(function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== strundefined ) {
			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

})();
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );



var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			var condition = conditionFn();

			if ( condition == null ) {
				// The test was not ready at this point; screw the hook this time
				// but check again when needed next time.
				return;
			}

			if ( condition ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	// Minified: var b,c,d,e,f,g, h,i
	var div, style, a, pixelPositionVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal;

	// Setup
	div = document.createElement( "div" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];
	style = a && a.style;

	// Finish early in limited (non-browser) environments
	if ( !style ) {
		return;
	}

	style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = style.boxSizing === "" || style.MozBoxSizing === "" ||
		style.WebkitBoxSizing === "";

	jQuery.extend(support, {
		reliableHiddenOffsets: function() {
			if ( reliableHiddenOffsetsVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		// Support: Android 2.3
		reliableMarginRight: function() {
			if ( reliableMarginRightVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		}
	});

	function computeStyleTests() {
		// Minified: var b,c,d,j
		var div, body, container, contents;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = false;
		reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			boxSizingReliableVal =
				( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Support: Android 2.3
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents, null ) || {} ).marginRight );
		}

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		contents = div.getElementsByTagName( "td" );
		contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
		reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		if ( reliableHiddenOffsetsVal ) {
			contents[ 0 ].style.display = "";
			contents[ 1 ].style.display = "none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		}

		body.removeChild( container );
	}

})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,

	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	// Minified: var a,b,c,d,e
	var input, div, select, a, opt;

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName("a")[ 0 ];

	// First batch of tests.
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
})();


var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// Retrieve booleans specially
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		} :
		function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {
	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {
		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	}) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
		(!support.reliableHiddenOffsets() &&
			((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
	// Support: IE6+
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		return !this.isLocal &&

			// Support: IE7-8
			// oldIE XHR does not support non-RFC2616 methods (#13240)
			// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
			// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
			// Although this check for six methods instead of eight
			// since IE also does not support "trace" and "connect"
			/^(get|post|head|put|delete|options)$/i.test( this.type ) &&

			createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
if ( window.ActiveXObject ) {
	jQuery( window ).on( "unload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	});
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( options ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch( e ) {
									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;
								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					if ( !options.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};





var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote], a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not(form button), button[data-confirm]:not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]),textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[type=file]',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = $('meta[name="csrf-token"]').attr('content');
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // making sure that all forms have actual up-to-date token(cached forms contain old one)
    refreshCSRFTokens: function(){
      var csrfToken = $('meta[name=csrf-token]').attr('content');
      var csrfParam = $('meta[name=csrf-param]').attr('content');
      $('form input[name="' + csrfParam + '"]').val(csrfToken);
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element.attr('href');
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, elCrossDomain, crossDomain, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        elCrossDomain = element.data('cross-domain');
        crossDomain = elCrossDomain === undefined ? null : elCrossDomain;
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.attr('method');
          url = element.attr('action');
          data = element.serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: crossDomain
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = $('meta[name=csrf-token]').attr('content'),
        csrfParam = $('meta[name=csrf-param]').attr('content'),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      element.data('ujs:enable-with', element[method]());
      if (replacement !== undefined) {
        element[method](replacement);
      }

      element.prop('disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with')) element[method](element.data('ujs:enable-with'));
      element.prop('disabled', false);
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        answer = rails.confirm(message);
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var inputs = $(), input, valueToCheck,
          selector = specifiedSelector || 'input,textarea',
          allInputs = form.find(selector);

      allInputs.each(function() {
        input = $(this);
        valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : input.val();
        // If nonBlank and valueToCheck are both truthy, or nonBlank and valueToCheck are both falsey
        if (!valueToCheck === !nonBlank) {

          // Don't count unchecked required radio if other radio with same name is checked
          if (input.is('input[type=radio]') && allInputs.filter('input[type=radio]:checked[name="' + input.attr('name') + '"]').length) {
            return true; // Skip to next input
          }

          inputs = inputs.add(input);
        }
      });
      return inputs.length ? inputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      element.data('ujs:enable-with', element.html()); // store enabled state
      if (replacement !== undefined) {
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
    },

    // restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on("pageshow.rails", function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data("ujs:enable-with")) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data("ujs:enable-with")) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.delegate(rails.linkDisableSelector, 'ajax:complete', function() {
        rails.enableElement($(this));
    });

    $document.delegate(rails.buttonDisableSelector, 'ajax:complete', function() {
        rails.enableFormElement($(this));
    });

    $document.delegate(rails.linkClickSelector, 'click.rails', function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (link.data('remote') !== undefined) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.error( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.delegate(rails.buttonClickSelector, 'click.rails', function(e) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.error( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.delegate(rails.inputChangeSelector, 'change.rails', function(e) {
      var link = $(this);
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.delegate(rails.formSubmitSelector, 'submit.rails', function(e) {
      var form = $(this),
        remote = form.data('remote') !== undefined,
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') == undefined) {
        blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector);
        if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
          return rails.stopEverything(e);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.delegate(rails.formInputClickSelector, 'click.rails', function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      button.closest('form').data('ujs:submit-button', data);
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:send.rails', function(event) {
      if (this == event.target) rails.disableFormElements($(this));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:complete.rails', function(event) {
      if (this == event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
//! moment.js
//! version : 2.8.3
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com

(function (undefined) {
    /************************************
        Constants
    ************************************/

    var moment,
        VERSION = '2.8.3',
        // the global-scope this is NOT the global object in Node.js
        globalScope = typeof global !== 'undefined' ? global : this,
        oldGlobalMoment,
        round = Math.round,
        hasOwnProperty = Object.prototype.hasOwnProperty,
        i,

        YEAR = 0,
        MONTH = 1,
        DATE = 2,
        HOUR = 3,
        MINUTE = 4,
        SECOND = 5,
        MILLISECOND = 6,

        // internal storage for locale config files
        locales = {},

        // extra moment internal properties (plugins register props here)
        momentProperties = [],

        // check for nodeJS
        hasModule = (typeof module !== 'undefined' && module.exports),

        // ASP.NET json date format regex
        aspNetJsonRegex = /^\/?Date\((\-?\d+)/i,
        aspNetTimeSpanJsonRegex = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/,

        // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
        // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
        isoDurationRegex = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/,

        // format tokens
        formattingTokens = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|X|zz?|ZZ?|.)/g,
        localFormattingTokens = /(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g,

        // parsing token regexes
        parseTokenOneOrTwoDigits = /\d\d?/, // 0 - 99
        parseTokenOneToThreeDigits = /\d{1,3}/, // 0 - 999
        parseTokenOneToFourDigits = /\d{1,4}/, // 0 - 9999
        parseTokenOneToSixDigits = /[+\-]?\d{1,6}/, // -999,999 - 999,999
        parseTokenDigits = /\d+/, // nonzero number of digits
        parseTokenWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, // any word (or two) characters or numbers including two/three word month in arabic.
        parseTokenTimezone = /Z|[\+\-]\d\d:?\d\d/gi, // +00:00 -00:00 +0000 -0000 or Z
        parseTokenT = /T/i, // T (ISO separator)
        parseTokenTimestampMs = /[\+\-]?\d+(\.\d{1,3})?/, // 123456789 123456789.123
        parseTokenOrdinal = /\d{1,2}/,

        //strict parsing regexes
        parseTokenOneDigit = /\d/, // 0 - 9
        parseTokenTwoDigits = /\d\d/, // 00 - 99
        parseTokenThreeDigits = /\d{3}/, // 000 - 999
        parseTokenFourDigits = /\d{4}/, // 0000 - 9999
        parseTokenSixDigits = /[+-]?\d{6}/, // -999,999 - 999,999
        parseTokenSignedNumber = /[+-]?\d+/, // -inf - inf

        // iso 8601 regex
        // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
        isoRegex = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,

        isoFormat = 'YYYY-MM-DDTHH:mm:ssZ',

        isoDates = [
            ['YYYYYY-MM-DD', /[+-]\d{6}-\d{2}-\d{2}/],
            ['YYYY-MM-DD', /\d{4}-\d{2}-\d{2}/],
            ['GGGG-[W]WW-E', /\d{4}-W\d{2}-\d/],
            ['GGGG-[W]WW', /\d{4}-W\d{2}/],
            ['YYYY-DDD', /\d{4}-\d{3}/]
        ],

        // iso time formats and regexes
        isoTimes = [
            ['HH:mm:ss.SSSS', /(T| )\d\d:\d\d:\d\d\.\d+/],
            ['HH:mm:ss', /(T| )\d\d:\d\d:\d\d/],
            ['HH:mm', /(T| )\d\d:\d\d/],
            ['HH', /(T| )\d\d/]
        ],

        // timezone chunker '+10:00' > ['10', '00'] or '-1530' > ['-15', '30']
        parseTimezoneChunker = /([\+\-]|\d\d)/gi,

        // getter and setter names
        proxyGettersAndSetters = 'Date|Hours|Minutes|Seconds|Milliseconds'.split('|'),
        unitMillisecondFactors = {
            'Milliseconds' : 1,
            'Seconds' : 1e3,
            'Minutes' : 6e4,
            'Hours' : 36e5,
            'Days' : 864e5,
            'Months' : 2592e6,
            'Years' : 31536e6
        },

        unitAliases = {
            ms : 'millisecond',
            s : 'second',
            m : 'minute',
            h : 'hour',
            d : 'day',
            D : 'date',
            w : 'week',
            W : 'isoWeek',
            M : 'month',
            Q : 'quarter',
            y : 'year',
            DDD : 'dayOfYear',
            e : 'weekday',
            E : 'isoWeekday',
            gg: 'weekYear',
            GG: 'isoWeekYear'
        },

        camelFunctions = {
            dayofyear : 'dayOfYear',
            isoweekday : 'isoWeekday',
            isoweek : 'isoWeek',
            weekyear : 'weekYear',
            isoweekyear : 'isoWeekYear'
        },

        // format function strings
        formatFunctions = {},

        // default relative time thresholds
        relativeTimeThresholds = {
            s: 45,  // seconds to minute
            m: 45,  // minutes to hour
            h: 22,  // hours to day
            d: 26,  // days to month
            M: 11   // months to year
        },

        // tokens to ordinalize and pad
        ordinalizeTokens = 'DDD w W M D d'.split(' '),
        paddedTokens = 'M D H h m s w W'.split(' '),

        formatTokenFunctions = {
            M    : function () {
                return this.month() + 1;
            },
            MMM  : function (format) {
                return this.localeData().monthsShort(this, format);
            },
            MMMM : function (format) {
                return this.localeData().months(this, format);
            },
            D    : function () {
                return this.date();
            },
            DDD  : function () {
                return this.dayOfYear();
            },
            d    : function () {
                return this.day();
            },
            dd   : function (format) {
                return this.localeData().weekdaysMin(this, format);
            },
            ddd  : function (format) {
                return this.localeData().weekdaysShort(this, format);
            },
            dddd : function (format) {
                return this.localeData().weekdays(this, format);
            },
            w    : function () {
                return this.week();
            },
            W    : function () {
                return this.isoWeek();
            },
            YY   : function () {
                return leftZeroFill(this.year() % 100, 2);
            },
            YYYY : function () {
                return leftZeroFill(this.year(), 4);
            },
            YYYYY : function () {
                return leftZeroFill(this.year(), 5);
            },
            YYYYYY : function () {
                var y = this.year(), sign = y >= 0 ? '+' : '-';
                return sign + leftZeroFill(Math.abs(y), 6);
            },
            gg   : function () {
                return leftZeroFill(this.weekYear() % 100, 2);
            },
            gggg : function () {
                return leftZeroFill(this.weekYear(), 4);
            },
            ggggg : function () {
                return leftZeroFill(this.weekYear(), 5);
            },
            GG   : function () {
                return leftZeroFill(this.isoWeekYear() % 100, 2);
            },
            GGGG : function () {
                return leftZeroFill(this.isoWeekYear(), 4);
            },
            GGGGG : function () {
                return leftZeroFill(this.isoWeekYear(), 5);
            },
            e : function () {
                return this.weekday();
            },
            E : function () {
                return this.isoWeekday();
            },
            a    : function () {
                return this.localeData().meridiem(this.hours(), this.minutes(), true);
            },
            A    : function () {
                return this.localeData().meridiem(this.hours(), this.minutes(), false);
            },
            H    : function () {
                return this.hours();
            },
            h    : function () {
                return this.hours() % 12 || 12;
            },
            m    : function () {
                return this.minutes();
            },
            s    : function () {
                return this.seconds();
            },
            S    : function () {
                return toInt(this.milliseconds() / 100);
            },
            SS   : function () {
                return leftZeroFill(toInt(this.milliseconds() / 10), 2);
            },
            SSS  : function () {
                return leftZeroFill(this.milliseconds(), 3);
            },
            SSSS : function () {
                return leftZeroFill(this.milliseconds(), 3);
            },
            Z    : function () {
                var a = -this.zone(),
                    b = '+';
                if (a < 0) {
                    a = -a;
                    b = '-';
                }
                return b + leftZeroFill(toInt(a / 60), 2) + ':' + leftZeroFill(toInt(a) % 60, 2);
            },
            ZZ   : function () {
                var a = -this.zone(),
                    b = '+';
                if (a < 0) {
                    a = -a;
                    b = '-';
                }
                return b + leftZeroFill(toInt(a / 60), 2) + leftZeroFill(toInt(a) % 60, 2);
            },
            z : function () {
                return this.zoneAbbr();
            },
            zz : function () {
                return this.zoneName();
            },
            X    : function () {
                return this.unix();
            },
            Q : function () {
                return this.quarter();
            }
        },

        deprecations = {},

        lists = ['months', 'monthsShort', 'weekdays', 'weekdaysShort', 'weekdaysMin'];

    // Pick the first defined of two or three arguments. dfl comes from
    // default.
    function dfl(a, b, c) {
        switch (arguments.length) {
            case 2: return a != null ? a : b;
            case 3: return a != null ? a : b != null ? b : c;
            default: throw new Error('Implement me');
        }
    }

    function hasOwnProp(a, b) {
        return hasOwnProperty.call(a, b);
    }

    function defaultParsingFlags() {
        // We need to deep clone this object, and es5 standard is not very
        // helpful.
        return {
            empty : false,
            unusedTokens : [],
            unusedInput : [],
            overflow : -2,
            charsLeftOver : 0,
            nullInput : false,
            invalidMonth : null,
            invalidFormat : false,
            userInvalidated : false,
            iso: false
        };
    }

    function printMsg(msg) {
        if (moment.suppressDeprecationWarnings === false &&
                typeof console !== 'undefined' && console.warn) {
            console.warn('Deprecation warning: ' + msg);
        }
    }

    function deprecate(msg, fn) {
        var firstTime = true;
        return extend(function () {
            if (firstTime) {
                printMsg(msg);
                firstTime = false;
            }
            return fn.apply(this, arguments);
        }, fn);
    }

    function deprecateSimple(name, msg) {
        if (!deprecations[name]) {
            printMsg(msg);
            deprecations[name] = true;
        }
    }

    function padToken(func, count) {
        return function (a) {
            return leftZeroFill(func.call(this, a), count);
        };
    }
    function ordinalizeToken(func, period) {
        return function (a) {
            return this.localeData().ordinal(func.call(this, a), period);
        };
    }

    while (ordinalizeTokens.length) {
        i = ordinalizeTokens.pop();
        formatTokenFunctions[i + 'o'] = ordinalizeToken(formatTokenFunctions[i], i);
    }
    while (paddedTokens.length) {
        i = paddedTokens.pop();
        formatTokenFunctions[i + i] = padToken(formatTokenFunctions[i], 2);
    }
    formatTokenFunctions.DDDD = padToken(formatTokenFunctions.DDD, 3);


    /************************************
        Constructors
    ************************************/

    function Locale() {
    }

    // Moment prototype object
    function Moment(config, skipOverflow) {
        if (skipOverflow !== false) {
            checkOverflow(config);
        }
        copyConfig(this, config);
        this._d = new Date(+config._d);
    }

    // Duration Constructor
    function Duration(duration) {
        var normalizedInput = normalizeObjectUnits(duration),
            years = normalizedInput.year || 0,
            quarters = normalizedInput.quarter || 0,
            months = normalizedInput.month || 0,
            weeks = normalizedInput.week || 0,
            days = normalizedInput.day || 0,
            hours = normalizedInput.hour || 0,
            minutes = normalizedInput.minute || 0,
            seconds = normalizedInput.second || 0,
            milliseconds = normalizedInput.millisecond || 0;

        // representation for dateAddRemove
        this._milliseconds = +milliseconds +
            seconds * 1e3 + // 1000
            minutes * 6e4 + // 1000 * 60
            hours * 36e5; // 1000 * 60 * 60
        // Because of dateAddRemove treats 24 hours as different from a
        // day when working around DST, we need to store them separately
        this._days = +days +
            weeks * 7;
        // It is impossible translate months into days without knowing
        // which months you are are talking about, so we have to store
        // it separately.
        this._months = +months +
            quarters * 3 +
            years * 12;

        this._data = {};

        this._locale = moment.localeData();

        this._bubble();
    }

    /************************************
        Helpers
    ************************************/


    function extend(a, b) {
        for (var i in b) {
            if (hasOwnProp(b, i)) {
                a[i] = b[i];
            }
        }

        if (hasOwnProp(b, 'toString')) {
            a.toString = b.toString;
        }

        if (hasOwnProp(b, 'valueOf')) {
            a.valueOf = b.valueOf;
        }

        return a;
    }

    function copyConfig(to, from) {
        var i, prop, val;

        if (typeof from._isAMomentObject !== 'undefined') {
            to._isAMomentObject = from._isAMomentObject;
        }
        if (typeof from._i !== 'undefined') {
            to._i = from._i;
        }
        if (typeof from._f !== 'undefined') {
            to._f = from._f;
        }
        if (typeof from._l !== 'undefined') {
            to._l = from._l;
        }
        if (typeof from._strict !== 'undefined') {
            to._strict = from._strict;
        }
        if (typeof from._tzm !== 'undefined') {
            to._tzm = from._tzm;
        }
        if (typeof from._isUTC !== 'undefined') {
            to._isUTC = from._isUTC;
        }
        if (typeof from._offset !== 'undefined') {
            to._offset = from._offset;
        }
        if (typeof from._pf !== 'undefined') {
            to._pf = from._pf;
        }
        if (typeof from._locale !== 'undefined') {
            to._locale = from._locale;
        }

        if (momentProperties.length > 0) {
            for (i in momentProperties) {
                prop = momentProperties[i];
                val = from[prop];
                if (typeof val !== 'undefined') {
                    to[prop] = val;
                }
            }
        }

        return to;
    }

    function absRound(number) {
        if (number < 0) {
            return Math.ceil(number);
        } else {
            return Math.floor(number);
        }
    }

    // left zero fill a number
    // see http://jsperf.com/left-zero-filling for performance comparison
    function leftZeroFill(number, targetLength, forceSign) {
        var output = '' + Math.abs(number),
            sign = number >= 0;

        while (output.length < targetLength) {
            output = '0' + output;
        }
        return (sign ? (forceSign ? '+' : '') : '-') + output;
    }

    function positiveMomentsDifference(base, other) {
        var res = {milliseconds: 0, months: 0};

        res.months = other.month() - base.month() +
            (other.year() - base.year()) * 12;
        if (base.clone().add(res.months, 'M').isAfter(other)) {
            --res.months;
        }

        res.milliseconds = +other - +(base.clone().add(res.months, 'M'));

        return res;
    }

    function momentsDifference(base, other) {
        var res;
        other = makeAs(other, base);
        if (base.isBefore(other)) {
            res = positiveMomentsDifference(base, other);
        } else {
            res = positiveMomentsDifference(other, base);
            res.milliseconds = -res.milliseconds;
            res.months = -res.months;
        }

        return res;
    }

    // TODO: remove 'name' arg after deprecation is removed
    function createAdder(direction, name) {
        return function (val, period) {
            var dur, tmp;
            //invert the arguments, but complain about it
            if (period !== null && !isNaN(+period)) {
                deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period).');
                tmp = val; val = period; period = tmp;
            }

            val = typeof val === 'string' ? +val : val;
            dur = moment.duration(val, period);
            addOrSubtractDurationFromMoment(this, dur, direction);
            return this;
        };
    }

    function addOrSubtractDurationFromMoment(mom, duration, isAdding, updateOffset) {
        var milliseconds = duration._milliseconds,
            days = duration._days,
            months = duration._months;
        updateOffset = updateOffset == null ? true : updateOffset;

        if (milliseconds) {
            mom._d.setTime(+mom._d + milliseconds * isAdding);
        }
        if (days) {
            rawSetter(mom, 'Date', rawGetter(mom, 'Date') + days * isAdding);
        }
        if (months) {
            rawMonthSetter(mom, rawGetter(mom, 'Month') + months * isAdding);
        }
        if (updateOffset) {
            moment.updateOffset(mom, days || months);
        }
    }

    // check if is an array
    function isArray(input) {
        return Object.prototype.toString.call(input) === '[object Array]';
    }

    function isDate(input) {
        return Object.prototype.toString.call(input) === '[object Date]' ||
            input instanceof Date;
    }

    // compare two arrays, return the number of differences
    function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length),
            lengthDiff = Math.abs(array1.length - array2.length),
            diffs = 0,
            i;
        for (i = 0; i < len; i++) {
            if ((dontConvert && array1[i] !== array2[i]) ||
                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
                diffs++;
            }
        }
        return diffs + lengthDiff;
    }

    function normalizeUnits(units) {
        if (units) {
            var lowered = units.toLowerCase().replace(/(.)s$/, '$1');
            units = unitAliases[units] || camelFunctions[lowered] || lowered;
        }
        return units;
    }

    function normalizeObjectUnits(inputObject) {
        var normalizedInput = {},
            normalizedProp,
            prop;

        for (prop in inputObject) {
            if (hasOwnProp(inputObject, prop)) {
                normalizedProp = normalizeUnits(prop);
                if (normalizedProp) {
                    normalizedInput[normalizedProp] = inputObject[prop];
                }
            }
        }

        return normalizedInput;
    }

    function makeList(field) {
        var count, setter;

        if (field.indexOf('week') === 0) {
            count = 7;
            setter = 'day';
        }
        else if (field.indexOf('month') === 0) {
            count = 12;
            setter = 'month';
        }
        else {
            return;
        }

        moment[field] = function (format, index) {
            var i, getter,
                method = moment._locale[field],
                results = [];

            if (typeof format === 'number') {
                index = format;
                format = undefined;
            }

            getter = function (i) {
                var m = moment().utc().set(setter, i);
                return method.call(moment._locale, m, format || '');
            };

            if (index != null) {
                return getter(index);
            }
            else {
                for (i = 0; i < count; i++) {
                    results.push(getter(i));
                }
                return results;
            }
        };
    }

    function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion,
            value = 0;

        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
            if (coercedNumber >= 0) {
                value = Math.floor(coercedNumber);
            } else {
                value = Math.ceil(coercedNumber);
            }
        }

        return value;
    }

    function daysInMonth(year, month) {
        return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
    }

    function weeksInYear(year, dow, doy) {
        return weekOfYear(moment([year, 11, 31 + dow - doy]), dow, doy).week;
    }

    function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
    }

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    function checkOverflow(m) {
        var overflow;
        if (m._a && m._pf.overflow === -2) {
            overflow =
                m._a[MONTH] < 0 || m._a[MONTH] > 11 ? MONTH :
                m._a[DATE] < 1 || m._a[DATE] > daysInMonth(m._a[YEAR], m._a[MONTH]) ? DATE :
                m._a[HOUR] < 0 || m._a[HOUR] > 23 ? HOUR :
                m._a[MINUTE] < 0 || m._a[MINUTE] > 59 ? MINUTE :
                m._a[SECOND] < 0 || m._a[SECOND] > 59 ? SECOND :
                m._a[MILLISECOND] < 0 || m._a[MILLISECOND] > 999 ? MILLISECOND :
                -1;

            if (m._pf._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
                overflow = DATE;
            }

            m._pf.overflow = overflow;
        }
    }

    function isValid(m) {
        if (m._isValid == null) {
            m._isValid = !isNaN(m._d.getTime()) &&
                m._pf.overflow < 0 &&
                !m._pf.empty &&
                !m._pf.invalidMonth &&
                !m._pf.nullInput &&
                !m._pf.invalidFormat &&
                !m._pf.userInvalidated;

            if (m._strict) {
                m._isValid = m._isValid &&
                    m._pf.charsLeftOver === 0 &&
                    m._pf.unusedTokens.length === 0;
            }
        }
        return m._isValid;
    }

    function normalizeLocale(key) {
        return key ? key.toLowerCase().replace('_', '-') : key;
    }

    // pick the locale from the array
    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
    function chooseLocale(names) {
        var i = 0, j, next, locale, split;

        while (i < names.length) {
            split = normalizeLocale(names[i]).split('-');
            j = split.length;
            next = normalizeLocale(names[i + 1]);
            next = next ? next.split('-') : null;
            while (j > 0) {
                locale = loadLocale(split.slice(0, j).join('-'));
                if (locale) {
                    return locale;
                }
                if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                    //the next array item is better than a shallower substring of this one
                    break;
                }
                j--;
            }
            i++;
        }
        return null;
    }

    function loadLocale(name) {
        var oldLocale = null;
        if (!locales[name] && hasModule) {
            try {
                oldLocale = moment.locale();
                require('./locale/' + name);
                // because defineLocale currently also sets the global locale, we want to undo that for lazy loaded locales
                moment.locale(oldLocale);
            } catch (e) { }
        }
        return locales[name];
    }

    // Return a moment from input, that is local/utc/zone equivalent to model.
    function makeAs(input, model) {
        return model._isUTC ? moment(input).zone(model._offset || 0) :
            moment(input).local();
    }

    /************************************
        Locale
    ************************************/


    extend(Locale.prototype, {

        set : function (config) {
            var prop, i;
            for (i in config) {
                prop = config[i];
                if (typeof prop === 'function') {
                    this[i] = prop;
                } else {
                    this['_' + i] = prop;
                }
            }
        },

        _months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
        months : function (m) {
            return this._months[m.month()];
        },

        _monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
        monthsShort : function (m) {
            return this._monthsShort[m.month()];
        },

        monthsParse : function (monthName) {
            var i, mom, regex;

            if (!this._monthsParse) {
                this._monthsParse = [];
            }

            for (i = 0; i < 12; i++) {
                // make the regex if we don't have it already
                if (!this._monthsParse[i]) {
                    mom = moment.utc([2000, i]);
                    regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                    this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
                }
                // test the regex
                if (this._monthsParse[i].test(monthName)) {
                    return i;
                }
            }
        },

        _weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
        weekdays : function (m) {
            return this._weekdays[m.day()];
        },

        _weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
        weekdaysShort : function (m) {
            return this._weekdaysShort[m.day()];
        },

        _weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
        weekdaysMin : function (m) {
            return this._weekdaysMin[m.day()];
        },

        weekdaysParse : function (weekdayName) {
            var i, mom, regex;

            if (!this._weekdaysParse) {
                this._weekdaysParse = [];
            }

            for (i = 0; i < 7; i++) {
                // make the regex if we don't have it already
                if (!this._weekdaysParse[i]) {
                    mom = moment([2000, 1]).day(i);
                    regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
                    this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
                }
                // test the regex
                if (this._weekdaysParse[i].test(weekdayName)) {
                    return i;
                }
            }
        },

        _longDateFormat : {
            LT : 'h:mm A',
            L : 'MM/DD/YYYY',
            LL : 'MMMM D, YYYY',
            LLL : 'MMMM D, YYYY LT',
            LLLL : 'dddd, MMMM D, YYYY LT'
        },
        longDateFormat : function (key) {
            var output = this._longDateFormat[key];
            if (!output && this._longDateFormat[key.toUpperCase()]) {
                output = this._longDateFormat[key.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function (val) {
                    return val.slice(1);
                });
                this._longDateFormat[key] = output;
            }
            return output;
        },

        isPM : function (input) {
            // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
            // Using charAt should be more compatible.
            return ((input + '').toLowerCase().charAt(0) === 'p');
        },

        _meridiemParse : /[ap]\.?m?\.?/i,
        meridiem : function (hours, minutes, isLower) {
            if (hours > 11) {
                return isLower ? 'pm' : 'PM';
            } else {
                return isLower ? 'am' : 'AM';
            }
        },

        _calendar : {
            sameDay : '[Today at] LT',
            nextDay : '[Tomorrow at] LT',
            nextWeek : 'dddd [at] LT',
            lastDay : '[Yesterday at] LT',
            lastWeek : '[Last] dddd [at] LT',
            sameElse : 'L'
        },
        calendar : function (key, mom) {
            var output = this._calendar[key];
            return typeof output === 'function' ? output.apply(mom) : output;
        },

        _relativeTime : {
            future : 'in %s',
            past : '%s ago',
            s : 'a few seconds',
            m : 'a minute',
            mm : '%d minutes',
            h : 'an hour',
            hh : '%d hours',
            d : 'a day',
            dd : '%d days',
            M : 'a month',
            MM : '%d months',
            y : 'a year',
            yy : '%d years'
        },

        relativeTime : function (number, withoutSuffix, string, isFuture) {
            var output = this._relativeTime[string];
            return (typeof output === 'function') ?
                output(number, withoutSuffix, string, isFuture) :
                output.replace(/%d/i, number);
        },

        pastFuture : function (diff, output) {
            var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
            return typeof format === 'function' ? format(output) : format.replace(/%s/i, output);
        },

        ordinal : function (number) {
            return this._ordinal.replace('%d', number);
        },
        _ordinal : '%d',

        preparse : function (string) {
            return string;
        },

        postformat : function (string) {
            return string;
        },

        week : function (mom) {
            return weekOfYear(mom, this._week.dow, this._week.doy).week;
        },

        _week : {
            dow : 0, // Sunday is the first day of the week.
            doy : 6  // The week that contains Jan 1st is the first week of the year.
        },

        _invalidDate: 'Invalid date',
        invalidDate: function () {
            return this._invalidDate;
        }
    });

    /************************************
        Formatting
    ************************************/


    function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) {
            return input.replace(/^\[|\]$/g, '');
        }
        return input.replace(/\\/g, '');
    }

    function makeFormatFunction(format) {
        var array = format.match(formattingTokens), i, length;

        for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
                array[i] = formatTokenFunctions[array[i]];
            } else {
                array[i] = removeFormattingTokens(array[i]);
            }
        }

        return function (mom) {
            var output = '';
            for (i = 0; i < length; i++) {
                output += array[i] instanceof Function ? array[i].call(mom, format) : array[i];
            }
            return output;
        };
    }

    // format date using native date object
    function formatMoment(m, format) {
        if (!m.isValid()) {
            return m.localeData().invalidDate();
        }

        format = expandFormat(format, m.localeData());

        if (!formatFunctions[format]) {
            formatFunctions[format] = makeFormatFunction(format);
        }

        return formatFunctions[format](m);
    }

    function expandFormat(format, locale) {
        var i = 5;

        function replaceLongDateFormatTokens(input) {
            return locale.longDateFormat(input) || input;
        }

        localFormattingTokens.lastIndex = 0;
        while (i >= 0 && localFormattingTokens.test(format)) {
            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
            localFormattingTokens.lastIndex = 0;
            i -= 1;
        }

        return format;
    }


    /************************************
        Parsing
    ************************************/


    // get the regex to find the next token
    function getParseRegexForToken(token, config) {
        var a, strict = config._strict;
        switch (token) {
        case 'Q':
            return parseTokenOneDigit;
        case 'DDDD':
            return parseTokenThreeDigits;
        case 'YYYY':
        case 'GGGG':
        case 'gggg':
            return strict ? parseTokenFourDigits : parseTokenOneToFourDigits;
        case 'Y':
        case 'G':
        case 'g':
            return parseTokenSignedNumber;
        case 'YYYYYY':
        case 'YYYYY':
        case 'GGGGG':
        case 'ggggg':
            return strict ? parseTokenSixDigits : parseTokenOneToSixDigits;
        case 'S':
            if (strict) {
                return parseTokenOneDigit;
            }
            /* falls through */
        case 'SS':
            if (strict) {
                return parseTokenTwoDigits;
            }
            /* falls through */
        case 'SSS':
            if (strict) {
                return parseTokenThreeDigits;
            }
            /* falls through */
        case 'DDD':
            return parseTokenOneToThreeDigits;
        case 'MMM':
        case 'MMMM':
        case 'dd':
        case 'ddd':
        case 'dddd':
            return parseTokenWord;
        case 'a':
        case 'A':
            return config._locale._meridiemParse;
        case 'X':
            return parseTokenTimestampMs;
        case 'Z':
        case 'ZZ':
            return parseTokenTimezone;
        case 'T':
            return parseTokenT;
        case 'SSSS':
            return parseTokenDigits;
        case 'MM':
        case 'DD':
        case 'YY':
        case 'GG':
        case 'gg':
        case 'HH':
        case 'hh':
        case 'mm':
        case 'ss':
        case 'ww':
        case 'WW':
            return strict ? parseTokenTwoDigits : parseTokenOneOrTwoDigits;
        case 'M':
        case 'D':
        case 'd':
        case 'H':
        case 'h':
        case 'm':
        case 's':
        case 'w':
        case 'W':
        case 'e':
        case 'E':
            return parseTokenOneOrTwoDigits;
        case 'Do':
            return parseTokenOrdinal;
        default :
            a = new RegExp(regexpEscape(unescapeFormat(token.replace('\\', '')), 'i'));
            return a;
        }
    }

    function timezoneMinutesFromString(string) {
        string = string || '';
        var possibleTzMatches = (string.match(parseTokenTimezone) || []),
            tzChunk = possibleTzMatches[possibleTzMatches.length - 1] || [],
            parts = (tzChunk + '').match(parseTimezoneChunker) || ['-', 0, 0],
            minutes = +(parts[1] * 60) + toInt(parts[2]);

        return parts[0] === '+' ? -minutes : minutes;
    }

    // function to convert string input to date
    function addTimeToArrayFromToken(token, input, config) {
        var a, datePartArray = config._a;

        switch (token) {
        // QUARTER
        case 'Q':
            if (input != null) {
                datePartArray[MONTH] = (toInt(input) - 1) * 3;
            }
            break;
        // MONTH
        case 'M' : // fall through to MM
        case 'MM' :
            if (input != null) {
                datePartArray[MONTH] = toInt(input) - 1;
            }
            break;
        case 'MMM' : // fall through to MMMM
        case 'MMMM' :
            a = config._locale.monthsParse(input);
            // if we didn't find a month name, mark the date as invalid.
            if (a != null) {
                datePartArray[MONTH] = a;
            } else {
                config._pf.invalidMonth = input;
            }
            break;
        // DAY OF MONTH
        case 'D' : // fall through to DD
        case 'DD' :
            if (input != null) {
                datePartArray[DATE] = toInt(input);
            }
            break;
        case 'Do' :
            if (input != null) {
                datePartArray[DATE] = toInt(parseInt(input, 10));
            }
            break;
        // DAY OF YEAR
        case 'DDD' : // fall through to DDDD
        case 'DDDD' :
            if (input != null) {
                config._dayOfYear = toInt(input);
            }

            break;
        // YEAR
        case 'YY' :
            datePartArray[YEAR] = moment.parseTwoDigitYear(input);
            break;
        case 'YYYY' :
        case 'YYYYY' :
        case 'YYYYYY' :
            datePartArray[YEAR] = toInt(input);
            break;
        // AM / PM
        case 'a' : // fall through to A
        case 'A' :
            config._isPm = config._locale.isPM(input);
            break;
        // 24 HOUR
        case 'H' : // fall through to hh
        case 'HH' : // fall through to hh
        case 'h' : // fall through to hh
        case 'hh' :
            datePartArray[HOUR] = toInt(input);
            break;
        // MINUTE
        case 'm' : // fall through to mm
        case 'mm' :
            datePartArray[MINUTE] = toInt(input);
            break;
        // SECOND
        case 's' : // fall through to ss
        case 'ss' :
            datePartArray[SECOND] = toInt(input);
            break;
        // MILLISECOND
        case 'S' :
        case 'SS' :
        case 'SSS' :
        case 'SSSS' :
            datePartArray[MILLISECOND] = toInt(('0.' + input) * 1000);
            break;
        // UNIX TIMESTAMP WITH MS
        case 'X':
            config._d = new Date(parseFloat(input) * 1000);
            break;
        // TIMEZONE
        case 'Z' : // fall through to ZZ
        case 'ZZ' :
            config._useUTC = true;
            config._tzm = timezoneMinutesFromString(input);
            break;
        // WEEKDAY - human
        case 'dd':
        case 'ddd':
        case 'dddd':
            a = config._locale.weekdaysParse(input);
            // if we didn't get a weekday name, mark the date as invalid
            if (a != null) {
                config._w = config._w || {};
                config._w['d'] = a;
            } else {
                config._pf.invalidWeekday = input;
            }
            break;
        // WEEK, WEEK DAY - numeric
        case 'w':
        case 'ww':
        case 'W':
        case 'WW':
        case 'd':
        case 'e':
        case 'E':
            token = token.substr(0, 1);
            /* falls through */
        case 'gggg':
        case 'GGGG':
        case 'GGGGG':
            token = token.substr(0, 2);
            if (input) {
                config._w = config._w || {};
                config._w[token] = toInt(input);
            }
            break;
        case 'gg':
        case 'GG':
            config._w = config._w || {};
            config._w[token] = moment.parseTwoDigitYear(input);
        }
    }

    function dayOfYearFromWeekInfo(config) {
        var w, weekYear, week, weekday, dow, doy, temp;

        w = config._w;
        if (w.GG != null || w.W != null || w.E != null) {
            dow = 1;
            doy = 4;

            // TODO: We need to take the current isoWeekYear, but that depends on
            // how we interpret now (local, utc, fixed offset). So create
            // a now version of current config (take local/utc/offset flags, and
            // create now).
            weekYear = dfl(w.GG, config._a[YEAR], weekOfYear(moment(), 1, 4).year);
            week = dfl(w.W, 1);
            weekday = dfl(w.E, 1);
        } else {
            dow = config._locale._week.dow;
            doy = config._locale._week.doy;

            weekYear = dfl(w.gg, config._a[YEAR], weekOfYear(moment(), dow, doy).year);
            week = dfl(w.w, 1);

            if (w.d != null) {
                // weekday -- low day numbers are considered next week
                weekday = w.d;
                if (weekday < dow) {
                    ++week;
                }
            } else if (w.e != null) {
                // local weekday -- counting starts from begining of week
                weekday = w.e + dow;
            } else {
                // default to begining of week
                weekday = dow;
            }
        }
        temp = dayOfYearFromWeeks(weekYear, week, weekday, doy, dow);

        config._a[YEAR] = temp.year;
        config._dayOfYear = temp.dayOfYear;
    }

    // convert an array to a date.
    // the array should mirror the parameters below
    // note: all values past the year are optional and will default to the lowest possible value.
    // [year, month, day , hour, minute, second, millisecond]
    function dateFromConfig(config) {
        var i, date, input = [], currentDate, yearToUse;

        if (config._d) {
            return;
        }

        currentDate = currentDateArray(config);

        //compute day of the year from weeks and weekdays
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
            dayOfYearFromWeekInfo(config);
        }

        //if the day of the year is set, figure out what it is
        if (config._dayOfYear) {
            yearToUse = dfl(config._a[YEAR], currentDate[YEAR]);

            if (config._dayOfYear > daysInYear(yearToUse)) {
                config._pf._overflowDayOfYear = true;
            }

            date = makeUTCDate(yearToUse, 0, config._dayOfYear);
            config._a[MONTH] = date.getUTCMonth();
            config._a[DATE] = date.getUTCDate();
        }

        // Default to current date.
        // * if no year, month, day of month are given, default to today
        // * if day of month is given, default month and year
        // * if month is given, default only year
        // * if year is given, don't default anything
        for (i = 0; i < 3 && config._a[i] == null; ++i) {
            config._a[i] = input[i] = currentDate[i];
        }

        // Zero out whatever was not defaulted, including time
        for (; i < 7; i++) {
            config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
        }

        config._d = (config._useUTC ? makeUTCDate : makeDate).apply(null, input);
        // Apply timezone offset from input. The actual zone can be changed
        // with parseZone.
        if (config._tzm != null) {
            config._d.setUTCMinutes(config._d.getUTCMinutes() + config._tzm);
        }
    }

    function dateFromObject(config) {
        var normalizedInput;

        if (config._d) {
            return;
        }

        normalizedInput = normalizeObjectUnits(config._i);
        config._a = [
            normalizedInput.year,
            normalizedInput.month,
            normalizedInput.day,
            normalizedInput.hour,
            normalizedInput.minute,
            normalizedInput.second,
            normalizedInput.millisecond
        ];

        dateFromConfig(config);
    }

    function currentDateArray(config) {
        var now = new Date();
        if (config._useUTC) {
            return [
                now.getUTCFullYear(),
                now.getUTCMonth(),
                now.getUTCDate()
            ];
        } else {
            return [now.getFullYear(), now.getMonth(), now.getDate()];
        }
    }

    // date from string and format string
    function makeDateFromStringAndFormat(config) {
        if (config._f === moment.ISO_8601) {
            parseISO(config);
            return;
        }

        config._a = [];
        config._pf.empty = true;

        // This array is used to make a Date, either with `new Date` or `Date.UTC`
        var string = '' + config._i,
            i, parsedInput, tokens, token, skipped,
            stringLength = string.length,
            totalParsedInputLength = 0;

        tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

        for (i = 0; i < tokens.length; i++) {
            token = tokens[i];
            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
            if (parsedInput) {
                skipped = string.substr(0, string.indexOf(parsedInput));
                if (skipped.length > 0) {
                    config._pf.unusedInput.push(skipped);
                }
                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
                totalParsedInputLength += parsedInput.length;
            }
            // don't parse if it's not a known token
            if (formatTokenFunctions[token]) {
                if (parsedInput) {
                    config._pf.empty = false;
                }
                else {
                    config._pf.unusedTokens.push(token);
                }
                addTimeToArrayFromToken(token, parsedInput, config);
            }
            else if (config._strict && !parsedInput) {
                config._pf.unusedTokens.push(token);
            }
        }

        // add remaining unparsed input length to the string
        config._pf.charsLeftOver = stringLength - totalParsedInputLength;
        if (string.length > 0) {
            config._pf.unusedInput.push(string);
        }

        // handle am pm
        if (config._isPm && config._a[HOUR] < 12) {
            config._a[HOUR] += 12;
        }
        // if is 12 am, change hours to 0
        if (config._isPm === false && config._a[HOUR] === 12) {
            config._a[HOUR] = 0;
        }

        dateFromConfig(config);
        checkOverflow(config);
    }

    function unescapeFormat(s) {
        return s.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
            return p1 || p2 || p3 || p4;
        });
    }

    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    function regexpEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    // date from string and array of format strings
    function makeDateFromStringAndArray(config) {
        var tempConfig,
            bestMoment,

            scoreToBeat,
            i,
            currentScore;

        if (config._f.length === 0) {
            config._pf.invalidFormat = true;
            config._d = new Date(NaN);
            return;
        }

        for (i = 0; i < config._f.length; i++) {
            currentScore = 0;
            tempConfig = copyConfig({}, config);
            if (config._useUTC != null) {
                tempConfig._useUTC = config._useUTC;
            }
            tempConfig._pf = defaultParsingFlags();
            tempConfig._f = config._f[i];
            makeDateFromStringAndFormat(tempConfig);

            if (!isValid(tempConfig)) {
                continue;
            }

            // if there is any input that was not parsed add a penalty for that format
            currentScore += tempConfig._pf.charsLeftOver;

            //or tokens
            currentScore += tempConfig._pf.unusedTokens.length * 10;

            tempConfig._pf.score = currentScore;

            if (scoreToBeat == null || currentScore < scoreToBeat) {
                scoreToBeat = currentScore;
                bestMoment = tempConfig;
            }
        }

        extend(config, bestMoment || tempConfig);
    }

    // date from iso format
    function parseISO(config) {
        var i, l,
            string = config._i,
            match = isoRegex.exec(string);

        if (match) {
            config._pf.iso = true;
            for (i = 0, l = isoDates.length; i < l; i++) {
                if (isoDates[i][1].exec(string)) {
                    // match[5] should be 'T' or undefined
                    config._f = isoDates[i][0] + (match[6] || ' ');
                    break;
                }
            }
            for (i = 0, l = isoTimes.length; i < l; i++) {
                if (isoTimes[i][1].exec(string)) {
                    config._f += isoTimes[i][0];
                    break;
                }
            }
            if (string.match(parseTokenTimezone)) {
                config._f += 'Z';
            }
            makeDateFromStringAndFormat(config);
        } else {
            config._isValid = false;
        }
    }

    // date from iso format or fallback
    function makeDateFromString(config) {
        parseISO(config);
        if (config._isValid === false) {
            delete config._isValid;
            moment.createFromInputFallback(config);
        }
    }

    function map(arr, fn) {
        var res = [], i;
        for (i = 0; i < arr.length; ++i) {
            res.push(fn(arr[i], i));
        }
        return res;
    }

    function makeDateFromInput(config) {
        var input = config._i, matched;
        if (input === undefined) {
            config._d = new Date();
        } else if (isDate(input)) {
            config._d = new Date(+input);
        } else if ((matched = aspNetJsonRegex.exec(input)) !== null) {
            config._d = new Date(+matched[1]);
        } else if (typeof input === 'string') {
            makeDateFromString(config);
        } else if (isArray(input)) {
            config._a = map(input.slice(0), function (obj) {
                return parseInt(obj, 10);
            });
            dateFromConfig(config);
        } else if (typeof(input) === 'object') {
            dateFromObject(config);
        } else if (typeof(input) === 'number') {
            // from milliseconds
            config._d = new Date(input);
        } else {
            moment.createFromInputFallback(config);
        }
    }

    function makeDate(y, m, d, h, M, s, ms) {
        //can't just apply() to create a date:
        //http://stackoverflow.com/questions/181348/instantiating-a-javascript-object-by-calling-prototype-constructor-apply
        var date = new Date(y, m, d, h, M, s, ms);

        //the date constructor doesn't accept years < 1970
        if (y < 1970) {
            date.setFullYear(y);
        }
        return date;
    }

    function makeUTCDate(y) {
        var date = new Date(Date.UTC.apply(null, arguments));
        if (y < 1970) {
            date.setUTCFullYear(y);
        }
        return date;
    }

    function parseWeekday(input, locale) {
        if (typeof input === 'string') {
            if (!isNaN(input)) {
                input = parseInt(input, 10);
            }
            else {
                input = locale.weekdaysParse(input);
                if (typeof input !== 'number') {
                    return null;
                }
            }
        }
        return input;
    }

    /************************************
        Relative Time
    ************************************/


    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }

    function relativeTime(posNegDuration, withoutSuffix, locale) {
        var duration = moment.duration(posNegDuration).abs(),
            seconds = round(duration.as('s')),
            minutes = round(duration.as('m')),
            hours = round(duration.as('h')),
            days = round(duration.as('d')),
            months = round(duration.as('M')),
            years = round(duration.as('y')),

            args = seconds < relativeTimeThresholds.s && ['s', seconds] ||
                minutes === 1 && ['m'] ||
                minutes < relativeTimeThresholds.m && ['mm', minutes] ||
                hours === 1 && ['h'] ||
                hours < relativeTimeThresholds.h && ['hh', hours] ||
                days === 1 && ['d'] ||
                days < relativeTimeThresholds.d && ['dd', days] ||
                months === 1 && ['M'] ||
                months < relativeTimeThresholds.M && ['MM', months] ||
                years === 1 && ['y'] || ['yy', years];

        args[2] = withoutSuffix;
        args[3] = +posNegDuration > 0;
        args[4] = locale;
        return substituteTimeAgo.apply({}, args);
    }


    /************************************
        Week of Year
    ************************************/


    // firstDayOfWeek       0 = sun, 6 = sat
    //                      the day of the week that starts the week
    //                      (usually sunday or monday)
    // firstDayOfWeekOfYear 0 = sun, 6 = sat
    //                      the first week is the week that contains the first
    //                      of this day of the week
    //                      (eg. ISO weeks use thursday (4))
    function weekOfYear(mom, firstDayOfWeek, firstDayOfWeekOfYear) {
        var end = firstDayOfWeekOfYear - firstDayOfWeek,
            daysToDayOfWeek = firstDayOfWeekOfYear - mom.day(),
            adjustedMoment;


        if (daysToDayOfWeek > end) {
            daysToDayOfWeek -= 7;
        }

        if (daysToDayOfWeek < end - 7) {
            daysToDayOfWeek += 7;
        }

        adjustedMoment = moment(mom).add(daysToDayOfWeek, 'd');
        return {
            week: Math.ceil(adjustedMoment.dayOfYear() / 7),
            year: adjustedMoment.year()
        };
    }

    //http://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
    function dayOfYearFromWeeks(year, week, weekday, firstDayOfWeekOfYear, firstDayOfWeek) {
        var d = makeUTCDate(year, 0, 1).getUTCDay(), daysToAdd, dayOfYear;

        d = d === 0 ? 7 : d;
        weekday = weekday != null ? weekday : firstDayOfWeek;
        daysToAdd = firstDayOfWeek - d + (d > firstDayOfWeekOfYear ? 7 : 0) - (d < firstDayOfWeek ? 7 : 0);
        dayOfYear = 7 * (week - 1) + (weekday - firstDayOfWeek) + daysToAdd + 1;

        return {
            year: dayOfYear > 0 ? year : year - 1,
            dayOfYear: dayOfYear > 0 ?  dayOfYear : daysInYear(year - 1) + dayOfYear
        };
    }

    /************************************
        Top Level Functions
    ************************************/

    function makeMoment(config) {
        var input = config._i,
            format = config._f;

        config._locale = config._locale || moment.localeData(config._l);

        if (input === null || (format === undefined && input === '')) {
            return moment.invalid({nullInput: true});
        }

        if (typeof input === 'string') {
            config._i = input = config._locale.preparse(input);
        }

        if (moment.isMoment(input)) {
            return new Moment(input, true);
        } else if (format) {
            if (isArray(format)) {
                makeDateFromStringAndArray(config);
            } else {
                makeDateFromStringAndFormat(config);
            }
        } else {
            makeDateFromInput(config);
        }

        return new Moment(config);
    }

    moment = function (input, format, locale, strict) {
        var c;

        if (typeof(locale) === 'boolean') {
            strict = locale;
            locale = undefined;
        }
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c = {};
        c._isAMomentObject = true;
        c._i = input;
        c._f = format;
        c._l = locale;
        c._strict = strict;
        c._isUTC = false;
        c._pf = defaultParsingFlags();

        return makeMoment(c);
    };

    moment.suppressDeprecationWarnings = false;

    moment.createFromInputFallback = deprecate(
        'moment construction falls back to js Date. This is ' +
        'discouraged and will be removed in upcoming major ' +
        'release. Please refer to ' +
        'https://github.com/moment/moment/issues/1407 for more info.',
        function (config) {
            config._d = new Date(config._i);
        }
    );

    // Pick a moment m from moments so that m[fn](other) is true for all
    // other. This relies on the function fn to be transitive.
    //
    // moments should either be an array of moment objects or an array, whose
    // first element is an array of moment objects.
    function pickBy(fn, moments) {
        var res, i;
        if (moments.length === 1 && isArray(moments[0])) {
            moments = moments[0];
        }
        if (!moments.length) {
            return moment();
        }
        res = moments[0];
        for (i = 1; i < moments.length; ++i) {
            if (moments[i][fn](res)) {
                res = moments[i];
            }
        }
        return res;
    }

    moment.min = function () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isBefore', args);
    };

    moment.max = function () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isAfter', args);
    };

    // creating with utc
    moment.utc = function (input, format, locale, strict) {
        var c;

        if (typeof(locale) === 'boolean') {
            strict = locale;
            locale = undefined;
        }
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c = {};
        c._isAMomentObject = true;
        c._useUTC = true;
        c._isUTC = true;
        c._l = locale;
        c._i = input;
        c._f = format;
        c._strict = strict;
        c._pf = defaultParsingFlags();

        return makeMoment(c).utc();
    };

    // creating with unix timestamp (in seconds)
    moment.unix = function (input) {
        return moment(input * 1000);
    };

    // duration
    moment.duration = function (input, key) {
        var duration = input,
            // matching against regexp is expensive, do it on demand
            match = null,
            sign,
            ret,
            parseIso,
            diffRes;

        if (moment.isDuration(input)) {
            duration = {
                ms: input._milliseconds,
                d: input._days,
                M: input._months
            };
        } else if (typeof input === 'number') {
            duration = {};
            if (key) {
                duration[key] = input;
            } else {
                duration.milliseconds = input;
            }
        } else if (!!(match = aspNetTimeSpanJsonRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y: 0,
                d: toInt(match[DATE]) * sign,
                h: toInt(match[HOUR]) * sign,
                m: toInt(match[MINUTE]) * sign,
                s: toInt(match[SECOND]) * sign,
                ms: toInt(match[MILLISECOND]) * sign
            };
        } else if (!!(match = isoDurationRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            parseIso = function (inp) {
                // We'd normally use ~~inp for this, but unfortunately it also
                // converts floats to ints.
                // inp may be undefined, so careful calling replace on it.
                var res = inp && parseFloat(inp.replace(',', '.'));
                // apply sign while we're at it
                return (isNaN(res) ? 0 : res) * sign;
            };
            duration = {
                y: parseIso(match[2]),
                M: parseIso(match[3]),
                d: parseIso(match[4]),
                h: parseIso(match[5]),
                m: parseIso(match[6]),
                s: parseIso(match[7]),
                w: parseIso(match[8])
            };
        } else if (typeof duration === 'object' &&
                ('from' in duration || 'to' in duration)) {
            diffRes = momentsDifference(moment(duration.from), moment(duration.to));

            duration = {};
            duration.ms = diffRes.milliseconds;
            duration.M = diffRes.months;
        }

        ret = new Duration(duration);

        if (moment.isDuration(input) && hasOwnProp(input, '_locale')) {
            ret._locale = input._locale;
        }

        return ret;
    };

    // version number
    moment.version = VERSION;

    // default format
    moment.defaultFormat = isoFormat;

    // constant that refers to the ISO standard
    moment.ISO_8601 = function () {};

    // Plugins that add properties should also add the key here (null value),
    // so we can properly clone ourselves.
    moment.momentProperties = momentProperties;

    // This function will be called whenever a moment is mutated.
    // It is intended to keep the offset in sync with the timezone.
    moment.updateOffset = function () {};

    // This function allows you to set a threshold for relative time strings
    moment.relativeTimeThreshold = function (threshold, limit) {
        if (relativeTimeThresholds[threshold] === undefined) {
            return false;
        }
        if (limit === undefined) {
            return relativeTimeThresholds[threshold];
        }
        relativeTimeThresholds[threshold] = limit;
        return true;
    };

    moment.lang = deprecate(
        'moment.lang is deprecated. Use moment.locale instead.',
        function (key, value) {
            return moment.locale(key, value);
        }
    );

    // This function will load locale and then set the global locale.  If
    // no arguments are passed in, it will simply return the current global
    // locale key.
    moment.locale = function (key, values) {
        var data;
        if (key) {
            if (typeof(values) !== 'undefined') {
                data = moment.defineLocale(key, values);
            }
            else {
                data = moment.localeData(key);
            }

            if (data) {
                moment.duration._locale = moment._locale = data;
            }
        }

        return moment._locale._abbr;
    };

    moment.defineLocale = function (name, values) {
        if (values !== null) {
            values.abbr = name;
            if (!locales[name]) {
                locales[name] = new Locale();
            }
            locales[name].set(values);

            // backwards compat for now: also set the locale
            moment.locale(name);

            return locales[name];
        } else {
            // useful for testing
            delete locales[name];
            return null;
        }
    };

    moment.langData = deprecate(
        'moment.langData is deprecated. Use moment.localeData instead.',
        function (key) {
            return moment.localeData(key);
        }
    );

    // returns locale data
    moment.localeData = function (key) {
        var locale;

        if (key && key._locale && key._locale._abbr) {
            key = key._locale._abbr;
        }

        if (!key) {
            return moment._locale;
        }

        if (!isArray(key)) {
            //short-circuit everything else
            locale = loadLocale(key);
            if (locale) {
                return locale;
            }
            key = [key];
        }

        return chooseLocale(key);
    };

    // compare moment object
    moment.isMoment = function (obj) {
        return obj instanceof Moment ||
            (obj != null && hasOwnProp(obj, '_isAMomentObject'));
    };

    // for typechecking Duration objects
    moment.isDuration = function (obj) {
        return obj instanceof Duration;
    };

    for (i = lists.length - 1; i >= 0; --i) {
        makeList(lists[i]);
    }

    moment.normalizeUnits = function (units) {
        return normalizeUnits(units);
    };

    moment.invalid = function (flags) {
        var m = moment.utc(NaN);
        if (flags != null) {
            extend(m._pf, flags);
        }
        else {
            m._pf.userInvalidated = true;
        }

        return m;
    };

    moment.parseZone = function () {
        return moment.apply(null, arguments).parseZone();
    };

    moment.parseTwoDigitYear = function (input) {
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
    };

    /************************************
        Moment Prototype
    ************************************/


    extend(moment.fn = Moment.prototype, {

        clone : function () {
            return moment(this);
        },

        valueOf : function () {
            return +this._d + ((this._offset || 0) * 60000);
        },

        unix : function () {
            return Math.floor(+this / 1000);
        },

        toString : function () {
            return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
        },

        toDate : function () {
            return this._offset ? new Date(+this) : this._d;
        },

        toISOString : function () {
            var m = moment(this).utc();
            if (0 < m.year() && m.year() <= 9999) {
                return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
            } else {
                return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
            }
        },

        toArray : function () {
            var m = this;
            return [
                m.year(),
                m.month(),
                m.date(),
                m.hours(),
                m.minutes(),
                m.seconds(),
                m.milliseconds()
            ];
        },

        isValid : function () {
            return isValid(this);
        },

        isDSTShifted : function () {
            if (this._a) {
                return this.isValid() && compareArrays(this._a, (this._isUTC ? moment.utc(this._a) : moment(this._a)).toArray()) > 0;
            }

            return false;
        },

        parsingFlags : function () {
            return extend({}, this._pf);
        },

        invalidAt: function () {
            return this._pf.overflow;
        },

        utc : function (keepLocalTime) {
            return this.zone(0, keepLocalTime);
        },

        local : function (keepLocalTime) {
            if (this._isUTC) {
                this.zone(0, keepLocalTime);
                this._isUTC = false;

                if (keepLocalTime) {
                    this.add(this._dateTzOffset(), 'm');
                }
            }
            return this;
        },

        format : function (inputString) {
            var output = formatMoment(this, inputString || moment.defaultFormat);
            return this.localeData().postformat(output);
        },

        add : createAdder(1, 'add'),

        subtract : createAdder(-1, 'subtract'),

        diff : function (input, units, asFloat) {
            var that = makeAs(input, this),
                zoneDiff = (this.zone() - that.zone()) * 6e4,
                diff, output, daysAdjust;

            units = normalizeUnits(units);

            if (units === 'year' || units === 'month') {
                // average number of days in the months in the given dates
                diff = (this.daysInMonth() + that.daysInMonth()) * 432e5; // 24 * 60 * 60 * 1000 / 2
                // difference in months
                output = ((this.year() - that.year()) * 12) + (this.month() - that.month());
                // adjust by taking difference in days, average number of days
                // and dst in the given months.
                daysAdjust = (this - moment(this).startOf('month')) -
                    (that - moment(that).startOf('month'));
                // same as above but with zones, to negate all dst
                daysAdjust -= ((this.zone() - moment(this).startOf('month').zone()) -
                        (that.zone() - moment(that).startOf('month').zone())) * 6e4;
                output += daysAdjust / diff;
                if (units === 'year') {
                    output = output / 12;
                }
            } else {
                diff = (this - that);
                output = units === 'second' ? diff / 1e3 : // 1000
                    units === 'minute' ? diff / 6e4 : // 1000 * 60
                    units === 'hour' ? diff / 36e5 : // 1000 * 60 * 60
                    units === 'day' ? (diff - zoneDiff) / 864e5 : // 1000 * 60 * 60 * 24, negate dst
                    units === 'week' ? (diff - zoneDiff) / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst
                    diff;
            }
            return asFloat ? output : absRound(output);
        },

        from : function (time, withoutSuffix) {
            return moment.duration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
        },

        fromNow : function (withoutSuffix) {
            return this.from(moment(), withoutSuffix);
        },

        calendar : function (time) {
            // We want to compare the start of today, vs this.
            // Getting start-of-today depends on whether we're zone'd or not.
            var now = time || moment(),
                sod = makeAs(now, this).startOf('day'),
                diff = this.diff(sod, 'days', true),
                format = diff < -6 ? 'sameElse' :
                    diff < -1 ? 'lastWeek' :
                    diff < 0 ? 'lastDay' :
                    diff < 1 ? 'sameDay' :
                    diff < 2 ? 'nextDay' :
                    diff < 7 ? 'nextWeek' : 'sameElse';
            return this.format(this.localeData().calendar(format, this));
        },

        isLeapYear : function () {
            return isLeapYear(this.year());
        },

        isDST : function () {
            return (this.zone() < this.clone().month(0).zone() ||
                this.zone() < this.clone().month(5).zone());
        },

        day : function (input) {
            var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
            if (input != null) {
                input = parseWeekday(input, this.localeData());
                return this.add(input - day, 'd');
            } else {
                return day;
            }
        },

        month : makeAccessor('Month', true),

        startOf : function (units) {
            units = normalizeUnits(units);
            // the following switch intentionally omits break keywords
            // to utilize falling through the cases.
            switch (units) {
            case 'year':
                this.month(0);
                /* falls through */
            case 'quarter':
            case 'month':
                this.date(1);
                /* falls through */
            case 'week':
            case 'isoWeek':
            case 'day':
                this.hours(0);
                /* falls through */
            case 'hour':
                this.minutes(0);
                /* falls through */
            case 'minute':
                this.seconds(0);
                /* falls through */
            case 'second':
                this.milliseconds(0);
                /* falls through */
            }

            // weeks are a special case
            if (units === 'week') {
                this.weekday(0);
            } else if (units === 'isoWeek') {
                this.isoWeekday(1);
            }

            // quarters are also special
            if (units === 'quarter') {
                this.month(Math.floor(this.month() / 3) * 3);
            }

            return this;
        },

        endOf: function (units) {
            units = normalizeUnits(units);
            return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
        },

        isAfter: function (input, units) {
            units = normalizeUnits(typeof units !== 'undefined' ? units : 'millisecond');
            if (units === 'millisecond') {
                input = moment.isMoment(input) ? input : moment(input);
                return +this > +input;
            } else {
                return +this.clone().startOf(units) > +moment(input).startOf(units);
            }
        },

        isBefore: function (input, units) {
            units = normalizeUnits(typeof units !== 'undefined' ? units : 'millisecond');
            if (units === 'millisecond') {
                input = moment.isMoment(input) ? input : moment(input);
                return +this < +input;
            } else {
                return +this.clone().startOf(units) < +moment(input).startOf(units);
            }
        },

        isSame: function (input, units) {
            units = normalizeUnits(units || 'millisecond');
            if (units === 'millisecond') {
                input = moment.isMoment(input) ? input : moment(input);
                return +this === +input;
            } else {
                return +this.clone().startOf(units) === +makeAs(input, this).startOf(units);
            }
        },

        min: deprecate(
                 'moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548',
                 function (other) {
                     other = moment.apply(null, arguments);
                     return other < this ? this : other;
                 }
         ),

        max: deprecate(
                'moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548',
                function (other) {
                    other = moment.apply(null, arguments);
                    return other > this ? this : other;
                }
        ),

        // keepLocalTime = true means only change the timezone, without
        // affecting the local hour. So 5:31:26 +0300 --[zone(2, true)]-->
        // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist int zone
        // +0200, so we adjust the time as needed, to be valid.
        //
        // Keeping the time actually adds/subtracts (one hour)
        // from the actual represented time. That is why we call updateOffset
        // a second time. In case it wants us to change the offset again
        // _changeInProgress == true case, then we have to adjust, because
        // there is no such time in the given timezone.
        zone : function (input, keepLocalTime) {
            var offset = this._offset || 0,
                localAdjust;
            if (input != null) {
                if (typeof input === 'string') {
                    input = timezoneMinutesFromString(input);
                }
                if (Math.abs(input) < 16) {
                    input = input * 60;
                }
                if (!this._isUTC && keepLocalTime) {
                    localAdjust = this._dateTzOffset();
                }
                this._offset = input;
                this._isUTC = true;
                if (localAdjust != null) {
                    this.subtract(localAdjust, 'm');
                }
                if (offset !== input) {
                    if (!keepLocalTime || this._changeInProgress) {
                        addOrSubtractDurationFromMoment(this,
                                moment.duration(offset - input, 'm'), 1, false);
                    } else if (!this._changeInProgress) {
                        this._changeInProgress = true;
                        moment.updateOffset(this, true);
                        this._changeInProgress = null;
                    }
                }
            } else {
                return this._isUTC ? offset : this._dateTzOffset();
            }
            return this;
        },

        zoneAbbr : function () {
            return this._isUTC ? 'UTC' : '';
        },

        zoneName : function () {
            return this._isUTC ? 'Coordinated Universal Time' : '';
        },

        parseZone : function () {
            if (this._tzm) {
                this.zone(this._tzm);
            } else if (typeof this._i === 'string') {
                this.zone(this._i);
            }
            return this;
        },

        hasAlignedHourOffset : function (input) {
            if (!input) {
                input = 0;
            }
            else {
                input = moment(input).zone();
            }

            return (this.zone() - input) % 60 === 0;
        },

        daysInMonth : function () {
            return daysInMonth(this.year(), this.month());
        },

        dayOfYear : function (input) {
            var dayOfYear = round((moment(this).startOf('day') - moment(this).startOf('year')) / 864e5) + 1;
            return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
        },

        quarter : function (input) {
            return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
        },

        weekYear : function (input) {
            var year = weekOfYear(this, this.localeData()._week.dow, this.localeData()._week.doy).year;
            return input == null ? year : this.add((input - year), 'y');
        },

        isoWeekYear : function (input) {
            var year = weekOfYear(this, 1, 4).year;
            return input == null ? year : this.add((input - year), 'y');
        },

        week : function (input) {
            var week = this.localeData().week(this);
            return input == null ? week : this.add((input - week) * 7, 'd');
        },

        isoWeek : function (input) {
            var week = weekOfYear(this, 1, 4).week;
            return input == null ? week : this.add((input - week) * 7, 'd');
        },

        weekday : function (input) {
            var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
            return input == null ? weekday : this.add(input - weekday, 'd');
        },

        isoWeekday : function (input) {
            // behaves the same as moment#day except
            // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
            // as a setter, sunday should belong to the previous week.
            return input == null ? this.day() || 7 : this.day(this.day() % 7 ? input : input - 7);
        },

        isoWeeksInYear : function () {
            return weeksInYear(this.year(), 1, 4);
        },

        weeksInYear : function () {
            var weekInfo = this.localeData()._week;
            return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
        },

        get : function (units) {
            units = normalizeUnits(units);
            return this[units]();
        },

        set : function (units, value) {
            units = normalizeUnits(units);
            if (typeof this[units] === 'function') {
                this[units](value);
            }
            return this;
        },

        // If passed a locale key, it will set the locale for this
        // instance.  Otherwise, it will return the locale configuration
        // variables for this instance.
        locale : function (key) {
            var newLocaleData;

            if (key === undefined) {
                return this._locale._abbr;
            } else {
                newLocaleData = moment.localeData(key);
                if (newLocaleData != null) {
                    this._locale = newLocaleData;
                }
                return this;
            }
        },

        lang : deprecate(
            'moment().lang() is deprecated. Use moment().localeData() instead.',
            function (key) {
                if (key === undefined) {
                    return this.localeData();
                } else {
                    return this.locale(key);
                }
            }
        ),

        localeData : function () {
            return this._locale;
        },

        _dateTzOffset : function () {
            // On Firefox.24 Date#getTimezoneOffset returns a floating point.
            // https://github.com/moment/moment/pull/1871
            return Math.round(this._d.getTimezoneOffset() / 15) * 15;
        }
    });

    function rawMonthSetter(mom, value) {
        var dayOfMonth;

        // TODO: Move this out of here!
        if (typeof value === 'string') {
            value = mom.localeData().monthsParse(value);
            // TODO: Another silent failure?
            if (typeof value !== 'number') {
                return mom;
            }
        }

        dayOfMonth = Math.min(mom.date(),
                daysInMonth(mom.year(), value));
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
        return mom;
    }

    function rawGetter(mom, unit) {
        return mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]();
    }

    function rawSetter(mom, unit, value) {
        if (unit === 'Month') {
            return rawMonthSetter(mom, value);
        } else {
            return mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
        }
    }

    function makeAccessor(unit, keepTime) {
        return function (value) {
            if (value != null) {
                rawSetter(this, unit, value);
                moment.updateOffset(this, keepTime);
                return this;
            } else {
                return rawGetter(this, unit);
            }
        };
    }

    moment.fn.millisecond = moment.fn.milliseconds = makeAccessor('Milliseconds', false);
    moment.fn.second = moment.fn.seconds = makeAccessor('Seconds', false);
    moment.fn.minute = moment.fn.minutes = makeAccessor('Minutes', false);
    // Setting the hour should keep the time, because the user explicitly
    // specified which hour he wants. So trying to maintain the same hour (in
    // a new timezone) makes sense. Adding/subtracting hours does not follow
    // this rule.
    moment.fn.hour = moment.fn.hours = makeAccessor('Hours', true);
    // moment.fn.month is defined separately
    moment.fn.date = makeAccessor('Date', true);
    moment.fn.dates = deprecate('dates accessor is deprecated. Use date instead.', makeAccessor('Date', true));
    moment.fn.year = makeAccessor('FullYear', true);
    moment.fn.years = deprecate('years accessor is deprecated. Use year instead.', makeAccessor('FullYear', true));

    // add plural methods
    moment.fn.days = moment.fn.day;
    moment.fn.months = moment.fn.month;
    moment.fn.weeks = moment.fn.week;
    moment.fn.isoWeeks = moment.fn.isoWeek;
    moment.fn.quarters = moment.fn.quarter;

    // add aliased format methods
    moment.fn.toJSON = moment.fn.toISOString;

    /************************************
        Duration Prototype
    ************************************/


    function daysToYears (days) {
        // 400 years have 146097 days (taking into account leap year rules)
        return days * 400 / 146097;
    }

    function yearsToDays (years) {
        // years * 365 + absRound(years / 4) -
        //     absRound(years / 100) + absRound(years / 400);
        return years * 146097 / 400;
    }

    extend(moment.duration.fn = Duration.prototype, {

        _bubble : function () {
            var milliseconds = this._milliseconds,
                days = this._days,
                months = this._months,
                data = this._data,
                seconds, minutes, hours, years = 0;

            // The following code bubbles up values, see the tests for
            // examples of what that means.
            data.milliseconds = milliseconds % 1000;

            seconds = absRound(milliseconds / 1000);
            data.seconds = seconds % 60;

            minutes = absRound(seconds / 60);
            data.minutes = minutes % 60;

            hours = absRound(minutes / 60);
            data.hours = hours % 24;

            days += absRound(hours / 24);

            // Accurately convert days to years, assume start from year 0.
            years = absRound(daysToYears(days));
            days -= absRound(yearsToDays(years));

            // 30 days to a month
            // TODO (iskren): Use anchor date (like 1st Jan) to compute this.
            months += absRound(days / 30);
            days %= 30;

            // 12 months -> 1 year
            years += absRound(months / 12);
            months %= 12;

            data.days = days;
            data.months = months;
            data.years = years;
        },

        abs : function () {
            this._milliseconds = Math.abs(this._milliseconds);
            this._days = Math.abs(this._days);
            this._months = Math.abs(this._months);

            this._data.milliseconds = Math.abs(this._data.milliseconds);
            this._data.seconds = Math.abs(this._data.seconds);
            this._data.minutes = Math.abs(this._data.minutes);
            this._data.hours = Math.abs(this._data.hours);
            this._data.months = Math.abs(this._data.months);
            this._data.years = Math.abs(this._data.years);

            return this;
        },

        weeks : function () {
            return absRound(this.days() / 7);
        },

        valueOf : function () {
            return this._milliseconds +
              this._days * 864e5 +
              (this._months % 12) * 2592e6 +
              toInt(this._months / 12) * 31536e6;
        },

        humanize : function (withSuffix) {
            var output = relativeTime(this, !withSuffix, this.localeData());

            if (withSuffix) {
                output = this.localeData().pastFuture(+this, output);
            }

            return this.localeData().postformat(output);
        },

        add : function (input, val) {
            // supports only 2.0-style add(1, 's') or add(moment)
            var dur = moment.duration(input, val);

            this._milliseconds += dur._milliseconds;
            this._days += dur._days;
            this._months += dur._months;

            this._bubble();

            return this;
        },

        subtract : function (input, val) {
            var dur = moment.duration(input, val);

            this._milliseconds -= dur._milliseconds;
            this._days -= dur._days;
            this._months -= dur._months;

            this._bubble();

            return this;
        },

        get : function (units) {
            units = normalizeUnits(units);
            return this[units.toLowerCase() + 's']();
        },

        as : function (units) {
            var days, months;
            units = normalizeUnits(units);

            if (units === 'month' || units === 'year') {
                days = this._days + this._milliseconds / 864e5;
                months = this._months + daysToYears(days) * 12;
                return units === 'month' ? months : months / 12;
            } else {
                // handle milliseconds separately because of floating point math errors (issue #1867)
                days = this._days + yearsToDays(this._months / 12);
                switch (units) {
                    case 'week': return days / 7 + this._milliseconds / 6048e5;
                    case 'day': return days + this._milliseconds / 864e5;
                    case 'hour': return days * 24 + this._milliseconds / 36e5;
                    case 'minute': return days * 24 * 60 + this._milliseconds / 6e4;
                    case 'second': return days * 24 * 60 * 60 + this._milliseconds / 1000;
                    // Math.floor prevents floating point math errors here
                    case 'millisecond': return Math.floor(days * 24 * 60 * 60 * 1000) + this._milliseconds;
                    default: throw new Error('Unknown unit ' + units);
                }
            }
        },

        lang : moment.fn.lang,
        locale : moment.fn.locale,

        toIsoString : deprecate(
            'toIsoString() is deprecated. Please use toISOString() instead ' +
            '(notice the capitals)',
            function () {
                return this.toISOString();
            }
        ),

        toISOString : function () {
            // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
            var years = Math.abs(this.years()),
                months = Math.abs(this.months()),
                days = Math.abs(this.days()),
                hours = Math.abs(this.hours()),
                minutes = Math.abs(this.minutes()),
                seconds = Math.abs(this.seconds() + this.milliseconds() / 1000);

            if (!this.asSeconds()) {
                // this is the same as C#'s (Noda) and python (isodate)...
                // but not other JS (goog.date)
                return 'P0D';
            }

            return (this.asSeconds() < 0 ? '-' : '') +
                'P' +
                (years ? years + 'Y' : '') +
                (months ? months + 'M' : '') +
                (days ? days + 'D' : '') +
                ((hours || minutes || seconds) ? 'T' : '') +
                (hours ? hours + 'H' : '') +
                (minutes ? minutes + 'M' : '') +
                (seconds ? seconds + 'S' : '');
        },

        localeData : function () {
            return this._locale;
        }
    });

    moment.duration.fn.toString = moment.duration.fn.toISOString;

    function makeDurationGetter(name) {
        moment.duration.fn[name] = function () {
            return this._data[name];
        };
    }

    for (i in unitMillisecondFactors) {
        if (hasOwnProp(unitMillisecondFactors, i)) {
            makeDurationGetter(i.toLowerCase());
        }
    }

    moment.duration.fn.asMilliseconds = function () {
        return this.as('ms');
    };
    moment.duration.fn.asSeconds = function () {
        return this.as('s');
    };
    moment.duration.fn.asMinutes = function () {
        return this.as('m');
    };
    moment.duration.fn.asHours = function () {
        return this.as('h');
    };
    moment.duration.fn.asDays = function () {
        return this.as('d');
    };
    moment.duration.fn.asWeeks = function () {
        return this.as('weeks');
    };
    moment.duration.fn.asMonths = function () {
        return this.as('M');
    };
    moment.duration.fn.asYears = function () {
        return this.as('y');
    };

    /************************************
        Default Locale
    ************************************/


    // Set default locale, other locale will inherit from English.
    moment.locale('en', {
        ordinal : function (number) {
            var b = number % 10,
                output = (toInt(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        }
    });

    /* EMBED_LOCALES */

    /************************************
        Exposing Moment
    ************************************/

    function makeGlobal(shouldDeprecate) {
        /*global ender:false */
        if (typeof ender !== 'undefined') {
            return;
        }
        oldGlobalMoment = globalScope.moment;
        if (shouldDeprecate) {
            globalScope.moment = deprecate(
                    'Accessing Moment through the global scope is ' +
                    'deprecated, and will be removed in an upcoming ' +
                    'release.',
                    moment);
        } else {
            globalScope.moment = moment;
        }
    }

    // CommonJS module is defined
    if (hasModule) {
        module.exports = moment;
    } else if (typeof define === 'function' && define.amd) {
        define('moment', function (require, exports, module) {
            if (module.config && module.config() && module.config().noGlobal === true) {
                // release the global variable
                globalScope.moment = oldGlobalMoment;
            }

            return moment;
        });
        makeGlobal(true);
    } else {
        makeGlobal();
    }
}).call(this);
/*!
 * FullCalendar v2.2.3
 * Docs & License: http://arshaw.com/fullcalendar/
 * (c) 2013 Adam Shaw
 */


(function(factory) {
	if (typeof define === 'function' && define.amd) {
		define([ 'jquery', 'moment' ], factory);
	}
	else {
		factory(jQuery, moment);
	}
})(function($, moment) {

;;

var defaults = {

	lang: 'en',

	defaultTimedEventDuration: '02:00:00',
	defaultAllDayEventDuration: { days: 1 },
	forceEventDuration: false,
	nextDayThreshold: '09:00:00', // 9am

	// display
	defaultView: 'month',
	aspectRatio: 1.35,
	header: {
		left: 'title',
		center: '',
		right: 'today prev,next'
	},
	weekends: true,
	weekNumbers: false,

	weekNumberTitle: 'W',
	weekNumberCalculation: 'local',
	
	//editable: false,
	
	// event ajax
	lazyFetching: true,
	startParam: 'start',
	endParam: 'end',
	timezoneParam: 'timezone',

	timezone: false,

	//allDayDefault: undefined,
	
	// time formats
	titleFormat: {
		month: 'MMMM YYYY', // like "September 1986". each language will override this
		week: 'll', // like "Sep 4 1986"
		day: 'LL' // like "September 4 1986"
	},
	columnFormat: {
		month: 'ddd', // like "Sat"
		week: generateWeekColumnFormat,
		day: 'dddd' // like "Saturday"
	},
	timeFormat: { // for event elements
		'default': generateShortTimeFormat
	},

	displayEventEnd: {
		month: false,
		basicWeek: false,
		'default': true
	},
	
	// locale
	isRTL: false,
	defaultButtonText: {
		prev: "prev",
		next: "next",
		prevYear: "prev year",
		nextYear: "next year",
		today: 'today',
		month: 'month',
		week: 'week',
		day: 'day'
	},

	buttonIcons: {
		prev: 'left-single-arrow',
		next: 'right-single-arrow',
		prevYear: 'left-double-arrow',
		nextYear: 'right-double-arrow'
	},
	
	// jquery-ui theming
	theme: false,
	themeButtonIcons: {
		prev: 'circle-triangle-w',
		next: 'circle-triangle-e',
		prevYear: 'seek-prev',
		nextYear: 'seek-next'
	},

	dragOpacity: .75,
	dragRevertDuration: 500,
	dragScroll: true,
	
	//selectable: false,
	unselectAuto: true,
	
	dropAccept: '*',

	eventLimit: false,
	eventLimitText: 'more',
	eventLimitClick: 'popover',
	dayPopoverFormat: 'LL',
	
	handleWindowResize: true,
	windowResizeDelay: 200 // milliseconds before a rerender happens
	
};


function generateShortTimeFormat(options, langData) {
	return langData.longDateFormat('LT')
		.replace(':mm', '(:mm)')
		.replace(/(\Wmm)$/, '($1)') // like above, but for foreign langs
		.replace(/\s*a$/i, 't'); // convert to AM/PM/am/pm to lowercase one-letter. remove any spaces beforehand
}


function generateWeekColumnFormat(options, langData) {
	var format = langData.longDateFormat('L'); // for the format like "MM/DD/YYYY"
	format = format.replace(/^Y+[^\w\s]*|[^\w\s]*Y+$/g, ''); // strip the year off the edge, as well as other misc non-whitespace chars
	if (options.isRTL) {
		format += ' ddd'; // for RTL, add day-of-week to end
	}
	else {
		format = 'ddd ' + format; // for LTR, add day-of-week to beginning
	}
	return format;
}


var langOptionHash = {
	en: {
		columnFormat: {
			week: 'ddd M/D' // override for english. different from the generated default, which is MM/DD
		},
		dayPopoverFormat: 'dddd, MMMM D'
	}
};


// right-to-left defaults
var rtlDefaults = {
	header: {
		left: 'next,prev today',
		center: '',
		right: 'title'
	},
	buttonIcons: {
		prev: 'right-single-arrow',
		next: 'left-single-arrow',
		prevYear: 'right-double-arrow',
		nextYear: 'left-double-arrow'
	},
	themeButtonIcons: {
		prev: 'circle-triangle-e',
		next: 'circle-triangle-w',
		nextYear: 'seek-prev',
		prevYear: 'seek-next'
	}
};

;;

var fc = $.fullCalendar = { version: "2.2.3" };
var fcViews = fc.views = {};


$.fn.fullCalendar = function(options) {
	var args = Array.prototype.slice.call(arguments, 1); // for a possible method call
	var res = this; // what this function will return (this jQuery object by default)

	this.each(function(i, _element) { // loop each DOM element involved
		var element = $(_element);
		var calendar = element.data('fullCalendar'); // get the existing calendar object (if any)
		var singleRes; // the returned value of this single method call

		// a method call
		if (typeof options === 'string') {
			if (calendar && $.isFunction(calendar[options])) {
				singleRes = calendar[options].apply(calendar, args);
				if (!i) {
					res = singleRes; // record the first method call result
				}
				if (options === 'destroy') { // for the destroy method, must remove Calendar object data
					element.removeData('fullCalendar');
				}
			}
		}
		// a new calendar initialization
		else if (!calendar) { // don't initialize twice
			calendar = new Calendar(element, options);
			element.data('fullCalendar', calendar);
			calendar.render();
		}
	});
	
	return res;
};


// function for adding/overriding defaults
function setDefaults(d) {
	mergeOptions(defaults, d);
}


// Recursively combines option hash-objects.
// Better than `$.extend(true, ...)` because arrays are not traversed/copied.
//
// called like:
//     mergeOptions(target, obj1, obj2, ...)
//
function mergeOptions(target) {

	function mergeIntoTarget(name, value) {
		if ($.isPlainObject(value) && $.isPlainObject(target[name]) && !isForcedAtomicOption(name)) {
			// merge into a new object to avoid destruction
			target[name] = mergeOptions({}, target[name], value); // combine. `value` object takes precedence
		}
		else if (value !== undefined) { // only use values that are set and not undefined
			target[name] = value;
		}
	}

	for (var i=1; i<arguments.length; i++) {
		$.each(arguments[i], mergeIntoTarget);
	}

	return target;
}


// overcome sucky view-option-hash and option-merging behavior messing with options it shouldn't
function isForcedAtomicOption(name) {
	// Any option that ends in "Time" or "Duration" is probably a Duration,
	// and these will commonly be specified as plain objects, which we don't want to mess up.
	return /(Time|Duration)$/.test(name);
}
// FIX: find a different solution for view-option-hashes and have a whitelist
// for options that can be recursively merged.

;;

//var langOptionHash = {}; // initialized in defaults.js
fc.langs = langOptionHash; // expose


// Initialize jQuery UI Datepicker translations while using some of the translations
// for our own purposes. Will set this as the default language for datepicker.
// Called from a translation file.
fc.datepickerLang = function(langCode, datepickerLangCode, options) {
	var langOptions = langOptionHash[langCode];

	// initialize FullCalendar's lang hash for this language
	if (!langOptions) {
		langOptions = langOptionHash[langCode] = {};
	}

	// merge certain Datepicker options into FullCalendar's options
	mergeOptions(langOptions, {
		isRTL: options.isRTL,
		weekNumberTitle: options.weekHeader,
		titleFormat: {
			month: options.showMonthAfterYear ?
				'YYYY[' + options.yearSuffix + '] MMMM' :
				'MMMM YYYY[' + options.yearSuffix + ']'
		},
		defaultButtonText: {
			// the translations sometimes wrongly contain HTML entities
			prev: stripHtmlEntities(options.prevText),
			next: stripHtmlEntities(options.nextText),
			today: stripHtmlEntities(options.currentText)
		}
	});

	// is jQuery UI Datepicker is on the page?
	if ($.datepicker) {

		// Register the language data.
		// FullCalendar and MomentJS use language codes like "pt-br" but Datepicker
		// does it like "pt-BR" or if it doesn't have the language, maybe just "pt".
		// Make an alias so the language can be referenced either way.
		$.datepicker.regional[datepickerLangCode] =
			$.datepicker.regional[langCode] = // alias
				options;

		// Alias 'en' to the default language data. Do this every time.
		$.datepicker.regional.en = $.datepicker.regional[''];

		// Set as Datepicker's global defaults.
		$.datepicker.setDefaults(options);
	}
};


// Sets FullCalendar-specific translations. Also sets the language as the global default.
// Called from a translation file.
fc.lang = function(langCode, options) {
	var langOptions;

	if (options) {
		langOptions = langOptionHash[langCode];

		// initialize the hash for this language
		if (!langOptions) {
			langOptions = langOptionHash[langCode] = {};
		}

		mergeOptions(langOptions, options || {});
	}

	// set it as the default language for FullCalendar
	defaults.lang = langCode;
};
;;

 
function Calendar(element, instanceOptions) {
	var t = this;



	// Build options object
	// -----------------------------------------------------------------------------------
	// Precedence (lowest to highest): defaults, rtlDefaults, langOptions, instanceOptions

	instanceOptions = instanceOptions || {};

	var options = mergeOptions({}, defaults, instanceOptions);
	var langOptions;

	// determine language options
	if (options.lang in langOptionHash) {
		langOptions = langOptionHash[options.lang];
	}
	else {
		langOptions = langOptionHash[defaults.lang];
	}

	if (langOptions) { // if language options exist, rebuild...
		options = mergeOptions({}, defaults, langOptions, instanceOptions);
	}

	if (options.isRTL) { // is isRTL, rebuild...
		options = mergeOptions({}, defaults, rtlDefaults, langOptions || {}, instanceOptions);
	}


	
	// Exports
	// -----------------------------------------------------------------------------------

	t.options = options;
	t.render = render;
	t.destroy = destroy;
	t.refetchEvents = refetchEvents;
	t.reportEvents = reportEvents;
	t.reportEventChange = reportEventChange;
	t.rerenderEvents = renderEvents; // `renderEvents` serves as a rerender. an API method
	t.changeView = changeView;
	t.select = select;
	t.unselect = unselect;
	t.prev = prev;
	t.next = next;
	t.prevYear = prevYear;
	t.nextYear = nextYear;
	t.today = today;
	t.gotoDate = gotoDate;
	t.incrementDate = incrementDate;
	t.zoomTo = zoomTo;
	t.getDate = getDate;
	t.getCalendar = getCalendar;
	t.getView = getView;
	t.option = option;
	t.trigger = trigger;



	// Language-data Internals
	// -----------------------------------------------------------------------------------
	// Apply overrides to the current language's data


	// Returns moment's internal locale data. If doesn't exist, returns English.
	// Works with moment-pre-2.8
	function getLocaleData(langCode) {
		var f = moment.localeData || moment.langData;
		return f.call(moment, langCode) ||
			f.call(moment, 'en'); // the newer localData could return null, so fall back to en
	}


	var localeData = createObject(getLocaleData(options.lang)); // make a cheap copy

	if (options.monthNames) {
		localeData._months = options.monthNames;
	}
	if (options.monthNamesShort) {
		localeData._monthsShort = options.monthNamesShort;
	}
	if (options.dayNames) {
		localeData._weekdays = options.dayNames;
	}
	if (options.dayNamesShort) {
		localeData._weekdaysShort = options.dayNamesShort;
	}
	if (options.firstDay != null) {
		var _week = createObject(localeData._week); // _week: { dow: # }
		_week.dow = options.firstDay;
		localeData._week = _week;
	}



	// Calendar-specific Date Utilities
	// -----------------------------------------------------------------------------------


	t.defaultAllDayEventDuration = moment.duration(options.defaultAllDayEventDuration);
	t.defaultTimedEventDuration = moment.duration(options.defaultTimedEventDuration);


	// Builds a moment using the settings of the current calendar: timezone and language.
	// Accepts anything the vanilla moment() constructor accepts.
	t.moment = function() {
		var mom;

		if (options.timezone === 'local') {
			mom = fc.moment.apply(null, arguments);

			// Force the moment to be local, because fc.moment doesn't guarantee it.
			if (mom.hasTime()) { // don't give ambiguously-timed moments a local zone
				mom.local();
			}
		}
		else if (options.timezone === 'UTC') {
			mom = fc.moment.utc.apply(null, arguments); // process as UTC
		}
		else {
			mom = fc.moment.parseZone.apply(null, arguments); // let the input decide the zone
		}

		if ('_locale' in mom) { // moment 2.8 and above
			mom._locale = localeData;
		}
		else { // pre-moment-2.8
			mom._lang = localeData;
		}

		return mom;
	};


	// Returns a boolean about whether or not the calendar knows how to calculate
	// the timezone offset of arbitrary dates in the current timezone.
	t.getIsAmbigTimezone = function() {
		return options.timezone !== 'local' && options.timezone !== 'UTC';
	};


	// Returns a copy of the given date in the current timezone of it is ambiguously zoned.
	// This will also give the date an unambiguous time.
	t.rezoneDate = function(date) {
		return t.moment(date.toArray());
	};


	// Returns a moment for the current date, as defined by the client's computer,
	// or overridden by the `now` option.
	t.getNow = function() {
		var now = options.now;
		if (typeof now === 'function') {
			now = now();
		}
		return t.moment(now);
	};


	// Calculates the week number for a moment according to the calendar's
	// `weekNumberCalculation` setting.
	t.calculateWeekNumber = function(mom) {
		var calc = options.weekNumberCalculation;

		if (typeof calc === 'function') {
			return calc(mom);
		}
		else if (calc === 'local') {
			return mom.week();
		}
		else if (calc.toUpperCase() === 'ISO') {
			return mom.isoWeek();
		}
	};


	// Get an event's normalized end date. If not present, calculate it from the defaults.
	t.getEventEnd = function(event) {
		if (event.end) {
			return event.end.clone();
		}
		else {
			return t.getDefaultEventEnd(event.allDay, event.start);
		}
	};


	// Given an event's allDay status and start date, return swhat its fallback end date should be.
	t.getDefaultEventEnd = function(allDay, start) { // TODO: rename to computeDefaultEventEnd
		var end = start.clone();

		if (allDay) {
			end.stripTime().add(t.defaultAllDayEventDuration);
		}
		else {
			end.add(t.defaultTimedEventDuration);
		}

		if (t.getIsAmbigTimezone()) {
			end.stripZone(); // we don't know what the tzo should be
		}

		return end;
	};



	// Date-formatting Utilities
	// -----------------------------------------------------------------------------------


	// Like the vanilla formatRange, but with calendar-specific settings applied.
	t.formatRange = function(m1, m2, formatStr) {

		// a function that returns a formatStr // TODO: in future, precompute this
		if (typeof formatStr === 'function') {
			formatStr = formatStr.call(t, options, localeData);
		}

		return formatRange(m1, m2, formatStr, null, options.isRTL);
	};


	// Like the vanilla formatDate, but with calendar-specific settings applied.
	t.formatDate = function(mom, formatStr) {

		// a function that returns a formatStr // TODO: in future, precompute this
		if (typeof formatStr === 'function') {
			formatStr = formatStr.call(t, options, localeData);
		}

		return formatDate(mom, formatStr);
	};


	
	// Imports
	// -----------------------------------------------------------------------------------


	EventManager.call(t, options);
	var isFetchNeeded = t.isFetchNeeded;
	var fetchEvents = t.fetchEvents;



	// Locals
	// -----------------------------------------------------------------------------------


	var _element = element[0];
	var header;
	var headerElement;
	var content;
	var tm; // for making theme classes
	var currentView;
	var suggestedViewHeight;
	var windowResizeProxy; // wraps the windowResize function
	var ignoreWindowResize = 0;
	var date;
	var events = [];
	
	
	
	// Main Rendering
	// -----------------------------------------------------------------------------------


	if (options.defaultDate != null) {
		date = t.moment(options.defaultDate);
	}
	else {
		date = t.getNow();
	}
	
	
	function render(inc) {
		if (!content) {
			initialRender();
		}
		else if (elementVisible()) {
			// mainly for the public API
			calcSize();
			renderView(inc);
		}
	}
	
	
	function initialRender() {
		tm = options.theme ? 'ui' : 'fc';
		element.addClass('fc');

		if (options.isRTL) {
			element.addClass('fc-rtl');
		}
		else {
			element.addClass('fc-ltr');
		}

		if (options.theme) {
			element.addClass('ui-widget');
		}
		else {
			element.addClass('fc-unthemed');
		}

		content = $("<div class='fc-view-container'/>").prependTo(element);

		header = new Header(t, options);
		headerElement = header.render();
		if (headerElement) {
			element.prepend(headerElement);
		}

		changeView(options.defaultView);

		if (options.handleWindowResize) {
			windowResizeProxy = debounce(windowResize, options.windowResizeDelay); // prevents rapid calls
			$(window).resize(windowResizeProxy);
		}
	}
	
	
	function destroy() {

		if (currentView) {
			currentView.destroy();
		}

		header.destroy();
		content.remove();
		element.removeClass('fc fc-ltr fc-rtl fc-unthemed ui-widget');

		$(window).unbind('resize', windowResizeProxy);
	}
	
	
	function elementVisible() {
		return element.is(':visible');
	}
	
	

	// View Rendering
	// -----------------------------------------------------------------------------------


	function changeView(viewName) {
		renderView(0, viewName);
	}


	// Renders a view because of a date change, view-type change, or for the first time
	function renderView(delta, viewName) {
		ignoreWindowResize++;

		// if viewName is changing, destroy the old view
		if (currentView && viewName && currentView.name !== viewName) {
			header.deactivateButton(currentView.name);
			freezeContentHeight(); // prevent a scroll jump when view element is removed
			if (currentView.start) { // rendered before?
				currentView.destroy();
			}
			currentView.el.remove();
			currentView = null;
		}

		// if viewName changed, or the view was never created, create a fresh view
		if (!currentView && viewName) {
			currentView = new fcViews[viewName](t);
			currentView.el =  $("<div class='fc-view fc-" + viewName + "-view' />").appendTo(content);
			header.activateButton(viewName);
		}

		if (currentView) {

			// let the view determine what the delta means
			if (delta) {
				date = currentView.incrementDate(date, delta);
			}

			// render or rerender the view
			if (
				!currentView.start || // never rendered before
				delta || // explicit date window change
				!date.isWithin(currentView.intervalStart, currentView.intervalEnd) // implicit date window change
			) {
				if (elementVisible()) {

					freezeContentHeight();
					if (currentView.start) { // rendered before?
						currentView.destroy();
					}
					currentView.render(date);
					unfreezeContentHeight();

					// need to do this after View::render, so dates are calculated
					updateTitle();
					updateTodayButton();

					getAndRenderEvents();
				}
			}
		}

		unfreezeContentHeight(); // undo any lone freezeContentHeight calls
		ignoreWindowResize--;
	}
	
	

	// Resizing
	// -----------------------------------------------------------------------------------


	t.getSuggestedViewHeight = function() {
		if (suggestedViewHeight === undefined) {
			calcSize();
		}
		return suggestedViewHeight;
	};


	t.isHeightAuto = function() {
		return options.contentHeight === 'auto' || options.height === 'auto';
	};
	
	
	function updateSize(shouldRecalc) {
		if (elementVisible()) {

			if (shouldRecalc) {
				_calcSize();
			}

			ignoreWindowResize++;
			currentView.updateSize(true); // isResize=true. will poll getSuggestedViewHeight() and isHeightAuto()
			ignoreWindowResize--;

			return true; // signal success
		}
	}


	function calcSize() {
		if (elementVisible()) {
			_calcSize();
		}
	}
	
	
	function _calcSize() { // assumes elementVisible
		if (typeof options.contentHeight === 'number') { // exists and not 'auto'
			suggestedViewHeight = options.contentHeight;
		}
		else if (typeof options.height === 'number') { // exists and not 'auto'
			suggestedViewHeight = options.height - (headerElement ? headerElement.outerHeight(true) : 0);
		}
		else {
			suggestedViewHeight = Math.round(content.width() / Math.max(options.aspectRatio, .5));
		}
	}
	
	
	function windowResize(ev) {
		if (
			!ignoreWindowResize &&
			ev.target === window && // so we don't process jqui "resize" events that have bubbled up
			currentView.start // view has already been rendered
		) {
			if (updateSize(true)) {
				currentView.trigger('windowResize', _element);
			}
		}
	}
	
	
	
	/* Event Fetching/Rendering
	-----------------------------------------------------------------------------*/
	// TODO: going forward, most of this stuff should be directly handled by the view


	function refetchEvents() { // can be called as an API method
		destroyEvents(); // so that events are cleared before user starts waiting for AJAX
		fetchAndRenderEvents();
	}


	function renderEvents() { // destroys old events if previously rendered
		if (elementVisible()) {
			freezeContentHeight();
			currentView.destroyEvents(); // no performance cost if never rendered
			currentView.renderEvents(events);
			unfreezeContentHeight();
		}
	}


	function destroyEvents() {
		freezeContentHeight();
		currentView.destroyEvents();
		unfreezeContentHeight();
	}
	

	function getAndRenderEvents() {
		if (!options.lazyFetching || isFetchNeeded(currentView.start, currentView.end)) {
			fetchAndRenderEvents();
		}
		else {
			renderEvents();
		}
	}


	function fetchAndRenderEvents() {
		fetchEvents(currentView.start, currentView.end);
			// ... will call reportEvents
			// ... which will call renderEvents
	}

	
	// called when event data arrives
	function reportEvents(_events) {
		events = _events;
		renderEvents();
	}


	// called when a single event's data has been changed
	function reportEventChange() {
		renderEvents();
	}



	/* Header Updating
	-----------------------------------------------------------------------------*/


	function updateTitle() {
		header.updateTitle(currentView.title);
	}


	function updateTodayButton() {
		var now = t.getNow();
		if (now.isWithin(currentView.intervalStart, currentView.intervalEnd)) {
			header.disableButton('today');
		}
		else {
			header.enableButton('today');
		}
	}
	


	/* Selection
	-----------------------------------------------------------------------------*/
	

	function select(start, end) {

		start = t.moment(start);
		if (end) {
			end = t.moment(end);
		}
		else if (start.hasTime()) {
			end = start.clone().add(t.defaultTimedEventDuration);
		}
		else {
			end = start.clone().add(t.defaultAllDayEventDuration);
		}

		currentView.select(start, end);
	}
	

	function unselect() { // safe to be called before renderView
		if (currentView) {
			currentView.unselect();
		}
	}
	
	
	
	/* Date
	-----------------------------------------------------------------------------*/
	
	
	function prev() {
		renderView(-1);
	}
	
	
	function next() {
		renderView(1);
	}
	
	
	function prevYear() {
		date.add(-1, 'years');
		renderView();
	}
	
	
	function nextYear() {
		date.add(1, 'years');
		renderView();
	}
	
	
	function today() {
		date = t.getNow();
		renderView();
	}
	
	
	function gotoDate(dateInput) {
		date = t.moment(dateInput);
		renderView();
	}
	
	
	function incrementDate(delta) {
		date.add(moment.duration(delta));
		renderView();
	}


	// Forces navigation to a view for the given date.
	// `viewName` can be a specific view name or a generic one like "week" or "day".
	function zoomTo(newDate, viewName) {
		var viewStr;
		var match;

		if (!viewName || fcViews[viewName] === undefined) { // a general view name, or "auto"
			viewName = viewName || 'day';
			viewStr = header.getViewsWithButtons().join(' '); // space-separated string of all the views in the header

			// try to match a general view name, like "week", against a specific one, like "agendaWeek"
			match = viewStr.match(new RegExp('\\w+' + capitaliseFirstLetter(viewName)));

			// fall back to the day view being used in the header
			if (!match) {
				match = viewStr.match(/\w+Day/);
			}

			viewName = match ? match[0] : 'agendaDay'; // fall back to agendaDay
		}

		date = newDate;
		changeView(viewName);
	}
	
	
	function getDate() {
		return date.clone();
	}



	/* Height "Freezing"
	-----------------------------------------------------------------------------*/


	function freezeContentHeight() {
		content.css({
			width: '100%',
			height: content.height(),
			overflow: 'hidden'
		});
	}


	function unfreezeContentHeight() {
		content.css({
			width: '',
			height: '',
			overflow: ''
		});
	}
	
	
	
	/* Misc
	-----------------------------------------------------------------------------*/
	

	function getCalendar() {
		return t;
	}

	
	function getView() {
		return currentView;
	}
	
	
	function option(name, value) {
		if (value === undefined) {
			return options[name];
		}
		if (name == 'height' || name == 'contentHeight' || name == 'aspectRatio') {
			options[name] = value;
			updateSize(true); // true = allow recalculation of height
		}
	}
	
	
	function trigger(name, thisObj) {
		if (options[name]) {
			return options[name].apply(
				thisObj || _element,
				Array.prototype.slice.call(arguments, 2)
			);
		}
	}

}

;;

/* Top toolbar area with buttons and title
----------------------------------------------------------------------------------------------------------------------*/
// TODO: rename all header-related things to "toolbar"

function Header(calendar, options) {
	var t = this;
	
	// exports
	t.render = render;
	t.destroy = destroy;
	t.updateTitle = updateTitle;
	t.activateButton = activateButton;
	t.deactivateButton = deactivateButton;
	t.disableButton = disableButton;
	t.enableButton = enableButton;
	t.getViewsWithButtons = getViewsWithButtons;
	
	// locals
	var el = $();
	var viewsWithButtons = [];
	var tm;


	function render() {
		var sections = options.header;

		tm = options.theme ? 'ui' : 'fc';

		if (sections) {
			el = $("<div class='fc-toolbar'/>")
				.append(renderSection('left'))
				.append(renderSection('right'))
				.append(renderSection('center'))
				.append('<div class="fc-clear"/>');

			return el;
		}
	}
	
	
	function destroy() {
		el.remove();
	}
	
	
	function renderSection(position) {
		var sectionEl = $('<div class="fc-' + position + '"/>');
		var buttonStr = options.header[position];

		if (buttonStr) {
			$.each(buttonStr.split(' '), function(i) {
				var groupChildren = $();
				var isOnlyButtons = true;
				var groupEl;

				$.each(this.split(','), function(j, buttonName) {
					var buttonClick;
					var themeIcon;
					var normalIcon;
					var defaultText;
					var customText;
					var innerHtml;
					var classes;
					var button;

					if (buttonName == 'title') {
						groupChildren = groupChildren.add($('<h2>&nbsp;</h2>')); // we always want it to take up height
						isOnlyButtons = false;
					}
					else {
						if (calendar[buttonName]) { // a calendar method
							buttonClick = function() {
								calendar[buttonName]();
							};
						}
						else if (fcViews[buttonName]) { // a view name
							buttonClick = function() {
								calendar.changeView(buttonName);
							};
							viewsWithButtons.push(buttonName);
						}
						if (buttonClick) {

							// smartProperty allows different text per view button (ex: "Agenda Week" vs "Basic Week")
							themeIcon = smartProperty(options.themeButtonIcons, buttonName);
							normalIcon = smartProperty(options.buttonIcons, buttonName);
							defaultText = smartProperty(options.defaultButtonText, buttonName);
							customText = smartProperty(options.buttonText, buttonName);

							if (customText) {
								innerHtml = htmlEscape(customText);
							}
							else if (themeIcon && options.theme) {
								innerHtml = "<span class='ui-icon ui-icon-" + themeIcon + "'></span>";
							}
							else if (normalIcon && !options.theme) {
								innerHtml = "<span class='fc-icon fc-icon-" + normalIcon + "'></span>";
							}
							else {
								innerHtml = htmlEscape(defaultText || buttonName);
							}

							classes = [
								'fc-' + buttonName + '-button',
								tm + '-button',
								tm + '-state-default'
							];

							button = $( // type="button" so that it doesn't submit a form
								'<button type="button" class="' + classes.join(' ') + '">' +
									innerHtml +
								'</button>'
								)
								.click(function() {
									// don't process clicks for disabled buttons
									if (!button.hasClass(tm + '-state-disabled')) {

										buttonClick();

										// after the click action, if the button becomes the "active" tab, or disabled,
										// it should never have a hover class, so remove it now.
										if (
											button.hasClass(tm + '-state-active') ||
											button.hasClass(tm + '-state-disabled')
										) {
											button.removeClass(tm + '-state-hover');
										}
									}
								})
								.mousedown(function() {
									// the *down* effect (mouse pressed in).
									// only on buttons that are not the "active" tab, or disabled
									button
										.not('.' + tm + '-state-active')
										.not('.' + tm + '-state-disabled')
										.addClass(tm + '-state-down');
								})
								.mouseup(function() {
									// undo the *down* effect
									button.removeClass(tm + '-state-down');
								})
								.hover(
									function() {
										// the *hover* effect.
										// only on buttons that are not the "active" tab, or disabled
										button
											.not('.' + tm + '-state-active')
											.not('.' + tm + '-state-disabled')
											.addClass(tm + '-state-hover');
									},
									function() {
										// undo the *hover* effect
										button
											.removeClass(tm + '-state-hover')
											.removeClass(tm + '-state-down'); // if mouseleave happens before mouseup
									}
								);

							groupChildren = groupChildren.add(button);
						}
					}
				});

				if (isOnlyButtons) {
					groupChildren
						.first().addClass(tm + '-corner-left').end()
						.last().addClass(tm + '-corner-right').end();
				}

				if (groupChildren.length > 1) {
					groupEl = $('<div/>');
					if (isOnlyButtons) {
						groupEl.addClass('fc-button-group');
					}
					groupEl.append(groupChildren);
					sectionEl.append(groupEl);
				}
				else {
					sectionEl.append(groupChildren); // 1 or 0 children
				}
			});
		}

		return sectionEl;
	}
	
	
	function updateTitle(text) {
		el.find('h2').text(text);
	}
	
	
	function activateButton(buttonName) {
		el.find('.fc-' + buttonName + '-button')
			.addClass(tm + '-state-active');
	}
	
	
	function deactivateButton(buttonName) {
		el.find('.fc-' + buttonName + '-button')
			.removeClass(tm + '-state-active');
	}
	
	
	function disableButton(buttonName) {
		el.find('.fc-' + buttonName + '-button')
			.attr('disabled', 'disabled')
			.addClass(tm + '-state-disabled');
	}
	
	
	function enableButton(buttonName) {
		el.find('.fc-' + buttonName + '-button')
			.removeAttr('disabled')
			.removeClass(tm + '-state-disabled');
	}


	function getViewsWithButtons() {
		return viewsWithButtons;
	}

}

;;

fc.sourceNormalizers = [];
fc.sourceFetchers = [];

var ajaxDefaults = {
	dataType: 'json',
	cache: false
};

var eventGUID = 1;


function EventManager(options) { // assumed to be a calendar
	var t = this;
	
	
	// exports
	t.isFetchNeeded = isFetchNeeded;
	t.fetchEvents = fetchEvents;
	t.addEventSource = addEventSource;
	t.removeEventSource = removeEventSource;
	t.updateEvent = updateEvent;
	t.renderEvent = renderEvent;
	t.removeEvents = removeEvents;
	t.clientEvents = clientEvents;
	t.mutateEvent = mutateEvent;
	
	
	// imports
	var trigger = t.trigger;
	var getView = t.getView;
	var reportEvents = t.reportEvents;
	var getEventEnd = t.getEventEnd;
	
	
	// locals
	var stickySource = { events: [] };
	var sources = [ stickySource ];
	var rangeStart, rangeEnd;
	var currentFetchID = 0;
	var pendingSourceCnt = 0;
	var loadingLevel = 0;
	var cache = []; // holds events that have already been expanded


	$.each(
		(options.events ? [ options.events ] : []).concat(options.eventSources || []),
		function(i, sourceInput) {
			var source = buildEventSource(sourceInput);
			if (source) {
				sources.push(source);
			}
		}
	);
	
	
	
	/* Fetching
	-----------------------------------------------------------------------------*/
	
	
	function isFetchNeeded(start, end) {
		return !rangeStart || // nothing has been fetched yet?
			// or, a part of the new range is outside of the old range? (after normalizing)
			start.clone().stripZone() < rangeStart.clone().stripZone() ||
			end.clone().stripZone() > rangeEnd.clone().stripZone();
	}
	
	
	function fetchEvents(start, end) {
		rangeStart = start;
		rangeEnd = end;
		cache = [];
		var fetchID = ++currentFetchID;
		var len = sources.length;
		pendingSourceCnt = len;
		for (var i=0; i<len; i++) {
			fetchEventSource(sources[i], fetchID);
		}
	}
	
	
	function fetchEventSource(source, fetchID) {
		_fetchEventSource(source, function(eventInputs) {
			var isArraySource = $.isArray(source.events);
			var i, eventInput;
			var abstractEvent;

			if (fetchID == currentFetchID) {

				if (eventInputs) {
					for (i = 0; i < eventInputs.length; i++) {
						eventInput = eventInputs[i];

						if (isArraySource) { // array sources have already been convert to Event Objects
							abstractEvent = eventInput;
						}
						else {
							abstractEvent = buildEventFromInput(eventInput, source);
						}

						if (abstractEvent) { // not false (an invalid event)
							cache.push.apply(
								cache,
								expandEvent(abstractEvent) // add individual expanded events to the cache
							);
						}
					}
				}

				pendingSourceCnt--;
				if (!pendingSourceCnt) {
					reportEvents(cache);
				}
			}
		});
	}
	
	
	function _fetchEventSource(source, callback) {
		var i;
		var fetchers = fc.sourceFetchers;
		var res;

		for (i=0; i<fetchers.length; i++) {
			res = fetchers[i].call(
				t, // this, the Calendar object
				source,
				rangeStart.clone(),
				rangeEnd.clone(),
				options.timezone,
				callback
			);

			if (res === true) {
				// the fetcher is in charge. made its own async request
				return;
			}
			else if (typeof res == 'object') {
				// the fetcher returned a new source. process it
				_fetchEventSource(res, callback);
				return;
			}
		}

		var events = source.events;
		if (events) {
			if ($.isFunction(events)) {
				pushLoading();
				events.call(
					t, // this, the Calendar object
					rangeStart.clone(),
					rangeEnd.clone(),
					options.timezone,
					function(events) {
						callback(events);
						popLoading();
					}
				);
			}
			else if ($.isArray(events)) {
				callback(events);
			}
			else {
				callback();
			}
		}else{
			var url = source.url;
			if (url) {
				var success = source.success;
				var error = source.error;
				var complete = source.complete;

				// retrieve any outbound GET/POST $.ajax data from the options
				var customData;
				if ($.isFunction(source.data)) {
					// supplied as a function that returns a key/value object
					customData = source.data();
				}
				else {
					// supplied as a straight key/value object
					customData = source.data;
				}

				// use a copy of the custom data so we can modify the parameters
				// and not affect the passed-in object.
				var data = $.extend({}, customData || {});

				var startParam = firstDefined(source.startParam, options.startParam);
				var endParam = firstDefined(source.endParam, options.endParam);
				var timezoneParam = firstDefined(source.timezoneParam, options.timezoneParam);

				if (startParam) {
					data[startParam] = rangeStart.format();
				}
				if (endParam) {
					data[endParam] = rangeEnd.format();
				}
				if (options.timezone && options.timezone != 'local') {
					data[timezoneParam] = options.timezone;
				}

				pushLoading();
				$.ajax($.extend({}, ajaxDefaults, source, {
					data: data,
					success: function(events) {
						events = events || [];
						var res = applyAll(success, this, arguments);
						if ($.isArray(res)) {
							events = res;
						}
						callback(events);
					},
					error: function() {
						applyAll(error, this, arguments);
						callback();
					},
					complete: function() {
						applyAll(complete, this, arguments);
						popLoading();
					}
				}));
			}else{
				callback();
			}
		}
	}
	
	
	
	/* Sources
	-----------------------------------------------------------------------------*/
	

	function addEventSource(sourceInput) {
		var source = buildEventSource(sourceInput);
		if (source) {
			sources.push(source);
			pendingSourceCnt++;
			fetchEventSource(source, currentFetchID); // will eventually call reportEvents
		}
	}


	function buildEventSource(sourceInput) { // will return undefined if invalid source
		var normalizers = fc.sourceNormalizers;
		var source;
		var i;

		if ($.isFunction(sourceInput) || $.isArray(sourceInput)) {
			source = { events: sourceInput };
		}
		else if (typeof sourceInput === 'string') {
			source = { url: sourceInput };
		}
		else if (typeof sourceInput === 'object') {
			source = $.extend({}, sourceInput); // shallow copy
		}

		if (source) {

			// TODO: repeat code, same code for event classNames
			if (source.className) {
				if (typeof source.className === 'string') {
					source.className = source.className.split(/\s+/);
				}
				// otherwise, assumed to be an array
			}
			else {
				source.className = [];
			}

			// for array sources, we convert to standard Event Objects up front
			if ($.isArray(source.events)) {
				source.origArray = source.events; // for removeEventSource
				source.events = $.map(source.events, function(eventInput) {
					return buildEventFromInput(eventInput, source);
				});
			}

			for (i=0; i<normalizers.length; i++) {
				normalizers[i].call(t, source);
			}

			return source;
		}
	}


	function removeEventSource(source) {
		sources = $.grep(sources, function(src) {
			return !isSourcesEqual(src, source);
		});
		// remove all client events from that source
		cache = $.grep(cache, function(e) {
			return !isSourcesEqual(e.source, source);
		});
		reportEvents(cache);
	}


	function isSourcesEqual(source1, source2) {
		return source1 && source2 && getSourcePrimitive(source1) == getSourcePrimitive(source2);
	}


	function getSourcePrimitive(source) {
		return (
			(typeof source === 'object') ? // a normalized event source?
				(source.origArray || source.googleCalendarId || source.url || source.events) : // get the primitive
				null
		) ||
		source; // the given argument *is* the primitive
	}
	
	
	
	/* Manipulation
	-----------------------------------------------------------------------------*/


	function updateEvent(event) {

		event.start = t.moment(event.start);
		if (event.end) {
			event.end = t.moment(event.end);
		}

		mutateEvent(event);
		propagateMiscProperties(event);
		reportEvents(cache); // reports event modifications (so we can redraw)
	}


	var miscCopyableProps = [
		'title',
		'url',
		'allDay',
		'className',
		'editable',
		'color',
		'backgroundColor',
		'borderColor',
		'textColor'
	];

	function propagateMiscProperties(event) {
		var i;
		var cachedEvent;
		var j;
		var prop;

		for (i=0; i<cache.length; i++) {
			cachedEvent = cache[i];
			if (cachedEvent._id == event._id && cachedEvent !== event) {
				for (j=0; j<miscCopyableProps.length; j++) {
					prop = miscCopyableProps[j];
					if (event[prop] !== undefined) {
						cachedEvent[prop] = event[prop];
					}
				}
			}
		}
	}

	
	// returns the expanded events that were created
	function renderEvent(eventInput, stick) {
		var abstractEvent = buildEventFromInput(eventInput);
		var events;
		var i, event;

		if (abstractEvent) { // not false (a valid input)
			events = expandEvent(abstractEvent);

			for (i = 0; i < events.length; i++) {
				event = events[i];

				if (!event.source) {
					if (stick) {
						stickySource.events.push(event);
						event.source = stickySource;
					}
					cache.push(event);
				}
			}

			reportEvents(cache);

			return events;
		}

		return [];
	}
	
	
	function removeEvents(filter) {
		var eventID;
		var i;

		if (filter == null) { // null or undefined. remove all events
			filter = function() { return true; }; // will always match
		}
		else if (!$.isFunction(filter)) { // an event ID
			eventID = filter + '';
			filter = function(event) {
				return event._id == eventID;
			};
		}

		// Purge event(s) from our local cache
		cache = $.grep(cache, filter, true); // inverse=true

		// Remove events from array sources.
		// This works because they have been converted to official Event Objects up front.
		// (and as a result, event._id has been calculated).
		for (i=0; i<sources.length; i++) {
			if ($.isArray(sources[i].events)) {
				sources[i].events = $.grep(sources[i].events, filter, true);
			}
		}

		reportEvents(cache);
	}
	
	
	function clientEvents(filter) {
		if ($.isFunction(filter)) {
			return $.grep(cache, filter);
		}
		else if (filter != null) { // not null, not undefined. an event ID
			filter += '';
			return $.grep(cache, function(e) {
				return e._id == filter;
			});
		}
		return cache; // else, return all
	}
	
	
	
	/* Loading State
	-----------------------------------------------------------------------------*/
	
	
	function pushLoading() {
		if (!(loadingLevel++)) {
			trigger('loading', null, true, getView());
		}
	}
	
	
	function popLoading() {
		if (!(--loadingLevel)) {
			trigger('loading', null, false, getView());
		}
	}
	
	
	
	/* Event Normalization
	-----------------------------------------------------------------------------*/


	// Given a raw object with key/value properties, returns an "abstract" Event object.
	// An "abstract" event is an event that, if recurring, will not have been expanded yet.
	// Will return `false` when input is invalid.
	// `source` is optional
	function buildEventFromInput(input, source) {
		var out = {};
		var start, end;
		var allDay;
		var allDayDefault;

		if (options.eventDataTransform) {
			input = options.eventDataTransform(input);
		}
		if (source && source.eventDataTransform) {
			input = source.eventDataTransform(input);
		}

		// Copy all properties over to the resulting object.
		// The special-case properties will be copied over afterwards.
		$.extend(out, input);

		if (source) {
			out.source = source;
		}

		out._id = input._id || (input.id === undefined ? '_fc' + eventGUID++ : input.id + '');

		if (input.className) {
			if (typeof input.className == 'string') {
				out.className = input.className.split(/\s+/);
			}
			else { // assumed to be an array
				out.className = input.className;
			}
		}
		else {
			out.className = [];
		}

		start = input.start || input.date; // "date" is an alias for "start"
		end = input.end;

		// parse as a time (Duration) if applicable
		if (isTimeString(start)) {
			start = moment.duration(start);
		}
		if (isTimeString(end)) {
			end = moment.duration(end);
		}

		if (input.dow || moment.isDuration(start) || moment.isDuration(end)) {

			// the event is "abstract" (recurring) so don't calculate exact start/end dates just yet
			out.start = start ? moment.duration(start) : null; // will be a Duration or null
			out.end = end ? moment.duration(end) : null; // will be a Duration or null
			out._recurring = true; // our internal marker
		}
		else {

			if (start) {
				start = t.moment(start);
				if (!start.isValid()) {
					return false;
				}
			}

			if (end) {
				end = t.moment(end);
				if (!end.isValid()) {
					end = null; // let defaults take over
				}
			}

			allDay = input.allDay;
			if (allDay === undefined) {
				allDayDefault = firstDefined(
					source ? source.allDayDefault : undefined,
					options.allDayDefault
				);
				if (allDayDefault !== undefined) {
					// use the default
					allDay = allDayDefault;
				}
				else {
					// if a single date has a time, the event should not be all-day
					allDay = !start.hasTime() && (!end || !end.hasTime());
				}
			}

			assignDatesToEvent(start, end, allDay, out);
		}

		return out;
	}


	// Normalizes and assigns the given dates to the given partially-formed event object.
	// Requires an explicit `allDay` boolean parameter.
	// NOTE: mutates the given start/end moments. does not make an internal copy
	function assignDatesToEvent(start, end, allDay, event) {

		// normalize the date based on allDay
		if (allDay) {
			// neither date should have a time
			if (start.hasTime()) {
				start.stripTime();
			}
			if (end && end.hasTime()) {
				end.stripTime();
			}
		}
		else {
			// force a time/zone up the dates
			if (!start.hasTime()) {
				start = t.rezoneDate(start);
			}
			if (end && !end.hasTime()) {
				end = t.rezoneDate(end);
			}
		}

		if (end && end <= start) { // end is exclusive. must be after start
			end = null; // let defaults take over
		}

		event.allDay = allDay;
		event.start = start;
		event.end = end || null; // ensure null if falsy

		if (options.forceEventDuration && !event.end) {
			event.end = getEventEnd(event);
		}

		backupEventDates(event);
	}


	// If the given event is a recurring event, break it down into an array of individual instances.
	// If not a recurring event, return an array with the single original event.
	// If given a falsy input (probably because of a failed buildEventFromInput call), returns an empty array.
	// HACK: can override the recurring window by providing custom rangeStart/rangeEnd (for businessHours).
	function expandEvent(abstractEvent, _rangeStart, _rangeEnd) {
		var events = [];
		var dowHash;
		var dow;
		var i;
		var date;
		var startTime, endTime;
		var start, end;
		var event;

		_rangeStart = _rangeStart || rangeStart;
		_rangeEnd = _rangeEnd || rangeEnd;

		if (abstractEvent) {
			if (abstractEvent._recurring) {

				// make a boolean hash as to whether the event occurs on each day-of-week
				if ((dow = abstractEvent.dow)) {
					dowHash = {};
					for (i = 0; i < dow.length; i++) {
						dowHash[dow[i]] = true;
					}
				}

				// iterate through every day in the current range
				date = _rangeStart.clone().stripTime(); // holds the date of the current day
				while (date.isBefore(_rangeEnd)) {

					if (!dowHash || dowHash[date.day()]) { // if everyday, or this particular day-of-week

						startTime = abstractEvent.start; // the stored start and end properties are times (Durations)
						endTime = abstractEvent.end; // "
						start = date.clone();
						end = null;

						if (startTime) {
							start = start.time(startTime);
						}
						if (endTime) {
							end = date.clone().time(endTime);
						}

						event = $.extend({}, abstractEvent); // make a copy of the original
						assignDatesToEvent(
							start, end,
							!startTime && !endTime, // allDay?
							event
						);
						events.push(event);
					}

					date.add(1, 'days');
				}
			}
			else {
				events.push(abstractEvent); // return the original event. will be a one-item array
			}
		}

		return events;
	}



	/* Event Modification Math
	-----------------------------------------------------------------------------------------*/


	// Modify the date(s) of an event and make this change propagate to all other events with
	// the same ID (related repeating events).
	//
	// If `newStart`/`newEnd` are not specified, the "new" dates are assumed to be `event.start` and `event.end`.
	// The "old" dates to be compare against are always `event._start` and `event._end` (set by EventManager).
	//
	// Returns an object with delta information and a function to undo all operations.
	//
	function mutateEvent(event, newStart, newEnd) {
		var oldAllDay = event._allDay;
		var oldStart = event._start;
		var oldEnd = event._end;
		var clearEnd = false;
		var newAllDay;
		var dateDelta;
		var durationDelta;
		var undoFunc;

		// if no new dates were passed in, compare against the event's existing dates
		if (!newStart && !newEnd) {
			newStart = event.start;
			newEnd = event.end;
		}

		// NOTE: throughout this function, the initial values of `newStart` and `newEnd` are
		// preserved. These values may be undefined.

		// detect new allDay
		if (event.allDay != oldAllDay) { // if value has changed, use it
			newAllDay = event.allDay;
		}
		else { // otherwise, see if any of the new dates are allDay
			newAllDay = !(newStart || newEnd).hasTime();
		}

		// normalize the new dates based on allDay
		if (newAllDay) {
			if (newStart) {
				newStart = newStart.clone().stripTime();
			}
			if (newEnd) {
				newEnd = newEnd.clone().stripTime();
			}
		}

		// compute dateDelta
		if (newStart) {
			if (newAllDay) {
				dateDelta = dayishDiff(newStart, oldStart.clone().stripTime()); // treat oldStart as allDay
			}
			else {
				dateDelta = dayishDiff(newStart, oldStart);
			}
		}

		if (newAllDay != oldAllDay) {
			// if allDay has changed, always throw away the end
			clearEnd = true;
		}
		else if (newEnd) {
			durationDelta = dayishDiff(
				// new duration
				newEnd || t.getDefaultEventEnd(newAllDay, newStart || oldStart),
				newStart || oldStart
			).subtract(dayishDiff(
				// subtract old duration
				oldEnd || t.getDefaultEventEnd(oldAllDay, oldStart),
				oldStart
			));
		}

		undoFunc = mutateEvents(
			clientEvents(event._id), // get events with this ID
			clearEnd,
			newAllDay,
			dateDelta,
			durationDelta
		);

		return {
			dateDelta: dateDelta,
			durationDelta: durationDelta,
			undo: undoFunc
		};
	}


	// Modifies an array of events in the following ways (operations are in order):
	// - clear the event's `end`
	// - convert the event to allDay
	// - add `dateDelta` to the start and end
	// - add `durationDelta` to the event's duration
	//
	// Returns a function that can be called to undo all the operations.
	//
	function mutateEvents(events, clearEnd, forceAllDay, dateDelta, durationDelta) {
		var isAmbigTimezone = t.getIsAmbigTimezone();
		var undoFunctions = [];

		$.each(events, function(i, event) {
			var oldAllDay = event._allDay;
			var oldStart = event._start;
			var oldEnd = event._end;
			var newAllDay = forceAllDay != null ? forceAllDay : oldAllDay;
			var newStart = oldStart.clone();
			var newEnd = (!clearEnd && oldEnd) ? oldEnd.clone() : null;

			// NOTE: this function is responsible for transforming `newStart` and `newEnd`,
			// which were initialized to the OLD values first. `newEnd` may be null.

			// normlize newStart/newEnd to be consistent with newAllDay
			if (newAllDay) {
				newStart.stripTime();
				if (newEnd) {
					newEnd.stripTime();
				}
			}
			else {
				if (!newStart.hasTime()) {
					newStart = t.rezoneDate(newStart);
				}
				if (newEnd && !newEnd.hasTime()) {
					newEnd = t.rezoneDate(newEnd);
				}
			}

			// ensure we have an end date if necessary
			if (!newEnd && (options.forceEventDuration || +durationDelta)) {
				newEnd = t.getDefaultEventEnd(newAllDay, newStart);
			}

			// translate the dates
			newStart.add(dateDelta);
			if (newEnd) {
				newEnd.add(dateDelta).add(durationDelta);
			}

			// if the dates have changed, and we know it is impossible to recompute the
			// timezone offsets, strip the zone.
			if (isAmbigTimezone) {
				if (+dateDelta || +durationDelta) {
					newStart.stripZone();
					if (newEnd) {
						newEnd.stripZone();
					}
				}
			}

			event.allDay = newAllDay;
			event.start = newStart;
			event.end = newEnd;
			backupEventDates(event);

			undoFunctions.push(function() {
				event.allDay = oldAllDay;
				event.start = oldStart;
				event.end = oldEnd;
				backupEventDates(event);
			});
		});

		return function() {
			for (var i=0; i<undoFunctions.length; i++) {
				undoFunctions[i]();
			}
		};
	}


	/* Business Hours
	-----------------------------------------------------------------------------------------*/

	t.getBusinessHoursEvents = getBusinessHoursEvents;


	// Returns an array of events as to when the business hours occur in the given view.
	// Abuse of our event system :(
	function getBusinessHoursEvents() {
		var optionVal = options.businessHours;
		var defaultVal = {
			className: 'fc-nonbusiness',
			start: '09:00',
			end: '17:00',
			dow: [ 1, 2, 3, 4, 5 ], // monday - friday
			rendering: 'inverse-background'
		};
		var view = t.getView();
		var eventInput;

		if (optionVal) {
			if (typeof optionVal === 'object') {
				// option value is an object that can override the default business hours
				eventInput = $.extend({}, defaultVal, optionVal);
			}
			else {
				// option value is `true`. use default business hours
				eventInput = defaultVal;
			}
		}

		if (eventInput) {
			return expandEvent(
				buildEventFromInput(eventInput),
				view.start,
				view.end
			);
		}

		return [];
	}


	/* Overlapping / Constraining
	-----------------------------------------------------------------------------------------*/

	t.isEventAllowedInRange = isEventAllowedInRange;
	t.isSelectionAllowedInRange = isSelectionAllowedInRange;
	t.isExternalDragAllowedInRange = isExternalDragAllowedInRange;


	function isEventAllowedInRange(event, start, end) {
		var source = event.source || {};
		var constraint = firstDefined(
			event.constraint,
			source.constraint,
			options.eventConstraint
		);
		var overlap = firstDefined(
			event.overlap,
			source.overlap,
			options.eventOverlap
		);

		return isRangeAllowed(start, end, constraint, overlap, event);
	}


	function isSelectionAllowedInRange(start, end) {
		return isRangeAllowed(
			start,
			end,
			options.selectConstraint,
			options.selectOverlap
		);
	}


	function isExternalDragAllowedInRange(start, end, eventInput) { // eventInput is optional associated event data
		var event;

		if (eventInput) {
			event = expandEvent(buildEventFromInput(eventInput))[0];
			if (event) {
				return isEventAllowedInRange(event, start, end);
			}
		}

		return isSelectionAllowedInRange(start, end); // treat it as a selection
	}


	// Returns true if the given range (caused by an event drop/resize or a selection) is allowed to exist
	// according to the constraint/overlap settings.
	// `event` is not required if checking a selection.
	function isRangeAllowed(start, end, constraint, overlap, event) {
		var constraintEvents;
		var anyContainment;
		var i, otherEvent;
		var otherOverlap;

		// normalize. fyi, we're normalizing in too many places :(
		start = start.clone().stripZone();
		end = end.clone().stripZone();

		// the range must be fully contained by at least one of produced constraint events
		if (constraint != null) {
			constraintEvents = constraintToEvents(constraint);
			anyContainment = false;

			for (i = 0; i < constraintEvents.length; i++) {
				if (eventContainsRange(constraintEvents[i], start, end)) {
					anyContainment = true;
					break;
				}
			}

			if (!anyContainment) {
				return false;
			}
		}

		for (i = 0; i < cache.length; i++) { // loop all events and detect overlap
			otherEvent = cache[i];

			// don't compare the event to itself or other related [repeating] events
			if (event && event._id === otherEvent._id) {
				continue;
			}

			// there needs to be an actual intersection before disallowing anything
			if (eventIntersectsRange(otherEvent, start, end)) {

				// evaluate overlap for the given range and short-circuit if necessary
				if (overlap === false) {
					return false;
				}
				else if (typeof overlap === 'function' && !overlap(otherEvent, event)) {
					return false;
				}

				// if we are computing if the given range is allowable for an event, consider the other event's
				// EventObject-specific or Source-specific `overlap` property
				if (event) {
					otherOverlap = firstDefined(
						otherEvent.overlap,
						(otherEvent.source || {}).overlap
						// we already considered the global `eventOverlap`
					);
					if (otherOverlap === false) {
						return false;
					}
					if (typeof otherOverlap === 'function' && !otherOverlap(event, otherEvent)) {
						return false;
					}
				}
			}
		}

		return true;
	}


	// Given an event input from the API, produces an array of event objects. Possible event inputs:
	// 'businessHours'
	// An event ID (number or string)
	// An object with specific start/end dates or a recurring event (like what businessHours accepts)
	function constraintToEvents(constraintInput) {

		if (constraintInput === 'businessHours') {
			return getBusinessHoursEvents();
		}

		if (typeof constraintInput === 'object') {
			return expandEvent(buildEventFromInput(constraintInput));
		}

		return clientEvents(constraintInput); // probably an ID
	}


	// Is the event's date ranged fully contained by the given range?
	// start/end already assumed to have stripped zones :(
	function eventContainsRange(event, start, end) {
		var eventStart = event.start.clone().stripZone();
		var eventEnd = t.getEventEnd(event).stripZone();

		return start >= eventStart && end <= eventEnd;
	}


	// Does the event's date range intersect with the given range?
	// start/end already assumed to have stripped zones :(
	function eventIntersectsRange(event, start, end) {
		var eventStart = event.start.clone().stripZone();
		var eventEnd = t.getEventEnd(event).stripZone();

		return start < eventEnd && end > eventStart;
	}

}


// updates the "backup" properties, which are preserved in order to compute diffs later on.
function backupEventDates(event) {
	event._allDay = event.allDay;
	event._start = event.start.clone();
	event._end = event.end ? event.end.clone() : null;
}

;;

/* FullCalendar-specific DOM Utilities
----------------------------------------------------------------------------------------------------------------------*/


// Given the scrollbar widths of some other container, create borders/margins on rowEls in order to match the left
// and right space that was offset by the scrollbars. A 1-pixel border first, then margin beyond that.
function compensateScroll(rowEls, scrollbarWidths) {
	if (scrollbarWidths.left) {
		rowEls.css({
			'border-left-width': 1,
			'margin-left': scrollbarWidths.left - 1
		});
	}
	if (scrollbarWidths.right) {
		rowEls.css({
			'border-right-width': 1,
			'margin-right': scrollbarWidths.right - 1
		});
	}
}


// Undoes compensateScroll and restores all borders/margins
function uncompensateScroll(rowEls) {
	rowEls.css({
		'margin-left': '',
		'margin-right': '',
		'border-left-width': '',
		'border-right-width': ''
	});
}


// Make the mouse cursor express that an event is not allowed in the current area
function disableCursor() {
	$('body').addClass('fc-not-allowed');
}


// Returns the mouse cursor to its original look
function enableCursor() {
	$('body').removeClass('fc-not-allowed');
}


// Given a total available height to fill, have `els` (essentially child rows) expand to accomodate.
// By default, all elements that are shorter than the recommended height are expanded uniformly, not considering
// any other els that are already too tall. if `shouldRedistribute` is on, it considers these tall rows and 
// reduces the available height.
function distributeHeight(els, availableHeight, shouldRedistribute) {

	// *FLOORING NOTE*: we floor in certain places because zoom can give inaccurate floating-point dimensions,
	// and it is better to be shorter than taller, to avoid creating unnecessary scrollbars.

	var minOffset1 = Math.floor(availableHeight / els.length); // for non-last element
	var minOffset2 = Math.floor(availableHeight - minOffset1 * (els.length - 1)); // for last element *FLOORING NOTE*
	var flexEls = []; // elements that are allowed to expand. array of DOM nodes
	var flexOffsets = []; // amount of vertical space it takes up
	var flexHeights = []; // actual css height
	var usedHeight = 0;

	undistributeHeight(els); // give all elements their natural height

	// find elements that are below the recommended height (expandable).
	// important to query for heights in a single first pass (to avoid reflow oscillation).
	els.each(function(i, el) {
		var minOffset = i === els.length - 1 ? minOffset2 : minOffset1;
		var naturalOffset = $(el).outerHeight(true);

		if (naturalOffset < minOffset) {
			flexEls.push(el);
			flexOffsets.push(naturalOffset);
			flexHeights.push($(el).height());
		}
		else {
			// this element stretches past recommended height (non-expandable). mark the space as occupied.
			usedHeight += naturalOffset;
		}
	});

	// readjust the recommended height to only consider the height available to non-maxed-out rows.
	if (shouldRedistribute) {
		availableHeight -= usedHeight;
		minOffset1 = Math.floor(availableHeight / flexEls.length);
		minOffset2 = Math.floor(availableHeight - minOffset1 * (flexEls.length - 1)); // *FLOORING NOTE*
	}

	// assign heights to all expandable elements
	$(flexEls).each(function(i, el) {
		var minOffset = i === flexEls.length - 1 ? minOffset2 : minOffset1;
		var naturalOffset = flexOffsets[i];
		var naturalHeight = flexHeights[i];
		var newHeight = minOffset - (naturalOffset - naturalHeight); // subtract the margin/padding

		if (naturalOffset < minOffset) { // we check this again because redistribution might have changed things
			$(el).height(newHeight);
		}
	});
}


// Undoes distrubuteHeight, restoring all els to their natural height
function undistributeHeight(els) {
	els.height('');
}


// Given `els`, a jQuery set of <td> cells, find the cell with the largest natural width and set the widths of all the
// cells to be that width.
// PREREQUISITE: if you want a cell to take up width, it needs to have a single inner element w/ display:inline
function matchCellWidths(els) {
	var maxInnerWidth = 0;

	els.find('> *').each(function(i, innerEl) {
		var innerWidth = $(innerEl).outerWidth();
		if (innerWidth > maxInnerWidth) {
			maxInnerWidth = innerWidth;
		}
	});

	maxInnerWidth++; // sometimes not accurate of width the text needs to stay on one line. insurance

	els.width(maxInnerWidth);

	return maxInnerWidth;
}


// Turns a container element into a scroller if its contents is taller than the allotted height.
// Returns true if the element is now a scroller, false otherwise.
// NOTE: this method is best because it takes weird zooming dimensions into account
function setPotentialScroller(containerEl, height) {
	containerEl.height(height).addClass('fc-scroller');

	// are scrollbars needed?
	if (containerEl[0].scrollHeight - 1 > containerEl[0].clientHeight) { // !!! -1 because IE is often off-by-one :(
		return true;
	}

	unsetScroller(containerEl); // undo
	return false;
}


// Takes an element that might have been a scroller, and turns it back into a normal element.
function unsetScroller(containerEl) {
	containerEl.height('').removeClass('fc-scroller');
}


/* General DOM Utilities
----------------------------------------------------------------------------------------------------------------------*/


// borrowed from https://github.com/jquery/jquery-ui/blob/1.11.0/ui/core.js#L51
function getScrollParent(el) {
	var position = el.css('position'),
		scrollParent = el.parents().filter(function() {
			var parent = $(this);
			return (/(auto|scroll)/).test(
				parent.css('overflow') + parent.css('overflow-y') + parent.css('overflow-x')
			);
		}).eq(0);

	return position === 'fixed' || !scrollParent.length ? $(el[0].ownerDocument || document) : scrollParent;
}


// Given a container element, return an object with the pixel values of the left/right scrollbars.
// Left scrollbars might occur on RTL browsers (IE maybe?) but I have not tested.
// PREREQUISITE: container element must have a single child with display:block
function getScrollbarWidths(container) {
	var containerLeft = container.offset().left;
	var containerRight = containerLeft + container.width();
	var inner = container.children();
	var innerLeft = inner.offset().left;
	var innerRight = innerLeft + inner.outerWidth();

	return {
		left: innerLeft - containerLeft,
		right: containerRight - innerRight
	};
}


// Returns a boolean whether this was a left mouse click and no ctrl key (which means right click on Mac)
function isPrimaryMouseButton(ev) {
	return ev.which == 1 && !ev.ctrlKey;
}


/* FullCalendar-specific Misc Utilities
----------------------------------------------------------------------------------------------------------------------*/


// Creates a basic segment with the intersection of the two ranges. Returns undefined if no intersection.
// Expects all dates to be normalized to the same timezone beforehand.
function intersectionToSeg(subjectStart, subjectEnd, intervalStart, intervalEnd) {
	var segStart, segEnd;
	var isStart, isEnd;

	if (subjectEnd > intervalStart && subjectStart < intervalEnd) { // in bounds at all?

		if (subjectStart >= intervalStart) {
			segStart = subjectStart.clone();
			isStart = true;
		}
		else {
			segStart = intervalStart.clone();
			isStart =  false;
		}

		if (subjectEnd <= intervalEnd) {
			segEnd = subjectEnd.clone();
			isEnd = true;
		}
		else {
			segEnd = intervalEnd.clone();
			isEnd = false;
		}

		return {
			start: segStart,
			end: segEnd,
			isStart: isStart,
			isEnd: isEnd
		};
	}
}


function smartProperty(obj, name) { // get a camel-cased/namespaced property of an object
	obj = obj || {};
	if (obj[name] !== undefined) {
		return obj[name];
	}
	var parts = name.split(/(?=[A-Z])/),
		i = parts.length - 1, res;
	for (; i>=0; i--) {
		res = obj[parts[i].toLowerCase()];
		if (res !== undefined) {
			return res;
		}
	}
	return obj['default'];
}


/* Date Utilities
----------------------------------------------------------------------------------------------------------------------*/

var dayIDs = [ 'sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat' ];


// Diffs the two moments into a Duration where full-days are recorded first, then the remaining time.
// Moments will have their timezones normalized.
function dayishDiff(a, b) {
	return moment.duration({
		days: a.clone().stripTime().diff(b.clone().stripTime(), 'days'),
		ms: a.time() - b.time()
	});
}


function isNativeDate(input) {
	return  Object.prototype.toString.call(input) === '[object Date]' || input instanceof Date;
}


// Returns a boolean about whether the given input is a time string, like "06:40:00" or "06:00"
function isTimeString(str) {
	return /^\d+\:\d+(?:\:\d+\.?(?:\d{3})?)?$/.test(str);
}


/* General Utilities
----------------------------------------------------------------------------------------------------------------------*/

fc.applyAll = applyAll; // export


// Create an object that has the given prototype. Just like Object.create
function createObject(proto) {
	var f = function() {};
	f.prototype = proto;
	return new f();
}


function applyAll(functions, thisObj, args) {
	if ($.isFunction(functions)) {
		functions = [ functions ];
	}
	if (functions) {
		var i;
		var ret;
		for (i=0; i<functions.length; i++) {
			ret = functions[i].apply(thisObj, args) || ret;
		}
		return ret;
	}
}


function firstDefined() {
	for (var i=0; i<arguments.length; i++) {
		if (arguments[i] !== undefined) {
			return arguments[i];
		}
	}
}


function htmlEscape(s) {
	return (s + '').replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/'/g, '&#039;')
		.replace(/"/g, '&quot;')
		.replace(/\n/g, '<br />');
}


function stripHtmlEntities(text) {
	return text.replace(/&.*?;/g, '');
}


function capitaliseFirstLetter(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}


function compareNumbers(a, b) { // for .sort()
	return a - b;
}


// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds.
// https://github.com/jashkenas/underscore/blob/1.6.0/underscore.js#L714
function debounce(func, wait) {
	var timeoutId;
	var args;
	var context;
	var timestamp; // of most recent call
	var later = function() {
		var last = +new Date() - timestamp;
		if (last < wait && last > 0) {
			timeoutId = setTimeout(later, wait - last);
		}
		else {
			timeoutId = null;
			func.apply(context, args);
			if (!timeoutId) {
				context = args = null;
			}
		}
	};

	return function() {
		context = this;
		args = arguments;
		timestamp = +new Date();
		if (!timeoutId) {
			timeoutId = setTimeout(later, wait);
		}
	};
}

;;

var ambigDateOfMonthRegex = /^\s*\d{4}-\d\d$/;
var ambigTimeOrZoneRegex =
	/^\s*\d{4}-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?)?$/;
var newMomentProto = moment.fn; // where we will attach our new methods
var oldMomentProto = $.extend({}, newMomentProto); // copy of original moment methods
var allowValueOptimization;
var setUTCValues; // function defined below
var setLocalValues; // function defined below


// Creating
// -------------------------------------------------------------------------------------------------

// Creates a new moment, similar to the vanilla moment(...) constructor, but with
// extra features (ambiguous time, enhanced formatting). When given an existing moment,
// it will function as a clone (and retain the zone of the moment). Anything else will
// result in a moment in the local zone.
fc.moment = function() {
	return makeMoment(arguments);
};

// Sames as fc.moment, but forces the resulting moment to be in the UTC timezone.
fc.moment.utc = function() {
	var mom = makeMoment(arguments, true);

	// Force it into UTC because makeMoment doesn't guarantee it
	// (if given a pre-existing moment for example)
	if (mom.hasTime()) { // don't give ambiguously-timed moments a UTC zone
		mom.utc();
	}

	return mom;
};

// Same as fc.moment, but when given an ISO8601 string, the timezone offset is preserved.
// ISO8601 strings with no timezone offset will become ambiguously zoned.
fc.moment.parseZone = function() {
	return makeMoment(arguments, true, true);
};

// Builds an enhanced moment from args. When given an existing moment, it clones. When given a
// native Date, or called with no arguments (the current time), the resulting moment will be local.
// Anything else needs to be "parsed" (a string or an array), and will be affected by:
//    parseAsUTC - if there is no zone information, should we parse the input in UTC?
//    parseZone - if there is zone information, should we force the zone of the moment?
function makeMoment(args, parseAsUTC, parseZone) {
	var input = args[0];
	var isSingleString = args.length == 1 && typeof input === 'string';
	var isAmbigTime;
	var isAmbigZone;
	var ambigMatch;
	var mom;

	if (moment.isMoment(input)) {
		mom = moment.apply(null, args); // clone it
		transferAmbigs(input, mom); // the ambig flags weren't transfered with the clone
	}
	else if (isNativeDate(input) || input === undefined) {
		mom = moment.apply(null, args); // will be local
	}
	else { // "parsing" is required
		isAmbigTime = false;
		isAmbigZone = false;

		if (isSingleString) {
			if (ambigDateOfMonthRegex.test(input)) {
				// accept strings like '2014-05', but convert to the first of the month
				input += '-01';
				args = [ input ]; // for when we pass it on to moment's constructor
				isAmbigTime = true;
				isAmbigZone = true;
			}
			else if ((ambigMatch = ambigTimeOrZoneRegex.exec(input))) {
				isAmbigTime = !ambigMatch[5]; // no time part?
				isAmbigZone = true;
			}
		}
		else if ($.isArray(input)) {
			// arrays have no timezone information, so assume ambiguous zone
			isAmbigZone = true;
		}
		// otherwise, probably a string with a format

		if (parseAsUTC) {
			mom = moment.utc.apply(moment, args);
		}
		else {
			mom = moment.apply(null, args);
		}

		if (isAmbigTime) {
			mom._ambigTime = true;
			mom._ambigZone = true; // ambiguous time always means ambiguous zone
		}
		else if (parseZone) { // let's record the inputted zone somehow
			if (isAmbigZone) {
				mom._ambigZone = true;
			}
			else if (isSingleString) {
				mom.zone(input); // if not a valid zone, will assign UTC
			}
		}
	}

	mom._fullCalendar = true; // flag for extended functionality

	return mom;
}


// A clone method that works with the flags related to our enhanced functionality.
// In the future, use moment.momentProperties
newMomentProto.clone = function() {
	var mom = oldMomentProto.clone.apply(this, arguments);

	// these flags weren't transfered with the clone
	transferAmbigs(this, mom);
	if (this._fullCalendar) {
		mom._fullCalendar = true;
	}

	return mom;
};


// Time-of-day
// -------------------------------------------------------------------------------------------------

// GETTER
// Returns a Duration with the hours/minutes/seconds/ms values of the moment.
// If the moment has an ambiguous time, a duration of 00:00 will be returned.
//
// SETTER
// You can supply a Duration, a Moment, or a Duration-like argument.
// When setting the time, and the moment has an ambiguous time, it then becomes unambiguous.
newMomentProto.time = function(time) {

	// Fallback to the original method (if there is one) if this moment wasn't created via FullCalendar.
	// `time` is a generic enough method name where this precaution is necessary to avoid collisions w/ other plugins.
	if (!this._fullCalendar) {
		return oldMomentProto.time.apply(this, arguments);
	}

	if (time == null) { // getter
		return moment.duration({
			hours: this.hours(),
			minutes: this.minutes(),
			seconds: this.seconds(),
			milliseconds: this.milliseconds()
		});
	}
	else { // setter

		this._ambigTime = false; // mark that the moment now has a time

		if (!moment.isDuration(time) && !moment.isMoment(time)) {
			time = moment.duration(time);
		}

		// The day value should cause overflow (so 24 hours becomes 00:00:00 of next day).
		// Only for Duration times, not Moment times.
		var dayHours = 0;
		if (moment.isDuration(time)) {
			dayHours = Math.floor(time.asDays()) * 24;
		}

		// We need to set the individual fields.
		// Can't use startOf('day') then add duration. In case of DST at start of day.
		return this.hours(dayHours + time.hours())
			.minutes(time.minutes())
			.seconds(time.seconds())
			.milliseconds(time.milliseconds());
	}
};

// Converts the moment to UTC, stripping out its time-of-day and timezone offset,
// but preserving its YMD. A moment with a stripped time will display no time
// nor timezone offset when .format() is called.
newMomentProto.stripTime = function() {
	var a = this.toArray(); // year,month,date,hours,minutes,seconds as an array

	this.utc(); // set the internal UTC flag (will clear the ambig flags)
	setUTCValues(this, a.slice(0, 3)); // set the year/month/date. time will be zero

	// Mark the time as ambiguous. This needs to happen after the .utc() call, which calls .zone(),
	// which clears all ambig flags. Same with setUTCValues with moment-timezone.
	this._ambigTime = true;
	this._ambigZone = true; // if ambiguous time, also ambiguous timezone offset

	return this; // for chaining
};

// Returns if the moment has a non-ambiguous time (boolean)
newMomentProto.hasTime = function() {
	return !this._ambigTime;
};


// Timezone
// -------------------------------------------------------------------------------------------------

// Converts the moment to UTC, stripping out its timezone offset, but preserving its
// YMD and time-of-day. A moment with a stripped timezone offset will display no
// timezone offset when .format() is called.
newMomentProto.stripZone = function() {
	var a = this.toArray(); // year,month,date,hours,minutes,seconds as an array
	var wasAmbigTime = this._ambigTime;

	this.utc(); // set the internal UTC flag (will clear the ambig flags)
	setUTCValues(this, a); // will set the year/month/date/hours/minutes/seconds/ms

	if (wasAmbigTime) {
		// the above call to .utc()/.zone() unfortunately clears the ambig flags, so reassign
		this._ambigTime = true;
	}

	// Mark the zone as ambiguous. This needs to happen after the .utc() call, which calls .zone(),
	// which clears all ambig flags. Same with setUTCValues with moment-timezone.
	this._ambigZone = true;

	return this; // for chaining
};

// Returns of the moment has a non-ambiguous timezone offset (boolean)
newMomentProto.hasZone = function() {
	return !this._ambigZone;
};

// this method implicitly marks a zone (will get called upon .utc() and .local())
newMomentProto.zone = function(tzo) {

	if (tzo != null) { // setter
		// these assignments needs to happen before the original zone method is called.
		// I forget why, something to do with a browser crash.
		this._ambigTime = false;
		this._ambigZone = false;
	}

	return oldMomentProto.zone.apply(this, arguments);
};

// this method implicitly marks a zone
newMomentProto.local = function() {
	var a = this.toArray(); // year,month,date,hours,minutes,seconds,ms as an array
	var wasAmbigZone = this._ambigZone;

	oldMomentProto.local.apply(this, arguments); // will clear ambig flags

	if (wasAmbigZone) {
		// If the moment was ambiguously zoned, the date fields were stored as UTC.
		// We want to preserve these, but in local time.
		setLocalValues(this, a);
	}

	return this; // for chaining
};


// Formatting
// -------------------------------------------------------------------------------------------------

newMomentProto.format = function() {
	if (this._fullCalendar && arguments[0]) { // an enhanced moment? and a format string provided?
		return formatDate(this, arguments[0]); // our extended formatting
	}
	if (this._ambigTime) {
		return oldMomentFormat(this, 'YYYY-MM-DD');
	}
	if (this._ambigZone) {
		return oldMomentFormat(this, 'YYYY-MM-DD[T]HH:mm:ss');
	}
	return oldMomentProto.format.apply(this, arguments);
};

newMomentProto.toISOString = function() {
	if (this._ambigTime) {
		return oldMomentFormat(this, 'YYYY-MM-DD');
	}
	if (this._ambigZone) {
		return oldMomentFormat(this, 'YYYY-MM-DD[T]HH:mm:ss');
	}
	return oldMomentProto.toISOString.apply(this, arguments);
};


// Querying
// -------------------------------------------------------------------------------------------------

// Is the moment within the specified range? `end` is exclusive.
// FYI, this method is not a standard Moment method, so always do our enhanced logic.
newMomentProto.isWithin = function(start, end) {
	var a = commonlyAmbiguate([ this, start, end ]);
	return a[0] >= a[1] && a[0] < a[2];
};

// When isSame is called with units, timezone ambiguity is normalized before the comparison happens.
// If no units specified, the two moments must be identically the same, with matching ambig flags.
newMomentProto.isSame = function(input, units) {
	var a;

	// only do custom logic if this is an enhanced moment
	if (!this._fullCalendar) {
		return oldMomentProto.isSame.apply(this, arguments);
	}

	if (units) {
		a = commonlyAmbiguate([ this, input ], true); // normalize timezones but don't erase times
		return oldMomentProto.isSame.call(a[0], a[1], units);
	}
	else {
		input = fc.moment.parseZone(input); // normalize input
		return oldMomentProto.isSame.call(this, input) &&
			Boolean(this._ambigTime) === Boolean(input._ambigTime) &&
			Boolean(this._ambigZone) === Boolean(input._ambigZone);
	}
};

// Make these query methods work with ambiguous moments
$.each([
	'isBefore',
	'isAfter'
], function(i, methodName) {
	newMomentProto[methodName] = function(input, units) {
		var a;

		// only do custom logic if this is an enhanced moment
		if (!this._fullCalendar) {
			return oldMomentProto[methodName].apply(this, arguments);
		}

		a = commonlyAmbiguate([ this, input ]);
		return oldMomentProto[methodName].call(a[0], a[1], units);
	};
});


// Misc Internals
// -------------------------------------------------------------------------------------------------

// given an array of moment-like inputs, return a parallel array w/ moments similarly ambiguated.
// for example, of one moment has ambig time, but not others, all moments will have their time stripped.
// set `preserveTime` to `true` to keep times, but only normalize zone ambiguity.
function commonlyAmbiguate(inputs, preserveTime) {
	var outputs = [];
	var anyAmbigTime = false;
	var anyAmbigZone = false;
	var i;

	for (i=0; i<inputs.length; i++) {
		outputs.push(fc.moment.parseZone(inputs[i]));
		anyAmbigTime = anyAmbigTime || outputs[i]._ambigTime;
		anyAmbigZone = anyAmbigZone || outputs[i]._ambigZone;
	}

	for (i=0; i<outputs.length; i++) {
		if (anyAmbigTime && !preserveTime) {
			outputs[i].stripTime();
		}
		else if (anyAmbigZone) {
			outputs[i].stripZone();
		}
	}

	return outputs;
}

// Transfers all the flags related to ambiguous time/zone from the `src` moment to the `dest` moment
function transferAmbigs(src, dest) {
	if (src._ambigTime) {
		dest._ambigTime = true;
	}
	else if (dest._ambigTime) {
		dest._ambigTime = false;
	}

	if (src._ambigZone) {
		dest._ambigZone = true;
	}
	else if (dest._ambigZone) {
		dest._ambigZone = false;
	}
}


// Sets the year/month/date/etc values of the moment from the given array.
// Inefficient because it calls each individual setter.
function setMomentValues(mom, a) {
	mom.year(a[0] || 0)
		.month(a[1] || 0)
		.date(a[2] || 0)
		.hours(a[3] || 0)
		.minutes(a[4] || 0)
		.seconds(a[5] || 0)
		.milliseconds(a[6] || 0);
}

// Can we set the moment's internal date directly?
allowValueOptimization = '_d' in moment() && 'updateOffset' in moment;

// Utility function. Accepts a moment and an array of the UTC year/month/date/etc values to set.
// Assumes the given moment is already in UTC mode.
setUTCValues = allowValueOptimization ? function(mom, a) {
	// simlate what moment's accessors do
	mom._d.setTime(Date.UTC.apply(Date, a));
	moment.updateOffset(mom, false); // keepTime=false
} : setMomentValues;

// Utility function. Accepts a moment and an array of the local year/month/date/etc values to set.
// Assumes the given moment is already in local mode.
setLocalValues = allowValueOptimization ? function(mom, a) {
	// simlate what moment's accessors do
	mom._d.setTime(+new Date( // FYI, there is now way to apply an array of args to a constructor
		a[0] || 0,
		a[1] || 0,
		a[2] || 0,
		a[3] || 0,
		a[4] || 0,
		a[5] || 0,
		a[6] || 0
	));
	moment.updateOffset(mom, false); // keepTime=false
} : setMomentValues;

;;

// Single Date Formatting
// -------------------------------------------------------------------------------------------------


// call this if you want Moment's original format method to be used
function oldMomentFormat(mom, formatStr) {
	return oldMomentProto.format.call(mom, formatStr); // oldMomentProto defined in moment-ext.js
}


// Formats `date` with a Moment formatting string, but allow our non-zero areas and
// additional token.
function formatDate(date, formatStr) {
	return formatDateWithChunks(date, getFormatStringChunks(formatStr));
}


function formatDateWithChunks(date, chunks) {
	var s = '';
	var i;

	for (i=0; i<chunks.length; i++) {
		s += formatDateWithChunk(date, chunks[i]);
	}

	return s;
}


// addition formatting tokens we want recognized
var tokenOverrides = {
	t: function(date) { // "a" or "p"
		return oldMomentFormat(date, 'a').charAt(0);
	},
	T: function(date) { // "A" or "P"
		return oldMomentFormat(date, 'A').charAt(0);
	}
};


function formatDateWithChunk(date, chunk) {
	var token;
	var maybeStr;

	if (typeof chunk === 'string') { // a literal string
		return chunk;
	}
	else if ((token = chunk.token)) { // a token, like "YYYY"
		if (tokenOverrides[token]) {
			return tokenOverrides[token](date); // use our custom token
		}
		return oldMomentFormat(date, token);
	}
	else if (chunk.maybe) { // a grouping of other chunks that must be non-zero
		maybeStr = formatDateWithChunks(date, chunk.maybe);
		if (maybeStr.match(/[1-9]/)) {
			return maybeStr;
		}
	}

	return '';
}


// Date Range Formatting
// -------------------------------------------------------------------------------------------------
// TODO: make it work with timezone offset

// Using a formatting string meant for a single date, generate a range string, like
// "Sep 2 - 9 2013", that intelligently inserts a separator where the dates differ.
// If the dates are the same as far as the format string is concerned, just return a single
// rendering of one date, without any separator.
function formatRange(date1, date2, formatStr, separator, isRTL) {
	var localeData;

	date1 = fc.moment.parseZone(date1);
	date2 = fc.moment.parseZone(date2);

	localeData = (date1.localeData || date1.lang).call(date1); // works with moment-pre-2.8

	// Expand localized format strings, like "LL" -> "MMMM D YYYY"
	formatStr = localeData.longDateFormat(formatStr) || formatStr;
	// BTW, this is not important for `formatDate` because it is impossible to put custom tokens
	// or non-zero areas in Moment's localized format strings.

	separator = separator || ' - ';

	return formatRangeWithChunks(
		date1,
		date2,
		getFormatStringChunks(formatStr),
		separator,
		isRTL
	);
}
fc.formatRange = formatRange; // expose


function formatRangeWithChunks(date1, date2, chunks, separator, isRTL) {
	var chunkStr; // the rendering of the chunk
	var leftI;
	var leftStr = '';
	var rightI;
	var rightStr = '';
	var middleI;
	var middleStr1 = '';
	var middleStr2 = '';
	var middleStr = '';

	// Start at the leftmost side of the formatting string and continue until you hit a token
	// that is not the same between dates.
	for (leftI=0; leftI<chunks.length; leftI++) {
		chunkStr = formatSimilarChunk(date1, date2, chunks[leftI]);
		if (chunkStr === false) {
			break;
		}
		leftStr += chunkStr;
	}

	// Similarly, start at the rightmost side of the formatting string and move left
	for (rightI=chunks.length-1; rightI>leftI; rightI--) {
		chunkStr = formatSimilarChunk(date1, date2, chunks[rightI]);
		if (chunkStr === false) {
			break;
		}
		rightStr = chunkStr + rightStr;
	}

	// The area in the middle is different for both of the dates.
	// Collect them distinctly so we can jam them together later.
	for (middleI=leftI; middleI<=rightI; middleI++) {
		middleStr1 += formatDateWithChunk(date1, chunks[middleI]);
		middleStr2 += formatDateWithChunk(date2, chunks[middleI]);
	}

	if (middleStr1 || middleStr2) {
		if (isRTL) {
			middleStr = middleStr2 + separator + middleStr1;
		}
		else {
			middleStr = middleStr1 + separator + middleStr2;
		}
	}

	return leftStr + middleStr + rightStr;
}


var similarUnitMap = {
	Y: 'year',
	M: 'month',
	D: 'day', // day of month
	d: 'day', // day of week
	// prevents a separator between anything time-related...
	A: 'second', // AM/PM
	a: 'second', // am/pm
	T: 'second', // A/P
	t: 'second', // a/p
	H: 'second', // hour (24)
	h: 'second', // hour (12)
	m: 'second', // minute
	s: 'second' // second
};
// TODO: week maybe?


// Given a formatting chunk, and given that both dates are similar in the regard the
// formatting chunk is concerned, format date1 against `chunk`. Otherwise, return `false`.
function formatSimilarChunk(date1, date2, chunk) {
	var token;
	var unit;

	if (typeof chunk === 'string') { // a literal string
		return chunk;
	}
	else if ((token = chunk.token)) {
		unit = similarUnitMap[token.charAt(0)];
		// are the dates the same for this unit of measurement?
		if (unit && date1.isSame(date2, unit)) {
			return oldMomentFormat(date1, token); // would be the same if we used `date2`
			// BTW, don't support custom tokens
		}
	}

	return false; // the chunk is NOT the same for the two dates
	// BTW, don't support splitting on non-zero areas
}


// Chunking Utils
// -------------------------------------------------------------------------------------------------


var formatStringChunkCache = {};


function getFormatStringChunks(formatStr) {
	if (formatStr in formatStringChunkCache) {
		return formatStringChunkCache[formatStr];
	}
	return (formatStringChunkCache[formatStr] = chunkFormatString(formatStr));
}


// Break the formatting string into an array of chunks
function chunkFormatString(formatStr) {
	var chunks = [];
	var chunker = /\[([^\]]*)\]|\(([^\)]*)\)|(LT|(\w)\4*o?)|([^\w\[\(]+)/g; // TODO: more descrimination
	var match;

	while ((match = chunker.exec(formatStr))) {
		if (match[1]) { // a literal string inside [ ... ]
			chunks.push(match[1]);
		}
		else if (match[2]) { // non-zero formatting inside ( ... )
			chunks.push({ maybe: chunkFormatString(match[2]) });
		}
		else if (match[3]) { // a formatting token
			chunks.push({ token: match[3] });
		}
		else if (match[5]) { // an unenclosed literal string
			chunks.push(match[5]);
		}
	}

	return chunks;
}

;;

/* A rectangular panel that is absolutely positioned over other content
------------------------------------------------------------------------------------------------------------------------
Options:
	- className (string)
	- content (HTML string or jQuery element set)
	- parentEl
	- top
	- left
	- right (the x coord of where the right edge should be. not a "CSS" right)
	- autoHide (boolean)
	- show (callback)
	- hide (callback)
*/

function Popover(options) {
	this.options = options || {};
}


Popover.prototype = {

	isHidden: true,
	options: null,
	el: null, // the container element for the popover. generated by this object
	documentMousedownProxy: null, // document mousedown handler bound to `this`
	margin: 10, // the space required between the popover and the edges of the scroll container


	// Shows the popover on the specified position. Renders it if not already
	show: function() {
		if (this.isHidden) {
			if (!this.el) {
				this.render();
			}
			this.el.show();
			this.position();
			this.isHidden = false;
			this.trigger('show');
		}
	},


	// Hides the popover, through CSS, but does not remove it from the DOM
	hide: function() {
		if (!this.isHidden) {
			this.el.hide();
			this.isHidden = true;
			this.trigger('hide');
		}
	},


	// Creates `this.el` and renders content inside of it
	render: function() {
		var _this = this;
		var options = this.options;

		this.el = $('<div class="fc-popover"/>')
			.addClass(options.className || '')
			.css({
				// position initially to the top left to avoid creating scrollbars
				top: 0,
				left: 0
			})
			.append(options.content)
			.appendTo(options.parentEl);

		// when a click happens on anything inside with a 'fc-close' className, hide the popover
		this.el.on('click', '.fc-close', function() {
			_this.hide();
		});

		if (options.autoHide) {
			$(document).on('mousedown', this.documentMousedownProxy = $.proxy(this, 'documentMousedown'));
		}
	},


	// Triggered when the user clicks *anywhere* in the document, for the autoHide feature
	documentMousedown: function(ev) {
		// only hide the popover if the click happened outside the popover
		if (this.el && !$(ev.target).closest(this.el).length) {
			this.hide();
		}
	},


	// Hides and unregisters any handlers
	destroy: function() {
		this.hide();

		if (this.el) {
			this.el.remove();
			this.el = null;
		}

		$(document).off('mousedown', this.documentMousedownProxy);
	},


	// Positions the popover optimally, using the top/left/right options
	position: function() {
		var options = this.options;
		var origin = this.el.offsetParent().offset();
		var width = this.el.outerWidth();
		var height = this.el.outerHeight();
		var windowEl = $(window);
		var viewportEl = getScrollParent(this.el);
		var viewportTop;
		var viewportLeft;
		var viewportOffset;
		var top; // the "position" (not "offset") values for the popover
		var left; //

		// compute top and left
		top = options.top || 0;
		if (options.left !== undefined) {
			left = options.left;
		}
		else if (options.right !== undefined) {
			left = options.right - width; // derive the left value from the right value
		}
		else {
			left = 0;
		}

		if (viewportEl.is(window) || viewportEl.is(document)) { // normalize getScrollParent's result
			viewportEl = windowEl;
			viewportTop = 0; // the window is always at the top left
			viewportLeft = 0; // (and .offset() won't work if called here)
		}
		else {
			viewportOffset = viewportEl.offset();
			viewportTop = viewportOffset.top;
			viewportLeft = viewportOffset.left;
		}

		// if the window is scrolled, it causes the visible area to be further down
		viewportTop += windowEl.scrollTop();
		viewportLeft += windowEl.scrollLeft();

		// constrain to the view port. if constrained by two edges, give precedence to top/left
		if (options.viewportConstrain !== false) {
			top = Math.min(top, viewportTop + viewportEl.outerHeight() - height - this.margin);
			top = Math.max(top, viewportTop + this.margin);
			left = Math.min(left, viewportLeft + viewportEl.outerWidth() - width - this.margin);
			left = Math.max(left, viewportLeft + this.margin);
		}

		this.el.css({
			top: top - origin.top,
			left: left - origin.left
		});
	},


	// Triggers a callback. Calls a function in the option hash of the same name.
	// Arguments beyond the first `name` are forwarded on.
	// TODO: better code reuse for this. Repeat code
	trigger: function(name) {
		if (this.options[name]) {
			this.options[name].apply(this, Array.prototype.slice.call(arguments, 1));
		}
	}

};

;;

/* A "coordinate map" converts pixel coordinates into an associated cell, which has an associated date
------------------------------------------------------------------------------------------------------------------------
Common interface:

	CoordMap.prototype = {
		build: function() {},
		getCell: function(x, y) {}
	};

*/

/* Coordinate map for a grid component
----------------------------------------------------------------------------------------------------------------------*/

function GridCoordMap(grid) {
	this.grid = grid;
}


GridCoordMap.prototype = {

	grid: null, // reference to the Grid
	rows: null, // the top-to-bottom y coordinates. including the bottom of the last item
	cols: null, // the left-to-right x coordinates. including the right of the last item

	containerEl: null, // container element that all coordinates are constrained to. optionally assigned
	minX: null,
	maxX: null, // exclusive
	minY: null,
	maxY: null, // exclusive


	// Queries the grid for the coordinates of all the cells
	build: function() {
		this.grid.buildCoords(
			this.rows = [],
			this.cols = []
		);
		this.computeBounds();
	},


	// Given a coordinate of the document, gets the associated cell. If no cell is underneath, returns null
	getCell: function(x, y) {
		var cell = null;
		var rows = this.rows;
		var cols = this.cols;
		var r = -1;
		var c = -1;
		var i;

		if (this.inBounds(x, y)) {

			for (i = 0; i < rows.length; i++) {
				if (y >= rows[i][0] && y < rows[i][1]) {
					r = i;
					break;
				}
			}

			for (i = 0; i < cols.length; i++) {
				if (x >= cols[i][0] && x < cols[i][1]) {
					c = i;
					break;
				}
			}

			if (r >= 0 && c >= 0) {
				cell = { row: r, col: c };
				cell.grid = this.grid;
				cell.date = this.grid.getCellDate(cell);
			}
		}

		return cell;
	},


	// If there is a containerEl, compute the bounds into min/max values
	computeBounds: function() {
		var containerOffset;

		if (this.containerEl) {
			containerOffset = this.containerEl.offset();
			this.minX = containerOffset.left;
			this.maxX = containerOffset.left + this.containerEl.outerWidth();
			this.minY = containerOffset.top;
			this.maxY = containerOffset.top + this.containerEl.outerHeight();
		}
	},


	// Determines if the given coordinates are in bounds. If no `containerEl`, always true
	inBounds: function(x, y) {
		if (this.containerEl) {
			return x >= this.minX && x < this.maxX && y >= this.minY && y < this.maxY;
		}
		return true;
	}

};


/* Coordinate map that is a combination of multiple other coordinate maps
----------------------------------------------------------------------------------------------------------------------*/

function ComboCoordMap(coordMaps) {
	this.coordMaps = coordMaps;
}


ComboCoordMap.prototype = {

	coordMaps: null, // an array of CoordMaps


	// Builds all coordMaps
	build: function() {
		var coordMaps = this.coordMaps;
		var i;

		for (i = 0; i < coordMaps.length; i++) {
			coordMaps[i].build();
		}
	},


	// Queries all coordMaps for the cell underneath the given coordinates, returning the first result
	getCell: function(x, y) {
		var coordMaps = this.coordMaps;
		var cell = null;
		var i;

		for (i = 0; i < coordMaps.length && !cell; i++) {
			cell = coordMaps[i].getCell(x, y);
		}

		return cell;
	}

};

;;

/* Tracks mouse movements over a CoordMap and raises events about which cell the mouse is over.
----------------------------------------------------------------------------------------------------------------------*/
// TODO: very useful to have a handler that gets called upon cellOut OR when dragging stops (for cleanup)

function DragListener(coordMap, options) {
	this.coordMap = coordMap;
	this.options = options || {};
}


DragListener.prototype = {

	coordMap: null,
	options: null,

	isListening: false,
	isDragging: false,

	// the cell/date the mouse was over when listening started
	origCell: null,
	origDate: null,

	// the cell/date the mouse is over
	cell: null,
	date: null,

	// coordinates of the initial mousedown
	mouseX0: null,
	mouseY0: null,

	// handler attached to the document, bound to the DragListener's `this`
	mousemoveProxy: null,
	mouseupProxy: null,

	scrollEl: null,
	scrollBounds: null, // { top, bottom, left, right }
	scrollTopVel: null, // pixels per second
	scrollLeftVel: null, // pixels per second
	scrollIntervalId: null, // ID of setTimeout for scrolling animation loop
	scrollHandlerProxy: null, // this-scoped function for handling when scrollEl is scrolled

	scrollSensitivity: 30, // pixels from edge for scrolling to start
	scrollSpeed: 200, // pixels per second, at maximum speed
	scrollIntervalMs: 50, // millisecond wait between scroll increment


	// Call this when the user does a mousedown. Will probably lead to startListening
	mousedown: function(ev) {
		if (isPrimaryMouseButton(ev)) {

			ev.preventDefault(); // prevents native selection in most browsers

			this.startListening(ev);

			// start the drag immediately if there is no minimum distance for a drag start
			if (!this.options.distance) {
				this.startDrag(ev);
			}
		}
	},


	// Call this to start tracking mouse movements
	startListening: function(ev) {
		var scrollParent;
		var cell;

		if (!this.isListening) {

			// grab scroll container and attach handler
			if (ev && this.options.scroll) {
				scrollParent = getScrollParent($(ev.target));
				if (!scrollParent.is(window) && !scrollParent.is(document)) {
					this.scrollEl = scrollParent;

					// scope to `this`, and use `debounce` to make sure rapid calls don't happen
					this.scrollHandlerProxy = debounce($.proxy(this, 'scrollHandler'), 100);
					this.scrollEl.on('scroll', this.scrollHandlerProxy);
				}
			}

			this.computeCoords(); // relies on `scrollEl`

			// get info on the initial cell, date, and coordinates
			if (ev) {
				cell = this.getCell(ev);
				this.origCell = cell;
				this.origDate = cell ? cell.date : null;

				this.mouseX0 = ev.pageX;
				this.mouseY0 = ev.pageY;
			}

			$(document)
				.on('mousemove', this.mousemoveProxy = $.proxy(this, 'mousemove'))
				.on('mouseup', this.mouseupProxy = $.proxy(this, 'mouseup'))
				.on('selectstart', this.preventDefault); // prevents native selection in IE<=8

			this.isListening = true;
			this.trigger('listenStart', ev);
		}
	},


	// Recomputes the drag-critical positions of elements
	computeCoords: function() {
		this.coordMap.build();
		this.computeScrollBounds();
	},


	// Called when the user moves the mouse
	mousemove: function(ev) {
		var minDistance;
		var distanceSq; // current distance from mouseX0/mouseY0, squared

		if (!this.isDragging) { // if not already dragging...
			// then start the drag if the minimum distance criteria is met
			minDistance = this.options.distance || 1;
			distanceSq = Math.pow(ev.pageX - this.mouseX0, 2) + Math.pow(ev.pageY - this.mouseY0, 2);
			if (distanceSq >= minDistance * minDistance) { // use pythagorean theorem
				this.startDrag(ev);
			}
		}

		if (this.isDragging) {
			this.drag(ev); // report a drag, even if this mousemove initiated the drag
		}
	},


	// Call this to initiate a legitimate drag.
	// This function is called internally from this class, but can also be called explicitly from outside
	startDrag: function(ev) {
		var cell;

		if (!this.isListening) { // startDrag must have manually initiated
			this.startListening();
		}

		if (!this.isDragging) {
			this.isDragging = true;
			this.trigger('dragStart', ev);

			// report the initial cell the mouse is over
			cell = this.getCell(ev);
			if (cell) {
				this.cellOver(cell, true);
			}
		}
	},


	// Called while the mouse is being moved and when we know a legitimate drag is taking place
	drag: function(ev) {
		var cell;

		if (this.isDragging) {
			cell = this.getCell(ev);

			if (!isCellsEqual(cell, this.cell)) { // a different cell than before?
				if (this.cell) {
					this.cellOut();
				}
				if (cell) {
					this.cellOver(cell);
				}
			}

			this.dragScroll(ev); // will possibly cause scrolling
		}
	},


	// Called when a the mouse has just moved over a new cell
	cellOver: function(cell) {
		this.cell = cell;
		this.date = cell.date;
		this.trigger('cellOver', cell, cell.date);
	},


	// Called when the mouse has just moved out of a cell
	cellOut: function() {
		if (this.cell) {
			this.trigger('cellOut', this.cell);
			this.cell = null;
			this.date = null;
		}
	},


	// Called when the user does a mouseup
	mouseup: function(ev) {
		this.stopDrag(ev);
		this.stopListening(ev);
	},


	// Called when the drag is over. Will not cause listening to stop however.
	// A concluding 'cellOut' event will NOT be triggered.
	stopDrag: function(ev) {
		if (this.isDragging) {
			this.stopScrolling();
			this.trigger('dragStop', ev);
			this.isDragging = false;
		}
	},


	// Call this to stop listening to the user's mouse events
	stopListening: function(ev) {
		if (this.isListening) {

			// remove the scroll handler if there is a scrollEl
			if (this.scrollEl) {
				this.scrollEl.off('scroll', this.scrollHandlerProxy);
				this.scrollHandlerProxy = null;
			}

			$(document)
				.off('mousemove', this.mousemoveProxy)
				.off('mouseup', this.mouseupProxy)
				.off('selectstart', this.preventDefault);

			this.mousemoveProxy = null;
			this.mouseupProxy = null;

			this.isListening = false;
			this.trigger('listenStop', ev);

			this.origCell = this.cell = null;
			this.origDate = this.date = null;
		}
	},


	// Gets the cell underneath the coordinates for the given mouse event
	getCell: function(ev) {
		return this.coordMap.getCell(ev.pageX, ev.pageY);
	},


	// Triggers a callback. Calls a function in the option hash of the same name.
	// Arguments beyond the first `name` are forwarded on.
	trigger: function(name) {
		if (this.options[name]) {
			this.options[name].apply(this, Array.prototype.slice.call(arguments, 1));
		}
	},


	// Stops a given mouse event from doing it's native browser action. In our case, text selection.
	preventDefault: function(ev) {
		ev.preventDefault();
	},


	/* Scrolling
	------------------------------------------------------------------------------------------------------------------*/


	// Computes and stores the bounding rectangle of scrollEl
	computeScrollBounds: function() {
		var el = this.scrollEl;
		var offset;

		if (el) {
			offset = el.offset();
			this.scrollBounds = {
				top: offset.top,
				left: offset.left,
				bottom: offset.top + el.outerHeight(),
				right: offset.left + el.outerWidth()
			};
		}
	},


	// Called when the dragging is in progress and scrolling should be updated
	dragScroll: function(ev) {
		var sensitivity = this.scrollSensitivity;
		var bounds = this.scrollBounds;
		var topCloseness, bottomCloseness;
		var leftCloseness, rightCloseness;
		var topVel = 0;
		var leftVel = 0;

		if (bounds) { // only scroll if scrollEl exists

			// compute closeness to edges. valid range is from 0.0 - 1.0
			topCloseness = (sensitivity - (ev.pageY - bounds.top)) / sensitivity;
			bottomCloseness = (sensitivity - (bounds.bottom - ev.pageY)) / sensitivity;
			leftCloseness = (sensitivity - (ev.pageX - bounds.left)) / sensitivity;
			rightCloseness = (sensitivity - (bounds.right - ev.pageX)) / sensitivity;

			// translate vertical closeness into velocity.
			// mouse must be completely in bounds for velocity to happen.
			if (topCloseness >= 0 && topCloseness <= 1) {
				topVel = topCloseness * this.scrollSpeed * -1; // negative. for scrolling up
			}
			else if (bottomCloseness >= 0 && bottomCloseness <= 1) {
				topVel = bottomCloseness * this.scrollSpeed;
			}

			// translate horizontal closeness into velocity
			if (leftCloseness >= 0 && leftCloseness <= 1) {
				leftVel = leftCloseness * this.scrollSpeed * -1; // negative. for scrolling left
			}
			else if (rightCloseness >= 0 && rightCloseness <= 1) {
				leftVel = rightCloseness * this.scrollSpeed;
			}
		}

		this.setScrollVel(topVel, leftVel);
	},


	// Sets the speed-of-scrolling for the scrollEl
	setScrollVel: function(topVel, leftVel) {

		this.scrollTopVel = topVel;
		this.scrollLeftVel = leftVel;

		this.constrainScrollVel(); // massages into realistic values

		// if there is non-zero velocity, and an animation loop hasn't already started, then START
		if ((this.scrollTopVel || this.scrollLeftVel) && !this.scrollIntervalId) {
			this.scrollIntervalId = setInterval(
				$.proxy(this, 'scrollIntervalFunc'), // scope to `this`
				this.scrollIntervalMs
			);
		}
	},


	// Forces scrollTopVel and scrollLeftVel to be zero if scrolling has already gone all the way
	constrainScrollVel: function() {
		var el = this.scrollEl;

		if (this.scrollTopVel < 0) { // scrolling up?
			if (el.scrollTop() <= 0) { // already scrolled all the way up?
				this.scrollTopVel = 0;
			}
		}
		else if (this.scrollTopVel > 0) { // scrolling down?
			if (el.scrollTop() + el[0].clientHeight >= el[0].scrollHeight) { // already scrolled all the way down?
				this.scrollTopVel = 0;
			}
		}

		if (this.scrollLeftVel < 0) { // scrolling left?
			if (el.scrollLeft() <= 0) { // already scrolled all the left?
				this.scrollLeftVel = 0;
			}
		}
		else if (this.scrollLeftVel > 0) { // scrolling right?
			if (el.scrollLeft() + el[0].clientWidth >= el[0].scrollWidth) { // already scrolled all the way right?
				this.scrollLeftVel = 0;
			}
		}
	},


	// This function gets called during every iteration of the scrolling animation loop
	scrollIntervalFunc: function() {
		var el = this.scrollEl;
		var frac = this.scrollIntervalMs / 1000; // considering animation frequency, what the vel should be mult'd by

		// change the value of scrollEl's scroll
		if (this.scrollTopVel) {
			el.scrollTop(el.scrollTop() + this.scrollTopVel * frac);
		}
		if (this.scrollLeftVel) {
			el.scrollLeft(el.scrollLeft() + this.scrollLeftVel * frac);
		}

		this.constrainScrollVel(); // since the scroll values changed, recompute the velocities

		// if scrolled all the way, which causes the vels to be zero, stop the animation loop
		if (!this.scrollTopVel && !this.scrollLeftVel) {
			this.stopScrolling();
		}
	},


	// Kills any existing scrolling animation loop
	stopScrolling: function() {
		if (this.scrollIntervalId) {
			clearInterval(this.scrollIntervalId);
			this.scrollIntervalId = null;

			// when all done with scrolling, recompute positions since they probably changed
			this.computeCoords();
		}
	},


	// Get called when the scrollEl is scrolled (NOTE: this is delayed via debounce)
	scrollHandler: function() {
		// recompute all coordinates, but *only* if this is *not* part of our scrolling animation
		if (!this.scrollIntervalId) {
			this.computeCoords();
		}
	}

};


// Returns `true` if the cells are identically equal. `false` otherwise.
// They must have the same row, col, and be from the same grid.
// Two null values will be considered equal, as two "out of the grid" states are the same.
function isCellsEqual(cell1, cell2) {

	if (!cell1 && !cell2) {
		return true;
	}

	if (cell1 && cell2) {
		return cell1.grid === cell2.grid &&
			cell1.row === cell2.row &&
			cell1.col === cell2.col;
	}

	return false;
}

;;

/* Creates a clone of an element and lets it track the mouse as it moves
----------------------------------------------------------------------------------------------------------------------*/

function MouseFollower(sourceEl, options) {
	this.options = options = options || {};
	this.sourceEl = sourceEl;
	this.parentEl = options.parentEl ? $(options.parentEl) : sourceEl.parent(); // default to sourceEl's parent
}


MouseFollower.prototype = {

	options: null,

	sourceEl: null, // the element that will be cloned and made to look like it is dragging
	el: null, // the clone of `sourceEl` that will track the mouse
	parentEl: null, // the element that `el` (the clone) will be attached to

	// the initial position of el, relative to the offset parent. made to match the initial offset of sourceEl
	top0: null,
	left0: null,

	// the initial position of the mouse
	mouseY0: null,
	mouseX0: null,

	// the number of pixels the mouse has moved from its initial position
	topDelta: null,
	leftDelta: null,

	mousemoveProxy: null, // document mousemove handler, bound to the MouseFollower's `this`

	isFollowing: false,
	isHidden: false,
	isAnimating: false, // doing the revert animation?


	// Causes the element to start following the mouse
	start: function(ev) {
		if (!this.isFollowing) {
			this.isFollowing = true;

			this.mouseY0 = ev.pageY;
			this.mouseX0 = ev.pageX;
			this.topDelta = 0;
			this.leftDelta = 0;

			if (!this.isHidden) {
				this.updatePosition();
			}

			$(document).on('mousemove', this.mousemoveProxy = $.proxy(this, 'mousemove'));
		}
	},


	// Causes the element to stop following the mouse. If shouldRevert is true, will animate back to original position.
	// `callback` gets invoked when the animation is complete. If no animation, it is invoked immediately.
	stop: function(shouldRevert, callback) {
		var _this = this;
		var revertDuration = this.options.revertDuration;

		function complete() {
			this.isAnimating = false;
			_this.destroyEl();

			this.top0 = this.left0 = null; // reset state for future updatePosition calls

			if (callback) {
				callback();
			}
		}

		if (this.isFollowing && !this.isAnimating) { // disallow more than one stop animation at a time
			this.isFollowing = false;

			$(document).off('mousemove', this.mousemoveProxy);

			if (shouldRevert && revertDuration && !this.isHidden) { // do a revert animation?
				this.isAnimating = true;
				this.el.animate({
					top: this.top0,
					left: this.left0
				}, {
					duration: revertDuration,
					complete: complete
				});
			}
			else {
				complete();
			}
		}
	},


	// Gets the tracking element. Create it if necessary
	getEl: function() {
		var el = this.el;

		if (!el) {
			this.sourceEl.width(); // hack to force IE8 to compute correct bounding box
			el = this.el = this.sourceEl.clone()
				.css({
					position: 'absolute',
					visibility: '', // in case original element was hidden (commonly through hideEvents())
					display: this.isHidden ? 'none' : '', // for when initially hidden
					margin: 0,
					right: 'auto', // erase and set width instead
					bottom: 'auto', // erase and set height instead
					width: this.sourceEl.width(), // explicit height in case there was a 'right' value
					height: this.sourceEl.height(), // explicit width in case there was a 'bottom' value
					opacity: this.options.opacity || '',
					zIndex: this.options.zIndex
				})
				.appendTo(this.parentEl);
		}

		return el;
	},


	// Removes the tracking element if it has already been created
	destroyEl: function() {
		if (this.el) {
			this.el.remove();
			this.el = null;
		}
	},


	// Update the CSS position of the tracking element
	updatePosition: function() {
		var sourceOffset;
		var origin;

		this.getEl(); // ensure this.el

		// make sure origin info was computed
		if (this.top0 === null) {
			this.sourceEl.width(); // hack to force IE8 to compute correct bounding box
			sourceOffset = this.sourceEl.offset();
			origin = this.el.offsetParent().offset();
			this.top0 = sourceOffset.top - origin.top;
			this.left0 = sourceOffset.left - origin.left;
		}

		this.el.css({
			top: this.top0 + this.topDelta,
			left: this.left0 + this.leftDelta
		});
	},


	// Gets called when the user moves the mouse
	mousemove: function(ev) {
		this.topDelta = ev.pageY - this.mouseY0;
		this.leftDelta = ev.pageX - this.mouseX0;

		if (!this.isHidden) {
			this.updatePosition();
		}
	},


	// Temporarily makes the tracking element invisible. Can be called before following starts
	hide: function() {
		if (!this.isHidden) {
			this.isHidden = true;
			if (this.el) {
				this.el.hide();
			}
		}
	},


	// Show the tracking element after it has been temporarily hidden
	show: function() {
		if (this.isHidden) {
			this.isHidden = false;
			this.updatePosition();
			this.getEl().show();
		}
	}

};

;;

/* A utility class for rendering <tr> rows.
----------------------------------------------------------------------------------------------------------------------*/
// It leverages methods of the subclass and the View to determine custom rendering behavior for each row "type"
// (such as highlight rows, day rows, helper rows, etc).

function RowRenderer(view) {
	this.view = view;
}


RowRenderer.prototype = {

	view: null, // a View object
	cellHtml: '<td/>', // plain default HTML used for a cell when no other is available


	// Renders the HTML for a row, leveraging custom cell-HTML-renderers based on the `rowType`.
	// Also applies the "intro" and "outro" cells, which are specified by the subclass and views.
	// `row` is an optional row number.
	rowHtml: function(rowType, row) {
		var view = this.view;
		var renderCell = this.getHtmlRenderer('cell', rowType);
		var cellHtml = '';
		var col;
		var date;

		row = row || 0;

		for (col = 0; col < view.colCnt; col++) {
			date = view.cellToDate(row, col);
			cellHtml += renderCell(row, col, date);
		}

		cellHtml = this.bookendCells(cellHtml, rowType, row); // apply intro and outro

		return '<tr>' + cellHtml + '</tr>';
	},


	// Applies the "intro" and "outro" HTML to the given cells.
	// Intro means the leftmost cell when the calendar is LTR and the rightmost cell when RTL. Vice-versa for outro.
	// `cells` can be an HTML string of <td>'s or a jQuery <tr> element
	// `row` is an optional row number.
	bookendCells: function(cells, rowType, row) {
		var view = this.view;
		var intro = this.getHtmlRenderer('intro', rowType)(row || 0);
		var outro = this.getHtmlRenderer('outro', rowType)(row || 0);
		var isRTL = view.opt('isRTL');
		var prependHtml = isRTL ? outro : intro;
		var appendHtml = isRTL ? intro : outro;

		if (typeof cells === 'string') {
			return prependHtml + cells + appendHtml;
		}
		else { // a jQuery <tr> element
			return cells.prepend(prependHtml).append(appendHtml);
		}
	},


	// Returns an HTML-rendering function given a specific `rendererName` (like cell, intro, or outro) and a specific
	// `rowType` (like day, eventSkeleton, helperSkeleton), which is optional.
	// If a renderer for the specific rowType doesn't exist, it will fall back to a generic renderer.
	// We will query the View object first for any custom rendering functions, then the methods of the subclass.
	getHtmlRenderer: function(rendererName, rowType) {
		var view = this.view;
		var generalName; // like "cellHtml"
		var specificName; // like "dayCellHtml". based on rowType
		var provider; // either the View or the RowRenderer subclass, whichever provided the method
		var renderer;

		generalName = rendererName + 'Html';
		if (rowType) {
			specificName = rowType + capitaliseFirstLetter(rendererName) + 'Html';
		}

		if (specificName && (renderer = view[specificName])) {
			provider = view;
		}
		else if (specificName && (renderer = this[specificName])) {
			provider = this;
		}
		else if ((renderer = view[generalName])) {
			provider = view;
		}
		else if ((renderer = this[generalName])) {
			provider = this;
		}

		if (typeof renderer === 'function') {
			return function() {
				return renderer.apply(provider, arguments) || ''; // use correct `this` and always return a string
			};
		}

		// the rendered can be a plain string as well. if not specified, always an empty string.
		return function() {
			return renderer || '';
		};
	}

};

;;

/* An abstract class comprised of a "grid" of cells that each represent a specific datetime
----------------------------------------------------------------------------------------------------------------------*/

function Grid(view) {
	RowRenderer.call(this, view); // call the super-constructor
	this.coordMap = new GridCoordMap(this);
	this.elsByFill = {};
}


Grid.prototype = createObject(RowRenderer.prototype); // declare the super-class
$.extend(Grid.prototype, {

	el: null, // the containing element
	coordMap: null, // a GridCoordMap that converts pixel values to datetimes
	cellDuration: null, // a cell's duration. subclasses must assign this ASAP
	elsByFill: null, // a hash of jQuery element sets used for rendering each fill. Keyed by fill name.


	// Renders the grid into the `el` element.
	// Subclasses should override and call this super-method when done.
	render: function() {
		this.bindHandlers();
	},


	// Called when the grid's resources need to be cleaned up
	destroy: function() {
		// subclasses can implement
	},


	/* Coordinates & Cells
	------------------------------------------------------------------------------------------------------------------*/


	// Populates the given empty arrays with the y and x coordinates of the cells
	buildCoords: function(rows, cols) {
		// subclasses must implement
	},


	// Given a cell object, returns the date for that cell
	getCellDate: function(cell) {
		// subclasses must implement
	},


	// Given a cell object, returns the element that represents the cell's whole-day
	getCellDayEl: function(cell) {
		// subclasses must implement
	},


	// Converts a range with an inclusive `start` and an exclusive `end` into an array of segment objects
	rangeToSegs: function(start, end) {
		// subclasses must implement
	},


	/* Handlers
	------------------------------------------------------------------------------------------------------------------*/


	// Attach handlers to `this.el`, using bubbling to listen to all ancestors.
	// We don't need to undo any of this in a "destroy" method, because the view will simply remove `this.el` from the
	// DOM and jQuery will be smart enough to garbage collect the handlers.
	bindHandlers: function() {
		var _this = this;

		this.el.on('mousedown', function(ev) {
			if (
				!$(ev.target).is('.fc-event-container *, .fc-more') && // not an an event element, or "more.." link
				!$(ev.target).closest('.fc-popover').length // not on a popover (like the "more.." events one)
			) {
				_this.dayMousedown(ev);
			}
		});

		this.bindSegHandlers(); // attach event-element-related handlers. in Grid.events.js
	},


	// Process a mousedown on an element that represents a day. For day clicking and selecting.
	dayMousedown: function(ev) {
		var _this = this;
		var view = this.view;
		var calendar = view.calendar;
		var isSelectable = view.opt('selectable');
		var dates = null; // the inclusive dates of the selection. will be null if no selection
		var start; // the inclusive start of the selection
		var end; // the *exclusive* end of the selection
		var dayEl;

		// this listener tracks a mousedown on a day element, and a subsequent drag.
		// if the drag ends on the same day, it is a 'dayClick'.
		// if 'selectable' is enabled, this listener also detects selections.
		var dragListener = new DragListener(this.coordMap, {
			//distance: 5, // needs more work if we want dayClick to fire correctly
			scroll: view.opt('dragScroll'),
			dragStart: function() {
				view.unselect(); // since we could be rendering a new selection, we want to clear any old one
			},
			cellOver: function(cell, date) {
				if (dragListener.origDate) { // click needs to have started on a cell

					dayEl = _this.getCellDayEl(cell);

					dates = [ date, dragListener.origDate ].sort(compareNumbers); // works with Moments
					start = dates[0];
					end = dates[1].clone().add(_this.cellDuration);

					if (isSelectable) {
						if (calendar.isSelectionAllowedInRange(start, end)) { // allowed to select within this range?
							_this.renderSelection(start, end);
						}
						else {
							dates = null; // flag for an invalid selection
							disableCursor();
						}
					}
				}
			},
			cellOut: function(cell, date) {
				dates = null;
				_this.destroySelection();
				enableCursor();
			},
			listenStop: function(ev) {
				if (dates) { // started and ended on a cell?
					if (dates[0].isSame(dates[1])) {
						view.trigger('dayClick', dayEl[0], start, ev);
					}
					if (isSelectable) {
						// the selection will already have been rendered. just report it
						view.reportSelection(start, end, ev);
					}
				}
				enableCursor();
			}
		});

		dragListener.mousedown(ev); // start listening, which will eventually initiate a dragStart
	},


	/* Event Dragging
	------------------------------------------------------------------------------------------------------------------*/


	// Renders a visual indication of a event being dragged over the given date(s).
	// `end` can be null, as well as `seg`. See View's documentation on renderDrag for more info.
	// A returned value of `true` signals that a mock "helper" event has been rendered.
	renderDrag: function(start, end, seg) {
		// subclasses must implement
	},


	// Unrenders a visual indication of an event being dragged
	destroyDrag: function() {
		// subclasses must implement
	},


	/* Event Resizing
	------------------------------------------------------------------------------------------------------------------*/


	// Renders a visual indication of an event being resized.
	// `start` and `end` are the updated dates of the event. `seg` is the original segment object involved in the drag.
	renderResize: function(start, end, seg) {
		// subclasses must implement
	},


	// Unrenders a visual indication of an event being resized.
	destroyResize: function() {
		// subclasses must implement
	},


	/* Event Helper
	------------------------------------------------------------------------------------------------------------------*/


	// Renders a mock event over the given date(s).
	// `end` can be null, in which case the mock event that is rendered will have a null end time.
	// `sourceSeg` is the internal segment object involved in the drag. If null, something external is dragging.
	renderRangeHelper: function(start, end, sourceSeg) {
		var view = this.view;
		var fakeEvent;

		// compute the end time if forced to do so (this is what EventManager does)
		if (!end && view.opt('forceEventDuration')) {
			end = view.calendar.getDefaultEventEnd(!start.hasTime(), start);
		}

		fakeEvent = sourceSeg ? createObject(sourceSeg.event) : {}; // mask the original event object if possible
		fakeEvent.start = start;
		fakeEvent.end = end;
		fakeEvent.allDay = !(start.hasTime() || (end && end.hasTime())); // freshly compute allDay

		// this extra className will be useful for differentiating real events from mock events in CSS
		fakeEvent.className = (fakeEvent.className || []).concat('fc-helper');

		// if something external is being dragged in, don't render a resizer
		if (!sourceSeg) {
			fakeEvent.editable = false;
		}

		this.renderHelper(fakeEvent, sourceSeg); // do the actual rendering
	},


	// Renders a mock event
	renderHelper: function(event, sourceSeg) {
		// subclasses must implement
	},


	// Unrenders a mock event
	destroyHelper: function() {
		// subclasses must implement
	},


	/* Selection
	------------------------------------------------------------------------------------------------------------------*/


	// Renders a visual indication of a selection. Will highlight by default but can be overridden by subclasses.
	renderSelection: function(start, end) {
		this.renderHighlight(start, end);
	},


	// Unrenders any visual indications of a selection. Will unrender a highlight by default.
	destroySelection: function() {
		this.destroyHighlight();
	},


	/* Highlight
	------------------------------------------------------------------------------------------------------------------*/


	// Renders an emphasis on the given date range. `start` is inclusive. `end` is exclusive.
	renderHighlight: function(start, end) {
		this.renderFill('highlight', this.rangeToSegs(start, end));
	},


	// Unrenders the emphasis on a date range
	destroyHighlight: function() {
		this.destroyFill('highlight');
	},


	// Generates an array of classNames for rendering the highlight. Used by the fill system.
	highlightSegClasses: function() {
		return [ 'fc-highlight' ];
	},


	/* Fill System (highlight, background events, business hours)
	------------------------------------------------------------------------------------------------------------------*/


	// Renders a set of rectangles over the given segments of time.
	// Returns a subset of segs, the segs that were actually rendered.
	// Responsible for populating this.elsByFill
	renderFill: function(type, segs) {
		// subclasses must implement
	},


	// Unrenders a specific type of fill that is currently rendered on the grid
	destroyFill: function(type) {
		var el = this.elsByFill[type];

		if (el) {
			el.remove();
			delete this.elsByFill[type];
		}
	},


	// Renders and assigns an `el` property for each fill segment. Generic enough to work with different types.
	// Only returns segments that successfully rendered.
	// To be harnessed by renderFill (implemented by subclasses).
	// Analagous to renderFgSegEls.
	renderFillSegEls: function(type, segs) {
		var _this = this;
		var segElMethod = this[type + 'SegEl'];
		var html = '';
		var renderedSegs = [];
		var i;

		if (segs.length) {

			// build a large concatenation of segment HTML
			for (i = 0; i < segs.length; i++) {
				html += this.fillSegHtml(type, segs[i]);
			}

			// Grab individual elements from the combined HTML string. Use each as the default rendering.
			// Then, compute the 'el' for each segment.
			$(html).each(function(i, node) {
				var seg = segs[i];
				var el = $(node);

				// allow custom filter methods per-type
				if (segElMethod) {
					el = segElMethod.call(_this, seg, el);
				}

				if (el) { // custom filters did not cancel the render
					el = $(el); // allow custom filter to return raw DOM node

					// correct element type? (would be bad if a non-TD were inserted into a table for example)
					if (el.is(_this.fillSegTag)) {
						seg.el = el;
						renderedSegs.push(seg);
					}
				}
			});
		}

		return renderedSegs;
	},


	fillSegTag: 'div', // subclasses can override


	// Builds the HTML needed for one fill segment. Generic enought o work with different types.
	fillSegHtml: function(type, seg) {
		var classesMethod = this[type + 'SegClasses']; // custom hooks per-type
		var stylesMethod = this[type + 'SegStyles']; //
		var classes = classesMethod ? classesMethod.call(this, seg) : [];
		var styles = stylesMethod ? stylesMethod.call(this, seg) : ''; // a semi-colon separated CSS property string

		return '<' + this.fillSegTag +
			(classes.length ? ' class="' + classes.join(' ') + '"' : '') +
			(styles ? ' style="' + styles + '"' : '') +
			' />';
	},


	/* Generic rendering utilities for subclasses
	------------------------------------------------------------------------------------------------------------------*/


	// Renders a day-of-week header row
	headHtml: function() {
		return '' +
			'<div class="fc-row ' + this.view.widgetHeaderClass + '">' +
				'<table>' +
					'<thead>' +
						this.rowHtml('head') + // leverages RowRenderer
					'</thead>' +
				'</table>' +
			'</div>';
	},


	// Used by the `headHtml` method, via RowRenderer, for rendering the HTML of a day-of-week header cell
	headCellHtml: function(row, col, date) {
		var view = this.view;
		var calendar = view.calendar;
		var colFormat = view.opt('columnFormat');

		return '' +
			'<th class="fc-day-header ' + view.widgetHeaderClass + ' fc-' + dayIDs[date.day()] + '">' +
				htmlEscape(calendar.formatDate(date, colFormat)) +
			'</th>';
	},


	// Renders the HTML for a single-day background cell
	bgCellHtml: function(row, col, date) {
		var view = this.view;
		var classes = this.getDayClasses(date);

		classes.unshift('fc-day', view.widgetContentClass);

		return '<td class="' + classes.join(' ') + '" data-date="' + date.format() + '"></td>';
	},


	// Computes HTML classNames for a single-day cell
	getDayClasses: function(date) {
		var view = this.view;
		var today = view.calendar.getNow().stripTime();
		var classes = [ 'fc-' + dayIDs[date.day()] ];

		if (
			view.name === 'month' &&
			date.month() != view.intervalStart.month()
		) {
			classes.push('fc-other-month');
		}

		if (date.isSame(today, 'day')) {
			classes.push(
				'fc-today',
				view.highlightStateClass
			);
		}
		else if (date < today) {
			classes.push('fc-past');
		}
		else {
			classes.push('fc-future');
		}

		return classes;
	}

});

;;

/* Event-rendering and event-interaction methods for the abstract Grid class
----------------------------------------------------------------------------------------------------------------------*/

$.extend(Grid.prototype, {

	mousedOverSeg: null, // the segment object the user's mouse is over. null if over nothing
	isDraggingSeg: false, // is a segment being dragged? boolean
	isResizingSeg: false, // is a segment being resized? boolean
	segs: null, // the event segments currently rendered in the grid


	// Renders the given events onto the grid
	renderEvents: function(events) {
		var segs = this.eventsToSegs(events);
		var bgSegs = [];
		var fgSegs = [];
		var i, seg;

		for (i = 0; i < segs.length; i++) {
			seg = segs[i];

			if (isBgEvent(seg.event)) {
				bgSegs.push(seg);
			}
			else {
				fgSegs.push(seg);
			}
		}

		// Render each different type of segment.
		// Each function may return a subset of the segs, segs that were actually rendered.
		bgSegs = this.renderBgSegs(bgSegs) || bgSegs;
		fgSegs = this.renderFgSegs(fgSegs) || fgSegs;

		this.segs = bgSegs.concat(fgSegs);
	},


	// Unrenders all events currently rendered on the grid
	destroyEvents: function() {
		this.triggerSegMouseout(); // trigger an eventMouseout if user's mouse is over an event

		this.destroyFgSegs();
		this.destroyBgSegs();

		this.segs = null;
	},


	// Retrieves all rendered segment objects currently rendered on the grid
	getSegs: function() {
		return this.segs || [];
	},


	/* Foreground Segment Rendering
	------------------------------------------------------------------------------------------------------------------*/


	// Renders foreground event segments onto the grid. May return a subset of segs that were rendered.
	renderFgSegs: function(segs) {
		// subclasses must implement
	},


	// Unrenders all currently rendered foreground segments
	destroyFgSegs: function() {
		// subclasses must implement
	},


	// Renders and assigns an `el` property for each foreground event segment.
	// Only returns segments that successfully rendered.
	// A utility that subclasses may use.
	renderFgSegEls: function(segs, disableResizing) {
		var view = this.view;
		var html = '';
		var renderedSegs = [];
		var i;

		if (segs.length) { // don't build an empty html string

			// build a large concatenation of event segment HTML
			for (i = 0; i < segs.length; i++) {
				html += this.fgSegHtml(segs[i], disableResizing);
			}

			// Grab individual elements from the combined HTML string. Use each as the default rendering.
			// Then, compute the 'el' for each segment. An el might be null if the eventRender callback returned false.
			$(html).each(function(i, node) {
				var seg = segs[i];
				var el = view.resolveEventEl(seg.event, $(node));

				if (el) {
					el.data('fc-seg', seg); // used by handlers
					seg.el = el;
					renderedSegs.push(seg);
				}
			});
		}

		return renderedSegs;
	},


	// Generates the HTML for the default rendering of a foreground event segment. Used by renderFgSegEls()
	fgSegHtml: function(seg, disableResizing) {
		// subclasses should implement
	},


	/* Background Segment Rendering
	------------------------------------------------------------------------------------------------------------------*/


	// Renders the given background event segments onto the grid.
	// Returns a subset of the segs that were actually rendered.
	renderBgSegs: function(segs) {
		return this.renderFill('bgEvent', segs);
	},


	// Unrenders all the currently rendered background event segments
	destroyBgSegs: function() {
		this.destroyFill('bgEvent');
	},


	// Renders a background event element, given the default rendering. Called by the fill system.
	bgEventSegEl: function(seg, el) {
		return this.view.resolveEventEl(seg.event, el); // will filter through eventRender
	},


	// Generates an array of classNames to be used for the default rendering of a background event.
	// Called by the fill system.
	bgEventSegClasses: function(seg) {
		var event = seg.event;
		var source = event.source || {};

		return [ 'fc-bgevent' ].concat(
			event.className,
			source.className || []
		);
	},


	// Generates a semicolon-separated CSS string to be used for the default rendering of a background event.
	// Called by the fill system.
	// TODO: consolidate with getEventSkinCss?
	bgEventSegStyles: function(seg) {
		var view = this.view;
		var event = seg.event;
		var source = event.source || {};
		var eventColor = event.color;
		var sourceColor = source.color;
		var optionColor = view.opt('eventColor');
		var backgroundColor =
			event.backgroundColor ||
			eventColor ||
			source.backgroundColor ||
			sourceColor ||
			view.opt('eventBackgroundColor') ||
			optionColor;

		if (backgroundColor) {
			return 'background-color:' + backgroundColor;
		}

		return '';
	},


	// Generates an array of classNames to be used for the rendering business hours overlay. Called by the fill system.
	businessHoursSegClasses: function(seg) {
		return [ 'fc-nonbusiness', 'fc-bgevent' ];
	},


	/* Handlers
	------------------------------------------------------------------------------------------------------------------*/


	// Attaches event-element-related handlers to the container element and leverage bubbling
	bindSegHandlers: function() {
		var _this = this;
		var view = this.view;

		$.each(
			{
				mouseenter: function(seg, ev) {
					_this.triggerSegMouseover(seg, ev);
				},
				mouseleave: function(seg, ev) {
					_this.triggerSegMouseout(seg, ev);
				},
				click: function(seg, ev) {
					return view.trigger('eventClick', this, seg.event, ev); // can return `false` to cancel
				},
				mousedown: function(seg, ev) {
					if ($(ev.target).is('.fc-resizer') && view.isEventResizable(seg.event)) {
						_this.segResizeMousedown(seg, ev);
					}
					else if (view.isEventDraggable(seg.event)) {
						_this.segDragMousedown(seg, ev);
					}
				}
			},
			function(name, func) {
				// attach the handler to the container element and only listen for real event elements via bubbling
				_this.el.on(name, '.fc-event-container > *', function(ev) {
					var seg = $(this).data('fc-seg'); // grab segment data. put there by View::renderEvents

					// only call the handlers if there is not a drag/resize in progress
					if (seg && !_this.isDraggingSeg && !_this.isResizingSeg) {
						return func.call(this, seg, ev); // `this` will be the event element
					}
				});
			}
		);
	},


	// Updates internal state and triggers handlers for when an event element is moused over
	triggerSegMouseover: function(seg, ev) {
		if (!this.mousedOverSeg) {
			this.mousedOverSeg = seg;
			this.view.trigger('eventMouseover', seg.el[0], seg.event, ev);
		}
	},


	// Updates internal state and triggers handlers for when an event element is moused out.
	// Can be given no arguments, in which case it will mouseout the segment that was previously moused over.
	triggerSegMouseout: function(seg, ev) {
		ev = ev || {}; // if given no args, make a mock mouse event

		if (this.mousedOverSeg) {
			seg = seg || this.mousedOverSeg; // if given no args, use the currently moused-over segment
			this.mousedOverSeg = null;
			this.view.trigger('eventMouseout', seg.el[0], seg.event, ev);
		}
	},


	/* Dragging
	------------------------------------------------------------------------------------------------------------------*/


	// Called when the user does a mousedown on an event, which might lead to dragging.
	// Generic enough to work with any type of Grid.
	segDragMousedown: function(seg, ev) {
		var _this = this;
		var view = this.view;
		var calendar = view.calendar;
		var el = seg.el;
		var event = seg.event;
		var newStart, newEnd;

		// A clone of the original element that will move with the mouse
		var mouseFollower = new MouseFollower(seg.el, {
			parentEl: view.el,
			opacity: view.opt('dragOpacity'),
			revertDuration: view.opt('dragRevertDuration'),
			zIndex: 2 // one above the .fc-view
		});

		// Tracks mouse movement over the *view's* coordinate map. Allows dragging and dropping between subcomponents
		// of the view.
		var dragListener = new DragListener(view.coordMap, {
			distance: 5,
			scroll: view.opt('dragScroll'),
			listenStart: function(ev) {
				mouseFollower.hide(); // don't show until we know this is a real drag
				mouseFollower.start(ev);
			},
			dragStart: function(ev) {
				_this.triggerSegMouseout(seg, ev); // ensure a mouseout on the manipulated event has been reported
				_this.isDraggingSeg = true;
				view.hideEvent(event); // hide all event segments. our mouseFollower will take over
				view.trigger('eventDragStart', el[0], event, ev, {}); // last argument is jqui dummy
			},
			cellOver: function(cell, date) {
				var origDate = seg.cellDate || dragListener.origDate;
				var res = _this.computeDraggedEventDates(seg, origDate, date);
				newStart = res.start;
				newEnd = res.end;

				if (calendar.isEventAllowedInRange(event, newStart, res.visibleEnd)) { // allowed to drop here?
					if (view.renderDrag(newStart, newEnd, seg)) { // have the view render a visual indication
						mouseFollower.hide(); // if the view is already using a mock event "helper", hide our own
					}
					else {
						mouseFollower.show();
					}
				}
				else {
					// have the helper follow the mouse (no snapping) with a warning-style cursor
					newStart = null; // mark an invalid drop date
					mouseFollower.show();
					disableCursor();
				}
			},
			cellOut: function() { // called before mouse moves to a different cell OR moved out of all cells
				newStart = null;
				view.destroyDrag(); // unrender whatever was done in view.renderDrag
				mouseFollower.show(); // show in case we are moving out of all cells
				enableCursor();
			},
			dragStop: function(ev) {
				var hasChanged = newStart && !newStart.isSame(event.start);

				// do revert animation if hasn't changed. calls a callback when finished (whether animation or not)
				mouseFollower.stop(!hasChanged, function() {
					_this.isDraggingSeg = false;
					view.destroyDrag();
					view.showEvent(event);
					view.trigger('eventDragStop', el[0], event, ev, {}); // last argument is jqui dummy

					if (hasChanged) {
						view.eventDrop(el[0], event, newStart, ev); // will rerender all events...
					}
				});

				enableCursor();
			},
			listenStop: function() {
				mouseFollower.stop(); // put in listenStop in case there was a mousedown but the drag never started
			}
		});

		dragListener.mousedown(ev); // start listening, which will eventually lead to a dragStart
	},


	// Given a segment, the dates where a drag began and ended, calculates the Event Object's new start and end dates.
	// Might return a `null` end (even when forceEventDuration is on).
	computeDraggedEventDates: function(seg, dragStartDate, dropDate) {
		var view = this.view;
		var event = seg.event;
		var start = event.start;
		var end = view.calendar.getEventEnd(event);
		var delta;
		var newStart;
		var newEnd;
		var newAllDay;
		var visibleEnd;

		if (dropDate.hasTime() === dragStartDate.hasTime()) {
			delta = dayishDiff(dropDate, dragStartDate);
			newStart = start.clone().add(delta);
			if (event.end === null) { // do we need to compute an end?
				newEnd = null;
			}
			else {
				newEnd = end.clone().add(delta);
			}
			newAllDay = event.allDay; // keep it the same
		}
		else {
			// if switching from day <-> timed, start should be reset to the dropped date, and the end cleared
			newStart = dropDate;
			newEnd = null; // end should be cleared
			newAllDay = !dropDate.hasTime();
		}

		// compute what the end date will appear to be
		visibleEnd = newEnd || view.calendar.getDefaultEventEnd(newAllDay, newStart);

		return { start: newStart, end: newEnd, visibleEnd: visibleEnd };
	},


	/* Resizing
	------------------------------------------------------------------------------------------------------------------*/


	// Called when the user does a mousedown on an event's resizer, which might lead to resizing.
	// Generic enough to work with any type of Grid.
	segResizeMousedown: function(seg, ev) {
		var _this = this;
		var view = this.view;
		var calendar = view.calendar;
		var el = seg.el;
		var event = seg.event;
		var start = event.start;
		var end = view.calendar.getEventEnd(event);
		var newEnd = null;
		var dragListener;

		function destroy() { // resets the rendering to show the original event
			_this.destroyResize();
			view.showEvent(event);
		}

		// Tracks mouse movement over the *grid's* coordinate map
		dragListener = new DragListener(this.coordMap, {
			distance: 5,
			scroll: view.opt('dragScroll'),
			dragStart: function(ev) {
				_this.triggerSegMouseout(seg, ev); // ensure a mouseout on the manipulated event has been reported
				_this.isResizingSeg = true;
				view.trigger('eventResizeStart', el[0], event, ev, {}); // last argument is jqui dummy
			},
			cellOver: function(cell, date) {
				// compute the new end. don't allow it to go before the event's start
				if (date.isBefore(start)) { // allows comparing ambig to non-ambig
					date = start;
				}
				newEnd = date.clone().add(_this.cellDuration); // make it an exclusive end

				if (calendar.isEventAllowedInRange(event, start, newEnd)) { // allowed to be resized here?
					if (newEnd.isSame(end)) {
						newEnd = null; // mark an invalid resize
						destroy();
					}
					else {
						_this.renderResize(start, newEnd, seg);
						view.hideEvent(event);
					}
				}
				else {
					newEnd = null; // mark an invalid resize
					destroy();
					disableCursor();
				}
			},
			cellOut: function() { // called before mouse moves to a different cell OR moved out of all cells
				newEnd = null;
				destroy();
				enableCursor();
			},
			dragStop: function(ev) {
				_this.isResizingSeg = false;
				destroy();
				enableCursor();
				view.trigger('eventResizeStop', el[0], event, ev, {}); // last argument is jqui dummy

				if (newEnd) {
					view.eventResize(el[0], event, newEnd, ev); // will rerender all events...
				}
			}
		});

		dragListener.mousedown(ev); // start listening, which will eventually lead to a dragStart
	},


	/* Rendering Utils
	------------------------------------------------------------------------------------------------------------------*/


	// Generic utility for generating the HTML classNames for an event segment's element
	getSegClasses: function(seg, isDraggable, isResizable) {
		var event = seg.event;
		var classes = [
			'fc-event',
			seg.isStart ? 'fc-start' : 'fc-not-start',
			seg.isEnd ? 'fc-end' : 'fc-not-end'
		].concat(
			event.className,
			event.source ? event.source.className : []
		);

		if (isDraggable) {
			classes.push('fc-draggable');
		}
		if (isResizable) {
			classes.push('fc-resizable');
		}

		return classes;
	},


	// Utility for generating a CSS string with all the event skin-related properties
	getEventSkinCss: function(event) {
		var view = this.view;
		var source = event.source || {};
		var eventColor = event.color;
		var sourceColor = source.color;
		var optionColor = view.opt('eventColor');
		var backgroundColor =
			event.backgroundColor ||
			eventColor ||
			source.backgroundColor ||
			sourceColor ||
			view.opt('eventBackgroundColor') ||
			optionColor;
		var borderColor =
			event.borderColor ||
			eventColor ||
			source.borderColor ||
			sourceColor ||
			view.opt('eventBorderColor') ||
			optionColor;
		var textColor =
			event.textColor ||
			source.textColor ||
			view.opt('eventTextColor');
		var statements = [];
		if (backgroundColor) {
			statements.push('background-color:' + backgroundColor);
		}
		if (borderColor) {
			statements.push('border-color:' + borderColor);
		}
		if (textColor) {
			statements.push('color:' + textColor);
		}
		return statements.join(';');
	},


	/* Converting events -> ranges -> segs
	------------------------------------------------------------------------------------------------------------------*/


	// Converts an array of event objects into an array of event segment objects.
	// A custom `rangeToSegsFunc` may be given for arbitrarily slicing up events.
	eventsToSegs: function(events, rangeToSegsFunc) {
		var eventRanges = this.eventsToRanges(events);
		var segs = [];
		var i;

		for (i = 0; i < eventRanges.length; i++) {
			segs.push.apply(
				segs,
				this.eventRangeToSegs(eventRanges[i], rangeToSegsFunc)
			);
		}

		return segs;
	},


	// Converts an array of events into an array of "range" objects.
	// A "range" object is a plain object with start/end properties denoting the time it covers. Also an event property.
	// For "normal" events, this will be identical to the event's start/end, but for "inverse-background" events,
	// will create an array of ranges that span the time *not* covered by the given event.
	eventsToRanges: function(events) {
		var _this = this;
		var eventsById = groupEventsById(events);
		var ranges = [];

		// group by ID so that related inverse-background events can be rendered together
		$.each(eventsById, function(id, eventGroup) {
			if (eventGroup.length) {
				ranges.push.apply(
					ranges,
					isInverseBgEvent(eventGroup[0]) ?
						_this.eventsToInverseRanges(eventGroup) :
						_this.eventsToNormalRanges(eventGroup)
				);
			}
		});

		return ranges;
	},


	// Converts an array of "normal" events (not inverted rendering) into a parallel array of ranges
	eventsToNormalRanges: function(events) {
		var calendar = this.view.calendar;
		var ranges = [];
		var i, event;
		var eventStart, eventEnd;

		for (i = 0; i < events.length; i++) {
			event = events[i];

			// make copies and normalize by stripping timezone
			eventStart = event.start.clone().stripZone();
			eventEnd = calendar.getEventEnd(event).stripZone();

			ranges.push({
				event: event,
				start: eventStart,
				end: eventEnd,
				eventStartMS: +eventStart,
				eventDurationMS: eventEnd - eventStart
			});
		}

		return ranges;
	},


	// Converts an array of events, with inverse-background rendering, into an array of range objects.
	// The range objects will cover all the time NOT covered by the events.
	eventsToInverseRanges: function(events) {
		var view = this.view;
		var viewStart = view.start.clone().stripZone(); // normalize timezone
		var viewEnd = view.end.clone().stripZone(); // normalize timezone
		var normalRanges = this.eventsToNormalRanges(events); // will give us normalized dates we can use w/o copies
		var inverseRanges = [];
		var event0 = events[0]; // assign this to each range's `.event`
		var start = viewStart; // the end of the previous range. the start of the new range
		var i, normalRange;

		// ranges need to be in order. required for our date-walking algorithm
		normalRanges.sort(compareNormalRanges);

		for (i = 0; i < normalRanges.length; i++) {
			normalRange = normalRanges[i];

			// add the span of time before the event (if there is any)
			if (normalRange.start > start) { // compare millisecond time (skip any ambig logic)
				inverseRanges.push({
					event: event0,
					start: start,
					end: normalRange.start
				});
			}

			start = normalRange.end;
		}

		// add the span of time after the last event (if there is any)
		if (start < viewEnd) { // compare millisecond time (skip any ambig logic)
			inverseRanges.push({
				event: event0,
				start: start,
				end: viewEnd
			});
		}

		return inverseRanges;
	},


	// Slices the given event range into one or more segment objects.
	// A `rangeToSegsFunc` custom slicing function can be given.
	eventRangeToSegs: function(eventRange, rangeToSegsFunc) {
		var segs;
		var i, seg;

		if (rangeToSegsFunc) {
			segs = rangeToSegsFunc(eventRange.start, eventRange.end);
		}
		else {
			segs = this.rangeToSegs(eventRange.start, eventRange.end); // defined by the subclass
		}

		for (i = 0; i < segs.length; i++) {
			seg = segs[i];
			seg.event = eventRange.event;
			seg.eventStartMS = eventRange.eventStartMS;
			seg.eventDurationMS = eventRange.eventDurationMS;
		}

		return segs;
	}

});


/* Utilities
----------------------------------------------------------------------------------------------------------------------*/


function isBgEvent(event) { // returns true if background OR inverse-background
	var rendering = getEventRendering(event);
	return rendering === 'background' || rendering === 'inverse-background';
}


function isInverseBgEvent(event) {
	return getEventRendering(event) === 'inverse-background';
}


function getEventRendering(event) {
	return firstDefined((event.source || {}).rendering, event.rendering);
}


function groupEventsById(events) {
	var eventsById = {};
	var i, event;

	for (i = 0; i < events.length; i++) {
		event = events[i];
		(eventsById[event._id] || (eventsById[event._id] = [])).push(event);
	}

	return eventsById;
}


// A cmp function for determining which non-inverted "ranges" (see above) happen earlier
function compareNormalRanges(range1, range2) {
	return range1.eventStartMS - range2.eventStartMS; // earlier ranges go first
}


// A cmp function for determining which segments should take visual priority
// DOES NOT WORK ON INVERTED BACKGROUND EVENTS because they have no eventStartMS/eventDurationMS
function compareSegs(seg1, seg2) {
	return seg1.eventStartMS - seg2.eventStartMS || // earlier events go first
		seg2.eventDurationMS - seg1.eventDurationMS || // tie? longer events go first
		seg2.event.allDay - seg1.event.allDay || // tie? put all-day events first (booleans cast to 0/1)
		(seg1.event.title || '').localeCompare(seg2.event.title); // tie? alphabetically by title
}


;;

/* A component that renders a grid of whole-days that runs horizontally. There can be multiple rows, one per week.
----------------------------------------------------------------------------------------------------------------------*/

function DayGrid(view) {
	Grid.call(this, view); // call the super-constructor
}


DayGrid.prototype = createObject(Grid.prototype); // declare the super-class
$.extend(DayGrid.prototype, {

	numbersVisible: false, // should render a row for day/week numbers? manually set by the view
	cellDuration: moment.duration({ days: 1 }), // required for Grid.event.js. Each cell is always a single day
	bottomCoordPadding: 0, // hack for extending the hit area for the last row of the coordinate grid

	rowEls: null, // set of fake row elements
	dayEls: null, // set of whole-day elements comprising the row's background
	helperEls: null, // set of cell skeleton elements for rendering the mock event "helper"


	// Renders the rows and columns into the component's `this.el`, which should already be assigned.
	// isRigid determins whether the individual rows should ignore the contents and be a constant height.
	// Relies on the view's colCnt and rowCnt. In the future, this component should probably be self-sufficient.
	render: function(isRigid) {
		var view = this.view;
		var html = '';
		var row;

		for (row = 0; row < view.rowCnt; row++) {
			html += this.dayRowHtml(row, isRigid);
		}
		this.el.html(html);

		this.rowEls = this.el.find('.fc-row');
		this.dayEls = this.el.find('.fc-day');

		// run all the day cells through the dayRender callback
		this.dayEls.each(function(i, node) {
			var date = view.cellToDate(Math.floor(i / view.colCnt), i % view.colCnt);
			view.trigger('dayRender', null, date, $(node));
		});

		Grid.prototype.render.call(this); // call the super-method
	},


	destroy: function() {
		this.destroySegPopover();
	},


	// Generates the HTML for a single row. `row` is the row number.
	dayRowHtml: function(row, isRigid) {
		var view = this.view;
		var classes = [ 'fc-row', 'fc-week', view.widgetContentClass ];

		if (isRigid) {
			classes.push('fc-rigid');
		}

		return '' +
			'<div class="' + classes.join(' ') + '">' +
				'<div class="fc-bg">' +
					'<table>' +
						this.rowHtml('day', row) + // leverages RowRenderer. calls dayCellHtml()
					'</table>' +
				'</div>' +
				'<div class="fc-content-skeleton">' +
					'<table>' +
						(this.numbersVisible ?
							'<thead>' +
								this.rowHtml('number', row) + // leverages RowRenderer. View will define render method
							'</thead>' :
							''
							) +
					'</table>' +
				'</div>' +
			'</div>';
	},


	// Renders the HTML for a whole-day cell. Will eventually end up in the day-row's background.
	// We go through a 'day' row type instead of just doing a 'bg' row type so that the View can do custom rendering
	// specifically for whole-day rows, whereas a 'bg' might also be used for other purposes (TimeGrid bg for example).
	dayCellHtml: function(row, col, date) {
		return this.bgCellHtml(row, col, date);
	},


	/* Coordinates & Cells
	------------------------------------------------------------------------------------------------------------------*/


	// Populates the empty `rows` and `cols` arrays with coordinates of the cells. For CoordGrid.
	buildCoords: function(rows, cols) {
		var colCnt = this.view.colCnt;
		var e, n, p;

		this.dayEls.slice(0, colCnt).each(function(i, _e) { // iterate the first row of day elements
			e = $(_e);
			n = e.offset().left;
			if (i) {
				p[1] = n;
			}
			p = [ n ];
			cols[i] = p;
		});
		p[1] = n + e.outerWidth();

		this.rowEls.each(function(i, _e) {
			e = $(_e);
			n = e.offset().top;
			if (i) {
				p[1] = n;
			}
			p = [ n ];
			rows[i] = p;
		});
		p[1] = n + e.outerHeight() + this.bottomCoordPadding; // hack to extend hit area of last row
	},


	// Converts a cell to a date
	getCellDate: function(cell) {
		return this.view.cellToDate(cell); // leverages the View's cell system
	},


	// Gets the whole-day element associated with the cell
	getCellDayEl: function(cell) {
		return this.dayEls.eq(cell.row * this.view.colCnt + cell.col);
	},


	// Converts a range with an inclusive `start` and an exclusive `end` into an array of segment objects
	rangeToSegs: function(start, end) {
		return this.view.rangeToSegments(start, end); // leverages the View's cell system
	},


	/* Event Drag Visualization
	------------------------------------------------------------------------------------------------------------------*/


	// Renders a visual indication of an event hovering over the given date(s).
	// `end` can be null, as well as `seg`. See View's documentation on renderDrag for more info.
	// A returned value of `true` signals that a mock "helper" event has been rendered.
	renderDrag: function(start, end, seg) {
		var opacity;

		// always render a highlight underneath
		this.renderHighlight(
			start,
			end || this.view.calendar.getDefaultEventEnd(true, start)
		);

		// if a segment from the same calendar but another component is being dragged, render a helper event
		if (seg && !seg.el.closest(this.el).length) {

			this.renderRangeHelper(start, end, seg);

			opacity = this.view.opt('dragOpacity');
			if (opacity !== undefined) {
				this.helperEls.css('opacity', opacity);
			}

			return true; // a helper has been rendered
		}
	},


	// Unrenders any visual indication of a hovering event
	destroyDrag: function() {
		this.destroyHighlight();
		this.destroyHelper();
	},


	/* Event Resize Visualization
	------------------------------------------------------------------------------------------------------------------*/


	// Renders a visual indication of an event being resized
	renderResize: function(start, end, seg) {
		this.renderHighlight(start, end);
		this.renderRangeHelper(start, end, seg);
	},


	// Unrenders a visual indication of an event being resized
	destroyResize: function() {
		this.destroyHighlight();
		this.destroyHelper();
	},


	/* Event Helper
	------------------------------------------------------------------------------------------------------------------*/


	// Renders a mock "helper" event. `sourceSeg` is the associated internal segment object. It can be null.
	renderHelper: function(event, sourceSeg) {
		var helperNodes = [];
		var segs = this.eventsToSegs([ event ]);
		var rowStructs;

		segs = this.renderFgSegEls(segs); // assigns each seg's el and returns a subset of segs that were rendered
		rowStructs = this.renderSegRows(segs);

		// inject each new event skeleton into each associated row
		this.rowEls.each(function(row, rowNode) {
			var rowEl = $(rowNode); // the .fc-row
			var skeletonEl = $('<div class="fc-helper-skeleton"><table/></div>'); // will be absolutely positioned
			var skeletonTop;

			// If there is an original segment, match the top position. Otherwise, put it at the row's top level
			if (sourceSeg && sourceSeg.row === row) {
				skeletonTop = sourceSeg.el.position().top;
			}
			else {
				skeletonTop = rowEl.find('.fc-content-skeleton tbody').position().top;
			}

			skeletonEl.css('top', skeletonTop)
				.find('table')
					.append(rowStructs[row].tbodyEl);

			rowEl.append(skeletonEl);
			helperNodes.push(skeletonEl[0]);
		});

		this.helperEls = $(helperNodes); // array -> jQuery set
	},


	// Unrenders any visual indication of a mock helper event
	destroyHelper: function() {
		if (this.helperEls) {
			this.helperEls.remove();
			this.helperEls = null;
		}
	},


	/* Fill System (highlight, background events, business hours)
	------------------------------------------------------------------------------------------------------------------*/


	fillSegTag: 'td', // override the default tag name


	// Renders a set of rectangles over the given segments of days.
	// Only returns segments that successfully rendered.
	renderFill: function(type, segs) {
		var nodes = [];
		var i, seg;
		var skeletonEl;

		segs = this.renderFillSegEls(type, segs); // assignes `.el` to each seg. returns successfully rendered segs

		for (i = 0; i < segs.length; i++) {
			seg = segs[i];
			skeletonEl = this.renderFillRow(type, seg);
			this.rowEls.eq(seg.row).append(skeletonEl);
			nodes.push(skeletonEl[0]);
		}

		this.elsByFill[type] = $(nodes);

		return segs;
	},


	// Generates the HTML needed for one row of a fill. Requires the seg's el to be rendered.
	renderFillRow: function(type, seg) {
		var colCnt = this.view.colCnt;
		var startCol = seg.leftCol;
		var endCol = seg.rightCol + 1;
		var skeletonEl;
		var trEl;

		skeletonEl = $(
			'<div class="fc-' + type.toLowerCase() + '-skeleton">' +
				'<table><tr/></table>' +
			'</div>'
		);
		trEl = skeletonEl.find('tr');

		if (startCol > 0) {
			trEl.append('<td colspan="' + startCol + '"/>');
		}

		trEl.append(
			seg.el.attr('colspan', endCol - startCol)
		);

		if (endCol < colCnt) {
			trEl.append('<td colspan="' + (colCnt - endCol) + '"/>');
		}

		this.bookendCells(trEl, type);

		return skeletonEl;
	}

});

;;

/* Event-rendering methods for the DayGrid class
----------------------------------------------------------------------------------------------------------------------*/

$.extend(DayGrid.prototype, {

	rowStructs: null, // an array of objects, each holding information about a row's foreground event-rendering


	// Unrenders all events currently rendered on the grid
	destroyEvents: function() {
		this.destroySegPopover(); // removes the "more.." events popover
		Grid.prototype.destroyEvents.apply(this, arguments); // calls the super-method
	},


	// Retrieves all rendered segment objects currently rendered on the grid
	getSegs: function() {
		return Grid.prototype.getSegs.call(this) // get the segments from the super-method
			.concat(this.popoverSegs || []); // append the segments from the "more..." popover
	},


	// Renders the given background event segments onto the grid
	renderBgSegs: function(segs) {

		// don't render timed background events
		var allDaySegs = $.grep(segs, function(seg) {
			return seg.event.allDay;
		});

		return Grid.prototype.renderBgSegs.call(this, allDaySegs); // call the super-method
	},


	// Renders the given foreground event segments onto the grid
	renderFgSegs: function(segs) {
		var rowStructs;

		// render an `.el` on each seg
		// returns a subset of the segs. segs that were actually rendered
		segs = this.renderFgSegEls(segs);

		rowStructs = this.rowStructs = this.renderSegRows(segs);

		// append to each row's content skeleton
		this.rowEls.each(function(i, rowNode) {
			$(rowNode).find('.fc-content-skeleton > table').append(
				rowStructs[i].tbodyEl
			);
		});

		return segs; // return only the segs that were actually rendered
	},


	// Unrenders all currently rendered foreground event segments
	destroyFgSegs: function() {
		var rowStructs = this.rowStructs || [];
		var rowStruct;

		while ((rowStruct = rowStructs.pop())) {
			rowStruct.tbodyEl.remove();
		}

		this.rowStructs = null;
	},


	// Uses the given events array to generate <tbody> elements that should be appended to each row's content skeleton.
	// Returns an array of rowStruct objects (see the bottom of `renderSegRow`).
	// PRECONDITION: each segment shoud already have a rendered and assigned `.el`
	renderSegRows: function(segs) {
		var rowStructs = [];
		var segRows;
		var row;

		segRows = this.groupSegRows(segs); // group into nested arrays

		// iterate each row of segment groupings
		for (row = 0; row < segRows.length; row++) {
			rowStructs.push(
				this.renderSegRow(row, segRows[row])
			);
		}

		return rowStructs;
	},


	// Builds the HTML to be used for the default element for an individual segment
	fgSegHtml: function(seg, disableResizing) {
		var view = this.view;
		var isRTL = view.opt('isRTL');
		var event = seg.event;
		var isDraggable = view.isEventDraggable(event);
		var isResizable = !disableResizing && event.allDay && seg.isEnd && view.isEventResizable(event);
		var classes = this.getSegClasses(seg, isDraggable, isResizable);
		var skinCss = this.getEventSkinCss(event);
		var timeHtml = '';
		var titleHtml;

		classes.unshift('fc-day-grid-event');

		// Only display a timed events time if it is the starting segment
		if (!event.allDay && seg.isStart) {
			timeHtml = '<span class="fc-time">' + htmlEscape(view.getEventTimeText(event)) + '</span>';
		}

		titleHtml =
			'<span class="fc-title">' +
				(htmlEscape(event.title || '') || '&nbsp;') + // we always want one line of height
			'</span>';
		
		return '<a class="' + classes.join(' ') + '"' +
				(event.url ?
					' href="' + htmlEscape(event.url) + '"' :
					''
					) +
				(skinCss ?
					' style="' + skinCss + '"' :
					''
					) +
			'>' +
				'<div class="fc-content">' +
					(isRTL ?
						titleHtml + ' ' + timeHtml : // put a natural space in between
						timeHtml + ' ' + titleHtml   //
						) +
				'</div>' +
				(isResizable ?
					'<div class="fc-resizer"/>' :
					''
					) +
			'</a>';
	},


	// Given a row # and an array of segments all in the same row, render a <tbody> element, a skeleton that contains
	// the segments. Returns object with a bunch of internal data about how the render was calculated.
	renderSegRow: function(row, rowSegs) {
		var view = this.view;
		var colCnt = view.colCnt;
		var segLevels = this.buildSegLevels(rowSegs); // group into sub-arrays of levels
		var levelCnt = Math.max(1, segLevels.length); // ensure at least one level
		var tbody = $('<tbody/>');
		var segMatrix = []; // lookup for which segments are rendered into which level+col cells
		var cellMatrix = []; // lookup for all <td> elements of the level+col matrix
		var loneCellMatrix = []; // lookup for <td> elements that only take up a single column
		var i, levelSegs;
		var col;
		var tr;
		var j, seg;
		var td;

		// populates empty cells from the current column (`col`) to `endCol`
		function emptyCellsUntil(endCol) {
			while (col < endCol) {
				// try to grab a cell from the level above and extend its rowspan. otherwise, create a fresh cell
				td = (loneCellMatrix[i - 1] || [])[col];
				if (td) {
					td.attr(
						'rowspan',
						parseInt(td.attr('rowspan') || 1, 10) + 1
					);
				}
				else {
					td = $('<td/>');
					tr.append(td);
				}
				cellMatrix[i][col] = td;
				loneCellMatrix[i][col] = td;
				col++;
			}
		}

		for (i = 0; i < levelCnt; i++) { // iterate through all levels
			levelSegs = segLevels[i];
			col = 0;
			tr = $('<tr/>');

			segMatrix.push([]);
			cellMatrix.push([]);
			loneCellMatrix.push([]);

			// levelCnt might be 1 even though there are no actual levels. protect against this.
			// this single empty row is useful for styling.
			if (levelSegs) {
				for (j = 0; j < levelSegs.length; j++) { // iterate through segments in level
					seg = levelSegs[j];

					emptyCellsUntil(seg.leftCol);

					// create a container that occupies or more columns. append the event element.
					td = $('<td class="fc-event-container"/>').append(seg.el);
					if (seg.leftCol != seg.rightCol) {
						td.attr('colspan', seg.rightCol - seg.leftCol + 1);
					}
					else { // a single-column segment
						loneCellMatrix[i][col] = td;
					}

					while (col <= seg.rightCol) {
						cellMatrix[i][col] = td;
						segMatrix[i][col] = seg;
						col++;
					}

					tr.append(td);
				}
			}

			emptyCellsUntil(colCnt); // finish off the row
			this.bookendCells(tr, 'eventSkeleton');
			tbody.append(tr);
		}

		return { // a "rowStruct"
			row: row, // the row number
			tbodyEl: tbody,
			cellMatrix: cellMatrix,
			segMatrix: segMatrix,
			segLevels: segLevels,
			segs: rowSegs
		};
	},


	// Stacks a flat array of segments, which are all assumed to be in the same row, into subarrays of vertical levels.
	buildSegLevels: function(segs) {
		var levels = [];
		var i, seg;
		var j;

		// Give preference to elements with certain criteria, so they have
		// a chance to be closer to the top.
		segs.sort(compareSegs);
		
		for (i = 0; i < segs.length; i++) {
			seg = segs[i];

			// loop through levels, starting with the topmost, until the segment doesn't collide with other segments
			for (j = 0; j < levels.length; j++) {
				if (!isDaySegCollision(seg, levels[j])) {
					break;
				}
			}
			// `j` now holds the desired subrow index
			seg.level = j;

			// create new level array if needed and append segment
			(levels[j] || (levels[j] = [])).push(seg);
		}

		// order segments left-to-right. very important if calendar is RTL
		for (j = 0; j < levels.length; j++) {
			levels[j].sort(compareDaySegCols);
		}

		return levels;
	},


	// Given a flat array of segments, return an array of sub-arrays, grouped by each segment's row
	groupSegRows: function(segs) {
		var view = this.view;
		var segRows = [];
		var i;

		for (i = 0; i < view.rowCnt; i++) {
			segRows.push([]);
		}

		for (i = 0; i < segs.length; i++) {
			segRows[segs[i].row].push(segs[i]);
		}

		return segRows;
	}

});


// Computes whether two segments' columns collide. They are assumed to be in the same row.
function isDaySegCollision(seg, otherSegs) {
	var i, otherSeg;

	for (i = 0; i < otherSegs.length; i++) {
		otherSeg = otherSegs[i];

		if (
			otherSeg.leftCol <= seg.rightCol &&
			otherSeg.rightCol >= seg.leftCol
		) {
			return true;
		}
	}

	return false;
}


// A cmp function for determining the leftmost event
function compareDaySegCols(a, b) {
	return a.leftCol - b.leftCol;
}

;;

/* Methods relate to limiting the number events for a given day on a DayGrid
----------------------------------------------------------------------------------------------------------------------*/
// NOTE: all the segs being passed around in here are foreground segs

$.extend(DayGrid.prototype, {


	segPopover: null, // the Popover that holds events that can't fit in a cell. null when not visible
	popoverSegs: null, // an array of segment objects that the segPopover holds. null when not visible


	destroySegPopover: function() {
		if (this.segPopover) {
			this.segPopover.hide(); // will trigger destruction of `segPopover` and `popoverSegs`
		}
	},


	// Limits the number of "levels" (vertically stacking layers of events) for each row of the grid.
	// `levelLimit` can be false (don't limit), a number, or true (should be computed).
	limitRows: function(levelLimit) {
		var rowStructs = this.rowStructs || [];
		var row; // row #
		var rowLevelLimit;

		for (row = 0; row < rowStructs.length; row++) {
			this.unlimitRow(row);

			if (!levelLimit) {
				rowLevelLimit = false;
			}
			else if (typeof levelLimit === 'number') {
				rowLevelLimit = levelLimit;
			}
			else {
				rowLevelLimit = this.computeRowLevelLimit(row);
			}

			if (rowLevelLimit !== false) {
				this.limitRow(row, rowLevelLimit);
			}
		}
	},


	// Computes the number of levels a row will accomodate without going outside its bounds.
	// Assumes the row is "rigid" (maintains a constant height regardless of what is inside).
	// `row` is the row number.
	computeRowLevelLimit: function(row) {
		var rowEl = this.rowEls.eq(row); // the containing "fake" row div
		var rowHeight = rowEl.height(); // TODO: cache somehow?
		var trEls = this.rowStructs[row].tbodyEl.children();
		var i, trEl;

		// Reveal one level <tr> at a time and stop when we find one out of bounds
		for (i = 0; i < trEls.length; i++) {
			trEl = trEls.eq(i).removeClass('fc-limited'); // get and reveal
			if (trEl.position().top + trEl.outerHeight() > rowHeight) {
				return i;
			}
		}

		return false; // should not limit at all
	},


	// Limits the given grid row to the maximum number of levels and injects "more" links if necessary.
	// `row` is the row number.
	// `levelLimit` is a number for the maximum (inclusive) number of levels allowed.
	limitRow: function(row, levelLimit) {
		var _this = this;
		var view = this.view;
		var rowStruct = this.rowStructs[row];
		var moreNodes = []; // array of "more" <a> links and <td> DOM nodes
		var col = 0; // col #
		var cell;
		var levelSegs; // array of segment objects in the last allowable level, ordered left-to-right
		var cellMatrix; // a matrix (by level, then column) of all <td> jQuery elements in the row
		var limitedNodes; // array of temporarily hidden level <tr> and segment <td> DOM nodes
		var i, seg;
		var segsBelow; // array of segment objects below `seg` in the current `col`
		var totalSegsBelow; // total number of segments below `seg` in any of the columns `seg` occupies
		var colSegsBelow; // array of segment arrays, below seg, one for each column (offset from segs's first column)
		var td, rowspan;
		var segMoreNodes; // array of "more" <td> cells that will stand-in for the current seg's cell
		var j;
		var moreTd, moreWrap, moreLink;

		// Iterates through empty level cells and places "more" links inside if need be
		function emptyCellsUntil(endCol) { // goes from current `col` to `endCol`
			while (col < endCol) {
				cell = { row: row, col: col };
				segsBelow = _this.getCellSegs(cell, levelLimit);
				if (segsBelow.length) {
					td = cellMatrix[levelLimit - 1][col];
					moreLink = _this.renderMoreLink(cell, segsBelow);
					moreWrap = $('<div/>').append(moreLink);
					td.append(moreWrap);
					moreNodes.push(moreWrap[0]);
				}
				col++;
			}
		}

		if (levelLimit && levelLimit < rowStruct.segLevels.length) { // is it actually over the limit?
			levelSegs = rowStruct.segLevels[levelLimit - 1];
			cellMatrix = rowStruct.cellMatrix;

			limitedNodes = rowStruct.tbodyEl.children().slice(levelLimit) // get level <tr> elements past the limit
				.addClass('fc-limited').get(); // hide elements and get a simple DOM-nodes array

			// iterate though segments in the last allowable level
			for (i = 0; i < levelSegs.length; i++) {
				seg = levelSegs[i];
				emptyCellsUntil(seg.leftCol); // process empty cells before the segment

				// determine *all* segments below `seg` that occupy the same columns
				colSegsBelow = [];
				totalSegsBelow = 0;
				while (col <= seg.rightCol) {
					cell = { row: row, col: col };
					segsBelow = this.getCellSegs(cell, levelLimit);
					colSegsBelow.push(segsBelow);
					totalSegsBelow += segsBelow.length;
					col++;
				}

				if (totalSegsBelow) { // do we need to replace this segment with one or many "more" links?
					td = cellMatrix[levelLimit - 1][seg.leftCol]; // the segment's parent cell
					rowspan = td.attr('rowspan') || 1;
					segMoreNodes = [];

					// make a replacement <td> for each column the segment occupies. will be one for each colspan
					for (j = 0; j < colSegsBelow.length; j++) {
						moreTd = $('<td class="fc-more-cell"/>').attr('rowspan', rowspan);
						segsBelow = colSegsBelow[j];
						cell = { row: row, col: seg.leftCol + j };
						moreLink = this.renderMoreLink(cell, [ seg ].concat(segsBelow)); // count seg as hidden too
						moreWrap = $('<div/>').append(moreLink);
						moreTd.append(moreWrap);
						segMoreNodes.push(moreTd[0]);
						moreNodes.push(moreTd[0]);
					}

					td.addClass('fc-limited').after($(segMoreNodes)); // hide original <td> and inject replacements
					limitedNodes.push(td[0]);
				}
			}

			emptyCellsUntil(view.colCnt); // finish off the level
			rowStruct.moreEls = $(moreNodes); // for easy undoing later
			rowStruct.limitedEls = $(limitedNodes); // for easy undoing later
		}
	},


	// Reveals all levels and removes all "more"-related elements for a grid's row.
	// `row` is a row number.
	unlimitRow: function(row) {
		var rowStruct = this.rowStructs[row];

		if (rowStruct.moreEls) {
			rowStruct.moreEls.remove();
			rowStruct.moreEls = null;
		}

		if (rowStruct.limitedEls) {
			rowStruct.limitedEls.removeClass('fc-limited');
			rowStruct.limitedEls = null;
		}
	},


	// Renders an <a> element that represents hidden event element for a cell.
	// Responsible for attaching click handler as well.
	renderMoreLink: function(cell, hiddenSegs) {
		var _this = this;
		var view = this.view;

		return $('<a class="fc-more"/>')
			.text(
				this.getMoreLinkText(hiddenSegs.length)
			)
			.on('click', function(ev) {
				var clickOption = view.opt('eventLimitClick');
				var date = view.cellToDate(cell);
				var moreEl = $(this);
				var dayEl = _this.getCellDayEl(cell);
				var allSegs = _this.getCellSegs(cell);

				// rescope the segments to be within the cell's date
				var reslicedAllSegs = _this.resliceDaySegs(allSegs, date);
				var reslicedHiddenSegs = _this.resliceDaySegs(hiddenSegs, date);

				if (typeof clickOption === 'function') {
					// the returned value can be an atomic option
					clickOption = view.trigger('eventLimitClick', null, {
						date: date,
						dayEl: dayEl,
						moreEl: moreEl,
						segs: reslicedAllSegs,
						hiddenSegs: reslicedHiddenSegs
					}, ev);
				}

				if (clickOption === 'popover') {
					_this.showSegPopover(date, cell, moreEl, reslicedAllSegs);
				}
				else if (typeof clickOption === 'string') { // a view name
					view.calendar.zoomTo(date, clickOption);
				}
			});
	},


	// Reveals the popover that displays all events within a cell
	showSegPopover: function(date, cell, moreLink, segs) {
		var _this = this;
		var view = this.view;
		var moreWrap = moreLink.parent(); // the <div> wrapper around the <a>
		var topEl; // the element we want to match the top coordinate of
		var options;

		if (view.rowCnt == 1) {
			topEl = this.view.el; // will cause the popover to cover any sort of header
		}
		else {
			topEl = this.rowEls.eq(cell.row); // will align with top of row
		}

		options = {
			className: 'fc-more-popover',
			content: this.renderSegPopoverContent(date, segs),
			parentEl: this.el,
			top: topEl.offset().top,
			autoHide: true, // when the user clicks elsewhere, hide the popover
			viewportConstrain: view.opt('popoverViewportConstrain'),
			hide: function() {
				// destroy everything when the popover is hidden
				_this.segPopover.destroy();
				_this.segPopover = null;
				_this.popoverSegs = null;
			}
		};

		// Determine horizontal coordinate.
		// We use the moreWrap instead of the <td> to avoid border confusion.
		if (view.opt('isRTL')) {
			options.right = moreWrap.offset().left + moreWrap.outerWidth() + 1; // +1 to be over cell border
		}
		else {
			options.left = moreWrap.offset().left - 1; // -1 to be over cell border
		}

		this.segPopover = new Popover(options);
		this.segPopover.show();
	},


	// Builds the inner DOM contents of the segment popover
	renderSegPopoverContent: function(date, segs) {
		var view = this.view;
		var isTheme = view.opt('theme');
		var title = date.format(view.opt('dayPopoverFormat'));
		var content = $(
			'<div class="fc-header ' + view.widgetHeaderClass + '">' +
				'<span class="fc-close ' +
					(isTheme ? 'ui-icon ui-icon-closethick' : 'fc-icon fc-icon-x') +
				'"></span>' +
				'<span class="fc-title">' +
					htmlEscape(title) +
				'</span>' +
				'<div class="fc-clear"/>' +
			'</div>' +
			'<div class="fc-body ' + view.widgetContentClass + '">' +
				'<div class="fc-event-container"></div>' +
			'</div>'
		);
		var segContainer = content.find('.fc-event-container');
		var i;

		// render each seg's `el` and only return the visible segs
		segs = this.renderFgSegEls(segs, true); // disableResizing=true
		this.popoverSegs = segs;

		for (i = 0; i < segs.length; i++) {

			// because segments in the popover are not part of a grid coordinate system, provide a hint to any
			// grids that want to do drag-n-drop about which cell it came from
			segs[i].cellDate = date;

			segContainer.append(segs[i].el);
		}

		return content;
	},


	// Given the events within an array of segment objects, reslice them to be in a single day
	resliceDaySegs: function(segs, dayDate) {

		// build an array of the original events
		var events = $.map(segs, function(seg) {
			return seg.event;
		});

		var dayStart = dayDate.clone().stripTime();
		var dayEnd = dayStart.clone().add(1, 'days');

		// slice the events with a custom slicing function
		return this.eventsToSegs(
			events,
			function(rangeStart, rangeEnd) {
				var seg = intersectionToSeg(rangeStart, rangeEnd, dayStart, dayEnd); // if no intersection, undefined
				return seg ? [ seg ] : []; // must return an array of segments
			}
		);
	},


	// Generates the text that should be inside a "more" link, given the number of events it represents
	getMoreLinkText: function(num) {
		var view = this.view;
		var opt = view.opt('eventLimitText');

		if (typeof opt === 'function') {
			return opt(num);
		}
		else {
			return '+' + num + ' ' + opt;
		}
	},


	// Returns segments within a given cell.
	// If `startLevel` is specified, returns only events including and below that level. Otherwise returns all segs.
	getCellSegs: function(cell, startLevel) {
		var segMatrix = this.rowStructs[cell.row].segMatrix;
		var level = startLevel || 0;
		var segs = [];
		var seg;

		while (level < segMatrix.length) {
			seg = segMatrix[level][cell.col];
			if (seg) {
				segs.push(seg);
			}
			level++;
		}

		return segs;
	}

});

;;

/* A component that renders one or more columns of vertical time slots
----------------------------------------------------------------------------------------------------------------------*/

function TimeGrid(view) {
	Grid.call(this, view); // call the super-constructor
}


TimeGrid.prototype = createObject(Grid.prototype); // define the super-class
$.extend(TimeGrid.prototype, {

	slotDuration: null, // duration of a "slot", a distinct time segment on given day, visualized by lines
	snapDuration: null, // granularity of time for dragging and selecting

	minTime: null, // Duration object that denotes the first visible time of any given day
	maxTime: null, // Duration object that denotes the exclusive visible end time of any given day

	dayEls: null, // cells elements in the day-row background
	slatEls: null, // elements running horizontally across all columns

	slatTops: null, // an array of top positions, relative to the container. last item holds bottom of last slot

	helperEl: null, // cell skeleton element for rendering the mock event "helper"

	businessHourSegs: null,


	// Renders the time grid into `this.el`, which should already be assigned.
	// Relies on the view's colCnt. In the future, this component should probably be self-sufficient.
	render: function() {
		this.processOptions();

		this.el.html(this.renderHtml());

		this.dayEls = this.el.find('.fc-day');
		this.slatEls = this.el.find('.fc-slats tr');

		this.computeSlatTops();

		this.renderBusinessHours();

		Grid.prototype.render.call(this); // call the super-method
	},


	renderBusinessHours: function() {
		var events = this.view.calendar.getBusinessHoursEvents();
		this.businessHourSegs = this.renderFill('businessHours', this.eventsToSegs(events), 'bgevent');
	},


	// Renders the basic HTML skeleton for the grid
	renderHtml: function() {
		return '' +
			'<div class="fc-bg">' +
				'<table>' +
					this.rowHtml('slotBg') + // leverages RowRenderer, which will call slotBgCellHtml
				'</table>' +
			'</div>' +
			'<div class="fc-slats">' +
				'<table>' +
					this.slatRowHtml() +
				'</table>' +
			'</div>';
	},


	// Renders the HTML for a vertical background cell behind the slots.
	// This method is distinct from 'bg' because we wanted a new `rowType` so the View could customize the rendering.
	slotBgCellHtml: function(row, col, date) {
		return this.bgCellHtml(row, col, date);
	},


	// Generates the HTML for the horizontal "slats" that run width-wise. Has a time axis on a side. Depends on RTL.
	slatRowHtml: function() {
		var view = this.view;
		var calendar = view.calendar;
		var isRTL = view.opt('isRTL');
		var html = '';
		var slotNormal = this.slotDuration.asMinutes() % 15 === 0;
		var slotTime = moment.duration(+this.minTime); // wish there was .clone() for durations
		var slotDate; // will be on the view's first day, but we only care about its time
		var minutes;
		var axisHtml;

		// Calculate the time for each slot
		while (slotTime < this.maxTime) {
			slotDate = view.start.clone().time(slotTime); // will be in UTC but that's good. to avoid DST issues
			minutes = slotDate.minutes();

			axisHtml =
				'<td class="fc-axis fc-time ' + view.widgetContentClass + '" ' + view.axisStyleAttr() + '>' +
					((!slotNormal || !minutes) ? // if irregular slot duration, or on the hour, then display the time
						'<span>' + // for matchCellWidths
							htmlEscape(calendar.formatDate(slotDate, view.opt('axisFormat'))) +
						'</span>' :
						''
						) +
				'</td>';

			html +=
				'<tr ' + (!minutes ? '' : 'class="fc-minor"') + '>' +
					(!isRTL ? axisHtml : '') +
					'<td class="' + view.widgetContentClass + '"/>' +
					(isRTL ? axisHtml : '') +
				"</tr>";

			slotTime.add(this.slotDuration);
		}

		return html;
	},


	// Parses various options into properties of this object
	processOptions: function() {
		var view = this.view;
		var slotDuration = view.opt('slotDuration');
		var snapDuration = view.opt('snapDuration');

		slotDuration = moment.duration(slotDuration);
		snapDuration = snapDuration ? moment.duration(snapDuration) : slotDuration;

		this.slotDuration = slotDuration;
		this.snapDuration = snapDuration;
		this.cellDuration = snapDuration; // important to assign this for Grid.events.js

		this.minTime = moment.duration(view.opt('minTime'));
		this.maxTime = moment.duration(view.opt('maxTime'));
	},


	// Slices up a date range into a segment for each column
	rangeToSegs: function(rangeStart, rangeEnd) {
		var view = this.view;
		var segs = [];
		var seg;
		var col;
		var cellDate;
		var colStart, colEnd;

		// normalize
		rangeStart = rangeStart.clone().stripZone();
		rangeEnd = rangeEnd.clone().stripZone();

		for (col = 0; col < view.colCnt; col++) {
			cellDate = view.cellToDate(0, col); // use the View's cell system for this
			colStart = cellDate.clone().time(this.minTime);
			colEnd = cellDate.clone().time(this.maxTime);
			seg = intersectionToSeg(rangeStart, rangeEnd, colStart, colEnd);
			if (seg) {
				seg.col = col;
				segs.push(seg);
			}
		}

		return segs;
	},


	/* Coordinates
	------------------------------------------------------------------------------------------------------------------*/


	// Called when there is a window resize/zoom and we need to recalculate coordinates for the grid
	resize: function() {
		this.computeSlatTops();
		this.updateSegVerticals();
	},


	// Populates the given empty `rows` and `cols` arrays with offset positions of the "snap" cells.
	// "Snap" cells are different the slots because they might have finer granularity.
	buildCoords: function(rows, cols) {
		var colCnt = this.view.colCnt;
		var originTop = this.el.offset().top;
		var snapTime = moment.duration(+this.minTime);
		var p = null;
		var e, n;

		this.dayEls.slice(0, colCnt).each(function(i, _e) {
			e = $(_e);
			n = e.offset().left;
			if (p) {
				p[1] = n;
			}
			p = [ n ];
			cols[i] = p;
		});
		p[1] = n + e.outerWidth();

		p = null;
		while (snapTime < this.maxTime) {
			n = originTop + this.computeTimeTop(snapTime);
			if (p) {
				p[1] = n;
			}
			p = [ n ];
			rows.push(p);
			snapTime.add(this.snapDuration);
		}
		p[1] = originTop + this.computeTimeTop(snapTime); // the position of the exclusive end
	},


	// Gets the datetime for the given slot cell
	getCellDate: function(cell) {
		var view = this.view;
		var calendar = view.calendar;

		return calendar.rezoneDate( // since we are adding a time, it needs to be in the calendar's timezone
			view.cellToDate(0, cell.col) // View's coord system only accounts for start-of-day for column
				.time(this.minTime + this.snapDuration * cell.row)
		);
	},


	// Gets the element that represents the whole-day the cell resides on
	getCellDayEl: function(cell) {
		return this.dayEls.eq(cell.col);
	},


	// Computes the top coordinate, relative to the bounds of the grid, of the given date.
	// A `startOfDayDate` must be given for avoiding ambiguity over how to treat midnight.
	computeDateTop: function(date, startOfDayDate) {
		return this.computeTimeTop(
			moment.duration(
				date.clone().stripZone() - startOfDayDate.clone().stripTime()
			)
		);
	},


	// Computes the top coordinate, relative to the bounds of the grid, of the given time (a Duration).
	computeTimeTop: function(time) {
		var slatCoverage = (time - this.minTime) / this.slotDuration; // floating-point value of # of slots covered
		var slatIndex;
		var slatRemainder;
		var slatTop;
		var slatBottom;

		// constrain. because minTime/maxTime might be customized
		slatCoverage = Math.max(0, slatCoverage);
		slatCoverage = Math.min(this.slatEls.length, slatCoverage);

		slatIndex = Math.floor(slatCoverage); // an integer index of the furthest whole slot
		slatRemainder = slatCoverage - slatIndex;
		slatTop = this.slatTops[slatIndex]; // the top position of the furthest whole slot

		if (slatRemainder) { // time spans part-way into the slot
			slatBottom = this.slatTops[slatIndex + 1];
			return slatTop + (slatBottom - slatTop) * slatRemainder; // part-way between slots
		}
		else {
			return slatTop;
		}
	},


	// Queries each `slatEl` for its position relative to the grid's container and stores it in `slatTops`.
	// Includes the the bottom of the last slat as the last item in the array.
	computeSlatTops: function() {
		var tops = [];
		var top;

		this.slatEls.each(function(i, node) {
			top = $(node).position().top;
			tops.push(top);
		});

		tops.push(top + this.slatEls.last().outerHeight()); // bottom of the last slat

		this.slatTops = tops;
	},


	/* Event Drag Visualization
	------------------------------------------------------------------------------------------------------------------*/


	// Renders a visual indication of an event being dragged over the specified date(s).
	// `end` and `seg` can be null. See View's documentation on renderDrag for more info.
	renderDrag: function(start, end, seg) {
		var opacity;

		if (seg) { // if there is event information for this drag, render a helper event
			this.renderRangeHelper(start, end, seg);

			opacity = this.view.opt('dragOpacity');
			if (opacity !== undefined) {
				this.helperEl.css('opacity', opacity);
			}

			return true; // signal that a helper has been rendered
		}
		else {
			// otherwise, just render a highlight
			this.renderHighlight(
				start,
				end || this.view.calendar.getDefaultEventEnd(false, start)
			);
		}
	},


	// Unrenders any visual indication of an event being dragged
	destroyDrag: function() {
		this.destroyHelper();
		this.destroyHighlight();
	},


	/* Event Resize Visualization
	------------------------------------------------------------------------------------------------------------------*/


	// Renders a visual indication of an event being resized
	renderResize: function(start, end, seg) {
		this.renderRangeHelper(start, end, seg);
	},


	// Unrenders any visual indication of an event being resized
	destroyResize: function() {
		this.destroyHelper();
	},


	/* Event Helper
	------------------------------------------------------------------------------------------------------------------*/


	// Renders a mock "helper" event. `sourceSeg` is the original segment object and might be null (an external drag)
	renderHelper: function(event, sourceSeg) {
		var segs = this.eventsToSegs([ event ]);
		var tableEl;
		var i, seg;
		var sourceEl;

		segs = this.renderFgSegEls(segs); // assigns each seg's el and returns a subset of segs that were rendered
		tableEl = this.renderSegTable(segs);

		// Try to make the segment that is in the same row as sourceSeg look the same
		for (i = 0; i < segs.length; i++) {
			seg = segs[i];
			if (sourceSeg && sourceSeg.col === seg.col) {
				sourceEl = sourceSeg.el;
				seg.el.css({
					left: sourceEl.css('left'),
					right: sourceEl.css('right'),
					'margin-left': sourceEl.css('margin-left'),
					'margin-right': sourceEl.css('margin-right')
				});
			}
		}

		this.helperEl = $('<div class="fc-helper-skeleton"/>')
			.append(tableEl)
				.appendTo(this.el);
	},


	// Unrenders any mock helper event
	destroyHelper: function() {
		if (this.helperEl) {
			this.helperEl.remove();
			this.helperEl = null;
		}
	},


	/* Selection
	------------------------------------------------------------------------------------------------------------------*/


	// Renders a visual indication of a selection. Overrides the default, which was to simply render a highlight.
	renderSelection: function(start, end) {
		if (this.view.opt('selectHelper')) { // this setting signals that a mock helper event should be rendered
			this.renderRangeHelper(start, end);
		}
		else {
			this.renderHighlight(start, end);
		}
	},


	// Unrenders any visual indication of a selection
	destroySelection: function() {
		this.destroyHelper();
		this.destroyHighlight();
	},


	/* Fill System (highlight, background events, business hours)
	------------------------------------------------------------------------------------------------------------------*/


	// Renders a set of rectangles over the given time segments.
	// Only returns segments that successfully rendered.
	renderFill: function(type, segs, className) {
		var view = this.view;
		var segCols;
		var skeletonEl;
		var trEl;
		var col, colSegs;
		var tdEl;
		var containerEl;
		var dayDate;
		var i, seg;

		if (segs.length) {

			segs = this.renderFillSegEls(type, segs); // assignes `.el` to each seg. returns successfully rendered segs
			segCols = this.groupSegCols(segs); // group into sub-arrays, and assigns 'col' to each seg

			className = className || type.toLowerCase();
			skeletonEl = $(
				'<div class="fc-' + className + '-skeleton">' +
					'<table><tr/></table>' +
				'</div>'
			);
			trEl = skeletonEl.find('tr');

			for (col = 0; col < segCols.length; col++) {
				colSegs = segCols[col];
				tdEl = $('<td/>').appendTo(trEl);

				if (colSegs.length) {
					containerEl = $('<div class="fc-' + className + '-container"/>').appendTo(tdEl);
					dayDate = view.cellToDate(0, col);

					for (i = 0; i < colSegs.length; i++) {
						seg = colSegs[i];
						containerEl.append(
							seg.el.css({
								top: this.computeDateTop(seg.start, dayDate),
								bottom: -this.computeDateTop(seg.end, dayDate) // the y position of the bottom edge
							})
						);
					}
				}
			}

			this.bookendCells(trEl, type);

			this.el.append(skeletonEl);
			this.elsByFill[type] = skeletonEl;
		}

		return segs;
	}

});

;;

/* Event-rendering methods for the TimeGrid class
----------------------------------------------------------------------------------------------------------------------*/

$.extend(TimeGrid.prototype, {

	eventSkeletonEl: null, // has cells with event-containers, which contain absolutely positioned event elements


	// Renders the given foreground event segments onto the grid
	renderFgSegs: function(segs) {
		segs = this.renderFgSegEls(segs); // returns a subset of the segs. segs that were actually rendered

		this.el.append(
			this.eventSkeletonEl = $('<div class="fc-content-skeleton"/>')
				.append(this.renderSegTable(segs))
		);

		return segs; // return only the segs that were actually rendered
	},


	// Unrenders all currently rendered foreground event segments
	destroyFgSegs: function(segs) {
		if (this.eventSkeletonEl) {
			this.eventSkeletonEl.remove();
			this.eventSkeletonEl = null;
		}
	},


	// Renders and returns the <table> portion of the event-skeleton.
	// Returns an object with properties 'tbodyEl' and 'segs'.
	renderSegTable: function(segs) {
		var tableEl = $('<table><tr/></table>');
		var trEl = tableEl.find('tr');
		var segCols;
		var i, seg;
		var col, colSegs;
		var containerEl;

		segCols = this.groupSegCols(segs); // group into sub-arrays, and assigns 'col' to each seg

		this.computeSegVerticals(segs); // compute and assign top/bottom

		for (col = 0; col < segCols.length; col++) { // iterate each column grouping
			colSegs = segCols[col];
			placeSlotSegs(colSegs); // compute horizontal coordinates, z-index's, and reorder the array

			containerEl = $('<div class="fc-event-container"/>');

			// assign positioning CSS and insert into container
			for (i = 0; i < colSegs.length; i++) {
				seg = colSegs[i];
				seg.el.css(this.generateSegPositionCss(seg));

				// if the height is short, add a className for alternate styling
				if (seg.bottom - seg.top < 30) {
					seg.el.addClass('fc-short');
				}

				containerEl.append(seg.el);
			}

			trEl.append($('<td/>').append(containerEl));
		}

		this.bookendCells(trEl, 'eventSkeleton');

		return tableEl;
	},


	// Refreshes the CSS top/bottom coordinates for each segment element. Probably after a window resize/zoom.
	// Repositions business hours segs too, so not just for events. Maybe shouldn't be here.
	updateSegVerticals: function() {
		var allSegs = (this.segs || []).concat(this.businessHourSegs || []);
		var i;

		this.computeSegVerticals(allSegs);

		for (i = 0; i < allSegs.length; i++) {
			allSegs[i].el.css(
				this.generateSegVerticalCss(allSegs[i])
			);
		}
	},


	// For each segment in an array, computes and assigns its top and bottom properties
	computeSegVerticals: function(segs) {
		var i, seg;

		for (i = 0; i < segs.length; i++) {
			seg = segs[i];
			seg.top = this.computeDateTop(seg.start, seg.start);
			seg.bottom = this.computeDateTop(seg.end, seg.start);
		}
	},


	// Renders the HTML for a single event segment's default rendering
	fgSegHtml: function(seg, disableResizing) {
		var view = this.view;
		var event = seg.event;
		var isDraggable = view.isEventDraggable(event);
		var isResizable = !disableResizing && seg.isEnd && view.isEventResizable(event);
		var classes = this.getSegClasses(seg, isDraggable, isResizable);
		var skinCss = this.getEventSkinCss(event);
		var timeText;
		var fullTimeText; // more verbose time text. for the print stylesheet
		var startTimeText; // just the start time text

		classes.unshift('fc-time-grid-event');

		if (view.isMultiDayEvent(event)) { // if the event appears to span more than one day...
			// Don't display time text on segments that run entirely through a day.
			// That would appear as midnight-midnight and would look dumb.
			// Otherwise, display the time text for the *segment's* times (like 6pm-midnight or midnight-10am)
			if (seg.isStart || seg.isEnd) {
				timeText = view.getEventTimeText(seg.start, seg.end);
				fullTimeText = view.getEventTimeText(seg.start, seg.end, 'LT');
				startTimeText = view.getEventTimeText(seg.start, null);
			}
		} else {
			// Display the normal time text for the *event's* times
			timeText = view.getEventTimeText(event);
			fullTimeText = view.getEventTimeText(event, 'LT');
			startTimeText = view.getEventTimeText(event.start, null);
		}

		return '<a class="' + classes.join(' ') + '"' +
			(event.url ?
				' href="' + htmlEscape(event.url) + '"' :
				''
				) +
			(skinCss ?
				' style="' + skinCss + '"' :
				''
				) +
			'>' +
				'<div class="fc-content">' +
					(timeText ?
						'<div class="fc-time"' +
						' data-start="' + htmlEscape(startTimeText) + '"' +
						' data-full="' + htmlEscape(fullTimeText) + '"' +
						'>' +
							'<span>' + htmlEscape(timeText) + '</span>' +
						'</div>' :
						''
						) +
					(event.title ?
						'<div class="fc-title">' +
							htmlEscape(event.title) +
						'</div>' :
						''
						) +
				'</div>' +
				'<div class="fc-bg"/>' +
				(isResizable ?
					'<div class="fc-resizer"/>' :
					''
					) +
			'</a>';
	},


	// Generates an object with CSS properties/values that should be applied to an event segment element.
	// Contains important positioning-related properties that should be applied to any event element, customized or not.
	generateSegPositionCss: function(seg) {
		var view = this.view;
		var isRTL = view.opt('isRTL');
		var shouldOverlap = view.opt('slotEventOverlap');
		var backwardCoord = seg.backwardCoord; // the left side if LTR. the right side if RTL. floating-point
		var forwardCoord = seg.forwardCoord; // the right side if LTR. the left side if RTL. floating-point
		var props = this.generateSegVerticalCss(seg); // get top/bottom first
		var left; // amount of space from left edge, a fraction of the total width
		var right; // amount of space from right edge, a fraction of the total width

		if (shouldOverlap) {
			// double the width, but don't go beyond the maximum forward coordinate (1.0)
			forwardCoord = Math.min(1, backwardCoord + (forwardCoord - backwardCoord) * 2);
		}

		if (isRTL) {
			left = 1 - forwardCoord;
			right = backwardCoord;
		}
		else {
			left = backwardCoord;
			right = 1 - forwardCoord;
		}

		props.zIndex = seg.level + 1; // convert from 0-base to 1-based
		props.left = left * 100 + '%';
		props.right = right * 100 + '%';

		if (shouldOverlap && seg.forwardPressure) {
			// add padding to the edge so that forward stacked events don't cover the resizer's icon
			props[isRTL ? 'marginLeft' : 'marginRight'] = 10 * 2; // 10 is a guesstimate of the icon's width 
		}

		return props;
	},


	// Generates an object with CSS properties for the top/bottom coordinates of a segment element
	generateSegVerticalCss: function(seg) {
		return {
			top: seg.top,
			bottom: -seg.bottom // flipped because needs to be space beyond bottom edge of event container
		};
	},


	// Given a flat array of segments, return an array of sub-arrays, grouped by each segment's col
	groupSegCols: function(segs) {
		var view = this.view;
		var segCols = [];
		var i;

		for (i = 0; i < view.colCnt; i++) {
			segCols.push([]);
		}

		for (i = 0; i < segs.length; i++) {
			segCols[segs[i].col].push(segs[i]);
		}

		return segCols;
	}

});


// Given an array of segments that are all in the same column, sets the backwardCoord and forwardCoord on each.
// Also reorders the given array by date!
function placeSlotSegs(segs) {
	var levels;
	var level0;
	var i;

	segs.sort(compareSegs); // order by date
	levels = buildSlotSegLevels(segs);
	computeForwardSlotSegs(levels);

	if ((level0 = levels[0])) {

		for (i = 0; i < level0.length; i++) {
			computeSlotSegPressures(level0[i]);
		}

		for (i = 0; i < level0.length; i++) {
			computeSlotSegCoords(level0[i], 0, 0);
		}
	}
}


// Builds an array of segments "levels". The first level will be the leftmost tier of segments if the calendar is
// left-to-right, or the rightmost if the calendar is right-to-left. Assumes the segments are already ordered by date.
function buildSlotSegLevels(segs) {
	var levels = [];
	var i, seg;
	var j;

	for (i=0; i<segs.length; i++) {
		seg = segs[i];

		// go through all the levels and stop on the first level where there are no collisions
		for (j=0; j<levels.length; j++) {
			if (!computeSlotSegCollisions(seg, levels[j]).length) {
				break;
			}
		}

		seg.level = j;

		(levels[j] || (levels[j] = [])).push(seg);
	}

	return levels;
}


// For every segment, figure out the other segments that are in subsequent
// levels that also occupy the same vertical space. Accumulate in seg.forwardSegs
function computeForwardSlotSegs(levels) {
	var i, level;
	var j, seg;
	var k;

	for (i=0; i<levels.length; i++) {
		level = levels[i];

		for (j=0; j<level.length; j++) {
			seg = level[j];

			seg.forwardSegs = [];
			for (k=i+1; k<levels.length; k++) {
				computeSlotSegCollisions(seg, levels[k], seg.forwardSegs);
			}
		}
	}
}


// Figure out which path forward (via seg.forwardSegs) results in the longest path until
// the furthest edge is reached. The number of segments in this path will be seg.forwardPressure
function computeSlotSegPressures(seg) {
	var forwardSegs = seg.forwardSegs;
	var forwardPressure = 0;
	var i, forwardSeg;

	if (seg.forwardPressure === undefined) { // not already computed

		for (i=0; i<forwardSegs.length; i++) {
			forwardSeg = forwardSegs[i];

			// figure out the child's maximum forward path
			computeSlotSegPressures(forwardSeg);

			// either use the existing maximum, or use the child's forward pressure
			// plus one (for the forwardSeg itself)
			forwardPressure = Math.max(
				forwardPressure,
				1 + forwardSeg.forwardPressure
			);
		}

		seg.forwardPressure = forwardPressure;
	}
}


// Calculate seg.forwardCoord and seg.backwardCoord for the segment, where both values range
// from 0 to 1. If the calendar is left-to-right, the seg.backwardCoord maps to "left" and
// seg.forwardCoord maps to "right" (via percentage). Vice-versa if the calendar is right-to-left.
//
// The segment might be part of a "series", which means consecutive segments with the same pressure
// who's width is unknown until an edge has been hit. `seriesBackwardPressure` is the number of
// segments behind this one in the current series, and `seriesBackwardCoord` is the starting
// coordinate of the first segment in the series.
function computeSlotSegCoords(seg, seriesBackwardPressure, seriesBackwardCoord) {
	var forwardSegs = seg.forwardSegs;
	var i;

	if (seg.forwardCoord === undefined) { // not already computed

		if (!forwardSegs.length) {

			// if there are no forward segments, this segment should butt up against the edge
			seg.forwardCoord = 1;
		}
		else {

			// sort highest pressure first
			forwardSegs.sort(compareForwardSlotSegs);

			// this segment's forwardCoord will be calculated from the backwardCoord of the
			// highest-pressure forward segment.
			computeSlotSegCoords(forwardSegs[0], seriesBackwardPressure + 1, seriesBackwardCoord);
			seg.forwardCoord = forwardSegs[0].backwardCoord;
		}

		// calculate the backwardCoord from the forwardCoord. consider the series
		seg.backwardCoord = seg.forwardCoord -
			(seg.forwardCoord - seriesBackwardCoord) / // available width for series
			(seriesBackwardPressure + 1); // # of segments in the series

		// use this segment's coordinates to computed the coordinates of the less-pressurized
		// forward segments
		for (i=0; i<forwardSegs.length; i++) {
			computeSlotSegCoords(forwardSegs[i], 0, seg.forwardCoord);
		}
	}
}


// Find all the segments in `otherSegs` that vertically collide with `seg`.
// Append into an optionally-supplied `results` array and return.
function computeSlotSegCollisions(seg, otherSegs, results) {
	results = results || [];

	for (var i=0; i<otherSegs.length; i++) {
		if (isSlotSegCollision(seg, otherSegs[i])) {
			results.push(otherSegs[i]);
		}
	}

	return results;
}


// Do these segments occupy the same vertical space?
function isSlotSegCollision(seg1, seg2) {
	return seg1.bottom > seg2.top && seg1.top < seg2.bottom;
}


// A cmp function for determining which forward segment to rely on more when computing coordinates.
function compareForwardSlotSegs(seg1, seg2) {
	// put higher-pressure first
	return seg2.forwardPressure - seg1.forwardPressure ||
		// put segments that are closer to initial edge first (and favor ones with no coords yet)
		(seg1.backwardCoord || 0) - (seg2.backwardCoord || 0) ||
		// do normal sorting...
		compareSegs(seg1, seg2);
}

;;

/* An abstract class from which other views inherit from
----------------------------------------------------------------------------------------------------------------------*/
// Newer methods should be written as prototype methods, not in the monster `View` function at the bottom.

View.prototype = {

	calendar: null, // owner Calendar object
	coordMap: null, // a CoordMap object for converting pixel regions to dates
	el: null, // the view's containing element. set by Calendar

	// important Moments
	start: null, // the date of the very first cell
	end: null, // the date after the very last cell
	intervalStart: null, // the start of the interval of time the view represents (1st of month for month view)
	intervalEnd: null, // the exclusive end of the interval of time the view represents

	// used for cell-to-date and date-to-cell calculations
	rowCnt: null, // # of weeks
	colCnt: null, // # of days displayed in a week

	isSelected: false, // boolean whether cells are user-selected or not

	// subclasses can optionally use a scroll container
	scrollerEl: null, // the element that will most likely scroll when content is too tall
	scrollTop: null, // cached vertical scroll value

	// classNames styled by jqui themes
	widgetHeaderClass: null,
	widgetContentClass: null,
	highlightStateClass: null,

	// document handlers, bound to `this` object
	documentMousedownProxy: null,
	documentDragStartProxy: null,


	// Serves as a "constructor" to suppliment the monster `View` constructor below
	init: function() {
		var tm = this.opt('theme') ? 'ui' : 'fc';

		this.widgetHeaderClass = tm + '-widget-header';
		this.widgetContentClass = tm + '-widget-content';
		this.highlightStateClass = tm + '-state-highlight';

		// save references to `this`-bound handlers
		this.documentMousedownProxy = $.proxy(this, 'documentMousedown');
		this.documentDragStartProxy = $.proxy(this, 'documentDragStart');
	},


	// Renders the view inside an already-defined `this.el`.
	// Subclasses should override this and then call the super method afterwards.
	render: function() {
		this.updateSize();
		this.trigger('viewRender', this, this, this.el);

		// attach handlers to document. do it here to allow for destroy/rerender
		$(document)
			.on('mousedown', this.documentMousedownProxy)
			.on('dragstart', this.documentDragStartProxy); // jqui drag
	},


	// Clears all view rendering, event elements, and unregisters handlers
	destroy: function() {
		this.unselect();
		this.trigger('viewDestroy', this, this, this.el);
		this.destroyEvents();
		this.el.empty(); // removes inner contents but leaves the element intact

		$(document)
			.off('mousedown', this.documentMousedownProxy)
			.off('dragstart', this.documentDragStartProxy);
	},


	// Used to determine what happens when the users clicks next/prev. Given -1 for prev, 1 for next.
	// Should apply the delta to `date` (a Moment) and return it.
	incrementDate: function(date, delta) {
		// subclasses should implement
	},


	/* Dimensions
	------------------------------------------------------------------------------------------------------------------*/


	// Refreshes anything dependant upon sizing of the container element of the grid
	updateSize: function(isResize) {
		if (isResize) {
			this.recordScroll();
		}
		this.updateHeight();
		this.updateWidth();
	},


	// Refreshes the horizontal dimensions of the calendar
	updateWidth: function() {
		// subclasses should implement
	},


	// Refreshes the vertical dimensions of the calendar
	updateHeight: function() {
		var calendar = this.calendar; // we poll the calendar for height information

		this.setHeight(
			calendar.getSuggestedViewHeight(),
			calendar.isHeightAuto()
		);
	},


	// Updates the vertical dimensions of the calendar to the specified height.
	// if `isAuto` is set to true, height becomes merely a suggestion and the view should use its "natural" height.
	setHeight: function(height, isAuto) {
		// subclasses should implement
	},


	// Given the total height of the view, return the number of pixels that should be used for the scroller.
	// Utility for subclasses.
	computeScrollerHeight: function(totalHeight) {
		var both = this.el.add(this.scrollerEl);
		var otherHeight; // cumulative height of everything that is not the scrollerEl in the view (header+borders)

		// fuckin IE8/9/10/11 sometimes returns 0 for dimensions. this weird hack was the only thing that worked
		both.css({
			position: 'relative', // cause a reflow, which will force fresh dimension recalculation
			left: -1 // ensure reflow in case the el was already relative. negative is less likely to cause new scroll
		});
		otherHeight = this.el.outerHeight() - this.scrollerEl.height(); // grab the dimensions
		both.css({ position: '', left: '' }); // undo hack

		return totalHeight - otherHeight;
	},


	// Called for remembering the current scroll value of the scroller.
	// Should be called before there is a destructive operation (like removing DOM elements) that might inadvertently
	// change the scroll of the container.
	recordScroll: function() {
		if (this.scrollerEl) {
			this.scrollTop = this.scrollerEl.scrollTop();
		}
	},


	// Set the scroll value of the scroller to the previously recorded value.
	// Should be called after we know the view's dimensions have been restored following some type of destructive
	// operation (like temporarily removing DOM elements).
	restoreScroll: function() {
		if (this.scrollTop !== null) {
			this.scrollerEl.scrollTop(this.scrollTop);
		}
	},


	/* Events
	------------------------------------------------------------------------------------------------------------------*/


	// Renders the events onto the view.
	// Should be overriden by subclasses. Subclasses should call the super-method afterwards.
	renderEvents: function(events) {
		this.segEach(function(seg) {
			this.trigger('eventAfterRender', seg.event, seg.event, seg.el);
		});
		this.trigger('eventAfterAllRender');
	},


	// Removes event elements from the view.
	// Should be overridden by subclasses. Should call this super-method FIRST, then subclass DOM destruction.
	destroyEvents: function() {
		this.segEach(function(seg) {
			this.trigger('eventDestroy', seg.event, seg.event, seg.el);
		});
	},


	// Given an event and the default element used for rendering, returns the element that should actually be used.
	// Basically runs events and elements through the eventRender hook.
	resolveEventEl: function(event, el) {
		var custom = this.trigger('eventRender', event, event, el);

		if (custom === false) { // means don't render at all
			el = null;
		}
		else if (custom && custom !== true) {
			el = $(custom);
		}

		return el;
	},


	// Hides all rendered event segments linked to the given event
	showEvent: function(event) {
		this.segEach(function(seg) {
			seg.el.css('visibility', '');
		}, event);
	},


	// Shows all rendered event segments linked to the given event
	hideEvent: function(event) {
		this.segEach(function(seg) {
			seg.el.css('visibility', 'hidden');
		}, event);
	},


	// Iterates through event segments. Goes through all by default.
	// If the optional `event` argument is specified, only iterates through segments linked to that event.
	// The `this` value of the callback function will be the view.
	segEach: function(func, event) {
		var segs = this.getSegs();
		var i;

		for (i = 0; i < segs.length; i++) {
			if (!event || segs[i].event._id === event._id) {
				func.call(this, segs[i]);
			}
		}
	},


	// Retrieves all the rendered segment objects for the view
	getSegs: function() {
		// subclasses must implement
	},


	/* Event Drag Visualization
	------------------------------------------------------------------------------------------------------------------*/


	// Renders a visual indication of an event hovering over the specified date.
	// `end` is a Moment and might be null.
	// `seg` might be null. if specified, it is the segment object of the event being dragged.
	//       otherwise, an external event from outside the calendar is being dragged.
	renderDrag: function(start, end, seg) {
		// subclasses should implement
	},


	// Unrenders a visual indication of event hovering
	destroyDrag: function() {
		// subclasses should implement
	},


	// Handler for accepting externally dragged events being dropped in the view.
	// Gets called when jqui's 'dragstart' is fired.
	documentDragStart: function(ev, ui) {
		var _this = this;
		var calendar = this.calendar;
		var eventStart = null; // a null value signals an unsuccessful drag
		var eventEnd = null;
		var visibleEnd = null; // will be calculated event when no eventEnd
		var el;
		var accept;
		var meta;
		var eventProps; // if an object, signals an event should be created upon drop
		var dragListener;

		if (this.opt('droppable')) { // only listen if this setting is on
			el = $(ev.target);

			// Test that the dragged element passes the dropAccept selector or filter function.
			// FYI, the default is "*" (matches all)
			accept = this.opt('dropAccept');
			if ($.isFunction(accept) ? accept.call(el[0], el) : el.is(accept)) {

				meta = getDraggedElMeta(el); // data for possibly creating an event
				eventProps = meta.eventProps;

				// listener that tracks mouse movement over date-associated pixel regions
				dragListener = new DragListener(this.coordMap, {
					cellOver: function(cell, cellDate) {
						eventStart = cellDate;
						eventEnd = meta.duration ? eventStart.clone().add(meta.duration) : null;
						visibleEnd = eventEnd || calendar.getDefaultEventEnd(!eventStart.hasTime(), eventStart);

						// keep the start/end up to date when dragging
						if (eventProps) {
							$.extend(eventProps, { start: eventStart, end: eventEnd });
						}

						if (calendar.isExternalDragAllowedInRange(eventStart, visibleEnd, eventProps)) {
							_this.renderDrag(eventStart, visibleEnd);
						}
						else {
							eventStart = null; // signal unsuccessful
							disableCursor();
						}
					},
					cellOut: function() {
						eventStart = null;
						_this.destroyDrag();
						enableCursor();
					}
				});

				// gets called, only once, when jqui drag is finished
				$(document).one('dragstop', function(ev, ui) {
					var renderedEvents;

					_this.destroyDrag();
					enableCursor();

					if (eventStart) { // element was dropped on a valid date/time cell

						// if dropped on an all-day cell, and element's metadata specified a time, set it
						if (meta.startTime && !eventStart.hasTime()) {
							eventStart.time(meta.startTime);
						}

						// trigger 'drop' regardless of whether element represents an event
						_this.trigger('drop', el[0], eventStart, ev, ui);

						// create an event from the given properties and the latest dates
						if (eventProps) {
							renderedEvents = calendar.renderEvent(eventProps, meta.stick);
							_this.trigger('eventReceive', null, renderedEvents[0]); // signal an external event landed
						}
					}
				});

				dragListener.startDrag(ev); // start listening immediately
			}
		}
	},


	/* Selection
	------------------------------------------------------------------------------------------------------------------*/


	// Selects a date range on the view. `start` and `end` are both Moments.
	// `ev` is the native mouse event that begin the interaction.
	select: function(start, end, ev) {
		this.unselect(ev);
		this.renderSelection(start, end);
		this.reportSelection(start, end, ev);
	},


	// Renders a visual indication of the selection
	renderSelection: function(start, end) {
		// subclasses should implement
	},


	// Called when a new selection is made. Updates internal state and triggers handlers.
	reportSelection: function(start, end, ev) {
		this.isSelected = true;
		this.trigger('select', null, start, end, ev);
	},


	// Undoes a selection. updates in the internal state and triggers handlers.
	// `ev` is the native mouse event that began the interaction.
	unselect: function(ev) {
		if (this.isSelected) {
			this.isSelected = false;
			this.destroySelection();
			this.trigger('unselect', null, ev);
		}
	},


	// Unrenders a visual indication of selection
	destroySelection: function() {
		// subclasses should implement
	},


	// Handler for unselecting when the user clicks something and the 'unselectAuto' setting is on
	documentMousedown: function(ev) {
		var ignore;

		// is there a selection, and has the user made a proper left click?
		if (this.isSelected && this.opt('unselectAuto') && isPrimaryMouseButton(ev)) {

			// only unselect if the clicked element is not identical to or inside of an 'unselectCancel' element
			ignore = this.opt('unselectCancel');
			if (!ignore || !$(ev.target).closest(ignore).length) {
				this.unselect(ev);
			}
		}
	}

};


// We are mixing JavaScript OOP design patterns here by putting methods and member variables in the closed scope of the
// constructor. Going forward, methods should be part of the prototype.
function View(calendar) {
	var t = this;
	
	// exports
	t.calendar = calendar;
	t.opt = opt;
	t.trigger = trigger;
	t.isEventDraggable = isEventDraggable;
	t.isEventResizable = isEventResizable;
	t.eventDrop = eventDrop;
	t.eventResize = eventResize;
	
	// imports
	var reportEventChange = calendar.reportEventChange;
	
	// locals
	var options = calendar.options;
	var nextDayThreshold = moment.duration(options.nextDayThreshold);


	t.init(); // the "constructor" that concerns the prototype methods
	
	
	function opt(name) {
		var v = options[name];
		if ($.isPlainObject(v) && !isForcedAtomicOption(name)) {
			return smartProperty(v, t.name);
		}
		return v;
	}

	
	function trigger(name, thisObj) {
		return calendar.trigger.apply(
			calendar,
			[name, thisObj || t].concat(Array.prototype.slice.call(arguments, 2), [t])
		);
	}
	


	/* Event Editable Boolean Calculations
	------------------------------------------------------------------------------*/

	
	function isEventDraggable(event) {
		var source = event.source || {};

		return firstDefined(
			event.startEditable,
			source.startEditable,
			opt('eventStartEditable'),
			event.editable,
			source.editable,
			opt('editable')
		);
	}
	
	
	function isEventResizable(event) {
		var source = event.source || {};

		return firstDefined(
			event.durationEditable,
			source.durationEditable,
			opt('eventDurationEditable'),
			event.editable,
			source.editable,
			opt('editable')
		);
	}
	
	
	
	/* Event Elements
	------------------------------------------------------------------------------*/


	// Compute the text that should be displayed on an event's element.
	// Based off the settings of the view. Possible signatures:
	//   .getEventTimeText(event, formatStr)
	//   .getEventTimeText(startMoment, endMoment, formatStr)
	//   .getEventTimeText(startMoment, null, formatStr)
	// `timeFormat` is used but the `formatStr` argument can be used to override.
	t.getEventTimeText = function(event, formatStr) {
		var start;
		var end;

		if (typeof event === 'object' && typeof formatStr === 'object') {
			// first two arguments are actually moments (or null). shift arguments.
			start = event;
			end = formatStr;
			formatStr = arguments[2];
		}
		else {
			// otherwise, an event object was the first argument
			start = event.start;
			end = event.end;
		}

		formatStr = formatStr || opt('timeFormat');

		if (end && opt('displayEventEnd')) {
			return calendar.formatRange(start, end, formatStr);
		}
		else {
			return calendar.formatDate(start, formatStr);
		}
	};

	
	
	/* Event Modification Reporting
	---------------------------------------------------------------------------------*/

	
	function eventDrop(el, event, newStart, ev) {
		var mutateResult = calendar.mutateEvent(event, newStart, null);

		trigger(
			'eventDrop',
			el,
			event,
			mutateResult.dateDelta,
			function() {
				mutateResult.undo();
				reportEventChange();
			},
			ev,
			{} // jqui dummy
		);

		reportEventChange();
	}


	function eventResize(el, event, newEnd, ev) {
		var mutateResult = calendar.mutateEvent(event, null, newEnd);

		trigger(
			'eventResize',
			el,
			event,
			mutateResult.durationDelta,
			function() {
				mutateResult.undo();
				reportEventChange();
			},
			ev,
			{} // jqui dummy
		);

		reportEventChange();
	}


	// ====================================================================================================
	// Utilities for day "cells"
	// ====================================================================================================
	// The "basic" views are completely made up of day cells.
	// The "agenda" views have day cells at the top "all day" slot.
	// This was the obvious common place to put these utilities, but they should be abstracted out into
	// a more meaningful class (like DayEventRenderer).
	// ====================================================================================================


	// For determining how a given "cell" translates into a "date":
	//
	// 1. Convert the "cell" (row and column) into a "cell offset" (the # of the cell, cronologically from the first).
	//    Keep in mind that column indices are inverted with isRTL. This is taken into account.
	//
	// 2. Convert the "cell offset" to a "day offset" (the # of days since the first visible day in the view).
	//
	// 3. Convert the "day offset" into a "date" (a Moment).
	//
	// The reverse transformation happens when transforming a date into a cell.


	// exports
	t.isHiddenDay = isHiddenDay;
	t.skipHiddenDays = skipHiddenDays;
	t.getCellsPerWeek = getCellsPerWeek;
	t.dateToCell = dateToCell;
	t.dateToDayOffset = dateToDayOffset;
	t.dayOffsetToCellOffset = dayOffsetToCellOffset;
	t.cellOffsetToCell = cellOffsetToCell;
	t.cellToDate = cellToDate;
	t.cellToCellOffset = cellToCellOffset;
	t.cellOffsetToDayOffset = cellOffsetToDayOffset;
	t.dayOffsetToDate = dayOffsetToDate;
	t.rangeToSegments = rangeToSegments;
	t.isMultiDayEvent = isMultiDayEvent;


	// internals
	var hiddenDays = opt('hiddenDays') || []; // array of day-of-week indices that are hidden
	var isHiddenDayHash = []; // is the day-of-week hidden? (hash with day-of-week-index -> bool)
	var cellsPerWeek;
	var dayToCellMap = []; // hash from dayIndex -> cellIndex, for one week
	var cellToDayMap = []; // hash from cellIndex -> dayIndex, for one week
	var isRTL = opt('isRTL');


	// initialize important internal variables
	(function() {

		if (opt('weekends') === false) {
			hiddenDays.push(0, 6); // 0=sunday, 6=saturday
		}

		// Loop through a hypothetical week and determine which
		// days-of-week are hidden. Record in both hashes (one is the reverse of the other).
		for (var dayIndex=0, cellIndex=0; dayIndex<7; dayIndex++) {
			dayToCellMap[dayIndex] = cellIndex;
			isHiddenDayHash[dayIndex] = $.inArray(dayIndex, hiddenDays) != -1;
			if (!isHiddenDayHash[dayIndex]) {
				cellToDayMap[cellIndex] = dayIndex;
				cellIndex++;
			}
		}

		cellsPerWeek = cellIndex;
		if (!cellsPerWeek) {
			throw 'invalid hiddenDays'; // all days were hidden? bad.
		}

	})();


	// Is the current day hidden?
	// `day` is a day-of-week index (0-6), or a Moment
	function isHiddenDay(day) {
		if (moment.isMoment(day)) {
			day = day.day();
		}
		return isHiddenDayHash[day];
	}


	function getCellsPerWeek() {
		return cellsPerWeek;
	}


	// Incrementing the current day until it is no longer a hidden day, returning a copy.
	// If the initial value of `date` is not a hidden day, don't do anything.
	// Pass `isExclusive` as `true` if you are dealing with an end date.
	// `inc` defaults to `1` (increment one day forward each time)
	function skipHiddenDays(date, inc, isExclusive) {
		var out = date.clone();
		inc = inc || 1;
		while (
			isHiddenDayHash[(out.day() + (isExclusive ? inc : 0) + 7) % 7]
		) {
			out.add(inc, 'days');
		}
		return out;
	}


	//
	// TRANSFORMATIONS: cell -> cell offset -> day offset -> date
	//

	// cell -> date (combines all transformations)
	// Possible arguments:
	// - row, col
	// - { row:#, col: # }
	function cellToDate() {
		var cellOffset = cellToCellOffset.apply(null, arguments);
		var dayOffset = cellOffsetToDayOffset(cellOffset);
		var date = dayOffsetToDate(dayOffset);
		return date;
	}

	// cell -> cell offset
	// Possible arguments:
	// - row, col
	// - { row:#, col:# }
	function cellToCellOffset(row, col) {
		var colCnt = t.colCnt;

		// rtl variables. wish we could pre-populate these. but where?
		var dis = isRTL ? -1 : 1;
		var dit = isRTL ? colCnt - 1 : 0;

		if (typeof row == 'object') {
			col = row.col;
			row = row.row;
		}
		var cellOffset = row * colCnt + (col * dis + dit); // column, adjusted for RTL (dis & dit)

		return cellOffset;
	}

	// cell offset -> day offset
	function cellOffsetToDayOffset(cellOffset) {
		var day0 = t.start.day(); // first date's day of week
		cellOffset += dayToCellMap[day0]; // normlize cellOffset to beginning-of-week
		return Math.floor(cellOffset / cellsPerWeek) * 7 + // # of days from full weeks
			cellToDayMap[ // # of days from partial last week
				(cellOffset % cellsPerWeek + cellsPerWeek) % cellsPerWeek // crazy math to handle negative cellOffsets
			] -
			day0; // adjustment for beginning-of-week normalization
	}

	// day offset -> date
	function dayOffsetToDate(dayOffset) {
		return t.start.clone().add(dayOffset, 'days');
	}


	//
	// TRANSFORMATIONS: date -> day offset -> cell offset -> cell
	//

	// date -> cell (combines all transformations)
	function dateToCell(date) {
		var dayOffset = dateToDayOffset(date);
		var cellOffset = dayOffsetToCellOffset(dayOffset);
		var cell = cellOffsetToCell(cellOffset);
		return cell;
	}

	// date -> day offset
	function dateToDayOffset(date) {
		return date.clone().stripTime().diff(t.start, 'days');
	}

	// day offset -> cell offset
	function dayOffsetToCellOffset(dayOffset) {
		var day0 = t.start.day(); // first date's day of week
		dayOffset += day0; // normalize dayOffset to beginning-of-week
		return Math.floor(dayOffset / 7) * cellsPerWeek + // # of cells from full weeks
			dayToCellMap[ // # of cells from partial last week
				(dayOffset % 7 + 7) % 7 // crazy math to handle negative dayOffsets
			] -
			dayToCellMap[day0]; // adjustment for beginning-of-week normalization
	}

	// cell offset -> cell (object with row & col keys)
	function cellOffsetToCell(cellOffset) {
		var colCnt = t.colCnt;

		// rtl variables. wish we could pre-populate these. but where?
		var dis = isRTL ? -1 : 1;
		var dit = isRTL ? colCnt - 1 : 0;

		var row = Math.floor(cellOffset / colCnt);
		var col = ((cellOffset % colCnt + colCnt) % colCnt) * dis + dit; // column, adjusted for RTL (dis & dit)
		return {
			row: row,
			col: col
		};
	}


	//
	// Converts a date range into an array of segment objects.
	// "Segments" are horizontal stretches of time, sliced up by row.
	// A segment object has the following properties:
	// - row
	// - cols
	// - isStart
	// - isEnd
	//
	function rangeToSegments(start, end) {

		var rowCnt = t.rowCnt;
		var colCnt = t.colCnt;
		var segments = []; // array of segments to return

		// day offset for given date range
		var dayRange = computeDayRange(start, end); // convert to a whole-day range
		var rangeDayOffsetStart = dateToDayOffset(dayRange.start);
		var rangeDayOffsetEnd = dateToDayOffset(dayRange.end); // an exclusive value

		// first and last cell offset for the given date range
		// "last" implies inclusivity
		var rangeCellOffsetFirst = dayOffsetToCellOffset(rangeDayOffsetStart);
		var rangeCellOffsetLast = dayOffsetToCellOffset(rangeDayOffsetEnd) - 1;

		// loop through all the rows in the view
		for (var row=0; row<rowCnt; row++) {

			// first and last cell offset for the row
			var rowCellOffsetFirst = row * colCnt;
			var rowCellOffsetLast = rowCellOffsetFirst + colCnt - 1;

			// get the segment's cell offsets by constraining the range's cell offsets to the bounds of the row
			var segmentCellOffsetFirst = Math.max(rangeCellOffsetFirst, rowCellOffsetFirst);
			var segmentCellOffsetLast = Math.min(rangeCellOffsetLast, rowCellOffsetLast);

			// make sure segment's offsets are valid and in view
			if (segmentCellOffsetFirst <= segmentCellOffsetLast) {

				// translate to cells
				var segmentCellFirst = cellOffsetToCell(segmentCellOffsetFirst);
				var segmentCellLast = cellOffsetToCell(segmentCellOffsetLast);

				// view might be RTL, so order by leftmost column
				var cols = [ segmentCellFirst.col, segmentCellLast.col ].sort(compareNumbers);

				// Determine if segment's first/last cell is the beginning/end of the date range.
				// We need to compare "day offset" because "cell offsets" are often ambiguous and
				// can translate to multiple days, and an edge case reveals itself when we the
				// range's first cell is hidden (we don't want isStart to be true).
				var isStart = cellOffsetToDayOffset(segmentCellOffsetFirst) == rangeDayOffsetStart;
				var isEnd = cellOffsetToDayOffset(segmentCellOffsetLast) + 1 == rangeDayOffsetEnd;
				                                                   // +1 for comparing exclusively

				segments.push({
					row: row,
					leftCol: cols[0],
					rightCol: cols[1],
					isStart: isStart,
					isEnd: isEnd
				});
			}
		}

		return segments;
	}


	// Returns the date range of the full days the given range visually appears to occupy.
	// Returns object with properties `start` (moment) and `end` (moment, exclusive end).
	function computeDayRange(start, end) {
		var startDay = start.clone().stripTime(); // the beginning of the day the range starts
		var endDay;
		var endTimeMS;

		if (end) {
			endDay = end.clone().stripTime(); // the beginning of the day the range exclusively ends
			endTimeMS = +end.time(); // # of milliseconds into `endDay`

			// If the end time is actually inclusively part of the next day and is equal to or
			// beyond the next day threshold, adjust the end to be the exclusive end of `endDay`.
			// Otherwise, leaving it as inclusive will cause it to exclude `endDay`.
			if (endTimeMS && endTimeMS >= nextDayThreshold) {
				endDay.add(1, 'days');
			}
		}

		// If no end was specified, or if it is within `startDay` but not past nextDayThreshold,
		// assign the default duration of one day.
		if (!end || endDay <= startDay) {
			endDay = startDay.clone().add(1, 'days');
		}

		return { start: startDay, end: endDay };
	}


	// Does the given event visually appear to occupy more than one day?
	function isMultiDayEvent(event) {
		var range = computeDayRange(event.start, event.end);

		return range.end.diff(range.start, 'days') > 1;
	}

}


/* Utils
----------------------------------------------------------------------------------------------------------------------*/

// Require all HTML5 data-* attributes used by FullCalendar to have this prefix.
// A value of '' will query attributes like data-event. A value of 'fc' will query attributes like data-fc-event.
fc.dataAttrPrefix = '';

// Given a jQuery element that might represent a dragged FullCalendar event, returns an intermediate data structure
// to be used for Event Object creation.
// A defined `.eventProps`, even when empty, indicates that an event should be created.
function getDraggedElMeta(el) {
	var prefix = fc.dataAttrPrefix;
	var eventProps; // properties for creating the event, not related to date/time
	var startTime; // a Duration
	var duration;
	var stick;

	if (prefix) { prefix += '-'; }
	eventProps = el.data(prefix + 'event') || null;

	if (eventProps) {
		if (typeof eventProps === 'object') {
			eventProps = $.extend({}, eventProps); // make a copy
		}
		else { // something like 1 or true. still signal event creation
			eventProps = {};
		}

		// pluck special-cased date/time properties
		startTime = eventProps.start;
		if (startTime == null) { startTime = eventProps.time; } // accept 'time' as well
		duration = eventProps.duration;
		stick = eventProps.stick;
		delete eventProps.start;
		delete eventProps.time;
		delete eventProps.duration;
		delete eventProps.stick;
	}

	// fallback to standalone attribute values for each of the date/time properties
	if (startTime == null) { startTime = el.data(prefix + 'start'); }
	if (startTime == null) { startTime = el.data(prefix + 'time'); } // accept 'time' as well
	if (duration == null) { duration = el.data(prefix + 'duration'); }
	if (stick == null) { stick = el.data(prefix + 'stick'); }

	// massage into correct data types
	startTime = startTime != null ? moment.duration(startTime) : null;
	duration = duration != null ? moment.duration(duration) : null;
	stick = Boolean(stick);

	return { eventProps: eventProps, startTime: startTime, duration: duration, stick: stick };
}

;;

/* An abstract class for the "basic" views, as well as month view. Renders one or more rows of day cells.
----------------------------------------------------------------------------------------------------------------------*/
// It is a manager for a DayGrid subcomponent, which does most of the heavy lifting.
// It is responsible for managing width/height.

function BasicView(calendar) {
	View.call(this, calendar); // call the super-constructor
	this.dayGrid = new DayGrid(this);
	this.coordMap = this.dayGrid.coordMap; // the view's date-to-cell mapping is identical to the subcomponent's
}


BasicView.prototype = createObject(View.prototype); // define the super-class
$.extend(BasicView.prototype, {

	dayGrid: null, // the main subcomponent that does most of the heavy lifting

	dayNumbersVisible: false, // display day numbers on each day cell?
	weekNumbersVisible: false, // display week numbers along the side?

	weekNumberWidth: null, // width of all the week-number cells running down the side

	headRowEl: null, // the fake row element of the day-of-week header


	// Renders the view into `this.el`, which should already be assigned.
	// rowCnt, colCnt, and dayNumbersVisible have been calculated by a subclass and passed here.
	render: function(rowCnt, colCnt, dayNumbersVisible) {

		// needed for cell-to-date and date-to-cell calculations in View
		this.rowCnt = rowCnt;
		this.colCnt = colCnt;

		this.dayNumbersVisible = dayNumbersVisible;
		this.weekNumbersVisible = this.opt('weekNumbers');
		this.dayGrid.numbersVisible = this.dayNumbersVisible || this.weekNumbersVisible;

		this.el.addClass('fc-basic-view').html(this.renderHtml());

		this.headRowEl = this.el.find('thead .fc-row');

		this.scrollerEl = this.el.find('.fc-day-grid-container');
		this.dayGrid.coordMap.containerEl = this.scrollerEl; // constrain clicks/etc to the dimensions of the scroller

		this.dayGrid.el = this.el.find('.fc-day-grid');
		this.dayGrid.render(this.hasRigidRows());

		View.prototype.render.call(this); // call the super-method
	},


	// Make subcomponents ready for cleanup
	destroy: function() {
		this.dayGrid.destroy();
		View.prototype.destroy.call(this); // call the super-method
	},


	// Builds the HTML skeleton for the view.
	// The day-grid component will render inside of a container defined by this HTML.
	renderHtml: function() {
		return '' +
			'<table>' +
				'<thead>' +
					'<tr>' +
						'<td class="' + this.widgetHeaderClass + '">' +
							this.dayGrid.headHtml() + // render the day-of-week headers
						'</td>' +
					'</tr>' +
				'</thead>' +
				'<tbody>' +
					'<tr>' +
						'<td class="' + this.widgetContentClass + '">' +
							'<div class="fc-day-grid-container">' +
								'<div class="fc-day-grid"/>' +
							'</div>' +
						'</td>' +
					'</tr>' +
				'</tbody>' +
			'</table>';
	},


	// Generates the HTML that will go before the day-of week header cells.
	// Queried by the DayGrid subcomponent when generating rows. Ordering depends on isRTL.
	headIntroHtml: function() {
		if (this.weekNumbersVisible) {
			return '' +
				'<th class="fc-week-number ' + this.widgetHeaderClass + '" ' + this.weekNumberStyleAttr() + '>' +
					'<span>' + // needed for matchCellWidths
						htmlEscape(this.opt('weekNumberTitle')) +
					'</span>' +
				'</th>';
		}
	},


	// Generates the HTML that will go before content-skeleton cells that display the day/week numbers.
	// Queried by the DayGrid subcomponent. Ordering depends on isRTL.
	numberIntroHtml: function(row) {
		if (this.weekNumbersVisible) {
			return '' +
				'<td class="fc-week-number" ' + this.weekNumberStyleAttr() + '>' +
					'<span>' + // needed for matchCellWidths
						this.calendar.calculateWeekNumber(this.cellToDate(row, 0)) +
					'</span>' +
				'</td>';
		}
	},


	// Generates the HTML that goes before the day bg cells for each day-row.
	// Queried by the DayGrid subcomponent. Ordering depends on isRTL.
	dayIntroHtml: function() {
		if (this.weekNumbersVisible) {
			return '<td class="fc-week-number ' + this.widgetContentClass + '" ' +
				this.weekNumberStyleAttr() + '></td>';
		}
	},


	// Generates the HTML that goes before every other type of row generated by DayGrid. Ordering depends on isRTL.
	// Affects helper-skeleton and highlight-skeleton rows.
	introHtml: function() {
		if (this.weekNumbersVisible) {
			return '<td class="fc-week-number" ' + this.weekNumberStyleAttr() + '></td>';
		}
	},


	// Generates the HTML for the <td>s of the "number" row in the DayGrid's content skeleton.
	// The number row will only exist if either day numbers or week numbers are turned on.
	numberCellHtml: function(row, col, date) {
		var classes;

		if (!this.dayNumbersVisible) { // if there are week numbers but not day numbers
			return '<td/>'; //  will create an empty space above events :(
		}

		classes = this.dayGrid.getDayClasses(date);
		classes.unshift('fc-day-number');

		return '' +
			'<td class="' + classes.join(' ') + '" data-date="' + date.format() + '">' +
				date.date() +
			'</td>';
	},


	// Generates an HTML attribute string for setting the width of the week number column, if it is known
	weekNumberStyleAttr: function() {
		if (this.weekNumberWidth !== null) {
			return 'style="width:' + this.weekNumberWidth + 'px"';
		}
		return '';
	},


	// Determines whether each row should have a constant height
	hasRigidRows: function() {
		var eventLimit = this.opt('eventLimit');
		return eventLimit && typeof eventLimit !== 'number';
	},


	/* Dimensions
	------------------------------------------------------------------------------------------------------------------*/


	// Refreshes the horizontal dimensions of the view
	updateWidth: function() {
		if (this.weekNumbersVisible) {
			// Make sure all week number cells running down the side have the same width.
			// Record the width for cells created later.
			this.weekNumberWidth = matchCellWidths(
				this.el.find('.fc-week-number')
			);
		}
	},


	// Adjusts the vertical dimensions of the view to the specified values
	setHeight: function(totalHeight, isAuto) {
		var eventLimit = this.opt('eventLimit');
		var scrollerHeight;

		// reset all heights to be natural
		unsetScroller(this.scrollerEl);
		uncompensateScroll(this.headRowEl);

		this.dayGrid.destroySegPopover(); // kill the "more" popover if displayed

		// is the event limit a constant level number?
		if (eventLimit && typeof eventLimit === 'number') {
			this.dayGrid.limitRows(eventLimit); // limit the levels first so the height can redistribute after
		}

		scrollerHeight = this.computeScrollerHeight(totalHeight);
		this.setGridHeight(scrollerHeight, isAuto);

		// is the event limit dynamically calculated?
		if (eventLimit && typeof eventLimit !== 'number') {
			this.dayGrid.limitRows(eventLimit); // limit the levels after the grid's row heights have been set
		}

		if (!isAuto && setPotentialScroller(this.scrollerEl, scrollerHeight)) { // using scrollbars?

			compensateScroll(this.headRowEl, getScrollbarWidths(this.scrollerEl));

			// doing the scrollbar compensation might have created text overflow which created more height. redo
			scrollerHeight = this.computeScrollerHeight(totalHeight);
			this.scrollerEl.height(scrollerHeight);

			this.restoreScroll();
		}
	},


	// Sets the height of just the DayGrid component in this view
	setGridHeight: function(height, isAuto) {
		if (isAuto) {
			undistributeHeight(this.dayGrid.rowEls); // let the rows be their natural height with no expanding
		}
		else {
			distributeHeight(this.dayGrid.rowEls, height, true); // true = compensate for height-hogging rows
		}
	},


	/* Events
	------------------------------------------------------------------------------------------------------------------*/


	// Renders the given events onto the view and populates the segments array
	renderEvents: function(events) {
		this.dayGrid.renderEvents(events);

		this.updateHeight(); // must compensate for events that overflow the row

		View.prototype.renderEvents.call(this, events); // call the super-method
	},


	// Retrieves all segment objects that are rendered in the view
	getSegs: function() {
		return this.dayGrid.getSegs();
	},


	// Unrenders all event elements and clears internal segment data
	destroyEvents: function() {
		View.prototype.destroyEvents.call(this); // do this before dayGrid's segs have been cleared

		this.recordScroll(); // removing events will reduce height and mess with the scroll, so record beforehand
		this.dayGrid.destroyEvents();

		// we DON'T need to call updateHeight() because:
		// A) a renderEvents() call always happens after this, which will eventually call updateHeight()
		// B) in IE8, this causes a flash whenever events are rerendered
	},


	/* Event Dragging
	------------------------------------------------------------------------------------------------------------------*/


	// Renders a visual indication of an event being dragged over the view.
	// A returned value of `true` signals that a mock "helper" event has been rendered.
	renderDrag: function(start, end, seg) {
		return this.dayGrid.renderDrag(start, end, seg);
	},


	// Unrenders the visual indication of an event being dragged over the view
	destroyDrag: function() {
		this.dayGrid.destroyDrag();
	},


	/* Selection
	------------------------------------------------------------------------------------------------------------------*/


	// Renders a visual indication of a selection
	renderSelection: function(start, end) {
		this.dayGrid.renderSelection(start, end);
	},


	// Unrenders a visual indications of a selection
	destroySelection: function() {
		this.dayGrid.destroySelection();
	}

});

;;

/* A month view with day cells running in rows (one-per-week) and columns
----------------------------------------------------------------------------------------------------------------------*/

setDefaults({
	fixedWeekCount: true
});

fcViews.month = MonthView; // register the view

function MonthView(calendar) {
	BasicView.call(this, calendar); // call the super-constructor
}


MonthView.prototype = createObject(BasicView.prototype); // define the super-class
$.extend(MonthView.prototype, {

	name: 'month',


	incrementDate: function(date, delta) {
		return date.clone().stripTime().add(delta, 'months').startOf('month');
	},


	render: function(date) {
		var rowCnt;

		this.intervalStart = date.clone().stripTime().startOf('month');
		this.intervalEnd = this.intervalStart.clone().add(1, 'months');

		this.start = this.intervalStart.clone();
		this.start = this.skipHiddenDays(this.start); // move past the first week if no visible days
		this.start.startOf('week');
		this.start = this.skipHiddenDays(this.start); // move past the first invisible days of the week

		this.end = this.intervalEnd.clone();
		this.end = this.skipHiddenDays(this.end, -1, true); // move in from the last week if no visible days
		this.end.add((7 - this.end.weekday()) % 7, 'days'); // move to end of week if not already
		this.end = this.skipHiddenDays(this.end, -1, true); // move in from the last invisible days of the week

		rowCnt = Math.ceil( // need to ceil in case there are hidden days
			this.end.diff(this.start, 'weeks', true) // returnfloat=true
		);
		if (this.isFixedWeeks()) {
			this.end.add(6 - rowCnt, 'weeks');
			rowCnt = 6;
		}

		this.title = this.calendar.formatDate(this.intervalStart, this.opt('titleFormat'));

		BasicView.prototype.render.call(this, rowCnt, this.getCellsPerWeek(), true); // call the super-method
	},


	// Overrides the default BasicView behavior to have special multi-week auto-height logic
	setGridHeight: function(height, isAuto) {

		isAuto = isAuto || this.opt('weekMode') === 'variable'; // LEGACY: weekMode is deprecated

		// if auto, make the height of each row the height that it would be if there were 6 weeks
		if (isAuto) {
			height *= this.rowCnt / 6;
		}

		distributeHeight(this.dayGrid.rowEls, height, !isAuto); // if auto, don't compensate for height-hogging rows
	},


	isFixedWeeks: function() {
		var weekMode = this.opt('weekMode'); // LEGACY: weekMode is deprecated
		if (weekMode) {
			return weekMode === 'fixed'; // if any other type of weekMode, assume NOT fixed
		}

		return this.opt('fixedWeekCount');
	}

});

;;

/* A week view with simple day cells running horizontally
----------------------------------------------------------------------------------------------------------------------*/
// TODO: a WeekView mixin for calculating dates and titles

fcViews.basicWeek = BasicWeekView; // register this view

function BasicWeekView(calendar) {
	BasicView.call(this, calendar); // call the super-constructor
}


BasicWeekView.prototype = createObject(BasicView.prototype); // define the super-class
$.extend(BasicWeekView.prototype, {

	name: 'basicWeek',


	incrementDate: function(date, delta) {
		return date.clone().stripTime().add(delta, 'weeks').startOf('week');
	},


	render: function(date) {

		this.intervalStart = date.clone().stripTime().startOf('week');
		this.intervalEnd = this.intervalStart.clone().add(1, 'weeks');

		this.start = this.skipHiddenDays(this.intervalStart);
		this.end = this.skipHiddenDays(this.intervalEnd, -1, true);

		this.title = this.calendar.formatRange(
			this.start,
			this.end.clone().subtract(1), // make inclusive by subtracting 1 ms
			this.opt('titleFormat'),
			' \u2014 ' // emphasized dash
		);

		BasicView.prototype.render.call(this, 1, this.getCellsPerWeek(), false); // call the super-method
	}
	
});
;;

/* A view with a single simple day cell
----------------------------------------------------------------------------------------------------------------------*/

fcViews.basicDay = BasicDayView; // register this view

function BasicDayView(calendar) {
	BasicView.call(this, calendar); // call the super-constructor
}


BasicDayView.prototype = createObject(BasicView.prototype); // define the super-class
$.extend(BasicDayView.prototype, {

	name: 'basicDay',


	incrementDate: function(date, delta) {
		var out = date.clone().stripTime().add(delta, 'days');
		out = this.skipHiddenDays(out, delta < 0 ? -1 : 1);
		return out;
	},


	render: function(date) {

		this.start = this.intervalStart = date.clone().stripTime();
		this.end = this.intervalEnd = this.start.clone().add(1, 'days');

		this.title = this.calendar.formatDate(this.start, this.opt('titleFormat'));

		BasicView.prototype.render.call(this, 1, 1, false); // call the super-method
	}

});
;;

/* An abstract class for all agenda-related views. Displays one more columns with time slots running vertically.
----------------------------------------------------------------------------------------------------------------------*/
// Is a manager for the TimeGrid subcomponent and possibly the DayGrid subcomponent (if allDaySlot is on).
// Responsible for managing width/height.

setDefaults({
	allDaySlot: true,
	allDayText: 'all-day',

	scrollTime: '06:00:00',

	slotDuration: '00:30:00',

	axisFormat: generateAgendaAxisFormat,
	timeFormat: {
		agenda: generateAgendaTimeFormat
	},

	minTime: '00:00:00',
	maxTime: '24:00:00',
	slotEventOverlap: true
});

var AGENDA_ALL_DAY_EVENT_LIMIT = 5;


function generateAgendaAxisFormat(options, langData) {
	return langData.longDateFormat('LT')
		.replace(':mm', '(:mm)')
		.replace(/(\Wmm)$/, '($1)') // like above, but for foreign langs
		.replace(/\s*a$/i, 'a'); // convert AM/PM/am/pm to lowercase. remove any spaces beforehand
}


function generateAgendaTimeFormat(options, langData) {
	return langData.longDateFormat('LT')
		.replace(/\s*a$/i, ''); // remove trailing AM/PM
}


function AgendaView(calendar) {
	View.call(this, calendar); // call the super-constructor

	this.timeGrid = new TimeGrid(this);

	if (this.opt('allDaySlot')) { // should we display the "all-day" area?
		this.dayGrid = new DayGrid(this); // the all-day subcomponent of this view

		// the coordinate grid will be a combination of both subcomponents' grids
		this.coordMap = new ComboCoordMap([
			this.dayGrid.coordMap,
			this.timeGrid.coordMap
		]);
	}
	else {
		this.coordMap = this.timeGrid.coordMap;
	}
}


AgendaView.prototype = createObject(View.prototype); // define the super-class
$.extend(AgendaView.prototype, {

	timeGrid: null, // the main time-grid subcomponent of this view
	dayGrid: null, // the "all-day" subcomponent. if all-day is turned off, this will be null

	axisWidth: null, // the width of the time axis running down the side

	noScrollRowEls: null, // set of fake row elements that must compensate when scrollerEl has scrollbars

	// when the time-grid isn't tall enough to occupy the given height, we render an <hr> underneath
	bottomRuleEl: null,
	bottomRuleHeight: null,


	/* Rendering
	------------------------------------------------------------------------------------------------------------------*/


	// Renders the view into `this.el`, which has already been assigned.
	// `colCnt` has been calculated by a subclass and passed here.
	render: function(colCnt) {

		// needed for cell-to-date and date-to-cell calculations in View
		this.rowCnt = 1;
		this.colCnt = colCnt;

		this.el.addClass('fc-agenda-view').html(this.renderHtml());

		// the element that wraps the time-grid that will probably scroll
		this.scrollerEl = this.el.find('.fc-time-grid-container');
		this.timeGrid.coordMap.containerEl = this.scrollerEl; // don't accept clicks/etc outside of this

		this.timeGrid.el = this.el.find('.fc-time-grid');
		this.timeGrid.render();

		// the <hr> that sometimes displays under the time-grid
		this.bottomRuleEl = $('<hr class="' + this.widgetHeaderClass + '"/>')
			.appendTo(this.timeGrid.el); // inject it into the time-grid

		if (this.dayGrid) {
			this.dayGrid.el = this.el.find('.fc-day-grid');
			this.dayGrid.render();

			// have the day-grid extend it's coordinate area over the <hr> dividing the two grids
			this.dayGrid.bottomCoordPadding = this.dayGrid.el.next('hr').outerHeight();
		}

		this.noScrollRowEls = this.el.find('.fc-row:not(.fc-scroller *)'); // fake rows not within the scroller

		View.prototype.render.call(this); // call the super-method

		this.resetScroll(); // do this after sizes have been set
	},


	// Make subcomponents ready for cleanup
	destroy: function() {
		this.timeGrid.destroy();
		if (this.dayGrid) {
			this.dayGrid.destroy();
		}
		View.prototype.destroy.call(this); // call the super-method
	},


	// Builds the HTML skeleton for the view.
	// The day-grid and time-grid components will render inside containers defined by this HTML.
	renderHtml: function() {
		return '' +
			'<table>' +
				'<thead>' +
					'<tr>' +
						'<td class="' + this.widgetHeaderClass + '">' +
							this.timeGrid.headHtml() + // render the day-of-week headers
						'</td>' +
					'</tr>' +
				'</thead>' +
				'<tbody>' +
					'<tr>' +
						'<td class="' + this.widgetContentClass + '">' +
							(this.dayGrid ?
								'<div class="fc-day-grid"/>' +
								'<hr class="' + this.widgetHeaderClass + '"/>' :
								''
								) +
							'<div class="fc-time-grid-container">' +
								'<div class="fc-time-grid"/>' +
							'</div>' +
						'</td>' +
					'</tr>' +
				'</tbody>' +
			'</table>';
	},


	// Generates the HTML that will go before the day-of week header cells.
	// Queried by the TimeGrid subcomponent when generating rows. Ordering depends on isRTL.
	headIntroHtml: function() {
		var date;
		var weekNumber;
		var weekTitle;
		var weekText;

		if (this.opt('weekNumbers')) {
			date = this.cellToDate(0, 0);
			weekNumber = this.calendar.calculateWeekNumber(date);
			weekTitle = this.opt('weekNumberTitle');

			if (this.opt('isRTL')) {
				weekText = weekNumber + weekTitle;
			}
			else {
				weekText = weekTitle + weekNumber;
			}

			return '' +
				'<th class="fc-axis fc-week-number ' + this.widgetHeaderClass + '" ' + this.axisStyleAttr() + '>' +
					'<span>' + // needed for matchCellWidths
						htmlEscape(weekText) +
					'</span>' +
				'</th>';
		}
		else {
			return '<th class="fc-axis ' + this.widgetHeaderClass + '" ' + this.axisStyleAttr() + '></th>';
		}
	},


	// Generates the HTML that goes before the all-day cells.
	// Queried by the DayGrid subcomponent when generating rows. Ordering depends on isRTL.
	dayIntroHtml: function() {
		return '' +
			'<td class="fc-axis ' + this.widgetContentClass + '" ' + this.axisStyleAttr() + '>' +
				'<span>' + // needed for matchCellWidths
					(this.opt('allDayHtml') || htmlEscape(this.opt('allDayText'))) +
				'</span>' +
			'</td>';
	},


	// Generates the HTML that goes before the bg of the TimeGrid slot area. Long vertical column.
	slotBgIntroHtml: function() {
		return '<td class="fc-axis ' + this.widgetContentClass + '" ' + this.axisStyleAttr() + '></td>';
	},


	// Generates the HTML that goes before all other types of cells.
	// Affects content-skeleton, helper-skeleton, highlight-skeleton for both the time-grid and day-grid.
	// Queried by the TimeGrid and DayGrid subcomponents when generating rows. Ordering depends on isRTL.
	introHtml: function() {
		return '<td class="fc-axis" ' + this.axisStyleAttr() + '></td>';
	},


	// Generates an HTML attribute string for setting the width of the axis, if it is known
	axisStyleAttr: function() {
		if (this.axisWidth !== null) {
			 return 'style="width:' + this.axisWidth + 'px"';
		}
		return '';
	},


	/* Dimensions
	------------------------------------------------------------------------------------------------------------------*/

	updateSize: function(isResize) {
		if (isResize) {
			this.timeGrid.resize();
		}
		View.prototype.updateSize.call(this, isResize);
	},


	// Refreshes the horizontal dimensions of the view
	updateWidth: function() {
		// make all axis cells line up, and record the width so newly created axis cells will have it
		this.axisWidth = matchCellWidths(this.el.find('.fc-axis'));
	},


	// Adjusts the vertical dimensions of the view to the specified values
	setHeight: function(totalHeight, isAuto) {
		var eventLimit;
		var scrollerHeight;

		if (this.bottomRuleHeight === null) {
			// calculate the height of the rule the very first time
			this.bottomRuleHeight = this.bottomRuleEl.outerHeight();
		}
		this.bottomRuleEl.hide(); // .show() will be called later if this <hr> is necessary

		// reset all dimensions back to the original state
		this.scrollerEl.css('overflow', '');
		unsetScroller(this.scrollerEl);
		uncompensateScroll(this.noScrollRowEls);

		// limit number of events in the all-day area
		if (this.dayGrid) {
			this.dayGrid.destroySegPopover(); // kill the "more" popover if displayed

			eventLimit = this.opt('eventLimit');
			if (eventLimit && typeof eventLimit !== 'number') {
				eventLimit = AGENDA_ALL_DAY_EVENT_LIMIT; // make sure "auto" goes to a real number
			}
			if (eventLimit) {
				this.dayGrid.limitRows(eventLimit);
			}
		}

		if (!isAuto) { // should we force dimensions of the scroll container, or let the contents be natural height?

			scrollerHeight = this.computeScrollerHeight(totalHeight);
			if (setPotentialScroller(this.scrollerEl, scrollerHeight)) { // using scrollbars?

				// make the all-day and header rows lines up
				compensateScroll(this.noScrollRowEls, getScrollbarWidths(this.scrollerEl));

				// the scrollbar compensation might have changed text flow, which might affect height, so recalculate
				// and reapply the desired height to the scroller.
				scrollerHeight = this.computeScrollerHeight(totalHeight);
				this.scrollerEl.height(scrollerHeight);

				this.restoreScroll();
			}
			else { // no scrollbars
				// still, force a height and display the bottom rule (marks the end of day)
				this.scrollerEl.height(scrollerHeight).css('overflow', 'hidden'); // in case <hr> goes outside
				this.bottomRuleEl.show();
			}
		}
	},


	// Sets the scroll value of the scroller to the intial pre-configured state prior to allowing the user to change it.
	resetScroll: function() {
		var _this = this;
		var scrollTime = moment.duration(this.opt('scrollTime'));
		var top = this.timeGrid.computeTimeTop(scrollTime);

		// zoom can give weird floating-point values. rather scroll a little bit further
		top = Math.ceil(top);

		if (top) {
			top++; // to overcome top border that slots beyond the first have. looks better
		}

		function scroll() {
			_this.scrollerEl.scrollTop(top);
		}

		scroll();
		setTimeout(scroll, 0); // overrides any previous scroll state made by the browser
	},


	/* Events
	------------------------------------------------------------------------------------------------------------------*/


	// Renders events onto the view and populates the View's segment array
	renderEvents: function(events) {
		var dayEvents = [];
		var timedEvents = [];
		var daySegs = [];
		var timedSegs;
		var i;

		// separate the events into all-day and timed
		for (i = 0; i < events.length; i++) {
			if (events[i].allDay) {
				dayEvents.push(events[i]);
			}
			else {
				timedEvents.push(events[i]);
			}
		}

		// render the events in the subcomponents
		timedSegs = this.timeGrid.renderEvents(timedEvents);
		if (this.dayGrid) {
			daySegs = this.dayGrid.renderEvents(dayEvents);
		}

		// the all-day area is flexible and might have a lot of events, so shift the height
		this.updateHeight();

		View.prototype.renderEvents.call(this, events); // call the super-method
	},


	// Retrieves all segment objects that are rendered in the view
	getSegs: function() {
		return this.timeGrid.getSegs().concat(
			this.dayGrid ? this.dayGrid.getSegs() : []
		);
	},


	// Unrenders all event elements and clears internal segment data
	destroyEvents: function() {
		View.prototype.destroyEvents.call(this); // do this before the grids' segs have been cleared

		// if destroyEvents is being called as part of an event rerender, renderEvents will be called shortly
		// after, so remember what the scroll value was so we can restore it.
		this.recordScroll();

		// destroy the events in the subcomponents
		this.timeGrid.destroyEvents();
		if (this.dayGrid) {
			this.dayGrid.destroyEvents();
		}

		// we DON'T need to call updateHeight() because:
		// A) a renderEvents() call always happens after this, which will eventually call updateHeight()
		// B) in IE8, this causes a flash whenever events are rerendered
	},


	/* Event Dragging
	------------------------------------------------------------------------------------------------------------------*/


	// Renders a visual indication of an event being dragged over the view.
	// A returned value of `true` signals that a mock "helper" event has been rendered.
	renderDrag: function(start, end, seg) {
		if (start.hasTime()) {
			return this.timeGrid.renderDrag(start, end, seg);
		}
		else if (this.dayGrid) {
			return this.dayGrid.renderDrag(start, end, seg);
		}
	},


	// Unrenders a visual indications of an event being dragged over the view
	destroyDrag: function() {
		this.timeGrid.destroyDrag();
		if (this.dayGrid) {
			this.dayGrid.destroyDrag();
		}
	},


	/* Selection
	------------------------------------------------------------------------------------------------------------------*/


	// Renders a visual indication of a selection
	renderSelection: function(start, end) {
		if (start.hasTime() || end.hasTime()) {
			this.timeGrid.renderSelection(start, end);
		}
		else if (this.dayGrid) {
			this.dayGrid.renderSelection(start, end);
		}
	},


	// Unrenders a visual indications of a selection
	destroySelection: function() {
		this.timeGrid.destroySelection();
		if (this.dayGrid) {
			this.dayGrid.destroySelection();
		}
	}

});

;;

/* A week view with an all-day cell area at the top, and a time grid below
----------------------------------------------------------------------------------------------------------------------*/
// TODO: a WeekView mixin for calculating dates and titles

fcViews.agendaWeek = AgendaWeekView; // register the view

function AgendaWeekView(calendar) {
	AgendaView.call(this, calendar); // call the super-constructor
}


AgendaWeekView.prototype = createObject(AgendaView.prototype); // define the super-class
$.extend(AgendaWeekView.prototype, {

	name: 'agendaWeek',


	incrementDate: function(date, delta) {
		return date.clone().stripTime().add(delta, 'weeks').startOf('week');
	},


	render: function(date) {

		this.intervalStart = date.clone().stripTime().startOf('week');
		this.intervalEnd = this.intervalStart.clone().add(1, 'weeks');

		this.start = this.skipHiddenDays(this.intervalStart);
		this.end = this.skipHiddenDays(this.intervalEnd, -1, true);

		this.title = this.calendar.formatRange(
			this.start,
			this.end.clone().subtract(1), // make inclusive by subtracting 1 ms
			this.opt('titleFormat'),
			' \u2014 ' // emphasized dash
		);

		AgendaView.prototype.render.call(this, this.getCellsPerWeek()); // call the super-method
	}

});

;;

/* A day view with an all-day cell area at the top, and a time grid below
----------------------------------------------------------------------------------------------------------------------*/

fcViews.agendaDay = AgendaDayView; // register the view

function AgendaDayView(calendar) {
	AgendaView.call(this, calendar); // call the super-constructor
}


AgendaDayView.prototype = createObject(AgendaView.prototype); // define the super-class
$.extend(AgendaDayView.prototype, {

	name: 'agendaDay',


	incrementDate: function(date, delta) {
		var out = date.clone().stripTime().add(delta, 'days');
		out = this.skipHiddenDays(out, delta < 0 ? -1 : 1);
		return out;
	},


	render: function(date) {

		this.start = this.intervalStart = date.clone().stripTime();
		this.end = this.intervalEnd = this.start.clone().add(1, 'days');

		this.title = this.calendar.formatDate(this.start, this.opt('titleFormat'));

		AgendaView.prototype.render.call(this, 1); // call the super-method
	}

});

;;

});
/*!
 * FullCalendar v2.2.3 Google Calendar Plugin
 * Docs & License: http://arshaw.com/fullcalendar/
 * (c) 2013 Adam Shaw
 */

 
(function(factory) {
	if (typeof define === 'function' && define.amd) {
		define([ 'jquery' ], factory);
	}
	else {
		factory(jQuery);
	}
})(function($) {


var API_BASE = 'https://www.googleapis.com/calendar/v3/calendars';
var fc = $.fullCalendar;
var applyAll = fc.applyAll;


fc.sourceNormalizers.push(function(sourceOptions) {
	var googleCalendarId = sourceOptions.googleCalendarId;
	var url = sourceOptions.url;
	var match;

	// if the Google Calendar ID hasn't been explicitly defined
	if (!googleCalendarId && url) {

		// detect if the ID was specified as a single string.
		// will match calendars like "asdf1234@calendar.google.com" in addition to person email calendars.
		if ((match = /^[^\/]+@([^\/\.]+\.)*(google|googlemail|gmail)\.com$/.test(url))) {
			googleCalendarId = url;
		}
		// try to scrape it out of a V1 or V3 API feed URL
		else if (
			(match = /^https:\/\/www.googleapis.com\/calendar\/v3\/calendars\/([^\/]*)/.exec(url)) ||
			(match = /^https?:\/\/www.google.com\/calendar\/feeds\/([^\/]*)/.exec(url))
		) {
			googleCalendarId = decodeURIComponent(match[1]);
		}

		if (googleCalendarId) {
			sourceOptions.googleCalendarId = googleCalendarId;
		}
	}


	if (googleCalendarId) { // is this a Google Calendar?

		// make each Google Calendar source uneditable by default
		if (sourceOptions.editable == null) {
			sourceOptions.editable = false;
		}

		// We want removeEventSource to work, but it won't know about the googleCalendarId primitive.
		// Shoehorn it into the url, which will function as the unique primitive. Won't cause side effects.
		// This hack is obsolete since 2.2.3, but keep it so this plugin file is compatible with old versions.
		sourceOptions.url = googleCalendarId;
	}
});


fc.sourceFetchers.push(function(sourceOptions, start, end, timezone) {
	if (sourceOptions.googleCalendarId) {
		return transformOptions(sourceOptions, start, end, timezone, this); // `this` is the calendar
	}
});


function transformOptions(sourceOptions, start, end, timezone, calendar) {
	var url = API_BASE + '/' + encodeURIComponent(sourceOptions.googleCalendarId) + '/events?callback=?'; // jsonp
	var apiKey = sourceOptions.googleCalendarApiKey || calendar.options.googleCalendarApiKey;
	var success = sourceOptions.success;
	var data;
	var timezoneArg; // populated when a specific timezone. escaped to Google's liking

	function reportError(message, apiErrorObjs) {
		var errorObjs = apiErrorObjs || [ { message: message } ]; // to be passed into error handlers
		var consoleObj = window.console;
		var consoleWarnFunc = consoleObj ? (consoleObj.warn || consoleObj.log) : null;

		// call error handlers
		(sourceOptions.googleCalendarError || $.noop).apply(calendar, errorObjs);
		(calendar.options.googleCalendarError || $.noop).apply(calendar, errorObjs);

		// print error to debug console
		if (consoleWarnFunc) {
			consoleWarnFunc.apply(consoleObj, [ message ].concat(apiErrorObjs || []));
		}
	}

	if (!apiKey) {
		reportError("Specify a googleCalendarApiKey. See http://fullcalendar.io/docs/google_calendar/");
		return {}; // an empty source to use instead. won't fetch anything.
	}

	// The API expects an ISO8601 datetime with a time and timezone part.
	// Since the calendar's timezone offset isn't always known, request the date in UTC and pad it by a day on each
	// side, guaranteeing we will receive all events in the desired range, albeit a superset.
	// .utc() will set a zone and give it a 00:00:00 time.
	if (!start.hasZone()) {
		start = start.clone().utc().add(-1, 'day');
	}
	if (!end.hasZone()) {
		end = end.clone().utc().add(1, 'day');
	}

	// when sending timezone names to Google, only accepts underscores, not spaces
	if (timezone && timezone != 'local') {
		timezoneArg = timezone.replace(' ', '_');
	}

	data = $.extend({}, sourceOptions.data || {}, {
		key: apiKey,
		timeMin: start.format(),
		timeMax: end.format(),
		timeZone: timezoneArg,
		singleEvents: true,
		maxResults: 9999
	});

	return $.extend({}, sourceOptions, {
		googleCalendarId: null, // prevents source-normalizing from happening again
		url: url,
		data: data,
		startParam: false, // `false` omits this parameter. we already included it above
		endParam: false, // same
		timezoneParam: false, // same
		success: function(data) {
			var events = [];
			var successArgs;
			var successRes;

			if (data.error) {
				reportError('Google Calendar API: ' + data.error.message, data.error.errors);
			}
			else if (data.items) {
				$.each(data.items, function(i, entry) {
					var url = entry.htmlLink;

					// make the URLs for each event show times in the correct timezone
					if (timezoneArg) {
						url = injectQsComponent(url, 'ctz=' + timezoneArg);
					}

					events.push({
						id: entry.id,
						title: entry.summary,
						start: entry.start.dateTime || entry.start.date, // try timed. will fall back to all-day
						end: entry.end.dateTime || entry.end.date, // same
						url: url,
						location: entry.location,
						description: entry.description
					});
				});

				// call the success handler(s) and allow it to return a new events array
				successArgs = [ events ].concat(Array.prototype.slice.call(arguments, 1)); // forward other jq args
				successRes = applyAll(success, this, successArgs);
				if ($.isArray(successRes)) {
					return successRes;
				}
			}

			return events;
		}
	});
}


// Injects a string like "arg=value" into the querystring of a URL
function injectQsComponent(url, component) {
	// inject it after the querystring but before the fragment
	return url.replace(/(\?.*?)?(#|$)/, function(whole, qs, hash) {
		return (qs ? qs + '&' : '?') + component + hash;
	});
}


});
/*! jQuery UI - v1.11.2 - 2014-10-17
* http://jqueryui.com
* Copyright 2014 jQuery Foundation and other contributors; Licensed MIT */

(function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e(jQuery)})(function(e){function t(t,s){var n,a,o,r=t.nodeName.toLowerCase();return"area"===r?(n=t.parentNode,a=n.name,t.href&&a&&"map"===n.nodeName.toLowerCase()?(o=e("img[usemap='#"+a+"']")[0],!!o&&i(o)):!1):(/input|select|textarea|button|object/.test(r)?!t.disabled:"a"===r?t.href||s:s)&&i(t)}function i(t){return e.expr.filters.visible(t)&&!e(t).parents().addBack().filter(function(){return"hidden"===e.css(this,"visibility")}).length}e.ui=e.ui||{},e.extend(e.ui,{version:"1.11.2",keyCode:{BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}}),e.fn.extend({scrollParent:function(t){var i=this.css("position"),s="absolute"===i,n=t?/(auto|scroll|hidden)/:/(auto|scroll)/,a=this.parents().filter(function(){var t=e(this);return s&&"static"===t.css("position")?!1:n.test(t.css("overflow")+t.css("overflow-y")+t.css("overflow-x"))}).eq(0);return"fixed"!==i&&a.length?a:e(this[0].ownerDocument||document)},uniqueId:function(){var e=0;return function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++e)})}}(),removeUniqueId:function(){return this.each(function(){/^ui-id-\d+$/.test(this.id)&&e(this).removeAttr("id")})}}),e.extend(e.expr[":"],{data:e.expr.createPseudo?e.expr.createPseudo(function(t){return function(i){return!!e.data(i,t)}}):function(t,i,s){return!!e.data(t,s[3])},focusable:function(i){return t(i,!isNaN(e.attr(i,"tabindex")))},tabbable:function(i){var s=e.attr(i,"tabindex"),n=isNaN(s);return(n||s>=0)&&t(i,!n)}}),e("<a>").outerWidth(1).jquery||e.each(["Width","Height"],function(t,i){function s(t,i,s,a){return e.each(n,function(){i-=parseFloat(e.css(t,"padding"+this))||0,s&&(i-=parseFloat(e.css(t,"border"+this+"Width"))||0),a&&(i-=parseFloat(e.css(t,"margin"+this))||0)}),i}var n="Width"===i?["Left","Right"]:["Top","Bottom"],a=i.toLowerCase(),o={innerWidth:e.fn.innerWidth,innerHeight:e.fn.innerHeight,outerWidth:e.fn.outerWidth,outerHeight:e.fn.outerHeight};e.fn["inner"+i]=function(t){return void 0===t?o["inner"+i].call(this):this.each(function(){e(this).css(a,s(this,t)+"px")})},e.fn["outer"+i]=function(t,n){return"number"!=typeof t?o["outer"+i].call(this,t):this.each(function(){e(this).css(a,s(this,t,!0,n)+"px")})}}),e.fn.addBack||(e.fn.addBack=function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}),e("<a>").data("a-b","a").removeData("a-b").data("a-b")&&(e.fn.removeData=function(t){return function(i){return arguments.length?t.call(this,e.camelCase(i)):t.call(this)}}(e.fn.removeData)),e.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()),e.fn.extend({focus:function(t){return function(i,s){return"number"==typeof i?this.each(function(){var t=this;setTimeout(function(){e(t).focus(),s&&s.call(t)},i)}):t.apply(this,arguments)}}(e.fn.focus),disableSelection:function(){var e="onselectstart"in document.createElement("div")?"selectstart":"mousedown";return function(){return this.bind(e+".ui-disableSelection",function(e){e.preventDefault()})}}(),enableSelection:function(){return this.unbind(".ui-disableSelection")},zIndex:function(t){if(void 0!==t)return this.css("zIndex",t);if(this.length)for(var i,s,n=e(this[0]);n.length&&n[0]!==document;){if(i=n.css("position"),("absolute"===i||"relative"===i||"fixed"===i)&&(s=parseInt(n.css("zIndex"),10),!isNaN(s)&&0!==s))return s;n=n.parent()}return 0}}),e.ui.plugin={add:function(t,i,s){var n,a=e.ui[t].prototype;for(n in s)a.plugins[n]=a.plugins[n]||[],a.plugins[n].push([i,s[n]])},call:function(e,t,i,s){var n,a=e.plugins[t];if(a&&(s||e.element[0].parentNode&&11!==e.element[0].parentNode.nodeType))for(n=0;a.length>n;n++)e.options[a[n][0]]&&a[n][1].apply(e.element,i)}}});
/*! jQuery UI - v1.11.2 - 2014-10-17
* http://jqueryui.com
* Copyright 2014 jQuery Foundation and other contributors; Licensed MIT */
(function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e(jQuery)})(function(e){var t=0,i=Array.prototype.slice;return e.cleanData=function(t){return function(i){var s,n,a;for(a=0;null!=(n=i[a]);a++)try{s=e._data(n,"events"),s&&s.remove&&e(n).triggerHandler("remove")}catch(o){}t(i)}}(e.cleanData),e.widget=function(t,i,s){var n,a,o,r,h={},l=t.split(".")[0];return t=t.split(".")[1],n=l+"-"+t,s||(s=i,i=e.Widget),e.expr[":"][n.toLowerCase()]=function(t){return!!e.data(t,n)},e[l]=e[l]||{},a=e[l][t],o=e[l][t]=function(e,t){return this._createWidget?(arguments.length&&this._createWidget(e,t),void 0):new o(e,t)},e.extend(o,a,{version:s.version,_proto:e.extend({},s),_childConstructors:[]}),r=new i,r.options=e.widget.extend({},r.options),e.each(s,function(t,s){return e.isFunction(s)?(h[t]=function(){var e=function(){return i.prototype[t].apply(this,arguments)},n=function(e){return i.prototype[t].apply(this,e)};return function(){var t,i=this._super,a=this._superApply;return this._super=e,this._superApply=n,t=s.apply(this,arguments),this._super=i,this._superApply=a,t}}(),void 0):(h[t]=s,void 0)}),o.prototype=e.widget.extend(r,{widgetEventPrefix:a?r.widgetEventPrefix||t:t},h,{constructor:o,namespace:l,widgetName:t,widgetFullName:n}),a?(e.each(a._childConstructors,function(t,i){var s=i.prototype;e.widget(s.namespace+"."+s.widgetName,o,i._proto)}),delete a._childConstructors):i._childConstructors.push(o),e.widget.bridge(t,o),o},e.widget.extend=function(t){for(var s,n,a=i.call(arguments,1),o=0,r=a.length;r>o;o++)for(s in a[o])n=a[o][s],a[o].hasOwnProperty(s)&&void 0!==n&&(t[s]=e.isPlainObject(n)?e.isPlainObject(t[s])?e.widget.extend({},t[s],n):e.widget.extend({},n):n);return t},e.widget.bridge=function(t,s){var n=s.prototype.widgetFullName||t;e.fn[t]=function(a){var o="string"==typeof a,r=i.call(arguments,1),h=this;return a=!o&&r.length?e.widget.extend.apply(null,[a].concat(r)):a,o?this.each(function(){var i,s=e.data(this,n);return"instance"===a?(h=s,!1):s?e.isFunction(s[a])&&"_"!==a.charAt(0)?(i=s[a].apply(s,r),i!==s&&void 0!==i?(h=i&&i.jquery?h.pushStack(i.get()):i,!1):void 0):e.error("no such method '"+a+"' for "+t+" widget instance"):e.error("cannot call methods on "+t+" prior to initialization; "+"attempted to call method '"+a+"'")}):this.each(function(){var t=e.data(this,n);t?(t.option(a||{}),t._init&&t._init()):e.data(this,n,new s(a,this))}),h}},e.Widget=function(){},e.Widget._childConstructors=[],e.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(i,s){s=e(s||this.defaultElement||this)[0],this.element=e(s),this.uuid=t++,this.eventNamespace="."+this.widgetName+this.uuid,this.bindings=e(),this.hoverable=e(),this.focusable=e(),s!==this&&(e.data(s,this.widgetFullName,this),this._on(!0,this.element,{remove:function(e){e.target===s&&this.destroy()}}),this.document=e(s.style?s.ownerDocument:s.document||s),this.window=e(this.document[0].defaultView||this.document[0].parentWindow)),this.options=e.widget.extend({},this.options,this._getCreateOptions(),i),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:e.noop,_getCreateEventData:e.noop,_create:e.noop,_init:e.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled "+"ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:e.noop,widget:function(){return this.element},option:function(t,i){var s,n,a,o=t;if(0===arguments.length)return e.widget.extend({},this.options);if("string"==typeof t)if(o={},s=t.split("."),t=s.shift(),s.length){for(n=o[t]=e.widget.extend({},this.options[t]),a=0;s.length-1>a;a++)n[s[a]]=n[s[a]]||{},n=n[s[a]];if(t=s.pop(),1===arguments.length)return void 0===n[t]?null:n[t];n[t]=i}else{if(1===arguments.length)return void 0===this.options[t]?null:this.options[t];o[t]=i}return this._setOptions(o),this},_setOptions:function(e){var t;for(t in e)this._setOption(t,e[t]);return this},_setOption:function(e,t){return this.options[e]=t,"disabled"===e&&(this.widget().toggleClass(this.widgetFullName+"-disabled",!!t),t&&(this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus"))),this},enable:function(){return this._setOptions({disabled:!1})},disable:function(){return this._setOptions({disabled:!0})},_on:function(t,i,s){var n,a=this;"boolean"!=typeof t&&(s=i,i=t,t=!1),s?(i=n=e(i),this.bindings=this.bindings.add(i)):(s=i,i=this.element,n=this.widget()),e.each(s,function(s,o){function r(){return t||a.options.disabled!==!0&&!e(this).hasClass("ui-state-disabled")?("string"==typeof o?a[o]:o).apply(a,arguments):void 0}"string"!=typeof o&&(r.guid=o.guid=o.guid||r.guid||e.guid++);var h=s.match(/^([\w:-]*)\s*(.*)$/),l=h[1]+a.eventNamespace,u=h[2];u?n.delegate(u,l,r):i.bind(l,r)})},_off:function(t,i){i=(i||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,t.unbind(i).undelegate(i),this.bindings=e(this.bindings.not(t).get()),this.focusable=e(this.focusable.not(t).get()),this.hoverable=e(this.hoverable.not(t).get())},_delay:function(e,t){function i(){return("string"==typeof e?s[e]:e).apply(s,arguments)}var s=this;return setTimeout(i,t||0)},_hoverable:function(t){this.hoverable=this.hoverable.add(t),this._on(t,{mouseenter:function(t){e(t.currentTarget).addClass("ui-state-hover")},mouseleave:function(t){e(t.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(t){this.focusable=this.focusable.add(t),this._on(t,{focusin:function(t){e(t.currentTarget).addClass("ui-state-focus")},focusout:function(t){e(t.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(t,i,s){var n,a,o=this.options[t];if(s=s||{},i=e.Event(i),i.type=(t===this.widgetEventPrefix?t:this.widgetEventPrefix+t).toLowerCase(),i.target=this.element[0],a=i.originalEvent)for(n in a)n in i||(i[n]=a[n]);return this.element.trigger(i,s),!(e.isFunction(o)&&o.apply(this.element[0],[i].concat(s))===!1||i.isDefaultPrevented())}},e.each({show:"fadeIn",hide:"fadeOut"},function(t,i){e.Widget.prototype["_"+t]=function(s,n,a){"string"==typeof n&&(n={effect:n});var o,r=n?n===!0||"number"==typeof n?i:n.effect||i:t;n=n||{},"number"==typeof n&&(n={duration:n}),o=!e.isEmptyObject(n),n.complete=a,n.delay&&s.delay(n.delay),o&&e.effects&&e.effects.effect[r]?s[t](n):r!==t&&s[r]?s[r](n.duration,n.easing,a):s.queue(function(i){e(this)[t](),a&&a.call(s[0]),i()})}}),e.widget});
/*! jQuery UI - v1.11.2 - 2014-10-17
* http://jqueryui.com
* Copyright 2014 jQuery Foundation and other contributors; Licensed MIT */
(function(e){"function"==typeof define&&define.amd?define(["jquery","./widget"],e):e(jQuery)})(function(e){var t=!1;return e(document).mouseup(function(){t=!1}),e.widget("ui.mouse",{version:"1.11.2",options:{cancel:"input,textarea,button,select,option",distance:1,delay:0},_mouseInit:function(){var t=this;this.element.bind("mousedown."+this.widgetName,function(e){return t._mouseDown(e)}).bind("click."+this.widgetName,function(i){return!0===e.data(i.target,t.widgetName+".preventClickEvent")?(e.removeData(i.target,t.widgetName+".preventClickEvent"),i.stopImmediatePropagation(),!1):void 0}),this.started=!1},_mouseDestroy:function(){this.element.unbind("."+this.widgetName),this._mouseMoveDelegate&&this.document.unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate)},_mouseDown:function(i){if(!t){this._mouseMoved=!1,this._mouseStarted&&this._mouseUp(i),this._mouseDownEvent=i;var s=this,n=1===i.which,a="string"==typeof this.options.cancel&&i.target.nodeName?e(i.target).closest(this.options.cancel).length:!1;return n&&!a&&this._mouseCapture(i)?(this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){s.mouseDelayMet=!0},this.options.delay)),this._mouseDistanceMet(i)&&this._mouseDelayMet(i)&&(this._mouseStarted=this._mouseStart(i)!==!1,!this._mouseStarted)?(i.preventDefault(),!0):(!0===e.data(i.target,this.widgetName+".preventClickEvent")&&e.removeData(i.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(e){return s._mouseMove(e)},this._mouseUpDelegate=function(e){return s._mouseUp(e)},this.document.bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate),i.preventDefault(),t=!0,!0)):!0}},_mouseMove:function(t){if(this._mouseMoved){if(e.ui.ie&&(!document.documentMode||9>document.documentMode)&&!t.button)return this._mouseUp(t);if(!t.which)return this._mouseUp(t)}return(t.which||t.button)&&(this._mouseMoved=!0),this._mouseStarted?(this._mouseDrag(t),t.preventDefault()):(this._mouseDistanceMet(t)&&this._mouseDelayMet(t)&&(this._mouseStarted=this._mouseStart(this._mouseDownEvent,t)!==!1,this._mouseStarted?this._mouseDrag(t):this._mouseUp(t)),!this._mouseStarted)},_mouseUp:function(i){return this.document.unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,i.target===this._mouseDownEvent.target&&e.data(i.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(i)),t=!1,!1},_mouseDistanceMet:function(e){return Math.max(Math.abs(this._mouseDownEvent.pageX-e.pageX),Math.abs(this._mouseDownEvent.pageY-e.pageY))>=this.options.distance},_mouseDelayMet:function(){return this.mouseDelayMet},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return!0}})});
/*! jQuery UI - v1.11.2 - 2014-10-17
* http://jqueryui.com
* Copyright 2014 jQuery Foundation and other contributors; Licensed MIT */
(function(e){"function"==typeof define&&define.amd?define(["jquery","./core","./mouse","./widget"],e):e(jQuery)})(function(e){return e.widget("ui.draggable",e.ui.mouse,{version:"1.11.2",widgetEventPrefix:"drag",options:{addClasses:!0,appendTo:"parent",axis:!1,connectToSortable:!1,containment:!1,cursor:"auto",cursorAt:!1,grid:!1,handle:!1,helper:"original",iframeFix:!1,opacity:!1,refreshPositions:!1,revert:!1,revertDuration:500,scope:"default",scroll:!0,scrollSensitivity:20,scrollSpeed:20,snap:!1,snapMode:"both",snapTolerance:20,stack:!1,zIndex:!1,drag:null,start:null,stop:null},_create:function(){"original"===this.options.helper&&this._setPositionRelative(),this.options.addClasses&&this.element.addClass("ui-draggable"),this.options.disabled&&this.element.addClass("ui-draggable-disabled"),this._setHandleClassName(),this._mouseInit()},_setOption:function(e,t){this._super(e,t),"handle"===e&&(this._removeHandleClassName(),this._setHandleClassName())},_destroy:function(){return(this.helper||this.element).is(".ui-draggable-dragging")?(this.destroyOnClear=!0,void 0):(this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"),this._removeHandleClassName(),this._mouseDestroy(),void 0)},_mouseCapture:function(t){var i=this.options;return this._blurActiveElement(t),this.helper||i.disabled||e(t.target).closest(".ui-resizable-handle").length>0?!1:(this.handle=this._getHandle(t),this.handle?(this._blockFrames(i.iframeFix===!0?"iframe":i.iframeFix),!0):!1)},_blockFrames:function(t){this.iframeBlocks=this.document.find(t).map(function(){var t=e(this);return e("<div>").css("position","absolute").appendTo(t.parent()).outerWidth(t.outerWidth()).outerHeight(t.outerHeight()).offset(t.offset())[0]})},_unblockFrames:function(){this.iframeBlocks&&(this.iframeBlocks.remove(),delete this.iframeBlocks)},_blurActiveElement:function(t){var i=this.document[0];if(this.handleElement.is(t.target))try{i.activeElement&&"body"!==i.activeElement.nodeName.toLowerCase()&&e(i.activeElement).blur()}catch(s){}},_mouseStart:function(t){var i=this.options;return this.helper=this._createHelper(t),this.helper.addClass("ui-draggable-dragging"),this._cacheHelperProportions(),e.ui.ddmanager&&(e.ui.ddmanager.current=this),this._cacheMargins(),this.cssPosition=this.helper.css("position"),this.scrollParent=this.helper.scrollParent(!0),this.offsetParent=this.helper.offsetParent(),this.hasFixedAncestor=this.helper.parents().filter(function(){return"fixed"===e(this).css("position")}).length>0,this.positionAbs=this.element.offset(),this._refreshOffsets(t),this.originalPosition=this.position=this._generatePosition(t,!1),this.originalPageX=t.pageX,this.originalPageY=t.pageY,i.cursorAt&&this._adjustOffsetFromHelper(i.cursorAt),this._setContainment(),this._trigger("start",t)===!1?(this._clear(),!1):(this._cacheHelperProportions(),e.ui.ddmanager&&!i.dropBehaviour&&e.ui.ddmanager.prepareOffsets(this,t),this._normalizeRightBottom(),this._mouseDrag(t,!0),e.ui.ddmanager&&e.ui.ddmanager.dragStart(this,t),!0)},_refreshOffsets:function(e){this.offset={top:this.positionAbs.top-this.margins.top,left:this.positionAbs.left-this.margins.left,scroll:!1,parent:this._getParentOffset(),relative:this._getRelativeOffset()},this.offset.click={left:e.pageX-this.offset.left,top:e.pageY-this.offset.top}},_mouseDrag:function(t,i){if(this.hasFixedAncestor&&(this.offset.parent=this._getParentOffset()),this.position=this._generatePosition(t,!0),this.positionAbs=this._convertPositionTo("absolute"),!i){var s=this._uiHash();if(this._trigger("drag",t,s)===!1)return this._mouseUp({}),!1;this.position=s.position}return this.helper[0].style.left=this.position.left+"px",this.helper[0].style.top=this.position.top+"px",e.ui.ddmanager&&e.ui.ddmanager.drag(this,t),!1},_mouseStop:function(t){var i=this,s=!1;return e.ui.ddmanager&&!this.options.dropBehaviour&&(s=e.ui.ddmanager.drop(this,t)),this.dropped&&(s=this.dropped,this.dropped=!1),"invalid"===this.options.revert&&!s||"valid"===this.options.revert&&s||this.options.revert===!0||e.isFunction(this.options.revert)&&this.options.revert.call(this.element,s)?e(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){i._trigger("stop",t)!==!1&&i._clear()}):this._trigger("stop",t)!==!1&&this._clear(),!1},_mouseUp:function(t){return this._unblockFrames(),e.ui.ddmanager&&e.ui.ddmanager.dragStop(this,t),this.handleElement.is(t.target)&&this.element.focus(),e.ui.mouse.prototype._mouseUp.call(this,t)},cancel:function(){return this.helper.is(".ui-draggable-dragging")?this._mouseUp({}):this._clear(),this},_getHandle:function(t){return this.options.handle?!!e(t.target).closest(this.element.find(this.options.handle)).length:!0},_setHandleClassName:function(){this.handleElement=this.options.handle?this.element.find(this.options.handle):this.element,this.handleElement.addClass("ui-draggable-handle")},_removeHandleClassName:function(){this.handleElement.removeClass("ui-draggable-handle")},_createHelper:function(t){var i=this.options,s=e.isFunction(i.helper),n=s?e(i.helper.apply(this.element[0],[t])):"clone"===i.helper?this.element.clone().removeAttr("id"):this.element;return n.parents("body").length||n.appendTo("parent"===i.appendTo?this.element[0].parentNode:i.appendTo),s&&n[0]===this.element[0]&&this._setPositionRelative(),n[0]===this.element[0]||/(fixed|absolute)/.test(n.css("position"))||n.css("position","absolute"),n},_setPositionRelative:function(){/^(?:r|a|f)/.test(this.element.css("position"))||(this.element[0].style.position="relative")},_adjustOffsetFromHelper:function(t){"string"==typeof t&&(t=t.split(" ")),e.isArray(t)&&(t={left:+t[0],top:+t[1]||0}),"left"in t&&(this.offset.click.left=t.left+this.margins.left),"right"in t&&(this.offset.click.left=this.helperProportions.width-t.right+this.margins.left),"top"in t&&(this.offset.click.top=t.top+this.margins.top),"bottom"in t&&(this.offset.click.top=this.helperProportions.height-t.bottom+this.margins.top)},_isRootNode:function(e){return/(html|body)/i.test(e.tagName)||e===this.document[0]},_getParentOffset:function(){var t=this.offsetParent.offset(),i=this.document[0];return"absolute"===this.cssPosition&&this.scrollParent[0]!==i&&e.contains(this.scrollParent[0],this.offsetParent[0])&&(t.left+=this.scrollParent.scrollLeft(),t.top+=this.scrollParent.scrollTop()),this._isRootNode(this.offsetParent[0])&&(t={top:0,left:0}),{top:t.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:t.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if("relative"!==this.cssPosition)return{top:0,left:0};var e=this.element.position(),t=this._isRootNode(this.scrollParent[0]);return{top:e.top-(parseInt(this.helper.css("top"),10)||0)+(t?0:this.scrollParent.scrollTop()),left:e.left-(parseInt(this.helper.css("left"),10)||0)+(t?0:this.scrollParent.scrollLeft())}},_cacheMargins:function(){this.margins={left:parseInt(this.element.css("marginLeft"),10)||0,top:parseInt(this.element.css("marginTop"),10)||0,right:parseInt(this.element.css("marginRight"),10)||0,bottom:parseInt(this.element.css("marginBottom"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var t,i,s,n=this.options,a=this.document[0];return this.relativeContainer=null,n.containment?"window"===n.containment?(this.containment=[e(window).scrollLeft()-this.offset.relative.left-this.offset.parent.left,e(window).scrollTop()-this.offset.relative.top-this.offset.parent.top,e(window).scrollLeft()+e(window).width()-this.helperProportions.width-this.margins.left,e(window).scrollTop()+(e(window).height()||a.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top],void 0):"document"===n.containment?(this.containment=[0,0,e(a).width()-this.helperProportions.width-this.margins.left,(e(a).height()||a.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top],void 0):n.containment.constructor===Array?(this.containment=n.containment,void 0):("parent"===n.containment&&(n.containment=this.helper[0].parentNode),i=e(n.containment),s=i[0],s&&(t=/(scroll|auto)/.test(i.css("overflow")),this.containment=[(parseInt(i.css("borderLeftWidth"),10)||0)+(parseInt(i.css("paddingLeft"),10)||0),(parseInt(i.css("borderTopWidth"),10)||0)+(parseInt(i.css("paddingTop"),10)||0),(t?Math.max(s.scrollWidth,s.offsetWidth):s.offsetWidth)-(parseInt(i.css("borderRightWidth"),10)||0)-(parseInt(i.css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,(t?Math.max(s.scrollHeight,s.offsetHeight):s.offsetHeight)-(parseInt(i.css("borderBottomWidth"),10)||0)-(parseInt(i.css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom],this.relativeContainer=i),void 0):(this.containment=null,void 0)},_convertPositionTo:function(e,t){t||(t=this.position);var i="absolute"===e?1:-1,s=this._isRootNode(this.scrollParent[0]);return{top:t.top+this.offset.relative.top*i+this.offset.parent.top*i-("fixed"===this.cssPosition?-this.offset.scroll.top:s?0:this.offset.scroll.top)*i,left:t.left+this.offset.relative.left*i+this.offset.parent.left*i-("fixed"===this.cssPosition?-this.offset.scroll.left:s?0:this.offset.scroll.left)*i}},_generatePosition:function(e,t){var i,s,n,a,o=this.options,r=this._isRootNode(this.scrollParent[0]),h=e.pageX,l=e.pageY;return r&&this.offset.scroll||(this.offset.scroll={top:this.scrollParent.scrollTop(),left:this.scrollParent.scrollLeft()}),t&&(this.containment&&(this.relativeContainer?(s=this.relativeContainer.offset(),i=[this.containment[0]+s.left,this.containment[1]+s.top,this.containment[2]+s.left,this.containment[3]+s.top]):i=this.containment,e.pageX-this.offset.click.left<i[0]&&(h=i[0]+this.offset.click.left),e.pageY-this.offset.click.top<i[1]&&(l=i[1]+this.offset.click.top),e.pageX-this.offset.click.left>i[2]&&(h=i[2]+this.offset.click.left),e.pageY-this.offset.click.top>i[3]&&(l=i[3]+this.offset.click.top)),o.grid&&(n=o.grid[1]?this.originalPageY+Math.round((l-this.originalPageY)/o.grid[1])*o.grid[1]:this.originalPageY,l=i?n-this.offset.click.top>=i[1]||n-this.offset.click.top>i[3]?n:n-this.offset.click.top>=i[1]?n-o.grid[1]:n+o.grid[1]:n,a=o.grid[0]?this.originalPageX+Math.round((h-this.originalPageX)/o.grid[0])*o.grid[0]:this.originalPageX,h=i?a-this.offset.click.left>=i[0]||a-this.offset.click.left>i[2]?a:a-this.offset.click.left>=i[0]?a-o.grid[0]:a+o.grid[0]:a),"y"===o.axis&&(h=this.originalPageX),"x"===o.axis&&(l=this.originalPageY)),{top:l-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+("fixed"===this.cssPosition?-this.offset.scroll.top:r?0:this.offset.scroll.top),left:h-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+("fixed"===this.cssPosition?-this.offset.scroll.left:r?0:this.offset.scroll.left)}},_clear:function(){this.helper.removeClass("ui-draggable-dragging"),this.helper[0]===this.element[0]||this.cancelHelperRemoval||this.helper.remove(),this.helper=null,this.cancelHelperRemoval=!1,this.destroyOnClear&&this.destroy()},_normalizeRightBottom:function(){"y"!==this.options.axis&&"auto"!==this.helper.css("right")&&(this.helper.width(this.helper.width()),this.helper.css("right","auto")),"x"!==this.options.axis&&"auto"!==this.helper.css("bottom")&&(this.helper.height(this.helper.height()),this.helper.css("bottom","auto"))},_trigger:function(t,i,s){return s=s||this._uiHash(),e.ui.plugin.call(this,t,[i,s,this],!0),/^(drag|start|stop)/.test(t)&&(this.positionAbs=this._convertPositionTo("absolute"),s.offset=this.positionAbs),e.Widget.prototype._trigger.call(this,t,i,s)},plugins:{},_uiHash:function(){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs}}}),e.ui.plugin.add("draggable","connectToSortable",{start:function(t,i,s){var n=e.extend({},i,{item:s.element});s.sortables=[],e(s.options.connectToSortable).each(function(){var i=e(this).sortable("instance");i&&!i.options.disabled&&(s.sortables.push(i),i.refreshPositions(),i._trigger("activate",t,n))})},stop:function(t,i,s){var n=e.extend({},i,{item:s.element});s.cancelHelperRemoval=!1,e.each(s.sortables,function(){var e=this;e.isOver?(e.isOver=0,s.cancelHelperRemoval=!0,e.cancelHelperRemoval=!1,e._storedCSS={position:e.placeholder.css("position"),top:e.placeholder.css("top"),left:e.placeholder.css("left")},e._mouseStop(t),e.options.helper=e.options._helper):(e.cancelHelperRemoval=!0,e._trigger("deactivate",t,n))})},drag:function(t,i,s){e.each(s.sortables,function(){var n=!1,a=this;a.positionAbs=s.positionAbs,a.helperProportions=s.helperProportions,a.offset.click=s.offset.click,a._intersectsWith(a.containerCache)&&(n=!0,e.each(s.sortables,function(){return this.positionAbs=s.positionAbs,this.helperProportions=s.helperProportions,this.offset.click=s.offset.click,this!==a&&this._intersectsWith(this.containerCache)&&e.contains(a.element[0],this.element[0])&&(n=!1),n})),n?(a.isOver||(a.isOver=1,a.currentItem=i.helper.appendTo(a.element).data("ui-sortable-item",!0),a.options._helper=a.options.helper,a.options.helper=function(){return i.helper[0]},t.target=a.currentItem[0],a._mouseCapture(t,!0),a._mouseStart(t,!0,!0),a.offset.click.top=s.offset.click.top,a.offset.click.left=s.offset.click.left,a.offset.parent.left-=s.offset.parent.left-a.offset.parent.left,a.offset.parent.top-=s.offset.parent.top-a.offset.parent.top,s._trigger("toSortable",t),s.dropped=a.element,e.each(s.sortables,function(){this.refreshPositions()}),s.currentItem=s.element,a.fromOutside=s),a.currentItem&&(a._mouseDrag(t),i.position=a.position)):a.isOver&&(a.isOver=0,a.cancelHelperRemoval=!0,a.options._revert=a.options.revert,a.options.revert=!1,a._trigger("out",t,a._uiHash(a)),a._mouseStop(t,!0),a.options.revert=a.options._revert,a.options.helper=a.options._helper,a.placeholder&&a.placeholder.remove(),s._refreshOffsets(t),i.position=s._generatePosition(t,!0),s._trigger("fromSortable",t),s.dropped=!1,e.each(s.sortables,function(){this.refreshPositions()}))})}}),e.ui.plugin.add("draggable","cursor",{start:function(t,i,s){var n=e("body"),a=s.options;n.css("cursor")&&(a._cursor=n.css("cursor")),n.css("cursor",a.cursor)},stop:function(t,i,s){var n=s.options;n._cursor&&e("body").css("cursor",n._cursor)}}),e.ui.plugin.add("draggable","opacity",{start:function(t,i,s){var n=e(i.helper),a=s.options;n.css("opacity")&&(a._opacity=n.css("opacity")),n.css("opacity",a.opacity)},stop:function(t,i,s){var n=s.options;n._opacity&&e(i.helper).css("opacity",n._opacity)}}),e.ui.plugin.add("draggable","scroll",{start:function(e,t,i){i.scrollParentNotHidden||(i.scrollParentNotHidden=i.helper.scrollParent(!1)),i.scrollParentNotHidden[0]!==i.document[0]&&"HTML"!==i.scrollParentNotHidden[0].tagName&&(i.overflowOffset=i.scrollParentNotHidden.offset())},drag:function(t,i,s){var n=s.options,a=!1,o=s.scrollParentNotHidden[0],r=s.document[0];o!==r&&"HTML"!==o.tagName?(n.axis&&"x"===n.axis||(s.overflowOffset.top+o.offsetHeight-t.pageY<n.scrollSensitivity?o.scrollTop=a=o.scrollTop+n.scrollSpeed:t.pageY-s.overflowOffset.top<n.scrollSensitivity&&(o.scrollTop=a=o.scrollTop-n.scrollSpeed)),n.axis&&"y"===n.axis||(s.overflowOffset.left+o.offsetWidth-t.pageX<n.scrollSensitivity?o.scrollLeft=a=o.scrollLeft+n.scrollSpeed:t.pageX-s.overflowOffset.left<n.scrollSensitivity&&(o.scrollLeft=a=o.scrollLeft-n.scrollSpeed))):(n.axis&&"x"===n.axis||(t.pageY-e(r).scrollTop()<n.scrollSensitivity?a=e(r).scrollTop(e(r).scrollTop()-n.scrollSpeed):e(window).height()-(t.pageY-e(r).scrollTop())<n.scrollSensitivity&&(a=e(r).scrollTop(e(r).scrollTop()+n.scrollSpeed))),n.axis&&"y"===n.axis||(t.pageX-e(r).scrollLeft()<n.scrollSensitivity?a=e(r).scrollLeft(e(r).scrollLeft()-n.scrollSpeed):e(window).width()-(t.pageX-e(r).scrollLeft())<n.scrollSensitivity&&(a=e(r).scrollLeft(e(r).scrollLeft()+n.scrollSpeed)))),a!==!1&&e.ui.ddmanager&&!n.dropBehaviour&&e.ui.ddmanager.prepareOffsets(s,t)}}),e.ui.plugin.add("draggable","snap",{start:function(t,i,s){var n=s.options;s.snapElements=[],e(n.snap.constructor!==String?n.snap.items||":data(ui-draggable)":n.snap).each(function(){var t=e(this),i=t.offset();this!==s.element[0]&&s.snapElements.push({item:this,width:t.outerWidth(),height:t.outerHeight(),top:i.top,left:i.left})})},drag:function(t,i,s){var n,a,o,r,h,l,u,d,c,f,p=s.options,m=p.snapTolerance,g=i.offset.left,v=g+s.helperProportions.width,y=i.offset.top,_=y+s.helperProportions.height;for(c=s.snapElements.length-1;c>=0;c--)h=s.snapElements[c].left-s.margins.left,l=h+s.snapElements[c].width,u=s.snapElements[c].top-s.margins.top,d=u+s.snapElements[c].height,h-m>v||g>l+m||u-m>_||y>d+m||!e.contains(s.snapElements[c].item.ownerDocument,s.snapElements[c].item)?(s.snapElements[c].snapping&&s.options.snap.release&&s.options.snap.release.call(s.element,t,e.extend(s._uiHash(),{snapItem:s.snapElements[c].item})),s.snapElements[c].snapping=!1):("inner"!==p.snapMode&&(n=m>=Math.abs(u-_),a=m>=Math.abs(d-y),o=m>=Math.abs(h-v),r=m>=Math.abs(l-g),n&&(i.position.top=s._convertPositionTo("relative",{top:u-s.helperProportions.height,left:0}).top),a&&(i.position.top=s._convertPositionTo("relative",{top:d,left:0}).top),o&&(i.position.left=s._convertPositionTo("relative",{top:0,left:h-s.helperProportions.width}).left),r&&(i.position.left=s._convertPositionTo("relative",{top:0,left:l}).left)),f=n||a||o||r,"outer"!==p.snapMode&&(n=m>=Math.abs(u-y),a=m>=Math.abs(d-_),o=m>=Math.abs(h-g),r=m>=Math.abs(l-v),n&&(i.position.top=s._convertPositionTo("relative",{top:u,left:0}).top),a&&(i.position.top=s._convertPositionTo("relative",{top:d-s.helperProportions.height,left:0}).top),o&&(i.position.left=s._convertPositionTo("relative",{top:0,left:h}).left),r&&(i.position.left=s._convertPositionTo("relative",{top:0,left:l-s.helperProportions.width}).left)),!s.snapElements[c].snapping&&(n||a||o||r||f)&&s.options.snap.snap&&s.options.snap.snap.call(s.element,t,e.extend(s._uiHash(),{snapItem:s.snapElements[c].item})),s.snapElements[c].snapping=n||a||o||r||f)}}),e.ui.plugin.add("draggable","stack",{start:function(t,i,s){var n,a=s.options,o=e.makeArray(e(a.stack)).sort(function(t,i){return(parseInt(e(t).css("zIndex"),10)||0)-(parseInt(e(i).css("zIndex"),10)||0)});o.length&&(n=parseInt(e(o[0]).css("zIndex"),10)||0,e(o).each(function(t){e(this).css("zIndex",n+t)}),this.css("zIndex",n+o.length))}}),e.ui.plugin.add("draggable","zIndex",{start:function(t,i,s){var n=e(i.helper),a=s.options;n.css("zIndex")&&(a._zIndex=n.css("zIndex")),n.css("zIndex",a.zIndex)},stop:function(t,i,s){var n=s.options;n._zIndex&&e(i.helper).css("zIndex",n._zIndex)}}),e.ui.draggable});
$(document).ready(function() {

    $('#calendar').fullCalendar({
       googleCalendarApiKey: 'AIzaSyDlCwOOG6dsZqKW2WHURY-CRlMfoluHo28',
       events: $('.container').data('shifts'),
       editable: true,
       defaultView: 'agendaWeek',
       height: 400,
			 droppable: true, // this allows things to be dropped onto the calendar
			 drop: function() {
					$(this).remove();
			 }
    })

		$('#external-events .fc-event').each(function() {

			$(this).data('event', {
				title: $.trim($(this).text()),
				stick: true
			});

			$(this).draggable({
				zIndex: 999,
				revert: true,
				revertDuration: 0
			});

		});

});
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//







;
