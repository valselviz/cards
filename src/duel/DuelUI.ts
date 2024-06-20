import { Card } from "./Card";
import { Duel } from "./Duel";
import { Zone } from "./zone";

// This class is an interface that is ment to be implemented for duels that need to be displayed visually
export interface DuelUI {
  refreshUI(cards: Card[][][]): void;

  notifyCardUsage(playerId: number, zone: Zone, position: number): void;

  notifyCardTargeted(playerId: number, zone: Zone, position: number): void;

  notifyDamage(playerId: number): void;

  notifyTurnPassed(duel: Duel): void;
}
