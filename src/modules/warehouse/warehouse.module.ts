import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WarehouseController } from './warehouse.controller';
import { WarehouseService } from './warehouse.service';
import { Warehouse } from './schemas';
import { WarehouseSchema } from './schemas/warehouse.schema';
import { WarehouseRepository } from '../../repositories/warehouse.repository';
import { MongooseWarehouseRepository } from '../../repositories/mongoose/mongoose-warehouse.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: Warehouse.name, schema: WarehouseSchema }])],
  controllers: [WarehouseController],
  providers: [
    WarehouseService,
    {
      provide: WarehouseRepository,
      useClass: MongooseWarehouseRepository
    }
  ],
  exports: [WarehouseService]
})
export class WarehouseModule {}
