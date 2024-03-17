import styles from "./DuelEndMessage.module.css";

import victoryIcon from "assets/victory.png";
import defeatIcon from "assets/defeat.svg";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import MacroGameContext, { GameContext } from "MacroGameContext";
import { MacroGame } from "macrogame/MacroGame";
import { updateOnBackend } from "api-client/api-client";

interface DuelEndProps {
  victory: boolean;
}

export default function PlayerStatus({ victory }: DuelEndProps) {
  const navigate = useNavigate();
  const context: GameContext = useContext(MacroGameContext);
  const macrogame = context.macrogame as MacroGame;

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
          onClick={async () => {
            navigate("/deck");
            macrogame.finishDuel(victory);
            await updateOnBackend(
              context.username as string,
              context.macrogame as MacroGame
            );
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
