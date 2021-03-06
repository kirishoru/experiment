"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

window.module = window.module || {};
(module || {}).exports = pickOneByWeight;

exports["default"] = pickOneByWeight;

function pickOneByWeight(anObj) {
    var _keys = Object.keys(anObj);
    var sum = _keys.reduce(function (p, c) {
        return p + anObj[c];
    }, 0);
    if (!Number.isFinite(sum)) {
        throw new Error("All values in object must be a numeric value");
    }
    var choose = ~ ~(Math.random() * sum);
    for (var i = 0, count = 0; i < _keys.length; i++) {
        count += anObj[_keys[i]];
        if (count > choose) {
            return _keys[i];
        }
    }
}

// module.exports = exports["default"];

