import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private items: Item[];

  constructor(private http: HttpClient) {
    this.getAllItems().subscribe((c) => (this.items = c));
  }

  getAllItems(): Observable<Item[]> {
    return <Observable<Item[]>>this.http.get('http://localhost:3000/cart');
  }

  deleteItem(id: string): Observable<Item[]> {
    return <Observable<Item[]>>(
      this.http.delete(`http://localhost:3000/cart/${id}`)
    );
  }

  putItem(item: Item): Observable<Item[]> {
    return <Observable<Item[]>>(
      this.http.put('http://localhost:3000/cart', item)
    );
  }

  patchItem(id: string, qty: number): Observable<Item[]> {
    return <Observable<Item[]>>(
      this.http.put(`http://localhost:3000/cart/${id}`, { qty })
    );
  }

  clear(): Observable<Item[]> {
    return <Observable<Item[]>>(
      this.http.get('http://localhost:3000/cart/clear')
    );
  }

  itemCount(cart: Item[]) {
    return cart?.reduce((acc, { qty }) => acc + qty, 0);
  }

  total(cart: Item[]): number {
    return cart?.reduce(
      (acc, { qty, variant, card }) => acc + qty * card.variants[variant],
      0
    );
  }
}
