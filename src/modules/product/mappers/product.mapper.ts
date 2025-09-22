import { CreateProductDto, UpdateProductDto } from '../dtos';
import { Product } from '../schemas';

export class ProductMapper {
  static toSchema(ProductDto: CreateProductDto | UpdateProductDto): Product {
    return { ...ProductDto };
  }
}
