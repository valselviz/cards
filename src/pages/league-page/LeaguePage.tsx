import {
  LeaguePlayer,
  getLeaguePlayersFromBackend,
} from "api-client/api-client";
import commonStyles from "../common-components/MainTable/MainTable.module.css";
import styles from "./LeaguePage.module.css";
import LeagueRow from "./LeagueRow";
import { useEffect, useState } from "react";

export default function LeaguePage() {
  const [leaguePlayers, setLeaguePlayers] = useState(
    null as LeaguePlayer[] | null
  );

  useEffect(() => {
    async function getPlayers() {
      const players = await getLeaguePlayersFromBackend();
      setLeaguePlayers(players);
    }
    getPlayers();
  }, []);

  console.log(leaguePlayers);

  if (!leaguePlayers) return <></>;

  const leagueRows = leaguePlayers.map((leaguePlayer, index) => {
    return (
      <LeagueRow leaguePlayer={leaguePlayer} ranking={index + 1} key={index} />
    );
  });

  return (
    <div className={commonStyles.mainTablePage}>
      <h3 className={styles.leagueText}>Next automatic round in 13 hours.</h3>
      <div className={commonStyles.mainTablePageContent}>
        <div className={commonStyles.mainTable}>
          <div className={commonStyles.tableHeader}>
            <div>Portrait</div>
            <div>Username</div>
            <div>Score</div>
            <div>Ranking</div>
          </div>
          <div className={commonStyles.tableData}>
            <table>
              <tbody>
                <>{leagueRows}</>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
