import { Controller, Get, Redirect } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Redirect('/api', 302) // Redirige a /api con un código 302 (temporal)
  getHello(): string {
    return this.appService.getHello();
  }
}
