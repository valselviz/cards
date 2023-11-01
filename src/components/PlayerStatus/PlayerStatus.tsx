import styles from "./PlayerStatus.module.css";

interface PlayerStatusProps {
  playerName: string;
  playerDeckCards: number;
  playerId: number;
}

export default function PlayerStatus({
  playerName,
  playerDeckCards,
  playerId,
}: PlayerStatusProps) {
  const specificPlayerClass =
    playerId == 0 ? styles.playerStatusLeft : styles.playerStatusRight;
  return (
    <div className={`${styles.playerStatus} ${specificPlayerClass}`}>
      <p>
        {playerName}: {playerDeckCards} cards
      </p>
    </div>
  );
}
