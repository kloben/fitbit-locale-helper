import fs from 'fs'
import path from "path";

export function StoreLocales (srcFolder: string, sectionId: string, langId: string, data: any) {
  const filePath = path.join(process.cwd(), localesFolder, sectionId, `${langId}.po`)

  if (!fs.existsSync(`${sectionId}/i18n`)) {
    fs.mkdirSync(`${sectionId}/i18n`)
  }

  const filePath = `${sectionId}/i18n/${langId}.po`
  fs.writeFileSync(filePath, '')
  const stream = fs.createWriteStream(filePath, { flags: 'as' })

  for (const keyId in data) {
    stream.write(`msgid "${keyId}"\n`)
    stream.write(`msgstr "${data[keyId]}"\n\n`)
  }

  stream.end()
}
