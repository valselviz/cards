import { CardModel } from "../duel/CardModel";
import getRandomCardModel from "../duel/cards-collection";

export class Rival {
  portraitCard: CardModel;
  deck: CardModel[] = [];
  level: number = 1;
  unlocked: boolean;
  reward: CardModel | null;

  constructor(portraitCard: CardModel, unlocked: boolean) {
    this.portraitCard = portraitCard;
    for (let i = 0; i < 27; i++) {
      this.deck.push(getRandomCardModel());
    }
    for (let i = 0; i < 3; i++) {
      this.deck.push(portraitCard);
    }
    this.unlocked = unlocked;
    this.reward = getRandomCardModel()
  }
}
