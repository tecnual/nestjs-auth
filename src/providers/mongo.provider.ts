import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const dbUrl = 'mongodb+srv://'+ configService.get<string>('database.username') +':' + configService.get<string>('database.password') +'@cluster0.gu0r4.mongodb.net/'+ configService.get<string>('database.dbName') +'?retryWrites=true&w=majority';
        return ({
          autoIndex: true,
          useNewUrlParser: true,
          uri: dbUrl
        })
      },
      inject: [ConfigService]
    })
  ]
})

/**
 * MongoDb provider
 */
export class MongoProviderModule { }