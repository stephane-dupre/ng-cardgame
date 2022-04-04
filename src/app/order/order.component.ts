import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from '../models/cart.model';
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
  cart: Cart;

  constructor(
    private orderService: OrderService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = Date.now().toString();
    this.cartService.cart.subscribe((cart) => (this.cart = cart));
  }

  confirm() {
    const order = new Order(this.id, this.cart.items, this.cart.total());
    this.orderService.insert(order);
    this.cart.clear();
    this.router.navigate(['/order-list']);
  }
}
