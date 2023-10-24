import { Dispatch, SetStateAction } from "react";
import { Zone } from "../game-logic/zones";
import { Card } from "../game-logic/card";
import { Duel } from "../game-logic/duel";
import { Player } from "../game-logic/player";

export class ReactDuel extends Duel {
  cardsState: Card[][][];
  setCardsState: Dispatch<SetStateAction<Card[][][]>>;

  constructor(
    players: Player[],
    cardsState: Card[][][],
    setCardsState: Dispatch<SetStateAction<Card[][][]>>
  ) {
    super(players);
    this.cardsState = cardsState;
    this.setCardsState = setCardsState;
  }

  refreshUI() {
    console.log("Refresh UI");

    // Note that when a React state is an array or object,
    // just the content changing is not enough to trigger a rerender.
    // In order to trigger the rerendering of the game's board
    // I need to create a new array.
    const newState = [...this.cards];
    this.setCardsState(newState);
  }
}
