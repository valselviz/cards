import styles from "./CardBox.module.css";
import swordIcon from "assets/icons/sword.svg";
import shieldIcon from "assets/icons/shield.svg";
import { CardModel } from "duel/CardModel";

interface CardBoxMainContentProps {
  card: CardModel;
}

export default function CardBoxMainContent({ card }: CardBoxMainContentProps) {
  return (
    <div className={styles.cardContent}>
      <div className={styles.title}>{card.name}</div>
      <img src={card.image} className={styles.portrait} alt="" />
      <div className={styles.bottomLine}>
        <div className={styles.attribute}>
          <img src={swordIcon} className={styles.icon} alt="" />
          {card.attack}
        </div>
        <div className={styles.attribute}>
          <img src={shieldIcon} className={styles.icon} alt="" />
          {card.defense}
        </div>
      </div>
    </div>
  );
}
