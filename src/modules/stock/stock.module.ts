import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StockController } from './stock.controller';
import { StockService } from './stock.service';
import { Stock } from './schemas';
import { StockSchema } from './schemas/stock.schema';
import { StockRepository } from '../../repositories/stock.repository';
import { MongooseStockRepository } from '../../repositories/mongoose/mongoose-stock.repository';
import { ProductModule } from '../product/product.module';
import { WarehouseModule } from '../warehouse/warehouse.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Stock.name, schema: StockSchema }]), ProductModule, WarehouseModule],
  controllers: [StockController],
  providers: [
    StockService,
    {
      provide: StockRepository,
      useClass: MongooseStockRepository
    }
  ]
})
export class StockModule {}
