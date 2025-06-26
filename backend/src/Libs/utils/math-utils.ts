import _ from 'lodash'

export class MathUtils {
  static getRandomValueInRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min)
  }

  static get randomCharCode() {
    return Math.random() * 86 + 40
  }

  static formatCompactNumber(anyValue?: string | number): string {
    if (_.isNil(anyValue)) {
      return ''
    }

    const value = Number(anyValue)

    if (value === 0) {
      return '0'
    }

    if (value >= 1) {
      return value
        .toFixed(2)
        .replace(/\.?0+$/, '')
    } else {
      const significantDigits = 4
      let numStr = value.toPrecision(significantDigits)

      if (numStr.includes('e')) {
        const parts = numStr.split('e')
        const base = parseFloat(parts[0])
        const exponent = parseInt(parts[1], 10)
        const fixedValue = (base * Math.pow(10, exponent)).toFixed(20)

        return fixedValue.replace(/0+$/, '').replace(/\.$/, '')
      }

      return numStr.replace(/\.?0+$/, '')
    }
  }
}