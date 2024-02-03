import { useState } from "react";
import styles from "./PlayerStatus.module.css";
import damagedPlayerStatusBox from "assets/damagedStatusBox.png";
import { ReactDuelUI } from "ReactDuelUI/ReactDuelUI";

interface PlayerStatusProps {
  playerName: string;
  playerDeckCards: number;
  playerId: number;
  duelUI: ReactDuelUI;
}

export default function PlayerStatus({
  playerName,
  playerDeckCards,
  playerId,
  duelUI,
}: PlayerStatusProps) {
  const [damaged, setDamaged] = useState(false);

  duelUI.setDamaged[playerId] = setDamaged;

  const damagedAnimation = damaged
    ? styles.damagedPlayerStatus
    : styles.invisible;

  return (
    <div>
      <img
        className={damagedAnimation}
        src={damagedPlayerStatusBox}
        alt=""
        onAnimationEnd={() => setDamaged(false)}
      ></img>
      <div className={styles.playerStatus}>
        <p className={styles.statusText}>{playerName}</p>
        <div className={styles.deckIcon}>{playerDeckCards}</div>
      </div>
    </div>
  );
}
