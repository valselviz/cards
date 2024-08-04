import commonStyles from "../common-components/MainTable/MainTableRow.module.css";
import styles from "./LeaguePage.module.css";
import { cardModels } from "duel/cards-collection/cards-collection";
import { LeaguePlayer } from "api-client/api-client";
import { useMacrogame } from "pages/common-components/useMacrogame/useMacrogame";

interface LeagueRowProps {
  leaguePlayer: LeaguePlayer;
  ranking: number;
}

export default function LeagueRow({ leaguePlayer, ranking }: LeagueRowProps) {
  const portraitCard = cardModels[leaguePlayer.portrait];

  const [macrogame, context] = useMacrogame();
  const contextUsername = context.username;

  const contextTextStyles =
    leaguePlayer.username === contextUsername
      ? styles.contextUsername
      : commonStyles.tableDataCell;

  const contextImageStyles =
    leaguePlayer.username === contextUsername
      ? styles.contextImageDiv
      : commonStyles.imageDiv;

  return (
    <tr className={commonStyles.tableRow}>
      <td className={commonStyles.tableDataCell}>
        <div className={contextImageStyles}>
          <img
            src={portraitCard.image}
            alt={portraitCard.name}
            className={commonStyles.image}
          />
        </div>
      </td>
      <td className={contextTextStyles}>
        <p>{leaguePlayer.username}</p>
      </td>
      <td className={contextTextStyles}>
        <p>{leaguePlayer.score}</p>
      </td>
      <td className={contextTextStyles}>
        <p>{ranking}</p>
      </td>
    </tr>
  );
}
