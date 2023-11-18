import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDate } from 'class-validator';
export class CreateTicketDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  concertID: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  customerID: string;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  purchaseDate: Date;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  orderID: string;
}
