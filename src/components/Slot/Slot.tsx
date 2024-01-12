import styles from "./Slot.module.css";

import { Card } from "../../game-logic/card";
import CardBox from "../CardBox/CardBox";

interface SlotProps {
  position: number;
  card?: Card;
  executeOneActionWithDelay: () => void;
}

export default function Slot({
  position,
  card,
  executeOneActionWithDelay,
}: SlotProps) {
  return (
    <div className={styles.slot}>
      {card && (
        <CardBox
          key={card.id}
          card={card}
          executeOneActionWithDelay={executeOneActionWithDelay}
        />
      )}
    </div>
  );
}
