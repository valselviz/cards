import { CardModel } from "duel/CardModel";
import {
  addCardModel,
  labelOneSacrifice,
  labelTwoSacrifice,
  oneSacrificeInvokation,
  oneSacrificeInvokationInfo,
  simpleAttack,
  simpleAttackInfo,
  twoSacrificesInvokation,
  twoSacrificesInvokationInfo,
} from "./cards-collection";
import { Color } from "../color";

export function loadSimpleSacrificeCards() {
  addCardModel(
    new CardModel(889, "Giant Spider", null, 25, 10, Color.Green, 1.5, [
      labelOneSacrifice,
    ])
      .withHandEffect(oneSacrificeInvokation, oneSacrificeInvokationInfo)
      .withFieldEffect(simpleAttack, simpleAttackInfo)
  );

  addCardModel(
    new CardModel(431, "Golem", null, 12, 27, Color.Red, 1.5, [
      labelOneSacrifice,
    ])
      .withHandEffect(oneSacrificeInvokation, oneSacrificeInvokationInfo)
      .withFieldEffect(simpleAttack, simpleAttackInfo)
  );

  addCardModel(
    new CardModel(133, "Black Dragon", null, 35, 25, Color.Red, 2.5, [
      labelTwoSacrifice,
    ])
      .withHandEffect(twoSacrificesInvokation, twoSacrificesInvokationInfo)
      .withFieldEffect(simpleAttack, simpleAttackInfo)
  );
}
