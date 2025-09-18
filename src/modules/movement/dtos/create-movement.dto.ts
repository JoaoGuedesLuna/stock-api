import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, Min } from 'class-validator';
import { MovementType } from '../enums/movement-type.enum';

export class CreateMovementDto {
  @ApiProperty()
  @IsNotEmpty()
  productId: string;

  @ApiProperty()
  @IsNotEmpty()
  warehouseId: string;

  @ApiProperty({ enum: MovementType })
  @IsEnum(MovementType)
  type: MovementType;

  @ApiProperty()
  @Min(1)
  quantity: number;

  @ApiProperty({ required: false })
  @IsOptional()
  note?: string;
}
