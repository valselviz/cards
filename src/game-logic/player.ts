import { CardModel } from "./card-model";

export class Player {
  name: string;
  human: boolean;
  deck: CardModel[];

  constructor(name: string, human: boolean, deck: CardModel[]) {
    this.name = name;
    this.human = human;
    this.deck = deck;
  }
}
