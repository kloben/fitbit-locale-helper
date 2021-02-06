import {GetConfig} from "../../src/modules/config.module";
import {SupportedLocale} from "../../src/enums/supported-locales.enum";

describe('Config module', () => {

  test('Default config', () => {
    const cfg = {}

    const response = GetConfig(cfg)

    expect(response).toEqual({
      localesFolder: 'locales',
      srcFolder: '',
      locales: Object.values(SupportedLocale)
    })
  })

  test('Set locales only', () => {
    const cfg = {
      locales: [SupportedLocale['es-ES'], SupportedLocale['en-US']]
    }

    const response = GetConfig(cfg)

    expect(response).toEqual({
      localesFolder: 'locales',
      srcFolder: '',
      locales: ['es-ES', 'en-US']
    })
  })

  test('Set folders', () => {
    const cfg = {
      srcFolder: 'testSrcFolder',
      localesFolder: 'testLocales'
    }

    const response = GetConfig(cfg)

    expect(response).toEqual({
      srcFolder: 'testSrcFolder',
      localesFolder: 'testLocales',
      locales: Object.values(SupportedLocale)
    })
  })

  test('Set empty app', () => {
    const cfg = {
      app: {}
    }

    const response = GetConfig(cfg)

    expect(response).toEqual({
      srcFolder: '',
      localesFolder: 'locales',
      locales: Object.values(SupportedLocale),
      app: {}
    })
  })

  test('Set settings week only', () => {
    const cfg = {
      settings: {
        weekDayCfg: {}
      }
    }

    const response = GetConfig(cfg)

    expect(response).toEqual({
      srcFolder: '',
      localesFolder: 'locales',
      locales: Object.values(SupportedLocale),
      settings: {
        weekDayCfg: {
          format: 'EEEE',
          prefix: 'week_',
          suffix: ''
        }
      }
    })
  })

  test('Set companion month only', () => {
    const cfg = {
      settings: {
        monthCfg: {}
      }
    }

    const response = GetConfig(cfg)

    expect(response).toEqual({
      srcFolder: '',
      localesFolder: 'locales',
      locales: Object.values(SupportedLocale),
      settings: {
        monthCfg: {
          format: 'MMMM',
          prefix: 'month_',
          suffix: ''
        }
      }
    })
  })
})
