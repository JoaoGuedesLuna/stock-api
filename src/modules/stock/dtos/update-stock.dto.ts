import { ApiProperty } from '@nestjs/swagger';
import { Min } from 'class-validator';

export class UpdateStockDto {
  @ApiProperty()
  @Min(0)
  quantity: number;
}
