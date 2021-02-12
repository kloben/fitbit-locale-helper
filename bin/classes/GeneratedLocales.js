"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneratedLocales = void 0;
var GeneratedLocales = /** @class */ (function () {
    function GeneratedLocales() {
        this.locales = {};
    }
    GeneratedLocales.prototype.store = function (folder, langId, keys) {
        if (!this.locales[folder]) {
            this.locales[folder] = {};
        }
        if (!this.locales[folder][langId]) {
            this.locales[folder][langId] = {};
        }
        this.locales[folder][langId] = __assign(__assign({}, (this.locales[folder][langId] || {})), keys);
    };
    return GeneratedLocales;
}());
exports.GeneratedLocales = GeneratedLocales;
