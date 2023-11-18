import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  create(createOrderDto: CreateOrderDto) {
    return this.prisma.order.create({
      data: createOrderDto,
    });
  }

  findAll() {
    return this.prisma.order.findMany();
  }

  findOne(ID: string) {
    return this.prisma.order.findUnique({ where: { ID } });
  }

  update(ID: string, updateOrderDto: UpdateOrderDto) {
    return this.prisma.order.update({
      where: { ID },
      data: updateOrderDto,
    });
  }

  remove(ID: string) {
    return this.prisma.order.delete({
      where: { ID },
    });
  }
}
