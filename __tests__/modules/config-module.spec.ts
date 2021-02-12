import { SupportedLanguage } from '../../src/enums/supported-locales.enum'
import { GetConfig } from '../../src/modules/config.module'

function getLogSpy () {
  const logFn = jest.fn()
  console.log = logFn
  return logFn
}

describe('Config module', () => {
  test('Default config', () => {
    const response = GetConfig({})

    expect(response).toEqual({
      localesFolder: null,
      srcRootFolder: '',
      languages: Object.values(SupportedLanguage),
      dateTimes: []
    })
  })

  test('Set folders', () => {
    const initialCfg = {
      srcRootFolder: 'testRoot',
      localesFolder: 'testLocales'
    }

    const response = GetConfig(initialCfg)

    expect(response).toEqual({
      srcRootFolder: 'testRoot',
      localesFolder: 'testLocales',
      languages: Object.values(SupportedLanguage),
      dateTimes: []
    })
  })

  test('Set srcRootFolder other than string', () => {
    const logFn = getLogSpy()
    const initialCfg = {
      srcRootFolder: 5
    }

    const response = GetConfig(initialCfg)

    expect(response).toEqual(null)
    expect(logFn).toHaveBeenCalledTimes(1)
    expect(logFn).toHaveBeenCalledWith('Wrong srcRootFolder. Must be string')
  })

  test('Set locales other than string', () => {
    const logFn = getLogSpy()
    const initialCfg = {
      localesFolder: {}
    }

    const response = GetConfig(initialCfg)

    expect(response).toEqual(null)
    expect(logFn).toHaveBeenCalledTimes(1)
    expect(logFn).toHaveBeenCalledWith('Wrong localesFolder. Must be string')
  })

  test('Set languages', () => {
    const initialCfg = { languages: ['es-ES', 'en-US'] }

    const response = GetConfig(initialCfg)

    expect(response).toEqual({
      localesFolder: null,
      srcRootFolder: '',
      languages: ['es-ES', 'en-US'],
      dateTimes: []
    })
  })

  test('Set mixed wrong language', () => {
    const logFn = getLogSpy()
    const initialCfg = { languages: ['es-ES', 'en'] }

    const response = GetConfig(initialCfg)

    expect(response).toEqual({
      localesFolder: null,
      srcRootFolder: '',
      languages: ['es-ES'],
      dateTimes: []
    })
    expect(logFn).toHaveBeenCalledTimes(1)
    expect(logFn).toHaveBeenCalledWith('Unknown locale "en". Skipping...')
  })

  test('Set all wrong language', () => {
    const logFn = getLogSpy()
    const initialCfg = { languages: ['es', 'en'] }

    const response = GetConfig(initialCfg)

    expect(response).toEqual(null)
    expect(logFn).toHaveBeenCalledTimes(3)
    expect(logFn).toHaveBeenCalledWith('No valid languages found. Aborting generation')
    expect(logFn).toHaveBeenCalledWith('Unknown locale "es". Skipping...')
    expect(logFn).toHaveBeenCalledWith('Unknown locale "en". Skipping...')
  })

  test('Set dateTimes other than array', () => {
    const logFn = getLogSpy()
    const initialCfg = {
      dateTimes: {}
    }

    const response = GetConfig(initialCfg)

    expect(response).toEqual(null)
    expect(logFn).toHaveBeenCalledTimes(1)
    expect(logFn).toHaveBeenCalledWith('Wrong dateTimes. Must be Array')
  })

  test('Set simple DateTime', () => {
    const dateTimes = [
      {
        folder: 'app',
        type: 'weekDay',
        format: 'EEEE'
      },
      {
        folder: 'companion',
        type: 'month',
        format: 'MMMM'
      }
    ]
    const initialCfg = { dateTimes }
    const response = GetConfig(initialCfg)

    expect(response).toEqual({
      localesFolder: null,
      srcRootFolder: '',
      languages: Object.values(SupportedLanguage),
      dateTimes: [
        {
          folder: 'app',
          type: 'weekDay',
          format: 'EEEE',
          prefix: 'week',
          suffix: ''
        },
        {
          folder: 'companion',
          type: 'month',
          format: 'MMMM',
          prefix: 'month',
          suffix: ''
        }
      ]
    })
  })

  test('Set DateTimes with custom prefix / suffix', () => {
    const dateTimes = [
      {
        folder: 'app',
        type: 'weekDay',
        format: 'EEEE',
        prefix: 'customA'
      },
      {
        folder: 'settings',
        type: 'month',
        format: 'EEEE',
        suffix: 'customB'
      },
      {
        folder: 'companion',
        type: 'weekDay',
        format: 'EEEE',
        prefix: '',
        suffix: ''
      }
    ]

    const initialCfg = { dateTimes }
    const response = GetConfig(initialCfg)

    expect(response).toEqual({
      localesFolder: null,
      srcRootFolder: '',
      languages: Object.values(SupportedLanguage),
      dateTimes: [
        {
          folder: 'app',
          type: 'weekDay',
          format: 'EEEE',
          prefix: 'customA',
          suffix: ''
        },
        {
          folder: 'settings',
          type: 'month',
          format: 'EEEE',
          prefix: '',
          suffix: 'customB'
        },
        {
          folder: 'companion',
          type: 'weekDay',
          format: 'EEEE',
          prefix: 'week',
          suffix: ''
        }
      ]
    })
  })

  test('Set DateTimes with errors', () => {
    const dateTimes = [
      {
        folder: 'app',
        type: 'weekDay',
        format: '' // Wrong
      },
      {
        folder: 'companion',
        type: 'mo', // Wrong
        format: 'MMMM'
      },
      {
        folder: 'companionss', // Wrong
        type: 'month',
        format: 'MMMM'
      },
      {
        folder: 'companion',
        type: 'weekDay',
        //format: 'MMMM', Wrong
      },
      {
        folder: 'app',
        type: 'month',
        format: 'MMMM',
        prefix: {} // Wrong
      },
      {
        folder: 'settings',
        type: 'month',
        format: 'MMMM',
        suffix: 4 // Wrong
      }
    ]
    const initialCfg = { dateTimes }
    const logSpy = getLogSpy()
    const response = GetConfig(initialCfg)

    expect(response).toEqual({
      localesFolder: null,
      srcRootFolder: '',
      languages: Object.values(SupportedLanguage),
      dateTimes: []
    })
    expect(logSpy).toHaveBeenCalledTimes(6)
  })
})
