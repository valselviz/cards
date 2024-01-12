import { Card } from "./card";
import { Zone } from "./zone";

// This class is an interface that is ment to be implemented for duels that need to be displayed visually
export class DuelUI {
  refreshUI(cards: Card[][][]) {}

  notifyCardUsage(playerId: number, zone: Zone, position: number) {}

  notifyCardTargeted(playerId: number, zone: Zone, position: number) {}
}
