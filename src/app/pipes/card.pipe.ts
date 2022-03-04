import {Pipe, PipeTransform} from '@angular/core';
import { Card } from '../models/card.model';

@Pipe({name: 'searchCards'})
export class SearchCardsPipe implements PipeTransform {
  transform(cards: Card[], search: string = "") {
    return cards.filter(({name}) => name.toLowerCase().includes(search.toLowerCase()));
  }
}

@Pipe({name: 'orderCards'})
export class OrderCardsPipe implements PipeTransform {
  transform(cards: Card[], isDesc?: boolean) {
    if (isDesc) return cards.sort((a,b) =>  b.releaseDate.getTime() - a.releaseDate.getTime())
    return cards.sort((a,b) =>  a.releaseDate.getTime() - b.releaseDate.getTime())
  }
}