import { SupportedLocale } from '../enums/supported-locales.enum'

export interface DateConfig {
  format: string,
  prefix: string,
  suffix: string
}

export interface SectionLocaleConfig {
  weekDayCfg?: DateConfig,
  monthCfg?: DateConfig
}

export interface FitbitLocaleConfig {
  localesFolder: string,
  locales: Array<SupportedLocale>,
  app?: SectionLocaleConfig,
  companion?: SectionLocaleConfig,
  settings?: SectionLocaleConfig,
}
