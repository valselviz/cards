import { render, screen, cleanup } from "@testing-library/react";
import CardsContainer from "pages/deck-page/CardsContainer/CardsContainer";
import crossIcon from "../../assets/cross.png";
import { loadAllCardModels } from "../../duel/cards-collection/load-all-card-models";
import "@testing-library/jest-dom";

loadAllCardModels();

describe("test CardsContainer component", () => {
  test("Should render CardsContainer component", () => {
    render(
      <CardsContainer
        title={"Deck"}
        cardIds={[471, 471, 471]}
        removeCard={() => null}
        hoverImg={crossIcon}
        setHoveredCard={() => null}
      />
    );
    const cardsContainerElement = screen.getByTestId("cards-container");
    expect(cardsContainerElement).toBeInTheDocument();
    expect(cardsContainerElement).toHaveTextContent("Deck");
    const squareCardElement0 = screen.getByTestId("square-card-0");
    expect(squareCardElement0).toBeInTheDocument();
    const squareCardElement1 = screen.getByTestId("square-card-1");
    expect(squareCardElement1).toBeInTheDocument();
    const squareCardElement2 = screen.getByTestId("square-card-2");
    expect(squareCardElement2).toBeInTheDocument();
  });
});
