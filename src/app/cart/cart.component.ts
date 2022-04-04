import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from '../models/cart.model';
import { Item } from '../models/item.model';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart: Cart;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartService.cart.subscribe((cart) => (this.cart = cart));
  }

  deleteItem = (item: Item) => {
    this.cart.deleteItem(item);
  };

  updateItemQty = ({ newQty, item }: any) => {
    this.cart.changeItemQty(newQty, item);
  };

  order = () => {
    this.router.navigate(['/order']);
  };
}
