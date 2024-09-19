import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InventoryService } from './inventory.service';
import { ProductsService } from '../product/product.service';

@Injectable()
export class InventorySyncService {
  private readonly logger = new Logger(InventorySyncService.name);

  constructor(
    private readonly inventoryService: InventoryService,
    private readonly productService: ProductsService,
  ) {}

  @Cron(CronExpression.EVERY_HOUR) // Sync inventory every 10 minutes
  async syncInventory(): Promise<void> {
    try {
      const externalInventory = await this.fetchExternalInventory();
      await this.updateInventory(externalInventory);
    } catch (error) {
      this.logger.error(`Failed to sync inventory: ${error.message}`);
    }
  }

  private async fetchExternalInventory(): Promise<any> {
    const response = fetch('https://dummyjson.com/products/1').then((res) =>
      res.json(),
    );
    return response;
  }

  private async updateInventory(externalInventory: any): Promise<void> {
    // first add that product in products then we will have to update the inventory
    const createProduct = await this.productService.createProduct({
      name: externalInventory.title,
      description: externalInventory.description,
      price: externalInventory.price,
    });
    return await this.inventoryService.updateExternalInventory(
      createProduct.dataValues.id,
      externalInventory.stock,
    );
  }
}
