import CardBox from "../CardBox/CardBox";
import styles from "./Hand.module.css";
import { Card } from "../../duel/Card";

interface HandProps {
  cards: Card[];
  executeOneActionWithDelay: () => void;
}

export default function Hand({ cards, executeOneActionWithDelay }: HandProps) {
  return (
    <div className={styles.hand}>
      {cards.map((card, index) => (
        <CardBox
          key={card.id}
          card={card}
          executeOneActionWithDelay={executeOneActionWithDelay}
          position={index}
        />
      ))}
    </div>
  );
}
