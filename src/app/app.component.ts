import { Component, OnInit } from '@angular/core';
import { Card } from './models/card.model';
import { CardsServices } from './services/cards.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'cardgame';
  cards!: Card[];

  constructor(private cardsServices: CardsServices) {}
  
  ngOnInit(): void {
    this.cards = this.cardsServices.getAllCards();
  }
}
