import fs from 'fs'
import path from 'path'
import {SupportedLocale} from '../enums/supported-locales.enum'
import {
  DateConfig,
  FitbitLocaleConfig,
  SectionLocaleConfig
} from '../interfaces/fitbit-locale-config.interface'
import {IsValidDateFormat} from "../utils/date.util";

export function GetConfig(cfg?: any): FitbitLocaleConfig {
  const cfgPath = path.join(process.cwd(), 'fitbitLocaleHelper.json')
  const userConfig = cfg || (fs.existsSync(cfgPath) ? JSON.parse(fs.readFileSync(cfgPath, 'utf8')) : {})
  const locales: Array<SupportedLocale> = userConfig.locales ? verifyLocales(userConfig.locales) : Object.values(SupportedLocale)
  const sectionsData = {}

  for (const sectionId of ['app', 'settings', 'companion']) {
    if (userConfig[sectionId]) {
      sectionsData[sectionId] = verifySection(sectionId, userConfig[sectionId])
    }
  }

  return {
    localesFolder: userConfig.localesFolder || 'locales',
    srcFolder: userConfig.srcFolder || '',
    locales,
    ...sectionsData
  }
}

function verifySection(sectionId: string, sectionData: any): SectionLocaleConfig {
  const cfg: SectionLocaleConfig = {}
  if (sectionData.weekDayCfg !== undefined) {
    const weekCfg = verifyDateConfig(sectionId, sectionData.weekDayCfg, 'EEEE', 'week_')
    if (weekCfg) {
      cfg.weekDayCfg = weekCfg
    } else {
      console.log(`Wrong config in ${sectionId}.weekCfg. Skipping...`)
    }
  }
  if (sectionData.monthCfg) {
    const monthCfg = verifyDateConfig(sectionId, sectionData.monthCfg, 'MMMM', 'month_')
    if (monthCfg) {
      cfg.monthCfg = monthCfg
    } else {
      console.log(`Wrong config in ${sectionId}.monthCfg. Skipping...`)
    }
  }
  return cfg
}

function verifyDateConfig(sectionId: string, userCfg: any, defaultFormat: string, defaultPrefix: string): DateConfig | void {
  if (
    (userCfg.format && !IsValidDateFormat(userCfg.format)) ||
    (userCfg.prefix && typeof userCfg.prefix !== 'string') ||
    (userCfg.suffix && typeof userCfg.suffix !== 'string')
  ) {
    return
  }

  return {
    format: userCfg.format || defaultFormat,
    ...getPrefixes(userCfg, defaultPrefix)
  }
}

function getPrefixes(userCfg: any, defaultPrefix: string): { prefix: string, suffix: string } {
  if ((!userCfg.prefix && !userCfg.suffix)) {
    return {
      prefix: defaultPrefix,
      suffix: ''
    }
  }

  return {
    prefix: userCfg.prefix || '',
    suffix: userCfg.suffix || ''
  }
}

function verifyLocales(providedLocales: Array<any>): Array<SupportedLocale> {
  return providedLocales.filter((localeId: string) => {
    if (!SupportedLocale[localeId]) {
      console.log(`Unknown locale "${localeId}". Skipping...`)
      return false
    }
    return true
  })
}
