import { Action } from "duel/Action";
import { Card } from "duel/Card";
import { Duel } from "duel/Duel";
import { DuelRecord } from "duel/DuelRecord";
import { DuelUI } from "duel/DuelUI";
import { Duelist } from "duel/duelist/Duelist";
import { Zone } from "duel/zone";

// This class reprsents a snapshop of a Duel
// Steps to use:
// - Create a new instance of this class passing a Duel as parameter
// - Execute player moves and actions on the original duel
// - Use the created snapshot to restore the duel to its original state
export class DuelSnapshot {

  cards: Card[][][];
  playerTurn: number; // 0 if it is Player0's turn, 1 if it is Player1's turn
  actionsQueue: Action[] = [];
  players: Duelist[];
  waitingForCardSelection: boolean = false;
  selectedCardOwner: number = 0;
  selectedTarget: Card | null = null;
  selectingFromZone: Zone | null = null;
  ui: DuelUI;
  selectionCriteria: (card: Card) => boolean = () => false;
  reproducingDuel: boolean;
  duelRecord: DuelRecord;

  constructor(duel: Duel) {
    this.cards = [
      [[...duel.cards[0][0]], [...duel.cards[0][1]], [...duel.cards[0][2]]],
      [[...duel.cards[1][0]], [...duel.cards[1][1]], [...duel.cards[1][2]]],
    ]; // The card matrix can be modified by the AI, so we keep track of a copy
    this.playerTurn = duel.playerTurn;
    this.actionsQueue = [...duel.actionsQueue]; // The action queues can be modified by the AI, so we keep track of a copy
    this.players = duel.players;
    this.waitingForCardSelection = duel.waitingForCardSelection;
    this.selectedCardOwner = duel.selectedCardOwner;
    this.selectedTarget = duel.selectedTarget;
    this.selectingFromZone = duel.selectingFromZone;
    this.ui = duel.ui;
    this.selectionCriteria = duel.selectionCriteria;
    this.reproducingDuel = duel.reproducingDuel;
    this.duelRecord = {
      player0: duel.duelRecord.player0,
      player1: duel.duelRecord.player1,
      deck0: duel.duelRecord.deck0,
      deck1: duel.duelRecord.deck1,
      playerMoves: [...duel.duelRecord.playerMoves], // The recorded player moved can be modified by the AI, so we keep track of a copy
      date: duel.duelRecord.date,
    };

    // Check that the amount of tracked attributes is the same as the Duel attributes
    if (Object.keys(this).length !== Object.keys(duel).length) {
        throw new Error("The Duel class has attributes that are not tracked by the DuelSnapshots");
    }
  }

  restoreSnapshot(duel: Duel) {
    duel.cards = this.cards;
    duel.playerTurn = this.playerTurn;
    duel.actionsQueue = this.actionsQueue;
    duel.players = this.players;
    duel.waitingForCardSelection = this.waitingForCardSelection;
    duel.selectedCardOwner = this.selectedCardOwner;
    duel.selectedTarget = this.selectedTarget;
    duel.selectingFromZone = this.selectingFromZone;
    duel.ui = this.ui;
    duel.selectionCriteria = this.selectionCriteria;
    duel.reproducingDuel = this.reproducingDuel;
    duel.duelRecord = this.duelRecord;
  }
}