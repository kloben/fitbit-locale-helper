import fs from 'fs'
import {StoreLocales} from "../../src/modules/store.module";
import {SupportedLanguage} from "../../src/enums/supported-locales.enum";
import {FilesAreEquals} from "../../__tests__/test.util";

const testSrcFolder = '__tests__/testSrc'

beforeEach(() => {
  clearSrc()
})

afterAll(() => {
  clearSrc()
})

function clearSrc () {
  if(fs.existsSync(testSrcFolder)) {
    fs.rmdir(testSrcFolder, { recursive: true }, () => {})
  }
}

describe('Store module', () => {

  test('Generate new files and folders', async () => {
    const sectionId = 'settings'
    const langId = SupportedLanguage['es-ES']
    const data = {
      testKey: 'testValue',
      anotherKey: 'anotherValue'
    }

    await StoreLocales(testSrcFolder, sectionId, langId, data)

    const outputFile = testSrcFolder + '/settings/i18n/es-ES.po'
    const testFile = '__tests__/comparisons/store-esES.po'
    expect(fs.existsSync(testFile)).toBe(true)
    expect(fs.existsSync(outputFile)).toBe(true)
    expect(FilesAreEquals(testFile, outputFile)).toBe(true)
  })

  test('Generate existing', async () => {
    const sectionId = 'app'
    const langId = SupportedLanguage['es-ES']
    const data = {
      testKey: 'testValue',
      anotherKey: 'anotherValue'
    }

    await StoreLocales(testSrcFolder, sectionId, langId, {})
    await StoreLocales(testSrcFolder, sectionId, langId, data)

    const outputFile = testSrcFolder + '/app/i18n/es-ES.po'
    const testFile = '__tests__/comparisons/store-esES.po'
    expect(fs.existsSync(testFile)).toBe(true)
    expect(fs.existsSync(outputFile)).toBe(true)
    expect(FilesAreEquals(testFile, outputFile)).toBe(true)
  })
})
