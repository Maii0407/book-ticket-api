import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { OrderEntity } from './entities/order.entity';

@Controller('orders')
@ApiTags('order')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: OrderEntity })
  async create(@Body() createOrderDto: CreateOrderDto) {
    return new OrderEntity(await this.ordersService.create(createOrderDto));
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: OrderEntity, isArray: true })
  async findAll() {
    const orders = await this.ordersService.findAll();

    return orders.map((order) => new OrderEntity(order));
  }

  @Get(':ID')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: OrderEntity })
  async findOne(@Param('ID') ID: string) {
    const order = await this.ordersService.findOne(ID);

    if (!order) {
      throw new NotFoundException(`Order with ${ID} does not exists`);
    }

    return new OrderEntity(order);
  }

  @Patch(':ID')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: OrderEntity })
  async update(@Param('ID') ID: string, @Body() updateOrderDto: UpdateOrderDto) {
    const order = await this.ordersService.findOne(ID);

    if (!order) {
      throw new NotFoundException(`Order with ${ID} does not exists`);
    }

    return new OrderEntity(await this.ordersService.update(ID, updateOrderDto));
  }

  @Delete(':ID')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: OrderEntity })
  async remove(@Param('ID') ID: string) {
    const order = await this.ordersService.findOne(ID);

    if (!order) {
      throw new NotFoundException(`Order with ${ID} does not exists`);
    }
    return new OrderEntity(await this.ordersService.remove(ID));
  }
}
