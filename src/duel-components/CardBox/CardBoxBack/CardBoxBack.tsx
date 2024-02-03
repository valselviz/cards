import styles from "./CardBoxBack.module.css"
import { Card } from "../../../duel/Card";

interface CardBoxBackProps {
  card: Card;
  colorClass: string;
}

export default function CardBoxBack({ card, colorClass }: CardBoxBackProps) {
  return (
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
  );
}