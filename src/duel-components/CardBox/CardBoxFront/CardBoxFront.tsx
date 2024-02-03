import styles from "./CardBoxFront.module.css";
import { Card } from "../../../duel/Card";
import swordIcon from "assets/icons/sword.svg";
import shieldIcon from "assets/icons/shield.svg";

interface CardBoxFrontProps {
  card: Card;
  colorClass: string;
}

export default function CardBoxFront({ card, colorClass }: CardBoxFrontProps) {
  return (
    <div className={`${styles.cardBoxFront} ${colorClass}`}>
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
    </div>
  );
}
