import format from 'date-fns/format/index.js'
import { enUS } from 'date-fns/locale/index.js'

export function IsValidDateFormat (inputFormat: string): boolean {
  try {
    return format(new Date(), inputFormat, { locale: enUS }).length > 0
  } catch (e) {
    return false
  }
}
