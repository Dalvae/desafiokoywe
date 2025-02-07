import { Injectable } from '@nestjs/common';
import { QuoteService } from '../../bll/quote/quote.service';
import { CreateQuoteDto } from '../../models/dtos/quote.dto';
import { Quote } from '../../models/entities/quote.entity';

@Injectable()
export class QuoteFacade {
  constructor(private readonly quoteService: QuoteService) {}

  async createQuote(createQuoteDto: CreateQuoteDto): Promise<Quote> {
    return this.quoteService.createQuote(createQuoteDto);
  }

  async getQuoteById(id: string): Promise<Quote | null> {
    const quote = await this.quoteService.getQuoteById(id);

    if (!quote) {
      return null;
    }

    // Check if quote has expired
    if (new Date() > quote.expiresAt) {
      return null;
    }

    return quote;
  }
}
//Note: Fachada deberia ser simplemente el a
