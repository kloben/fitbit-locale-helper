#!/usr/bin/env node

import { GetConfig } from './modules/config.module'
import { GeneratedLocales } from './classes/GeneratedLocales'
import { SupportedLanguage } from './enums/supported-locales.enum'
import { DateTimeConfig } from './interfaces/fitbit-locale-config.interface'
import { GenerateDateLocales } from './modules/dates.module'
import { StoreLocales } from './modules/store.module'

function generateDateTimes (generated: GeneratedLocales, languages: Array<SupportedLanguage>, dateTimes?: Array<DateTimeConfig>) {
  for (const langId of languages) {
    for(const cfg of dateTimes) {
      const keys = GenerateDateLocales(langId, cfg)
      generated.store(cfg.folder, langId, keys)
    }
  }
}

function startGeneration () {
  const config = GetConfig()
  const generated = new GeneratedLocales()

  if (config.dateTimes) {
    generateDateTimes(generated, config.languages, config.dateTimes)
  }

  return StoreLocales(config.srcRootFolder, generated)
}

startGeneration()
  .then((total: number) => {
    console.log(`Generated ${total} keys`)
  })
