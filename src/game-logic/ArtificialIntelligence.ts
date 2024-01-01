import { Duel } from "./duel";
import { Zone } from "./zone";

export class ArtificialIntelligence {
  play(duel: Duel) {
    for (const card of duel.cards[duel.playerTurn][Zone.Field]) {
      console.log(card.model.name);
      duel.useFromField(card);
      if (duel.actionsQueue.length > 0) {
        // if the card added actions successfully
        // then we don't need to keep on playing more cards
        // (not until the UI dispaches the current actions)
        return;
      }
    }
    for (const card of duel.cards[duel.playerTurn][Zone.Hand]) {
      console.log(card.model.name);
      card.model.useFromHand(card);
      if (duel.actionsQueue.length > 0) {
        // if the card added actions successfully
        // then we don't need to keep on playing more cards
        // (not until the UI dispaches the current actions)
        return;
      }
    }

    duel.passTurn();
  }
}
