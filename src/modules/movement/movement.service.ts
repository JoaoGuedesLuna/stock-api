import { BadRequestException, Injectable } from '@nestjs/common';
import { MovementRepository } from '../../repositories/movement.repository';
import { StockService } from '../stock/stock.service';
import { CreateMovementDto, UpdateMovementDto } from './dtos';
import { Movement } from './schemas';
import { MovementMapper } from './mappers/movement.mapper';
import { MovementType } from './enums/movement-type.enum';

@Injectable()
export class MovementService {
  constructor(
    private readonly movementRepository: MovementRepository,
    private readonly stockService: StockService
  ) {}

  async create(createMovementDto: CreateMovementDto): Promise<Movement> {
    const { productId, warehouseId, type, quantity } = createMovementDto;

    const existStock = await this.stockService.existsByProductIdAndWarehouseId(productId, warehouseId);

    if (!existStock) {
      if (type === MovementType.OUT) {
        throw new BadRequestException('Stock not found for outbound movement');
      }
      await this.stockService.create({ productId, warehouseId, quantity });
    } else {
      const stock = await this.stockService.findByProductIdAndWarehouseId(productId, warehouseId);

      const updatedStockQuantity = type === MovementType.IN ? stock.quantity! + quantity : stock.quantity! - quantity;

      if (updatedStockQuantity < 0) {
        throw new BadRequestException('Insufficient stock quantity');
      }

      await this.stockService.updateById(stock._id!.toHexString(), { quantity: updatedStockQuantity });
    }

    return this.movementRepository.create(MovementMapper.toSchema(createMovementDto));
  }

  async deleteById(id: string): Promise<string> {
    if (!(await this.movementRepository.findById(id))) {
      throw new BadRequestException(`Movement with id ${id} not found`);
    }

    await this.movementRepository.deleteById(id);

    return `Movement ${id} deleted.`;
  }

  async findById(id: string): Promise<Movement | null> {
    const movement = await this.movementRepository.findById(id);

    if (!movement) {
      throw new BadRequestException(`Movement with id ${id} not found`);
    }

    return movement;
  }

  async findByProductIdAndWarehouseId(productId: string, warehouseId: string) {
    const movement = await this.movementRepository.findByProductIdAndWarehouseId(productId, warehouseId);

    if (!movement) {
      throw new BadRequestException(`Movement with ProductId ${productId} and WarehouseId ${warehouseId} not found`);
    }

    return movement;
  }

  async updateById(id: string, updateMovementDto: UpdateMovementDto): Promise<Movement | null> {
    if (!(await this.movementRepository.findById(id))) {
      throw new BadRequestException(`Movement with id ${id} not found`);
    }
    return this.movementRepository.updateById(id, MovementMapper.toSchema(updateMovementDto));
  }
}
