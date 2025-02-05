import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HealthService {
  constructor(private prisma: PrismaService) {}

  @Interval(5000)
  async checkDb() {
    await this.prisma.$queryRaw`SELECT 1`;
    console.log({ status: 'ok', db: 'connected' });
    return { status: 'ok', db: 'connected' };
  }
}
