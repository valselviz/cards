import MacroGameContext from "MacroGameContext";
import RivalRow from "./RivalRow/RivalRow";
import { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./RivalsPage.module.css";
import DoubleCardDisplay from "pages/DoubleCardDisplay/DoubleCardDisplay";

export default function RivalsPage() {
  const macroGame = useContext(MacroGameContext);

  console.log(macroGame.rivals);

  const rivalsRows = macroGame.rivals.map((rival, index) => {
    return <RivalRow rival={rival} key={index}></RivalRow>;
  });

  return (
    <div className={styles.rivalsPage}>
      <h1>Choose Your Match</h1>
      <div>
        <table className={styles.table}>
          <tr>
            <th className={styles.tableHeader}>Rival</th>
            <th className={styles.tableHeader}>Level</th>
            <th className={styles.tableHeader}>Cards</th>
            <th className={styles.tableHeader}>Reward</th>
          </tr>
          <>{rivalsRows}</>
        </table>
        <DoubleCardDisplay></DoubleCardDisplay>
      </div>
      <Link to="/duel">Rival</Link>
    </div>
  );
}
