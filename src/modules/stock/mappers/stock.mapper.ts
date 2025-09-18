import { CreateStockDto, UpdateStockDto } from '../dtos';
import { Stock } from '../schemas';

export class StockMapper {
  static toSchema(stockDto: CreateStockDto | UpdateStockDto): Stock {
    return { ...stockDto };
  }
}
