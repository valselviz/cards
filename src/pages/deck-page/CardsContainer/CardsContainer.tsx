import { cardModels } from "duel/cards-collection/cards-collection";
import SquareCard from "../SquareCard/SquareCard";
import styles from "./CardsContainer.module.css";
import { Dispatch, SetStateAction } from "react";
import { CardModel } from "duel/CardModel";

interface CardsContainerProps {
  title: string;
  cardIds: number[];
  removeCard: (cardPosition: number) => void;
  hoverImg: string;
  setHoveredCard: Dispatch<SetStateAction<CardModel | null>>;
}

export default function CardsContainer({
  title,
  cardIds,
  removeCard,
  hoverImg,
  setHoveredCard,
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
            setHoveredCard={setHoveredCard}
          />
        ))}
      </div>
    </div>
  );
}
