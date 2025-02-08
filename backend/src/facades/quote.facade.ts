import { Injectable } from '@nestjs/common';
import { QuoteService } from '../bll/quote.service';
import { Quote } from '../models/entities/quote.entity';
import { CreateQuote, QuoteResponse } from '../models/dtos/quote.dto';

@Injectable()
export class QuoteFacade {
  constructor(private readonly quoteService: QuoteService) {}

  async createQuote(createQuoteDto: CreateQuote): Promise<Quote> {
    return this.quoteService.createQuote(createQuoteDto);
  }

  async getQuoteById(id: string): Promise<QuoteResponse | null> {
    const quote = await this.quoteService.getQuoteById(id);
    return quote;
  }
}
