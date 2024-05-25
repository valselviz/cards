import DuelBoard from "../../duel-components/DuelBoard/DuelBoard";
import { Duelist } from "../../duel/duelist/Duelist";
import { BruteAI } from "duel/artificial-intelligence/BruteAI";
import { useContext, useEffect } from "react";
import MacroGameContext from "MacroGameContext";
import { MacroGame } from "macrogame/MacroGame";
import { useNavigate } from "react-router-dom";
import { AIDuelist } from "duel/duelist/AIDuelist";

function DuelPage() {
  const macrogame = useContext(MacroGameContext).macrogame as MacroGame;

  // Navigate back to the landing page if the user does not have a session
  const navigate = useNavigate();
  useEffect(() => {
    if (!macrogame || !macrogame.facingRival) {
      navigate("/");
    }
  }, [macrogame, navigate]);
  if (!macrogame || !macrogame.facingRival) {
    return <></>;
  }

  const players = [
    new Duelist("Player", true, macrogame.deck),
    new AIDuelist("Opponent", macrogame.facingRival.deck, new BruteAI()),
  ];
  return <DuelBoard players={players} />;
}

export default DuelPage;
