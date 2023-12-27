import styles from "./CardBox.module.css";

import { Card } from "../../game-logic/card";
import { Zone } from "../../game-logic/zone";
import { Color } from "../../game-logic/color";

import swordIcon from "assets/icons/sword.svg";
import shieldIcon from "assets/icons/shield.svg";

interface CardBoxProps {
  card: Card;
  executeOneActionWithDelay: () => void;
}

export default function CardBox({
  card,
  executeOneActionWithDelay,
}: CardBoxProps) {
  function clickCard() {
    const duel = card.duel;
    if (!duel.players[duel.playerTurn].human) return;
    // Card Selection
    if (duel.waitingForCardSelection) {
      if (
        card.playerId == duel.selectedCardOwner &&
        card.zone == duel.selectingFromZone &&
        duel.selectionCriteria(card)
      ) {
        duel.selectedTarget = card;
        duel.waitingForCardSelection = false;
        executeOneActionWithDelay();
      }
    } else if (!duel.hasNextAction()) {
      // Manually triggered actions
      if (card.playerId != duel.playerTurn) return;
      if (card.zone == Zone.Hand) {
        card.model.useFromHand(card);
        executeOneActionWithDelay();
      } else if (card.zone == Zone.Field && card.usableFromField) {
        card.model.useFromField(card);
        card.usableFromField = false;
        executeOneActionWithDelay();
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
    <div
      className={`${styles.cardBackground} ${selectableStyles}`}
      onClick={clickCard}
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
          {card.model.fieldInfo && (
            <p className={styles.infoP}>
              <b>Field effect: </b>
              {card.model.fieldInfo}
            </p>
          )}
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
