import { applyDecorators, Controller, UseGuards } from '@nestjs/common';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@src/web-ui';

type OpenApiControllerOptions = {
  tag?: string;
  auth?: boolean;
};

export const OpenApiController = (
  prefix: string,
  options?: OpenApiControllerOptions,
) => {
  const decorators: ClassDecorator[] = [
    ApiCookieAuth(),
    ApiTags(options?.tag ?? prefix),
    Controller(prefix),
  ];

  if (options?.auth) {
    decorators.push(UseGuards(AuthGuard));
  }

  return applyDecorators(...decorators);
};
