import { CardModel } from "duel/CardModel";
import { Color } from "duel/color";
import styles from "./SquareCard.module.css";
interface SquareCardProps {
  key: number;
  card: CardModel;
  position: number;
  removeCard: (cardPosition: number) => void;
  hoverImg: string;
}

export default function SquareCard({
  card,
  position,
  removeCard,
  hoverImg,
}: SquareCardProps) {
  const colorClass = getColorClass(card.color);

  return (
    <div className={styles.imgDiv} onClick={() => removeCard(position)}>
      <img src={card.image} className={colorClass} alt={card.name} />
      <img src={hoverImg} alt="" className={styles.icon} />
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
