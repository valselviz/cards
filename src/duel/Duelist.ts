import { CardModel } from "./CardModel";
import { ArtificialIntelligence } from "./ArtificialIntelligence";
import { cardModels } from "./cards-collection";

export class Duelist {
  name: string;
  human: boolean;
  deck: CardModel[];
  ai: ArtificialIntelligence | null;

  constructor(
    name: string,
    human: boolean,
    deck: number[],
    ai: ArtificialIntelligence | null
  ) {
    this.name = name;
    this.human = human;
    this.deck = deck.map((id) => cardModels[id]);
    this.ai = ai;
  }
}
