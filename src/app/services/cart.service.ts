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

  private find(idToFind: string): CartItem | undefined {
    return this.cart.find(({ id }) => idToFind === id);
  }

  private insert(cartItemToInsert: CartItem): CartItem[] {
    return [...this.cart, cartItemToInsert];
  }

  private update(CartItemToUpdate: CartItem): CartItem[] {
    return this.cart.map((cartItem) =>
      CartItemToUpdate.id === cartItem.id ? CartItemToUpdate : cartItem
    );
  }

  private delete(cartItemToDelete: CartItem): CartItem[] {
    return this.cart.filter((cartItem) => cartItemToDelete.id !== cartItem.id);
  }

  private constructor() {
    this.save(JSON.parse(window.localStorage.getItem('cart') || '[]'));
  }

  getTotal = (): number => {
    return this.cart.reduce(
      (acc, { qty, variant, card }) => acc + qty * card.prices[variant],
      0
    );
  };

  getAllItems = (): CartItem[] => {
    return this.cart;
  };

  getItem = (
    variant: keyof Card['prices'],
    card: Card
  ): CartItem | undefined => {
    return this.find(CartItem.generateId(variant, card.id));
  };

  // TODO: return error on failure
  addItem = (qty: number, variant: keyof Card['prices'], card: Card): void => {
    if (!this.isValid(qty)) return;
    const cartItem = this.find(CartItem.generateId(variant, card.id));
    const cart = cartItem
      ? this.update(new CartItem(qty + cartItem.qty, variant, card))
      : this.insert(new CartItem(qty, variant, card));
    this.save(cart);
  };

  substractItem = (
    qty: number,
    variant: keyof Card['prices'],
    card: Card
  ): void => {
    if (!this.isValid(qty)) return;
    const cartItem = this.find(CartItem.generateId(variant, card.id));
    if (!cartItem) return;
    const newQty = cartItem.qty - qty;
    const cart =
      newQty > 0
        ? this.update(new CartItem(newQty, variant, card))
        : this.delete(cartItem);
    this.save(cart);
  };

  changeItemQty = (newQty: number, { variant, card }: CartItem): void => {
    if (!this.isValid(newQty)) return;
    const cart = this.update(new CartItem(newQty, variant, card));
    this.save(cart);
  };

  // TODO: return error on failure
  deleteItem = (variant: keyof Card['prices'], card: Card): void => {
    const cartItem = this.find(CartItem.generateId(variant, card.id));
    if (cartItem) {
      const cart = this.delete(cartItem);
      this.save(cart);
    }
  };

  clearCart = () => {
    this.save([]);
  };
}
