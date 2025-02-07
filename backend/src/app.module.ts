import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './dal/prisma/prisma.service';
import { ScheduleModule } from '@nestjs/schedule';
import { HealthService } from './dal/health/health.service';
import { HealthModule } from './dal/health/health.module';

@Module({
  imports: [ScheduleModule.forRoot(), HealthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
