import { Card, CardModel } from "../cards";
import { rndInt } from "../utils";

function simpleInvokation(card: Card) {
  card.duel.removeFromHand(card);
  card.duel.placeOnField(card);
}

export const cardTypes: any = {
  Elf: new CardModel("Elf", 10, 10, simpleInvokation),
  Wizard: new CardModel("Wizard", 15, 15),
  Dragon: new CardModel("Dragon", 20, 20),
};

export default function getRandomCardModel(): CardModel {
  const keys = Object.keys(cardTypes);
  return cardTypes[keys[rndInt(keys.length)]];
}
