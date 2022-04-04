import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private orders: Order[];

  constructor() {
    this.orders = [];
  }

  getAllOrders(): Order[] {
    return this.orders;
  }

  getOrder(id: string): Order | undefined {
    return this.orders.find((order) => order.id === id);
  }

  insert(order: Order): void {
    this.orders.push(order);
  }
}
