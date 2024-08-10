import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { StockSchema } from './stock.schema';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: 'Stock', schema: StockSchema }]),
  ],
  providers: [StockService],
  controllers: [StockController],
  exports: [StockService],
})
export class StockModule {}
