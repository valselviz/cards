import { Rival } from "./Rival";
import { cardModels, getCardModelIdByName, getRandomCardModelId } from "../duel/cards-collection";

export interface OnSaleCard {
  model: number;
  price: number;
}
export class MacroGame {
  gold: number = 20;
  deck: number[] = [];
  cardsPool: number[] = [];
  cardsInStore: OnSaleCard[] = [];
  rivals: Rival[] = [];
  facingRival: Rival | null = null;

  constructor() {
    for (let i = 0; i < 5; i++) {
      this.cardsInStore.push({
        model: getRandomCardModelId(),
        price: Math.ceil(Math.random() * 10 + 10),
      });
    }
    for (let i = 0; i < 30; i++) {
      this.deck.push(getRandomCardModelId());
    }

    this.rivals.push(new Rival(getCardModelIdByName("Tundra Skeleton"), true));
    this.rivals.push(new Rival(getCardModelIdByName("Elf Archer"), true));
    this.rivals.push(new Rival(getCardModelIdByName("Lizard Spearman"), true));
    this.rivals.push(new Rival(getCardModelIdByName("Giant Spider"), false));
    this.rivals.push(new Rival(getCardModelIdByName("Black Dragon"), false));
  }
}
