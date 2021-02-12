import { SupportedLanguage } from '../../src/enums/supported-locales.enum'
import { GenerateExistingLocales } from '../../src/modules/existing.module'

describe('Existing module', () => {
  test('Generate from existing file', () => {
    const sectionId = 'app'
    const folder = 'testData/locales'
    const localeId = SupportedLanguage['es-ES']

    const response = GenerateExistingLocales(folder, sectionId, localeId)

    expect(response).toEqual({
      testKey: 'testValue',
      anotherKey: 'anotherValue',
      lastItem: 'lastValue'
    })
  })

  test('Try to generate but not found', () => {
    const sectionId = 'app'
    const folder = 'testData/locales'
    const localeId = SupportedLanguage['en-US']

    const response = GenerateExistingLocales(folder, sectionId, localeId)

    expect(response).toEqual(null)
  })
})
