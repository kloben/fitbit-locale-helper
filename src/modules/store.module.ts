import fs from 'fs'
import path from 'path'
import { GeneratedLocales } from '../classes/GeneratedLocales'

export async function StoreLocales (srcFolder: string, generated: GeneratedLocales): Promise<number> {
  let counter = 0
  const srcPath = path.join(process.cwd(), srcFolder)
  if (!fs.existsSync(srcPath)) {
    fs.mkdirSync(srcPath)
  }

  for (const folderId in generated.locales) {
    const folderPath = path.join(srcPath, folderId)
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath)
    }
    const i18nPath = path.join(folderPath, 'i18n')
    if (!fs.existsSync(i18nPath)) {
      fs.mkdirSync(i18nPath)
    }

    for (const langId in generated.locales[folderId]) {
      await writeFile(path.join(i18nPath, `${langId}.po`), generated.locales[folderId][langId])
      counter += Object.keys(generated.locales[folderId][langId]).length
    }
  }

  return counter
}

function writeFile (filePath: string, data: any) {
  fs.writeFileSync(filePath, '')

  return new Promise((resolve) => {
    fs.writeFileSync(filePath, '')
    const stream = fs.createWriteStream(filePath, { flags: 'as' })

    for (const keyId in data) {
      stream.write(`msgid "${keyId}"\n`)
      stream.write(`msgstr "${data[keyId]}"\n\n`)
    }

    stream.end(resolve)
  })
}
