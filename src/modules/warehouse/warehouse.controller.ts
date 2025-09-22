import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { CreateWarehouseDto, UpdateWarehouseDto } from './dtos';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('warehouses')
@Controller('warehouses')
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  @Post()
  create(@Body() createWarehouseDto: CreateWarehouseDto) {
    return this.warehouseService.create(createWarehouseDto);
  }

  @Delete(':id')
  deleteById(@Param('id') id: string) {
    return this.warehouseService.deleteById(id);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.warehouseService.findById(id);
  }

  @Put(':id')
  updateById(@Param('id') id: string, @Body() updateWarehouseDto: UpdateWarehouseDto) {
    return this.warehouseService.updateById(id, updateWarehouseDto);
  }
}
