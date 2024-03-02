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
      oneSacrificeInvokation,
      simpleAttack,
      oneSacrificeInvokationInfo,
      simpleAttackInfo,
      1.5,
      [labelOneSacrifice]
    )
  );

  addCardModel(
    new CardModel(
      431,
      "Golem",
      golem,
      12,
      27,
      Color.Red,
      oneSacrificeInvokation,
      simpleAttack,
      oneSacrificeInvokationInfo,
      simpleAttackInfo,
      1.5,
      [labelOneSacrifice]
    )
  );

  addCardModel(
    new CardModel(
      133,
      "Black Dragon",
      blackDragon,
      35,
      25,
      Color.Blue,
      twoSacrificesInvokation,
      simpleAttack,
      twoSacrificesInvokationInfo,
      simpleAttackInfo,
      2.5,
      [labelTwoSacrifice]
    )
  );
}
