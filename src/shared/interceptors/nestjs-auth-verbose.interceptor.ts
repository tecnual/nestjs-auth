import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
/**
 * Verbose Mode Interceptor
 */
 export class NestjsAuthVerboseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  /**
   * constructor
   * @param config 
   */
  constructor (private readonly config: ConfigService) {}

  /**
   * intercept
   * @param context 
   * @param next 
   * @returns 
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(map(data => {
      if (this.config.get('verbose')) {
        data.timestamp = new Date().toISOString();
      }
      return data
    }));
  }
}
