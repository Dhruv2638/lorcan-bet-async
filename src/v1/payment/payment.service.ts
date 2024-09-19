import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { OrdersEntity } from 'src/database/entities/orders.entity';

@Injectable()
export class PaymentService {
  constructor(private readonly httpService: HttpService) {}

  async processPayment(order: OrdersEntity): Promise<{ success: boolean }> {
    try {
      // Simulate random success or failure with a 50/50 chance
      const randomOutcome = Math.random() >= 0.5;

      if (randomOutcome) {
        return { success: true };
      } else {
        return { success: false };
      }
    } catch (error) {
      throw new Error('Payment processing failed');
    }
  }
}
