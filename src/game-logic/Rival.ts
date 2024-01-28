import { CardModel } from "./CardModel";
import getRandomCardModel from "./cards-collection";

export class Rival {
  portraitCard: CardModel;
  deck: CardModel[] = [];
  level: number = 1;

  constructor(portraitCard: CardModel) {
    this.portraitCard = portraitCard;

    for (let i = 0; i < 27; i++) {
      this.deck.push(getRandomCardModel());
    }
    for (let i = 0; i < 3; i++) {
      this.deck.push(portraitCard);
    }
  }
}
