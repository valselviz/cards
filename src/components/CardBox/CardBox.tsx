import styles from "./CardBox.module.css";

import { useEffect, useState } from "react";

import { Card } from "../../game-logic/card";
import { Zone } from "../../game-logic/zone";
import { Color } from "../../game-logic/color";

import swordIcon from "assets/icons/sword.svg";
import shieldIcon from "assets/icons/shield.svg";
import { ReactDuelUI } from "ReactDuelUI/ReactDuelUI";

interface CardBoxProps {
  card: Card;
  executeOneActionWithDelay: () => void;
}

export default function CardBox({
  card,
  executeOneActionWithDelay,
}: CardBoxProps) {
  const [activated, setActivated] = useState(false);

  useEffect(() => {
    setActivated(false);
    const reactDuelUI: ReactDuelUI = card.duel.ui as ReactDuelUI;
    const position = card.duel.cards[card.playerId][card.zone].indexOf(card);
    reactDuelUI.activatedCardSetters[card.playerId][card.zone][position] =
      setActivated;
  }, [card]);

  function clickCard() {
    const duel = card.duel;
    // Card Selection
    if (duel.waitingForCardSelection) {
      if (
        card.playerId === duel.selectedCardOwner &&
        card.zone === duel.selectingFromZone &&
        duel.selectionCriteria(card)
      ) {
        duel.selectedTarget = card;
        duel.waitingForCardSelection = false;
        executeOneActionWithDelay();
      }
    } else if (!duel.hasNextAction()) {
      // Manually triggered actions
      if (card.playerId !== duel.playerTurn) return;
      if (card.zone === Zone.Hand) {
        card.model.useFromHand(card);
        if (duel.actionsQueue.length > 0) {
          setActivated(true);
          executeOneActionWithDelay();
        }
      } else if (card.zone === Zone.Field) {
        duel.useFromField(card);
        if (duel.actionsQueue.length > 0) {
          setActivated(true);
          executeOneActionWithDelay();
        }
      }
    }
  }

  const littleSpinAnimation =
    activated && card.zone === Zone.Field ? styles.littleSpin : "";

  let flipAnimation = "";
  if (card.zone == Zone.Hand) {
    if (activated) {
      if (card.playerId === 0) {
        flipAnimation = styles.doubleFlipFaceUp;
      } else if (card.playerId === 1) {
        flipAnimation = styles.faceUp;
      }
    } else {
      if (card.playerId === 0) {
        flipAnimation = styles.faceUp;
      } else if (card.playerId === 1) {
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
        className={`${styles.flippableCard} ${flipAnimation}`}
        onClick={clickCard}
      >
        <div
          className={`${styles.flippableFace} ${styles.cardBackground} ${selectableStyles} ${littleSpinAnimation}`}
        >
          <div className={usableStyles}></div>
          <div className={`${styles.cardBox} ${colorClass}`}>
            <div className={styles.cardContent}>
              <div className={styles.title}>{card.model.name}</div>
              <img src={card.model.image} className={styles.portrait} alt="" />
              <div className={styles.bottomLine}>
                <div className={styles.attribute}>
                  <img src={swordIcon} className={styles.icon} alt="" />
                  {card.model.attack}
                </div>
                <div className={styles.attribute}>
                  <img src={shieldIcon} className={styles.icon} alt="" />
                  {card.model.defense}
                </div>
              </div>
            </div>
            <div className={styles.descriptionBox}>
              {card.model.handInfo && (
                <p className={styles.infoP}>
                  <b>Hand effect: </b>
                  {card.model.handInfo}
                </p>
              )}
              <br />
              {card.model.fieldInfo && (
                <p className={styles.infoP}>
                  <b>Field effect: </b>
                  {card.model.fieldInfo}
                </p>
              )}
            </div>
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
