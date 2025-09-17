import { Product } from '../modules/product/schemas';

export abstract class ProductRepository {
  abstract create(product: Product): Promise<Product>;
  abstract deleteById(id: string): Promise<void>;
  abstract findById(id: string): Promise<Product | null>;
  abstract findBySku(sku: string): Promise<Product | null>;
  abstract updateById(id: string, product: Product): Promise<Product | null>;
}
