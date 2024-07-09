import { Color } from "../color";
import {
  addCardModel,
  checkFullField,
  labelEffect,
  labelNoSacrifice,
  simpleAttack,
  simpleAttackInfo,
  simpleInvokation,
  simpleInvokationInfo,
} from "./cards-collection";
import { Card } from "../Card";
import { CardModel } from "../CardModel";
import { Zone } from "../zone";

import { Action } from "../Action";

export function loadEffectCards() {
  addCardModel(
    new CardModel(412, "Lizard Spearman", null, 12, 8, Color.Green, 1.5, [
      labelNoSacrifice,
      labelEffect,
    ])
      .withHandEffect((card: Card) => {
        if (checkFullField(card)) return;
        card.duel.queueInvokeAction(() => card);
        const newAction = new Action(() => (card.usableFromField = true));
        card.duel.actionsQueue.push(newAction);
      }, "Invoke. This card is ready to attack immediately.")
      .withFieldEffect(simpleAttack, simpleAttackInfo)
  );

  addCardModel(
    new CardModel(43, "Centaur Socerer", null, 18, 18, Color.Green, 1.4, [
      labelNoSacrifice,
      labelEffect,
    ])
      .withHandEffect((card: Card) => {
        if (checkFullField(card)) return;
        if (card.duel.cards[card.playerId][Zone.Hand].length > 1) {
          card.duel.alertPlayer(
            "You can invoke this card only if it is the only card in your hand."
          );
          return;
        }
        card.duel.queueInvokeAction(() => card);
      }, "You can invoke this card only if it is the only card in your hand.")
      .withFieldEffect(simpleAttack, simpleAttackInfo)
  );

  addCardModel(
    new CardModel(222, "Siren", null, 5, 13, Color.Blue, 1.4, [
      labelNoSacrifice,
      labelEffect,
    ])
      .withHandEffect((card: Card) => {
        if (checkFullField(card)) return;
        card.duel.queueInvokeAction(() => card);
        card.duel.queueStartSelectionAction(
          card.playerId,
          Zone.Field,
          (ownedCard: Card) => !ownedCard.usableFromField
        );
        const newAction = new Action(() => {
          if (card.duel.selectedTarget) {
            card.duel.selectedTarget.usableFromField = true;
          }
        });
        card.duel.actionsQueue.push(newAction);
      }, "Invoke this card. Then select a not-ready card from your field and make it ready for use.")
      .withFieldEffect(simpleAttack, simpleAttackInfo)
  );

  const maxTargetDefense = 23;
  addCardModel(
    new CardModel(967, "Guardian", null, 0, 14, Color.Red, 2, [
      labelNoSacrifice,
      labelEffect,
    ])
      .withHandEffect(simpleInvokation, simpleInvokationInfo)
      .withFieldEffect((card: Card) => {
        if (card.duel.cards[1 - card.playerId][Zone.Field].length === 0) {
          card.duel.alertPlayer(
            "Your opponent does not have any card on the field to withdrawn."
          );
          return;
        }
        const selectTargetCriteria = (opponentCard: Card) =>
          opponentCard.getDefense() <= maxTargetDefense;
        if (
          !card.duel.cards[1 - card.playerId][Zone.Field].some(
            selectTargetCriteria
          )
        ) {
          card.duel.alertPlayer(
            "Your opponent cards have too much defense to be targeted."
          );
          return;
        }
        card.duel.queueStartSelectionAction(
          1 - card.playerId,
          Zone.Field,
          selectTargetCriteria
        );
        card.duel.queueWithdrawAction(() => card.duel.selectedTarget);
      }, `Withdraw an opponent's card with ${maxTargetDefense} or less deffense.`)
  );

  addCardModel(
    new CardModel(282, "Tree Guardian", null, 14, 7, Color.Yellow, 1.4, [
      labelNoSacrifice,
      labelEffect,
    ])
      .withHandEffect(simpleInvokation, simpleInvokationInfo)
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
        card.duel.queueDrawAction(1 - card.playerId);
      }, "Attack. Then your opponent draws card.")
  );
}
