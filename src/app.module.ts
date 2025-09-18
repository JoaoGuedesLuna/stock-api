import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AlertModule, MovementModule, ProductModule, StockModule, WarehouseModule } from './modules';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.getOrThrow('MONGODB_URI'),
        dbName: configService.getOrThrow('MONGODB_DB')
      })
    }),
    AlertModule,
    MovementModule,
    ProductModule,
    StockModule,
    WarehouseModule
  ]
})
export class AppModule {}
