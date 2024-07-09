import {
  LeaguePlayer,
  getLeaguePlayersFromBackend,
} from "api-client/api-client";
import styles from "../common-components/MainTable/MainTable.module.css";
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

  console.log(leaguePlayers)

  if (!leaguePlayers) return <></>;
  
  const leagueRows = leaguePlayers.map((leaguePlayer, index) => {
    return <LeagueRow leaguePlayer={leaguePlayer} key={index} />;
  });

  return (
    <div>
      <div className={styles.mainTablePageContent}>
        <div className={styles.mainTable}>
          <div className={styles.tableHeader}>
            <div>Portrait</div>
            <div>Username</div>
            <div>Score</div>
          </div>
          <div className={styles.tableData}>
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
