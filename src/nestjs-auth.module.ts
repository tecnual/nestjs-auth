import { Module } from '@nestjs/common';
import { NestjsAuthService } from './nestjs-auth.service';
import { NestjsAuthController } from './nestjs-auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './users/users.module';
import { LocalStrategy } from './shared/strategies/local.strategy';
import { JwtStrategy } from './shared/strategies/jwt.strategy';
import { MongoProviderModule } from './providers/mongo.provider';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/config';
import { NestjsAuthVerboseInterceptor } from './shared/interceptors/nestjs-auth-verbose.interceptor';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { NestjsAuthUnauthorizedExceptionFilter } from './shared/filters/nest-js-auth-unauthorized-exception.filter';

@Module({
  imports: [
    MongoProviderModule,
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: '.nestjs-auth.env',
      cache: true,
      isGlobal: true,
      load: [configuration]
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'supersecret',
      signOptions: { expiresIn: '60s' }
    })
  ],
  providers: [
    MongoProviderModule,
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
})
/**
 * Authentication module
 */
export class NestjsAuthModule {}
