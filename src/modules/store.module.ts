import fs from 'fs'

export function StoreLocales (sectionId: string, langId: string, data: any) {
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
