import {
  applyDecorators,
  HttpStatus,
  SetMetadata,
  Type,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBodyOptions,
  ApiExtraModels,
  ApiHeaderOptions,
  ApiOperation,
  ApiParam,
  ApiParamOptions,
  ApiQueryOptions,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import {
  AuthGuard,
  PaginatedResponseDto,
  RolesGuard,
  SerializeResponseInterceptor,
  TwoFactorAuthGuard,
} from '@src/web-ui';
import { TwoFactorAuthType, UserRole } from '@src/domain';
import { metadataKeys } from '@libs/constants';
import _ from 'lodash';
import { ArrayUtils } from '@libs/utils';

type MethodOptions = {
  params?: ApiParamOptions;
  response?: {
    status?: HttpStatus;
    type?: Type | [Type];
    descriptions?: string;
    paginated?: Type;
  };
  body?: ApiBodyOptions;
  query?: ApiQueryOptions;
  headers?: ApiHeaderOptions[];
  summary?: string;
  auth?: true;
  twoFactored?: {
    type: TwoFactorAuthType;
    required?: true;
    tokenField?: string;
  };
  roles?: UserRole | UserRole[];
};

export const Method = (options?: MethodOptions) => {
  const decorators: MethodDecorator[] = [];

  if (options?.summary) {
    decorators.push(ApiOperation({ summary: options.summary }));
  }

  if (options?.params) {
    decorators.push(ApiParam(options.params));
  }

  if (options?.response) {
    const { type, paginated, ...response } = options.response;

    const typeParsed = options.response.type
      ? Array.isArray(options.response.type)
        ? options.response.type[0]
        : options.response.type
      : undefined;

    if (paginated) {
      decorators.push(ApiExtraModels(PaginatedResponseDto, paginated));
      decorators.push(
        ApiResponse({
          ...response,
          schema: {
            allOf: [
              { $ref: getSchemaPath(PaginatedResponseDto) },
              {
                properties: {
                  items: {
                    type: 'array',
                    items: { $ref: getSchemaPath(paginated) },
                  },
                },
              },
            ],
          },
        }),
      );
    } else {
      decorators.push(
        ApiResponse({
          ...response,
          type: typeParsed,
          isArray: Array.isArray(options.response.type),
        }),
      );
    }

    if (type) {
      decorators.push(UseInterceptors(new SerializeResponseInterceptor(type)));
    }

    if (paginated) {
      decorators.push(
        UseInterceptors(new SerializeResponseInterceptor(paginated, true)),
      );
    }
  }

  if (options?.auth || options?.twoFactored) {
    decorators.push(UseGuards(AuthGuard));
  }

  if (options?.roles) {
    decorators.push(
      SetMetadata(metadataKeys.roles, ArrayUtils.ensureArray(options.roles)),
    );

    decorators.push(UseGuards(RolesGuard));
  }

  if (options?.twoFactored) {
    decorators.push(
      SetMetadata(metadataKeys.twoFactorAuth.type, options.twoFactored.type),
    );

    if (!_.isNil(options.twoFactored.required)) {
      decorators.push(
        SetMetadata(
          metadataKeys.twoFactorAuth.required,
          options.twoFactored.required,
        ),
      );
    }
    if (options.twoFactored.tokenField) {
      decorators.push(
        SetMetadata(
          metadataKeys.twoFactorAuth.tokenField,
          options.twoFactored.tokenField,
        ),
      );
    }

    decorators.push(UseGuards(TwoFactorAuthGuard));
  }

  return applyDecorators(...decorators);
};
