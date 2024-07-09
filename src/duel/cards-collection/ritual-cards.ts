import { CardModel } from "../CardModel";
import {
  addCardModel,
  checkFullField,
  labelEffect,
  labelNoSacrifice,
  labelRitualCreature,
  labelRitualMagic,
  simpleAttack,
  simpleAttackInfo,
  simpleInvokation,
  simpleInvokationInfo,
} from "./cards-collection";
import { Color } from "../color";
import { Card } from "../Card";
import { Zone } from "../zone";

export function loadRitualCards() {
  const deathLordCardModel = new CardModel(
    663,
    "Death Lord",
    null,
    38,
    32,
    Color.Red,
    3,
    [labelRitualCreature]
  )
    .withFieldEffect(simpleAttack, simpleAttackInfo)
    .withHandEffect(
      () => null,
      "None. This card can only be invoked by using a Dark Ritual card."
    );
  addCardModel(deathLordCardModel);

  addCardModel(
    new CardModel(491, "Dark Ritual", null, 0, 0, Color.Red, 3, [
      labelRitualMagic,
    ]).withHandEffect((card: Card) => {
      const selectionCriteria = (handCard: Card) =>
        handCard.model === deathLordCardModel;
      if (!card.duel.cards[card.playerId][Zone.Hand].some(selectionCriteria)) {
        card.duel.alertPlayer("You need one Death Lord in your hand.");
        return;
      }
      if (checkFullField(card)) return;
      card.duel.queueStartSelectionAction(
        card.playerId,
        Zone.Hand,
        selectionCriteria
      );
      card.duel.queueInvokeAction(() => card.duel.selectedTarget);
      card.duel.queueDiscardAction(() => card);
    }, "Invoke a Death Lord from your hand.")
  );

  const owlGuardian = new CardModel(
    80,
    "Owl Guardian",
    null,
    12,
    5,
    Color.Green,
    1.4,
    [labelNoSacrifice, labelEffect]
  )
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
      card.duel.queueDrawAction(card.playerId);
    }, "Attack. Then draw a card.");
  addCardModel(owlGuardian);

  addCardModel(
    new CardModel(33, "Celestial Guardian", null, 26, 26, Color.Yellow, 3.4, [
      labelRitualCreature,
    ])
      .withHandEffect((card: Card) => {
        const selectionCriteria = (handCard: Card) =>
          handCard.model === owlGuardian;
        if (
          !card.duel.cards[card.playerId][Zone.Field].some(selectionCriteria)
        ) {
          card.duel.alertPlayer(
            "You need to sacrifice one Owl Guardion from your field."
          );
          return;
        }
        card.duel.queueStartSelectionAction(
          card.playerId,
          Zone.Field,
          selectionCriteria
        );
        card.duel.queueDestroyAction(() => card.duel.selectedTarget);
        card.duel.queueInvokeAction(() => card);
      }, "Invoke this card by sacrifying an Owl Guardian from your field.")
      .withFieldEffect(simpleAttack, simpleAttackInfo)
  );
}
