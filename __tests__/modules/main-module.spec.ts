import fs from 'fs'
import { StartGeneration } from '../../src/modules/main-module'
import { GetLogSpy, RestoreOriginalConfigFile, UpdateConfigFile } from '../test.util'

const srcFolder = 'testData/src'

beforeAll(() => {
  if(fs.existsSync(srcFolder)) {
    fs.rmdirSync(srcFolder, { recursive: true })
  }
})

afterAll(() => {
  RestoreOriginalConfigFile()
  if(fs.existsSync(srcFolder)) {
    fs.rmdirSync(srcFolder, { recursive: true })
  }
})

describe('Main module', () => {
  test('Generate without config', async () => {
    const response = await StartGeneration()

    expect(response).toBe(41)
  })

  test('Generate with wrong config', async () => {
    const logSpy = GetLogSpy()
    UpdateConfigFile('asdasd')

    const response = await StartGeneration()

    expect(response).toBe(0)
    expect(logSpy).toBeCalledTimes(1)
    expect(logSpy).toBeCalledWith('Wrong fitbitLocaleHelper.json. Aborting')
  })

  test('Generate with config', async () => {
    RestoreOriginalConfigFile()

    const response = await StartGeneration()

    expect(response).toBe(41)
    expect(fs.existsSync('testData/src/app/i18n/es-ES.po')).toBe(true)
    expect(fs.existsSync('testData/src/app/i18n/fr-FR.po')).toBe(true)
  })
})
