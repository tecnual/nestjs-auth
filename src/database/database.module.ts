import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return ({
          autoIndex: true,
          useNewUrlParser: true,
          uri: configService.get('database.url')
        })
      },
      inject: [ConfigService]
    })
  ]
})

/**
 * MongoDb provider
 */
export class DatabaseModule { }