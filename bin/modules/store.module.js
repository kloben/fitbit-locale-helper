"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreLocales = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
function StoreLocales(srcFolder, generated) {
    return __awaiter(this, void 0, void 0, function () {
        var counter, srcPath, _a, _b, _i, folderId, folderPath, i18nPath, _c, _d, _e, langId;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    counter = 0;
                    srcPath = path_1.default.join(process.cwd(), srcFolder);
                    if (!fs_1.default.existsSync(srcPath)) {
                        fs_1.default.mkdirSync(srcPath);
                    }
                    _a = [];
                    for (_b in generated.locales)
                        _a.push(_b);
                    _i = 0;
                    _f.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 6];
                    folderId = _a[_i];
                    folderPath = path_1.default.join(srcPath, folderId);
                    if (!fs_1.default.existsSync(folderPath)) {
                        fs_1.default.mkdirSync(folderPath);
                    }
                    i18nPath = path_1.default.join(folderPath, 'i18n');
                    if (!fs_1.default.existsSync(i18nPath)) {
                        fs_1.default.mkdirSync(i18nPath);
                    }
                    _c = [];
                    for (_d in generated.locales[folderId])
                        _c.push(_d);
                    _e = 0;
                    _f.label = 2;
                case 2:
                    if (!(_e < _c.length)) return [3 /*break*/, 5];
                    langId = _c[_e];
                    return [4 /*yield*/, writeFile(path_1.default.join(i18nPath, langId + ".po"), generated.locales[folderId][langId])];
                case 3:
                    _f.sent();
                    counter += Object.keys(generated.locales[folderId][langId]).length;
                    _f.label = 4;
                case 4:
                    _e++;
                    return [3 /*break*/, 2];
                case 5:
                    _i++;
                    return [3 /*break*/, 1];
                case 6: return [2 /*return*/, counter];
            }
        });
    });
}
exports.StoreLocales = StoreLocales;
function writeFile(filePath, data) {
    fs_1.default.writeFileSync(filePath, '');
    return new Promise(function (resolve) {
        fs_1.default.writeFileSync(filePath, '');
        var stream = fs_1.default.createWriteStream(filePath, { flags: 'as' });
        for (var keyId in data) {
            stream.write("msgid \"" + keyId + "\"\n");
            stream.write("msgstr \"" + data[keyId] + "\"\n\n");
        }
        stream.end(resolve);
    });
}
