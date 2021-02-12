"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidDateFormat = void 0;
var index_js_1 = __importDefault(require("date-fns/format/index.js"));
var index_js_2 = require("date-fns/locale/index.js");
function IsValidDateFormat(inputFormat) {
    try {
        return index_js_1.default(new Date(), inputFormat, { locale: index_js_2.enUS }).length > 0;
    }
    catch (e) {
        return false;
    }
}
exports.IsValidDateFormat = IsValidDateFormat;
