import { Injectable } from '@angular/core';
import { Card } from '../models/card.model';
import { Purchase } from '../models/purchase.model';

@Injectable({
  providedIn: 'root',
})
export class CartServices {
  public cart: Purchase[];

  private update(newCart: Purchase[]) {
    this.cart = newCart;
    window.localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  private qtyIsValid = (qty: number) => {
    return !isNaN(qty) && qty > 0 && Number.isInteger(qty);
  };

  private purchaseOrUndefined(
    id: string,
    variant: string
  ): Purchase | undefined {
    return this.cart.find((p) => id === p.card.id && variant === p.variant);
  }

  constructor() {
    this.update(JSON.parse(window.localStorage.getItem('cart') || '[]'));
  }

  nbItems(): number {
    return this.cart.reduce((acc, val) => acc + val.qty, 0);
  }

  totalPrice(): number {
    return this.cart.reduce(
      (acc, { qty, card, variant }) => acc + qty * card.prices[variant],
      0
    );
  }

  addToCart = (card: Card, variant: keyof Card['prices'], addedQty: number) => {
    if (!this.qtyIsValid(addedQty)) return;
    const newCart = this.purchaseOrUndefined(card.id, variant)
      ? this.cart.map((p) => {
          return p.card.id === card.id && p.variant === variant
            ? new Purchase(p.qty + addedQty, variant, card)
            : new Purchase(p.qty, p.variant, p.card);
        })
      : [...this.cart, new Purchase(addedQty, variant, card)];

    this.update(newCart);
  };

  updateQty = (id: string, variant: keyof Card['prices'], newQty: number) => {
    if (!this.qtyIsValid(newQty)) return;
    const newCart = this.purchaseOrUndefined(id, variant)
      ? this.cart.map((p) => {
          return p.card.id === id && p.variant === variant
            ? new Purchase(newQty, variant, p.card)
            : new Purchase(p.qty, p.variant, p.card);
        })
      : this.cart;

    this.update(newCart);
  };

  removeFromCart = (card: Card, variant: keyof Card['prices']) => {
    if (this.purchaseOrUndefined(card.id, variant)) {
      const newCart = this.cart.filter(
        (p) => !(p.card.id === card.id && p.variant === variant)
      );
      this.update(newCart);
    }
  };

  clearCart = () => {
    this.update([]);
  };
}
