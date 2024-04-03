import { Color } from "duel/color";
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
import { Card } from "duel/Card";
import { CardModel } from "duel/CardModel";
import { Zone } from "duel/zone";

import centaurSocerer from "assets/cards/centaurSorcerer.jpg";
import guardian from "assets/cards/guardian.jpg";
import lizardSpearman from "assets/cards/lizardSpearman.jpg";
import siren from "assets/cards/siren.jpg";
import owlGuardian from "assets/cards/owlGuardian.jpg";
import treeGuardian from "assets/cards/treeGuardian.jpg";
import { Action } from "duel/Action";

export function loadEffectCards() {
  addCardModel(
    new CardModel(
      412,
      "Lizard Spearman",
      lizardSpearman,
      12,
      8,
      Color.Green,
      1.5,
      [labelNoSacrifice, labelEffect]
    )
      .withHandEffect((card: Card) => {
        if (checkFullField(card)) return;
        card.duel.queueInvokeAction(() => card);
        const newAction = new Action(() => (card.usableFromField = true));
        card.duel.actionsQueue.push(newAction);
      }, "Invoke. This card is ready to attack immediately.")
      .withFieldEffect(simpleAttack, simpleAttackInfo)
  );

  addCardModel(
    new CardModel(80, "Owl Guardian", owlGuardian, 12, 5, Color.Green, 1.4, [
      labelNoSacrifice,
      labelEffect,
    ])
      .withHandEffect(simpleInvokation, simpleInvokationInfo)
      .withFieldEffect((card: Card) => {
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
        card.duel.queueDrawAction(card.playerId);
      }, "Attack. Then draw a card.")
  );

  addCardModel(
    new CardModel(
      43,
      "Centaur Socerer",
      centaurSocerer,
      18,
      18,
      Color.Green,
      1.4,
      [labelNoSacrifice, labelEffect]
    )
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
    new CardModel(222, "Siren", siren, 5, 13, Color.Blue, 1.4, [
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
    new CardModel(967, "Guardian", guardian, 0, 14, Color.Red, 2, [
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
          opponentCard.model.defense <= maxTargetDefense;
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
    new CardModel(282, "Tree Guardian", treeGuardian, 14, 7, Color.Yellow, 1.4, [
      labelNoSacrifice,
      labelEffect,
    ])
      .withHandEffect(simpleInvokation, simpleInvokationInfo)
      .withFieldEffect((card: Card) => {
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
        card.duel.queueDrawAction(1 - card.playerId);
      }, "Attack. Then your opponent draws card.")
  );
}
