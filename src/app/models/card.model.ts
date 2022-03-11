export class Card {
  constructor(
    public id: string,
    public name: string,
    public releaseDate: Date,
    public image: string,
    public mana: string,
    public type: string,
    public text: string,
    public colors: string[],
    public keywords: string[],
    public isFavorite: boolean,
    public power?: number,
    public toughness?: number
  ) {}
}
