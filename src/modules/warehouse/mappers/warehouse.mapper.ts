import { CreateWarehouseDto, UpdateWarehouseDto } from '../dtos';
import { Warehouse } from '../schemas';

export class WarehouseMapper {
  static toSchema(warehouseDto: CreateWarehouseDto | UpdateWarehouseDto): Warehouse {
    return { ...warehouseDto };
  }
}
