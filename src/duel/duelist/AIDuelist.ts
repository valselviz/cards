import { Duelist } from "./Duelist";
import { ArtificialIntelligence } from "../ArtificialIntelligence";
import { Duel } from "duel/Duel";
import { Zone } from "duel/zone";

export class AIDuelist extends Duelist {
  ai: ArtificialIntelligence;

  constructor(name: string, deck: number[], ai: ArtificialIntelligence) {
    super(name, false, deck);
    this.ai = ai;
  }

  executeDuelistCardSelection(duel: Duel) {
    this.ai.selectTarget(
      duel,
      duel.selectedCardOwner,
      duel.selectingFromZone as Zone,
      duel.selectionCriteria
    );
  }

  shouldExecuteDuelistNextMoveAutomatically(duel: Duel) {
    return true;
  }

  executeDuelistNextMove(duel: Duel) {
    this.ai.play(duel);
  }
}
