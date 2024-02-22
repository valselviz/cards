import DuelBoard from "../../duel-components/DuelBoard/DuelBoard";
import { Duelist } from "../../duel/Duelist";
import { ArtificialIntelligence } from "duel/ArtificialIntelligence";
import { useContext } from "react";
import MacroGameContext from "MacroGameContext";
import { MacroGame } from "macrogame/MacroGame";

function DuelPage() {
  const macrogame = useContext(MacroGameContext).macrogame as MacroGame;
  if (macrogame.facingRival) {
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
  } else {
    alert("You can not got to /duel directly");
    window.location.href = "/";
    return <></>;
  }
}

export default DuelPage;
