import { Card } from './card.model';

export class Purchase {
  constructor(
    public qty: number,
    public variant: keyof Card['prices'],
    public card: Card
  ) {}
}
