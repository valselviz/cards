import { Dispatch, SetStateAction } from "react";
import { Zone } from "../duel/zone";
import { Card } from "../duel/Card";
import { DuelUI } from "duel/DuelUI";
import { Duel } from "duel/Duel";

interface CardBoxStateSetters {
  setActivated: Dispatch<SetStateAction<boolean>>;
  setTargeted: Dispatch<SetStateAction<boolean>>;
}

export class ReactDuelUI implements DuelUI {
  setCardsState: Dispatch<SetStateAction<Card[][][]>>;

  boardStateSetters: CardBoxStateSetters[][][];

  setDamaged: Dispatch<SetStateAction<boolean>>[];

  openDialog: (error: boolean, ...message: string[]) => void;

  constructor(
    setCardsState: Dispatch<SetStateAction<Card[][][]>>,
    openDialog: (error: boolean, ...message: string[]) => void
  ) {
    this.setCardsState = setCardsState;
    this.boardStateSetters = [
      [[], [], []],
      [[], [], []],
    ];
    this.setDamaged = [];
    this.openDialog = openDialog;
  }

  refreshUI(cards: Card[][][]) {
    // Note that when a React state is an array or object,
    // just the content changing is not enough to trigger a rerender.
    // In order to trigger the rerendering of the game's board
    // I need to create a new array.
    const newState = [...cards];
    this.setCardsState(newState);
  }

  notifyCardUsage(playerId: number, zone: Zone, position: number) {
    this.boardStateSetters[playerId][zone][position].setActivated(true);
  }

  notifyCardTargeted(playerId: number, zone: Zone, position: number) {
    this.boardStateSetters[playerId][zone][position].setTargeted(true);
  }

  notifyDamage(playerId: number) {
    this.setDamaged[playerId](true);
  }

  notifyTurnPassed(duel: Duel) {
    window.scrollTo(0, duel.playerTurn === 0 ? document.body.scrollHeight : 0);
  }

  showAlert(message: string): void {
    this.openDialog(true, message);
  }
}
