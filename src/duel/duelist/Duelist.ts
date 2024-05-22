import { Duel } from "duel/Duel";
import { CardModel } from "../CardModel";
import { cardModels } from "../cards-collection/cards-collection";

export class Duelist {
  name: string;
  human: boolean;
  deck: CardModel[];

  constructor(name: string, human: boolean, deck: number[]) {
    this.name = name;
    this.human = human;
    this.deck = deck.map((id) => cardModels[id]);
  }

  executeDuelistCardSelection(duel: Duel) {}

  shouldExecuteDuelistNextMoveAutomatically(duel: Duel) {
    return false;
  }

  executeDuelistNextMove(duel: Duel) {}
}
