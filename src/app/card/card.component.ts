import { Component, Input } from '@angular/core';
import { Card } from '../models/card.model';
import { Item } from '../models/item.model';
import { CardsService } from '../services/cards.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() card!: Card;

  constructor(
    private cardsService: CardsService,
    private cartService: CartService
  ) {}

  handleFavorite() {
    this.cardsService
      .onFavorite(this.card)
      .subscribe((c: Card) => (this.card = c));

    this.cartService
      .putItem(new Item(2, 'normal', this.card))
      .subscribe((c) => console.log(c));
  }
}
