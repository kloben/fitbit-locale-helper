import { SupportedLanguage } from '../enums/supported-locales.enum'

export enum DateTimeType {
  weekDay = 'weekDay',
  month = 'month'
}

export enum FitbitFolder {
  app = 'app',
  companion = 'companion',
  settings = 'settings',
}

export interface DateTimeConfig {
  folder: FitbitFolder,
  type: DateTimeType,
  format: string,
  prefix: string,
  suffix: string
}

export interface FitbitLocaleConfig {
  srcRootFolder: string,
  languages: Array<SupportedLanguage>,
  localesFolder?: string,
  dateTimes?: Array<DateTimeConfig>
}
