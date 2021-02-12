import { GenerateDateLocales } from '../../src/modules/dates.module'
import { DateTimeConfig, DateTimeType, FitbitFolder } from '../../src/interfaces/fitbit-locale-config.interface'
import { SupportedLanguage } from '../../src/enums/supported-locales.enum'
import { GenerateMonth, GenerateWeek } from '../test.util'

describe('Dates module', () => {
  test('Generate spanish weeks', () => {
    const langId = SupportedLanguage['es-ES']
    const cfg: DateTimeConfig = {
      folder: FitbitFolder.app,
      type: DateTimeType.weekDay,
      format: 'EEEE',
      prefix: 'week',
      suffix: ''
    }

    const response = GenerateDateLocales(langId, cfg)

    expect(response).toEqual(GenerateWeek('es', 'EEEE', 'week', ''))
  })

  test('Generate english months', () => {
    const langId = SupportedLanguage['en-US']
    const cfg: DateTimeConfig = {
      folder: FitbitFolder.settings,
      type: DateTimeType.month,
      format: 'MMMM',
      prefix: '',
      suffix: 'month'
    }

    const response = GenerateDateLocales(langId, cfg)

    expect(response).toEqual(GenerateMonth('en', 'MMMM', '', 'month'))
  })
})
