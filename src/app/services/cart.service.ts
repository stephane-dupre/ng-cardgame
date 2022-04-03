import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../models/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private local: Cart = JSON.parse(
    window.localStorage.getItem('cart') || 'null'
  );
  private subject: BehaviorSubject<Cart>;
  public cart: Observable<Cart>;

  constructor() {
    const init = this.local?.items ? new Cart(this.local.items) : new Cart([]);
    this.subject = new BehaviorSubject<Cart>(init);
    this.cart = this.subject.asObservable();
  }
}
