import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { MovementRepository } from '../movement.repository';
import { Movement } from '../../modules/movement/schemas';
import { MovementDocument } from '../../modules/movement/schemas/movement.schema';

@Injectable()
export class MongooseMovementRepository extends MovementRepository {
  constructor(
    @InjectModel(Movement.name)
    private readonly movementModel: Model<MovementDocument>
  ) {
    super();
  }

  async create(movement: Movement): Promise<Movement> {
    return this.movementModel.create(movement);
  }

  async deleteById(id: string): Promise<void> {
    await this.movementModel.findByIdAndDelete(id).exec();
  }

  async findById(id: string): Promise<Movement | null> {
    return this.movementModel.findById(id).populate('product').populate('warehouse').exec();
  }

  findByProductIdAndWarehouseId(productId: string, warehouseId: string): Promise<Movement | null> {
    return this.movementModel
      .findOne({ product: new Types.ObjectId(productId), warehouse: new Types.ObjectId(warehouseId) })
      .populate('product')
      .populate('warehouse')
      .exec();
  }

  async updateById(id: string, movement: Movement): Promise<Movement | null> {
    return this.movementModel.findByIdAndUpdate(id, movement, { new: true }).exec();
  }
}
