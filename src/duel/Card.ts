import { Zone } from "./zone";
import { Duel } from "./Duel";
import { CardModel } from "./CardModel";

export class Card {
  id: string;
  model: CardModel;
  duel: Duel;
  playerId: number;
  zone: Zone;
  usableFromField: boolean;

  constructor(model: CardModel, duel: Duel, playerId: number) {
    this.id = model.name + Math.floor(Math.random() * 1000);
    this.model = model;
    this.duel = duel;
    this.playerId = playerId;
    this.zone = Zone.Deck;
    this.usableFromField = false;
  }
}
