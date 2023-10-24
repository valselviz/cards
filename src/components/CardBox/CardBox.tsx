import styles from "./CardBox.module.css";

import { Card } from "../../game-logic/card";
import { Zone } from "../../game-logic/zones";

interface CardBoxProps {
  card: Card;
  executeOneActionWithDelay: () => void;
}

export default function CardBox({
  card,
  executeOneActionWithDelay,
}: CardBoxProps) {
  function useCard() {
    const duel = card.duel;
    if (card.playerId != duel.playerTurn) return;
    if (!duel.players[duel.playerTurn].human) return;
    if (duel.hasNextAction()) return;

    if (card.zone == Zone.Hand) {
      card.model.invoke(card);
      executeOneActionWithDelay();
    }
  }

  return (
    <div className={styles["card-box"]} onClick={useCard}>
      {card.model.name}
    </div>
  );
}
