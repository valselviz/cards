import styles from "../common-components/MainTable/MainTableRow.module.css";
import { CardModel } from "duel/CardModel";
import { Dispatch, SetStateAction, useContext } from "react";
import MacroGameContext from "MacroGameContext";
import { OnSaleCard } from "macrogame/MacroGame";

interface OnSaleCardRowProps {
  onSaleCard: { model: CardModel; price: number };
  setHoveredCard: Dispatch<SetStateAction<CardModel | null>>;
  setOnSaleCardsArray: Dispatch<SetStateAction<OnSaleCard[]>>;
}

export default function OnSaleCardRow({
  onSaleCard,
  setHoveredCard,
  setOnSaleCardsArray,
}: OnSaleCardRowProps) {
  const macrogame = useContext(MacroGameContext);

  return (
    <tr
      className={styles.tableRow}
      onMouseEnter={() => setHoveredCard(onSaleCard.model)}
      onClick={() => {
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
      }}
    >
      <td className={styles.tableDataCell}>
        <img
          src={onSaleCard.model.image}
          alt={onSaleCard.model.name}
          className={styles.image}
        />
      </td>
      <td className={styles.tableDataCell}>
        <p>{onSaleCard.model.name}</p>
      </td>
      <td className={styles.tableDataCell}>
        <p>{onSaleCard.price}</p>
      </td>
    </tr>
  );
}
