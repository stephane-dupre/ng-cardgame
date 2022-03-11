import { Pipe, PipeTransform } from '@angular/core';
import { Card } from '../models/card.model';

@Pipe({ name: 'searchCards' })
export class SearchCardsPipe implements PipeTransform {
  transform(cards: Card[], search: string = '') {
    if (cards === null) return cards;
    return cards.filter(({ name }) =>
      name.toLowerCase().includes(search.toLowerCase())
    );
  }
}

@Pipe({ name: 'orderCards' })
export class OrderCardsPipe implements PipeTransform {
  transform(cards: Card[], orderBy?: 'name' | 'date') {
    if (cards === null) return cards;
    if (orderBy === 'date') {
      return cards.sort((a, b) => {
        return (
          new Date(a.released_at).getTime() - new Date(b.released_at).getTime()
        );
      });
    }
    return cards.sort((a, b) => (a.name > b.name && 1) || -1);
  }
}
