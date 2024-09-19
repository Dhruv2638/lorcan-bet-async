import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { InventoryEntity } from '../../database/entities/inventory.entity';

@Injectable()
export class InventoryService {
  constructor(
    @InjectModel(InventoryEntity)
    private readonly inventoryModel: typeof InventoryEntity,
  ) {}

  // Internal method to update inventory from external warehouse
  async updateExternalInventory(
    productId: number,
    externalQuantity: number,
  ): Promise<void> {
    const inventory = await this.inventoryModel.findOne({
      where: { product_id: productId },
    });
    if (inventory) {
      inventory.quantity = externalQuantity; // Add a column to store external inventory
      await inventory.save();
    } else {
      // if the product is not avaible then we add new entry
      await this.inventoryModel.create({
        product_id: productId,
        quantity: externalQuantity,
      });
    }
  }

  // Check inventory from both internal and external stock levels
  async checkStockAvailability(
    productId: number,
    requiredQuantity: number,
  ): Promise<boolean> {
    const inventory = await this.inventoryModel.findOne({
      where: { product_id: productId },
    });
    if (!inventory) return false;

    const totalStock = inventory.quantity + (inventory.quantity || 0); // Sum both internal and external stock
    return totalStock >= requiredQuantity;
  }

  // Deduct from internal stock (leave external stock for sync)
  async deductInternalInventory(
    productId: number,
    quantity: number,
  ): Promise<void> {
    const inventory = await this.inventoryModel.findOne({
      where: { product_id: productId },
    });
    if (inventory.quantity < quantity) throw new Error('Insufficient stock');
    inventory.quantity -= quantity;
    await inventory.save();
  }

  async releaseReservedInventory(
    productId: number,
    quantity: number,
  ): Promise<void> {
    const inventory = await InventoryEntity.findOne({
      where: { product_id: productId },
    });

    if (!inventory) {
      throw new Error('Inventory not found');
    }

    // Increase the inventory by the quantity that was reserved for the failed order
    inventory.quantity += quantity;
    await inventory.save();
  }
}
