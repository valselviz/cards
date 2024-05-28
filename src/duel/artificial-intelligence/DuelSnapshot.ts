import { Action } from "duel/Action";
import { Card } from "duel/Card";
import { CardModel } from "duel/CardModel";
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
  // This are all the attributes of the Duel class
  cardSnapshots: CardSnapshot[][][];
  playerTurn: number; // 0 if it is Player0's turn, 1 if it is Player1's turn
  actionsQueue: Action[] = [];
  players: Duelist[];
  waitingForCardSelection: boolean = false;
  selectedCardOwner: number = 0;
  selectedTarget: Card | null = null;
  selectingFromZone: Zone | null = null;
  ui: DuelUI | null;
  selectionCriteria: (card: Card) => boolean = () => false;
  reproducingDuel: boolean;
  duelRecord: DuelRecord | null;

  constructor(duel: Duel) {
    // The cards can be modified by the AI, so we keep track of snapshos
    this.cardSnapshots = [
      [
        [...duel.cards[0][0].map((card) => new CardSnapshot(card))],
        [...duel.cards[0][1]].map((card) => new CardSnapshot(card)),
        [...duel.cards[0][2]].map((card) => new CardSnapshot(card)),
      ],
      [
        [...duel.cards[1][0]].map((card) => new CardSnapshot(card)),
        [...duel.cards[1][1]].map((card) => new CardSnapshot(card)),
        [...duel.cards[1][2]].map((card) => new CardSnapshot(card)),
      ],
    ];
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
    this.duelRecord = duel.duelRecord;

    // Check that the amount of tracked attributes is the same as the Duel attributes
    if (Object.keys(this).length !== Object.keys(duel).length) {
      throw new Error(
        "The Duel class has attributes that are not tracked by the DuelSnapshots"
      );
    }
  }

  restoreDuel(duel: Duel) {
    duel.cards = [
      [
        this.cardSnapshots[0][0].map((snap) => snap.getRestoredCard()),
        this.cardSnapshots[0][1].map((snap) => snap.getRestoredCard()),
        this.cardSnapshots[0][2].map((snap) => snap.getRestoredCard()),
      ],
      [
        this.cardSnapshots[1][0].map((snap) => snap.getRestoredCard()),
        this.cardSnapshots[1][1].map((snap) => snap.getRestoredCard()),
        this.cardSnapshots[1][2].map((snap) => snap.getRestoredCard()),
      ],
    ];
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

class CardSnapshot {
  card: Card;

  // This class keeps track of all the attrbutes of the Card class
  // Even though some of the Card attributes are immutable (eg. model), it is a good idea to keep track of them all.
  // This way, I can make a check at the end of the constructor to make sure every Card attribute is tracked
  id: string;
  model: CardModel;
  duel: Duel;
  playerId: number;
  zone: Zone;
  usableFromField: boolean;

  constructor(card: Card) {
    this.card = card;
    this.id = card.id;
    this.model = card.model;
    this.duel = card.duel;
    this.playerId = card.playerId;
    this.zone = card.zone;
    this.usableFromField = card.usableFromField;

    // Check that the amount of tracked attributes is the same as the Duel attributes
    if (Object.keys(this).length - 1 !== Object.keys(card).length) {
      throw new Error(
        "The Card class has attributes that are not tracked by the CardSnapshots"
      );
    }
  }

  getRestoredCard(): Card {
    this.card.id = this.id;
    this.card.model = this.model;
    this.card.duel = this.duel;
    this.card.playerId = this.playerId;
    this.card.zone = this.zone;
    this.card.usableFromField = this.usableFromField;
    return this.card;
  }
}
