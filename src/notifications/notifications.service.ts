import { Injectable } from '@nestjs/common';
import { OrdersService } from 'src/orders/orders.service';

@Injectable()
export class NotificationsService {
  constructor(private readonly ordersService: OrdersService) {}
  notify(event: string, payload: any) {
    // For lab: just log
    console.log(`[NOTIFY] ${event}`, payload);
    return { ok: true };
  }
}