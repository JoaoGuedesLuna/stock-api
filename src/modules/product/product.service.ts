import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductRepository } from '../../repositories/product.repository';
import { Product } from './schemas';
import { CreateProductDto, UpdateProductDto } from './dtos';
import { ProductMapper } from './mappers/product.mapper';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    if (await this.productRepository.existsBySku(createProductDto.sku)) {
      throw new BadRequestException('Product with same sku already registered');
    }
    return this.productRepository.create(ProductMapper.toSchema(createProductDto));
  }

  async deleteById(id: string): Promise<string> {
    if (!(await this.productRepository.existsById(id))) {
      throw new BadRequestException(`Product with id ${id} not found`);
    }
    await this.productRepository.deleteById(id);

    return `Product ${id} deleted.`;
  }

  async findById(id: string): Promise<Product | null> {
    if (!(await this.productRepository.existsById(id))) {
      throw new BadRequestException(`Product with id ${id} not found`);
    }
    return this.productRepository.findById(id);
  }

  async updateById(id: string, updateProductDto: UpdateProductDto): Promise<Product | null> {
    if (!(await this.productRepository.existsById(id))) {
      throw new BadRequestException(`Product with id ${id} not found`);
    }
    return this.productRepository.updateById(id, ProductMapper.toSchema(updateProductDto));
  }
}
