import { Type } from '@nestjs/common';
import { plainToInstance, ClassTransformOptions } from 'class-transformer';

export class Mapper {
  static toInstance<T extends object>(
    Class: Type<T>,
    value: T,
    options?: ClassTransformOptions,
  ): T {
    return plainToInstance(Class, value, options);
  }
}
