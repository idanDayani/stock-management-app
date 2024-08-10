import { Schema, Document } from 'mongoose';

export const StockSchema = new Schema({
  symbol: { type: String, required: true },
  name: { type: String, required: true },
  currency: { type: String, required: true },
  exchange: { type: String, required: true },
  latestQuote: {
    price: { type: Number, default: null },
    changesPercentage: { type: Number, default: null },
    change: { type: Number, default: null },
    dayLow: { type: Number, default: null },
    dayHigh: { type: Number, default: null },
    yearHigh: { type: Number, default: null },
    yearLow: { type: Number, default: null },
    marketCap: { type: Number, default: null },
    priceAvg50: { type: Number, default: null },
    priceAvg200: { type: Number, default: null },
    volume: { type: Number, default: null },
    avgVolume: { type: Number, default: null },
    open: { type: Number, default: null },
    previousClose: { type: Number, default: null },
    eps: { type: Number, default: null },
    pe: { type: Number, default: null },
    earningsAnnouncement: { type: Date, default: null },
    sharesOutstanding: { type: Number, default: null },
    timestamp: { type: Number, default: null },
  },
});

export interface Stock extends Document {
  symbol: string;
  name: string;
  currency: string;
  exchange: string;
  latestQuote?: {
    price?: number;
    changesPercentage?: number;
    change?: number;
    dayLow?: number;
    dayHigh?: number;
    yearHigh?: number;
    yearLow?: number;
    marketCap?: number;
    priceAvg50?: number;
    priceAvg200?: number;
    volume?: number;
    avgVolume?: number;
    open?: number;
    previousClose?: number;
    eps?: number;
    pe?: number;
    earningsAnnouncement?: Date;
    sharesOutstanding?: number;
    timestamp?: number;
  };
}
