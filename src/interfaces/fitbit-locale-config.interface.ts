export enum SupportedLocale {
  "es-ES" = "es-ES",
  "en-US" = "en-US",
  "de-DE" = "de-DE",
  "fr-FR" = "fr-FR",
  "it-IT" = "it-IT",
  "ja-JP" = "ja-JP",
  "ko-KR" = "ko-KR",
  "nl-NL" = "nl-NL",
  "sv-SE" = "sv-SE",
  "zh-CN" = "zh-CN",
  "zh-TW" = "zh-TW",
  "ru-RU" = "ru-RU",
  "pt-BR" = "pt-BR",
  "ro-RO" = "ro-RO",
  "cs-CZ" = "cs-CZ",
  "pl-PL" = "pl-PL",
  "id-ID" = "id-ID"
}

export interface DateConfig {
  format: string,
  prefix?: string,
  suffix?: string
}

export interface SectionLocaleConfig {
  weekCfg?: DateConfig,
  monthCfg?: DateConfig
}

export interface FitbitLocaleConfig {
  localesFolder?: string,
  srcFolder?: string,
  locales?: Array<SupportedLocale>,
  app?: SectionLocaleConfig,
  companion?: SectionLocaleConfig,
  settings?: SectionLocaleConfig,
}
