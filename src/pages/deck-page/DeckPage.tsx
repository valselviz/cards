import MacroGameContext, { GameContext } from "MacroGameContext";
import { MacroGame } from "macrogame/MacroGame";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardsContainer from "./CardsContainer/CardsContainer";
import plusIcon from "../../assets/plus.png";
import crossIcon from "../../assets/cross.png";
import { updateOnBackend } from "api-client/api-client";
import styles from "./DeckPage.module.css";
import DoubleCardDisplay from "pages/common-components/DoubleCardDisplay/DoubleCardDisplay";
import { CardModel } from "duel/CardModel";
import Dialog from "pages/common-components/Dialog/Dialog";
import { useDialog } from "pages/common-components/Dialog/useDialog";

export default function DeckPage() {
  const context: GameContext = useContext(MacroGameContext);
  const [hoveredCard, setHoveredCard] = useState(null as CardModel | null);

  const navigate = useNavigate();
  useEffect(() => {
    if (!context.macrogame) {
      navigate("/");
    }
  }, [context.macrogame, navigate]);

  const [openDialog, dialogMessage, isError, isModalOpen, setIsModalOpen] =
    useDialog();

  useEffect(() => {
    if (!localStorage.getItem("deckPageInfoDisplayed")) {
      openDialog(
        false,
        `Welcome to Valeria CCG!`,
        `This is the Deck Management section.`,
        `On the left you have the deck of cards you use during duels.`,
        `On the right you have the rest of the cards you earned. It’s empty for now, but you will earn new cards soon.`
      );
      localStorage.setItem("deckPageInfoDisplayed", "true");
    }
  }, []);

  const [deck, setDeck] = useState(context.macrogame?.deck);
  const [cardsPool, setCardsPool] = useState(context.macrogame?.cardsPool);

  const moveCardFromDeckToPool = async (cardPosition: number) => {
    if (!context.macrogame) return;
    const deckMin = 30;
    if (context.macrogame.deck.length <= deckMin) {
      openDialog(true,`Your deck can not have less than ${deckMin} cards`);
      return;
    }

    const cardId = context.macrogame.deck.splice(cardPosition, 1)[0];
    setDeck([...context.macrogame.deck]);
    context.macrogame.cardsPool.push(cardId);
    setCardsPool([...context.macrogame.cardsPool]);
    await updateOnBackend(
      context.username as string,
      context.macrogame as MacroGame
    );
  };

  const moveCardFromPoolToDeck = async (cardPosition: number) => {
    if (!context.macrogame) return;
    const deckMax = 40;
    if (context.macrogame.deck.length >= deckMax) {
      openDialog(
        true,
        `Your deck can not have more than ${deckMax} cards`
      );
      return;
    }

    const cardId = context.macrogame.cardsPool.splice(cardPosition, 1)[0];
    setCardsPool([...context.macrogame.cardsPool]);
    context.macrogame.deck.push(cardId);
    setDeck([...context.macrogame.deck]);
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
        <DoubleCardDisplay hoveredCard={hoveredCard} title={"Reward Details"} />
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
      <Dialog
        dialogMessage={dialogMessage}
        isError={isError}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
}
