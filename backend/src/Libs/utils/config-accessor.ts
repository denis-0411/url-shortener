import dotenv from 'dotenv'

dotenv.config()

type TypeMap<T> =
  T extends StringConstructor ? string :
    T extends NumberConstructor ? number :
      T extends BooleanConstructor ? boolean :
        never

export class ConfigAccessor {
  static get<T extends StringConstructor | NumberConstructor | BooleanConstructor>(
    key: string,
    type: T
  ): TypeMap<T> {
    const value = process.env?.[key]
    if (value === undefined) {
      throw new Error(`Property ${key} is not set`)
    }

    if (type === String) {
      return value as TypeMap<T>
    }

    if (type === Number) {
      const num = Number(value)
      if (isNaN(num)) {
        throw new Error(`Property ${key} is not a number`)
      }
      return num as TypeMap<T>
    }

    if (type === Boolean) {
      return (value === 'true') as TypeMap<T>
    }

    throw new Error(`Unsupported type for property ${key}`)
  }
}