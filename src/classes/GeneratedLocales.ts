import { FitbitFolder } from '../interfaces/fitbit-locale-config.interface'
import { SupportedLanguage } from '../enums/supported-locales.enum'

interface storedLocales {
  [folderId: string]: {
    [langId: string]: {
      [keyId: string]: string
    }
  }
}

export class GeneratedLocales {
  public readonly storedLocales: storedLocales = {}

  store (folder: FitbitFolder, langId: SupportedLanguage, keys: { [keyId: string]: string }) {
    if (!this.storedLocales[folder]) {
      this.storedLocales[folder] = {}
    }
    if (!this.storedLocales[folder][langId]) {
      this.storedLocales[folder][langId] = {}
    }
    this.storedLocales[folder][langId] = {
      ...(this.storedLocales[folder][langId] || {}),
      ...keys
    }
  }
}
