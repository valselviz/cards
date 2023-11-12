import { Card } from "../../game-logic/card";
import { Zone } from "../../game-logic/zone";
import { useEffect, useMemo, useState } from "react";
import { ReactDuel } from "../../react-duel/react-duel";
import CardsRow from "../CardsRow/CardsRow";
import Hand from "../Hand/Hand";
import PlayerStatus from "../PlayerStatus/PlayerStatus";
import sandClockIcon from "assets/icons/sand-clock.svg";

import styles from "./DuelBoard.module.css";
import { Player } from "../../game-logic/player";

interface DuelBoardProps {
  players: Player[];
}

export default function DuelBoard({ players }: DuelBoardProps) {
  const emptyBoard = [
    [[], [], []],
    [[], [], []],
  ];
  const [cardsState, setCardsState] = useState<Card[][][]>(emptyBoard);

  // The duel object should be created only once.
  // It shouldn't be created on each rerender.
  // This is achived with useMemo
  const duel = useMemo(() => new ReactDuel(players, setCardsState), [players]);

  function executeOneActionWithDelay() {
    if (duel.hasNextAction()) {
      setTimeout(() => {
        const action = duel.executeOneAction();
        if (action && !action.selectionTargetAction) {
          executeOneActionWithDelay();
        }
      }, 300);
    }
  }

  useEffect(executeOneActionWithDelay, []);

  function passTurn() {
    duel.playerTurn = 1 - duel.playerTurn;
    duel.draw(duel.playerTurn);
    executeOneActionWithDelay();
  }

  const playerOneStyle =
    duel.playerTurn === 1 ? styles.onTurn : styles.notOnTurn;

  const playerZeroStyle =
    duel.playerTurn === 0 ? styles.onTurn : styles.notOnTurn;

  return (
    <div className={styles.duelBoard}>
      <div
        className={`${styles.playerSide} ${styles.playerSideTop} ${playerOneStyle}`}
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
      <div className={styles.playersStatusDiv}>
        <PlayerStatus
          playerName={players[1].name}
          playerDeckCards={cardsState[1][Zone.Deck].length}
          playerId={1}
          playerTurn={duel.playerTurn}
        />
        <PlayerStatus
          playerName={players[0].name}
          playerDeckCards={cardsState[0][Zone.Deck].length}
          playerId={0}
          playerTurn={duel.playerTurn}
        />
      </div>
      <div
        className={`${styles.playerSide} ${styles.playerSideBottom} ${playerZeroStyle}`}
      >
        <CardsRow
          cards={cardsState[0][Zone.Field]}
          executeOneActionWithDelay={executeOneActionWithDelay}
        />
        <div className={styles.bottonRow}>
          <Hand
            cards={cardsState[0][Zone.Hand]}
            executeOneActionWithDelay={executeOneActionWithDelay}
          />
          <button className={styles.passTurnButton} onClick={passTurn}>
            <img
              src={sandClockIcon}
              className={styles.passTurnIcon}
              alt="pass turn"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
