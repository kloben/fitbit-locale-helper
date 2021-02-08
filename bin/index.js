#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_module_1 = require("./modules/config.module");
var GeneratedLocales_1 = require("./classes/GeneratedLocales");
var dates_module_1 = require("./modules/dates.module");
var store_module_1 = require("./modules/store.module");
function generateDateTimes(generated, languages, dateTimes) {
    for (var _i = 0, languages_1 = languages; _i < languages_1.length; _i++) {
        var langId = languages_1[_i];
        for (var _a = 0, dateTimes_1 = dateTimes; _a < dateTimes_1.length; _a++) {
            var cfg = dateTimes_1[_a];
            var keys = dates_module_1.GenerateDateLocales(langId, cfg);
            generated.store(cfg.folder, langId, keys);
        }
    }
}
function startGeneration() {
    var config = config_module_1.GetConfig();
    var generated = new GeneratedLocales_1.GeneratedLocales();
    if (config.dateTimes) {
        generateDateTimes(generated, config.languages, config.dateTimes);
    }
    return store_module_1.StoreLocales(config.srcRootFolder, generated);
}
startGeneration()
    .then(function (total) {
    console.log("Generated " + total + " keys");
});
