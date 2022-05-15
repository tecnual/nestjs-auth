import { DynamicModule, Module } from '@nestjs/common';
import { NestjsAuthService } from './nestjs-auth.service';
import { NestjsAuthController } from './nestjs-auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './users/users.module';
import { LocalStrategy } from './shared/strategies/local.strategy';
import { JwtStrategy } from './shared/strategies/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { NestjsAuthVerboseInterceptor } from './shared/interceptors/nestjs-auth-verbose.interceptor';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { NestjsAuthUnauthorizedExceptionFilter } from './shared/filters/nest-js-auth-unauthorized-exception.filter';
import { NestjsAuthConfig, NestjsAuthOptions } from './models/nestjs-auth-options';
import { CONFIG_OPTIONS } from './shared/constants';
import { DatabaseModule } from './database/database.module';

@Module({})
/**
 * Authentication module
 */
export class NestjsAuthModule {

  // eslint-disable-next-line require-jsdoc
  static register(options: NestjsAuthOptions): DynamicModule {
    return {
      module: NestjsAuthModule,
      imports: [
        DatabaseModule,
        UsersModule,
        ConfigModule.forRoot({
          cache: true,
          load: [():NestjsAuthConfig => (options.config)]
        }),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
          secret: options.config.JWTSecret,
          signOptions: { expiresIn: options.config.JWTExpiresIn}
        })
      ],
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: options
        },
        NestjsAuthService,
        LocalStrategy,
        JwtStrategy,
        {
          provide: APP_INTERCEPTOR,
          useClass: NestjsAuthVerboseInterceptor
        },
        {
          provide: APP_FILTER,
          useClass: NestjsAuthUnauthorizedExceptionFilter
        }
      ],
      exports: [
        NestjsAuthService,
        UsersModule
      ],
      controllers: [ NestjsAuthController ]
    };
  }
}
