import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { QuoteFacade } from '../../facades/quote/quote.facade';
import { CreateQuoteDto, QuoteResponseDto } from '../../models/dtos/quote.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../../decorators/current-user.decorator';
import { AuthService } from '../../facades/users/auth.service';

@Controller('quote')
@UseGuards(AuthGuard('jwt')) // Apply the JWT auth guard to all endpoints in this controller
export class QuoteController {
  constructor(private readonly quoteFacade: QuoteFacade, private readonly authService: AuthService) {}

  @Post()
  async createQuote(
    @Body() createQuoteDto: CreateQuoteDto,
    @CurrentUser() user: any, // The user is injected by the JwtStrategy
  ): Promise<QuoteResponseDto> {
    // Now the userId is available in the user object
    return this.quoteFacade.createQuote({ ...createQuoteDto, userId: user.userId });
  }

  @Get(':id')
  async getQuote(@Param('id') id: string): Promise<QuoteResponseDto | null> {
    return this.quoteFacade.getQuoteById(id);
  }
}
