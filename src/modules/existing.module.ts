import fs from 'fs'
import path from 'path'
import { SupportedLanguage } from '../enums/supported-locales.enum'
import { KeyValue } from '../interfaces/key-value.interface'

export function GenerateExistingLocales (localesFolder: string, sectionId: string, langId: SupportedLanguage): KeyValue | null {
  const filePath = path.join(process.cwd(), localesFolder, sectionId, `${langId}.po`)
  return fs.existsSync(filePath) ? extractFromPo(filePath) : null
}

function extractFromPo (filename: string) {
  const dataLocales = {}
  const fileData = fs.readFileSync(filename, 'utf-8').split('\n')
  let currentKey

  for (const line of fileData) {
    if (line.startsWith('msgid')) {
      currentKey = JSON.parse(line.substring(6))
    } else if (line.startsWith('msgstr') && currentKey) {
      dataLocales[currentKey] = JSON.parse(line.substring(7))
      currentKey = null
    }
  }

  return dataLocales
}
