import { Injectable } from '@nestjs/common';
import { CreateQuoteDto } from '../../models/dtos/quote.dto';
import { Quote } from '../../models/entities/quote.entity';
import { ExchangeRateService } from '../../providers/exchange-rate/exchange-rate.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class QuoteService {
  constructor(private readonly exchangeRateService: ExchangeRateService) {}

  async createQuote(createQuoteDto: CreateQuoteDto): Promise<Quote> {
    const { amount, fromCurrency, toCurrency } = createQuoteDto;

    // Get real-time rate from exchange rate service
    const rate = await this.exchangeRateService.getRate(fromCurrency, toCurrency);
    if (!rate) {
      throw new Error(`Could not get exchange rate from ${fromCurrency} to ${toCurrency}`);
    }

    const quote: Quote = {
      id: uuidv4(),
      fromCurrency,
      toCurrency,
      amount,
      rate,
      convertedAmount: amount * rate,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 15 * 60 * 1000),
    };

    // TODO: Save to database
    return quote;
  }

  async getQuoteById(id: string): Promise<Quote | null> {
    // TODO: Implement database query
    return null;
  }
}
