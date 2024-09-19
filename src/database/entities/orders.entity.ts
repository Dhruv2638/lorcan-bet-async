import {
  Model,
  Column,
  DataType,
  ForeignKey,
  Table,
} from 'sequelize-typescript';
import { ProductsEntity } from './products.entity';

@Table({
  tableName: 'orders',
  timestamps: true,
})
export class OrdersEntity extends Model<OrdersEntity> {
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

  @Column({
    type: DataType.ENUM,
    allowNull: false,
    defaultValue: 'pending',
    values: ['pending', 'processed', 'failed'],
  })
  status: string;
}
