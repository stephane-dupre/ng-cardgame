import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../models/card.model';
import { CardsServices } from '../services/cards.service';

@Component({
  selector: 'app-card-collection',
  templateUrl: './card-collection.component.html',
  styleUrls: ['./card-collection.component.scss'],
})
export class CardCollectionComponent implements OnInit {
  search: string;
  orderBy: 'name' | 'date' = 'name';
  cardsObservable: Observable<any>;

  constructor(private cardsServices: CardsServices) {}

  ngOnInit(): void {
    this.cardsObservable = this.cardsServices.getAllCards();
  }

  receiveSearch($event: string) {
    this.search = $event;
  }

  changeOrder() {
    this.orderBy = this.orderBy === 'name' ? 'date' : 'name';
  }
}
