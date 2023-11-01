import { Card } from "./card";
import { Color } from "./color";

export class CardModel {
  name: string;
  image: any;
  attack: number;
  defense: number;
  color: Color;
  invoke: (card: Card) => void;

  constructor(
    name: string,
    image: any,
    attack: number,
    defense: number,
    color: Color,
    invoke: (card: Card) => void
  ) {
    this.name = name;
    this.image = image;
    this.attack = attack;
    this.defense = defense;
    this.color = color;
    this.invoke = invoke;
  }
}
