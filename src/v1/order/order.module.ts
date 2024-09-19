import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrdersController } from './order.controller';
import { OrderProcessingService } from './order.service';
import { OrdersEntity } from 'src/database/entities/orders.entity';
import { InventoryEntity } from 'src/database/entities/inventory.entity';
import { OrderLogsEntity } from 'src/database/entities/order_logs.entity';
import { PaymentService } from '../payment/payment.service';
import { InventoryService } from '../inventory/inventory.service';
import { HttpModule } from '@nestjs/axios';
import { CategoriesEntity } from 'src/database/entities/category.entity';
import { ProductCategories } from 'src/database/entities/product_categories.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([
      OrdersEntity,
      InventoryEntity,
      OrderLogsEntity,
      CategoriesEntity, // Add CategoriesEntity
      ProductCategories, // Add ProductCategories
    ]),
    HttpModule,
  ],
  controllers: [OrdersController],
  providers: [
    OrderProcessingService,
    PaymentService,
    InventoryService,
    InventoryService,
  ],
})
export class OrderModule {}
