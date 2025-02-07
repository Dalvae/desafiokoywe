import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { HealthModule } from './dal/health/health.module';
import { QuoteModule } from './bll/quote/quote.module';
import { QuoteController } from './dal/quote/quote.controller';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    HealthModule,
    QuoteModule,
    AuthModule, // Import the AuthModule
  ],
  controllers: [AppController, QuoteController],
  providers: [AppService],
})
export class AppModule {}
