import { Model, Table, Column, ForeignKey } from 'sequelize-typescript';
import { ProductsEntity } from './products.entity';
import { CategoriesEntity } from './category.entity';

@Table({})
export class ProductCategories extends Model<ProductCategories> {
  @ForeignKey(() => ProductsEntity)
  @Column
  product_id: number;

  @ForeignKey(() => CategoriesEntity)
  @Column
  category_id: number;
}
