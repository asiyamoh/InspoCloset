import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHealth(): string {
    return this.appService.getHealth();
  }

  @Get('health')
  async getHealthCheck(): Promise<{ status: string; timestamp: string }> {
    return this.appService.getHealthCheck();
  }
}
