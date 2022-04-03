import { Item } from './item.model';

export class Cart {
  public items: Item[];

  constructor(items: Item[]) {
    this.items = items;
  }

  private persist() {
    window.localStorage.setItem('cart', JSON.stringify({ items: this.items }));
  }

  private isValid(qty: number) {
    return !isNaN(qty) && qty > 0 && Number.isInteger(qty);
  }

  private find(idToFind: string): Item | undefined {
    return this.items.find(({ id }) => idToFind === id);
  }

  clear(): void {
    this.items = [];
    this.persist();
  }

  private insert(cartItemToInsert: Item): void {
    this.items = [...this.items, cartItemToInsert];
    this.persist();
  }

  private update(CartItemToUpdate: Item): void {
    this.items = this.items.map((item) =>
      CartItemToUpdate.id === item.id ? CartItemToUpdate : item
    );
    this.persist();
  }

  deleteItem(cartItemToDelete: Item): void {
    this.items = this.items.filter((item) => cartItemToDelete.id !== item.id);
    this.persist();
  }

  addItem(item: Item): void {
    if (!this.isValid(item.qty)) return;
    const found = this.find(Item.generateId(item.variant, item.card.id));
    found
      ? this.update(new Item(found.qty + item.qty, item.variant, item.card))
      : this.insert(item);
  }

  changeItemQty(newQty: number, { variant, card }: Item): void {
    if (!this.isValid(newQty)) return;
    this.update(new Item(newQty, variant, card));
  }

  itemCount(): number {
    return this.items.reduce((acc, { qty }) => acc + qty, 0);
  }

  total(): number {
    return this.items.reduce(
      (acc, { qty, variant, card }) => acc + qty * card.prices[variant],
      0
    );
  }
}
