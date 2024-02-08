import CardBoxMainContent from "duel-components/CardBox/CardBoxMainContent";
import CardBoxDescription from "duel-components/CardBox/CardBoxDescription";
import { CardModel } from "duel/CardModel";
import { Color } from "duel/color";
import cardBoxStyles from "../../../duel-components/CardBox/CardBox.module.css";
import styles from "./DoubleCardDisplay.module.css";

interface DoubleCardDisplayProps {
  hoveredCard: CardModel | null;
  title: string;
}

export default function DoubleCardDisplay({
  hoveredCard,
  title,
}: DoubleCardDisplayProps) {
  let content = null;
  if (hoveredCard) {
    const colorClass = getColorClass(hoveredCard.color);
    content = (
      <div className={styles.doubleCardDisplayContent}>
        {title}
        <div className={cardBoxStyles.flippableCard3DContainer}>
          <div className={cardBoxStyles.flippableCard}>
            <div
              className={`${cardBoxStyles.flippableFace} ${cardBoxStyles.cardBackground}`}
            >
              <div className={`${cardBoxStyles.cardBox} ${colorClass}`}>
                <CardBoxMainContent card={hoveredCard} />
              </div>
            </div>
          </div>
        </div>
        <div className={cardBoxStyles.flippableCard3DContainer}>
          <div className={cardBoxStyles.flippableCard}>
            <div
              className={`${cardBoxStyles.flippableFace} ${cardBoxStyles.cardBackground}`}
            >
              <div className={`${cardBoxStyles.cardBox} ${colorClass}`}>
                <CardBoxDescription
                  card={hoveredCard}
                  displayOnlyOnHover={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <div className={styles.doubleCardDisplay}>{content}</div>;
}

function getColorClass(color: Color) {
  switch (color) {
    case Color.Red:
      return cardBoxStyles.redCard;
    case Color.Yellow:
      return cardBoxStyles.yellowCard;
    case Color.Green:
      return cardBoxStyles.greenCard;
    case Color.Blue:
      return cardBoxStyles.blueCard;
  }
}
