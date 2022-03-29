import { Card } from './card.model';

export class CartItem {
  constructor(
    public qty: number,
    public variant: keyof Card['prices'],
    public card: Card
  ) {}
}
