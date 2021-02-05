const data = {
  es: {
    week: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
    month: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
  }
}

export function GenerateWeek(locale: 'en' | 'es', format: 'E' | 'EEE', prefix: string, suffix: string) {
  return data[locale].week.reduce((carry, key, index) => {
    carry[`${prefix}${index}${suffix}`] = key
    return carry;
  }, {})
}

export function GenerateMonth(locale: 'en' | 'es', format: 'MMM', prefix: string, suffix: string) {
  return data[locale].month.reduce((carry, key, index) => {
    carry[`${prefix}${index}${suffix}`] = key
    return carry;
  }, {})
}
