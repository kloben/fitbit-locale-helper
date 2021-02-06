import {IsValidDateFormat} from "../../src/utils/date.util";

describe('Date util', () => {

  test('Test valid formats', () => {
    expect(IsValidDateFormat('E')).toBe(true)
    expect(IsValidDateFormat('EEEE')).toBe(true)
    expect(IsValidDateFormat('MMM')).toBe(true)
    expect(IsValidDateFormat('MMMM')).toBe(true)
  })


  test('Test invalid formats', () => {
    expect(IsValidDateFormat('')).toBe(false)
    expect(IsValidDateFormat(null)).toBe(false)
    expect(IsValidDateFormat(undefined)).toBe(false)
  })
})
