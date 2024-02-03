import styles from "./DuelEndMessage.module.css";

import victoryIcon from "assets/victory.png";
import defeatIcon from "assets/defeat.svg";

interface DuelEndProps {
  victory: boolean;
}

export default function PlayerStatus({ victory }: DuelEndProps) {
  return (
    <div className={styles.darkBackground}>
      <div className={styles.duelEndMessage}>
        <img
          src={victory ? victoryIcon : defeatIcon}
          className={styles.duelEndIcon}
          alt=""
        />
        <button
          className={`${styles.continueButton} ${
            victory ? styles.continueButtonVictory : styles.continueButtonDefeat
          }`}
          onClick={() => window.location.reload()}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
