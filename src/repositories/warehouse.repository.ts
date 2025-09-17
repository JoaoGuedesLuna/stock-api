import { Warehouse } from '../modules/warehouse/schemas';

export abstract class WarehouseRepository {
  abstract create(warehouse: Warehouse): Promise<Warehouse>;
  abstract deleteById(id: string): Promise<void>;
  abstract existsById(id: string): Promise<boolean>;
  abstract existsByName(name: string): Promise<boolean>;
  abstract findById(id: string): Promise<Warehouse | null>;
  abstract updateById(id: string, product: Warehouse): Promise<Warehouse | null>;
}
