import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  getAllOrders(): Observable<Order[]> {
    return <Observable<Order[]>>this.http.get('http://localhost:3000/orders');
  }

  insertOrder(order: Order): Observable<Order[]> {
    return <Observable<Order[]>>(
      this.http.put('http://localhost:3000/orders', order)
    );
  }
}
