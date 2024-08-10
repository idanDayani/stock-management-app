import { Controller, Get, Query } from '@nestjs/common';
import { StockService } from './stock.service';

@Controller('stock')
export class StockController {
  constructor(private readonly stocksService: StockService) {}

  @Get('search')
  async searchStocks(@Query('symbol') symbol: string) {
    const response = await this.stocksService.searchStocks(symbol);
    return response;
  }

  @Get('getLatestQuote')
  async getLatestQuoteStock(@Query('symbol') symbol: string) {
    const response = await this.stocksService.getLatestQuoteStock(symbol);
    return response;
  }

  @Get('getPriceChangeOverPeriod')
  async getPriceChangeOverPeriod(@Query('symbol') symbol: string) {
    const response = await this.stocksService.getPriceChangeOverPeriod(symbol);
    return response;
  }
}
