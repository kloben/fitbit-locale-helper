import fs from 'fs'
import path from 'path'

const data = {
  es: {
    week: {
      E: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
      EEEE: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado']
    },
    month: {
      MMM: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
      MMMM: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
    }
  },
  en: {
    week: {
      E: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      EEEE: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    },
    month: {
      MMM: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      MMMM: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    }
  }
}
const configPath = path.join(process.cwd(), 'fitbitLocaleHelper.json')

export function GenerateWeek (locale: 'en' | 'es', format: 'E' | 'EEEE', prefix: string, suffix: string) {
  return data[locale].week[format].reduce((carry, key, index) => {
    carry[`${prefix}${index}${suffix}`] = key
    return carry
  }, {})
}

export function GenerateMonth (locale: 'en' | 'es', format: 'MMM' | 'MMMM', prefix: string, suffix: string) {
  return data[locale].month[format].reduce((carry, key, index) => {
    carry[`${prefix}${index}${suffix}`] = key
    return carry
  }, {})
}

export function FilesAreEquals (pathA: string, pathB: string): boolean {
  const dataA = fs.readFileSync(pathA).toString()
  const dataB = fs.readFileSync(pathB).toString()

  return dataA === dataB
}

export function RestoreOriginalConfigFile () {
  fs.copyFileSync(
    path.join(process.cwd(), '__tests__/comparisons/fitbitLocaleHelper.json'),
    configPath
  )
}

export function DeleteConfigFile() {
  if(fs.existsSync(configPath)) {
    fs.unlinkSync(configPath)
  }
}

export function UpdateConfigFile (data: string) {
  fs.writeFileSync(
    configPath,
    data
  )
}
