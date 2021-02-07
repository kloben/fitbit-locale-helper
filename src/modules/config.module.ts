import fs from 'fs'
import path from 'path'
import {SupportedLanguage} from '../enums/supported-locales.enum'
import {
  DateTimeConfig, DateTimeType, FitbitFolder,
  FitbitLocaleConfig,
} from '../interfaces/fitbit-locale-config.interface'
import {IsValidDateFormat} from "../utils/date.util";

export function GetConfig(initialCfg?: any): FitbitLocaleConfig | null {
  const userCfgPath = path.join(process.cwd(), 'fitbitLocaleHelper.json')
  const userConfig: FitbitLocaleConfig = initialCfg || (fs.existsSync(userCfgPath) ? JSON.parse(fs.readFileSync(userCfgPath, 'utf8')) : {})

  const languages: Array<SupportedLanguage> = userConfig.languages ? verifyLanguages(userConfig.languages) : Object.values(SupportedLanguage)
  if (!languages.length) {
    console.log('No valid languages found. Aborting generation')
    return null
  }

  let dateTimes
  if (userConfig.dateTimes) {
    dateTimes = []
    for (let config of userConfig.dateTimes) {
      const parsedCfg = ParseDateTime(config)
      if (parsedCfg) {
        dateTimes.push(parsedCfg)
      }
    }
  }

  return {
    localesFolder: userConfig.localesFolder || null,
    srcRootFolder: userConfig.srcRootFolder || '',
    languages,
    ...({ dateTimes } || {})
  }
}

export function ParseDateTime(cfg: DateTimeConfig): DateTimeConfig | null {
  if (
    !FitbitFolder[cfg.folder] ||
    !DateTimeType[cfg.type] ||
    !cfg.format ||
    typeof cfg.format !== 'string' ||
    !IsValidDateFormat(cfg.format) ||
    (cfg.prefix && typeof cfg.prefix !== 'string') ||
    (cfg.suffix && typeof cfg.suffix !== 'string')
  ) {
    console.log(`Invalid dateTime configuration: ${JSON.stringify(cfg)}`)
    return null
  }

  return {
    folder: cfg.folder,
    type: cfg.type,
    format: cfg.format,
    ...ParsePrefixSuffix(cfg.type, cfg.prefix, cfg.suffix)
  }
}

export function ParsePrefixSuffix(type: DateTimeType, prefix?: string, suffix?: string): { prefix: string, suffix: string } {
  if((!prefix || !prefix.length) && (!suffix || !suffix.length)) {
    return {
      prefix: type === 'weekDay' ? 'week' : 'month',
      suffix: ''
    }
  }
  return {
    prefix: (prefix && prefix.length) ? prefix : '',
    suffix: (suffix && suffix.length) ? suffix : ''
  }
}

function verifyLanguages(providedLocales: Array<any>): Array<SupportedLanguage> {
  return providedLocales.filter((localeId: string) => {
    if (!SupportedLanguage[localeId]) {
      console.log(`Unknown locale "${localeId}". Skipping...`)
      return false
    }
    return true
  })
}
