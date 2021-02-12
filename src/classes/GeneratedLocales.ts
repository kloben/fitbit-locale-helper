import { FitbitFolder } from '../interfaces/fitbit-locale-config.interface'
import { SupportedLanguage } from '../enums/supported-locales.enum'
import { KeyValue } from '../interfaces/key-value.interface'

export interface StoredLocales {
  [folderId: string]: {
    [langId: string]: {
      [keyId: string]: string
    }
  }
}

export class GeneratedLocales {
  public readonly locales: StoredLocales = {}

  store (folder: FitbitFolder, langId: SupportedLanguage, keys: KeyValue) {
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
