import { MonthFormat, WeekFormat } from '../enums/date-formats.enum'
import { SupportedLocale } from '../enums/supported-locales.enum'

export interface DateConfig {
  format: WeekFormat | MonthFormat,
  prefix?: string,
  suffix?: string
}

export interface WeekConfig extends DateConfig {
  format: WeekFormat
}

export interface MonthConfig extends DateConfig {
  format: MonthFormat
}

export interface SectionLocaleConfig {
  weekDayCfg?: WeekConfig,
  monthCfg?: MonthConfig
}

export interface FitbitLocaleConfig {
  localesFolder: string,
  locales: Array<SupportedLocale>,
  app?: SectionLocaleConfig,
  companion?: SectionLocaleConfig,
  settings?: SectionLocaleConfig,
}
