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

  private isValid = (qty: number) => {
    return !isNaN(qty) && qty > 0 && Number.isInteger(qty);
  };

  private findCartItem(idToFind: string): CartItem | undefined {
    return this.cart.find(({ id }) => idToFind === id);
  }

  private insertCartItem(cartItemToInsert: CartItem): CartItem[] {
    return [...this.cart, cartItemToInsert];
  }

  private updateCartItem(CartItemToUpdate: CartItem): CartItem[] {
    return this.cart.map((cartItem) =>
      CartItemToUpdate.id === cartItem.id ? CartItemToUpdate : cartItem
    );
  }

  private deleteCartItem(cartItemToDelete: CartItem): CartItem[] {
    return this.cart.filter((cartItem) => cartItemToDelete.id !== cartItem.id);
  }

  private constructor() {
    this.save(JSON.parse(window.localStorage.getItem('cart') || '[]'));
  }

  getAllItems = (): CartItem[] => {
    return this.cart;
  };

  getItem = (
    variant: keyof Card['prices'],
    card: Card
  ): CartItem | undefined => {
    return this.findCartItem(CartItem.generateId(variant, card.id));
  };

  // TODO: return error on failure
  addItem = (qty: number, variant: keyof Card['prices'], card: Card): void => {
    if (!this.isValid(qty)) return;
    const cartItem = this.findCartItem(CartItem.generateId(variant, card.id));
    const cart = cartItem
      ? this.updateCartItem(CartItem.create(qty + cartItem.qty, variant, card))
      : this.insertCartItem(CartItem.create(qty, variant, card));
    this.save(cart);
  };

  substractItem = (
    qty: number,
    variant: keyof Card['prices'],
    card: Card
  ): void => {
    if (!this.isValid(qty)) return;
    const cartItem = this.findCartItem(CartItem.generateId(variant, card.id));
    if (!cartItem) return;
    const newQty = cartItem.qty - qty;
    const cart =
      newQty > 0
        ? this.updateCartItem(CartItem.create(newQty, variant, card))
        : this.deleteCartItem(cartItem);
    this.save(cart);
  };

  // TODO: return error on failure
  deleteItem = (variant: keyof Card['prices'], card: Card): void => {
    const cartItem = this.findCartItem(CartItem.generateId(variant, card.id));
    if (cartItem) {
      const cart = this.deleteCartItem(cartItem);
      this.save(cart);
    }
  };

  clearCart = () => {
    this.save([]);
  };
}
