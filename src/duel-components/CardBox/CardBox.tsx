import styles from "./CardBox.module.css";

import { useEffect, useState } from "react";

import { Card } from "../../duel/Card";
import { Zone } from "../../duel/zone";
import { Color } from "../../duel/color";
import { ReactDuelUI } from "ReactDuelUI/ReactDuelUI";
import CardBoxMainContent from "./CardBoxMainContent";
import CardBoxDescription from "./CardBoxDescription";
import { UsedOrTargetedCard } from "duel/DuelRecord";

interface CardBoxProps {
  card: Card;
  executeOneActionWithDelay: () => void;
  position: number;
}

export default function CardBox({
  card,
  executeOneActionWithDelay,
  position,
}: CardBoxProps) {
  const [activated, setActivated] = useState(false);
  const [targeted, setTargeted] = useState(false);

  useEffect(() => {
    const reactDuelUI: ReactDuelUI = card.duel.ui as ReactDuelUI;
    reactDuelUI.boardStateSetters[card.playerId][card.zone][position] = {
      setActivated,
      setTargeted,
    };
  }, [card, position]);

  function clickCard() {
    //const duel = card.duel;
    const usedOrTargeted: UsedOrTargetedCard = {
      player: card.playerId,
      zone: card.zone,
      position: position,
      passTurn: false,
    };
    if (card.duel.executeDuelistMove(usedOrTargeted)) {
      executeOneActionWithDelay();
    }
  }

  const shakeAnimation = targeted ? styles.shake : "";

  const littleSpinAnimation =
    activated && card.zone === Zone.Field ? styles.littleSpin : "";

  let flipAnimation = "";
  if (card.zone === Zone.Hand) {
    if (activated) {
      if (card.duel.players[card.playerId].human) {
        flipAnimation = styles.doubleFlipFaceUp;
      } else {
        flipAnimation = styles.faceUp;
      }
    } else {
      if (card.duel.players[card.playerId].human) {
        flipAnimation = styles.faceUp;
      } else {
        flipAnimation = styles.faceDown;
      }
    }
  }

  const usableStyles =
    (!card.usableFromField && card.zone === Zone.Field) ||
    card.duel.playerTurn !== card.playerId
      ? styles.notUsable
      : "";

  const selectableStyles =
    card.duel.waitingForCardSelection === true &&
    card.zone === card.duel.selectingFromZone &&
    card.playerId === card.duel.selectedCardOwner &&
    card.duel.selectionCriteria(card)
      ? styles.selectable
      : "";

  const colorClass = getColorClass(card.model.color);
  return (
    <div className={styles.flippableCard3DContainer}>
      <div
        className={`${styles.flippableCard} ${flipAnimation} ${selectableStyles} ${littleSpinAnimation} ${shakeAnimation}`}
        onClick={clickCard}
        onAnimationEnd={() => {
          setActivated(false);
          setTargeted(false);
        }}
      >
        <div className={`${styles.flippableFace} ${styles.cardBackground}`}>
          <div className={usableStyles}></div>
          <div className={`${styles.cardBox} ${colorClass}`}>
            <CardBoxMainContent card={card.model} />
            <CardBoxDescription card={card.model} displayOnlyOnHover={true} />
          </div>
        </div>
        <div
          className={`${styles.flippableFace} ${styles.faceDown} ${styles.cardBackground}`}
        >
          <div className={styles.cardBackCover}></div>
        </div>
      </div>
    </div>
  );
}

function getColorClass(color: Color) {
  switch (color) {
    case Color.Red:
      return styles.redCard;
    case Color.Yellow:
      return styles.yellowCard;
    case Color.Green:
      return styles.greenCard;
    case Color.Blue:
      return styles.blueCard;
  }
}
