import { ApiProperty } from '@nestjs/swagger';
import { Order } from '@prisma/client';

export class OrderEntity implements Order {
  constructor(partial: Partial<OrderEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  ID: string;

  @ApiProperty({ required: true })
  customerID: string;

  @ApiProperty({ required: true })
  orderDate: Date;

  @ApiProperty({ required: true })
  totalPrice: number;

  @ApiProperty({ required: true })
  checkedOut: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
