import { Injectable } from '@angular/core';
import { Card } from '../models/card.model';
import { CartItem } from '../models/cartItem.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: CartItem[];

  private save(newCart: CartItem[]) {
    this.cart = newCart;
    window.localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  private qtyIsValid = (qty: number) => {
    return !isNaN(qty) && qty > 0 && Number.isInteger(qty);
  };

  private areEquals(p1: CartItem, p2: CartItem): boolean {
    return p1.card.id === p2.card.id && p1.variant === p2.variant;
  }

  private findCartItem(newCartItem: CartItem): CartItem | undefined {
    return this.cart.find((cartItem) => this.areEquals(cartItem, newCartItem));
  }

  private insertCartItem(newCartItem: CartItem): CartItem[] {
    return [...this.cart, newCartItem];
  }

  private updateCartItem(newCartItem: CartItem): CartItem[] {
    return this.cart.map((cartItem) =>
      this.areEquals(cartItem, newCartItem) ? newCartItem : cartItem
    );
  }

  private deleteCartItem(cartItemToDelete: CartItem): CartItem[] {
    return this.cart.filter(
      (cartItem) => !this.areEquals(cartItem, cartItemToDelete)
    );
  }

  private updateCart = (cartItem: CartItem) => {
    const cart = this.findCartItem(cartItem)
      ? this.updateCartItem(cartItem)
      : this.insertCartItem(cartItem);
    this.save(cart);
  };

  constructor() {
    this.save(JSON.parse(window.localStorage.getItem('cart') || '[]'));
  }

  getAll() {
    return this.cart;
  }

  add(qty: number, variant: keyof Card['prices'], card: Card) {
    if (!this.qtyIsValid(qty)) return;
    const currentQty =
      this.findCartItem(new CartItem(qty, variant, card))?.qty || 0;
    const cartItem = new CartItem(qty + currentQty, variant, card);
    this.updateCart(cartItem);
  }

  clear = () => {
    this.save([]);
  };
}
