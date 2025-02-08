import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { HealthService } from '../bll/health.service';
import { PrismaService } from '../dal/prisma/prisma.service';

@Module({
  imports: [TerminusModule],
  controllers: [HealthController],
  providers: [HealthService, PrismaService],
  exports: [PrismaService], // Export PrismaService
})
export class HealthModule {}
