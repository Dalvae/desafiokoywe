export class CreateQuoteDto {
  amount: number;
  fromCurrency: string;
  toCurrency: string;
}

export class QuoteResponseDto {
  id: string;
  fromCurrency: string;
  toCurrency: string;
  amount: number;
  rate: number;
  convertedAmount: number;
  createdAt: Date;
  expiresAt: Date;
}
