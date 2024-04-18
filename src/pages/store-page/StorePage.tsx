import MacroGameContext from "MacroGameContext";
import { CardModel } from "duel/CardModel";
import { useContext, useEffect, useState } from "react";
import DoubleCardDisplay from "../common-components/DoubleCardDisplay/DoubleCardDisplay";
import styles from "../common-components/MainTable/MainTable.module.css";
import OnSaleCardRow from "./OnSaleCardRow";
import { MacroGame } from "macrogame/MacroGame";
import { useNavigate } from "react-router-dom";
import { useDialog } from "pages/common-components/Dialog/useDialog";
import Dialog from "pages/common-components/Dialog/Dialog";

export default function DeckPage() {
  const macrogame = useContext(MacroGameContext).macrogame as MacroGame;

  const [hoveredCard, setHoveredCard] = useState(null as CardModel | null);

  const [onSaleCardsArray, setOnSaleCardsArray] = useState(
    macrogame?.cardsInStore
  );

  // Navigate back to the landing page if the user does not have a session
  const navigate = useNavigate();
  useEffect(() => {
    if (!macrogame) {
      navigate("/");
    }
  }, [macrogame, navigate]);

  const [openDialog, dialogMessage, isError, isModalOpen, setIsModalOpen] =
    useDialog();

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

  if (!macrogame) {
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
      <Dialog
        dialogMessage={dialogMessage}
        isError={isError}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
}
