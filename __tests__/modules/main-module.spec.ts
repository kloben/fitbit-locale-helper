import fs from 'fs'
import { StartGeneration } from '../../src/modules/main-module'
import path from 'path'

const originalPath = path.join(process.cwd(), 'fitbitLocaleHelper.json')
const backupPath = path.join(process.cwd(), 'fitbitLocaleHelperBACKUP.json')

beforeAll(() => {
  fs.renameSync(originalPath, backupPath)
})

afterAll(() => {
  fs.renameSync(backupPath, originalPath)
  if (fs.existsSync(backupPath)) {
    fs.unlinkSync(backupPath)
  }
})

describe('Main module', () => {
  test('Generate without config', async () => {
    const response = await StartGeneration()

    expect(response).toBe(0)
  })

  test('Generate with wrong config', async () => {
    fs.writeFileSync(originalPath, 'asdads')
    const response = await StartGeneration()

    expect(response).toBe(0)
  })

  test('Generate with config', async () => {
    if(fs.existsSync('testData/src')) {
      fs.rmdir('testData/src', { recursive: true }, () => {})
    }
    fs.copyFileSync(backupPath, originalPath)
    const response = await StartGeneration()

    expect(response).toBe(41)
    expect(fs.existsSync('testData/src/app/i18n/es-ES.po')).toBe(true)
    expect(fs.existsSync('testData/src/app/i18n/fr-FR.po')).toBe(true)
  })
})
