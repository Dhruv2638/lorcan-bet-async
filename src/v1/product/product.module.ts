import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductsController } from './product.controller';
import { ProductsService } from './product.service';
import { ProductsEntity } from '../../database/entities/products.entity';

@Module({
  imports: [SequelizeModule.forFeature([ProductsEntity])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
