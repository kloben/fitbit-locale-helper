#!/usr/bin/env node

import {FitbitLocaleConfig, SupportedLocale} from "./interfaces/fitbit-locale-config.interface";
import {GenerateDateLocales} from "./modules/dates.module";
import {GenerateExistingLocales} from "./modules/existing.module";
import {StoreLocales} from "./modules/store.module";

const config: FitbitLocaleConfig = {
  localesFolder: 'testLocales',
  srcFolder: 'testSrc',
  locales: [SupportedLocale['es-ES']],
  app: {
    weekCfg: {
      format: 'E',
      prefix: 'week_'
    },
    monthCfg: {
      format: 'MMM',
      prefix: 'month_'
    }
  }
}

function generateSectionLocales(sectionId: string) {
  for(let langId of config.locales) {
    const langLocales = {
      ...GenerateDateLocales(langId, config[sectionId]),
      ...GenerateExistingLocales(sectionId, config.localesFolder || 'locales', langId)
    }

    if(Object.keys(langLocales).length) {
      StoreLocales(sectionId, langId, config.srcFolder, langLocales)
    }
  }
}

function startGeneration() {
  const sections = ['app', 'settings', 'companion'];
  for (let sectionId of sections) {
    if (config[sectionId]) {
      generateSectionLocales(sectionId);
    }
  }
}


startGeneration()
