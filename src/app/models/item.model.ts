import { Card } from './card.model';

export class Item {
  public id: string;

  constructor(
    public qty: number,
    public variant: keyof Card['variants'],
    public card: Card
  ) {
    this.id = Item.generateId(variant, card.id);
    this.qty = qty;
    this.variant = variant;
    this.card = card;
  }

  public static generateId(variant: keyof Card['variants'], id: string) {
    return `${id}::${variant}`;
  }
}
