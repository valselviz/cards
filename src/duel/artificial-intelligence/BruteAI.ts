import { Card } from "../Card";
import { Duel } from "../Duel";
import { UsedOrTargetedCard } from "../DuelRecord";
import { Zone } from "../zone";

export class BruteAI {
  play(duel: Duel) {
    for (const card of duel.cards[duel.playerTurn][Zone.Field]) {
      const usedOrTargeted: UsedOrTargetedCard = {
        player: duel.playerTurn,
        zone: card.zone,
        position: duel.cards[duel.playerTurn][Zone.Field].indexOf(card),
        passTurn: false,
      };
      duel.executeDuelistMove(usedOrTargeted);
      if (duel.actionsQueue.length > 0) return;
    }
    for (const card of duel.cards[duel.playerTurn][Zone.Hand]) {
      const usedOrTargeted: UsedOrTargetedCard = {
        player: duel.playerTurn,
        zone: card.zone,
        position: duel.cards[duel.playerTurn][Zone.Hand].indexOf(card),
        passTurn: false,
      };
      duel.executeDuelistMove(usedOrTargeted);
      if (duel.actionsQueue.length > 0) return;
    }
    duel.executeDuelistMove({
      player: null,
      zone: null,
      position: null,
      passTurn: true,
    });
  }

  selectTarget(
    duel: Duel,
    selectedCardOwner: number,
    zone: Zone,
    selectionCriteria: (card: Card) => boolean = () => true
  ) {
    const target = duel.cards[selectedCardOwner][zone].find(selectionCriteria);
    if (target) {
      const usedOrTargeted: UsedOrTargetedCard = {
        player: selectedCardOwner,
        zone: zone,
        position: duel.cards[selectedCardOwner][zone].indexOf(target),
        passTurn: false,
      };
      duel.executeDuelistMove(usedOrTargeted);
    }
  }
}
