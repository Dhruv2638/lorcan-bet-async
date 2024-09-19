import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OrdersEntity } from '../../database/entities/orders.entity';
import { OrderLogsEntity } from '../../database/entities/order_logs.entity';
import { InventoryService } from '../inventory/inventory.service';
import { PaymentService } from '..//payment/payment.service'; // Import PaymentService
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class OrderProcessingService {
  private readonly logger = new Logger(OrderProcessingService.name);

  constructor(
    @InjectModel(OrdersEntity)
    private readonly ordersModel: typeof OrdersEntity,
    @InjectModel(OrderLogsEntity)
    private readonly orderLogsModel: typeof OrderLogsEntity,
    private readonly inventoryService: InventoryService,
    private readonly paymentService: PaymentService, // Use PaymentService
    private readonly sequelize: Sequelize,
  ) {}

  async processOrder(orderId: number, retryCount: number = 0): Promise<void> {
    const MAX_RETRIES = 5;
    const RETRY_DELAY_MS = 1000 * Math.pow(2, retryCount);

    const order = await this.ordersModel.findByPk(orderId);
    if (!order)
      throw new NotFoundException(`Order with ID ${orderId} not found`);

    const logExists = await this.orderLogsModel.findOne({
      where: { order_id: orderId, status: 'success' },
    });
    if (logExists) return;

    try {
      await this.sequelize.transaction(async (transaction) => {
        // Reserve Inventory
        const stockAvailable =
          await this.inventoryService.checkStockAvailability(
            order.product_id,
            order.quantity,
          );
        if (!stockAvailable) throw new Error('Insufficient stock');

        await this.inventoryService.deductInternalInventory(
          order.product_id,
          order.quantity,
        );

        // Process Payment
        const paymentSuccess = await this.processPayment(order);
        if (!paymentSuccess) {
          await this.inventoryService.releaseReservedInventory(
            order.product_id,
            order.quantity,
          );
          throw new Error('Payment failed');
        }

        // Log the successful order
        await this.orderLogsModel.create(
          {
            order_id: orderId,
            status: 'success',
            processed_at: new Date(),
          },
          { transaction },
        );

        await this.ordersModel.update(
          { status: 'processed' },
          { where: { id: orderId } },
        );
      });
    } catch (error) {
      if (retryCount < MAX_RETRIES) {
        setTimeout(
          () => this.processOrder(orderId, retryCount + 1),
          RETRY_DELAY_MS,
        );
      } else {
        await this.orderLogsModel.create({
          order_id: orderId,
          status: 'failed',
          processed_at: new Date(),
          error_message: error.message,
        });
        await this.ordersModel.update(
          { status: 'failed' },
          { where: { id: orderId } },
        );
      }
    }
  }

  private async processPayment(order: OrdersEntity): Promise<boolean> {
    try {
      const paymentResult = await this.paymentService.processPayment(order);
      return paymentResult.success;
    } catch (error) {
      this.logger.error(
        `Payment failed for order ${order.id}: ${error.message}`,
      );
      return false;
    }
  }
}
