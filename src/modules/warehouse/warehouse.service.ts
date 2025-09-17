import { BadRequestException, Injectable } from '@nestjs/common';
import { Warehouse } from './schemas';
import { CreateWarehouseDto, UpdateWarehouseDto } from './dtos';
import { WarehouseMapper } from './mappers/warehouse.mapper';
import { WarehouseRepository } from '../../repositories/warehouse.repository';

@Injectable()
export class WarehouseService {
  constructor(private readonly warehouseRepository: WarehouseRepository) {}

  async create(createWarehouseDto: CreateWarehouseDto): Promise<Warehouse> {
    if (await this.warehouseRepository.existsByName(createWarehouseDto.name)) {
      throw new BadRequestException('Warehouse with same name already registered');
    }
    return this.warehouseRepository.create(WarehouseMapper.toSchema(createWarehouseDto));
  }

  async deleteById(id: string): Promise<string> {
    if (!(await this.warehouseRepository.existsById(id))) {
      throw new BadRequestException(`Warehouse with id ${id} not found`);
    }
    await this.warehouseRepository.deleteById(id);

    return `Warehouse ${id} deleted.`;
  }

  async findById(id: string): Promise<Warehouse | null> {
    if (!(await this.warehouseRepository.existsById(id))) {
      throw new BadRequestException(`Warehouse with id ${id} not found`);
    }
    return this.warehouseRepository.findById(id);
  }

  async updateById(id: string, updateWarehouseDto: UpdateWarehouseDto): Promise<Warehouse | null> {
    if (!(await this.warehouseRepository.existsById(id))) {
      throw new BadRequestException(`Warehouse with id ${id} not found`);
    }
    return this.warehouseRepository.updateById(id, WarehouseMapper.toSchema(updateWarehouseDto));
  }
}
