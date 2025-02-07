import { Module, HttpModule } from '@nestjs/common';
import { QuoteController } from '../../dal/quote/quote.controller';
import { QuoteService } from './quote.service';
import { QuoteFacade } from '../../facades/quote/quote.facade';
import { ExchangeRateService } from '../../providers/exchange-rate/exchange-rate.service';
import { UsersModule } from '../../facades/users/users.module';
import { HealthModule } from '../../dal/health/health.module';

@Module({
  imports: [HttpModule, UsersModule, HealthModule],
  controllers: [QuoteController],
  providers: [QuoteService, QuoteFacade, ExchangeRateService],
  exports: [QuoteFacade],
})
export class QuoteModule {}
