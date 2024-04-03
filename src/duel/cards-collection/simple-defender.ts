import { CardModel } from "duel/CardModel";
import {
  addCardModel,
  labelNoSacrifice,
  simpleAttack,
  simpleAttackInfo,
  simpleInvokation,
  simpleInvokationInfo,
} from "./cards-collection";
import { Color } from "duel/color";

import elfArcher from "assets/cards/elfArcher.jpg";
import minotaur from "assets/cards/minotaur.jpg";
import fireDemon from "assets/cards/fireDemon.jpg";
import goblinWarrior from "assets/cards/goblinWarrior.jpg";
import hammerDwarf from "assets/cards/hammerDwarf.jpg";
import paladin from "assets/cards/paladin.jpg";
import tundraSkeleton from "assets/cards/tundraSkeleton.jpg";
import wizard from "assets/cards/wizard.jpg";

// "Simple-Defenders" are cards that:
// - don't need any sacrifice or condition to be invoked.
// - have more defense than attack (or equal)
// As a general rule, Simple-Defenders should be better than Simple-Aggressors.
// This is because we want to encourage players to try to invoke stronger cards that
// need sacrifices. (Instead of trying to destroy the rivals simple cards quickly).

export function loadSimpleDefenders() {
  addCardModel(
    new CardModel(470, "Elf Archer", elfArcher, 10, 12, Color.Yellow, 0.9, [
      labelNoSacrifice,
    ])
      .withHandEffect(simpleInvokation, simpleInvokationInfo)
      .withFieldEffect(simpleAttack, simpleAttackInfo)
  );

  addCardModel(
    new CardModel(
      64,
      "Tundra Skeleton",
      tundraSkeleton,
      12,
      13,
      Color.Blue,
      0.9,
      [labelNoSacrifice]
    )
      .withHandEffect(simpleInvokation, simpleInvokationInfo)
      .withFieldEffect(simpleAttack, simpleAttackInfo)
  );

  addCardModel(
    new CardModel(932, "Fire Demon", fireDemon, 9, 13, Color.Red, 0.9, [
      labelNoSacrifice,
    ])
      .withHandEffect(simpleInvokation, simpleInvokationInfo)
      .withFieldEffect(simpleAttack, simpleAttackInfo)
  );

  addCardModel(
    new CardModel(755, "Minotaur", minotaur, 13, 15, Color.Red, 1.5, [
      labelNoSacrifice,
    ])
      .withHandEffect(simpleInvokation, simpleInvokationInfo)
      .withFieldEffect(simpleAttack, simpleAttackInfo)
  );

  addCardModel(
    new CardModel(223, "Hammer Dwarf", hammerDwarf, 8, 16, Color.Blue, 1.1, [
      labelNoSacrifice,
    ])
      .withHandEffect(simpleInvokation, simpleInvokationInfo)
      .withFieldEffect(simpleAttack, simpleAttackInfo)
  );

  addCardModel(
    new CardModel(264, "Paladin", paladin, 5, 17, Color.Yellow, 0.9, [
      labelNoSacrifice,
    ])
      .withHandEffect(simpleInvokation, simpleInvokationInfo)
      .withFieldEffect(simpleAttack, simpleAttackInfo)
  );

  addCardModel(
    new CardModel(15, "Wizard", wizard, 14, 14, Color.Green, 1.5, [
      labelNoSacrifice,
    ])
      .withHandEffect(simpleInvokation, simpleInvokationInfo)
      .withFieldEffect(simpleAttack, simpleAttackInfo)
  );

  addCardModel(
    new CardModel(
      365,
      "Goblin Warrior",
      goblinWarrior,
      7,
      15,
      Color.Yellow,
      0.9,
      [labelNoSacrifice]
    )
      .withHandEffect(simpleInvokation, simpleInvokationInfo)
      .withFieldEffect(simpleAttack, simpleAttackInfo)
  );
}
