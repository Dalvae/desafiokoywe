import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { HealthModule } from './dal/health/health.module';
import { QuoteModule } from './bll/quote/quote.module';
import { QuoteController } from './dal/quote/quote.controller';
import { UsersModule } from './facades/users/users.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    HealthModule,
    QuoteModule,
    UsersModule, // Import the UsersModule
  ],
  controllers: [AppController, QuoteController],
  providers: [AppService],
})
export class AppModule {}
