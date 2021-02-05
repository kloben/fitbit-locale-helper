import {SupportedLocale} from "../../src/enums/supported-locales.enum";
import {SectionLocaleConfig} from "../../src/interfaces/fitbit-locale-config.interface";
import {MonthFormat, WeekFormat} from "../../src/enums/date-formats.enum";
import {GenerateDateLocales} from "../../src/modules/dates.module";
import {GenerateWeek, GenerateMonth} from "../date-test.util";

describe('Dates module', () => {

  test('Generate default spanish date', () => {
    const locale = SupportedLocale['es-ES']
    const cfg: SectionLocaleConfig = {
      weekDayCfg: { format: WeekFormat.E },
      monthCfg: { format: MonthFormat.MMM }
    }

    const response = GenerateDateLocales(locale, cfg)

    expect(response).toEqual({
      ...GenerateWeek('es', 'E', 'week_', ''),
      ...GenerateMonth('es', 'MMM', 'month_', '')
    })
  })

  test('Generate month only', () => {
    const locale = SupportedLocale['es-ES']
    const cfg: SectionLocaleConfig = {
      monthCfg: { format: MonthFormat.MMM }
    }

    const response = GenerateDateLocales(locale, cfg)

    expect(response).toEqual({
      ...GenerateMonth('es', 'MMM', 'month_', '')
    })
  })

  test('Generate week only', () => {
    const locale = SupportedLocale['es-ES']
    const cfg: SectionLocaleConfig = {
      weekDayCfg: { format: WeekFormat.E }
    }

    const response = GenerateDateLocales(locale, cfg)

    expect(response).toEqual({
      ...GenerateWeek('es', 'E', 'week_', '')
    })
  })
})
