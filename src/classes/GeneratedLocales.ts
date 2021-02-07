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
  public readonly locales: storedLocales = {}

  store (folder: FitbitFolder, langId: SupportedLanguage, keys: { [keyId: string]: string }) {
    if (!this.locales[folder]) {
      this.locales[folder] = {}
    }
    if (!this.locales[folder][langId]) {
      this.locales[folder][langId] = {}
    }
    this.locales[folder][langId] = {
      ...(this.locales[folder][langId] || {}),
      ...keys
    }
  }
}
