import { Component, Input, OnInit } from '@angular/core';
import { Card } from '../models/card.model';
import { CardsServices } from '../services/cards.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() card!: Card;

  constructor(private cardsServices: CardsServices) {}

  ngOnInit(): void {
    console.log(this.card);
  }

  handleFavorite() {
    this.cardsServices
      .onFavorite(this.card)
      .subscribe((c: Card) => (this.card = c));
  }
}
