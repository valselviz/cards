import { Rival } from "macrogame/Rival";
import styles from "./RivalRow.module.css";
import { CardModel } from "duel/CardModel";
import { Dispatch, SetStateAction } from "react";

interface RivalRowProps {
  rival: Rival;
  setHoveredCard: Dispatch<SetStateAction<CardModel | null>>;
}

export default function RivalRow({ rival, setHoveredCard }: RivalRowProps) {
  return (
    <tr
      className={styles.tableRow}
      onMouseEnter={() => setHoveredCard(rival.reward)}
    >
      <td className={styles.tableData}>
        <img
          src={rival.portraitCard.image}
          alt={rival.portraitCard.name}
          className={styles.rivalImage}
        />
      </td>
      <td className={styles.tableData}>
        <p>{rival.level}</p>
      </td>
      <td className={styles.tableData}>
        <p>{rival.deck.length}</p>
      </td>
      <td className={styles.tableData}>{rival.reward?.name}</td>
    </tr>
  );
}
