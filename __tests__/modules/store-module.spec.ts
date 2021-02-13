import fs from "fs"
import { StoredLocales } from '../../src/classes/GeneratedLocales'
import { StoreLocales } from '../../src/modules/store.module'
import { FilesAreEquals } from '../test.util'

const srcFolder = 'testData/src'

afterAll(() => {
  clearFolder()
})

beforeEach(() => {
  clearFolder()
})

function clearFolder () {
  if(fs.existsSync(srcFolder)) {
    fs.rmdirSync(srcFolder, { recursive: true })
  }
}

describe('Store module', () => {
  test('Generate new files and folders', async () => {
    const stored: StoredLocales = {
      app: {
        'es-ES': {
          testKey: 'testValue',
          anotherKey: 'anotherValue'
        }
      }
    }

    await StoreLocales(srcFolder, stored)

    const outputFile = srcFolder + '/app/i18n/es-ES.po'
    const comparisonFile = '__tests__/comparisons/store-esES.po'
    expect(fs.existsSync(comparisonFile)).toBe(true)
    expect(fs.existsSync(outputFile)).toBe(true)
    expect(FilesAreEquals(comparisonFile, outputFile)).toBe(true)
  })

  test('Generate complex', async () => {
    const someData = {
      testKey: 'testValue',
      anotherKey: 'anotherValue'
    }

    const stored: StoredLocales = {
      app: {
        'es-ES': someData
      },
      settings: {
        'en-US': someData,
        'es-ES': someData
      },
      companion: {
        'fr-FR': someData,
        'ru-RU': someData
      }
    }

    await StoreLocales(srcFolder, stored)

    expect(fs.existsSync(`${srcFolder}/app/i18n/es-ES.po`)).toBe(true)
    expect(fs.existsSync(`${srcFolder}/settings/i18n/es-ES.po`)).toBe(true)
    expect(fs.existsSync(`${srcFolder}/settings/i18n/en-US.po`)).toBe(true)
    expect(fs.existsSync(`${srcFolder}/companion/i18n/fr-FR.po`)).toBe(true)
    expect(fs.existsSync(`${srcFolder}/companion/i18n/ru-RU.po`)).toBe(true)
  })
})
