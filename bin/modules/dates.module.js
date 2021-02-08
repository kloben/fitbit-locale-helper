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
    'id-ID': index_js_2.id
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
    var fnName = cfg.type === 'weekDay' ? 'getDay' : 'getMonth';
    var source = cfg.type === 'weekDay' ? weekDates : monthDates;
    var output = {};
    for (var _i = 0, source_1 = source; _i < source_1.length; _i++) {
        var date = source_1[_i];
        var key = "" + cfg.prefix + date[fnName]() + cfg.suffix;
        output[key] = index_js_1.default(date, cfg.format, { locale: dateFnsLocales[localeId] });
    }
    return output;
}
exports.GenerateDateLocales = GenerateDateLocales;
