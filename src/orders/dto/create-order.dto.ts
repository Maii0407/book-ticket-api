import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  customerID: string;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  orderDate: Date;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  totalPrice: number;
}
