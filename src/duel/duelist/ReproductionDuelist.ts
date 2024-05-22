import { Duel } from "duel/Duel";
import { Duelist } from "./Duelist";
import { UsedOrTargetedCard } from "duel/DuelRecord";

export class ReproductionDuelist extends Duelist {
  constructor(name: string, deck: number[]) {
    super(name, true, deck);
  }

  executeDuelistCardSelection(duel: Duel) {
    const playerMove = duel.duelRecord.playerMoves.shift();
    duel.executeDuelistMove(playerMove as UsedOrTargetedCard);
  }

  shouldExecuteDuelistNextMoveAutomatically(duel: Duel) {
    return duel.duelRecord.playerMoves.length > 0;
  }

  executeDuelistNextMove(duel: Duel) {
    const playerMove = duel.duelRecord.playerMoves.shift();
    duel.executeDuelistMove(playerMove as UsedOrTargetedCard);
  }
}
