import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductRepository } from '../../repositories/product.repository';
import { Product } from './schemas';
import { CreateProductDto, UpdateProductDto } from './dtos';
import { ProductMapper } from './mappers/product.mapper';
import { ResponseData } from '@/common/interfaces';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async create(createProductDto: CreateProductDto): Promise<ResponseData<Product>> {
    if (await this.productRepository.existsBySku(createProductDto.sku)) {
      throw new BadRequestException('Product with same sku already registered');
    }
    return {
      data: await this.productRepository.create(ProductMapper.toSchema(createProductDto)),
      message: 'product created'
    };
  }

  async deleteById(id: string): Promise<void> {
    if (!(await this.productRepository.existsById(id))) {
      throw new BadRequestException(`Product with id ${id} not found`);
    }
    await this.productRepository.deleteById(id);
    // return { message: `Product ${id} deleted.` };
  }

  async findById(id: string): Promise<Product | null> {
    if (!(await this.productRepository.existsById(id))) {
      throw new BadRequestException(`Product with id ${id} not found`);
    }
    return this.productRepository.findById(id);
  }

  async updateById(id: string, updateProductDto: UpdateProductDto): Promise<ResponseData<Product>> {
    if (!(await this.productRepository.existsById(id))) {
      throw new BadRequestException(`Product with id ${id} not found`);
    }

    const product = await this.productRepository.updateById(
      id,
      ProductMapper.toSchema(updateProductDto)
    );

    return {
      data: product
      // message: 'Product updated'
    };
  }
}
