import format from 'date-fns/format/index.js';
import {de, enUS, es, fr, it, ja, ko, nl, sv, zhCN, zhTW, ru, ptBR, ro, cs, pl, id} from 'date-fns/locale/index.js';
import {SectionLocaleConfig, SupportedLocale} from "../interfaces/fitbit-locale-config.interface";

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
};

const monthDates: Array<Date> = [];
const weekDates: Array<Date> = [];

for (let i = 0; i < 12; i++) {
  monthDates.push(new Date(2020, i, 15, 5, 5, 5));
}
for (let i = 1; i <= 7; i++) {
  weekDates.push(new Date(2021, 7, i, 5, 5, 5));
}

export function GenerateDateLocales(localeId: SupportedLocale, cfg: SectionLocaleConfig) {
  const locales: { [keyId: string]: string } = {}
  if (cfg.weekCfg) {
    for (const date of weekDates) {
      const key = `${cfg.weekCfg.prefix || 'week_'}${date.getDay()}${cfg.weekCfg.suffix || ''}`;
      locales[key] = format(date, cfg.weekCfg.format, {locale: dateFnsLocales[localeId]})
    }
  }
  if (cfg.monthCfg) {
    for (const date of monthDates) {
      const key = `${cfg.monthCfg.prefix || 'month_'}${date.getMonth()}${cfg.monthCfg.suffix || ''}`;
      locales[key] = format(date, cfg.monthCfg.format, {locale: dateFnsLocales[localeId]})
    }
  }
  return locales
}
