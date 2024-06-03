import { Duel } from "./Duel";
import { SmartAI } from "./artificial-intelligence/SmartAI";
import { AIDuelist } from "./duelist/AIDuelist";
import { Zone } from "./zone";

// This method is used by the automatic league to execute duels among players
export function executeDuel(deck0: number[], deck1: number[]) {
  const duelist0 = new AIDuelist("", deck0, new SmartAI());
  const duelist1 = new AIDuelist("", deck1, new SmartAI());
  const duel = new Duel([duelist0, duelist1], null);
  while (true) {
    duel.executeOneAction();
    if (duel.isDuelOver()) break;
    if (!duel.hasNextAction()) {
      duel.players[duel.playerTurn].executeDuelistNextMove(duel);
      if (duel.isDuelOver()) break;
    }
  }
  return duel.cards[0][Zone.Deck].length > 0 ? 0 : 1;
}
