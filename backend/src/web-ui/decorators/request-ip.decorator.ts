import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { Request } from 'express'

export const RequestIp = createParamDecorator((_, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest<Request>()
  return request.header('x-forwarded-for') || request.ip
})
