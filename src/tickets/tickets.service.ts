import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SessionRequest } from 'src/interface/request.interface';

@Injectable()
export class TicketsService {
  constructor(private prisma: PrismaService) {}

  create(req: SessionRequest, createTicketDto: CreateTicketDto) {
    return this.prisma.ticket.create({
      data: {
        purchaseDate: new Date(),
        concertID: createTicketDto.concertID,
        customerID: req.user.ID,
      },
    });
  }

  findAll(req: SessionRequest) {
    return this.prisma.ticket.findMany({
      where: {
        customerID: req.user.ID,
      },
      include: {
        concert: true,
        customer: true,
      },
    });
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
