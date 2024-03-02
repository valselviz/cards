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
import knight from "assets/cards/knight.jpg";
import tundraSkeleton from "assets/cards/tundraSkeleton.jpg";
import wizard from "assets/cards/wizard.jpg";

export function loadSimpleCards() {
  addCardModel(
    new CardModel(
      470,
      "Elf Archer",
      elfArcher,
      10,
      12,
      Color.Yellow,
      simpleInvokation,
      simpleAttack,
      simpleInvokationInfo,
      simpleAttackInfo,
      0.8,
      [labelNoSacrifice]
    )
  );

  addCardModel(
    new CardModel(
      64,
      "Tundra Skeleton",
      tundraSkeleton,
      12,
      13,
      Color.Blue,
      simpleInvokation,
      simpleAttack,
      simpleInvokationInfo,
      simpleAttackInfo,
      0.9,
      [labelNoSacrifice]
    )
  );

  addCardModel(
    new CardModel(
      932,
      "Fire Demon",
      fireDemon,
      9,
      13,
      Color.Red,
      simpleInvokation,
      simpleAttack,
      simpleInvokationInfo,
      simpleAttackInfo,
      0.9,
      [labelNoSacrifice]
    )
  );

  addCardModel(
    new CardModel(
      755,
      "Minotaur",
      minotaur,
      13,
      16,
      Color.Red,
      simpleInvokation,
      simpleAttack,
      simpleInvokationInfo,
      simpleAttackInfo,
      1,
      [labelNoSacrifice]
    )
  );

  addCardModel(
    new CardModel(
      223,
      "Hammer Dwarf",
      hammerDwarf,
      8,
      16,
      Color.Blue,
      simpleInvokation,
      simpleAttack,
      simpleInvokationInfo,
      simpleAttackInfo,
      0.9,
      [labelNoSacrifice]
    )
  );

  addCardModel(
    new CardModel(
      264,
      "Knight",
      knight,
      5,
      17,
      Color.Yellow,
      simpleInvokation,
      simpleAttack,
      simpleInvokationInfo,
      simpleAttackInfo,
      0.9,
      [labelNoSacrifice]
    )
  );

  addCardModel(
    new CardModel(
      15,
      "Wizard",
      wizard,
      14,
      14,
      Color.Green,
      simpleInvokation,
      simpleAttack,
      simpleInvokationInfo,
      simpleAttackInfo,
      1,
      [labelNoSacrifice]
    )
  );

  addCardModel(
    new CardModel(
      365,
      "Goblin Warrior",
      goblinWarrior,
      7,
      15,
      Color.Yellow,
      simpleInvokation,
      simpleAttack,
      simpleInvokationInfo,
      simpleAttackInfo,
      0.9,
      [labelNoSacrifice]
    )
  );
}
