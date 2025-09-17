import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductRepository } from '../../repositories/product.repository';
import { MongooseProductRepository } from '../../repositories/mongoose/mongoose-product.repository';

@Module({
  controllers: [ProductController],
  providers: [
    ProductService,
    {
      provide: ProductRepository,
      useClass: MongooseProductRepository
    }
  ]
})
export class ProductModule {}
