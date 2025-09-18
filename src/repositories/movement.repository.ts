import { Movement } from '../modules/movement/schemas';

export abstract class MovementRepository {
  abstract create(movement: Movement): Promise<Movement>;
  abstract deleteById(id: string): Promise<void>;
  abstract findById(id: string): Promise<Movement | null>;
  abstract findByProductIdAndWarehouseId(productId: string, warehouseId: string): Promise<Movement | null>;
  abstract updateById(id: string, movement: Movement): Promise<Movement | null>;
}
