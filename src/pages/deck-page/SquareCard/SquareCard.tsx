import { CardModel } from "duel/CardModel";
import { Color } from "duel/color";
import styles from "./SquareCard.module.css";
import { Dispatch, SetStateAction } from "react";
interface SquareCardProps {
  key: number;
  card: CardModel;
  position: number;
  removeCard: (cardPosition: number) => void;
  hoverImg: string;
  setHoveredCard: Dispatch<SetStateAction<CardModel | null>>;
}

export default function SquareCard({
  card,
  position,
  removeCard,
  hoverImg,
  setHoveredCard,
}: SquareCardProps) {
  const colorClass = getColorClass(card.color);

  return (
    <div
      className={styles.imgDiv}
      onClick={() => removeCard(position)}
      onMouseEnter={() => setHoveredCard(card)}
    >
      <img
        className={`${styles.squareCardImg} ${colorClass}`}
        src={card.image}
        alt={card.name}
      />
      <img className={styles.icon} src={hoverImg} alt="" />
    </div>
  );
}
function getColorClass(color: Color) {
  switch (color) {
    case Color.Red:
      return styles.redCard;
    case Color.Yellow:
      return styles.yellowCard;
    case Color.Green:
      return styles.greenCard;
    case Color.Blue:
      return styles.blueCard;
  }
}
