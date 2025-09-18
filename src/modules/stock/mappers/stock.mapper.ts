import { CreateStockDto, UpdateStockDto } from '../dtos';
import { Stock } from '../schemas';
import { Types } from 'mongoose';

export class StockMapper {
  static toSchema(stockDto: CreateStockDto | UpdateStockDto): Stock {
    return {
      ...stockDto,
      product: 'productId' in stockDto ? new Types.ObjectId(stockDto.productId) : undefined,
      warehouse: 'warehouseId' in stockDto ? new Types.ObjectId(stockDto.warehouseId) : undefined
    };
  }
}
