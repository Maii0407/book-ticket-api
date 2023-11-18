import { ApiProperty } from '@nestjs/swagger';
export class CreateConcertDto {
  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: true })
  artistName: string;

  @ApiProperty({ required: true })
  venue: string;

  @ApiProperty({ required: true })
  concertDate: Date;

  @ApiProperty({ required: true })
  ticketPrice: number;
}
