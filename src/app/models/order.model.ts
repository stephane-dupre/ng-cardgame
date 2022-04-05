import { Item } from './item.model';

export class Order {
  constructor(public id: string, public items: Item[], public total: number) {}
}
