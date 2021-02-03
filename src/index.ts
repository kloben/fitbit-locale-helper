#!/usr/bin/env node

import { GetConfig } from './modules/config.module'
import { GenerateDateLocales } from './modules/dates.module'
import { GenerateExistingLocales } from './modules/existing.module'
import { StoreLocales } from './modules/store.module'

const config = GetConfig()

function generateSectionLocales (sectionId: string) {
  for (const langId of config.locales) {
    const langLocales = {
      ...GenerateDateLocales(langId, config[sectionId]),
      ...GenerateExistingLocales(sectionId, config.localesFolder || 'locales', langId)
    }

    if (Object.keys(langLocales).length) {
      StoreLocales(sectionId, langId, langLocales)
    }
  }
}

function startGeneration () {
  const sections = ['app', 'settings', 'companion']
  for (const sectionId of sections) {
    if (config[sectionId]) {
      generateSectionLocales(sectionId)
    }
  }
}

startGeneration()
