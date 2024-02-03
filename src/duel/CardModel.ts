import { Card } from "./Card";
import { Color } from "./color";

export class CardModel {
  name: string;
  image: any;
  attack: number;
  defense: number;
  color: Color;
  useFromHand: (card: Card) => void;
  useFromField: (card: Card) => void;
  handInfo: string | null;
  fieldInfo: string | null;

  constructor(
    name: string,
    image: any,
    attack: number,
    defense: number,
    color: Color,
    useFromHand: (card: Card) => void,
    useFromField: (card: Card) => void,
    handInfo: string | null,
    fieldInfo: string | null
  ) {
    this.name = name;
    this.image = image;
    this.attack = attack;
    this.defense = defense;
    this.color = color;
    this.useFromHand = useFromHand;
    this.useFromField = useFromField;
    this.handInfo = handInfo;
    this.fieldInfo = fieldInfo;
  }
}
