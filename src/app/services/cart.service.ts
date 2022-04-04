import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../models/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private local: Cart = JSON.parse(
    window.localStorage.getItem('cart') || 'null'
  );
  public cart: Observable<Cart>;

  constructor() {
    const init = this.local?.items ? new Cart(this.local.items) : new Cart([]);
    this.cart = new Observable<Cart>((cart) => cart.next(init));
  }
}
