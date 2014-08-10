(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else factory();
})(function() {
    "use strict";
    // x | 0 is the simplest way to implement ToUint32(x)
    var m = Math, prop,
        mathXtra = {
            // Hyperbolic functions
            sinh: function sinh(x) {
                // If -0, must return -0.
                if (x === 0) return +x;
                var exp = Math.exp(x);
                return exp/2 - .5/exp;
            },
            cosh: function cosh(x) {
                var exp = Math.exp(x);
                return exp/2 + .5/exp;
            },
            tanh: function tanh(x) {
                // If -0, must return -0.
                if (x === 0) return +x;
                // Mathematically speaking, the formulae are equivalent.
                // But computationally, it's better to make exp tend to 0
                // rather than +Infinity
                if (x < 0) {
                    var exp = Math.exp(2 * x);
                    return (exp - 1) / (exp + 1);
                } else {
                    var exp = Math.exp(-2 * x);
                    return (1 - exp) / (1 + exp);
                }
            },
            asinh: function asinh(x) {
                return x === -Infinity ? -Infinity : Math.log(x + Math.sqrt(x * x + 1));
            },
            acosh: function acosh(x) {
                return x >= 1 ? Math.log(x + Math.sqrt(x * x - 1)) : NaN;
            },
            atanh: function atanh(x) {
                return x >= -1 && x <= 1 ? Math.log((1 + x) / (1 - x)) / 2 : NaN;
            },

            // Exponentials and logarithms
            expm1: function expm1(x) {
                // If -0, must return -0. But Math.exp(-0) - 1 yields +0.
                return x === 0 ? +x : Math.exp(x) - 1;
            },
            log10: function log10(x) {
                return Math.log(x) / Math.LN10;
            },
            log2: function log2(x) {
                return Math.log(x) / Math.LN2;
            },
            log1p: function log1p(x) {
                // If -0, must return -0. But Math.log(1 + -0) yields +0.
                return x === 0 ? +x : Math.log(1 + x);
            },

            // Various
            sign: function sign(x) {
                // If -0, must return -0.
                return isNaN(x) ? NaN : x < 0 ? -1 : x > 0 ? 1 : +x;
            },
            cbrt: function cbrt(x) {
                // If -0, must return -0.
                return x === 0 ? +x : x < 0 ? -Math.pow(-x, 1/3) : Math.pow(x, 1/3);
            },
            hypot: function hypot() {
                for (var i = 0, s = 0; i < arguments.length; i++)
                    s += arguments[i] * arguments[i];
                return Math.sqrt(s);
            },

            // Rounding and 32-bit operations
            trunc: function trunc(x) {
                return x === 0 ? x : x < 0 ? Math.ceil(x) : Math.floor(x);
            },
            fround: typeof Float32Array === "function" ? (function(arr) {
                return function fround(x) {
                    arr[0] = x;
                    return arr[0];
                };
            })(new Float32Array(1)) : function fround(x) {return x;},
            clz32: function clz32(x) {
                if (x === -Infinity) return 32;
                if (x < 0 || (x |= 0) < 0) return 0;
                if (!x) return 32;
                var i = 31;
                while (x >>= 1) i--;
                return i;
            },
            imul: function imul(x, y) {
                return (x | 0) * (y | 0) | 0;
            }
        },
        numXtra = {
            isNaN: function(x) {
                // NaN is the only Javascript object such that x !== x
                // The control on the type is for eventual host objects
                return typeof x === "number" && x !== x;
            },
            isFinite: function(x) {
                return typeof x === "number" && x === x && x !== Infinity && x !== -Infinity;
            },
            isInteger: function(x) {
                return typeof x === "number" && x !== Infinity && x !== -Infinity && Math.floor(x) === x;
            },
            isSafeInteger: function(x) {
                return typeof x === "number" && x > -9007199254740992 && x < 9007199254740992 && Math.floor(x) === x;
            },
            parseFloat: parseFloat,
            parseInt: parseInt
        },
        numConsts = {
            EPSILON: 2.2204460492503130808472633361816e-16,
            MAX_SAFE_INTEGER: 9007199254740991,
            MIN_SAFE_INTEGER: -9007199254740991
        };

    for (prop in mathXtra)
        if (typeof m[prop] !== "function")
            m[prop] = mathXtra[prop];

    for (prop in numXtra)
        if (typeof Number[prop] !== "function")
            Number[prop] = numXtra[prop];

    try {
        prop = {};
        Object.defineProperty(prop, "text", {value: 1});
        for (prop in numConsts)
            if (!(prop in Number))
                Object.defineProperty(Number, prop, {value: numConsts[prop]});
    } catch (e) {
        for (prop in numConsts)
            if (!(prop in Number))
                Number[prop] = numConsts[prop];
    }
});