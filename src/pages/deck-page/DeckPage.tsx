import { MacroGame } from "macrogame/MacroGame";
import { useEffect, useState } from "react";
import CardsContainer from "./CardsContainer/CardsContainer";
import plusIcon from "../../assets/plus.png";
import crossIcon from "../../assets/cross.png";
import { updateOnBackend } from "api-client/api-client";
import styles from "./DeckPage.module.css";
import DoubleCardDisplay from "pages/common-components/DoubleCardDisplay/DoubleCardDisplay";
import { CardModel } from "duel/CardModel";
import { useMacrogame } from "pages/common-components/useMacrogame/useMacrogame";
import { useOutletContext } from "react-router-dom";
import { DECK_PAGE_DESCRIPTION } from "pages/common-components/sectionDescriptions";

export default function DeckPage() {
  const [macrogame, context] = useMacrogame();
  const [hoveredCard, setHoveredCard] = useState(null as CardModel | null);
  const [deck, setDeck] = useState(undefined as number[] | undefined);
  const [cardsPool, setCardsPool] = useState(undefined as number[] | undefined);

  const openDialog: (error: boolean, ...message: string[]) => void =
    useOutletContext();

  useEffect(() => {
    if (!localStorage.getItem("deckPageInfoDisplayed")) {
      openDialog(false, ...DECK_PAGE_DESCRIPTION);
      localStorage.setItem("deckPageInfoDisplayed", "true");
    }
  }, []);

  useEffect(() => {
    setDeck(macrogame?.deck);
    setCardsPool(macrogame?.cardsPool);
  }, [macrogame]);

  const moveCardFromDeckToPool = async (cardPosition: number) => {
    if (!macrogame) return;
    const deckMin = 30;
    if (macrogame.deck.length <= deckMin) {
      openDialog(true, `Your deck can not have less than ${deckMin} cards`);
      return;
    }

    const cardId = macrogame.deck.splice(cardPosition, 1)[0];
    setDeck([...macrogame.deck]);
    macrogame.cardsPool.push(cardId);
    setCardsPool([...macrogame.cardsPool]);
    await updateOnBackend(context?.username as string, macrogame as MacroGame);
  };

  const moveCardFromPoolToDeck = async (cardPosition: number) => {
    if (!macrogame) return;
    const deckMax = 40;
    if (macrogame.deck.length >= deckMax) {
      openDialog(true, `Your deck can not have more than ${deckMax} cards`);
      return;
    }

    const cardId = macrogame.cardsPool.splice(cardPosition, 1)[0];
    setCardsPool([...macrogame.cardsPool]);
    macrogame.deck.push(cardId);
    setDeck([...macrogame.deck]);
    await updateOnBackend(
      context.username as string,
      context.macrogame as MacroGame
    );
  };

  if (!context.macrogame || !deck || !cardsPool) {
    return <></>;
  }

  return (
    <div className={styles.mainContainer}>
      <h2>Manage Deck</h2>
      <div
        className={styles.container}
        onMouseLeave={() => setHoveredCard(null)}
      >
        <DoubleCardDisplay hoveredCard={hoveredCard} title={"Card Details"} />
        <CardsContainer
          title={"Deck"}
          cardIds={deck}
          removeCard={moveCardFromDeckToPool}
          hoverImg={crossIcon}
          setHoveredCard={setHoveredCard}
        />
        <CardsContainer
          title={"Available Cards"}
          cardIds={cardsPool}
          removeCard={moveCardFromPoolToDeck}
          hoverImg={plusIcon}
          setHoveredCard={setHoveredCard}
        />
      </div>
    </div>
  );
}
