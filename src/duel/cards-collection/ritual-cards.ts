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

import darkRitual from "assets/cards/darkRitual.jpg";
import deathLord from "assets/cards/deathLord.jpg";

export function loadRitualCards() {
  const deathLordCardModel = new CardModel(
    663,
    "Death Lord",
    deathLord,
    38,
    32,
    Color.Red,
    () => null,
    simpleAttack,
    null,
    simpleAttackInfo,
    3,
    [labelRitualCreature]
  );
  addCardModel(deathLordCardModel);

  addCardModel(
    new CardModel(
      491,
      "Dark Ritual",
      darkRitual,
      0,
      0,
      Color.Red,
      (card: Card) => {
        const selectionCriteria = (handCard: Card) =>
          handCard.model === deathLordCardModel;
        if (card.duel.cards[card.playerId][Zone.Hand].some(selectionCriteria)) {
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
      },
      () => null,
      "Invoke a Death Lord from your hand.",
      null,
      3,
      [labelRitualMagic]
    )
  );
}
