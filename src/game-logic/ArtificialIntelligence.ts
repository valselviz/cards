import { Card } from "./card";
import { Duel } from "./duel";
import { Zone } from "./zone";

export class ArtificialIntelligence {
  play(duel: Duel) {
    for (const card of duel.cards[duel.playerTurn][Zone.Field]) {
      duel.useFromField(card);
      if (duel.actionsQueue.length > 0) {
        duel.ui.notifyCardUsage(
          card.playerId,
          card.zone,
          duel.cards[card.playerId][card.zone].indexOf(card)
        );
        // if the card added actions successfully
        // then we don't need to keep on playing more cards
        // (not until the UI dispaches the current actions)
        return;
      }
    }
    for (const card of duel.cards[duel.playerTurn][Zone.Hand]) {
      card.model.useFromHand(card);
      if (duel.actionsQueue.length > 0) {
        duel.ui.notifyCardUsage(
          card.playerId,
          card.zone,
          duel.cards[card.playerId][card.zone].indexOf(card)
        );
        // if the card added actions successfully
        // then we don't need to keep on playing more cards
        // (not until the UI dispaches the current actions)
        return;
      }
    }
    duel.passTurn();
  }

  selectTarget(
    duel: Duel,
    selectedCardOwner: number,
    zone: Zone,
    selectionCriteria: (card: Card) => boolean = () => true
  ): Card | null {
    const target = duel.cards[selectedCardOwner][zone].find(selectionCriteria);
    if (target) {
      duel.ui.notifyCardTargeted(
        selectedCardOwner,
        zone,
        duel.cards[selectedCardOwner][zone].indexOf(target)
      );
      return target;
    }
    return null;
  }
}
