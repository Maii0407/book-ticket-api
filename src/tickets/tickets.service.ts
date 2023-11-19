import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SessionRequest } from 'src/interface/request.interface';

@Injectable()
export class TicketsService {
  constructor(private prisma: PrismaService) {}

  async create(req: SessionRequest, createTicketDto: CreateTicketDto) {
    const { concertID } = createTicketDto;
    const concert = await this.prisma.concert.findUnique({
      where: { ID: concertID },
    });

    if (!concert) {
      throw new NotFoundException(`Concert with ${concertID} does not exits`);
    }

    if (!concert.availableTickets) {
      throw new NotFoundException(`Concert with ${concertID} is sold out`);
    }

    await this.prisma.concert.update({
      where: { ID: concert.ID },
      data: {
        availableTickets: concert.availableTickets - 1,
      },
    });

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
