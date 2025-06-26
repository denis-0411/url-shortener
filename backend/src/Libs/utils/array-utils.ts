export class ArrayUtils {
  static extract<ArrayValue extends object, Property extends keyof ArrayValue>(
    array: ArrayValue[],
    property: Property,
  ): ArrayValue[Property][] {
    return array.map((value) => value[property]);
  }

  static truthify<ArrayValue>(
    array: (ArrayValue | null | undefined)[],
  ): ArrayValue[] {
    return array.filter(Boolean) as ArrayValue[];
  }

  static unique<ArrayValue extends string | number>(
    array: ArrayValue[],
  ): ArrayValue[] {
    return Array.from(new Set(array));
  }

  static ensureArray<ArrayValue>(
    valueOrArray: ArrayValue | ArrayValue[],
  ): ArrayValue[] {
    return Array.isArray(valueOrArray) ? valueOrArray : [valueOrArray];
  }
}
