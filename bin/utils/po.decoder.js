"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecodePo = void 0;
var fs_1 = __importDefault(require("fs"));
var readline_1 = __importDefault(require("readline"));
function DecodePo(filePath) {
    var readInterface = readline_1.default.createInterface({
        input: fs_1.default.createReadStream(filePath),
        terminal: false
    });
    readInterface.on('line', function (line) {
        console.log(line);
    });
}
exports.DecodePo = DecodePo;
