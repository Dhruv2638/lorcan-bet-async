import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrdersEntity } from 'src/database/entities/orders.entity';
import { InventoryEntity } from 'src/database/entities/inventory.entity';
import { OrderLogsEntity } from 'src/database/entities/order_logs.entity';
import { PaymentService } from '../payment/payment.service';
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
  imports: [
    SequelizeModule.forFeature([
      OrdersEntity,
      InventoryEntity,
      OrderLogsEntity,
    ]),
  ],
  controllers: [],
  providers: [PaymentService, HttpService],
})
export class PaymentModule {}
