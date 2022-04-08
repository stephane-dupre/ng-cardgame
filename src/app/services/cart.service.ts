import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private local: Item[] = JSON.parse(
    window.localStorage.getItem('cart') || 'null'
  );
  private cart: Observable<Item[]>;
  private items: Item[];

  private oItiems: Observable<Item[]>;

  constructor(private http: HttpClient) {
    const init = this.local || [];
    this.cart = new Observable<Item[]>((cart) => cart.next(init));
    this.cart.subscribe((items) => (this.items = items));
  }

  getAllOItems(): Observable<Item[]> {
    return <Observable<Item[]>>this.http.get('http://localhost:3000/cart');
  }

  insertOItem(item: Item): Observable<Item> {
    return <Observable<Item>>this.http.put('http://localhost:3000/cart', item);
  }

  private persist() {
    window.localStorage.setItem('cart', JSON.stringify(this.items));
  }

  private isValid(qty: number) {
    return !isNaN(qty) && qty > 0 && Number.isInteger(qty);
  }

  private find(idToFind: string): Item | undefined {
    return this.items.find(({ id }) => idToFind === id);
  }

  private insert(cartItemToInsert: Item): void {
    this.items.push(cartItemToInsert);
    this.persist();
  }

  private update(CartItemToUpdate: Item): void {
    const item = this.find(CartItemToUpdate.id);
    if (item) item.qty = CartItemToUpdate.qty;
    this.persist();
  }

  getAllItems() {
    return this.items;
  }

  deleteItem(cartItemToDelete: Item): void {
    this.items.splice(this.items.indexOf(cartItemToDelete), 1);
    this.persist();
  }

  addItem(item: Item): void {
    if (!this.isValid(item.qty)) return;
    const found = this.find(Item.generateId(item.variant, item.card.id));
    found
      ? this.update(new Item(found.qty + item.qty, item.variant, item.card))
      : this.insert(item);
  }

  changeItemQty(newQty: number, { variant, card }: Item): void {
    if (!this.isValid(newQty)) return;
    this.update(new Item(newQty, variant, card));
  }

  clear(): void {
    this.items.splice(0, this.items.length);
    this.persist();
  }

  itemCount(): number {
    return this.items.reduce((acc, { qty }) => acc + qty, 0);
  }

  total(): number {
    return this.items.reduce(
      (acc, { qty, variant, card }) => acc + qty * card.prices[variant],
      0
    );
  }
}
