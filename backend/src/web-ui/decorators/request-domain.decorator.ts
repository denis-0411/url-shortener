import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { Request } from 'express'
import { StringUtils } from '@libs/utils';

export const RequestDomain = createParamDecorator((_, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest<Request>()

  return StringUtils.urlToDomain(request.headers['origin'] || request.hostname)
})
