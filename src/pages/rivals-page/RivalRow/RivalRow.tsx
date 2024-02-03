import { Rival } from "macrogame/Rival";
import styles from "./RivalRow.module.css"

interface RivalRowProps {
  rival: Rival;
}

export default function RivalRow({ rival }: RivalRowProps) {
  return (
    <tr className={styles.tableRow}>
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
      <td className={styles.tableData}></td>
    </tr>
  );
}
