import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Card } from '../models/card.model';
import { CardsService } from '../services/cards.service';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.scss'],
})
export class CardDetailComponent {
  id: string;
  card!: Card;

  constructor(
    private route: ActivatedRoute,
    private cardsService: CardsService
  ) {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  ngOnInit(): void {
    this.cardsService.getOneCard(this.id).subscribe((c) => (this.card = c));
  }
}
