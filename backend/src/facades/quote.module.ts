import { Module } from '@nestjs/common';
import { QuoteController } from '../dal/quote.controller';
import { QuoteService } from '../bll/quote.service';
import { ExchangeRateService } from '../providers/exchange-rate/exchange-rate.service';
import { UsersModule } from './users.module';
import { HealthModule } from './health.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule, UsersModule, HealthModule],
  controllers: [QuoteController],
  providers: [QuoteService, ExchangeRateService],
  exports: [],
})
export class QuoteModule {}
