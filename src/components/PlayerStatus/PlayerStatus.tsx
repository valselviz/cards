import styles from "./PlayerStatus.module.css";
import damagedPlayerStatusBox from "assets/damagedStatusBox.png";

interface PlayerStatusProps {
  playerName: string;
  playerDeckCards: number;
  playerId: number;
  playerTurn: number;
}

export default function PlayerStatus({
  playerName,
  playerDeckCards,
}: PlayerStatusProps) {
  return (
    <div>
      <img
        className={styles.damagedPlayerStatus}
        src={damagedPlayerStatusBox}
        alt=""
      ></img>
      <div className={styles.playerStatus}>
        <p className={styles.statusText}>{playerName}</p>
        <div className={styles.deckIcon}>{playerDeckCards}</div>
      </div>
    </div>
  );
}
