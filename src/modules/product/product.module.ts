import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductRepository } from '../../repositories/product.repository';
import { MongooseProductRepository } from '../../repositories/mongoose/mongoose-product.repository';
import { Product } from './schemas';
import { ProductSchema } from './schemas/product.shema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }])],
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
