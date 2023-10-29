import { Card } from "../../game-logic/card";
import { Zone } from "../../game-logic/zones";
import { useEffect, useMemo, useState } from "react";
import { ReactDuel } from "../../react-duel/react-duel";
import CardsRow from "../CardsRow/CardsRow";
import Hand from "../Hand/Hand";
import PlayerStatus from "../PlayerStatus/PlayerStatus";

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
        <div
          className={styles["playerSide"] + " " + styles["playerSide-top"]}
        >
          <Hand
            cards={cardsState[1][Zone.Hand]}
            executeOneActionWithDelay={executeOneActionWithDelay}
          />
          <CardsRow
            cards={cardsState[1][Zone.Field]}
            executeOneActionWithDelay={executeOneActionWithDelay}
          />
        </div>
        <div className={styles["playersStatusDiv"]}>
          <PlayerStatus
            playerName={players[1].name}
            playerDeckCards={cardsState[1][Zone.Deck].length}
            playerId={1}
          />
          <PlayerStatus
            playerName={players[0].name}
            playerDeckCards={cardsState[0][Zone.Deck].length}
            playerId={0}
          />
        </div>
        <div
          className={styles["playerSide"] + " " + styles["playerSide-bottom"]}
        >
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
    </div>
  );
}
