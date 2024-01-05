import { Dispatch, SetStateAction } from "react";
import { Zone } from "../game-logic/zone";
import { Card } from "../game-logic/card";
import { DuelUI } from "game-logic/DuelUI";

export class ReactDuelUI extends DuelUI {
  setCardsState: Dispatch<SetStateAction<Card[][][]>>;

  activatedCardSetters: Dispatch<SetStateAction<boolean>>[][][];

  constructor(setCardsState: Dispatch<SetStateAction<Card[][][]>>) {
    super();
    this.setCardsState = setCardsState;
    this.activatedCardSetters = [
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
    this.activatedCardSetters[playerId][zone][position](true);
  }
}
