"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateDateLocales = void 0;
var index_js_1 = __importDefault(require("date-fns/format/index.js"));
var index_js_2 = require("date-fns/locale/index.js");
var dateFnsLocales = {
    'es-ES': index_js_2.es,
    'en-US': index_js_2.enUS,
    'de-DE': index_js_2.de,
    'fr-FR': index_js_2.fr,
    'it-IT': index_js_2.it,
    'ja-JP': index_js_2.ja,
    'ko-KR': index_js_2.ko,
    'nl-NL': index_js_2.nl,
    'sv-SE': index_js_2.sv,
    'zh-CN': index_js_2.zhCN,
    'zh-TW': index_js_2.zhTW,
    'ru-RU': index_js_2.ru,
    'pt-BR': index_js_2.ptBR,
    'ro-RO': index_js_2.ro,
    'cs-CZ': index_js_2.cs,
    'pl-PL': index_js_2.pl,
    'id-ID': index_js_2.id,
};
var monthDates = [];
var weekDates = [];
for (var i = 0; i < 12; i++) {
    monthDates.push(new Date(2020, i, 15, 5, 5, 5));
}
for (var i = 1; i <= 7; i++) {
    weekDates.push(new Date(2021, 7, i, 5, 5, 5));
}
function GenerateDateLocales(localeId, cfg) {
    var locales = {};
    if (cfg.weekCfg) {
        for (var _i = 0, weekDates_1 = weekDates; _i < weekDates_1.length; _i++) {
            var date = weekDates_1[_i];
            var key = "" + (cfg.weekCfg.prefix || 'week_') + date.getDay() + (cfg.weekCfg.suffix || '');
            locales[key] = index_js_1.default(date, cfg.weekCfg.format, { locale: dateFnsLocales[localeId] });
        }
    }
    if (cfg.monthCfg) {
        for (var _a = 0, monthDates_1 = monthDates; _a < monthDates_1.length; _a++) {
            var date = monthDates_1[_a];
            var key = "" + (cfg.monthCfg.prefix || 'month_') + date.getMonth() + (cfg.monthCfg.suffix || '');
            locales[key] = index_js_1.default(date, cfg.monthCfg.format, { locale: dateFnsLocales[localeId] });
        }
    }
    return locales;
}
exports.GenerateDateLocales = GenerateDateLocales;
