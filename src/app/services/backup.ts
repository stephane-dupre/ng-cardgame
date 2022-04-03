import { Injectable } from '@angular/core';
import { Card } from '../models/card.model';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Item[];

  private save(newCart: Item[]) {
    this.cart = newCart;
    window.localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  private isValid = (qty: number) => {
    return !isNaN(qty) && qty > 0 && Number.isInteger(qty);
  };

  private find(idToFind: string): Item | undefined {
    return this.cart.find(({ id }) => idToFind === id);
  }

  private insert(cartItemToInsert: Item): Item[] {
    return [...this.cart, cartItemToInsert];
  }

  private update(CartItemToUpdate: Item): Item[] {
    return this.cart.map((item) =>
      CartItemToUpdate.id === item.id ? CartItemToUpdate : item
    );
  }

  private delete(cartItemToDelete: Item): Item[] {
    return this.cart.filter((item) => cartItemToDelete.id !== item.id);
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

  getAllItems = (): Item[] => {
    return this.cart;
  };

  getItem = (variant: keyof Card['prices'], card: Card): Item | undefined => {
    return this.find(Item.generateId(variant, card.id));
  };

  // TODO: return error on failure
  addItem = (qty: number, variant: keyof Card['prices'], card: Card): void => {
    if (!this.isValid(qty)) return;
    const item = this.find(Item.generateId(variant, card.id));
    const cart = item
      ? this.update(new Item(qty + item.qty, variant, card))
      : this.insert(new Item(qty, variant, card));
    this.save(cart);
  };

  substractItem = (
    qty: number,
    variant: keyof Card['prices'],
    card: Card
  ): void => {
    if (!this.isValid(qty)) return;
    const item = this.find(Item.generateId(variant, card.id));
    if (!item) return;
    const newQty = item.qty - qty;
    const cart =
      newQty > 0
        ? this.update(new Item(newQty, variant, card))
        : this.delete(item);
    this.save(cart);
  };

  changeItemQty = (newQty: number, { variant, card }: Item): void => {
    if (!this.isValid(newQty)) return;
    const cart = this.update(new Item(newQty, variant, card));
    this.save(cart);
  };

  // TODO: return error on failure
  deleteItem = (variant: keyof Card['prices'], card: Card): void => {
    const item = this.find(Item.generateId(variant, card.id));
    if (item) {
      const cart = this.delete(item);
      this.save(cart);
    }
  };

  clearCart = () => {
    this.save([]);
  };
}
