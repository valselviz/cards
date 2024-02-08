import MacroGameContext from "MacroGameContext";
import RivalRow from "./RivalRow";
import { useContext, useState } from "react";
import styles from "../TablePage.module.css";
import DoubleCardDisplay from "../common-components/DoubleCardDisplay/DoubleCardDisplay";
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
    <div className={styles.page}>
      <h2>Choose Your Next Rival</h2>
      <div className={styles.pageContent}>
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
          <DoubleCardDisplay
            hoveredCard={hoveredCard}
            title={"Reward Details"}
          />
        </div>
      </div>
    </div>
  );
}
