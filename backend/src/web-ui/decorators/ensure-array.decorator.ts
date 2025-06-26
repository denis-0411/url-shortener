import { Transform } from 'class-transformer';
import { ArrayUtils } from '@libs/utils';

export const EnsureArray = () =>
  Transform(({ value }) => (value ? ArrayUtils.ensureArray(value) : value));
