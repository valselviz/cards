import MacroGameContext from "MacroGameContext";
import { CardModel } from "duel/CardModel";
import { useContext, useState } from "react";
import DoubleCardDisplay from "../common-components/DoubleCardDisplay/DoubleCardDisplay";
import styles from "../TablePage.module.css";
import OnSaleCardRow from "./OnSaleCardRow";

export default function DeckPage() {
  const macroGame = useContext(MacroGameContext);

  const [hoveredCard, setHoveredCard] = useState(null as CardModel | null);

  const [onSaleCardsArray, setOnSaleCardsArray] = useState(
    macroGame.cardsInStore
  );

  const onSaleCardsRows = onSaleCardsArray.map((onSaleCard, index) => {
    return (
      <OnSaleCardRow
        onSaleCard={onSaleCard}
        key={onSaleCard.model.name + index}
        setHoveredCard={setHoveredCard}
        setOnSaleCardsArray={setOnSaleCardsArray}
      ></OnSaleCardRow>
    );
  });

  return (
    <div className={styles.page}>
      <div className={styles.line}>
        <h2>Buy Cards</h2>
        <h2>Gold: {macroGame.gold}</h2>
      </div>
      <div className={styles.pageContent}>
        <div>
          <div className={styles.tableHeader}>
            <div>Image</div>
            <div>Name</div>
            <div>Price</div>
          </div>
          <div
            className={styles.tableData}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <table>
              <tbody>
                <>{onSaleCardsRows}</>
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <DoubleCardDisplay hoveredCard={hoveredCard} title={"Card Details"} />
        </div>
      </div>
    </div>
  );
}
