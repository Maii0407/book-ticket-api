import { ApiProperty } from '@nestjs/swagger';
import { Ticket } from '@prisma/client';

export class TicketEntity implements Ticket {
  constructor(partial: Partial<TicketEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  ID: string;

  @ApiProperty({ required: true })
  concertID: string;

  @ApiProperty({ required: true })
  customerID: string;

  @ApiProperty({ required: true })
  purchaseDate: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
