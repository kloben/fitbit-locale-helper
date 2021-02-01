import {
  FitbitLocaleConfig,
  SectionLocaleConfig,
  SupportedLocale, WeekConfig
} from "../interfaces/fitbit-locale-config.interface";
import fs from "fs";
import path from "path";
import {MonthFormat, WeekFormat} from "../enums/date-formats.enum";

export function GetConfig(): FitbitLocaleConfig {
  const cfgPath = path.join(process.cwd(), 'fitbitLocaleHelper.json');
  const userConfig = fs.existsSync(cfgPath) ? JSON.parse(fs.readFileSync(cfgPath, 'utf8')) : {}
  const locales: Array<SupportedLocale> = userConfig.locales ? verifyLocales(userConfig.locales) : Object.values(SupportedLocale);
  const sectionsData = {}

  for (const sectionId of ['app', 'settings', 'companion']) {
    if (userConfig[sectionId]) {
      sectionsData[sectionId] = verifySection(sectionId, userConfig[sectionId]);
    }
  }

  return {
    localesFolder: userConfig.localesFolder || 'locales',
    locales,
    ...sectionsData
  }
}

function verifySection(sectionId: string, sectionData: any): SectionLocaleConfig {
  let cfg = {}
  if (sectionData.weekCfg) {
    const weekCfg = verifyWeek(sectionId, sectionData.weekCfg)
    if (weekCfg) {
      cfg['weekCfg'] = weekCfg
    }
  }
  if (sectionData.monthCfg) {
    const monthCfg = verifyMonth(sectionId, sectionData.monthCfg)
    if (monthCfg) {
      cfg['monthCfg'] = monthCfg
    }
  }
  return cfg;
}

function verifyWeek(sectionId: string, userCfg: any): WeekConfig | void {
  if (!userCfg.format || !Object.values(WeekFormat).includes(userCfg.format)) {
    console.log(`Missing or wrong format in ${sectionId}.weekCfg. Skipping...`)
    return
  }

  return {
    format: userCfg.format,
    ...getPrefixes(userCfg, 'week_')
  }
}

function verifyMonth(sectionId: string, userCfg: any): WeekConfig | void {
  if (!userCfg.format || !Object.values(MonthFormat).includes(userCfg.format)) {
    console.log(`Missing or wrong format in ${sectionId}.monthCfg. Skipping...`)
    return
  }

  return {
    format: userCfg.format,
    ...getPrefixes(userCfg, 'month_')
  }
}

function getPrefixes(userCfg: any, defaultPrefix: string): { prefix?: string, suffix?: string } {
  if ((!userCfg.prefix && !userCfg.suffix)) {
    return {prefix: defaultPrefix}
  }
  const prefixes = {}
  if (userCfg.prefix) {
    prefixes['prefix'] = userCfg.prefix;
  }
  if (userCfg.suffix) {
    prefixes['suffix'] = userCfg.suffix;
  }
  return prefixes;
}

function verifyLocales(providedLocales: Array<any>): Array<SupportedLocale> {
  return providedLocales.filter((localeId: string) => {
    if (!SupportedLocale[localeId]) {
      console.log(`Unknown locale "${localeId}". Skipping...`);
      return false;
    }
    return true;
  });
}
