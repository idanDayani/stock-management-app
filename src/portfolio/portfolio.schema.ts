import { Schema, Document } from 'mongoose';

export const PortfolioSchema = new Schema({
  userId: { type: String, required: true },
  stocks: [
    {
      symbol: { type: String, required: true },
      name: { type: String, required: true },
      currency: { type: String, required: true },
      exchange: { type: String, required: true },
    },
  ],
});

export interface Portfolio extends Document {
  userId: string;
  stocks: {
    symbol: string;
    name: string;
    currency: string;
    exchange: string;
  }[];
}
