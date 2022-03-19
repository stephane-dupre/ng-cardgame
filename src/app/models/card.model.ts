type uris = { normal: string; large: string; art_crop: string };
type prices = { eur: string; eur_foil: string };

export class Card {
  constructor(
    public id: string,
    public name: string,
    public released_at: Date,
    public image_uris: uris,
    public mana_cost: string,
    public type_line: string,
    public oracle_text: string,
    public colors: string[],
    public keywords: string[],
    public finishes: string[],
    public prices: prices,
    public isFavorite: boolean,
    public power?: string,
    public toughness?: string
  ) {}
}
