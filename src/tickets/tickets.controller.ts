import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  NotFoundException,
  Request,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TicketEntity } from './entities/ticket.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('tickets')
@ApiTags('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: TicketEntity })
  async create(@Request() req, @Body() createTicketDto: CreateTicketDto) {
    return new TicketEntity(await this.ticketsService.create(req, createTicketDto));
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: TicketEntity, isArray: true })
  async findAll() {
    const tickets = await this.ticketsService.findAll();
    return tickets.map((ticket) => new TicketEntity(ticket));
  }

  @Get(':ID')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: TicketEntity })
  async findOne(@Param('ID') ID: string) {
    const ticket = await this.ticketsService.findOne(ID);

    if (!ticket) {
      throw new NotFoundException(`Ticket with ${ID} does not exits`);
    }

    return new TicketEntity(ticket);
  }

  @Patch(':ID')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: TicketEntity })
  async update(@Param('ID') ID: string, @Body() updateTicketDto: UpdateTicketDto) {
    const ticket = await this.ticketsService.findOne(ID);

    if (!ticket) {
      throw new NotFoundException(`Ticket with ${ID} does not exits`);
    }

    return new TicketEntity(await this.ticketsService.update(ID, updateTicketDto));
  }

  @Delete(':ID')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: TicketEntity })
  async remove(@Param('ID') ID: string) {
    const ticket = await this.ticketsService.findOne(ID);

    if (!ticket) {
      throw new NotFoundException(`Ticket with ${ID} does not exits`);
    }

    return new TicketEntity(await this.ticketsService.remove(ID));
  }
}
