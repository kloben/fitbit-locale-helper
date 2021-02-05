import fs from 'fs'
import path from "path";
import {SupportedLocale} from "../enums/supported-locales.enum";

export async function StoreLocales(srcFolder: string, sectionId: string, langId: SupportedLocale, data: any): Promise<void> {
  return new Promise((resolve) => {
    const srcPath = path.join(process.cwd(), srcFolder)

    if (!fs.existsSync(srcPath)) {
      fs.mkdirSync(srcPath)
    }

    const sectionPath = path.join(srcPath, sectionId)
    if (!fs.existsSync(sectionPath)) {
      fs.mkdirSync(sectionPath)
    }

    const i18nPath = path.join(sectionPath, 'i18n')
    if (!fs.existsSync(i18nPath)) {
      fs.mkdirSync(i18nPath)
    }

    const filePath = path.join(i18nPath, `${langId}.po`)
    fs.writeFileSync(filePath, '')
    const stream = fs.createWriteStream(filePath, {flags: 'as'})

    for (const keyId in data) {
      stream.write(`msgid "${keyId}"\n`)
      stream.write(`msgstr "${data[keyId]}"\n\n`)
    }

    stream.end(resolve)
  })
}
