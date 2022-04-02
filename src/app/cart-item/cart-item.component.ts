import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Card } from '../models/card.model';
import { CartItem } from '../models/cartItem.model';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent implements OnInit {
  @Output() emitDelete: EventEmitter<CartItem> = new EventEmitter<CartItem>();
  @Output() emitChange: EventEmitter<{ cartItem: CartItem; newQty: number }> =
    new EventEmitter<{ cartItem: CartItem; newQty: number }>();

  @Input() cartItem: CartItem;
  card: Card;
  qty: number;

  constructor() {}

  ngOnInit(): void {
    this.card = this.cartItem.card;
    this.qty = this.cartItem.qty;
  }

  getPrice = (): number => {
    const price = this.card.prices[this.cartItem.variant] * this.qty;
    return price > 0 ? price : 0;
  };

  handleChange = () => {
    const data = { cartItem: this.cartItem, newQty: this.qty };
    this.emitChange.emit(data);
  };

  handleDelete = () => {
    this.emitDelete.emit(this.cartItem);
  };
}
