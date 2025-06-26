import { Transform } from 'class-transformer';

export const LowerCase = () => Transform(({ value }) => {
  if (value && typeof value === 'string') {
    return value.toLowerCase();
  }

  return value;
})