import { ArgumentsHost, Catch, ExceptionFilter, Inject } from '@nestjs/common'
import { DisplayedMessage, ILoggerService } from '@src/application'
import { Request, Response } from 'express'
import _ from 'lodash'

@Catch()
export class CommonExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(ILoggerService) private logger: ILoggerService
  ) {
    this.logger.setContext(CommonExceptionFilter)
  }

  catch(exception: any, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    const response = this.getResponseBody(exception, req);

    this.logger.error(`${response.method} ${response.path} ${response.message}`, response.stack);

    res.status(response.statusCode).json(response);
  }

  protected getResponseBody(exception: any, request: Request) {
    let response: any = {
      statusCode: exception.status || exception.statusCode || 500,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      params: request.params,
      query: request.query,
      message: 'Internal server error',
    };

    if (exception.stack) {
      response.stack = exception.stack;
    }

    if (exception.message) {
      if (_.isString(exception.message)) {
        response.message = exception.message;
      }
    }

    if (exception.response && exception.response instanceof DisplayedMessage) {
      response.message = exception.response.message;
      response.displayedMessage = exception.response.message;
    }

    if (_.isObject(exception.error)) {
      response = _.extend(response, exception.error);
    }

    if (_.isObject(exception.response)) {
      response = _.extend(response, exception.response);
    }

    if (exception.getResponse) {
      const exceptionResponse = exception.getResponse();

      if (_.isString(exceptionResponse)) {
        response.message = exceptionResponse;
      } else if (exceptionResponse?.statusCode) {
        response = _.extend(response, exception.getResponse());
      } else {
        response = _.extend(response, exceptionResponse);
      }
    }

    if (!this.canStringifyResponse(response)) {
      response.message = 'Internal server error'
      delete response.stack
    }

    return response;
  }

  protected canStringifyResponse(value: any): boolean {
    if (typeof value === 'string') {
      return true
    }
    try {
      JSON.stringify(value)
      return true
    } catch (e) {
      return false
    }
  }
}
