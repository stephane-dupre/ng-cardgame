import { Injectable } from '@angular/core';
import { Card } from '../models/card.model';
import Cards from './Cards';

@Injectable({
  providedIn: 'root',
})
export class CardsServices {
  cards: Card[] = Cards.map(
    ({
      id,
      name,
      released_at,
      image_uri,
      mana_cost,
      type_line,
      oracle_text,
      colors,
      keywords,
      power,
      toughness,
    }) => {
      return new Card(
        id,
        name,
        new Date(released_at),
        image_uri,
        mana_cost,
        type_line,
        oracle_text,
        colors,
        keywords,
        false,
        Number(power),
        Number(toughness)
      );
    }
  );

  getAllCards(): Card[] {
    return this.cards;
  }

  getOneCard(id: string): Card {
    const card = this.cards.find((c) => c.id === id);
    return card ? card : this.cards[0];
  }

  onFavorite(card: Card): void {
    card.isFavorite = !card.isFavorite;
  }
}
