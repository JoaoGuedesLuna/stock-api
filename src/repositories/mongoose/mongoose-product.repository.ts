import { ProductRepository } from '../product.repository';
import { Product } from '../../modules/product/schemas';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProductDocument } from '../../modules/product/schemas/product.shema';
import { Model } from 'mongoose';

@Injectable()
export class MongooseProductRepository extends ProductRepository {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>
  ) {
    super();
  }

  async create(product: Product): Promise<Product> {
    return this.productModel.create(product);
  }

  async deleteById(id: string): Promise<void> {
    await this.productModel.findByIdAndDelete(id).exec();
  }

  async existsById(id: string): Promise<boolean> {
    const exists = await this.productModel.exists({ _id: id }).exec();
    return !!exists;
  }

  async existsBySku(sku: string): Promise<boolean> {
    const exists = await this.productModel.exists({ sku }).exec();
    return !!exists;
  }

  async findById(id: string): Promise<Product | null> {
    return this.productModel.findById(id).exec();
  }

  async updateById(id: string, product: Product): Promise<Product | null> {
    return this.productModel.findByIdAndUpdate(id, product, { new: true }).exec();
  }
}
