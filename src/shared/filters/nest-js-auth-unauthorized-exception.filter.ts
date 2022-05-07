import { ExceptionFilter, Catch, ArgumentsHost, HttpException, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';
import { AuthErrorResponse } from '../../models/responses/auth-error.response';
import { NestjsAuthDefaultResponse } from '../../models/responses/nestjs-auth-default.response';

@Catch(UnauthorizedException)
/**
 * UnauthorizedExceptionFilter
 */
export class NestjsAuthUnauthorizedExceptionFilter implements ExceptionFilter {
  /**
   * catch
   * @param exception 
   * @param host 
   */
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    response
      .status(status)
      .json(new NestjsAuthDefaultResponse(null, null, [new AuthErrorResponse(status, exception.message)]));
  }
}