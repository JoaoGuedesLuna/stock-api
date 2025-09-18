import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MovementController } from './movement.controller';
import { MovementService } from './movement.service';
import { Movement } from './schemas';
import { MovementSchema } from './schemas/movement.schema';
import { MovementRepository } from '../../repositories/movement.repository';
import { MongooseMovementRepository } from '../../repositories/mongoose/mongoose-movement.repository';
import { StockModule } from '../stock/stock.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Movement.name, schema: MovementSchema }]), StockModule],
  controllers: [MovementController],
  providers: [
    MovementService,
    {
      provide: MovementRepository,
      useClass: MongooseMovementRepository
    }
  ]
})
export class MovementModule {}
