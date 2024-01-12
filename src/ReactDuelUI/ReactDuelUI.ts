import { Dispatch, SetStateAction } from "react";
import { Zone } from "../game-logic/zone";
import { Card } from "../game-logic/card";
import { DuelUI } from "game-logic/DuelUI";

interface CardBoxStateSetters {
  setActivated: Dispatch<SetStateAction<boolean>>;
  setTargeted: Dispatch<SetStateAction<boolean>>;
}

export class ReactDuelUI extends DuelUI {
  setCardsState: Dispatch<SetStateAction<Card[][][]>>;

  boardStateSetters: CardBoxStateSetters[][][];

  //activatedCardSetters: Dispatch<SetStateAction<boolean>>[][][];

  constructor(setCardsState: Dispatch<SetStateAction<Card[][][]>>) {
    super();
    this.setCardsState = setCardsState;
    this.boardStateSetters = [
      [[], [], []],
      [[], [], []],
    ];
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
}
