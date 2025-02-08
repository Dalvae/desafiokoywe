import { Injectable } from '@nestjs/common';
import { HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus';
import { PrismaService } from '../dal/prisma/prisma.service';

@Injectable()
export class HealthService extends HealthIndicator {
  constructor(private prisma: PrismaService) {
    super();
  }

  async checkDb(): Promise<HealthIndicatorResult> {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return this.getStatus('database', true);
    } catch (error) {
      return this.getStatus('database', false, { message: error.message });
    }
  }
}
