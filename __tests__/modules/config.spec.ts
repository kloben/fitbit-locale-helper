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
      companion: {
        monthCfg: {}
      }
    }

    const response = GetConfig(cfg)

    expect(response).toEqual({
      srcFolder: '',
      localesFolder: 'locales',
      locales: Object.values(SupportedLocale),
      companion: {
        monthCfg: {
          format: 'MMMM',
          prefix: 'month_',
          suffix: ''
        }
      }
    })
  })

  test('Set app custom format', () => {
    const cfg = {
      app: {
        weekDayCfg: {
          format: 'E'
        },
        monthCfg: {
          format: 'MMMMM'
        }
      }
    }

    const response = GetConfig(cfg)

    expect(response).toEqual({
      srcFolder: '',
      localesFolder: 'locales',
      locales: Object.values(SupportedLocale),
      app: {
        weekDayCfg: {
          format: 'E',
          prefix: 'week_',
          suffix: ''
        },
        monthCfg: {
          format: 'MMMMM',
          prefix: 'month_',
          suffix: ''
        }
      }
    })
  })

  test('Set app custom prefix or suffix', () => {
    const cfg = {
      app: {
        weekDayCfg: {
          prefix: 'customPrefix'
        },
        monthCfg: {
          suffix: 'customSuffix'
        }
      },
      settings: {
        weekDayCfg: {
          prefix: 'somePrefix',
          suffix: 'someSuffix'
        }
      }
    }

    const response = GetConfig(cfg)

    expect(response).toEqual({
      srcFolder: '',
      localesFolder: 'locales',
      locales: Object.values(SupportedLocale),
      app: {
        weekDayCfg: {
          format: 'EEEE',
          prefix: 'customPrefix',
          suffix: ''
        },
        monthCfg: {
          format: 'MMMM',
          prefix: '',
          suffix: 'customSuffix'
        }
      },
      settings: {
        weekDayCfg: {
          format: 'EEEE',
          prefix: 'somePrefix',
          suffix: 'someSuffix'
        },
      }
    })
  })

  test('Wrong week format', () => {
    const logFn = jest.fn()
    console.log = logFn
    const cfg = {
      app: {
        weekDayCfg: {
          format: ''
        }
      }
    }

    const response = GetConfig(cfg)

    expect(logFn).toHaveBeenCalledTimes(1)
    expect(logFn).toHaveBeenCalledWith('Wrong config in app.weekCfg. Skipping...')
    expect(response).toEqual({
      localesFolder: 'locales',
      srcFolder: '',
      locales: Object.values(SupportedLocale),
      app: {}
    })
  })

  test('Wrong month format', () => {
    const logFn = jest.fn()
    console.log = logFn
    const cfg = {
      companion: {
        monthCfg: {
          format: ''
        }
      }
    }

    const response = GetConfig(cfg)

    expect(logFn).toHaveBeenCalledTimes(1)
    expect(logFn).toHaveBeenCalledWith('Wrong config in companion.monthCfg. Skipping...')
    expect(response).toEqual({
      localesFolder: 'locales',
      srcFolder: '',
      locales: Object.values(SupportedLocale),
      companion: {}
    })
  })

  test('Wrong locale', () => {
    const logFn = jest.fn()
    console.log = logFn
    const cfg = {
      locales: [SupportedLocale['es-ES'], 'wrong', SupportedLocale['en-US']]
    }

    const response = GetConfig(cfg)

    expect(logFn).toHaveBeenCalledWith('Unknown locale "wrong". Skipping...')
    expect(logFn).toHaveBeenCalledTimes(1)
    expect(response).toEqual({
      localesFolder: 'locales',
      srcFolder: '',
      locales: ['es-ES', 'en-US']
    })
  })

  test('All wrong locales', () => {

  })

  test('No settings', () => {

  })

  test('All wrong settings', () => {

  })
})
