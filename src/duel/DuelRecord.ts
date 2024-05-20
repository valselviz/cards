import { Zone } from "./zone";

export interface UsedOrTargetedCard {
  player: number | null;
  zone: Zone | null;
  position: number | null;
  passTurn: boolean;
}

export interface DuelRecord {
  player0: string;
  player1: string;
  deck0: number[];
  deck1: number[];
  playerMoves: UsedOrTargetedCard[];
  date: string;
}
