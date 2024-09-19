import {
  Model,
  Column,
  DataType,
  Table,
  ForeignKey,
} from 'sequelize-typescript';
import { OrdersEntity } from './orders.entity'; // Assuming you have an OrdersEntity for order information

@Table({
  tableName: 'order_logs', // Specify the table name
  timestamps: true, // Automatically adds 'createdAt' and 'updatedAt'
})
export class OrderLogsEntity extends Model<OrderLogsEntity> {
  @Column({
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    type: DataType.INTEGER,
  })
  id: number;

  @ForeignKey(() => OrdersEntity)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  order_id: number;

  @Column({
    allowNull: false,
    type: DataType.STRING(50), // You can adjust the string length depending on status values
  })
  status: string;

  @Column({
    allowNull: true,
    type: DataType.DATE,
  })
  processed_at: Date;

  @Column({
    allowNull: true,
    type: DataType.TEXT, // Can store long error messages
  })
  error_message: string;
}
