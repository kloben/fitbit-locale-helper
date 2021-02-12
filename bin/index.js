#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratedLocales_1 = require("./classes/GeneratedLocales");
var fitbit_locale_config_interface_1 = require("./interfaces/fitbit-locale-config.interface");
var config_module_1 = require("./modules/config.module");
var dates_module_1 = require("./modules/dates.module");
var existing_module_1 = require("./modules/existing.module");
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
function generateExistingKeys(generated, languages, localesFolder) {
    for (var _i = 0, _a = Object.values(fitbit_locale_config_interface_1.FitbitFolder); _i < _a.length; _i++) {
        var folder = _a[_i];
        for (var _b = 0, languages_2 = languages; _b < languages_2.length; _b++) {
            var langId = languages_2[_b];
            var keys = existing_module_1.GenerateExistingLocales(localesFolder, folder, langId);
            if (keys) {
                generated.store(folder, langId, keys);
            }
        }
    }
}
function startGeneration() {
    var config = config_module_1.GetConfig();
    if (!config) {
        return;
    }
    var generated = new GeneratedLocales_1.GeneratedLocales();
    if (config.dateTimes && config.dateTimes.length) {
        generateDateTimes(generated, config.languages, config.dateTimes);
    }
    if (config.localesFolder) {
        generateExistingKeys(generated, config.languages, config.localesFolder);
    }
    return store_module_1.StoreLocales(config.srcRootFolder, generated.locales);
}
startGeneration()
    .then(function (total) {
    console.log("Finished. Generated " + total + " keys");
});
