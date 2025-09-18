import { Controller } from '@nestjs/common';
import { StockService } from './stock.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('stocks')
@Controller('stocks')
export class StockController {
  constructor(private readonly stockService: StockService) {}
}
