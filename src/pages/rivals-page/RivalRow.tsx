import { Rival } from "macrogame/Rival";
import styles from "../common-components/MainTable/MainTableRow.module.css";
import { CardModel } from "duel/CardModel";
import { Dispatch, SetStateAction, useContext } from "react";
import MacroGameContext from "MacroGameContext";

interface RivalRowProps {
  rival: Rival;
  setHoveredCard: Dispatch<SetStateAction<CardModel | null>>;
}

export default function RivalRow({ rival, setHoveredCard }: RivalRowProps) {
  const macrogame = useContext(MacroGameContext);

  return (
    <tr
      className={styles.tableRow}
      onMouseEnter={() => setHoveredCard(rival.reward)}
      onClick={() => {
        macrogame.facingRival = rival;
        console.log(rival);
        window.location.href = "/#/duel";
      }}
    >
      <td className={styles.tableData}>
        <img
          src={rival.portraitCard.image}
          alt={rival.portraitCard.name}
          className={styles.image}
        />
      </td>
      <td className={styles.tableDataCell}>
        <p>{rival.level}</p>
      </td>
      <td className={styles.tableDataCell}>
        <p>{rival.deck.length}</p>
      </td>
      <td className={styles.tableDataCell}>{rival.reward?.name}</td>
    </tr>
  );
}
