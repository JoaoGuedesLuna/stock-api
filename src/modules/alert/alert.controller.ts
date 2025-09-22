import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StockService } from '../stock/stock.service';

@ApiTags('alerts')
@Controller('alerts')
export class AlertController {
  constructor(private readonly stockService: StockService) {}

  @Get()
  alertBellowMinimumStock() {
    return this.stockService.findBelowMinimumStock();
  }
}
