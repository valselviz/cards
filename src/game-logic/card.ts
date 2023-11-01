import { Zone } from "./zone";
import { Duel } from "./duel";
import { CardModel } from "./card-model";

export class Card {
  model: CardModel;
  duel: Duel;
  playerId: number;
  zone: Zone;

  constructor(model: CardModel, duel: Duel, playerId: number) {
    this.model = model;
    this.duel = duel;
    this.playerId = playerId;
    this.zone = Zone.Deck;
  }
}
