import { Component, Input } from '@angular/core';
import { Card } from '../models/card.model';
import { CardsService } from '../services/cards.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() card!: Card;

  constructor(private cardsService: CardsService) {}

  handleFavorite() {
    this.cardsService
      .onFavorite(this.card)
      .subscribe((c: Card) => (this.card = c));
  }
}
