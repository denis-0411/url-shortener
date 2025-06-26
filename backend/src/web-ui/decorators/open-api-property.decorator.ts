import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export const OpenApiProperty = (options?: ApiPropertyOptions) => {
  const decorators: PropertyDecorator[] = [
    ApiProperty(options),
    Expose()
  ]

  if (options?.type && typeof options.type === 'function') {
    decorators.push(Type(() => options.type as Function))
  }

  return applyDecorators(...decorators)
}