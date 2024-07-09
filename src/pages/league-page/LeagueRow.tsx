import { Rival } from "macrogame/Rival";
import styles from "../common-components/MainTable/MainTableRow.module.css";
import { CardModel } from "duel/CardModel";
import { Dispatch, SetStateAction, useContext } from "react";
import MacroGameContext, { GameContext } from "MacroGameContext";
import { MacroGame } from "macrogame/MacroGame";
import { cardModels } from "duel/cards-collection/cards-collection";
import { useNavigate } from "react-router-dom";
import questionMark from "../../assets/icons/questionMark.svg";
import { LeaguePlayer, updateOnBackend } from "api-client/api-client";

interface LeagueRowProps {
  leaguePlayer: LeaguePlayer;
}

export default function LeagueRow({ leaguePlayer }: LeagueRowProps) {
  const portraitCard = cardModels[leaguePlayer.portrait];

  return (
    <tr className={styles.tableRow}>
      <td className={styles.tableDataCell}>
        <div className={styles.imageDiv}>
          <img
            src={portraitCard.image}
            alt={portraitCard.name}
            className={styles.image}
          />
        </div>
      </td>
      <td className={styles.tableDataCell}>
        <p>{leaguePlayer.username}</p>
      </td>
      <td className={styles.tableDataCell}>
        <p>{leaguePlayer.score}</p>
      </td>
    </tr>
  );
}
