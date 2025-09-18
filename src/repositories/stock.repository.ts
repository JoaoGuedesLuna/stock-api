import { Stock } from '../modules/stock/schemas';

export abstract class StockRepository {
  abstract create(stock: Stock): Promise<Stock>;
  abstract deleteById(id: string): Promise<void>;
  abstract findById(id: string): Promise<Stock | null>;
  abstract findByProductIdAndWarehouseId(productId: string, warehouseId: string): Promise<Stock | null>;
  abstract updateById(id: string, stock: Stock): Promise<Stock | null>;
}
