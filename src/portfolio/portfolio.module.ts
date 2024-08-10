import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PortfolioController } from './portfolio.controller';
import { PortfolioService } from './portfolio.service';
import { PortfolioSchema } from './portfolio.schema';
import { StockSchema } from 'src/stock/stock.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Portfolio', schema: PortfolioSchema }]),
    MongooseModule.forFeature([{ name: 'Stock', schema: StockSchema }]),
  ],
  providers: [PortfolioService],
  controllers: [PortfolioController],
  exports: [PortfolioService],
})
export class PortfolioModule {}
