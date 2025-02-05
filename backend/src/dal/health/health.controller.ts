// health.controller.ts
import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';
import { Interval } from '@nestjs/schedule';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  check() {
    return this.healthService.checkDb();
  }
}
