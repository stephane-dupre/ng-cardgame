import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from '../models/item.model';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart: Item[];
  count: number;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartService.getAllItems().subscribe((c) => (this.cart = c));
  }

  itemCount() {
    return this.cartService.itemCount(this.cart);
  }

  total(): number {
    return this.cartService.total(this.cart);
  }

  deleteItem = ({ id }: Item) => {
    this.cartService.deleteItem(id).subscribe((c) => (this.cart = c));
  };

  updateItemQty = ({ newQty, item }: { newQty: number; item: Item }) => {
    this.cartService.patchItem(item, newQty).subscribe((c) => (this.cart = c));
  };

  order = () => {
    this.router.navigate(['/order']);
  };
}
