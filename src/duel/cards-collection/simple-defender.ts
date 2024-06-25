import { CardModel } from "../CardModel";
import {
  addCardModel,
  labelNoSacrifice,
  simpleAttack,
  simpleAttackInfo,
  simpleInvokation,
  simpleInvokationInfo,
} from "./cards-collection";
import { Color } from "../color";

// "Simple-Defenders" are cards that:
// - don't need any sacrifice or condition to be invoked.
// - have more defense than attack (or equal)
// As a general rule, Simple-Defenders should be better than Simple-Aggressors.
// This is because we want to encourage players to try to invoke stronger cards that
// need sacrifices. (Instead of trying to destroy the rivals simple cards quickly).

export function loadSimpleDefenders() {
  addCardModel(
    new CardModel(470, "Elf Archer", null, 10, 12, Color.Yellow, 0.9, [
      labelNoSacrifice,
    ])
      .withHandEffect(simpleInvokation, simpleInvokationInfo)
      .withFieldEffect(simpleAttack, simpleAttackInfo)
  );

  addCardModel(
    new CardModel(64, "Tundra Skeleton", null, 12, 13, Color.Blue, 0.9, [
      labelNoSacrifice,
    ])
      .withHandEffect(simpleInvokation, simpleInvokationInfo)
      .withFieldEffect(simpleAttack, simpleAttackInfo)
  );

  addCardModel(
    new CardModel(932, "Fire Demon", null, 9, 13, Color.Red, 0.9, [
      labelNoSacrifice,
    ])
      .withHandEffect(simpleInvokation, simpleInvokationInfo)
      .withFieldEffect(simpleAttack, simpleAttackInfo)
  );

  addCardModel(
    new CardModel(755, "Minotaur", null, 13, 15, Color.Red, 1.5, [
      labelNoSacrifice,
    ])
      .withHandEffect(simpleInvokation, simpleInvokationInfo)
      .withFieldEffect(simpleAttack, simpleAttackInfo)
  );

  addCardModel(
    new CardModel(223, "Hammer Dwarf", null, 8, 16, Color.Blue, 1.1, [
      labelNoSacrifice,
    ])
      .withHandEffect(simpleInvokation, simpleInvokationInfo)
      .withFieldEffect(simpleAttack, simpleAttackInfo)
  );

  addCardModel(
    new CardModel(264, "Paladin", null, 5, 17, Color.Yellow, 0.9, [
      labelNoSacrifice,
    ])
      .withHandEffect(simpleInvokation, simpleInvokationInfo)
      .withFieldEffect(simpleAttack, simpleAttackInfo)
  );

  addCardModel(
    new CardModel(15, "Wizard", null, 14, 14, Color.Green, 1.5, [
      labelNoSacrifice,
    ])
      .withHandEffect(simpleInvokation, simpleInvokationInfo)
      .withFieldEffect(simpleAttack, simpleAttackInfo)
  );

  addCardModel(
    new CardModel(365, "Goblin Warrior", null, 7, 15, Color.Yellow, 0.9, [
      labelNoSacrifice,
    ])
      .withHandEffect(simpleInvokation, simpleInvokationInfo)
      .withFieldEffect(simpleAttack, simpleAttackInfo)
  );
}
