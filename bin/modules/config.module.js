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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParsePrefixSuffix = exports.ParseDateTime = exports.GetConfig = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var supported_locales_enum_1 = require("../enums/supported-locales.enum");
var fitbit_locale_config_interface_1 = require("../interfaces/fitbit-locale-config.interface");
var date_util_1 = require("../utils/date.util");
function GetConfig(initialCfg) {
    var userCfgPath = path_1.default.join(process.cwd(), 'fitbitLocaleHelper.json');
    var userConfig = initialCfg || (fs_1.default.existsSync(userCfgPath) ? JSON.parse(fs_1.default.readFileSync(userCfgPath, 'utf8')) : {});
    var languages = userConfig.languages ? verifyLanguages(userConfig.languages) : Object.values(supported_locales_enum_1.SupportedLanguage);
    if (!languages.length) {
        console.log('No valid languages found. Aborting generation');
        return null;
    }
    var dateTimes;
    if (userConfig.dateTimes) {
        dateTimes = [];
        for (var _i = 0, _a = userConfig.dateTimes; _i < _a.length; _i++) {
            var config = _a[_i];
            var parsedCfg = ParseDateTime(config);
            if (parsedCfg) {
                dateTimes.push(parsedCfg);
            }
        }
    }
    return __assign({ localesFolder: userConfig.localesFolder || null, srcRootFolder: userConfig.srcRootFolder || '', languages: languages }, ({ dateTimes: dateTimes } || {}));
}
exports.GetConfig = GetConfig;
function ParseDateTime(cfg) {
    if (!fitbit_locale_config_interface_1.FitbitFolder[cfg.folder] ||
        !fitbit_locale_config_interface_1.DateTimeType[cfg.type] ||
        !cfg.format ||
        typeof cfg.format !== 'string' ||
        !date_util_1.IsValidDateFormat(cfg.format) ||
        (cfg.prefix && typeof cfg.prefix !== 'string') ||
        (cfg.suffix && typeof cfg.suffix !== 'string')) {
        console.log("Invalid dateTime configuration: " + JSON.stringify(cfg));
        return null;
    }
    return __assign({ folder: cfg.folder, type: cfg.type, format: cfg.format }, ParsePrefixSuffix(cfg.type, cfg.prefix, cfg.suffix));
}
exports.ParseDateTime = ParseDateTime;
function ParsePrefixSuffix(type, prefix, suffix) {
    if ((!prefix || !prefix.length) && (!suffix || !suffix.length)) {
        return {
            prefix: type === 'weekDay' ? 'week' : 'month',
            suffix: ''
        };
    }
    return {
        prefix: (prefix && prefix.length) ? prefix : '',
        suffix: (suffix && suffix.length) ? suffix : ''
    };
}
exports.ParsePrefixSuffix = ParsePrefixSuffix;
function verifyLanguages(providedLocales) {
    return providedLocales.filter(function (localeId) {
        if (!supported_locales_enum_1.SupportedLanguage[localeId]) {
            console.log("Unknown locale \"" + localeId + "\". Skipping...");
            return false;
        }
        return true;
    });
}
