// Copyright (c) 2012 Ecma International.  All rights reserved.
// Ecma International makes this code available under the terms and conditions set
// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the
// "Use Terms").   Any redistribution of this code must retain the above
// copyright and this notice and otherwise comply with the Use Terms.

/*---
es5id: 15.4.4.22-9-c-i-13
description: >
    Array.prototype.reduceRight - element to be retrieved is own
    accessor property that overrides an inherited accessor property on
    an Array-like object
includes: [runTestCase.js]
---*/

function testcase() {
        
        var testResult = false;
        function callbackfn(prevVal, curVal, idx, obj) {
            if (idx === 1) {
                testResult = (curVal === "1");
            }
        }

        var proto = { 0: 0, 2: 2};

        Object.defineProperty(proto, "1", {
            get: function () {
                return 11;
            },
            configurable: true
        });

        var Con = function () { };
        Con.prototype = proto;

        var child = new Con();
        child.length = 3;

        Object.defineProperty(child, "1", {
            get: function () {
                return "1";
            },
            configurable: true
        });

        Array.prototype.reduceRight.call(child, callbackfn, "initialValue");
        return testResult;
    }
runTestCase(testcase);
