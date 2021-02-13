#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var main_module_1 = require("./modules/main-module");
main_module_1.StartGeneration()
    .then(function (total) {
    console.log("Finished. Generated " + total + " keys");
});
