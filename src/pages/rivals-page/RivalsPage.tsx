import MacroGameContext from "MacroGameContext";
import RivalRow from "./RivalRow/RivalRow";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./RivalsPage.module.css";
import DoubleCardDisplay from "pages/DoubleCardDisplay/DoubleCardDisplay";
import { CardModel } from "duel/CardModel";

export default function RivalsPage() {
  const macroGame = useContext(MacroGameContext);

  const [hoveredCard, setHoveredCard] = useState(null as CardModel | null);

  const rivalsRows = macroGame.rivals.map((rival, index) => {
    return (
      <RivalRow
        rival={rival}
        key={index}
        setHoveredCard={setHoveredCard}
      ></RivalRow>
    );
  });

  return (
    <div className={styles.rivalsPage}>
      <h2>Choose Your Match</h2>
      <div className={styles.rivalsPageContent}>
        <div>
          <div className={styles.tableHeader}>
            <div>Rival</div>
            <div>Level</div>
            <div>Cards</div>
            <div>Reward</div>
          </div>
          <div
            className={styles.tableData}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <table>
              <tbody>
                <>{rivalsRows}</>
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <DoubleCardDisplay hoveredCard={hoveredCard} />
        </div>
      </div>
    </div>
  );
}
