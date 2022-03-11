export class Card {
  constructor(
    public id: string,
    public name: string,
    public released_at: Date,
    public image_uri: string,
    public mana_cost: string,
    public type_line: string,
    public oracle_text: string,
    public colors: string[],
    public keywords: string[],
    public isFavorite: boolean,
    public power?: number,
    public toughness?: number
  ) {}
}
