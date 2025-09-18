import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { StockRepository } from '../stock.repository';
import { Stock } from '../../modules/stock/schemas';
import { StockDocument } from '../../modules/stock/schemas/stock.schema';

@Injectable()
export class MongooseStockRepository extends StockRepository {
  constructor(
    @InjectModel(Stock.name)
    private readonly stockModel: Model<StockDocument>
  ) {
    super();
  }

  async create(stock: Stock): Promise<Stock> {
    return this.stockModel.create(stock);
  }

  async deleteById(id: string): Promise<void> {
    await this.stockModel.findByIdAndDelete(id).exec();
  }

  async existsByProductIdAndWarehouseId(productId: string, warehouseId: string): Promise<boolean> {
    const stock = await this.stockModel.exists({ product: productId, warehouse: warehouseId }).exec();
    return !!stock;
  }

  async findById(id: string): Promise<Stock | null> {
    return this.stockModel.findById(id).populate('product').exec();
  }

  findByProductIdAndWarehouseId(productId: string, warehouseId: string): Promise<Stock | null> {
    return this.stockModel
      .findOne({ product: new Types.ObjectId(productId), warehouse: new Types.ObjectId(warehouseId) })
      .populate('product')
      .exec();
  }

  async updateById(id: string, stock: Stock): Promise<Stock | null> {
    return this.stockModel.findByIdAndUpdate(id, stock, { new: true }).exec();
  }
}
