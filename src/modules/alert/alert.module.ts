import { Module } from '@nestjs/common';
import { StockModule } from '../stock/stock.module';
import { AlertController } from './alert.controller';

@Module({
  imports: [StockModule],
  controllers: [AlertController]
})
export class AlertModule {}
