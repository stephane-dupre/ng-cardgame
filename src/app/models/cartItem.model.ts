import { Card } from './card.model';

export class CartItem {
  public id: string;

  constructor(
    public qty: number,
    public variant: keyof Card['prices'],
    public card: Card
  ) {
    this.id = CartItem.generateId(variant, card.id);
    this.qty = qty;
    this.variant = variant;
    this.card = card;
  }

  public static generateId(variant: keyof Card['prices'], id: string) {
    return `${id}::${variant}`;
  }
}
