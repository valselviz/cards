import { CardModel } from "duel/CardModel";
import styles from "./CardBox.module.css";

interface CardBoxDescriptionProps {
  card: CardModel;
  displayOnlyOnHover: boolean;
}

export default function CardBoxDescription({
  card,
  displayOnlyOnHover,
}: CardBoxDescriptionProps) {
  return (
    <div
      className={`${styles.descriptionBox} ${
        displayOnlyOnHover ? "" : styles.alwaysShow
      }`}
    >
      {card.handInfo && (
        <p className={styles.infoP}>
          <b>Hand effect: </b>
          {card.handInfo}
        </p>
      )}
      <br />
      {card.fieldInfo && (
        <p className={styles.infoP}>
          <b>Field effect: </b>
          {card.fieldInfo}
        </p>
      )}
    </div>
  );
}
