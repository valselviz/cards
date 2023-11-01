import Slot from "../Slot/Slot";
import { Card } from "../../game-logic/card";

import styles from "./CardsRow.module.css";

interface CardsRowProps {
  cards: Card[];
  executeOneActionWithDelay: () => void;
}

export default function CardsRow({
  cards,
  executeOneActionWithDelay,
}: CardsRowProps) {
  const cardBoxes: JSX.Element[] = [];
  for (let i = 0; i < 5; i++) {
    const card = cards[i];
    cardBoxes.push(
      <Slot
        key={i}
        position={i}
        card={card}
        executeOneActionWithDelay={executeOneActionWithDelay}
      />
    );
  }
  return <div className={styles.cardsRow}>{cardBoxes}</div>;
}
