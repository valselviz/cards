import {
  LeaguePlayer,
  getLeaguePlayersFromBackend,
} from "api-client/api-client";
import commonStyles from "../common-components/MainTable/MainTable.module.css";
import styles from "./LeaguePage.module.css";
import LeagueRow from "./LeagueRow";
import { useEffect, useState } from "react";

// Jest can not mock the getCurrentDate function unless it is imported from a module.
// To keep everything in this file, this module is importing itself
import * as ThisModule from "./LeaguePage"

const LEAGUE_EXECUTION_HOUR = 6;

export function getCurrentDate() {
  return new Date();
}
export function LeaguePage() {
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

  if (!leaguePlayers) return <></>;

  const leagueRows = leaguePlayers.map((leaguePlayer, index) => {
    return (
      <LeagueRow leaguePlayer={leaguePlayer} ranking={index + 1} key={index} />
    );
  });

  const currentTime = ThisModule.getCurrentDate();

  const jumpToNextDay = currentTime.getUTCHours() > LEAGUE_EXECUTION_HOUR;

  const nextRoundTime = new Date(
    Date.UTC(
      currentTime.getUTCFullYear(),
      currentTime.getUTCMonth(),
      jumpToNextDay ? currentTime.getUTCDate() + 1 : currentTime.getUTCDate(),
      LEAGUE_EXECUTION_HOUR,
      0,
      0
    )
  );

  const remainingHours = Math.floor(
    Math.abs(nextRoundTime.getTime() - currentTime.getTime()) / (60 * 60 * 1000)
  );

  const remainingMinutes = Math.floor(
    Math.abs(nextRoundTime.getTime() - currentTime.getTime()) / (60 * 1000) -
      remainingHours * 60
  );

  return (
    <div className={commonStyles.mainTablePage}>
      <h3 className={styles.leagueText} data-testid="remaining-time-message">
        Next automatic round in {remainingHours} hours and {remainingMinutes}{" "}
        minutes.
      </h3>
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
