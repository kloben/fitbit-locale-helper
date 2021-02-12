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
})
