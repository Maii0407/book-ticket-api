import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';

export class CreateConcertDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty({ required: true })
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @ApiProperty({ required: true })
  artistName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @ApiProperty({ required: true })
  venue: string;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  concertDate: Date;

  @IsDecimal()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  ticketPrice: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  availableTickets: number;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  imageURL: string;
}
