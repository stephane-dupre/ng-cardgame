import { Component, OnInit } from '@angular/core';
import { Card } from '../models/card.model';
import { CardsServices } from '../services/cards.service';

@Component({
  selector: 'app-card-collection',
  templateUrl: './card-collection.component.html',
  styleUrls: ['./card-collection.component.scss']
})
export class CardCollectionComponent implements OnInit {

    title = 'cardgame';
    cards!: Card[];
    search: string;
    isDesc: boolean = false;
  
    constructor(private cardsServices: CardsServices) {}
    
    ngOnInit(): void {
      this.cards = this.cardsServices.getAllCards();
    }

    receiveSearch($event: string) {
      this.search = $event;
    }

    changeOrder() {
      this.isDesc = !this.isDesc;
    }
}
