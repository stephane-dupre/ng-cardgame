export class Card {
  constructor(
    public id: string,
    public name: string,
    public released_at: Date,
    public image_uris: { normal: string; large: string; art_crop: string },
    public mana_cost: string,
    public type_line: string,
    public oracle_text: string,
    public colors: string[],
    public keywords: string[],
    public prices: { eur: number; eur_foil: number },
    public isFavorite: boolean,
    public power?: string,
    public toughness?: string
  ) {}
}
