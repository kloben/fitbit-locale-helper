import fs from "fs";
import po2Json from "po2json";

export function GenerateExistingLocales(sectionId: string, localesFolder: string, langId: string) {
  const filePath = `${localesFolder}/${sectionId}/${langId}.po`;
  if (fs.existsSync(filePath)) {
    return po2Json.parseFileSync(filePath, {
      format: 'mf'
    });
  }

  return {};
}
