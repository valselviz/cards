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

// "Simple-Aggressors" are cards that:
// - don't need any sacrifice or condition to be invoked.
// - have more attack than defense
// As a general rule, Simple-Aggresors should be bad cards. Read simple-defensers.ts
// This cards are important for player that lack powerful (with-sacrifice) cards.
// Without them, the new player's games will tend to accumulate weak field cards that can not attack.
export function loadSimpleAggressors() {
  addCardModel(
    new CardModel(471, "Slayer", null, 17, 2, Color.Yellow, 0.8, [
      labelNoSacrifice,
    ])
      .withHandEffect(simpleInvokation, simpleInvokationInfo)
      .withFieldEffect(simpleAttack, simpleAttackInfo)
  );

  addCardModel(
    new CardModel(595, "Imp", null, 15, 5, Color.Red, 0.8, [labelNoSacrifice])
      .withHandEffect(simpleInvokation, simpleInvokationInfo)
      .withFieldEffect(simpleAttack, simpleAttackInfo)
  );

  addCardModel(
    new CardModel(596, "Wold Barbarian", null, 12, 10, Color.Green, 0.9, [
      labelNoSacrifice,
    ])
      .withHandEffect(simpleInvokation, simpleInvokationInfo)
      .withFieldEffect(simpleAttack, simpleAttackInfo)
  );
}
