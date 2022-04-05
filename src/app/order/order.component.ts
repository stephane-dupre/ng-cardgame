import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from '../models/item.model';
import { Order } from '../models/order.model';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  id: string;
  cart: Item[];

  constructor(
    private orderService: OrderService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = Date.now().toString();
    this.cart = this.cartService.getAllItems();
  }

  total(): string {
    return this.cartService.total().toFixed(2);
  }

  confirm() {
    const order = new Order(this.id, this.cart, this.cartService.total());
    this.orderService.insert(order);
    this.cartService.clear();
    this.router.navigate(['/order-list']);
  }
}
