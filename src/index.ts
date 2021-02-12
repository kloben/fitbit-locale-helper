#!/usr/bin/env node

import { GeneratedLocales } from './classes/GeneratedLocales'
import { SupportedLanguage } from './enums/supported-locales.enum'
import { DateTimeConfig, FitbitFolder } from './interfaces/fitbit-locale-config.interface'
import { GetConfig } from './modules/config.module'
import { GenerateDateLocales } from './modules/dates.module'
import { GenerateExistingLocales } from './modules/existing.module'
import { StoreLocales } from './modules/store.module'

function generateDateTimes (generated: GeneratedLocales, languages: Array<SupportedLanguage>, dateTimes: Array<DateTimeConfig>) {
  for (const langId of languages) {
    for (const cfg of dateTimes) {
      const keys = GenerateDateLocales(langId, cfg)
      generated.store(cfg.folder, langId, keys)
    }
  }
}

function generateExistingKeys (generated: GeneratedLocales, languages: Array<SupportedLanguage>, localesFolder: string) {
  for (const folder of Object.values(FitbitFolder)) {
    for (const langId of languages) {
      const keys = GenerateExistingLocales(localesFolder, folder, langId)
      if (keys) {
        generated.store(folder, langId, keys)
      }
    }
  }
}

function startGeneration () {
  const config = GetConfig()
  if (!config) {
    return
  }
  const generated = new GeneratedLocales()

  if (config.dateTimes && config.dateTimes.length) {
    generateDateTimes(generated, config.languages, config.dateTimes)
  }
  if (config.localesFolder) {
    generateExistingKeys(generated, config.languages, config.localesFolder)
  }

  return StoreLocales(config.srcRootFolder, generated)
}

startGeneration()
  .then((total: number) => {
    console.log(`Finished. Generated ${total} keys`)
  })
