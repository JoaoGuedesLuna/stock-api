import { BadRequestException, Injectable } from '@nestjs/common';
import { StockRepository } from '../../repositories/stock.repository';
import { CreateStockDto, UpdateStockDto } from './dtos';
import { StockMapper } from './mappers/stock.mapper';
import { Stock } from './schemas';
import { ProductService } from '../product/product.service';
import { WarehouseService } from '../warehouse/warehouse.service';

@Injectable()
export class StockService {
  constructor(
    private readonly stockRepository: StockRepository,
    private readonly productService: ProductService,
    private readonly warehouseService: WarehouseService
  ) {}

  async create(createStockDto: CreateStockDto): Promise<Stock> {
    const { productId, warehouseId } = createStockDto;

    await this.productService.findById(productId);
    await this.warehouseService.findById(warehouseId);

    if (await this.stockRepository.findByProductIdAndWarehouseId(productId, warehouseId)) {
      throw new BadRequestException(
        `Stock with ProductId ${productId} and WarehouseId ${warehouseId} already registered`
      );
    }

    return this.stockRepository.create(StockMapper.toSchema(createStockDto));
  }

  async deleteById(id: string): Promise<string> {
    if (!(await this.stockRepository.findById(id))) {
      throw new BadRequestException(`Stock with id ${id} not found`);
    }

    await this.stockRepository.deleteById(id);

    return `Stock ${id} deleted.`;
  }

  async findById(id: string): Promise<Stock | null> {
    const stock = await this.stockRepository.findById(id);

    if (!stock) {
      throw new BadRequestException(`Stock with id ${id} not found`);
    }

    return stock;
  }

  async findByProductIdAndWarehouseId(productId: string, warehouseId: string) {
    const stock = await this.stockRepository.findByProductIdAndWarehouseId(productId, warehouseId);

    if (!stock) {
      throw new BadRequestException(`Stock with ProductId ${productId} and WarehouseId ${warehouseId} not found`);
    }

    return stock;
  }

  async updateById(id: string, updateStockDto: UpdateStockDto): Promise<Stock | null> {
    if (!(await this.stockRepository.findById(id))) {
      throw new BadRequestException(`Stock with id ${id} not found`);
    }
    return this.stockRepository.updateById(id, StockMapper.toSchema(updateStockDto));
  }
}
