import styles from "../common-components/MainTable/MainTableRow.module.css";
import { CardModel } from "duel/CardModel";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import MacroGameContext, { GameContext } from "MacroGameContext";
import { MacroGame, OnSaleCard } from "macrogame/MacroGame";
import { cardModels } from "duel/cards-collection/cards-collection";
import { updateOnBackend } from "api-client/api-client";
import Dialog from "pages/common-components/Dialog/Dialog";
import { useDialog } from "pages/common-components/Dialog/useDialog";

interface OnSaleCardRowProps {
  onSaleCard: OnSaleCard;
  setHoveredCard: Dispatch<SetStateAction<CardModel | null>>;
  setOnSaleCardsArray: Dispatch<SetStateAction<OnSaleCard[]>>;
}

export default function OnSaleCardRow({
  onSaleCard,
  setHoveredCard,
  setOnSaleCardsArray,
}: OnSaleCardRowProps) {
  const context: GameContext = useContext(MacroGameContext);
  const macrogame = context.macrogame as MacroGame;

  const onSaleCardModel = cardModels[onSaleCard.model];

  const [openDialog, dialogMessage, isError, isModalOpen, setIsModalOpen] =
    useDialog();

  return (
    <tr
      className={styles.tableRow}
      onMouseEnter={() => setHoveredCard(onSaleCardModel)}
      onClick={async () => {
        if (macrogame.gold < onSaleCard.price) {
          openDialog(
            true,
            `You don't have enough gold to buy this card.`
          );
          return;
        }
        macrogame.cardsInStore.splice(
          macrogame.cardsInStore.indexOf(onSaleCard),
          1
        );
        macrogame.cardsPool.push(onSaleCard.model);
        const newCardsInStore = [...macrogame.cardsInStore];
        setOnSaleCardsArray(newCardsInStore);
        setHoveredCard(null);
        macrogame.gold -= onSaleCard.price;

        await updateOnBackend(
          context.username as string,
          context.macrogame as MacroGame
        );
      }}
    >
      <td className={styles.tableDataCell}>
        <div className={styles.imageDiv}>
          <img
            src={onSaleCardModel.image}
            alt={onSaleCardModel.name}
            className={styles.image}
          />
        </div>
      </td>
      <td className={styles.tableDataCell}>
        <p>{onSaleCardModel.name}</p>
      </td>
      <td className={styles.tableDataCell}>
        <p>{onSaleCard.price}</p>
      </td>
      <Dialog
        dialogMessage={dialogMessage}
        isError={isError}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </tr>
  );
}
