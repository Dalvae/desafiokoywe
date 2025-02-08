import { Controller, Post, Body, UseGuards, Get, Param } from '@nestjs/common';
import { QuoteFacade } from '../../facades/quote/quote.facade';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../decorators/current-user.decorator';
import { CreateQuote, QuoteResponse } from '../models/dtos/quote.dto';
import { Quote } from '../models/entities/quote.entity';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

@Controller('quote')
@UseGuards(AuthGuard('jwt')) // Apply the JWT auth guard to all endpoints in this controller
@ApiBearerAuth() // Add Bearer Auth to Swagger
export class QuoteController {
  constructor(private readonly quoteFacade: QuoteFacade) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The quote has been successfully created.',
    type: QuoteResponse, // Use the QuoteResponse class for the response type
  })
  async createQuote(
    @Body() createQuoteDto: CreateQuote,
    @CurrentUser() user: any, // The user is injected by the JwtStrategy
  ): Promise<Quote> {
    // Now the userId is available in the user object
    return this.quoteFacade.createQuote({ ...createQuoteDto, userId: user.userId });
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'The quote has been successfully retrieved.',
    type: QuoteResponse,
  })
  async getQuote(@Param('id') id: string): Promise<QuoteResponse | null> {
    return this.quoteFacade.getQuoteById(id);
  }
}
