import {GenerateExistingLocales} from "../../src/modules/existing.module";
import {SupportedLanguage} from "../../src/enums/supported-locales.enum";

describe('Existing module', () => {

  test('Generate keys from file', () => {
    const sectionId = 'app'
    const folder = '__tests__/testLocales'
    const localeId = SupportedLanguage['en-US']

    const response = GenerateExistingLocales(sectionId, folder, localeId)

    expect(response).toEqual({
      testKey: 'testValue',
      anotherKey: 'anotherValue',
      lastItem: 'lastValue'
    })
  })


  test('Generate keys not found file', () => {
    const sectionId = 'app'
    const folder = '__tests__/testLocales'
    const localeId = SupportedLanguage['es-ES']

    const response = GenerateExistingLocales(sectionId, folder, localeId)

    expect(response).toEqual({})
  })
})
