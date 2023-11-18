import { Concert } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { ApiProperty } from '@nestjs/swagger';

export class ConcertEntity implements Concert {
  constructor(partial: Partial<ConcertEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  ID: string;

  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: true })
  artistName: string;

  @ApiProperty({ required: true })
  venue: string;

  @ApiProperty({ required: true })
  concertDate: Date;

  @ApiProperty({ required: true })
  ticketPrice: Decimal;

  @ApiProperty({ required: true })
  availableTickets: number;

  @ApiProperty({ required: true })
  imageURL: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
