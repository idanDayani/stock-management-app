import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { formatAxiosError } from '../common/formatAxiosError';

@Injectable()
export class StockService {
  constructor(private readonly httpService: HttpService) {}

  private readonly baseUrl = 'https://financialmodelingprep.com/api/v3/';
  private readonly apiKey = `BSa2zN0rpGCuWhsunQTmgvY0k5KcBDgw`;
  private readonly searchStockUrl = `${this.baseUrl}search/`;
  private readonly quoteStockUrl = `${this.baseUrl}quote/`;
  private readonly priceChangeOverPeriodUrl = `${this.baseUrl}stock-price-change/`;

  async searchStocks(symbol: string) {
    const MAX_STOCKS_TO_RETURN = 3;
    const url = `${this.searchStockUrl}?query=${symbol}&limit=${MAX_STOCKS_TO_RETURN}&apikey=${this.apiKey}`;
    try {
      const response = await firstValueFrom(this.httpService.get(url));
      return response.data;
    } catch (e) {
      const { message, status, data, isRequestExists } = formatAxiosError(e);
      console.log({ message, status, data, isRequestExists });
    }
  }

  async getLatestQuoteStock(symbol: string) {
    const urlQuoate = `${this.quoteStockUrl}${symbol}?apikey=${this.apiKey}`;
    const urlChange = `${this.priceChangeOverPeriodUrl}${symbol}?apikey=${this.apiKey}`;
    try {
      const [{ data: quoteData }, { data: changeData }] = await Promise.all([
        firstValueFrom(this.httpService.get(urlQuoate)),
        firstValueFrom(this.httpService.get(urlChange)),
      ]);

      const stockLatestQuote = this.formatStockLatestQuoteData(quoteData[0]);
      const stockPriceChange = changeData[0];
      console.log({ stockLatestQuote, stockPriceChange });
      return { stockLatestQuote, stockPriceChange };
    } catch (e) {
      const { message, status, data, isRequestExists } = formatAxiosError(e);
      console.log({ message, status, data, isRequestExists });
    }
  }

  formatStockLatestQuoteData(stockLatestQuote: any) {
    return {
      symbol: stockLatestQuote.symbol,
      name: stockLatestQuote.name,
      exchange: stockLatestQuote.exchange,
      latestQuote: stockLatestQuote,
    };
  }
}
