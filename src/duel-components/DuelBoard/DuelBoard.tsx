import { Card } from "../../duel/Card";
import { Zone } from "../../duel/zone";
import { useEffect, useMemo, useState } from "react";
import { ReactDuelUI } from "../../ReactDuelUI/ReactDuelUI";
import CardsRow from "../CardsRow/CardsRow";
import Hand from "../Hand/Hand";
import PlayerStatus from "../PlayerStatus/PlayerStatus";
import sandClockImage from "assets/clock.png";

import styles from "./DuelBoard.module.css";
import { Duelist } from "../../duel/duelist/Duelist";
import DuelEndMessage from "duel-components/DuelEndMessage/DuelEndMessage";
import { Duel } from "duel/Duel";
import { UsedOrTargetedCard } from "duel/DuelRecord";
import { useDialog } from "pages/common-components/Dialog/useDialog";
import Dialog from "pages/common-components/Dialog/Dialog";

interface DuelBoardProps {
  players: Duelist[];
}

export default function DuelBoard({ players }: DuelBoardProps) {
  const emptyBoard = [
    [[], [], []],
    [[], [], []],
  ];
  const [cardsState, setCardsState] = useState<Card[][][]>(emptyBoard);

  const [openDialog, dialogMessage, isError, isModalOpen, setIsModalOpen] =
    useDialog();

  // The duel and duelUI objects should be created only once.
  // It shouldn't be created on each rerender.
  // This is achived with useMemo
  const duelUI = useMemo(() => new ReactDuelUI(setCardsState, openDialog), []);
  const duel = useMemo(() => new Duel(players, duelUI), [players, duelUI]);

  function executeOneActionWithDelay() {
    if (duel.isDuelOver()) return;
    const actionDelay = 400;
    if (duel.hasNextAction()) {
      setTimeout(() => {
        const action = duel.executeOneAction();
        if (action && !action.shouldWaitForTargetSelection()) {
          executeOneActionWithDelay();
        }
      }, actionDelay);
    } else {
      if (
        duel.players[duel.playerTurn].shouldExecuteDuelistNextMoveAutomatically(
          duel
        )
      ) {
        setTimeout(() => {
          duel.players[duel.playerTurn].executeDuelistNextMove(duel);
          executeOneActionWithDelay();
        }, actionDelay);
      }
    }
  }

  useEffect(executeOneActionWithDelay, []);

  function passPlayerTurn() {
    if (duel.players[duel.playerTurn].human) {
      if (
        duel.executeDuelistMove({
          player: null,
          zone: null,
          position: null,
          passTurn: true,
        })
      ) {
        executeOneActionWithDelay();
      }
    }
  }

  return (
    <div className={styles.duelBoard}>
      <Hand
        cards={cardsState[1][Zone.Hand]}
        executeOneActionWithDelay={executeOneActionWithDelay}
      />
      <div className={styles.middleSection}>
        <div className={styles.sideSection}>
          <PlayerStatus
            playerName={players[1].name}
            playerDeckCards={cardsState[1][Zone.Deck].length}
            playerId={1}
            duelUI={duelUI}
          />
          <PlayerStatus
            playerName={players[0].name}
            playerDeckCards={cardsState[0][Zone.Deck].length}
            playerId={0}
            duelUI={duelUI}
          />
        </div>
        <div className={`${styles.fieldArea} ${styles.onTurn}`}>
          <CardsRow
            cards={cardsState[1][Zone.Field]}
            executeOneActionWithDelay={executeOneActionWithDelay}
          />
          <CardsRow
            cards={cardsState[0][Zone.Field]}
            executeOneActionWithDelay={executeOneActionWithDelay}
          />
        </div>
        <div className={styles.sideSection}>
          <button className={styles.passTurnButton} onClick={passPlayerTurn}>
            <img
              src={sandClockImage}
              className={styles.passTurnImage}
              alt="pass turn"
            />
          </button>
        </div>
      </div>
      <Hand
        cards={cardsState[0][Zone.Hand]}
        executeOneActionWithDelay={executeOneActionWithDelay}
      />
      {duel.isDuelOver() && (
        <DuelEndMessage victory={duel.cards[0][Zone.Deck].length > 0} />
      )}
      <Dialog
        dialogMessage={dialogMessage}
        isError={isError}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
}
