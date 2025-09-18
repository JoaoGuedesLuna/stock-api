import { CreateMovementDto, UpdateMovementDto } from '../dtos';
import { Movement } from '../schemas';
import { Types } from 'mongoose';

export class MovementMapper {
  static toSchema(movementDto: CreateMovementDto | UpdateMovementDto): Movement {
    return {
      ...movementDto,
      product: 'productId' in movementDto ? new Types.ObjectId(movementDto.productId) : undefined,
      warehouse: 'warehouseId' in movementDto ? new Types.ObjectId(movementDto.warehouseId) : undefined
    };
  }
}
