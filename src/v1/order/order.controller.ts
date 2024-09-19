import {
  Controller,
  Post,
  Param,
  Body,
  Res,
  Get,
  HttpStatus,
} from '@nestjs/common';
import { OrderProcessingService } from './order.service';
import { OrdersEntity } from '../../database/entities/orders.entity';
import { InjectModel } from '@nestjs/sequelize';
import { createOrderDto } from './order.dto';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly orderProcessingService: OrderProcessingService,
    @InjectModel(OrdersEntity)
    private readonly ordersModel: typeof OrdersEntity,
  ) {}

  // Create a new order
  @Post('create')
  async createOrder(@Body() createOrderDto: createOrderDto, @Res() res) {
    try {
      const order = await this.ordersModel.create({
        product_id: createOrderDto.productId,
        quantity: createOrderDto.quantity,
      });

      console.log({ order });
      // Process the order asynchronously
      await this.orderProcessingService.processOrder(order.id);

      return res.status(HttpStatus.CREATED).json({
        message: 'Order created and processing initiated',
        orderId: order.id,
      });
    } catch (error) {
      console.error('Error creating order', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Failed to create order',
        error: error.message,
      });
    }
  }

  // Endpoint to manually trigger order processing
  @Post(':orderId/process')
  async processOrder(@Param('orderId') orderId: number) {
    await this.orderProcessingService.processOrder(orderId);
    return { message: 'Order processing initiated' };
  }
}
