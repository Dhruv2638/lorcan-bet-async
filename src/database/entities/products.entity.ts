import {
  Model,
  Column,
  DataType,
  Table,
  BelongsToMany,
} from 'sequelize-typescript';
import { CategoriesEntity } from './category.entity';
import { ProductCategories } from './product_categories.entity';

@Table({
  tableName: 'products',
  timestamps: true,
})
export class ProductsEntity extends Model<ProductsEntity> {
  @Column({
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    type: DataType.INTEGER,
  })
  id: number;

  @Column({
    allowNull: false,
    type: DataType.STRING(255),
  })
  name: string;

  @Column({
    allowNull: false,
    type: DataType.TEXT,
  })
  description: string;

  @Column({
    allowNull: false,
    type: DataType.DOUBLE,
  })
  price: number;

  @BelongsToMany(() => CategoriesEntity, () => ProductCategories)
  categories: CategoriesEntity[];
}
