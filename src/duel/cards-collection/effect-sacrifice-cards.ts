import { CardModel } from "duel/CardModel";
import {
  addCardModel,
  labelEffect,
  labelOneSacrifice,
  oneSacrificeInvokation,
  oneSacrificeInvokationInfo,
  simpleAttack,
  simpleAttackInfo,
} from "./cards-collection";
import { Color } from "duel/color";
import { Card } from "duel/Card";
import { Zone } from "duel/zone";

import dragonMistress from "assets/cards/dragonMistress.jpg";
import griffin from "assets/cards/griffin.jpg";
import reaper from "assets/cards/reaper.jpg";
import tigerWarrior from "assets/cards/tigerWarrior.jpg";
import { Action } from "duel/Action";

export function loadEffectSacrificeCards() {
  addCardModel(
    new CardModel(
      76,
      "Dragon Mistress",
      dragonMistress,
      14,
      0,
      Color.Blue,
      (card: Card) => {
        if (card.duel.cards[card.playerId][Zone.Field].length === 0) {
          card.duel.alertPlayer(
            "You need one card in the field to offer as sacrifice."
          );
          return;
        }
        card.duel.queueStartSelectionAction(card.playerId, Zone.Field);
        card.duel.queueDestroyAction(() => card.duel.selectedTarget);
        card.duel.queueInvokeAction(() => card);
        card.duel.queueStartSelectionAction(1 - card.playerId, Zone.Field);
        card.duel.queueWithdrawAction(() => card.duel.selectedTarget);
      },
      simpleAttack,
      "Invoke by sacrifying a card from your field. Then withdraw a card from your opponent field.",
      simpleAttackInfo,
      2.2,
      [labelEffect, labelOneSacrifice]
    )
  );

  addCardModel(
    new CardModel(
      548,
      "Griffin",
      griffin,
      28,
      19,
      Color.Yellow,
      oneSacrificeInvokation,
      (card: Card) => {
        const selectTargetCriteria = (opponentCard: Card) =>
          opponentCard.model.defense < card.model.attack;
        if (
          card.duel.cards[1 - card.playerId][Zone.Field].length > 0 &&
          !card.duel.cards[1 - card.playerId][Zone.Field].some(
            selectTargetCriteria
          )
        ) {
          card.duel.alertPlayer(
            "Your opponent cards have too much defense to be attacked."
          );
          return;
        }
        card.duel.queueStartSelectionAction(
          1 - card.playerId,
          Zone.Field,
          selectTargetCriteria
        );
        card.duel.queueAttackAction(
          () => card,
          () => card.duel.selectedTarget
        );
        card.duel.queueWithdrawAction(() => card);
      },
      oneSacrificeInvokationInfo,
      "Attack. Then withdraw this card.",
      2.2,
      [labelEffect, labelOneSacrifice]
    )
  );

  addCardModel(
    new CardModel(
      984,
      "Tiger Warrior",
      tigerWarrior,
      30,
      13,
      Color.Yellow,
      oneSacrificeInvokation,
      (card: Card) => {
        const selectTargetCriteria = (opponentCard: Card) =>
          opponentCard.model.defense < card.model.attack;
        if (
          card.duel.cards[1 - card.playerId][Zone.Field].length > 0 &&
          !card.duel.cards[1 - card.playerId][Zone.Field].some(
            selectTargetCriteria
          )
        ) {
          card.duel.alertPlayer(
            "Your opponent cards have too much defense to be attacked."
          );
          return;
        }
        if (card.duel.cards[card.playerId][Zone.Hand].length === 0) {
          card.duel.alertPlayer(
            "You need at least one card in your hand to offer as sacrifice."
          );
          return;
        }
        card.duel.queueStartSelectionAction(card.playerId, Zone.Hand);
        card.duel.queueDiscardAction(() => card.duel.selectedTarget);
        card.duel.queueStartSelectionAction(1 - card.playerId, Zone.Field);
        card.duel.queueAttackAction(
          () => card,
          () => card.duel.selectedTarget
        );
      },
      oneSacrificeInvokationInfo,
      "Discard a card from your hand. Then attack.",
      2.5,
      [labelEffect, labelOneSacrifice]
    )
  );

  addCardModel(
    new CardModel(
      441,
      "Reaper",
      reaper,
      21,
      11,
      Color.Blue,
      (card: Card) => {
        if (card.duel.cards[card.playerId][Zone.Field].length === 0) {
          card.duel.alertPlayer(
            "You need one card in the field to offer as sacrifice."
          );
          return;
        }
        card.duel.queueStartSelectionAction(card.playerId, Zone.Field);
        card.duel.queueDestroyAction(() => card.duel.selectedTarget);
        card.duel.queueInvokeAction(() => card);
        const newAction = new Action(() => (card.usableFromField = true));
        card.duel.actionsQueue.push(newAction);
      },
      simpleAttack,
      "Invoke by sacrifying a card from your field. This card is ready to attack immediately.",
      simpleAttackInfo,
      1.8,
      [labelEffect, labelOneSacrifice]
    )
  );
}
