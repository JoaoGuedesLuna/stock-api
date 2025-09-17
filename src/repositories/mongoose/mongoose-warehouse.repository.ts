import { WarehouseRepository } from '../warehouse.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Warehouse } from '../../modules/warehouse/schemas';
import { WarehouseDocument } from '../../modules/warehouse/schemas/warehouse.schema';

@Injectable()
export class MongooseWarehouseRepository extends WarehouseRepository {
  constructor(
    @InjectModel(Warehouse.name)
    private readonly warehouseModel: Model<WarehouseDocument>
  ) {
    super();
  }

  async create(warehouse: Warehouse): Promise<Warehouse> {
    return this.warehouseModel.create(warehouse);
  }

  async deleteById(id: string): Promise<void> {
    await this.warehouseModel.findByIdAndDelete(id).exec();
  }

  async existsById(id: string): Promise<boolean> {
    const exists = await this.warehouseModel.exists({ _id: id }).exec();
    return !!exists;
  }

  async existsByName(name: string): Promise<boolean> {
    const exists = await this.warehouseModel.exists({ name: name }).exec();
    return !!exists;
  }

  async findById(id: string): Promise<Warehouse | null> {
    return this.warehouseModel.findById(id).exec();
  }

  async updateById(id: string, warehouse: Warehouse): Promise<Warehouse | null> {
    return this.warehouseModel.findByIdAndUpdate(id, warehouse, { new: true }).exec();
  }
}
