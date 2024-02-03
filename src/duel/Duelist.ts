import { CardModel } from "./CardModel";
import { ArtificialIntelligence } from "./ArtificialIntelligence";

export class Duelist {
  name: string;
  human: boolean;
  deck: CardModel[];
  ai: ArtificialIntelligence | null;

  constructor(
    name: string,
    human: boolean,
    deck: CardModel[],
    ai: ArtificialIntelligence | null
  ) {
    this.name = name;
    this.human = human;
    this.deck = deck;
    this.ai = ai;
  }
}
