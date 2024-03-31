import { Rival } from "macrogame/Rival";
import styles from "../common-components/MainTable/MainTableRow.module.css";
import { CardModel } from "duel/CardModel";
import { Dispatch, SetStateAction, useContext } from "react";
import MacroGameContext, { GameContext } from "MacroGameContext";
import { MacroGame } from "macrogame/MacroGame";
import { cardModels } from "duel/cards-collection/cards-collection";
import { useNavigate } from "react-router-dom";
import questionMark from "../../assets/icons/questionMark.svg";
import { updateOnBackend } from "api-client/api-client";

interface RivalRowProps {
  rival: Rival;
  setHoveredCard: Dispatch<SetStateAction<CardModel | null>>;
}

export default function RivalRow({ rival, setHoveredCard }: RivalRowProps) {
  const context: GameContext = useContext(MacroGameContext);
  const macrogame = context.macrogame as MacroGame;

  const navigate = useNavigate();

  const rewardCard = rival.rewardCard ? cardModels[rival.rewardCard] : null;

  const portraitCard = cardModels[rival.portraitCard];

  const questionMarkStyles = rival.unlocked
    ? styles.questionMarkBlocked
    : styles.questionMark;

  return (
    <tr
      className={styles.tableRow}
      onMouseEnter={() => {
        if (rival.unlocked) {
          if (rewardCard) {
            setHoveredCard(rewardCard);
          }
        } else {
          setHoveredCard(null);
        }
      }}
      onClick={ async () => {
        if (!rival.unlocked) return;
        macrogame.facingRival = rival;
        macrogame.manualGamesStarted++;
        await updateOnBackend(
          context.username as string,
          context.macrogame as MacroGame
        );
        navigate("/duel");
      }}
    >
      <td className={styles.tableDataCell}>
        <div className={styles.imageDiv}>
          <img
            src={portraitCard.image}
            alt={portraitCard.name}
            className={styles.image}
          />
          <img src={questionMark} alt="?" className={questionMarkStyles} />
        </div>
      </td>
      <td className={styles.tableDataCell}>
        {rival.unlocked ? <p>{rival.level}</p> : <p>?</p>}
      </td>
      <td className={styles.tableDataCell}>
        {rival.unlocked ? <p>{rival.deck.length}</p> : <p>?</p>}
      </td>
      <td className={styles.tableDataCell}>
        {rival.unlocked ? (
          <p>{rewardCard ? rewardCard.name : rival.rewardGold}</p>
        ) : (
          <p>?</p>
        )}
      </td>
    </tr>
  );
}
