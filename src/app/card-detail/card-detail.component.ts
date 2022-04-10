import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Card } from '../models/card.model';
import { Item } from '../models/item.model';
import { CardsService } from '../services/cards.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.scss'],
})
export class CardDetailComponent {
  id: string;
  card!: Card;
  selected: keyof Card['variants'] = 'normal';
  qty: number;

  constructor(
    private route: ActivatedRoute,
    private cardsService: CardsService,
    private cartService: CartService
  ) {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  price() {
    return this.card?.variants[this.selected];
  }

  putCard() {
    this.cartService
      .putItem(new Item(this.qty, this.selected, this.card))
      .subscribe((c) => console.log(c));
  }

  ngOnInit(): void {
    this.cardsService.getOneCard(this.id).subscribe((c) => (this.card = c));
  }
}
