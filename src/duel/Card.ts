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

  getAttack() {
    if (this.model.attack === 0) return 0;
    let bonusAttack = 0;
    if (this.zone === Zone.Field) {
      for (const card of this.duel.cards[this.playerId][Zone.Field]) {
        bonusAttack += card.model.attackBonus(card, this);
      }
      for (const card of this.duel.cards[1 - this.playerId][Zone.Field]) {
        bonusAttack += card.model.attackBonus(card, this);
      }
    }
    return this.model.attack + bonusAttack;
  }

  getDefense() {
    let bonusDefense = 0;
    if (this.zone === Zone.Field) {
      for (const card of this.duel.cards[this.playerId][Zone.Field]) {
        bonusDefense += card.model.defenseBonus(card, this);
      }
      for (const card of this.duel.cards[1 - this.playerId][Zone.Field]) {
        bonusDefense += card.model.defenseBonus(card, this);
      }
    }
    return this.model.defense + bonusDefense;
  }
}
