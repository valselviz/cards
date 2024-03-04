import DuelBoard from "../../duel-components/DuelBoard/DuelBoard";
import { Duelist } from "../../duel/Duelist";
import { ArtificialIntelligence } from "duel/ArtificialIntelligence";
import { useContext, useEffect } from "react";
import MacroGameContext from "MacroGameContext";
import { MacroGame } from "macrogame/MacroGame";
import { useNavigate } from "react-router-dom";

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
    new Duelist("Player", true, macrogame.deck, null),
    new Duelist(
      "Opponent",
      false,
      macrogame.facingRival.deck,
      new ArtificialIntelligence()
    ),
  ];
  return <DuelBoard players={players} />;
}

export default DuelPage;
