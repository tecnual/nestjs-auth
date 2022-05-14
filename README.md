# NestJS Authentication

Implement authentication in your NestJS application.

## Install

```bash
npm install @tecnual/nestjs-auth --save
```

OR

```bash
yarn add @tecnual/nestjs-auth
```

## How To Use?

The package exports mainly a [dynamic module](https://docs.nestjs.com/fundamentals/dynamic-modules). The module should be imported in your app.module.ts.

## Example Code your app module

### Simple static configuration

If you just want to provide the static values or have them handy, pass them as options to the `register` method like below. The options object is type of `NestjsAuthOptions`.

```typescript
import { Module } from '@nestjs/common';
import { NestjsAuthModule } from '@tecnual/nestjs-auth';
import { AppController } from './app.controller';
import { AppService } from './app.service';


@Module({
  imports: [NestjsAuthModule.register({config: {
    JWTSecret: process.env.JWT_SECRET || 'supersecret',
    JWTExpiresIn: process.env.JWT_EXPIRATION || '1d',
    database: {
      url: 'mongodb+srv://[DATABASE_USERNAME]:[PASSWORD]@cluster0.gu0r4.mongodb.net/[DATABASE_NAME]?retryWrites=true&w=majority'
    },
    environment: process.env.NODE_ENV || 'production',
    verbose: true
    }
  })],
  controllers:  [AppController],
  providers:    [AppService]
})

/**
 * Main App Module
 */
 export class AppModule {}
```


## Maintainers

[Libertual](https://github.com/libertual)