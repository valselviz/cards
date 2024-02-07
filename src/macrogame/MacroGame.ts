import { Rival } from "./Rival";
import { CardModel } from "../duel/CardModel";
import getRandomCardModel, { cardModels } from "../duel/cards-collection";

export interface OnSaleCard {
  model: CardModel;
  price: number;
}
export class MacroGame {
  gold: number = 20;
  deck: CardModel[] = [];
  cardsPool: CardModel[] = [];
  cardsInStore: OnSaleCard[] = [];
  rivals: Rival[] = [];
  facingRival: Rival | null = null;

  constructor() {
    for (let i = 0; i < 5; i++) {
      this.cardsInStore.push({
        model: getRandomCardModel(),
        price: Math.ceil(Math.random() * 10 + 10),
      });
    }
    for (let i = 0; i < 30; i++) {
      this.deck.push(getRandomCardModel());
    }

    this.rivals.push(new Rival(cardModels.TundraSkeleton, true));
    this.rivals.push(new Rival(cardModels.ElfArcher, true));
    this.rivals.push(new Rival(cardModels.LizardSpearman, true));
    this.rivals.push(new Rival(cardModels.GiantSpider, false));
    this.rivals.push(new Rival(cardModels.BlackDragon, false));
  }
}
