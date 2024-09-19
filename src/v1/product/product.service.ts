import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductsEntity } from '../../database/entities/products.entity';
import { CreateProductDto, UpdateProductDto } from './product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(ProductsEntity)
    private readonly productModel: typeof ProductsEntity,
  ) {}

  // Create a new product
  async createProduct(
    createProductDto: CreateProductDto,
  ): Promise<ProductsEntity> {
    return this.productModel.create(createProductDto);
  }

  // Update an existing product
  async updateProduct(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductsEntity> {
    const product = await this.productModel.findByPk(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product.update(updateProductDto);
  }

  // Delete a product
  async deleteProduct(id: number): Promise<void> {
    const product = await this.productModel.findByPk(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    await product.destroy();
  }
}
