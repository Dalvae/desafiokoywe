import { Injectable } from '@nestjs/common';
import { ExchangeRateService } from '../providers/exchange-rate/exchange-rate.service';
import { Quote } from '../models/entities/quote.entity';
import { PrismaService } from '../dal/prisma/prisma.service';
import { CreateQuote } from '../models/dtos/quote.dto';

@Injectable()
export class QuoteService {
  constructor(private readonly exchangeRateService: ExchangeRateService, private readonly prisma: PrismaService) {}

  async createQuote(createQuoteDto: CreateQuote): Promise<Quote> {
    const { amount, fromCurrency, toCurrency, userId } = createQuoteDto;

    // Get real-time rate from exchange rate service
    const rate = await this.exchangeRateService.getRate(fromCurrency, toCurrency);
    if (!rate) {
      throw new Error(`Could not get exchange rate from ${fromCurrency} to ${toCurrency}`);
    }

    const convertedAmount = amount * rate;
    const expiresAt = new Date(Date.now() + 3600000); // Expires in 1 hour

    const quote = await this.prisma.quote.create({
      data: {
        amount,
        fromCurrency,
        toCurrency,
        rate,
        convertedAmount,
        expiresAt,
        userId,
      },
    });

    return quote;
  }

  async getQuoteById(id: string): Promise<Quote | null> {
    const quote = await this.prisma.quote.findUnique({
      where: {
        id,
      },
    });

    return quote;
  }
}
