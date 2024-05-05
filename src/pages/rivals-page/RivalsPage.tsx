import RivalRow from "./RivalRow";
import { useEffect, useState } from "react";
import styles from "../common-components/MainTable/MainTable.module.css";
import DoubleCardDisplay from "../common-components/DoubleCardDisplay/DoubleCardDisplay";
import { CardModel } from "duel/CardModel";
import Dialog from "pages/common-components/Dialog/Dialog";
import { useDialog } from "pages/common-components/Dialog/useDialog";
import { useMacrogame } from "pages/common-components/useMacrogame/useMacrogame";

export default function RivalsPage() {
  const [macrogame] = useMacrogame();

  const [hoveredCard, setHoveredCard] = useState(null as CardModel | null);

  const [openDialog, dialogMessage, isError, isModalOpen, setIsModalOpen] =
    useDialog();

  useEffect(() => {
    if (!localStorage.getItem("rivalsPageInfoDisplayed")) {
      openDialog(
        false,
        `This is the Rivals section.`,
        `Click on a rival to duel against him.`,
        `As you defeat rivals, new ones will be unlocked.`,
        `Can you defeat them all?`
      );
      localStorage.setItem("rivalsPageInfoDisplayed", "true");
    }
  }, []);

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
    <div className={styles.mainTablePage}>
      <h2>Choose Your Next Rival</h2>
      <div className={styles.mainTablePageContent}>
        <div className={styles.mainTable}>
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
      <Dialog
        dialogMessage={dialogMessage}
        isError={isError}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
}
