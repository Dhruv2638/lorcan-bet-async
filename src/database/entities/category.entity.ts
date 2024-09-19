import {
  Model,
  Table,
  Column,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { ProductsEntity } from './products.entity';
import { ProductCategories } from './product_categories.entity';

@Table({})
export class CategoriesEntity extends Model<CategoriesEntity> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name: string;

  @BelongsToMany(() => ProductsEntity, () => ProductCategories)
  products: ProductsEntity[];
}
