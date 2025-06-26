import {
  add,
  sub,
  startOfDay,
  endOfDay,
  getDaysInMonth,
  differenceInDays,
  Duration,
  format,
} from 'date-fns';

type CompareProps = {
  compareWith: Date;
  comparator: 'lt' | 'gt' | 'lte' | 'gte';
};

class TimeConverter {
  fromSeconds(value: number): ConverterSource {
    return new ConverterSource('seconds', value);
  }

  fromMillis(value: number) {
    return new ConverterSource('milliseconds', value);
  }

  fromHours(value: number) {
    return new ConverterSource('hours', value);
  }
}

class ConverterSource {
  constructor(
    private sourceType: 'seconds' | 'milliseconds' | 'hours',
    private value: number,
  ) {}

  toSeconds(): number {
    switch (this.sourceType) {
      case 'seconds':
        return this.value;
      case 'milliseconds':
        return Number((this.value / 1000).toFixed(2));
      case 'hours':
        return this.value * 60;
    }
  }

  toMillis() {
    switch (this.sourceType) {
      case 'seconds':
        return this.value * 1000;
      case 'milliseconds':
        return this.value;
      case 'hours':
        return this.value * 60 * 1000;
    }
  }

  toHours() {
    switch (this.sourceType) {
      case 'seconds':
        return this.value * 60 * 60;
      case 'milliseconds':
        return this.value * 1000 * 60 * 60;
      case 'hours':
        return this.value;
    }
  }
}

export class DateUtils {
  static daysInMonths = 30;
  static convert = new TimeConverter();

  static get now(): Date {
    return new Date();
  }

  static add(date: Date, duration: Duration): Date {
    return add(date, duration);
  }

  static sub(date: Date, duration: Duration): Date {
    return sub(date, duration);
  }

  static compare(
    date: Date,
    { compareWith, comparator }: CompareProps,
  ): boolean {
    switch (comparator) {
      case 'lt':
        return date < compareWith;
      case 'gt':
        return date > compareWith;
      case 'lte':
        return date <= compareWith;
      case 'gte':
        return date >= compareWith;
    }
  }

  static startOfDay(date: Date): Date {
    return startOfDay(date);
  }

  static endOfDay(date: Date): Date {
    return endOfDay(date);
  }

  static differenceInDays(laterDate: Date, earlierDate: Date) {
    return differenceInDays(laterDate, earlierDate);
  }

  static getDaysInMonth(date: Date) {
    return getDaysInMonth(date);
  }

  static format(date: Date, dateFormat: string) {
    return format(date, dateFormat);
  }
}
