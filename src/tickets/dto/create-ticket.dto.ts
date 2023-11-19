import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
export class CreateTicketDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  concertID: string;
}
