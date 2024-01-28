import Slot from "../Slot/Slot";
import { Card } from "../../game-logic/Card";

import styles from "./CardsRow.module.css";

interface CardsRowProps {
  cards: Card[];
  executeOneActionWithDelay: () => void;
}

export default function CardsRow({
  cards,
  executeOneActionWithDelay,
}: CardsRowProps) {
  const cardSlots = [];
  for (let i = 0; i < 5; i++) {
    const card = cards[i];
    cardSlots.push(
      <Slot
        key={i}
        position={i}
        card={card}
        executeOneActionWithDelay={executeOneActionWithDelay}
      />
    );
  }
  return <div className={styles.cardsRow}>{cardSlots}</div>;
}
