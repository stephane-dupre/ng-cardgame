import { Component, OnInit } from '@angular/core';
import { Card } from '../models/card.model';
import { CardsService } from '../services/cards.service';

@Component({
  selector: 'app-card-collection',
  templateUrl: './card-collection.component.html',
  styleUrls: ['./card-collection.component.scss'],
})
export class CardCollectionComponent implements OnInit {
  search: string;
  orderBy: 'name' | 'date' = 'name';
  cards: Card[];

  constructor(private cardsService: CardsService) {}

  ngOnInit(): void {
    this.cardsService.getAllCards().subscribe((cards) => {
      this.cards = cards;
    });
  }

  receiveSearch($event: string) {
    this.search = $event;
  }

  changeOrder() {
    this.orderBy = this.orderBy === 'name' ? 'date' : 'name';
  }
}
