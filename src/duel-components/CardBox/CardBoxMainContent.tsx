import styles from "./CardBox.module.css";
import swordIcon from "assets/icons/sword.svg";
import shieldIcon from "assets/icons/shield.svg";
import { CardModel } from "duel/CardModel";
import { Card } from "duel/Card";

interface CardBoxMainContentProps {
  cardModel: CardModel;
  card: Card | null;
}

export default function CardBoxMainContent({ cardModel, card }: CardBoxMainContentProps) {
  return (
    <div className={styles.cardContent}>
      <div className={styles.title}>{cardModel.name}</div>
      <img src={cardModel.image} className={styles.portrait} alt="" />
      <div className={styles.bottomLine}>
        <div className={styles.attribute}>
          <img src={swordIcon} className={styles.icon} alt="" />
          {card ? card.getAttack() : cardModel.attack}
        </div>
        <div className={styles.attribute}>
          <img src={shieldIcon} className={styles.icon} alt="" />
          {card ? card.getDefense() : cardModel.defense}
        </div>
      </div>
    </div>
  );
}
