import fs from "fs";

export function StoreLocales(sectionId: string, langId: string, srcFolder: string, data: any) {
  if (!fs.existsSync(`${srcFolder}/i18n`)) {
    fs.mkdirSync(`${srcFolder}/i18n`);
  }

  const filePath = `${srcFolder}/i18n/${langId}.po`;
  fs.writeFileSync(filePath, '');
  const stream = fs.createWriteStream(filePath, {flags: 'as'});

  for(let keyId in data) {
    stream.write(`msgid "${keyId}"\n`);
    stream.write(`msgstr "${data[keyId]}"\n\n`);
  }

  stream.end();
}
