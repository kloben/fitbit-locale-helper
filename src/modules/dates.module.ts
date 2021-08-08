import format from 'date-fns/format/index.js'
import { cs, de, enUS, es, fr, id, it, ja, ko, nb, nl, pl, ptBR, ro, ru, sv, zhCN, zhTW } from 'date-fns/locale/index.js'
import { SupportedLanguage } from '../enums/supported-locales.enum'
import { DateTimeConfig } from '../interfaces/fitbit-locale-config.interface'
import { KeyValue } from '../interfaces/key-value.interface'

const dateFnsLocales = {
  'es-ES': es,
  'en-US': enUS,
  'de-DE': de,
  'fr-FR': fr,
  'it-IT': it,
  'ja-JP': ja,
  'ko-KR': ko,
  'nl-NL': nl,
  'sv-SE': sv,
  'zh-CN': zhCN,
  'zh-TW': zhTW,
  'ru-RU': ru,
  'pt-BR': ptBR,
  'ro-RO': ro,
  'cs-CZ': cs,
  'pl-PL': pl,
  'id-ID': id,
  'nb-NO': nb
}

const monthDates: Array<Date> = []
const weekDates: Array<Date> = []

for (let i = 0; i < 12; i++) {
  monthDates.push(new Date(2020, i, 15, 5, 5, 5))
}
for (let i = 1; i <= 7; i++) {
  weekDates.push(new Date(2021, 7, i, 5, 5, 5))
}

export function GenerateDateLocales (localeId: SupportedLanguage, cfg: DateTimeConfig): KeyValue {
  const fnName = cfg.type === 'weekDay' ? 'getDay' : 'getMonth'
  const source: Array<Date> = cfg.type === 'weekDay' ? weekDates : monthDates
  const output = {}

  for (const date of source) {
    const key = `${cfg.prefix}${date[fnName]()}${cfg.suffix}`
    output[key] = format(date, cfg.format, { locale: dateFnsLocales[localeId] })
  }

  return output
}
