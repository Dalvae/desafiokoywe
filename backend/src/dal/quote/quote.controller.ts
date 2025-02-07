import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { QuoteFacade } from '../../facades/quote/quote.facade';
import { CreateQuoteDto, QuoteResponseDto } from '../../models/dtos/quote.dto';

@Controller('quote')
export class QuoteController {
  constructor(private readonly quoteFacade: QuoteFacade) {}

  @Post()
  async createQuote(@Body() createQuoteDto: CreateQuoteDto): Promise<QuoteResponseDto> {
    return this.quoteFacade.createQuote(createQuoteDto);
  }

  @Get(':id')
  async getQuote(@Param('id') id: string): Promise<QuoteResponseDto | null> {
    return this.quoteFacade.getQuoteById(id);
  }
}
