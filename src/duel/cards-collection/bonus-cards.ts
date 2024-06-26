import { CardModel } from "../../duel/CardModel";
import {
  addCardModel,
  labelBlueSynergy,
  labelEffect,
  labelGreenSynergy,
  labelNoSacrifice,
  labelOneSacrifice,
  labelRedSynergy,
  labelYellowSynergy,
  oneSacrificeInvokation,
  oneSacrificeInvokationInfo,
  simpleAttack,
  simpleAttackInfo,
  simpleInvokation,
  simpleInvokationInfo,
} from "./cards-collection";
import { Color } from "../color";
import { Card } from "../Card";
import { DuelEvent } from "../DuelEvent";

import { Zone } from "../zone";
import { EventType } from "../EventType";

export function loadBonusCards() {
  addCardModel(
    new CardModel(690, "Thunder Traitor", null, 0, 15, Color.Red, 2.5, [
      labelNoSacrifice,
      labelEffect,
      labelYellowSynergy,
    ])
      .withHandEffect(simpleInvokation, simpleInvokationInfo)
      .withPassiveEffect((card: Card, event: DuelEvent) => {},
      "Add 8 attack to every yellow card on the field.")
      .withAttackBonus((buffGiver: Card, buffedCard: Card) =>
        buffedCard.model.color === Color.Yellow ? 8 : 0
      )
  );

  addCardModel(
    new CardModel(481, "Ocean Traitor", null, 12, 5, Color.Yellow, 2.5, [
      labelNoSacrifice,
      labelEffect,
      labelBlueSynergy,
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
    new CardModel(881, "Druid Traitor", null, 0, 14, Color.Blue, 2.5, [
      labelNoSacrifice,
      labelEffect,
      labelGreenSynergy,
    ])
      .withHandEffect(simpleInvokation, simpleInvokationInfo)
      .withPassiveEffect((card: Card, event: DuelEvent) => {},
      "Add 5 defense to every green card on the field.")
      .withDefenseBonus((buffGiver: Card, buffedCard: Card) =>
        buffedCard.model.color === Color.Green ? 6 : 0
      )
  );

  addCardModel(
    new CardModel(880, "Bomber Traitor", null, 4, 10, Color.Green, 2.5, [
      labelNoSacrifice,
      labelEffect,
      labelRedSynergy,
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
    new CardModel(440, "Harpy", null, 5, 9, Color.Red, 2.5, [
      labelNoSacrifice,
      labelEffect,
      labelRedSynergy,
    ])
      .withHandEffect(simpleInvokation, simpleInvokationInfo)
      .withFieldEffect(simpleAttack, simpleAttackInfo)
      .withPassiveEffect((card: Card, event: DuelEvent) => {},
      "Add 5 attack to every red card on the field.")
      .withAttackBonus((buffGiver: Card, buffedCard: Card) =>
        buffedCard.model.color === Color.Red ? 6 : 0
      )
  );

  addCardModel(
    new CardModel(413, "Corrupted Mage", null, 6, 12, Color.Green, 2.5, [
      labelNoSacrifice,
      labelEffect,
      labelGreenSynergy,
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
      labelNoSacrifice,
      labelEffect,
      labelBlueSynergy,
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
    new CardModel(212, "Tundra Rider", null, 5, 5, Color.Blue, 2.0, [
      labelOneSacrifice,
      labelEffect,
    ])
      .withHandEffect(simpleInvokation, simpleInvokationInfo)
      .withFieldEffect(simpleAttack, simpleAttackInfo)
      .withPassiveEffect((card: Card, event: DuelEvent) => {},
      "Every card on the field gains 4 attack.")
      .withAttackBonus((buffGiver: Card, buffedCard: Card) => 4)
  );

  addCardModel(
    new CardModel(901, "Dragon Treasure", null, 0, 0, Color.Red, 2.0, [
      labelNoSacrifice,
      labelEffect,
    ])
      .withHandEffect(simpleInvokation, simpleInvokationInfo)
      .withPassiveEffect((card: Card, event: DuelEvent) => {
        if (event.eventType === EventType.PassTurn) {
          card.duel.queueDestroyAction(() => card);
        }
      }, "Every card on your field gains 7 attack. This card is destroyed at the end of the turn.")
      .withAttackBonus((buffGiver: Card, buffedCard: Card) =>
        buffedCard.playerId === buffGiver.playerId ? 7 : 0
      )
  );
}
