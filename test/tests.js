(function(root, tests) {
    if (typeof define === "function" && define.amd)
        define(["es6-math"], tests);
    else if (typeof exports === "object")
        tests(require("../es6-math.js"));
    else tests();
})(this, function() {
"use strict";

function assert(func, arg, expected) {
    var res = arg instanceof Array
            ? func.apply(null, arg)
            : func(arg),
        resp;

    if (expected !== expected) // NaN
        resp = isNaN(res);
    else if (expected === 0 && 1/expected === -Infinity) { // -0
        resp = 1/res === -Infinity;
        expected = "-0";
    } else resp = res === expected;

    if (!resp) {
        if (res === 0 && 1/res === -Infinity) res = "-0";
        throw new Error("with argument " + arg + " expected " + expected + ", obtained " + res);
    }
}

describe("Math", function() {
    it("sinh", function() {
        assert(Math.sinh, 0, 0);
        assert(Math.sinh, Math.LN2, .75);
        assert(Math.sinh, null, 0);
        assert(Math.sinh, Infinity, Infinity);
        assert(Math.sinh, -Infinity, -Infinity);
        assert(Math.sinh, NaN, NaN);
        assert(Math.sinh, undefined, NaN);
        assert(Math.sinh, "A", NaN);
    });

    it("cosh", function() {
        assert(Math.cosh, 0, 1);
        assert(Math.cosh, Math.LN2, 1.25);
        assert(Math.cosh, null, 1);
        assert(Math.cosh, Infinity, Infinity);
        assert(Math.cosh, -Infinity, Infinity);
        assert(Math.cosh, NaN, NaN);
        assert(Math.cosh, undefined, NaN);
        assert(Math.cosh, "A", NaN);
    });

    it("tanh", function() {
        assert(Math.tanh, 0, 0);
        assert(Math.tanh, Math.LN2, .6);
        assert(Math.tanh, null, 0);
        assert(Math.tanh, Infinity, 1);
        assert(Math.tanh, -Infinity, -1);
        assert(Math.tanh, NaN, NaN);
        assert(Math.tanh, undefined, NaN);
        assert(Math.tanh, "A", NaN);
    });

    it("asinh", function() {
        assert(Math.asinh, 0, 0);
        assert(Math.asinh, .75, Math.LN2);
        assert(Math.asinh, null, 0);
        assert(Math.asinh, Infinity, Infinity);
        assert(Math.asinh, -Infinity, -Infinity);
        assert(Math.asinh, NaN, NaN);
        assert(Math.asinh, undefined, NaN);
        assert(Math.asinh, "A", NaN);
    });

    it("acosh", function() {
        assert(Math.acosh, 1, 0);
        assert(Math.acosh, 1.25, Math.LN2);
        assert(Math.acosh, 0, NaN);
        assert(Math.acosh, -1, NaN);
        assert(Math.acosh, null, NaN);
        assert(Math.acosh, Infinity, Infinity);
        assert(Math.acosh, -Infinity, NaN);
        assert(Math.acosh, NaN, NaN);
        assert(Math.acosh, undefined, NaN);
        assert(Math.acosh, "A", NaN);
    });

    it("atanh", function() {
        assert(Math.atanh, 0, 0);
        assert(Math.atanh, .6, Math.LN2);
        assert(Math.atanh, null, 0);
        assert(Math.atanh, 1, Infinity);
        assert(Math.atanh, -1, -Infinity);
        assert(Math.atanh, NaN, NaN);
        assert(Math.atanh, undefined, NaN);
        assert(Math.atanh, "A", NaN);
    });

    it("expm1", function() {
        assert(Math.expm1, 0, 0);
        assert(Math.expm1, -0, -0);
        assert(Math.expm1, Math.LN2, 1);
        assert(Math.expm1, -Math.LN2, -.5);
        assert(Math.expm1, Infinity, Infinity);
        assert(Math.expm1, -Infinity, -1);
        assert(Math.expm1, null, 0);
        assert(Math.expm1, NaN, NaN);
        assert(Math.expm1, undefined, NaN);
        assert(Math.expm1, "A", NaN);
    });

    it("log1p", function() {
        assert(Math.log1p, 0, 0);
        assert(Math.log1p, -0, -0);
        assert(Math.log1p, 1, Math.LN2);
        assert(Math.log1p, -.5, -Math.LN2);
        assert(Math.log1p, Infinity, Infinity);
        assert(Math.log1p, -Infinity, NaN);
        assert(Math.log1p, null, 0);
        assert(Math.log1p, NaN, NaN);
        assert(Math.log1p, undefined, NaN);
        assert(Math.log1p, "A", NaN);
    });

    it("log2", function() {
        assert(Math.log2, 4, 2);
        assert(Math.log2, -4, NaN);
        assert(Math.log2, 0, -Infinity);
        assert(Math.log2, null, -Infinity);
        assert(Math.log2, NaN, NaN);
        assert(Math.log2, undefined, NaN);
        assert(Math.log2, "A", NaN);
    });

    it("log10", function() {
        assert(Math.log10, 100, 2);
        assert(Math.log10, -100, NaN);
        assert(Math.log10, 0, -Infinity);
        assert(Math.log10, null, -Infinity);
        assert(Math.log10, NaN, NaN);
        assert(Math.log10, undefined, NaN);
        assert(Math.log10, "A", NaN);
    });

    it("sign", function() {
        assert(Math.sign, 0, 0);
        assert(Math.sign, -0, -0);
        assert(Math.sign, 1, 1);
        assert(Math.sign, 100, 1);
        assert(Math.sign, -1, -1);
        assert(Math.sign, -100, -1);
        assert(Math.sign, Infinity, 1);
        assert(Math.sign, -Infinity, -1);
        assert(Math.sign, null, 0);
        assert(Math.sign, NaN, NaN);
        assert(Math.sign, undefined, NaN);
        assert(Math.sign, "A", NaN);
    });

    it("cbrt", function() {
        assert(Math.cbrt, 0, 0);
        assert(Math.cbrt, -0, -0);
        assert(Math.cbrt, 1, 1);
        assert(Math.cbrt, 27, 3);
        assert(Math.cbrt, -1, -1);
        assert(Math.cbrt, -27, -3);
        assert(Math.cbrt, Infinity, Infinity);
        assert(Math.cbrt, -Infinity, -Infinity);
        assert(Math.cbrt, null, 0);
        assert(Math.cbrt, NaN, NaN);
        assert(Math.cbrt, undefined, NaN);
        assert(Math.cbrt, "A", NaN);
    });

    it("hypot", function() {
        assert(Math.hypot, 0, 0);
        assert(Math.hypot, -0, 0);
        assert(Math.hypot, 1, 1);
        assert(Math.hypot, -1, 1);
        assert(Math.hypot, Infinity, Infinity);
        assert(Math.hypot, -Infinity, Infinity);
        assert(Math.hypot, null, 0);
        assert(Math.hypot, NaN, NaN);
        assert(Math.hypot, undefined, NaN);
        assert(Math.hypot, "A", NaN);
        assert(Math.hypot, [3, 4], 5);
        assert(Math.hypot, [3, 4, 12], 13);
    });

    it("clz32", function() {
        assert(Math.clz32, 0, 32);
        assert(Math.clz32, 3.5, 30);
        assert(Math.clz32, 5, 29);
        assert(Math.clz32, -5, 0);
        assert(Math.clz32, 2147483647, 1);
        assert(Math.clz32, 2147483648, 0);
        assert(Math.clz32, 4294967296, 32);
        assert(Math.clz32, Infinity, 32);
        assert(Math.clz32, -Infinity, 32);
        assert(Math.clz32, null, 32);
        assert(Math.clz32, NaN, 32);
        assert(Math.clz32, undefined, 32);
        assert(Math.clz32, "A", 32);
    });

    it("imul", function() {
        assert(Math.imul, 0, 0);
        assert(Math.imul, 1, 0);
        assert(Math.imul, -1, 0);
        assert(Math.imul, [3, 4], 12);
        assert(Math.imul, [3.5, 2], 6);
        assert(Math.imul, [2, 2, 2], 4);
        assert(Math.imul, [1, 2147483647], 2147483647);
        assert(Math.imul, [2, 1073741824], -2147483648);
        assert(Math.imul, [1, 4294967296], 0);
        assert(Math.imul, [1, Infinity], 0);
        assert(Math.imul, [1, null], 0);
        assert(Math.imul, [1, NaN], 0);
        assert(Math.imul, [1, undefined], 0);
        assert(Math.imul, [1, "A"], 0);
    });
});

describe("Number", function() {
    it("isNaN", function() {
        assert(Number.isNaN, 0, false);
        assert(Number.isNaN, NaN, true);
        assert(Number.isNaN, Infinity, false);
        assert(Number.isNaN, "A", false);
        assert(Number.isNaN, "0", false);
    });

    it("isFinite", function() {
        assert(Number.isFinite, 0, true);
        assert(Number.isFinite, -1.2, true);
        assert(Number.isFinite, NaN, false);
        assert(Number.isFinite, Infinity, false);
        assert(Number.isFinite, "A", false);
        assert(Number.isFinite, "0", false);
    });

    it("isInteger", function() {
        assert(Number.isInteger, 0, true);
        assert(Number.isInteger, -1.2, false);
        assert(Number.isInteger, 9007199254740992, true);
        assert(Number.isInteger, NaN, false);
        assert(Number.isInteger, Infinity, false);
        assert(Number.isInteger, "A", false);
        assert(Number.isInteger, "0", false);
    });

    it("isSafeInteger", function() {
        assert(Number.isSafeInteger, 0, true);
        assert(Number.isSafeInteger, -1.2, false);
        assert(Number.isSafeInteger, 9007199254740991, true);
        assert(Number.isSafeInteger, 9007199254740992, false);
        assert(Number.isSafeInteger, NaN, false);
        assert(Number.isSafeInteger, Infinity, false);
        assert(Number.isSafeInteger, "A", false);
        assert(Number.isSafeInteger, "0", false);
    });
});

});