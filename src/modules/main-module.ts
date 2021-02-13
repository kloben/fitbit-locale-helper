import { GeneratedLocales } from '../classes/GeneratedLocales'
import { SupportedLanguage } from '../enums/supported-locales.enum'
import { DateTimeConfig, FitbitFolder } from '../interfaces/fitbit-locale-config.interface'
import { GetConfig } from './config.module'
import { GenerateDateLocales } from './dates.module'
import { GenerateExistingLocales } from './existing.module'
import { StoreLocales } from './store.module'

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

export function StartGeneration (): Promise<number> {
  const config = GetConfig()
  if (!config) {
    return Promise.resolve(0)
  }
  const generated = new GeneratedLocales()

  if (config.dateTimes && config.dateTimes.length) {
    generateDateTimes(generated, config.languages, config.dateTimes)
  }
  if (config.localesFolder) {
    generateExistingKeys(generated, config.languages, config.localesFolder)
  }

  return StoreLocales(config.srcRootFolder, generated.locales)
}
