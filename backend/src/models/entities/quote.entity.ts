// src/models/entities/quote.entity.ts

export class Quote {
  id: string;
  fromCurrency: string;
  toCurrency: string;
  amount: number;
  rate: number;
  convertedAmount: number;
  createdAt: Date;
  expiresAt: Date;
}
