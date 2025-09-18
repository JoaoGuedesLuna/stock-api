import { Injectable } from '@nestjs/common';
import { MovementRepository } from '../../repositories/movement.repository';
import { StockService } from '../stock/stock.service';

@Injectable()
export class MovementService {
  constructor(
    private readonly movementRepository: MovementRepository,
    private readonly stockService: StockService
  ) {}
}
