import { Card } from "./card";

export class CardModel {
  name: string;
  attack: number;
  defense: number;
  invoke: (card: Card) => void;

  constructor(
    name: string,
    attack: number,
    defense: number,
    invoke: (card: Card) => void
  ) {
    this.name = name;
    this.attack = attack;
    this.defense = defense;
    this.invoke = invoke;
  }
}
