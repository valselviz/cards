import { Dispatch, SetStateAction } from "react";
import { Zone } from "../game-logic/zone";
import { Card } from "../game-logic/card";
import { Duel } from "../game-logic/duel";
import { Player } from "../game-logic/player";

export class ReactDuel extends Duel {
  setCardsState: Dispatch<SetStateAction<Card[][][]>>;

  constructor(
    players: Player[],
    setCardsState: Dispatch<SetStateAction<Card[][][]>>
  ) {
    super(players);
    this.setCardsState = setCardsState;
  }

  refreshUI() {
    // Note that when a React state is an array or object,
    // just the content changing is not enough to trigger a rerender.
    // In order to trigger the rerendering of the game's board
    // I need to create a new array.
    const newState = [...this.cards];
    this.setCardsState(newState);
  }
}
