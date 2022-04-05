import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Card } from '../models/card.model';
import { Item } from '../models/item.model';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent implements OnInit {
  @Output() emitDelete: EventEmitter<Item> = new EventEmitter<Item>();
  @Output() emitChange: EventEmitter<{ item: Item; newQty: number }> =
    new EventEmitter<{ item: Item; newQty: number }>();

  @Input() item: Item;
  qty: number;

  constructor() {}

  ngOnInit(): void {
    this.qty = this.item.qty;
  }

  handleChange = () => {
    const data = { newQty: this.qty, item: this.item };
    this.emitChange.emit(data);
  };

  handleDelete = () => {
    this.emitDelete.emit(this.item);
  };
}
