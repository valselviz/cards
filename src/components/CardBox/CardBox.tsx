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
    if (card.playerId != duel.playerTurn) return;
    if (!duel.players[duel.playerTurn].human) return;

    if (card.duel.waitingForCardSelection) {
      card.duel.selectedTarget = card;
      card.duel.waitingForCardSelection = false;
      executeOneActionWithDelay();
    } else if (!duel.hasNextAction()) {
      if (card.zone == Zone.Hand) {
        card.model.useFromHand(card);
        executeOneActionWithDelay();
      }
    }
  }

  const colorClass = getColorClass(card.model.color);
  return (
    <div className={`${styles.cardBackground}`} onClick={clickCard}>
      <div className={`${styles.cardBox} ${colorClass}`}>
        <div className={styles.title}>{card.model.name}</div>
        <img src={card.model.image} className={styles.portrait} />
        <div className={styles.bottomLine}>
          <div className={styles.attribute}>
            <img src={swordIcon} className={styles.icon} />
            {card.model.attack}
          </div>
          <div className={styles.attribute}>
            <img src={shieldIcon} className={styles.icon} />
            {card.model.defense}
          </div>
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
