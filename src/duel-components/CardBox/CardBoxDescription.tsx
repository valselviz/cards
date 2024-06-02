import { CardModel } from "duel/CardModel";
import styles from "./CardBox.module.css";

interface CardBoxDescriptionProps {
  cardModel: CardModel;
  displayOnlyOnHover: boolean;
}

export default function CardBoxDescription({
  cardModel,
  displayOnlyOnHover,
}: CardBoxDescriptionProps) {
  return (
    <div
      className={`${styles.descriptionBox} ${
        displayOnlyOnHover ? "" : styles.alwaysShow
      }`}
    >
      {cardModel.handInfo && (
        <p className={styles.infoP}>
          <b>Hand effect: </b>
          {cardModel.handInfo}
        </p>
      )}
      {cardModel.fieldInfo && (
        <p className={styles.infoP}>
          <b>Field effect: </b>
          {cardModel.fieldInfo}
        </p>
      )}
      {cardModel.passiveInfo && (
        <p className={styles.infoP}>
          <b>Passive: </b>
          {cardModel.passiveInfo}
        </p>
      )}
    </div>
  );
}
