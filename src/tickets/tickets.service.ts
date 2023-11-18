import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TicketsService {
  constructor(private prisma: PrismaService) {}

  create(createTicketDto: CreateTicketDto) {
    return this.prisma.ticket.create({
      data: createTicketDto,
    });
  }

  findAll() {
    return this.prisma.ticket.findMany();
  }

  findOne(ID: string) {
    return this.prisma.ticket.findUnique({ where: { ID } });
  }

  update(ID: string, updateTicketDto: UpdateTicketDto) {
    return this.prisma.ticket.update({
      where: { ID },
      data: updateTicketDto,
    });
  }

  remove(ID: string) {
    return this.prisma.ticket.delete({
      where: { ID },
    });
  }
}
