es6-math
========

A polyfill for ES6 mathematical and helper functions and constants.

## Installation

As a standalone Javascript file (not needed when using AMD loaders like Require.js):

```html
<script type="text/javascript" src="es6-math.js"></script>
```

A minified version (`es6-math.min.js`) is provided too, along with its source map.

Via `npm`:

```bash
npm install es6-math
```

Via `bower`:

```bash
bower install es6-math
```

When using an AMD loader (like RequireJS in this example), you should require the module
at the beginning like this:

```js
require(["es6-math"], function() {
    ...
});
```

The module doesn't return anything, as it's a polyfill for functions defined on the
[`Math`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math)
and [`Number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
global objects.

To avoid unnecessary loading, it's recommended to check the existence of `Math.sinh` and/or
any other Ecmascript-6 mathematical functions prior to requiring the module.


## Usage

Once the script has been loaded, you're ready to use the ES6 mathematical and helper functions:

* `Math.sinh`
* `Math.cosh`
* `Math.tanh`
* `Math.asinh`
* `Math.acosh`
* `Math.atanh`
* `Math.expm1`
* `Math.log1p`
* `Math.log2`
* `Math.log10`
* `Math.sign`
* `Math.cbrt`
* `Math.hypot`
* `Math.trunc`
* `Math.fround`
* `Math.clz32`
* `Math.imul`
* `Number.isNaN`
* `Number.isFinite`
* `Number.isInteger`
* `Number.isSafeInteger`
* `Number.parseFloat`
* `Number.parseInt`

And the new `Number` constants:

* `Number.EPSILON`
* `Number.MAX_SAFE_INTEGER`
* `Number.MIN_SAFE_INTEGER`


## Notes

On `Number` three new constants are defined:

* `EPSILON => 2.220446049250313e-16`
* `MAX_SAFE_INTEGER => 9007199254740991`
* `MIN_SAFE_INTEGER => -9007199254740991`

Where `Object.defineProperty` isn't supported (IE7-, for example) or it can't be used on plain objects
(IE8), the values are defined as common properties and thus they can be overwritten. This can't be avoided.

Some functions may not be as precise as you expect. This usually happens with large arguments, and depends
on the formulae used to compute the result. For example, `Math.asinh` starts returning `Infinity` as soon
as `1.3407807929942597e+154`, whereas Firefox returns finite values up to `1.7976931348623157e+308` (i.e.
`Number.MAX_VALUE`). As of version 38, Chrome isn't as good, though.

### `Math.fround`

This function is correctly polyfilled on platforms that support typed arrays (as `Float32Array`). On
other environments, it's just the identity function.

An exact, pure Javascript polyfill could have been provided, but that would have defied the purpose of
`Math.fround`, which is to provide *fast* values to work with. A Javascript polyfill would have been way
slower, and even the one using a typed array is 10x-12x slower than a native implementation (tested on
Chrome and Firefox).

Moreover, older versions of Safari (6.x) are *very* slow with typed arrays, so the polyfill could be quite
detrimental on performances.

## Tests

The unit tests are built on top of [mocha](http://mochajs.org/). Once the package is installed, run `npm install` from the package's root directory in order to locally install mocha, then `npm run test` to execute the tests. Open [index.html](test/index.html) with a browser to perform the tests on the client side.

If mocha is installed globally, served side tests can be run with just the command `mocha` from the package's root directory.


## License

The MIT License (MIT)

Copyright (c) 2014-2015 Massimo Artizzu (MaxArt2501)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
