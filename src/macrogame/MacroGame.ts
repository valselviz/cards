import { Rival } from "./Rival";
import { CardModel } from "../duel/CardModel";
import getRandomCardModel, { cardModels } from "../duel/cards-collection";

export class MacroGame {
  gold: number = 20;
  deck: CardModel[] = [];
  cardsPool: CardModel[] = [];
  cardsInStore: CardModel[] = [];
  rivals: Rival[] = [];

  constructor() {
    for (let i = 0; i < 5; i++) {
      this.cardsInStore.push(getRandomCardModel());
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
