"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateExistingLocales = void 0;
var fs_1 = __importDefault(require("fs"));
var po2json_1 = __importDefault(require("po2json"));
function GenerateExistingLocales(sectionId, localesFolder, langId) {
    var filePath = localesFolder + "/" + sectionId + "/" + langId + ".po";
    if (fs_1.default.existsSync(filePath)) {
        return po2json_1.default.parseFileSync(filePath, {
            format: 'mf'
        });
    }
    return {};
}
exports.GenerateExistingLocales = GenerateExistingLocales;
