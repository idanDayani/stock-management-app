import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class StockService {
  constructor(private readonly httpService: HttpService) {}

  private readonly baseUrl = 'https://financialmodelingprep.com/api/v3/';
  private readonly apiKey = 'nWBeORODVowr5O6W5fICL6g83u3TmtJr';
  // private readonly apiKey = `Hfy5kuoYNB5QLJPPk2x24yV3IE8hu2pT`;
  private readonly searchStockUrl = `${this.baseUrl}search/`;
  private readonly quoteStockUrl = `${this.baseUrl}quote/`;
  private readonly priceChangeOverPeriodUrl = `${this.baseUrl}stock-price-change/`;

  async searchStocks(symbol: string) {
    const MAX_STOCKS_TO_RETURN = 3;
    const url = `${this.searchStockUrl}?query=${symbol}&limit=${MAX_STOCKS_TO_RETURN}&apikey=${this.apiKey}`;
    const response = await firstValueFrom(this.httpService.get(url));
    return response.data;
  }

  async getLatestQuoteStock(symbol: string) {
    const url = `${this.quoteStockUrl}${symbol}?apikey=${this.apiKey}`;
    const { data } = await firstValueFrom(this.httpService.get(url));
    const { name, exchange } = data[0];
    const stockLatestQuote = { symbol, name, exchange, latestQuote: data[0] };
    return stockLatestQuote;
  }

  async getPriceChangeOverPeriod(symbol: string) {
    const url = `${this.priceChangeOverPeriodUrl}${symbol}?apikey=${this.apiKey}`;
    const response = await firstValueFrom(this.httpService.get(url));
    return response.data[0];
  }
}
