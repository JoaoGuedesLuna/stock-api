import { Stock } from '../modules/stock/schemas';

export abstract class StockRepository {
  abstract create(stock: Stock): Promise<Stock>;
  abstract deleteById(id: string): Promise<void>;
  abstract existsByProductIdAndWarehouseId(productId: string, warehouseId: string): Promise<boolean>;
  abstract findById(id: string): Promise<Stock | null>;
  abstract findByProductIdAndWarehouseId(productId: string, warehouseId: string): Promise<Stock | null>;
  abstract updateById(id: string, stock: Stock): Promise<Stock | null>;
}
