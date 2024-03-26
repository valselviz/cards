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
import { Color } from "duel/color";

import giantSpider from "assets/cards/giantSpider.jpg";
import golem from "assets/cards/golem.jpg";
import blackDragon from "assets/cards/blackDragon.jpg";

export function loadSimpleSacrificeCards() {
  addCardModel(
    new CardModel(
      889,
      "Giant Spider",
      giantSpider,
      25,
      10,
      Color.Green,
      1.5,
      [labelOneSacrifice]
    )
      .withHandEffect(oneSacrificeInvokation, oneSacrificeInvokationInfo)
      .withFieldEffect(simpleAttack, simpleAttackInfo)
  );

  addCardModel(
    new CardModel(
      431,
      "Golem",
      golem,
      12,
      27,
      Color.Red,
      1.5,
      [labelOneSacrifice]
    )
      .withHandEffect(oneSacrificeInvokation, oneSacrificeInvokationInfo)
      .withFieldEffect(simpleAttack, simpleAttackInfo)
  );

  addCardModel(
    new CardModel(
      133,
      "Black Dragon",
      blackDragon,
      35,
      25,
      Color.Blue,
      2.5,
      [labelTwoSacrifice]
    )
      .withHandEffect(twoSacrificesInvokation, twoSacrificesInvokationInfo)
      .withFieldEffect(simpleAttack, simpleAttackInfo)
  );
}
