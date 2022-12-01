import * as React from "react";
import { useLayoutEffect, forwardRef, useContext, createElement, createContext, Fragment, useRef } from "react";
import * as jsxRuntime from "react/jsx-runtime";
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var INFINITY = 1 / 0;
var symbolTag = "[object Symbol]";
var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
var rsAstralRange = "\\ud800-\\udfff", rsComboMarksRange = "\\u0300-\\u036f\\ufe20-\\ufe23", rsComboSymbolsRange = "\\u20d0-\\u20f0", rsDingbatRange = "\\u2700-\\u27bf", rsLowerRange = "a-z\\xdf-\\xf6\\xf8-\\xff", rsMathOpRange = "\\xac\\xb1\\xd7\\xf7", rsNonCharRange = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", rsPunctuationRange = "\\u2000-\\u206f", rsSpaceRange = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", rsUpperRange = "A-Z\\xc0-\\xd6\\xd8-\\xde", rsVarRange = "\\ufe0e\\ufe0f", rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
var rsApos = "['\u2019]", rsAstral = "[" + rsAstralRange + "]", rsBreak = "[" + rsBreakRange + "]", rsCombo = "[" + rsComboMarksRange + rsComboSymbolsRange + "]", rsDigits = "\\d+", rsDingbat = "[" + rsDingbatRange + "]", rsLower = "[" + rsLowerRange + "]", rsMisc = "[^" + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + "]", rsFitz = "\\ud83c[\\udffb-\\udfff]", rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")", rsNonAstral = "[^" + rsAstralRange + "]", rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsUpper = "[" + rsUpperRange + "]", rsZWJ = "\\u200d";
var rsLowerMisc = "(?:" + rsLower + "|" + rsMisc + ")", rsUpperMisc = "(?:" + rsUpper + "|" + rsMisc + ")", rsOptLowerContr = "(?:" + rsApos + "(?:d|ll|m|re|s|t|ve))?", rsOptUpperContr = "(?:" + rsApos + "(?:D|LL|M|RE|S|T|VE))?", reOptMod = rsModifier + "?", rsOptVar = "[" + rsVarRange + "]?", rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*", rsSeq = rsOptVar + reOptMod + rsOptJoin, rsEmoji = "(?:" + [rsDingbat, rsRegional, rsSurrPair].join("|") + ")" + rsSeq, rsSymbol = "(?:" + [rsNonAstral + rsCombo + "?", rsCombo, rsRegional, rsSurrPair, rsAstral].join("|") + ")";
var reApos = RegExp(rsApos, "g");
var reComboMark = RegExp(rsCombo, "g");
var reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g");
var reUnicodeWord = RegExp([
  rsUpper + "?" + rsLower + "+" + rsOptLowerContr + "(?=" + [rsBreak, rsUpper, "$"].join("|") + ")",
  rsUpperMisc + "+" + rsOptUpperContr + "(?=" + [rsBreak, rsUpper + rsLowerMisc, "$"].join("|") + ")",
  rsUpper + "?" + rsLowerMisc + "+" + rsOptLowerContr,
  rsUpper + "+" + rsOptUpperContr,
  rsDigits,
  rsEmoji
].join("|"), "g");
var reHasUnicode = RegExp("[" + rsZWJ + rsAstralRange + rsComboMarksRange + rsComboSymbolsRange + rsVarRange + "]");
var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
var deburredLetters = {
  "\xC0": "A",
  "\xC1": "A",
  "\xC2": "A",
  "\xC3": "A",
  "\xC4": "A",
  "\xC5": "A",
  "\xE0": "a",
  "\xE1": "a",
  "\xE2": "a",
  "\xE3": "a",
  "\xE4": "a",
  "\xE5": "a",
  "\xC7": "C",
  "\xE7": "c",
  "\xD0": "D",
  "\xF0": "d",
  "\xC8": "E",
  "\xC9": "E",
  "\xCA": "E",
  "\xCB": "E",
  "\xE8": "e",
  "\xE9": "e",
  "\xEA": "e",
  "\xEB": "e",
  "\xCC": "I",
  "\xCD": "I",
  "\xCE": "I",
  "\xCF": "I",
  "\xEC": "i",
  "\xED": "i",
  "\xEE": "i",
  "\xEF": "i",
  "\xD1": "N",
  "\xF1": "n",
  "\xD2": "O",
  "\xD3": "O",
  "\xD4": "O",
  "\xD5": "O",
  "\xD6": "O",
  "\xD8": "O",
  "\xF2": "o",
  "\xF3": "o",
  "\xF4": "o",
  "\xF5": "o",
  "\xF6": "o",
  "\xF8": "o",
  "\xD9": "U",
  "\xDA": "U",
  "\xDB": "U",
  "\xDC": "U",
  "\xF9": "u",
  "\xFA": "u",
  "\xFB": "u",
  "\xFC": "u",
  "\xDD": "Y",
  "\xFD": "y",
  "\xFF": "y",
  "\xC6": "Ae",
  "\xE6": "ae",
  "\xDE": "Th",
  "\xFE": "th",
  "\xDF": "ss",
  "\u0100": "A",
  "\u0102": "A",
  "\u0104": "A",
  "\u0101": "a",
  "\u0103": "a",
  "\u0105": "a",
  "\u0106": "C",
  "\u0108": "C",
  "\u010A": "C",
  "\u010C": "C",
  "\u0107": "c",
  "\u0109": "c",
  "\u010B": "c",
  "\u010D": "c",
  "\u010E": "D",
  "\u0110": "D",
  "\u010F": "d",
  "\u0111": "d",
  "\u0112": "E",
  "\u0114": "E",
  "\u0116": "E",
  "\u0118": "E",
  "\u011A": "E",
  "\u0113": "e",
  "\u0115": "e",
  "\u0117": "e",
  "\u0119": "e",
  "\u011B": "e",
  "\u011C": "G",
  "\u011E": "G",
  "\u0120": "G",
  "\u0122": "G",
  "\u011D": "g",
  "\u011F": "g",
  "\u0121": "g",
  "\u0123": "g",
  "\u0124": "H",
  "\u0126": "H",
  "\u0125": "h",
  "\u0127": "h",
  "\u0128": "I",
  "\u012A": "I",
  "\u012C": "I",
  "\u012E": "I",
  "\u0130": "I",
  "\u0129": "i",
  "\u012B": "i",
  "\u012D": "i",
  "\u012F": "i",
  "\u0131": "i",
  "\u0134": "J",
  "\u0135": "j",
  "\u0136": "K",
  "\u0137": "k",
  "\u0138": "k",
  "\u0139": "L",
  "\u013B": "L",
  "\u013D": "L",
  "\u013F": "L",
  "\u0141": "L",
  "\u013A": "l",
  "\u013C": "l",
  "\u013E": "l",
  "\u0140": "l",
  "\u0142": "l",
  "\u0143": "N",
  "\u0145": "N",
  "\u0147": "N",
  "\u014A": "N",
  "\u0144": "n",
  "\u0146": "n",
  "\u0148": "n",
  "\u014B": "n",
  "\u014C": "O",
  "\u014E": "O",
  "\u0150": "O",
  "\u014D": "o",
  "\u014F": "o",
  "\u0151": "o",
  "\u0154": "R",
  "\u0156": "R",
  "\u0158": "R",
  "\u0155": "r",
  "\u0157": "r",
  "\u0159": "r",
  "\u015A": "S",
  "\u015C": "S",
  "\u015E": "S",
  "\u0160": "S",
  "\u015B": "s",
  "\u015D": "s",
  "\u015F": "s",
  "\u0161": "s",
  "\u0162": "T",
  "\u0164": "T",
  "\u0166": "T",
  "\u0163": "t",
  "\u0165": "t",
  "\u0167": "t",
  "\u0168": "U",
  "\u016A": "U",
  "\u016C": "U",
  "\u016E": "U",
  "\u0170": "U",
  "\u0172": "U",
  "\u0169": "u",
  "\u016B": "u",
  "\u016D": "u",
  "\u016F": "u",
  "\u0171": "u",
  "\u0173": "u",
  "\u0174": "W",
  "\u0175": "w",
  "\u0176": "Y",
  "\u0177": "y",
  "\u0178": "Y",
  "\u0179": "Z",
  "\u017B": "Z",
  "\u017D": "Z",
  "\u017A": "z",
  "\u017C": "z",
  "\u017E": "z",
  "\u0132": "IJ",
  "\u0133": "ij",
  "\u0152": "Oe",
  "\u0153": "oe",
  "\u0149": "'n",
  "\u017F": "ss"
};
var freeGlobal = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
var root = freeGlobal || freeSelf || Function("return this")();
function arrayReduce(array, iteratee, accumulator, initAccum) {
  var index = -1, length2 = array ? array.length : 0;
  if (initAccum && length2) {
    accumulator = array[++index];
  }
  while (++index < length2) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
}
function asciiToArray(string) {
  return string.split("");
}
function asciiWords(string) {
  return string.match(reAsciiWord) || [];
}
function basePropertyOf(object) {
  return function(key) {
    return object == null ? void 0 : object[key];
  };
}
var deburrLetter = basePropertyOf(deburredLetters);
function hasUnicode(string) {
  return reHasUnicode.test(string);
}
function hasUnicodeWord(string) {
  return reHasUnicodeWord.test(string);
}
function stringToArray(string) {
  return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
}
function unicodeToArray(string) {
  return string.match(reUnicode) || [];
}
function unicodeWords(string) {
  return string.match(reUnicodeWord) || [];
}
var objectProto = Object.prototype;
var objectToString = objectProto.toString;
var Symbol$1 = root.Symbol;
var symbolProto = Symbol$1 ? Symbol$1.prototype : void 0, symbolToString = symbolProto ? symbolProto.toString : void 0;
function baseSlice(array, start, end) {
  var index = -1, length2 = array.length;
  if (start < 0) {
    start = -start > length2 ? 0 : length2 + start;
  }
  end = end > length2 ? length2 : end;
  if (end < 0) {
    end += length2;
  }
  length2 = start > end ? 0 : end - start >>> 0;
  start >>>= 0;
  var result = Array(length2);
  while (++index < length2) {
    result[index] = array[index + start];
  }
  return result;
}
function baseToString(value) {
  if (typeof value == "string") {
    return value;
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : "";
  }
  var result = value + "";
  return result == "0" && 1 / value == -INFINITY ? "-0" : result;
}
function castSlice(array, start, end) {
  var length2 = array.length;
  end = end === void 0 ? length2 : end;
  return !start && end >= length2 ? array : baseSlice(array, start, end);
}
function createCaseFirst(methodName) {
  return function(string) {
    string = toString(string);
    var strSymbols = hasUnicode(string) ? stringToArray(string) : void 0;
    var chr = strSymbols ? strSymbols[0] : string.charAt(0);
    var trailing = strSymbols ? castSlice(strSymbols, 1).join("") : string.slice(1);
    return chr[methodName]() + trailing;
  };
}
function createCompounder(callback) {
  return function(string) {
    return arrayReduce(words(deburr(string).replace(reApos, "")), callback, "");
  };
}
function isObjectLike(value) {
  return !!value && typeof value == "object";
}
function isSymbol(value) {
  return typeof value == "symbol" || isObjectLike(value) && objectToString.call(value) == symbolTag;
}
function toString(value) {
  return value == null ? "" : baseToString(value);
}
function deburr(string) {
  string = toString(string);
  return string && string.replace(reLatin, deburrLetter).replace(reComboMark, "");
}
var startCase = createCompounder(function(result, word, index) {
  return result + (index ? " " : "") + upperFirst(word);
});
var upperFirst = createCaseFirst("toUpperCase");
function words(string, pattern, guard) {
  string = toString(string);
  pattern = guard ? void 0 : pattern;
  if (pattern === void 0) {
    return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
  }
  return string.match(pattern) || [];
}
var lodash_startcase = startCase;
var _extends$1 = { exports: {} };
(function(module) {
  function _extends2() {
    module.exports = _extends2 = Object.assign ? Object.assign.bind() : function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    }, module.exports.__esModule = true, module.exports["default"] = module.exports;
    return _extends2.apply(this, arguments);
  }
  module.exports = _extends2, module.exports.__esModule = true, module.exports["default"] = module.exports;
})(_extends$1);
function memoize$1(fn) {
  var cache = /* @__PURE__ */ Object.create(null);
  return function(arg) {
    if (cache[arg] === void 0)
      cache[arg] = fn(arg);
    return cache[arg];
  };
}
var reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/;
var isPropValid = /* @__PURE__ */ memoize$1(
  function(prop) {
    return reactPropsRegex.test(prop) || prop.charCodeAt(0) === 111 && prop.charCodeAt(1) === 110 && prop.charCodeAt(2) < 91;
  }
);
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function sheetForTag(tag) {
  if (tag.sheet) {
    return tag.sheet;
  }
  for (var i = 0; i < document.styleSheets.length; i++) {
    if (document.styleSheets[i].ownerNode === tag) {
      return document.styleSheets[i];
    }
  }
}
function createStyleElement(options) {
  var tag = document.createElement("style");
  tag.setAttribute("data-emotion", options.key);
  if (options.nonce !== void 0) {
    tag.setAttribute("nonce", options.nonce);
  }
  tag.appendChild(document.createTextNode(""));
  tag.setAttribute("data-s", "");
  return tag;
}
var StyleSheet = /* @__PURE__ */ function() {
  function StyleSheet2(options) {
    var _this = this;
    this._insertTag = function(tag) {
      var before;
      if (_this.tags.length === 0) {
        if (_this.insertionPoint) {
          before = _this.insertionPoint.nextSibling;
        } else if (_this.prepend) {
          before = _this.container.firstChild;
        } else {
          before = _this.before;
        }
      } else {
        before = _this.tags[_this.tags.length - 1].nextSibling;
      }
      _this.container.insertBefore(tag, before);
      _this.tags.push(tag);
    };
    this.isSpeedy = options.speedy === void 0 ? process.env.NODE_ENV === "production" : options.speedy;
    this.tags = [];
    this.ctr = 0;
    this.nonce = options.nonce;
    this.key = options.key;
    this.container = options.container;
    this.prepend = options.prepend;
    this.insertionPoint = options.insertionPoint;
    this.before = null;
  }
  var _proto = StyleSheet2.prototype;
  _proto.hydrate = function hydrate(nodes) {
    nodes.forEach(this._insertTag);
  };
  _proto.insert = function insert(rule) {
    if (this.ctr % (this.isSpeedy ? 65e3 : 1) === 0) {
      this._insertTag(createStyleElement(this));
    }
    var tag = this.tags[this.tags.length - 1];
    if (process.env.NODE_ENV !== "production") {
      var isImportRule3 = rule.charCodeAt(0) === 64 && rule.charCodeAt(1) === 105;
      if (isImportRule3 && this._alreadyInsertedOrderInsensitiveRule) {
        console.error("You're attempting to insert the following rule:\n" + rule + "\n\n`@import` rules must be before all other types of rules in a stylesheet but other rules have already been inserted. Please ensure that `@import` rules are before all other rules.");
      }
      this._alreadyInsertedOrderInsensitiveRule = this._alreadyInsertedOrderInsensitiveRule || !isImportRule3;
    }
    if (this.isSpeedy) {
      var sheet = sheetForTag(tag);
      try {
        sheet.insertRule(rule, sheet.cssRules.length);
      } catch (e) {
        if (process.env.NODE_ENV !== "production" && !/:(-moz-placeholder|-moz-focus-inner|-moz-focusring|-ms-input-placeholder|-moz-read-write|-moz-read-only|-ms-clear|-ms-expand|-ms-reveal){/.test(rule)) {
          console.error('There was a problem inserting the following rule: "' + rule + '"', e);
        }
      }
    } else {
      tag.appendChild(document.createTextNode(rule));
    }
    this.ctr++;
  };
  _proto.flush = function flush() {
    this.tags.forEach(function(tag) {
      return tag.parentNode && tag.parentNode.removeChild(tag);
    });
    this.tags = [];
    this.ctr = 0;
    if (process.env.NODE_ENV !== "production") {
      this._alreadyInsertedOrderInsensitiveRule = false;
    }
  };
  return StyleSheet2;
}();
var MS = "-ms-";
var MOZ = "-moz-";
var WEBKIT = "-webkit-";
var COMMENT = "comm";
var RULESET = "rule";
var DECLARATION = "decl";
var IMPORT = "@import";
var KEYFRAMES = "@keyframes";
var abs = Math.abs;
var from = String.fromCharCode;
var assign = Object.assign;
function hash(value, length2) {
  return charat(value, 0) ^ 45 ? (((length2 << 2 ^ charat(value, 0)) << 2 ^ charat(value, 1)) << 2 ^ charat(value, 2)) << 2 ^ charat(value, 3) : 0;
}
function trim(value) {
  return value.trim();
}
function match(value, pattern) {
  return (value = pattern.exec(value)) ? value[0] : value;
}
function replace(value, pattern, replacement) {
  return value.replace(pattern, replacement);
}
function indexof(value, search) {
  return value.indexOf(search);
}
function charat(value, index) {
  return value.charCodeAt(index) | 0;
}
function substr(value, begin, end) {
  return value.slice(begin, end);
}
function strlen(value) {
  return value.length;
}
function sizeof(value) {
  return value.length;
}
function append(value, array) {
  return array.push(value), value;
}
function combine(array, callback) {
  return array.map(callback).join("");
}
var line = 1;
var column = 1;
var length = 0;
var position$1 = 0;
var character = 0;
var characters = "";
function node(value, root2, parent, type, props, children, length2) {
  return { value, root: root2, parent, type, props, children, line, column, length: length2, return: "" };
}
function copy(root2, props) {
  return assign(node("", null, null, "", null, null, 0), root2, { length: -root2.length }, props);
}
function char() {
  return character;
}
function prev() {
  character = position$1 > 0 ? charat(characters, --position$1) : 0;
  if (column--, character === 10)
    column = 1, line--;
  return character;
}
function next() {
  character = position$1 < length ? charat(characters, position$1++) : 0;
  if (column++, character === 10)
    column = 1, line++;
  return character;
}
function peek() {
  return charat(characters, position$1);
}
function caret() {
  return position$1;
}
function slice(begin, end) {
  return substr(characters, begin, end);
}
function token(type) {
  switch (type) {
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    case 59:
    case 123:
    case 125:
      return 4;
    case 58:
      return 3;
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function alloc(value) {
  return line = column = 1, length = strlen(characters = value), position$1 = 0, [];
}
function dealloc(value) {
  return characters = "", value;
}
function delimit(type) {
  return trim(slice(position$1 - 1, delimiter(type === 91 ? type + 2 : type === 40 ? type + 1 : type)));
}
function whitespace(type) {
  while (character = peek())
    if (character < 33)
      next();
    else
      break;
  return token(type) > 2 || token(character) > 3 ? "" : " ";
}
function escaping(index, count) {
  while (--count && next())
    if (character < 48 || character > 102 || character > 57 && character < 65 || character > 70 && character < 97)
      break;
  return slice(index, caret() + (count < 6 && peek() == 32 && next() == 32));
}
function delimiter(type) {
  while (next())
    switch (character) {
      case type:
        return position$1;
      case 34:
      case 39:
        if (type !== 34 && type !== 39)
          delimiter(character);
        break;
      case 40:
        if (type === 41)
          delimiter(type);
        break;
      case 92:
        next();
        break;
    }
  return position$1;
}
function commenter(type, index) {
  while (next())
    if (type + character === 47 + 10)
      break;
    else if (type + character === 42 + 42 && peek() === 47)
      break;
  return "/*" + slice(index, position$1 - 1) + "*" + from(type === 47 ? type : next());
}
function identifier(index) {
  while (!token(peek()))
    next();
  return slice(index, position$1);
}
function compile(value) {
  return dealloc(parse("", null, null, null, [""], value = alloc(value), 0, [0], value));
}
function parse(value, root2, parent, rule, rules, rulesets, pseudo, points, declarations) {
  var index = 0;
  var offset = 0;
  var length2 = pseudo;
  var atrule = 0;
  var property = 0;
  var previous = 0;
  var variable = 1;
  var scanning = 1;
  var ampersand = 1;
  var character2 = 0;
  var type = "";
  var props = rules;
  var children = rulesets;
  var reference = rule;
  var characters2 = type;
  while (scanning)
    switch (previous = character2, character2 = next()) {
      case 40:
        if (previous != 108 && charat(characters2, length2 - 1) == 58) {
          if (indexof(characters2 += replace(delimit(character2), "&", "&\f"), "&\f") != -1)
            ampersand = -1;
          break;
        }
      case 34:
      case 39:
      case 91:
        characters2 += delimit(character2);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        characters2 += whitespace(previous);
        break;
      case 92:
        characters2 += escaping(caret() - 1, 7);
        continue;
      case 47:
        switch (peek()) {
          case 42:
          case 47:
            append(comment(commenter(next(), caret()), root2, parent), declarations);
            break;
          default:
            characters2 += "/";
        }
        break;
      case 123 * variable:
        points[index++] = strlen(characters2) * ampersand;
      case 125 * variable:
      case 59:
      case 0:
        switch (character2) {
          case 0:
          case 125:
            scanning = 0;
          case 59 + offset:
            if (property > 0 && strlen(characters2) - length2)
              append(property > 32 ? declaration(characters2 + ";", rule, parent, length2 - 1) : declaration(replace(characters2, " ", "") + ";", rule, parent, length2 - 2), declarations);
            break;
          case 59:
            characters2 += ";";
          default:
            append(reference = ruleset(characters2, root2, parent, index, offset, rules, points, type, props = [], children = [], length2), rulesets);
            if (character2 === 123)
              if (offset === 0)
                parse(characters2, root2, reference, reference, props, rulesets, length2, points, children);
              else
                switch (atrule === 99 && charat(characters2, 3) === 110 ? 100 : atrule) {
                  case 100:
                  case 109:
                  case 115:
                    parse(value, reference, reference, rule && append(ruleset(value, reference, reference, 0, 0, rules, points, type, rules, props = [], length2), children), rules, children, length2, points, rule ? props : children);
                    break;
                  default:
                    parse(characters2, reference, reference, reference, [""], children, 0, points, children);
                }
        }
        index = offset = property = 0, variable = ampersand = 1, type = characters2 = "", length2 = pseudo;
        break;
      case 58:
        length2 = 1 + strlen(characters2), property = previous;
      default:
        if (variable < 1) {
          if (character2 == 123)
            --variable;
          else if (character2 == 125 && variable++ == 0 && prev() == 125)
            continue;
        }
        switch (characters2 += from(character2), character2 * variable) {
          case 38:
            ampersand = offset > 0 ? 1 : (characters2 += "\f", -1);
            break;
          case 44:
            points[index++] = (strlen(characters2) - 1) * ampersand, ampersand = 1;
            break;
          case 64:
            if (peek() === 45)
              characters2 += delimit(next());
            atrule = peek(), offset = length2 = strlen(type = characters2 += identifier(caret())), character2++;
            break;
          case 45:
            if (previous === 45 && strlen(characters2) == 2)
              variable = 0;
        }
    }
  return rulesets;
}
function ruleset(value, root2, parent, index, offset, rules, points, type, props, children, length2) {
  var post = offset - 1;
  var rule = offset === 0 ? rules : [""];
  var size = sizeof(rule);
  for (var i = 0, j = 0, k = 0; i < index; ++i)
    for (var x = 0, y = substr(value, post + 1, post = abs(j = points[i])), z = value; x < size; ++x)
      if (z = trim(j > 0 ? rule[x] + " " + y : replace(y, /&\f/g, rule[x])))
        props[k++] = z;
  return node(value, root2, parent, offset === 0 ? RULESET : type, props, children, length2);
}
function comment(value, root2, parent) {
  return node(value, root2, parent, COMMENT, from(char()), substr(value, 2, -2), 0);
}
function declaration(value, root2, parent, length2) {
  return node(value, root2, parent, DECLARATION, substr(value, 0, length2), substr(value, length2 + 1, -1), length2);
}
function serialize(children, callback) {
  var output = "";
  var length2 = sizeof(children);
  for (var i = 0; i < length2; i++)
    output += callback(children[i], i, children, callback) || "";
  return output;
}
function stringify(element, index, children, callback) {
  switch (element.type) {
    case IMPORT:
    case DECLARATION:
      return element.return = element.return || element.value;
    case COMMENT:
      return "";
    case KEYFRAMES:
      return element.return = element.value + "{" + serialize(element.children, callback) + "}";
    case RULESET:
      element.value = element.props.join(",");
  }
  return strlen(children = serialize(element.children, callback)) ? element.return = element.value + "{" + children + "}" : "";
}
function middleware(collection) {
  var length2 = sizeof(collection);
  return function(element, index, children, callback) {
    var output = "";
    for (var i = 0; i < length2; i++)
      output += collection[i](element, index, children, callback) || "";
    return output;
  };
}
function rulesheet(callback) {
  return function(element) {
    if (!element.root) {
      if (element = element.return)
        callback(element);
    }
  };
}
var weakMemoize = function weakMemoize2(func) {
  var cache = /* @__PURE__ */ new WeakMap();
  return function(arg) {
    if (cache.has(arg)) {
      return cache.get(arg);
    }
    var ret = func(arg);
    cache.set(arg, ret);
    return ret;
  };
};
var identifierWithPointTracking = function identifierWithPointTracking2(begin, points, index) {
  var previous = 0;
  var character2 = 0;
  while (true) {
    previous = character2;
    character2 = peek();
    if (previous === 38 && character2 === 12) {
      points[index] = 1;
    }
    if (token(character2)) {
      break;
    }
    next();
  }
  return slice(begin, position$1);
};
var toRules = function toRules2(parsed, points) {
  var index = -1;
  var character2 = 44;
  do {
    switch (token(character2)) {
      case 0:
        if (character2 === 38 && peek() === 12) {
          points[index] = 1;
        }
        parsed[index] += identifierWithPointTracking(position$1 - 1, points, index);
        break;
      case 2:
        parsed[index] += delimit(character2);
        break;
      case 4:
        if (character2 === 44) {
          parsed[++index] = peek() === 58 ? "&\f" : "";
          points[index] = parsed[index].length;
          break;
        }
      default:
        parsed[index] += from(character2);
    }
  } while (character2 = next());
  return parsed;
};
var getRules = function getRules2(value, points) {
  return dealloc(toRules(alloc(value), points));
};
var fixedElements = /* @__PURE__ */ new WeakMap();
var compat = function compat2(element) {
  if (element.type !== "rule" || !element.parent || element.length < 1) {
    return;
  }
  var value = element.value, parent = element.parent;
  var isImplicitRule = element.column === parent.column && element.line === parent.line;
  while (parent.type !== "rule") {
    parent = parent.parent;
    if (!parent)
      return;
  }
  if (element.props.length === 1 && value.charCodeAt(0) !== 58 && !fixedElements.get(parent)) {
    return;
  }
  if (isImplicitRule) {
    return;
  }
  fixedElements.set(element, true);
  var points = [];
  var rules = getRules(value, points);
  var parentRules = parent.props;
  for (var i = 0, k = 0; i < rules.length; i++) {
    for (var j = 0; j < parentRules.length; j++, k++) {
      element.props[k] = points[i] ? rules[i].replace(/&\f/g, parentRules[j]) : parentRules[j] + " " + rules[i];
    }
  }
};
var removeLabel = function removeLabel2(element) {
  if (element.type === "decl") {
    var value = element.value;
    if (value.charCodeAt(0) === 108 && value.charCodeAt(2) === 98) {
      element["return"] = "";
      element.value = "";
    }
  }
};
var ignoreFlag = "emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason";
var isIgnoringComment = function isIgnoringComment2(element) {
  return element.type === "comm" && element.children.indexOf(ignoreFlag) > -1;
};
var createUnsafeSelectorsAlarm = function createUnsafeSelectorsAlarm2(cache) {
  return function(element, index, children) {
    if (element.type !== "rule" || cache.compat)
      return;
    var unsafePseudoClasses = element.value.match(/(:first|:nth|:nth-last)-child/g);
    if (unsafePseudoClasses) {
      var isNested = element.parent === children[0];
      var commentContainer = isNested ? children[0].children : children;
      for (var i = commentContainer.length - 1; i >= 0; i--) {
        var node2 = commentContainer[i];
        if (node2.line < element.line) {
          break;
        }
        if (node2.column < element.column) {
          if (isIgnoringComment(node2)) {
            return;
          }
          break;
        }
      }
      unsafePseudoClasses.forEach(function(unsafePseudoClass) {
        console.error('The pseudo class "' + unsafePseudoClass + '" is potentially unsafe when doing server-side rendering. Try changing it to "' + unsafePseudoClass.split("-child")[0] + '-of-type".');
      });
    }
  };
};
var isImportRule = function isImportRule2(element) {
  return element.type.charCodeAt(1) === 105 && element.type.charCodeAt(0) === 64;
};
var isPrependedWithRegularRules = function isPrependedWithRegularRules2(index, children) {
  for (var i = index - 1; i >= 0; i--) {
    if (!isImportRule(children[i])) {
      return true;
    }
  }
  return false;
};
var nullifyElement = function nullifyElement2(element) {
  element.type = "";
  element.value = "";
  element["return"] = "";
  element.children = "";
  element.props = "";
};
var incorrectImportAlarm = function incorrectImportAlarm2(element, index, children) {
  if (!isImportRule(element)) {
    return;
  }
  if (element.parent) {
    console.error("`@import` rules can't be nested inside other rules. Please move it to the top level and put it before regular rules. Keep in mind that they can only be used within global styles.");
    nullifyElement(element);
  } else if (isPrependedWithRegularRules(index, children)) {
    console.error("`@import` rules can't be after other rules. Please put your `@import` rules before your other rules.");
    nullifyElement(element);
  }
};
function prefix(value, length2) {
  switch (hash(value, length2)) {
    case 5103:
      return WEBKIT + "print-" + value + value;
    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921:
    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005:
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855:
    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return WEBKIT + value + value;
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return WEBKIT + value + MOZ + value + MS + value + value;
    case 6828:
    case 4268:
      return WEBKIT + value + MS + value + value;
    case 6165:
      return WEBKIT + value + MS + "flex-" + value + value;
    case 5187:
      return WEBKIT + value + replace(value, /(\w+).+(:[^]+)/, WEBKIT + "box-$1$2" + MS + "flex-$1$2") + value;
    case 5443:
      return WEBKIT + value + MS + "flex-item-" + replace(value, /flex-|-self/, "") + value;
    case 4675:
      return WEBKIT + value + MS + "flex-line-pack" + replace(value, /align-content|flex-|-self/, "") + value;
    case 5548:
      return WEBKIT + value + MS + replace(value, "shrink", "negative") + value;
    case 5292:
      return WEBKIT + value + MS + replace(value, "basis", "preferred-size") + value;
    case 6060:
      return WEBKIT + "box-" + replace(value, "-grow", "") + WEBKIT + value + MS + replace(value, "grow", "positive") + value;
    case 4554:
      return WEBKIT + replace(value, /([^-])(transform)/g, "$1" + WEBKIT + "$2") + value;
    case 6187:
      return replace(replace(replace(value, /(zoom-|grab)/, WEBKIT + "$1"), /(image-set)/, WEBKIT + "$1"), value, "") + value;
    case 5495:
    case 3959:
      return replace(value, /(image-set\([^]*)/, WEBKIT + "$1$`$1");
    case 4968:
      return replace(replace(value, /(.+:)(flex-)?(.*)/, WEBKIT + "box-pack:$3" + MS + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + WEBKIT + value + value;
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return replace(value, /(.+)-inline(.+)/, WEBKIT + "$1$2") + value;
    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      if (strlen(value) - 1 - length2 > 6)
        switch (charat(value, length2 + 1)) {
          case 109:
            if (charat(value, length2 + 4) !== 45)
              break;
          case 102:
            return replace(value, /(.+:)(.+)-([^]+)/, "$1" + WEBKIT + "$2-$3$1" + MOZ + (charat(value, length2 + 3) == 108 ? "$3" : "$2-$3")) + value;
          case 115:
            return ~indexof(value, "stretch") ? prefix(replace(value, "stretch", "fill-available"), length2) + value : value;
        }
      break;
    case 4949:
      if (charat(value, length2 + 1) !== 115)
        break;
    case 6444:
      switch (charat(value, strlen(value) - 3 - (~indexof(value, "!important") && 10))) {
        case 107:
          return replace(value, ":", ":" + WEBKIT) + value;
        case 101:
          return replace(value, /(.+:)([^;!]+)(;|!.+)?/, "$1" + WEBKIT + (charat(value, 14) === 45 ? "inline-" : "") + "box$3$1" + WEBKIT + "$2$3$1" + MS + "$2box$3") + value;
      }
      break;
    case 5936:
      switch (charat(value, length2 + 11)) {
        case 114:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "tb") + value;
        case 108:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "tb-rl") + value;
        case 45:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "lr") + value;
      }
      return WEBKIT + value + MS + value + value;
  }
  return value;
}
var prefixer = function prefixer2(element, index, children, callback) {
  if (element.length > -1) {
    if (!element["return"])
      switch (element.type) {
        case DECLARATION:
          element["return"] = prefix(element.value, element.length);
          break;
        case KEYFRAMES:
          return serialize([copy(element, {
            value: replace(element.value, "@", "@" + WEBKIT)
          })], callback);
        case RULESET:
          if (element.length)
            return combine(element.props, function(value) {
              switch (match(value, /(::plac\w+|:read-\w+)/)) {
                case ":read-only":
                case ":read-write":
                  return serialize([copy(element, {
                    props: [replace(value, /:(read-\w+)/, ":" + MOZ + "$1")]
                  })], callback);
                case "::placeholder":
                  return serialize([copy(element, {
                    props: [replace(value, /:(plac\w+)/, ":" + WEBKIT + "input-$1")]
                  }), copy(element, {
                    props: [replace(value, /:(plac\w+)/, ":" + MOZ + "$1")]
                  }), copy(element, {
                    props: [replace(value, /:(plac\w+)/, MS + "input-$1")]
                  })], callback);
              }
              return "";
            });
      }
  }
};
var isBrowser$5 = typeof document !== "undefined";
var getServerStylisCache = isBrowser$5 ? void 0 : weakMemoize(function() {
  return memoize$1(function() {
    var cache = {};
    return function(name) {
      return cache[name];
    };
  });
});
var defaultStylisPlugins = [prefixer];
var createCache = function createCache2(options) {
  var key = options.key;
  if (process.env.NODE_ENV !== "production" && !key) {
    throw new Error("You have to configure `key` for your cache. Please make sure it's unique (and not equal to 'css') as it's used for linking styles to your cache.\nIf multiple caches share the same key they might \"fight\" for each other's style elements.");
  }
  if (isBrowser$5 && key === "css") {
    var ssrStyles = document.querySelectorAll("style[data-emotion]:not([data-s])");
    Array.prototype.forEach.call(ssrStyles, function(node2) {
      var dataEmotionAttribute = node2.getAttribute("data-emotion");
      if (dataEmotionAttribute.indexOf(" ") === -1) {
        return;
      }
      document.head.appendChild(node2);
      node2.setAttribute("data-s", "");
    });
  }
  var stylisPlugins = options.stylisPlugins || defaultStylisPlugins;
  if (process.env.NODE_ENV !== "production") {
    if (/[^a-z-]/.test(key)) {
      throw new Error('Emotion key must only contain lower case alphabetical characters and - but "' + key + '" was passed');
    }
  }
  var inserted = {};
  var container;
  var nodesToHydrate = [];
  if (isBrowser$5) {
    container = options.container || document.head;
    Array.prototype.forEach.call(
      document.querySelectorAll('style[data-emotion^="' + key + ' "]'),
      function(node2) {
        var attrib = node2.getAttribute("data-emotion").split(" ");
        for (var i = 1; i < attrib.length; i++) {
          inserted[attrib[i]] = true;
        }
        nodesToHydrate.push(node2);
      }
    );
  }
  var _insert;
  var omnipresentPlugins = [compat, removeLabel];
  if (process.env.NODE_ENV !== "production") {
    omnipresentPlugins.push(createUnsafeSelectorsAlarm({
      get compat() {
        return cache.compat;
      }
    }), incorrectImportAlarm);
  }
  if (isBrowser$5) {
    var currentSheet;
    var finalizingPlugins = [stringify, process.env.NODE_ENV !== "production" ? function(element) {
      if (!element.root) {
        if (element["return"]) {
          currentSheet.insert(element["return"]);
        } else if (element.value && element.type !== COMMENT) {
          currentSheet.insert(element.value + "{}");
        }
      }
    } : rulesheet(function(rule) {
      currentSheet.insert(rule);
    })];
    var serializer = middleware(omnipresentPlugins.concat(stylisPlugins, finalizingPlugins));
    var stylis = function stylis2(styles) {
      return serialize(compile(styles), serializer);
    };
    _insert = function insert(selector, serialized, sheet, shouldCache) {
      currentSheet = sheet;
      if (process.env.NODE_ENV !== "production" && serialized.map !== void 0) {
        currentSheet = {
          insert: function insert2(rule) {
            sheet.insert(rule + serialized.map);
          }
        };
      }
      stylis(selector ? selector + "{" + serialized.styles + "}" : serialized.styles);
      if (shouldCache) {
        cache.inserted[serialized.name] = true;
      }
    };
  } else {
    var _finalizingPlugins = [stringify];
    var _serializer = middleware(omnipresentPlugins.concat(stylisPlugins, _finalizingPlugins));
    var _stylis = function _stylis2(styles) {
      return serialize(compile(styles), _serializer);
    };
    var serverStylisCache = getServerStylisCache(stylisPlugins)(key);
    var getRules3 = function getRules4(selector, serialized) {
      var name = serialized.name;
      if (serverStylisCache[name] === void 0) {
        serverStylisCache[name] = _stylis(selector ? selector + "{" + serialized.styles + "}" : serialized.styles);
      }
      return serverStylisCache[name];
    };
    _insert = function _insert2(selector, serialized, sheet, shouldCache) {
      var name = serialized.name;
      var rules = getRules3(selector, serialized);
      if (cache.compat === void 0) {
        if (shouldCache) {
          cache.inserted[name] = true;
        }
        if (process.env.NODE_ENV === "development" && serialized.map !== void 0) {
          return rules + serialized.map;
        }
        return rules;
      } else {
        if (shouldCache) {
          cache.inserted[name] = rules;
        } else {
          return rules;
        }
      }
    };
  }
  var cache = {
    key,
    sheet: new StyleSheet({
      key,
      container,
      nonce: options.nonce,
      speedy: options.speedy,
      prepend: options.prepend,
      insertionPoint: options.insertionPoint
    }),
    nonce: options.nonce,
    inserted,
    registered: {},
    insert: _insert
  };
  cache.sheet.hydrate(nodesToHydrate);
  return cache;
};
var reactIs$2 = { exports: {} };
var reactIs_production_min$1 = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReactIs_production_min$1;
function requireReactIs_production_min$1() {
  if (hasRequiredReactIs_production_min$1)
    return reactIs_production_min$1;
  hasRequiredReactIs_production_min$1 = 1;
  var b = "function" === typeof Symbol && Symbol.for, c = b ? Symbol.for("react.element") : 60103, d = b ? Symbol.for("react.portal") : 60106, e = b ? Symbol.for("react.fragment") : 60107, f = b ? Symbol.for("react.strict_mode") : 60108, g = b ? Symbol.for("react.profiler") : 60114, h = b ? Symbol.for("react.provider") : 60109, k = b ? Symbol.for("react.context") : 60110, l = b ? Symbol.for("react.async_mode") : 60111, m = b ? Symbol.for("react.concurrent_mode") : 60111, n = b ? Symbol.for("react.forward_ref") : 60112, p = b ? Symbol.for("react.suspense") : 60113, q = b ? Symbol.for("react.suspense_list") : 60120, r2 = b ? Symbol.for("react.memo") : 60115, t = b ? Symbol.for("react.lazy") : 60116, v = b ? Symbol.for("react.block") : 60121, w = b ? Symbol.for("react.fundamental") : 60117, x = b ? Symbol.for("react.responder") : 60118, y = b ? Symbol.for("react.scope") : 60119;
  function z(a) {
    if ("object" === typeof a && null !== a) {
      var u = a.$$typeof;
      switch (u) {
        case c:
          switch (a = a.type, a) {
            case l:
            case m:
            case e:
            case g:
            case f:
            case p:
              return a;
            default:
              switch (a = a && a.$$typeof, a) {
                case k:
                case n:
                case t:
                case r2:
                case h:
                  return a;
                default:
                  return u;
              }
          }
        case d:
          return u;
      }
    }
  }
  function A(a) {
    return z(a) === m;
  }
  reactIs_production_min$1.AsyncMode = l;
  reactIs_production_min$1.ConcurrentMode = m;
  reactIs_production_min$1.ContextConsumer = k;
  reactIs_production_min$1.ContextProvider = h;
  reactIs_production_min$1.Element = c;
  reactIs_production_min$1.ForwardRef = n;
  reactIs_production_min$1.Fragment = e;
  reactIs_production_min$1.Lazy = t;
  reactIs_production_min$1.Memo = r2;
  reactIs_production_min$1.Portal = d;
  reactIs_production_min$1.Profiler = g;
  reactIs_production_min$1.StrictMode = f;
  reactIs_production_min$1.Suspense = p;
  reactIs_production_min$1.isAsyncMode = function(a) {
    return A(a) || z(a) === l;
  };
  reactIs_production_min$1.isConcurrentMode = A;
  reactIs_production_min$1.isContextConsumer = function(a) {
    return z(a) === k;
  };
  reactIs_production_min$1.isContextProvider = function(a) {
    return z(a) === h;
  };
  reactIs_production_min$1.isElement = function(a) {
    return "object" === typeof a && null !== a && a.$$typeof === c;
  };
  reactIs_production_min$1.isForwardRef = function(a) {
    return z(a) === n;
  };
  reactIs_production_min$1.isFragment = function(a) {
    return z(a) === e;
  };
  reactIs_production_min$1.isLazy = function(a) {
    return z(a) === t;
  };
  reactIs_production_min$1.isMemo = function(a) {
    return z(a) === r2;
  };
  reactIs_production_min$1.isPortal = function(a) {
    return z(a) === d;
  };
  reactIs_production_min$1.isProfiler = function(a) {
    return z(a) === g;
  };
  reactIs_production_min$1.isStrictMode = function(a) {
    return z(a) === f;
  };
  reactIs_production_min$1.isSuspense = function(a) {
    return z(a) === p;
  };
  reactIs_production_min$1.isValidElementType = function(a) {
    return "string" === typeof a || "function" === typeof a || a === e || a === m || a === g || a === f || a === p || a === q || "object" === typeof a && null !== a && (a.$$typeof === t || a.$$typeof === r2 || a.$$typeof === h || a.$$typeof === k || a.$$typeof === n || a.$$typeof === w || a.$$typeof === x || a.$$typeof === y || a.$$typeof === v);
  };
  reactIs_production_min$1.typeOf = z;
  return reactIs_production_min$1;
}
var reactIs_development$1 = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReactIs_development$1;
function requireReactIs_development$1() {
  if (hasRequiredReactIs_development$1)
    return reactIs_development$1;
  hasRequiredReactIs_development$1 = 1;
  if (process.env.NODE_ENV !== "production") {
    (function() {
      var hasSymbol = typeof Symbol === "function" && Symbol.for;
      var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for("react.element") : 60103;
      var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for("react.portal") : 60106;
      var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for("react.fragment") : 60107;
      var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for("react.strict_mode") : 60108;
      var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for("react.profiler") : 60114;
      var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for("react.provider") : 60109;
      var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for("react.context") : 60110;
      var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for("react.async_mode") : 60111;
      var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for("react.concurrent_mode") : 60111;
      var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for("react.forward_ref") : 60112;
      var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for("react.suspense") : 60113;
      var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for("react.suspense_list") : 60120;
      var REACT_MEMO_TYPE = hasSymbol ? Symbol.for("react.memo") : 60115;
      var REACT_LAZY_TYPE = hasSymbol ? Symbol.for("react.lazy") : 60116;
      var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for("react.block") : 60121;
      var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for("react.fundamental") : 60117;
      var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for("react.responder") : 60118;
      var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for("react.scope") : 60119;
      function isValidElementType(type) {
        return typeof type === "string" || typeof type === "function" || type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === "object" && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
      }
      function typeOf(object) {
        if (typeof object === "object" && object !== null) {
          var $$typeof = object.$$typeof;
          switch ($$typeof) {
            case REACT_ELEMENT_TYPE:
              var type = object.type;
              switch (type) {
                case REACT_ASYNC_MODE_TYPE:
                case REACT_CONCURRENT_MODE_TYPE:
                case REACT_FRAGMENT_TYPE:
                case REACT_PROFILER_TYPE:
                case REACT_STRICT_MODE_TYPE:
                case REACT_SUSPENSE_TYPE:
                  return type;
                default:
                  var $$typeofType = type && type.$$typeof;
                  switch ($$typeofType) {
                    case REACT_CONTEXT_TYPE:
                    case REACT_FORWARD_REF_TYPE:
                    case REACT_LAZY_TYPE:
                    case REACT_MEMO_TYPE:
                    case REACT_PROVIDER_TYPE:
                      return $$typeofType;
                    default:
                      return $$typeof;
                  }
              }
            case REACT_PORTAL_TYPE:
              return $$typeof;
          }
        }
        return void 0;
      }
      var AsyncMode = REACT_ASYNC_MODE_TYPE;
      var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
      var ContextConsumer = REACT_CONTEXT_TYPE;
      var ContextProvider = REACT_PROVIDER_TYPE;
      var Element = REACT_ELEMENT_TYPE;
      var ForwardRef = REACT_FORWARD_REF_TYPE;
      var Fragment2 = REACT_FRAGMENT_TYPE;
      var Lazy = REACT_LAZY_TYPE;
      var Memo = REACT_MEMO_TYPE;
      var Portal = REACT_PORTAL_TYPE;
      var Profiler = REACT_PROFILER_TYPE;
      var StrictMode = REACT_STRICT_MODE_TYPE;
      var Suspense = REACT_SUSPENSE_TYPE;
      var hasWarnedAboutDeprecatedIsAsyncMode = false;
      function isAsyncMode(object) {
        {
          if (!hasWarnedAboutDeprecatedIsAsyncMode) {
            hasWarnedAboutDeprecatedIsAsyncMode = true;
            console["warn"]("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.");
          }
        }
        return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
      }
      function isConcurrentMode(object) {
        return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
      }
      function isContextConsumer(object) {
        return typeOf(object) === REACT_CONTEXT_TYPE;
      }
      function isContextProvider(object) {
        return typeOf(object) === REACT_PROVIDER_TYPE;
      }
      function isElement(object) {
        return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
      }
      function isForwardRef(object) {
        return typeOf(object) === REACT_FORWARD_REF_TYPE;
      }
      function isFragment(object) {
        return typeOf(object) === REACT_FRAGMENT_TYPE;
      }
      function isLazy(object) {
        return typeOf(object) === REACT_LAZY_TYPE;
      }
      function isMemo(object) {
        return typeOf(object) === REACT_MEMO_TYPE;
      }
      function isPortal(object) {
        return typeOf(object) === REACT_PORTAL_TYPE;
      }
      function isProfiler(object) {
        return typeOf(object) === REACT_PROFILER_TYPE;
      }
      function isStrictMode(object) {
        return typeOf(object) === REACT_STRICT_MODE_TYPE;
      }
      function isSuspense(object) {
        return typeOf(object) === REACT_SUSPENSE_TYPE;
      }
      reactIs_development$1.AsyncMode = AsyncMode;
      reactIs_development$1.ConcurrentMode = ConcurrentMode;
      reactIs_development$1.ContextConsumer = ContextConsumer;
      reactIs_development$1.ContextProvider = ContextProvider;
      reactIs_development$1.Element = Element;
      reactIs_development$1.ForwardRef = ForwardRef;
      reactIs_development$1.Fragment = Fragment2;
      reactIs_development$1.Lazy = Lazy;
      reactIs_development$1.Memo = Memo;
      reactIs_development$1.Portal = Portal;
      reactIs_development$1.Profiler = Profiler;
      reactIs_development$1.StrictMode = StrictMode;
      reactIs_development$1.Suspense = Suspense;
      reactIs_development$1.isAsyncMode = isAsyncMode;
      reactIs_development$1.isConcurrentMode = isConcurrentMode;
      reactIs_development$1.isContextConsumer = isContextConsumer;
      reactIs_development$1.isContextProvider = isContextProvider;
      reactIs_development$1.isElement = isElement;
      reactIs_development$1.isForwardRef = isForwardRef;
      reactIs_development$1.isFragment = isFragment;
      reactIs_development$1.isLazy = isLazy;
      reactIs_development$1.isMemo = isMemo;
      reactIs_development$1.isPortal = isPortal;
      reactIs_development$1.isProfiler = isProfiler;
      reactIs_development$1.isStrictMode = isStrictMode;
      reactIs_development$1.isSuspense = isSuspense;
      reactIs_development$1.isValidElementType = isValidElementType;
      reactIs_development$1.typeOf = typeOf;
    })();
  }
  return reactIs_development$1;
}
(function(module) {
  if (process.env.NODE_ENV === "production") {
    module.exports = requireReactIs_production_min$1();
  } else {
    module.exports = requireReactIs_development$1();
  }
})(reactIs$2);
var reactIs$1 = reactIs$2.exports;
var FORWARD_REF_STATICS = {
  "$$typeof": true,
  render: true,
  defaultProps: true,
  displayName: true,
  propTypes: true
};
var MEMO_STATICS = {
  "$$typeof": true,
  compare: true,
  defaultProps: true,
  displayName: true,
  propTypes: true,
  type: true
};
var TYPE_STATICS = {};
TYPE_STATICS[reactIs$1.ForwardRef] = FORWARD_REF_STATICS;
TYPE_STATICS[reactIs$1.Memo] = MEMO_STATICS;
var isBrowser$4 = typeof document !== "undefined";
function getRegisteredStyles(registered, registeredStyles, classNames) {
  var rawClassName = "";
  classNames.split(" ").forEach(function(className) {
    if (registered[className] !== void 0) {
      registeredStyles.push(registered[className] + ";");
    } else {
      rawClassName += className + " ";
    }
  });
  return rawClassName;
}
var registerStyles = function registerStyles2(cache, serialized, isStringTag2) {
  var className = cache.key + "-" + serialized.name;
  if ((isStringTag2 === false || isBrowser$4 === false && cache.compat !== void 0) && cache.registered[className] === void 0) {
    cache.registered[className] = serialized.styles;
  }
};
var insertStyles = function insertStyles2(cache, serialized, isStringTag2) {
  registerStyles(cache, serialized, isStringTag2);
  var className = cache.key + "-" + serialized.name;
  if (cache.inserted[serialized.name] === void 0) {
    var stylesForSSR = "";
    var current = serialized;
    do {
      var maybeStyles = cache.insert(serialized === current ? "." + className : "", current, cache.sheet, true);
      if (!isBrowser$4 && maybeStyles !== void 0) {
        stylesForSSR += maybeStyles;
      }
      current = current.next;
    } while (current !== void 0);
    if (!isBrowser$4 && stylesForSSR.length !== 0) {
      return stylesForSSR;
    }
  }
};
function murmur2(str) {
  var h = 0;
  var k, i = 0, len = str.length;
  for (; len >= 4; ++i, len -= 4) {
    k = str.charCodeAt(i) & 255 | (str.charCodeAt(++i) & 255) << 8 | (str.charCodeAt(++i) & 255) << 16 | (str.charCodeAt(++i) & 255) << 24;
    k = (k & 65535) * 1540483477 + ((k >>> 16) * 59797 << 16);
    k ^= k >>> 24;
    h = (k & 65535) * 1540483477 + ((k >>> 16) * 59797 << 16) ^ (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
  }
  switch (len) {
    case 3:
      h ^= (str.charCodeAt(i + 2) & 255) << 16;
    case 2:
      h ^= (str.charCodeAt(i + 1) & 255) << 8;
    case 1:
      h ^= str.charCodeAt(i) & 255;
      h = (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
  }
  h ^= h >>> 13;
  h = (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
  return ((h ^ h >>> 15) >>> 0).toString(36);
}
var unitlessKeys = {
  animationIterationCount: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};
var ILLEGAL_ESCAPE_SEQUENCE_ERROR$1 = `You have illegal escape sequence in your template literal, most likely inside content's property value.
Because you write your CSS inside a JavaScript string you actually have to do double escaping, so for example "content: '\\00d7';" should become "content: '\\\\00d7';".
You can read more about this here:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences`;
var UNDEFINED_AS_OBJECT_KEY_ERROR = "You have passed in falsy value as style object's key (can happen when in example you pass unexported component as computed key).";
var hyphenateRegex = /[A-Z]|^ms/g;
var animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g;
var isCustomProperty = function isCustomProperty2(property) {
  return property.charCodeAt(1) === 45;
};
var isProcessableValue = function isProcessableValue2(value) {
  return value != null && typeof value !== "boolean";
};
var processStyleName = /* @__PURE__ */ memoize$1(function(styleName) {
  return isCustomProperty(styleName) ? styleName : styleName.replace(hyphenateRegex, "-$&").toLowerCase();
});
var processStyleValue = function processStyleValue2(key, value) {
  switch (key) {
    case "animation":
    case "animationName": {
      if (typeof value === "string") {
        return value.replace(animationRegex, function(match2, p1, p2) {
          cursor = {
            name: p1,
            styles: p2,
            next: cursor
          };
          return p1;
        });
      }
    }
  }
  if (unitlessKeys[key] !== 1 && !isCustomProperty(key) && typeof value === "number" && value !== 0) {
    return value + "px";
  }
  return value;
};
if (process.env.NODE_ENV !== "production") {
  var contentValuePattern = /(var|attr|counters?|url|element|(((repeating-)?(linear|radial))|conic)-gradient)\(|(no-)?(open|close)-quote/;
  var contentValues = ["normal", "none", "initial", "inherit", "unset"];
  var oldProcessStyleValue = processStyleValue;
  var msPattern = /^-ms-/;
  var hyphenPattern = /-(.)/g;
  var hyphenatedCache = {};
  processStyleValue = function processStyleValue3(key, value) {
    if (key === "content") {
      if (typeof value !== "string" || contentValues.indexOf(value) === -1 && !contentValuePattern.test(value) && (value.charAt(0) !== value.charAt(value.length - 1) || value.charAt(0) !== '"' && value.charAt(0) !== "'")) {
        throw new Error("You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"" + value + "\"'`");
      }
    }
    var processed = oldProcessStyleValue(key, value);
    if (processed !== "" && !isCustomProperty(key) && key.indexOf("-") !== -1 && hyphenatedCache[key] === void 0) {
      hyphenatedCache[key] = true;
      console.error("Using kebab-case for css properties in objects is not supported. Did you mean " + key.replace(msPattern, "ms-").replace(hyphenPattern, function(str, _char) {
        return _char.toUpperCase();
      }) + "?");
    }
    return processed;
  };
}
var noComponentSelectorMessage = "Component selectors can only be used in conjunction with @emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware compiler transform.";
function handleInterpolation(mergedProps, registered, interpolation) {
  if (interpolation == null) {
    return "";
  }
  if (interpolation.__emotion_styles !== void 0) {
    if (process.env.NODE_ENV !== "production" && interpolation.toString() === "NO_COMPONENT_SELECTOR") {
      throw new Error(noComponentSelectorMessage);
    }
    return interpolation;
  }
  switch (typeof interpolation) {
    case "boolean": {
      return "";
    }
    case "object": {
      if (interpolation.anim === 1) {
        cursor = {
          name: interpolation.name,
          styles: interpolation.styles,
          next: cursor
        };
        return interpolation.name;
      }
      if (interpolation.styles !== void 0) {
        var next2 = interpolation.next;
        if (next2 !== void 0) {
          while (next2 !== void 0) {
            cursor = {
              name: next2.name,
              styles: next2.styles,
              next: cursor
            };
            next2 = next2.next;
          }
        }
        var styles = interpolation.styles + ";";
        if (process.env.NODE_ENV !== "production" && interpolation.map !== void 0) {
          styles += interpolation.map;
        }
        return styles;
      }
      return createStringFromObject(mergedProps, registered, interpolation);
    }
    case "function": {
      if (mergedProps !== void 0) {
        var previousCursor = cursor;
        var result = interpolation(mergedProps);
        cursor = previousCursor;
        return handleInterpolation(mergedProps, registered, result);
      } else if (process.env.NODE_ENV !== "production") {
        console.error("Functions that are interpolated in css calls will be stringified.\nIf you want to have a css call based on props, create a function that returns a css call like this\nlet dynamicStyle = (props) => css`color: ${props.color}`\nIt can be called directly with props or interpolated in a styled call like this\nlet SomeComponent = styled('div')`${dynamicStyle}`");
      }
      break;
    }
    case "string":
      if (process.env.NODE_ENV !== "production") {
        var matched = [];
        var replaced = interpolation.replace(animationRegex, function(match2, p1, p2) {
          var fakeVarName = "animation" + matched.length;
          matched.push("const " + fakeVarName + " = keyframes`" + p2.replace(/^@keyframes animation-\w+/, "") + "`");
          return "${" + fakeVarName + "}";
        });
        if (matched.length) {
          console.error("`keyframes` output got interpolated into plain string, please wrap it with `css`.\n\nInstead of doing this:\n\n" + [].concat(matched, ["`" + replaced + "`"]).join("\n") + "\n\nYou should wrap it with `css` like this:\n\n" + ("css`" + replaced + "`"));
        }
      }
      break;
  }
  if (registered == null) {
    return interpolation;
  }
  var cached = registered[interpolation];
  return cached !== void 0 ? cached : interpolation;
}
function createStringFromObject(mergedProps, registered, obj) {
  var string = "";
  if (Array.isArray(obj)) {
    for (var i = 0; i < obj.length; i++) {
      string += handleInterpolation(mergedProps, registered, obj[i]) + ";";
    }
  } else {
    for (var _key in obj) {
      var value = obj[_key];
      if (typeof value !== "object") {
        if (registered != null && registered[value] !== void 0) {
          string += _key + "{" + registered[value] + "}";
        } else if (isProcessableValue(value)) {
          string += processStyleName(_key) + ":" + processStyleValue(_key, value) + ";";
        }
      } else {
        if (_key === "NO_COMPONENT_SELECTOR" && process.env.NODE_ENV !== "production") {
          throw new Error(noComponentSelectorMessage);
        }
        if (Array.isArray(value) && typeof value[0] === "string" && (registered == null || registered[value[0]] === void 0)) {
          for (var _i = 0; _i < value.length; _i++) {
            if (isProcessableValue(value[_i])) {
              string += processStyleName(_key) + ":" + processStyleValue(_key, value[_i]) + ";";
            }
          }
        } else {
          var interpolated = handleInterpolation(mergedProps, registered, value);
          switch (_key) {
            case "animation":
            case "animationName": {
              string += processStyleName(_key) + ":" + interpolated + ";";
              break;
            }
            default: {
              if (process.env.NODE_ENV !== "production" && _key === "undefined") {
                console.error(UNDEFINED_AS_OBJECT_KEY_ERROR);
              }
              string += _key + "{" + interpolated + "}";
            }
          }
        }
      }
    }
  }
  return string;
}
var labelPattern = /label:\s*([^\s;\n{]+)\s*(;|$)/g;
var sourceMapPattern;
if (process.env.NODE_ENV !== "production") {
  sourceMapPattern = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//g;
}
var cursor;
var serializeStyles = function serializeStyles2(args, registered, mergedProps) {
  if (args.length === 1 && typeof args[0] === "object" && args[0] !== null && args[0].styles !== void 0) {
    return args[0];
  }
  var stringMode = true;
  var styles = "";
  cursor = void 0;
  var strings = args[0];
  if (strings == null || strings.raw === void 0) {
    stringMode = false;
    styles += handleInterpolation(mergedProps, registered, strings);
  } else {
    if (process.env.NODE_ENV !== "production" && strings[0] === void 0) {
      console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR$1);
    }
    styles += strings[0];
  }
  for (var i = 1; i < args.length; i++) {
    styles += handleInterpolation(mergedProps, registered, args[i]);
    if (stringMode) {
      if (process.env.NODE_ENV !== "production" && strings[i] === void 0) {
        console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR$1);
      }
      styles += strings[i];
    }
  }
  var sourceMap;
  if (process.env.NODE_ENV !== "production") {
    styles = styles.replace(sourceMapPattern, function(match3) {
      sourceMap = match3;
      return "";
    });
  }
  labelPattern.lastIndex = 0;
  var identifierName = "";
  var match2;
  while ((match2 = labelPattern.exec(styles)) !== null) {
    identifierName += "-" + match2[1];
  }
  var name = murmur2(styles) + identifierName;
  if (process.env.NODE_ENV !== "production") {
    return {
      name,
      styles,
      map: sourceMap,
      next: cursor,
      toString: function toString2() {
        return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
      }
    };
  }
  return {
    name,
    styles,
    next: cursor
  };
};
var isBrowser$3 = typeof document !== "undefined";
var syncFallback = function syncFallback2(create) {
  return create();
};
var useInsertionEffect = React["useInsertionEffect"] ? React["useInsertionEffect"] : false;
var useInsertionEffectAlwaysWithSyncFallback = !isBrowser$3 ? syncFallback : useInsertionEffect || syncFallback;
var useInsertionEffectWithLayoutFallback = useInsertionEffect || useLayoutEffect;
var isBrowser$2 = typeof document !== "undefined";
var hasOwnProperty = {}.hasOwnProperty;
var EmotionCacheContext = /* @__PURE__ */ createContext(
  typeof HTMLElement !== "undefined" ? /* @__PURE__ */ createCache({
    key: "css"
  }) : null
);
if (process.env.NODE_ENV !== "production") {
  EmotionCacheContext.displayName = "EmotionCacheContext";
}
EmotionCacheContext.Provider;
var withEmotionCache = function withEmotionCache2(func) {
  return /* @__PURE__ */ forwardRef(function(props, ref) {
    var cache = useContext(EmotionCacheContext);
    return func(props, cache, ref);
  });
};
if (!isBrowser$2) {
  withEmotionCache = function withEmotionCache3(func) {
    return function(props) {
      var cache = useContext(EmotionCacheContext);
      if (cache === null) {
        cache = createCache({
          key: "css"
        });
        return /* @__PURE__ */ createElement(EmotionCacheContext.Provider, {
          value: cache
        }, func(props, cache));
      } else {
        return func(props, cache);
      }
    };
  };
}
var ThemeContext$2 = /* @__PURE__ */ createContext({});
if (process.env.NODE_ENV !== "production") {
  ThemeContext$2.displayName = "EmotionThemeContext";
}
var typePropName = "__EMOTION_TYPE_PLEASE_DO_NOT_USE__";
var labelPropName = "__EMOTION_LABEL_PLEASE_DO_NOT_USE__";
var Insertion$2 = function Insertion(_ref) {
  var cache = _ref.cache, serialized = _ref.serialized, isStringTag2 = _ref.isStringTag;
  registerStyles(cache, serialized, isStringTag2);
  var rules = useInsertionEffectAlwaysWithSyncFallback(function() {
    return insertStyles(cache, serialized, isStringTag2);
  });
  if (!isBrowser$2 && rules !== void 0) {
    var _ref2;
    var serializedNames = serialized.name;
    var next2 = serialized.next;
    while (next2 !== void 0) {
      serializedNames += " " + next2.name;
      next2 = next2.next;
    }
    return /* @__PURE__ */ createElement("style", (_ref2 = {}, _ref2["data-emotion"] = cache.key + " " + serializedNames, _ref2.dangerouslySetInnerHTML = {
      __html: rules
    }, _ref2.nonce = cache.sheet.nonce, _ref2));
  }
  return null;
};
var Emotion = /* @__PURE__ */ withEmotionCache(function(props, cache, ref) {
  var cssProp = props.css;
  if (typeof cssProp === "string" && cache.registered[cssProp] !== void 0) {
    cssProp = cache.registered[cssProp];
  }
  var WrappedComponent = props[typePropName];
  var registeredStyles = [cssProp];
  var className = "";
  if (typeof props.className === "string") {
    className = getRegisteredStyles(cache.registered, registeredStyles, props.className);
  } else if (props.className != null) {
    className = props.className + " ";
  }
  var serialized = serializeStyles(registeredStyles, void 0, useContext(ThemeContext$2));
  if (process.env.NODE_ENV !== "production" && serialized.name.indexOf("-") === -1) {
    var labelFromStack = props[labelPropName];
    if (labelFromStack) {
      serialized = serializeStyles([serialized, "label:" + labelFromStack + ";"]);
    }
  }
  className += cache.key + "-" + serialized.name;
  var newProps = {};
  for (var key in props) {
    if (hasOwnProperty.call(props, key) && key !== "css" && key !== typePropName && (process.env.NODE_ENV === "production" || key !== labelPropName)) {
      newProps[key] = props[key];
    }
  }
  newProps.ref = ref;
  newProps.className = className;
  return /* @__PURE__ */ createElement(Fragment, null, /* @__PURE__ */ createElement(Insertion$2, {
    cache,
    serialized,
    isStringTag: typeof WrappedComponent === "string"
  }), /* @__PURE__ */ createElement(WrappedComponent, newProps));
});
if (process.env.NODE_ENV !== "production") {
  Emotion.displayName = "EmotionCssPropInternal";
}
var pkg = {
  name: "@emotion/react",
  version: "11.10.5",
  main: "dist/emotion-react.cjs.js",
  module: "dist/emotion-react.esm.js",
  browser: {
    "./dist/emotion-react.esm.js": "./dist/emotion-react.browser.esm.js"
  },
  exports: {
    ".": {
      module: {
        worker: "./dist/emotion-react.worker.esm.js",
        browser: "./dist/emotion-react.browser.esm.js",
        "default": "./dist/emotion-react.esm.js"
      },
      "default": "./dist/emotion-react.cjs.js"
    },
    "./jsx-runtime": {
      module: {
        worker: "./jsx-runtime/dist/emotion-react-jsx-runtime.worker.esm.js",
        browser: "./jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js",
        "default": "./jsx-runtime/dist/emotion-react-jsx-runtime.esm.js"
      },
      "default": "./jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js"
    },
    "./_isolated-hnrs": {
      module: {
        worker: "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.worker.esm.js",
        browser: "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.esm.js",
        "default": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.esm.js"
      },
      "default": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.cjs.js"
    },
    "./jsx-dev-runtime": {
      module: {
        worker: "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.worker.esm.js",
        browser: "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.browser.esm.js",
        "default": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.esm.js"
      },
      "default": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.cjs.js"
    },
    "./package.json": "./package.json",
    "./types/css-prop": "./types/css-prop.d.ts",
    "./macro": "./macro.js"
  },
  types: "types/index.d.ts",
  files: [
    "src",
    "dist",
    "jsx-runtime",
    "jsx-dev-runtime",
    "_isolated-hnrs",
    "types/*.d.ts",
    "macro.js",
    "macro.d.ts",
    "macro.js.flow"
  ],
  sideEffects: false,
  author: "Emotion Contributors",
  license: "MIT",
  scripts: {
    "test:typescript": "dtslint types"
  },
  dependencies: {
    "@babel/runtime": "^7.18.3",
    "@emotion/babel-plugin": "^11.10.5",
    "@emotion/cache": "^11.10.5",
    "@emotion/serialize": "^1.1.1",
    "@emotion/use-insertion-effect-with-fallbacks": "^1.0.0",
    "@emotion/utils": "^1.2.0",
    "@emotion/weak-memoize": "^0.3.0",
    "hoist-non-react-statics": "^3.3.1"
  },
  peerDependencies: {
    "@babel/core": "^7.0.0",
    react: ">=16.8.0"
  },
  peerDependenciesMeta: {
    "@babel/core": {
      optional: true
    },
    "@types/react": {
      optional: true
    }
  },
  devDependencies: {
    "@babel/core": "^7.18.5",
    "@definitelytyped/dtslint": "0.0.112",
    "@emotion/css": "11.10.5",
    "@emotion/css-prettifier": "1.1.1",
    "@emotion/server": "11.10.0",
    "@emotion/styled": "11.10.5",
    "html-tag-names": "^1.1.2",
    react: "16.14.0",
    "svg-tag-names": "^1.1.1",
    typescript: "^4.5.5"
  },
  repository: "https://github.com/emotion-js/emotion/tree/main/packages/react",
  publishConfig: {
    access: "public"
  },
  "umd:main": "dist/emotion-react.umd.min.js",
  preconstruct: {
    entrypoints: [
      "./index.js",
      "./jsx-runtime.js",
      "./jsx-dev-runtime.js",
      "./_isolated-hnrs.js"
    ],
    umdName: "emotionReact",
    exports: {
      envConditions: [
        "browser",
        "worker"
      ],
      extra: {
        "./types/css-prop": "./types/css-prop.d.ts",
        "./macro": "./macro.js"
      }
    }
  }
};
var warnedAboutCssPropForGlobal = false;
var Global = /* @__PURE__ */ withEmotionCache(function(props, cache) {
  if (process.env.NODE_ENV !== "production" && !warnedAboutCssPropForGlobal && (props.className || props.css)) {
    console.error("It looks like you're using the css prop on Global, did you mean to use the styles prop instead?");
    warnedAboutCssPropForGlobal = true;
  }
  var styles = props.styles;
  var serialized = serializeStyles([styles], void 0, useContext(ThemeContext$2));
  if (!isBrowser$2) {
    var _ref;
    var serializedNames = serialized.name;
    var serializedStyles = serialized.styles;
    var next2 = serialized.next;
    while (next2 !== void 0) {
      serializedNames += " " + next2.name;
      serializedStyles += next2.styles;
      next2 = next2.next;
    }
    var shouldCache = cache.compat === true;
    var rules = cache.insert("", {
      name: serializedNames,
      styles: serializedStyles
    }, cache.sheet, shouldCache);
    if (shouldCache) {
      return null;
    }
    return /* @__PURE__ */ createElement("style", (_ref = {}, _ref["data-emotion"] = cache.key + "-global " + serializedNames, _ref.dangerouslySetInnerHTML = {
      __html: rules
    }, _ref.nonce = cache.sheet.nonce, _ref));
  }
  var sheetRef = useRef();
  useInsertionEffectWithLayoutFallback(function() {
    var key = cache.key + "-global";
    var sheet = new cache.sheet.constructor({
      key,
      nonce: cache.sheet.nonce,
      container: cache.sheet.container,
      speedy: cache.sheet.isSpeedy
    });
    var rehydrating = false;
    var node2 = document.querySelector('style[data-emotion="' + key + " " + serialized.name + '"]');
    if (cache.sheet.tags.length) {
      sheet.before = cache.sheet.tags[0];
    }
    if (node2 !== null) {
      rehydrating = true;
      node2.setAttribute("data-emotion", key);
      sheet.hydrate([node2]);
    }
    sheetRef.current = [sheet, rehydrating];
    return function() {
      sheet.flush();
    };
  }, [cache]);
  useInsertionEffectWithLayoutFallback(function() {
    var sheetRefCurrent = sheetRef.current;
    var sheet = sheetRefCurrent[0], rehydrating = sheetRefCurrent[1];
    if (rehydrating) {
      sheetRefCurrent[1] = false;
      return;
    }
    if (serialized.next !== void 0) {
      insertStyles(cache, serialized.next, true);
    }
    if (sheet.tags.length) {
      var element = sheet.tags[sheet.tags.length - 1].nextElementSibling;
      sheet.before = element;
      sheet.flush();
    }
    cache.insert("", serialized, sheet, false);
  }, [cache, serialized.name]);
  return null;
});
if (process.env.NODE_ENV !== "production") {
  Global.displayName = "EmotionGlobal";
}
function css() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return serializeStyles(args);
}
var classnames = function classnames2(args) {
  var len = args.length;
  var i = 0;
  var cls = "";
  for (; i < len; i++) {
    var arg = args[i];
    if (arg == null)
      continue;
    var toAdd = void 0;
    switch (typeof arg) {
      case "boolean":
        break;
      case "object": {
        if (Array.isArray(arg)) {
          toAdd = classnames2(arg);
        } else {
          if (process.env.NODE_ENV !== "production" && arg.styles !== void 0 && arg.name !== void 0) {
            console.error("You have passed styles created with `css` from `@emotion/react` package to the `cx`.\n`cx` is meant to compose class names (strings) so you should convert those styles to a class name by passing them to the `css` received from <ClassNames/> component.");
          }
          toAdd = "";
          for (var k in arg) {
            if (arg[k] && k) {
              toAdd && (toAdd += " ");
              toAdd += k;
            }
          }
        }
        break;
      }
      default: {
        toAdd = arg;
      }
    }
    if (toAdd) {
      cls && (cls += " ");
      cls += toAdd;
    }
  }
  return cls;
};
function merge$1(registered, css2, className) {
  var registeredStyles = [];
  var rawClassName = getRegisteredStyles(registered, registeredStyles, className);
  if (registeredStyles.length < 2) {
    return className;
  }
  return rawClassName + css2(registeredStyles);
}
var Insertion$1 = function Insertion2(_ref) {
  var cache = _ref.cache, serializedArr = _ref.serializedArr;
  var rules = useInsertionEffectAlwaysWithSyncFallback(function() {
    var rules2 = "";
    for (var i = 0; i < serializedArr.length; i++) {
      var res = insertStyles(cache, serializedArr[i], false);
      if (!isBrowser$2 && res !== void 0) {
        rules2 += res;
      }
    }
    if (!isBrowser$2) {
      return rules2;
    }
  });
  if (!isBrowser$2 && rules.length !== 0) {
    var _ref2;
    return /* @__PURE__ */ createElement("style", (_ref2 = {}, _ref2["data-emotion"] = cache.key + " " + serializedArr.map(function(serialized) {
      return serialized.name;
    }).join(" "), _ref2.dangerouslySetInnerHTML = {
      __html: rules
    }, _ref2.nonce = cache.sheet.nonce, _ref2));
  }
  return null;
};
var ClassNames = /* @__PURE__ */ withEmotionCache(function(props, cache) {
  var hasRendered = false;
  var serializedArr = [];
  var css2 = function css3() {
    if (hasRendered && process.env.NODE_ENV !== "production") {
      throw new Error("css can only be used during render");
    }
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    var serialized = serializeStyles(args, cache.registered);
    serializedArr.push(serialized);
    registerStyles(cache, serialized, false);
    return cache.key + "-" + serialized.name;
  };
  var cx = function cx2() {
    if (hasRendered && process.env.NODE_ENV !== "production") {
      throw new Error("cx can only be used during render");
    }
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    return merge$1(cache.registered, css2, classnames(args));
  };
  var content = {
    css: css2,
    cx,
    theme: useContext(ThemeContext$2)
  };
  var ele = props.children(content);
  hasRendered = true;
  return /* @__PURE__ */ createElement(Fragment, null, /* @__PURE__ */ createElement(Insertion$1, {
    cache,
    serializedArr
  }), ele);
});
if (process.env.NODE_ENV !== "production") {
  ClassNames.displayName = "EmotionClassNames";
}
if (process.env.NODE_ENV !== "production") {
  var isBrowser$1 = typeof document !== "undefined";
  var isTestEnv = typeof jest !== "undefined" || typeof vi !== "undefined";
  if (isBrowser$1 && !isTestEnv) {
    var globalContext = typeof globalThis !== "undefined" ? globalThis : isBrowser$1 ? window : global;
    var globalKey = "__EMOTION_REACT_" + pkg.version.split(".")[0] + "__";
    if (globalContext[globalKey]) {
      console.warn("You are loading @emotion/react when it is already loaded. Running multiple instances may cause problems. This can happen if multiple versions are used, or if multiple builds of the same version are used.");
    }
    globalContext[globalKey] = true;
  }
}
var testOmitPropsOnStringTag = isPropValid;
var testOmitPropsOnComponent = function testOmitPropsOnComponent2(key) {
  return key !== "theme";
};
var getDefaultShouldForwardProp = function getDefaultShouldForwardProp2(tag) {
  return typeof tag === "string" && tag.charCodeAt(0) > 96 ? testOmitPropsOnStringTag : testOmitPropsOnComponent;
};
var composeShouldForwardProps = function composeShouldForwardProps2(tag, options, isReal) {
  var shouldForwardProp2;
  if (options) {
    var optionsShouldForwardProp = options.shouldForwardProp;
    shouldForwardProp2 = tag.__emotion_forwardProp && optionsShouldForwardProp ? function(propName) {
      return tag.__emotion_forwardProp(propName) && optionsShouldForwardProp(propName);
    } : optionsShouldForwardProp;
  }
  if (typeof shouldForwardProp2 !== "function" && isReal) {
    shouldForwardProp2 = tag.__emotion_forwardProp;
  }
  return shouldForwardProp2;
};
var ILLEGAL_ESCAPE_SEQUENCE_ERROR = `You have illegal escape sequence in your template literal, most likely inside content's property value.
Because you write your CSS inside a JavaScript string you actually have to do double escaping, so for example "content: '\\00d7';" should become "content: '\\\\00d7';".
You can read more about this here:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences`;
var isBrowser = typeof document !== "undefined";
var Insertion3 = function Insertion4(_ref) {
  var cache = _ref.cache, serialized = _ref.serialized, isStringTag2 = _ref.isStringTag;
  registerStyles(cache, serialized, isStringTag2);
  var rules = useInsertionEffectAlwaysWithSyncFallback(function() {
    return insertStyles(cache, serialized, isStringTag2);
  });
  if (!isBrowser && rules !== void 0) {
    var _ref2;
    var serializedNames = serialized.name;
    var next2 = serialized.next;
    while (next2 !== void 0) {
      serializedNames += " " + next2.name;
      next2 = next2.next;
    }
    return /* @__PURE__ */ createElement("style", (_ref2 = {}, _ref2["data-emotion"] = cache.key + " " + serializedNames, _ref2.dangerouslySetInnerHTML = {
      __html: rules
    }, _ref2.nonce = cache.sheet.nonce, _ref2));
  }
  return null;
};
var createStyled$1 = function createStyled(tag, options) {
  if (process.env.NODE_ENV !== "production") {
    if (tag === void 0) {
      throw new Error("You are trying to create a styled element with an undefined component.\nYou may have forgotten to import it.");
    }
  }
  var isReal = tag.__emotion_real === tag;
  var baseTag = isReal && tag.__emotion_base || tag;
  var identifierName;
  var targetClassName;
  if (options !== void 0) {
    identifierName = options.label;
    targetClassName = options.target;
  }
  var shouldForwardProp2 = composeShouldForwardProps(tag, options, isReal);
  var defaultShouldForwardProp = shouldForwardProp2 || getDefaultShouldForwardProp(baseTag);
  var shouldUseAs = !defaultShouldForwardProp("as");
  return function() {
    var args = arguments;
    var styles = isReal && tag.__emotion_styles !== void 0 ? tag.__emotion_styles.slice(0) : [];
    if (identifierName !== void 0) {
      styles.push("label:" + identifierName + ";");
    }
    if (args[0] == null || args[0].raw === void 0) {
      styles.push.apply(styles, args);
    } else {
      if (process.env.NODE_ENV !== "production" && args[0][0] === void 0) {
        console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
      }
      styles.push(args[0][0]);
      var len = args.length;
      var i = 1;
      for (; i < len; i++) {
        if (process.env.NODE_ENV !== "production" && args[0][i] === void 0) {
          console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
        }
        styles.push(args[i], args[0][i]);
      }
    }
    var Styled = withEmotionCache(function(props, cache, ref) {
      var FinalTag = shouldUseAs && props.as || baseTag;
      var className = "";
      var classInterpolations = [];
      var mergedProps = props;
      if (props.theme == null) {
        mergedProps = {};
        for (var key in props) {
          mergedProps[key] = props[key];
        }
        mergedProps.theme = useContext(ThemeContext$2);
      }
      if (typeof props.className === "string") {
        className = getRegisteredStyles(cache.registered, classInterpolations, props.className);
      } else if (props.className != null) {
        className = props.className + " ";
      }
      var serialized = serializeStyles(styles.concat(classInterpolations), cache.registered, mergedProps);
      className += cache.key + "-" + serialized.name;
      if (targetClassName !== void 0) {
        className += " " + targetClassName;
      }
      var finalShouldForwardProp = shouldUseAs && shouldForwardProp2 === void 0 ? getDefaultShouldForwardProp(FinalTag) : defaultShouldForwardProp;
      var newProps = {};
      for (var _key in props) {
        if (shouldUseAs && _key === "as")
          continue;
        if (finalShouldForwardProp(_key)) {
          newProps[_key] = props[_key];
        }
      }
      newProps.className = className;
      newProps.ref = ref;
      return /* @__PURE__ */ createElement(Fragment, null, /* @__PURE__ */ createElement(Insertion3, {
        cache,
        serialized,
        isStringTag: typeof FinalTag === "string"
      }), /* @__PURE__ */ createElement(FinalTag, newProps));
    });
    Styled.displayName = identifierName !== void 0 ? identifierName : "Styled(" + (typeof baseTag === "string" ? baseTag : baseTag.displayName || baseTag.name || "Component") + ")";
    Styled.defaultProps = tag.defaultProps;
    Styled.__emotion_real = Styled;
    Styled.__emotion_base = baseTag;
    Styled.__emotion_styles = styles;
    Styled.__emotion_forwardProp = shouldForwardProp2;
    Object.defineProperty(Styled, "toString", {
      value: function value() {
        if (targetClassName === void 0 && process.env.NODE_ENV !== "production") {
          return "NO_COMPONENT_SELECTOR";
        }
        return "." + targetClassName;
      }
    });
    Styled.withComponent = function(nextTag, nextOptions) {
      return createStyled(nextTag, _extends({}, options, nextOptions, {
        shouldForwardProp: composeShouldForwardProps(Styled, nextOptions, true)
      })).apply(void 0, styles);
    };
    return Styled;
  };
};
var tags = [
  "a",
  "abbr",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "bdi",
  "bdo",
  "big",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "keygen",
  "label",
  "legend",
  "li",
  "link",
  "main",
  "map",
  "mark",
  "marquee",
  "menu",
  "menuitem",
  "meta",
  "meter",
  "nav",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "param",
  "picture",
  "pre",
  "progress",
  "q",
  "rp",
  "rt",
  "ruby",
  "s",
  "samp",
  "script",
  "section",
  "select",
  "small",
  "source",
  "span",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "u",
  "ul",
  "var",
  "video",
  "wbr",
  "circle",
  "clipPath",
  "defs",
  "ellipse",
  "foreignObject",
  "g",
  "image",
  "line",
  "linearGradient",
  "mask",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "radialGradient",
  "rect",
  "stop",
  "svg",
  "text",
  "tspan"
];
var newStyled = createStyled$1.bind();
tags.forEach(function(tagName) {
  newStyled[tagName] = newStyled(tagName);
});
const jsx = jsxRuntime.jsx;
const jsxs = jsxRuntime.jsxs;
function Answer(props) {
  const Item = newStyled.div`
    padding: 1em 0;
    border-top: 1px solid #00000022;
    break-inside: avoid;
  `;
  const Title = newStyled.p`
    margin: 0 0 1em 0;
    font-weight: bold;
  `;
  const checkAnswerProps2 = (props2) => {
    return Object.hasOwn(props2, "title") && Object.hasOwn(props2, "details");
  };
  if (checkAnswerProps2(props)) {
    return /* @__PURE__ */ jsxs(Item, {
      children: [/* @__PURE__ */ jsx(Title, {
        children: lodash_startcase(props.title)
      }), /* @__PURE__ */ jsx(Details, {
        data: props.details
      })]
    });
  }
  return /* @__PURE__ */ jsx("p", {
    children: "[error]"
  });
}
function Details(props) {
  const Empty = newStyled.span`
    color: #00000033;
  `;
  const {
    data
  } = props;
  if (data === null) {
    return /* @__PURE__ */ jsx(Empty, {
      children: "[none]"
    });
  }
  if (data === void 0) {
    return /* @__PURE__ */ jsx(Empty, {
      children: "[empty]"
    });
  }
  if (typeof data === "boolean") {
    return /* @__PURE__ */ jsx("span", {
      children: data ? "true" : "false"
    });
  }
  if (typeof data === "number") {
    return /* @__PURE__ */ jsx("span", {
      children: data
    });
  }
  if (typeof data === "string") {
    return /* @__PURE__ */ jsx("span", {
      children: decodeURI(data)
    });
  }
  if (Array.isArray(data)) {
    return List(data);
  }
  if (typeof data === "object") {
    return Tree(data);
  }
  return /* @__PURE__ */ jsx("p", {
    children: `[error: Unknown detail format for ${typeof data}]`
  });
}
function List(details) {
  if (isListOfNumbersOrStrings(details)) {
    return /* @__PURE__ */ jsx(Details, {
      data: `[${details.join(", ")}]`
    });
  }
  if (isListOfObjectsWithOneKey(details, "value")) {
    if (details.length === 1) {
      return /* @__PURE__ */ jsx(Details, {
        data: details[0]["value"]
      });
    }
    details = details.map((d) => d["value"]);
  }
  return /* @__PURE__ */ jsx("ul", {
    children: details.map((item) => /* @__PURE__ */ jsx("li", {
      children: /* @__PURE__ */ jsx(Details, {
        data: item
      })
    }, JSON.stringify(item)))
  });
}
function Tree(details) {
  return /* @__PURE__ */ jsx("ul", {
    children: Object.keys(details).sort().map((key) => /* @__PURE__ */ jsxs("li", {
      children: [/* @__PURE__ */ jsx("strong", {
        children: lodash_startcase(key)
      }), ": ", /* @__PURE__ */ jsx(Details, {
        data: details[key]
      })]
    }, key))
  });
}
function isListOfNumbersOrStrings(list) {
  return list.every((d) => typeof d === "number" || typeof d === "string");
}
function isListOfObjectsWithOneKey(list, key) {
  return list.every(
    (d) => typeof d === "object" && Object.keys(d).every((k) => k === key)
  );
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source[key];
  }
  return target;
}
var propTypes = { exports: {} };
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var objectAssign;
var hasRequiredObjectAssign;
function requireObjectAssign() {
  if (hasRequiredObjectAssign)
    return objectAssign;
  hasRequiredObjectAssign = 1;
  var getOwnPropertySymbols = Object.getOwnPropertySymbols;
  var hasOwnProperty2 = Object.prototype.hasOwnProperty;
  var propIsEnumerable = Object.prototype.propertyIsEnumerable;
  function toObject(val) {
    if (val === null || val === void 0) {
      throw new TypeError("Object.assign cannot be called with null or undefined");
    }
    return Object(val);
  }
  function shouldUseNative() {
    try {
      if (!Object.assign) {
        return false;
      }
      var test1 = new String("abc");
      test1[5] = "de";
      if (Object.getOwnPropertyNames(test1)[0] === "5") {
        return false;
      }
      var test2 = {};
      for (var i = 0; i < 10; i++) {
        test2["_" + String.fromCharCode(i)] = i;
      }
      var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
        return test2[n];
      });
      if (order2.join("") !== "0123456789") {
        return false;
      }
      var test3 = {};
      "abcdefghijklmnopqrst".split("").forEach(function(letter) {
        test3[letter] = letter;
      });
      if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
        return false;
      }
      return true;
    } catch (err) {
      return false;
    }
  }
  objectAssign = shouldUseNative() ? Object.assign : function(target, source) {
    var from2;
    var to = toObject(target);
    var symbols;
    for (var s = 1; s < arguments.length; s++) {
      from2 = Object(arguments[s]);
      for (var key in from2) {
        if (hasOwnProperty2.call(from2, key)) {
          to[key] = from2[key];
        }
      }
      if (getOwnPropertySymbols) {
        symbols = getOwnPropertySymbols(from2);
        for (var i = 0; i < symbols.length; i++) {
          if (propIsEnumerable.call(from2, symbols[i])) {
            to[symbols[i]] = from2[symbols[i]];
          }
        }
      }
    }
    return to;
  };
  return objectAssign;
}
var ReactPropTypesSecret_1;
var hasRequiredReactPropTypesSecret;
function requireReactPropTypesSecret() {
  if (hasRequiredReactPropTypesSecret)
    return ReactPropTypesSecret_1;
  hasRequiredReactPropTypesSecret = 1;
  var ReactPropTypesSecret = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  ReactPropTypesSecret_1 = ReactPropTypesSecret;
  return ReactPropTypesSecret_1;
}
var has;
var hasRequiredHas;
function requireHas() {
  if (hasRequiredHas)
    return has;
  hasRequiredHas = 1;
  has = Function.call.bind(Object.prototype.hasOwnProperty);
  return has;
}
var checkPropTypes_1;
var hasRequiredCheckPropTypes;
function requireCheckPropTypes() {
  if (hasRequiredCheckPropTypes)
    return checkPropTypes_1;
  hasRequiredCheckPropTypes = 1;
  var printWarning = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var ReactPropTypesSecret = requireReactPropTypesSecret();
    var loggedTypeFailures = {};
    var has2 = requireHas();
    printWarning = function(text) {
      var message = "Warning: " + text;
      if (typeof console !== "undefined") {
        console.error(message);
      }
      try {
        throw new Error(message);
      } catch (x) {
      }
    };
  }
  function checkPropTypes(typeSpecs, values2, location, componentName, getStack) {
    if (process.env.NODE_ENV !== "production") {
      for (var typeSpecName in typeSpecs) {
        if (has2(typeSpecs, typeSpecName)) {
          var error;
          try {
            if (typeof typeSpecs[typeSpecName] !== "function") {
              var err = Error(
                (componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              err.name = "Invariant Violation";
              throw err;
            }
            error = typeSpecs[typeSpecName](values2, typeSpecName, componentName, location, null, ReactPropTypesSecret);
          } catch (ex) {
            error = ex;
          }
          if (error && !(error instanceof Error)) {
            printWarning(
              (componentName || "React class") + ": type specification of " + location + " `" + typeSpecName + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof error + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
            );
          }
          if (error instanceof Error && !(error.message in loggedTypeFailures)) {
            loggedTypeFailures[error.message] = true;
            var stack = getStack ? getStack() : "";
            printWarning(
              "Failed " + location + " type: " + error.message + (stack != null ? stack : "")
            );
          }
        }
      }
    }
  }
  checkPropTypes.resetWarningCache = function() {
    if (process.env.NODE_ENV !== "production") {
      loggedTypeFailures = {};
    }
  };
  checkPropTypes_1 = checkPropTypes;
  return checkPropTypes_1;
}
var factoryWithTypeCheckers;
var hasRequiredFactoryWithTypeCheckers;
function requireFactoryWithTypeCheckers() {
  if (hasRequiredFactoryWithTypeCheckers)
    return factoryWithTypeCheckers;
  hasRequiredFactoryWithTypeCheckers = 1;
  var ReactIs = reactIs$2.exports;
  var assign2 = requireObjectAssign();
  var ReactPropTypesSecret = requireReactPropTypesSecret();
  var has2 = requireHas();
  var checkPropTypes = requireCheckPropTypes();
  var printWarning = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    printWarning = function(text) {
      var message = "Warning: " + text;
      if (typeof console !== "undefined") {
        console.error(message);
      }
      try {
        throw new Error(message);
      } catch (x) {
      }
    };
  }
  function emptyFunctionThatReturnsNull() {
    return null;
  }
  factoryWithTypeCheckers = function(isValidElement, throwOnDirectAccess) {
    var ITERATOR_SYMBOL = typeof Symbol === "function" && Symbol.iterator;
    var FAUX_ITERATOR_SYMBOL = "@@iterator";
    function getIteratorFn(maybeIterable) {
      var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
      if (typeof iteratorFn === "function") {
        return iteratorFn;
      }
    }
    var ANONYMOUS = "<<anonymous>>";
    var ReactPropTypes = {
      array: createPrimitiveTypeChecker("array"),
      bigint: createPrimitiveTypeChecker("bigint"),
      bool: createPrimitiveTypeChecker("boolean"),
      func: createPrimitiveTypeChecker("function"),
      number: createPrimitiveTypeChecker("number"),
      object: createPrimitiveTypeChecker("object"),
      string: createPrimitiveTypeChecker("string"),
      symbol: createPrimitiveTypeChecker("symbol"),
      any: createAnyTypeChecker(),
      arrayOf: createArrayOfTypeChecker,
      element: createElementTypeChecker(),
      elementType: createElementTypeTypeChecker(),
      instanceOf: createInstanceTypeChecker,
      node: createNodeChecker(),
      objectOf: createObjectOfTypeChecker,
      oneOf: createEnumTypeChecker,
      oneOfType: createUnionTypeChecker,
      shape: createShapeTypeChecker,
      exact: createStrictShapeTypeChecker
    };
    function is(x, y) {
      if (x === y) {
        return x !== 0 || 1 / x === 1 / y;
      } else {
        return x !== x && y !== y;
      }
    }
    function PropTypeError(message, data) {
      this.message = message;
      this.data = data && typeof data === "object" ? data : {};
      this.stack = "";
    }
    PropTypeError.prototype = Error.prototype;
    function createChainableTypeChecker(validate) {
      if (process.env.NODE_ENV !== "production") {
        var manualPropTypeCallCache = {};
        var manualPropTypeWarningCount = 0;
      }
      function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
        componentName = componentName || ANONYMOUS;
        propFullName = propFullName || propName;
        if (secret !== ReactPropTypesSecret) {
          if (throwOnDirectAccess) {
            var err = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            err.name = "Invariant Violation";
            throw err;
          } else if (process.env.NODE_ENV !== "production" && typeof console !== "undefined") {
            var cacheKey = componentName + ":" + propName;
            if (!manualPropTypeCallCache[cacheKey] && manualPropTypeWarningCount < 3) {
              printWarning(
                "You are manually calling a React.PropTypes validation function for the `" + propFullName + "` prop on `" + componentName + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
              );
              manualPropTypeCallCache[cacheKey] = true;
              manualPropTypeWarningCount++;
            }
          }
        }
        if (props[propName] == null) {
          if (isRequired) {
            if (props[propName] === null) {
              return new PropTypeError("The " + location + " `" + propFullName + "` is marked as required " + ("in `" + componentName + "`, but its value is `null`."));
            }
            return new PropTypeError("The " + location + " `" + propFullName + "` is marked as required in " + ("`" + componentName + "`, but its value is `undefined`."));
          }
          return null;
        } else {
          return validate(props, propName, componentName, location, propFullName);
        }
      }
      var chainedCheckType = checkType.bind(null, false);
      chainedCheckType.isRequired = checkType.bind(null, true);
      return chainedCheckType;
    }
    function createPrimitiveTypeChecker(expectedType) {
      function validate(props, propName, componentName, location, propFullName, secret) {
        var propValue = props[propName];
        var propType = getPropType(propValue);
        if (propType !== expectedType) {
          var preciseType = getPreciseType(propValue);
          return new PropTypeError(
            "Invalid " + location + " `" + propFullName + "` of type " + ("`" + preciseType + "` supplied to `" + componentName + "`, expected ") + ("`" + expectedType + "`."),
            { expectedType }
          );
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }
    function createAnyTypeChecker() {
      return createChainableTypeChecker(emptyFunctionThatReturnsNull);
    }
    function createArrayOfTypeChecker(typeChecker) {
      function validate(props, propName, componentName, location, propFullName) {
        if (typeof typeChecker !== "function") {
          return new PropTypeError("Property `" + propFullName + "` of component `" + componentName + "` has invalid PropType notation inside arrayOf.");
        }
        var propValue = props[propName];
        if (!Array.isArray(propValue)) {
          var propType = getPropType(propValue);
          return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected an array."));
        }
        for (var i = 0; i < propValue.length; i++) {
          var error = typeChecker(propValue, i, componentName, location, propFullName + "[" + i + "]", ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }
    function createElementTypeChecker() {
      function validate(props, propName, componentName, location, propFullName) {
        var propValue = props[propName];
        if (!isValidElement(propValue)) {
          var propType = getPropType(propValue);
          return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected a single ReactElement."));
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }
    function createElementTypeTypeChecker() {
      function validate(props, propName, componentName, location, propFullName) {
        var propValue = props[propName];
        if (!ReactIs.isValidElementType(propValue)) {
          var propType = getPropType(propValue);
          return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }
    function createInstanceTypeChecker(expectedClass) {
      function validate(props, propName, componentName, location, propFullName) {
        if (!(props[propName] instanceof expectedClass)) {
          var expectedClassName = expectedClass.name || ANONYMOUS;
          var actualClassName = getClassName(props[propName]);
          return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + actualClassName + "` supplied to `" + componentName + "`, expected ") + ("instance of `" + expectedClassName + "`."));
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }
    function createEnumTypeChecker(expectedValues) {
      if (!Array.isArray(expectedValues)) {
        if (process.env.NODE_ENV !== "production") {
          if (arguments.length > 1) {
            printWarning(
              "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
            );
          } else {
            printWarning("Invalid argument supplied to oneOf, expected an array.");
          }
        }
        return emptyFunctionThatReturnsNull;
      }
      function validate(props, propName, componentName, location, propFullName) {
        var propValue = props[propName];
        for (var i = 0; i < expectedValues.length; i++) {
          if (is(propValue, expectedValues[i])) {
            return null;
          }
        }
        var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
          var type = getPreciseType(value);
          if (type === "symbol") {
            return String(value);
          }
          return value;
        });
        return new PropTypeError("Invalid " + location + " `" + propFullName + "` of value `" + String(propValue) + "` " + ("supplied to `" + componentName + "`, expected one of " + valuesString + "."));
      }
      return createChainableTypeChecker(validate);
    }
    function createObjectOfTypeChecker(typeChecker) {
      function validate(props, propName, componentName, location, propFullName) {
        if (typeof typeChecker !== "function") {
          return new PropTypeError("Property `" + propFullName + "` of component `" + componentName + "` has invalid PropType notation inside objectOf.");
        }
        var propValue = props[propName];
        var propType = getPropType(propValue);
        if (propType !== "object") {
          return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected an object."));
        }
        for (var key in propValue) {
          if (has2(propValue, key)) {
            var error = typeChecker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
            if (error instanceof Error) {
              return error;
            }
          }
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }
    function createUnionTypeChecker(arrayOfTypeCheckers) {
      if (!Array.isArray(arrayOfTypeCheckers)) {
        process.env.NODE_ENV !== "production" ? printWarning("Invalid argument supplied to oneOfType, expected an instance of array.") : void 0;
        return emptyFunctionThatReturnsNull;
      }
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (typeof checker !== "function") {
          printWarning(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + getPostfixForTypeWarning(checker) + " at index " + i + "."
          );
          return emptyFunctionThatReturnsNull;
        }
      }
      function validate(props, propName, componentName, location, propFullName) {
        var expectedTypes = [];
        for (var i2 = 0; i2 < arrayOfTypeCheckers.length; i2++) {
          var checker2 = arrayOfTypeCheckers[i2];
          var checkerResult = checker2(props, propName, componentName, location, propFullName, ReactPropTypesSecret);
          if (checkerResult == null) {
            return null;
          }
          if (checkerResult.data && has2(checkerResult.data, "expectedType")) {
            expectedTypes.push(checkerResult.data.expectedType);
          }
        }
        var expectedTypesMessage = expectedTypes.length > 0 ? ", expected one of type [" + expectedTypes.join(", ") + "]" : "";
        return new PropTypeError("Invalid " + location + " `" + propFullName + "` supplied to " + ("`" + componentName + "`" + expectedTypesMessage + "."));
      }
      return createChainableTypeChecker(validate);
    }
    function createNodeChecker() {
      function validate(props, propName, componentName, location, propFullName) {
        if (!isNode(props[propName])) {
          return new PropTypeError("Invalid " + location + " `" + propFullName + "` supplied to " + ("`" + componentName + "`, expected a ReactNode."));
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }
    function invalidValidatorError(componentName, location, propFullName, key, type) {
      return new PropTypeError(
        (componentName || "React class") + ": " + location + " type `" + propFullName + "." + key + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + type + "`."
      );
    }
    function createShapeTypeChecker(shapeTypes) {
      function validate(props, propName, componentName, location, propFullName) {
        var propValue = props[propName];
        var propType = getPropType(propValue);
        if (propType !== "object") {
          return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type `" + propType + "` " + ("supplied to `" + componentName + "`, expected `object`."));
        }
        for (var key in shapeTypes) {
          var checker = shapeTypes[key];
          if (typeof checker !== "function") {
            return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
          }
          var error = checker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
          if (error) {
            return error;
          }
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }
    function createStrictShapeTypeChecker(shapeTypes) {
      function validate(props, propName, componentName, location, propFullName) {
        var propValue = props[propName];
        var propType = getPropType(propValue);
        if (propType !== "object") {
          return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type `" + propType + "` " + ("supplied to `" + componentName + "`, expected `object`."));
        }
        var allKeys = assign2({}, props[propName], shapeTypes);
        for (var key in allKeys) {
          var checker = shapeTypes[key];
          if (has2(shapeTypes, key) && typeof checker !== "function") {
            return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
          }
          if (!checker) {
            return new PropTypeError(
              "Invalid " + location + " `" + propFullName + "` key `" + key + "` supplied to `" + componentName + "`.\nBad object: " + JSON.stringify(props[propName], null, "  ") + "\nValid keys: " + JSON.stringify(Object.keys(shapeTypes), null, "  ")
            );
          }
          var error = checker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
          if (error) {
            return error;
          }
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }
    function isNode(propValue) {
      switch (typeof propValue) {
        case "number":
        case "string":
        case "undefined":
          return true;
        case "boolean":
          return !propValue;
        case "object":
          if (Array.isArray(propValue)) {
            return propValue.every(isNode);
          }
          if (propValue === null || isValidElement(propValue)) {
            return true;
          }
          var iteratorFn = getIteratorFn(propValue);
          if (iteratorFn) {
            var iterator = iteratorFn.call(propValue);
            var step;
            if (iteratorFn !== propValue.entries) {
              while (!(step = iterator.next()).done) {
                if (!isNode(step.value)) {
                  return false;
                }
              }
            } else {
              while (!(step = iterator.next()).done) {
                var entry = step.value;
                if (entry) {
                  if (!isNode(entry[1])) {
                    return false;
                  }
                }
              }
            }
          } else {
            return false;
          }
          return true;
        default:
          return false;
      }
    }
    function isSymbol2(propType, propValue) {
      if (propType === "symbol") {
        return true;
      }
      if (!propValue) {
        return false;
      }
      if (propValue["@@toStringTag"] === "Symbol") {
        return true;
      }
      if (typeof Symbol === "function" && propValue instanceof Symbol) {
        return true;
      }
      return false;
    }
    function getPropType(propValue) {
      var propType = typeof propValue;
      if (Array.isArray(propValue)) {
        return "array";
      }
      if (propValue instanceof RegExp) {
        return "object";
      }
      if (isSymbol2(propType, propValue)) {
        return "symbol";
      }
      return propType;
    }
    function getPreciseType(propValue) {
      if (typeof propValue === "undefined" || propValue === null) {
        return "" + propValue;
      }
      var propType = getPropType(propValue);
      if (propType === "object") {
        if (propValue instanceof Date) {
          return "date";
        } else if (propValue instanceof RegExp) {
          return "regexp";
        }
      }
      return propType;
    }
    function getPostfixForTypeWarning(value) {
      var type = getPreciseType(value);
      switch (type) {
        case "array":
        case "object":
          return "an " + type;
        case "boolean":
        case "date":
        case "regexp":
          return "a " + type;
        default:
          return type;
      }
    }
    function getClassName(propValue) {
      if (!propValue.constructor || !propValue.constructor.name) {
        return ANONYMOUS;
      }
      return propValue.constructor.name;
    }
    ReactPropTypes.checkPropTypes = checkPropTypes;
    ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
    ReactPropTypes.PropTypes = ReactPropTypes;
    return ReactPropTypes;
  };
  return factoryWithTypeCheckers;
}
var factoryWithThrowingShims;
var hasRequiredFactoryWithThrowingShims;
function requireFactoryWithThrowingShims() {
  if (hasRequiredFactoryWithThrowingShims)
    return factoryWithThrowingShims;
  hasRequiredFactoryWithThrowingShims = 1;
  var ReactPropTypesSecret = requireReactPropTypesSecret();
  function emptyFunction() {
  }
  function emptyFunctionWithReset() {
  }
  emptyFunctionWithReset.resetWarningCache = emptyFunction;
  factoryWithThrowingShims = function() {
    function shim(props, propName, componentName, location, propFullName, secret) {
      if (secret === ReactPropTypesSecret) {
        return;
      }
      var err = new Error(
        "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
      );
      err.name = "Invariant Violation";
      throw err;
    }
    shim.isRequired = shim;
    function getShim() {
      return shim;
    }
    var ReactPropTypes = {
      array: shim,
      bigint: shim,
      bool: shim,
      func: shim,
      number: shim,
      object: shim,
      string: shim,
      symbol: shim,
      any: shim,
      arrayOf: getShim,
      element: shim,
      elementType: shim,
      instanceOf: getShim,
      node: shim,
      objectOf: getShim,
      oneOf: getShim,
      oneOfType: getShim,
      shape: getShim,
      exact: getShim,
      checkPropTypes: emptyFunctionWithReset,
      resetWarningCache: emptyFunction
    };
    ReactPropTypes.PropTypes = ReactPropTypes;
    return ReactPropTypes;
  };
  return factoryWithThrowingShims;
}
if (process.env.NODE_ENV !== "production") {
  var ReactIs = reactIs$2.exports;
  var throwOnDirectAccess = true;
  propTypes.exports = requireFactoryWithTypeCheckers()(ReactIs.isElement, throwOnDirectAccess);
} else {
  propTypes.exports = requireFactoryWithThrowingShims()();
}
function r(e) {
  var t, f, n = "";
  if ("string" == typeof e || "number" == typeof e)
    n += e;
  else if ("object" == typeof e)
    if (Array.isArray(e))
      for (t = 0; t < e.length; t++)
        e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
    else
      for (t in e)
        e[t] && (n && (n += " "), n += t);
  return n;
}
function clsx() {
  for (var e, t, f = 0, n = ""; f < arguments.length; )
    (e = arguments[f++]) && (t = r(e)) && (n && (n += " "), n += t);
  return n;
}
/** @license MUI v5.10.16
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
function styled$2(tag, options) {
  const stylesFactory = newStyled(tag, options);
  if (process.env.NODE_ENV !== "production") {
    return (...styles) => {
      const component = typeof tag === "string" ? `"${tag}"` : "component";
      if (styles.length === 0) {
        console.error([`MUI: Seems like you called \`styled(${component})()\` without a \`style\` argument.`, 'You must provide a `styles` argument: `styled("div")(styleYouForgotToPass)`.'].join("\n"));
      } else if (styles.some((style2) => style2 === void 0)) {
        console.error(`MUI: the styled(${component})(...args) API requires all its args to be defined.`);
      }
      return stylesFactory(...styles);
    };
  }
  return stylesFactory;
}
const internal_processStyles = (tag, processor) => {
  if (Array.isArray(tag.__emotion_styles)) {
    tag.__emotion_styles = processor(tag.__emotion_styles);
  }
};
const responsivePropType = process.env.NODE_ENV !== "production" ? propTypes.exports.oneOfType([propTypes.exports.number, propTypes.exports.string, propTypes.exports.object, propTypes.exports.array]) : {};
const responsivePropType$1 = responsivePropType;
function isPlainObject(item) {
  return item !== null && typeof item === "object" && item.constructor === Object;
}
function deepmerge(target, source, options = {
  clone: true
}) {
  const output = options.clone ? _extends({}, target) : target;
  if (isPlainObject(target) && isPlainObject(source)) {
    Object.keys(source).forEach((key) => {
      if (key === "__proto__") {
        return;
      }
      if (isPlainObject(source[key]) && key in target && isPlainObject(target[key])) {
        output[key] = deepmerge(target[key], source[key], options);
      } else {
        output[key] = source[key];
      }
    });
  }
  return output;
}
function formatMuiErrorMessage(code) {
  let url = "https://mui.com/production-error/?code=" + code;
  for (let i = 1; i < arguments.length; i += 1) {
    url += "&args[]=" + encodeURIComponent(arguments[i]);
  }
  return "Minified MUI error #" + code + "; visit " + url + " for the full message.";
}
var reactIs = { exports: {} };
var reactIs_production_min = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReactIs_production_min;
function requireReactIs_production_min() {
  if (hasRequiredReactIs_production_min)
    return reactIs_production_min;
  hasRequiredReactIs_production_min = 1;
  var b = Symbol.for("react.element"), c = Symbol.for("react.portal"), d = Symbol.for("react.fragment"), e = Symbol.for("react.strict_mode"), f = Symbol.for("react.profiler"), g = Symbol.for("react.provider"), h = Symbol.for("react.context"), k = Symbol.for("react.server_context"), l = Symbol.for("react.forward_ref"), m = Symbol.for("react.suspense"), n = Symbol.for("react.suspense_list"), p = Symbol.for("react.memo"), q = Symbol.for("react.lazy"), t = Symbol.for("react.offscreen"), u;
  u = Symbol.for("react.module.reference");
  function v(a) {
    if ("object" === typeof a && null !== a) {
      var r2 = a.$$typeof;
      switch (r2) {
        case b:
          switch (a = a.type, a) {
            case d:
            case f:
            case e:
            case m:
            case n:
              return a;
            default:
              switch (a = a && a.$$typeof, a) {
                case k:
                case h:
                case l:
                case q:
                case p:
                case g:
                  return a;
                default:
                  return r2;
              }
          }
        case c:
          return r2;
      }
    }
  }
  reactIs_production_min.ContextConsumer = h;
  reactIs_production_min.ContextProvider = g;
  reactIs_production_min.Element = b;
  reactIs_production_min.ForwardRef = l;
  reactIs_production_min.Fragment = d;
  reactIs_production_min.Lazy = q;
  reactIs_production_min.Memo = p;
  reactIs_production_min.Portal = c;
  reactIs_production_min.Profiler = f;
  reactIs_production_min.StrictMode = e;
  reactIs_production_min.Suspense = m;
  reactIs_production_min.SuspenseList = n;
  reactIs_production_min.isAsyncMode = function() {
    return false;
  };
  reactIs_production_min.isConcurrentMode = function() {
    return false;
  };
  reactIs_production_min.isContextConsumer = function(a) {
    return v(a) === h;
  };
  reactIs_production_min.isContextProvider = function(a) {
    return v(a) === g;
  };
  reactIs_production_min.isElement = function(a) {
    return "object" === typeof a && null !== a && a.$$typeof === b;
  };
  reactIs_production_min.isForwardRef = function(a) {
    return v(a) === l;
  };
  reactIs_production_min.isFragment = function(a) {
    return v(a) === d;
  };
  reactIs_production_min.isLazy = function(a) {
    return v(a) === q;
  };
  reactIs_production_min.isMemo = function(a) {
    return v(a) === p;
  };
  reactIs_production_min.isPortal = function(a) {
    return v(a) === c;
  };
  reactIs_production_min.isProfiler = function(a) {
    return v(a) === f;
  };
  reactIs_production_min.isStrictMode = function(a) {
    return v(a) === e;
  };
  reactIs_production_min.isSuspense = function(a) {
    return v(a) === m;
  };
  reactIs_production_min.isSuspenseList = function(a) {
    return v(a) === n;
  };
  reactIs_production_min.isValidElementType = function(a) {
    return "string" === typeof a || "function" === typeof a || a === d || a === f || a === e || a === m || a === n || a === t || "object" === typeof a && null !== a && (a.$$typeof === q || a.$$typeof === p || a.$$typeof === g || a.$$typeof === h || a.$$typeof === l || a.$$typeof === u || void 0 !== a.getModuleId) ? true : false;
  };
  reactIs_production_min.typeOf = v;
  return reactIs_production_min;
}
var reactIs_development = {};
/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReactIs_development;
function requireReactIs_development() {
  if (hasRequiredReactIs_development)
    return reactIs_development;
  hasRequiredReactIs_development = 1;
  if (process.env.NODE_ENV !== "production") {
    (function() {
      var REACT_ELEMENT_TYPE = Symbol.for("react.element");
      var REACT_PORTAL_TYPE = Symbol.for("react.portal");
      var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
      var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
      var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
      var REACT_PROVIDER_TYPE = Symbol.for("react.provider");
      var REACT_CONTEXT_TYPE = Symbol.for("react.context");
      var REACT_SERVER_CONTEXT_TYPE = Symbol.for("react.server_context");
      var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
      var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
      var REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list");
      var REACT_MEMO_TYPE = Symbol.for("react.memo");
      var REACT_LAZY_TYPE = Symbol.for("react.lazy");
      var REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen");
      var enableScopeAPI = false;
      var enableCacheElement = false;
      var enableTransitionTracing = false;
      var enableLegacyHidden = false;
      var enableDebugTracing = false;
      var REACT_MODULE_REFERENCE;
      {
        REACT_MODULE_REFERENCE = Symbol.for("react.module.reference");
      }
      function isValidElementType(type) {
        if (typeof type === "string" || typeof type === "function") {
          return true;
        }
        if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden || type === REACT_OFFSCREEN_TYPE || enableScopeAPI || enableCacheElement || enableTransitionTracing) {
          return true;
        }
        if (typeof type === "object" && type !== null) {
          if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== void 0) {
            return true;
          }
        }
        return false;
      }
      function typeOf(object) {
        if (typeof object === "object" && object !== null) {
          var $$typeof = object.$$typeof;
          switch ($$typeof) {
            case REACT_ELEMENT_TYPE:
              var type = object.type;
              switch (type) {
                case REACT_FRAGMENT_TYPE:
                case REACT_PROFILER_TYPE:
                case REACT_STRICT_MODE_TYPE:
                case REACT_SUSPENSE_TYPE:
                case REACT_SUSPENSE_LIST_TYPE:
                  return type;
                default:
                  var $$typeofType = type && type.$$typeof;
                  switch ($$typeofType) {
                    case REACT_SERVER_CONTEXT_TYPE:
                    case REACT_CONTEXT_TYPE:
                    case REACT_FORWARD_REF_TYPE:
                    case REACT_LAZY_TYPE:
                    case REACT_MEMO_TYPE:
                    case REACT_PROVIDER_TYPE:
                      return $$typeofType;
                    default:
                      return $$typeof;
                  }
              }
            case REACT_PORTAL_TYPE:
              return $$typeof;
          }
        }
        return void 0;
      }
      var ContextConsumer = REACT_CONTEXT_TYPE;
      var ContextProvider = REACT_PROVIDER_TYPE;
      var Element = REACT_ELEMENT_TYPE;
      var ForwardRef = REACT_FORWARD_REF_TYPE;
      var Fragment2 = REACT_FRAGMENT_TYPE;
      var Lazy = REACT_LAZY_TYPE;
      var Memo = REACT_MEMO_TYPE;
      var Portal = REACT_PORTAL_TYPE;
      var Profiler = REACT_PROFILER_TYPE;
      var StrictMode = REACT_STRICT_MODE_TYPE;
      var Suspense = REACT_SUSPENSE_TYPE;
      var SuspenseList = REACT_SUSPENSE_LIST_TYPE;
      var hasWarnedAboutDeprecatedIsAsyncMode = false;
      var hasWarnedAboutDeprecatedIsConcurrentMode = false;
      function isAsyncMode(object) {
        {
          if (!hasWarnedAboutDeprecatedIsAsyncMode) {
            hasWarnedAboutDeprecatedIsAsyncMode = true;
            console["warn"]("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.");
          }
        }
        return false;
      }
      function isConcurrentMode(object) {
        {
          if (!hasWarnedAboutDeprecatedIsConcurrentMode) {
            hasWarnedAboutDeprecatedIsConcurrentMode = true;
            console["warn"]("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.");
          }
        }
        return false;
      }
      function isContextConsumer(object) {
        return typeOf(object) === REACT_CONTEXT_TYPE;
      }
      function isContextProvider(object) {
        return typeOf(object) === REACT_PROVIDER_TYPE;
      }
      function isElement(object) {
        return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
      }
      function isForwardRef(object) {
        return typeOf(object) === REACT_FORWARD_REF_TYPE;
      }
      function isFragment(object) {
        return typeOf(object) === REACT_FRAGMENT_TYPE;
      }
      function isLazy(object) {
        return typeOf(object) === REACT_LAZY_TYPE;
      }
      function isMemo(object) {
        return typeOf(object) === REACT_MEMO_TYPE;
      }
      function isPortal(object) {
        return typeOf(object) === REACT_PORTAL_TYPE;
      }
      function isProfiler(object) {
        return typeOf(object) === REACT_PROFILER_TYPE;
      }
      function isStrictMode(object) {
        return typeOf(object) === REACT_STRICT_MODE_TYPE;
      }
      function isSuspense(object) {
        return typeOf(object) === REACT_SUSPENSE_TYPE;
      }
      function isSuspenseList(object) {
        return typeOf(object) === REACT_SUSPENSE_LIST_TYPE;
      }
      reactIs_development.ContextConsumer = ContextConsumer;
      reactIs_development.ContextProvider = ContextProvider;
      reactIs_development.Element = Element;
      reactIs_development.ForwardRef = ForwardRef;
      reactIs_development.Fragment = Fragment2;
      reactIs_development.Lazy = Lazy;
      reactIs_development.Memo = Memo;
      reactIs_development.Portal = Portal;
      reactIs_development.Profiler = Profiler;
      reactIs_development.StrictMode = StrictMode;
      reactIs_development.Suspense = Suspense;
      reactIs_development.SuspenseList = SuspenseList;
      reactIs_development.isAsyncMode = isAsyncMode;
      reactIs_development.isConcurrentMode = isConcurrentMode;
      reactIs_development.isContextConsumer = isContextConsumer;
      reactIs_development.isContextProvider = isContextProvider;
      reactIs_development.isElement = isElement;
      reactIs_development.isForwardRef = isForwardRef;
      reactIs_development.isFragment = isFragment;
      reactIs_development.isLazy = isLazy;
      reactIs_development.isMemo = isMemo;
      reactIs_development.isPortal = isPortal;
      reactIs_development.isProfiler = isProfiler;
      reactIs_development.isStrictMode = isStrictMode;
      reactIs_development.isSuspense = isSuspense;
      reactIs_development.isSuspenseList = isSuspenseList;
      reactIs_development.isValidElementType = isValidElementType;
      reactIs_development.typeOf = typeOf;
    })();
  }
  return reactIs_development;
}
(function(module) {
  if (process.env.NODE_ENV === "production") {
    module.exports = requireReactIs_production_min();
  } else {
    module.exports = requireReactIs_development();
  }
})(reactIs);
const fnNameMatchRegex = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function getFunctionName(fn) {
  const match2 = `${fn}`.match(fnNameMatchRegex);
  const name = match2 && match2[1];
  return name || "";
}
function getFunctionComponentName(Component, fallback = "") {
  return Component.displayName || Component.name || getFunctionName(Component) || fallback;
}
function getWrappedName(outerType, innerType, wrapperName) {
  const functionName = getFunctionComponentName(innerType);
  return outerType.displayName || (functionName !== "" ? `${wrapperName}(${functionName})` : wrapperName);
}
function getDisplayName(Component) {
  if (Component == null) {
    return void 0;
  }
  if (typeof Component === "string") {
    return Component;
  }
  if (typeof Component === "function") {
    return getFunctionComponentName(Component, "Component");
  }
  if (typeof Component === "object") {
    switch (Component.$$typeof) {
      case reactIs.exports.ForwardRef:
        return getWrappedName(Component, Component.render, "ForwardRef");
      case reactIs.exports.Memo:
        return getWrappedName(Component, Component.type, "memo");
      default:
        return void 0;
    }
  }
  return void 0;
}
function capitalize(string) {
  if (typeof string !== "string") {
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: \`capitalize(string)\` expects a string argument.` : formatMuiErrorMessage(7));
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function requirePropFactory(componentNameInError, Component) {
  if (process.env.NODE_ENV === "production") {
    return () => null;
  }
  const prevPropTypes = Component ? _extends({}, Component.propTypes) : null;
  const requireProp = (requiredProp) => (props, propName, componentName, location, propFullName, ...args) => {
    const propFullNameSafe = propFullName || propName;
    const defaultTypeChecker = prevPropTypes == null ? void 0 : prevPropTypes[propFullNameSafe];
    if (defaultTypeChecker) {
      const typeCheckerResult = defaultTypeChecker(props, propName, componentName, location, propFullName, ...args);
      if (typeCheckerResult) {
        return typeCheckerResult;
      }
    }
    if (typeof props[propName] !== "undefined" && !props[requiredProp]) {
      return new Error(`The prop \`${propFullNameSafe}\` of \`${componentNameInError}\` can only be used together with the \`${requiredProp}\` prop.`);
    }
    return null;
  };
  return requireProp;
}
function resolveProps(defaultProps, props) {
  const output = _extends({}, props);
  Object.keys(defaultProps).forEach((propName) => {
    if (output[propName] === void 0) {
      output[propName] = defaultProps[propName];
    }
  });
  return output;
}
function composeClasses(slots, getUtilityClass, classes) {
  const output = {};
  Object.keys(slots).forEach(
    (slot) => {
      output[slot] = slots[slot].reduce((acc, key) => {
        if (key) {
          acc.push(getUtilityClass(key));
          if (classes && classes[key]) {
            acc.push(classes[key]);
          }
        }
        return acc;
      }, []).join(" ");
    }
  );
  return output;
}
const defaultGenerator = (componentName) => componentName;
const createClassNameGenerator = () => {
  let generate = defaultGenerator;
  return {
    configure(generator) {
      generate = generator;
    },
    generate(componentName) {
      return generate(componentName);
    },
    reset() {
      generate = defaultGenerator;
    }
  };
};
const ClassNameGenerator = createClassNameGenerator();
const ClassNameGenerator$1 = ClassNameGenerator;
const globalStateClassesMapping = {
  active: "active",
  checked: "checked",
  completed: "completed",
  disabled: "disabled",
  error: "error",
  expanded: "expanded",
  focused: "focused",
  focusVisible: "focusVisible",
  required: "required",
  selected: "selected"
};
function generateUtilityClass(componentName, slot, globalStatePrefix = "Mui") {
  const globalStateClass = globalStateClassesMapping[slot];
  return globalStateClass ? `${globalStatePrefix}-${globalStateClass}` : `${ClassNameGenerator$1.generate(componentName)}-${slot}`;
}
function generateUtilityClasses(componentName, slots, globalStatePrefix = "Mui") {
  const result = {};
  slots.forEach((slot) => {
    result[slot] = generateUtilityClass(componentName, slot, globalStatePrefix);
  });
  return result;
}
function merge(acc, item) {
  if (!item) {
    return acc;
  }
  return deepmerge(acc, item, {
    clone: false
  });
}
const values = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536
};
const defaultBreakpoints = {
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: (key) => `@media (min-width:${values[key]}px)`
};
function handleBreakpoints(props, propValue, styleFromPropValue) {
  const theme = props.theme || {};
  if (Array.isArray(propValue)) {
    const themeBreakpoints = theme.breakpoints || defaultBreakpoints;
    return propValue.reduce((acc, item, index) => {
      acc[themeBreakpoints.up(themeBreakpoints.keys[index])] = styleFromPropValue(propValue[index]);
      return acc;
    }, {});
  }
  if (typeof propValue === "object") {
    const themeBreakpoints = theme.breakpoints || defaultBreakpoints;
    return Object.keys(propValue).reduce((acc, breakpoint) => {
      if (Object.keys(themeBreakpoints.values || values).indexOf(breakpoint) !== -1) {
        const mediaKey = themeBreakpoints.up(breakpoint);
        acc[mediaKey] = styleFromPropValue(propValue[breakpoint], breakpoint);
      } else {
        const cssKey = breakpoint;
        acc[cssKey] = propValue[cssKey];
      }
      return acc;
    }, {});
  }
  const output = styleFromPropValue(propValue);
  return output;
}
function createEmptyBreakpointObject(breakpointsInput = {}) {
  var _breakpointsInput$key;
  const breakpointsInOrder = (_breakpointsInput$key = breakpointsInput.keys) == null ? void 0 : _breakpointsInput$key.reduce((acc, key) => {
    const breakpointStyleKey = breakpointsInput.up(key);
    acc[breakpointStyleKey] = {};
    return acc;
  }, {});
  return breakpointsInOrder || {};
}
function removeUnusedBreakpoints(breakpointKeys, style2) {
  return breakpointKeys.reduce((acc, key) => {
    const breakpointOutput = acc[key];
    const isBreakpointUnused = !breakpointOutput || Object.keys(breakpointOutput).length === 0;
    if (isBreakpointUnused) {
      delete acc[key];
    }
    return acc;
  }, style2);
}
function computeBreakpointsBase(breakpointValues, themeBreakpoints) {
  if (typeof breakpointValues !== "object") {
    return {};
  }
  const base = {};
  const breakpointsKeys = Object.keys(themeBreakpoints);
  if (Array.isArray(breakpointValues)) {
    breakpointsKeys.forEach((breakpoint, i) => {
      if (i < breakpointValues.length) {
        base[breakpoint] = true;
      }
    });
  } else {
    breakpointsKeys.forEach((breakpoint) => {
      if (breakpointValues[breakpoint] != null) {
        base[breakpoint] = true;
      }
    });
  }
  return base;
}
function resolveBreakpointValues({
  values: breakpointValues,
  breakpoints: themeBreakpoints,
  base: customBase
}) {
  const base = customBase || computeBreakpointsBase(breakpointValues, themeBreakpoints);
  const keys = Object.keys(base);
  if (keys.length === 0) {
    return breakpointValues;
  }
  let previous;
  return keys.reduce((acc, breakpoint, i) => {
    if (Array.isArray(breakpointValues)) {
      acc[breakpoint] = breakpointValues[i] != null ? breakpointValues[i] : breakpointValues[previous];
      previous = i;
    } else if (typeof breakpointValues === "object") {
      acc[breakpoint] = breakpointValues[breakpoint] != null ? breakpointValues[breakpoint] : breakpointValues[previous];
      previous = breakpoint;
    } else {
      acc[breakpoint] = breakpointValues;
    }
    return acc;
  }, {});
}
function getPath(obj, path, checkVars = true) {
  if (!path || typeof path !== "string") {
    return null;
  }
  if (obj && obj.vars && checkVars) {
    const val = `vars.${path}`.split(".").reduce((acc, item) => acc && acc[item] ? acc[item] : null, obj);
    if (val != null) {
      return val;
    }
  }
  return path.split(".").reduce((acc, item) => {
    if (acc && acc[item] != null) {
      return acc[item];
    }
    return null;
  }, obj);
}
function getStyleValue(themeMapping, transform2, propValueFinal, userValue = propValueFinal) {
  let value;
  if (typeof themeMapping === "function") {
    value = themeMapping(propValueFinal);
  } else if (Array.isArray(themeMapping)) {
    value = themeMapping[propValueFinal] || userValue;
  } else {
    value = getPath(themeMapping, propValueFinal) || userValue;
  }
  if (transform2) {
    value = transform2(value, userValue);
  }
  return value;
}
function style$1(options) {
  const {
    prop,
    cssProperty = options.prop,
    themeKey,
    transform: transform2
  } = options;
  const fn = (props) => {
    if (props[prop] == null) {
      return null;
    }
    const propValue = props[prop];
    const theme = props.theme;
    const themeMapping = getPath(theme, themeKey) || {};
    const styleFromPropValue = (propValueFinal) => {
      let value = getStyleValue(themeMapping, transform2, propValueFinal);
      if (propValueFinal === value && typeof propValueFinal === "string") {
        value = getStyleValue(themeMapping, transform2, `${prop}${propValueFinal === "default" ? "" : capitalize(propValueFinal)}`, propValueFinal);
      }
      if (cssProperty === false) {
        return value;
      }
      return {
        [cssProperty]: value
      };
    };
    return handleBreakpoints(props, propValue, styleFromPropValue);
  };
  fn.propTypes = process.env.NODE_ENV !== "production" ? {
    [prop]: responsivePropType$1
  } : {};
  fn.filterProps = [prop];
  return fn;
}
function compose(...styles) {
  const handlers = styles.reduce((acc, style2) => {
    style2.filterProps.forEach((prop) => {
      acc[prop] = style2;
    });
    return acc;
  }, {});
  const fn = (props) => {
    return Object.keys(props).reduce((acc, prop) => {
      if (handlers[prop]) {
        return merge(acc, handlers[prop](props));
      }
      return acc;
    }, {});
  };
  fn.propTypes = process.env.NODE_ENV !== "production" ? styles.reduce((acc, style2) => Object.assign(acc, style2.propTypes), {}) : {};
  fn.filterProps = styles.reduce((acc, style2) => acc.concat(style2.filterProps), []);
  return fn;
}
function memoize(fn) {
  const cache = {};
  return (arg) => {
    if (cache[arg] === void 0) {
      cache[arg] = fn(arg);
    }
    return cache[arg];
  };
}
const properties = {
  m: "margin",
  p: "padding"
};
const directions = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
};
const aliases = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
};
const getCssProperties = memoize((prop) => {
  if (prop.length > 2) {
    if (aliases[prop]) {
      prop = aliases[prop];
    } else {
      return [prop];
    }
  }
  const [a, b] = prop.split("");
  const property = properties[a];
  const direction = directions[b] || "";
  return Array.isArray(direction) ? direction.map((dir) => property + dir) : [property + direction];
});
const marginKeys = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"];
const paddingKeys = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"];
const spacingKeys = [...marginKeys, ...paddingKeys];
function createUnaryUnit(theme, themeKey, defaultValue, propName) {
  var _getPath;
  const themeSpacing = (_getPath = getPath(theme, themeKey, false)) != null ? _getPath : defaultValue;
  if (typeof themeSpacing === "number") {
    return (abs2) => {
      if (typeof abs2 === "string") {
        return abs2;
      }
      if (process.env.NODE_ENV !== "production") {
        if (typeof abs2 !== "number") {
          console.error(`MUI: Expected ${propName} argument to be a number or a string, got ${abs2}.`);
        }
      }
      return themeSpacing * abs2;
    };
  }
  if (Array.isArray(themeSpacing)) {
    return (abs2) => {
      if (typeof abs2 === "string") {
        return abs2;
      }
      if (process.env.NODE_ENV !== "production") {
        if (!Number.isInteger(abs2)) {
          console.error([`MUI: The \`theme.${themeKey}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${themeKey}\` as a number.`].join("\n"));
        } else if (abs2 > themeSpacing.length - 1) {
          console.error([`MUI: The value provided (${abs2}) overflows.`, `The supported values are: ${JSON.stringify(themeSpacing)}.`, `${abs2} > ${themeSpacing.length - 1}, you need to add the missing values.`].join("\n"));
        }
      }
      return themeSpacing[abs2];
    };
  }
  if (typeof themeSpacing === "function") {
    return themeSpacing;
  }
  if (process.env.NODE_ENV !== "production") {
    console.error([`MUI: The \`theme.${themeKey}\` value (${themeSpacing}) is invalid.`, "It should be a number, an array or a function."].join("\n"));
  }
  return () => void 0;
}
function createUnarySpacing(theme) {
  return createUnaryUnit(theme, "spacing", 8, "spacing");
}
function getValue(transformer, propValue) {
  if (typeof propValue === "string" || propValue == null) {
    return propValue;
  }
  const abs2 = Math.abs(propValue);
  const transformed = transformer(abs2);
  if (propValue >= 0) {
    return transformed;
  }
  if (typeof transformed === "number") {
    return -transformed;
  }
  return `-${transformed}`;
}
function getStyleFromPropValue(cssProperties, transformer) {
  return (propValue) => cssProperties.reduce((acc, cssProperty) => {
    acc[cssProperty] = getValue(transformer, propValue);
    return acc;
  }, {});
}
function resolveCssProperty(props, keys, prop, transformer) {
  if (keys.indexOf(prop) === -1) {
    return null;
  }
  const cssProperties = getCssProperties(prop);
  const styleFromPropValue = getStyleFromPropValue(cssProperties, transformer);
  const propValue = props[prop];
  return handleBreakpoints(props, propValue, styleFromPropValue);
}
function style(props, keys) {
  const transformer = createUnarySpacing(props.theme);
  return Object.keys(props).map((prop) => resolveCssProperty(props, keys, prop, transformer)).reduce(merge, {});
}
process.env.NODE_ENV !== "production" ? marginKeys.reduce((obj, key) => {
  obj[key] = responsivePropType$1;
  return obj;
}, {}) : {};
process.env.NODE_ENV !== "production" ? paddingKeys.reduce((obj, key) => {
  obj[key] = responsivePropType$1;
  return obj;
}, {}) : {};
function spacing(props) {
  return style(props, spacingKeys);
}
spacing.propTypes = process.env.NODE_ENV !== "production" ? spacingKeys.reduce((obj, key) => {
  obj[key] = responsivePropType$1;
  return obj;
}, {}) : {};
spacing.filterProps = spacingKeys;
function getBorder(value) {
  if (typeof value !== "number") {
    return value;
  }
  return `${value}px solid`;
}
const border = style$1({
  prop: "border",
  themeKey: "borders",
  transform: getBorder
});
const borderTop = style$1({
  prop: "borderTop",
  themeKey: "borders",
  transform: getBorder
});
const borderRight = style$1({
  prop: "borderRight",
  themeKey: "borders",
  transform: getBorder
});
const borderBottom = style$1({
  prop: "borderBottom",
  themeKey: "borders",
  transform: getBorder
});
const borderLeft = style$1({
  prop: "borderLeft",
  themeKey: "borders",
  transform: getBorder
});
const borderColor = style$1({
  prop: "borderColor",
  themeKey: "palette"
});
const borderTopColor = style$1({
  prop: "borderTopColor",
  themeKey: "palette"
});
const borderRightColor = style$1({
  prop: "borderRightColor",
  themeKey: "palette"
});
const borderBottomColor = style$1({
  prop: "borderBottomColor",
  themeKey: "palette"
});
const borderLeftColor = style$1({
  prop: "borderLeftColor",
  themeKey: "palette"
});
const borderRadius = (props) => {
  if (props.borderRadius !== void 0 && props.borderRadius !== null) {
    const transformer = createUnaryUnit(props.theme, "shape.borderRadius", 4, "borderRadius");
    const styleFromPropValue = (propValue) => ({
      borderRadius: getValue(transformer, propValue)
    });
    return handleBreakpoints(props, props.borderRadius, styleFromPropValue);
  }
  return null;
};
borderRadius.propTypes = process.env.NODE_ENV !== "production" ? {
  borderRadius: responsivePropType$1
} : {};
borderRadius.filterProps = ["borderRadius"];
const borders = compose(border, borderTop, borderRight, borderBottom, borderLeft, borderColor, borderTopColor, borderRightColor, borderBottomColor, borderLeftColor, borderRadius);
const borders$1 = borders;
const displayPrint = style$1({
  prop: "displayPrint",
  cssProperty: false,
  transform: (value) => ({
    "@media print": {
      display: value
    }
  })
});
const displayRaw = style$1({
  prop: "display"
});
const overflow = style$1({
  prop: "overflow"
});
const textOverflow = style$1({
  prop: "textOverflow"
});
const visibility = style$1({
  prop: "visibility"
});
const whiteSpace = style$1({
  prop: "whiteSpace"
});
const display = compose(displayPrint, displayRaw, overflow, textOverflow, visibility, whiteSpace);
const flexBasis = style$1({
  prop: "flexBasis"
});
const flexDirection = style$1({
  prop: "flexDirection"
});
const flexWrap = style$1({
  prop: "flexWrap"
});
const justifyContent = style$1({
  prop: "justifyContent"
});
const alignItems = style$1({
  prop: "alignItems"
});
const alignContent = style$1({
  prop: "alignContent"
});
const order = style$1({
  prop: "order"
});
const flex = style$1({
  prop: "flex"
});
const flexGrow = style$1({
  prop: "flexGrow"
});
const flexShrink = style$1({
  prop: "flexShrink"
});
const alignSelf = style$1({
  prop: "alignSelf"
});
const justifyItems = style$1({
  prop: "justifyItems"
});
const justifySelf = style$1({
  prop: "justifySelf"
});
const flexbox = compose(flexBasis, flexDirection, flexWrap, justifyContent, alignItems, alignContent, order, flex, flexGrow, flexShrink, alignSelf, justifyItems, justifySelf);
const flexbox$1 = flexbox;
const gap = (props) => {
  if (props.gap !== void 0 && props.gap !== null) {
    const transformer = createUnaryUnit(props.theme, "spacing", 8, "gap");
    const styleFromPropValue = (propValue) => ({
      gap: getValue(transformer, propValue)
    });
    return handleBreakpoints(props, props.gap, styleFromPropValue);
  }
  return null;
};
gap.propTypes = process.env.NODE_ENV !== "production" ? {
  gap: responsivePropType$1
} : {};
gap.filterProps = ["gap"];
const columnGap = (props) => {
  if (props.columnGap !== void 0 && props.columnGap !== null) {
    const transformer = createUnaryUnit(props.theme, "spacing", 8, "columnGap");
    const styleFromPropValue = (propValue) => ({
      columnGap: getValue(transformer, propValue)
    });
    return handleBreakpoints(props, props.columnGap, styleFromPropValue);
  }
  return null;
};
columnGap.propTypes = process.env.NODE_ENV !== "production" ? {
  columnGap: responsivePropType$1
} : {};
columnGap.filterProps = ["columnGap"];
const rowGap = (props) => {
  if (props.rowGap !== void 0 && props.rowGap !== null) {
    const transformer = createUnaryUnit(props.theme, "spacing", 8, "rowGap");
    const styleFromPropValue = (propValue) => ({
      rowGap: getValue(transformer, propValue)
    });
    return handleBreakpoints(props, props.rowGap, styleFromPropValue);
  }
  return null;
};
rowGap.propTypes = process.env.NODE_ENV !== "production" ? {
  rowGap: responsivePropType$1
} : {};
rowGap.filterProps = ["rowGap"];
const gridColumn = style$1({
  prop: "gridColumn"
});
const gridRow = style$1({
  prop: "gridRow"
});
const gridAutoFlow = style$1({
  prop: "gridAutoFlow"
});
const gridAutoColumns = style$1({
  prop: "gridAutoColumns"
});
const gridAutoRows = style$1({
  prop: "gridAutoRows"
});
const gridTemplateColumns = style$1({
  prop: "gridTemplateColumns"
});
const gridTemplateRows = style$1({
  prop: "gridTemplateRows"
});
const gridTemplateAreas = style$1({
  prop: "gridTemplateAreas"
});
const gridArea = style$1({
  prop: "gridArea"
});
const grid = compose(gap, columnGap, rowGap, gridColumn, gridRow, gridAutoFlow, gridAutoColumns, gridAutoRows, gridTemplateColumns, gridTemplateRows, gridTemplateAreas, gridArea);
const grid$1 = grid;
function transform$1(value, userValue) {
  if (userValue === "grey") {
    return userValue;
  }
  return value;
}
const color = style$1({
  prop: "color",
  themeKey: "palette",
  transform: transform$1
});
const bgcolor = style$1({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: transform$1
});
const backgroundColor = style$1({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: transform$1
});
const palette = compose(color, bgcolor, backgroundColor);
const palette$1 = palette;
const position = style$1({
  prop: "position"
});
const zIndex$2 = style$1({
  prop: "zIndex",
  themeKey: "zIndex"
});
const top = style$1({
  prop: "top"
});
const right = style$1({
  prop: "right"
});
const bottom = style$1({
  prop: "bottom"
});
const left = style$1({
  prop: "left"
});
const positions = compose(position, zIndex$2, top, right, bottom, left);
const boxShadow = style$1({
  prop: "boxShadow",
  themeKey: "shadows"
});
const shadows$2 = boxShadow;
function transform(value) {
  return value <= 1 && value !== 0 ? `${value * 100}%` : value;
}
const width = style$1({
  prop: "width",
  transform
});
const maxWidth = (props) => {
  if (props.maxWidth !== void 0 && props.maxWidth !== null) {
    const styleFromPropValue = (propValue) => {
      var _props$theme, _props$theme$breakpoi, _props$theme$breakpoi2;
      const breakpoint = ((_props$theme = props.theme) == null ? void 0 : (_props$theme$breakpoi = _props$theme.breakpoints) == null ? void 0 : (_props$theme$breakpoi2 = _props$theme$breakpoi.values) == null ? void 0 : _props$theme$breakpoi2[propValue]) || values[propValue];
      return {
        maxWidth: breakpoint || transform(propValue)
      };
    };
    return handleBreakpoints(props, props.maxWidth, styleFromPropValue);
  }
  return null;
};
maxWidth.filterProps = ["maxWidth"];
const minWidth = style$1({
  prop: "minWidth",
  transform
});
const height = style$1({
  prop: "height",
  transform
});
const maxHeight = style$1({
  prop: "maxHeight",
  transform
});
const minHeight = style$1({
  prop: "minHeight",
  transform
});
style$1({
  prop: "size",
  cssProperty: "width",
  transform
});
style$1({
  prop: "size",
  cssProperty: "height",
  transform
});
const boxSizing = style$1({
  prop: "boxSizing"
});
const sizing = compose(width, maxWidth, minWidth, height, maxHeight, minHeight, boxSizing);
const sizing$1 = sizing;
const fontFamily = style$1({
  prop: "fontFamily",
  themeKey: "typography"
});
const fontSize = style$1({
  prop: "fontSize",
  themeKey: "typography"
});
const fontStyle = style$1({
  prop: "fontStyle",
  themeKey: "typography"
});
const fontWeight = style$1({
  prop: "fontWeight",
  themeKey: "typography"
});
const letterSpacing = style$1({
  prop: "letterSpacing"
});
const textTransform = style$1({
  prop: "textTransform"
});
const lineHeight = style$1({
  prop: "lineHeight"
});
const textAlign = style$1({
  prop: "textAlign"
});
const typographyVariant = style$1({
  prop: "typography",
  cssProperty: false,
  themeKey: "typography"
});
const typography = compose(typographyVariant, fontFamily, fontSize, fontStyle, fontWeight, letterSpacing, lineHeight, textAlign, textTransform);
const typography$1 = typography;
const filterPropsMapping = {
  borders: borders$1.filterProps,
  display: display.filterProps,
  flexbox: flexbox$1.filterProps,
  grid: grid$1.filterProps,
  positions: positions.filterProps,
  palette: palette$1.filterProps,
  shadows: shadows$2.filterProps,
  sizing: sizing$1.filterProps,
  spacing: spacing.filterProps,
  typography: typography$1.filterProps
};
const styleFunctionMapping = {
  borders: borders$1,
  display,
  flexbox: flexbox$1,
  grid: grid$1,
  positions,
  palette: palette$1,
  shadows: shadows$2,
  sizing: sizing$1,
  spacing,
  typography: typography$1
};
const propToStyleFunction = Object.keys(filterPropsMapping).reduce((acc, styleFnName) => {
  filterPropsMapping[styleFnName].forEach((propName) => {
    acc[propName] = styleFunctionMapping[styleFnName];
  });
  return acc;
}, {});
function objectsHaveSameKeys(...objects) {
  const allKeys = objects.reduce((keys, object) => keys.concat(Object.keys(object)), []);
  const union = new Set(allKeys);
  return objects.every((object) => union.size === Object.keys(object).length);
}
function callIfFn(maybeFn, arg) {
  return typeof maybeFn === "function" ? maybeFn(arg) : maybeFn;
}
function unstable_createStyleFunctionSx(styleFunctionMapping$1 = styleFunctionMapping) {
  const propToStyleFunction2 = Object.keys(styleFunctionMapping$1).reduce((acc, styleFnName) => {
    styleFunctionMapping$1[styleFnName].filterProps.forEach((propName) => {
      acc[propName] = styleFunctionMapping$1[styleFnName];
    });
    return acc;
  }, {});
  function getThemeValue(prop, value, theme) {
    const inputProps = {
      [prop]: value,
      theme
    };
    const styleFunction = propToStyleFunction2[prop];
    return styleFunction ? styleFunction(inputProps) : {
      [prop]: value
    };
  }
  function styleFunctionSx2(props) {
    const {
      sx,
      theme = {}
    } = props || {};
    if (!sx) {
      return null;
    }
    function traverse(sxInput) {
      let sxObject = sxInput;
      if (typeof sxInput === "function") {
        sxObject = sxInput(theme);
      } else if (typeof sxInput !== "object") {
        return sxInput;
      }
      if (!sxObject) {
        return null;
      }
      const emptyBreakpoints = createEmptyBreakpointObject(theme.breakpoints);
      const breakpointsKeys = Object.keys(emptyBreakpoints);
      let css2 = emptyBreakpoints;
      Object.keys(sxObject).forEach((styleKey) => {
        const value = callIfFn(sxObject[styleKey], theme);
        if (value !== null && value !== void 0) {
          if (typeof value === "object") {
            if (propToStyleFunction2[styleKey]) {
              css2 = merge(css2, getThemeValue(styleKey, value, theme));
            } else {
              const breakpointsValues = handleBreakpoints({
                theme
              }, value, (x) => ({
                [styleKey]: x
              }));
              if (objectsHaveSameKeys(breakpointsValues, value)) {
                css2[styleKey] = styleFunctionSx2({
                  sx: value,
                  theme
                });
              } else {
                css2 = merge(css2, breakpointsValues);
              }
            }
          } else {
            css2 = merge(css2, getThemeValue(styleKey, value, theme));
          }
        }
      });
      return removeUnusedBreakpoints(breakpointsKeys, css2);
    }
    return Array.isArray(sx) ? sx.map(traverse) : traverse(sx);
  }
  return styleFunctionSx2;
}
const styleFunctionSx = unstable_createStyleFunctionSx();
styleFunctionSx.filterProps = ["sx"];
const defaultStyleFunctionSx = styleFunctionSx;
const _excluded$9 = ["sx"];
const splitProps = (props) => {
  const result = {
    systemProps: {},
    otherProps: {}
  };
  Object.keys(props).forEach((prop) => {
    if (propToStyleFunction[prop]) {
      result.systemProps[prop] = props[prop];
    } else {
      result.otherProps[prop] = props[prop];
    }
  });
  return result;
};
function extendSxProp(props) {
  const {
    sx: inSx
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$9);
  const {
    systemProps,
    otherProps
  } = splitProps(other);
  let finalSx;
  if (Array.isArray(inSx)) {
    finalSx = [systemProps, ...inSx];
  } else if (typeof inSx === "function") {
    finalSx = (...args) => {
      const result = inSx(...args);
      if (!isPlainObject(result)) {
        return systemProps;
      }
      return _extends({}, systemProps, result);
    };
  } else {
    finalSx = _extends({}, systemProps, inSx);
  }
  return _extends({}, otherProps, {
    sx: finalSx
  });
}
const _excluded$8 = ["values", "unit", "step"];
const sortBreakpointsValues = (values2) => {
  const breakpointsAsArray = Object.keys(values2).map((key) => ({
    key,
    val: values2[key]
  })) || [];
  breakpointsAsArray.sort((breakpoint1, breakpoint2) => breakpoint1.val - breakpoint2.val);
  return breakpointsAsArray.reduce((acc, obj) => {
    return _extends({}, acc, {
      [obj.key]: obj.val
    });
  }, {});
};
function createBreakpoints(breakpoints) {
  const {
    values: values2 = {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536
    },
    unit = "px",
    step = 5
  } = breakpoints, other = _objectWithoutPropertiesLoose(breakpoints, _excluded$8);
  const sortedValues = sortBreakpointsValues(values2);
  const keys = Object.keys(sortedValues);
  function up(key) {
    const value = typeof values2[key] === "number" ? values2[key] : key;
    return `@media (min-width:${value}${unit})`;
  }
  function down(key) {
    const value = typeof values2[key] === "number" ? values2[key] : key;
    return `@media (max-width:${value - step / 100}${unit})`;
  }
  function between(start, end) {
    const endIndex = keys.indexOf(end);
    return `@media (min-width:${typeof values2[start] === "number" ? values2[start] : start}${unit}) and (max-width:${(endIndex !== -1 && typeof values2[keys[endIndex]] === "number" ? values2[keys[endIndex]] : end) - step / 100}${unit})`;
  }
  function only(key) {
    if (keys.indexOf(key) + 1 < keys.length) {
      return between(key, keys[keys.indexOf(key) + 1]);
    }
    return up(key);
  }
  function not(key) {
    const keyIndex = keys.indexOf(key);
    if (keyIndex === 0) {
      return up(keys[1]);
    }
    if (keyIndex === keys.length - 1) {
      return down(keys[keyIndex]);
    }
    return between(key, keys[keys.indexOf(key) + 1]).replace("@media", "@media not all and");
  }
  return _extends({
    keys,
    values: sortedValues,
    up,
    down,
    between,
    only,
    not,
    unit
  }, other);
}
const shape = {
  borderRadius: 4
};
const shape$1 = shape;
function createSpacing(spacingInput = 8) {
  if (spacingInput.mui) {
    return spacingInput;
  }
  const transform2 = createUnarySpacing({
    spacing: spacingInput
  });
  const spacing2 = (...argsInput) => {
    if (process.env.NODE_ENV !== "production") {
      if (!(argsInput.length <= 4)) {
        console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${argsInput.length}`);
      }
    }
    const args = argsInput.length === 0 ? [1] : argsInput;
    return args.map((argument) => {
      const output = transform2(argument);
      return typeof output === "number" ? `${output}px` : output;
    }).join(" ");
  };
  spacing2.mui = true;
  return spacing2;
}
const _excluded$7 = ["breakpoints", "palette", "spacing", "shape"];
function createTheme$1(options = {}, ...args) {
  const {
    breakpoints: breakpointsInput = {},
    palette: paletteInput = {},
    spacing: spacingInput,
    shape: shapeInput = {}
  } = options, other = _objectWithoutPropertiesLoose(options, _excluded$7);
  const breakpoints = createBreakpoints(breakpointsInput);
  const spacing2 = createSpacing(spacingInput);
  let muiTheme = deepmerge({
    breakpoints,
    direction: "ltr",
    components: {},
    palette: _extends({
      mode: "light"
    }, paletteInput),
    spacing: spacing2,
    shape: _extends({}, shape$1, shapeInput)
  }, other);
  muiTheme = args.reduce((acc, argument) => deepmerge(acc, argument), muiTheme);
  return muiTheme;
}
const ThemeContext = /* @__PURE__ */ React.createContext(null);
if (process.env.NODE_ENV !== "production") {
  ThemeContext.displayName = "ThemeContext";
}
const ThemeContext$1 = ThemeContext;
function useTheme$3() {
  const theme = React.useContext(ThemeContext$1);
  if (process.env.NODE_ENV !== "production") {
    React.useDebugValue(theme);
  }
  return theme;
}
function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}
function useTheme$2(defaultTheme2 = null) {
  const contextTheme = useTheme$3();
  return !contextTheme || isObjectEmpty(contextTheme) ? defaultTheme2 : contextTheme;
}
const systemDefaultTheme$1 = createTheme$1();
function useTheme$1(defaultTheme2 = systemDefaultTheme$1) {
  return useTheme$2(defaultTheme2);
}
const _excluded$6 = ["variant"];
function isEmpty$1(string) {
  return string.length === 0;
}
function propsToClassKey(props) {
  const {
    variant
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$6);
  let classKey = variant || "";
  Object.keys(other).sort().forEach((key) => {
    if (key === "color") {
      classKey += isEmpty$1(classKey) ? props[key] : capitalize(props[key]);
    } else {
      classKey += `${isEmpty$1(classKey) ? key : capitalize(key)}${capitalize(props[key].toString())}`;
    }
  });
  return classKey;
}
const _excluded$5 = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"], _excluded2 = ["theme"], _excluded3 = ["theme"];
function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}
function isStringTag(tag) {
  return typeof tag === "string" && tag.charCodeAt(0) > 96;
}
const getStyleOverrides = (name, theme) => {
  if (theme.components && theme.components[name] && theme.components[name].styleOverrides) {
    return theme.components[name].styleOverrides;
  }
  return null;
};
const getVariantStyles = (name, theme) => {
  let variants = [];
  if (theme && theme.components && theme.components[name] && theme.components[name].variants) {
    variants = theme.components[name].variants;
  }
  const variantsStyles = {};
  variants.forEach((definition) => {
    const key = propsToClassKey(definition.props);
    variantsStyles[key] = definition.style;
  });
  return variantsStyles;
};
const variantsResolver = (props, styles, theme, name) => {
  var _theme$components, _theme$components$nam;
  const {
    ownerState = {}
  } = props;
  const variantsStyles = [];
  const themeVariants = theme == null ? void 0 : (_theme$components = theme.components) == null ? void 0 : (_theme$components$nam = _theme$components[name]) == null ? void 0 : _theme$components$nam.variants;
  if (themeVariants) {
    themeVariants.forEach((themeVariant) => {
      let isMatch = true;
      Object.keys(themeVariant.props).forEach((key) => {
        if (ownerState[key] !== themeVariant.props[key] && props[key] !== themeVariant.props[key]) {
          isMatch = false;
        }
      });
      if (isMatch) {
        variantsStyles.push(styles[propsToClassKey(themeVariant.props)]);
      }
    });
  }
  return variantsStyles;
};
function shouldForwardProp(prop) {
  return prop !== "ownerState" && prop !== "theme" && prop !== "sx" && prop !== "as";
}
const systemDefaultTheme = createTheme$1();
const lowercaseFirstLetter = (string) => {
  return string.charAt(0).toLowerCase() + string.slice(1);
};
function createStyled2(input = {}) {
  const {
    defaultTheme: defaultTheme2 = systemDefaultTheme,
    rootShouldForwardProp: rootShouldForwardProp2 = shouldForwardProp,
    slotShouldForwardProp = shouldForwardProp,
    styleFunctionSx: styleFunctionSx2 = defaultStyleFunctionSx
  } = input;
  const systemSx = (props) => {
    const theme = isEmpty(props.theme) ? defaultTheme2 : props.theme;
    return styleFunctionSx2(_extends({}, props, {
      theme
    }));
  };
  systemSx.__mui_systemSx = true;
  return (tag, inputOptions = {}) => {
    internal_processStyles(tag, (styles) => styles.filter((style2) => !(style2 != null && style2.__mui_systemSx)));
    const {
      name: componentName,
      slot: componentSlot,
      skipVariantsResolver: inputSkipVariantsResolver,
      skipSx: inputSkipSx,
      overridesResolver
    } = inputOptions, options = _objectWithoutPropertiesLoose(inputOptions, _excluded$5);
    const skipVariantsResolver = inputSkipVariantsResolver !== void 0 ? inputSkipVariantsResolver : componentSlot && componentSlot !== "Root" || false;
    const skipSx = inputSkipSx || false;
    let label;
    if (process.env.NODE_ENV !== "production") {
      if (componentName) {
        label = `${componentName}-${lowercaseFirstLetter(componentSlot || "Root")}`;
      }
    }
    let shouldForwardPropOption = shouldForwardProp;
    if (componentSlot === "Root") {
      shouldForwardPropOption = rootShouldForwardProp2;
    } else if (componentSlot) {
      shouldForwardPropOption = slotShouldForwardProp;
    } else if (isStringTag(tag)) {
      shouldForwardPropOption = void 0;
    }
    const defaultStyledResolver = styled$2(tag, _extends({
      shouldForwardProp: shouldForwardPropOption,
      label
    }, options));
    const muiStyledResolver = (styleArg, ...expressions) => {
      const expressionsWithDefaultTheme = expressions ? expressions.map((stylesArg) => {
        return typeof stylesArg === "function" && stylesArg.__emotion_real !== stylesArg ? (_ref) => {
          let {
            theme: themeInput
          } = _ref, other = _objectWithoutPropertiesLoose(_ref, _excluded2);
          return stylesArg(_extends({
            theme: isEmpty(themeInput) ? defaultTheme2 : themeInput
          }, other));
        } : stylesArg;
      }) : [];
      let transformedStyleArg = styleArg;
      if (componentName && overridesResolver) {
        expressionsWithDefaultTheme.push((props) => {
          const theme = isEmpty(props.theme) ? defaultTheme2 : props.theme;
          const styleOverrides = getStyleOverrides(componentName, theme);
          if (styleOverrides) {
            const resolvedStyleOverrides = {};
            Object.entries(styleOverrides).forEach(([slotKey, slotStyle]) => {
              resolvedStyleOverrides[slotKey] = typeof slotStyle === "function" ? slotStyle(_extends({}, props, {
                theme
              })) : slotStyle;
            });
            return overridesResolver(props, resolvedStyleOverrides);
          }
          return null;
        });
      }
      if (componentName && !skipVariantsResolver) {
        expressionsWithDefaultTheme.push((props) => {
          const theme = isEmpty(props.theme) ? defaultTheme2 : props.theme;
          return variantsResolver(props, getVariantStyles(componentName, theme), theme, componentName);
        });
      }
      if (!skipSx) {
        expressionsWithDefaultTheme.push(systemSx);
      }
      const numOfCustomFnsApplied = expressionsWithDefaultTheme.length - expressions.length;
      if (Array.isArray(styleArg) && numOfCustomFnsApplied > 0) {
        const placeholders = new Array(numOfCustomFnsApplied).fill("");
        transformedStyleArg = [...styleArg, ...placeholders];
        transformedStyleArg.raw = [...styleArg.raw, ...placeholders];
      } else if (typeof styleArg === "function" && styleArg.__emotion_real !== styleArg) {
        transformedStyleArg = (_ref2) => {
          let {
            theme: themeInput
          } = _ref2, other = _objectWithoutPropertiesLoose(_ref2, _excluded3);
          return styleArg(_extends({
            theme: isEmpty(themeInput) ? defaultTheme2 : themeInput
          }, other));
        };
      }
      const Component = defaultStyledResolver(transformedStyleArg, ...expressionsWithDefaultTheme);
      if (process.env.NODE_ENV !== "production") {
        let displayName;
        if (componentName) {
          displayName = `${componentName}${componentSlot || ""}`;
        }
        if (displayName === void 0) {
          displayName = `Styled(${getDisplayName(tag)})`;
        }
        Component.displayName = displayName;
      }
      return Component;
    };
    if (defaultStyledResolver.withConfig) {
      muiStyledResolver.withConfig = defaultStyledResolver.withConfig;
    }
    return muiStyledResolver;
  };
}
function getThemeProps(params) {
  const {
    theme,
    name,
    props
  } = params;
  if (!theme || !theme.components || !theme.components[name] || !theme.components[name].defaultProps) {
    return props;
  }
  return resolveProps(theme.components[name].defaultProps, props);
}
function useThemeProps$1({
  props,
  name,
  defaultTheme: defaultTheme2
}) {
  const theme = useTheme$1(defaultTheme2);
  const mergedProps = getThemeProps({
    theme,
    name,
    props
  });
  return mergedProps;
}
function clamp(value, min = 0, max = 1) {
  if (process.env.NODE_ENV !== "production") {
    if (value < min || value > max) {
      console.error(`MUI: The value provided ${value} is out of range [${min}, ${max}].`);
    }
  }
  return Math.min(Math.max(min, value), max);
}
function hexToRgb(color2) {
  color2 = color2.slice(1);
  const re = new RegExp(`.{1,${color2.length >= 6 ? 2 : 1}}`, "g");
  let colors = color2.match(re);
  if (colors && colors[0].length === 1) {
    colors = colors.map((n) => n + n);
  }
  return colors ? `rgb${colors.length === 4 ? "a" : ""}(${colors.map((n, index) => {
    return index < 3 ? parseInt(n, 16) : Math.round(parseInt(n, 16) / 255 * 1e3) / 1e3;
  }).join(", ")})` : "";
}
function decomposeColor(color2) {
  if (color2.type) {
    return color2;
  }
  if (color2.charAt(0) === "#") {
    return decomposeColor(hexToRgb(color2));
  }
  const marker = color2.indexOf("(");
  const type = color2.substring(0, marker);
  if (["rgb", "rgba", "hsl", "hsla", "color"].indexOf(type) === -1) {
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: Unsupported \`${color2}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` : formatMuiErrorMessage(9, color2));
  }
  let values2 = color2.substring(marker + 1, color2.length - 1);
  let colorSpace;
  if (type === "color") {
    values2 = values2.split(" ");
    colorSpace = values2.shift();
    if (values2.length === 4 && values2[3].charAt(0) === "/") {
      values2[3] = values2[3].slice(1);
    }
    if (["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].indexOf(colorSpace) === -1) {
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: unsupported \`${colorSpace}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.` : formatMuiErrorMessage(10, colorSpace));
    }
  } else {
    values2 = values2.split(",");
  }
  values2 = values2.map((value) => parseFloat(value));
  return {
    type,
    values: values2,
    colorSpace
  };
}
function recomposeColor(color2) {
  const {
    type,
    colorSpace
  } = color2;
  let {
    values: values2
  } = color2;
  if (type.indexOf("rgb") !== -1) {
    values2 = values2.map((n, i) => i < 3 ? parseInt(n, 10) : n);
  } else if (type.indexOf("hsl") !== -1) {
    values2[1] = `${values2[1]}%`;
    values2[2] = `${values2[2]}%`;
  }
  if (type.indexOf("color") !== -1) {
    values2 = `${colorSpace} ${values2.join(" ")}`;
  } else {
    values2 = `${values2.join(", ")}`;
  }
  return `${type}(${values2})`;
}
function hslToRgb(color2) {
  color2 = decomposeColor(color2);
  const {
    values: values2
  } = color2;
  const h = values2[0];
  const s = values2[1] / 100;
  const l = values2[2] / 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  let type = "rgb";
  const rgb = [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
  if (color2.type === "hsla") {
    type += "a";
    rgb.push(values2[3]);
  }
  return recomposeColor({
    type,
    values: rgb
  });
}
function getLuminance(color2) {
  color2 = decomposeColor(color2);
  let rgb = color2.type === "hsl" || color2.type === "hsla" ? decomposeColor(hslToRgb(color2)).values : color2.values;
  rgb = rgb.map((val) => {
    if (color2.type !== "color") {
      val /= 255;
    }
    return val <= 0.03928 ? val / 12.92 : ((val + 0.055) / 1.055) ** 2.4;
  });
  return Number((0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]).toFixed(3));
}
function getContrastRatio(foreground, background) {
  const lumA = getLuminance(foreground);
  const lumB = getLuminance(background);
  return (Math.max(lumA, lumB) + 0.05) / (Math.min(lumA, lumB) + 0.05);
}
function darken(color2, coefficient) {
  color2 = decomposeColor(color2);
  coefficient = clamp(coefficient);
  if (color2.type.indexOf("hsl") !== -1) {
    color2.values[2] *= 1 - coefficient;
  } else if (color2.type.indexOf("rgb") !== -1 || color2.type.indexOf("color") !== -1) {
    for (let i = 0; i < 3; i += 1) {
      color2.values[i] *= 1 - coefficient;
    }
  }
  return recomposeColor(color2);
}
function lighten(color2, coefficient) {
  color2 = decomposeColor(color2);
  coefficient = clamp(coefficient);
  if (color2.type.indexOf("hsl") !== -1) {
    color2.values[2] += (100 - color2.values[2]) * coefficient;
  } else if (color2.type.indexOf("rgb") !== -1) {
    for (let i = 0; i < 3; i += 1) {
      color2.values[i] += (255 - color2.values[i]) * coefficient;
    }
  } else if (color2.type.indexOf("color") !== -1) {
    for (let i = 0; i < 3; i += 1) {
      color2.values[i] += (1 - color2.values[i]) * coefficient;
    }
  }
  return recomposeColor(color2);
}
function createMixins(breakpoints, mixins) {
  return _extends({
    toolbar: {
      minHeight: 56,
      [breakpoints.up("xs")]: {
        "@media (orientation: landscape)": {
          minHeight: 48
        }
      },
      [breakpoints.up("sm")]: {
        minHeight: 64
      }
    }
  }, mixins);
}
const common = {
  black: "#000",
  white: "#fff"
};
const common$1 = common;
const grey = {
  50: "#fafafa",
  100: "#f5f5f5",
  200: "#eeeeee",
  300: "#e0e0e0",
  400: "#bdbdbd",
  500: "#9e9e9e",
  600: "#757575",
  700: "#616161",
  800: "#424242",
  900: "#212121",
  A100: "#f5f5f5",
  A200: "#eeeeee",
  A400: "#bdbdbd",
  A700: "#616161"
};
const grey$1 = grey;
const purple = {
  50: "#f3e5f5",
  100: "#e1bee7",
  200: "#ce93d8",
  300: "#ba68c8",
  400: "#ab47bc",
  500: "#9c27b0",
  600: "#8e24aa",
  700: "#7b1fa2",
  800: "#6a1b9a",
  900: "#4a148c",
  A100: "#ea80fc",
  A200: "#e040fb",
  A400: "#d500f9",
  A700: "#aa00ff"
};
const purple$1 = purple;
const red = {
  50: "#ffebee",
  100: "#ffcdd2",
  200: "#ef9a9a",
  300: "#e57373",
  400: "#ef5350",
  500: "#f44336",
  600: "#e53935",
  700: "#d32f2f",
  800: "#c62828",
  900: "#b71c1c",
  A100: "#ff8a80",
  A200: "#ff5252",
  A400: "#ff1744",
  A700: "#d50000"
};
const red$1 = red;
const orange = {
  50: "#fff3e0",
  100: "#ffe0b2",
  200: "#ffcc80",
  300: "#ffb74d",
  400: "#ffa726",
  500: "#ff9800",
  600: "#fb8c00",
  700: "#f57c00",
  800: "#ef6c00",
  900: "#e65100",
  A100: "#ffd180",
  A200: "#ffab40",
  A400: "#ff9100",
  A700: "#ff6d00"
};
const orange$1 = orange;
const blue = {
  50: "#e3f2fd",
  100: "#bbdefb",
  200: "#90caf9",
  300: "#64b5f6",
  400: "#42a5f5",
  500: "#2196f3",
  600: "#1e88e5",
  700: "#1976d2",
  800: "#1565c0",
  900: "#0d47a1",
  A100: "#82b1ff",
  A200: "#448aff",
  A400: "#2979ff",
  A700: "#2962ff"
};
const blue$1 = blue;
const lightBlue = {
  50: "#e1f5fe",
  100: "#b3e5fc",
  200: "#81d4fa",
  300: "#4fc3f7",
  400: "#29b6f6",
  500: "#03a9f4",
  600: "#039be5",
  700: "#0288d1",
  800: "#0277bd",
  900: "#01579b",
  A100: "#80d8ff",
  A200: "#40c4ff",
  A400: "#00b0ff",
  A700: "#0091ea"
};
const lightBlue$1 = lightBlue;
const green = {
  50: "#e8f5e9",
  100: "#c8e6c9",
  200: "#a5d6a7",
  300: "#81c784",
  400: "#66bb6a",
  500: "#4caf50",
  600: "#43a047",
  700: "#388e3c",
  800: "#2e7d32",
  900: "#1b5e20",
  A100: "#b9f6ca",
  A200: "#69f0ae",
  A400: "#00e676",
  A700: "#00c853"
};
const green$1 = green;
const _excluded$4 = ["mode", "contrastThreshold", "tonalOffset"];
const light = {
  text: {
    primary: "rgba(0, 0, 0, 0.87)",
    secondary: "rgba(0, 0, 0, 0.6)",
    disabled: "rgba(0, 0, 0, 0.38)"
  },
  divider: "rgba(0, 0, 0, 0.12)",
  background: {
    paper: common$1.white,
    default: common$1.white
  },
  action: {
    active: "rgba(0, 0, 0, 0.54)",
    hover: "rgba(0, 0, 0, 0.04)",
    hoverOpacity: 0.04,
    selected: "rgba(0, 0, 0, 0.08)",
    selectedOpacity: 0.08,
    disabled: "rgba(0, 0, 0, 0.26)",
    disabledBackground: "rgba(0, 0, 0, 0.12)",
    disabledOpacity: 0.38,
    focus: "rgba(0, 0, 0, 0.12)",
    focusOpacity: 0.12,
    activatedOpacity: 0.12
  }
};
const dark = {
  text: {
    primary: common$1.white,
    secondary: "rgba(255, 255, 255, 0.7)",
    disabled: "rgba(255, 255, 255, 0.5)",
    icon: "rgba(255, 255, 255, 0.5)"
  },
  divider: "rgba(255, 255, 255, 0.12)",
  background: {
    paper: "#121212",
    default: "#121212"
  },
  action: {
    active: common$1.white,
    hover: "rgba(255, 255, 255, 0.08)",
    hoverOpacity: 0.08,
    selected: "rgba(255, 255, 255, 0.16)",
    selectedOpacity: 0.16,
    disabled: "rgba(255, 255, 255, 0.3)",
    disabledBackground: "rgba(255, 255, 255, 0.12)",
    disabledOpacity: 0.38,
    focus: "rgba(255, 255, 255, 0.12)",
    focusOpacity: 0.12,
    activatedOpacity: 0.24
  }
};
function addLightOrDark(intent, direction, shade, tonalOffset) {
  const tonalOffsetLight = tonalOffset.light || tonalOffset;
  const tonalOffsetDark = tonalOffset.dark || tonalOffset * 1.5;
  if (!intent[direction]) {
    if (intent.hasOwnProperty(shade)) {
      intent[direction] = intent[shade];
    } else if (direction === "light") {
      intent.light = lighten(intent.main, tonalOffsetLight);
    } else if (direction === "dark") {
      intent.dark = darken(intent.main, tonalOffsetDark);
    }
  }
}
function getDefaultPrimary(mode = "light") {
  if (mode === "dark") {
    return {
      main: blue$1[200],
      light: blue$1[50],
      dark: blue$1[400]
    };
  }
  return {
    main: blue$1[700],
    light: blue$1[400],
    dark: blue$1[800]
  };
}
function getDefaultSecondary(mode = "light") {
  if (mode === "dark") {
    return {
      main: purple$1[200],
      light: purple$1[50],
      dark: purple$1[400]
    };
  }
  return {
    main: purple$1[500],
    light: purple$1[300],
    dark: purple$1[700]
  };
}
function getDefaultError(mode = "light") {
  if (mode === "dark") {
    return {
      main: red$1[500],
      light: red$1[300],
      dark: red$1[700]
    };
  }
  return {
    main: red$1[700],
    light: red$1[400],
    dark: red$1[800]
  };
}
function getDefaultInfo(mode = "light") {
  if (mode === "dark") {
    return {
      main: lightBlue$1[400],
      light: lightBlue$1[300],
      dark: lightBlue$1[700]
    };
  }
  return {
    main: lightBlue$1[700],
    light: lightBlue$1[500],
    dark: lightBlue$1[900]
  };
}
function getDefaultSuccess(mode = "light") {
  if (mode === "dark") {
    return {
      main: green$1[400],
      light: green$1[300],
      dark: green$1[700]
    };
  }
  return {
    main: green$1[800],
    light: green$1[500],
    dark: green$1[900]
  };
}
function getDefaultWarning(mode = "light") {
  if (mode === "dark") {
    return {
      main: orange$1[400],
      light: orange$1[300],
      dark: orange$1[700]
    };
  }
  return {
    main: "#ed6c02",
    light: orange$1[500],
    dark: orange$1[900]
  };
}
function createPalette(palette2) {
  const {
    mode = "light",
    contrastThreshold = 3,
    tonalOffset = 0.2
  } = palette2, other = _objectWithoutPropertiesLoose(palette2, _excluded$4);
  const primary = palette2.primary || getDefaultPrimary(mode);
  const secondary = palette2.secondary || getDefaultSecondary(mode);
  const error = palette2.error || getDefaultError(mode);
  const info = palette2.info || getDefaultInfo(mode);
  const success = palette2.success || getDefaultSuccess(mode);
  const warning = palette2.warning || getDefaultWarning(mode);
  function getContrastText(background) {
    const contrastText = getContrastRatio(background, dark.text.primary) >= contrastThreshold ? dark.text.primary : light.text.primary;
    if (process.env.NODE_ENV !== "production") {
      const contrast = getContrastRatio(background, contrastText);
      if (contrast < 3) {
        console.error([`MUI: The contrast ratio of ${contrast}:1 for ${contrastText} on ${background}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join("\n"));
      }
    }
    return contrastText;
  }
  const augmentColor = ({
    color: color2,
    name,
    mainShade = 500,
    lightShade = 300,
    darkShade = 700
  }) => {
    color2 = _extends({}, color2);
    if (!color2.main && color2[mainShade]) {
      color2.main = color2[mainShade];
    }
    if (!color2.hasOwnProperty("main")) {
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${name ? ` (${name})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${mainShade}\` property.` : formatMuiErrorMessage(11, name ? ` (${name})` : "", mainShade));
    }
    if (typeof color2.main !== "string") {
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${name ? ` (${name})` : ""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(color2.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });` : formatMuiErrorMessage(12, name ? ` (${name})` : "", JSON.stringify(color2.main)));
    }
    addLightOrDark(color2, "light", lightShade, tonalOffset);
    addLightOrDark(color2, "dark", darkShade, tonalOffset);
    if (!color2.contrastText) {
      color2.contrastText = getContrastText(color2.main);
    }
    return color2;
  };
  const modes = {
    dark,
    light
  };
  if (process.env.NODE_ENV !== "production") {
    if (!modes[mode]) {
      console.error(`MUI: The palette mode \`${mode}\` is not supported.`);
    }
  }
  const paletteOutput = deepmerge(_extends({
    common: _extends({}, common$1),
    mode,
    primary: augmentColor({
      color: primary,
      name: "primary"
    }),
    secondary: augmentColor({
      color: secondary,
      name: "secondary",
      mainShade: "A400",
      lightShade: "A200",
      darkShade: "A700"
    }),
    error: augmentColor({
      color: error,
      name: "error"
    }),
    warning: augmentColor({
      color: warning,
      name: "warning"
    }),
    info: augmentColor({
      color: info,
      name: "info"
    }),
    success: augmentColor({
      color: success,
      name: "success"
    }),
    grey: grey$1,
    contrastThreshold,
    getContrastText,
    augmentColor,
    tonalOffset
  }, modes[mode]), other);
  return paletteOutput;
}
const _excluded$3 = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];
function round(value) {
  return Math.round(value * 1e5) / 1e5;
}
const caseAllCaps = {
  textTransform: "uppercase"
};
const defaultFontFamily = '"Roboto", "Helvetica", "Arial", sans-serif';
function createTypography(palette2, typography2) {
  const _ref = typeof typography2 === "function" ? typography2(palette2) : typography2, {
    fontFamily: fontFamily2 = defaultFontFamily,
    fontSize: fontSize2 = 14,
    fontWeightLight = 300,
    fontWeightRegular = 400,
    fontWeightMedium = 500,
    fontWeightBold = 700,
    htmlFontSize = 16,
    allVariants,
    pxToRem: pxToRem2
  } = _ref, other = _objectWithoutPropertiesLoose(_ref, _excluded$3);
  if (process.env.NODE_ENV !== "production") {
    if (typeof fontSize2 !== "number") {
      console.error("MUI: `fontSize` is required to be a number.");
    }
    if (typeof htmlFontSize !== "number") {
      console.error("MUI: `htmlFontSize` is required to be a number.");
    }
  }
  const coef = fontSize2 / 14;
  const pxToRem = pxToRem2 || ((size) => `${size / htmlFontSize * coef}rem`);
  const buildVariant = (fontWeight2, size, lineHeight2, letterSpacing2, casing) => _extends({
    fontFamily: fontFamily2,
    fontWeight: fontWeight2,
    fontSize: pxToRem(size),
    lineHeight: lineHeight2
  }, fontFamily2 === defaultFontFamily ? {
    letterSpacing: `${round(letterSpacing2 / size)}em`
  } : {}, casing, allVariants);
  const variants = {
    h1: buildVariant(fontWeightLight, 96, 1.167, -1.5),
    h2: buildVariant(fontWeightLight, 60, 1.2, -0.5),
    h3: buildVariant(fontWeightRegular, 48, 1.167, 0),
    h4: buildVariant(fontWeightRegular, 34, 1.235, 0.25),
    h5: buildVariant(fontWeightRegular, 24, 1.334, 0),
    h6: buildVariant(fontWeightMedium, 20, 1.6, 0.15),
    subtitle1: buildVariant(fontWeightRegular, 16, 1.75, 0.15),
    subtitle2: buildVariant(fontWeightMedium, 14, 1.57, 0.1),
    body1: buildVariant(fontWeightRegular, 16, 1.5, 0.15),
    body2: buildVariant(fontWeightRegular, 14, 1.43, 0.15),
    button: buildVariant(fontWeightMedium, 14, 1.75, 0.4, caseAllCaps),
    caption: buildVariant(fontWeightRegular, 12, 1.66, 0.4),
    overline: buildVariant(fontWeightRegular, 12, 2.66, 1, caseAllCaps)
  };
  return deepmerge(_extends({
    htmlFontSize,
    pxToRem,
    fontFamily: fontFamily2,
    fontSize: fontSize2,
    fontWeightLight,
    fontWeightRegular,
    fontWeightMedium,
    fontWeightBold
  }, variants), other, {
    clone: false
  });
}
const shadowKeyUmbraOpacity = 0.2;
const shadowKeyPenumbraOpacity = 0.14;
const shadowAmbientShadowOpacity = 0.12;
function createShadow(...px) {
  return [`${px[0]}px ${px[1]}px ${px[2]}px ${px[3]}px rgba(0,0,0,${shadowKeyUmbraOpacity})`, `${px[4]}px ${px[5]}px ${px[6]}px ${px[7]}px rgba(0,0,0,${shadowKeyPenumbraOpacity})`, `${px[8]}px ${px[9]}px ${px[10]}px ${px[11]}px rgba(0,0,0,${shadowAmbientShadowOpacity})`].join(",");
}
const shadows = ["none", createShadow(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), createShadow(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), createShadow(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), createShadow(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), createShadow(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), createShadow(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), createShadow(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), createShadow(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), createShadow(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), createShadow(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), createShadow(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), createShadow(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), createShadow(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), createShadow(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), createShadow(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), createShadow(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), createShadow(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), createShadow(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), createShadow(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), createShadow(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), createShadow(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), createShadow(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), createShadow(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), createShadow(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)];
const shadows$1 = shadows;
const _excluded$2 = ["duration", "easing", "delay"];
const easing = {
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
};
const duration = {
  shortest: 150,
  shorter: 200,
  short: 250,
  standard: 300,
  complex: 375,
  enteringScreen: 225,
  leavingScreen: 195
};
function formatMs(milliseconds) {
  return `${Math.round(milliseconds)}ms`;
}
function getAutoHeightDuration(height2) {
  if (!height2) {
    return 0;
  }
  const constant = height2 / 36;
  return Math.round((4 + 15 * constant ** 0.25 + constant / 5) * 10);
}
function createTransitions(inputTransitions) {
  const mergedEasing = _extends({}, easing, inputTransitions.easing);
  const mergedDuration = _extends({}, duration, inputTransitions.duration);
  const create = (props = ["all"], options = {}) => {
    const {
      duration: durationOption = mergedDuration.standard,
      easing: easingOption = mergedEasing.easeInOut,
      delay = 0
    } = options, other = _objectWithoutPropertiesLoose(options, _excluded$2);
    if (process.env.NODE_ENV !== "production") {
      const isString = (value) => typeof value === "string";
      const isNumber = (value) => !isNaN(parseFloat(value));
      if (!isString(props) && !Array.isArray(props)) {
        console.error('MUI: Argument "props" must be a string or Array.');
      }
      if (!isNumber(durationOption) && !isString(durationOption)) {
        console.error(`MUI: Argument "duration" must be a number or a string but found ${durationOption}.`);
      }
      if (!isString(easingOption)) {
        console.error('MUI: Argument "easing" must be a string.');
      }
      if (!isNumber(delay) && !isString(delay)) {
        console.error('MUI: Argument "delay" must be a number or a string.');
      }
      if (Object.keys(other).length !== 0) {
        console.error(`MUI: Unrecognized argument(s) [${Object.keys(other).join(",")}].`);
      }
    }
    return (Array.isArray(props) ? props : [props]).map((animatedProp) => `${animatedProp} ${typeof durationOption === "string" ? durationOption : formatMs(durationOption)} ${easingOption} ${typeof delay === "string" ? delay : formatMs(delay)}`).join(",");
  };
  return _extends({
    getAutoHeightDuration,
    create
  }, inputTransitions, {
    easing: mergedEasing,
    duration: mergedDuration
  });
}
const zIndex = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
};
const zIndex$1 = zIndex;
const _excluded$1 = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];
function createTheme(options = {}, ...args) {
  const {
    mixins: mixinsInput = {},
    palette: paletteInput = {},
    transitions: transitionsInput = {},
    typography: typographyInput = {}
  } = options, other = _objectWithoutPropertiesLoose(options, _excluded$1);
  if (options.vars) {
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: \`vars\` is a private field used for CSS variables support.
Please use another name.` : formatMuiErrorMessage(18));
  }
  const palette2 = createPalette(paletteInput);
  const systemTheme = createTheme$1(options);
  let muiTheme = deepmerge(systemTheme, {
    mixins: createMixins(systemTheme.breakpoints, mixinsInput),
    palette: palette2,
    shadows: shadows$1.slice(),
    typography: createTypography(palette2, typographyInput),
    transitions: createTransitions(transitionsInput),
    zIndex: _extends({}, zIndex$1)
  });
  muiTheme = deepmerge(muiTheme, other);
  muiTheme = args.reduce((acc, argument) => deepmerge(acc, argument), muiTheme);
  if (process.env.NODE_ENV !== "production") {
    const stateClasses = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"];
    const traverse = (node2, component) => {
      let key;
      for (key in node2) {
        const child = node2[key];
        if (stateClasses.indexOf(key) !== -1 && Object.keys(child).length > 0) {
          if (process.env.NODE_ENV !== "production") {
            const stateClass = generateUtilityClass("", key);
            console.error([`MUI: The \`${component}\` component increases the CSS specificity of the \`${key}\` internal state.`, "You can not override it like this: ", JSON.stringify(node2, null, 2), "", `Instead, you need to use the '&.${stateClass}' syntax:`, JSON.stringify({
              root: {
                [`&.${stateClass}`]: child
              }
            }, null, 2), "", "https://mui.com/r/state-classes-guide"].join("\n"));
          }
          node2[key] = {};
        }
      }
    };
    Object.keys(muiTheme.components).forEach((component) => {
      const styleOverrides = muiTheme.components[component].styleOverrides;
      if (styleOverrides && component.indexOf("Mui") === 0) {
        traverse(styleOverrides, component);
      }
    });
  }
  return muiTheme;
}
const defaultTheme = createTheme();
const defaultTheme$1 = defaultTheme;
const rootShouldForwardProp = (prop) => shouldForwardProp(prop) && prop !== "classes";
const styled = createStyled2({
  defaultTheme: defaultTheme$1,
  rootShouldForwardProp
});
const styled$1 = styled;
function useThemeProps({
  props,
  name
}) {
  return useThemeProps$1({
    props,
    name,
    defaultTheme: defaultTheme$1
  });
}
function useTheme() {
  const theme = useTheme$1(defaultTheme$1);
  if (process.env.NODE_ENV !== "production") {
    React.useDebugValue(theme);
  }
  return theme;
}
const GridContext = /* @__PURE__ */ React.createContext();
if (process.env.NODE_ENV !== "production") {
  GridContext.displayName = "GridContext";
}
const GridContext$1 = GridContext;
function getGridUtilityClass(slot) {
  return generateUtilityClass("MuiGrid", slot);
}
const SPACINGS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const DIRECTIONS = ["column-reverse", "column", "row-reverse", "row"];
const WRAPS = ["nowrap", "wrap-reverse", "wrap"];
const GRID_SIZES = ["auto", true, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const gridClasses = generateUtilityClasses("MuiGrid", [
  "root",
  "container",
  "item",
  "zeroMinWidth",
  ...SPACINGS.map((spacing2) => `spacing-xs-${spacing2}`),
  ...DIRECTIONS.map((direction) => `direction-xs-${direction}`),
  ...WRAPS.map((wrap) => `wrap-xs-${wrap}`),
  ...GRID_SIZES.map((size) => `grid-xs-${size}`),
  ...GRID_SIZES.map((size) => `grid-sm-${size}`),
  ...GRID_SIZES.map((size) => `grid-md-${size}`),
  ...GRID_SIZES.map((size) => `grid-lg-${size}`),
  ...GRID_SIZES.map((size) => `grid-xl-${size}`)
]);
const _excluded = ["className", "columns", "columnSpacing", "component", "container", "direction", "item", "rowSpacing", "spacing", "wrap", "zeroMinWidth"];
function getOffset(val) {
  const parse2 = parseFloat(val);
  return `${parse2}${String(val).replace(String(parse2), "") || "px"}`;
}
function generateGrid({
  theme,
  ownerState
}) {
  let size;
  return theme.breakpoints.keys.reduce((globalStyles, breakpoint) => {
    let styles = {};
    if (ownerState[breakpoint]) {
      size = ownerState[breakpoint];
    }
    if (!size) {
      return globalStyles;
    }
    if (size === true) {
      styles = {
        flexBasis: 0,
        flexGrow: 1,
        maxWidth: "100%"
      };
    } else if (size === "auto") {
      styles = {
        flexBasis: "auto",
        flexGrow: 0,
        flexShrink: 0,
        maxWidth: "none",
        width: "auto"
      };
    } else {
      const columnsBreakpointValues = resolveBreakpointValues({
        values: ownerState.columns,
        breakpoints: theme.breakpoints.values
      });
      const columnValue = typeof columnsBreakpointValues === "object" ? columnsBreakpointValues[breakpoint] : columnsBreakpointValues;
      if (columnValue === void 0 || columnValue === null) {
        return globalStyles;
      }
      const width2 = `${Math.round(size / columnValue * 1e8) / 1e6}%`;
      let more = {};
      if (ownerState.container && ownerState.item && ownerState.columnSpacing !== 0) {
        const themeSpacing = theme.spacing(ownerState.columnSpacing);
        if (themeSpacing !== "0px") {
          const fullWidth = `calc(${width2} + ${getOffset(themeSpacing)})`;
          more = {
            flexBasis: fullWidth,
            maxWidth: fullWidth
          };
        }
      }
      styles = _extends({
        flexBasis: width2,
        flexGrow: 0,
        maxWidth: width2
      }, more);
    }
    if (theme.breakpoints.values[breakpoint] === 0) {
      Object.assign(globalStyles, styles);
    } else {
      globalStyles[theme.breakpoints.up(breakpoint)] = styles;
    }
    return globalStyles;
  }, {});
}
function generateDirection({
  theme,
  ownerState
}) {
  const directionValues = resolveBreakpointValues({
    values: ownerState.direction,
    breakpoints: theme.breakpoints.values
  });
  return handleBreakpoints({
    theme
  }, directionValues, (propValue) => {
    const output = {
      flexDirection: propValue
    };
    if (propValue.indexOf("column") === 0) {
      output[`& > .${gridClasses.item}`] = {
        maxWidth: "none"
      };
    }
    return output;
  });
}
function extractZeroValueBreakpointKeys({
  breakpoints,
  values: values2
}) {
  let nonZeroKey = "";
  Object.keys(values2).forEach((key) => {
    if (nonZeroKey !== "") {
      return;
    }
    if (values2[key] !== 0) {
      nonZeroKey = key;
    }
  });
  const sortedBreakpointKeysByValue = Object.keys(breakpoints).sort((a, b) => {
    return breakpoints[a] - breakpoints[b];
  });
  return sortedBreakpointKeysByValue.slice(0, sortedBreakpointKeysByValue.indexOf(nonZeroKey));
}
function generateRowGap({
  theme,
  ownerState
}) {
  const {
    container,
    rowSpacing
  } = ownerState;
  let styles = {};
  if (container && rowSpacing !== 0) {
    const rowSpacingValues = resolveBreakpointValues({
      values: rowSpacing,
      breakpoints: theme.breakpoints.values
    });
    let zeroValueBreakpointKeys;
    if (typeof rowSpacingValues === "object") {
      zeroValueBreakpointKeys = extractZeroValueBreakpointKeys({
        breakpoints: theme.breakpoints.values,
        values: rowSpacingValues
      });
    }
    styles = handleBreakpoints({
      theme
    }, rowSpacingValues, (propValue, breakpoint) => {
      var _zeroValueBreakpointK;
      const themeSpacing = theme.spacing(propValue);
      if (themeSpacing !== "0px") {
        return {
          marginTop: `-${getOffset(themeSpacing)}`,
          [`& > .${gridClasses.item}`]: {
            paddingTop: getOffset(themeSpacing)
          }
        };
      }
      if ((_zeroValueBreakpointK = zeroValueBreakpointKeys) != null && _zeroValueBreakpointK.includes(breakpoint)) {
        return {};
      }
      return {
        marginTop: 0,
        [`& > .${gridClasses.item}`]: {
          paddingTop: 0
        }
      };
    });
  }
  return styles;
}
function generateColumnGap({
  theme,
  ownerState
}) {
  const {
    container,
    columnSpacing
  } = ownerState;
  let styles = {};
  if (container && columnSpacing !== 0) {
    const columnSpacingValues = resolveBreakpointValues({
      values: columnSpacing,
      breakpoints: theme.breakpoints.values
    });
    let zeroValueBreakpointKeys;
    if (typeof columnSpacingValues === "object") {
      zeroValueBreakpointKeys = extractZeroValueBreakpointKeys({
        breakpoints: theme.breakpoints.values,
        values: columnSpacingValues
      });
    }
    styles = handleBreakpoints({
      theme
    }, columnSpacingValues, (propValue, breakpoint) => {
      var _zeroValueBreakpointK2;
      const themeSpacing = theme.spacing(propValue);
      if (themeSpacing !== "0px") {
        return {
          width: `calc(100% + ${getOffset(themeSpacing)})`,
          marginLeft: `-${getOffset(themeSpacing)}`,
          [`& > .${gridClasses.item}`]: {
            paddingLeft: getOffset(themeSpacing)
          }
        };
      }
      if ((_zeroValueBreakpointK2 = zeroValueBreakpointKeys) != null && _zeroValueBreakpointK2.includes(breakpoint)) {
        return {};
      }
      return {
        width: "100%",
        marginLeft: 0,
        [`& > .${gridClasses.item}`]: {
          paddingLeft: 0
        }
      };
    });
  }
  return styles;
}
function resolveSpacingStyles(spacing2, breakpoints, styles = {}) {
  if (!spacing2 || spacing2 <= 0) {
    return [];
  }
  if (typeof spacing2 === "string" && !Number.isNaN(Number(spacing2)) || typeof spacing2 === "number") {
    return [styles[`spacing-xs-${String(spacing2)}`]];
  }
  const spacingStyles = [];
  breakpoints.forEach((breakpoint) => {
    const value = spacing2[breakpoint];
    if (Number(value) > 0) {
      spacingStyles.push(styles[`spacing-${breakpoint}-${String(value)}`]);
    }
  });
  return spacingStyles;
}
const GridRoot = styled$1("div", {
  name: "MuiGrid",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    const {
      container,
      direction,
      item,
      spacing: spacing2,
      wrap,
      zeroMinWidth,
      breakpoints
    } = ownerState;
    let spacingStyles = [];
    if (container) {
      spacingStyles = resolveSpacingStyles(spacing2, breakpoints, styles);
    }
    const breakpointsStyles = [];
    breakpoints.forEach((breakpoint) => {
      const value = ownerState[breakpoint];
      if (value) {
        breakpointsStyles.push(styles[`grid-${breakpoint}-${String(value)}`]);
      }
    });
    return [styles.root, container && styles.container, item && styles.item, zeroMinWidth && styles.zeroMinWidth, ...spacingStyles, direction !== "row" && styles[`direction-xs-${String(direction)}`], wrap !== "wrap" && styles[`wrap-xs-${String(wrap)}`], ...breakpointsStyles];
  }
})(({
  ownerState
}) => _extends({
  boxSizing: "border-box"
}, ownerState.container && {
  display: "flex",
  flexWrap: "wrap",
  width: "100%"
}, ownerState.item && {
  margin: 0
}, ownerState.zeroMinWidth && {
  minWidth: 0
}, ownerState.wrap !== "wrap" && {
  flexWrap: ownerState.wrap
}), generateDirection, generateRowGap, generateColumnGap, generateGrid);
function resolveSpacingClasses(spacing2, breakpoints) {
  if (!spacing2 || spacing2 <= 0) {
    return [];
  }
  if (typeof spacing2 === "string" && !Number.isNaN(Number(spacing2)) || typeof spacing2 === "number") {
    return [`spacing-xs-${String(spacing2)}`];
  }
  const classes = [];
  breakpoints.forEach((breakpoint) => {
    const value = spacing2[breakpoint];
    if (Number(value) > 0) {
      const className = `spacing-${breakpoint}-${String(value)}`;
      classes.push(className);
    }
  });
  return classes;
}
const useUtilityClasses = (ownerState) => {
  const {
    classes,
    container,
    direction,
    item,
    spacing: spacing2,
    wrap,
    zeroMinWidth,
    breakpoints
  } = ownerState;
  let spacingClasses = [];
  if (container) {
    spacingClasses = resolveSpacingClasses(spacing2, breakpoints);
  }
  const breakpointsClasses = [];
  breakpoints.forEach((breakpoint) => {
    const value = ownerState[breakpoint];
    if (value) {
      breakpointsClasses.push(`grid-${breakpoint}-${String(value)}`);
    }
  });
  const slots = {
    root: ["root", container && "container", item && "item", zeroMinWidth && "zeroMinWidth", ...spacingClasses, direction !== "row" && `direction-xs-${String(direction)}`, wrap !== "wrap" && `wrap-xs-${String(wrap)}`, ...breakpointsClasses]
  };
  return composeClasses(slots, getGridUtilityClass, classes);
};
const Grid = /* @__PURE__ */ React.forwardRef(function Grid2(inProps, ref) {
  const themeProps = useThemeProps({
    props: inProps,
    name: "MuiGrid"
  });
  const {
    breakpoints
  } = useTheme();
  const props = extendSxProp(themeProps);
  const {
    className,
    columns: columnsProp,
    columnSpacing: columnSpacingProp,
    component = "div",
    container = false,
    direction = "row",
    item = false,
    rowSpacing: rowSpacingProp,
    spacing: spacing2 = 0,
    wrap = "wrap",
    zeroMinWidth = false
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
  const rowSpacing = rowSpacingProp || spacing2;
  const columnSpacing = columnSpacingProp || spacing2;
  const columnsContext = React.useContext(GridContext$1);
  const columns = container ? columnsProp || 12 : columnsContext;
  const breakpointsValues = {};
  const otherFiltered = _extends({}, other);
  breakpoints.keys.forEach((breakpoint) => {
    if (other[breakpoint] != null) {
      breakpointsValues[breakpoint] = other[breakpoint];
      delete otherFiltered[breakpoint];
    }
  });
  const ownerState = _extends({}, props, {
    columns,
    container,
    direction,
    item,
    rowSpacing,
    columnSpacing,
    wrap,
    zeroMinWidth,
    spacing: spacing2
  }, breakpointsValues, {
    breakpoints: breakpoints.keys
  });
  const classes = useUtilityClasses(ownerState);
  return /* @__PURE__ */ jsx(GridContext$1.Provider, {
    value: columns,
    children: /* @__PURE__ */ jsx(GridRoot, _extends({
      ownerState,
      className: clsx(classes.root, className),
      as: component,
      ref
    }, otherFiltered))
  });
});
process.env.NODE_ENV !== "production" ? Grid.propTypes = {
  children: propTypes.exports.node,
  classes: propTypes.exports.object,
  className: propTypes.exports.string,
  columns: propTypes.exports.oneOfType([propTypes.exports.arrayOf(propTypes.exports.number), propTypes.exports.number, propTypes.exports.object]),
  columnSpacing: propTypes.exports.oneOfType([propTypes.exports.arrayOf(propTypes.exports.oneOfType([propTypes.exports.number, propTypes.exports.string])), propTypes.exports.number, propTypes.exports.object, propTypes.exports.string]),
  component: propTypes.exports.elementType,
  container: propTypes.exports.bool,
  direction: propTypes.exports.oneOfType([propTypes.exports.oneOf(["column-reverse", "column", "row-reverse", "row"]), propTypes.exports.arrayOf(propTypes.exports.oneOf(["column-reverse", "column", "row-reverse", "row"])), propTypes.exports.object]),
  item: propTypes.exports.bool,
  lg: propTypes.exports.oneOfType([propTypes.exports.oneOf(["auto"]), propTypes.exports.number, propTypes.exports.bool]),
  md: propTypes.exports.oneOfType([propTypes.exports.oneOf(["auto"]), propTypes.exports.number, propTypes.exports.bool]),
  rowSpacing: propTypes.exports.oneOfType([propTypes.exports.arrayOf(propTypes.exports.oneOfType([propTypes.exports.number, propTypes.exports.string])), propTypes.exports.number, propTypes.exports.object, propTypes.exports.string]),
  sm: propTypes.exports.oneOfType([propTypes.exports.oneOf(["auto"]), propTypes.exports.number, propTypes.exports.bool]),
  spacing: propTypes.exports.oneOfType([propTypes.exports.arrayOf(propTypes.exports.oneOfType([propTypes.exports.number, propTypes.exports.string])), propTypes.exports.number, propTypes.exports.object, propTypes.exports.string]),
  sx: propTypes.exports.oneOfType([propTypes.exports.arrayOf(propTypes.exports.oneOfType([propTypes.exports.func, propTypes.exports.object, propTypes.exports.bool])), propTypes.exports.func, propTypes.exports.object]),
  wrap: propTypes.exports.oneOf(["nowrap", "wrap-reverse", "wrap"]),
  xl: propTypes.exports.oneOfType([propTypes.exports.oneOf(["auto"]), propTypes.exports.number, propTypes.exports.bool]),
  xs: propTypes.exports.oneOfType([propTypes.exports.oneOf(["auto"]), propTypes.exports.number, propTypes.exports.bool]),
  zeroMinWidth: propTypes.exports.bool
} : void 0;
if (process.env.NODE_ENV !== "production") {
  const requireProp = requirePropFactory("Grid", Grid);
  Grid["propTypes"] = _extends({}, Grid.propTypes, {
    direction: requireProp("container"),
    lg: requireProp("item"),
    md: requireProp("item"),
    sm: requireProp("item"),
    spacing: requireProp("container"),
    wrap: requireProp("container"),
    xs: requireProp("item"),
    zeroMinWidth: requireProp("item")
  });
}
const Grid$1 = Grid;
function Map(props) {
  return /* @__PURE__ */ jsx("my-map", {
    showNorthArrow: true,
    showScale: true,
    hideResetControl: true,
    geojsonData: JSON.stringify(props.boundary)
  });
}
function checkAnswerProps(props) {
  return props && props.every((entry) => {
    return Object.hasOwn(entry, "question") && Object.hasOwn(entry, "responses");
  });
}
function DocumentReview(props) {
  return /* @__PURE__ */ jsxs(React.Fragment, {
    children: [/* @__PURE__ */ jsx(Styles, {}), /* @__PURE__ */ jsxs(Grid$1, {
      container: true,
      spacing: 2,
      direction: "row-reverse",
      sx: {
        justifyContent: "center",
        minWidth: "650px",
        maxWidth: "1400px",
        padding: "0 1em",
        margin: "auto"
      },
      children: [/* @__PURE__ */ jsx(Grid$1, {
        item: true,
        xs: 12,
        children: /* @__PURE__ */ jsx("h1", {
          children: "Review Document"
        })
      }), /* @__PURE__ */ jsxs(Grid$1, {
        item: true,
        xs: 12,
        md: 6,
        children: [/* @__PURE__ */ jsx("h2", {
          children: "Boundary"
        }), /* @__PURE__ */ jsx(MapView, {
          geojson: props.geojson
        })]
      }), /* @__PURE__ */ jsxs(Grid$1, {
        item: true,
        xs: 12,
        md: 6,
        sx: {
          paddingTop: 0
        },
        children: [/* @__PURE__ */ jsx("h2", {
          children: "Data"
        }), /* @__PURE__ */ jsx(AnswerView, {
          csv: props.csv
        })]
      })]
    })]
  });
}
function Styles() {
  return /* @__PURE__ */ jsx(Global, {
    styles: css`
        @import url("https://fonts.googleapis.com/css2?family=Inter&display=swap");
        body {
          font-family: "Inter", arial, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          font-size: 18px;
          font-size: 1.125rem;
        }
      `
  });
}
function AnswerView(props) {
  const {
    csv: answers
  } = props;
  return /* @__PURE__ */ jsxs(React.Fragment, {
    children: [checkAnswerProps(answers) ? answers.map((entry, index) => /* @__PURE__ */ jsx(Answer, {
      title: entry.question,
      details: entry.responses
    }, index)) : /* @__PURE__ */ jsx("p", {
      children: "Data not available"
    }), " "]
  });
}
function MapView(props) {
  return /* @__PURE__ */ jsxs(React.Fragment, {
    children: [props.geojson ? /* @__PURE__ */ jsx(Map, {
      boundary: props.geojson
    }) : /* @__PURE__ */ jsx("p", {
      children: "Boundary map not available"
    }), " "]
  });
}
export {
  DocumentReview as default
};
