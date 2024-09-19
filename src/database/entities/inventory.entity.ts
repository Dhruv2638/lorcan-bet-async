import {
  Model,
  Column,
  DataType,
  ForeignKey,
  Table,
} from 'sequelize-typescript';
import { ProductsEntity } from './products.entity';

@Table({
  tableName: 'inventory',
  timestamps: true,
})
export class InventoryEntity extends Model<InventoryEntity> {
  @Column({
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    type: DataType.INTEGER,
  })
  id: number;

  @ForeignKey(() => ProductsEntity)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  product_id: number;

  @Column({
    defaultValue: 0,
    type: DataType.BIGINT,
  })
  quantity: number;
}
