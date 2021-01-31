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
var fitbit_locale_config_interface_1 = require("./interfaces/fitbit-locale-config.interface");
var dates_module_1 = require("./modules/dates.module");
var existing_module_1 = require("./modules/existing.module");
var store_module_1 = require("./modules/store.module");
var config = {
    localesFolder: 'testLocales',
    srcFolder: 'testSrc',
    locales: [fitbit_locale_config_interface_1.SupportedLocale['es-ES']],
    app: {
        weekCfg: {
            format: 'E',
            prefix: 'week_'
        },
        monthCfg: {
            format: 'MMM',
            prefix: 'month_'
        }
    }
};
function generateSectionLocales(sectionId) {
    for (var _i = 0, _a = config.locales; _i < _a.length; _i++) {
        var langId = _a[_i];
        var langLocales = __assign(__assign({}, dates_module_1.GenerateDateLocales(langId, config[sectionId])), existing_module_1.GenerateExistingLocales(sectionId, config.localesFolder || 'locales', langId));
        if (Object.keys(langLocales).length) {
            store_module_1.StoreLocales(sectionId, langId, config.srcFolder, langLocales);
        }
    }
}
function startGeneration() {
    var sections = ['app', 'settings', 'companion'];
    for (var _i = 0, sections_1 = sections; _i < sections_1.length; _i++) {
        var sectionId = sections_1[_i];
        if (config[sectionId]) {
            generateSectionLocales(sectionId);
        }
    }
}
startGeneration();
