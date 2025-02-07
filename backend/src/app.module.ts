import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './dal/prisma/prisma.service';
import { ScheduleModule } from '@nestjs/schedule';
import { HealthService } from './dal/health/health.service';
import { HealthModule } from './dal/health/health.module';
import { QuoteModule } from './bll/quote/quote.module';
import { QuoteController } from './dal/quote/quote.controller';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    HealthModule,
    QuoteModule
  ],
  controllers: [AppController, QuoteController],
  providers: [AppService],
})
export class AppModule {}
