import {SupportedLanguage} from "../../src/enums/supported-locales.enum";
import {SectionLocaleConfig} from "../../src/interfaces/fitbit-locale-config.interface";
import {GenerateDateLocales} from "../../src/modules/dates.module";
import {GenerateWeek, GenerateMonth} from "../test.util";

describe('Dates module', () => {

  test('Generate default spanish date', () => {
    const locale = SupportedLanguage['es-ES']
    const cfg: SectionLocaleConfig = {
      weekDayCfg: { format: 'E', prefix: 'week_', suffix: '' },
      monthCfg: { format: 'MMM', prefix: 'month_', suffix: '' }
    }

    const response = GenerateDateLocales(locale, cfg)

    expect(response).toEqual({
      ...GenerateWeek('es', 'E', 'week_', ''),
      ...GenerateMonth('es', 'MMM', 'month_', '')
    })
  })

  test('Generate default month only', () => {
    const locale = SupportedLanguage['es-ES']
    const cfg: SectionLocaleConfig = {
      monthCfg: { format: 'MMM', prefix: 'month_', suffix: '' }
    }

    const response = GenerateDateLocales(locale, cfg)

    expect(response).toEqual({
      ...GenerateMonth('es', 'MMM', 'month_', '')
    })
  })

  test('Generate default week only', () => {
    const locale = SupportedLanguage['es-ES']
    const cfg: SectionLocaleConfig = {
      weekDayCfg: { format: 'E', prefix: 'week_', suffix: '' }
    }

    const response = GenerateDateLocales(locale, cfg)

    expect(response).toEqual({
      ...GenerateWeek('es', 'E', 'week_', '')
    })
  })

  test('Generate custom week & month english', () => {
    const locale = SupportedLanguage['en-US']
    const cfg: SectionLocaleConfig = {
      weekDayCfg: { format: 'EEEE', prefix: '', suffix: '_suff' },
      monthCfg: { format: 'MMMM', prefix: 'pref_', suffix: '' },
    }

    const response = GenerateDateLocales(locale, cfg)

    expect(response).toEqual({
      ...GenerateWeek('en', 'EEEE', '', '_suff'),
      ...GenerateMonth('en', 'MMMM', 'pref_', ''),
    })
  })
})
