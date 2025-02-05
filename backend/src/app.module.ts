import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './dal/health/health.controller';
import { PrismaService } from './dal/prisma/prisma.service';
import { ScheduleModule } from '@nestjs/schedule';
import { HealthService } from './dal/health/health.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [AppController, HealthController],
  providers: [AppService, PrismaService, HealthService],
})
export class AppModule {}
