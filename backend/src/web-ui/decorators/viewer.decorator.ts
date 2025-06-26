import { createParamDecorator, ExecutionContext, InternalServerErrorException } from '@nestjs/common';
import { Request } from 'express';

export const Viewer = createParamDecorator((data: 'id' | 'sessionId', context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest<Request>();

  const claims = request.claims
  if (!claims) {
    throw new InternalServerErrorException('Claims not set');
  }

  if (data) {
    return data === 'id' ? claims.userId : claims[data];
  }

  return claims;
})