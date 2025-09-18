import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { MovementService } from './movement.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateMovementDto, UpdateMovementDto } from './dtos';

@ApiTags('movements')
@Controller('movements')
export class MovementController {
  constructor(private readonly movementService: MovementService) {}

  @Post()
  create(@Body() createMovementDto: CreateMovementDto) {
    return this.movementService.create(createMovementDto);
  }

  @Delete(':id')
  deleteById(@Param('id') id: string) {
    return this.movementService.deleteById(id);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.movementService.findById(id);
  }

  @Get()
  @ApiQuery({ name: 'productId', required: true, type: String })
  @ApiQuery({ name: 'warehouseId', required: true, type: String })
  findByProductIdAndWarehouseId(@Query('productId') productId: string, @Query('warehouseId') warehouseId: string) {
    return this.movementService.findByProductIdAndWarehouseId(productId, warehouseId);
  }

  @Put(':id')
  updateById(@Param('id') id: string, @Body() updateMovementDto: UpdateMovementDto) {
    return this.movementService.updateById(id, updateMovementDto);
  }
}
