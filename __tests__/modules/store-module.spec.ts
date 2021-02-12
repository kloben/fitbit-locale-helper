import fs from "fs"
import { StoredLocales } from '../../src/classes/GeneratedLocales'
import { StoreLocales } from '../../src/modules/store.module'
import { FilesAreEquals } from '../test.util'

afterAll(() => {
  for(const srcFolder of srcFolders) {
    clearFolder(srcFolder)
  }
})

const srcFolders = ['testDataSrcA', 'testDataSrcB']

function clearFolder (srcFolder) {
  if(fs.existsSync(srcFolder)) {
    fs.rmdir(srcFolder, { recursive: true }, () => {})
  }
}

describe('Store module', () => {
  test('Generate new files and folders', async () => {
    clearFolder(srcFolders[0])
    const stored: StoredLocales = {
      app: {
        'es-ES': {
          testKey: 'testValue',
          anotherKey: 'anotherValue'
        }
      }
    }

    await StoreLocales(srcFolders[0], stored)

    const outputFile = srcFolders[0] + '/app/i18n/es-ES.po'
    const comparisonFile = '__tests__/comparisons/store-esES.po'
    expect(fs.existsSync(comparisonFile)).toBe(true)
    expect(fs.existsSync(outputFile)).toBe(true)
    expect(FilesAreEquals(comparisonFile, outputFile)).toBe(true)
  })

  test('Generate complex', async () => {
    clearFolder(srcFolders[1])
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

    await StoreLocales(srcFolders[1], stored)

    expect(fs.existsSync(`${srcFolders[1]}/app/i18n/es-ES.po`)).toBe(true)
    expect(fs.existsSync(`${srcFolders[1]}/settings/i18n/es-ES.po`)).toBe(true)
    expect(fs.existsSync(`${srcFolders[1]}/settings/i18n/en-US.po`)).toBe(true)
    expect(fs.existsSync(`${srcFolders[1]}/companion/i18n/fr-FR.po`)).toBe(true)
    expect(fs.existsSync(`${srcFolders[1]}/companion/i18n/ru-RU.po`)).toBe(true)
  })
})
