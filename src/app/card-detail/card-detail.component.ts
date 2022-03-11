import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Card } from '../models/card.model';
import { CardsServices } from '../services/cards.service';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.scss'],
})
export class CardDetailComponent {
  id: string;
  card!: Card;
  loaded: boolean = false;
  cardObservable!: Observable<Card>;

  constructor(
    private route: ActivatedRoute,
    private cardsServices: CardsServices
  ) {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  ngOnInit(): void {
    this.cardObservable = this.cardsServices.getOneCard(this.id);
    this.cardObservable.subscribe((c) => {
      this.card = c;
      this.loaded = true;
    });
  }
}
