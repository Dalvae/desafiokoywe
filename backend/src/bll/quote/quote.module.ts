import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { QuoteService } from './quote.service';
import { QuoteFacade } from '../../facades/quote/quote.facade';
import { ExchangeRateService } from '../../providers/exchange-rate/exchange-rate.service';
import { QuoteController } from '../../dal/quote/quote.controller';

@Module({
  imports: [HttpModule],
  controllers: [QuoteController],
  providers: [QuoteService, QuoteFacade, ExchangeRateService],
  exports: [QuoteFacade],
})
export class QuoteModule {}
// TODO: Este modulo deberia ser la F
