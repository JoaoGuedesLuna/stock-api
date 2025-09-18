import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Min } from 'class-validator';

export class CreateStockDto {
  @ApiProperty()
  @IsNotEmpty()
  productId: Types.ObjectId;

  @ApiProperty()
  @IsNotEmpty()
  warehouseId: Types.ObjectId;

  @ApiProperty()
  @Min(0)
  quantity: number;
}
