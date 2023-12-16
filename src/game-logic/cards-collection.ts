import { Card } from "./card";
import { CardModel } from "./card-model";
import { Color } from "./color";
import { rndInt } from "./utils";

import elfArcher from "assets/cards/elfArcher.png";
import giantSpider from "assets/cards/giantSpider.png";
import golem from "assets/cards/golem.png";
import hammerDwarf from "assets/cards/hammerDwarf.png";
import wizard from "assets/cards/wizard.png";
import blackDragon from "assets/cards/blackDragon.png";
import vortex from "assets/cards/vortex.png";
import { Zone } from "./zone";

function simpleInvokation(card: Card) {
  card.duel.invoke(() => card);
}

function oneSacrificeInvokation(card: Card) {
  if (card.duel.cards[card.playerId][Zone.Field].length > 0) {
    card.duel.startSelection(card.playerId, Zone.Field);
    card.duel.destroy(() => card.duel.selectedTarget);
    card.duel.invoke(() => card);
  }
}

function simpleAttack(card: Card) {
  card.duel.startSelection(1 - card.playerId, Zone.Field);
  card.duel.attack(
    () => card,
    () => card.duel.selectedTarget
  );
}

export const cardModels: any = {
  ElfArcher: new CardModel(
    "Elf Archer",
    elfArcher,
    10,
    10,
    Color.Yellow,
    simpleInvokation,
    simpleAttack
  ),
  GiantSpider: new CardModel(
    "Giant Spider",
    giantSpider,
    25,
    10,
    Color.Red,
    simpleInvokation,
    simpleAttack
  ),
  Golem: new CardModel(
    "Golem",
    golem,
    10,
    29,
    Color.Red,
    simpleInvokation,
    simpleAttack
  ),
  HammerDwarf: new CardModel(
    "Hammer Dwarf",
    hammerDwarf,
    8,
    16,
    Color.Blue,
    simpleInvokation,
    simpleAttack
  ),
  Wizard: new CardModel(
    "Wizard",
    wizard,
    15,
    15,
    Color.Green,
    simpleInvokation,
    simpleAttack
  ),
  BlackDragon: new CardModel(
    "Black Dragon",
    blackDragon,
    35,
    25,
    Color.Blue,
    oneSacrificeInvokation,
    simpleAttack
  ),
  Vortex: new CardModel(
    "Vortex",
    vortex,
    0,
    0,
    Color.Yellow,
    (card: Card) => {
      const destroyCriteria = (availableCard: Card) =>
        availableCard.model.defense <= 20;
      if (
        card.duel.cards[card.playerId][Zone.Hand].length > 1 &&
        card.duel.cards[1 - card.playerId][Zone.Field].some(destroyCriteria)
      ) {
        card.duel.startSelection(
          card.playerId,
          Zone.Hand,
          (availableCard) => availableCard !== card
        );
        card.duel.discard(() => card.duel.selectedTarget);
        card.duel.startSelection(
          1 - card.playerId,
          Zone.Field,
          destroyCriteria
        );
        card.duel.destroy(() => card.duel.selectedTarget);
        card.duel.discard(() => card);
      }
    },
    () => null
  ),
};

export default function getRandomCardModel(): CardModel {
  const keys = Object.keys(cardModels);
  return cardModels[keys[rndInt(keys.length)]];
}
