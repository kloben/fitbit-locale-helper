import {GetConfig} from "../../src/modules/config.module";
import {SupportedLanguage} from "../../src/enums/supported-locales.enum";

function getLogSpy () {
  const logFn = jest.fn()
  console.log = logFn
  return logFn
}

describe('Config module', () => {

  test('Default config', () => {
    const cfg = {}

    const response = GetConfig(cfg)

    expect(response).toEqual({
      localesFolder: 'locales',
      srcFolder: '',
      locales: Object.values(SupportedLanguage)
    })
  })

  test('Set locales only', () => {
    const cfg = {
      locales: [SupportedLanguage['es-ES'], SupportedLanguage['en-US']]
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
      locales: Object.values(SupportedLanguage)
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
      locales: Object.values(SupportedLanguage)
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
      locales: Object.values(SupportedLanguage),
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
      locales: Object.values(SupportedLanguage),
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
      locales: Object.values(SupportedLanguage),
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
      locales: Object.values(SupportedLanguage),
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
    const logFn = getLogSpy()
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
      locales: Object.values(SupportedLanguage)
    })
  })

  test('Wrong month format', () => {
    const logFn = getLogSpy()
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
      locales: Object.values(SupportedLanguage)
    })
  })

  test('Wrong locale', () => {
    const logFn = getLogSpy()
    const cfg = {
      locales: [SupportedLanguage['es-ES'], 'wrong', SupportedLanguage['en-US']]
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
    const logFn = getLogSpy()
    const cfg = {
      locales: ['all', 'are', 'wrong']
    }

    const response = GetConfig(cfg)

    expect(logFn).toHaveBeenCalledWith('Unknown locale "all". Skipping...')
    expect(logFn).toHaveBeenCalledWith('Unknown locale "are". Skipping...')
    expect(logFn).toHaveBeenCalledWith('Unknown locale "wrong". Skipping...')
    expect(logFn).toHaveBeenCalledWith('No valid locales found. Aborting generation')
    expect(logFn).toHaveBeenCalledTimes(4)
    expect(response).toEqual(undefined)
  })
})
