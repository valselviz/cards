import MacroGameContext from "MacroGameContext";
import { CardModel } from "duel/CardModel";
import { useContext, useState } from "react";
import DoubleCardDisplay from "../common-components/DoubleCardDisplay/DoubleCardDisplay";
import styles from "../common-components/MainTable/MainTable.module.css";
import OnSaleCardRow from "./OnSaleCardRow";
import { MacroGame } from "macrogame/MacroGame";

export default function DeckPage() {
  const macrogame = useContext(MacroGameContext).macrogame as MacroGame;

  const [hoveredCard, setHoveredCard] = useState(null as CardModel | null);

  const [onSaleCardsArray, setOnSaleCardsArray] = useState(
    macrogame.cardsInStore
  );

  const onSaleCardsRows = onSaleCardsArray.map((onSaleCard, index) => {
    return (
      <OnSaleCardRow
        onSaleCard={onSaleCard}
        key={onSaleCard.model + index}
        setHoveredCard={setHoveredCard}
        setOnSaleCardsArray={setOnSaleCardsArray}
      ></OnSaleCardRow>
    );
  });

  return (
    <div className={styles.mainTable}>
      <div className={styles.line}>
        <h2>Buy Cards</h2>
        <h2>Gold: {macrogame.gold}</h2>
      </div>
      <div className={styles.mainTableContent}>
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
