import { Component, OnInit } from '@angular/core';
import { Card } from './models/card.model';
import { Item } from './models/item.model';
import { CardsService } from './services/cards.service';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'cardgame';
  items: Item[];
  cards: Card[];

  constructor(private cart: CartService, private card: CardsService) {}

  ngOnInit(): void {
    this.cart.getAllOItems().subscribe((v) => (this.items = v));
    this.card.getAllCards().subscribe((cards) => {
      this.cards = cards;
    });
  }

  click() {
    console.log(this.items);
    this.cart.insertOItem(new Item(2, 'eur', this.cards[0]));
  }
}
