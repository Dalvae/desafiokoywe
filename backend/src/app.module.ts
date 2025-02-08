import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { HealthModule } from './facades/health.module';
import { QuoteModule } from './facades/quote.module';
import { UsersModule } from './facades/users.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    HealthModule,
    QuoteModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
