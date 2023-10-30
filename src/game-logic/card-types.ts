import { Card } from "./card";
import { CardModel } from "./card-model";
import { rndInt } from "./utils";

function simpleInvokation(card: Card) {
  card.duel.invoke(card);
}

export const cardModels: any = {
  Elf: new CardModel("Elf", 10, 10, simpleInvokation),
  Wizard: new CardModel("Wizard", 15, 15, simpleInvokation),
  Golem: new CardModel("Golem", 10, 29, simpleInvokation),
  GiantSpider: new CardModel("Giant Spider", 25, 10, simpleInvokation),
  Dragon: new CardModel("Hammer Dwarf", 8, 16, simpleInvokation),
};

export default function getRandomCardModel(): CardModel {
  const keys = Object.keys(cardModels);
  return cardModels[keys[rndInt(keys.length)]];
}
