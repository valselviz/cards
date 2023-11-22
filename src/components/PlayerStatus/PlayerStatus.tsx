import styles from "./PlayerStatus.module.css";

interface PlayerStatusProps {
  playerName: string;
  playerDeckCards: number;
  playerId: number;
  playerTurn: number;
}

export default function PlayerStatus({
  playerName,
  playerDeckCards,
  playerId,
  playerTurn,
}: PlayerStatusProps) {
  const hasTurnStyle =
    playerTurn === playerId ? styles.onTurn : styles.notOnTurn;

  const specificPlayerClass =
    playerId === 0 ? styles.playerStatusLeft : styles.playerStatusRight;
  return (
    <div
      className={`${styles.playerStatusArea} ${specificPlayerClass} ${hasTurnStyle}`}
    >
      <div className={styles.playerStatus}>
        <p className={styles.statusText}>{playerName}</p>
        <div className={styles.deckIcon}>{playerDeckCards}</div>
      </div>
    </div>
  );
}
