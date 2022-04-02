import { Component, OnInit } from '@angular/core';
import { CartItem } from '../models/cartItem.model';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart: CartItem[];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cart = this.cartService.getAllItems();
  }

  deleteCartItem = (item: CartItem) => {
    this.cartService.deleteItem(item.variant, item.card);
    this.cart = this.cartService.getAllItems();
  };

  updateCartItemQty = ({ cartItem, newQty }: any) => {
    this.cartService.changeItemQty(newQty, cartItem);
  };
}
