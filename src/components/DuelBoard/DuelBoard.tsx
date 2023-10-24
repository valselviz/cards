import { Card } from "../../game-logic/card";
import { Zone } from "../../game-logic/zones";
import { useEffect, useMemo, useState } from "react";
import { ReactDuel } from "../../react-duel/react-duel";
import CardsRow from "../CardsRow/CardsRow";
import Hand from "../Hand/Hand";

import styles from "./DuelBoard.module.css";
import { Player } from "../../game-logic/player";

interface DuelBoardProps {
  players: Player[];
}

export default function DuelBoard({ players }: DuelBoardProps) {
  console.log("Rendering DuelBoard");

  const emptyBoard = [
    [[], [], []],
    [[], [], []],
  ];
  const [cardsState, setCardsState] = useState<Card[][][]>(emptyBoard);

  const duel = useMemo(
    () => new ReactDuel(players, cardsState, setCardsState),
    [players]
  );

  function executeOneActionWithDelay() {
    if (duel.hasNextAction()) {
      setTimeout(() => {
        duel.executeOneAction();
        executeOneActionWithDelay();
      }, 300);
    }
  }

  useEffect(executeOneActionWithDelay, []);

  return (
    <div>
      <div className={styles["field"]}>
        <Hand
          cards={cardsState[1][Zone.Hand]}
          executeOneActionWithDelay={executeOneActionWithDelay}
        />
        <CardsRow
          cards={cardsState[1][Zone.Field]}
          executeOneActionWithDelay={executeOneActionWithDelay}
        />
        <CardsRow
          cards={cardsState[0][Zone.Field]}
          executeOneActionWithDelay={executeOneActionWithDelay}
        />
        <Hand
          cards={cardsState[0][Zone.Hand]}
          executeOneActionWithDelay={executeOneActionWithDelay}
        />
      </div>
    </div>
  );
}
