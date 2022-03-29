import { Injectable } from '@angular/core';
import { Card } from '../models/card.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  constructor(private http: HttpClient) {}

  getAllCards(): Observable<Card[]> {
    return <Observable<Card[]>>this.http.get('http://localhost:3000/cards');
  }

  getOneCard(id: string): Observable<Card> {
    return <Observable<Card>>this.http.get(`http://localhost:3000/cards/${id}`);
  }

  onFavorite(card: Card): Observable<Card> {
    return <Observable<Card>>(
      this.http.put(`http://localhost:3000/cards/${card.id}/favorite`, {})
    );
  }
}
