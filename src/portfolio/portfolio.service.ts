import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Stock } from 'src/stock/stock.schema';
import { Portfolio } from './portfolio.schema';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectModel('Portfolio') private readonly portfolioModel: Model<Portfolio>,
    @InjectModel('Stock') private readonly stockModel: Model<Stock>,
  ) {}

  async getPortfolio(params: { userId: string }): Promise<Stock[]> {
    const { userId } = params;
    const portfolio = await this.portfolioModel.findOne({ userId }).exec();
    return (portfolio?.stocks as Stock[]) || [];
  }

  async addStockToPortfolio(params: {
    userId: string;
    symbol: string;
    name: string;
    currency: string;
    exchange: string;
  }) {
    const { userId, symbol, name, currency, exchange } = params;
    const stock = new this.stockModel({
      symbol,
      name,
      currency,
      exchange,
      _id: -1,
    });

    let portfolio = await this.portfolioModel.findOne({ userId }).exec();
    if (!portfolio) {
      portfolio = new this.portfolioModel({ userId, stocks: [stock] });
    } else {
      const isStockExists = portfolio?.stocks.find((s) => s.symbol === symbol);
      if (isStockExists) {
        throw new Error('Stock already exists in portfolio');
      }
      portfolio.stocks.push(stock);
    }

    await portfolio.save();
  }

  async deleteStockFromPortfolio(params: { userId: string; symbol: string }) {
    const { userId, symbol } = params;
    await this.portfolioModel
      .findOneAndUpdate({ userId }, { $pull: { stocks: { symbol } } })
      .exec();
  }
}
