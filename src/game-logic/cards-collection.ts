import { Card } from "./card";
import { CardModel } from "./card-model";
import { Color } from "./color";
import { rndInt } from "./utils";

import elfArcher from "assets/cards/elfArcher.png";
import giantSpider from "assets/cards/giantSpider.png";
import golem from "assets/cards/golem.png";
import hammerDwarf from "assets/cards/hammerDwarf.png";
import wizard from "assets/cards/wizard.png";

function simpleInvokation(card: Card) {
  card.duel.invoke(card);
}

export const cardModels: any = {
  ElfArcher: new CardModel(
    "Elf Archer",
    elfArcher,
    10,
    10,
    Color.Yellow,
    simpleInvokation
  ),
  GiantSpider: new CardModel(
    "Giant Spider",
    giantSpider,
    25,
    10,
    Color.Red,
    simpleInvokation
  ),
  Golem: new CardModel("Golem", golem, 10, 29, Color.Red, simpleInvokation),
  HammerDwarf: new CardModel(
    "Hammer Dwarf",
    hammerDwarf,
    8,
    16,
    Color.Blue,
    simpleInvokation
  ),
  Wizard: new CardModel(
    "Wizard",
    wizard,
    15,
    15,
    Color.Green,
    simpleInvokation
  ),
};

export default function getRandomCardModel(): CardModel {
  const keys = Object.keys(cardModels);
  return cardModels[keys[rndInt(keys.length)]];
}
