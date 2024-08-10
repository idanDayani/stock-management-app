import { Controller, Post, Get, Body, Delete, Req, Res } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { Stock } from 'src/stock/stock.schema';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Get('getPortfolio')
  async getPortfolio(@Req() req: Request, @Res() res: Response) {
    let userId = req.cookies['userId'];

    if (!userId) {
      userId = uuidv4();
      res.cookie('userId', userId, { httpOnly: true, secure: true });
    }

    const portfolio = await this.portfolioService.getPortfolio({ userId });
    return res.send(portfolio);
  }

  @Post('addStock')
  async addStockToPortfolio(
    @Req() req: Request,
    @Res() res: Response,
    @Body()
    body: {
      stock: Stock;
    },
  ) {
    const userId = req.cookies['userId'];
    const { stock } = body;
    const { symbol, name, currency, exchange } = stock;
    await this.portfolioService.addStockToPortfolio({
      userId,
      symbol,
      name,
      currency,
      exchange,
    });
    return res.send();
  }

  @Delete('deleteStock')
  async deleteStockFromPortfolio(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: { symbol: string },
  ) {
    const userId = req.cookies['userId'];
    const { symbol } = body;
    await this.portfolioService.deleteStockFromPortfolio({
      userId,
      symbol,
    });
    return res.send();
  }
}
