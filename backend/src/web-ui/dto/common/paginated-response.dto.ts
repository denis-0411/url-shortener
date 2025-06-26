import { OpenApiProperty } from '@src/web-ui';
import { IsNumber } from 'class-validator';

export class PaginatedResponseDto<T> {
  @OpenApiProperty({ description: 'Номер страницы пагинации' })
  @IsNumber()
  pageNumber: number;

  @OpenApiProperty({ description: 'Количество страниц пагинации' })
  @IsNumber()
  totalPages: number;

  @OpenApiProperty({ description: 'Общее количество записей' })
  @IsNumber()
  totalCount: number;

  @OpenApiProperty({ description: 'Записи' })
  items: T[];
}