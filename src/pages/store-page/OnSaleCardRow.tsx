import styles from "../common-components/MainTable/MainTableRow.module.css";
import { CardModel } from "duel/CardModel";
import { Dispatch, SetStateAction, useContext } from "react";
import MacroGameContext, { GameContext } from "MacroGameContext";
import { MacroGame, OnSaleCard } from "macrogame/MacroGame";
import { cardModels } from "duel/cards-collection/cards-collection";
import { update } from "api-client/api-client";

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

  return (
    <tr
      className={styles.tableRow}
      onMouseEnter={() => setHoveredCard(onSaleCardModel)}
      onClick={async () => {
        if (macrogame.gold < onSaleCard.price) {
          alert("You don't have enough gold to buy this card.");
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

        await update(
          context.username as string,
          context.macrogame as MacroGame
        );
      }}
    >
      <td className={styles.tableDataCell}>
        <img
          src={onSaleCardModel.image}
          alt={onSaleCardModel.name}
          className={styles.image}
        />
      </td>
      <td className={styles.tableDataCell}>
        <p>{onSaleCardModel.name}</p>
      </td>
      <td className={styles.tableDataCell}>
        <p>{onSaleCard.price}</p>
      </td>
    </tr>
  );
}
