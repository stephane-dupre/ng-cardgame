import { Component, OnInit } from '@angular/core';
import { Card } from '../models/card.model';
import { CardsServices } from '../services/cards.service';

@Component({
  selector: 'app-card-collection',
  templateUrl: './card-collection.component.html',
  styleUrls: ['./card-collection.component.scss'],
})
export class CardCollectionComponent implements OnInit {
  cards!: Card[];
  search: string;
  orderBy: 'name' | 'date' = 'name';

  constructor(private cardsServices: CardsServices) {}

  ngOnInit(): void {
    this.cards = this.cardsServices.getAllCards();
  }

  receiveSearch($event: string) {
    this.search = $event;
  }

  changeOrder() {
    this.orderBy = this.orderBy === 'name' ? 'date' : 'name';
  }
}
