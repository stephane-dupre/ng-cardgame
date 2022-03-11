import { Component, Input } from '@angular/core';
import { Card } from '../models/card.model';
import { CardsServices } from '../services/cards.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() card!: Card;

  constructor(private cardsServices: CardsServices) {}

  handleFavorite() {
    this.cardsServices.onFavorite(this.card);
  }
}
