import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateMovementDto {
  @ApiProperty({ required: false })
  @IsOptional()
  note?: string;
}
