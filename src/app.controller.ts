import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  healthCheck(): { message: string; status: string } {
    return {
      message: 'Welcome to Book Ticket API',
      status: 'OK',
    };
  }
}
