import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { StockService } from './stock.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateStockDto, UpdateStockDto } from './dtos';

@ApiTags('stocks')
@Controller('stocks')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Post()
  create(@Body() createStockDto: CreateStockDto) {
    return this.stockService.create(createStockDto);
  }

  @Delete(':id')
  deleteById(@Param('id') id: string) {
    return this.stockService.deleteById(id);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.stockService.findById(id);
  }

  @Get()
  @ApiQuery({ name: 'productId', required: true, type: String })
  @ApiQuery({ name: 'warehouseId', required: true, type: String })
  findByProductIdAndWarehouseId(@Query('productId') productId: string, @Query('warehouseId') warehouseId: string) {
    return this.stockService.findByProductIdAndWarehouseId(productId, warehouseId);
  }

  @Put(':id')
  updateById(@Param('id') id: string, @Body() updateStockDto: UpdateStockDto) {
    return this.stockService.updateById(id, updateStockDto);
  }
}
