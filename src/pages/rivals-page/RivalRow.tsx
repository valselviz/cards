import { Rival } from "macrogame/Rival";
import styles from "../common-components/MainTable/MainTableRow.module.css";
import { CardModel } from "duel/CardModel";
import { Dispatch, SetStateAction, useContext } from "react";
import MacroGameContext from "MacroGameContext";
import { MacroGame } from "macrogame/MacroGame";
import { cardModels } from "duel/cards-collection/cards-collection";
import { useNavigate } from "react-router-dom";

interface RivalRowProps {
  rival: Rival;
  setHoveredCard: Dispatch<SetStateAction<CardModel | null>>;
}

export default function RivalRow({ rival, setHoveredCard }: RivalRowProps) {
  const macrogame = useContext(MacroGameContext).macrogame as MacroGame;

  const navigate = useNavigate();

  const reward = rival.reward ? cardModels[rival.reward] : null;

  const portraitCard = cardModels[rival.portraitCard];

  return (
    <tr
      className={styles.tableRow}
      onMouseEnter={() => setHoveredCard(reward)}
      onClick={() => {
        macrogame.facingRival = rival;
        console.log(rival);
        navigate("/duel");
      }}
    >
      <td className={styles.tableData}>
        <img
          src={portraitCard.image}
          alt={portraitCard.name}
          className={styles.image}
        />
      </td>
      <td className={styles.tableDataCell}>
        <p>{rival.level}</p>
      </td>
      <td className={styles.tableDataCell}>
        <p>{rival.deck.length}</p>
      </td>
      <td className={styles.tableDataCell}>{reward?.name}</td>
    </tr>
  );
}
