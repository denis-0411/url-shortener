import { InternalServerErrorException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export class SerializationException extends InternalServerErrorException {
  constructor(message: string) {
    super(`Server error while serialization response: ${message}`);
  }

  static throwIfValidationError(errors: ValidationError[]) {
    if (!errors.length) {
      return
    }

    const messages = SerializationException.extractErrorMessages(errors);

    throw new SerializationException(messages.join('. '))
  }

  private static extractErrorMessages(errors: ValidationError[]) {
    const messages: string[] = []
    errors.forEach(e => {
      messages.push(Object.values(e.constraints ?? {}).join(', '))
      if (e.children?.length) {
        messages.push(...this.extractErrorMessages(e.children))
      }
    })

    return messages;
  }
}