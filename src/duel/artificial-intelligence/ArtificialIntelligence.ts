import { Card } from "duel/Card";
import { Duel } from "duel/Duel";
import { Zone } from "duel/zone";

export interface ArtificialIntelligence {
  play(duel: Duel): void;
  selectTarget(
    duel: Duel,
    selectedCardOwner: number,
    zone: Zone,
    selectionCriteria: (card: Card) => boolean 
  ): void;
}