import MacroGameContext from "MacroGameContext";
import RivalRow from "./RivalRow";
import { useContext, useEffect, useState } from "react";
import styles from "../common-components/MainTable/MainTable.module.css";
import DoubleCardDisplay from "../common-components/DoubleCardDisplay/DoubleCardDisplay";
import { CardModel } from "duel/CardModel";
import { MacroGame } from "macrogame/MacroGame";
import { useNavigate } from "react-router-dom";

export default function RivalsPage() {
  const macrogame = useContext(MacroGameContext).macrogame as MacroGame;

  const [hoveredCard, setHoveredCard] = useState(null as CardModel | null);

  // Navigate back to the landing page if the user does not have a session
  const navigate = useNavigate();
  useEffect(() => {
    if (!macrogame) {
      navigate("/");
    }
  }, [macrogame, navigate]);
  if (!macrogame) {
    return <></>;
  }

  const rivalsRows = macrogame.rivals.map((rival, index) => {
    return (
      <RivalRow
        rival={rival}
        key={index}
        setHoveredCard={setHoveredCard}
      ></RivalRow>
    );
  });

  return (
    <div className={styles.mainTable}>
      <h2>Choose Your Next Rival</h2>
      <div className={styles.mainTableContent}>
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
