"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreLocales = void 0;
var fs_1 = __importDefault(require("fs"));
function StoreLocales(sectionId, langId, srcFolder, data) {
    if (!fs_1.default.existsSync(srcFolder + "/i18n")) {
        fs_1.default.mkdirSync(srcFolder + "/i18n");
    }
    var filePath = srcFolder + "/i18n/" + langId + ".po";
    fs_1.default.writeFileSync(filePath, '');
    var stream = fs_1.default.createWriteStream(filePath, { flags: 'as' });
    for (var keyId in data) {
        stream.write("msgid \"" + keyId + "\"\n");
        stream.write("msgstr \"" + data[keyId] + "\"\n\n");
    }
    stream.end();
}
exports.StoreLocales = StoreLocales;
