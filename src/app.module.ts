import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductsModule } from './v1/product/product.module'; // Import the ProductsModule
import { OrderModule } from './v1/order/order.module';
import { ScheduleModule } from '@nestjs/schedule';
import { InventorySyncService } from './v1/inventory/inventory-sync.service';
import { HttpModule } from '@nestjs/axios';
import { InventoryService } from './v1/inventory/inventory.service';
import { InventoryEntity } from './database/entities/inventory.entity';
import { InventoryModule } from './v1/inventory/inventory.module';
import { databaseConfig } from './database/database.config';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    SequelizeModule.forRoot(databaseConfig),
    OrderModule,
    ProductsModule,
    HttpModule,
    InventoryModule,
  ],
  providers: [],
})
export class AppModule {}
