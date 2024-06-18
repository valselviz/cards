import { CardModel } from "duel/CardModel";
import {
  addCardModel,
  labelEffect,
  labelNoSacrifice,
  labelOneSacrifice,
  oneSacrificeInvokation,
  oneSacrificeInvokationInfo,
  simpleAttack,
  simpleAttackInfo,
  simpleInvokation,
  simpleInvokationInfo,
} from "./cards-collection";
import { Color } from "duel/color";
import { Card } from "duel/Card";
import { DuelEvent } from "duel/DuelEvent";

import { Zone } from "duel/zone";

export function loadBonusCards() {
  addCardModel(
    new CardModel(690, "Thunder Traitor", null, 0, 15, Color.Red, 2.5, [
      labelNoSacrifice,
      labelEffect,
    ])
      .withHandEffect(simpleInvokation, simpleInvokationInfo)
      .withPassiveEffect((card: Card, event: DuelEvent) => {},
      "Add 8 attack to every yellow card on the field.")
      .withAttackBonus((buffGiver: Card, buffedCard: Card) =>
        buffedCard.model.color === Color.Yellow ? 8 : 0
      )
  );

  addCardModel(
    new CardModel(440, "Harpy", null, 4, 9, Color.Red, 2.5, [
      labelNoSacrifice,
      labelEffect,
    ])
      .withHandEffect(simpleInvokation, simpleInvokationInfo)
      .withFieldEffect(simpleAttack, simpleAttackInfo)
      .withPassiveEffect((card: Card, event: DuelEvent) => {},
      "Add 6 attack to every red card on the field.")
      .withAttackBonus((buffGiver: Card, buffedCard: Card) =>
        buffedCard.model.color === Color.Red ? 6 : 0
      )
  );

  addCardModel(
    new CardModel(481, "Ocean Traitor", null, 12, 5, Color.Yellow, 2.5, [
      labelNoSacrifice,
      labelEffect,
    ])
      .withHandEffect(simpleInvokation, simpleInvokationInfo)
      .withFieldEffect(simpleAttack, simpleAttackInfo)
      .withPassiveEffect((card: Card, event: DuelEvent) => {},
      "Add 6 defense to every blue card on the field.")
      .withDefenseBonus((buffGiver: Card, buffedCard: Card) =>
        buffedCard.model.color === Color.Blue ? 6 : 0
      )
  );

  addCardModel(
    new CardModel(413, "Corrupted Mage", null, 6, 12, Color.Green, 2.5, [
      labelNoSacrifice,
      labelEffect,
    ])
      .withHandEffect(simpleInvokation, simpleInvokationInfo)
      .withFieldEffect(simpleAttack, simpleAttackInfo)
      .withPassiveEffect((card: Card, event: DuelEvent) => {},
      "Add 5 defense to every green card on the field.")
      .withDefenseBonus((buffGiver: Card, buffedCard: Card) =>
        buffedCard.model.color === Color.Green ? 5 : 0
      )
  );

  addCardModel(
    new CardModel(916, "Sand Titan", null, 11, 0, Color.Yellow, 2.5, [
      labelNoSacrifice,
      labelEffect,
    ])
      .withHandEffect(simpleInvokation, simpleInvokationInfo)
      .withFieldEffect(simpleAttack, simpleAttackInfo)
      .withPassiveEffect((card: Card, event: DuelEvent) => {},
      "This card gains 4 defense for each card in your hand.")
      .withDefenseBonus((buffGiver: Card, buffedCard: Card) =>
        buffedCard === buffGiver
          ? buffGiver.duel.cards[buffGiver.playerId][Zone.Hand].length * 4
          : 0
      )
  );

  addCardModel(
    new CardModel(662, "Nightmare Beast", null, 12, 19, Color.Blue, 2.8, [
      labelOneSacrifice,
      labelEffect,
    ])
      .withHandEffect(oneSacrificeInvokation, oneSacrificeInvokationInfo)
      .withFieldEffect(simpleAttack, simpleAttackInfo)
      .withPassiveEffect((card: Card, event: DuelEvent) => {},
      "This card gains 5 attack for every blue card on the field.")
      .withAttackBonus((buffGiver: Card, buffedCard: Card) => {
        if (buffedCard === buffGiver) {
          const blueCards =
            buffedCard.duel.cards[0][Zone.Field].filter(
              (card) => card.model.color === Color.Blue
            ).length +
            buffedCard.duel.cards[1][Zone.Field].filter(
              (card) => card.model.color === Color.Blue
            ).length;
          return blueCards * 5;
        }
        return 0;
      })
  );

  addCardModel(
    new CardModel(212, "Tundra Rider", null, 5, 5, Color.Blue, 2.9, [
      labelOneSacrifice,
      labelEffect,
    ])
      .withHandEffect(simpleInvokation, simpleInvokationInfo)
      .withFieldEffect(simpleAttack, simpleAttackInfo)
      .withPassiveEffect((card: Card, event: DuelEvent) => {},
      "Every card on the field gains 4 attack.")
      .withAttackBonus((buffGiver: Card, buffedCard: Card) => 4)
  );
}
