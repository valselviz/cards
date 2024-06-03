import { CardModel } from "duel/CardModel";
import {
  addCardModel,
  checkFullField,
  labelRitualCreature,
  labelRitualMagic,
  simpleAttack,
  simpleAttackInfo,
} from "./cards-collection";
import { Color } from "duel/color";
import { Card } from "duel/Card";
import { Zone } from "duel/zone";

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
}
