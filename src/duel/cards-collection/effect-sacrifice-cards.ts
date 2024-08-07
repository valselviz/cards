import { CardModel } from "../CardModel";
import {
  addCardModel,
  labelBlueSynergy,
  labelEffect,
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
import { Card } from "../Card";
import { Zone } from "../zone";
import { Action } from "../Action";
import { DuelEvent } from "../DuelEvent";
import { EventType } from "../EventType";

export function loadEffectSacrificeCards() {
  addCardModel(
    new CardModel(76, "Dragon Mistress", null, 14, 0, Color.Blue, 2.2, [
      labelEffect,
      labelOneSacrifice,
    ])
      .withHandEffect((card: Card) => {
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
      }, "Invoke by sacrifying a card from your field. Then withdraw a card from your opponent field.")
      .withFieldEffect(simpleAttack, simpleAttackInfo)
  );

  addCardModel(
    new CardModel(548, "Griffin", null, 28, 19, Color.Yellow, 2.2, [
      labelEffect,
      labelOneSacrifice,
    ])
      .withHandEffect(oneSacrificeInvokation, oneSacrificeInvokationInfo)
      .withFieldEffect((card: Card) => {
        const selectTargetCriteria = (opponentCard: Card) =>
          opponentCard.getDefense() < card.getAttack();
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
      }, "Attack. Then withdraw this card.")
  );

  addCardModel(
    new CardModel(984, "Tiger Warrior", null, 30, 13, Color.Yellow, 2.5, [
      labelEffect,
      labelOneSacrifice,
    ])
      .withHandEffect(oneSacrificeInvokation, oneSacrificeInvokationInfo)
      .withFieldEffect((card: Card) => {
        const selectTargetCriteria = (opponentCard: Card) =>
          opponentCard.getDefense() < card.getAttack();
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
      }, "Discard a card from your hand. Then attack.")
  );

  addCardModel(
    new CardModel(441, "Reaper", null, 21, 11, Color.Blue, 1.8, [
      labelEffect,
      labelOneSacrifice,
    ])
      .withHandEffect((card: Card) => {
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
      }, "Invoke by sacrifying a card from your field. This card is ready to attack immediately.")
      .withFieldEffect(simpleAttack, simpleAttackInfo)
  );

  addCardModel(
    new CardModel(21, "Kraken", null, 14, 24, Color.Blue, 3.2, [
      labelTwoSacrifice,
      labelEffect,
      labelBlueSynergy,
    ])
      .withHandEffect(twoSacrificesInvokation, twoSacrificesInvokationInfo)
      .withFieldEffect(simpleAttack, simpleAttackInfo)
      .withPassiveEffect((card: Card, event: DuelEvent) => {
        if (event.eventType !== EventType.PassTurn) return;
        if (card.duel.playerTurn === card.playerId) return;
        let blueCards = 0;
        for (const fieldCard of card.duel.cards[card.playerId][Zone.Field]) {
          if (fieldCard.model.color === Color.Blue) blueCards++;
        }
        card.duel.queueDamagePlayerAction(1 - card.playerId, blueCards);
      }, "When your turn ends. Inflict 1 damage per blue card on your field.")
  );
}
