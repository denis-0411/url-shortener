import { v4 } from 'uuid'
import { MathUtils } from './math-utils'
import { Readable } from 'stream';

export class StringUtils {
  private static regexDomain = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/;

  static uuid() {
    return v4()
  }

  static urlToDomain(str?: string) {
    let url = str?.replace(/^\w+:\/+|:\d+/g, '') || '';

    if (StringUtils.regexDomain.test(url)) {
      const listNames = url.split('.');

      if (listNames.length > 2) {
        url = listNames.splice(-2).join('.');
      }
    }

    return url;
  }

  static generateRandomString(minLength: number = 1, maxLength: number = Number.MAX_SAFE_INTEGER) {
    const length = MathUtils.getRandomValueInRange(minLength, maxLength)
    return Array.from({ length })
      .map(() => String.fromCharCode(MathUtils.randomCharCode))
      .join('')
  }
}
