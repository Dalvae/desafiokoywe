import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { HealthModule } from './facades/health.module';
import { QuoteModule } from './facades/quote.module';
import { QuoteController } from './dal/quote.controller';
import { UsersModule } from './facades/users.module';

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
