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

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cart = this.cartService.getAllItems();
  }

  total(): string {
    return this.cartService.total().toFixed(2);
  }

  deleteItem = (item: Item) => {
    this.cartService.deleteItem(item);
  };

  updateItemQty = ({ newQty, item }: any) => {
    this.cartService.changeItemQty(newQty, item);
  };

  order = () => {
    this.router.navigate(['/order']);
  };
}
