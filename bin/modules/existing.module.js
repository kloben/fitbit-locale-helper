"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateExistingLocales = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
function GenerateExistingLocales(localesFolder, sectionId, langId) {
    var filePath = path_1.default.join(process.cwd(), localesFolder, sectionId, langId + ".po");
    return fs_1.default.existsSync(filePath) ? extractFromPo(filePath) : null;
}
exports.GenerateExistingLocales = GenerateExistingLocales;
function extractFromPo(filename) {
    var dataLocales = {};
    var fileData = fs_1.default.readFileSync(filename, 'utf-8').split('\n');
    var currentKey;
    for (var _i = 0, fileData_1 = fileData; _i < fileData_1.length; _i++) {
        var line = fileData_1[_i];
        if (line.startsWith('msgid')) {
            currentKey = JSON.parse(line.substring(6));
        }
        else if (line.startsWith('msgstr') && currentKey) {
            dataLocales[currentKey] = JSON.parse(line.substring(7));
            currentKey = null;
        }
    }
    return dataLocales;
}
