import { Component, Input, OnInit } from '@angular/core';
import { Card } from '../models/card.model';
import { Cart } from '../models/cart.model';
import { Item } from '../models/item.model';
import { CardsService } from '../services/cards.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() card!: Card;
  cart: Cart;

  constructor(
    private cardsService: CardsService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.cartService.cart.subscribe((cart) => {
      this.cart = cart;
    });
  }

  handleFavorite() {
    this.cardsService
      .onFavorite(this.card)
      .subscribe((c: Card) => (this.card = c));

    this.cart.addItem(new Item(2, 'eur', this.card));
  }
}
