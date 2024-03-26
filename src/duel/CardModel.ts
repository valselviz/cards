import { Card } from "./Card";
import { DuelEvent } from "./DuelEvent";
import { Color } from "./color";

export class CardModel {
  id: number;
  name: string;
  image: any;
  attack: number;
  defense: number;
  color: Color;
  rarity: number;
  labels: string[];
  useFromHand: (card: Card) => void;
  useFromField: (card: Card) => void;
  passiveEffect: (card: Card, event: DuelEvent) => void;
  handInfo: string | null;
  fieldInfo: string | null;
  passiveInfo: string | null;

  constructor(
    id: number,
    name: string,
    image: any,
    attack: number,
    defense: number,
    color: Color,
    rarity: number,
    labels: string[]
  ) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.attack = attack;
    this.defense = defense;
    this.color = color;
    this.rarity = rarity;
    this.labels = labels;
    this.useFromHand = () => null;
    this.useFromField = () => null;
    this.passiveEffect = () => null;
    this.handInfo = null;
    this.fieldInfo = null;
    this.passiveInfo = null;
  }

  withHandEffect(
    useFromHand: (card: Card) => void,
    handInfo: string | null
  ): CardModel {
    this.useFromHand = useFromHand;
    this.handInfo = handInfo;
    return this;
  }

  withFieldEffect(
    useFromField: (card: Card) => void,
    fieldInfo: string | null
  ): CardModel {
    this.useFromField = useFromField;
    this.fieldInfo = fieldInfo;
    return this;
  }

  withPassiveEffect(
    passiveEffect: (card: Card, event: DuelEvent) => void,
    passiveInfo: string | null
  ): CardModel {
    this.passiveEffect = passiveEffect;
    this.passiveInfo = passiveInfo;
    return this;
  }
}
