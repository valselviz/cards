import { cardModels } from "duel/cards-collection/cards-collection";
import SquareCard from "../SquareCard/SquareCard";
import styles from "./CardsContainer.module.css";

interface CardsContainerProps {
  title: string;
  cardIds: number[];
  removeCard: (cardPosition: number) => void;
  hoverImg: string;
}

export default function CardsContainer({
  title,
  cardIds,
  removeCard,
  hoverImg,
}: CardsContainerProps) {
  return (
    <div>
      <h4>{title}</h4>
      <div className={styles.squareCardsContainer}>
        {cardIds.map((id, index) => (
          <SquareCard
            key={index}
            card={cardModels[id]}
            position={index}
            removeCard={removeCard}
            hoverImg={hoverImg}
          />
        ))}
      </div>
    </div>
  );
}
