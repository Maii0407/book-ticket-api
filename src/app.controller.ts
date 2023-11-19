import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  healthCheck(): { message: string; status: string } {
    return {
      message: 'Welcome to Book Ticket API',
      status: 'OK',
    };
  }
}
