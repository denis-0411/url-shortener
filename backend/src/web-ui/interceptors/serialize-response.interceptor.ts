import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  Type,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { validateSync } from 'class-validator';
import { PaginatedResponseDto, SerializationException } from '@src/web-ui';
import { Mapper } from '@libs/utils'

export class SerializeResponseInterceptor<T extends object>
  implements NestInterceptor<any, T>
{
  constructor(
    private Dto: Type<T> | [Type<T>],
    private paginated?: boolean,
  ) {}

  intercept(_: ExecutionContext, next: CallHandler): Observable<T> {
    return next.handle().pipe<T>(
      map((data) => {
        if (!data) {
          return data;
        }

        if (this.paginated) {
          const paginatedData = data as PaginatedResponseDto<T>;

          if (!paginatedData.items) {
            throw new SerializationException('No items in paginated data');
          }

          paginatedData.items = paginatedData.items.map((item) =>
            this.processSingleObject(item),
          );

          return paginatedData;
        }

        if (Array.isArray(this.Dto)) {
          if (!Array.isArray(data)) {
            throw new SerializationException(
              'Returned object is not an array, while array expected',
            );
          }

          return data.map((item) => this.processSingleObject(item));
        }

        return this.processSingleObject(data);
      }),
    );
  }

  private processSingleObject(data: any): T {
    const Dto = Array.isArray(this.Dto) ? this.Dto[0] : this.Dto;
    const instance = Mapper.toInstance<T>(Dto, data, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    });

    const errors = validateSync(instance);

    SerializationException.throwIfValidationError(errors);

    return instance;
  }
}
