import fs from "fs";

export function GenerateExistingLocales(sectionId: string, localesFolder: string, langId: string) {
  const filePath = `${localesFolder}/${sectionId}/${langId}.po`;
  return fs.existsSync(filePath) ? extractFromPo(filePath) : {}
}

function extractFromPo(filename: string) {
  const dataLocales = {}
  const fileData = fs.readFileSync(filename, 'utf-8').split('\n')
  let currentKey;

  for (let line of fileData) {
    if (line.startsWith('msgid')) {
      currentKey = JSON.parse(line.substring(6));
    } else if (line.startsWith('msgstr') && currentKey) {
      dataLocales[currentKey] = JSON.parse(line.substring(7));
      currentKey = null;
    }
  }

  return dataLocales;
}
