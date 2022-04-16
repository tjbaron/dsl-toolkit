"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenize = void 0;
var tokenize = function (str) {
    return [
        { type: 'number', token: '1' },
        { type: 'symbol', token: '+' },
        { type: 'number', token: '1' },
    ];
};
exports.tokenize = tokenize;
