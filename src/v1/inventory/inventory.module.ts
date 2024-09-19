import { Module } from '@nestjs/common';
import { InventorySyncService } from './inventory-sync.service';
import { InventoryService } from './inventory.service';
import { HttpModule } from '@nestjs/axios';
import { InventoryEntity } from 'src/database/entities/inventory.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductsService } from '../product/product.service';
import { ProductsEntity } from 'src/database/entities/products.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([InventoryEntity, ProductsEntity]),
    HttpModule,
  ],
  controllers: [],
  providers: [InventorySyncService, InventoryService, ProductsService],
})
export class InventoryModule {}
