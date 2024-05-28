import { Duel } from "duel/Duel";
import { Duelist } from "./Duelist";
import { DuelRecord, UsedOrTargetedCard } from "duel/DuelRecord";

export class ReproductionDuelist extends Duelist {
  constructor(name: string, deck: number[]) {
    super(name, true, deck);
  }

  executeDuelistCardSelection(duel: Duel) {
    const duelRecord = duel.duelRecord as DuelRecord;
    const playerMove = duelRecord.playerMoves.shift();
    duel.executeDuelistMove(playerMove as UsedOrTargetedCard);
  }

  shouldExecuteDuelistNextMoveAutomatically(duel: Duel) {
    const duelRecord = duel.duelRecord as DuelRecord;
    return duelRecord.playerMoves.length > 0;
  }

  executeDuelistNextMove(duel: Duel) {
    const duelRecord = duel.duelRecord as DuelRecord;
    const playerMove = duelRecord.playerMoves.shift();
    duel.executeDuelistMove(playerMove as UsedOrTargetedCard);
  }
}
