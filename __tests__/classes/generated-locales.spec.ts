import { GeneratedLocales } from '../../src/classes/GeneratedLocales'
import { SupportedLanguage } from '../../src/enums/supported-locales.enum'
import { FitbitFolder } from '../../src/interfaces/fitbit-locale-config.interface'

describe('StoredLocales class', () => {
  test('Test empty', () => {
    const gen = new GeneratedLocales()

    expect(gen.locales).toEqual({})
  })

  test('Test simple insert', () => {
    const gen = new GeneratedLocales()

    gen.store(FitbitFolder.app, SupportedLanguage['en-US'], { someKey: 'someValue' })

    expect(gen.locales).toEqual({
      app: {
        'en-US': { someKey: 'someValue' }
      }
    })
  })

  test('Test complex insert', () => {
    const gen = new GeneratedLocales()

    gen.store(FitbitFolder.app, SupportedLanguage['en-US'], { someKey: 'someValue' })
    gen.store(FitbitFolder.app, SupportedLanguage['en-US'], { someKey3: 'someValue3' })
    gen.store(FitbitFolder.settings, SupportedLanguage['es-ES'], { someKey2: 'someValue2' })
    gen.store(FitbitFolder.settings, SupportedLanguage['es-ES'], { someKey2: 'replacedValue' })
    gen.store(FitbitFolder.companion, SupportedLanguage['es-ES'], {})

    expect(gen.locales).toEqual({
      app: {
        'en-US': {
          someKey: 'someValue',
          someKey3: 'someValue3'
        }
      },
      settings: {
        'es-ES': { someKey2: 'replacedValue' }
      }
    })
  })
})
