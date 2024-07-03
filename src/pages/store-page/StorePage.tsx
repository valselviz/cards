import { CardModel } from "duel/CardModel";
import { useEffect, useState } from "react";
import DoubleCardDisplay from "../common-components/DoubleCardDisplay/DoubleCardDisplay";
import styles from "../common-components/MainTable/MainTable.module.css";
import OnSaleCardRow from "./OnSaleCardRow";
import { useMacrogame } from "pages/common-components/useMacrogame/useMacrogame";
import { useOutletContext } from "react-router-dom";

export default function DeckPage() {
  const [macrogame] = useMacrogame();

  const [hoveredCard, setHoveredCard] = useState(null as CardModel | null);

  const [onSaleCardsArray, setOnSaleCardsArray] = useState(
    macrogame ? macrogame.cardsInStore : []
  );

  const openDialog: (error: boolean, ...message: string[]) => void =
    useOutletContext();

  useEffect(() => {
    if (!localStorage.getItem("storePageInfoDisplayed")) {
      openDialog(
        false,
        `This is the Store section.`,
        `You can buy new cards here.`,
        `After buying a new card, make sure you add it to your deck in the “MY DECK” section.`
      );
      localStorage.setItem("storePageInfoDisplayed", "true");
    }
  }, []);

  useEffect(() => {
    if (macrogame) {
      setOnSaleCardsArray(macrogame.cardsInStore);
    }
  }, [macrogame]);

  if (!macrogame || !onSaleCardsArray) {
    return <></>;
  }

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
    <div className={styles.mainTablePage}>
      <div className={styles.line}>
        <h2>Buy Cards</h2>
        <h2>Gold: {macrogame.gold}</h2>
      </div>
      <div className={styles.mainTablePageContent}>
        <div className={styles.mainTable}>
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
