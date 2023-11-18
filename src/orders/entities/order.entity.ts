import { ApiProperty } from '@nestjs/swagger';
import { Order } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

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
  totalPrice: Decimal;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
